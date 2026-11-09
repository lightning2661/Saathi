import type { Metadata } from 'next';
import { listHelplines } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Helplines',
  description:
    'National numbers that work from any phone in India: emergency, child protection, free legal aid, mental health, railway and women’s helplines.',
};

export const dynamic = 'force-dynamic';

export default async function HelplinesPage() {
  const lines = await listHelplines('en');

  return (
    <div className="shell">
      <header className="page-head">
        <div className="kicker">Free to dial</div>
        <h1>Someone to call.</h1>
        <p>
          Every number is national, toll-free and answered around the clock unless marked otherwise.
          Save the three you are most likely to need now, in case you cannot open this page later.
        </p>
      </header>

      <div className="grid" style={{ paddingBottom: '1rem' }}>
        {lines.map((h) => (
          <div className="panel" key={h.id}>
            <a
              href={`tel:${h.number}`}
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '1.8rem',
                fontWeight: 600,
                textDecoration: 'none',
                color: 'var(--ink)',
                display: 'block',
                lineHeight: 1.1,
              }}
            >
              {h.number}
            </a>
            {h.alt_number && (
              <a
                href={`tel:${h.alt_number}`}
                style={{ fontSize: '0.9rem', fontFamily: 'var(--mono)' }}
              >
                {h.alt_number}
              </a>
            )}
            <h3 style={{ fontSize: '1rem', margin: '0.7rem 0 0.35rem' }}>{h.name}</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--ink-2)' }}>{h.what}</p>
            <div className="chips" style={{ marginTop: '0.4rem' }}>
              <span className="badge">{h.hours}</span>
              <span className="badge">{h.langs.split(',').slice(0, 3).join(' · ')}</span>
            </div>
            <p className="model-note" style={{ marginTop: '0.7rem', marginBottom: 0 }}>
              checked {h.verified_on} ·{' '}
              <a href={h.source_url} target="_blank" rel="noreferrer">
                source
              </a>
            </p>
          </div>
        ))}
      </div>

      <div className="notice" style={{ marginBottom: '3rem' }}>
        <strong>If a number does not answer:</strong> call 112 and ask for the nearest police station
        or hospital, and call 15100 for free legal aid. Numbers are re-checked on a schedule; report a
        wrong number from the operator console so the corpus shows it as unverified.
      </div>
    </div>
  );
}
