import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAct } from '@/lib/data';

export const dynamic = 'force-dynamic';

type Params = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const data = await getAct(id);
  return { title: data?.act.short_title ?? 'Act' };
}

export default async function ActPage({ params }: Params) {
  const { id } = await params;
  const data = await getAct(id);
  if (!data) notFound();
  const { act, provisions } = data;

  return (
    <div className="shell">
      <header className="page-head">
        <div className="kicker">
          <a href="/laws" style={{ color: 'inherit', textDecoration: 'none' }}>
            Law library
          </a>
        </div>
        <h1>{act.short_title}</h1>
        <p>{act.long_title}</p>
      </header>

      <div className="two-col" style={{ paddingBottom: '2rem' }}>
        <div>
          <div className="section-label">Provisions held</div>
          <table className="table">
            <thead>
              <tr>
                <th>s.</th>
                <th>Heading</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {provisions.map((p) => (
                <tr key={p.id}>
                  <td className="num">
                    <a href={`/laws/${p.id}`}>{p.section}</a>
                  </td>
                  <td>
                    {p.heading}
                    <div style={{ fontSize: '0.8rem', color: 'var(--ink-3)' }}>{p.summary}</div>
                  </td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    <span className={`badge ${p.human_reviewed ? 'badge--ok' : ''}`}>
                      {p.human_reviewed ? 'signed off' : 'pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <aside className="panel">
          <div className="section-label">Provenance</div>
          <dl className="dl">
            <dt>Number</dt>
            <dd>
              {act.number} of {act.year}
            </dd>
            <dt>Department</dt>
            <dd>{act.ministry ?? '—'}</dd>
            <dt>Consolidated</dt>
            <dd>{act.consolidated_as_on}</dd>
            <dt>Source</dt>
            <dd>{act.source}</dd>
          </dl>
          <div className="btn-row" style={{ marginTop: '1rem' }}>
            <a className="btn btn--sm" href={act.official_url} target="_blank" rel="noreferrer">
              Official copy
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
