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
    lead: string; // "Meet your professional Rep."
    subtitle: string;
    punch: string; // "You don't search. Your Rep does."
    more: string;
    status: { prefix: string; words: string[] };
    beta: { title: string; body: string; closer: string };
  };
  passive: {
    title: string;
    body: string[];
    closer: string;
    looking: string;
    notLooking: string;
    question: string;
  };
  problem: {
    title: string;
    verbs: string[];
    pains: string[];
    answer: string;
    bridge: string;
  };
  story: {
    interlude: [string, string];
    interludeBody: string[];
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
    labels: { read: string; repos: string; forks: string; languages: string; since: string; claims: string; ask: string; publicOnly: string };
    // {placeholders} are filled in the browser with facts from GitHub.
    claims: { maintains: string; writes: string; uses: string; active: string; about: string; contributes: string };
    questions: string[];
    join: string;
    again: string;
    noGithub: string;
  };
  interview: {
    kicker: string;
    title: string;
    line: string;
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
  // The professional map, told as three honest columns.
  map: {
    kicker: string;
    title: string;
    cols: { label: string; strength: Strength; items: string[] }[];
    closer: string;
  };
  triage: {
    kicker: string;
    title: string;
    line: string;
    questions: string[];
    teach: string;
    closer: string;
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
    line: string;
    filter: { body: string; wrongs: string[]; gone: string };
    point: string;
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
    explain: string[];
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
    exchange: { ask: string; answer: string }[];
    range: { label: string; value: string; floorLabel: string };
    privateLine: string;
    steps: string[];
    closer: string;
  };
  roadmap: {
    kicker: string;
    title: string;
    steps: { when: string; title: string; short: string; line: string }[];
  };
  career: {
    file: string;
    // flag marks assisted-undefended lines; retracted marks lines the Rep stopped claiming.
    lines: { text: string; tags?: string; flag?: string; retracted?: boolean; kind: 'h1' | 'h2' | 'p' | 'li' | 'blank' }[];
  };
  ownership: {
    kicker: string;
    title: [string, string];
    subtitle: string;
    actions: { icon: 'read' | 'correct' | 'export' | 'delete'; label: string }[];
    lines: string[];
    gone: string;
  };
  finale: {
    pre: string;
    cta: string;
    small: string;
    remove: string;
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
    lead: 'Meet your professional Rep.',
    subtitle: 'It gets to know your work, learns what would make you move, and finds the opportunities worth your time.',
    punch: 'You don’t search. Your Rep does.',
    more: 'See how it works',
    status: { prefix: 'Your Rep is', words: ['reading your work.', 'asking what it couldn’t read.', 'listening.'] },
    beta: {
      title: 'Join the closed beta',
      body: 'We’re starting with people in tech. Your Rep learns what matters to you. Next, it starts bringing the right opportunities to your phone.',
      closer: 'No searching. No job alerts. No applications.',
    },
  },
  passive: {
    title: 'Not looking doesn’t mean not interested.',
    body: [
      'Most people aren’t searching for a job every day. They’re working. They’re building things. They’re getting on with their lives.',
      'But the right role, the right company, the right problem or the right number might make them listen.',
    ],
    closer: 'That’s what your Rep is for.',
    looking: 'Looking',
    notLooking: 'Not looking',
    question: 'but would they move?',
  },
  problem: {
    title: 'Looking for a job has become a job.',
    verbs: ['Search.', 'Filter.', 'Apply.', 'Repeat.'],
    pains: [
      'Hundreds of roles you don’t want.',
      'Applications nobody reads.',
      'Recruiters asking for things already on your CV.',
      'And most never answer you.',
    ],
    answer: 'Amble does the looking instead.',
    bridge: 'But first, your Rep needs to know you.',
  },
  story: {
    interlude: ['You’re more than', 'a PDF.'],
    interludeBody: [
      'A CV tells your Rep where you’ve worked. Your work shows what you’ve actually done.',
      'Amble reads your CV, GitHub, LinkedIn and the work you choose to share. Then it asks about what it couldn’t find.',
    ],
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
    kicker: 'Your Rep reads what’s already there',
    title: 'See what yours could already know.',
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
      repos: 'public repositories of your own',
      forks: '+ {n} forks',
      languages: 'Languages',
      since: 'On GitHub since',
      claims: 'What I can already say, with its source',
      ask: 'What I’d still ask you',
      publicOnly: 'Only public data. Private repositories and private contributions stay invisible here; in the beta, your Rep reads them only if you let it.',
    },
    claims: {
      maintains: 'Maintains {repo}, {stars} ★',
      writes: 'Writes mostly {lang}: {n} of {total} repositories',
      uses: 'Has code in {langs}',
      active: 'Last public activity {when}, in {repo}',
      contributes: 'Also works in {n} repositories that aren’t theirs, like {repo}',
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
    title: 'It doesn’t ask what it can already read.',
    line: 'Your Rep asks about the things that actually matter: what you owned, what you decided, and what the work alone can’t prove.',
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
    line: 'AI made producing work easier. It also made proving who did what harder. Your Rep doesn’t assume. When ownership matters, it asks.',
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
  map: {
    kicker: 'Your professional map',
    title: 'No score. No ranking. Just what your Rep can stand behind.',
    cols: [
      { label: 'What you’ve demonstrated', strength: 4, items: ['LLM evaluation', 'Retrieval systems'] },
      { label: 'What it’s less sure about', strength: 2, items: ['Production scale', 'Technical writing'] },
      { label: 'What it still doesn’t know', strength: 0, items: ['Leading a team'] },
    ],
    closer: 'Amble represents people. It doesn’t rank them.',
  },
  triage: {
    kicker: 'It learns what matters',
    title: 'You probably don’t know exactly what would make you move.',
    line: 'Neither does your Rep. Yet.',
    questions: [
      'A higher salary, but five days in the office?',
      'More equity, but solo on-call?',
      'A smaller company, with much more ownership?',
    ],
    teach: 'Your choices teach your Rep what actually matters.',
    closer: 'A yes is data. A no is better data.',
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
        facts: ['€150K', 'Berlin office', '5 days a week'],
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
    line: 'Your Rep does the job hunting. You get your time back.',
    filter: {
      body: 'It reads the opportunities out there against what you’ve done and what you actually want.',
      wrongs: ['Wrong salary.', 'Wrong location.', 'Wrong work.', 'Wrong trade-off.'],
      gone: 'Gone before it reaches you.',
    },
    point: 'Most weeks, nothing. That’s the point.',
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
    title: 'Then your phone buzzes.',
    line: 'No feed to check. No saved searches. No inbox full of job alerts. When something makes it through your Rep, it comes to you.',
    badge: 'Next, during the beta',
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
    notify: { from: 'Amble', text: 'I found something worth your attention.', time: '09:41', channel: 'On WhatsApp or Telegram' },
    explain: ['WhatsApp or Telegram.', 'One opportunity.', 'And why it made the cut.'],
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
    kicker: 'Where this goes',
    title: 'Eventually, you won’t apply at all.',
    line: 'Your agent talks to theirs.',
    badge: 'Later · v2',
    theirs: 'Company agent',
    yours: 'Your Rep',
    exchange: [
      { ask: 'Evidence?', answer: 'Proven' },
      { ask: 'Conditions?', answer: 'Aligned' },
      { ask: 'Salary?', answer: 'Range works' },
    ],
    range: { label: 'Range', value: '€110–135K', floorLabel: 'Her floor' },
    privateLine: 'Your range works. The number stays with her.',
    steps: ['Both want to talk', 'Introduction'],
    closer: 'No application. No cold outreach. A conversation when both sides want one.',
  },
  roadmap: {
    kicker: 'Where we are',
    title: 'We’re starting with your Rep.',
    steps: [
      { when: 'Now', title: 'Meet your Rep', short: 'Understands your work and what matters', line: 'It reads your work, asks what it can’t know and builds your professional map.' },
      { when: 'Next', title: 'Stop searching', short: 'Finds opportunities worth your attention', line: 'It starts looking for you. The opportunities worth your attention reach your phone.' },
      { when: 'Then', title: 'Remove applications', short: 'Your Rep talks to theirs', line: 'Company agents talk directly to personal Reps. Applications disappear.' },
    ],
  },
  career: {
    file: 'maya/career.md',
    lines: [
      { kind: 'h1', text: '# Work' },
      { kind: 'h2', text: '## Lantern Labs' },
      { kind: 'li', text: 'Role: AI Engineer · 2024 —', tags: '[cv]' },
      { kind: 'blank', text: '' },
      { kind: 'h1', text: '# Capabilities' },
      { kind: 'h2', text: '## LLM evaluation' },
      { kind: 'li', text: 'Evidence: strong', tags: '[cv] [gh] [interview]' },
      { kind: 'li', text: 'tern · plugin system', flag: 'co-produced, undefended' },
      { kind: 'li', text: 'Caching strategy', flag: 'retracted', retracted: true },
      { kind: 'blank', text: '' },
      { kind: 'h1', text: '# Intent' },
      { kind: 'li', text: 'Remote, Europe · €115K+ · no solo on-call', tags: '[your choices]' },
    ],
  },
  ownership: {
    kicker: 'Yours',
    title: ['Your Rep knows a lot about you.', 'You should own all of it.'],
    subtitle: 'A profile you can carry.',
    actions: [
      { icon: 'read', label: 'Read it' },
      { icon: 'correct', label: 'Correct it' },
      { icon: 'export', label: 'Export it' },
      { icon: 'delete', label: 'Delete it' },
    ],
    lines: ['Private by default.', 'Every claim has a source.', 'You decide what leaves your Rep.'],
    gone: 'Gone means gone.',
  },
  finale: {
    pre: 'Not looking doesn’t mean not listening.',
    cta: 'Join the closed beta',
    small: 'Free during the beta. Opportunities that make the cut, straight to your phone.',
    remove: 'Remove applications.',
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
    lead: 'Conoce a tu Rep profesional.',
    subtitle: 'Conoce tu trabajo, aprende qué te haría cambiar y encuentra las oportunidades que merecen tu tiempo.',
    punch: 'Tú no buscas. Tu Rep sí.',
    more: 'Mira cómo funciona',
    status: { prefix: 'Tu Rep está', words: ['leyendo tu trabajo.', 'preguntando lo que no pudo leer.', 'escuchando.'] },
    beta: {
      title: 'Entra en la beta cerrada',
      body: 'Empezamos con gente de tecnología. Tu Rep aprende lo que te importa. Después, empieza a traerte las oportunidades adecuadas al móvil.',
      closer: 'Sin buscar. Sin alertas de empleo. Sin candidaturas.',
    },
  },
  passive: {
    title: 'No buscar no significa no estar interesado.',
    body: [
      'La mayoría de la gente no busca trabajo cada día. Está trabajando. Construyendo cosas. Viviendo su vida.',
      'Pero el puesto adecuado, la empresa adecuada, el problema adecuado o la cifra adecuada podrían hacer que escucharan.',
    ],
    closer: 'Para eso está tu Rep.',
    looking: 'Buscando',
    notLooking: 'Sin buscar',
    question: '¿pero se moverían?',
  },
  problem: {
    title: 'Buscar trabajo se ha convertido en un trabajo.',
    verbs: ['Buscar.', 'Filtrar.', 'Aplicar.', 'Repetir.'],
    pains: [
      'Cientos de puestos que no quieres.',
      'Candidaturas que nadie lee.',
      'Recruiters que te piden lo que ya está en tu CV.',
      'Y la mayoría ni te contesta.',
    ],
    answer: 'Amble busca por ti.',
    bridge: 'Pero antes, tu Rep necesita conocerte.',
  },
  story: {
    interlude: ['Eres más que', 'un PDF.'],
    interludeBody: [
      'Un CV le dice a tu Rep dónde has trabajado. Tu trabajo enseña lo que de verdad has hecho.',
      'Amble lee tu CV, GitHub, LinkedIn y el trabajo que decidas compartir. Después pregunta por lo que no pudo encontrar.',
    ],
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
    kicker: 'Tu Rep lee lo que ya existe',
    title: 'Mira lo que el tuyo ya podría saber.',
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
      repos: 'repositorios públicos propios',
      forks: '+ {n} forks',
      languages: 'Lenguajes',
      since: 'En GitHub desde',
      claims: 'Lo que ya puedo decir, con su fuente',
      ask: 'Lo que aún te preguntaría',
      publicOnly: 'Solo datos públicos. Los repositorios y las contribuciones privadas no se ven aquí; en la beta, tu Rep solo los lee si le das permiso.',
    },
    claims: {
      maintains: 'Mantiene {repo}, {stars} ★',
      writes: 'Escribe sobre todo en {lang}: {n} de {total} repositorios',
      uses: 'Tiene código en {langs}',
      active: 'Última actividad pública {when}, en {repo}',
      contributes: 'También trabaja en {n} repositorios que no son suyos, como {repo}',
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
    title: 'No pregunta lo que ya puede leer.',
    line: 'Tu Rep pregunta por lo que de verdad importa: de qué fuiste responsable, qué decidiste y lo que el trabajo por sí solo no puede demostrar.',
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
    line: 'La IA ha hecho más fácil producir trabajo. Y más difícil demostrar quién hizo qué. Tu Rep no da nada por hecho. Cuando importa de quién es algo, pregunta.',
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
  map: {
    kicker: 'Tu mapa profesional',
    title: 'Sin nota. Sin ranking. Solo lo que tu Rep puede respaldar.',
    cols: [
      { label: 'Lo que has demostrado', strength: 4, items: ['Evaluación de LLMs', 'Sistemas de recuperación'] },
      { label: 'De lo que está menos seguro', strength: 2, items: ['Escala en producción', 'Escritura técnica'] },
      { label: 'Lo que aún no sabe', strength: 0, items: ['Liderar un equipo'] },
    ],
    closer: 'Amble representa a personas. No las clasifica.',
  },
  triage: {
    kicker: 'Aprende lo que te importa',
    title: 'Probablemente no sabes exactamente qué te haría cambiar.',
    line: 'Tu Rep tampoco. Todavía.',
    questions: [
      '¿Más sueldo, pero cinco días en la oficina?',
      '¿Más equity, pero guardias en solitario?',
      '¿Una empresa más pequeña, con mucha más responsabilidad?',
    ],
    teach: 'Tus decisiones le enseñan a tu Rep lo que de verdad importa.',
    closer: 'Un sí es un dato. Un no, un dato mejor.',
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
        facts: ['150.000 €', 'Oficina en Berlín', '5 días por semana'],
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
    line: 'Tu Rep hace la búsqueda por ti. Tú recuperas tu tiempo.',
    filter: {
      body: 'Lee las oportunidades que hay ahí fuera frente a lo que has hecho y lo que de verdad quieres.',
      wrongs: ['Salario equivocado.', 'Ubicación equivocada.', 'Trabajo equivocado.', 'Intercambio equivocado.'],
      gone: 'Fuera antes de llegarte.',
    },
    point: 'Casi todas las semanas, nada. De eso se trata.',
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
    title: 'Hasta que te vibra el móvil.',
    line: 'Sin feed que revisar. Sin búsquedas guardadas. Sin una bandeja llena de alertas. Cuando algo pasa el filtro de tu Rep, te llega.',
    badge: 'Lo siguiente, durante la beta',
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
    notify: { from: 'Amble', text: 'He encontrado algo que merece tu atención.', time: '09:41', channel: 'Por WhatsApp o Telegram' },
    explain: ['WhatsApp o Telegram.', 'Una oportunidad.', 'Y por qué ha pasado el corte.'],
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
    kicker: 'Hacia dónde va',
    title: 'Algún día, no tendrás que aplicar a nada.',
    line: 'Tu agente habla con el suyo.',
    badge: 'Más adelante · v2',
    theirs: 'Agente de empresa',
    yours: 'Tu Rep',
    exchange: [
      { ask: '¿Evidencia?', answer: 'Demostrada' },
      { ask: '¿Condiciones?', answer: 'Encajan' },
      { ask: '¿Salario?', answer: 'El rango encaja' },
    ],
    range: { label: 'Rango', value: '110–135.000 €', floorLabel: 'Su suelo' },
    privateLine: 'Vuestro rango encaja. La cifra se queda con ella.',
    steps: ['Los dos quieren hablar', 'Presentación'],
    closer: 'Sin candidatura. Sin contacto en frío. Una conversación cuando los dos lados la quieren.',
  },
  roadmap: {
    kicker: 'Dónde estamos',
    title: 'Empezamos por tu Rep.',
    steps: [
      { when: 'Ahora', title: 'Conoce a tu Rep', short: 'Entiende tu trabajo y lo que te importa', line: 'Lee tu trabajo, pregunta lo que no puede saber y construye tu mapa profesional.' },
      { when: 'Después', title: 'Deja de buscar', short: 'Encuentra las oportunidades que merecen tu atención', line: 'Empieza a buscar por ti. Las oportunidades que merecen tu atención llegan a tu móvil.' },
      { when: 'Luego', title: 'Adiós a las candidaturas', short: 'Tu Rep habla con el suyo', line: 'Los agentes de empresa hablan directamente con los Reps personales. Las candidaturas desaparecen.' },
    ],
  },
  career: {
    file: 'marta/career.md',
    lines: [
      { kind: 'h1', text: '# Trabajo' },
      { kind: 'h2', text: '## Farolillo Labs' },
      { kind: 'li', text: 'Puesto: Ingeniera de IA · 2024 —', tags: '[cv]' },
      { kind: 'blank', text: '' },
      { kind: 'h1', text: '# Capacidades' },
      { kind: 'h2', text: '## Evaluación de LLMs' },
      { kind: 'li', text: 'Evidencia: sólida', tags: '[cv] [gh] [entrevista]' },
      { kind: 'li', text: 'sonda · sistema de plugins', flag: 'co-producido, sin defender' },
      { kind: 'li', text: 'Estrategia de caché', flag: 'retirado', retracted: true },
      { kind: 'blank', text: '' },
      { kind: 'h1', text: '# Intención' },
      { kind: 'li', text: 'Remoto, Europa · 115.000 €+ · sin guardias en solitario', tags: '[tus decisiones]' },
    ],
  },
  ownership: {
    kicker: 'Tuyo',
    title: ['Tu Rep sabe mucho de ti.', 'Todo eso debería ser tuyo.'],
    subtitle: 'Un perfil que te llevas.',
    actions: [
      { icon: 'read', label: 'Léelo' },
      { icon: 'correct', label: 'Corrígelo' },
      { icon: 'export', label: 'Expórtalo' },
      { icon: 'delete', label: 'Bórralo' },
    ],
    lines: ['Privado por defecto.', 'Cada afirmación tiene su fuente.', 'Tú decides qué sale de tu Rep.'],
    gone: 'Borrado es borrado.',
  },
  finale: {
    pre: 'No buscar no significa no escuchar.',
    cta: 'Entra en la beta cerrada',
    small: 'Gratis durante la beta. Las oportunidades que pasan el corte, directas a tu móvil.',
    remove: 'Adiós a las candidaturas.',
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
