import type { Lang } from '../i18n/ui';
import type { Audience } from './waitlist';

// One welcome email, from Borja. No confirmation link: the form is the consent.
const copy = {
  en: {
    candidate: {
      subject: 'We’re building Amble',
      lines: [
        'Hi,',
        'We’re building Amble. The beta will be available soon, and you’re part of the beta-tester team :)',
        'We’ll send you the beta agent as soon as we’ve tested it end to end.',
        'Thanks for being part of it.',
      ],
    },
    company: {
      subject: 'We’re building Amble',
      lines: [
        'Hi,',
        'We’re building Amble, and the company side comes after the candidate beta.',
        'We’ll write as soon as there’s a place for you.',
        'Thanks for being part of it.',
      ],
    },
    sign: 'Borja',
  },
  es: {
    candidate: {
      subject: 'Estamos construyendo Amble',
      lines: [
        'Hola,',
        'Estamos construyendo Amble. La beta estará disponible pronto y formas parte del equipo de beta testers :)',
        'Te enviaremos el agente de la beta en cuanto lo hayamos probado de principio a fin.',
        'Gracias por formar parte.',
      ],
    },
    company: {
      subject: 'Estamos construyendo Amble',
      lines: [
        'Hola,',
        'Estamos construyendo Amble, y el lado de empresa llega después de la beta de candidatos.',
        'Te escribiremos en cuanto haya sitio para ti.',
        'Gracias por formar parte.',
      ],
    },
    sign: 'Borja',
  },
} satisfies Record<Lang, unknown>;

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function renderWelcome(lang: Lang, audience: Audience) {
  const { subject, lines } = copy[lang][audience];
  const sign = copy[lang].sign;
  const p = (s: string) =>
    `<p style="margin:0 0 16px;font:16px/1.6 -apple-system,'Segoe UI',sans-serif;color:#25251F">${esc(s)}</p>`;
  const html = `<div style="background:#F4F1EA;padding:40px 20px"><div style="max-width:520px;margin:0 auto">
<p style="margin:0 0 32px;font:500 20px Georgia,serif;color:#25251F">amble</p>
${lines.map(p).join('')}
<p style="margin:24px 0 0;font:16px/1.6 -apple-system,'Segoe UI',sans-serif;color:#25251F">${esc(sign)}</p>
</div></div>`;
  const text = [...lines, '', sign].join('\n\n').replace(/\n\n\n\n/, '\n\n');
  return { subject, html, text };
}
