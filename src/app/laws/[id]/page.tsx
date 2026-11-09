import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { corpus } from '@/lib/data';
import { sectionLabel } from '@/lib/format';

export const dynamic = 'force-dynamic';

type Params = { params: Promise<{ id: string }> };

interface Row {
  id: string; section: string; heading: string; body: string; summary: string;
  status: string; verified_on: string; source_url: string; in_force_from: string | null;
  amended_by: string | null; human_reviewed: number; tags: string;
  act_id: string; act_title: string; act_long: string; act_url: string; act_source: string;
  consolidated_as_on: string; ministry: string | null;
}

async function load(id: string): Promise<Row | null> {
  const db = await corpus();
  return db.first<Row>(
    `SELECT p.*, a.short_title AS act_title, a.long_title AS act_long, a.official_url AS act_url,
            a.source AS act_source, a.consolidated_as_on, a.ministry
       FROM provisions p JOIN acts a ON a.id = p.act_id
      WHERE p.id = ?`,
    [id],
  );
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const row = await load(id);
  return { title: row ? `${row.act_title}, ${sectionLabel(row.section)}` : 'Provision' };
}

export default async function ProvisionPage({ params }: Params) {
  const { id } = await params;
  const row = await load(id);
  if (!row) notFound();

  const db = await corpus();
  const topics = await db.all<{ slug: string; title: string }>(
    `SELECT t.slug, t.title_en AS title FROM topic_provisions tp JOIN topics t ON t.slug = tp.topic_slug
      WHERE tp.provision_id = ?`,
    [id],
  );
  const signoff = await db.first<{ reviewer: string | null; at: string | null }>(
    `SELECT provider AS reviewer, created_at AS at FROM events
      WHERE kind = 'verify' AND topic = ? ORDER BY created_at DESC LIMIT 1`,
    [id],
  );

  return (
    <div className="shell" style={{ maxWidth: 860 }}>
      <header className="page-head">
        <div className="kicker">
          <a href="/laws" style={{ color: 'inherit', textDecoration: 'none' }}>
            Law library
          </a>
        </div>
        <h1>
          {row.act_title}, {sectionLabel(row.section)}
        </h1>
        <p>{row.heading}</p>
        <div className="btn-row" style={{ marginTop: '1rem' }}>
          <span className={`badge ${row.status === 'verified' ? 'badge--ok' : 'badge--warn'}`}>
            {row.status}
          </span>
          {row.human_reviewed ? (
            <span className="badge badge--ok">legal sign-off recorded</span>
          ) : (
            <span className="badge badge--warn">partner sign-off pending</span>
          )}
          {row.amended_by && <span className="badge">amended: {row.amended_by}</span>}
        </div>
      </header>

      <div className="section-label">Plain language</div>
      <p style={{ fontSize: '1.08rem' }}>{row.summary}</p>

      <hr className="rule" />

      <div className="section-label">Statutory text</div>
      <blockquote className="quote" style={{ fontSize: '1rem', whiteSpace: 'pre-wrap' }}>
        {row.body}
      </blockquote>

      <hr className="rule" />

      <div className="two-col">
        <div>
          <div className="section-label">Provenance</div>
          <dl className="dl">
            <dt>Act</dt>
            <dd>{row.act_long}</dd>
            <dt>Department</dt>
            <dd>{row.ministry ?? '—'}</dd>
            <dt>Consolidated</dt>
            <dd>{row.consolidated_as_on}</dd>
            <dt>In force</dt>
            <dd>{row.in_force_from ?? 'since enactment'}</dd>
            <dt>Checked</dt>
            <dd>{row.verified_on}</dd>
            <dt>Source</dt>
            <dd>{row.act_source}</dd>
            {signoff?.reviewer && (
              <>
                <dt>Reviewed by</dt>
                <dd>
                  {signoff.reviewer} · {signoff.at?.slice(0, 10)}
                </dd>
              </>
            )}
          </dl>
          <div className="btn-row" style={{ marginTop: '1rem' }}>
            <a className="btn btn--sm" href={row.source_url} target="_blank" rel="noreferrer">
              Official text
            </a>
            <a className="btn btn--sm" href={`/laws/act/${row.act_id}`}>
              Whole act
            </a>
          </div>
        </div>

        <div>
          <div className="section-label">Used when</div>
          {topics.length === 0 && <p style={{ fontSize: '0.9rem' }}>Not mapped to a playbook yet.</p>}
          <ul style={{ fontSize: '0.92rem', paddingLeft: '1.1rem' }}>
            {topics.map((t) => (
              <li key={t.slug}>
                <a href={`/rights/${t.slug}`}>{t.title}</a>
              </li>
            ))}
          </ul>
          {row.tags && (
            <>
              <div className="section-label" style={{ marginTop: '1.2rem' }}>
                Tags
              </div>
              <div className="chips" style={{ marginTop: 0 }}>
                {row.tags.split(',').map((tag) => (
                  <span className="badge" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <hr className="rule" />
      <p className="model-note">
        This page is generated from the corpus row, not from a language model. Text is reproduced
        from the official consolidated version; the PDF in the Government&apos;s repository remains
        authoritative.
      </p>
    </div>
  );
}
