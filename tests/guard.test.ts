import test from 'node:test';
import assert from 'node:assert/strict';
import { guardOutput } from '../src/lib/answer';
import { PROVISIONS } from '../src/lib/corpus/provisions';
import { ACTS } from '../src/lib/corpus/acts';
import type { Provision } from '../src/lib/types';

/** Index order is the guard's contract: context[1] is cites:[1]. */
const CONTEXT_IDS = ['tpa-12', 'tpa-18', 'tpa-3'];
const actTitle = (id: string) => ACTS.find((a) => a.id === id)!.shortTitle;
const context = CONTEXT_IDS.map((id) => {
  const p = PROVISIONS.find((row) => row.id === id)!;
  return { ...p, actTitle: actTitle(p.actId) };
}) as (Provision & { actTitle: string })[];

const fallbackSteps = [{ ordinal: 1, kind: 'now' as const, text: 'Call 1098.' }];

const payload = (rights: unknown[]) =>
  JSON.stringify({ immediate: [], rights, steps: [{ text: 'Call 15100 for legal aid.' }], unsure: [] });

test('accepts a cited claim and resolves the citation', () => {
  const out = guardOutput(
    payload([{ text: 'A child cannot be separated from family only for being transgender.', cites: [1] }]),
    context,
    'en',
    fallbackSteps,
  );
  assert.ok(out);
  assert.equal(out!.rights.length, 1);
  assert.equal(out!.rights[0].citations[0].section, '12');
  assert.equal(out!.dropped, 0);
});

test('rejects a claim whose citation index does not exist', () => {
  const out = guardOutput(
    payload([{ text: 'You are entitled to a government flat within 90 days.', cites: [7] }]),
    context,
    'en',
    fallbackSteps,
  );
  assert.equal(out, null, 'an uncitable answer must fall back to the extractive one');
});

test('rejects a section number that was never retrieved', () => {
  const out = guardOutput(
    payload([{ text: 'Under section 33 you can claim compensation immediately.', cites: [1] }]),
    context,
    'en',
    fallbackSteps,
  );
  assert.equal(out, null);
});

test('accepts a section number that is in context', () => {
  const out = guardOutput(
    payload([{ text: 'Section 12 gives you a right to live in the family household.', cites: [1] }]),
    context,
    'en',
    fallbackSteps,
  );
  assert.ok(out);
});

test('drops outcome promises', () => {
  const out = guardOutput(
    payload([
      { text: 'You are guaranteed to win this case.', cites: [1] },
      { text: 'Section 3 prohibits discrimination in housing.', cites: [3] },
    ]),
    context,
    'en',
    fallbackSteps,
  );
  assert.ok(out);
  assert.equal(out!.rights.length, 1);
  assert.equal(out!.rejected.length, 1);
});

test('keeps only the valid half of a mixed answer', () => {
  const out = guardOutput(
    payload([
      { text: 'Forcing someone out of the house is an offence under section 18.', cites: [2] },
      { text: 'The police must give you a job.', cites: [] },
    ]),
    context,
    'en',
    fallbackSteps,
  );
  assert.ok(out);
  assert.equal(out!.rights.length, 1);
  assert.ok(out!.dropped >= 1);
});

test('malformed output falls back instead of throwing', () => {
  for (const raw of ['not json', '{"rights": "nope"}', '[]', '```json\n{"rights":[]}\n```']) {
    const out = guardOutput(raw as string, context, 'en', fallbackSteps);
    assert.equal(out, null, `unexpected accept for ${raw.slice(0, 20)}`);
  }
});
