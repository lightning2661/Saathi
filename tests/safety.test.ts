import test from 'node:test';
import assert from 'node:assert/strict';
import { triage, detectAge } from '../src/lib/safety';

const codes = (text: string) => triage(text).flags.map((f) => f.code);

test('a minor alone at a station is escalated, not indexed', () => {
  const t = triage('My family threw me out because I am trans. I am 16 and sitting at a railway station.');
  assert.equal(t.urgency, 3);
  assert.equal(t.crisis, true);
  assert.equal(t.minor, true);
  assert.ok(codes('I am 16 and at a railway station').includes('minor'));
});

test('suicidal ideation routes to crisis before anything else', () => {
  const t = triage('I want to die, I cannot go on like this');
  assert.equal(t.urgency, 3);
  assert.ok(t.flags.some((f) => f.code === 'self_harm'));
  assert.equal(t.flags[0].severity, 3);
});

test('ordinary discrimination does not raise a false crisis', () => {
  const t = triage('A landlord in Pune refused to rent me a room after he found out I am transgender.');
  assert.equal(t.crisis, false);
  assert.equal(t.urgency, 1);
});

test('forced begging is detected in Hindi', () => {
  const t = triage('वे मुझे भीख मांगने पर मजबूर करते हैं और मेरी कमाई ले लेते हैं');
  assert.ok(t.flags.some((f) => f.code === 'forced_labour'));
  assert.equal(t.urgency, 3);
});

test('Tamil transport is handled', () => {
  const t = triage('என்னை ஒருவர் பணத்தை எடுத்துக்கொண்டு பிச்சை எடுக்கக் கட்டாயப்படுத்துகிறார்');
  assert.ok(t.flags.some((f) => f.code === 'forced_labour'));
});

test('age extraction reads common phrasings', () => {
  assert.equal(detectAge('i am 15'), 15);
  assert.equal(detectAge('I am 17 years old and in class 12'), 17);
  assert.equal(detectAge('मेरी उम्र 16 साल है'), 16);
  assert.equal(detectAge('I am 24 and working'), 24);
  assert.equal(detectAge('no age here'), null);
});

test('"minority" is not read as "minor"', () => {
  const t = triage('I belong to a religious minority group and need a lawyer');
  assert.equal(t.minor, false);
});
