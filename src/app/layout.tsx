import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Saathi — know your rights, know your next step',
    template: '%s · Saathi',
  },
  description:
    'Saathi is a privacy-first legal awareness tool for transgender and LGBTQ+ people in India. Plain-language rights, the law with its source, and a real person to call.',
  applicationName: 'Saathi',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Saathi',
    description:
      'Describe your situation. Get your rights in plain language, the law with its source, and a verified person who can help.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f3e9' },
    { media: '(prefers-color-scheme: dark)', color: '#15111a' },
  ],
};

const LINKS = [
  { href: '/ask', label: 'Ask' },
  { href: '/rights', label: 'Your rights' },
  { href: '/laws', label: 'Law library' },
  { href: '/help', label: 'If you want to help' },
  { href: '/helplines', label: 'Helplines' },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="shell bar">
            <a className="brand" href="/">
              <b>Saathi</b>
              <span>SDG 16 · India</span>
            </a>
            <nav className="nav" aria-label="Primary">
              {LINKS.map((l) => (
                <a key={l.href} href={l.href}>
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="site-footer">
          <div className="shell footer-grid">
            <div>
              <h4>Saathi</h4>
              <p>
                A legal awareness and justice router for LGBTQ+ people in India. Answers are
                assembled from verified provisions, each with its source and the date it was checked.
                Saathi is information, not legal advice, and not a substitute for a lawyer.
              </p>
              <p>
                In immediate danger call <a href="tel:112">112</a>. Under 18 and alone call{' '}
                <a href="tel:1098">1098</a>.
              </p>
            </div>
            <div>
              <h4>Use</h4>
              <a href="/ask">Describe your situation</a>
              <a href="/rights">Read your rights</a>
              <a href="/laws">Law library</a>
              <a href="/helplines">All helplines</a>
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
                Nothing you type is stored. No account, no analytics, no third-party script on this
                page. If a model is used, identifying numbers are masked first and you are asked
                before anything is sent.
              </p>
              <a href="/admin">Operator console</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
