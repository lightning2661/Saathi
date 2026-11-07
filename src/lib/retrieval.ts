import type { Provision, RetrievedTopic, Topic } from './types';

/**
 * Lexical retrieval, not embeddings: the corpus is small and the query never
 * leaves the process, which is the whole privacy claim. Curated keyword lists
 * carry the synonym work that a vector index would otherwise do.
 */
const STOP = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'if', 'of', 'in', 'on', 'at', 'to', 'for', 'with', 'is', 'am', 'are',
  'was', 'were', 'be', 'been', 'being', 'i', 'me', 'my', 'we', 'our', 'you', 'your', 'he', 'she', 'they',
  'them', 'it', 'this', 'that', 'these', 'those', 'do', 'does', 'did', 'can', 'could', 'will', 'would',
  'have', 'has', 'had', 'not', 'no', 'so', 'as', 'by', 'from', 'about', 'because', 'what', 'how', 'when',
  'who', 'why', 'there', 'here', 'just', 'very', 'please', 'help', 'want', 'need',
]);

export function normalize(input: string): string {
  return input.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim();
}

export function tokenize(input: string): string[] {
  return normalize(input)
    .split(' ')
    .filter((t) => t.length > 1 && !STOP.has(t));
}

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function hasTerm(haystack: string, term: string): boolean {
  const t = normalize(term);
  if (!t) return false;
  if (/^[a-z0-9 ]+$/.test(t)) {
    return new RegExp(`(^|[^a-z0-9])${escape(t)}([^a-z0-9]|$)`, 'i').test(haystack);
  }
  return haystack.includes(t);
}

/**
 * Score = keyword hits (length-weighted) + token overlap with the authored
 * title/summary. Keyword evidence dominates so a single strong colloquialism
 * ("ghar se nikal diya") outranks incidental overlap.
 */
export function retrieveTopics(text: string, topics: Topic[], limit = 3): RetrievedTopic[] {
  const haystack = normalize(text);
  const tokens = new Set(tokenize(text));

  const scored = topics.map((topic) => {
    let score = 0;
    const matched: string[] = [];

    for (const keyword of topic.keywords) {
      if (hasTerm(haystack, keyword)) {
        score += 1 + Math.min(1.5, normalize(keyword).split(' ').length * 0.4);
        matched.push(keyword);
      }
    }

    const authored = new Set(
      tokenize(`${topic.title.en} ${topic.title.hi} ${topic.title.ta} ${topic.summary.en} ${topic.slug}`),
    );
    for (const token of tokens) {
      if (authored.has(token)) score += 0.35;
    }

    // Crisis topics win ties: a misroute toward information is worse than one toward help.
    score += topic.urgency * 0.05;

    return { topic, score: Number(score.toFixed(3)), matched };
  });

  return scored
    .filter((s) => s.score > 0.3)
    .sort((a, b) => b.score - a.score || b.topic.urgency - a.topic.urgency)
    .slice(0, limit);
}

/** Union of the top topics' provisions, first topic first, de-duplicated. */
export function pickProvisions<P extends Provision>(
  retrieved: RetrievedTopic[],
  all: P[],
  cap = 6,
): P[] {
  const byId = new Map(all.map((p) => [p.id, p]));
  const out: P[] = [];
  const seen = new Set<string>();

  for (const { topic } of retrieved) {
    for (const id of topic.provisionIds) {
      if (seen.has(id)) continue;
      const p = byId.get(id);
      if (!p) continue;
      seen.add(id);
      out.push(p);
      if (out.length >= cap) return out;
    }
  }
  return out;
}

/** Direct statutory matches, used when no topic clears the threshold. */
export function searchProvisions<P extends Provision>(text: string, all: P[], cap = 4): P[] {
  const haystack = normalize(text);
  const tokens = tokenize(text);
  const scored = all.map((p) => {
    let score = 0;
    for (const token of tokens) {
      if (normalize(`${p.heading} ${p.summary} ${p.tags}`).includes(token)) score += 1;
    }
    if (hasTerm(haystack, p.heading)) score += 2;
    return { p, score };
  });
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, cap)
    .map((s) => s.p);
}
