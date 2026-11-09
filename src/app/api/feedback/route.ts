import { corpus } from '@/lib/data';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const RATINGS = new Set(['helpful', 'wrong', 'unsafe', 'too_vague']);
const TOPICS = new Set(['thrown-out', 'minor-alone', 'forced-begging', 'violence', 'mental-health', 'identity-docs', 'shelter', 'housing', 'healthcare', 'school', 'workplace', 'police', 'couple', 'none']);

/**
 * Note is optional and capped. People should not have to file a second copy of
 * their situation to say the answer was wrong, so the default path is flags only.
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'invalid_json' }, { status: 400 });
  }

  const { rating, topic, lang, flags, note } = (body ?? {}) as Record<string, unknown>;

  if (typeof rating !== 'string' || !RATINGS.has(rating)) {
    return Response.json({ error: 'bad_rating' }, { status: 400 });
  }

  const safeTopic = typeof topic === 'string' && TOPICS.has(topic) ? topic : 'none';
  const safeLang = typeof lang === 'string' && ['en', 'hi', 'ta'].includes(lang) ? lang : 'en';
  const safeFlags = Array.isArray(flags)
    ? flags.filter((f): f is string => typeof f === 'string').slice(0, 6).join(',')
    : '';
  const safeNote = typeof note === 'string' ? note.trim().slice(0, 400) : '';

  const db = await corpus();
  await db.run(
    'INSERT INTO feedback (id, created_at, topic, lang, rating, flags, note) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [crypto.randomUUID(), new Date().toISOString(), safeTopic, safeLang, rating, safeFlags, safeNote],
  );

  return Response.json({ ok: true }, { headers: { 'cache-control': 'no-store' } });
}
