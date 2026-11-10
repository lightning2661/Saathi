#!/usr/bin/env bash
# Serve the Saathi LoRA behind an OpenAI-compatible endpoint, for free.
#
#   bash scripts/serve_lora.sh lora-out/saathi-lora [base-model]
#
# Nothing here is required for Saathi to work: the app answers from the
# verified corpus with SAATHI_MODEL_PROVIDER=extractive and no model at all.
set -euo pipefail

ADAPTER="${1:-lora-out/saathi-lora}"
BASE="${2:-google/gemma-2-2b-it}"
PORT="${PORT:-8000}"

if ! command -v vllm >/dev/null 2>&1; then
  echo "vllm not found. pip install vllm" >&2
  exit 1
fi

# --enable-lora loads the adapter next to the base weights, so one process
# serves both and the adapter can be swapped without a restart.
vllm serve "$BASE" \
  --enable-lora \
  --lora-modules "saathi-lora=$ADAPTER" \
  --max-model-len 4096 \
  --host 127.0.0.1 \
  --port "$PORT" \
  --dtype bfloat16 &

VLLM_PID=$!
echo "vLLM pid $VLLM_PID on 127.0.0.1:$PORT"

# Wait for the model to actually answer, not just for the port to open.
for _ in $(seq 1 60); do
  if curl -sf "http://127.0.0.1:$PORT/v1/models" >/dev/null 2>&1; then
    echo "ready: export SAATHI_MODEL_PROVIDER=lora SAATHI_LORA_BASE_URL=http://127.0.0.1:$PORT/v1"
    break
  fi
  sleep 2
done

if [[ "${PUBLISH:-0}" == "1" ]]; then
  # Public exposure goes through the token-checking proxy, never vLLM directly.
  TOKEN="${SAATHI_LORA_TOKEN:?set SAATHI_LORA_TOKEN before publishing}"
  python scripts/lora_proxy.py --upstream "http://127.0.0.1:$PORT" --token "$TOKEN" --port 8080 &
  PROXY_PID=$!
  echo "proxy pid $PROXY_PID on 127.0.0.1:8080"
  if command -v cloudflared >/dev/null 2>&1; then
    echo "starting tunnel; put the printed hostname in SAATHI_LORA_BASE_URL with /v1 appended"
    exec cloudflared tunnel --url http://127.0.0.1:8080
  else
    echo "cloudflared not found; expose 127.0.0.1:8080 yourself (nginx, fly.io, a VPS)." >&2
  fi
fi

wait "$VLLM_PID"
