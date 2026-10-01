import type { Lang } from '../i18n/ui';
import type { Audience } from './waitlist';
import { renderLetterHtml, renderLetterText, type Letter } from './email-layout';

// One welcome email, from Borja, in amble's letter layout. No confirmation
// link: the form is the consent.
type Welcome = Omit<Letter, 'lang'> & { subject: string };

const copy: Record<Lang, Record<Audience, Welcome>> = {
  en: {
    candidate: {
      subject: 'We’re building amble',
      preheader: 'You’re on the list for the beta.',
      intro: [
        'Hi,',
        'We’re building amble. The beta will be available soon, and you’re part of the beta-tester team :)',
        'We’ll write to you with your way in as soon as we’ve tested it end to end.',
        'Thanks for being part of it.',
      ],
      signature: ['Borja'],
      footer: 'You’re getting this because you joined the amble waitlist at amble.fyi.',
    },
    company: {
      subject: 'We’re building amble',
      preheader: 'You’re on the list for companies.',
      intro: [
        'Hi,',
        'We’re building amble, and the company side comes after the candidate beta.',
        'We’ll write as soon as there’s a place for you.',
        'Thanks for being part of it.',
      ],
      signature: ['Borja'],
      footer: 'You’re getting this because you joined the amble company waitlist at amble.fyi.',
    },
  },
  es: {
    candidate: {
      subject: 'Estamos construyendo amble',
      preheader: 'Ya estás en la lista de la beta.',
      intro: [
        'Hola,',
        'Estamos construyendo amble. La beta estará disponible pronto y formas parte del equipo de beta testers :)',
        'Te escribiremos con tu acceso en cuanto lo hayamos probado de principio a fin.',
        'Gracias por formar parte.',
      ],
      signature: ['Borja'],
      footer: 'Recibes este email porque te apuntaste a la lista de espera de amble en amble.fyi.',
    },
    company: {
      subject: 'Estamos construyendo amble',
      preheader: 'Ya estás en la lista de empresas.',
      intro: [
        'Hola,',
        'Estamos construyendo amble, y el lado de empresa llega después de la beta de candidatos.',
        'Te escribiremos en cuanto haya sitio para ti.',
        'Gracias por formar parte.',
      ],
      signature: ['Borja'],
      footer: 'Recibes este email porque te apuntaste a la lista de empresas de amble en amble.fyi.',
    },
  },
};

export function renderWelcome(lang: Lang, audience: Audience) {
  const { subject, ...letter } = copy[lang][audience];
  const parts: Letter = { lang, ...letter };
  return { subject, html: renderLetterHtml(parts), text: renderLetterText(parts) };
}
