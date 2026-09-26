# Art direction audit — 2026-09-26

Reviewed: the full screen recording of the site (one frame every 6s, 205s), the code of every section, and the design tokens.

## What the first half does right (the reference)

The hero, the chapter-1 story (sources → claims → capabilities) and *Silence is a feature* share one grammar:

- **Objects on paper, not components in an interface.** Sheets of paper, a dot, an eye, a hairline. Nothing sits in a panel unless it *is* a document.
- **Hairlines and tiny annotations.** Labels at 13px caps, 1–1.5px rules, dotted connectors.
- **Space as the container.** Grouping comes from proximity, not boxes.
- **One visual idea per section.** The story is one scene; the listening screen is one eye.
- **Moss as an event.** It fills a surface exactly once (Listening). Everywhere else it is an accent: a dot, a word, a line.
- **Motion that settles.** Things arrive, draw, fade. Nothing bounces.

## Problems by section

| Section | Problem | Change |
| --- | --- | --- |
| Global | Almost every title is a big serif at the same size. No difference between a thesis and the next point. | Three levels: **thesis** (hero, Silence, Remove applications), **chapter**, **observation**. Tokens `--text-thesis / --text-chapter / --text-observation`. |
| Global | Head, copy and illustration separated by up to 64–96px each, so they read as three scenes. | One `--space-scene` (48px) between a section's head and its illustration. |
| Passive (home) | Schematic iceberg: dotted line, legend, grid of dots. | A sparse field of tiny ink dots; a few looking; the eye drifts through with the scroll and conditions appear beside dots it passes. Shared `DotField`. |
| Map (home) | Three bordered cards. | Three columns separated by hairlines, no surfaces. |
| Defence (home) | Titled as a thesis. | Observation-level title. Cards stay: the code *is* a document. |
| Agents (home) | A card with rows, pills and a nested range box: a UI screenshot. | `AgentLine`: two small eyes far apart, one hairline, signals travel along it, a central point appears. |
| Roadmap (home) | Fine as a line; title too loud. | Observation-level title. |
| Ownership (home) | Four action tiles compete with the file. | A small floating file; `Read · Correct · Export · Delete` as quiet text. |
| Finale (home) | Close is right; "Remove applications." is too small for a thesis. | Thesis size. |
| Manifesto · noise | A finished infographic inside a panel. | The page itself fills up: one APPLICATION, then more, then FILTER/SCREEN, until it's uncomfortable — then everything clears and the statement is left. |
| Manifesto · not looking | Iceberg in a panel. | `DotField`, larger, with the eye crossing and *Not looking ≠ not listening.* |
| Manifesto · give everyone a Rep | Two competing flowcharts in plates. | One transformation: a person radiating applications; the lines fade; the eye appears; one hairline to a single opportunity. |
| Manifesto · remove applications | Stacked chips in a card. | One horizontal line of words; APPLICATION and SCREENING strike and fall; the ends meet as intent ↔ evidence ↔ intent. No container. |
| Company · hero | Title sized like everything else; the inbox is a grey box with a grid. | Thesis-sized title. `DotField` inbox variant: a small hairline rectangle with a few dots, many dots outside, the eye outside. |
| Company · funnel | Side-by-side consulting funnel. | Typography only: *Who applied?* strikes and becomes *Who should we talk to?*, then two smaller questions. |
| Company · negotiation | A card with rows, pills and a toggle. | `AgentLine`, as on the home. |
| Company · salary | A white card with striped bars and a shadow. | Two hairline ranges drawn straight on the moss band, the overlap marked, numbers obscured. |
| Company · never | Four white tiles. | A hairline list. |

## Components

- **Reused:** `Symbol` (eye), `SectionIntro`, `Waitlist`, `CareerMd`, the scene/reveal system (`data-scene`, `data-reveal`).
- **New, shared:** `DotField` (home passive, manifesto, company inbox), `AgentLine` (home agents, company negotiation).
- **Retired:** `Iceberg`, `InboxFigure`, `FunnelFigure`, `NegotiationFigure`, `ArchitectureFigure`, the old `LoopFigure` and `RemoveFigure` markup.

## Rules applied

- No card, panel or container unless the concept is literally bounded (a document, a phone, an inbox).
- Hairlines (1–1.5px), small labels, objects with room around them.
- Moss as accent or atmospheric field, never as the default fill of a diagram.
- An illustration carries less visual weight than its headline.
- Motion: reveals, line drawing, small shifts, masks, opacity. Reduced motion shows the resolved state.

## Outcome

Screenshots of every changed section, desktop (1440) and phone (390), are in
`design/screenshots/`.

Found and fixed during the screenshot pass:

- The `.motion` class was only added by the home's motion script, so every
  scene on the manifesto and companies pages rendered its static fallback.
  `Base.astro` now sets it on every page (unless reduced motion).
- DotField: labels no longer sit on dots; edge labels turn inward; the small
  field shows three conditions, not five; phones get their own label positions
  (and the eye reveals them in the phone order).
- The Rep figure has a tall phone composition instead of a shrunken wide one.
- The noise field leaves room at the edges and drops a third of the words on
  phones.
- The salary numbers sit outside the overlap band, and the band stops at the
  tracks instead of crossing "The range works."
- The four ownership verbs stay on one line on phones.

## Copy changes to review

- Companies, salary: "The range works. / Neither side had to reveal their
  number." (ES "El rango encaja. / Ninguna parte tuvo que revelar su cifra.")
  is new copy.
- Manifesto: the field's statement "Not looking ≠ not listening." sits right
  above the beat "But not looking isn't the same as not listening." One of the
  two could go.
- Manifesto: "We don't think the answer is a better application." and "We
  think the application is the problem." moved into the noise figure,
  unchanged.
- Home, Agents: the kicker is no longer rendered.
- Companies, Agent ↔ Rep: the solo on-call toggle and its blocker line were
  replaced by three signals (evidence, conditions, range).

## Remaining

- The scroll-driven scenes (noise, field) were checked by setting scroll
  positions; they deserve a pass with a real trackpad and phone.
- The companies question shift leaves an empty column on desktop until it
  plays.
