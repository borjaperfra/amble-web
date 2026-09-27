import type { APIRoute } from 'astro';
import { getRelativeLocaleUrl } from 'astro:i18n';
import type { Lang } from '../../i18n/ui';
import { parseEmail } from '../../lib/email-rules';
import { join, markWelcomed, releaseCooldown } from '../../lib/waitlist';
import { sendWelcome } from '../../lib/email';
import { SITE_URL } from 'astro:env/server';
import { allow } from '../../lib/rate-limit';
import { bump } from '../../lib/counts';

export const prerender = false;

type Outcome = 'ok' | 'invalid' | 'error' | 'slow-down';

// The form sends these and nothing else. Anything more is not our form.
const ALLOWED_FIELDS = new Set(['email', 'locale', 'website', 'audience']);
const LOCALES = new Set<Lang>(['en', 'es']);
const MAX_BODY_BYTES = 1024;

async function readForm(request: Request): Promise<URLSearchParams | null> {
  const type = request.headers.get('content-type') ?? '';
  if (!type.toLowerCase().startsWith('application/x-www-form-urlencoded')) return null;

  const declared = Number(request.headers.get('content-length') ?? 0);
  if (declared > MAX_BODY_BYTES) return null;
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return null;

  const form = new URLSearchParams(raw);
  const seen = new Set<string>();
  for (const key of form.keys()) {
    if (!ALLOWED_FIELDS.has(key) || seen.has(key)) return null;
    seen.add(key);
  }
  return form;
}

// Works with and without JavaScript: fetch() asks for JSON, a plain form post
// gets redirected to a page.
export const POST: APIRoute = async ({ request, clientAddress, redirect }) => {
  const wantsJson = request.headers.get('accept')?.includes('application/json');
  const form = await readForm(request).catch(() => null);
  const localeField = form?.get('locale');
  const lang: Lang = localeField === 'es' ? 'es' : 'en';

  const reply = (outcome: Outcome, status: number) => {
    if (wantsJson) return Response.json({ outcome }, { status });
    const query = outcome === 'ok' ? '' : `?error=${outcome}`;
    return redirect(getRelativeLocaleUrl(lang, 'joined') + query, 303);
  };

  if (!form) return reply('invalid', 400);
  if (localeField !== null && !LOCALES.has(localeField as Lang)) return reply('invalid', 400);
  const audienceField = form.get('audience') ?? 'candidate';
  if (audienceField !== 'candidate' && audienceField !== 'company') return reply('invalid', 400);

  // Honeypot: bots fill every field. Pretend it worked.
  if (form.get('website')) return reply('ok', 200);

  // Behind Railway's proxy the socket address is the proxy's. The last entry of
  // X-Forwarded-For is the one the proxy appended, so it can't be forged.
  const forwarded = request.headers.get('x-forwarded-for')?.split(',').pop()?.trim();
  if (!allow(forwarded || clientAddress)) return reply('slow-down', 429);

  const parsed = parseEmail(form.get('email'));
  if (!parsed) return reply('invalid', 400);

  try {
    const result = await join(parsed.email, parsed.normalized, lang, audienceField);
    // Already on the list: same answer, so the form can't be used to find out
    // who is on it.
    if (result.kind === 'quiet') return reply('ok', 200);

    // The Resend account is shared by every environment, so the key names the
    // site as well as the row; and the language, since a retry may change it.
    const key = `waitlist-welcome/${new URL(SITE_URL).host}/${result.id}/${lang}`;
    // The row is saved either way. If Resend is down or over its daily cap the
    // person is still on the list: the welcome stays pending, and
    // scripts/send-welcomes.mts sends it later.
    const sent = await sendWelcome(parsed.email, lang, audienceField, key);
    if (sent) await markWelcomed(result.id);
    else await releaseCooldown(result.id);
    await bump('join', lang, audienceField === 'company' ? 'company' : '').catch(() => {});
    return reply('ok', 200);
  } catch (err) {
    console.error('[waitlist] join failed', err instanceof Error ? err.message : err);
    return reply('error', 500);
  }
};

const notAllowed = () => new Response(null, { status: 405, headers: { allow: 'POST' } });
export const GET: APIRoute = notAllowed;
export const PUT: APIRoute = notAllowed;
export const PATCH: APIRoute = notAllowed;
export const DELETE: APIRoute = notAllowed;
