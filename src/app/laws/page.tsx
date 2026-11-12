import type { Metadata } from 'next';
import { listActs, listLaws } from '@/lib/data';
import { sectionLabel } from '@/lib/format';
import { LiveUpdates } from '@/components/LiveUpdates';

export const metadata: Metadata = {
  title: 'Law library',
  description:
    'Every provision Saathi can cite, with its act, section, source link and the date it was checked.',
};

export const dynamic = 'force-dynamic';

export default async function LawsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const [acts, provisions] = await Promise.all([listActs(), listLaws(q)]);

  return (
    <div className="shell">
      <header className="page-head">
        <div className="docket">no model writes this page · {provisions.length} rows shown</div>
        <h1>Law library</h1>
        <p>
          This is the whole citational surface of Saathi. If a provision is not here, Saathi will not
          state it. Each row links to the official source and records when it was last checked.
        </p>
      </header>

      <div className="two-col" style={{ marginBottom: '2rem', alignItems: 'start' }}>
        <LiveUpdates compact />
        <p className="model-note" style={{ marginBottom: 0 }}>
          The sync pipeline only detects. A new amendment is staged as a pending change and cannot be
          cited until a person verifies the text against the official copy.
        </p>
      </div>

      <form className="btn-row" action="/laws" method="get" style={{ marginBottom: '2rem' }}>
        <input
          type="search"
          name="q"
          defaultValue={q ?? ''}
          placeholder="Search section, heading or act — try “residence”, “18”, “certificate”"
          aria-label="Search provisions"
          style={{ maxWidth: '30rem' }}
        />
        <button className="btn" type="submit">
          Search
        </button>
        {q && (
          <a className="btn btn--sm" href="/laws">
            Clear
          </a>
        )}
      </form>

      <div className="panel" style={{ marginBottom: '2.5rem' }}>
        <div className="section-label">Acts in the corpus</div>
        <table className="table">
          <thead>
            <tr>
              <th>Act</th>
              <th>No.</th>
              <th>Consolidated as on</th>
              <th>Provisions here</th>
            </tr>
          </thead>
          <tbody>
            {acts.map((a) => (
              <tr key={a.id}>
                <td>
                  <a href={`/laws/act/${a.id}`}>{a.short_title}</a>
                  <div style={{ fontSize: '0.78rem', color: 'var(--ink-3)' }}>{a.ministry ?? a.source}</div>
                </td>
                <td className="num">
                  {a.number}/{a.year}
                </td>
                <td className="num">{a.consolidated_as_on}</td>
                <td className="num">{a.n}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section-label">{q ? `Results for “${q}”` : 'All provisions'}</div>
      <table className="table">
        <thead>
          <tr>
            <th>Provision</th>
            <th>Plain language</th>
            <th>Checked</th>
          </tr>
        </thead>
        <tbody>
          {provisions.map((p) => (
            <tr key={p.id}>
              <td style={{ minWidth: '11rem' }}>
                <a href={`/laws/${p.id}`}>
                  <strong>{sectionLabel(p.section)}</strong>
                </a>
                <div style={{ fontSize: '0.76rem', color: 'var(--ink-3)' }}>
                  {p.act_title.replace(/^The\s+/, '')}
                </div>
              </td>
              <td>
                <div style={{ fontSize: '0.92rem' }}>{p.heading}</div>
                <div style={{ fontSize: '0.86rem', color: 'var(--ink-2)' }}>{p.summary}</div>
              </td>
              <td className="num" style={{ whiteSpace: 'nowrap' }}>
                {p.verified_on}
                {p.status !== 'verified' && (
                  <div>
                    <span className="badge badge--warn">{p.status}</span>
                  </div>
                )}
              </td>
            </tr>
          ))}
          {provisions.length === 0 && (
            <tr>
              <td colSpan={3}>
                <span className="notice">Nothing matched. Try a section number, or a word like “rent”.</span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
