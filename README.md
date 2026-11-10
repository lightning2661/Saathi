# Saathi

Legal awareness and justice routing for transgender and LGBTQ+ people in India.

Describe a situation in English, हिंदी or தமிழ். Saathi checks for danger first, retrieves
only verified law, and returns a short plan: what to do now, your rights with the section
behind each one, and a real person to call.

It works with **no API key, no model and no network call**. A model is optional and may only
rephrase what was retrieved.

---

## Why this exists

A 17-year-old is bullied out of school, abandoned at a railway station at 18, and begs between
stations by 19. The law already protects her: the Transgender Persons (Protection of Rights)
Act, 2019, as amended in 2026, gives a right of residence, a discrimination remedy and criminal
penalties for forcing someone out or forcing them to beg. None of that reaches her, because
nobody in her life can name a section or a number.

Saathi closes that gap in both directions: the person who needs the right gets it in their own
language, and the bystander who wants to help gets something concrete to do.

## Architecture

```
situation text
      │
      ▼
┌──────────────────┐   fixed rules, offline, multilingual
│ triage           │   self-harm, violence, forced labour, minor, no shelter,
│ src/lib/safety   │   custody, conversion pressure, medical emergency
└────────┬─────────┘
         ▼
┌──────────────────┐   lexical retrieval over the verified corpus
│ retrieval        │   curated synonym lists carry the recall an embedding
│ src/lib/retrieval│   index would otherwise provide
└────────┬─────────┘
         ▼
┌──────────────────┐   OPTIONAL, opt-in per question
│ generator        │   local LoRA → Groq → OpenRouter → Gemini
│ src/lib/gateway  │   PII masked before any third-party call
└────────┬─────────┘
         ▼
┌──────────────────┐   every claim must cite a retrieved provision by index;
│ citation guard   │   uncited claims and unknown section numbers are dropped
│ src/lib/answer   │   and reported in the response
└────────┬─────────┘
         ▼
  answer + helplines + caveats + provenance
```

The extractive composer is not a fallback stub. It is the product: rights are rendered from
the provision's plain-language summary, the statute text is attached verbatim, and the
playbook and helplines come from the corpus. When generation is disabled or fails validation,
the person still gets a complete answer.

### The answer contract

`POST /api/ask` → `{ lang, useModel }` returns a single `Answer` object:

| field | source |
| --- | --- |
| `immediate` | triage rules, not the model |
| `rights[]` | verified provisions, each with `citations[]` |
| `steps[]` | authored playbook for the matched topic |
| `help[]` | helplines mapped to the topic and to the triage flags |
| `unsure[]` | authored caveats the answer must carry |
| `model` | provider, whether synthesis happened, dropped citations, rejected claims |

Nothing in the response is anonymous prose. `model.note` states exactly what produced it.

## Corpus and provenance

13 situation playbooks × 3 languages, 20 provisions, 5 judgments, 7 national helplines.

Every provision stores `status`, `verified_on`, `source_url` and a **separate**
`human_reviewed` flag. Those are different claims and the UI never conflates them:

- `status: verified` — text checked against the official consolidated copy.
- `human_reviewed` — a named lawyer signed off. Starts at `0` and is recorded through the
  operator console, which writes a `verify` event. Citations display it only when set.

Seeded from:

- **India Code** (indiacode.gov.in) — consolidated Transgender Persons Act as on 4 June 2026,
  including every 2026 amendment marker.
- **eGazette of India** — Amendment Act 3 of 2026 (`271438.pdf`) and commencement
  notification S.O. 2620(E) (`272895.pdf`), in force 25 May 2026.
- **Constitution of India** — Articles 14, 15, 21, 23, 39A.
- **Judgments** — NALSA (2014), Puttaswamy (2017), Navtej Johar (2018), Supriyo (2023),
  S. Sushma v. Commissioner of Police (Madras HC, 2021).

Provisions and playbooks live in `src/lib/corpus/` as typed data, versioned by
`CORPUS_VERSION`, so a corpus change is a reviewable diff rather than a database mutation.

### Keeping the law current

`npm run sync`, or the operator console:

| adapter | source | mechanism |
| --- | --- | --- |
| `indiacode` | indiacode.gov.in | DSpace 7 discovery API, keyless JSON |
| `egazette` | egazette.gov.in | listing scan for `/WriteReadData/<year>/<id>.pdf` |
| `data.gov.in` | data.gov.in | catalog API, needs `DATA_GOV_IN_API_KEY` |

The sync is a **detection** pipeline. It hashes each source's relevant listing, stages anything
new in `sync_changes` with status `pending`, and stops. It never edits a provision, never
changes a `status`, and never promotes a document into the corpus. A source that returns
nothing is recorded as `empty` rather than as "unchanged", so a silent parser break is visible.

Change detection is aggressive on purpose: a false positive costs one click in the review
queue, a false negative means someone is told about a law that has moved.

## Privacy

The threat model is a person whose family or employer may read this screen.

- No account, no cookies for readers, no analytics, no third-party script.
- Nothing typed is stored. `events` records topic, language, provider and dropped-citation
  count — never the text. A test asserts the table has no text column.
- Retrieval, triage and the extractive answer run in-process. Zero network calls in the
  default configuration.
- Model use is a per-question opt-in checkbox. Before any third-party call, `maskPII` removes
  emails, phone numbers and 9–18 digit identifiers. Local LoRA inference skips masking because
  the text never leaves the machine.
- `/api/ask` responses are `cache-control: no-store`.

## Models

### Extractive (default, free)

`SAATHI_MODEL_PROVIDER=extractive`. No key, no GPU, no egress.

### Your own LoRA, served free

The training pipeline is here, not in a notebook:

```bash
npm run dataset                  # generate data/lora/{train,eval}.jsonl from the corpus
python scripts/train_lora.py --base-model google/gemma-2-2b-it
bash scripts/serve_lora.sh lora-out/saathi-lora
export SAATHI_MODEL_PROVIDER=lora SAATHI_LORA_BASE_URL=http://127.0.0.1:8000/v1
```

`scripts/build-dataset.ts` mirrors the inference prompt exactly (`buildUserPrompt` from
`src/lib/gateway.ts`), so training and serving cannot drift. It emits grounded rows plus
abstention rows for questions the corpus cannot answer.

`scripts/eval_lora.py` scores a served adapter on schema validity, citation precision,
invented-section rate, grounded rate and abstention accuracy. Crisis routing is deterministic
and is covered by the Node suite, not by the model.

To publish the endpoint, `scripts/lora_proxy.py` puts a bearer token, a 64 KB body cap and a
20/min per-address rate limit in front of vLLM; `serve_lora.sh` wires it to a Cloudflare tunnel.
An open GPU port is someone else's bill.

### Free-tier public APIs

`groq`, `openrouter` and `gemini` are supported through one interface. They receive masked text
only after explicit consent, and their output goes through the same citation guard as the LoRA.

## Running

```bash
npm install
cp .env.example .env      # optional; everything works without it
npm run dev               # http://localhost:3000
```

Storage is SQLite via `node:sqlite` (built into Node 22+) at `.data/saathi.sqlite`, or D1 when
`globalThis.__SAATHI_D1__` is set by a Worker entry. The same DDL runs on both; no FTS5 or
extensions are used.

```bash
npm test                  # 25 tests: corpus integrity, triage, guard, end-to-end
npm run typecheck
npm run db:seed -- --force
npm run sync
```

## Operator console

`/admin`, gated by `SAATHI_SYNC_TOKEN` (minimum 12 characters, and it refuses the placeholder).
It can record legal sign-off, run the sync, and triage staged changes. It cannot edit statute
text — that only happens by deploying a corpus version.

## Deployment

The app is a standard Next.js App Router project and runs on Node or any container host. For
Cloudflare Workers, the storage adapter and schema are D1-ready, but the project has **not**
been run through a Workers build here, so treat that path as unverified rather than supported.

## Limits, stated plainly

- Not legal advice, and not a lawyer. It cannot represent anyone.
- The corpus is 20 provisions covering transgender and queer legal rights. It is not the
  Indian statute book. Anything outside it should return "not sure" and a legal aid number.
- Hindi and Tamil playbooks are authored, not machine-translated, but they have not been
  reviewed by native-speaking lawyers.
- The 2026 amendment narrowed the statutory definition and added a medical board before the
  identity certificate. Answers say so; they do not pretend the 2019 position still holds.
- Helpline numbers change. Each carries a `verified_on` date; the directory should be re-checked
  before any public launch.
- `human_reviewed` is `0` for the seeded corpus until a named reviewer signs off.

## Licence

Corpus text is reproduced from Government of India publications. Application code is provided
for the SDG 16 build; check the source terms before redeploying the statutory text elsewhere.
