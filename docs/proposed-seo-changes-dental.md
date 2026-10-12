# Proposed SEO changes: /dental-marketing

These fields are protected, so nothing below has been changed in code. All
three live in `src/pages/niches/DentalMarketing.tsx`; `scripts/inject-meta.js`
syncs them into the prerendered HTML at build time, so changing the React file
is enough.

**Why change them.** "Patient Leads" in the title and H1 implies patient
volume, the same problem "Case Leads" had on `/law-firm-marketing` before it
was changed. The page body now says the 90-day guarantee is about our own lead
target, "not a promise of patient numbers". BCCOHP's Standards require
marketing to be accurate and not misleading, and a title that implies patient
volume sits awkwardly with that. Neutral wording is both safer and more
accurate.

**No search volumes or keyword difficulty were verified.** This session had no
keyword tool. See the summary for why this cluster is likely hard to win.

## Title (`TITLE`)

```diff
- Dental Marketing Vancouver — Patient Leads | AP Digital
+ Dental Marketing Vancouver — Google Ads | AP Digital
```

52 characters (current: 55). Same pattern as the applied law firm title: keeps
the head term and city, and replaces the volume framing with the service. A
longer alternative, `Dental Marketing Vancouver — Google Ads for Clinics |
AP Digital` (64), is likely to be truncated in results.

## Meta description (`DESC`)

```diff
- Google Ads & Meta Ads for Vancouver dental clinics — new patient campaigns from $759/month. Month-to-month, no contracts.
+ Google Ads, Google Business Profile and intake tracking for Metro Vancouver dental clinics, written to BCCOHP standards. $759/month, month-to-month.
```

148 characters (current: 120). Leads with what the page now recommends (Google
first, Meta in a supporting role because of platform health policies), names
BCCOHP standards as something we write to rather than guarantee, and keeps the
price from `companyFacts.ts`.

## H1

```diff
- Dental Patient Leads in Metro Vancouver
+ Dental Marketing in Metro Vancouver
```

35 characters. Carries the head term and drops the implied promise of patient
volume. Recommended, for the reason given at the top.

## Not proposed

- The URL stays `/dental-marketing`.
- No separate pages for emergency, cosmetic or implant marketing. The brief
  rules out new pages.
- The `og:` and `twitter:` fields read `TITLE` and `DESC`, so they follow
  automatically.

---

## RESOLVED 2026-10-12: the review and testimonial question

The cloud session could not reach `oralhealthbc.ca` from its container. Both
primary PDFs were downloaded and searched locally instead:

- `Standards-for-the-Oral-Health-Team.pdf` (1 April 2026, 36 pages)
- `BCCOHP-HPOA-Bylaws-April-1-2026.pdf` (140 pages)

Findings:

- **"testimonial" appears 0 times in either document.**
- The entire marketing rule is standard **6.2**: "You must ensure your oral
  health team's marketing and advertisements are accurate and do not mislead the
  public", with one performance indicator, 6.2.1, requiring compliance with
  advertising, competition and privacy law.
- The Bylaws contain **no advertising section** — "advertis" appears 0 times.
  Marketing appears only at 9.11, requiring a health profession corporation to
  disclose corporate status in marketing and to "comply with the ethics
  standards respecting marketing", which points back to 6.2.

So the legacy CDSBC Bylaw Part 12 prohibition described by third-party guides
did not survive the 2022 amalgamation or the 2026 rewrite. Patient reviews are
not banned for BC dentists; misleading ones would be, like any other misleading
marketing.

The page's wording has been updated accordingly: it now states what the current
Standards say, still advises confirming with BCCOHP before building a programme
around reviews, and keeps the "never confirm a reviewer is a patient" advice,
which is a privacy point rather than an advertising one.
