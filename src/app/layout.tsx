import type { Metadata, Viewport } from 'next';
import { Instrument_Sans, Libre_Caslon_Display } from 'next/font/google';
import './globals.css';

const display = Libre_Caslon_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
});

const text = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-text',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Saathi — the section that protects you',
    template: '%s · Saathi',
  },
  description:
    'Saathi reads your situation, finds the provision that protects you, and hands you a free legal aid number. Privacy-first legal information for transgender and LGBTQ+ people in India.',
  applicationName: 'Saathi',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Saathi',
    description:
      'Describe your situation. Get your rights in plain language, the law with its source, and a real person to call.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#e7dcc4' },
    { media: '(prefers-color-scheme: dark)', color: '#101218' },
  ],
};

const LINKS = [
  { href: '/ask', label: 'Ask' },
  { href: '/rights', label: 'Rights' },
  { href: '/laws', label: 'Law library' },
  { href: '/faq', label: 'FAQ' },
  { href: '/helplines', label: 'Helplines' },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${text.variable}`}>
      <body>
        <a className="sr-only" href="#main">
          Skip to content
        </a>

        <header className="site-header">
          <div className="shell bar">
            <a className="brand" href="/">
              <b>Saathi</b>
              <span>legal aid desk</span>
            </a>
            <nav className="nav" aria-label="Primary">
              {LINKS.map((l) => (
                <a key={l.href} href={l.href}>
                  {l.label}
                </a>
              ))}
            </nav>
            <a className="call-chip" href="tel:112" aria-label="Emergency, call 112">
              112 emergency
            </a>
          </div>
        </header>

        <main id="main">{children}</main>

        <footer className="site-footer">
          <div className="shell footer-grid">
            <div>
              <h4>Saathi</h4>
              <p>
                Legal information for LGBTQ+ people in India. Every rule here is quoted from India
                Code, with the date it was checked. This is information, not legal advice, and not a
                substitute for a lawyer.
              </p>
              <p>
                Immediate danger: <a href="tel:112">112</a>. Under 18 and alone:{' '}
                <a href="tel:1098">1098</a>. Free legal aid: <a href="tel:15100">15100</a>.
              </p>
            </div>
            <div>
              <h4>Use</h4>
              <a href="/ask">Describe your situation</a>
              <a href="/rights">Rights by situation</a>
              <a href="/laws">Law library</a>
              <a href="/faq">Questions</a>
              <a href="/help">If you want to help</a>
            </div>
            <div>
              <h4>Sources</h4>
              <a href="https://www.indiacode.nic.in/" target="_blank" rel="noreferrer">
                India Code
              </a>
              <a href="https://egazette.gov.in/" target="_blank" rel="noreferrer">
                eGazette of India
              </a>
              <a href="https://nalsa.gov.in/" target="_blank" rel="noreferrer">
                NALSA
              </a>
              <a href="/api/health">Corpus status</a>
            </div>
            <div>
              <h4>Privacy</h4>
              <p>
                No account, no analytics, no third-party script. Your question is not written to the
                database. If a model is used, identifiers are masked first and you are asked before
                anything leaves the device.
              </p>
              <a href="/admin">Operator console</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
