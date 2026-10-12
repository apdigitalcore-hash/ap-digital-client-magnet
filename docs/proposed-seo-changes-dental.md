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
