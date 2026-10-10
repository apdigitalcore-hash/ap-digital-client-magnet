# Proposed SEO changes: /roofer-marketing

These fields are protected, so nothing below has been changed in code. The page
body now answers "roofing seo" in depth (its own section, two FAQs and the
Local Services Ads/Map Pack section), but the title, meta description and H1
still don't contain the term. Google weighs the title and H1 heavily, so this is
the gap that limits how far the new copy can rank for the primary target.

All three values live in `src/pages/niches/RooferMarketing.tsx`.
`scripts/inject-meta.js` syncs them from there at build time (`loadStaticMeta`),
so changing the React file is enough. The stale `title`, `description` and
`<h1>` on the `roofer-marketing` entry in `inject-meta.js` get overwritten on
every build.

**Decide before applying:** `src/lib/companyFacts.ts` says SEO is "scoped on a
call rather than sold at a list price". The body copy describes roofing SEO
without quoting a price for it. If you put "Roofing SEO" in the title, this
page becomes the entry point for roofing SEO enquiries. If you don't want that,
leave the title alone; the body copy is accurate either way.

**Avoid cannibalising:** `docs/proposed-seo-changes-contractor.md` suggests
naming roofers in the `/contractor-marketing` description to target "roofing
seo". If you adopt the changes below, drop "and roofers" from that contractor
proposal so the two pages don't compete for the same query. This page is the
better target.

## Title (`TITLE`)

```diff
- Roofer Marketing Vancouver — Roofing Jobs | AP Digital
+ Roofing SEO & Roofer Marketing Vancouver | AP Digital
```

53 characters (current: 54). Leads with the primary term "roofing seo"
(320/mo, difficulty 8) and keeps "roofer marketing" and "Vancouver". It drops
"Roofing Jobs", which isn't a query anyone searches.

## Meta description (`DESC`)

```diff
- Roofer marketing with Google Ads & Local SEO for Metro Vancouver. Month-to-month. No contracts. 90-day guarantee.
+ Roofing SEO, Google Ads & Local Services Ads for Metro Vancouver roofers. Seasonal, storm-ready campaigns. Month-to-month, 90-day guarantee.
```

140 characters. Matches the title, names Local Services Ads and storm response
(both now covered on the page), and keeps the month-to-month and guarantee
terms. If "SEO" stays out of the title, use "Local SEO" here as it does now so
the two still match.

## H1

```diff
- Roofing Leads in Metro Vancouver
+ Roofing Leads & Roofing SEO in Metro Vancouver
```

Optional. The current H1 already carries "roofing leads" and the region. The
proposed one adds the primary term. The same caveat as the title applies.

## Not proposed

- The URL stays `/roofer-marketing`. A slug change would cost the page its
  existing equity and need a redirect, which these terms don't justify.
- No separate `/roofing-seo` page. The brief rules out new pages, and one deep
  roofing page is a stronger answer than two thin ones.
- The `og:` and `twitter:` titles and descriptions read `TITLE` and `DESC`, so
  they follow automatically. Nothing separate to change.
