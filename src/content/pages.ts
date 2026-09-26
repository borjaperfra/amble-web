import type { Lang } from '../i18n/ui';

// Long-form pages: the manifesto and how Amble is built. Same shape per
// language, rendered by ManifestoPage and HowBuiltPage.

export type Block =
  | { kind: 'p' | 'beat' | 'chapter' | 'quote'; text: string }
  | { kind: 'list'; text: string[] }
  | { kind: 'figure'; figure: 'loop' | 'iceberg' | 'architecture' | 'remove' };

export interface ManifestoContent {
  meta: { title: string; description: string };
  kicker: string;
  title: string;
  thesis: [string, string];
  intro: Block[];
  principlesLabel: string;
  principles: { title: string; body: string }[];
  future: Block[];
  figures: {
    loop: { ai: string; applications: string; application: string; filters: string[]; noise: string; lines: [string, string]; cut: string };
    iceberg: { looking: string; notLooking: string; question: string; tags: string[] };
    architecture: {
      today: string;
      todaySteps: string[];
      amble: string;
      you: string;
      rep: string;
      listening: string;
      opportunity: string;
      worth: string;
      conversation: string;
      caption: [string, string];
    };
    remove: { before: string[]; struck: number[]; after: string[]; middle: string; final: string };
  };
}

export interface HowBuiltContent {
  meta: { title: string; description: string };
  kicker: string;
  title: string;
  lede: string;
  sections: {
    title: string;
    body: string[];
    flow?: string[];
    emphasis?: number;
    states?: { name: string; body: string }[];
  }[];
}

const manifestoEn: ManifestoContent = {
  meta: {
    title: 'Manifesto — Amble',
    description: 'The job market is built around people looking for jobs. Amble is built for people who aren’t.',
  },
  kicker: 'Manifesto',
  title: 'Remove applications.',
  thesis: ['The job market is built around people looking for jobs.', 'Amble is built for people who aren’t.'],
  intro: [
    { kind: 'p', text: 'Recruiting has worked the same way for decades.' },
    { kind: 'p', text: 'A company publishes a job. People find it. They apply. Someone filters the applications.' },
    {
      kind: 'list',
      text: [
        'The internet made it possible to apply to more jobs.',
        'LinkedIn made everyone searchable.',
        'ATSs made it possible to filter more people.',
        'Then AI made applying almost free.',
      ],
    },
    {
      kind: 'p',
      text: 'Now we can generate applications faster than anyone can meaningfully read them. Companies respond with more automation, more screening and more filters.',
    },
    { kind: 'beat', text: 'More applications. More filters. More noise.' },
    { kind: 'figure', figure: 'loop' },
    { kind: 'p', text: 'We don’t think the answer is a better application.' },
    { kind: 'beat', text: 'We think the application is the problem.' },

    { kind: 'chapter', text: 'Most people aren’t looking.' },
    { kind: 'p', text: 'And that’s the part the current system handles badly.' },
    {
      kind: 'p',
      text: 'Some of the best people for a role are already doing good work somewhere else. They aren’t browsing job boards. They aren’t updating their CV. They aren’t applying.',
    },
    { kind: 'figure', figure: 'iceberg' },
    { kind: 'beat', text: 'But not looking isn’t the same as not listening.' },
    {
      kind: 'p',
      text: 'There may be a company they’d join. A problem they’d want to solve. More ownership they’d take. A team they’d want to work with. A number that would change the equation.',
    },
    {
      kind: 'p',
      text: 'Today, discovering that requires one side to interrupt the other. Recruiters send cold messages. People browse jobs they mostly don’t want. Both sides repeat information the other could already know.',
    },
    { kind: 'beat', text: 'There should be a better way to discover mutual intent.' },

    { kind: 'chapter', text: 'Give everyone a Rep.' },
    { kind: 'p', text: 'Your Rep knows what you’ve actually done, what you can demonstrate and what would make you move.' },
    { kind: 'list', text: ['Then you go back to work.', 'Your Rep listens.', 'Most weeks, nothing happens.', 'That’s a feature.'] },
    {
      kind: 'p',
      text: 'When something deserves your attention, it comes to you, already filtered against your work, your conditions and the things you’ve taught your Rep to care about. No searching. No job alerts. No application. Just:',
    },
    { kind: 'quote', text: 'I found something worth your attention.' },
    { kind: 'figure', figure: 'architecture' },
  ],
  principlesLabel: 'What we build by',
  principles: [
    {
      title: 'Represent, don’t rank.',
      body: 'There is no score for a person. What you’re worth depends on who is asking and for what, so your Rep describes you, and never sorts you against anyone else.',
    },
    {
      title: 'Evidence, not adjectives.',
      body: 'Every claim your Rep makes points to where it read it. What it can’t source, it doesn’t say, not even to make you look better.',
    },
    {
      title: 'Say what you don’t know.',
      body: 'A good representative is precise about its own uncertainty. “I can’t tell yet” is a useful sentence, not a failure.',
    },
    {
      title: 'Code shows what shipped, not who decided.',
      body: 'Much of today’s work is written with an agent. So your Rep asks you to explain your decisions, and only claims what you can defend.',
    },
    {
      title: 'Retract, never delete.',
      body: 'When your Rep stops believing something, it keeps the record of why. A system that can’t unlearn inflates everyone it reads.',
    },
    {
      title: 'The no is the data.',
      body: 'Nobody lists their own dealbreakers correctly. They show them, one trade-off at a time. Your Rep learns most from what you turn down.',
    },
    {
      title: 'Silence is a feature.',
      body: 'No feed, no badges, no “seven new matches”. Most weeks, the right number of opportunities is zero.',
    },
    {
      title: 'Your data is yours.',
      body: 'Private by default, portable as plain text, deletable for good. You can always see why your Rep thinks what it thinks, and change its mind.',
    },
    {
      title: 'Built in the open.',
      body: 'With the people who use it, and in public where we can. The format your profile is written in will be open for anyone to read and use.',
    },
  ],
  future: [
    { kind: 'chapter', text: 'Eventually, your Rep won’t search jobs either.' },
    {
      kind: 'list',
      text: [
        'Companies will have agents of their own.',
        'They’ll describe the work, the evidence they need, the conditions and the range.',
        'Their agent will find the people who could actually do it.',
        'Your Rep will decide whether it’s worth your attention.',
      ],
    },
    { kind: 'p', text: 'Neither side needs to reveal everything before there’s mutual interest.' },
    { kind: 'beat', text: 'Your agent talks to theirs.' },
    { kind: 'p', text: 'And when both sides want the conversation, humans talk.' },
    { kind: 'figure', figure: 'remove' },
  ],
  figures: {
    loop: {
      ai: 'AI',
      applications: 'Applications',
      application: 'Application',
      filters: ['Filter', 'Screen', 'Rank', 'Filter', 'Screen', 'Rank'],
      noise: 'More noise',
      lines: ['More applications create more filtering.', 'More filtering creates more applications.'],
      cut: 'Remove applications.',
    },
    iceberg: {
      looking: 'Looking',
      notLooking: 'Not looking',
      question: 'but would they move?',
      tags: ['right work', 'right team', 'right ownership', 'right number'],
    },
    architecture: {
      today: 'Today',
      todaySteps: ['Job', 'Job board', 'Search', 'Application', 'ATS', 'Screening', 'Recruiter', 'Maybe a conversation'],
      amble: 'Amble',
      you: 'You',
      rep: 'Rep',
      listening: 'listening',
      opportunity: 'Opportunity',
      worth: 'worth it?',
      conversation: 'Conversation',
      caption: ['The old system waits for you to apply.', 'Your Rep doesn’t.'],
    },
    remove: {
      before: ['Company', 'Job', 'Application', 'Screening', 'Person'],
      struck: [2, 3],
      after: ['Company intent', 'Evidence', 'Person intent'],
      middle: 'No application in the middle.',
      final: 'Remove applications.',
    },
  },
};

const manifestoEs: ManifestoContent = {
  meta: {
    title: 'Manifiesto — Amble',
    description: 'El mercado laboral está construido para quien busca trabajo. Amble está construido para quien no.',
  },
  kicker: 'Manifiesto',
  title: 'Adiós a las candidaturas.',
  thesis: ['El mercado laboral está construido para quien busca trabajo.', 'Amble está construido para quien no.'],
  intro: [
    { kind: 'p', text: 'El reclutamiento funciona igual desde hace décadas.' },
    { kind: 'p', text: 'Una empresa publica una oferta. La gente la encuentra. Aplica. Alguien filtra las candidaturas.' },
    {
      kind: 'list',
      text: [
        'Internet hizo posible aplicar a más ofertas.',
        'LinkedIn hizo a todo el mundo localizable.',
        'Los ATS hicieron posible filtrar a más gente.',
        'Después, la IA hizo que aplicar fuera casi gratis.',
      ],
    },
    {
      kind: 'p',
      text: 'Ahora generamos candidaturas más rápido de lo que nadie puede leerlas con sentido. Las empresas responden con más automatización, más cribado y más filtros.',
    },
    { kind: 'beat', text: 'Más candidaturas. Más filtros. Más ruido.' },
    { kind: 'figure', figure: 'loop' },
    { kind: 'p', text: 'No creemos que la respuesta sea una candidatura mejor.' },
    { kind: 'beat', text: 'Creemos que el problema es la candidatura.' },

    { kind: 'chapter', text: 'La mayoría de la gente no está buscando.' },
    { kind: 'p', text: 'Y esa es la parte que el sistema actual gestiona peor.' },
    {
      kind: 'p',
      text: 'Algunas de las mejores personas para un puesto ya están haciendo un buen trabajo en otra parte. No miran portales de empleo. No actualizan su CV. No aplican.',
    },
    { kind: 'figure', figure: 'iceberg' },
    { kind: 'beat', text: 'Pero no buscar no es lo mismo que no escuchar.' },
    {
      kind: 'p',
      text: 'Puede haber una empresa a la que se unirían. Un problema que querrían resolver. Más responsabilidad que asumirían. Un equipo con el que querrían trabajar. Una cifra que cambiaría la ecuación.',
    },
    {
      kind: 'p',
      text: 'Hoy, descubrirlo exige que una parte interrumpa a la otra. Los recruiters envían mensajes en frío. La gente mira ofertas que casi nunca quiere. Los dos lados repiten información que el otro ya podría saber.',
    },
    { kind: 'beat', text: 'Debería haber una forma mejor de descubrir la intención mutua.' },

    { kind: 'chapter', text: 'Un Rep para cada persona.' },
    { kind: 'p', text: 'Tu Rep sabe lo que de verdad has hecho, lo que puedes demostrar y qué te haría cambiar.' },
    { kind: 'list', text: ['Después tú vuelves al trabajo.', 'Tu Rep escucha.', 'Casi todas las semanas, no pasa nada.', 'Es una función.'] },
    {
      kind: 'p',
      text: 'Cuando algo merece tu atención, te llega ya filtrado según tu trabajo, tus condiciones y lo que le has enseñado a tu Rep a valorar. Sin buscar. Sin alertas de empleo. Sin candidatura. Solo:',
    },
    { kind: 'quote', text: 'He encontrado algo que merece tu atención.' },
    { kind: 'figure', figure: 'architecture' },
  ],
  principlesLabel: 'Con lo que construimos',
  principles: [
    {
      title: 'Representar, no clasificar.',
      body: 'No existe una nota para una persona. Lo que vales depende de quién pregunta y para qué, así que tu Rep te describe, y nunca te ordena frente a nadie.',
    },
    {
      title: 'Evidencia, no adjetivos.',
      body: 'Cada afirmación de tu Rep apunta a dónde la leyó. Lo que no puede respaldar, no lo dice, ni siquiera para dejarte mejor.',
    },
    {
      title: 'Decir lo que no sabes.',
      body: 'Un buen representante es preciso sobre su propia incertidumbre. «Aún no lo sé» es una frase útil, no un fracaso.',
    },
    {
      title: 'El código dice qué se envió, no quién lo decidió.',
      body: 'Hoy mucho trabajo se escribe con un agente. Por eso tu Rep te pide que expliques tus decisiones, y solo afirma lo que puedes defender.',
    },
    {
      title: 'Retirar, nunca borrar.',
      body: 'Cuando tu Rep deja de creer algo, guarda el registro de por qué. Un sistema que no puede desaprender infla a todo el que lee.',
    },
    {
      title: 'El no es el dato.',
      body: 'Nadie enumera bien sus propios límites. Los enseña, decisión a decisión. Tu Rep aprende sobre todo de lo que rechazas.',
    },
    {
      title: 'El silencio es una función.',
      body: 'Sin feed, sin notificaciones, sin «siete nuevos matches». La mayoría de semanas, el número correcto de oportunidades es cero.',
    },
    {
      title: 'Tus datos son tuyos.',
      body: 'Privados por defecto, portables en texto plano, borrables para siempre. Siempre puedes ver por qué tu Rep piensa lo que piensa, y hacerle cambiar de opinión.',
    },
    {
      title: 'Hecho en abierto.',
      body: 'Con quienes lo usan, y en público donde podamos. El formato en el que se escribe tu perfil será abierto para que cualquiera lo lea y lo use.',
    },
  ],
  future: [
    { kind: 'chapter', text: 'Algún día, tu Rep tampoco buscará ofertas.' },
    {
      kind: 'list',
      text: [
        'Las empresas tendrán sus propios agentes.',
        'Describirán el trabajo, la evidencia que necesitan, las condiciones y el rango.',
        'Su agente encontrará a las personas que de verdad podrían hacerlo.',
        'Tu Rep decidirá si merece tu atención.',
      ],
    },
    { kind: 'p', text: 'Ninguna parte necesita revelarlo todo antes de que haya interés mutuo.' },
    { kind: 'beat', text: 'Tu agente habla con el suyo.' },
    { kind: 'p', text: 'Y cuando los dos lados quieren la conversación, hablan las personas.' },
    { kind: 'figure', figure: 'remove' },
  ],
  figures: {
    loop: {
      ai: 'IA',
      applications: 'Candidaturas',
      application: 'Candidatura',
      filters: ['Filtrar', 'Cribar', 'Ordenar', 'Filtrar', 'Cribar', 'Ordenar'],
      noise: 'Más ruido',
      lines: ['Más candidaturas generan más filtros.', 'Más filtros generan más candidaturas.'],
      cut: 'Adiós a las candidaturas.',
    },
    iceberg: {
      looking: 'Buscando',
      notLooking: 'Sin buscar',
      question: '¿pero se moverían?',
      tags: ['el trabajo adecuado', 'el equipo adecuado', 'la responsabilidad adecuada', 'la cifra adecuada'],
    },
    architecture: {
      today: 'Hoy',
      todaySteps: ['Oferta', 'Portal de empleo', 'Búsqueda', 'Candidatura', 'ATS', 'Cribado', 'Recruiter', 'Quizá una conversación'],
      amble: 'Amble',
      you: 'Tú',
      rep: 'Rep',
      listening: 'escuchando',
      opportunity: 'Oportunidad',
      worth: '¿merece la pena?',
      conversation: 'Conversación',
      caption: ['El sistema antiguo espera a que apliques.', 'Tu Rep no.'],
    },
    remove: {
      before: ['Empresa', 'Oferta', 'Candidatura', 'Cribado', 'Persona'],
      struck: [2, 3],
      after: ['Intención de la empresa', 'Evidencia', 'Intención de la persona'],
      middle: 'Sin candidatura en medio.',
      final: 'Adiós a las candidaturas.',
    },
  },
};

const howEn: HowBuiltContent = {
  meta: {
    title: 'How it’s built — Amble',
    description: 'Sources, claims, evidence, capabilities. How Amble reads your work, and the rules that keep it honest.',
  },
  kicker: 'How it’s built',
  title: 'A careful pipeline, not a clever guess.',
  lede: 'What happens between the documents you give your Rep and the map it shows you, and the rules that keep it honest along the way.',
  sections: [
    {
      title: 'From sources to capabilities',
      body: [
        'A model never jumps straight to “you’re good at this”. Your Rep reads your sources, pulls out claims, links the claims that agree as evidence, and only then assesses a capability, which has to cite the evidence behind it.',
      ],
      flow: ['Source', 'Claim', 'Evidence', 'Capability'],
    },
    {
      title: 'Models propose. Rules decide.',
      body: [
        'Every model output is a proposal. It is checked against a schema, then against rules that don’t bend: no claim without a source, no quote that isn’t verbatim, no capability without evidence.',
        'Only then is it stored, with a record of which model, which prompt and which inputs produced it. Nothing goes from a model straight into your profile.',
      ],
      flow: ['Input', 'Model', 'Proposal', 'Schema', 'Domain rules', 'Stored', 'Audit record'],
      emphasis: 2,
    },
    {
      title: 'Six kinds of truth',
      body: ['Your Rep keeps track of how it knows each thing. These states never quietly turn into one another.'],
      states: [
        { name: 'Source fact', body: 'Read in something you gave it.' },
        { name: 'User claim', body: 'Something you told it.' },
        { name: 'Assisted claim', body: 'From work made together with an agent. Held back until you defend it.' },
        { name: 'Inference', body: 'Your Rep’s own reading, always labelled as such.' },
        { name: 'Verified fact', body: 'Confirmed by an independent second source.' },
        { name: 'System assessment', body: 'A judgment that must cite the states above.' },
      ],
    },
    {
      title: 'Defence and retraction',
      body: [
        'When evidence comes from co-produced work, your Rep asks you to explain a decision in it. Defended, it becomes evidence of your judgment. Not defended, it is retracted: kept on record with the question and the answer, and never claimed again.',
      ],
    },
    {
      title: 'Intent, measured',
      body: [
        'What you say you want is a start. What you turn down is the data. A short triage of offers, each a real trade-off, reveals the rules you actually decide by. They stay proposals until you confirm them.',
      ],
    },
    {
      title: 'User zero',
      body: [
        'The first person Amble read was one of us. The real pipeline has no seeded profiles and no hidden fixtures: if it can’t read someone honestly, it fails honestly.',
      ],
    },
    {
      title: 'What it runs on',
      body: [
        'TypeScript end to end. A provider-agnostic model layer, so no business rule depends on one vendor. Postgres for the evidence graph, with every model run logged. This site: Astro, no cookies, no tracking.',
      ],
    },
    {
      title: 'Open source, carefully',
      body: [
        'We’re preparing the code and the career.md format to be published. It needs careful review first, and we’d rather do it right than fast.',
      ],
    },
  ],
};

const howEs: HowBuiltContent = {
  meta: {
    title: 'Cómo está hecho — Amble',
    description: 'Fuentes, afirmaciones, evidencia, capacidades. Cómo lee Amble tu trabajo y las reglas que lo mantienen honesto.',
  },
  kicker: 'Cómo está hecho',
  title: 'Un proceso cuidadoso, no una suposición ingeniosa.',
  lede: 'Lo que pasa entre los documentos que le das a tu Rep y el mapa que te enseña, y las reglas que lo mantienen honesto por el camino.',
  sections: [
    {
      title: 'De las fuentes a las capacidades',
      body: [
        'Un modelo nunca salta directamente a «se te da bien esto». Tu Rep lee tus fuentes, extrae afirmaciones, une las que coinciden como evidencia y solo entonces valora una capacidad, que tiene que citar la evidencia que la respalda.',
      ],
      flow: ['Fuente', 'Afirmación', 'Evidencia', 'Capacidad'],
    },
    {
      title: 'Los modelos proponen. Las reglas deciden.',
      body: [
        'Cada salida de un modelo es una propuesta. Se valida contra un esquema y después contra reglas que no se doblan: ninguna afirmación sin fuente, ninguna cita que no sea literal, ninguna capacidad sin evidencia.',
        'Solo entonces se guarda, con el registro de qué modelo, qué prompt y qué entradas la produjeron. Nada pasa de un modelo directamente a tu perfil.',
      ],
      flow: ['Entrada', 'Modelo', 'Propuesta', 'Esquema', 'Reglas de dominio', 'Guardado', 'Registro de auditoría'],
      emphasis: 2,
    },
    {
      title: 'Seis tipos de verdad',
      body: ['Tu Rep sabe cómo sabe cada cosa. Estos estados nunca se convierten unos en otros en silencio.'],
      states: [
        { name: 'Hecho de fuente', body: 'Leído en algo que le diste.' },
        { name: 'Afirmación tuya', body: 'Algo que le contaste.' },
        { name: 'Afirmación asistida', body: 'De trabajo hecho junto a un agente. En espera hasta que lo defiendas.' },
        { name: 'Inferencia', body: 'La lectura propia de tu Rep, siempre marcada como tal.' },
        { name: 'Hecho verificado', body: 'Confirmado por una segunda fuente independiente.' },
        { name: 'Valoración del sistema', body: 'Un juicio que tiene que citar los estados anteriores.' },
      ],
    },
    {
      title: 'Defensa y retirada',
      body: [
        'Cuando la evidencia viene de trabajo co-producido, tu Rep te pide que expliques una decisión que hay en él. Si la defiendes, se convierte en evidencia de tu criterio. Si no, se retira: queda registrada con la pregunta y la respuesta, y no vuelve a afirmarse.',
      ],
    },
    {
      title: 'La intención, medida',
      body: [
        'Lo que dices que quieres es un principio. Lo que rechazas es el dato. Un triage corto de ofertas, cada una un intercambio real, revela las reglas con las que de verdad decides. Siguen siendo propuestas hasta que las confirmas.',
      ],
    },
    {
      title: 'Usuario cero',
      body: [
        'La primera persona que leyó Amble fue uno de nosotros. El proceso real no tiene perfiles sembrados ni datos ocultos: si no puede leer a alguien con honestidad, falla con honestidad.',
      ],
    },
    {
      title: 'Sobre qué funciona',
      body: [
        'TypeScript de principio a fin. Una capa de modelos independiente del proveedor, para que ninguna regla de negocio dependa de uno solo. Postgres para el grafo de evidencia, con cada ejecución de modelo registrada. Esta web: Astro, sin cookies, sin rastreo.',
      ],
    },
    {
      title: 'Código abierto, con cuidado',
      body: [
        'Estamos preparando el código y el formato career.md para publicarlos. Antes necesita una revisión cuidadosa, y preferimos hacerlo bien que rápido.',
      ],
    },
  ],
};

export const manifesto: Record<Lang, ManifestoContent> = { en: manifestoEn, es: manifestoEs };
export const howBuilt: Record<Lang, HowBuiltContent> = { en: howEn, es: howEs };
