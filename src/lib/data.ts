import { ensureSchema, type Db } from './db';
import { seedCorpus } from './seed';
import type { Lang, Topic } from './types';
import { TOPICS } from './corpus/topics';

let ready: Promise<Db> | null = null;

/** Seeds once per process; the seeder itself is version-guarded. */
export async function corpus(): Promise<Db> {
  if (!ready) {
    ready = (async () => {
      const db = await ensureSchema();
      await seedCorpus();
      return db;
    })();
  }
  return ready;
}

export interface TopicRow {
  slug: string; title: string; summary: string; urgency: number;
}

export async function listTopics(lang: Lang): Promise<TopicRow[]> {
  const db = await corpus();
  const rows = await db.all<{ slug: string; title: string; summary: string; urgency: number }>(
    `SELECT slug, title_${lang} AS title, summary_${lang} AS summary, urgency FROM topics ORDER BY urgency DESC, slug`,
  );
  return rows;
}

export async function getTopic(slug: string, lang: Lang) {
  const db = await corpus();
  const row = await db.first<{
    slug: string; title: string; summary: string; urgency: number;
  }>(`SELECT slug, title_${lang} AS title, summary_${lang} AS summary, urgency FROM topics WHERE slug = ?`, [slug]);
  if (!row) return null;

  const steps = await db.all<{ ordinal: number; kind: string; text: string }>(
    'SELECT ordinal, kind, text FROM steps WHERE topic_slug = ? AND lang = ? ORDER BY ordinal',
    [slug, lang],
  );
  const unsure = await db.all<{ text: string }>(
    'SELECT text FROM unsure WHERE topic_slug = ? AND lang = ? ORDER BY ordinal',
    [slug, lang],
  );
  const provisions = await db.all<{
    id: string; section: string; heading: string; summary: string; status: string;
    verified_on: string; source_url: string; act_title: string; amended_by: string | null;
  }>(
    `SELECT p.id, p.section, p.heading, p.summary, p.status, p.verified_on, p.source_url,
            a.short_title AS act_title, p.amended_by
       FROM topic_provisions tp
       JOIN provisions p ON p.id = tp.provision_id
       JOIN acts a ON a.id = p.act_id
      WHERE tp.topic_slug = ?
      ORDER BY p.act_id, p.id`,
    [slug],
  );
  const helplines = await db.all<{ id: string; name: string; number: string; what: string; hours: string }>(
    `SELECT h.id, h.name_${lang} AS name, h.number, h.what, h.hours
       FROM helpline_topics ht JOIN helplines h ON h.id = ht.helpline_id
      WHERE ht.topic_slug = ?
      ORDER BY h.priority DESC`,
    [slug],
  );
  const cases = await db.all<{ id: string; name: string; citation: string; court: string; holding: string; relevance: string }>(
    `SELECT c.id, c.name, c.citation, c.court, c.holding, c.relevance
       FROM topic_cases tc JOIN cases c ON c.id = tc.case_id
      WHERE tc.topic_slug = ?`,
    [slug],
  );

  return { topic: row, steps, unsure, provisions, helplines, cases };
}

export async function listActs() {
  const db = await corpus();
  return db.all<{
    id: string; short_title: string; number: string; year: number; ministry: string | null;
    official_url: string; consolidated_as_on: string; source: string; n: number;
  }>(
    `SELECT a.id, a.short_title, a.number, a.year, a.ministry, a.official_url,
            a.consolidated_as_on, a.source, COUNT(p.id) AS n
       FROM acts a LEFT JOIN provisions p ON p.act_id = a.id
      GROUP BY a.id ORDER BY a.short_title`,
  );
}

export async function getAct(id: string) {
  const db = await corpus();
  const act = await db.first<{
    id: string; short_title: string; long_title: string; number: string; year: number;
    ministry: string | null; official_url: string; consolidated_as_on: string; source: string;
  }>('SELECT * FROM acts WHERE id = ?', [id]);
  if (!act) return null;
  const provisions = await db.all<{
    id: string; section: string; heading: string; summary: string; body: string; status: string;
    verified_on: string; source_url: string; amended_by: string | null; human_reviewed: number;
    in_force_from: string | null;
  }>('SELECT * FROM provisions WHERE act_id = ? ORDER BY id', [id]);
  return { act, provisions };
}

export async function listLaws(query?: string) {
  const db = await corpus();
  if (!query || query.trim().length < 2) {
    return db.all<{ id: string; section: string; heading: string; summary: string; act_title: string; status: string; verified_on: string }>(
      `SELECT p.id, p.section, p.heading, p.summary, a.short_title AS act_title, p.status, p.verified_on
         FROM provisions p JOIN acts a ON a.id = p.act_id ORDER BY a.short_title, p.id`,
    );
  }
  const q = `%${query.trim().toLowerCase()}%`;
  return db.all<{ id: string; section: string; heading: string; summary: string; act_title: string; status: string; verified_on: string }>(
    `SELECT p.id, p.section, p.heading, p.summary, a.short_title AS act_title, p.status, p.verified_on
       FROM provisions p JOIN acts a ON a.id = p.act_id
      WHERE lower(p.heading) LIKE ? OR lower(p.summary) LIKE ? OR lower(p.body) LIKE ?
         OR lower(a.short_title) LIKE ? OR lower(p.section) = ?
      ORDER BY a.short_title, p.id LIMIT 40`,
    [q, q, q, q, query.trim().toLowerCase()],
  );
}

export async function listHelplines(lang: Lang) {
  const db = await corpus();
  return db.all<{ id: string; name: string; number: string; alt_number: string | null; what: string; hours: string; source_url: string; verified_on: string; langs: string }>(
    `SELECT id, name_${lang} AS name, number, alt_number, what, hours, source_url, verified_on, langs
       FROM helplines ORDER BY priority DESC`,
  );
}

export async function syncOverview() {
  const db = await corpus();
  const sources = await db.all<{ source: string; checked_at: string | null; status: string; detail: string }>(
    'SELECT source, checked_at, status, detail FROM source_state ORDER BY source',
  );
  const runs = await db.all<{ id: number; source: string; started_at: string; finished_at: string | null; status: string; fetched: number; changed: number; detail: string }>(
    'SELECT * FROM sync_runs ORDER BY id DESC LIMIT 12',
  );
  const pending = await db.all<{ id: number; source: string; kind: string; ref: string; summary: string; detail: string; status: string; created_at: string }>(
    `SELECT id, source, kind, ref, summary, detail, status, created_at
       FROM sync_changes WHERE status = 'pending' ORDER BY id DESC LIMIT 50`,
  );
  const counts = await db.first<{ pending: number; approved: number }>(
    `SELECT SUM(CASE WHEN status='pending' THEN 1 ELSE 0 END) AS pending,
            SUM(CASE WHEN status='approved' THEN 1 ELSE 0 END) AS approved
       FROM sync_changes`,
  );
  const review = await db.first<{ total: number; reviewed: number }>(
    'SELECT COUNT(*) AS total, SUM(human_reviewed) AS reviewed FROM provisions',
  );
  const events = await db.all<{ kind: string; n: number }>(
    'SELECT topic AS kind, COUNT(*) AS n FROM events GROUP BY topic ORDER BY n DESC LIMIT 8',
  );
  return { sources, runs, pending, counts, review, events };
}

export async function allTopicSlugs(): Promise<string[]> {
  return TOPICS.map((t: Topic) => t.slug);
}
