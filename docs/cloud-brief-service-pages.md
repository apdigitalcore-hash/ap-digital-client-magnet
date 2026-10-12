# Cloud session brief — deepen the two core service pages

Paste this whole file as the first message of a NEW cloud session.
Branch off current `origin/main`. One commit. No PR, no force push.

## Why this one matters more than the niche pages did
AP Digital sells exactly two things. Those two pages are **thinner than every niche
page on the site**: `/services/paid-ads` is 890 visible words and
`/services/social-media` is 929, while `/contractor-marketing` is 2,592 and
`/roofer-marketing` is 3,353. The money pages are the thin ones. That is backwards.

Unlike the law firm and dental pages, there is no regulator here and nothing to
invent: AP Digital has ten clients across real estate, salons, coaching, dental,
furniture and car detailing, and these are the services they actually deliver.

## Repo context
- React 18 + Vite SPA, TypeScript, Tailwind, react-router, react-helmet-async.
- `scripts/inject-meta.js` prerenders static HTML per route. **It is what Google reads.**
- `npm run build` = `vite build && node scripts/inject-meta.js`. `npm test` = vitest (94).

### Two prerenderer facts, confirmed on eight previous pages
1. **Body copy mirrors automatically** from the React file: every `h2`, `h3`,
   paragraph, the `included`/`results` lists, the `faqs` array, and separately
   `const TITLE`, `const DESC` and the rendered `<h1>` (extractor near
   `inject-meta.js:911`). The `title:`/`description:` on the route entry are inert.
   Blocks under ~40 characters are dropped by design.
2. **Links do NOT mirror.** In-copy and card link *text* is kept, the **`href` is
   discarded**. Every crawler-facing link needs an `<li>` in that route's prerendered
   `<nav>`. Verify by grepping the built HTML, never the React source.

Confirm both against the built output rather than trusting this brief.

## The task — two pages, one commit

### A. `/services/paid-ads`
- React: `src/pages/services/PaidAds.tsx` (353 lines)
- Prerender entry: `scripts/inject-meta.js`, `path: 'services/paid-ads'` (~line 332)
- **Baseline: 890 visible `<main>` words, 9 FAQ nodes.**
- Current TITLE already targets `Google Ads Agency Vancouver | PPC & Meta Ads`.

Angles worth depth: what the $759/month actually buys, week by week, in plain terms;
Google Search vs Performance Max vs Meta and when each is wrong; how the $1,000
minimum spend recommendation is arrived at and what happens below it; conversion
tracking and why most accounts measure the wrong thing; negative keywords and wasted
spend; what a weekly report contains; what AP Digital does *not* do, and when a
business should not run paid ads at all. That last one is unusual and builds trust.

### B. `/services/social-media`
- React: `src/pages/services/SocialMedia.tsx` (373 lines)
- Prerender entry: `scripts/inject-meta.js`, `path: 'services/social-media'` (~line 344)
- **Baseline: 929 visible `<main>` words, 8 FAQ nodes.**
- Current TITLE targets `Social Media Management Rates Vancouver — $849/mo`, a
  cost-comparison angle. Keep that angle; it is working positioning.

Angles worth depth: what 12 posts a month on 2 platforms realistically achieves;
flat-rate versus per-post versus hourly versus in-house, with the trade-offs stated
honestly; who should pick which 2 platforms and why; organic social versus paid and
why they are different jobs; what the client supplies versus what AP Digital produces;
why follower count is the wrong metric; when social media is not the right spend.

**Do your own keyword research for both.** State the terms you targeted, where each is
answered, and **say plainly if you could not verify volumes.**

## Hard constraints
1. **Protected fields — propose, do not edit.** One diff per page into
   `docs/proposed-seo-changes-service-pages.md`. Both current titles are already decent;
   only propose a change if you can argue it clearly.
2. **Do not touch** `services/advice-api/`, `supabase/`, `src/advice/`,
   `src/lib/companyFacts.ts`, or any niche page.
3. **`src/lib/companyFacts.ts` is canonical and you must read it first.** Paid Ads is
   $759/month, Social Media is $849/month with **2 platforms and 12 posts** — not "12+",
   not three platforms, not Reels production. An overstatement of exactly that kind was
   found and removed from the social media prerendered intro on 2026-10-12. Also
   canonical: month-to-month, 30 days' notice, 90-day results guarantee, ad spend paid
   directly to Google or Meta, $1,000/month recommended minimum.
4. **No invented facts.** No client names, no results, no case studies, no CPCs or
   conversion rates you cannot source. Hedge industry guidance with "typically" and list
   every such figure in your summary.
5. **No outcome claims and no performance multipliers.** Do not write "proven",
   "guaranteed results", "#1", "dominate", "3-5x return". All of those are still live
   elsewhere on this site and are being removed; do not add more.
6. Clients own their own Google Ads account and Google Business Profile — confirmed.
   This does not extend to Meta; do not claim it does.
7. **If an existing figure contradicts `companyFacts.ts`, fix it and say so.**
8. Target roughly 2,600 visible words per page. No new dependencies, pages, or slugs.

## Link graph
These two pages are linked from nearly every niche page, so inbound is likely fine.
Check the reverse: grep the built HTML for links **from** each service page to
`/pricing`, `/book`, the other service page, and two or three relevant niche pages.
Before/after table. Add missing links as nav entries plus in-copy where natural.

## Definition of done
- `npm run build` passes including all assertions; `npm test` 94/94; lint and typecheck
  clean on changed files.
- New copy verified in `dist/services/paid-ads/index.html` and
  `dist/services/social-media/index.html` by grep — paste evidence for both.
- Every added link verified in the built HTML.
- Summary: visible `<main>` before/after for each page, terms targeted and where
  answered, link table, industry-guidance figures, anything you chose not to do, and the
  full proposals doc.

## Not available in a cloud session
No browser, no Lovable/Vercel/Supabase dashboards. Do not deploy. Verify by build,
tests and diff.
