import test from 'node:test';
import assert from 'node:assert/strict';
import { TOPICS } from '../src/lib/corpus/topics';
import { PROVISIONS } from '../src/lib/corpus/provisions';
import { HELPLINES } from '../src/lib/corpus/helplines';
import { CASES } from '../src/lib/corpus/cases';
import { ACTS } from '../src/lib/corpus/acts';
import { FAQ, searchFaq, CATEGORY_LABEL } from '../src/lib/faq';

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

test('the corpus covers the situations people actually bring', () => {
  const slugs = new Set(TOPICS.map((t) => t.slug));
  for (const slug of ['hiv-status', 'online-abuse', 'outing', 'banking', 'travel-id', 'detention', 'adoption', 'public-place']) {
    assert.ok(slugs.has(slug), `missing situation: ${slug}`);
  }
  assert.ok(TOPICS.length >= 21, `only ${TOPICS.length} situations`);
});

test('extra situations still hand off to a helpline and cite a provision', () => {
  const extra = TOPICS.filter((t) =>
    ['hiv-status', 'online-abuse', 'outing', 'banking', 'travel-id', 'detention', 'adoption', 'public-place'].includes(t.slug),
  );
  assert.equal(extra.length, 8);
  for (const t of extra) {
    assert.ok(t.provisionIds.length > 0, `${t.slug} cites nothing`);
    assert.ok(t.helplineIds.length > 0, `${t.slug} hands off to nobody`);
  }
});

test('faq entries are unique, substantive and categorised', () => {
  assert.ok(FAQ.length >= 24, `faq has only ${FAQ.length} entries`);
  assert.equal(new Set(FAQ.map((f) => f.id)).size, FAQ.length, 'duplicate faq id');
  for (const f of FAQ) {
    assert.ok(f.q.length > 12, `${f.id} has a stub question`);
    assert.ok(f.a.length > 40, `${f.id} has a stub answer`);
    assert.ok(CATEGORY_LABEL[f.category], `${f.id} has an unknown category`);
  }
});

test('faq search finds an answer by keyword and ignores filler', () => {
  assert.ok(searchFaq(FAQ, 'landlord').length > 0);
  assert.ok(searchFaq(FAQ, '1098').length > 0);
  assert.equal(searchFaq(FAQ, 'zzzznothing').length, 0);
  assert.equal(searchFaq(FAQ, 'a').length, FAQ.length, 'one-letter query should not filter');
});

test('crisis helplines exist and are dialable', () => {
  const byId = new Map(HELPLINES.map((h) => [h.id, h]));
  for (const id of ['emergency-112', 'child-1098', 'legalaid-15100', 'telemanas-14416']) {
    const line = byId.get(id);
    assert.ok(line, `missing ${id}`);
    assert.match(line!.number, /^\d{3,5}$/, `${id} is not a dialable short code`);
  }
});
