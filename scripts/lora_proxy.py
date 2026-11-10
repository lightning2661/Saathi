#!/usr/bin/env python3
"""Publish the LoRA endpoint without publishing an open GPU.

A bare vLLM port on the internet is an invitation to drain someone's
electricity bill. This proxy requires a bearer token, caps request body size,
and rate-limits per client address. Stdlib only, on purpose.

    python scripts/lora_proxy.py --upstream http://127.0.0.1:8000 --token "$SAATHI_LORA_TOKEN"
"""

from __future__ import annotations

import argparse
import json
import time
import urllib.error
import urllib.request
from collections import defaultdict, deque
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

MAX_BODY = 64 * 1024
WINDOW_S = 60
MAX_REQUESTS = 20

HITS: dict[str, deque[float]] = defaultdict(deque)


def allowed(addr: str) -> bool:
    now = time.time()
    q = HITS[addr]
    while q and now - q[0] > WINDOW_S:
        q.popleft()
    if len(q) >= MAX_REQUESTS:
        return False
    q.append(now)
    return True


def build(upstream: str, token: str):
    class Handler(BaseHTTPRequestHandler):
        protocol_version = "HTTP/1.1"

        def log_message(self, fmt: str, *args) -> None:  # noqa: A003
            print(f"{self.address_string()} {fmt % args}")

        def _reject(self, code: int, reason: str) -> None:
            body = json.dumps({"error": reason}).encode()
            self.send_response(code)
            self.send_header("content-type", "application/json")
            self.send_header("content-length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)

        def do_GET(self) -> None:  # noqa: N802
            if self.path.rstrip("/").endswith("/models"):
                self._reject(200, "ok") if False else None
            self._proxy("GET", b"")

        def do_POST(self) -> None:  # noqa: N802
            if not allowed(self.client_address[0]):
                return self._reject(429, "rate_limited")
            length = int(self.headers.get("content-length") or 0)
            if length > MAX_BODY:
                return self._reject(413, "body_too_large")
            self._proxy("POST", self.rfile.read(length))

        def _proxy(self, method: str, body: bytes) -> None:
            auth = self.headers.get("authorization", "")
            if auth != f"Bearer {token}":
                return self._reject(401, "unauthorized")

            req = urllib.request.Request(
                upstream.rstrip("/") + self.path,
                data=body or None,
                method=method,
                headers={"content-type": "application/json"},
            )
            try:
                with urllib.request.urlopen(req, timeout=120) as res:
                    payload = res.read()
                    self.send_response(res.status)
                    self.send_header("content-type", "application/json")
                    self.send_header("content-length", str(len(payload)))
                    self.end_headers()
                    self.wfile.write(payload)
            except urllib.error.HTTPError as exc:
                detail = exc.read()
                self.send_response(exc.code)
                self.send_header("content-type", "application/json")
                self.send_header("content-length", str(len(detail)))
                self.end_headers()
                self.wfile.write(detail)
            except urllib.error.URLError:
                self._reject(502, "upstream_unreachable")

    return Handler


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--upstream", default="http://127.0.0.1:8000")
    ap.add_argument("--token", required=True)
    ap.add_argument("--host", default="127.0.0.1")
    ap.add_argument("--port", type=int, default=8080)
    args = ap.parse_args()

    server = ThreadingHTTPServer((args.host, args.port), build(args.upstream, args.token))
    print(f"proxy on http://{args.host}:{args.port} → {args.upstream} ({MAX_REQUESTS}/min per address)")
    server.serve_forever()


if __name__ == "__main__":
    main()
