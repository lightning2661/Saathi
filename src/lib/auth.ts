/**
 * Stopgap auth for operational routes. The public app needs no account, so the
 * only privileged surface is law review and sync — both gated by one operator
 * secret. Replace with real sessions before a multi-operator deployment.
 */
export function operatorToken(): string | null {
  const token = process.env.SAATHI_SYNC_TOKEN;
  if (!token || token === 'dev-only-change-me' || token.length < 12) return null;
  return token;
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export function presentedToken(req: Request): string | null {
  const header = req.headers.get('authorization');
  if (header?.toLowerCase().startsWith('bearer ')) return header.slice(7).trim();
  const direct = req.headers.get('x-saathi-token');
  if (direct) return direct.trim();
  const cookie = req.headers.get('cookie') ?? '';
  const match = cookie.match(/(?:^|;\s*)saathi_admin=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export function isOperator(req: Request): boolean {
  const expected = operatorToken();
  const got = presentedToken(req);
  if (!expected || !got) return false;
  return timingSafeEqual(expected, got);
}

export const ADMIN_COOKIE = 'saathi_admin';
