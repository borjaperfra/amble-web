# amble-web design system

The site speaks the product's visual language (`../amble/DESIGN_SYSTEM.md`): calm, warm, considered. This file is how that language is encoded here.

## Tokens

All values live in `src/styles/tokens.css`, in two layers:

- **Primitives** (`--paper-200`, `--moss-500`, …): the raw palette. Only `tokens.css` uses them.
- **Semantic** (`--color-text-muted`, `--color-accent`, `--space-6`, `--text-heading-xl`, …): what a value is for. Components use only these.

If a component needs a value that doesn't exist, add a semantic token. Never write a hex colour, a pixel spacing or a font size in a component.

| Family | Tokens | Notes |
| --- | --- | --- |
| Colour | `--color-bg`, `-surface`, `-surface-raised`, `-text`, `-text-muted`, `-text-faint`, `-accent`, `-accent-strong`, `-accent-soft`, `-accent-wash`, `-border`, `-border-subtle`, `-action` | Moss is the only accent. Never pure black. |
| Epistemic | `--color-caution` (assisted), `--color-retracted` | The only other voices, used for evidence states, never for decoration. |
| Type | `--font-display` (Newsreader), `--font-ui` (Inter), `--font-mono`; `--text-display-xl` … `--text-label` | Fluid with `clamp()`. Serif for emotional moments, sans for everything else. |
| Space | `--space-1` (4px) … `--space-11` (160px), `--space-section`, `--space-stack` | 4px base, the product's rhythm. The air is the container. |
| Layout | `--width-page`, `--width-wide`, `--width-reading`, `--width-narrow`, `--gutter` | |
| Shape | `--radius-sm` … `--radius-full`, `--shadow-sheet` | One shadow, for sheets only. |
| Motion | `--motion-fast` … `--motion-arrive`, `--motion-breath`, `--ease-standard` | Collapse to 0 under `prefers-reduced-motion`. |

## Primitives (`src/styles/base.css`, `sheet.css`)

- `.container`: page width and gutters.
- `.display`, `.heading`: serif, balanced. An `<em>` inside turns moss and italic.
- `.lede`, `.kicker`: supporting text and the small uppercase label. Use kickers sparingly.
- `.btn`, `.text-link`: the only two actions. Most actions are text.
- `.sheet`: a piece of the product shown on the page, lifted slightly off the paper. The **only** framed surface; everything else sits on whitespace.
- `.source-tag`: CV / GitHub / Interview provenance markers.
- `.split` (`.flip`), `.section`: home section layout.
- `[data-reveal]` (+ `style="--i:n"` for stagger): things settle into place once, as they arrive.

## Components

| Component | Use |
| --- | --- |
| `Symbol` | The mark. `breathe` makes the dot breathe (listening). |
| `Logo` | Symbol + lowercase wordmark. |
| `Header`, `Footer` | Page chrome, with the language switch. |
| `SectionIntro` | Kicker + title + lede, the text half of every home section. |
| `EvidenceDots` | ●●●○ with its label. Weight, never traffic lights. |
| `Waitlist` | The only form. Email only. |
| `Prose` | Long-form pages (privacy, later the manifesto). |
| `Notice` | The quiet pages after the form. |

## The symbol

A dot at rest inside an open circle. The circle is one unhurried stroke left open, like an ensō: it holds without enclosing. The dot is the Rep, the same moss dot that breathes when it's listening.

- Ring in ink (`currentColor`), dot in moss. On paper only — no dark variant yet, as the product has no dark mode.
- Geometry (48 grid): ring r=17, stroke 3.25, gap between −40° and −80°; dot r=6.5. The favicon (`public/favicon.svg`) thickens both for small sizes.
- Nothing literal: no footprints, paths, people, sparkles or nodes (DESIGN_SYSTEM §8).

## Rules that keep it calm

- Whitespace before borders, borders before surfaces, surfaces before shadows.
- One idea per section. If a section needs a second paragraph, it's two sections, or it's too much.
- No gradients (except the faint roadmap line), no glows, no card grids, no badges.
- Screenshot test: hide the logo. If it could be any SaaS, it isn't finished.
