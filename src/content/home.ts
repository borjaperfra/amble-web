import type { Lang } from '../i18n/ui';

// Home page copy and the demo profile it shows working. One object per
// language, same shape, so every section renders from data.
//
// The demo profiles (Maya in EN, Marta in ES) follow the product's rules: every
// line in the map and the career.md carries a source, gaps are named as gaps,
// and assisted work is marked until defended.

export type Source = 'cv' | 'li' | 'gh' | 'web' | 'int';
export type Strength = 4 | 3 | 2 | 1 | 0;

export interface HomeContent {
  hero: {
    tag: string;
    title: [string, string]; // second line gets the italic "Amble"
    subtitle: string;
    building: string;
  };
  reads: {
    kicker: string;
    title: string;
    body: string;
    sheetTitle: string;
    sources: { type: string; name: string }[];
    discoveries: { label: string; value: string }[];
    closing: string;
  };
  interview: {
    rep: string;
    kicker: string;
    title: string;
    body: string;
    context: string;
    question: string;
    prompt: string;
    why: string;
    whyBody: string;
    talk: string;
    orType: string;
  };
  defence: {
    kicker: string;
    title: string;
    body: string;
    question: { label: string; context: string; ask: string };
    answer: { label: string; text: string; outcome: string };
    retracted: {
      label: string;
      claim: string;
      askedLabel: string;
      asked: string;
      answeredLabel: string;
      answered: string;
    };
    note: string;
  };
  map: {
    kicker: string;
    title: string;
    body: string;
    sheetKicker: string;
    name: string;
    headline: string;
    demonstratesLabel: string;
    capabilities: { name: string; strength: Strength; summary: string; sources: Source[] }[];
    distinctiveLabel: string;
    distinctive: string[];
    unknownLabel: string;
    unknowns: { name: string; strength: Strength; body: string }[];
  };
  triage: {
    kicker: string;
    title: string;
    body: string;
    offerLabel: string;
    offer: { role: string; company: string; facts: string[] };
    verdicts: string[];
    chosen: number;
    reasonLabel: string;
    reason: string;
    learnedLabel: string;
    learned: { type: string; text: string };
  };
  listening: {
    kicker: string;
    title: string;
    body: string;
    status: string;
    quiet: string;
    forLabel: string;
    items: string[];
    empty: [string, string];
  };
  roadmap: {
    kicker: string;
    title: string;
    body: string;
    now: string;
    steps: { version: string; title: string; body: string; extra?: string }[];
  };
  career: {
    kicker: string;
    title: string;
    body: string;
    file: string;
    // flag marks assisted-undefended lines; retracted marks lines the Rep stopped claiming.
    lines: { text: string; tags?: string; flag?: string; retracted?: boolean; kind: 'h1' | 'h2' | 'p' | 'li' | 'blank' }[];
  };
  data: {
    kicker: string;
    title: string;
    body: string;
    items: { title: string; body: string }[];
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
    subtitle:
      'Meet your professional Rep. It gets to know your work, listens for the offers worth your time, and negotiates them for you.',
    building:
      'We’re building Amble in the open, with the people who use it. The closed beta is where your feedback shapes what it becomes.',
  },
  reads: {
    kicker: 'It gets to know you',
    title: 'You’re more than a PDF.',
    body: 'Give your Rep what already exists: your CV, LinkedIn, GitHub, your website. It reads all of it before asking you anything, and builds a profile deeper than any CV.',
    sheetTitle: 'Getting to know Maya.',
    sources: [
      { type: 'CV', name: 'CV_Maya_Lindqvist_2026.pdf' },
      { type: 'LinkedIn', name: 'Profile' },
      { type: 'GitHub', name: 'mlindqvist · 23 repositories' },
      { type: 'Website', name: 'Personal site · 14 posts' },
    ],
    discoveries: [
      { value: '3', label: 'roles' },
      { value: '9', label: 'projects' },
      { value: '31', label: 'pieces of evidence' },
      { value: '7', label: 'capabilities' },
    ],
    closing: 'I’ve got the basics. There are a few things I’d rather ask you myself.',
  },
  interview: {
    rep: 'Your Rep',
    kicker: 'It asks what your CV can’t tell',
    title: 'A few good questions, not a form.',
    body: 'The interview is built from what your Rep couldn’t work out on its own. It never asks what it already knows, and it always tells you why it’s asking.',
    context: 'I understand what you built at Lantern Labs.',
    question: 'What I can’t tell is whether the evaluation strategy came from you or from the team.',
    prompt: 'Tell me about the last time an eval told you something you didn’t want to hear.',
    why: 'Why this question?',
    whyBody:
      'Your CV says you led the eval pipeline, and your GitHub shows you wrote most of it. Neither tells me who decided what to measure.',
    talk: 'Hold to talk',
    orType: 'or type',
  },
  defence: {
    kicker: 'It checks its own understanding',
    title: 'Code shows what shipped. Not who decided.',
    body: 'Much of today’s work is written together with an agent. So your Rep doesn’t take a repository as proof of skill: it asks you to explain the decisions in it. What you can defend stays. What you can’t, it stops claiming.',
    question: {
      label: 'Defence question',
      context: 'In tern, eval traces stay on the machine and only aggregate scores are uploaded. Both are results.',
      ask: 'Why is the line there?',
    },
    answer: {
      label: 'Maya',
      text: '“Traces carry customer prompts. Scores don’t. We had a client in healthcare, and I wasn’t going to explain a trace leak to them.”',
      outcome: 'Defended · now evidence of her own judgment',
    },
    retracted: {
      label: 'Retracted',
      claim: 'Designed the caching strategy for model calls',
      askedLabel: 'Asked',
      asked: 'Why cache by prompt hash and not by meaning?',
      answeredLabel: 'Answered',
      answered: 'Honestly, the agent picked that. I never checked.',
    },
    note: 'Retracted, never deleted. Your Rep keeps what it believed and why it stopped believing it.',
  },
  map: {
    kicker: 'Your Professional Map',
    title: 'A map, not a score.',
    body: 'No percentages, no rankings, no 8/10. What your work demonstrates, how strong the evidence is, and what your Rep doesn’t know yet, said plainly.',
    sheetKicker: 'Professional Map',
    name: 'Maya Lindqvist',
    headline: 'AI engineer who makes models measurable before they ship.',
    demonstratesLabel: 'What your work demonstrates',
    capabilities: [
      {
        name: 'LLM evaluation',
        strength: 4,
        summary: 'Built and ran the eval pipeline behind Lantern’s support agents, and defended its design.',
        sources: ['cv', 'gh', 'int'],
      },
      {
        name: 'Retrieval systems',
        strength: 3,
        summary: 'Two production retrieval stacks, one rebuilt after it failed an audit.',
        sources: ['cv', 'gh'],
      },
      {
        name: 'Technical writing',
        strength: 3,
        summary: 'Fourteen posts on evals, two of them cited by other teams’ docs.',
        sources: ['web', 'li'],
      },
    ],
    distinctiveLabel: 'Your distinctive profile',
    distinctive: ['LLM evaluation', 'Developer tools', 'Clear writing'],
    unknownLabel: 'Things I don’t know yet',
    unknowns: [
      {
        name: 'Leading a team',
        strength: 1,
        body: 'You’ve mentored two engineers. I don’t yet know if you’ve set direction for a team.',
      },
    ],
  },
  triage: {
    kicker: 'It learns what matters',
    title: 'Teach Amble with your choices.',
    body: 'Nobody lists their own dealbreakers correctly. So your Rep shows you a handful of offers, each one a real trade-off, and learns from your answers. A yes is data. A no is better data.',
    offerLabel: 'Would you hear them out?',
    offer: {
      role: 'Founding AI Engineer',
      company: 'Seed stage · team of six',
      facts: ['€115K + 1.2% equity', 'Remote, Europe', 'You own on-call for the product'],
    },
    verdicts: ['Yes', 'Yes, if…', 'Depends', 'No'],
    chosen: 3,
    reasonLabel: 'Maya, verbatim',
    reason: '“I’d take the pay cut for that equity. I won’t carry a pager alone again.”',
    learnedLabel: 'What I learned',
    learned: {
      type: 'Hard filter',
      text: 'Sole on-call ownership. Not money: the equity would have covered it.',
    },
  },
  listening: {
    kicker: 'Then it listens',
    title: 'Silence is a feature.',
    body: 'No feed, no badges, no “7 new matches”. You keep doing your thing. Your Rep only interrupts when something deserves your attention.',
    status: 'Listening',
    quiet: 'I’ll only interrupt you when something deserves your attention.',
    forLabel: 'Currently listening for',
    items: ['AI evaluation & tooling', 'Staff or senior IC', 'Remote, Europe', 'At least €120K', 'No solo on-call'],
    empty: ['Nothing worth bothering you with.', 'I’m still listening.'],
  },
  roadmap: {
    kicker: 'Where it’s going',
    title: 'Built in steps, in the open.',
    body: 'Amble is early, and we’d rather say so. This is the road, and the beta is where it gets decided.',
    now: 'Now',
    steps: [
      {
        version: 'v0',
        title: 'Your Rep, in closed beta',
        body: 'It reads your work, interviews you, builds your map, learns from your choices and writes your career.md. We watch what breaks and fix it with you.',
        extra: 'Coming during the beta: your career coach. How to strengthen your profile, and how to look for work when you do want to.',
      },
      {
        version: 'v1',
        title: 'It reads the offers',
        body: 'Your Rep reads the offers published across the internet and brings you only the ones that fit. Most weeks, that means none.',
      },
      {
        version: 'v2',
        title: 'Agent to agent',
        body: 'Companies arrive with their own agents. Yours talks to theirs, checks the evidence on both sides and negotiates for you. No applications.',
      },
    ],
  },
  career: {
    kicker: 'career.md',
    title: 'A profile you can carry.',
    body: 'Your Rep writes everything it knows into a plain file. Every line says where it came from. What it couldn’t source isn’t there, and assisted work is marked until you defend it.',
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
    title: 'Private by default. Yours to keep.',
    body: 'Your map, your intent and your answers are private. Nobody sees them unless you decide they should.',
    items: [
      { title: 'See why', body: 'Every claim opens to its evidence and its source.' },
      { title: 'Correct it', body: 'Dispute an inference, fix a fact, add context.' },
      { title: 'Take it with you', body: 'Export everything, or keep your career.md synced in your own GitHub.' },
      { title: 'Delete it all', body: 'Stop listening or delete your Rep. Gone means gone.' },
    ],
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
    subtitle:
      'Conoce a tu Rep profesional. Entiende tu trabajo, escucha las ofertas que merecen tu tiempo y las negocia por ti.',
    building:
      'Estamos construyendo Amble en abierto, con quienes lo usan. La beta cerrada es donde tu feedback decide en qué se convierte.',
  },
  reads: {
    kicker: 'Te conoce',
    title: 'Eres más que un PDF.',
    body: 'Dale a tu Rep lo que ya existe: tu CV, LinkedIn, GitHub, tu web. Lo lee todo antes de preguntarte nada y construye un perfil más profundo que cualquier CV.',
    sheetTitle: 'Conociendo a Marta.',
    sources: [
      { type: 'CV', name: 'CV_Marta_Quiroga_2026.pdf' },
      { type: 'LinkedIn', name: 'Perfil' },
      { type: 'GitHub', name: 'mquiroga · 19 repositorios' },
      { type: 'Web', name: 'Web personal · 11 artículos' },
    ],
    discoveries: [
      { value: '3', label: 'puestos' },
      { value: '8', label: 'proyectos' },
      { value: '27', label: 'evidencias' },
      { value: '7', label: 'capacidades' },
    ],
    closing: 'Ya tengo lo básico. Hay un par de cosas que prefiero preguntarte yo.',
  },
  interview: {
    rep: 'Tu Rep',
    kicker: 'Pregunta lo que tu CV no cuenta',
    title: 'Unas pocas buenas preguntas, no un formulario.',
    body: 'La entrevista nace de lo que tu Rep no ha podido averiguar solo. Nunca pregunta lo que ya sabe, y siempre te dice por qué pregunta.',
    context: 'Entiendo lo que construiste en Farolillo Labs.',
    question: 'Lo que no sé es si la estrategia de evaluación salió de ti o del equipo.',
    prompt: 'Cuéntame la última vez que una evaluación te dijo algo que no querías oír.',
    why: '¿Por qué esta pregunta?',
    whyBody:
      'Tu CV dice que lideraste el pipeline de evaluación y tu GitHub muestra que escribiste casi todo. Ninguno me dice quién decidió qué medir.',
    talk: 'Mantén para hablar',
    orType: 'o escribe',
  },
  defence: {
    kicker: 'Comprueba lo que entiende',
    title: 'El código dice qué se envió. No quién lo decidió.',
    body: 'Hoy mucho trabajo se escribe junto a un agente. Por eso tu Rep no toma un repositorio como prueba de habilidad: te pide que expliques las decisiones que hay en él. Lo que defiendes, se queda. Lo que no, deja de afirmarlo.',
    question: {
      label: 'Pregunta de defensa',
      context: 'En sonda, las trazas de evaluación se quedan en la máquina y solo se suben las puntuaciones agregadas. Las dos cosas son resultados.',
      ask: '¿Por qué está la línea ahí?',
    },
    answer: {
      label: 'Marta',
      text: '«Las trazas llevan prompts de clientes. Las puntuaciones no. Teníamos un cliente sanitario y no iba a explicarle una fuga de trazas.»',
      outcome: 'Defendida · ahora es evidencia de su propio criterio',
    },
    retracted: {
      label: 'Retirada',
      claim: 'Diseñó la estrategia de caché de las llamadas al modelo',
      askedLabel: 'Pregunta',
      asked: '¿Por qué cachear por hash del prompt y no por significado?',
      answeredLabel: 'Respuesta',
      answered: 'La verdad, eso lo eligió el agente. Nunca lo revisé.',
    },
    note: 'Retirada, nunca borrada. Tu Rep guarda lo que creía y por qué dejó de creerlo.',
  },
  map: {
    kicker: 'Tu mapa profesional',
    title: 'Un mapa, no una nota.',
    body: 'Sin porcentajes, sin rankings, sin un 8/10. Lo que demuestra tu trabajo, cuánta evidencia hay y lo que tu Rep todavía no sabe, dicho claro.',
    sheetKicker: 'Mapa profesional',
    name: 'Marta Quiroga',
    headline: 'Ingeniera de IA que hace medibles los modelos antes de que salgan.',
    demonstratesLabel: 'Lo que demuestra tu trabajo',
    capabilities: [
      {
        name: 'Evaluación de LLMs',
        strength: 4,
        summary: 'Construyó y operó el pipeline de evaluación de los agentes de soporte de Farolillo, y defendió su diseño.',
        sources: ['cv', 'gh', 'int'],
      },
      {
        name: 'Sistemas de recuperación',
        strength: 3,
        summary: 'Dos sistemas de recuperación en producción; uno, rehecho tras suspender una auditoría.',
        sources: ['cv', 'gh'],
      },
      {
        name: 'Escritura técnica',
        strength: 3,
        summary: 'Once artículos sobre evaluación, dos citados en la documentación de otros equipos.',
        sources: ['web', 'li'],
      },
    ],
    distinctiveLabel: 'Tu perfil distintivo',
    distinctive: ['Evaluación de LLMs', 'Herramientas para devs', 'Escritura clara'],
    unknownLabel: 'Lo que aún no sé',
    unknowns: [
      {
        name: 'Liderar un equipo',
        strength: 1,
        body: 'Has sido mentora de dos ingenieros. Aún no sé si has marcado la dirección de un equipo.',
      },
    ],
  },
  triage: {
    kicker: 'Aprende lo que te importa',
    title: 'Enseña a Amble con tus decisiones.',
    body: 'Nadie enumera bien sus propios límites. Por eso tu Rep te enseña unas pocas ofertas, cada una un intercambio real, y aprende de tus respuestas. Un sí es un dato. Un no es un dato mejor.',
    offerLabel: '¿Les escucharías?',
    offer: {
      role: 'Founding AI Engineer',
      company: 'Seed · equipo de seis',
      facts: ['115.000 € + 1,2 % de equity', 'Remoto, Europa', 'Guardias del producto a tu cargo'],
    },
    verdicts: ['Sí', 'Sí, si…', 'Depende', 'No'],
    chosen: 3,
    reasonLabel: 'Marta, literal',
    reason: '«Me bajo el sueldo por ese equity. No vuelvo a llevar sola el busca.»',
    learnedLabel: 'Lo que he aprendido',
    learned: {
      type: 'Filtro duro',
      text: 'Guardias en solitario. No es dinero: el equity lo habría compensado.',
    },
  },
  listening: {
    kicker: 'Y escucha',
    title: 'El silencio es una función.',
    body: 'Sin feed, sin notificaciones, sin «7 nuevos matches». Tú sigues a lo tuyo. Tu Rep solo te interrumpe cuando algo merece tu atención.',
    status: 'Escuchando',
    quiet: 'Solo te interrumpiré cuando algo merezca tu atención.',
    forLabel: 'Ahora escucho',
    items: ['Evaluación y tooling de IA', 'Staff o senior IC', 'Remoto, Europa', 'Desde 120.000 €', 'Sin guardias en solitario'],
    empty: ['Nada que merezca molestarte.', 'Sigo escuchando.'],
  },
  roadmap: {
    kicker: 'Hacia dónde va',
    title: 'Por pasos, y en abierto.',
    body: 'Amble está empezando y preferimos decirlo. Este es el camino, y la beta es donde se decide.',
    now: 'Ahora',
    steps: [
      {
        version: 'v0',
        title: 'Tu Rep, en beta cerrada',
        body: 'Lee tu trabajo, te entrevista, construye tu mapa, aprende de tus decisiones y escribe tu career.md. Vemos qué falla y lo arreglamos contigo.',
        extra: 'Llega durante la beta: tu coach de carrera. Cómo reforzar tu perfil y cómo buscar trabajo cuando sí quieras.',
      },
      {
        version: 'v1',
        title: 'Lee las ofertas',
        body: 'Tu Rep lee las ofertas publicadas en internet y te trae solo las que encajan. La mayoría de semanas, ninguna.',
      },
      {
        version: 'v2',
        title: 'De agente a agente',
        body: 'Las empresas llegan con sus propios agentes. El tuyo habla con el suyo, comprueba la evidencia de ambos lados y negocia por ti. Sin candidaturas.',
      },
    ],
  },
  career: {
    kicker: 'career.md',
    title: 'Un perfil que te llevas.',
    body: 'Tu Rep escribe todo lo que sabe en un fichero de texto. Cada línea dice de dónde sale. Lo que no tiene fuente no está, y el trabajo asistido va marcado hasta que lo defiendes.',
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
    title: 'Privado por defecto. Tuyo siempre.',
    body: 'Tu mapa, tu intención y tus respuestas son privados. Nadie los ve salvo que tú decidas que deben verlos.',
    items: [
      { title: 'Mira el porqué', body: 'Cada afirmación se abre a su evidencia y a su fuente.' },
      { title: 'Corrígelo', body: 'Discute una inferencia, arregla un dato, añade contexto.' },
      { title: 'Llévatelo', body: 'Exporta todo, o ten tu career.md sincronizado en tu propio GitHub.' },
      { title: 'Bórralo todo', body: 'Deja de escuchar o borra tu Rep. Borrado es borrado.' },
    ],
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
