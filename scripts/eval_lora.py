#!/usr/bin/env python3
"""Score Saathi's answer writer against the held-out set.

Three backends, because the same scoring code must run on a GPU, against a
served endpoint, and in CI with no model at all:

    --backend transformers   load base + adapter in-process (Colab)
    --backend endpoint       OpenAI-compatible server (vLLM)
    --backend fixture        read pre-generated outputs (no torch)

Metrics:
    schema_ok            response parses as the expected object with all keys
    cite_precision       predicted citations that resolve to a context item
    cite_recall          overlap with the corpus-authored gold citations
    grounded_rate        rights items carrying at least one citation
    invented_section     quoted a section number absent from the context
    abstain_accuracy     unsupported questions hedged instead of answered

Crisis routing is deterministic (src/lib/safety.ts) and tested in Node; the
model is never asked to make that call, so it is not measured here.
"""

from __future__ import annotations

import argparse
import json
import re
import urllib.error
import urllib.request

SECTION_CLAIM = re.compile(r"(?:section|sec\.?|s\.|§)\s*(\d{1,3}[A-Za-z]?)", re.I)
CONTEXT_LINE = re.compile(r"^\[\d+\][^\n]*?,\s*(?:s\.|Article\s+)(\d{1,3}[A-Za-z]?)\s*\(", re.M)
REQUIRED = ("immediate", "rights", "steps", "unsure")


def read_rows(path: str) -> list[dict]:
    with open(path, encoding="utf-8") as fh:
        return [json.loads(line) for line in fh if line.strip()]


def allowed_sections(user_prompt: str) -> set[str]:
    return {m.upper() for m in CONTEXT_LINE.findall(user_prompt)}


def context_size(user_prompt: str) -> int:
    """Number of retrievable items, not unique section labels.

    Two provisions can share a section number across acts (s.3 of the TPA and
    s.3 of another statute), so counting distinct labels silently shrinks the
    valid citation range and marks correct citations as out of bounds.
    """
    return len(re.findall(r"^\[\d+\]", user_prompt, re.M))


def parse(raw: str) -> dict | None:
    text = raw.strip()
    if text.startswith("```"):
        text = re.sub(r"^```(?:json)?\s*", "", text)
        text = re.sub(r"\s*```$", "", text)
    try:
        out = json.loads(text)
    except json.JSONDecodeError:
        return None
    if not isinstance(out, dict) or any(k not in out for k in REQUIRED):
        return None
    if not isinstance(out.get("rights"), list):
        return None
    return out


# ── backends ────────────────────────────────────────────────────────────────


def from_fixture(rows: list[dict], path: str) -> list[str | None]:
    by_index: dict[int, str] = {}
    with open(path, encoding="utf-8") as fh:
        for pos, line in enumerate(fh):
            if not line.strip():
                continue
            rec = json.loads(line)
            by_index[int(rec.get("i", pos))] = rec.get("raw", "")
    return [by_index.get(i) for i in range(len(rows))]


def from_endpoint(rows: list[dict], endpoint: str, model: str, token: str | None) -> list[str | None]:
    out: list[str | None] = []
    for row in rows:
        body = json.dumps(
            {
                "model": model,
                "messages": row["messages"][:2],
                "temperature": 0.0,
                "max_tokens": 900,
                "response_format": {"type": "json_object"},
            }
        ).encode()
        headers = {"content-type": "application/json"}
        if token:
            headers["authorization"] = f"Bearer {token}"
        req = urllib.request.Request(
            endpoint.rstrip("/") + "/chat/completions", data=body, headers=headers
        )
        try:
            with urllib.request.urlopen(req, timeout=120) as res:
                out.append(json.loads(res.read())["choices"][0]["message"]["content"])
        except (urllib.error.URLError, KeyError, json.JSONDecodeError) as exc:
            print(f"[fail] endpoint: {exc}")
            out.append(None)
    return out


def from_transformers(rows: list[dict], base: str, adapter: str, max_new: int) -> list[str | None]:
    import torch
    from peft import PeftModel
    from transformers import AutoModelForCausalLM, AutoTokenizer

    tokenizer = AutoTokenizer.from_pretrained(adapter)
    model = AutoModelForCausalLM.from_pretrained(
        base, torch_dtype=torch.float16, device_map={"": 0}
    )
    model = PeftModel.from_pretrained(model, adapter)
    model.eval()

    out: list[str | None] = []
    for row in rows:
        prompt = tokenizer.apply_chat_template(
            row["messages"][:2], tokenize=False, add_generation_prompt=True
        )
        inputs = tokenizer(prompt, return_tensors="pt", truncation=True, max_length=2048).to(model.device)
        with torch.no_grad():
            generated = model.generate(
                **inputs,
                max_new_tokens=max_new,
                do_sample=False,
                pad_token_id=tokenizer.pad_token_id or tokenizer.eos_token_id,
            )
        text = tokenizer.decode(generated[0][inputs["input_ids"].shape[1]:], skip_special_tokens=True)
        out.append(text)
    return out


# ── scoring ─────────────────────────────────────────────────────────────────


def score(rows: list[dict], outputs: list[str | None]) -> dict:
    counts = {
        "rows": len(rows),
        "parsed": 0,
        "rights": 0,
        "grounded": 0,
        "pred_cites": 0,
        "pred_cites_valid": 0,
        "invented_rows": 0,
        "abstain_rows": 0,
        "abstain_ok": 0,
        "gold_cites": 0,
        "gold_hit": 0,
    }

    for row, raw in zip(rows, outputs):
        if not raw:
            continue
        meta = row.get("meta", {})
        prompt = row["messages"][1]["content"]
        ctx = allowed_sections(prompt)
        n_ctx = context_size(prompt)

        out = parse(raw)
        if out is None:
            continue
        counts["parsed"] += 1

        inflated = False
        for item in out["rights"]:
            if not isinstance(item, dict):
                continue
            counts["rights"] += 1
            cites = [c for c in (item.get("cites") or []) if isinstance(c, int)]
            counts["pred_cites"] += len(cites)
            valid = [c for c in cites if 1 <= c <= n_ctx]
            counts["pred_cites_valid"] += len(valid)
            if valid:
                counts["grounded"] += 1
            for claim in SECTION_CLAIM.findall(item.get("text") or ""):
                if claim.upper() not in ctx:
                    inflated = True
        if inflated:
            counts["invented_rows"] += 1

        # Gold citations come from the corpus-authored assistant turn.
        try:
            gold = json.loads(row["messages"][2]["content"])
            gold_cites = {c for item in gold.get("rights", []) for c in (item.get("cites") or [])}
        except (json.JSONDecodeError, IndexError, KeyError):
            gold_cites = set()
        pred_cites = {
            c for item in out["rights"] if isinstance(item, dict) for c in (item.get("cites") or [])
            if isinstance(c, int)
        }
        counts["gold_cites"] += len(gold_cites)
        counts["gold_hit"] += len(gold_cites & pred_cites)

        if meta.get("kind") == "abstain":
            counts["abstain_rows"] += 1
            hedged = bool(out.get("unsure")) and counts_ungrounded(out) == 0
            if hedged:
                counts["abstain_ok"] += 1

    rows_n = max(1, counts["rows"])
    return {
        "rows": counts["rows"],
        "schema_ok": round(counts["parsed"] / rows_n, 3),
        "grounded_rate": round(counts["grounded"] / max(1, counts["rights"]), 3),
        "cite_precision": round(counts["pred_cites_valid"] / max(1, counts["pred_cites"]), 3),
        "cite_recall": round(counts["gold_hit"] / max(1, counts["gold_cites"]), 3),
        "invented_section_rate": round(counts["invented_rows"] / max(1, counts["parsed"]), 3),
        "abstain_accuracy": round(counts["abstain_ok"] / max(1, counts["abstain_rows"]), 3),
        "counts": counts,
    }


def counts_ungrounded(out: dict) -> int:
    return sum(
        1
        for item in out.get("rights", [])
        if isinstance(item, dict) and not (item.get("cites") or [])
    )


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--backend", choices=["transformers", "endpoint", "fixture"], default="transformers")
    ap.add_argument("--eval", default="data/lora/eval.jsonl")
    ap.add_argument("--adapter", default="lora-out/saathi-lora")
    ap.add_argument("--base-model", default="Qwen/Qwen2.5-1.5B-Instruct")
    ap.add_argument("--endpoint", default="http://127.0.0.1:8000/v1")
    ap.add_argument("--model", default="saathi-lora")
    ap.add_argument("--token", default=None)
    ap.add_argument("--predictions", default=None, help="fixture backend: JSONL of {i, raw}")
    ap.add_argument("--max-new-tokens", type=int, default=800)
    ap.add_argument("--json-out", default="lora-out/eval.json")
    args = ap.parse_args()

    rows = read_rows(args.eval)
    if args.backend == "fixture":
        if not args.predictions:
            raise SystemExit("--predictions is required for the fixture backend")
        outputs = from_fixture(rows, args.predictions)
    elif args.backend == "endpoint":
        outputs = from_endpoint(rows, args.endpoint, args.model, args.token)
    else:
        outputs = from_transformers(rows, args.base_model, args.adapter, args.max_new_tokens)

    report = score(rows, outputs)
    print(json.dumps({k: v for k, v in report.items() if k != "counts"}, indent=2))

    if args.json_out:
        import os

        os.makedirs(os.path.dirname(args.json_out) or ".", exist_ok=True)
        with open(args.json_out, "w", encoding="utf-8") as fh:
            json.dump(report, fh, indent=2)


if __name__ == "__main__":
    main()
