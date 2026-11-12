'use client';

import { useState, type CSSProperties } from 'react';
import type { Answer } from '@/lib/types';
import { actShort, sectionLabel } from '@/lib/format';

const SECTION_TITLE: Record<string, string> = {
  immediate: 'Do this now',
  rights: 'Your rights',
  steps: 'Next steps',
  help: 'Who can help',
  unsure: 'Not sure about',
};

const LEVEL: Record<number, { label: string; fill: string }> = {
  1: { label: 'information', fill: '30%' },
  2: { label: 'get help soon', fill: '62%' },
  3: { label: 'urgent', fill: '100%' },
};

const MODE_LABEL: Record<Answer['mode'], string> = {
  grounded: 'cited law',
  general: 'no citation — guidance only',
  extractive: 'corpus only',
};

interface Props {
  answer: Answer;
  onRate?: (rating: string) => void;
  rated?: string | null;
}

export function AnswerView({ answer, onRate, rated }: Props) {
  const l = answer.lang;
  const [copied, setCopied] = useState(false);
  const t = (en: string, hi: string, ta: string) => (l === 'hi' ? hi : l === 'ta' ? ta : en);
  const level = LEVEL[answer.urgency] ?? LEVEL[1];

  async function copyPlan() {
    const lines = [
      ...answer.immediate.map((x) => `NOW: ${x}`),
      ...answer.rights.map(
        (r) => `RIGHT: ${r.text} [${r.citations.map((c) => `${sectionLabel(c.section)} ${actShort(c.act)}`).join(', ')}]`,
      ),
      ...answer.steps.map((s) => `STEP: ${s.text}`),
      ...answer.help.map((h) => `CALL: ${h.number} — ${h.name}`),
      ...answer.unsure.map((u) => `NOTE: ${u}`),
    ].join('\n');
    try {
      await navigator.clipboard.writeText(lines);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  }

  return (
    <article className="answer" aria-live="polite">
      <div className="meter" data-level={answer.urgency}>
        <span>{level.label}</span>
        <div className="meter-track">
          <span style={{ '--fill': level.fill } as CSSProperties} />
        </div>
        <span>{MODE_LABEL[answer.mode]}</span>
      </div>

      {answer.crisis && answer.immediate.length > 0 && (
        <div className="crisis">
          <h2>{t('Immediate action', 'तुरंत करें', 'உடனே செய்யுங்கள்')}</h2>
          <ol>
            {answer.immediate.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ol>
          <div className="btn-row" style={{ marginTop: '0.85rem' }}>
            <a className="btn btn--danger btn--sm" href="tel:112">
              {t('Call 112', '112 पर कॉल', '112 அழைக்க')}
            </a>
            <a className="btn btn--sm" href="tel:1098">
              1098
            </a>
            <a className="btn btn--sm" href="tel:15100">
              15100
            </a>
          </div>
        </div>
      )}

      {!answer.crisis && answer.immediate.length > 0 && (
        <section className="answer-section">
          <h2>{SECTION_TITLE.immediate}</h2>
          <ol className="steps">
            {answer.immediate.map((line, i) => (
              <li key={i} data-kind="now">
                {line}
              </li>
            ))}
          </ol>
        </section>
      )}

      {answer.noticed.length > 0 && (
        <section className="answer-section">
          <h2>{t('What Saathi noticed', 'साथी ने क्या देखा', 'சாதி கவனித்தது')}</h2>
          <div className="chips" style={{ marginTop: 0 }}>
            {answer.noticed.map((n) => (
              <span className="badge badge--warn" key={n}>
                {n}
              </span>
            ))}
          </div>
        </section>
      )}

      <section className="answer-section">
        <h2>{SECTION_TITLE.rights}</h2>
        {answer.rights.map((point, i) => (
          <div className="rights-item" key={i}>
            <p>{point.text}</p>
            <div className="cite-row">
              {point.citations.map((c) => (
                <a
                  className="cite"
                  key={c.provisionId}
                  href={`/laws/${c.provisionId}`}
                  title={`${c.act}, ${sectionLabel(c.section)} — checked ${c.verifiedOn}`}
                >
                  {sectionLabel(c.section)} · {actShort(c.act)} · {c.verifiedOn}
                </a>
              ))}
            </div>
            {point.citations[0] && (
              <details style={{ marginTop: '0.5rem' }}>
                <summary style={{ cursor: 'pointer', fontSize: '0.8rem', color: 'var(--ink-3)' }}>
                  {t('Read the provision', 'धारा पढ़ें', 'பிரிவைப் படிக்க')}
                </summary>
                <blockquote className="quote">
                  {point.citations[0].quote.length > 700
                    ? `${point.citations[0].quote.slice(0, 700)}…`
                    : point.citations[0].quote}
                </blockquote>
                <p className="model-note" style={{ marginTop: '0.5rem' }}>
                  {point.citations[0].heading} · {point.citations[0].act}
                </p>
              </details>
            )}
          </div>
        ))}
        {answer.rights.length === 0 && (
          <p className="notice">
            {t(
              'No verified provision in the library answers this one. Saathi will not invent a section — a legal aid lawyer can read the situation.',
              'इसका उत्तर देने वाली सत्यापित धारा संग्रह में नहीं है। साथी धारा नहीं गढ़ेगा — विधिक सहायता वकील स्थिति देख सकते हैं।',
              'இதற்குப் பதில் தரும் சரிபார்க்கப்பட்ட பிரிவு தொகுப்பில் இல்லை. சாதி பிரிவைக் கற்பனை செய்யாது — சட்ட உதவி வழக்கறிஞர் பார்க்கலாம்.',
            )}
          </p>
        )}
      </section>

      {answer.steps.length > 0 && (
        <section className="answer-section">
          <h2>{SECTION_TITLE.steps}</h2>
          <ol className="steps">
            {answer.steps.map((s) => (
              <li key={s.ordinal} data-kind={s.kind}>
                {s.text}
              </li>
            ))}
          </ol>
        </section>
      )}

      {answer.help.length > 0 && (
        <section className="answer-section">
          <h2>{SECTION_TITLE.help}</h2>
          {answer.help.map((h) => (
            <div className="helpline-item" key={h.id}>
              <a className="num" href={`tel:${h.number}`}>
                {h.number}
              </a>
              <span className="what">
                <strong style={{ color: 'var(--ink)' }}>{h.name}</strong>
                <br />
                {h.what}
              </span>
              <span className="badge">{h.hours}</span>
            </div>
          ))}
        </section>
      )}

      {answer.unsure.length > 0 && (
        <section className="answer-section">
          <h2>{SECTION_TITLE.unsure}</h2>
          <ul>
            {answer.unsure.map((u, i) => (
              <li key={i}>{u}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="answer-section">
        <div className="notice">
          <strong>
            {t('This is information, not legal advice.', 'यह जानकारी है, कानूनी सलाह नहीं।', 'இது தகவல்; சட்ட ஆலோசனை அல்ல.')}
          </strong>{' '}
          {t(
            'Every rule above carries its source and the date it was checked. A legal aid lawyer can confirm it for your case.',
            'ऊपर का हर नियम अपने स्रोत और जांच की तारीख के साथ है। विधिक सहायता वकील आपके मामले के लिए पुष्टि कर सकते हैं।',
            'மேலே உள்ள ஒவ்வொரு விதியும் அதன் ஆதாரம், சரிபார்ப்புத் தேதியுடன் உள்ளது. சட்ட உதவி வழக்கறிஞர் உங்கள் வழக்குக்கு உறுதி செய்வார்.',
          )}
        </div>

        <div className="btn-row" style={{ marginTop: '0.9rem' }}>
          <button className="btn btn--sm" onClick={copyPlan} type="button">
            {copied
              ? t('Copied', 'कॉपी हुआ', 'நகலெடுக்கப்பட்டது')
              : t('Copy this plan', 'यह योजना कॉपी करें', 'இந்தத் திட்டத்தை நகலெடு')}
          </button>
          <a className="btn btn--sm" href="/laws">
            {t('Open the law', 'कानून देखें', 'சட்டத்தைப் பார்க்க')}
          </a>
        </div>

        <p className="model-note" style={{ marginTop: '0.85rem' }}>
          corpus {answer.corpusAsOn} · {answer.model.provider} · {MODE_LABEL[answer.mode]} · dropped{' '}
          {answer.model.droppedCitations} citation(s) · {answer.model.note}
        </p>

        {answer.model.rejectedClaims.length > 0 && (
          <details>
            <summary style={{ cursor: 'pointer', fontSize: '0.76rem', color: 'var(--ink-3)' }}>
              {answer.model.rejectedClaims.length} claim(s) removed by the citation guard
            </summary>
            <ul className="model-note">
              {answer.model.rejectedClaims.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </details>
        )}
      </section>

      {onRate && (
        <div className="btn-row" style={{ borderTop: '1px solid var(--rule)', paddingTop: '1rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--ink-3)' }}>
            {t('Was this useful?', 'क्या यह उपयोगी था?', 'இது பயனுள்ளதாக இருந்ததா?')}
          </span>
          {[
            ['helpful', t('Yes', 'हां', 'ஆம்')],
            ['too_vague', t('Too vague', 'बहुत अस्पष्ट', 'தெளிவில்லை')],
            ['wrong', t('Wrong', 'गलत', 'தவறு')],
            ['unsafe', t('Unsafe', 'असुरक्षित', 'பாதுகாப்பற்றது')],
          ].map(([key, label]) => (
            <button
              key={key}
              className="btn btn--sm"
              disabled={Boolean(rated)}
              onClick={() => onRate(key)}
              style={rated === key ? { borderColor: 'var(--seal)', color: 'var(--seal)' } : undefined}
            >
              {label}
            </button>
          ))}
          {rated && (
            <span style={{ fontSize: '0.76rem', color: 'var(--verify)' }}>
              {t('Recorded. Thank you.', 'दर्ज हुआ। धन्यवाद।', 'பதிவு செய்யப்பட்டது. நன்றி.')}
            </span>
          )}
        </div>
      )}
    </article>
  );
}
