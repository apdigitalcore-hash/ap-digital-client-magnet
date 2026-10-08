# Proposed SEO changes: /contractor-marketing

These fields are protected, so nothing below has been changed in code. The page
body now answers the target queries (seo for contractors, contractor seo,
roofing seo, contractor marketing agency, digital marketing for contractors),
but the title, meta description and H1 still describe a paid-ads-only page. That
mismatch limits how far the new copy can rank for the SEO terms.

All three values live in `src/pages/niches/ContractorMarketing.tsx`.
`scripts/inject-meta.js` syncs them from there at build time (`loadStaticMeta`),
so changing the React file is enough. The stale `title`, `description` and
`<h1>` on the `contractor-marketing` entry in `inject-meta.js` get overwritten
on every build.

**Decide before applying:** `src/lib/companyFacts.ts` says SEO is "scoped on a
call rather than sold at a list price". Only put "SEO" in the title or
description if you're happy for this page to be the entry point for contractor
SEO enquiries. If you are not, leave the title alone; the body copy is written
to be accurate either way.

## Title (`TITLE`)

```diff
- Contractor Marketing Vancouver | AP Digital
+ Contractor Marketing & SEO Vancouver | AP Digital
```

49 characters. Adds "SEO", which the page now covers, while keeping the
existing head term. "Contractor Marketing Agency Vancouver | Ads & SEO" also
works (49 characters, adds "agency") if you'd rather target the 260/month
"contractor marketing agency" query instead.

## Meta description (`DESC`)

```diff
- General contractor marketing with Google Ads & Meta Ads for Metro Vancouver. Month-to-month. No contracts. 90-day guarantee.
+ Contractor marketing and SEO for Metro Vancouver GCs and roofers: Google Ads, Meta Ads, Google Business Profile. $759/mo, month-to-month, 90-day guarantee.
```

155 characters. Names the price and roofers (for "roofing seo"), and keeps the
terms. If "SEO" stays out of the title, drop it here as well so the two match.

## H1

```diff
- General Contractor Leads in Metro Vancouver
+ Contractor Marketing and SEO in Metro Vancouver
```

The current H1 carries none of the five target terms. The proposed one carries
"contractor marketing" and "SEO" and still names the region. The same caveat as
the title applies.

## Not proposed

- The URL stays `/contractor-marketing`. A slug change would cost the page its
  existing equity and need a redirect, which the target terms don't justify.
- No separate `/roofing-seo` page. The brief limits the work to one page, and
  "roofing seo" is handled by a section and an FAQ here, plus the existing
  `/roofer-marketing` page.
