import test, { before } from 'node:test';
import assert from 'node:assert/strict';
import { rmSync } from 'node:fs';
import { ensureSchema, type Db } from '../src/lib/db';
import { seedCorpus } from '../src/lib/seed';
import { answerQuestion } from '../src/lib/answer';

process.env.SAATHI_DB_PATH = '.data/test-saathi.sqlite';

let db: Db;

before(async () => {
  for (const suffix of ['', '-wal', '-shm']) {
    rmSync(`.data/test-saathi.sqlite${suffix}`, { force: true });
  }
  db = await ensureSchema();
  await seedCorpus(true);
});

test('a minor at a station gets crisis routing, rights and a handoff', async () => {
  const answer = await answerQuestion(
    db,
    'My family threw me out because I am trans, I am 16 and at a railway station with no money.',
    { lang: 'en', useModel: false },
  );

  assert.equal(answer.urgency, 3);
  assert.equal(answer.crisis, true);
  assert.ok(answer.immediate.length > 0, 'no immediate action');
  assert.ok(answer.rights.length > 0, 'no rights retrieved');
  assert.ok(answer.rights.every((r) => r.citations.length > 0), 'uncited right');
  assert.ok(answer.help.some((h) => h.number === '1098'), 'child helpline missing');
  assert.ok(answer.steps.length >= 3, 'no playbook');
  assert.equal(answer.model.provider, 'extractive');
  assert.equal(answer.model.synthesised, false);
  assert.match(answer.corpusAsOn, /^\d{4}-\d{2}-\d{2}$/);
});

test('the same situation answers in Hindi with Hindi steps', async () => {
  const answer = await answerQuestion(db, 'मेरे परिवार ने मुझे घर से निकाल दिया, मैं 16 साल का हूं', {
    lang: 'hi',
    useModel: false,
  });
  assert.equal(answer.lang, 'hi');
  assert.ok(answer.rights.length > 0);
  assert.ok(answer.steps.some((s) => /[\u0900-\u097F]/.test(s.text)), 'Hindi steps missing');
});

test('an ordinary housing refusal is not treated as a crisis', async () => {
  const answer = await answerQuestion(
    db,
    'My landlord refused to rent to me because I am transgender and would not return my deposit.',
    { lang: 'en', useModel: false },
  );
  assert.equal(answer.crisis, false);
  assert.ok(answer.rights.some((r) => r.citations.some((c) => c.section === '3')));
});

test('an unsupported question still hands off to legal aid', async () => {
  const answer = await answerQuestion(db, 'How do I register a company in Karnataka?', {
    lang: 'en',
    useModel: false,
  });
  assert.ok(answer.help.some((h) => h.number === '15100'), 'legal aid must always be reachable');
});

test('no question text is persisted', async () => {
  const rows = await db.all<{ n: number }>('SELECT COUNT(*) AS n FROM events');
  assert.ok(rows[0].n > 0, 'events should record that an answer happened');
  const cols = await db.all<{ name: string }>('PRAGMA table_info(events)');
  assert.equal(cols.some((c) => /text|question|body/i.test(c.name)), false);
});
