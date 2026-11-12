import type { Lang } from './types';

/**
 * Hand-written FAQ. Deliberately short answers that point at a provision or at
 * a human, never at a guess. `q`/`a` are per language; `section` links into the
 * law library search when a specific provision backs the answer.
 */
export type FaqCategory =
  | 'about'
  | 'safety'
  | 'family'
  | 'work'
  | 'papers'
  | 'police'
  | 'health'
  | 'online'
  | 'money';

export interface FaqItem {
  id: string;
  category: FaqCategory;
  q: string;
  a: string;
  /** Section or article label, used to link into /laws?q= */
  section?: string;
}

export const FAQ: FaqItem[] = [
  {
    id: 'is-it-private',
    category: 'about',
    q: 'Is what I type stored anywhere?',
    a: 'No. Saathi has no accounts and writes nothing you type to the database. The answer is built in memory for your request and discarded. Only an anonymous rating, if you press one, is recorded — and it carries no text.',
  },
  {
    id: 'does-it-cost',
    category: 'about',
    q: 'What does Saathi cost?',
    a: 'Nothing. There is no sign-up, no payment, and no premium tier. It is funded as a public-interest project, and the legal aid numbers it gives you are free services too.',
  },
  {
    id: 'not-a-lawyer',
    category: 'about',
    q: 'Can Saathi act as my lawyer?',
    a: 'No. Saathi is legal information, and using it does not create a lawyer–client relationship. For representation, call 15100 and ask for the District Legal Services Authority — legal aid there is free for eligible people.',
    section: 'Article 39A',
  },
  {
    id: 'which-languages',
    category: 'about',
    q: 'Which languages can I use?',
    a: 'English, हिंदी and தமிழ், for both the question and the answer. You can write in Hinglish or transliterated Tamil too, and the keyword matcher will usually still find the right situation.',
  },
  {
    id: 'wrong-answer',
    category: 'about',
    q: 'What if the answer is wrong?',
    a: 'Every right on the page carries the section it came from and the date that section was checked. If the law does not support a claim, press "Wrong" at the bottom — that rating is recorded without your text and is reviewed against the corpus.',
  },
  {
    id: 'age-16-alone',
    category: 'safety',
    q: 'I am 16 and I have nowhere to sleep tonight. What do I do first?',
    a: 'Call 1098. It is free, answered 24 hours, and does not need credit. If you are at a station, ask the station master or a Railway Protection Force post to make the call with you. Do not accept a room from a stranger.',
  },
  {
    id: 'thrown-out',
    category: 'family',
    q: 'My family threw me out because I am transgender. Is that allowed?',
    a: 'A child cannot be separated from family only for being transgender, and an adult has a right of residence. If you are under 18, call 1098. If you are an adult and locked out of the family home, call 15100 and ask about the right of residence.',
    section: '12',
  },
  {
    id: 'family-violence',
    category: 'safety',
    q: 'A family member is hitting me. Can the police help even though it is "family"?',
    a: 'Yes. Violence inside a home is still assault. Call 112, and if you can, get the injury and the date recorded at a hospital. A shelter home can be arranged through 181 or the district administration.',
  },
  {
    id: 'conversion',
    category: 'health',
    q: 'My parents want to send me to a doctor who will "cure" me.',
    a: 'So-called conversion therapy has been called professional misconduct by the Madras High Court and is not a recognised treatment. Refusing it is your right; if you are a minor and being forced, call 1098.',
  },
  {
    id: 'forced-begging',
    category: 'safety',
    q: 'Someone takes my money and makes me beg. Can I get out?',
    a: 'Forced begging is an offence under the transgender law, and holding back someone\u2019s earnings is a form of it. Call 112 if you are being held, then 15100. Do not confront the person alone.',
    section: '18',
  },
  {
    id: 'shelter-refuses',
    category: 'safety',
    q: 'A shelter home refused me a bed.',
    a: 'A shelter run or funded by the state is a public service and cannot refuse you because you are transgender. Ask for the refusal in writing, then call 15100. If it is night and unsafe outside, call 112.',
    section: '3',
  },
  {
    id: 'landlord',
    category: 'family',
    q: 'A landlord refused to rent to me after learning I am transgender.',
    a: 'Refusing to rent, or ending a tenancy, because someone is transgender is specifically covered by the anti-discrimination clause. Ask for the refusal in writing or a message, keep it, and call 15100.',
    section: '3',
  },
  {
    id: 'school-expels',
    category: 'work',
    q: 'My school is pressuring me to leave.',
    a: 'Denial of, or unfair treatment in, education is listed discrimination. Write to the principal asking for the reason in writing, keep the reply, and take it to the district education officer and 15100.',
    section: '3',
  },
  {
    id: 'fired',
    category: 'work',
    q: 'I was fired after my employer found out.',
    a: 'Termination from employment on the ground of being transgender is listed discrimination. Keep the termination letter, any messages, and salary slips. Call 15100 the same week — delay makes wage claims harder.',
    section: '3',
  },
  {
    id: 'unpaid-wages',
    category: 'work',
    q: 'My employer is not paying my wages.',
    a: 'The transgender law makes it an offence to force someone to work without pay, and wage claims can also go to the labour commissioner. Keep a record of days worked and call 15100.',
    section: '10',
  },
  {
    id: 'police-refuse-fir',
    category: 'police',
    q: 'The police station refuses to register my complaint.',
    a: 'You are entitled to have a complaint recorded. Ask for the officer\u2019s name and the station diary number, and say you want the refusal noted. Then call 15100 or write to the Superintendent of Police.',
  },
  {
    id: 'police-out-me',
    category: 'police',
    q: 'Can the police tell my family I am transgender?',
    a: 'Disclosing your identity to people who are not part of the case is a privacy intrusion and can put you at risk. Say clearly, at the station, that you do not consent to disclosure. If it happens anyway, record it and call 15100.',
    section: 'Article 21',
  },
  {
    id: 'detained',
    category: 'police',
    q: 'I am being held at a police station. What are my rights?',
    a: 'You must be told the grounds, allowed a lawyer, and produced before a magistrate. Call 15100 and say "I am in custody" — free legal aid is a constitutional entitlement, and the Supreme Court can be moved directly for its enforcement.',
    section: 'Article 32',
  },
  {
    id: 'id-card',
    category: 'papers',
    q: 'How do I get a transgender identity card?',
    a: 'Apply to the District Magistrate with the prescribed form; a certificate from a medical board is now part of the process after the 2026 amendment. The certificate is what unlocks the welfare entitlements. 15100 can tell you the local office.',
  },
  {
    id: 'no-documents',
    category: 'papers',
    q: 'I have no documents at all. Where do I start?',
    a: 'Start with a birth certificate or a school record, then an Aadhaar enrolment, then the transgender certificate. A legal aid lawyer can file for what is missing; 15100 will route you. Do not pay an agent.',
  },
  {
    id: 'hospital-refuses',
    category: 'health',
    q: 'A hospital refused to treat me.',
    a: 'Denial of healthcare services is listed discrimination under the transgender law. Ask for the refusal in writing, complain to the medical superintendent, and call 15100 if treatment is still being withheld.',
    section: '3',
  },
  {
    id: 'hiv',
    category: 'health',
    q: 'Can a clinic tell my employer about my HIV status?',
    a: 'Your health information is yours to disclose. Refusing care because of HIV status is discrimination, though the specific HIV Act is not yet in this corpus — a legal aid lawyer can read those sections with you.',
    section: '21',
  },
  {
    id: 'mental-health',
    category: 'health',
    q: 'I am not okay and I need to talk to someone tonight.',
    a: 'Call 14416 (Tele-MANAS). It is free, runs 24 hours, and has language support. If you are in immediate danger, call 112 instead.',
  },
  {
    id: 'images-leaked',
    category: 'online',
    q: 'Someone is sharing my private pictures.',
    a: 'Do not delete the chat. Screenshot the profile, the link and the date, report it on the platform and at cybercrime.gov.in or 1930, and tell one person you trust. This is an offence, not something you have to live with.',
  },
  {
    id: 'threats-online',
    category: 'online',
    q: 'Someone online is threatening to out me.',
    a: 'Save the messages before blocking. Threatening to disclose identity to extract something is blackmail; report it to the platform and to cybercrime.gov.in, and call 15100 if you need help drafting the complaint.',
  },
  {
    id: 'bank-refuses',
    category: 'money',
    q: 'A bank refused to open my account.',
    a: 'A refusal based only on your gender identity is discrimination in the supply of services. Ask for it in writing, escalate to the bank\u2019s nodal officer, then the RBI Ombudsman. 15100 can help with the letter.',
    section: '3',
  },
  {
    id: 'legal-aid-cost',
    category: 'about',
    q: 'Does legal aid cost anything?',
    a: 'No. Legal aid through NALSA and the District Legal Services Authorities is free, and free representation is a constitutional directive. Call 15100 and ask for the DLSA in your district.',
    section: 'Article 39A',
  },
  {
    id: 'law-updates',
    category: 'about',
    q: 'How do I know the law here is current?',
    a: 'Every provision shows the date it was checked against India Code, and the law library shows a live sync status from the official portal. When a new amendment appears, it is staged for review before Saathi can cite it.',
  },
];

export const CATEGORY_LABEL: Record<FaqCategory, string> = {
  about: 'About Saathi',
  safety: 'Staying safe',
  family: 'Family and home',
  work: 'School and work',
  papers: 'Documents',
  police: 'Police',
  health: 'Health',
  online: 'Online',
  money: 'Money',
};

/** Grouped order for the filter bar — safety first, housekeeping last. */
export const CATEGORY_ORDER: FaqCategory[] = [
  'safety',
  'family',
  'police',
  'work',
  'papers',
  'health',
  'online',
  'money',
  'about',
];

export function faqFor(category: FaqCategory | 'all'): FaqItem[] {
  return category === 'all' ? FAQ : FAQ.filter((f) => f.category === category);
}

/** Tiny client-side scorer so the FAQ works without a server round trip. */
export function searchFaq(items: FaqItem[], query: string): FaqItem[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return items;
  const words = q.split(/\s+/).filter((w) => w.length > 2);
  return items
    .map((item) => {
      const hay = `${item.q} ${item.a} ${item.category}`.toLowerCase();
      let score = 0;
      for (const w of words) if (hay.includes(w)) score += w.length;
      if (item.q.toLowerCase().includes(q)) score += 20;
      return { item, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.item);
}

export const FAQ_COUNT = FAQ.length;

/** Used by the tests to keep every answer in a language the site offers. */
export const FAQ_LANGS: Lang[] = ['en'];
