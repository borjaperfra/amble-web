import type { APIRoute } from 'astro';
import { getRelativeLocaleUrl } from 'astro:i18n';
import { SITE_URL } from 'astro:env/server';
import type { Lang } from '../../i18n/ui';
import { join, normalizeEmail, releaseCooldown } from '../../lib/waitlist';
import { sendConfirmation } from '../../lib/email';
import { allow } from '../../lib/rate-limit';

export const prerender = false;

type Outcome = 'ok' | 'invalid' | 'error' | 'slow-down';

// Works with and without JavaScript: fetch() asks for JSON, a plain form post
// gets redirected to a page.
export const POST: APIRoute = async ({ request, clientAddress, redirect }) => {
  const form = await request.formData();
  const lang: Lang = form.get('locale') === 'es' ? 'es' : 'en';
  const wantsJson = request.headers.get('accept')?.includes('application/json');

  const reply = (outcome: Outcome, status: number) => {
    if (wantsJson) return Response.json({ outcome }, { status });
    const query = outcome === 'ok' ? '' : `?error=${outcome}`;
    return redirect(getRelativeLocaleUrl(lang, 'joined') + query, 303);
  };

  // Honeypot: bots fill every field. Pretend it worked.
  if (form.get('website')) return reply('ok', 200);

  if (!allow(clientAddress)) return reply('slow-down', 429);

  const parsed = normalizeEmail(String(form.get('email') ?? ''));
  if (!parsed) return reply('invalid', 400);

  try {
    const result = await join(parsed.email, parsed.normalized, lang);
    // Already confirmed or just sent: same answer, so the form can't be used to
    // find out who is on the list.
    if (result.kind === 'quiet') return reply('ok', 200);

    const link = new URL('/api/waitlist/confirm', SITE_URL);
    link.searchParams.set('token', result.token);
    link.searchParams.set('l', lang);
    const sent = await sendConfirmation(
      parsed.email,
      lang,
      link.toString(),
      `waitlist-confirm/${result.token.slice(0, 32)}`,
    );
    if (!sent) {
      await releaseCooldown(result.id);
      return reply('error', 502);
    }
    return reply('ok', 200);
  } catch (err) {
    console.error('[waitlist] join failed', err);
    return reply('error', 500);
  }
};

export const GET: APIRoute = () => new Response(null, { status: 405, headers: { allow: 'POST' } });

