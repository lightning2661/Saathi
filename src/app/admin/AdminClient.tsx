'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

async function post(body: Record<string, unknown>) {
  const res = await fetch('/api/admin', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.ok;
}

export function LoginForm() {
  const [token, setToken] = useState('');
  const [error, setError] = useState(false);
  const [pending, start] = useTransition();
  const router = useRouter();

  return (
    <form
      className="panel"
      style={{ maxWidth: 420 }}
      onSubmit={(e) => {
        e.preventDefault();
        start(async () => {
          const ok = await post({ action: 'login', token });
          if (ok) router.refresh();
          else setError(true);
        });
      }}
    >
      <div className="section-label">Operator console</div>
      <label className="field">
        Operator token
        <input
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          autoComplete="off"
          required
        />
      </label>
      <button className="btn btn--primary" disabled={pending}>
        {pending ? 'Checking…' : 'Unlock'}
      </button>
      {error && (
        <p className="notice" style={{ marginTop: '0.9rem', borderColor: 'var(--danger)' }}>
          Wrong token, or SAATHI_SYNC_TOKEN is unset or still the development default.
        </p>
      )}
      <p style={{ fontSize: '0.8rem', color: 'var(--ink-3)', marginTop: '1rem', marginBottom: 0 }}>
        This console edits nothing in the law. It records legal sign-off and triages what the sync
        found. Provision text only changes through a deployed corpus version.
      </p>
    </form>
  );
}

export function SyncButton() {
  const [state, setState] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const router = useRouter();

  return (
    <div>
      <button
        className="btn btn--sm"
        disabled={pending}
        onClick={() =>
          start(async () => {
            setState('running');
            try {
              const res = await fetch('/api/sync', { method: 'POST' });
              const json = (await res.json()) as { results?: { source: string; fetched: number; changed: number; status: string }[] };
              setState(
                res.ok
                  ? (json.results ?? [])
                      .map((r) => `${r.source}: ${r.status} · ${r.fetched} seen · ${r.changed} new`)
                      .join('\n')
                  : 'sync failed',
              );
              router.refresh();
            } catch {
              setState('sync failed');
            }
          })
        }
      >
        {pending ? 'Pulling sources…' : 'Run law sync now'}
      </button>
      {state && (
        <pre className="model-note" style={{ whiteSpace: 'pre-wrap', marginTop: '0.6rem' }}>
          {state}
        </pre>
      )}
    </div>
  );
}

export function ChangeActions({ changeId }: { changeId: number }) {
  const [done, setDone] = useState(false);
  const [pending, start] = useTransition();
  const router = useRouter();

  if (done) return <span className="badge badge--ok">recorded</span>;

  return (
    <div className="btn-row">
      <button
        className="btn btn--sm"
        disabled={pending}
        onClick={() =>
          start(async () => {
            await post({ action: 'change', changeId, status: 'approved' });
            setDone(true);
            router.refresh();
          })
        }
      >
        Useful
      </button>
      <button
        className="btn btn--sm"
        disabled={pending}
        onClick={() =>
          start(async () => {
            await post({ action: 'change', changeId, status: 'rejected' });
            setDone(true);
            router.refresh();
          })
        }
      >
        Ignore
      </button>
    </div>
  );
}

export function SignOffForm() {
  const [provisionId, setProvisionId] = useState('');
  const [reviewer, setReviewer] = useState('');
  const [state, setState] = useState<'idle' | 'ok' | 'error'>('idle');
  const [pending, start] = useTransition();
  const router = useRouter();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        start(async () => {
          const ok = await post({ action: 'verify', provisionId: provisionId.trim(), reviewer: reviewer.trim() });
          setState(ok ? 'ok' : 'error');
          if (ok) router.refresh();
        });
      }}
    >
      <div className="two-col" style={{ gap: '0.8rem' }}>
        <label className="field">
          Provision id
          <input value={provisionId} onChange={(e) => setProvisionId(e.target.value)} placeholder="tpa-12" required />
        </label>
        <label className="field">
          Reviewer name
          <input value={reviewer} onChange={(e) => setReviewer(e.target.value)} placeholder="Adv. A. Rao" required />
        </label>
      </div>
      <button className="btn btn--sm" disabled={pending}>
        Record legal sign-off
      </button>
      {state === 'ok' && <span className="badge badge--ok" style={{ marginLeft: '0.6rem' }}>signed off</span>}
      {state === 'error' && <span className="badge badge--warn" style={{ marginLeft: '0.6rem' }}>failed</span>}
    </form>
  );
}

export function LogoutButton() {
  const [pending, start] = useTransition();
  const router = useRouter();
  return (
    <button
      className="btn btn--sm"
      disabled={pending}
      onClick={() =>
        start(async () => {
          await post({ action: 'logout' });
          router.refresh();
        })
      }
    >
      Sign out
    </button>
  );
}
