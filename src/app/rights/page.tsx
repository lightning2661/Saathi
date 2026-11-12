import type { Metadata } from 'next';
import { listTopics } from '@/lib/data';
import { Reveal } from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Your rights',
  description:
    'Plain-language rights for transgender and LGBTQ+ people in India, by situation: family, school, work, housing, healthcare, police and identity documents.',
};

export const dynamic = 'force-dynamic';

const GROUPS = [
  { level: 3, title: 'If you are not safe right now', note: 'These playbooks open with a call, not a paragraph.' },
  { level: 2, title: 'When an institution says no', note: 'Landlords, schools, hospitals, banks and police stations.' },
  { level: 1, title: 'Understanding what applies', note: 'Slower reading, for when nothing is on fire.' },
];

export default async function RightsPage() {
  const topics = await listTopics('en');

  return (
    <div className="shell">
      <header className="page-head">
        <div className="docket">{topics.length} situations · English, हिंदी, தமிழ்</div>
        <h1>Your rights, by situation.</h1>
        <p>
          You do not have to describe anything to read this. Each page gives the plain-language
          position, the provision behind it, and who to call. Nothing on this page is personalised,
          because nothing here knows who you are.
        </p>
      </header>

      <div style={{ paddingBottom: '3rem' }}>
        {GROUPS.map((g) => {
          const rows = topics.filter((t) => t.urgency === g.level);
          if (rows.length === 0) return null;
          return (
            <section key={g.level} style={{ marginBottom: '2.6rem' }}>
              <Reveal>
                <div className="section-label">{g.title}</div>
                <p style={{ color: 'var(--ink-3)', fontSize: '0.86rem', marginTop: '-0.3rem' }}>
                  {g.note}
                </p>
              </Reveal>
              <div className="grid">
                {rows.map((t, i) => (
                  <Reveal key={t.slug} delay={i * 35}>
                    <a className="card" href={`/rights/${t.slug}`}>
                      <h3>{t.title}</h3>
                      <p>{t.summary}</p>
                      <div className="card-meta">
                        <span>{g.level === 3 ? 'urgent' : g.level === 2 ? 'enforceable' : 'context'}</span>
                        <span>open</span>
                      </div>
                    </a>
                  </Reveal>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
