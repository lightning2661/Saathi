import type { Db } from './db';
import { fetchIndiaCode, INDIACODE_QUERIES, type SourceItem } from './sources/indiacode';
import { fetchEgazette } from './sources/egazette';
import { fetchDataGovIn } from './sources/datagovin';

/**
 * Law sync is a detection pipeline, never an editor. It pulls official
 * listings, hashes them, and stages anything new for a human to verify.
 * A provision's `status` changes only through an explicit review action.
 */
export interface Adapter {
  name: string;
  label: string;
  run(): Promise<{ items: SourceItem[]; note: string }>;
}

const WATCH = [
  'transgender', 'hijra', 'third gender', 'lgbt', 'lgbtq', 'queer', 'sexual orientation', 'sexuality',
  'gender identity', 'nalsa', 'discrimination', 'identity certificate', 'intersex', 'same-sex',
];

export const isRelevant = (title: string): boolean => {
  const t = title.toLowerCase();
  return WATCH.some((w) => t.includes(w));
};

export const ADAPTERS: Adapter[] = [
  {
    name: 'indiacode',
    label: 'India Code (official portal, DSpace API)',
    async run() {
      const items: SourceItem[] = [];
      const failures: string[] = [];
      for (const query of INDIACODE_QUERIES) {
        try {
          items.push(...(await fetchIndiaCode(query)));
        } catch (error) {
          failures.push(`${query}: ${error instanceof Error ? error.message : 'failed'}`);
        }
      }
      const unique = dedupe(items);
      return {
        items: unique,
        note: `${unique.length} metadata records; ${failures.length} query failure(s)${failures.length ? ` — ${failures[0]}` : ''}`,
      };
    },
  },
  {
    name: 'egazette',
    label: 'eGazette of India (listing scan)',
    async run() {
      const items = dedupe(await fetchEgazette());
      return {
        items,
        note: items.length
          ? `${items.length} gazette documents linked from the listing page`
          : 'listing page returned no /WriteReadData/ links; parser may need updating',
      };
    },
  },
  {
    name: 'data.gov.in',
    label: 'data.gov.in (open data catalog)',
    async run() {
      const key = process.env.DATA_GOV_IN_API_KEY;
      if (!key) return { items: [], note: 'unconfigured: set DATA_GOV_IN_API_KEY to enable' };
      const items = dedupe(await fetchDataGovIn(key));
      return { items, note: `${items.length} catalog records` };
    },
  },
];

/** FNV-1a — cheap, stable, and identical across node and workerd. */
export function fingerprint(input: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return `${h.toString(16)}-${input.length.toString(16)}`;
}

function dedupe(items: SourceItem[]): SourceItem[] {
  const seen = new Set<string>();
  return items.filter((i) => {
    const k = `${i.source}|${i.ref}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

export interface RunResult {
  source: string;
  status: 'ok' | 'error' | 'empty';
  fetched: number;
  changed: number;
  note: string;
}

export async function runSync(db: Db, only?: string): Promise<RunResult[]> {
  const results: RunResult[] = [];

  for (const adapter of ADAPTERS) {
    if (only && adapter.name !== only) continue;

    const startedAt = new Date().toISOString();
    const insert = await db.first<{ id: number }>(
      'SELECT last_insert_rowid() AS id',
    );
    void insert;

    await db.run(
      'INSERT INTO sync_runs (source, started_at, status, detail) VALUES (?, ?, ?, ?)',
      [adapter.name, startedAt, 'running', ''],
    );
    const runRow = await db.first<{ id: number }>(
      'SELECT id FROM sync_runs WHERE source = ? ORDER BY id DESC LIMIT 1',
      [adapter.name],
    );
    const runId = runRow?.id ?? 0;

    try {
      const { items, note } = await adapter.run();
      const relevant = items.filter((i) => isRelevant(i.title));
      const list = relevant.length ? relevant : items.slice(0, 0);

      const hash = fingerprint(list.map((i) => `${i.ref}|${i.title}`).sort().join('\n'));
      const prev = await db.first<{ doc_hash: string | null }>(
        'SELECT doc_hash FROM source_state WHERE source = ?',
        [adapter.name],
      );

      let changed = 0;
      if (prev?.doc_hash !== hash) {
        for (const item of list) {
          const fp = fingerprint(`${item.source}|${item.ref}|${item.title}`);
          const exists = await db.first<{ id: number }>(
            'SELECT id FROM sync_changes WHERE fingerprint = ?',
            [fp],
          );
          if (exists) continue;
          await db.run(
            `INSERT INTO sync_changes (run_id, source, kind, ref, summary, detail, fingerprint, status, created_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', ?)`,
            [
              runId, item.source, item.kind, item.ref,
              item.title, JSON.stringify({ url: item.url, publishedAt: item.publishedAt ?? null }),
              fp, new Date().toISOString(),
            ],
          );
          changed += 1;
        }
      }

      await db.run(
        `INSERT INTO source_state (source, doc_hash, checked_at, status, detail)
         VALUES (?, ?, ?, ?, ?)
         ON CONFLICT(source) DO UPDATE SET doc_hash = excluded.doc_hash,
           checked_at = excluded.checked_at, status = excluded.status, detail = excluded.detail`,
        [adapter.name, hash, new Date().toISOString(), list.length ? 'ok' : 'empty', note],
      );

      await db.run(
        'UPDATE sync_runs SET finished_at = ?, status = ?, fetched = ?, changed = ?, detail = ? WHERE id = ?',
        [new Date().toISOString(), list.length ? 'ok' : 'empty', list.length, changed, note, runId],
      );

      results.push({ source: adapter.name, status: list.length ? 'ok' : 'empty', fetched: list.length, changed, note });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'unknown failure';
      await db.run(
        'UPDATE sync_runs SET finished_at = ?, status = ?, detail = ? WHERE id = ?',
        [new Date().toISOString(), 'error', message, runId],
      );
      await db.run(
        `INSERT INTO source_state (source, checked_at, status, detail) VALUES (?, ?, 'error', ?)
         ON CONFLICT(source) DO UPDATE SET checked_at = excluded.checked_at,
           status = excluded.status, detail = excluded.detail`,
        [adapter.name, new Date().toISOString(), message],
      );
      results.push({ source: adapter.name, status: 'error', fetched: 0, changed: 0, note: message });
    }
  }

  return results;
}
