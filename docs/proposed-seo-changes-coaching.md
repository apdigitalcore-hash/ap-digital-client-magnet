# Proposed SEO changes: /coaching-marketing

These fields are protected, so nothing below has been changed in code. All
three live in `src/pages/niches/CoachingMarketing.tsx`; `scripts/inject-meta.js`
syncs them into the prerendered HTML at build time, so changing the React file
is enough.

Two reasons to change them:

1. **Wording.** "Coaching Client Leads" in the title and H1 leans toward
   promising client volume. The page body now says plainly that our 90-day
   guarantee is about our own lead target, not the coach's income or clients,
   and it warns coaches away from outcome claims. Neutral wording keeps the
   fields consistent with that. This is the same reasoning that led to
   replacing "Case Leads" on `/law-firm-marketing`.
2. **Head term.** Neither the title nor the H1 contains "coaching marketing" as
   a phrase, though the body now answers it in depth.

**No search volumes were verified** for any term. This session had no keyword
tool.

## Title (`TITLE`)

```diff
- Coaching Client Leads BC — Marketing | AP Digital
+ Coaching Marketing BC — Meta Ads for Coaches | AP Digital
```

57 characters (current: 49). Leads with the head term, adds "for coaches" (a
form of "marketing for coaches") and names the channel the page recommends.

## Meta description (`DESC`)

```diff
- Coaching marketing with Meta Ads funnels & social media for BC life, business & fitness coaches. Month-to-month. No lock-in contracts.
+ Meta Ads funnels, discovery-call campaigns and content for BC life, business and fitness coaches. $759/month, month-to-month, no lock-in.
```

137 characters (current: 134). Names the funnel types the page now covers and
adds the price from `companyFacts.ts`. The current DESC is already accurate, so
this change is optional.

## H1

```diff
- Coaching Client Leads in BC
+ Coaching Marketing for BC Coaches
```

33 characters. Carries the head term and drops the implied promise of client
volume. Recommended for the first reason above.

## Not proposed

- The URL stays `/coaching-marketing`.
- No separate pages for life, business or fitness coaches. The brief rules out
  new pages.
- The `og:` and `twitter:` fields read `TITLE` and `DESC`, so they follow
  automatically.
