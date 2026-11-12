import type { Topic } from '../types';
import { CRISIS_TOPICS } from './topic-sets/crisis';
import { ACCESS_TOPICS } from './topic-sets/access';
import { RIGHTS_TOPICS } from './topic-sets/rights';
import { MORE_TOPICS } from './topic-sets/more';

/** Order is deliberate: crisis topics are retrieved and ranked first on ties. */
export const TOPICS: Topic[] = [
  ...CRISIS_TOPICS,
  ...ACCESS_TOPICS,
  ...RIGHTS_TOPICS,
  ...MORE_TOPICS,
];

export const CORPUS_AS_ON = '2026-11-12';

/** Bump when corpus content changes so the seeder re-runs on boot. */
export const CORPUS_VERSION = '2026.11.12-1';

export function topicBySlug(slug: string): Topic | undefined {
  return TOPICS.find((t) => t.slug === slug);
}
