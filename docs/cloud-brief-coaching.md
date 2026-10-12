# Cloud session brief — expand /coaching-marketing

Paste this whole file as the first message of a NEW cloud session.
Branch off current `origin/main`. One commit. No PR, no force push.

## Repo context
- React 18 + Vite SPA, TypeScript, Tailwind, react-router, react-helmet-async.
- `scripts/inject-meta.js` prerenders static HTML per route. **It is what Google reads.**
- `npm run build` = `vite build && node scripts/inject-meta.js`. `npm test` = vitest (94 tests).

### Two prerenderer facts, confirmed on six previous pages
1. **Body copy mirrors automatically** from the React file: every `h2`, `h3`, paragraph,
   the `included`/`results` lists, the `faqs` array, and separately `const TITLE`,
   `const DESC` and the rendered `<h1>` (extractor near `inject-meta.js:911`). The
   `title:`/`description:` on the route entry are inert. Blocks under ~40 chars drop.
2. **Links do NOT mirror.** In-copy and card link *text* is kept, the **`href` is
   discarded**. Every crawler-facing link needs an `<li>` in that route's prerendered
   `<nav>`. Verify by grepping the built HTML, never the React source.

## The task
Deepen `/coaching-marketing`.
- React page: `src/pages/niches/CoachingMarketing.tsx`
- Prerendered entry: `scripts/inject-meta.js`, `path: 'coaching-marketing'`
- **Measured baseline:** visible `<main>` **587 words**, **8** FAQ nodes. This is now
  the thinnest niche page on the site. Do not use a tags-stripped whole-file count.

Coaching is one of AP Digital's larger client verticals (2 clients). Do your own
keyword research, state what you targeted and why, and **say plainly if you could not
verify volumes.** Likely cluster: coaching marketing, marketing for coaches, life coach
marketing, business coach marketing, coaching client leads, how to get coaching clients.

Angles worth real depth, and genuinely specific to this vertical: coaching is an
unregulated field, so trust is the whole sale and the funnel is longer; the webinar,
challenge and discovery-call funnels and when each fits; organic content versus paid as
the lead source most coaches actually come from; high-ticket 1:1 versus group programs
versus courses and how the ad economics differ; why Meta usually outperforms Google
here, since demand is created rather than captured; the personal brand being the
product, which makes creative hard to delegate; a BC and Canadian audience versus
selling internationally.

## Claims rule — read this
Coaching advertising attracts income and outcome claims, and Canada's Competition Act
prohibits representations that are false or misleading in a material respect, including
performance claims not based on adequate and proper testing. So this page must not:
- Promise or imply earnings for the coach ("fill your roster", "six-figure practice")
- Promise lead volume, booking volume or revenue
- Suggest the coach advertise client results or transformations as typical
- Suggest health, mental-health or therapeutic outcomes. Coaches are not therapists, and
  wellness or life coaches implying treatment is both a platform-policy and a real-world
  problem. Note this on the page; it is useful to the reader.

Frame everything as what AP Digital does, not what the coach will get.

## Hard constraints
1. **Protected fields — propose, do not edit.** Diff into
   `docs/proposed-seo-changes-coaching.md`. Current values:
   - TITLE `Coaching Client Leads BC — Marketing | AP Digital`
   - DESC `Coaching marketing with Meta Ads funnels & social media for BC life, business & fitness coaches. Month-to-month. No lock-in contracts.`
   - H1 `Coaching Client Leads in BC`
2. **Do not touch** `services/advice-api/`, `supabase/`, `src/advice/`,
   `src/lib/companyFacts.ts`, or any other page's TITLE/DESC/H1.
3. **`companyFacts.ts` is canonical:** $759/month management, month-to-month, 30 days'
   notice, 90-day results guarantee, ad spend direct to Google or Meta, $1,000/month
   recommended minimum. `$1,759/month all in` is fine if labelled as arithmetic.
   Location "Vancouver, BC", no street address. The social media service covers two
   platforms — do not write "all platforms".
4. **No invented facts.** No client names, results, case studies, or coaching CPCs and
   programme prices you cannot source. Hedge guidance with "typically" and list every
   such figure in your summary.
5. **If an existing figure contradicts `companyFacts.ts`, fix it and say so.** Earlier
   pages carried ad-spend ranges below the $1,000 minimum and unsourced lead costs.
6. Clients own their own Google Ads account and Google Business Profile — confirmed.
7. Target roughly 2,600 visible words. No new dependencies, pages, or slug changes.

## Link graph
Grep the built HTML for links between this page and `/fitness-marketing` (fitness
coaches overlap), `/services/social-media`, `/vancouver`, and relevant blog posts.
Before/after table. Add missing links as nav entries plus in-copy where natural, and
change nothing else on those pages.

## Definition of done
- `npm run build` passes including all assertions; `npm test` 94/94; lint and typecheck
  clean on changed files.
- New copy verified in `dist/coaching-marketing/index.html` by grep — paste evidence.
- Every added link verified in the built HTML.
- Summary: visible `<main>` before/after, terms targeted and where answered, link table,
  industry-guidance figures, anything you chose not to do, and the full proposals doc.

## Not available in a cloud session
No browser, no dashboards. Do not deploy. Verify by build, tests and diff.
