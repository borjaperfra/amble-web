# Plan — amble-web v0

Decided 2026-09-26. The copy here is direction, not final text.

## Goal

A waitlist for the beta. The beta exists to get feedback on real use: what breaks, what to improve. Amble is a Rep for developers and people in tech, so the audience filters itself. Email is the only field.

Later, the site grows into: social login → create a profile → start your agent on WhatsApp or Telegram. Nothing more.

## Stack

- Astro 7, static pages + one server endpoint (`@astrojs/node`, standalone) for the waitlist.
- EN at `/`, ES at `/es/` (Astro i18n).
- Postgres on Railway for the waitlist. Resend for double opt-in.
- Tokens copied from `../amble/src/app/globals.css`.

## Waitlist

- Email only. Double opt-in (GDPR). Store email, locale, consent timestamp, confirmation timestamp.
- No queue position, no referrals (no artificial scarcity — PRODUCT_SPEC §2).
- Success copy is understated: "Got it. Check your inbox."

## Home — sections

Shown working, Rosario-style, on a demo profile: **Marta Quiroga** in ES, an English-named equivalent in EN. No "fictional profile" label.

1. **Hero** — *I'm not looking. Amble is.* + an h2 that explains: meet your Rep, it listens for job offers and negotiates them for you. Email field.
2. **You're more than a PDF.** Amble builds a deep profile from your docs and a few questions. Sources arriving, discoveries settling one by one.
3. **It asks what your CV can't tell.** One interview question with "Why this question?".
4. **It checks its own understanding.** A defence question on co-produced code, then a visible retraction.
5. **A map, not a score.** Map excerpt with ●●●○ evidence and "Things I don't know yet".
6. **Teach Amble with your choices.** A yes or a no is data. One triage offer crossing two axes → the revealed preference.
7. **Then it listens.** Breathing moss dot. "Nothing worth bothering you with."
8. **Your agent talks to theirs.** It reads offers and brings you only what fits; it talks to the company's agent for you. (Wording pending — see open points.)
9. **career.md.** Portable, provenance in every line, open format.
10. **Your data is yours.** Inspect, correct, dispute. Take your data with you, delete your whole profile, or keep it synced in your GitHub.
11. **Remove applications.** Email again.

## Other pages

- `/manifesto` — Amble represents people. It doesn't rank them. Intent ↔ evidence, assisted claims, retraction.
- `/how-its-built` — how Amble is built: evidence graph, models propose / domain rules validate, User Zero, open source.

## Open source

The plan is to open `amble` and the `career.md` format. Before making `amble` public, audit its git history for personal data (fixture profiles, `.env*`, `.amble-data/`).

## Open points

- Domain: confirm the spelling (`amble.fyi` vs `ample.fyi`).
- Sections 1, 8, 10 describe things the product doesn't do yet (negotiating, agent-to-agent, reading offers, GitHub sync). Decide how to mark what's in the beta vs. what's coming.
- English name for the demo profile.
