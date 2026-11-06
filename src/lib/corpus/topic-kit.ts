import type { Lang, Topic } from '../types';

/** [en, hi, ta] → per-language record. */
export const tri = (v: [string, string, string]): Record<Lang, string> => ({
  en: v[0],
  hi: v[1],
  ta: v[2],
});

export const list = (v: [string[], string[], string[]]): Record<Lang, string[]> => ({
  en: v[0],
  hi: v[1],
  ta: v[2],
});

type TopicInput = Omit<Topic, 'title' | 'summary' | 'unsure' | 'steps'> & {
  title: [string, string, string];
  summary: [string, string, string];
  unsure: [string[], string[], string[]];
  steps: [string[], string[], string[]];
};

export const T = (t: TopicInput): Topic => ({
  ...t,
  title: tri(t.title),
  summary: tri(t.summary),
  unsure: list(t.unsure),
  steps: list(t.steps),
});
