import { corpus } from '@/lib/data';
import { answerQuestion } from '@/lib/answer';
import { LANGS, type Lang } from '@/lib/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_CHARS = 2000;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'invalid_json' }, { status: 400 });
  }

  const { text, lang, useModel } = (body ?? {}) as {
    text?: unknown;
    lang?: unknown;
    useModel?: unknown;
  };

  if (typeof text !== 'string' || text.trim().length < 3) {
    return Response.json({ error: 'text_required' }, { status: 400 });
  }
  if (text.length > MAX_CHARS) {
    return Response.json({ error: 'text_too_long', max: MAX_CHARS }, { status: 413 });
  }
  const language: Lang = LANGS.includes(lang as Lang) ? (lang as Lang) : 'en';

  try {
    const db = await corpus();
    const answer = await answerQuestion(db, text.trim(), {
      lang: language,
      useModel: useModel === true,
    });
    return Response.json(answer, {
      headers: { 'cache-control': 'no-store', 'x-saathi-model': answer.model.provider },
    });
  } catch (error) {
    console.error('[ask] failed', error instanceof Error ? error.message : error);
    return Response.json({ error: 'answer_failed' }, { status: 500 });
  }
}
