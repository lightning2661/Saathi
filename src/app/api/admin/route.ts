import { corpus } from '@/lib/data';
import { ADMIN_COOKIE, isOperator, operatorToken } from '@/lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Action = 'login' | 'logout' | 'verify' | 'unverify' | 'change';

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: 'invalid_json' }, { status: 400 });
  }

  const action = body.action as Action;

  if (action === 'login') {
    const expected = operatorToken();
    if (!expected || body.token !== expected) {
      return Response.json({ error: 'unauthorized' }, { status: 401 });
    }
    return Response.json(
      { ok: true },
      {
        headers: {
          'set-cookie': `${ADMIN_COOKIE}=${encodeURIComponent(expected)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=28800`,
          'cache-control': 'no-store',
        },
      },
    );
  }

  if (!isOperator(req)) return Response.json({ error: 'unauthorized' }, { status: 401 });

  if (action === 'logout') {
    return Response.json(
      { ok: true },
      { headers: { 'set-cookie': `${ADMIN_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0` } },
    );
  }

  const db = await corpus();

  if (action === 'verify' || action === 'unverify') {
    const provisionId = typeof body.provisionId === 'string' ? body.provisionId : '';
    const reviewer = typeof body.reviewer === 'string' ? body.reviewer.trim().slice(0, 80) : '';
    if (!provisionId || (action === 'verify' && reviewer.length < 2)) {
      return Response.json({ error: 'reviewer_required' }, { status: 400 });
    }
    await db.run('UPDATE provisions SET human_reviewed = ? WHERE id = ?', [
      action === 'verify' ? 1 : 0,
      provisionId,
    ]);
    // Named sign-off lives in the event log so a provision row stays a copy of the law.
    await db.run(
      'INSERT INTO events (id, created_at, kind, topic, lang, provider, dropped) VALUES (?, ?, ?, ?, ?, ?, 0)',
      [crypto.randomUUID(), new Date().toISOString(), action, provisionId, '', reviewer],
    );
    return Response.json({ ok: true });
  }

  if (action === 'change') {
    const changeId = Number(body.changeId);
    const status = body.status;
    if (!Number.isInteger(changeId) || (status !== 'approved' && status !== 'rejected')) {
      return Response.json({ error: 'bad_change' }, { status: 400 });
    }
    await db.run('UPDATE sync_changes SET status = ? WHERE id = ?', [status, changeId]);
    return Response.json({ ok: true });
  }

  return Response.json({ error: 'unknown_action' }, { status: 400 });
}
