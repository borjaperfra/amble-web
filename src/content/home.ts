import type { Lang } from '../i18n/ui';

// Home page copy and the demo profile it shows working. One object per
// language, same shape, so every section renders from data.
//
// The page shows more than it says: each section is a headline, at most one
// short line, and a scene. Keep it that way — if a scene needs a paragraph to
// be understood, the scene is wrong.
//
// The demo profiles (Maya in EN, Marta in ES) follow the product's rules: every
// claim carries a source, gaps are named as gaps, and assisted work is marked
// until defended.

export type Source = 'cv' | 'li' | 'gh' | 'web' | 'int';
export type Strength = 4 | 3 | 2 | 1 | 0;

// One source document in the "It gets to know you" story. Lines with a claim
// are picked out by the Rep and fly into the capability they support.
export interface StorySource {
  id: 'cv' | 'gh' | 'web' | 'li';
  source: Source;
  title: string;
  lines: { text: string; kind?: 'name' | 'meta'; claim?: { id: string; cap: string; assisted?: boolean } }[];
}

export interface HomeContent {
  hero: {
    tag: string;
    title: [string, string]; // second line gets the italic "Amble"
    subtitle: string;
    more: string;
  };
  story: {
    interlude: [string, string];
    interludeBody: string;
    steps: { kicker: string; title: string; body: string }[];
    sources: StorySource[];
    caps: { id: string; name: string; strength: Strength; count: string }[];
    unknown: { label: string; name: string; strength: Strength; note: string };
    assisted: string;
    // Shown with step 02, so the highlight reads as "this, read here".
    legend: { claim: string; source: string };
  };
  interview: {
    kicker: string;
    title: string;
    rep: string;
    // What the Rep read, and what it concluded it couldn't tell.
    clues: { source: Source; text: string; reads: string }[];
    question: string;
    gap: string;
    talk: string;
  };
  defence: {
    kicker: string;
    title: string;
    line: string;
    cases: {
      file: string;
      code: { text: string; key?: boolean }[];
      claim: string;
      assisted: string;
      ask: string;
      answer: string;
      verdict: 'defended' | 'retracted';
      stamp: string;
      outcome: string;
    }[];
  };
  distinctive: {
    kicker: string;
    words: string[];
    line: string;
  };
  triage: {
    kicker: string;
    title: string;
    line: string;
    who: string;
    verdicts: string[];
    offers: {
      role: string;
      company: string;
      facts: string[];
      verdict: string;
      reason: string;
      learned: { type: string; text: string };
    }[];
    learnedLabel: string;
  };
  listening: {
    kicker: string;
    title: string;
    status: string;
    items: string[];
    empty: [string, string];
  };
  roadmap: {
    kicker: string;
    title: string;
    now: string;
    steps: { version: string; title: string; line: string; extra?: string }[];
  };
  career: {
    kicker: string;
    title: string;
    line: string;
    file: string;
    // flag marks assisted-undefended lines; retracted marks lines the Rep stopped claiming.
    lines: { text: string; tags?: string; flag?: string; retracted?: boolean; kind: 'h1' | 'h2' | 'p' | 'li' | 'blank' }[];
  };
  data: {
    kicker: string;
    title: string;
    items: { icon: 'why' | 'correct' | 'export' | 'delete'; title: string; line: string }[];
    // The demo card the four controls act on.
    demo: {
      private: string;
      claim: [string, string]; // [first word, rest] — the first word is what gets corrected
      why: { file: string; excerpt: string };
      correct: { word: string; note: string };
      export: { file: string; note: string };
      deleted: string;
    };
  };
  finale: {
    title: string;
    body: string;
  };
  strength: Record<Strength, string>;
  sourceNames: Record<Source, string>;
}

const en: HomeContent = {
  hero: {
    tag: 'Closed beta',
    title: ['I’m not looking.', 'is.'],
    subtitle: 'Meet your professional Rep. It listens for the offers worth your time, and negotiates them for you.',
    more: 'See how it works',
  },
  story: {
    interlude: ['You’re more than', 'a PDF.'],
    interludeBody: 'Your CV says where you’ve been. Your Rep finds out what you’ve done.',
    steps: [
      { kicker: '01 · Reads', title: 'It reads before it asks.', body: 'CV, LinkedIn, GitHub, your writing.' },
      { kicker: '02 · Claims', title: 'Every claim keeps its source.', body: 'What it can’t source, it doesn’t say.' },
      { kicker: '03 · Evidence', title: 'Evidence, not adjectives.', body: 'One source is a hint. Three is a pattern.' },
      { kicker: '04 · Capabilities', title: 'Strength you can check.', body: 'And it names what it doesn’t know yet.' },
    ],
    sources: [
      {
        id: 'cv',
        source: 'cv',
        title: 'CV_Maya_Lindqvist_2026.pdf',
        lines: [
          { text: 'Maya Lindqvist', kind: 'name' },
          { text: 'AI Engineer · Stockholm', kind: 'meta' },
          { text: 'Lantern Labs · 2024 —', kind: 'meta' },
          { text: 'Led the evaluation pipeline for support agents.', claim: { id: 'c1', cap: 'eval' } },
          { text: 'Rebuilt retrieval after it failed an audit.', claim: { id: 'c2', cap: 'retrieval' } },
          { text: 'Fjord Data · 2020 — 2024', kind: 'meta' },
          { text: 'Shipped two production search systems.', claim: { id: 'c3', cap: 'retrieval' } },
          { text: 'Mentored two engineers.' },
        ],
      },
      {
        id: 'gh',
        source: 'gh',
        title: 'mlindqvist',
        lines: [
          { text: 'tern · eval harness for LLM agents · ★ 1.2k', claim: { id: 'c4', cap: 'eval', assisted: true } },
          { text: 'rag-audit · retrieval regression tests', claim: { id: 'c5', cap: 'retrieval' } },
          { text: 'dotfiles' },
        ],
      },
      {
        id: 'web',
        source: 'web',
        title: 'Writing',
        lines: [
          { text: 'Your eval set is lying to you', claim: { id: 'c6', cap: 'eval' } },
          { text: 'Graders are models too', claim: { id: 'c7', cap: 'writing' } },
        ],
      },
      {
        id: 'li',
        source: 'li',
        title: 'Profile',
        lines: [
          { text: 'Talk · Measuring agents, PyData Berlin 2025', claim: { id: 'c8', cap: 'writing' } },
          { text: '412 connections' },
        ],
      },
    ],
    caps: [
      { id: 'eval', name: 'LLM evaluation', strength: 4, count: '3 pieces of evidence' },
      { id: 'retrieval', name: 'Retrieval systems', strength: 3, count: '3 pieces of evidence' },
      { id: 'writing', name: 'Technical writing', strength: 3, count: '2 pieces of evidence' },
    ],
    unknown: {
      label: 'I don’t know yet',
      name: 'Leading a team',
      strength: 1,
      note: 'Mentoring two engineers isn’t leading a team. I can’t tell yet.',
    },
    assisted: 'co-produced',
    legend: { claim: 'a claim', source: 'where it was read' },
  },
  interview: {
    kicker: 'The interview',
    title: 'Then it asks what it couldn’t read.',
    rep: 'Your Rep',
    clues: [
      { source: 'cv', text: 'Led the evaluation pipeline', reads: 'she led it' },
      { source: 'gh', text: 'tern · 92% of commits', reads: 'she wrote it' },
    ],
    question: 'Who decided what to measure?',
    gap: 'Neither says who decided.',
    talk: 'Hold to talk',
  },
  defence: {
    kicker: 'It checks itself',
    title: 'Code shows what shipped. Not who decided.',
    line: 'Defend it, and it stays. If you can’t, your Rep stops claiming it.',
    cases: [
      {
        file: 'tern/export.py',
        code: [
          { text: 'traces.save(local=True)', key: true },
          { text: 'upload(scores)  # never traces' },
        ],
        claim: 'Keeps traces local, ships only scores',
        assisted: 'co-produced',
        ask: 'Why is the line there?',
        answer: '“Traces carry customer prompts. Scores don’t.”',
        verdict: 'defended',
        stamp: 'Defended',
        outcome: 'Now evidence of her own judgment.',
      },
      {
        file: 'tern/cache.py',
        code: [
          { text: 'key = sha256(prompt)', key: true },
          { text: 'return store.get(key)' },
        ],
        claim: 'Designed the caching strategy',
        assisted: 'co-produced',
        ask: 'Why cache by prompt hash?',
        answer: '“Honestly, the agent picked that.”',
        verdict: 'retracted',
        stamp: 'Retracted',
        outcome: 'Kept on record. No longer claimed.',
      },
    ],
  },
  distinctive: {
    kicker: 'What makes Maya, Maya',
    words: ['LLM evaluation', 'Developer tools', 'Clear writing'],
    line: 'Not a score. A combination.',
  },
  triage: {
    kicker: 'It learns what matters',
    title: 'Teach it with your choices.',
    line: 'A yes is data. A no is better data.',
    who: 'Maya',
    verdicts: ['Yes', 'Yes, if…', 'Depends', 'No'],
    offers: [
      {
        role: 'Founding AI Engineer',
        company: 'Seed · 6 people',
        facts: ['€115K + 1.2%', 'Remote', 'Solo on-call'],
        verdict: 'No',
        reason: '“I won’t carry a pager alone again.”',
        learned: { type: 'Won’t consider', text: 'Solo on-call' },
      },
      {
        role: 'Staff AI Engineer',
        company: 'Series C · 400 people',
        facts: ['€150K', 'Berlin office', '3 days a week'],
        verdict: 'Yes, if…',
        reason: '“…I can stay in Stockholm.”',
        learned: { type: 'Weighs most', text: 'Staying remote' },
      },
      {
        role: 'Eval Lead',
        company: 'Series A · 40 people',
        facts: ['€118K + 0.3%', 'Remote', 'Owns all evals'],
        verdict: 'Yes',
        reason: '“That’s the job I’d build myself.”',
        learned: { type: 'Floor', text: '~€115K for the right work' },
      },
    ],
    learnedLabel: 'What I learned',
  },
  listening: {
    kicker: 'Then it listens',
    title: 'Silence is a feature.',
    status: 'Listening',
    items: ['AI evaluation', 'Staff or senior', 'Remote', '€115K+', 'No solo on-call'],
    empty: ['Nothing worth bothering you with.', 'I’m still listening.'],
  },
  roadmap: {
    kicker: 'Where it’s going',
    title: 'Built in steps, in the open.',
    now: 'Now',
    steps: [
      { version: 'v0', title: 'Your Rep', line: 'Closed beta. We fix what breaks, with you.', extra: '+ career coach' },
      { version: 'v1', title: 'It reads the offers', line: 'Brings you only the ones that fit.' },
      { version: 'v2', title: 'Agent to agent', line: 'Yours talks to theirs. No applications.' },
    ],
  },
  career: {
    kicker: 'career.md',
    title: 'A profile you can carry.',
    line: 'Plain text. Every line has a source.',
    file: 'career.md',
    lines: [
      { kind: 'h1', text: '# Maya Lindqvist' },
      { kind: 'blank', text: '' },
      { kind: 'p', text: 'AI engineer who makes models measurable before they ship.', tags: '[int] [web]' },
      { kind: 'blank', text: '' },
      { kind: 'h2', text: '## What the work shows' },
      { kind: 'li', text: '- Built the eval pipeline for Lantern’s support agents.', tags: '[cv] [gh]' },
      { kind: 'li', text: '- tern · traces stay local, only scores leave.', tags: '[gh] [int]' },
      { kind: 'li', text: '- tern · plugin system for custom graders.', tags: '[gh]', flag: 'co-produced, undefended' },
      { kind: 'blank', text: '' },
      { kind: 'h2', text: '## Retracted' },
      { kind: 'li', text: '- Designed the caching strategy for model calls.', flag: 'retracted in interview', retracted: true },
    ],
  },
  data: {
    kicker: 'Your data is yours',
    title: 'Private by default.',
    items: [
      { icon: 'why', title: 'See why', line: 'Every claim, its source.' },
      { icon: 'correct', title: 'Correct it', line: 'Dispute, fix, add context.' },
      { icon: 'export', title: 'Take it', line: 'Export, or sync to your GitHub.' },
      { icon: 'delete', title: 'Delete it', line: 'Gone means gone.' },
    ],
    demo: {
      private: 'Only you can see this',
      claim: ['Led', 'the evaluation pipeline for support agents.'],
      why: { file: 'CV_Maya_Lindqvist_2026.pdf · page 1', excerpt: '“…Led the evaluation pipeline for support agents at Lantern Labs…”' },
      correct: { word: 'Co-led', note: 'Corrected by Maya' },
      export: { file: 'career.md', note: 'Synced to github.com/mlindqvist/career' },
      deleted: 'Gone. Nothing kept.',
    },
  },
  finale: {
    title: 'Remove applications.',
    body: 'Join the closed beta. We’ll write when there’s a place for you.',
  },
  strength: {
    4: 'Strong evidence',
    3: 'Good evidence',
    2: 'Some evidence',
    1: 'Limited evidence',
    0: 'No evidence yet',
  },
  sourceNames: { cv: 'CV', li: 'LinkedIn', gh: 'GitHub', web: 'Website', int: 'Interview' },
};

const es: HomeContent = {
  hero: {
    tag: 'Beta cerrada',
    title: ['Yo no busco.', 'sí.'],
    subtitle: 'Conoce a tu Rep profesional. Escucha las ofertas que merecen tu tiempo y las negocia por ti.',
    more: 'Mira cómo funciona',
  },
  story: {
    interlude: ['Eres más que', 'un PDF.'],
    interludeBody: 'Tu CV dice dónde has estado. Tu Rep averigua qué has hecho.',
    steps: [
      { kicker: '01 · Lee', title: 'Lee antes de preguntar.', body: 'CV, LinkedIn, GitHub, lo que escribes.' },
      { kicker: '02 · Afirmaciones', title: 'Cada afirmación guarda su fuente.', body: 'Lo que no puede respaldar, no lo dice.' },
      { kicker: '03 · Evidencia', title: 'Evidencia, no adjetivos.', body: 'Una fuente es un indicio. Tres, un patrón.' },
      { kicker: '04 · Capacidades', title: 'Una fuerza que puedes comprobar.', body: 'Y nombra lo que aún no sabe.' },
    ],
    sources: [
      {
        id: 'cv',
        source: 'cv',
        title: 'CV_Marta_Quiroga_2026.pdf',
        lines: [
          { text: 'Marta Quiroga', kind: 'name' },
          { text: 'Ingeniera de IA · Valencia', kind: 'meta' },
          { text: 'Farolillo Labs · 2024 —', kind: 'meta' },
          { text: 'Lideró el pipeline de evaluación de los agentes de soporte.', claim: { id: 'c1', cap: 'eval' } },
          { text: 'Rehízo la recuperación tras suspender una auditoría.', claim: { id: 'c2', cap: 'retrieval' } },
          { text: 'Tramontana Data · 2020 — 2024', kind: 'meta' },
          { text: 'Puso en producción dos buscadores.', claim: { id: 'c3', cap: 'retrieval' } },
          { text: 'Mentora de dos ingenieros.' },
        ],
      },
      {
        id: 'gh',
        source: 'gh',
        title: 'mquiroga',
        lines: [
          { text: 'sonda · banco de evaluación para agentes · ★ 1,2k', claim: { id: 'c4', cap: 'eval', assisted: true } },
          { text: 'rag-audit · tests de regresión de recuperación', claim: { id: 'c5', cap: 'retrieval' } },
          { text: 'dotfiles' },
        ],
      },
      {
        id: 'web',
        source: 'web',
        title: 'Artículos',
        lines: [
          { text: 'Tu set de evaluación te está mintiendo', claim: { id: 'c6', cap: 'eval' } },
          { text: 'Los evaluadores también son modelos', claim: { id: 'c7', cap: 'writing' } },
        ],
      },
      {
        id: 'li',
        source: 'li',
        title: 'Perfil',
        lines: [
          { text: 'Charla · Medir agentes, PyData Madrid 2025', claim: { id: 'c8', cap: 'writing' } },
          { text: '412 contactos' },
        ],
      },
    ],
    caps: [
      { id: 'eval', name: 'Evaluación de LLMs', strength: 4, count: '3 evidencias' },
      { id: 'retrieval', name: 'Sistemas de recuperación', strength: 3, count: '3 evidencias' },
      { id: 'writing', name: 'Escritura técnica', strength: 3, count: '2 evidencias' },
    ],
    unknown: {
      label: 'Aún no lo sé',
      name: 'Liderar un equipo',
      strength: 1,
      note: 'Ser mentora de dos ingenieros no es liderar un equipo. Aún no lo sé.',
    },
    assisted: 'co-producido',
    legend: { claim: 'una afirmación', source: 'dónde se leyó' },
  },
  interview: {
    kicker: 'La entrevista',
    title: 'Luego pregunta lo que no pudo leer.',
    rep: 'Tu Rep',
    clues: [
      { source: 'cv', text: 'Lideró el pipeline de evaluación', reads: 'lo lideró' },
      { source: 'gh', text: 'sonda · 92 % de los commits', reads: 'lo escribió' },
    ],
    question: '¿Quién decidió qué medir?',
    gap: 'Ninguno dice quién decidió.',
    talk: 'Mantén para hablar',
  },
  defence: {
    kicker: 'Se comprueba a sí mismo',
    title: 'El código dice qué se envió. No quién lo decidió.',
    line: 'Si lo defiendes, se queda. Si no puedes, tu Rep deja de afirmarlo.',
    cases: [
      {
        file: 'sonda/export.py',
        code: [
          { text: 'traces.save(local=True)', key: true },
          { text: 'upload(scores)  # nunca trazas' },
        ],
        claim: 'Deja las trazas en local y solo envía puntuaciones',
        assisted: 'co-producido',
        ask: '¿Por qué está la línea ahí?',
        answer: '«Las trazas llevan prompts de clientes. Las puntuaciones no.»',
        verdict: 'defended',
        stamp: 'Defendida',
        outcome: 'Ahora es evidencia de su propio criterio.',
      },
      {
        file: 'sonda/cache.py',
        code: [
          { text: 'key = sha256(prompt)', key: true },
          { text: 'return store.get(key)' },
        ],
        claim: 'Diseñó la estrategia de caché',
        assisted: 'co-producido',
        ask: '¿Por qué cachear por hash del prompt?',
        answer: '«La verdad, eso lo eligió el agente.»',
        verdict: 'retracted',
        stamp: 'Retirada',
        outcome: 'Queda registrada. Ya no se afirma.',
      },
    ],
  },
  distinctive: {
    kicker: 'Lo que hace a Marta, Marta',
    words: ['Evaluación de LLMs', 'Herramientas para devs', 'Escritura clara'],
    line: 'No una nota. Una combinación.',
  },
  triage: {
    kicker: 'Aprende lo que te importa',
    title: 'Enséñale con tus decisiones.',
    line: 'Un sí es un dato. Un no, un dato mejor.',
    who: 'Marta',
    verdicts: ['Sí', 'Sí, si…', 'Depende', 'No'],
    offers: [
      {
        role: 'Founding AI Engineer',
        company: 'Seed · 6 personas',
        facts: ['115.000 € + 1,2 %', 'Remoto', 'Guardias en solitario'],
        verdict: 'No',
        reason: '«No vuelvo a llevar sola el busca.»',
        learned: { type: 'No considera', text: 'Guardias en solitario' },
      },
      {
        role: 'Staff AI Engineer',
        company: 'Serie C · 400 personas',
        facts: ['150.000 €', 'Oficina en Berlín', '3 días por semana'],
        verdict: 'Sí, si…',
        reason: '«…puedo quedarme en Valencia.»',
        learned: { type: 'Pesa más', text: 'Seguir en remoto' },
      },
      {
        role: 'Eval Lead',
        company: 'Serie A · 40 personas',
        facts: ['118.000 € + 0,3 %', 'Remoto', 'Todas las evaluaciones'],
        verdict: 'Sí',
        reason: '«Es el puesto que me diseñaría yo.»',
        learned: { type: 'Suelo', text: '~115.000 € si el trabajo encaja' },
      },
    ],
    learnedLabel: 'Lo que he aprendido',
  },
  listening: {
    kicker: 'Y escucha',
    title: 'El silencio es una función.',
    status: 'Escuchando',
    items: ['Evaluación de IA', 'Staff o senior', 'Remoto', '115.000 €+', 'Sin guardias en solitario'],
    empty: ['Nada que merezca molestarte.', 'Sigo escuchando.'],
  },
  roadmap: {
    kicker: 'Hacia dónde va',
    title: 'Por pasos, y en abierto.',
    now: 'Ahora',
    steps: [
      { version: 'v0', title: 'Tu Rep', line: 'Beta cerrada. Arreglamos lo que falla, contigo.', extra: '+ coach de carrera' },
      { version: 'v1', title: 'Lee las ofertas', line: 'Te trae solo las que encajan.' },
      { version: 'v2', title: 'De agente a agente', line: 'El tuyo habla con el suyo. Sin candidaturas.' },
    ],
  },
  career: {
    kicker: 'career.md',
    title: 'Un perfil que te llevas.',
    line: 'Texto plano. Cada línea con su fuente.',
    file: 'career.md',
    lines: [
      { kind: 'h1', text: '# Marta Quiroga' },
      { kind: 'blank', text: '' },
      { kind: 'p', text: 'Ingeniera de IA que hace medibles los modelos antes de que salgan.', tags: '[ent] [web]' },
      { kind: 'blank', text: '' },
      { kind: 'h2', text: '## Lo que demuestra el trabajo' },
      { kind: 'li', text: '- Construyó el pipeline de evaluación de los agentes de Farolillo.', tags: '[cv] [gh]' },
      { kind: 'li', text: '- sonda · las trazas se quedan en local, solo salen las puntuaciones.', tags: '[gh] [ent]' },
      { kind: 'li', text: '- sonda · sistema de plugins para evaluadores propios.', tags: '[gh]', flag: 'co-producido, sin defender' },
      { kind: 'blank', text: '' },
      { kind: 'h2', text: '## Retirado' },
      { kind: 'li', text: '- Diseñó la estrategia de caché de las llamadas al modelo.', flag: 'retirado en la entrevista', retracted: true },
    ],
  },
  data: {
    kicker: 'Tus datos son tuyos',
    title: 'Privado por defecto.',
    items: [
      { icon: 'why', title: 'Mira el porqué', line: 'Cada afirmación, su fuente.' },
      { icon: 'correct', title: 'Corrígelo', line: 'Discute, arregla, añade contexto.' },
      { icon: 'export', title: 'Llévatelo', line: 'Exporta o sincroniza con tu GitHub.' },
      { icon: 'delete', title: 'Bórralo', line: 'Borrado es borrado.' },
    ],
    demo: {
      private: 'Solo tú puedes verlo',
      claim: ['Lideró', 'el pipeline de evaluación de los agentes de soporte.'],
      why: { file: 'CV_Marta_Quiroga_2026.pdf · página 1', excerpt: '«…Lideró el pipeline de evaluación de los agentes de soporte en Farolillo Labs…»' },
      correct: { word: 'Co-lideró', note: 'Corregido por Marta' },
      export: { file: 'career.md', note: 'Sincronizado con github.com/mquiroga/career' },
      deleted: 'Borrado. No queda nada.',
    },
  },
  finale: {
    title: 'Adiós a las candidaturas.',
    body: 'Entra en la beta cerrada. Te escribiremos cuando haya sitio para ti.',
  },
  strength: {
    4: 'Evidencia sólida',
    3: 'Buena evidencia',
    2: 'Algo de evidencia',
    1: 'Poca evidencia',
    0: 'Sin evidencia aún',
  },
  sourceNames: { cv: 'CV', li: 'LinkedIn', gh: 'GitHub', web: 'Web', int: 'Entrevista' },
};

export const home: Record<Lang, HomeContent> = { en, es };
