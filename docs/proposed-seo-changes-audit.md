# Proposed SEO changes from the site-wide accuracy audit

The audit corrected body copy across the site, but these protected fields
carry the same kinds of claims and were left alone. Each is a before/after
proposal for review. Page fields live in each page's `const TITLE`, `const DESC`
or `<h1>`; blog fields live in `src/lib/blogPosts.ts`. Both sync into the
prerendered HTML at build time.

Ordered by how clearly each one conflicts with `companyFacts.ts` or the
no-outcome-claims rule.

## 1. Homepage DESC — outcome promise

`src/pages/HomePage.tsx`

```diff
- Vancouver marketing agency for salons, trades, realtors & coaches. Meta & Google Ads that deliver predictable leads. Month-to-month, 90-day guarantee.
+ Vancouver marketing agency for realtors, salons, coaches & local service businesses. Meta & Google Ads from $759/month. Month-to-month, 90-day guarantee.
```

153 characters. "Deliver predictable leads" is a performance promise, and the audit removed
"predictable leads" from the homepage body, About, FounderBio and the city
pages. The industry order now follows the client mix recorded in commit
`510da0a`, which also removed trades as the lead niche from the homepage body.

## 2. About DESC — "specialize in … trades"

`src/pages/About.tsx`

```diff
- AP Digital was founded by Arjun Sharma in Vancouver, BC. We specialize in lead generation for salons, trades, real estate & coaches.
+ AP Digital was founded by Arjun Sharma in Vancouver, BC. Google Ads, Meta Ads and social media for real estate, salons, coaching & local services.
```

146 characters. Commit `510da0a` records zero trades clients, so "specialize in
… trades" is not accurate. The audit made the same correction in the About
body.

## 3. FounderBio DESC — "specializing in … trades contractors"

`src/pages/FounderBio.tsx`

```diff
- Arjun Sharma is the founder of AP Digital, a Vancouver performance marketing agency. He personally manages every client account, specializing in Google Ads and Meta Ads for trades contractors and local service businesses …
+ Arjun Sharma is the founder of AP Digital, a Vancouver performance marketing agency. He personally manages every client account, running Google Ads and Meta Ads for local service businesses across BC.
```

Same reason as 2. The audit removed "His primary focus is trades contractors"
from the page body.

## 4. Blog: how-to-get-more-google-reviews-canada — metaDescription

```diff
- 10 proven methods to get more Google reviews for your Canadian business. Includes review request templates, response scripts, and what Google allows.
+ 10 practical methods to get more Google reviews for your Canadian business. Includes review request templates, response scripts, and what Google allows.
```

The audit changed the body heading and excerpt from "proven" to "practical".
The description is the last place it remains.

## 5. Lower priority — "fill" framing

These imply an outcome ("fill") rather than describing the work. They are
softer than 1–4, and you may judge them acceptable marketing language.

```diff
  salon-marketing DESC
- Meta Ads & Instagram content for Vancouver salons from $759/month, built to fill your chairs. Month-to-month, no contracts.
+ Meta Ads & Instagram content for Vancouver salons from $759/month, built around new bookings. Month-to-month, no contracts.

  restaurant-marketing H1
- Restaurant Marketing in Vancouver — Fill More Tables
+ Restaurant Marketing in Vancouver

  blog/salon-marketing-vancouver-bc metaDescription
- … Learn how to use Instagram ads, Google Ads & local SEO to fill your bookings week after week.
+ … Learn how to use Instagram ads, Google Ads & local SEO to bring in new bookings.

  blog/salon-marketing-surrey metaTitle
- Salon Marketing Surrey BC | Fill Your Chairs | AP Digital
+ Salon Marketing Surrey BC | More Bookings | AP Digital
```

## Not proposed

- `blog/how-much-does-social-media-marketing-cost-canada` title, H1 and DESC
  mention "$500–$5,000/mo". That is a market range, not an AP Digital price.
- `/trades-marketing` FAQ: "We have proven playbooks for each trade that
  generate consistent leads". This is body copy, not a protected field, but the
  page is one of the eight this audit was told not to touch. It needs the same
  correction in a separate change.
