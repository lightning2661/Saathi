import type { Metadata } from 'next';
import { listTopics } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Your rights',
  description:
    'Plain-language rights for transgender and LGBTQ+ people in India, by situation: family, school, work, housing, healthcare, police and identity documents.',
};

export const dynamic = 'force-dynamic';

export default async function RightsPage() {
  const topics = await listTopics('en');

  return (
    <div className="shell">
      <header className="page-head">
        <div className="kicker">Read at your own pace</div>
        <h1>Your rights, by situation.</h1>
        <p>
          You do not have to describe anything to read this. Each page gives the plain-language
          position, the provision behind it, and who to call — in English, हिंदी and தமிழ்.
        </p>
      </header>

      <div className="grid" style={{ paddingBottom: '3rem' }}>
        {topics.map((t) => (
          <a className="card" href={`/rights/${t.slug}`} key={t.slug}>
            <h3>{t.title}</h3>
            <p>{t.summary}</p>
            <div style={{ marginTop: '0.7rem' }}>
              <span className={`badge ${t.urgency === 3 ? 'badge--warn' : ''}`}>
                {t.urgency === 3 ? 'urgent' : 'information'}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
