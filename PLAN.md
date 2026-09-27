# Plan — amble-web v0

Decided 2026-09-26. The copy here is direction, not final text.

## Goal

A waitlist for the beta. The beta exists to get feedback on real use: what breaks, what to improve. Amble is a Rep for developers and people in tech, so the audience filters itself. Email is the only field.

Later, the site grows into: social login → create a profile → start your agent on WhatsApp or Telegram. Nothing more.

## Stack

- Astro 7, static pages + one server endpoint (`@astrojs/node`, standalone) for the waitlist.
- EN at `/`, ES at `/es/` (Astro i18n).
- Postgres on Railway for the waitlist. Resend for the welcome email.
- Tokens copied from `../amble/src/app/globals.css`.

## Waitlist

- Email only. Two lists in one table: candidates and companies (the same address can be on both). Store email, locale, audience, consent timestamp, welcome-sent timestamp.
- No double opt-in (changed 2026-09-26): submitting the form is the consent. One welcome email from Borja per address and list (EN/ES, candidate/company). Kept until the beta ends or until the person asks to delete it; the privacy page says so.
- No queue position, no referrals (no artificial scarcity — PRODUCT_SPEC §2).
- Built: `POST /api/waitlist` (JSON for fetch, 303 redirect without JS) and `/joined` in both languages. Honeypot, per-IP rate limit, 2-minute retry cooldown when a welcome email fails, same answer whether or not the email is already on the list. The confirm route and `/confirmed` pages are gone.

## Roadmap (told on the site, openly)

- **v0 — closed beta (now).** The Rep reads your sources, interviews you, builds your Map, learns from your choices (triage), knows what to listen for, writes your career.md. The beta is there to collect feedback: what breaks, what to improve. Added during v0: **your career coach** — how to improve your profile, how to look for work.
- **v1 — it reads the offers.** The Rep reads offers published on the internet and brings you only the ones that fit.
- **v2 — agent to agent.** Companies arrive with their own agents. Your Rep talks to theirs and negotiates for you. The definitive version.

## Home — sections

Shown working, Rosario-style, on a demo profile: **Marta Quiroga** (ES) and **Maya Lindqvist** (EN), both AI Engineers, at invented companies. No "fictional profile" label.

1. **Hero** — a **beta** tag. *I'm not looking. Amble is.* + an h2 that explains: meet your Rep, it listens for job offers and negotiates them for you. One line saying we're building it in the open, with a closed beta that collects users' feedback. Email field.
2. **You're more than a PDF.** Amble builds a deep profile from your docs and a few questions. Sources arriving, discoveries settling one by one.
3. **It asks what your CV can't tell.** One interview question with "Why this question?".
4. **It checks its own understanding.** A defence question on co-produced code, then a visible retraction.
5. **A map, not a score.** Map excerpt with ●●●○ evidence and "Things I don't know yet".
6. **Teach Amble with your choices.** A yes or a no is data. One triage offer crossing two axes → the revealed preference.
7. **Then it listens.** Breathing moss dot. "Nothing worth bothering you with."
8. **Where it's going.** The roadmap above: v0 today (+ career coach), v1 reads offers and filters them, v2 your agent talks to the company's agent.
9. **career.md.** Portable, provenance in every line, open format.
10. **Your data is yours.** Inspect, correct, dispute. Take your data with you, delete your whole profile, or keep it synced in your GitHub.
11. **Remove applications.** Email again.

## Other pages

- `/manifesto` — Amble represents people. It doesn't rank them. Intent ↔ evidence, assisted claims, retraction.
- `/how-its-built` — how Amble is built: evidence graph, models propose / domain rules validate, User Zero, open source.

## Open source

The plan is to open `amble` and the `career.md` format. Before making `amble` public, audit its git history for personal data (fixture profiles, `.env*`, `.amble-data/`).

Needs many reviews first; it will happen, not for launch.

## Domain

`amble.fyi`, live on Railway. **Full site since 2026-09-27** (`SITE_MODE=full`). Deploys are CLI uploads (`npx @railway/cli up --ci`), not from GitHub: push to `main` and upload. Before that, it ran in **launch mode**: `SITE_MODE=launch` serves only the hero with the form, the privacy page and the waitlist; every other page redirects home in its language. `SITE_MODE=full` (default) is the whole site. Behind Railway's proxy, `security.allowedDomains` in `astro.config.mjs` is needed for Astro to trust `X-Forwarded-Proto`, or its origin check rejects the form's posts.

## Done (2026-09-26)

- Home in EN and ES, all sections above. Design system in `DESIGN.md`, symbol in `src/components/Symbol.astro`.
- `/privacy` in both languages. No cookies, no analytics, no third-party requests.
- Form hardening: urlencoded only, ≤1 KB, exactly `email`/`locale`/`website`, strict ASCII email rule shared by browser and server, spaces stripped as typed, same answer for known and unknown addresses. (Superseded: the 30-day deletion of unconfirmed signups went away with double opt-in.)

## Done (later on 2026-09-26)

- Home rebuilt as scenes; chapter 1 pinned story; "Your turn" live GitHub read (browser → GitHub, facts only, nothing stored).
- Joining is a moment (the eye blinks, a calm line). The eye blinks for real, on click and on its own.
- `/manifesto` and `/how-its-built` in both languages; native view transitions between pages.
- Social cards, background-tab title and closed-eye favicon, bilingual 404.
- Legibility: nothing under 13px, body 17px, all text colours AA. Lighthouse: home 97/100/100/100, manifesto 100 across.

## Done (evening of 2026-09-26)

- The loop, made visible: six stages (Reads · Asks · Checks · Learns · Listens · Tells you) in the floating bar, following the scroll.
- "Your Rep found something" (v1): the week's offers filtered with reasons from Maya's rules, one match, the Rep's message on the phone with why and one thing to consider.
- Agent to agent (v2): evidence in every answer, the salary floor kept private, Maya decides.
- Triage rules marked as learned in Listening ("Three of these Maya never said"); hero defines the Rep and shows what it's doing.
- "Your turn" moved to just before the close, with a line for people without GitHub.
- Tests: `npm test` (email rules, rate limit, eye geometry).

## Done (night of 2026-09-26)

- Copy rewrite across the site (ES translated); passive-market piece, manifesto essay, companies page rebuilt around who isn't applying.
- Art direction carried through the second half (`ART_DIRECTION_AUDIT.md`): `DotField`, `AgentLine`, hairlines instead of cards.
- Launch mode at amble.fyi; one welcome email instead of double opt-in (see Waitlist and Domain).

## Done (2026-09-27) — full site live

- Hero down to three things: eye, headline, one paragraph with the form.
- Pinned scenes rebuilt in paper (Not looking, Looking for a job, companies' How it works); chapter 1 gets a fixed title. One gesture = one step; entering with momentum stops at the first step; a gesture made mid-step is kept and played when the step's animations end (`steppedScene` in `src/scripts/motion.ts`, per-scene `hold`).
- Map as a document with sources and the coach's note; Silence is a feature in three levels; triage without the question pills; the phone buzzes; v2 back to the conversation; roadmap Now → Soon solid.
- No "this, not that" constructions anywhere (home, manifesto, how it's built, companies).
- Manifesto figures: people cards with notes, the Rep between the week's offers and you, the close from the launch film.
- Companies: H1 "An AI agent that sources, checks and reaches real candidates"; inbox vs the people outside; five-step flow (role → agent → evidence → private range → schedule); the brief that reaches you. Salary rule block removed (said once, in the flow and the brief).
- How it's built: two-row pipelines; paper figures for defence and intent.
- Social cards per page (home, companies; EN/ES) with `twitter:*` tags and a versioned URL (`OG_VERSION` in `Base.astro` — bump it when the cards change). `npm run og` repairs NaN glyph points from opentype.js.
- Waitlist verified in production. Welcome email idempotency key now includes the site and language (one Resend account for every environment). Company success copy.
- Privacy page names the operator (Borja Pérez Francés) until there is a company.
- `privacy@amble.fyi` reaches Borja through the Cloudflare Email Routing catch-all.

## Open points

- Two test rows in the production waitlist (`delivered+prodcheck@resend.dev`, candidate and company): delete them.
- Check the link preview on X and WhatsApp with a fresh URL (e.g. `amble.fyi/?s=1`); Meta's Sharing Debugger needs a Facebook login.
- Optional: a dedicated routing rule for `privacy@` in case the catch-all is ever removed.

- ~~Career coach agent~~ Done 2026-09-27: told inside the Map. Under "What it still doesn't know · Leading a team", a coach note turns the gap into a next step (surface evidence first, then one step if you want it); a line below the columns for when you want to move (what to say, who to talk to, what your career.md says). The roadmap's Now line mentions it. No page of its own.

- Legal entity for the privacy page (`src/config/legal.ts`), when there is one: it replaces the operator's name.
- GitHub sync of your data (section 10) doesn't exist yet: place it in v0 or on the roadmap.
- v1 offer reading: look at career-ops' MIT job-board connectors (`providers/` in github.com/career-ops-hq/career-ops) as a possible base, with attribution. Reviewed 2026-09-27; nothing else from it (scores, ATS keywords, apply-better positioning) fits Amble.
