import { corpus } from '@/lib/data';
import { getMeta } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = await corpus();
    const counts = await db.first<{
      acts: number; provisions: number; topics: number; helplines: number;
      reviewed: number; pending: number;
    }>(`SELECT
         (SELECT COUNT(*) FROM acts) AS acts,
         (SELECT COUNT(*) FROM provisions) AS provisions,
         (SELECT COUNT(*) FROM topics) AS topics,
         (SELECT COUNT(*) FROM helplines) AS helplines,
         (SELECT COUNT(*) FROM provisions WHERE human_reviewed = 1) AS reviewed,
         (SELECT COUNT(*) FROM sync_changes WHERE status = 'pending') AS pending`);

    return Response.json({
      ok: true,
      corpusVersion: await getMeta(db, 'corpus_version'),
      corpusAsOn: await getMeta(db, 'corpus_as_on'),
      counts,
      provider: process.env.SAATHI_MODEL_PROVIDER || 'extractive',
    });
  } catch (error) {
    return Response.json(
      { ok: false, error: error instanceof Error ? error.message : 'db_unavailable' },
      { status: 503 },
    );
  }
}
