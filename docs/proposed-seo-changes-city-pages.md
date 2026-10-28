# Proposed title changes: city pages

Protected fields — nothing below is changed in code. Each lives in that page's
`const TITLE`; `scripts/inject-meta.js` syncs it at build time.

## The evidence (Search Console, 90 days, per page)

**/surrey — 1,651+ impressions across its top queries, 0 clicks**

| Query | Impressions | Clicks |
|---|---|---|
| google ads agency surrey | 425 | 0 |
| digital marketing services surrey | 340 | 0 |
| google ads surrey | 335 | 0 |
| digital marketing agency surrey | 277 | 0 |
| surrey marketing company | 274 | 0 |

**/vancouver — ~2,430 impressions across its top queries, 0 clicks**

| Query | Impressions | Clicks |
|---|---|---|
| digital marketing vancouver | 692 | 0 |
| digital marketing agency vancouver | 595 | 0 |
| digital marketing agency | 569 | 0 |
| marketing agency near me | 227 | 0 |
| digital marketing near me | 177 | 0 |

Every one of these is a commercial, ready-to-hire query. The pages are shown
for exactly the right searches and earn nothing from them.

## The mismatch

| Page | Current title | What people actually search |
|---|---|---|
| /vancouver | Google & Meta Ads Vancouver — From $759/mo, No Contract | digital marketing **agency** vancouver |
| /surrey | Surrey **Lead Generation**: Google & Meta Ads, No Lock-In | digital marketing **agency** surrey, google ads **agency** surrey |
| /burnaby | **Digital Marketing Agency** Burnaby — Ads from $759/mo | already aligned |

The titles are written around the service and the price. The searches are for a
category — "digital marketing agency" plus a city. "Lead Generation" appears in
none of Surrey's top queries.

## Proposals

```diff
  /vancouver  (current 55)
- Google & Meta Ads Vancouver — From $759/mo, No Contract
+ Digital Marketing Agency Vancouver — Ads from $759/mo
  53 chars. Leads with the category term carrying 595 + 692 monthly
  impressions, keeps the price, drops "No Contract" which no query contains.

  /surrey  (current 53)
- Surrey Lead Generation: Google & Meta Ads, No Lock-In
+ Digital Marketing Agency Surrey — Google Ads from $759/mo
  57 chars. "Lead Generation" is replaced by the two phrases that actually
  carry the impressions. Keeps Google Ads, which is its own 335-impression
  query, and the price.

  /burnaby
  No change. Already leads with the category term.

  /richmond, /langley, /coquitlam, /abbotsford
  Pull each page's own query list before changing anything. Do not assume the
  Vancouver and Surrey pattern transfers; Abbotsford's title is aimed at
  trades, which may or may not match what it is shown for.
```

## What this will and will not do

It will not fix zero clicks on its own. Zero clicks from 4,000+ impressions
means these pages sit on page two or three, where even a perfect title earns
almost nothing. Title alignment raises the click-through rate *once the page is
visible*; it does not move position.

Position on "digital marketing agency <city>" is set by authority — how many
other sites reference you. That is the binding constraint, and it is not
something a title, or more words on the page, can change. These pages are
already 1,400-1,900 words.

The faster route for local commercial intent is the Map Pack, which ranks on a
different system: proximity, categories, completeness and reviews rather than
backlinks. See the audit's section on Google Business Profile.

Recommendation: apply the two title changes because they are free and correct,
but treat them as housekeeping, not as the fix.
