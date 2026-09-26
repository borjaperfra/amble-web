import type { Lang } from '../i18n/ui';

// The companies page: how Amble works from the hiring side, and its waitlist.
// The company side is v2; the page says so plainly.

export interface CompaniesContent {
  meta: { title: string; description: string };
  badge: string;
  kicker: string;
  title: [string, string];
  lede: string;
  pitch: { title: string; body: string[] };
  cta: string;
  formNote: string;
  formPrivacy: string;
  how: { kicker: string; title: string; steps: { n: string; title: string; body: string }[] };
  salary: {
    kicker: string;
    title: string;
    body: string;
    rules: string[];
    demo: {
      role: string;
      range: string;
      hidden: string;
      candidateLabel: string;
      candidateHidden: string;
      fits: string;
      told: string;
    };
  };
  sees: {
    kicker: string;
    title: string;
    items: { title: string; body: string }[];
  };
  never: { kicker: string; title: string; items: string[] };
  finale: { title: string; body: string };
}


const en: CompaniesContent = {
  meta: {
    title: 'For companies — Amble',
    description: 'Your agent meets candidates’ Reps, with evidence on both sides and salary ranges that stay private until they fit.',
  },
  badge: 'Early access · company side in v2',
  kicker: 'For companies',
  title: ['The person you want', 'probably isn’t applying.'],
  lede: 'Your inbox shows you who applied. It doesn’t show you who would move.',
  pitch: {
    title: 'Stop screening applications. Start finding mutual intent.',
    body: [
      'Tell Amble who you actually need: the work, the evidence, the constraints and the range.',
      'Company agents talk to Reps privately.',
      'You don’t get 400 applicants. You get people who can demonstrate the work, and already know enough to want the conversation.',
    ],
  },
  cta: 'Request early access',
  formPrivacy: 'Only about early access. Nothing else.',
  formNote: 'We’re building the company side now. We’ll write when there’s a place for you.',
  how: {
    kicker: 'How it works',
    title: 'Four steps, and no inbox full of CVs.',
    steps: [
      { n: '01', title: 'Describe the role', body: 'What the work is, what good looks like, what’s non-negotiable. In your words; your agent turns it into questions.' },
      { n: '02', title: 'Set the range', body: 'Every role carries a salary range. It stays with your agent: never published, never shown to anyone it doesn’t fit.' },
      { n: '03', title: 'Your agent meets their Reps', body: 'It asks about the work and gets answers backed by evidence: sources, defended decisions, and what’s still unknown.' },
      { n: '04', title: 'Only mutual fits reach you', body: 'When the evidence, the intent and the money line up on both sides, you get a conversation with someone who wants it.' },
    ],
  },
  salary: {
    kicker: 'The salary rule',
    title: 'Every role has a range. Only the agents need to know it.',
    body: 'No range, no role. Your range is never published and never leaves your agent, except to tell a candidate’s Rep that it fits. A candidate hears about it only when it matches what they’d accept.',
    rules: [
      'Every role carries a range, or it isn’t listed.',
      'Ranges are never published, not even to us in a dashboard.',
      'Agents compare ranges privately, and share only whether they overlap.',
      'A candidate is told the range only when it fits theirs.',
    ],
    demo: {
      role: 'Evaluation Lead',
      range: '€110K – €135K',
      hidden: 'Kept by your agent',
      candidateLabel: 'Candidate’s floor',
      candidateHidden: 'Kept by their Rep',
      fits: 'The ranges overlap',
      told: 'Now both sides hear it.',
    },
  },
  sees: {
    kicker: 'What your agent sees',
    title: 'Evidence, with its source.',
    items: [
      { title: 'Capabilities, with strength', body: 'Strong, good, some or limited evidence, each pointing to where it was read. Never a score.' },
      { title: 'Defended work', body: 'Code co-written with an agent only counts once the candidate has explained its decisions.' },
      { title: 'What’s unknown', body: 'Gaps are named as gaps. You know what to ask in the first conversation.' },
      { title: 'Real intent', body: 'What the candidate would actually move for, learned from their choices, not a checkbox.' },
    ],
  },
  never: {
    kicker: 'What it never does',
    title: 'Built to be trusted by both sides.',
    items: [
      'No ranking candidates against each other.',
      'No scraping profiles without the candidate’s consent.',
      'No cold outreach. Every conversation is wanted on both sides.',
      'No private data shared beyond what the candidate allows.',
    ],
  },
  finale: {
    title: 'The goal isn’t more candidates. It’s fewer conversations that should never have happened.',
    body: 'Join the early-access list for companies.',
  },
};

const es: CompaniesContent = {
  meta: {
    title: 'Para empresas — Amble',
    description: 'Tu agente habla con los Reps de los candidatos, con evidencia en ambos lados y rangos salariales que son privados hasta que encajan.',
  },
  badge: 'Acceso anticipado · lado de empresa en la v2',
  kicker: 'Para empresas',
  title: ['La persona que buscas', 'probablemente no está aplicando.'],
  lede: 'Tu bandeja te enseña quién ha aplicado. No te enseña quién se movería.',
  pitch: {
    title: 'Deja de cribar candidaturas. Empieza a encontrar intención mutua.',
    body: [
      'Cuéntale a Amble a quién necesitas de verdad: el trabajo, la evidencia, las condiciones y el rango.',
      'Los agentes de empresa hablan con los Reps en privado.',
      'No recibes 400 candidatos. Recibes personas que pueden demostrar el trabajo y que ya saben lo suficiente como para querer la conversación.',
    ],
  },
  cta: 'Pedir acceso anticipado',
  formPrivacy: 'Solo sobre el acceso anticipado. Nada más.',
  formNote: 'Estamos construyendo el lado de empresa. Te escribiremos cuando haya sitio para ti.',
  how: {
    kicker: 'Cómo funciona',
    title: 'Cuatro pasos, y ninguna bandeja llena de CVs.',
    steps: [
      { n: '01', title: 'Describe el puesto', body: 'Qué trabajo es, cómo se ve hacerlo bien, qué no es negociable. Con tus palabras; tu agente lo convierte en preguntas.' },
      { n: '02', title: 'Fija el rango', body: 'Cada puesto lleva un rango salarial. Se queda con tu agente: nunca se publica ni se enseña a nadie con quien no encaja.' },
      { n: '03', title: 'Tu agente habla con sus Reps', body: 'Pregunta por el trabajo y recibe respuestas respaldadas por evidencia: fuentes, decisiones defendidas y lo que aún no se sabe.' },
      { n: '04', title: 'Solo te llegan los encajes mutuos', body: 'Cuando la evidencia, la intención y el dinero encajan en los dos lados, tienes una conversación con alguien que la quiere.' },
    ],
  },
  salary: {
    kicker: 'La regla del salario',
    title: 'Cada puesto tiene un rango. Solo los agentes necesitan saberlo.',
    body: 'Sin rango, no hay puesto. Tu rango nunca se publica ni sale de tu agente, salvo para decirle al Rep de un candidato que encaja. El candidato solo lo conoce cuando coincide con lo que aceptaría.',
    rules: [
      'Cada puesto lleva un rango, o no se publica.',
      'Los rangos nunca se publican, ni siquiera para nosotros en un panel.',
      'Los agentes comparan rangos en privado y solo comparten si se solapan.',
      'Al candidato solo se le dice el rango cuando encaja con el suyo.',
    ],
    demo: {
      role: 'Evaluation Lead',
      range: '110.000 € – 135.000 €',
      hidden: 'Lo guarda tu agente',
      candidateLabel: 'Suelo del candidato',
      candidateHidden: 'Lo guarda su Rep',
      fits: 'Los rangos se solapan',
      told: 'Ahora lo saben los dos lados.',
    },
  },
  sees: {
    kicker: 'Lo que ve tu agente',
    title: 'Evidencia, con su fuente.',
    items: [
      { title: 'Capacidades, con su fuerza', body: 'Evidencia sólida, buena, algo o poca, cada una apuntando a dónde se leyó. Nunca una nota.' },
      { title: 'Trabajo defendido', body: 'El código escrito con un agente solo cuenta cuando el candidato ha explicado sus decisiones.' },
      { title: 'Lo que no se sabe', body: 'Los huecos se nombran como huecos. Sabes qué preguntar en la primera conversación.' },
      { title: 'Intención real', body: 'Por lo que el candidato se movería de verdad, aprendido de sus decisiones, no de una casilla.' },
    ],
  },
  never: {
    kicker: 'Lo que nunca hace',
    title: 'Hecho para que confíen los dos lados.',
    items: [
      'No clasifica candidatos unos contra otros.',
      'No extrae perfiles sin el consentimiento del candidato.',
      'No hace contacto en frío. Cada conversación la quieren los dos lados.',
      'No comparte datos privados más allá de lo que permite el candidato.',
    ],
  },
  finale: {
    title: 'El objetivo no es tener más candidatos. Es tener menos conversaciones que nunca debieron ocurrir.',
    body: 'Apúntate a la lista de acceso anticipado para empresas.',
  },
};

export const companies: Record<Lang, CompaniesContent> = { en, es };
