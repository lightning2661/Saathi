import { ensureSchema, getMeta, setMeta, type Db } from './db';
import { ACTS } from './corpus/acts';
import { PROVISIONS } from './corpus/provisions';
import { CASES } from './corpus/cases';
import { HELPLINES } from './corpus/helplines';
import { TOPICS, CORPUS_AS_ON, CORPUS_VERSION } from './corpus/topics';
import type { Lang } from './types';

const LANGS: Lang[] = ['en', 'hi', 'ta'];

const stepKind = (index: number, total: number): 'now' | 'next' | 'later' =>
  index === 0 ? 'now' : index === total - 1 ? 'later' : 'next';

export interface SeedResult {
  seeded: boolean;
  version: string;
  counts: Record<string, number>;
}

export async function seedCorpus(force = false): Promise<SeedResult> {
  const db = await ensureSchema();
  const current = await getMeta(db, 'corpus_version');

  if (current === CORPUS_VERSION && !force) {
    return { seeded: false, version: CORPUS_VERSION, counts: await counts(db) };
  }

  await db.exec('BEGIN');
  try {
    await db.exec(`
      DELETE FROM topic_provisions;
      DELETE FROM topic_cases;
      DELETE FROM steps;
      DELETE FROM unsure;
      DELETE FROM helpline_topics;
      DELETE FROM topics;
      DELETE FROM helplines;
      DELETE FROM cases;
      DELETE FROM provisions;
      DELETE FROM acts;
    `);

    for (const a of ACTS) {
      await db.run(
        `INSERT INTO acts (id, short_title, long_title, number, year, jurisdiction, ministry, official_url, consolidated_as_on, source)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [a.id, a.shortTitle, a.longTitle, a.number, a.year, a.jurisdiction, a.ministry ?? null, a.officialUrl, a.consolidatedAsOn, a.source],
      );
    }

    for (const p of PROVISIONS) {
      await db.run(
        `INSERT INTO provisions (id, act_id, section, heading, body, summary, tags, status, verified_on, source_url, in_force_from, amended_by, human_reviewed)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          p.id, p.actId, p.section, p.heading, p.body, p.summary,
          p.tags.join(','), p.status, p.verifiedOn, p.sourceUrl,
          p.inForceFrom ?? null, p.amendedBy ?? null, p.humanReviewed ? 1 : 0,
        ],
      );
    }

    for (const c of CASES) {
      await db.run(
        `INSERT INTO cases (id, name, citation, court, year, holding, relevance, source_url, verified_on)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [c.id, c.name, c.citation, c.court, c.year, c.holding, c.relevance, c.sourceUrl, c.verifiedOn],
      );
    }

    for (const h of HELPLINES) {
      await db.run(
        `INSERT INTO helplines (id, name_en, name_hi, name_ta, number, alt_number, what, hours, langs, source_url, verified_on, priority)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [h.id, h.name.en, h.name.hi, h.name.ta, h.number, h.altNumber ?? null, h.what, h.hours, h.langs.join(','), h.sourceUrl, h.verifiedOn, h.priority],
      );
    }

    for (const t of TOPICS) {
      await db.run(
        `INSERT INTO topics (slug, title_en, title_hi, title_ta, summary_en, summary_hi, summary_ta, keywords, urgency)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [t.slug, t.title.en, t.title.hi, t.title.ta, t.summary.en, t.summary.hi, t.summary.ta, t.keywords.join('|'), t.urgency],
      );

      for (const pid of t.provisionIds) {
        await db.run('INSERT INTO topic_provisions (topic_slug, provision_id, weight) VALUES (?, ?, 1)', [t.slug, pid]);
      }
      for (const cid of t.caseIds) {
        await db.run('INSERT INTO topic_cases (topic_slug, case_id) VALUES (?, ?)', [t.slug, cid]);
      }
      for (const hid of t.helplineIds) {
        await db.run('INSERT INTO helpline_topics (helpline_id, topic_slug) VALUES (?, ?)', [hid, t.slug]);
      }

      for (const lang of LANGS) {
        const steps = t.steps[lang];
        for (let i = 0; i < steps.length; i += 1) {
          await db.run(
            'INSERT INTO steps (topic_slug, lang, ordinal, kind, text) VALUES (?, ?, ?, ?, ?)',
            [t.slug, lang, i + 1, stepKind(i, steps.length), steps[i]],
          );
        }
        const caveats = t.unsure[lang];
        for (let i = 0; i < caveats.length; i += 1) {
          await db.run('INSERT INTO unsure (topic_slug, lang, ordinal, text) VALUES (?, ?, ?, ?)', [
            t.slug, lang, i + 1, caveats[i],
          ]);
        }
      }
    }

    await setMeta(db, 'corpus_version', CORPUS_VERSION);
    await setMeta(db, 'corpus_as_on', CORPUS_AS_ON);
    await db.exec('COMMIT');
  } catch (error) {
    await db.exec('ROLLBACK');
    throw error;
  }

  return { seeded: true, version: CORPUS_VERSION, counts: await counts(db) };
}

async function counts(db: Db): Promise<Record<string, number>> {
  const rows = await db.all<{ k: string; n: number }>(`
    SELECT 'provisions' AS k, COUNT(*) AS n FROM provisions
    UNION ALL SELECT 'topics', COUNT(*) FROM topics
    UNION ALL SELECT 'helplines', COUNT(*) FROM helplines
    UNION ALL SELECT 'cases', COUNT(*) FROM cases
    UNION ALL SELECT 'steps', COUNT(*) FROM steps
  `);
  return Object.fromEntries(rows.map((r) => [r.k, Number(r.n)]));
}
