#!/usr/bin/env python3
"""QLoRA fine-tune for Saathi's grounded answer writer.

Trains on the exact prompt shape used at inference (src/lib/gateway.ts), so the
adapter learns the output contract rather than legal knowledge. The corpus
remains the only source of law; the adapter only learns to cite it.

Free-Colab constraints handled here:
  * T4 is compute capability 7.5 and has no bfloat16 — precision is detected,
    not assumed. The previous bf16=True would have failed on every free GPU.
  * trl renamed SFT kwargs across 0.12-0.20, so the config and trainer kwargs
    are filtered against the installed dataclass/__init__ signature.
  * 32 training rows is not a marketing number. It trains format compliance;
    the script says so and writes a report with the row counts in it.

    pip install -r requirements-colab.txt
    python scripts/train_lora.py --base-model Qwen/Qwen2.5-1.5B-Instruct
"""

from __future__ import annotations

import argparse
import inspect
import json
import os
import time
from datetime import datetime, timezone

import torch
import transformers
from datasets import load_dataset
from peft import LoraConfig, get_peft_model, prepare_model_for_kbit_training
from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig
from trl import SFTConfig, SFTTrainer

TARGETS = ["q_proj", "k_proj", "v_proj", "o_proj", "gate_proj", "up_proj", "down_proj"]


def read_rows(path: str) -> list[dict]:
    rows: list[dict] = []
    with open(path, encoding="utf-8") as fh:
        for line in fh:
            if not line.strip():
                continue
            record = json.loads(line)
            rows.append({"messages": record["messages"]})
    return rows


def dataclass_fields(cls) -> set[str]:
    return set(getattr(cls, "__dataclass_fields__", {}) or {})


def sft_config(args, bf16: bool) -> SFTConfig:
    fields = dataclass_fields(SFTConfig)
    kwargs: dict = {
        "output_dir": args.out,
        "num_train_epochs": args.epochs,
        "per_device_train_batch_size": args.batch,
        "gradient_accumulation_steps": args.accum,
        "learning_rate": args.lr,
        "lr_scheduler_type": "cosine",
        "warmup_ratio": 0.05,
        "logging_steps": 1,
        "save_strategy": "no",
        "bf16": bf16,
        "fp16": not bf16,
        "gradient_checkpointing": True,
        "packing": False,
        "report_to": [],
        "seed": args.seed,
        "optim": "paged_adamw_8bit",
    }
    # 0.12+ uses max_length; earlier releases only accepted max_seq_length.
    kwargs["max_length" if "max_length" in fields else "max_seq_length"] = args.max_seq_len
    if "eval_strategy" in fields:
        kwargs["eval_strategy"] = "epoch"
    elif "evaluation_strategy" in fields:
        kwargs["evaluation_strategy"] = "epoch"
    return SFTConfig(**{k: v for k, v in kwargs.items() if k in fields})


def build_trainer(model, tokenizer, config, train, eval_set) -> SFTTrainer:
    params = inspect.signature(SFTTrainer.__init__).parameters
    kwargs: dict = {"model": model, "args": config, "train_dataset": train}
    if "eval_dataset" in params:
        kwargs["eval_dataset"] = eval_set
    # processing_class replaced tokenizer in trl 0.12.2.
    if "processing_class" in params:
        kwargs["processing_class"] = tokenizer
    else:
        kwargs["tokenizer"] = tokenizer
    return SFTTrainer(**kwargs)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--base-model", default="Qwen/Qwen2.5-1.5B-Instruct")
    ap.add_argument("--train", default="data/lora/train.jsonl")
    ap.add_argument("--eval", default="data/lora/eval.jsonl")
    ap.add_argument("--out", default="lora-out/saathi-lora")
    ap.add_argument("--report", default="lora-out/train_report.json")
    ap.add_argument("--epochs", type=float, default=3.0)
    ap.add_argument("--lr", type=float, default=2e-4)
    ap.add_argument("--rank", type=int, default=16)
    ap.add_argument("--alpha", type=int, default=32)
    ap.add_argument("--batch", type=int, default=1)
    ap.add_argument("--accum", type=int, default=8)
    ap.add_argument("--max-seq-len", type=int, default=2048)
    ap.add_argument("--seed", type=int, default=42)
    args = ap.parse_args()

    if not torch.cuda.is_available():
        raise SystemExit("CUDA required. On Colab: Runtime → Change runtime type → T4 GPU.")
    bf16 = torch.cuda.is_bf16_supported()
    compute = torch.bfloat16 if bf16 else torch.float16
    gpu = torch.cuda.get_device_name(0)

    train_rows = read_rows(args.train)
    eval_rows = read_rows(args.eval)
    print(f"gpu={gpu} precision={'bf16' if bf16 else 'fp16'} train={len(train_rows)} eval={len(eval_rows)}")
    if len(train_rows) < 100:
        print(
            "note: small SFT set. This trains output format and citation discipline, "
            "not new legal knowledge. The corpus stays authoritative.",
        )

    tokenizer = AutoTokenizer.from_pretrained(args.base_model)
    if tokenizer.pad_token is None:
        tokenizer.pad_token = tokenizer.eos_token
    tokenizer.padding_side = "right"
    if tokenizer.chat_template is None:
        raise SystemExit(f"{args.base_model} has no chat template; pick an instruct checkpoint.")

    quant = BitsAndBytesConfig(
        load_in_4bit=True,
        bnb_4bit_quant_type="nf4",
        bnb_4bit_compute_dtype=compute,
        bnb_4bit_use_double_quant=True,
    )
    model = AutoModelForCausalLM.from_pretrained(
        args.base_model,
        quantization_config=quant,
        device_map={"": 0},
        torch_dtype=compute,
    )
    model.config.use_cache = False
    model = prepare_model_for_kbit_training(model)

    lora = LoraConfig(
        r=args.rank,
        lora_alpha=args.alpha,
        lora_dropout=0.05,
        bias="none",
        task_type="CAUSAL_LM",
        target_modules=TARGETS,
    )
    model = get_peft_model(model, lora)
    model.print_trainable_parameters()

    train = load_dataset("json", data_files=args.train, split="train")
    eval_set = load_dataset("json", data_files=args.eval, split="train")

    started = time.time()
    trainer = build_trainer(model, tokenizer, sft_config(args, bf16), train, eval_set)
    trainer.train()
    trainer.save_model(args.out)
    tokenizer.save_pretrained(args.out)

    history = trainer.state.log_history
    train_loss = next((h["train_loss"] for h in reversed(history) if "train_loss" in h), None)
    eval_loss = next((h["eval_loss"] for h in reversed(history) if "eval_loss" in h), None)

    report = {
        "base_model": args.base_model,
        "adapter": os.path.abspath(args.out),
        "gpu": gpu,
        "precision": "bf16" if bf16 else "fp16",
        "rows": {"train": len(train_rows), "eval": len(eval_rows)},
        "epochs": args.epochs,
        "max_seq_len": args.max_seq_len,
        "lora": {"r": args.rank, "alpha": args.alpha, "targets": TARGETS},
        "steps": trainer.state.global_step,
        "train_loss": train_loss,
        "eval_loss": eval_loss,
        "elapsed_sec": round(time.time() - started, 1),
        "versions": {
            "torch": torch.__version__,
            "transformers": transformers.__version__,
            "trl": __import__("trl").__version__,
            "peft": __import__("peft").__version__,
        },
        "created_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "caveat": "Format adapter over a 20-provision corpus; not a general legal model.",
    }
    os.makedirs(os.path.dirname(args.report) or ".", exist_ok=True)
    with open(args.report, "w", encoding="utf-8") as fh:
        json.dump(report, fh, indent=2)
    print(json.dumps(report, indent=2))
    print("next: python scripts/eval_lora.py --backend transformers "
          f"--adapter {args.out} --base-model {args.base_model}")


if __name__ == "__main__":
    main()
