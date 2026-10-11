# Cloud session brief — expand /real-estate-marketing

Paste this whole file as the first message of a NEW cloud session.
Branch off current `origin/main`. One commit. No PR, no force push.

## Repo context
- React 18 + Vite SPA, TypeScript, Tailwind, react-router, react-helmet-async.
- `scripts/inject-meta.js` prerenders static HTML per route. **It is what Google reads.**
- `npm run build` = `vite build && node scripts/inject-meta.js`. `npm test` = vitest (80 tests).

### Two prerenderer facts, confirmed on four previous pages
1. **Body copy mirrors automatically.** It extracts every `h2`, `h3` and paragraph, the
   `included`/`results` lists, the `faqs` array, and separately `const TITLE`,
   `const DESC` and the rendered `<h1>` (extractor near `inject-meta.js:911`). The
   `title:`/`description:` on the route's entry are **inert and overridden**. Write
   prose once, in the React file. Blocks under ~40 characters are dropped by design.
2. **Links do NOT mirror.** It keeps in-copy and card link *text* but **discards the
   `href`**. A `<Link>` in React is invisible to Google. Every crawler-facing link needs
   an `<li>` in that route's prerendered `<nav>`. Verify by grepping the built HTML.

Confirm both against the built output rather than trusting this brief.

## The task
Deepen `/real-estate-marketing`.
- React page: `src/pages/niches/RealEstateMarketing.tsx` (194 lines)
- Prerendered entry: `scripts/inject-meta.js`, `path: 'real-estate-marketing'` (~line 177)
- **Measured baseline:** visible `<main>` **638 words**, **8** FAQ nodes. This is the
  thinnest niche page on the site. Do not use a tags-stripped whole-file count; it
  includes JSON-LD and is not visible text.

**Why this page matters most.** Real estate is AP Digital's largest client vertical
(3 clients, more than any other). It has had the least depth. That is the gap.

Target terms — **no verified volumes**. Do your own research, state what you targeted
and why, and say plainly if you could not verify volumes. Likely cluster: real estate
marketing Vancouver, realtor marketing, real estate leads BC, realtor lead generation,
real estate agent marketing, listing marketing.

Angles genuinely specific to this vertical and worth depth: buyer leads versus seller
leads and why seller/listing leads are worth far more; farming a neighbourhood or
postal code; the long nurture cycle, since a seller may be 6-18 months out; listing
promotion versus personal-brand building for the agent; open-house and just-listed
campaigns; Meta Ads being unusually strong here because listings are visual; what
happens to leads between capture and a signed listing agreement; agents working under a
brokerage and what that means for ad accounts and branding; BC market realities such as
strata versus detached and presale.

## Hard constraints
1. **Protected fields — propose, do not edit.** Put a before/after diff in
   `docs/proposed-seo-changes-real-estate.md`. Current values:
   - TITLE `Real Estate Leads BC — Realtor Marketing | AP Digital`
   - DESC `Real estate marketing with Meta Ads & Google Ads for BC realtors. Serving Vancouver, Surrey & Burnaby. Month-to-month. No contracts.`
   - H1 `Real Estate Leads in BC for Agents & Brokerages`
2. **Do not touch** `services/advice-api/`, `supabase/`, `src/advice/`,
   `src/lib/companyFacts.ts`, or any other niche page's TITLE/DESC/H1.
3. **`src/lib/companyFacts.ts` is canonical** for every price and timeline: $759/month
   management, month-to-month, 30 days' notice, 90-day results guarantee, ad spend paid
   directly to Google or Meta, $1,000/month recommended minimum. `$1,759/month all in`
   is fine if labelled as arithmetic. Location is "Vancouver, BC" — no street address.
4. **No invented facts.** No client names, no results, no case studies, no commission
   figures or lead costs you cannot source. Hedge industry guidance with "typically"
   and list every such figure in your summary.
5. **No outcome claims, no performance multipliers.** Do not write "ROI is exceptional",
   "3-5x return" or similar. Both had to be removed from another page.
6. **Clients own their own Google Ads account and Google Business Profile** — confirmed.
7. **If an existing figure contradicts `companyFacts.ts`**, fix it and say so.
8. Target roughly 2,600 visible words, the depth of `/contractor-marketing`. Substance
   per word matters more than the total. No new dependencies, pages, or slug changes.

## Link graph
Grep the built HTML for links between this page and `/property-management-marketing`
(adjacent audience — managers and agents overlap), `/vancouver`, `/surrey`, `/burnaby`,
and any relevant blog post. Report a before/after table. Add missing links as nav
entries plus in-copy where natural, and change nothing else on those pages.

## Definition of done
- `npm run build` passes including drift and FAQ-count assertions; `npm test` 80/80.
- Lint and typecheck clean on changed files.
- New copy verified in `dist/real-estate-marketing/index.html` by grep — paste evidence.
- Every added link verified in the built HTML, not the React source.
- Summary: visible `<main>` before/after, terms targeted and where answered, link table,
  industry-guidance figures, what you chose not to do, and the full proposals doc.

## Not available in a cloud session
No browser, no Lovable/Vercel/Supabase dashboards. Do not deploy. Verify by build,
tests and diff.
