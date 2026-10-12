# Cloud session brief — expand /dental-marketing

Paste this whole file as the first message of a NEW cloud session.
Branch off current `origin/main`. One commit. No PR, no force push.

## READ FIRST: this page is regulated, and one existing claim may be non-compliant

Dentists in British Columbia are regulated by the **BC College of Oral Health
Professionals (BCCOHP)**, formed in 2022 from the amalgamation of four legacy colleges
including the College of Dental Surgeons of BC (CDSBC).

**What I verified before writing this brief:**
- BCCOHP's *Standards for the Oral Health Team* (current version effective 1 April 2026)
  requires registrants to ensure their **marketing and advertisements are accurate and
  do not mislead the public**, and performance indicator 6.2.1 requires compliance with
  federal, provincial and municipal law including advertising, competition and privacy
  legislation.
- A marketing provision sits in the BCCOHP Bylaws (section 15.06 in the posted 2025
  version). **I could not retrieve its current text.**

**What I could NOT verify, and which you must check before writing a word about it:**
A third-party guide to the *legacy* CDSBC Bylaw Part 12 states that **testimonials,
patient reviews, and links to third-party review sites are not permitted on a dentist's
website**, on the grounds that they are inherently unverifiable and biased, and that
giveaways, coupons and discounts contravene the bylaws. A legacy denturist advertising
policy bars claims denoting superiority of skill, giving "best price" and "top of the
line" as examples.

**This matters because `/dental-marketing` currently sells a "review generation
strategy" and mentions reviews three times.** If the restriction is current BCCOHP
policy, the page is advising BC dentists to do something their College may prohibit.
If it only ever applied to displaying reviews on the clinic's own website — as distinct
from reviews existing on a Google Business Profile — then the advice may be fine with a
caveat. **These are materially different outcomes. Determine which is true.**

Primary sources to check (do not rely on the third-party guide):
- https://oralhealthbc.ca/practice-resources/standards-for-the-oral-health-team/
- https://oralhealthbc.ca/wp-content/uploads/2026/03/Standards-for-the-Oral-Health-Team.pdf
- https://portal.oralhealthbc.ca/practice-resources/professional-practice/standards-and-guidelines/advertising-and-promotional-activities
- The BCCOHP Bylaws PDF on oralhealthbc.ca

**If you cannot verify it, do not state it either way.** Say so in your summary, and
write the page so it is correct under either reading: keep Google Business Profile
advice factual, do not instruct dentists to solicit or display patient reviews, and tell
the reader to confirm review and testimonial practices with BCCOHP. That is useful
advice regardless of how the rule reads, and it is honest.

**Regardless of what you find, the page must not:**
- Promise or imply patient volume, revenue, or treatment outcomes
- Use superlatives about a clinic ("best dentist in Vancouver", "state of the art")
- Suggest advertising specific prices, coupons or discount offers without flagging that
  BCCOHP rules on fee advertising and discounts must be checked first
- Suggest targeting people by inferred health condition or treatment need. That breaches
  both platforms' sensitive-category rules and Canadian privacy law.
- Suggest uploading patient lists to ad platforms. A patient list is health information;
  this exact advice was removed from this site's tool for that reason.
- Imply specialist status. In dentistry, "specialist" is a protected designation.

State on the page that the dentist is responsible for compliance with BCCOHP standards
and should review ad copy before it runs. That is accurate and protects the client.

## Repo context
- React 18 + Vite SPA, TypeScript, Tailwind, react-router, react-helmet-async.
- `scripts/inject-meta.js` prerenders static HTML per route. **It is what Google reads.**
- `npm run build` = `vite build && node scripts/inject-meta.js`. `npm test` = vitest (94).

### Two prerenderer facts, confirmed on six previous pages
1. **Body copy mirrors automatically** from the React file (every `h2`, `h3`, paragraph,
   the `included`/`results` lists, `faqs`, and `const TITLE`/`const DESC`/`<h1>`;
   extractor near `inject-meta.js:911`). The route entry's `title:`/`description:` are
   inert. Blocks under ~40 chars drop.
2. **Links do NOT mirror** — link text is kept, the **`href` is discarded**. Every
   crawler-facing link needs an `<li>` in that route's prerendered `<nav>`. Verify by
   grepping the built HTML.

## The task
Deepen `/dental-marketing`.
- React page: `src/pages/niches/DentalMarketing.tsx`
- Prerendered entry: `scripts/inject-meta.js`, `path: 'dental-marketing'`
- **Measured baseline:** visible `<main>` **767 words**, **8** FAQ nodes.

Do your own keyword research; report difficulty if findable and **say plainly if the
cluster looks unwinnable**, as the law firm session correctly did. Dental marketing is a
competitive agency keyword. AP Digital has one dental client.

Angles worth depth: emergency and same-day demand versus elective cosmetic work and how
differently they behave; new-patient acquisition economics versus hygiene recall; the
Maps three-pack and Google Business Profile for a clinic with a fixed address;
insurance and direct billing as a search driver in BC; what compliant dental ad copy
looks like versus non-compliant; intake and whether the phone gets answered.

## Hard constraints
1. **Protected fields — propose, do not edit.** Diff into
   `docs/proposed-seo-changes-dental.md`. Current values:
   - TITLE `Dental Marketing Vancouver — Patient Leads | AP Digital`
   - DESC `Google Ads & Meta Ads for Vancouver dental clinics — new patient campaigns from $759/month. Month-to-month, no contracts.`
   - H1 `Dental Patient Leads in Metro Vancouver`
   Consider in your proposal whether "Patient Leads" implies patient volume, the way
   "Case Leads" did on the law firm page before it was changed.
2. **Do not touch** `services/advice-api/`, `supabase/`, `src/advice/`,
   `src/lib/companyFacts.ts`, or any other page's TITLE/DESC/H1.
3. **`companyFacts.ts` is canonical:** $759/month management, month-to-month, 30 days'
   notice, 90-day results guarantee, ad spend direct to Google or Meta, $1,000/month
   recommended minimum. Location "Vancouver, BC", no street address.
4. **No invented facts.** No client names, results, case studies, or dental CPCs,
   patient values or procedure prices you cannot source. Hedge guidance with "typically"
   and list every such figure in your summary.
5. **If an existing figure contradicts `companyFacts.ts`, fix it and say so.**
6. Clients own their own Google Ads account and Google Business Profile — confirmed.
7. Target roughly 2,600 visible words. No new dependencies, pages, or slug changes.

## Link graph
Grep the built HTML for links between this page and `/vancouver`, `/surrey`,
`/burnaby`, and relevant blog posts. Before/after table. Add missing links as nav
entries plus in-copy where natural, nothing else on those pages.

## Definition of done
- `npm run build` passes including all assertions; `npm test` 94/94; lint and typecheck
  clean.
- New copy verified in `dist/dental-marketing/index.html` by grep — paste evidence.
- Every added link verified in the built HTML.
- Summary must include: visible `<main>` before/after, terms targeted with difficulty if
  findable, **a verdict on winnability**, the link table, every industry-guidance figure,
  **every regulatory claim with its primary source**, **what you concluded about the
  review/testimonial rule and how you verified it**, what you chose not to do, and the
  full proposals doc.

## Not available in a cloud session
No browser, no dashboards. Do not deploy. Verify by build, tests and diff.
