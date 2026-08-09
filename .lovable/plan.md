# Full Growth Plan: AP Digital

## Goal
Own the Vancouver-area marketing-agency search market for service businesses (salons, trades, real estate, coaches, dental, HVAC, fitness, restaurants, law firms) and convert that visibility into a predictable calendar of booked strategy calls.

## Current State (Aug 2026)
- **Site:** Well-structured SPA with dark theme, strong niche/city landing pages, transparent pricing, Calendly CTAs, and GA4.
- **SEO:** Sitemap submitted, titles/descriptions mostly fixed, one blog post (`/blog/how-much-does-social-media-marketing-cost-canada`) ranking ~22 for a relevant query.
- **Search Console:** 43 clicks / 12,879 impressions in the last 28 days, average position 52.5, CTR 0.33%. Most traffic is brand terms.
- **Backlinks:** 19 referring domains, Authority Score 2/100, many spammy/PBN links. Risk factor, not a strength.
- **Ads:** No active Google Ads or Meta campaigns yet; creative groundwork has been discussed.
- **Conversion:** Lead form exists, but no lead-magnet, email nurture, or retargeting in place.
- **Local:** Google Business Profile and local citations are not yet optimized / claimed as project assets.

## Strategy Summary
Do three things in parallel:
1. **Clean up the backlink profile** so the existing pages can rank without a spam anchor.
2. **Win the closest near-page-1 keyword** (social media cost post) to prove the site can rank and start getting non-brand traffic.
3. **Build a paid lead funnel** (Google Ads PMax + Meta retargeting) while SEO compounds, so revenue is not waiting on rankings.

## Phase 1 — Fix the Foundation (Week 1-2)

### 1.1 Backlink cleanup
- Export the full spam backlink list from Semrush.
- Build a `disavow.txt` file containing PBN/spam domains.
- Upload it to Google Search Console for the `https://ap-digital.ca/` property.
- Monitor the GSC "Links" report for new spam and re-disavow quarterly.

### 1.2 Local SEO basics
- Claim and optimize Google Business Profile (if not already done): category, hours, Vancouver address, photos, service attributes, Q&A.
- Add consistent NAP + website URL to:
  - Yelp.ca
  - Clutch.co (free agency listing)
  - Better Business Bureau (BC)
  - Vancouver Chamber of Commerce / local boards
  - Industry-specific directories (trades, salons, dental, real estate associations).
- Add LocalBusiness schema to the homepage and a dedicated `/contact` page if not already present.

### 1.3 Conversion tracking
- Add a `gtag('event', 'conversion', ...)` event on the Calendly booking completion (or add a "Booked" page redirect).
- Track lead-form submissions as a separate GA4 event.
- Create a simple "Thank you" page after the contact form that can be used as a conversion goal.

## Phase 2 — Content & SEO Quick Wins (Week 2-4)

### 2.1 Expand the closest-to-page-1 post
- Rewrite `/blog/how-much-does-social-media-marketing-cost-canada`.
- New title: "Social Media Marketing Costs in Canada: 2026 Price Guide".
- Add a clear price table (management fee vs. ad spend vs. content creation).
- Add FAQ schema and a "What affects the price" section.
- Internally link it from `/services/social-media`, homepage, and all city pages.
- Add a CTA to the free strategy call and a lead magnet (e.g. "Social Media Budget Calculator").

### 2.2 City/niche page internal linking
- From the homepage, link to the top 3-4 city pages with keyword-rich anchor text.
- Add a "Related industries" / "Related cities" widget to each niche and city page.
- Create a lightweight footer hub linking to all city and industry pages.

### 2.3 Build 2-3 new content assets
- "How to Choose a Marketing Agency in Vancouver" (already exists; expand and promote).
- "Vancouver Paid Ads Benchmarks by Industry" (use your own client data anonymized, or cite public sources).
- "SEO vs. Google Ads: What Should a Vancouver Small Business Do First?" — comparison page targeting high-intent searches.
- Each new post gets FAQ schema, internal links, and a CTA.

## Phase 3 — Paid Ads & Retargeting (Week 3-6)

### 3.1 Google Ads Performance Max
- Goal: booked strategy calls.
- Landing page: `/` with a "Book Free Call" focus.
- Creative direction: clean, dark, Vancouver-focused with real brand assets.
- Budget: start at $1,500-$2,000/month ad spend + management fee.
- Conversion action: Calendly booking or thank-you page visit.
- Geo-target: Metro Vancouver + Fraser Valley.
- Sitelinks: `/pricing`, `/services/paid-ads`, `/case-studies`, `/contact`.

### 3.2 Meta retargeting
- Install Meta Pixel on the site (if not present).
- Build a retargeting audience of visitors to `/pricing`, `/services/*`, and `/contact` who did not book.
- Ad creative: testimonial / "90-day guarantee" / "No contracts" angles.
- Budget: $500-$1,000/month.

### 3.3 Email nurture for leads who do not book
- Add a "Download the Vancouver Marketing Budget Template" lead magnet on the blog and contact page.
- Collect first name + email + business type.
- 5-email sequence:
  1. Deliver the template.
  2. Common marketing mistakes by industry.
  3. How the 90-day guarantee works.
  4. Case study / social proof.
  5. Direct Calendly CTA.

## Phase 4 — Authority & Trust (Week 4-8)

### 4.1 Real case studies
- The site has case-study routes but no visible, detailed proof.
- Create 2-3 detailed case study pages: "Summit Home Services — 30 leads in 60 days" etc.
- Add before/after metrics, screenshots, client quotes, and video if possible.
- Link case studies from the homepage, niche pages, and `/case-studies` index.

### 4.2 Link building (white-hat)
- Guest posts on Vancouver business blogs (e.g. Vancouver Business Journal, local BIA blogs).
- Partner with web designers, accountants, business coaches for referral links.
- Sponsor or speak at a local small-business event and get a link from the event page.
- HARO-style responses to journalists looking for marketing expert quotes.
- Target: 5-10 real, relevant links in the first 90 days.

### 4.3 Social proof loop
- Collect 3-5 video testimonials from BC clients.
- Add them to homepage, `/case-studies`, and `/pricing`.
- Create short-form video snippets for Instagram Reels and LinkedIn.
- Cross-post blog content to LinkedIn articles with links back to the site.

## Phase 5 — Optimize & Scale (Week 8+)

### 5.1 Weekly dashboard review
- Use the existing `/admin/seo` dashboard.
- Track: referring domains, backlinks, GSC clicks/impressions, average position, booked calls, cost per call.
- Set a weekly 30-minute review rhythm.

### 5.2 Iterate based on data
- If one city page gets impressions but low CTR, rewrite its title/description.
- If one niche page converts, double down with blog content and ads for that niche.
- If paid ads convert, increase budget by 20% every 2 weeks until marginal cost per call plateaus.

### 5.3 Expand the content moat
- Add 1 new blog post or page per week targeting a specific Vancouver niche + service keyword (e.g. "Google Ads for Plumbers in Vancouver", "Instagram Ads for Salons in Surrey").
- Use the existing blog infrastructure and JSON-LD.
- Continue until you own page 1 for your priority keyword clusters.

## Success Metrics (90-day targets)
- **Backlinks:** Spam profile cleaned via disavow; 5+ new real referring domains.
- **SEO:** Average position moves from 52.5 to below 35; non-brand clicks double to 80+ / month.
- **Paid:** First booked strategy call within 14 days of PMax launch; cost per call under $150.
- **Leads:** 20+ qualified leads from combined organic + paid in 90 days.
- **Content:** 1 expanded page, 2 new posts, 1 lead magnet live, 1 email sequence automated.

## What I recommend we start first
1. Disavow file creation and upload.
2. Rewrite the social-media cost blog post into a 2026 price guide.
3. Set up Google Business Profile and local citations.
4. Design and launch the Google Ads PMax campaign for booked calls.

This plan is designed to run in parallel so revenue and rankings grow together.
