import { corpus } from '@/lib/data';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Polled by LiveUpdates. Deliberately small and cache-free: it reports what the
 * sync pipeline has actually seen, never a prediction about the law.
 */
export async function GET() {
  try {
    const db = await corpus();
    const [sources, runs, pending, totals] = await Promise.all([
      db.all<{ source: string; status: string; checked_at: string | null; detail: string }>(
        'SELECT source, status, checked_at, detail FROM source_state ORDER BY source',
      ),
      db.all<{ id: number; source: string; status: string; fetched: number; changed: number; finished_at: string | null }>(
        'SELECT id, source, status, fetched, changed, finished_at FROM sync_runs ORDER BY id DESC LIMIT 6',
      ),
      db.first<{ n: number }>(`SELECT COUNT(*) AS n FROM sync_changes WHERE status = 'pending'`),
      db.first<{ provisions: number; topics: number; reviewed: number }>(
        `SELECT (SELECT COUNT(*) FROM provisions) AS provisions,
                (SELECT COUNT(*) FROM topics) AS topics,
                (SELECT COUNT(*) FROM provisions WHERE human_reviewed = 1) AS reviewed`,
      ),
    ]);

    return Response.json(
      {
        ok: true,
        at: new Date().toISOString(),
        sources,
        runs,
        pending: Number(pending?.n ?? 0),
        totals,
      },
      { headers: { 'cache-control': 'no-store' } },
    );
  } catch (error) {
    return Response.json(
      { ok: false, error: error instanceof Error ? error.message : 'unavailable' },
      { status: 503, headers: { 'cache-control': 'no-store' } },
    );
  }
}
