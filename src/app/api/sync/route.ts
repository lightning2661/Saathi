import { corpus } from '@/lib/data';
import { runSync } from '@/lib/sync';
import { isOperator } from '@/lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/**
 * Called by POST from the admin console or a scheduled job:
 *   curl -X POST /api/sync -H "authorization: Bearer $TOKEN"
 * Nothing here edits legal text; new listings are staged for review.
 */
export async function POST(req: Request) {
  if (!isOperator(req)) {
    return Response.json({ error: 'unauthorized' }, { status: 401 });
  }

  const url = new URL(req.url);
  const only = url.searchParams.get('source') ?? undefined;

  try {
    const db = await corpus();
    const results = await runSync(db, only);
    return Response.json({ ok: true, results }, { headers: { 'cache-control': 'no-store' } });
  } catch (error) {
    console.error('[sync] failed', error instanceof Error ? error.message : error);
    return Response.json({ error: 'sync_failed' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  if (!isOperator(req)) return Response.json({ error: 'unauthorized' }, { status: 401 });
  const db = await corpus();
  const rows = await db.all('SELECT * FROM sync_runs ORDER BY id DESC LIMIT 20');
  return Response.json({ runs: rows }, { headers: { 'cache-control': 'no-store' } });
}
