# AI and SEO audit — ap-digital.ca
**17 October 2026.** Every figure below was measured against the built output or
Search Console, not estimated.

---

## Summary

The technical foundation is in good shape and better than most agency sites:
schema is comprehensive and valid, AI crawlers are explicitly allowed, canonical
tags are correct everywhere, and there are no malformed structured-data blocks.

The constraint is not technical. It is **authority and distribution**: average
position 28.4 with 14,600 monthly impressions and 87 clicks. The site is shown
constantly and almost never clicked, because page three gets no clicks.

---

## What is working

| Check | Result |
|---|---|
| Prerendered pages | 98 |
| Malformed JSON-LD | **0** |
| Missing canonical | **0** |
| Pages with multiple `<h1>` | **0** |
| Pages genuinely missing schema | **0** (the 35 without it are redirect stubs) |
| FAQ questions in schema site-wide | **425** |
| Blog posts with author + datePublished + dateModified | **25 / 25** |
| LocalBusiness fields | name, address, geo, telephone, email, url, priceRange, openingHours, sameAs, areaServed (17), founder, image, logo, description |

425 FAQ entries matters more for AI than for Google. Answer engines lift
question-and-answer pairs directly, and FAQPage markup is the cleanest format
to lift them from.

## Schema coverage

| Type | Pages |
|---|---|
| WebSite / LocalBusiness / WebPage | 63 |
| Person | 62 |
| BreadcrumbList | 62 |
| FAQPage | 52 |
| Service | 25 |
| BlogPosting | 25 |
| WebApplication (ADvice) | 1 |

## AI crawler access (`public/robots.txt`)

Allowed and named: GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot,
Claude-SearchBot, Claude-User, anthropic-ai, PerplexityBot, Perplexity-User,
Google-Extended, Applebot-Extended, Amazonbot, DuckAssistBot, MistralAI-User,
Meta-ExternalAgent, plus SemrushBot and AhrefsBot.

Blocked deliberately: Bytespider, PetalBot.

Nothing is shutting AI out. The wildcard rule already permitted the unnamed
agents; naming them makes the intent explicit and survives a future tightening
of the wildcard.

---

## Findings, by how much they matter

### 1. The AI reference files were a month stale — FIXED today
`llms.txt` and `llms-full.txt` are the files written for AI assistants to read.
They had not been updated since 21 September and were still asserting:

- "Primary niche: **trades contractors**" — the vertical with zero clients
- "12 posts/week across 3 platforms" — the service is 12 posts a month across 2
- Three invented client results: salons reaching a full appointment book in 30
  days, realtors generating 15-30 leads at $4-6 each, coaches fully booked in 60
  days with a 51% revenue lift
- "predictable leads", the unsourced 140% EV figure, a $500 budget floor, and a
  47-URL sitemap count (actual: 61)

`llms.txt` separately stated "AP Digital does not claim lead volumes it cannot
attribute to a named client with permission", so the two files contradicted each
other. All corrected; `/car-detailing-marketing`, the 30-day notice and the
$1,000 minimum spend added.

### 2. Indexing is improving, and the depth work caused it
Two pages requested on 12 October have since been indexed:

| Page | 12 Oct | 17 Oct |
|---|---|---|
| `/car-detailing-marketing` | Unknown to Google | **Indexed** |
| `/trades-marketing` | Crawled - currently not indexed | **Indexed** |

`/trades-marketing` is the meaningful one: Google had crawled it and declined,
then reconsidered after the page was deepened and resubmitted. Content quality
moves indexing. It does not, on this evidence, move position.

### 3. Eight real pages still unindexed
Of 25 "Crawled - currently not indexed", 12 are redirect stubs (correct), 2 are
now indexed, 1 is `sitemap.xml`. The genuine list:

`/pricing` · `/contact` · `/richmond` · `/how-to-choose-a-marketing-agency-vancouver` ·
`/case-studies/westcoast-electric` · `/blog/digital-marketing-agency-vancouver-bc` ·
`/blog/meta-ads-cost-contractors-bc` · `/blog/vancouver-small-business-seo-guide`

`/pricing` (426 words) and `/contact` (193) are thin, and both have sections the
prerenderer cannot read because they are rendered from arrays. Resubmitting a
page Google judged thin rarely changes its mind; making the content visible
first does.

### 4. Content the prerenderer still cannot see
The extractor reads literal `h2`/`h3`/`p` text only. Content rendered from
arrays is invisible to every crawler, including AI ones.

| Page | Section | Approx. words |
|---|---|---|
| `/how-to-choose-a-marketing-agency-vancouver` | criteria list | 325 |
| `/marketing-benchmarks` | four data tables | 440 |
| `/pricing` | guarantees | — |
| `/free-pilot` | timeline | — |
| `/case-studies` | how-we-work | — |
| `/about/arjun-sharma` | specialties, articles | — |

Eleven headings are bare JSX expressions (`{g.title}`) on `/pricing` and
`/about`, which a regex extractor cannot resolve. The fix in both cases is
literal markup on the page.

### 5. Title and description lengths
Eight titles exceed 62 characters and will truncate in results, all blog posts
plus `/about/arjun-sharma`. Three descriptions exceed 165 characters
(`/digital-marketing-near-me` 177, `/services/social-media` 185). `/contact` is
89 characters, using half the available snippet. All are protected fields and
need sign-off before changing.

### 6. No review schema
`LocalBusiness` has no `aggregateRating` or `review`. This is correct today —
inventing them would be a fabricated claim — but it is the single most visible
gap in the markup. Earning real Google reviews fills it legitimately and feeds
both the Map Pack and AI citations.

### 7. Images
14 of 17 `<img>` tags in React source have no `alt` attribute. Minor for AI, but
free to fix and an accessibility issue in its own right. The 126 alt-less images
in the built HTML are Meta pixel `noscript` fallbacks, which correctly use
`alt=""`.

---

## What actually limits AI visibility

Accurate `llms.txt` prevents misquotation. It does not cause citation.

Answer engines cite what other sources already reference. The same thing that
holds organic position at 28 — few external references — is what keeps the site
out of AI answers. The levers are:

1. **Google Business Profile**: categories, services, service areas, photos, and
   real reviews from the 10 current clients. The Map Pack is a separate ranking
   system where a small local agency can realistically win.
2. **Directory consistency**: Clutch, LinkedIn and The Manifest still say West
   Vancouver while the site says Vancouver. Inconsistent name/address/phone data
   suppresses Map Pack ranking and makes a model less willing to state either
   location confidently.
3. **Being referenced at all**: guest posts, local business associations,
   supplier and partner listings.

None of these are code changes, and none can be done from this repo.

---

## Recommended order

1. Fix the array-rendered sections on `/pricing`, `/contact` and
   `/how-to-choose-a-marketing-agency-vancouver`, then request indexing for all
   eight pages. (Google's manual submission quota is roughly 10-12 a day.)
2. Google Business Profile, properly, including review requests to current clients.
3. The West Vancouver corrections on Clutch, LinkedIn and The Manifest.
4. Decide on the title and description length proposals in section 5.
5. Re-read Search Console around 12 November. Watch **average position** on the
   expanded pages, not impressions — impressions were never the bottleneck.

## Not recommended

More long-form content. Eight pages went from 5,200 to 21,163 words and the
measurable effect was on indexing, not position. Another deep page will not
change an authority-limited ranking.
