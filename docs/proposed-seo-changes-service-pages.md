# Proposed SEO changes: /services/paid-ads and /services/social-media

These fields are protected, so nothing below has been changed in code. Both
titles are already well aimed, so neither is proposed for change. One
description change is proposed per page, each with a specific reason. Values
live in `src/pages/services/PaidAds.tsx` and `src/pages/services/SocialMedia.tsx`;
`scripts/inject-meta.js` syncs them at build time.

**No search volumes were verified** for any term. This session had no keyword
tool.

---

## A. /services/paid-ads

### Title: no change

`Google Ads Agency Vancouver | PPC & Meta Ads | AP Digital` (56) already leads
with the commercial head term and covers "PPC" and "Meta Ads". I found no
clear argument for changing it.

### Meta description: proposed

```diff
- Google Ads, PPC & Facebook Ads agency in Vancouver. AP Digital manages Meta and Google campaigns for BC salons, trades, realtors & coaches. Month-to-month.
+ Google Ads & Meta Ads management in Vancouver: $759/month flat, not a % of spend. Weekly reports, month-to-month, 90-day results guarantee.
```

139 characters (current: 155). Two reasons:

1. **The price is the strongest differentiator and the current DESC omits it.**
   A flat fee rather than a percentage of spend is the page's central argument.
   Someone comparing agencies in the search results learns that from the new
   DESC before clicking.
2. **The industry list is out of date.** It leads with "trades", which commit
   `510da0a` established has zero clients, and it omits real estate's lead and
   dental, detailing and furniture. Rather than maintain a list that drifts,
   the proposal drops it.

Every figure is from `companyFacts.ts`.

### H1: no change

`Google & Meta Ads Agency Vancouver` matches the title's intent.

---

## B. /services/social-media

### Title: no change

`Social Media Management Rates Vancouver — $849/mo | AP Digital` (62). The
brief calls the cost-comparison angle working positioning, and the page now
supports it more: a full flat vs. per-post vs. hourly vs. in-house section.
Keep it.

### Meta description: proposed

```diff
- Social media management at $849/month — 2 platforms, 12 posts, captions and community management. See how flat-rate pricing compares to per-post and hourly agency rates. Month-to-month.
+ Social media management at $849/month: 2 platforms, 12 posts, captions and community management. Flat rate vs. per-post and hourly, compared.
```

141 characters (current: 185). The current description is long enough that
Google typically truncates it, cutting "Month-to-month" and part of the
comparison. The proposal keeps every fact (price, 2 platforms, 12 posts,
captions, community management) and the comparison hook within a length that
should display in full. If you'd rather keep "Month-to-month", the alternative
`...Flat vs. per-post vs. hourly. Month-to-month.` fits at 152.

### H1: no change

`Social Media Management in Vancouver — What It Costs` carries the same
cost-comparison angle as the title.

---

## Not proposed

- No URL or slug changes.
- The `og:` and `twitter:` fields read `TITLE` and `DESC`, so they follow
  automatically.
