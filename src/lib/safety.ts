import type { Severity, TriageFlag } from './types';

/**
 * Deterministic, offline, multilingual. Runs before retrieval so a model can
 * never soften a live-danger signal, and so no text leaves the process.
 */
interface Rule {
  code: string;
  severity: Severity;
  label: { en: string; hi: string; ta: string };
  why: string;
  terms: string[];
}

const RULES: Rule[] = [
  {
    code: 'self_harm',
    severity: 3,
    label: {
      en: 'You may be thinking about ending your life',
      hi: 'आप जीवन खत्म करने के बारे में सोच सकते हैं',
      ta: 'வாழ்க்கையை முடித்துக்கொள்ள நினைக்கலாம்',
    },
    why: 'Crisis routing takes priority over legal information.',
    terms: [
      'suicide', 'kill myself', 'end my life', 'want to die', 'self harm', 'self-harm', 'cutting myself',
      'no reason to live', 'aatmahatya', 'atmahatya', 'आत्महत्या', 'खुद को मार', 'जीना नहीं', 'मरना चाहता',
      'தற்கொலை', 'என்னைக் கொல்ல', 'வாழ வேண்டாம்', 'சாக வேண்டும்',
    ],
  },
  {
    code: 'violence',
    severity: 3,
    label: {
      en: 'Someone has hurt you or is threatening you',
      hi: 'किसी ने चोट पहुंचाई या धमकाया है',
      ta: 'யாரோ தாக்கியுள்ளார் அல்லது மிரட்டுகிறார்',
    },
    why: 'Physical danger needs emergency response before legal steps.',
    terms: [
      'hit me', 'beat me', 'hitting me', 'assault', 'rape', 'raped', 'molest', 'molested', 'sexual abuse',
      'acid', 'threatened to kill', 'threaten me', 'locked me', 'tied me',
      'maara', 'मारा', 'मारपीट', 'बलात्कार', 'छेड़छाड़', 'जान से मार',
      'அடித்தான்', 'தாக்கினார்', 'பாலியல்', 'கொலை மிரட்டல்',
    ],
  },
  {
    code: 'forced_labour',
    severity: 3,
    label: {
      en: 'Someone may be controlling your money or forcing you to beg',
      hi: 'कोई आपका पैसा रोक रहा है या भीख मांगने पर मजबूर कर रहा है',
      ta: 'யாரோ பணத்தைக் கட்டுப்படுத்தி பிச்சைக்குக் கட்டாயப்படுத்துகிறார்',
    },
    why: 'Forced begging and bonded labour are offences under s.18 and Article 23.',
    terms: [
      'forced to beg', 'forced me to beg', 'begging', 'bonded labour', 'bonded', 'trafficked', 'trafficking',
      'takes my money', 'keeps my money', 'my earnings', 'servitude', 'soliciting', 'does not let me leave',
      'bhikh', 'भीख', 'बंधुआ', 'जबरन काम', 'कमाई ले', 'जाने नहीं देता',
      'பிச்சை', 'கட்டாய வேலை', 'பணம் பறிமுதல்', 'விட மாட்டார்',
    ],
  },
  {
    code: 'minor',
    severity: 3,
    label: {
      en: 'You may be under 18',
      hi: 'आप 18 वर्ष से कम हो सकते हैं',
      ta: 'நீங்கள் 18 வயதுக்குக் குறைவாக இருக்கலாம்',
    },
    why: 'A minor routes to child protection (1098), not to adult services.',
    terms: [
      'i am 16', 'i am 15', 'i am 17', 'i am 14', 'under 18', 'minor', 'i am a minor', 'my school',
      'class 10', 'class 9', 'class 11', 'class 12', 'ninth standard', 'tenth standard',
      'nabaalig', 'नाबालिग', 'किशोर', 'सोलह साल', 'सत्रह साल',
      'சிறார்', 'பதினாறு வயது', 'பதினேழு வயது',
    ],
  },
  {
    code: 'homeless_now',
    severity: 3,
    label: {
      en: 'You have no safe place tonight',
      hi: 'आज रात सुरक्षित जगह नहीं है',
      ta: 'இன்று இரவு பாதுகாப்பான இடம் இல்லை',
    },
    why: 'Shelter is time-critical; documents can wait a day.',
    terms: [
      'railway station', 'at the station', 'platform', 'nowhere to sleep', 'nowhere to go', 'no place to stay',
      'slept outside', 'on the street', 'footpath', 'no home', 'thrown out', 'kicked out', 'threw me out',
      'स्टेशन', 'फुटपाथ', 'सड़क पर', 'घर से निकाल', 'रात बिताई',
      'நிலையம்', 'தெருவில்', 'வீட்டை விட்டு', 'இரவு தங்க',
    ],
  },
  {
    code: 'police_custody',
    severity: 2,
    label: {
      en: 'The police are involved and you may be held',
      hi: 'पुलिस शामिल है और आपको हिरासत में रखा जा सकता है',
      ta: 'காவல் துறை ஈடுபட்டுள்ளது; தடுத்து வைக்கப்படலாம்',
    },
    why: 'Custody questions need a lawyer, not an app.',
    terms: [
      'police station', 'custody', 'arrested', 'detained', 'in lockup', 'refused fir', 'no fir',
      'thana', 'पुलिस', 'थाना', 'हिरासत', 'गिरफ्तार', 'एफआईआर',
      'காவல் நிலையம்', 'தடுப்பு', 'கைது',
    ],
  },
  {
    code: 'conversion',
    severity: 2,
    label: {
      en: 'Someone is pushing “treatment” to change you',
      hi: 'कोई आपको बदलने का “इलाज” थोप रहा है',
      ta: 'உங்களை மாற்ற “சிகிச்சை” திணிக்கப்படுகிறது',
    },
    why: 'Conversion practices are professional misconduct under Madras HC guidelines.',
    terms: [
      'conversion therapy', 'cure me', 'cure my', 'fix me', 'make me normal', 'comesh', 'treatment to change',
      'कन्वर्ज़न', 'इलाज कराओ', 'ठीक करो',
      'மாற்று சிகிச்சை', 'சரிசெய்',
    ],
  },
  {
    code: 'medical_emergency',
    severity: 3,
    label: {
      en: 'You may need medical care right now',
      hi: 'आपको अभी इलाज की जरूरत हो सकती है',
      ta: 'இப்போது மருத்துவ உதவி தேவைப்படலாம்',
    },
    why: 'Emergency care cannot be refused; s.3(d) applies at the door.',
    terms: [
      'bleeding', 'cannot breathe', 'overdose', 'unconscious', 'severe pain', 'emergency', 'ambulance',
      'खून', 'सांस नहीं', 'तेज दर्द', 'एम्बुलेंस',
      'இரத்தம்', 'மூச்சு', 'வலி', 'ஆம்புலன்ஸ்',
    ],
  },
];

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Word-boundary match for Latin script, plain containment for Indic scripts. */
function hasTerm(text: string, term: string): boolean {
  const t = term.toLowerCase();
  if (/^[a-z0-9][a-z0-9 '’-]*$/.test(t)) {
    return new RegExp(`(^|[^a-z0-9])${escape(t)}([^a-z0-9]|$)`, 'i').test(text);
  }
  return text.includes(t);
}

export function detectAge(text: string): number | null {
  // Trailing \b is ASCII-only and never closes after a Devanagari or Tamil
  // syllable, so the digit guard is expressed as a lookahead instead.
  const patterns = [
    /\b(?:i am|i'm|im|age|aged|my age is)\s*[:\-]?\s*(\d{1,2})(?![0-9])/i,
    /\b(\d{1,2})\s*(?:years?|yrs?|saal|sal|वर्ष|साल|வயது)(?![0-9])/i,
    /(?:aged?|umr|उम्र|வயது)\s*[:\-]?\s*(\d{1,2})(?![0-9])/i,
  ];
  for (const re of patterns) {
    const m = text.match(re);
    if (m) {
      const n = Number(m[1]);
      if (n >= 8 && n <= 99) return n;
    }
  }
  return null;
}

export interface TriageResult {
  flags: TriageFlag[];
  urgency: Severity;
  crisis: boolean;
  age: number | null;
  minor: boolean;
}

export function triage(raw: string): TriageResult {
  const text = ` ${raw.toLowerCase().replace(/\s+/g, ' ')} `;
  const flags: TriageFlag[] = [];

  for (const rule of RULES) {
    if (rule.terms.some((term) => hasTerm(text, term))) {
      flags.push({ code: rule.code, severity: rule.severity, label: rule.label, why: rule.why });
    }
  }

  const age = detectAge(text);
  const minorByAge = age !== null && age < 18;
  if (minorByAge && !flags.some((f) => f.code === 'minor')) {
    const rule = RULES.find((r) => r.code === 'minor')!;
    flags.push({ code: rule.code, severity: rule.severity, label: rule.label, why: rule.why });
  }

  const minor = minorByAge || flags.some((f) => f.code === 'minor');
  flags.sort((a, b) => b.severity - a.severity);

  const urgency = (flags[0]?.severity ?? 1) as Severity;
  return { flags, urgency, crisis: urgency === 3, age, minor };
}

/** Helplines forced into the answer by a triage code, regardless of the topic. */
export const TRIAGE_HELPLINES: Record<string, string[]> = {
  self_harm: ['telemanas-14416', 'emergency-112'],
  medical_emergency: ['emergency-112'],
  violence: ['emergency-112', 'women-181'],
  minor: ['child-1098'],
  homeless_now: ['child-1098', 'women-181'],
  forced_labour: ['emergency-112', 'child-1098'],
  police_custody: ['legalaid-15100'],
  conversion: ['telemanas-14416', 'legalaid-15100'],
};
