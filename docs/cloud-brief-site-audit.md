# Cloud session brief — site-wide accuracy and internal-link sweep

Paste this whole file as the first message of a NEW cloud session.
Branch off current `origin/main`. No PR, no force push.

## This is a correction sweep, not a writing task
Eight pages have been deepened over the last week. **Every single session found three
to five factual or claim errors in the copy that was already there** — a $500/month
price the business does not charge, ICBC personal-injury advice that has been largely
obsolete since BC's no-fault reform in May 2021, targeting that Meta's housing rules
forbid, "if you don't see results, you don't pay" when that is not the contract, and
"12+ posts across three platforms" when the service is 12 posts on two.

Eight pages have been checked. There are about 36 pages and 47 blog posts in total.
**Assume the same errors are in the rest.** Your job is to find and fix them, not to
add new copy.

## Repo context
- React 18 + Vite SPA, TypeScript, Tailwind, react-router, react-helmet-async.
- `scripts/inject-meta.js` prerenders static HTML per route. **It is what Google reads.**
  Blog posts come from `src/lib/blogPosts.ts`.
- `npm run build` = `vite build && node scripts/inject-meta.js`. `npm test` = vitest (94).
- **Links do not mirror into the prerendered HTML.** The prerenderer keeps in-copy and
  card link *text* but discards the `href`. Only `<li>` entries inside a route's
  prerendered `<nav>` reach a crawler. Verify everything by grepping `dist/`.

## Job 1 — claims and figures that contradict `companyFacts.ts` or have no source

Read `src/lib/companyFacts.ts` first. It is canonical: Paid Ads $759/month, Social
Media $849/month with 2 platforms and 12 posts, month-to-month, 30 days' notice,
90-day results guarantee (a lead-volume target agreed at kickoff; if missed by month 3
the work continues 30 days at no fee, with ad spend still payable), ad spend paid
directly to Google or Meta, $1,000/month recommended minimum, location "Vancouver, BC"
with no street address.

Measured as of 2026-10-12, still live across `dist/`:

| Pattern | Occurrences |
|---|---|
| `proven` | 31 |
| `3–5x` / `3-5x` | 11 |
| `#1` | 9 |
| `guaranteed` | 7 |
| `dominate` | 7 |
| `best in` | 1 |

Most are in the 47 blog posts. `3–5x return on ad spend` appears in at least six of
them as a performance promise, and `3–5x higher lifetime value` is on
`/fitness-marketing`.

For each occurrence, decide and act:
- **A performance or outcome promise** ("typically produces a 3–5x return", "#1
  agency", "guaranteed results", "dominate page one") — rewrite to describe the work
  instead. Canada's Competition Act requires performance claims to rest on adequate and
  proper testing done beforehand; these do not.
- **Benign** ("proven track record of the platform", "best in class" inside a quoted
  product name, "#1" in a list) — leave it and say so.
- **A price, timeline or inclusion that contradicts `companyFacts.ts`** — fix it to
  match.
- **A figure with no source** (cost per lead, lifetime value, conversion rate) — remove
  it or hedge with "typically", and list it in your summary.

Also check for: ad-spend ranges below the $1,000 minimum; "monthly" reporting where the
service is weekly; any claim that the social media service covers more than 2 platforms
or 12 posts; any mention of a street address or postal code.

**Do not touch** blog post `title`, `metaTitle`, `metaDescription`, `date` or
`readTime` fields, or any page's `const TITLE`, `const DESC` or rendered `<h1>`. Those
are protected. If one needs changing, put it in
`docs/proposed-seo-changes-audit.md` as a before/after diff and leave the code alone.

## Job 2 — internal links that never reach a crawler

The href-dropping behaviour means a `<Link>` written in a React page is invisible to
Google. This has already been found and fixed on eight pages, where dozens of links
had never been crawled.

For every page under `src/pages/` that is **not** one of the eight already done
(contractor, trades, roofer, car-detailing, real-estate, law-firm, coaching, dental):
compare the internal links present in the React source against those present in that
route's prerendered `<nav>` in `dist/`. Produce a table of every link that exists in
React but not in the built HTML, then add the missing ones as `<nav>` entries in
`scripts/inject-meta.js`.

Check every target resolves. Some blog slugs are redirect stubs rather than live posts
— `src/lib/legacyRedirects.ts` lists them. A link to a stub should point at the real
post instead. One such link was found on `/car-detailing-marketing` and fixed.

## Hard constraints
- **Do not touch** `services/advice-api/`, `supabase/`, `src/advice/`,
  `src/lib/companyFacts.ts`, or the eight pages already deepened, except to fix a link
  target that points at a redirect stub.
- **Do not write new sections, FAQs or marketing copy.** This is a correction pass. If a
  page is thin, say so in your summary and move on.
- No new dependencies, pages, routes or slug changes.
- Do not relax or delete any drift assertion in `inject-meta.js` to make a build pass.
  Fix the drift instead.

## Commits
Two commits, in this order, so each is reviewable on its own:
1. Claim and figure corrections.
2. Internal-link additions.

## Definition of done
- `npm run build` passes including every drift and FAQ-count assertion; `npm test`
  94/94; lint and typecheck clean on changed files.
- A table of every claim changed: file, the old text, the new text, and why.
- A table of every link added: from, to, and confirmation it appears in the built HTML.
- A list of occurrences you judged benign and left alone, with the reason.
- The full contents of `docs/proposed-seo-changes-audit.md` if you wrote one.
- Confirm by diffing `dist/` against a baseline build that no page changed except the
  ones you intended.

## Not available in a cloud session
No browser, no dashboards. Do not deploy. Verify by build, tests and diff.
