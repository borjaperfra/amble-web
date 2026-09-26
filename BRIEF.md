# Brief — what the website inherits from Amble

Summary of `../amble` as of commit `ba9a0fa` (2026-09-26). The specs there win on any conflict.

## The product

Amble is a professional representative. It reads what already exists about a person (CV, LinkedIn, GitHub, website), interviews them about what it couldn't tell, builds an evidence-backed **Professional Map**, learns what would make a move worth considering, and then **listens** in the background.

- Long-term ambition: replace *job → application → screening* with *intent ↔ evidence ↔ intent* (Qualified Mutual Intent).
- v0.1 question: can Amble represent someone better than their LinkedIn or CV?
- Invariant: **Amble represents people. It doesn't rank them.**

## Ideas the product actually has (candidate website material)

- **Evidence, not claims.** Source → Claim → Evidence → Capability. Every assertion carries provenance. Never an LLM straight to a capability.
- **Evidence language, not scores.** Strong / Good / Some / Limited / No evidence yet. No percentages, no percentiles, no universal score.
- **"Things I don't know yet."** Gaps are shown as curiosity, not deficiency.
- **Assisted claims and defence questions.** Code in a repo proves something shipped, not who decided it. Amble asks the candidate to defend decisions in their own work before trusting them.
- **Retraction, never deletion.** When Amble stops believing something, it keeps the record of why.
- **Revealed intent (triage).** Trade-off offers reveal hard filters that people can't list themselves. "The no is the data."
- **Listening.** Silence is a feature. No feed, no match counts, no badges.
- **career.md.** A portable, provenance-marked profile generated from the evidence graph (`../amble/src/fixtures/career.example.md`).
- **Private by default.** Inspect, correct, dispute, remove, stop listening, delete your Rep.

## Voice

Warm, calm, competent, thoughtful, human, private, precise. Short sentences in the first person of the Rep ("I found", "I don't know yet"). No "AI-powered", "unlock your potential", "dream job", sparkles, emojis, urgency or fake scarcity.

## Visual identity (DESIGN_SYSTEM.md)

- Paper canvas `#F4F1EA`, ink `#25251F` (never pure black), moss `#52634F` as the only real accent. Clay, ochre, slate used sparingly.
- Newsreader for display and emotional moments, Inter for UI and body.
- Whitespace is the container. Almost no shadows, no gradients, no card grids.
- Lowercase wordmark `amble`. No icon yet — no footprints, paths, briefcases, sparkles or network nodes.
- Signature details: the breathing moss dot (● LISTENING), discoveries settling in one by one, gaps without warning styling.
- No dark mode in the product for now; the warm paper is part of the identity.
- Screenshot test: hide the logo — could this be any SaaS? Then it isn't finished.

## The existing landing in the product

`../amble/src/app/page.tsx` already has a minimal in-app landing, per spec §7:

> I'm not looking. / Amble is. / Meet your professional Rep. → It gets to know you. → It learns what matters. → Then it listens. → **Remove applications.**

Spec §7 explicitly rules out, for v0.1: feature grids, fake testimonials, animated AI networks, pricing and generic SaaS sections.

## Open questions for planning

- Audience and goal: waitlist for the research cohort (~10 people), public launch, investors, companies?
- Relationship with the app: does the web replace the in-app `/` or link into it? Which domain?
- Language(s): English only, or EN + ES?
- How much of the thinking (evidence, defence, retraction, triage) goes public, and in what form — manifesto, explainer pages, a live career.md example?
- Stack and hosting.
