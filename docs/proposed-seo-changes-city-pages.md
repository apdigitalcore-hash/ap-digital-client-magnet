# City pages — query evidence and title proposals

Protected fields. Nothing below is changed in code. Each title lives in that
page's `const TITLE`; `scripts/inject-meta.js` syncs it at build time.

Search Console, 90 days, per page.

---

## The headline number

| City | Impressions (top queries) | Clicks |
|---|---:|---:|
| coquitlam | 3,333 | ~0 |
| vancouver | 2,430 | ~0 |
| surrey | 1,651 | ~0 |
| abbotsford | 1,341 | ~0 |
| langley | 1,161 | ~0 |
| burnaby | 480 | ~0 |
| richmond | 170 | ~0 |
| **total** | **10,566** | **~4** |

**City pages are about 72% of the site's 14,600 monthly impressions and produce
almost none of its 87 clicks.** They are shown constantly, for commercial
ready-to-hire searches, and earn nothing.

---

## Per page: what is searched vs what the title says

### /vancouver — 2,430
`digital marketing vancouver` 692 · `digital marketing agency vancouver` 595 ·
`digital marketing agency` 569 · `marketing agency near me` 227
Title: **Google & Meta Ads Vancouver — From $759/mo, No Contract**
Missing: "digital marketing", "agency".

### /coquitlam — 3,333, the largest and the odd one
`advertising agency` 1,241 · `marketing agency` 651 · `marketing agency near me`
558 · `advertising services` 467 · `digital marketing services coquitlam` 416
Title: **Coquitlam Google & Meta Ads From $759/mo — No Lock-In**

Most of this volume is **generic and ungeographic** — "advertising agency",
"marketing agency". Those are national head terms where a Coquitlam page will
not rank, and the impressions are almost certainly from deep positions. The
realistic target here is `digital marketing services coquitlam` (416) and
`marketing agency near me` (558), the latter being a Map Pack query rather than
a blue-link one.

### /surrey — 1,651
`google ads agency surrey` 425 · `digital marketing services surrey` 340 ·
`google ads surrey` 335 · `digital marketing agency surrey` 277 ·
`surrey marketing company` 274
Title: **Surrey Lead Generation: Google & Meta Ads, No Lock-In**
"Lead Generation" appears in none of its top queries.

### /abbotsford — 1,341, wrong on two counts
`digital marketing abbotsford` 391 · `digital marketing services abbotsford` 343 ·
`abbotsford marketing company` 284 · `digital marketing agency abbotsford` 211
Title: **Abbotsford Marketing for Trades — $759/mo, No Contract**

The title is aimed at trades. Nobody is searching Abbotsford + trades, and
trades has zero clients (commit `510da0a`). It is misaligned with the queries
and with the business.

### /langley — 1,161
`digital marketing langley` 322 · `digital marketing services langley` 292 ·
`langley marketing company` 254 · `marketing agency langley` 153
Title: **Langley Google & Meta Ads — Month-to-Month, No Contract**
Missing: "digital marketing".

### /burnaby — 480
Title: **Digital Marketing Agency Burnaby — Ads from $759/mo**
Already aligned. This is the template the others should follow.

### /richmond — 170
`digital marketing company richmond` 51 · `digital marketing agency richmond` 33
Title: **Richmond Google Ads for Local Business — No Contract**
Low volume because it was unindexed until 21 October. Re-measure in a month
before changing anything.

---

## Proposals

```diff
  /vancouver   (current 55)
- Google & Meta Ads Vancouver — From $759/mo, No Contract
+ Digital Marketing Agency Vancouver — Ads from $759/mo            (53)

  /surrey      (current 53)
- Surrey Lead Generation: Google & Meta Ads, No Lock-In
+ Digital Marketing Agency Surrey — Google Ads from $759/mo        (57)

  /langley     (current 54)
- Langley Google & Meta Ads — Month-to-Month, No Contract
+ Digital Marketing Agency Langley — Ads from $759/mo              (51)

  /abbotsford  (current 53)
- Abbotsford Marketing for Trades — $759/mo, No Contract
+ Digital Marketing Agency Abbotsford — Ads from $759/mo           (54)

  /coquitlam   (current 52)
- Coquitlam Google & Meta Ads From $759/mo — No Lock-In
+ Digital Marketing Agency Coquitlam — Ads from $759/mo            (53)

  /burnaby     no change — already correct
  /richmond    no change yet — too little data since it was indexed
```

Every proposal follows the one page that is already aligned, keeps the price,
and drops "No Contract" / "No Lock-In", which appear in no query. The H1s should
be reviewed alongside these, but are not proposed here.

---

## What this will and will not do

**It will not fix zero clicks.** Zero from 10,566 impressions means these pages
sit on page two or beyond, where even a perfect title earns almost nothing.
Title alignment lifts click-through *once a page is visible*; it does not move
position.

Position on "digital marketing agency <city>" is set by authority — who else
references you. These pages are already 1,400–1,900 words; more words will not
change it.

**The realistic route is the Map Pack.** `marketing agency near me` alone is 558
impressions on Coquitlam and 227 on Vancouver. Those are map queries, ranked by
proximity, categories, completeness and reviews — a different system, and one
where a ten-client local agency can genuinely compete. That means the Google
Business Profile and fixing the West Vancouver entries on Clutch, LinkedIn and
The Manifest.

Apply the titles because they are free and correct. Do not expect them to be
the fix.
