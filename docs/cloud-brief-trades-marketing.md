# Cloud session brief — expand /trades-marketing

Paste this whole file as the first message of the cloud session.

## Repo context
- React 18 + Vite SPA, TypeScript, Tailwind, react-router, react-helmet-async.
- `scripts/inject-meta.js` is a prerenderer that writes static HTML per route.
  **This is what Google reads.**
- `npm run build` = `vite build && node scripts/inject-meta.js`. `npm test` = vitest (80 tests).

### Read this before writing any copy
For niche pages the prerenderer **extracts content from the React file**: every `h2`,
`h3` and paragraph, the `included` and `results` lists, the `faqs` array, and
separately `const TITLE`, `const DESC` and the rendered `<h1>` (see the extractor
around `scripts/inject-meta.js:911`). The hardcoded `title:` and `description:` on
the route's own entry in that file are **inert and overridden**.

So: write new body copy once, in the React file, as plain headings and paragraphs —
it mirrors automatically and cannot drift. Only these parts of the `inject-meta.js`
entry are hand-written and need manual editing: the intro paragraph, the
related-links `<nav>`, and the JSON-LD. **Verify this extraction behaviour yourself
before relying on it** — confirm it by grepping the built HTML, not by trusting this
brief.

## The task
Deepen one page: `/trades-marketing`. It is the **hub** for the trades cluster.
- React page: `src/pages/niches/TradesMarketing.tsx` (221 lines)
- Prerendered entry: `scripts/inject-meta.js`, the object with `path: 'trades-marketing'`
  (around line 141)
- Current prerendered page: ~1,532 visible words, 8 FAQ entries.

It should read as the hub a BC trades business lands on before choosing their trade:
what paid ads and local SEO do for a trades company, what the money looks like, what
the first 90 days look like, and how the trades differ from each other — then route
them down to the specific page. Existing voice: concrete numbers, no hype, no
invented client results. Do keyword research for the hub-level terms yourself
(e.g. trades marketing, marketing for tradesmen, contractor lead generation BC) and
state in your summary which terms you targeted and why.

The sibling page `/contractor-marketing` was expanded last week in commit `ba96336`
(merged at `35e8d7e`, fields applied at `5332144`). **Read that diff first.** Match its
structure and depth, and do not duplicate its copy — this page is the hub, that one is
the general-contractor leaf. Overlapping text on both would compete.

## Fix the internal link graph
Measured from the current `dist/`, inbound/outbound links are missing in both
directions. Fix all of these, in the prerendered `<nav>` blocks **and** as real
in-copy links where it reads naturally:
- `/trades-marketing` does not link to `/roofer-marketing` or `/hvac-marketing`.
- These pages do not link up to `/trades-marketing`: `/roofer-marketing`,
  `/plumber-marketing`, `/electrician-marketing`, `/property-management-marketing`.

This is the one place you may edit files other than the two above, and **only** to add
these links. Do not change any other copy on those pages. Re-measure with grep on the
built HTML afterwards and show the before/after counts.

## Hard constraints
1. **Protected fields — propose, do not edit.** Do not change TITLE, DESC or the H1
   on any page. Write proposals as a before/after diff into
   `docs/proposed-seo-changes-trades.md` and leave the code alone.

   **One you must propose:** `TradesMarketing.tsx:15` currently ends
   `"...No contracts. Starts at $500/month."` The canonical price in
   `src/lib/companyFacts.ts` is **$759/month**. $500 is the recommended minimum
   *ad spend*, not the management fee, so this description is wrong in the snippet
   searchers actually read. Propose a corrected DESC. Do not edit it in place.

2. **Do not touch `services/advice-api/` or `supabase/`.** Those carry the claim
   guard, health-audience filter, landing-page handoff detection and the Gemini
   budget counter. Changes there will be reverted.
3. **No invented facts.** Read `src/lib/companyFacts.ts` and treat it as canonical for
   every price, timeline and contact detail. $759/month management, month-to-month, 30
   days' notice, 90-day results guarantee, ad spend paid directly to Google or Meta
   with a $1,000/month recommended minimum. Location is "Vancouver, BC" — no street
   address, no postal code. No client names, no "we increased leads by X%", no case
   studies. If a figure is industry guidance rather than a site fact, say "typically"
   and say so in your summary.
4. **Clients own their own Google Ads account and Google Business Profile** — this was
   confirmed, so you may state it.
5. **No new dependencies. No new pages. No URL or slug changes.**

## Definition of done
- `npm run build` passes, including the drift assertions. `npm test` passes 80/80, no skips.
- New copy verified present in `dist/trades-marketing/index.html` by grep — paste the
  evidence.
- Link-graph table re-measured and shown as before/after.
- One commit, reviewable as a diff without a browser. No PR.
- Final summary: visible word count before/after, which terms you targeted and where
  each is answered, the link-graph table, anything you chose not to do and why, any
  figure that is industry guidance rather than a site fact, and the full contents of
  `docs/proposed-seo-changes-trades.md`.

## What you cannot do in a cloud session
No browser, and no access to the Lovable, Vercel or Supabase dashboards. Do not try to
deploy or publish. Everything must be verifiable by build, tests and diff.
