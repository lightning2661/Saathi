import { corpus } from '@/lib/data';

export const dynamic = 'force-dynamic';

const TIMELINE = [
  { year: '2014', title: 'NALSA v. Union of India', body: 'The Supreme Court recognises a third gender and reads gender identity into Articles 14, 15 and 21.' },
  { year: '2017', title: 'Puttaswamy', body: 'Privacy becomes a fundamental right: bodily integrity and personal autonomy are protected.' },
  { year: '2018', title: 'Navtej Singh Johar', body: 'Section 377 is read down. Consensual same-sex acts between adults stop being an offence.' },
  { year: '2019', title: 'Transgender Persons Act', body: 'Parliament creates a statutory right against discrimination, a right of residence and criminal penalties.' },
  { year: '2021', title: 'Madras High Court guidelines', body: 'Police protection for a same-sex couple; conversion practices called professional misconduct.' },
  { year: '2023', title: 'Supriyo', body: 'The Court declines to recognise same-sex marriage and leaves the status to Parliament.' },
  { year: '2026', title: 'Amendment Act in force, 25 May', body: 'A narrower definition, a medical board before the identity certificate, and new offences for forced identity and forced begging.' },
];

export default async function HomePage() {
  const db = await corpus();
  const stats = await db.first<{ provisions: number; topics: number; reviewed: number; acts: number }>(
    `SELECT (SELECT COUNT(*) FROM provisions) AS provisions,
            (SELECT COUNT(*) FROM topics) AS topics,
            (SELECT COUNT(*) FROM provisions WHERE human_reviewed = 1) AS reviewed,
            (SELECT COUNT(*) FROM acts) AS acts`,
  );

  return (
    <>
      <section className="hero">
        <div className="shell hero-grid">
          <div>
            <div className="kicker">SDG 16 · Access to justice · India</div>
            <h1 className="display">
              Know your rights. <em>Know your next step.</em>
            </h1>
            <p className="lede">
              Saathi is a privacy-first legal tool for transgender and LGBTQ+ people in India.
              Describe your situation in your own words and get your rights in plain language, the
              law with its source, and a verified person who can actually help.
            </p>
            <div className="btn-row" style={{ marginTop: '1.6rem' }}>
              <a className="btn btn--primary" href="/ask">
                Describe your situation
              </a>
              <a className="btn" href="/rights">
                Or just read your rights
              </a>
            </div>
            <p style={{ marginTop: '1.3rem', fontSize: '0.84rem', color: 'var(--ink-3)' }}>
              No account. No tracking. Nothing you type is stored.
            </p>
          </div>

          <div className="panel">
            <div className="section-label">An answer looks like this</div>
            <p style={{ fontSize: '0.95rem', color: 'var(--ink-2)', fontStyle: 'italic' }}>
              “My family threw me out because I&apos;m trans. I&apos;m 16 and I&apos;m at a railway
              station. What can I do?”
            </p>
            <hr className="rule" style={{ margin: '1.2rem 0' }} />
            <div className="section-label">Saathi notices</div>
            <div className="chips" style={{ marginTop: 0, marginBottom: '1.1rem' }}>
              <span className="badge badge--warn">You may be under 18</span>
              <span className="badge badge--warn">No safe place tonight</span>
            </div>
            <div className="section-label">Immediate action</div>
            <p style={{ fontSize: '0.93rem' }}>
              Call <a href="tel:1098">1098</a>. Ask station staff or the Railway Protection Force to
              help you reach them. Do not accept a room from a stranger tonight.
            </p>
            <div className="section-label" style={{ marginTop: '1.2rem' }}>
              Your rights
            </div>
            <p style={{ fontSize: '0.93rem', marginBottom: '0.4rem' }}>
              A child cannot be separated from family only for being transgender.
            </p>
            <span className="cite">§12 · TPA 2019 · 2026-06-04</span>
            <div className="section-label" style={{ marginTop: '1.2rem' }}>
              Who can help
            </div>
            <p style={{ fontSize: '0.93rem', margin: 0 }}>
              1098 Childline · 15100 legal aid · 139 railway · 112 emergency
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="two-col">
            <div>
              <div className="section-label">The problem</div>
              <h2>Rejected at home. Invisible to the system. Unheard by everyone.</h2>
              <p className="lede" style={{ marginTop: '0.8rem' }}>
                A 17-year-old is bullied out of school. At 18 she is abandoned at a railway station
                with no documents. At 19 shops turn her away. Today she begs between stations, and a
                passenger who wants to help has no idea what to do.
              </p>
              <p style={{ fontSize: '0.84rem', color: 'var(--ink-3)' }}>
                Meera is a composite drawn from documented patterns, not a real person.
              </p>
            </div>
            <div>
              <ol className="story">
                <li>
                  <time>Age 17</time>
                  <p>Bullied by classmates, ignored by teachers, stops going to school.</p>
                </li>
                <li>
                  <time>Age 17</time>
                  <p>Parents abandon her at a railway station.</p>
                </li>
                <li>
                  <time>Age 18</time>
                  <p>No documents, no identity, no route to a certificate she is entitled to.</p>
                </li>
                <li>
                  <time>Age 19</time>
                  <p>Shops turn her away. A man offers a room, then keeps her earnings.</p>
                </li>
                <li className="now">
                  <time>Today</time>
                  <p>She begs between stations. A passenger gives ₹20 and wants to do more.</p>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-label">What the data shows</div>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))' }}>
            <div className="stat">
              <b>4.88 lakh</b>
              <span>transgender persons counted in Census 2011 — the first time India counted them. The real number is widely thought to be higher.</span>
            </div>
            <div className="stat">
              <b>99%</b>
              <span>faced social rejection on multiple occasions in an NHRC-commissioned national study.</span>
            </div>
            <div className="stat">
              <b>59%</b>
              <span>of transgender respondents in Delhi, Mumbai and Bengaluru had experienced violence.</span>
            </div>
            <div className="stat">
              <b>52% / 15%</b>
              <span>harassed in school by classmates / by teachers. Harassment pushes people out of school and out of future jobs.</span>
            </div>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--ink-3)', marginTop: '1.4rem' }}>
            Sources: Census of India 2011; NHRC / Kerala Development Society study; Humsafar Trust
            needs assessment 2017–18.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell two-col">
          <div>
            <div className="section-label">How Saathi works</div>
            <h2>Four steps, and the last one is a person.</h2>
            <ol className="steps" style={{ marginTop: '1.4rem' }}>
              <li data-kind="now">
                <strong>Understand.</strong> Reads the situation in English, हिंदी or தமிழ். A fixed
                rule set checks danger before anything else runs.
              </li>
              <li>
                <strong>Retrieve.</strong> Pulls only verified law, playbooks and helplines. Every
                rule arrives with its source and the date it was checked.
              </li>
              <li>
                <strong>Respond.</strong> Writes a short plan: what to do now, your rights, who to
                call. A model may rephrase, but may not add law.
              </li>
              <li>
                <strong>Hand off.</strong> Every plan ends with free legal aid, a helpline or a
                partner. Saathi never tries to be the last step.
              </li>
            </ol>
          </div>

          <div>
            <div className="section-label">The law keeps moving</div>
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
                  <strong>16.9</strong> — routes people without documents towards identity papers
                  and certificates.
                </li>
                <li>
                  <strong>16.b</strong> — records where the law is unclear or misapplied, with
                  evidence.
                </li>
              </ul>
            </div>
            <div className="panel">
              <div className="section-label">Corpus status</div>
              <div className="kv">
                <span>Provisions in force</span>
                <span className="num">{stats?.provisions ?? 0}</span>
              </div>
              <div className="kv">
                <span>Acts cited</span>
                <span className="num">{stats?.acts ?? 0}</span>
              </div>
              <div className="kv">
                <span>Situation playbooks</span>
                <span className="num">{stats?.topics ?? 0}</span>
              </div>
              <div className="kv">
                <span>Human legal sign-off</span>
                <span className="num">
                  {stats?.reviewed ?? 0} / {stats?.provisions ?? 0}
                </span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--ink-3)', marginTop: '1rem', marginBottom: 0 }}>
                Text is checked against the India Code consolidated version and the Gazette. Partner
                sign-off is tracked per provision and shown on every citation, not assumed.
              </p>
            </div>
          </div>

          <div className="btn-row" style={{ marginTop: '2.2rem' }}>
            <a className="btn btn--primary" href="/ask">
              Start with your situation
            </a>
            <a className="btn" href="/help">
              I want to help someone
            </a>
            <a className="btn" href="/laws">
              Browse the law library
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
