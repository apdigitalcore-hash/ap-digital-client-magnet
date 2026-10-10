# Cloud session brief — expand /roofer-marketing

Paste this whole file as the first message of a NEW cloud session.

## Repo context
- React 18 + Vite SPA, TypeScript, Tailwind, react-router, react-helmet-async.
- `scripts/inject-meta.js` is a prerenderer that writes static HTML per route.
  **This is what Google reads.**
- `npm run build` = `vite build && node scripts/inject-meta.js`. `npm test` = vitest (80 tests).

### Two facts about the prerenderer, learned the hard way on the last two pages
1. **Body copy mirrors automatically.** For niche pages the prerenderer extracts
   every `h2`, `h3` and paragraph, the `included`/`results` lists, the `faqs` array,
   and separately `const TITLE`, `const DESC` and the rendered `<h1>` (extractor
   around `scripts/inject-meta.js:911`). The hardcoded `title:`/`description:` on
   the route's entry are **inert and overridden**. So write new prose once, in the
   React file.
2. **Links do NOT mirror. This is the trap.** The prerenderer keeps in-copy and card
   link *text* but **discards the `href`**. A `<Link>` you add in the React page is
   invisible to Google. Every link that must reach a crawler needs a matching `<li>`
   in that route's prerendered `<nav>` block in `inject-meta.js`. Verify every link
   you add by grepping the built HTML, not the React source.

Verify both claims yourself against the built output rather than trusting this brief.

## The task
Deepen one page: `/roofer-marketing`.
- React page: `src/pages/niches/RooferMarketing.tsx` (235 lines)
- Prerendered entry: `scripts/inject-meta.js`, `path: 'roofer-marketing'` (~line 295)
- **Baseline, measured — use these, not a stripped-file count:**
  visible `<main>` text **863 words**; whole file tags-stripped 1,567 (that number
  includes JSON-LD and is not visible text); **9** FAQ nodes.

Primary target term: **roofing seo — 320/mo, difficulty 8/100** (verified volume).
Secondary, by intent, volumes unverified — state which you targeted and why:
roofer marketing, roofing leads Vancouver, roofing company marketing, storm damage
roofing leads.

`roofing seo` is currently answered on `/contractor-marketing`, not here. That is
backwards: this is the roofing page. Move the depth here and leave the contractor
page alone.

## Read these first
- Commit `ba96336` — the `/contractor-marketing` expansion. Match its structure and
  depth. **Do not duplicate its copy.** It has a "Roofing SEO: Why It Works
  Differently" section; this page should go deeper and differently, not repeat it.
- Commit `8d2229e` — the `/trades-marketing` hub expansion. Same rule: the hub covers
  how the trades differ at a high level and the first 90 days in weeks. Do not restate
  either. Pick your own structure.

What is specific to roofing and worth real depth: the fall rain spike in BC and how
seasonality should shape budget through the year; emergency repair intent versus
replacement research intent and how differently those two behave; why storm response
matters and what it takes to be ready for it; roof replacement being a high-ticket,
long-consideration purchase; Local Services Ads and the Map Pack for roofers.

## Hard constraints
1. **Protected fields — propose, do not edit.** Do not change TITLE, DESC or the H1
   on any page. Put a before/after diff in `docs/proposed-seo-changes-roofer.md` and
   leave the code alone. Current values, for reference:
   - TITLE `Roofer Marketing Vancouver — Roofing Jobs | AP Digital`
   - DESC `Roofer marketing with Google Ads & Local SEO for Metro Vancouver. Month-to-month. No contracts. 90-day guarantee.`
   - H1 `Roofing Leads in Metro Vancouver`
2. **Do not touch `services/advice-api/`, `supabase/`, or `src/advice/`.** Those carry
   the claim guard, health-audience filter, handoff detection and the Gemini budget
   counter. Changes there will be reverted.
3. **`src/lib/companyFacts.ts` is canonical** for every price, timeline and contact
   detail. $759/month management, month-to-month, 30 days' notice, 90-day results
   guarantee, ad spend paid directly to Google or Meta with a $1,000/month recommended
   minimum. $1,759/month all in is acceptable arithmetic if labelled as such. Location
   is "Vancouver, BC" — no street address, no postal code.
4. **No invented facts.** No client names, no "we increased leads by X%", no case
   studies, no roofing-specific prices or rebate amounts you cannot source. If a figure
   is industry guidance rather than a site fact, write "typically" and list it in your
   summary.
5. **Clients own their own Google Ads account and Google Business Profile** — confirmed,
   you may state it.
6. **If you find an existing figure that contradicts `companyFacts.ts`**, fix it and say
   so in the summary. One such error was live on `/trades-marketing` for weeks.
7. **No new dependencies, no new pages, no URL or slug changes.**

## Link graph
Check, with grep on the built HTML, whether `/roofer-marketing` and the pages around it
link both ways — the hub `/trades-marketing`, the sibling trade pages, and
`/contractor-marketing`. Report a before/after table. You may add missing links (nav
entry plus in-copy where it reads naturally) and nothing else on those other pages.

## Definition of done
- `npm run build` passes including drift assertions; `npm test` passes 80/80, no skips.
- New copy verified present in `dist/roofer-marketing/index.html` by grep — paste it.
- Every link you added verified present in the built HTML, not just the React source.
- One commit on a fresh branch off current `origin/main`. No PR. No force push.
- Final summary: visible `<main>` word count before/after, terms targeted and where each
  is answered, the link table, industry-guidance figures listed, anything you chose not
  to do, and the full contents of `docs/proposed-seo-changes-roofer.md`.

## What you cannot do in a cloud session
No browser, no Lovable/Vercel/Supabase dashboards. Do not deploy or publish. Everything
must be verifiable by build, tests and diff.
