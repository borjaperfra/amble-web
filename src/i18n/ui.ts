export const languages = { en: 'English', es: 'Español' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';

// UI strings shared across pages. Long-form copy lives next to each page.
export const ui = {
  en: {
    'meta.title': 'Amble — your professional Rep',
    'meta.description':
      "I'm not looking. Amble is. Your professional Rep gets to know you, learns what matters, then listens.",
    'nav.manifesto': 'Manifesto',
    'nav.howBuilt': 'How it’s built',
    'waitlist.label': 'Email',
    'waitlist.cta': 'Join the beta',
  },
  es: {
    'meta.title': 'Amble — tu Rep profesional',
    'meta.description':
      'Yo no busco. Amble sí. Tu Rep profesional te conoce, aprende lo que te importa y escucha por ti.',
    'nav.manifesto': 'Manifiesto',
    'nav.howBuilt': 'Cómo está hecho',
    'waitlist.label': 'Email',
    'waitlist.cta': 'Entrar en la beta',
  },
} as const;

export function useTranslations(lang: Lang) {
  return (key: keyof (typeof ui)['en']) => ui[lang][key] ?? ui[defaultLang][key];
}
