export const languages = { en: 'English', es: 'Español' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';

// UI strings shared across pages. Long-form copy lives next to each page.
export const ui = {
  en: {
    'meta.title': 'Amble — your professional Rep',
    'meta.description':
      "I'm not looking. Amble is. Your professional Rep gets to know you, learns what matters, then listens.",
    'tab.away': 'Still listening.',
    'notfound.title': 'Nothing here.',
    'notfound.body': 'I’m still listening, though.',
    'notfound.back': 'Back to Amble',
    'nav.label': 'Main',
    'nav.join': 'Join the beta',
    // For someone who already has access: straight to the app.
    'nav.signIn': 'Sign in',
    'waitlist.haveAccess': 'Already have access? Sign in →',
    'nav.menu': 'Menu',
    'nav.close': 'Close menu',
    'nav.otherLang': 'Español',
    'footer.label': 'Footer',
    'footer.tagline': 'Your professional Rep.',
    'footer.privacy': 'Privacy',
    'footer.builtBy': 'Built by',
    'privacy.title': 'Privacy — Amble',
    'nav.companies': 'For companies',
    'nav.manifesto': 'Manifesto',
    'nav.howBuilt': 'How it’s built',
    'waitlist.label': 'Email',
    'waitlist.placeholder': 'you@work.dev',
    'waitlist.cta': 'Join the beta',
    'waitlist.sending': 'One moment…',
    'waitlist.note': 'Only about the beta. Nothing else.',
    'waitlist.ok': 'You’re on the list. Check your inbox.',
    'waitlist.invalid': 'That doesn’t look like an email address. Only the email, nothing else.',
    'waitlist.empty': 'Your email goes here.',
    'waitlist.slow-down': 'Too many tries. Give it a few minutes.',
    'waitlist.error': 'I couldn’t save that. Nothing has been lost. Try again in a moment.',
    'waitlist.doneTitle': 'You’re on the list.',
    'waitlist.doneBody': 'We’re opening the beta in small groups. When it’s your turn, you’ll get an email with your link to sign in. Until then, there’s nothing you need to do.',
    'waitlist.doneBodyCompany': 'You’re on the early-access list. There’s a short note in your inbox.',
    'joined.title': 'Your Rep is listening.',
    'joined.body': 'We’re opening the beta in small groups. When it’s your turn, you’ll get an email with your link to sign in. Until then, there’s nothing you need to do.',
    'back': 'Back to Amble',
  },
  es: {
    'meta.title': 'Amble — tu Rep profesional',
    'meta.description':
      'Yo no busco. Amble sí. Tu Rep profesional te conoce, aprende lo que te importa y escucha por ti.',
    'tab.away': 'Sigo escuchando.',
    'notfound.title': 'Aquí no hay nada.',
    'notfound.body': 'Pero sigo escuchando.',
    'notfound.back': 'Volver a Amble',
    'nav.label': 'Principal',
    // «Entrar» is signing in, in the app: joining is apuntarse.
    'nav.join': 'Apúntate a la beta',
    // For someone who already has access: straight to the app.
    'nav.signIn': 'Entrar',
    'waitlist.haveAccess': '¿Ya tienes acceso? Entra →',
    'nav.menu': 'Menú',
    'nav.close': 'Cerrar menú',
    'nav.otherLang': 'English',
    'footer.label': 'Pie de página',
    'footer.tagline': 'Tu Rep profesional.',
    'footer.privacy': 'Privacidad',
    'footer.builtBy': 'Hecho por',
    'privacy.title': 'Privacidad — Amble',
    'nav.companies': 'Para empresas',
    'nav.manifesto': 'Manifiesto',
    'nav.howBuilt': 'Cómo está hecho',
    'waitlist.label': 'Email',
    'waitlist.placeholder': 'tu@trabajo.dev',
    'waitlist.cta': 'Apuntarme a la beta',
    'waitlist.sending': 'Un momento…',
    'waitlist.note': 'Solo sobre la beta. Nada más.',
    'waitlist.ok': 'Estás en la lista. Revisa tu correo.',
    'waitlist.invalid': 'Eso no parece una dirección de email. Solo el email, nada más.',
    'waitlist.empty': 'Aquí va tu email.',
    'waitlist.slow-down': 'Demasiados intentos. Dale unos minutos.',
    'waitlist.error': 'No he podido guardarlo. No se ha perdido nada. Prueba otra vez en un momento.',
    'waitlist.doneTitle': 'Estás en la lista.',
    'waitlist.doneBody': 'Abrimos la beta por tandas. Cuando te toque, te llegará un email con tu enlace para entrar. Hasta entonces no tienes que hacer nada.',
    'waitlist.doneBodyCompany': 'Ya estás en la lista de acceso anticipado. Tienes una nota en tu correo.',
    'joined.title': 'Tu Rep está escuchando.',
    'joined.body': 'Abrimos la beta por tandas. Cuando te toque, te llegará un email con tu enlace para entrar. Hasta entonces no tienes que hacer nada.',
    'back': 'Volver a Amble',
  },
} as const;

export function useTranslations(lang: Lang) {
  return (key: keyof (typeof ui)['en']) => ui[lang][key] ?? ui[defaultLang][key];
}
