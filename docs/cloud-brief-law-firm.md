# Cloud session brief — expand /law-firm-marketing

Paste this whole file as the first message of a NEW cloud session.
Branch off current `origin/main`. One commit. No PR, no force push.

## READ THIS FIRST: this page is regulated

Lawyer marketing in British Columbia is governed by the Law Society of BC's Code of
Professional Conduct, Chapter 4 (Marketing of Legal Services). The binding standard,
rule 4.2-5: a lawyer's marketing must not be **false, inaccurate, or unverifiable**.
Rule 4.2-1: it must not mislead, confuse or deceive, or be likely to. The commentary
treats marketing that **creates unjustified expectations about what a lawyer can
achieve**, or that takes advantage of a prospective client's physical or emotional
vulnerability, as a breach.

A law firm that follows marketing advice from this page and breaches those rules faces
a regulatory problem, not a marketing one. So this page must not:

- Promise or imply case outcomes, settlements, or "we'll win your case"
- Promise lead volume, case volume or revenue for the firm
- Use superlatives about a firm ("best", "top", "#1 injury lawyer in Vancouver")
- Suggest targeting people by inferred legal vulnerability — accident victims, people
  in a custody dispute, people facing deportation. Both a conduct problem and an ad
  platform policy problem.
- Suggest claiming or implying specialist certification a lawyer does not hold
- Recommend testimonials or reviews that describe case results

What the page **can** do: explain how search demand works for legal services, how
intent differs by practice area, what compliant ad copy looks like versus
non-compliant, why Google Ads policy treats legal services as a restricted category,
how to set up tracking and intake, and what a firm should expect operationally. Framing
every claim as what AP Digital does — not what the firm will get — is both compliant
and more honest.

**State in the page, in the firm's own interest, that the lawyer is responsible for
compliance with Law Society rules and should review ad copy before it runs.** That is
accurate and it protects the client.

Source to cite in your summary, not necessarily on the page:
https://www.lawsociety.bc.ca/for-lawyers/act-rules-and-code/code-of-professional-conduct/chapter-4-–-marketing-of-legal-services/

If you cannot verify a regulatory claim, do not state it. Say so in the summary instead.

## Repo context
- React 18 + Vite SPA, TypeScript, Tailwind, react-router, react-helmet-async.
- `scripts/inject-meta.js` prerenders static HTML per route. **It is what Google reads.**
- `npm run build` = `vite build && node scripts/inject-meta.js`. `npm test` = vitest (80).

### Two prerenderer facts, confirmed on four previous pages
1. **Body copy mirrors automatically** from the React file: every `h2`, `h3`, paragraph,
   the `included`/`results` lists, the `faqs` array, and separately `const TITLE`,
   `const DESC` and the rendered `<h1>` (extractor near `inject-meta.js:911`). The
   `title:`/`description:` on the route entry are inert. Blocks under ~40 chars drop.
2. **Links do NOT mirror.** In-copy and card link *text* is kept, the **`href` is
   discarded**. Every crawler-facing link needs an `<li>` in that route's prerendered
   `<nav>`. Verify by grepping the built HTML.

## The task
Deepen `/law-firm-marketing`.
- React page: `src/pages/niches/LawFirmMarketing.tsx` (204 lines)
- Prerendered entry: `scripts/inject-meta.js`, `path: 'law-firm-marketing'` (~line 261)
- **Measured baseline:** visible `<main>` **800 words**, **8** FAQ nodes.

**Be aware of the commercial context:** AP Digital currently has no law firm clients,
and legal marketing terms are among the most competitive in the industry — far harder
than the contractor terms (difficulty 8/100) that justified an earlier expansion. Do
your own keyword research, report difficulty if you can find it, and **say plainly in
your summary if the terms look unwinnable at this page's authority.** An honest "this
is a hard cluster and here is why" is more useful than optimistic copy.

Practice areas already named on the page: family, personal injury, immigration, real
estate. Intent and economics differ sharply between them — that contrast is the page's
most useful content.

## Hard constraints
1. **Protected fields — propose, do not edit.** Diff into
   `docs/proposed-seo-changes-law-firm.md`. Current values:
   - TITLE `Law Firm Marketing Vancouver — Case Leads | AP Digital`
   - DESC `Google & Meta Ads for Vancouver law firms — family, injury, immigration and real estate practices. Month-to-month, no lock-in contracts.`
   - H1 `Law Firm Case Leads in Vancouver`
   Note for your proposal: "Case Leads" edges toward promising case volume. Consider
   whether a more neutral framing is both safer and more accurate.
2. **Do not touch** `services/advice-api/`, `supabase/`, `src/advice/`,
   `src/lib/companyFacts.ts`, or any other page's TITLE/DESC/H1.
3. **`companyFacts.ts` is canonical:** $759/month management, month-to-month, 30 days'
   notice, 90-day results guarantee, ad spend direct to Google or Meta, $1,000/month
   recommended minimum. Location "Vancouver, BC", no street address.
4. **No invented facts.** No client names, no results, no case studies, no legal CPCs or
   case values you cannot source. Hedge guidance with "typically" and list every such
   figure in your summary.
5. **No outcome claims or performance multipliers** — doubly so here, see above.
6. Clients own their own Google Ads account and Google Business Profile — confirmed.
7. Target roughly 2,600 visible words. No new dependencies, pages, or slug changes.

## Link graph
Grep the built HTML for links between this page and `/real-estate-marketing` (real
estate law overlaps), `/vancouver`, `/surrey`, and relevant blog posts. Before/after
table. Add missing links as nav entries plus in-copy where natural, nothing else.

## Definition of done
- `npm run build` passes including all assertions; `npm test` 80/80; lint and typecheck
  clean on changed files.
- New copy verified in `dist/law-firm-marketing/index.html` by grep — paste evidence.
- Every added link verified in the built HTML.
- Summary must include: visible `<main>` before/after, terms targeted with difficulty if
  findable, **an explicit verdict on whether these terms are realistically winnable**,
  the link table, every industry-guidance figure, every regulatory claim with its
  source, what you chose not to do, and the full proposals doc.

## Not available in a cloud session
No browser, no dashboards. Do not deploy. Verify by build, tests and diff.
