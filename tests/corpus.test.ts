import test from 'node:test';
import assert from 'node:assert/strict';
import { TOPICS } from '../src/lib/corpus/topics';
import { PROVISIONS } from '../src/lib/corpus/provisions';
import { HELPLINES } from '../src/lib/corpus/helplines';
import { CASES } from '../src/lib/corpus/cases';
import { ACTS } from '../src/lib/corpus/acts';

const ids = <T extends { id: string }>(rows: T[]) => new Set(rows.map((r) => r.id));

test('every topic cites provisions that exist and are citable', () => {
  const citable = new Map(PROVISIONS.map((p) => [p.id, p]));
  for (const topic of TOPICS) {
    assert.ok(topic.provisionIds.length > 0, `${topic.slug} has no provisions`);
    for (const id of topic.provisionIds) {
      const provision = citable.get(id);
      assert.ok(provision, `${topic.slug} cites missing provision ${id}`);
      assert.equal(provision!.status, 'verified', `${id} is not verified but is citable`);
      assert.ok(provision!.sourceUrl.startsWith('https://'), `${id} has no source`);
    }
  }
});

test('every topic resolves its helplines and cases', () => {
  const helplines = ids(HELPLINES);
  const cases = ids(CASES);
  for (const topic of TOPICS) {
    assert.ok(topic.helplineIds.length > 0, `${topic.slug} hands off to nobody`);
    for (const h of topic.helplineIds) assert.ok(helplines.has(h), `${topic.slug} → missing ${h}`);
    for (const c of topic.caseIds) assert.ok(cases.has(c), `${topic.slug} → missing case ${c}`);
  }
});

test('playbooks and caveats are authored in all three languages', () => {
  for (const topic of TOPICS) {
    for (const lang of ['en', 'hi', 'ta'] as const) {
      assert.ok(topic.title[lang].length > 3, `${topic.slug} missing ${lang} title`);
      assert.ok(topic.summary[lang].length > 10, `${topic.slug} missing ${lang} summary`);
      assert.ok((topic.steps[lang] ?? []).length >= 3, `${topic.slug} has a short ${lang} playbook`);
      assert.ok((topic.unsure[lang] ?? []).length >= 1, `${topic.slug} has no ${lang} caveat`);
    }
  }
});

test('identifiers are unique across the corpus', () => {
  assert.equal(new Set(TOPICS.map((t) => t.slug)).size, TOPICS.length);
  assert.equal(new Set(PROVISIONS.map((p) => p.id)).size, PROVISIONS.length);
  assert.equal(new Set(HELPLINES.map((h) => h.id)).size, HELPLINES.length);
  assert.equal(new Set(CASES.map((c) => c.id)).size, CASES.length);
  assert.equal(new Set(ACTS.map((a) => a.id)).size, ACTS.length);
});

test('provision metadata is complete', () => {
  const actIds = ids(ACTS);
  for (const p of PROVISIONS) {
    assert.ok(actIds.has(p.actId), `${p.id} references unknown act ${p.actId}`);
    assert.match(p.verifiedOn, /^\d{4}-\d{2}-\d{2}$/, `${p.id} has an unparseable checked date`);
    assert.ok(p.body.length > 40, `${p.id} has no statutory text`);
    assert.ok(p.summary.length > 30, `${p.id} has no plain-language summary`);
    assert.equal(typeof p.humanReviewed, 'boolean');
  }
});

test('crisis helplines exist and are dialable', () => {
  const byId = new Map(HELPLINES.map((h) => [h.id, h]));
  for (const id of ['emergency-112', 'child-1098', 'legalaid-15100', 'telemanas-14416']) {
    const line = byId.get(id);
    assert.ok(line, `missing ${id}`);
    assert.match(line!.number, /^\d{3,5}$/, `${id} is not a dialable short code`);
  }
});
