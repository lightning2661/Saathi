import type { Citation, Lang } from './types';
import { sectionLabel } from './format';

/**
 * The model writes prose. It is never the source of law: it receives numbered
 * extracts and must cite them by index. Callers run guardOutput() on the result.
 */
export const SYSTEM_PROMPT = `You are Saathi, a legal information assistant in India for transgender and LGBTQ+ people.

Rules, all mandatory:
1. Use ONLY the numbered provisions in CONTEXT. Do not add law from memory.
2. Every item in "rights" must carry "cites": indexes from CONTEXT that support it.
3. Never state a section number that does not appear in CONTEXT.
4. Plain language, second person, no legal jargon, no Latin. Answer in the requested language.
5. Keep each item under 45 words. Be calm and concrete. Never promise an outcome.
6. If CONTEXT does not answer the question, say so in "unsure" and do not invent rights.
7. Never give medical instructions, dosages, or tell someone to leave a shelter.
8. Do not mention that you are an AI model.

Reply with JSON only:
{"immediate":[{"text":""}],"rights":[{"text":"","cites":[1]}],"steps":[{"text":""}],"unsure":[""]}`;

/**
 * Used when retrieval finds no verified provision. The model may still be
 * useful for practical routing, but it is forbidden from asserting law, and the
 * guard enforces that by rejecting any section reference.
 */
export const GENERAL_SYSTEM_PROMPT = `You are Saathi, a practical safety and legal-navigation assistant in India for transgender and LGBTQ+ people.

There is NO verified legal context for this question. Therefore:
1. State no section number, article number, or act name at all. Not even a correct one.
2. Do not claim what the law says. Give practical next steps a person can take today.
3. "rights" must be an empty array.
4. Always name at least one real route to a human: 112 emergency, 1098 childline, 15100 free legal aid, 14416 mental health, 139 railway.
5. End with an "unsure" line telling them a legal aid lawyer must confirm anything legal.
6. Plain language, second person, under 40 words per item, in the requested language.
7. Never give medical instructions. Never tell someone to leave shelter at night.

Reply with JSON only:
{"immediate":[{"text":""}],"rights":[],"steps":[{"text":""}],"unsure":[""]}`;

export interface GatewayContextItem {
  index: number;
  citation: Citation;
  summary: string;
}

export function buildUserPrompt(question: string, lang: Lang, context: GatewayContextItem[]): string {
  const langName = lang === 'hi' ? 'Hindi' : lang === 'ta' ? 'Tamil' : 'English';
  if (context.length === 0) {
    return `LANGUAGE: ${langName}\n\nCONTEXT: none. No verified provision was retrieved for this question.\n\nSITUATION:\n${question}\n\nReturn JSON only.`;
  }
  const body = context
    .map(
      (c) =>
        `[${c.index}] ${c.citation.act}, ${sectionLabel(c.citation.section)} (${c.citation.heading})\n${c.summary}\nStatutory text: ${truncate(c.citation.quote, 420)}`,
    )
    .join('\n\n');
  return `LANGUAGE: ${langName}\n\nCONTEXT:\n${body}\n\nSITUATION:\n${question}\n\nReturn JSON only.`;
}

const truncate = (s: string, n: number) => (s.length <= n ? s : `${s.slice(0, n)}…`);

/**
 * Removes direct identifiers before a third-party call. Local LoRA inference
 * skips this because the text never leaves the machine.
 */
export function maskPII(text: string): { masked: string; replaced: number } {
  let replaced = 0;
  const sub = (re: RegExp, tag: string) => {
    text = text.replace(re, () => {
      replaced += 1;
      return tag;
    });
  };
  sub(/[\w.+-]+@[\w-]+\.[\w.]{2,}/g, '[email]');
  sub(/\b(?:\+91[\s-]?)?[6-9]\d{9}\b/g, '[phone]');
  sub(/\b\d{4}\s?\d{4}\s?\d{4}\b/g, '[id-number]');
  sub(/\b\d{9,18}\b/g, '[number]');
  return { masked: text, replaced };
}

export interface GenerateResult {
  provider: string;
  text: string;
  maskedIdentifiers: number;
}

export type ProviderName = 'auto' | 'extractive' | 'lora' | 'groq' | 'openrouter' | 'gemini';
export type ConcreteProvider = Exclude<ProviderName, 'auto' | 'extractive'>;

function configuredProvider(): ProviderName {
  const raw = (process.env.SAATHI_MODEL_PROVIDER || 'auto').toLowerCase();
  if (['auto', 'extractive', 'lora', 'groq', 'openrouter', 'gemini'].includes(raw)) {
    return raw as ProviderName;
  }
  return 'auto';
}

/**
 * `auto` takes the first provider that is actually usable, cheapest and most
 * private first: your own LoRA, then a free-tier key. Returns null when nothing
 * is configured, which is a supported state rather than an error.
 */
export function resolveProvider(): ConcreteProvider | null {
  const choice = configuredProvider();
  if (choice === 'extractive') return null;
  if (choice !== 'auto') {
    if (choice === 'lora') return process.env.SAATHI_LORA_BASE_URL ? 'lora' : null;
    if (choice === 'groq') return process.env.GROQ_API_KEY ? 'groq' : null;
    if (choice === 'openrouter') return process.env.OPENROUTER_API_KEY ? 'openrouter' : null;
    return process.env.GEMINI_API_KEY ? 'gemini' : null;
  }
  if (process.env.SAATHI_LORA_BASE_URL && process.env.SAATHI_LORA_MODEL) return 'lora';
  if (process.env.GROQ_API_KEY) return 'groq';
  if (process.env.OPENROUTER_API_KEY) return 'openrouter';
  if (process.env.GEMINI_API_KEY) return 'gemini';
  return null;
}

/** Server-side check so the UI can default the consent switch honestly. */
export function modelAvailable(): boolean {
  return resolveProvider() !== null;
}

async function chatCompletion(
  url: string,
  headers: Record<string, string>,
  model: string,
  system: string,
  user: string,
): Promise<string> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...headers },
    body: JSON.stringify({
      model,
      temperature: 0.1,
      max_tokens: 900,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
    }),
    signal: AbortSignal.timeout(25000),
  });

  if (!res.ok) {
    throw new Error(`upstream ${res.status}: ${(await res.text()).slice(0, 180)}`);
  }
  const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  const content = json.choices?.[0]?.message?.content;
  if (!content) throw new Error('empty completion');
  return content;
}

/**
 * Returns null when no provider is configured or the call fails. The caller
 * keeps its own composition, so the product never depends on a model.
 */
export async function generate(
  question: string,
  lang: Lang,
  context: GatewayContextItem[],
): Promise<GenerateResult | null> {
  const provider = resolveProvider();
  if (!provider) return null;

  const { masked, replaced } =
    provider === 'lora' ? { masked: question, replaced: 0 } : maskPII(question);
  const user = buildUserPrompt(masked, lang, context);
  const system = context.length > 0 ? SYSTEM_PROMPT : GENERAL_SYSTEM_PROMPT;

  try {
    if (provider === 'lora') {
      const base = (process.env.SAATHI_LORA_BASE_URL || 'http://127.0.0.1:8000/v1').replace(/\/$/, '');
      const token = process.env.SAATHI_LORA_TOKEN;
      const text = await chatCompletion(
        `${base}/chat/completions`,
        token ? { authorization: `Bearer ${token}` } : {},
        process.env.SAATHI_LORA_MODEL || 'saathi-lora',
        system,
        user,
      );
      return { provider: 'saathi-lora', text, maskedIdentifiers: replaced };
    }

    if (provider === 'groq') {
      const text = await chatCompletion(
        'https://api.groq.com/openai/v1/chat/completions',
        { authorization: `Bearer ${process.env.GROQ_API_KEY}` },
        process.env.SAATHI_GROQ_MODEL || 'llama-3.3-70b-versatile',
        system,
        user,
      );
      return { provider: 'groq', text, maskedIdentifiers: replaced };
    }

    if (provider === 'openrouter') {
      const text = await chatCompletion(
        'https://openrouter.ai/api/v1/chat/completions',
        { authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`, 'x-title': 'Saathi' },
        process.env.SAATHI_OPENROUTER_MODEL || 'meta-llama/llama-3.3-70b-instruct:free',
        system,
        user,
      );
      return { provider: 'openrouter', text, maskedIdentifiers: replaced };
    }

    const model = process.env.SAATHI_GEMINI_MODEL || 'gemini-2.0-flash';
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: system }] },
          contents: [{ role: 'user', parts: [{ text: user }] }],
          generationConfig: { temperature: 0.1, responseMimeType: 'application/json' },
        }),
        signal: AbortSignal.timeout(25000),
      },
    );
    if (!res.ok) throw new Error(`upstream ${res.status}`);
    const json = (await res.json()) as {
      candidates?: { content?: { parts?: { text?: string }[] } }[];
    };
    const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error('empty completion');
    return { provider: `gemini:${model}`, text, maskedIdentifiers: replaced };
  } catch (error) {
    // A provider failure must never surface to a person in crisis.
    console.error('[gateway] provider failed', provider, error instanceof Error ? error.message : error);
    return null;
  }
}
