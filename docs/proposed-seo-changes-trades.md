# Proposed SEO changes: /trades-marketing

These fields are protected, so nothing below has been changed in code. All three
live in `src/pages/niches/TradesMarketing.tsx`, and `scripts/inject-meta.js`
syncs them into the prerendered HTML at build time (`loadStaticMeta`), so
editing the React file is enough. The `title:` and `description:` on the
`trades-marketing` entry in `inject-meta.js` are overwritten on every build.

## Meta description (`DESC`): required fix

```diff
- AP Digital runs Google & Meta Ads for BC plumbers, electricians, HVAC companies & roofers. No contracts. Starts at $500/month.
+ AP Digital runs Google & Meta Ads for BC plumbers, electricians, HVAC companies & roofers. $759/month management, month-to-month. 90-day guarantee.
```

147 characters. "$500/month" is wrong in the snippet searchers actually read. The management
fee is $759/month (`PAID_ADS.price` in `src/lib/companyFacts.ts`), and
recommended ad spend is $1,000/month (`TERMS.adSpendSeparate`), so $500 matches
neither. The proposed wording says what the $759 buys, so nobody reads it as
the all-in cost. The built page currently carries the wrong figure in three
places: `meta description`, `og:description` and `twitter:description`.

The React service and WebPage schema also read `DESC`, so this one edit fixes
the JSON-LD as well.

## Title (`TITLE`): optional

```diff
- Trades Marketing BC — Contractor Leads | AP Digital
+ Trades Marketing BC | Contractor Lead Generation | AP Digital
```

61 characters, at the edge of what Google shows before truncating. It swaps
"Contractor Leads" for the full "contractor lead generation" phrase, which the
new section "Contractor Lead Generation in BC: Rent the Leads or Own Them" now
answers. Only worth doing if that phrase is a priority. The current title
already leads with the head term "trades marketing".

## H1: optional

```diff
- Trades & Contractor Leads in Metro Vancouver
+ Trades Marketing and Contractor Leads in BC
```

The current H1 doesn't contain the page's head term, "trades marketing". It
also says "Metro Vancouver" while the title and DESC say "BC". The proposal
fixes both. Keep "Metro Vancouver" instead of "BC" if local intent matters more
than province-wide reach.

---

## Status: APPLIED 2026-10-10

All three changes approved and applied to `src/pages/niches/TradesMarketing.tsx`.
Verified in `dist/trades-marketing/index.html`:

- TITLE: `Trades Marketing BC | Contractor Lead Generation | AP Digital`
- DESC (147 chars): the $500/month error is gone; no `$500` remains on the page.
- H1: `Trades Marketing and Contractor Leads in BC`

Also closed two visitor-facing link gaps approved at the same time:
`/contractor-marketing` -> `/property-management-marketing` (card block plus the
prerendered nav, since the prerenderer keeps in-copy link text but drops the
href) and `/property-management-marketing` -> `/trades-marketing` (in-copy).
