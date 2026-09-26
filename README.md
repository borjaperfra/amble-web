# amble-web

The public website for **Amble**, your professional Rep: the story, and the waitlist for the closed beta.

This project is deliberately separate from the product repo (`../amble`). Nothing here imports from, writes to, or runs inside that directory.

- [`PLAN.md`](./PLAN.md) — what we're building and what's decided.
- [`BRIEF.md`](./BRIEF.md) — what the site inherits from Amble.
- `../amble/PRODUCT_SPEC.md` and `../amble/DESIGN_SYSTEM.md` — source of truth for voice and design.

## Stack

Astro 7 with `@astrojs/node` in middleware mode, served by `server.mjs` (Express + compression). Pages are prerendered, EN at `/`, ES at `/es/`. The waitlist is the only server code: Postgres + Resend. The home's motion uses GSAP (ScrollTrigger, Flip) and Lenis.

## Local

```bash
npm install
cp .env.example .env     # point DATABASE_URL at a local Postgres
npm run db:migrate
npm run dev
```

Without `RESEND_API_KEY`, confirmation links are printed to the server log instead of emailed.

Other scripts:

- `npm run stats` prints the last 14 days of anonymous counts (views, how far people scroll, sign-ups).
- `npm test` runs the unit tests.
- `npm run og` regenerates the social cards (`public/og-*.png`) and `public/favicon-closed.svg`.
- `node design/blink-frames.mts` renders the eye's blink, frame by frame, to `design/blink-frames.html`.

## Railway

- One service from this repo plus a Postgres plugin.
- Build: `npm run build`. Start: `npm start` (applies `db/schema.sql`, then runs `server.mjs`).
- Variables: `DATABASE_URL` (from the Postgres plugin), `RESEND_API_KEY`, `WAITLIST_FROM`, `SITE_URL=https://amble.fyi`, `HOST=0.0.0.0`. Railway sets `PORT`.
- `server.mjs` compresses responses, caches hashed assets for a year and revalidates HTML. The waitlist's rate limit reads the client IP from the last `X-Forwarded-For` hop, which Railway's proxy sets.
- Astro rejects cross-site form posts by checking `Origin` against the request host; the custom domain must reach the service with its own `Host` header.
