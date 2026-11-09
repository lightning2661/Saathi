import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTopic } from '@/lib/data';
import { sectionLabel } from '@/lib/format';

export const dynamic = 'force-dynamic';

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const data = await getTopic(slug, 'en');
  return {
    title: data?.topic.title ?? 'Your rights',
    description: data?.topic.summary,
  };
}

export default async function RightPage({ params }: Params) {
  const { slug } = await params;
  const data = await getTopic(slug, 'en');
  if (!data) notFound();

  const { topic, steps, unsure, provisions, helplines, cases } = data;

  return (
    <div className="shell">
      <header className="page-head">
        <div className="kicker">
          <a href="/rights" style={{ color: 'inherit', textDecoration: 'none' }}>
            Your rights
          </a>
        </div>
        <h1>{topic.title}</h1>
        <p>{topic.summary}</p>
        <div className="btn-row" style={{ marginTop: '1.1rem' }}>
          <a className="btn" href="/ask">
            This is my situation — get a plan
          </a>
          {helplines[0] && (
            <a className="btn btn--primary" href={`tel:${helplines[0].number}`}>
              Call {helplines[0].number}
            </a>
          )}
        </div>
      </header>

      <div className="two-col" style={{ paddingBottom: '3rem' }}>
        <div>
          <div className="section-label">What to do</div>
          <ol className="steps">
            {steps.map((s) => (
              <li key={s.ordinal} data-kind={s.kind}>
                {s.text}
              </li>
            ))}
          </ol>

          <hr className="rule" />

          <div className="section-label">The law</div>
          {provisions.map((p) => (
            <div className="rights-item" key={p.id}>
              <p style={{ marginBottom: '0.35rem' }}>
                <strong>{p.heading}</strong>
              </p>
              <p>{p.summary}</p>
              <div className="cite-row">
                <a className="cite" href={`/laws/${p.id}`}>
                  {sectionLabel(p.section)} · {p.act_title.replace(/^The\s+/, '').slice(0, 30)} · {p.verified_on}
                </a>
                {p.amended_by && <span className="badge">amended: {p.amended_by}</span>}
              </div>
            </div>
          ))}
          {provisions.length === 0 && (
            <p className="notice">No verified provision is attached to this page yet.</p>
          )}

          {cases.length > 0 && (
            <>
              <hr className="rule" />
              <div className="section-label">Cases that matter</div>
              {cases.map((c) => (
                <div key={c.id} style={{ marginBottom: '1.1rem' }}>
                  <p style={{ marginBottom: '0.2rem' }}>
                    <strong>{c.name}</strong>{' '}
                    <span className="badge">{c.citation}</span>
                  </p>
                  <p style={{ fontSize: '0.92rem', color: 'var(--ink-2)', marginBottom: '0.2rem' }}>
                    {c.holding}
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--ink-3)', margin: 0 }}>
                    Why it matters here: {c.relevance}
                  </p>
                </div>
              ))}
            </>
          )}
        </div>

        <aside className="stack">
          <div className="panel">
            <div className="section-label">Who can help</div>
            {helplines.length === 0 && <p style={{ fontSize: '0.9rem' }}>No helpline mapped yet.</p>}
            {helplines.map((h) => (
              <div className="helpline-item" key={h.id}>
                <a className="num" href={`tel:${h.number}`}>
                  {h.number}
                </a>
                <span className="what">
                  <strong style={{ color: 'var(--ink)' }}>{h.name}</strong>
                  <br />
                  {h.what}
                </span>
              </div>
            ))}
          </div>

          {unsure.length > 0 && (
            <div className="panel panel--quiet">
              <div className="section-label">Not sure about</div>
              <ul style={{ fontSize: '0.9rem', color: 'var(--ink-2)', marginBottom: 0 }}>
                {unsure.map((u, i) => (
                  <li key={i}>{u.text}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="notice">
            <strong>Information, not advice.</strong> The 2026 amendment changed identity
            certificates and added offences. Anything you rely on should be checked by a legal aid
            lawyer on 15100.
          </div>
        </aside>
      </div>
    </div>
  );
}
