import type { Lang } from '../i18n/ui';
import type { Audience } from './waitlist';
import { renderLetterHtml, renderLetterText, type Letter } from './email-layout';

// One welcome email, from Borja, in amble's letter layout. No confirmation
// link: the form is the consent.
type Welcome = Omit<Letter, 'lang'> & { subject: string };

const copy: Record<Lang, Record<Audience, Welcome>> = {
  en: {
    candidate: {
      subject: 'You’re on the amble list',
      preheader: 'When it’s your turn, your link to sign in arrives by email.',
      intro: [
        'Hi,',
        'You’re on the amble waitlist. We’re opening the beta little by little, in small groups, so we can look after everyone who comes in.',
        'When it’s your turn, you’ll get an email from hola@amble.fyi with your link to sign in. You don’t need to create an account or do anything else until then. If you don’t see it, check your spam folder.',
        'Thanks for wanting to try it,',
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
      subject: 'Estás en la lista de amble',
      preheader: 'Cuando te toque, te llegará por email tu enlace para entrar.',
      intro: [
        'Hola,',
        'Ya estás en la lista de espera de amble. Estamos abriendo la beta poco a poco, por tandas, para cuidar a cada persona que entra.',
        'Cuando te toque, te llegará un email de hola@amble.fyi con tu enlace para entrar. No necesitas crear cuenta ni hacer nada más hasta entonces. Si no lo ves, mira en la carpeta de spam.',
        'Gracias por querer probarlo,',
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
