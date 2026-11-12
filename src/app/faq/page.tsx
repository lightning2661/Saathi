import type { Metadata } from 'next';
import { FAQ } from '@/lib/faq';
import { FaqClient } from './FaqClient';
import { Reveal } from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Questions',
  description:
    'Short, plain answers about family, police, documents, work, health and online abuse for transgender and LGBTQ+ people in India.',
};

export default function FaqPage() {
  return (
    <div className="shell">
      <header className="page-head">
        <div className="docket">{FAQ.length} answers · edited by hand · no model writes these</div>
        <h1>Questions people actually ask.</h1>
        <p>
          Short answers, not essays. Where a specific provision backs the answer it is linked; where
          the law is not in this corpus yet, the answer says so instead of guessing.
        </p>
      </header>

      <Reveal>
        <FaqClient items={FAQ} />
      </Reveal>

      <div className="notice" style={{ margin: '2.5rem 0 3rem' }}>
        <strong>Still stuck?</strong> Describe the situation in your own words on the{' '}
        <a href="/ask">ask page</a> — it handles cases this list does not cover — or call{' '}
        <a href="tel:15100">15100</a> for free legal aid.
      </div>
    </div>
  );
}
