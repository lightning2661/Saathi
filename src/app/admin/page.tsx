import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { corpus, syncOverview } from '@/lib/data';
import { operatorToken, ADMIN_COOKIE } from '@/lib/auth';
import { ChangeActions, LoginForm, LogoutButton, SignOffForm, SyncButton } from './AdminClient';

export const metadata: Metadata = { title: 'Operator console', robots: { index: false } };
export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const jar = await cookies();
  const token = operatorToken();
  const authed = Boolean(token && jar.get(ADMIN_COOKIE)?.value === token);

  if (!authed) {
    return (
      <div className="shell" style={{ padding: '3rem 0' }}>
        <header className="page-head" style={{ borderBottom: 0 }}>
          <div className="kicker">Restricted</div>
          <h1>Operator console</h1>
          <p>
            Law review and source monitoring. Nothing here is public and nothing here edits statute
            text in place.
          </p>
        </header>
        <LoginForm />
      </div>
    );
  }

  const db = await corpus();
  const overview = await syncOverview();
  const pendingProvisions = await db.all<{
    id: string; section: string; heading: string; act_title: string; verified_on: string;
  }>(
    `SELECT p.id, p.section, p.heading, a.short_title AS act_title, p.verified_on
       FROM provisions p JOIN acts a ON a.id = p.act_id
      WHERE p.human_reviewed = 0 ORDER BY a.short_title, p.id LIMIT 40`,
  );
  const feedback = await db.all<{ rating: string; topic: string; n: number }>(
    'SELECT rating, topic, COUNT(*) AS n FROM feedback GROUP BY rating, topic ORDER BY n DESC LIMIT 12',
  );

  return (
    <div className="shell" style={{ padding: '2.5rem 0 4rem' }}>
      <header className="page-head" style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <div className="kicker">Restricted</div>
          <h1>Operator console</h1>
          <p>Corpus integrity, source freshness and legal sign-off. No provision text is editable here.</p>
        </div>
        <div className="btn-row" style={{ alignSelf: 'center' }}>
          <SyncButton />
          <LogoutButton />
        </div>
      </header>

      <div className="admin-grid" style={{ marginBottom: '2.5rem' }}>
        <div className="panel">
          <div className="section-label">Legal sign-off</div>
          <div className="kv">
            <span>Provisions reviewed</span>
            <span className="num">
              {overview.review?.reviewed ?? 0} / {overview.review?.total ?? 0}
            </span>
          </div>
          <p style={{ fontSize: '0.84rem', color: 'var(--ink-3)', marginTop: '0.8rem' }}>
            A provision is citable from the moment its text is checked against the official copy.
            Sign-off is separate and always shown on the citation.
          </p>
          <SignOffForm />
        </div>

        <div className="panel">
          <div className="section-label">Sources</div>
          {overview.sources.length === 0 && (
            <p style={{ fontSize: '0.88rem' }}>No source has been polled yet. Run the sync once.</p>
          )}
          {overview.sources.map((s) => (
            <div className="kv" key={s.source}>
              <span>
                {s.source}
                <div style={{ fontSize: '0.74rem', color: 'var(--ink-3)' }}>{s.detail || '—'}</div>
              </span>
              <span className={`badge ${s.status === 'ok' ? 'badge--ok' : 'badge--warn'}`}>
                {s.status}
              </span>
            </div>
          ))}
        </div>

        <div className="panel">
          <div className="section-label">Answer telemetry</div>
          <div className="kv">
            <span>Pending review items</span>
            <span className="num">{overview.counts?.pending ?? 0}</span>
          </div>
          {feedback.length === 0 && <p style={{ fontSize: '0.88rem' }}>No feedback recorded yet.</p>}
          {feedback.map((f) => (
            <div className="kv" key={`${f.rating}-${f.topic}`}>
              <span>
                {f.rating} · {f.topic}
              </span>
              <span className="num">{f.n}</span>
            </div>
          ))}
        </div>
      </div>

      <section style={{ marginBottom: '2.5rem' }}>
        <div className="section-label">Staged from official sources</div>
        <table className="table">
          <thead>
            <tr>
              <th>Source</th>
              <th>Item</th>
              <th>Why it appeared</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {overview.pending.map((c) => {
              let url: string | undefined;
              try {
                url = (JSON.parse(c.detail) as { url?: string }).url;
              } catch {
                url = undefined;
              }
              return (
                <tr key={c.id}>
                  <td className="num">{c.source}</td>
                  <td style={{ maxWidth: '28rem' }}>
                    {url ? (
                      <a href={url} target="_blank" rel="noreferrer">
                        {c.summary}
                      </a>
                    ) : (
                      c.summary
                    )}
                    <div style={{ fontSize: '0.76rem', color: 'var(--ink-3)' }}>
                      {c.kind} · {c.ref}
                    </div>
                  </td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--ink-2)' }}>
                    keyword match on the watchlist
                    <div style={{ fontSize: '0.74rem', color: 'var(--ink-3)' }}>{c.created_at.slice(0, 16)}</div>
                  </td>
                  <td>
                    <ChangeActions changeId={c.id} />
                  </td>
                </tr>
              );
            })}
            {overview.pending.length === 0 && (
              <tr>
                <td colSpan={4}>
                  <span className="notice">Nothing staged. Run the sync to poll India Code and the Gazette.</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <div className="section-label">Awaiting legal sign-off</div>
        <table className="table">
          <thead>
            <tr>
              <th>id</th>
              <th>Provision</th>
              <th>Checked</th>
            </tr>
          </thead>
          <tbody>
            {pendingProvisions.map((p) => (
              <tr key={p.id}>
                <td className="num">
                  <a href={`/laws/${p.id}`}>{p.id}</a>
                </td>
                <td>
                  s.{p.section} {p.heading}
                  <div style={{ fontSize: '0.76rem', color: 'var(--ink-3)' }}>
                    {p.act_title.replace(/^The\s+/, '')}
                  </div>
                </td>
                <td className="num">{p.verified_on}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <div className="section-label">Recent sync runs</div>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Source</th>
              <th>Started</th>
              <th>Status</th>
              <th>Seen</th>
              <th>New</th>
            </tr>
          </thead>
          <tbody>
            {overview.runs.map((r) => (
              <tr key={r.id}>
                <td className="num">{r.id}</td>
                <td>{r.source}</td>
                <td className="num">{r.started_at.slice(0, 16)}</td>
                <td>
                  <span className={`badge ${r.status === 'ok' ? 'badge--ok' : 'badge--warn'}`}>{r.status}</span>
                </td>
                <td className="num">{r.fetched}</td>
                <td className="num">{r.changed}</td>
              </tr>
            ))}
            {overview.runs.length === 0 && (
              <tr>
                <td colSpan={6}>No runs recorded.</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
