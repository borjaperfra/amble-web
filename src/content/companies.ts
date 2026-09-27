import type { Lang } from '../i18n/ui';

// The companies page: the people you want aren't applying; how a role becomes
// an agent that finds them, checks their evidence and asks their Reps; the
// salary rule; and a waitlist. The company side is v2; the page says so.

type Candidate = {
  name: string;
  role: string;
  // What the agent's checks found. `out` is the beat at which they drop out.
  evidence: string;
  range?: string;
  out?: 2 | 3;
};

export interface CompaniesContent {
  meta: { title: string; description: string };
  badge: string;
  kicker: string;
  title: [string, string];
  lede: [string, string];
  cta: string;
  formNote: string;
  formPrivacy: string;
  // Hero: your inbox, and the people outside it.
  inbox: {
    label: string;
    count: string;
    applied: string;
    rows: string[];
    outside: string;
    noteLabel: string;
    notLooking: string;
    people: { name: string; role: string; note: string }[];
  };
  problem: { title: [string, string]; body: string[]; closer: string };
  // How it works: one pinned scene, five beats.
  flow: {
    kicker: string;
    title: string;
    statements: [string, string, string, string, string];
    offer: { label: string; title: string; company: string; lines: string[]; rangeLabel: string; range: string; private: string };
    agent: { name: string; lookingFor: string; items: string[]; status: string; done: string };
    notLooking: string;
    candidates: Candidate[];
    rangeWorks: string;
    interested: string;
    schedule: string;
  };
  // What reaches you: one brief per person who fits and wants to talk.
  brief: {
    kicker: string;
    title: string;
    line: string;
    name: string;
    role: string;
    status: string;
    whyLabel: string;
    why: { text: string; src: string }[];
    range: string;
    considerLabel: string;
    consider: string;
    actions: [string, string];
  };
  never: { kicker: string; title: string; items: string[] };
  finale: { title: string; body: string };
}

const en: CompaniesContent = {
  meta: {
    title: 'For companies — Amble',
    description: 'The person you want probably isn’t applying. Amble turns your role into an agent that finds them, checks their evidence and asks their Rep, with a private salary range.',
  },
  badge: 'Early access · company side in v2',
  kicker: 'For companies',
  title: ['An AI agent that sources, checks', 'and reaches real candidates.'],
  lede: ['Remove applications. Forget about LinkedIn.', 'Your role becomes an agent that pings every candidate who fits and is listening, on their phone.'],
  cta: 'Request early access',
  formNote: 'We’re building the company side now. We’ll write when there’s a place for you.',
  formPrivacy: 'Only about early access. Nothing else.',
  inbox: {
    label: 'Your inbox',
    count: '412 applications',
    applied: 'Applied',
    rows: ['Keyword match', 'Keyword match', 'Generated cover letter', 'Keyword match', 'Applied to 60 roles today'],
    outside: 'The people you’d actually want to talk to',
    noteLabel: 'Would move for',
    notLooking: 'Not looking',
    people: [
      { name: 'Maya Lindqvist', role: 'AI engineer', note: 'owning evals' },
      { name: 'Lucía Serrano', role: 'Data scientist', note: 'remote' },
      { name: 'Jonas Berg', role: 'Platform engineer', note: 'the right number' },
    ],
  },
  problem: {
    title: ['The person you want', 'probably isn’t applying.'],
    body: [
      'The people you want aren’t necessarily looking for another job. They’re working. They may be perfectly happy where they are.',
      'The right work, team, ownership, conditions or compensation could still move them.',
      'Traditional recruiting tries to discover that with cold outreach.',
    ],
    closer: 'Amble already has a Rep listening for them.',
  },
  flow: {
    kicker: 'How it works',
    title: 'Your role becomes an agent that does the sourcing.',
    statements: [
      'You post the role, with its range.',
      'It becomes your agent.',
      'It finds people who aren’t applying, and checks their evidence.',
      'Their Reps check your range, privately.',
      'You meet the ones who fit, and want to talk.',
    ],
    offer: {
      label: 'New role',
      title: 'Evaluation Lead',
      company: 'Kestrel · Series A',
      lines: ['Owns LLM evaluation end to end', 'Remote, Europe', 'Works with the research team'],
      rangeLabel: 'Range',
      range: '€110–135K',
      private: 'Private',
    },
    agent: {
      name: 'Kestrel’s agent',
      lookingFor: 'Looking for',
      items: ['Owns evaluation', 'Remote, Europe', 'Range set'],
      status: 'Sourcing',
      done: '2 ready to talk',
    },
    notLooking: 'Not looking',
    candidates: [
      { name: 'Maya Lindqvist', role: 'AI engineer', evidence: '✓ Evidence · ✓ Conditions', range: '✓ Range works' },
      { name: 'Tom Weber', role: 'Staff engineer', evidence: '✕ Limited evidence', out: 2 },
      { name: 'Priya Nair', role: 'ML engineer', evidence: '✓ Evidence · ✓ Conditions', range: '✕ Below her floor', out: 3 },
      { name: 'Lucía Serrano', role: 'Data scientist', evidence: '✓ Evidence · ✓ Conditions', range: '✓ Range works' },
      { name: 'Jonas Berg', role: 'Platform engineer', evidence: '✕ Needs relocation', out: 2 },
    ],
    rangeWorks: 'Range works',
    interested: 'Interested',
    schedule: 'Schedule interview',
  },
  brief: {
    kicker: 'What reaches you',
    title: 'A brief you can act on.',
    line: 'For each person who fits and wants to talk: why they fit, where the evidence comes from, and what to ask about.',
    name: 'Maya Lindqvist',
    role: 'AI engineer · Lantern Labs',
    status: 'Interested',
    whyLabel: 'Why she fits',
    why: [
      { text: 'Built and ran Lantern’s evaluation pipeline, and defended its design.', src: 'CV · GitHub · Interview' },
      { text: 'Wants to own evaluation end to end.', src: 'Her choices' },
      { text: 'Remote in Europe works for her.', src: 'Her choices' },
    ],
    range: 'Your range works for her. Neither number was shown.',
    considerLabel: 'Worth asking',
    consider: 'She hasn’t led a team yet. This would be her first time setting direction.',
    actions: ['Schedule interview', 'Pass'],
  },
  never: {
    kicker: 'What it promises',
    title: 'Built to be trusted by both sides.',
    items: [
      'Every candidate is described on their own.',
      'Profiles are read only with the candidate’s consent.',
      'Every conversation is wanted on both sides.',
      'Private data leaves only when the candidate shares it.',
    ],
  },
  finale: {
    title: 'Fewer conversations, and every one worth having.',
    body: 'Join the early-access list for companies.',
  },
};

const es: CompaniesContent = {
  meta: {
    title: 'Para empresas — Amble',
    description: 'La persona que buscas probablemente no está aplicando. Amble convierte tu puesto en un agente que la encuentra, comprueba su evidencia y habla con su Rep, con un rango salarial privado.',
  },
  badge: 'Acceso anticipado · lado de empresa en la v2',
  kicker: 'Para empresas',
  title: ['Un agente de IA que busca, comprueba', 'y contacta a candidatos reales.'],
  lede: ['Adiós a las candidaturas. Olvídate de LinkedIn.', 'Tu puesto se convierte en un agente que avisa a cada candidato que encaja y está escuchando, en su móvil.'],
  cta: 'Pedir acceso anticipado',
  formNote: 'Estamos construyendo el lado de empresa. Te escribiremos cuando haya sitio para ti.',
  formPrivacy: 'Solo sobre el acceso anticipado. Nada más.',
  inbox: {
    label: 'Tu bandeja',
    count: '412 candidaturas',
    applied: 'Ha aplicado',
    rows: ['Coincide por palabras clave', 'Coincide por palabras clave', 'Carta generada', 'Coincide por palabras clave', 'Ha aplicado a 60 puestos hoy'],
    outside: 'Las personas con las que de verdad querrías hablar',
    noteLabel: 'Se movería por',
    notLooking: 'Sin buscar',
    people: [
      { name: 'Marta Quiroga', role: 'Ingeniera de IA', note: 'llevar las evals' },
      { name: 'Lucía Serrano', role: 'Científica de datos', note: 'remoto' },
      { name: 'Jonas Berg', role: 'Ingeniero de plataforma', note: 'la cifra adecuada' },
    ],
  },
  problem: {
    title: ['La persona que buscas', 'probablemente no está aplicando.'],
    body: [
      'Las personas que quieres no están necesariamente buscando otro trabajo. Están trabajando. Puede que estén perfectamente a gusto donde están.',
      'El trabajo, el equipo, la responsabilidad, las condiciones o la retribución adecuados podrían moverlas.',
      'El reclutamiento tradicional intenta descubrirlo con contacto en frío.',
    ],
    closer: 'Amble ya tiene un Rep escuchando por ellas.',
  },
  flow: {
    kicker: 'Cómo funciona',
    title: 'Tu puesto se convierte en un agente que busca por ti.',
    statements: [
      'Publicas el puesto, con su rango.',
      'Se convierte en tu agente.',
      'Encuentra a personas que no están aplicando y comprueba su evidencia.',
      'Sus Reps comprueban tu rango, en privado.',
      'Conoces a quienes encajan y quieren hablar.',
    ],
    offer: {
      label: 'Nuevo puesto',
      title: 'Evaluation Lead',
      company: 'Kestrel · Serie A',
      lines: ['Lleva la evaluación de LLMs de principio a fin', 'Remoto, Europa', 'Trabaja con el equipo de investigación'],
      rangeLabel: 'Rango',
      range: '110–135 k€',
      private: 'Privado',
    },
    agent: {
      name: 'Agente de Kestrel',
      lookingFor: 'Busca',
      items: ['Lleva la evaluación', 'Remoto, Europa', 'Rango definido'],
      status: 'Buscando',
      done: '2 listas para hablar',
    },
    notLooking: 'Sin buscar',
    candidates: [
      { name: 'Marta Quiroga', role: 'Ingeniera de IA', evidence: '✓ Evidencia · ✓ Condiciones', range: '✓ El rango encaja' },
      { name: 'Tom Weber', role: 'Staff engineer', evidence: '✕ Poca evidencia', out: 2 },
      { name: 'Priya Nair', role: 'Ingeniera de ML', evidence: '✓ Evidencia · ✓ Condiciones', range: '✕ Por debajo de su suelo', out: 3 },
      { name: 'Lucía Serrano', role: 'Científica de datos', evidence: '✓ Evidencia · ✓ Condiciones', range: '✓ El rango encaja' },
      { name: 'Jonas Berg', role: 'Ingeniero de plataforma', evidence: '✕ Necesita mudarse', out: 2 },
    ],
    rangeWorks: 'El rango encaja',
    interested: 'Interesada',
    schedule: 'Agendar entrevista',
  },
  brief: {
    kicker: 'Lo que te llega',
    title: 'Un resumen con el que puedes actuar.',
    line: 'De cada persona que encaja y quiere hablar: por qué encaja, de dónde sale la evidencia y qué conviene preguntarle.',
    name: 'Marta Quiroga',
    role: 'Ingeniera de IA · Farolillo Labs',
    status: 'Interesada',
    whyLabel: 'Por qué encaja',
    why: [
      { text: 'Construyó y operó el pipeline de evaluación de Farolillo, y defendió su diseño.', src: 'CV · GitHub · Entrevista' },
      { text: 'Quiere llevar la evaluación de principio a fin.', src: 'Sus decisiones' },
      { text: 'Remoto en Europa le encaja.', src: 'Sus decisiones' },
    ],
    range: 'Tu rango le encaja. Ninguna cifra se ha enseñado.',
    considerLabel: 'Conviene preguntar',
    consider: 'Aún no ha liderado un equipo. Sería su primera vez marcando la dirección.',
    actions: ['Agendar entrevista', 'Descartar'],
  },
  never: {
    kicker: 'Lo que promete',
    title: 'Hecho para que confíen los dos lados.',
    items: [
      'Cada candidato se describe por sí mismo.',
      'Los perfiles se leen solo con el consentimiento del candidato.',
      'Cada conversación la quieren los dos lados.',
      'Los datos privados solo salen cuando el candidato los comparte.',
    ],
  },
  finale: {
    title: 'Menos conversaciones, y todas merecen la pena.',
    body: 'Apúntate a la lista de acceso anticipado para empresas.',
  },
};

export const companies: Record<Lang, CompaniesContent> = { en, es };
