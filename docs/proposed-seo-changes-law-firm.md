# Proposed SEO changes: /law-firm-marketing

These fields are protected, so nothing below has been changed in code. All
three live in `src/pages/niches/LawFirmMarketing.tsx`; `scripts/inject-meta.js`
syncs them into the prerendered HTML at build time, so changing the React file
is enough.

The main reason to change them is not ranking, it's the "Case Leads" wording.
The page body now says, accurately, that nobody can promise a law firm matters,
clients or outcomes, and that our 90-day guarantee is about our own lead-volume
target, not about the firm's matters. A title and H1 built on "Case Leads" sit
awkwardly next to that, and they edge toward promising case volume, the thing
the page warns firms against. More neutral wording is both safer and more
accurate.

**No search volumes or keyword difficulty were verified.** This session had no
keyword tool. See the summary for why this cluster is likely hard to win.

## Title (`TITLE`)

```diff
- Law Firm Marketing Vancouver — Case Leads | AP Digital
+ Law Firm Marketing Vancouver — Google Ads | AP Digital
```

52 characters (current: 54). Keeps the head term and city and replaces "Case
Leads" with the actual service. A longer alternative, `Law Firm Marketing
Vancouver | Google Ads & Intake | AP Digital` (63), names intake too but is
likely to be truncated in results.

## Meta description (`DESC`)

```diff
- Google & Meta Ads for Vancouver law firms — family, injury, immigration and real estate practices. Month-to-month, no lock-in contracts.
+ Google Ads and intake tracking for Vancouver law firms — family, immigration, real estate and injury practices. Written to Law Society of BC rules.
```

147 characters (current: 136). Drops Meta from the lead because the page now
explains that Meta's role in legal is limited and Google remarketing is
restricted for some practice areas. It also states compliance as something we
write to, not something we guarantee, which matches the page's line that the
lawyer is responsible for compliance. If you'd rather keep the commercial terms,
`...Written to Law Society rules. Month-to-month.` fits within 160.

## H1

```diff
- Law Firm Case Leads in Vancouver
+ Law Firm Marketing in Vancouver
```

31 characters. Neutral, carries the head term, and makes no implied promise of
case volume. Recommended, for the reason given at the top.

## Not proposed

- The URL stays `/law-firm-marketing`.
- No separate practice-area pages (family, immigration and so on). The brief
  rules out new pages, and without law firm clients or case studies, thin
  practice-area pages would be harder to rank than one honest page.
- The `og:` and `twitter:` fields read `TITLE` and `DESC`, so they follow
  automatically.

---

## Status: APPLIED 2026-10-11

All three applied to `src/pages/niches/LawFirmMarketing.tsx` and verified in
`dist/law-firm-marketing/index.html`. "Case Leads" now appears zero times on the
page: the title and H1 no longer imply case volume that the body says nobody can
promise.

- TITLE (54): `Law Firm Marketing Vancouver — Google Ads | AP Digital`
- DESC (147): `Google Ads and intake tracking for Vancouver law firms — family,
  immigration, real estate and injury practices. Written to Law Society of BC rules.`
- H1: `Law Firm Marketing in Vancouver`
