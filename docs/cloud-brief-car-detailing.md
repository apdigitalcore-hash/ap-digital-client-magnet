# Cloud session brief — NEW page: /car-detailing-marketing

Paste this whole file as the first message of a NEW cloud session.
Branch off current `origin/main`. No PR, no force push.

## This brief is different: you are CREATING a page, not expanding one
The three previous sessions deepened existing pages. This one adds a route that
does not exist. That means more files and more ways to half-finish it. The scope
below is deliberately narrow — stay inside it.

## Repo context
- React 18 + Vite SPA, TypeScript, Tailwind, react-router, react-helmet-async.
- `scripts/inject-meta.js` is a prerenderer that writes static HTML per route.
  **It is what Google reads.** A React page with no entry there prerenders nothing.
- `npm run build` = `vite build && node scripts/inject-meta.js`. `npm test` = vitest (80 tests).

### Two prerenderer facts, confirmed on the last three pages
1. **Body copy mirrors automatically.** For niche pages it extracts every `h2`, `h3`
   and paragraph, the `included`/`results` lists, the `faqs` array, and separately
   `const TITLE`, `const DESC` and the rendered `<h1>` (extractor around
   `inject-meta.js:911`). Any `title:`/`description:` you write on the route entry is
   **inert and overridden** by the React file. Blocks under ~40 characters are dropped
   by design.
2. **Links do NOT mirror.** It keeps in-copy and card link *text* but **discards the
   `href`**. A `<Link>` in React is invisible to Google. Every link that must reach a
   crawler needs an `<li>` in that route's prerendered `<nav>`. Verify by grepping the
   built HTML, never the React source.

## The page
Create `/car-detailing-marketing` for mobile and shop-based auto detailing businesses
in Metro Vancouver and the Fraser Valley.

**Why this page exists:** AP Digital has a paying detailing client. Trades pages have
produced none. This vertical is proven for the business and has no page at all.

**You have no case study and may not invent one.** Do not name any client, do not
describe a specific client's results, do not imply a portfolio. Write about what the
work involves and what a detailing business should expect. This is a real constraint,
not a style note.

### Files you may change — this is the whole list
1. `src/pages/niches/CarDetailingMarketing.tsx` — new. Copy the structure of
   `src/pages/niches/SalonMarketing.tsx` (194 lines) so it matches the site's existing
   niche-page anatomy: TITLE/DESC consts, hero, `included`, `results`, `faqs`, sections.
2. `src/App.tsx` — the `lazy()` import and the `<Route path="/car-detailing-marketing">`.
   Follow the `SalonMarketing` pattern at lines 34 and 102.
3. `scripts/inject-meta.js` — a new `staticRoutes` entry: `path`, JSON-LD
   (`serviceSchema`, `breadcrumb`, `webPageSchema` — copy a sibling's shape), the
   prerendered `body` with the H1, intro paragraph and a `<nav aria-label="Related">`.
4. `src/components/IndustryGrid.tsx` — one tile. Put it **fourth**, after Real Estate,
   Coaching and Dental, which is the order the grid now reflects (demonstrated demand).
   Pick a sensible `lucide-react` icon already imported there, or add one.
5. `public/sitemap.xml` **and** `public/apdigital-sitemap.xml` — both are hand-maintained
   static files, not generated. Add the new URL to both, matching the surrounding entry
   format exactly.
6. Inbound links: add the page to the prerendered `<nav>` of `/salon-marketing` and
   `/vancouver` only. Both are plausible neighbours. Nothing else.

### Files you must NOT touch
`services/advice-api/`, `supabase/`, `src/advice/`, `src/lib/companyFacts.ts`,
`src/lib/legacyRedirects.ts`, `src/lib/blogPosts.ts`, `src/lib/moneyLinks.json`,
`src/components/AIChat.tsx`, `public/llms.txt`, `public/llms-full.txt`, any city page
other than `/vancouver`, any other niche page, any existing TITLE/DESC/H1 anywhere.
Do not add dependencies. Do not change any existing route or slug.

## Keyword research
Do it yourself and state what you targeted and why. Likely cluster, volumes unverified:
car detailing marketing, auto detailing marketing, car detailing leads, mobile detailing
marketing, how to get car detailing clients. **Say explicitly that no volume data was
verified** if you cannot verify it — do not present guesses as measured.

Angles that are genuinely specific to detailing and worth depth: mobile versus
shop-based and how the ads differ; ceramic coating and paint correction as high-ticket
services versus maintenance washes; seasonality in BC (road salt and winter grime,
spring pollen, pre-sale detailing); recurring-revenue packages versus one-off jobs;
before/after photography as the strongest creative this vertical has, which makes Meta
Ads unusually effective here; Google Business Profile and reviews for a service with no
fixed address if mobile.

## Facts and claims
- `src/lib/companyFacts.ts` is canonical: $759/month management, month-to-month,
  30 days' notice, 90-day results guarantee, ad spend paid directly to Google or Meta,
  $1,000/month recommended minimum. `$1,759/month all in` is acceptable arithmetic if
  labelled as such. Location is "Vancouver, BC" — no street address, no postal code.
- **No invented numbers.** No detailing-specific prices, CPCs, job values or
  conversion rates you cannot source. If a figure is industry guidance, write
  "typically" and list every such figure in your summary.
- No outcome claims and no performance multipliers. Do not write "ROI is exceptional",
  "3-5x return" or similar. A previous page carried both and they had to be removed.
- Clients own their own Google Ads account and Google Business Profile — confirmed, you
  may state it.
- Length: aim for the depth of `/contractor-marketing` (~2,600 visible words), not
  longer. Substance per word matters more than the count.

## Definition of done
- `npm run build` passes, including every drift and FAQ-count assertion.
- `npm test` passes 80/80, no skips. Lint and typecheck clean on changed files.
- `dist/car-detailing-marketing/index.html` exists and contains the new copy, the H1,
  the JSON-LD and the nav links. Paste grep evidence.
- The page is reachable: the route resolves, the grid tile links to it, and
  `/salon-marketing` and `/vancouver` link to it **in the built HTML**.
- Both sitemaps contain the new URL.
- One commit. Final summary: visible `<main>` word count, terms targeted and where each
  is answered, every industry-guidance figure, the files you changed, anything you chose
  not to do, and the proposed TITLE/DESC/H1 written into
  `docs/proposed-seo-changes-car-detailing.md`.

### Protected fields on a brand-new page
TITLE, DESC and H1 are protected on existing pages because they are hand-tuned. This
page has none yet, so **write your best version directly in the React file** and also
record them in the proposals doc with your reasoning, so they can be reviewed in one
place. Do not change any other page's fields.

## What you cannot do in a cloud session
No browser, no Lovable/Vercel/Supabase dashboards. Do not deploy or publish. Everything
verifiable by build, tests and diff.
