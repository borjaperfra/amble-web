import type { Lang } from '../i18n/ui';

// Long-form pages: the manifesto and how Amble is built. Same shape per
// language, rendered by ManifestoPage and HowBuiltPage.

export interface ManifestoContent {
  meta: { title: string; description: string };
  kicker: string;
  title: string;
  // The argument, in blocks: plain paragraphs, and short "beat" lines set large.
  essay: { kind: 'p' | 'beat' | 'list'; text: string | string[] }[];
  principlesLabel: string;
  principles: { title: string; body: string }[];
  closing: string[];
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
    description: 'Amble represents people. It doesn’t rank them. Nine principles behind your professional Rep.',
  },
  kicker: 'Manifesto',
  title: 'Recruiting is broken. AI finished the job.',
  essay: [
    {
      kind: 'list',
      text: [
        'LinkedIn turned professional identity into a profile.',
        'Job boards turned finding work into search.',
        'ATSs turned people into keywords.',
        'Then AI made applying essentially free.',
      ],
    },
    {
      kind: 'p',
      text: 'Now one person can apply to hundreds of jobs. Companies answer with more filters, more automation and more screening. So we get more applications, more noise, and less information about whether two sides should actually talk.',
    },
    { kind: 'beat', text: 'We don’t need a better application. We need to remove the application.' },
    {
      kind: 'p',
      text: 'The best person for a role may never apply. They’re working. They’re not checking job boards. They’re not updating LinkedIn. They’re not “open to work.” That doesn’t mean there’s nothing they’d move for.',
    },
    { kind: 'beat', text: 'That’s what a Rep is for.' },
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
  closing: [
    'The old system starts with a job and waits for applications.',
    'We think the next one starts with two sides knowing what they want.',
    'Intent ↔ evidence ↔ intent.',
    'No applications.',
    'Remove applications.',
  ],
};

const manifestoEs: ManifestoContent = {
  meta: {
    title: 'Manifiesto — Amble',
    description: 'Amble representa a personas. No las clasifica. Nueve principios detrás de tu Rep profesional.',
  },
  kicker: 'Manifiesto',
  title: 'El reclutamiento estaba roto. La IA lo ha rematado.',
  essay: [
    {
      kind: 'list',
      text: [
        'LinkedIn convirtió la identidad profesional en un perfil.',
        'Los portales de empleo convirtieron encontrar trabajo en buscar.',
        'Los ATS convirtieron a las personas en palabras clave.',
        'Después, la IA hizo que aplicar fuera prácticamente gratis.',
      ],
    },
    {
      kind: 'p',
      text: 'Ahora una persona puede aplicar a cientos de ofertas. Las empresas responden con más filtros, más automatización y más cribado. Así que tenemos más candidaturas, más ruido y menos información sobre si dos partes deberían hablar de verdad.',
    },
    { kind: 'beat', text: 'No necesitamos una candidatura mejor. Necesitamos eliminar la candidatura.' },
    {
      kind: 'p',
      text: 'La mejor persona para un puesto puede que nunca aplique. Está trabajando. No mira portales de empleo. No actualiza LinkedIn. No está «open to work». Eso no significa que no haya nada por lo que se movería.',
    },
    { kind: 'beat', text: 'Para eso existe un Rep.' },
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
  closing: [
    'El sistema antiguo empieza con una oferta y espera candidaturas.',
    'Creemos que el siguiente empieza con dos partes que saben lo que quieren.',
    'Intención ↔ evidencia ↔ intención.',
    'Sin candidaturas.',
    'Adiós a las candidaturas.',
  ],
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
