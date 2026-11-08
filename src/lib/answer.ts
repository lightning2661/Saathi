import type { Db } from './db';
import { getMeta } from './db';
import { triage, TRIAGE_HELPLINES } from './safety';
import { pickProvisions, retrieveTopics, searchProvisions, normalize } from './retrieval';
import { generate, type GatewayContextItem } from './gateway';
import { CORPUS_AS_ON } from './corpus/topics';
import type {
  Answer, AnswerHelp, Citation, Lang, PlaybookStep, Provision, RightsPoint, Severity,
} from './types';

type CitableProvision = Provision & { actTitle: string };

interface ProvisionRow {
  id: string; act_id: string; section: string; heading: string; body: string; summary: string;
  tags: string; status: string; verified_on: string; source_url: string;
  in_force_from: string | null; amended_by: string | null; human_reviewed: number; act_title: string;
}

const MAX_RIGHTS = 6;

const IMMEDIATE: Record<string, Record<Lang, string>> = {
  self_harm: {
    en: 'Call 14416 (Tele-MANAS) now — free, 24 hours, in your language. If you have a plan and the means, call 112 or go to the nearest government hospital emergency.',
    hi: 'अभी 14416 (टेली-मानस) पर कॉल करें — मुफ्त, 24 घंटे, आपकी भाषा में। योजना और साधन है तो 112 पर कॉल करें या नज़दीकी सरकारी अस्पताल की इमरजेंसी जाएं।',
    ta: 'இப்போதே 14416 (டெலி-மானஸ்) அழைக்கவும் — இலவசம், 24 மணி நேரம், உங்கள் மொழியில். திட்டமும் வழியும் இருந்தால் 112 அழைக்கவும் அல்லது அரசு மருத்துவமனை அவசர பிரிவுக்குச் செல்லுங்கள்.',
  },
  violence: {
    en: 'Call 112 and get to a government hospital within 24 hours for a medical examination. Ask for the wound certificate and the medico-legal report copy.',
    hi: '112 पर कॉल करें और 24 घंटे में सरकारी अस्पताल जाकर मेडिकल जांच कराएं। घाव प्रमाणपत्र और मेडिको-लीगल रिपोर्ट की कॉपी मांगें।',
    ta: '112 அழைத்து, 24 மணி நேரத்தில் அரசு மருத்துவமனையில் பரிசோதனை செய்யுங்கள். காயச் சான்று, மருத்துவ-சட்ட அறிக்கை நகல் கேளுங்கள்.',
  },
  forced_labour: {
    en: 'If you are being held or watched, call 112 when you can speak safely. Forced begging and bonded labour are offences under section 18 and Article 23.',
    hi: 'रोका या देखा जा रहा है तो सुरक्षित बोल सकें तब 112 पर कॉल करें। जबरन भीख और बंधुआ श्रम धारा 18 और अनुच्छेद 23 के तहत अपराध हैं।',
    ta: 'தடுத்து வைக்கப்பட்டாலோ கண்காணிக்கப்பட்டாலோ, பாதுகாப்பாகப் பேச முடிந்ததும் 112 அழைக்கவும். கட்டாய பிச்சை, கட்டாய வேலை பிரிவு 18, சட்டப்பிரிவு 23 கீழ் குற்றம்.',
  },
  minor: {
    en: 'Call 1098 now. It is free, 24 hours, and works without credit. If you are at a station, ask the station master or an RPF post to call with you.',
    hi: 'अभी 1098 पर कॉल करें। मुफ्त, 24 घंटे, बिना बैलेंस। स्टेशन पर हैं तो स्टेशन मास्टर या RPF चौकी से साथ में कॉल कराएं।',
    ta: 'இப்போதே 1098 அழைக்கவும். இலவசம், 24 மணி நேரம், பேலன்ஸ் தேவையில்லை. நிலையத்தில் இருந்தால் நிலைய மேலாளர் அல்லது RPF பதிவிடத்தில் உங்களுடன் அழைக்கச் சொல்லுங்கள்.',
  },
  homeless_now: {
    en: 'Find a lit, crowded place and stay there. Call 1098 if you are under 18, or 181 for a shelter referral. Do not accept a room from a stranger tonight.',
    hi: 'रोशनी और भीड़ वाली जगह पर रहें। 18 से कम उम्र में 1098, आश्रय के लिए 181 पर कॉल करें। आज रात किसी अजनबी का कमरा न लें।',
    ta: 'வெளிச்சமும் கூட்டமும் உள்ள இடத்தில் இருங்கள். 18 வயதுக்குக் குறைவு எனில் 1098, தங்குமிடத்துக்கு 181. இன்று இரவு அந்நியரின் அறையை ஏற்க வேண்டாம்.',
  },
  police_custody: {
    en: 'Say this clearly: “I want to call a lawyer.” Call 15100 or 112 if you can reach a phone. Do not sign anything you cannot read.',
    hi: 'साफ कहें: “मुझे वकील से बात करनी है।” फोन मिले तो 15100 या 112 पर कॉल करें। जो पढ़ न सकें, उस पर हस्ताक्षर न करें।',
    ta: 'தெளிவாகச் சொல்லுங்கள்: “வழக்கறிஞரை அழைக்க வேண்டும்.” ஃபோன் கிடைத்தால் 15100 அல்லது 112 அழைக்கவும். படிக்க முடியாததில் கையெழுத்திட வேண்டாம்.',
  },
  conversion: {
    en: 'You can refuse. Say no in writing and keep the message. Call 15100 — in Tamil Nadu the Madras High Court guidelines against conversion practices apply directly.',
    hi: 'आप मना कर सकते हैं। लिखित में ना कहें और संदेश सहेजें। 15100 पर कॉल करें — तमिलनाडु में मद्रास उच्च न्यायालय के दिशानिर्देश सीधे लागू हैं।',
    ta: 'மறுக்கலாம். எழுத்தில் வேண்டாம் என்று சொல்லி செய்தியை வைத்திருங்கள். 15100 அழைக்கவும் — தமிழ்நாட்டில் உயர் நீதிமன்ற வழிகாட்டுதல்கள் நேரடியாகப் பொருந்தும்.',
  },
  medical_emergency: {
    en: 'Call 112 or go to the nearest government hospital now. Emergency care cannot be refused because you are transgender — section 3(d) applies at the door.',
    hi: 'अभी 112 पर कॉल करें या नज़दीकी सरकारी अस्पताल जाएं। ट्रांसजेंडर होने पर इमरजेंसी इलाज से मना नहीं किया जा सकता — धारा 3(d) दरवाज़े पर ही लागू है।',
    ta: 'இப்போதே 112 அழைக்கவும் அல்லது அருகிலுள்ள அரசு மருத்துவமனைக்குச் செல்லுங்கள். டிரான்ஸ் என்பதால் அவசர சிகிச்சையை மறுக்க முடியாது — பிரிவு 3(d) நுழைவிலேயே பொருந்தும்.',
  },
};

/** Used when nothing was retrieved: still a plan, still a person to call. */
const GENERIC_STEPS: Record<Lang, PlaybookStep[]> = {
  en: [
    { ordinal: 1, kind: 'now', text: 'Write down what happened, with the date, the place and who was involved. A note on your phone is enough.' },
    { ordinal: 2, kind: 'next', text: 'Call 15100 and ask for the District Legal Services Authority. Free legal aid does not depend on income proof in every state, so ask.' },
    { ordinal: 3, kind: 'later', text: 'Ask any institution involved for its complaint officer in writing. A written request creates a record you can use.' },
  ],
  hi: [
    { ordinal: 1, kind: 'now', text: 'जो हुआ उसे तारीख, जगह और कौन शामिल था — लिख लें। फोन में नोट काफी है।' },
    { ordinal: 2, kind: 'next', text: '15100 पर कॉल करें और जिला विधिक सेवा प्राधिकरण से बात करें। हर राज्य में आय प्रमाण जरूरी नहीं, इसलिए पूछें।' },
    { ordinal: 3, kind: 'later', text: 'संबंधित संस्था से लिखित में शिकायत अधिकारी का नाम मांगें। लिखित अनुरोध आपका रिकॉर्ड बनता है।' },
  ],
  ta: [
    { ordinal: 1, kind: 'now', text: 'நடந்ததைத் தேதி, இடம், யார் ஈடுபட்டனர் என்பதுடன் எழுதுங்கள். ஃபோனில் ஒரு குறிப்பு போதும்.' },
    { ordinal: 2, kind: 'next', text: '15100 அழைத்து மாவட்ட சட்ட சேவை ஆணையத்தைக் கேளுங்கள். எல்லா மாநிலங்களிலும் வருமானச் சான்று கட்டாயம் இல்லை; கேளுங்கள்.' },
    { ordinal: 3, kind: 'later', text: 'தொடர்புடைய நிறுவனத்திடம் புகார் அதிகாரியின் பெயரை எழுத்தில் கேளுங்கள். எழுத்துப் பதிவே உங்கள் ஆதாரம்.' },
  ],
};

const GENERIC_UNSURE: Record<Lang, string> = {
  en: 'Saathi has no verified provision for this exact question, so this is navigation rather than law. A legal aid lawyer on 15100 can confirm what applies.',
  hi: 'इस सटीक प्रश्न के लिए साथी के पास सत्यापित धारा नहीं है, इसलिए यह कानून नहीं बल्कि रास्ता है। 15100 पर विधिक सहायता वकील पुष्टि कर सकता है।',
  ta: 'இந்தக் கேள்விக்கு சரிபார்க்கப்பட்ட பிரிவு இல்லை; எனவே இது சட்டம் அல்ல, வழிகாட்டல். 15100 சட்ட உதவி வழக்கறிஞர் உறுதி செய்வார்.',
};

const FLAG_ORDER = [
  'self_harm', 'medical_emergency', 'violence', 'forced_labour', 'minor', 'homeless_now', 'police_custody', 'conversion',
];

function toProvision(row: ProvisionRow): CitableProvision {
  return {
    id: row.id,
    actId: row.act_id,
    section: row.section,
    heading: row.heading,
    body: row.body,
    summary: row.summary,
    tags: row.tags ? row.tags.split(',') : [],
    status: 'verified',
    verifiedOn: row.verified_on,
    sourceUrl: row.source_url,
    inForceFrom: row.in_force_from ?? undefined,
    amendedBy: row.amended_by ?? undefined,
    humanReviewed: row.human_reviewed === 1,
    actTitle: row.act_title,
  };
}

const cite = (p: CitableProvision): Citation => ({
  provisionId: p.id,
  act: p.actTitle,
  section: p.section,
  heading: p.heading,
  verifiedOn: p.verifiedOn,
  sourceUrl: p.sourceUrl,
  quote: p.body,
});

/** Numeric core of a section label: '2(k)' → '2', 'Article 21' → '21'. */
const sectionCore = (s: string) => (s.match(/\d+[A-Za-z]?/)?.[0] ?? s).toUpperCase();

const SECTION_CLAIM = /(?:section|sec\.?|s\.|§|धारा|பிரிவு)\s*([0-9]{1,3}[A-Za-z]?)/gi;

export interface GuardResult {
  rights: RightsPoint[];
  steps: PlaybookStep[];
  immediate: string[];
  unsure: string[];
  dropped: number;
  rejected: string[];
}

/**
 * The only path by which model text reaches a person. Anything uncited,
 * mis-cited, or quoting a section outside the retrieved context is discarded.
 */
export interface GuardOptions {
  /** `general` forbids any legal assertion because no provision was retrieved. */
  mode?: 'grounded' | 'general';
}

export function guardOutput(
  raw: string,
  context: CitableProvision[],
  lang: Lang,
  fallbackSteps: PlaybookStep[],
  options: GuardOptions = {},
): GuardResult | null {
  const general = options.mode === 'general';
  let parsed: unknown;
  try {
    const cleaned = raw.replace(/^```(?:json)?/i, '').replace(/```$/, '').trim();
    parsed = JSON.parse(cleaned);
  } catch {
    return null;
  }
  if (!parsed || typeof parsed !== 'object') return null;

  const obj = parsed as Record<string, unknown>;
  const allowedSections = new Set(context.map((p) => sectionCore(p.section)));
  const rejected: string[] = [];
  let dropped = 0;

  const str = (v: unknown): string => (typeof v === 'string' ? v.trim() : '');

  const acceptText = (text: string): string | null => {
    if (!text || text.length > 420) return null;
    if (/\b(guaranteed|will definitely win|100%|promise you)\b/i.test(text)) {
      rejected.push(text);
      return null;
    }
    const claims = [...text.matchAll(SECTION_CLAIM)];
    for (const claim of claims) {
      const core = claim[1].toUpperCase();
      if (!allowedSections.has(core)) {
        rejected.push(text);
        return null;
      }
    }
    return text;
  };

  const rights: RightsPoint[] = [];
  const rawRights = Array.isArray(obj.rights) ? obj.rights : [];
  for (const item of rawRights.slice(0, MAX_RIGHTS)) {
    if (!item || typeof item !== 'object') continue;
    const rec = item as Record<string, unknown>;
    if (general) {
      dropped += 1;
      rejected.push(str(rec.text));
      continue;
    }
    const text = acceptText(str(rec.text));
    if (!text) {
      dropped += 1;
      continue;
    }
    const cites = Array.isArray(rec.cites) ? rec.cites.map(Number).filter((n) => Number.isInteger(n)) : [];
    const resolved = cites
      .map((i) => context[i - 1])
      .filter((p): p is CitableProvision => Boolean(p));
    dropped += Math.max(0, cites.length - resolved.length);
    if (resolved.length === 0) {
      dropped += 1;
      rejected.push(text);
      continue;
    }
    rights.push({ text, citations: resolved.map(cite), grounded: true });
  }

  const steps: PlaybookStep[] = [];
  const rawSteps = Array.isArray(obj.steps) ? obj.steps : [];
  rawSteps.slice(0, 6).forEach((item, i) => {
    const text = acceptText(str((item as Record<string, unknown>)?.text));
    if (text) steps.push({ ordinal: i + 1, kind: i === 0 ? 'now' : 'later', text });
  });

  const immediate = (Array.isArray(obj.immediate) ? obj.immediate : [])
    .map((i) => acceptText(str((i as Record<string, unknown>)?.text)))
    .filter((t): t is string => Boolean(t))
    .slice(0, 3);

  const unsure = (Array.isArray(obj.unsure) ? obj.unsure : [])
    .map((i) => str(i))
    .filter((t) => t.length > 0 && t.length < 300)
    .slice(0, 3);

  // Grounded answers need at least one cited right; general answers need a plan.
  if (!general && rights.length === 0) return null;
  if (general && steps.length === 0 && unsure.length === 0) return null;

  return { rights, steps: steps.length ? steps : fallbackSteps, immediate, unsure, dropped, rejected };
}

export interface AskOptions {
  useModel: boolean;
  lang: Lang;
}

export async function answerQuestion(db: Db, question: string, opts: AskOptions): Promise<Answer> {
  const { lang } = opts;
  const tri = triage(question);

  const rows = await db.all<ProvisionRow>(
    `SELECT p.*, a.short_title AS act_title
       FROM provisions p JOIN acts a ON a.id = p.act_id
      WHERE p.status = 'verified'`,
  );
  const corpus = rows.map(toProvision);

  let retrieved = retrieveTopics(question, await loadTopics(db));
  let provisions = pickProvisions(retrieved, corpus);

  if (provisions.length === 0) {
    provisions = searchProvisions(question, corpus);
  }

  const primary = retrieved[0]?.topic;
  const slug = primary?.slug ?? '';

  const immediate: string[] = [];
  for (const code of FLAG_ORDER) {
    if (tri.flags.some((f) => f.code === code) && IMMEDIATE[code]) {
      immediate.push(IMMEDIATE[code][lang]);
    }
  }

  const rights: RightsPoint[] = provisions.map((p) => ({
    text: p.summary,
    citations: [cite(p)],
    grounded: true,
  }));

  const steps = await loadSteps(db, slug, lang);
  const unsure = await loadUnsure(db, slug, lang);
  const help = await loadHelplines(db, slug, tri.flags.map((f) => f.code), lang);

  let report: Answer['model'] = {
    provider: 'extractive',
    synthesised: false,
    droppedCitations: 0,
    rejectedClaims: [],
    note:
      'Composed from verified provisions by the retrieval engine. No model was called and nothing you typed left this device.',
  };

  let finalImmediate = immediate;
  let finalRights = rights;
  let finalSteps = steps;
  let finalUnsure = unsure;

  let mode: Answer['mode'] = 'extractive';

  if (opts.useModel) {
    const context: GatewayContextItem[] = provisions.map((p, i) => ({
      index: i + 1,
      citation: cite(p),
      summary: p.summary,
    }));
    const result = await generate(question, lang, context);
    if (result) {
      const guarded = guardOutput(
        result.text,
        provisions,
        lang,
        steps.length ? steps : GENERIC_STEPS[lang],
        { mode: provisions.length ? 'grounded' : 'general' },
      );
      if (guarded) {
        mode = provisions.length ? 'grounded' : 'general';
        finalRights = guarded.rights;
        finalSteps = guarded.steps;
        finalImmediate = guarded.immediate.length ? guarded.immediate : immediate;
        finalUnsure = guarded.unsure.length ? [...guarded.unsure, ...unsure].slice(0, 3) : unsure;
        report = {
          provider: result.provider,
          synthesised: true,
          droppedCitations: guarded.dropped,
          rejectedClaims: guarded.rejected.slice(0, 5),
          note:
            result.maskedIdentifiers > 0
              ? `Written by ${result.provider} from the retrieved provisions only. ${result.maskedIdentifiers} identifying detail(s) were masked before sending.`
              : `Written by ${result.provider} from the retrieved provisions only.`,
        };
      } else {
        report = {
          ...report,
          provider: result.provider,
          note: `${result.provider} returned an answer that failed citation checks, so the verified extractive answer was kept instead.`,
        };
      }
    }
  }

  if (mode === 'extractive' && finalSteps.length === 0) {
    finalSteps = GENERIC_STEPS[lang];
    finalUnsure = [...finalUnsure, GENERIC_UNSURE[lang]].slice(0, 3);
  }

  const noticed = [
    ...tri.flags.map((f) => f.label[lang]),
    ...retrieved.slice(0, 2).map((r) => r.topic.title[lang]),
  ].filter((v, i, a) => a.indexOf(v) === i).slice(0, 3);

  const answer: Answer = {
    id: crypto.randomUUID(),
    lang,
    createdAt: new Date().toISOString(),
    urgency: tri.urgency as Severity,
    crisis: tri.crisis,
    noticed,
    flags: tri.flags,
    immediate: finalImmediate,
    rights: finalRights,
    steps: finalSteps,
    help,
    unsure: finalUnsure,
    model: report,
    mode,
    corpusAsOn: (await getMeta(db, 'corpus_as_on')) ?? CORPUS_AS_ON,
  };

  await db.run(
    'INSERT INTO events (id, created_at, kind, topic, lang, provider, dropped) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [answer.id, answer.createdAt, 'ask', slug, lang, report.provider, report.droppedCitations],
  );

  return answer;
}

async function loadTopics(db: Db) {
  const { TOPICS } = await import('./corpus/topics');
  const known = new Set((await db.all<{ slug: string }>('SELECT slug FROM topics')).map((r) => r.slug));
  // Corpus rows are seeded from the same modules; this guards against a partial seed.
  return TOPICS.filter((t) => known.has(t.slug));
}

async function loadSteps(db: Db, slug: string, lang: Lang): Promise<PlaybookStep[]> {
  if (!slug) return [];
  const rows = await db.all<{ ordinal: number; kind: string; text: string }>(
    'SELECT ordinal, kind, text FROM steps WHERE topic_slug = ? AND lang = ? ORDER BY ordinal',
    [slug, lang],
  );
  if (rows.length === 0) {
    const fallback = await db.all<{ ordinal: number; kind: string; text: string }>(
      'SELECT ordinal, kind, text FROM steps WHERE topic_slug = ? AND lang = ? ORDER BY ordinal',
      [slug, 'en'],
    );
    return fallback.map((r) => ({ ordinal: r.ordinal, kind: r.kind as PlaybookStep['kind'], text: r.text }));
  }
  return rows.map((r) => ({ ordinal: r.ordinal, kind: r.kind as PlaybookStep['kind'], text: r.text }));
}

async function loadUnsure(db: Db, slug: string, lang: Lang): Promise<string[]> {
  if (!slug) return [];
  const pick = async (l: string) =>
    (await db.all<{ text: string }>('SELECT text FROM unsure WHERE topic_slug = ? AND lang = ? ORDER BY ordinal', [slug, l]))
      .map((r) => r.text);
  const rows = await pick(lang);
  return rows.length ? rows : pick('en');
}

async function loadHelplines(db: Db, slug: string, flags: string[], lang: Lang): Promise<AnswerHelp[]> {
  const forced = flags.flatMap((f) => TRIAGE_HELPLINES[f] ?? []);
  const rows = await db.all<{
    id: string; name_en: string; name_hi: string; name_ta: string; number: string;
    alt_number: string | null; what: string; hours: string; verified_on: string; priority: number;
  }>(
    `SELECT DISTINCT h.* FROM helplines h
       LEFT JOIN helpline_topics ht ON ht.helpline_id = h.id
      WHERE ht.topic_slug = ? OR h.id IN (${forced.length ? forced.map(() => '?').join(',') : "''"})`,
    [slug, ...forced],
  );

  const nameKey = `name_${lang}` as 'name_en' | 'name_hi' | 'name_ta';
  return rows
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 4)
    .map((h) => ({
      id: h.id,
      name: h[nameKey],
      number: h.number,
      altNumber: h.alt_number ?? undefined,
      what: h.what,
      hours: h.hours,
      verifiedOn: h.verified_on,
    }));
}

/** Test surface: exposed so the guard can be checked without a database. */
export const __internal = { sectionCore, cite, MAX_RIGHTS, normalize };
