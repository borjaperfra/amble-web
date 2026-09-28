import type { Lang } from '../i18n/ui';
import type { HomeContent } from './home';
import { manifesto, type Block } from './pages';

// The home's second version, live since 2026-09-28. It follows the manifesto's
// order: the old loop, then not looking ≠ not listening, then what a Rep is,
// and only then the demo, in three stages instead of six. Only the hero and the
// stages are new copy: the essay blocks are the manifesto's own, the scenes the
// home's.
export interface HomeV2Content {
  stages: { id: 'knows' | 'listens' | 'tells'; label: string }[];
  hero: HomeContent['hero'];
  // Manifesto blocks: the old loop, what a Rep is, where it goes.
  problem: Block[];
  rep: Block[];
  future: Block[];
}

function essay(lang: Lang) {
  const { intro, future } = manifesto[lang];
  const loop = intro.findIndex((b) => b.kind === 'figure' && b.figure === 'loop');
  const chapters = intro.flatMap((b, i) => (b.kind === 'chapter' ? [i] : []));
  // Its second chapter ("Most people aren't looking") is the home's own scene.
  return { problem: intro.slice(0, loop + 1), rep: intro.slice(chapters[1]), future };
}

export const homeV2: Record<Lang, HomeV2Content> = {
  en: {
    stages: [
      { id: 'knows', label: 'Knows you' },
      { id: 'listens', label: 'Listens' },
      { id: 'tells', label: 'Tells you' },
    ],
    hero: {
      title: ['I’m not looking.', 'is.'],
      thesis: ['The job market is built for people looking for jobs.', 'Amble is built for people who aren’t.'],
      subtitle: 'It gives you a Rep: an agent that knows your work, listens to the market for you, and only speaks up when something deserves your time.',
      more: 'See why',
    },
    ...essay('en'),
  },
  es: {
    stages: [
      { id: 'knows', label: 'Te conoce' },
      { id: 'listens', label: 'Escucha' },
      { id: 'tells', label: 'Te avisa' },
    ],
    hero: {
      title: ['Yo no busco.', 'sí.'],
      thesis: ['El mercado laboral está construido para quien busca trabajo.', 'Amble, para quien no.'],
      subtitle: 'Te da un Rep: un agente que conoce tu trabajo, escucha el mercado por ti y solo te avisa cuando algo merece tu tiempo.',
      more: 'Mira por qué',
    },
    ...essay('es'),
  },
};
