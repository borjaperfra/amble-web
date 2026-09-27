import { Resend } from 'resend';
import { RESEND_API_KEY, WAITLIST_FROM } from 'astro:env/server';
import type { Lang } from '../i18n/ui';
import { renderWelcome } from './welcome';
import type { Audience } from './waitlist';

export async function sendWelcome(to: string, lang: Lang, audience: Audience, idempotencyKey: string) {
  const { subject, html, text } = renderWelcome(lang, audience);

  if (!RESEND_API_KEY) {
    // Local development without Resend.
    console.log(`[waitlist] welcome for ${to} (${lang}, ${audience})`);
    return true;
  }

  const resend = new Resend(RESEND_API_KEY);
  const { error } = await resend.emails.send({ from: WAITLIST_FROM, to: [to], subject, html, text }, { idempotencyKey });
  if (error) {
    console.error(`[waitlist] resend failed: ${error.name}: ${error.message}`);
    return false;
  }
  return true;
}
