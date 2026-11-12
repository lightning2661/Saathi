import { corpus } from '@/lib/data';
import { FAQ } from '@/lib/faq';
import { Reveal } from '@/components/Reveal';
import { LiveUpdates } from '@/components/LiveUpdates';

export const dynamic = 'force-dynamic';

const TIMELINE = [
  { year: '2014', title: 'NALSA v. Union of India', body: 'The Supreme Court recognises a third gender and reads gender identity into Articles 14, 15 and 21.' },
  { year: '2017', title: 'Puttaswamy', body: 'Privacy becomes a fundamental right: bodily integrity and personal autonomy are protected.' },
  { year: '2018', title: 'Navtej Singh Johar', body: 'Section 377 is read down. Consensual same-sex acts between adults stop being an offence.' },
  { year: '2019', title: 'Transgender Persons Act', body: 'Parliament creates a statutory right against discrimination, a right of residence and criminal penalties.' },
  { year: '2021', title: 'Madras High Court guidelines', body: 'Police protection for a same-sex couple; conversion practices called professional misconduct.' },
  { year: '2023', title: 'Supriyo', body: 'The Court declines to recognise same-sex marriage and leaves the status to Parliament.' },
  { year: '2026', title: 'Amendment in force, 25 May', body: 'A narrower definition, a medical board before the identity certificate, and new offences for forced identity and forced begging.' },
];

export default async function HomePage() {
  const db = await corpus();
  const [stats, topics] = await Promise.all([
    db.first<{ provisions: number; topics: number; reviewed: number; acts: number }>(
      `SELECT (SELECT COUNT(*) FROM provisions) AS provisions,
              (SELECT COUNT(*) FROM topics) AS topics,
              (SELECT COUNT(*) FROM provisions WHERE human_reviewed = 1) AS reviewed,
              (SELECT COUNT(*) FROM acts) AS acts`,
    ),
    db.all<{ slug: string; title: string; summary: string; urgency: number }>(
      `SELECT slug, title_en AS title, summary_en AS summary, urgency
         FROM topics ORDER BY urgency DESC, slug LIMIT 6`,
    ),
  ]);

  const teasers = FAQ.slice(0, 5);

  return (
    <>
      <section className="hero">
        <div className="shell hero-grid">
          <div>
            <h1 className="display">The law already says you exist.</h1>
            <p className="lede">
              Saathi reads what is happening, finds the section that protects you, and puts a free
              legal aid lawyer&apos;s number in your hand. Nothing you type is stored, and no
              account is needed.
            </p>
            <div className="btn-row hero-actions">
              <a className="btn btn--primary" href="/ask">
                Describe what happened
              </a>
              <a className="btn" href="/laws">
                Read the law first
              </a>
            </div>
            <p className="fineprint">
              {stats?.provisions ?? 0} provisions · {stats?.acts ?? 0} acts ·{' '}
              {stats?.topics ?? 0} situations
              <br />
              checked against India Code · English, हिंदी, தமிழ் · corpus 12 Nov 2026
            </p>
          </div>

          <figure className="sheet">
            <div className="sheet-head">
              <span>case note · specimen</span>
              <span>not stored</span>
            </div>
            <p className="sheet-quote">
              “My family threw me out because I&apos;m trans. I&apos;m 16 and I&apos;m at a railway
              station with no money.”
            </p>
            <dl style={{ margin: 0 }}>
              <div className="sheet-row">
                <dt>noticed</dt>
                <dd>Under 18 · no safe place tonight</dd>
              </div>
              <div className="sheet-row">
                <dt>do now</dt>
                <dd>
                  Call <a href="tel:1098">1098</a>. Ask station staff or the RPF to call with you.
                  Do not take a room from a stranger tonight.
                </dd>
              </div>
              <div className="sheet-row">
                <dt>right</dt>
                <dd>A child cannot be separated from family only for being transgender.</dd>
              </div>
              <div className="sheet-row">
                <dt>source</dt>
                <dd className="model-note">s.12 · TPA 2019 · checked 04 Jun 2026</dd>
              </div>
            </dl>
            <div className="stamp" aria-hidden="true">
              SOURCE
              <br />
              CHECKED
              <br />
              04 JUN 2026
            </div>
          </figure>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <Reveal>
            <div className="section-label">Where it usually breaks</div>
            <div className="two-col" style={{ marginBottom: '1.8rem' }}>
              <h2>Sixteen situations, one for the thing nobody would name.</h2>
              <p style={{ color: 'var(--ink-2)', marginBottom: 0 }}>
                Each one is a playbook, not an article: what to do in the next hour, the provision
                that applies, and who picks up the phone. Read it without telling us anything.
              </p>
            </div>
          </Reveal>

          <div className="grid">
            {topics.map((t, i) => (
              <Reveal key={t.slug} delay={i * 45}>
                <a className="card" href={`/rights/${t.slug}`}>
                  <h3>{t.title}</h3>
                  <p>{t.summary}</p>
                  <div className="card-meta">
                    <span>{t.urgency === 3 ? 'urgent' : 'information'}</span>
                    <span>playbook</span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

          <div className="btn-row" style={{ marginTop: '1.6rem' }}>
            <a className="btn" href="/rights">
              All situations
            </a>
            <a className="btn" href="/faq">
              Short answers instead
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell two-col">
          <Reveal>
            <div className="section-label">How an answer is made</div>
            <h2>A model may rephrase. It may not add law.</h2>
            <p style={{ color: 'var(--ink-2)', marginTop: '0.9rem' }}>
              Danger is checked first, by fixed rules — not by a model. Then the situation is matched
              to provisions by keyword evidence. A language model can be asked to write the answer
              more clearly, but every claim it makes must carry the index of a retrieved provision;
              anything uncited is dropped before you see it.
            </p>
            <p style={{ color: 'var(--ink-2)' }}>
              If nothing in the corpus answers you, Saathi says so and gives you a route to a human
              instead of inventing a section. The law library is the entire surface it can cite.
            </p>
            <div className="dl" style={{ marginTop: '1.4rem' }}>
              <dt>provisions</dt>
              <dd>{stats?.provisions ?? 0} verified, each with a source URL</dd>
              <dt>sign-off</dt>
              <dd>
                {stats?.reviewed ?? 0} of {stats?.provisions ?? 0} reviewed by a named lawyer — the
                count is shown, not assumed
              </dd>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="section-label">The desk is live</div>
            <p style={{ color: 'var(--ink-2)', marginTop: '-0.2rem', marginBottom: '1rem' }}>
              Saathi polls the official portals and stages anything new for review. It never edits a
              statute on its own.
            </p>
            <LiveUpdates />
            <div className="grid grid--2" style={{ marginTop: '1rem', gap: '0.75rem' }}>
              <div className="stat">
                <b>{stats?.topics ?? 0}</b>
                <span>situation playbooks across three languages</span>
              </div>
              <div className="stat">
                <b>{FAQ.length}</b>
                <span>plain answers to the questions people actually ask</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="shell two-col">
          <Reveal>
            <div className="section-label">How the law got here</div>
            <h2>Seven moments that decide what a police officer owes you today.</h2>
            <p style={{ color: 'var(--ink-2)', marginTop: '0.9rem' }}>
              Statutory rights do not arrive in one day. Each of these changed what an institution
              can lawfully do to you, and each is why a section in the library reads the way it does.
            </p>
          </Reveal>
          <Reveal delay={60}>
            <ul className="timeline">
              {TIMELINE.map((t) => (
                <li key={t.year + t.title}>
                  <time>{t.year}</time>
                  <p>
                    <strong>{t.title}</strong>
                    {t.body}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <Reveal>
            <div className="section-label">Questions people ask at 2am</div>
            <h2>Asked plainly. Answered the same way.</h2>
          </Reveal>
          <div style={{ marginTop: '1.2rem' }}>
            {teasers.map((f, i) => (
              <Reveal key={f.id} delay={i * 40}>
                <div className="faq-item">
                  <a
                    href={`/faq#${f.id}`}
                    style={{ display: 'block', padding: '1rem 0', textDecoration: 'none' }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--display)',
                        fontSize: 'clamp(1.05rem, 1.8vw, 1.22rem)',
                        color: 'var(--ink)',
                      }}
                    >
                      {f.q}
                    </span>
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="btn-row" style={{ marginTop: '1.4rem' }}>
            <a className="btn" href="/faq">
              All {FAQ.length} questions
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="two-col">
            <div>
              <div className="section-label">SDG 16</div>
              <h2>Justice that does not need a lawyer to start.</h2>
              <ul style={{ marginTop: '1rem', color: 'var(--ink-2)' }}>
                <li>
                  <strong>16.3</strong> — opens access to justice for people who cannot reach a
                  lawyer or a court.
                </li>
                <li>
                  <strong>16.6</strong> — tells institutions which provision applies, so a claim
                  cannot be refused on ignorance.
                </li>
                <li>
                  <strong>16.9</strong> — routes people without documents towards identity papers and
                  certificates.
                </li>
                <li>
                  <strong>16.b</strong> — records where the law is unclear or misapplied, with
                  evidence.
                </li>
              </ul>
            </div>
            <div className="panel">
              <div className="section-label">What Saathi will never do</div>
              <ul style={{ fontSize: '0.9rem', color: 'var(--ink-2)', marginBottom: 0 }}>
                <li>Quote a section that is not in the library.</li>
                <li>Store your question, or ask you to make an account.</li>
                <li>Claim a provision has been reviewed by a lawyer when it has not.</li>
                <li>Replace the last step, which is always a person.</li>
              </ul>
            </div>
          </div>

          <div className="btn-row" style={{ marginTop: '2.2rem' }}>
            <a className="btn btn--primary" href="/ask">
              Start with your situation
            </a>
            <a className="btn" href="/help">
              I want to help someone
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
