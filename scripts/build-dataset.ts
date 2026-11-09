import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { PROVISIONS } from '../src/lib/corpus/provisions';
import { TOPICS } from '../src/lib/corpus/topics';
import { ACTS } from '../src/lib/corpus/acts';
import { SYSTEM_PROMPT, buildUserPrompt, type GatewayContextItem } from '../src/lib/gateway';
import type { Citation, Lang } from '../src/lib/types';

/**
 * Training pairs are generated from the reviewed corpus, not written by hand,
 * so a LoRA adapter learns the same shape the guard validates at inference:
 * numbered context in, cited JSON out. Anything the corpus cannot support is
 * emitted as an abstention example instead.
 */
const LANGS: Lang[] = ['en', 'hi', 'ta'];
const OUT = join(process.cwd(), 'data', 'lora');

const actTitle = (id: string) => ACTS.find((a) => a.id === id)?.shortTitle ?? id;

function contextFor(topicSlug: string): GatewayContextItem[] {
  const topic = TOPICS.find((t) => t.slug === topicSlug);
  if (!topic) return [];
  return topic.provisionIds
    .map((id) => PROVISIONS.find((p) => p.id === id))
    .filter((p): p is (typeof PROVISIONS)[number] => Boolean(p) && p!.status === 'verified')
    .map((p, i) => ({
      index: i + 1,
      summary: p.summary,
      citation: {
        provisionId: p.id,
        act: actTitle(p.actId),
        section: p.section,
        heading: p.heading,
        verifiedOn: p.verifiedOn,
        sourceUrl: p.sourceUrl,
        quote: p.body,
      } satisfies Citation,
    }));
}

interface Row {
  messages: { role: 'system' | 'user' | 'assistant'; content: string }[];
  meta: { topic: string; lang: Lang; kind: 'grounded' | 'abstain' };
}

function grounded(topicSlug: string, lang: Lang): Row {
  const topic = TOPICS.find((t) => t.slug === topicSlug)!;
  const ctx = contextFor(topicSlug);
  const steps = topic.steps[lang].map((text, i) => ({ text, ordinal: i + 1 }));

  const target = {
    // Immediate action is produced by the deterministic triage layer, not the model.
    immediate: [],
    rights: ctx.slice(0, 4).map((c) => ({ text: c.summary, cites: [c.index] })),
    steps: steps.map((s) => ({ text: s.text })),
    unsure: topic.unsure[lang].slice(0, 2),
  };

  return {
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: buildUserPrompt(topic.summary[lang], lang, ctx) },
      { role: 'assistant', content: JSON.stringify(target) },
    ],
    meta: { topic: topicSlug, lang, kind: 'grounded' },
  };
}

/** Abstention: context exists but does not answer the question. */
function abstain(lang: Lang): Row {
  const ctx = contextFor('identity-docs');
  const question =
    lang === 'hi'
      ? 'क्या मुझे सरकारी नौकरी में आरक्षण मिलेगा और कितने प्रतिशत?'
      : lang === 'ta'
        ? 'அரசு வேலையில் எனக்கு எத்தனை சதவீத இடஒதுக்கீடு கிடைக்கும்?'
        : 'How many reservation percentage points do I get in a government job?';

  const target = {
    immediate: [],
    rights: [{ text: 'The provisions here do not set a reservation percentage for transgender persons.', cites: [1] }],
    steps: [],
    unsure: [
      lang === 'hi'
        ? 'ओबीसी/ईडब्ल्यूएस आरक्षण का दावा ट्रांसजेंडर अधिनियम से नहीं आता; यह एक अलग नीति प्रश्न है।'
        : lang === 'ta'
          ? 'இடஒதுக்கீட்டு சதவீதம் டிரான்ஸ் சட்டத்தில் இல்லை; இது தனிக் கொள்கை கேள்வி.'
          : 'A reservation percentage is not set by the Transgender Persons Act. That is a separate policy question for a lawyer or the department.',
    ],
  };

  return {
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: buildUserPrompt(question, lang, ctx) },
      { role: 'assistant', content: JSON.stringify(target) },
    ],
    meta: { topic: 'identity-docs', lang, kind: 'abstain' },
  };
}

function main() {
  mkdirSync(OUT, { recursive: true });

  const rows: Row[] = [];
  TOPICS.forEach((topic) => {
    LANGS.forEach((lang) => rows.push(grounded(topic.slug, lang)));
  });
  LANGS.forEach((lang) => rows.push(abstain(lang)));

  const train: Row[] = [];
  const evalSet: Row[] = [];
  rows.forEach((row, i) => {
    // Every fourth row is held out, stratified by topic so each playbook appears.
    if (i % 4 === 3) evalSet.push(row);
    else train.push(row);
  });

  const write = (name: string, data: Row[]) =>
    writeFileSync(join(OUT, name), data.map((r) => JSON.stringify(r)).join('\n') + '\n', 'utf8');

  write('train.jsonl', train);
  write('eval.jsonl', evalSet);

  const kinds = new Map<string, number>();
  for (const r of rows) kinds.set(r.meta.kind, (kinds.get(r.meta.kind) ?? 0) + 1);

  console.log(`train ${train.length} · eval ${evalSet.length} · topics ${TOPICS.length}`);
  console.log(Object.fromEntries(kinds));
  console.log(`written to ${OUT}`);
}

main();
