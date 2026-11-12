import type { Metadata } from 'next';
import { AskClient } from './AskClient';
import { modelAvailable } from '@/lib/gateway';

export const metadata: Metadata = {
  title: 'Describe your situation',
  description:
    'Say what is happening in English, Hindi or Tamil and get your rights in plain language, the law with its source, and who to call.',
};

export const dynamic = 'force-dynamic';

export default function AskPage() {
  return (
    <div className="shell">
      <header className="page-head">
        <div className="docket">one or two sentences · nothing stored · no account</div>
        <h1>Say what is happening.</h1>
        <p>
          One or two sentences is enough. Saathi reads it for danger first, then pulls only the
          verified law that applies, then gives you a plan that ends with a real person to call.
        </p>
      </header>

      <div className="two-col" style={{ paddingBottom: '3rem' }}>
        <div>
          <AskClient modelAvailable={modelAvailable()} />
        </div>

        <aside className="stack">
          <div className="panel panel--quiet">
            <div className="section-label">Before you type</div>
            <ul style={{ fontSize: '0.92rem', color: 'var(--ink-2)' }}>
              <li>
                If someone is hurting you right now, call <a href="tel:112">112</a> first. This page
                can wait.
              </li>
              <li>
                Under 18 and alone? Call <a href="tel:1098">1098</a>. It is free and answered 24
                hours.
              </li>
              <li>
                You do not need an account. Nothing you type is saved to a database, and no analytics
                script runs on this page.
              </li>
            </ul>
          </div>

          <div className="panel panel--quiet">
            <div className="section-label">How the answer is built</div>
            <ol style={{ fontSize: '0.9rem', color: 'var(--ink-2)', paddingLeft: '1.1rem' }}>
              <li>Danger is checked by fixed rules, not by a model.</li>
              <li>The situation is matched to the verified corpus by keyword evidence.</li>
              <li>
                A model, if you allow one, may only rephrase retrieved provisions and must cite them
                by index. Anything uncited is dropped.
              </li>
              <li>Every answer ends with a helpline or free legal aid.</li>
            </ol>
          </div>

          <div className="notice">
            <strong>This is information, not legal advice.</strong> Saathi does not create a
            lawyer–client relationship and cannot represent you. A NALSA legal aid lawyer can.
          </div>
        </aside>
      </div>
    </div>
  );
}
