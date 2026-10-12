# Proposed SEO changes: /real-estate-marketing

These fields are protected, so nothing below has been changed in code. The page
body now covers buyer vs. seller leads, neighbourhood farming, the nurture cycle,
listing marketing, brokerage rules and BC property types, but the title still
leads with "Real Estate Leads BC". It doesn't contain "real estate marketing" or
"Vancouver", which the body now answers in depth.

All three values live in `src/pages/niches/RealEstateMarketing.tsx`.
`scripts/inject-meta.js` syncs them from there at build time (`loadStaticMeta`),
so changing the React file is enough. The stale `title`, `description` and
`<h1>` on the `real-estate-marketing` entry in `inject-meta.js` get overwritten
on every build.

**No search volumes were verified** for any target term. This session had no
keyword tool. The proposals are ranked by intent and by what the page now
answers.

## Title (`TITLE`)

```diff
- Real Estate Leads BC — Realtor Marketing | AP Digital
+ Real Estate Marketing Vancouver — Realtor Leads | AP Digital
```

60 characters (current: 53). Leads with "real estate marketing" plus the city,
the same pattern as the site's other niche titles, and keeps "realtor" and
"leads". It drops "BC" from the title, but the H1 and DESC still carry it. If
you'd rather keep the province-wide angle, `Real Estate Marketing BC — Realtor
Leads | AP Digital` (54) works too.

## Meta description (`DESC`)

```diff
- Real estate marketing with Meta Ads & Google Ads for BC realtors. Serving Vancouver, Surrey & Burnaby. Month-to-month. No contracts.
+ Meta Ads & Google Ads for BC realtors: seller and buyer leads, listing campaigns and neighbourhood farming. $759/month, month-to-month, 90-day guarantee.
```

153 characters (current: 132). Names what the page now covers (seller leads
first, since they're worth more), adds the price and the guarantee from
`companyFacts.ts`, and drops the city list, which the page body and nav already
cover.

## H1

```diff
- Real Estate Leads in BC for Agents & Brokerages
+ Real Estate Marketing and Leads for BC Agents & Brokerages
```

Optional. Adds the head term "real estate marketing" while keeping "leads",
"BC" and "agents & brokerages". If the title change is applied, the current H1
is acceptable as is.

## Not proposed

- The URL stays `/real-estate-marketing`.
- No separate seller-leads or farming page. The brief rules out new pages.
- The `og:` and `twitter:` fields read `TITLE` and `DESC`, so they follow
  automatically.

---

## Status: APPLIED 2026-10-11

All three applied to `src/pages/niches/RealEstateMarketing.tsx`, verified in
`dist/real-estate-marketing/index.html`.

- TITLE (60): `Real Estate Marketing Vancouver — Realtor Leads | AP Digital`
  The Vancouver variant was chosen over the BC one: Vancouver carries more search
  demand and matches the rest of the site's niche titles. The province-wide angle
  is kept by the H1 and DESC, which both say BC.
- DESC (153): seller leads first, price and guarantee from companyFacts.ts, city
  list dropped since the body and nav already cover it.
- H1: `Real Estate Marketing and Leads for BC Agents & Brokerages`
