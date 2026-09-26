import type { Lang } from '../i18n/ui';

// The companies page: the problem first (the people you want aren't
// applying), then how Amble finds mutual intent, the salary rule, and a
// waitlist. The company side is v2; the page says so plainly.

export interface CompaniesContent {
  meta: { title: string; description: string };
  badge: string;
  kicker: string;
  title: [string, string];
  lede: [string, string];
  cta: string;
  formNote: string;
  formPrivacy: string;
  inbox: { inbox: string; applied: string; outside: string; tags: string[] };
  problem: { title: [string, string]; body: string[]; closer: string };
  pitch: { title: [string, string]; body: string[]; after: string };
  funnel: { traditional: string; amble: string; old: string[]; next: string[] };
  sequence: { steps: string[]; nos: string[]; closer: [string, string] };
  negotiation: {
    kicker: string;
    title: string;
    agent: string;
    rep: string;
    rows: { ask: string; answer: string }[];
    blocker: { ask: string; no: string; yes: string; toggle: string; toggleBack: string };
    hold: string;
    mutual: string;
    question: string;
  };
  salary: {
    kicker: string;
    title: string;
    body: string;
    rules: string[];
    company: string;
    person: string;
    privateRange: string;
    privateFloor: string;
    overlap: string;
    works: string;
  };
  never: { kicker: string; title: string; items: string[] };
  finale: { title: string; body: string };
}

const en: CompaniesContent = {
  meta: {
    title: 'For companies — Amble',
    description: 'The person you want probably isn’t applying. Amble finds mutual intent, with evidence and private salary ranges.',
  },
  badge: 'Early access · company side in v2',
  kicker: 'For companies',
  title: ['The person you want', 'probably isn’t applying.'],
  lede: ['Your inbox shows you who applied.', 'It doesn’t show you who would move.'],
  cta: 'Request early access',
  formNote: 'We’re building the company side now. We’ll write when there’s a place for you.',
  formPrivacy: 'Only about early access. Nothing else.',
  inbox: {
    inbox: 'Your inbox',
    applied: 'Applied',
    outside: 'The people you’d actually want to talk to',
    tags: ['happy where they are', 'not checking LinkedIn', 'not actively looking', 'would move for the right role'],
  },
  problem: {
    title: ['They aren’t looking.', 'That doesn’t mean they wouldn’t move.'],
    body: [
      'The people you want aren’t necessarily looking for another job. They’re working. They may be perfectly happy where they are.',
      'But that doesn’t mean they wouldn’t move for the right work, team, ownership, conditions or compensation.',
      'Traditional recruiting tries to discover that with cold outreach.',
    ],
    closer: 'Amble already has a Rep listening for them.',
  },
  pitch: {
    title: ['Stop collecting applicants.', 'Start finding mutual intent.'],
    body: [
      'Tell Amble who you need. Not a list of keywords: the actual work.',
      'What they need to have demonstrated. What is non-negotiable. What you’re flexible on. And what you’re willing to pay.',
    ],
    after: 'Your agent can then talk to the Reps of people who aren’t applying anywhere.',
  },
  funnel: {
    traditional: 'Traditional',
    amble: 'Amble',
    old: ['Who applied?', 'Who survives the filters?', 'Who should we talk to?'],
    next: ['Who should we talk to?', 'Can they demonstrate it?', 'Would they actually move?'],
  },
  sequence: {
    steps: [
      'You describe the work.',
      'Your agent finds people with the evidence to do it.',
      'Their Reps check whether it’s worth their attention.',
      'Both sides want to talk.',
      'Introduction.',
    ],
    nos: ['No 400 applications to screen.', 'No cold outreach to 100 people.', 'No conversation where compensation was never going to work.'],
    closer: ['Fewer conversations.', 'Better reasons to have them.'],
  },
  negotiation: {
    kicker: 'Agent ↔ Rep',
    title: 'Not keyword matching. Two representatives checking whether it’s worth human time.',
    agent: 'Company agent',
    rep: 'Her Rep',
    rows: [
      { ask: 'LLM evaluation?', answer: 'Strong evidence · 3 sources' },
      { ask: 'Remote, Europe?', answer: 'Yes' },
      { ask: 'Range €110–135K', answer: 'Conditions overlap' },
    ],
    blocker: { ask: 'Solo on-call?', no: 'No', yes: 'Yes', toggle: 'Change to shared on-call', toggleBack: 'Back to solo on-call' },
    hold: 'Hold',
    mutual: 'Mutual intent',
    question: 'Talk to each other?',
  },
  salary: {
    kicker: 'The salary rule',
    title: 'Every role has a range. Only the agents need to know it.',
    body: 'No range, no role. The system checks that conditions overlap without revealing anyone’s private number.',
    rules: [
      'Every role carries a range, or it isn’t listed.',
      'Ranges are never published, not even to us in a dashboard.',
      'Agents compare privately and share only whether they overlap.',
      'A candidate hears the range only when it fits theirs.',
    ],
    company: 'Company',
    person: 'Person',
    privateRange: 'private range',
    privateFloor: 'private floor',
    overlap: 'overlap',
    works: 'Your range works. The number stays with her.',
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
    description: 'La persona que buscas probablemente no está aplicando. Amble encuentra intención mutua, con evidencia y rangos salariales privados.',
  },
  badge: 'Acceso anticipado · lado de empresa en la v2',
  kicker: 'Para empresas',
  title: ['La persona que buscas', 'probablemente no está aplicando.'],
  lede: ['Tu bandeja te enseña quién ha aplicado.', 'No te enseña quién se movería.'],
  cta: 'Pedir acceso anticipado',
  formNote: 'Estamos construyendo el lado de empresa. Te escribiremos cuando haya sitio para ti.',
  formPrivacy: 'Solo sobre el acceso anticipado. Nada más.',
  inbox: {
    inbox: 'Tu bandeja',
    applied: 'Han aplicado',
    outside: 'Las personas con las que de verdad querrías hablar',
    tags: ['contenta donde está', 'sin mirar LinkedIn', 'sin buscar activamente', 'se movería por el puesto adecuado'],
  },
  problem: {
    title: ['No están buscando.', 'Eso no significa que no se moverían.'],
    body: [
      'Las personas que quieres no están necesariamente buscando otro trabajo. Están trabajando. Puede que estén perfectamente a gusto donde están.',
      'Pero eso no significa que no se moverían por el trabajo, el equipo, la responsabilidad, las condiciones o la retribución adecuados.',
      'El reclutamiento tradicional intenta descubrirlo con contacto en frío.',
    ],
    closer: 'Amble ya tiene un Rep escuchando por ellas.',
  },
  pitch: {
    title: ['Deja de coleccionar candidatos.', 'Empieza a encontrar intención mutua.'],
    body: [
      'Cuéntale a Amble a quién necesitas. No una lista de palabras clave: el trabajo real.',
      'Qué necesitan haber demostrado. Qué no es negociable. En qué eres flexible. Y cuánto estás dispuesto a pagar.',
    ],
    after: 'Tu agente puede entonces hablar con los Reps de personas que no están aplicando en ningún sitio.',
  },
  funnel: {
    traditional: 'Tradicional',
    amble: 'Amble',
    old: ['¿Quién ha aplicado?', '¿Quién sobrevive a los filtros?', '¿Con quién deberíamos hablar?'],
    next: ['¿Con quién deberíamos hablar?', '¿Puede demostrarlo?', '¿Se movería de verdad?'],
  },
  sequence: {
    steps: [
      'Describes el trabajo.',
      'Tu agente encuentra a personas con la evidencia para hacerlo.',
      'Sus Reps comprueban si merece su atención.',
      'Los dos lados quieren hablar.',
      'Presentación.',
    ],
    nos: ['Sin 400 candidaturas que cribar.', 'Sin contacto en frío a 100 personas.', 'Sin conversaciones en las que la retribución nunca iba a encajar.'],
    closer: ['Menos conversaciones.', 'Mejores motivos para tenerlas.'],
  },
  negotiation: {
    kicker: 'Agente ↔ Rep',
    title: 'No es buscar palabras clave. Son dos representantes comprobando si merece la pena el tiempo de las personas.',
    agent: 'Agente de empresa',
    rep: 'Su Rep',
    rows: [
      { ask: '¿Evaluación de LLMs?', answer: 'Evidencia sólida · 3 fuentes' },
      { ask: '¿Remoto, Europa?', answer: 'Sí' },
      { ask: 'Rango 110–135.000 €', answer: 'Las condiciones se solapan' },
    ],
    blocker: { ask: '¿Guardias en solitario?', no: 'No', yes: 'Sí', toggle: 'Cambiar a guardias compartidas', toggleBack: 'Volver a guardias en solitario' },
    hold: 'En espera',
    mutual: 'Intención mutua',
    question: '¿Hablamos?',
  },
  salary: {
    kicker: 'La regla del salario',
    title: 'Cada puesto tiene un rango. Solo los agentes necesitan saberlo.',
    body: 'Sin rango, no hay puesto. El sistema comprueba que las condiciones se solapan sin revelar la cifra privada de nadie.',
    rules: [
      'Cada puesto lleva un rango, o no se publica.',
      'Los rangos nunca se publican, ni siquiera para nosotros en un panel.',
      'Los agentes comparan en privado y solo comparten si se solapan.',
      'Al candidato solo se le dice el rango cuando encaja con el suyo.',
    ],
    company: 'Empresa',
    person: 'Persona',
    privateRange: 'rango privado',
    privateFloor: 'suelo privado',
    overlap: 'se solapan',
    works: 'Vuestro rango encaja. La cifra se queda con ella.',
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
