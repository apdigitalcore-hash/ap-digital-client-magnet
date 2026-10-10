# Proposed SEO fields: /car-detailing-marketing (new page)

This page is new, so there were no hand-tuned values to protect. The values below
are already live in `src/pages/niches/CarDetailingMarketing.tsx`, and
`scripts/inject-meta.js` syncs them into the prerendered HTML at build time. They
are recorded here so they can be reviewed in one place. To change them, edit the
React file. The `title`/`description` on the `inject-meta.js` route entry are
inert. They were written to match, so the build reports no sync for this page.

## Keyword targets

No search-volume or difficulty data was verified for any of these terms. This
session had no access to a keyword tool, so the ranking below is by intent, not
measured volume.

| Term | Why | Where it is answered |
|---|---|---|
| car detailing marketing | Head term. Names the service and the buyer. | TITLE, H1, intro, first section's opening line, cost FAQ |
| auto detailing marketing | Same intent, different wording. | Opening line of "High-Ticket Work vs. Maintenance Details" |
| mobile detailing marketing | The mobile segment searches separately and needs different ads. | "Mobile Detailing vs. Shop-Based" section (h3 "Mobile detailing marketing"), GBP section, GBP FAQ |
| how to get car detailing clients | The question a detailer actually types. | FAQ "How do I get more car detailing clients?" |
| car detailing leads | Covers lead-buying intent. | FAQ "Should I buy car detailing leads or run my own ads?" |

## Title (`TITLE`)

```
Car Detailing Marketing Vancouver — More Bookings | AP Digital
```

62 characters. Leads with the head term plus the city, matching how sibling niche
pages are built (`Salon Marketing Vancouver — More Bookings | AP Digital`).
"More Bookings" fits detailing, where the conversion is an appointment, not a
quote. Alternative if Google truncates: `Car Detailing Marketing Vancouver |
AP Digital` (46).

## Meta description (`DESC`)

```
Google Ads & Meta Ads for mobile and shop-based auto detailers in Metro Vancouver. $759/month, month-to-month, 90-day results guarantee.
```

136 characters. Names both channels and both business types, and carries
"auto detail..." as a variant of the head term. Every figure comes from
`src/lib/companyFacts.ts`: $759/month management, month-to-month, 90-day results
guarantee.

## H1

```
Car Detailing Marketing in Metro Vancouver
```

42 characters. Exact head term plus region. "Metro Vancouver" rather than
"Vancouver" because the page also serves the Fraser Valley and the seven city
pages it links to.

## Not done

- No case study, client name, client result or portfolio claim, even though AP
  Digital has a detailing client. The page describes the work and what to expect.
- No detailing-specific prices, CPCs, job values or conversion rates.
- No `vercel.json` rewrite. It isn't on this brief's file list, and the closest
  sibling pages (`/roofer-marketing`, `/hvac-marketing` and the other trade
  pages) have none either and serve through the same fallback.
- The homepage's prerendered "Industries" nav in `inject-meta.js` (`HOME_BODY`)
  doesn't list this page. The React grid tile does, but crawlers reading the
  homepage HTML won't see that link. Adding one `<li>` to `HOME_BODY` would fix
  it, and needs its own sign-off since this brief limited inbound links to
  `/salon-marketing` and `/vancouver`.
