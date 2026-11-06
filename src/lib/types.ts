export type Lang = 'en' | 'hi' | 'ta';

export const LANGS: Lang[] = ['en', 'hi', 'ta'];

/** Publication state of a provision in the corpus. Only `verified` is citable. */
export type ProvisionStatus = 'verified' | 'needs_review' | 'repealed' | 'not_in_force';

export interface Act {
  id: string;
  shortTitle: string;
  longTitle: string;
  number: string;
  year: number;
  jurisdiction: 'central' | 'state';
  ministry?: string;
  officialUrl: string;
  consolidatedAsOn: string;
  source: string;
}

export interface Provision {
  id: string;
  actId: string;
  section: string;
  heading: string;
  /** Verbatim statutory text, or the operative portion of it. */
  body: string;
  /** Lawyer-authored plain-language restatement. Never used as a substitute for `body`. */
  summary: string;
  tags: string[];
  status: ProvisionStatus;
  verifiedOn: string;
  sourceUrl: string;
  inForceFrom?: string;
  amendedBy?: string;
  /** Set only by a named legal reviewer; the UI never claims it otherwise. */
  humanReviewed: boolean;
}

export interface CaseAuthority {
  id: string;
  name: string;
  citation: string;
  court: string;
  year: number;
  holding: string;
  relevance: string;
  sourceUrl: string;
  verifiedOn: string;
}

export interface Topic {
  slug: string;
  title: Record<Lang, string>;
  summary: Record<Lang, string>;
  keywords: string[];
  urgency: 1 | 2 | 3;
  provisionIds: string[];
  caseIds: string[];
  helplineIds: string[];
  /** Caveats the answer must carry. Missing one is a review failure. */
  unsure: Record<Lang, string[]>;
  /** Ordered playbook per language; position sets the step kind in the seeder. */
  steps: Record<Lang, string[]>;
}

export interface PlaybookStep {
  ordinal: number;
  kind: 'now' | 'next' | 'later';
  text: string;
}

export interface Helpline {
  id: string;
  name: Record<Lang, string>;
  number: string;
  altNumber?: string;
  what: string;
  hours: '24x7' | 'office';
  langs: string[];
  sourceUrl: string;
  verifiedOn: string;
  priority: number;
}

export type Severity = 1 | 2 | 3;

export interface TriageFlag {
  code: string;
  severity: Severity;
  label: Record<Lang, string>;
  why: string;
}

export interface Triage {
  urgency: Severity;
  crisis: boolean;
  flags: TriageFlag[];
  age: number | null;
  minor: boolean;
  noticed: string[];
  topics: RetrievedTopic[];
}

export interface RetrievedTopic {
  topic: Topic;
  score: number;
  matched: string[];
}

export interface Citation {
  provisionId: string;
  act: string;
  section: string;
  heading: string;
  verifiedOn: string;
  sourceUrl: string;
  quote: string;
}

export interface RightsPoint {
  text: string;
  citations: Citation[];
  /** True when a sentence survived the citation guard unmodified. */
  grounded: boolean;
}

export interface AnswerHelp {
  id: string;
  name: string;
  number: string;
  altNumber?: string;
  what: string;
  hours: string;
  verifiedOn: string;
}

export interface Answer {
  id: string;
  lang: Lang;
  createdAt: string;
  urgency: Severity;
  crisis: boolean;
  noticed: string[];
  flags: TriageFlag[];
  immediate: string[];
  rights: RightsPoint[];
  steps: PlaybookStep[];
  help: AnswerHelp[];
  unsure: string[];
  model: ModelReport;
  /** How the prose was produced: cited law, model guidance with no law, or the corpus alone. */
  mode: 'grounded' | 'general' | 'extractive';
  corpusAsOn: string;
}

export interface ModelReport {
  provider: string;
  synthesised: boolean;
  droppedCitations: number;
  rejectedClaims: string[];
  note: string;
}

export interface SyncChange {
  id: number;
  runId: number;
  source: string;
  kind: string;
  ref: string;
  summary: string;
  detail: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}
