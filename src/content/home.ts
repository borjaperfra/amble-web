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
  // The agent's loop, shown as a rail beside the page. Sections carry data-stage.
  stages: { id: 'reads' | 'asks' | 'checks' | 'learns' | 'listens' | 'tells'; label: string }[];
  hero: {
    tag: string;
    title: [string, string]; // second line gets the italic "Amble"
    subtitle: string;
    more: string;
    status: { prefix: string; words: string[] };
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
  yourTurn: {
    kicker: string;
    title: string;
    line: string;
    label: string;
    placeholder: string;
    cta: string;
    reading: string;
    errors: { invalid: string; notFound: string; limit: string; network: string; empty: string };
    labels: { read: string; repos: string; languages: string; since: string; claims: string; ask: string };
    // {placeholders} are filled in the browser with facts from GitHub.
    claims: { maintains: string; writes: string; uses: string; active: string; about: string };
    questions: string[];
    join: string;
    again: string;
    noGithub: string;
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
    toListening: string;
  };
  listening: {
    kicker: string;
    title: string;
    status: string;
    // learned: revealed by the triage, not declared. Shown as such.
    items: { text: string; learned?: boolean }[];
    learnedNote: string;
    empty: [string, string];
  };
  opportunity: {
    kicker: string;
    title: string;
    line: string;
    badge: string;
    counter: string;
    salary: string;
    stream: { role: string; company: string; reason: string }[];
    match: { role: string; company: string; facts: string[] };
    notify: { from: string; text: string; time: string; channel: string };
    whyLabel: string;
    why: { text: string; src: string }[];
    considerLabel: string;
    consider: string;
    actions: [string, string];
  };
  agents: {
    kicker: string;
    title: string;
    line: string;
    badge: string;
    theirs: string;
    yours: string;
    messages: { from: 'theirs' | 'yours'; text: string; evidence?: string; private?: string }[];
    outcome: string;
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
    line: string;
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
    perks: string[];
  };
  strength: Record<Strength, string>;
  sourceNames: Record<Source, string>;
}

const en: HomeContent = {
  stages: [
    { id: 'reads', label: 'Reads' },
    { id: 'asks', label: 'Asks' },
    { id: 'checks', label: 'Checks' },
    { id: 'learns', label: 'Learns' },
    { id: 'listens', label: 'Listens' },
    { id: 'tells', label: 'Tells you' },
  ],
  hero: {
    tag: 'Closed beta',
    title: ['I’m not looking.', 'is.'],
    subtitle:
      'Meet your Rep: a professional agent that knows your work, listens for the offers worth your time, and negotiates them for you.',
    more: 'See how it works',
    status: { prefix: 'Your Rep is', words: ['reading your work.', 'asking what it couldn’t read.', 'listening.'] },
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
  yourTurn: {
    kicker: 'Your turn',
    title: 'What would your Rep read about you?',
    line: 'Type your GitHub username. Your browser asks GitHub directly; nothing reaches us.',
    label: 'GitHub username',
    placeholder: 'your-username',
    cta: 'Read my GitHub',
    reading: 'Reading your GitHub…',
    errors: {
      invalid: 'That isn’t a GitHub username.',
      notFound: 'I couldn’t find that profile on GitHub.',
      limit: 'GitHub asked me to slow down. Try again in a few minutes.',
      network: 'I couldn’t reach GitHub. Nothing has been lost.',
      empty: 'That profile has no public repositories yet. I’d start with your CV.',
    },
    labels: {
      read: 'What I read',
      repos: 'public repositories',
      languages: 'Languages',
      since: 'On GitHub since',
      claims: 'What I can already say, with its source',
      ask: 'What I’d still ask you',
    },
    claims: {
      maintains: 'Maintains {repo}, {stars} ★',
      writes: 'Writes mostly {lang}: {n} of {total} repositories',
      uses: 'Has code in {langs}',
      active: 'Last pushed code {when}',
      about: 'Describes themselves as “{bio}”',
    },
    questions: [
      'Which of these did you design, and which did an agent write?',
      'What have you shipped that isn’t public?',
      'What would make a new job worth your attention?',
    ],
    join: 'Want your Rep to read the rest? Join the beta',
    again: 'Try another',
    noGithub: 'No GitHub? In the beta, your Rep starts with your CV.',
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
        answer: 'Because traces carry our customers’ prompts. Scores don’t.',
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
        answer: 'Honestly? The agent picked that. I never checked why.',
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
    toListening: 'I’ll listen for these →',
  },
  listening: {
    kicker: 'Then it listens',
    title: 'Silence is a feature.',
    status: 'Listening',
    items: [
      { text: 'AI evaluation' },
      { text: 'Staff or senior' },
      { text: 'Remote, Europe', learned: true },
      { text: '€115K+', learned: true },
      { text: 'No solo on-call', learned: true },
    ],
    learnedNote: 'Three of these Maya never said. She showed them, in her choices.',
    empty: ['Nothing worth bothering you with.', 'I’m still listening.'],
  },
  opportunity: {
    kicker: 'Then it tells you',
    title: 'Most weeks, nothing. Then this.',
    line: 'Your Rep reads the offers so you don’t, and only interrupts you for one that fits.',
    badge: 'Coming in v1',
    counter: 'read this week · 1 worth your time',
    salary: 'Whenever an offer states a salary, you see it, and your Rep uses it. No “competitive”.',
    stream: [
      { role: 'Senior ML Engineer', company: 'Adtech · Series D', reason: 'Office 5 days a week' },
      { role: 'Founding AI Engineer', company: 'Seed · 6 people', reason: 'Solo on-call' },
      { role: 'LLM Platform Engineer', company: 'Fintech · 300 people', reason: '€95K, below the floor' },
      { role: 'AI Engineer', company: 'Agency', reason: 'Not evaluation work' },
      { role: 'Staff AI Engineer', company: 'Series C · Berlin', reason: 'Relocation required' },
    ],
    match: { role: 'Evaluation Lead', company: 'Kestrel · Series A · 40 people', facts: ['Remote, Europe', '€125K + 0.4%', 'Owns evals end to end'] },
    notify: { from: 'Amble', text: 'I found something worth hearing.', time: '09:41', channel: 'On WhatsApp or Telegram' },
    whyLabel: 'Why I’m showing you this',
    why: [
      { text: 'They need someone to own LLM evaluation. It’s your strongest evidence.', src: 'Your map · ●●●●' },
      { text: 'Remote in Europe, and no solo on-call.', src: 'Your choices' },
      { text: '€125K is above the floor you showed me.', src: 'Your choices' },
    ],
    considerLabel: 'One thing to consider',
    consider: 'You’d be their first eval hire. That means setting direction, and I haven’t seen you do that yet.',
    actions: ['I’d hear them out', 'Not for me'],
  },
  agents: {
    kicker: 'Then it talks for you',
    title: 'Your agent talks to theirs.',
    line: 'It answers with evidence, keeps what’s private private, and only brings you what both sides want.',
    badge: 'Coming in v2',
    theirs: 'Kestrel’s agent',
    yours: 'Maya’s Rep',
    messages: [
      { from: 'theirs', text: 'Can she own evaluation for our agents?' },
      { from: 'yours', text: 'Yes. She built and ran Lantern’s eval pipeline, and defended its design.', evidence: 'CV · GitHub · Interview' },
      { from: 'theirs', text: 'What’s her salary floor?' },
      { from: 'yours', text: 'Your range works. The number stays with her.', private: 'Private' },
      { from: 'theirs', text: 'We’d like to talk.' },
      { from: 'yours', text: 'So would she. I’ll set it up.' },
    ],
    outcome: 'Both sides want the conversation. Maya decides.',
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
    line: 'Everything your Rep knows about you, written into one plain file. Every line says where it came from; co-produced work is flagged until you defend it, and what you retracted stays on record. Read it, correct it, take it anywhere.',
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
    line: 'Your map, your intent and your answers are yours. You can always see why your Rep thinks something, and change it.',
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
    perks: [
      'Free access to Amble during the beta',
      'The offers that fit, on your WhatsApp or Telegram',
      'Your feedback decides what we build next',
    ],
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
  stages: [
    { id: 'reads', label: 'Lee' },
    { id: 'asks', label: 'Pregunta' },
    { id: 'checks', label: 'Comprueba' },
    { id: 'learns', label: 'Aprende' },
    { id: 'listens', label: 'Escucha' },
    { id: 'tells', label: 'Te avisa' },
  ],
  hero: {
    tag: 'Beta cerrada',
    title: ['Yo no busco.', 'sí.'],
    subtitle:
      'Conoce a tu Rep: un agente profesional que conoce tu trabajo, escucha las ofertas que merecen tu tiempo y las negocia por ti.',
    more: 'Mira cómo funciona',
    status: { prefix: 'Tu Rep está', words: ['leyendo tu trabajo.', 'preguntando lo que no pudo leer.', 'escuchando.'] },
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
  yourTurn: {
    kicker: 'Tu turno',
    title: '¿Qué leería tu Rep de ti?',
    line: 'Escribe tu usuario de GitHub. Tu navegador se lo pide a GitHub directamente; a nosotros no nos llega nada.',
    label: 'Usuario de GitHub',
    placeholder: 'tu-usuario',
    cta: 'Leer mi GitHub',
    reading: 'Leyendo tu GitHub…',
    errors: {
      invalid: 'Eso no es un usuario de GitHub.',
      notFound: 'No encuentro ese perfil en GitHub.',
      limit: 'GitHub me pide que vaya más despacio. Prueba en unos minutos.',
      network: 'No he podido llegar a GitHub. No se ha perdido nada.',
      empty: 'Ese perfil aún no tiene repositorios públicos. Yo empezaría por tu CV.',
    },
    labels: {
      read: 'Lo que he leído',
      repos: 'repositorios públicos',
      languages: 'Lenguajes',
      since: 'En GitHub desde',
      claims: 'Lo que ya puedo decir, con su fuente',
      ask: 'Lo que aún te preguntaría',
    },
    claims: {
      maintains: 'Mantiene {repo}, {stars} ★',
      writes: 'Escribe sobre todo en {lang}: {n} de {total} repositorios',
      uses: 'Tiene código en {langs}',
      active: 'Último push {when}',
      about: 'Se describe como «{bio}»',
    },
    questions: [
      '¿Qué de esto diseñaste tú y qué escribió un agente?',
      '¿Qué has puesto en producción que no sea público?',
      '¿Qué haría que un trabajo nuevo mereciera tu atención?',
    ],
    join: '¿Quieres que tu Rep lea el resto? Entra en la beta',
    again: 'Probar otro',
    noGithub: '¿Sin GitHub? En la beta, tu Rep empieza por tu CV.',
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
        answer: 'Porque las trazas llevan los prompts de nuestros clientes. Las puntuaciones no.',
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
        answer: '¿Sinceramente? Lo eligió el agente. Nunca revisé por qué.',
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
    toListening: 'Esto es lo que escucharé →',
  },
  listening: {
    kicker: 'Y escucha',
    title: 'El silencio es una función.',
    status: 'Escuchando',
    items: [
      { text: 'Evaluación de IA' },
      { text: 'Staff o senior' },
      { text: 'Remoto, Europa', learned: true },
      { text: '115.000 €+', learned: true },
      { text: 'Sin guardias en solitario', learned: true },
    ],
    learnedNote: 'Tres de estas Marta nunca las dijo. Las enseñó con sus decisiones.',
    empty: ['Nada que merezca molestarte.', 'Sigo escuchando.'],
  },
  opportunity: {
    kicker: 'Y te avisa',
    title: 'Casi todas las semanas, nada. Hasta que llega esto.',
    line: 'Tu Rep lee las ofertas por ti y solo te interrumpe por una que encaja.',
    badge: 'Llega en la v1',
    counter: 'leídas esta semana · 1 merece tu tiempo',
    salary: 'Siempre que una oferta publique el salario, lo verás y tu Rep lo usará. Nada de «competitivo».',
    stream: [
      { role: 'Senior ML Engineer', company: 'Adtech · Serie D', reason: 'Oficina 5 días' },
      { role: 'Founding AI Engineer', company: 'Seed · 6 personas', reason: 'Guardias en solitario' },
      { role: 'LLM Platform Engineer', company: 'Fintech · 300 personas', reason: '95.000 €, bajo el suelo' },
      { role: 'AI Engineer', company: 'Agencia', reason: 'No es evaluación' },
      { role: 'Staff AI Engineer', company: 'Serie C · Berlín', reason: 'Exige mudarse' },
    ],
    match: { role: 'Evaluation Lead', company: 'Kestrel · Serie A · 40 personas', facts: ['Remoto, Europa', '125.000 € + 0,4 %', 'Evaluación de principio a fin'] },
    notify: { from: 'Amble', text: 'He encontrado algo que merece la pena.', time: '09:41', channel: 'Por WhatsApp o Telegram' },
    whyLabel: 'Por qué te lo enseño',
    why: [
      { text: 'Necesitan a alguien que lleve la evaluación de LLMs. Es tu evidencia más sólida.', src: 'Tu mapa · ●●●●' },
      { text: 'Remoto en Europa y sin guardias en solitario.', src: 'Tus decisiones' },
      { text: '125.000 € está por encima del suelo que me enseñaste.', src: 'Tus decisiones' },
    ],
    considerLabel: 'Una cosa a tener en cuenta',
    consider: 'Serías su primera contratación en evaluación. Eso implica marcar la dirección, y aún no te he visto hacerlo.',
    actions: ['Les escucharía', 'No es para mí'],
  },
  agents: {
    kicker: 'Y habla por ti',
    title: 'Tu agente habla con el suyo.',
    line: 'Responde con evidencia, guarda lo privado y solo te trae lo que quieren los dos lados.',
    badge: 'Llega en la v2',
    theirs: 'Agente de Kestrel',
    yours: 'Rep de Marta',
    messages: [
      { from: 'theirs', text: '¿Puede llevar la evaluación de nuestros agentes?' },
      { from: 'yours', text: 'Sí. Construyó y operó el pipeline de evaluación de Farolillo, y defendió su diseño.', evidence: 'CV · GitHub · Entrevista' },
      { from: 'theirs', text: '¿Cuál es su suelo salarial?' },
      { from: 'yours', text: 'Vuestro rango encaja. La cifra se queda con ella.', private: 'Privado' },
      { from: 'theirs', text: 'Nos gustaría hablar.' },
      { from: 'yours', text: 'A ella también. Lo organizo.' },
    ],
    outcome: 'Los dos lados quieren la conversación. Marta decide.',
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
    line: 'Todo lo que tu Rep sabe de ti, escrito en un único fichero de texto. Cada línea dice de dónde sale; el trabajo co-producido va marcado hasta que lo defiendes y lo que retiraste queda registrado. Léelo, corrígelo, llévatelo donde quieras.',
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
    line: 'Tu mapa, tu intención y tus respuestas son tuyos. Siempre puedes ver por qué tu Rep piensa algo, y cambiarlo.',
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
    perks: [
      'Acceso gratuito a Amble durante la beta',
      'Las ofertas que encajan, en tu WhatsApp o Telegram',
      'Tu feedback decide qué construimos después',
    ],
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
