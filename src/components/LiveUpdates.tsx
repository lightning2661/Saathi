'use client';

import { useEffect, useRef, useState } from 'react';

interface Source {
  source: string;
  status: string;
  checked_at: string | null;
  detail: string;
}

interface Run {
  id: number;
  source: string;
  status: string;
  fetched: number;
  changed: number;
  finished_at: string | null;
}

interface Payload {
  ok: boolean;
  at: string;
  sources: Source[];
  runs: Run[];
  pending: number;
  totals: { provisions: number; topics: number; reviewed: number } | null;
}

const LABEL: Record<string, string> = {
  indiacode: 'India Code',
  egazette: 'eGazette',
  'data.gov.in': 'data.gov.in',
};

const ago = (iso: string | null, seconds: number): string => {
  if (!iso) return 'not checked';
  const s = Math.max(0, seconds);
  if (s < 60) return `checked ${s}s ago`;
  if (s < 3600) return `checked ${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `checked ${Math.floor(s / 3600)}h ago`;
  return `checked ${iso.slice(0, 10)}`;
};

export function LiveUpdates({
  tickMs = 20000,
  compact = false,
}: {
  tickMs?: number;
  compact?: boolean;
}) {
  const [data, setData] = useState<Payload | null>(null);
  const [age, setAge] = useState(0);
  const [failed, setFailed] = useState(false);
  const started = useRef(Date.now());

  useEffect(() => {
    let alive = true;

    const load = async () => {
      try {
        const res = await fetch('/api/updates', { cache: 'no-store' });
        if (!res.ok) throw new Error(String(res.status));
        const json = (await res.json()) as Payload;
        if (!alive) return;
        setData(json);
        setFailed(false);
        started.current = Date.now();
        setAge(0);
      } catch {
        if (alive) setFailed(true);
      }
    };

    void load();
    const poll = setInterval(load, tickMs);
    const clock = setInterval(() => setAge((a) => a + 1), 1000);
    return () => {
      alive = false;
      clearInterval(poll);
      clearInterval(clock);
    };
  }, [tickMs]);

  if (failed) {
    return (
      <div className="live">
        <div className="live-head">
          <span>Official sources</span>
          <span>status unavailable</span>
        </div>
        <p className="model-note" style={{ margin: 0 }}>
          Saathi could not read the sync ledger. The law below is still the last checked text.
        </p>
      </div>
    );
  }

  return (
    <div className={compact ? 'live live--compact' : 'live'} aria-live="polite">
      <div className="live-head">
        <span>
          <span className="live-dot" data-status={data?.sources[0]?.status ?? 'ok'} />
          Official sources
        </span>
        <span>{data ? ago(data.at, age) : 'reading…'}</span>
      </div>

      {data ? (
        <>
          {data.sources.map((s) => (
            <div className="live-row" key={s.source}>
              <span>
                <b>{LABEL[s.source] ?? s.source}</b>
              </span>
              <span className="n">
                {s.status === 'ok' ? 'reachable' : s.status}
                {s.status === 'empty' ? '' : ''}
              </span>
            </div>
          ))}
          <div className="live-row" style={{ borderTop: '1px solid var(--rule)', marginTop: '0.4rem', paddingTop: '0.5rem' }}>
            <span>
              <b>{data.pending}</b> change(s) waiting for review
            </span>
            <span className="n">{data.totals?.provisions ?? 0} provisions</span>
          </div>
          {data.runs[0] && (
            <div className="live-row" key={data.runs[0].id} style={{ paddingTop: 0 }}>
              <span className="n live-fresh">
                last run · {LABEL[data.runs[0].source] ?? data.runs[0].source} ·{' '}
                {data.runs[0].fetched} records
              </span>
            </div>
          )}
        </>
      ) : (
        <p className="model-note" style={{ margin: 0 }}>
          Reading the sync ledger…
        </p>
      )}
    </div>
  );
}
