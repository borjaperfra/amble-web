import { Resend } from 'resend';
import { RESEND_API_KEY, WAITLIST_FROM } from 'astro:env/server';
import type { Lang } from '../i18n/ui';

const copy = {
  en: {
    subject: 'Confirm your email for the Amble beta',
    lines: [
      'Hi,',
      'Someone, hopefully you, asked to join the Amble beta with this address.',
    ],
    cta: 'Confirm my email',
    after: [
      'Amble is in closed beta. We’re building it with the people who use it, and we’ll write when there’s a place for you.',
      'If it wasn’t you, ignore this email. Nothing else will arrive.',
    ],
    sign: 'Amble',
  },
  es: {
    subject: 'Confirma tu email para la beta de Amble',
    lines: [
      'Hola,',
      'Alguien, ojalá tú, ha pedido entrar en la beta de Amble con esta dirección.',
    ],
    cta: 'Confirmar mi email',
    after: [
      'Amble está en beta cerrada. Lo estamos construyendo con quienes lo usan, y te escribiremos cuando haya sitio para ti.',
      'Si no has sido tú, ignora este email. No te llegará nada más.',
    ],
    sign: 'Amble',
  },
} satisfies Record<Lang, unknown>;

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function render(lang: Lang, link: string) {
  const c = copy[lang];
  const p = (s: string) =>
    `<p style="margin:0 0 16px;font:16px/1.6 -apple-system,'Segoe UI',sans-serif;color:#25251F">${esc(s)}</p>`;
  const html = `<div style="background:#F4F1EA;padding:40px 20px"><div style="max-width:520px;margin:0 auto">
<p style="margin:0 0 32px;font:500 20px Georgia,serif;color:#25251F">amble</p>
${c.lines.map(p).join('')}
<p style="margin:24px 0 32px"><a href="${esc(link)}" style="display:inline-block;padding:14px 22px;background:#25251F;color:#FAF8F3;border-radius:10px;text-decoration:none;font:500 16px -apple-system,'Segoe UI',sans-serif">${esc(c.cta)}</a></p>
${c.after.map(p).join('')}
<p style="margin:32px 0 0;font:16px/1.6 -apple-system,'Segoe UI',sans-serif;color:#67675F">— ${esc(c.sign)}</p>
</div></div>`;
  const text = [...c.lines, '', `${c.cta}: ${link}`, '', ...c.after, '', `— ${c.sign}`].join('\n');
  return { subject: c.subject, html, text };
}

export async function sendConfirmation(to: string, lang: Lang, link: string, idempotencyKey: string) {
  const { subject, html, text } = render(lang, link);

  if (!RESEND_API_KEY) {
    // Local development without Resend: the link is the only thing that matters.
    console.log(`[waitlist] confirmation for ${to} (${lang}): ${link}`);
    return true;
  }

  const resend = new Resend(RESEND_API_KEY);
  const { error } = await resend.emails.send(
    { from: WAITLIST_FROM, to: [to], subject, html, text },
    { idempotencyKey },
  );
  if (error) {
    console.error(`[waitlist] resend failed: ${error.name}: ${error.message}`);
    return false;
  }
  return true;
}
