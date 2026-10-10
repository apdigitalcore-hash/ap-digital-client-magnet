import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, Search, Share2, ShieldCheck } from 'lucide-react';
import OurServices from '@/components/OurServices';
import { getServiceSchema, getBreadcrumbSchema, getFAQSchema, getWebPageSchema, founderSchema } from '@/lib/structuredData';
import JsonLd from '@/components/JsonLd';
import FaqLight from '@/components/light/FaqLight';
import PastelCTA from '@/components/light/PastelCTA';
import InlineCTA from '@/components/light/InlineCTA';

const TITLE = 'Roofing SEO & Roofer Marketing Vancouver | AP Digital';
const DESC = 'Roofing SEO, Google Ads & Local Services Ads for Metro Vancouver roofers. Seasonal, storm-ready campaigns. Month-to-month, 90-day guarantee.';
const CANONICAL = 'https://ap-digital.ca/roofer-marketing';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const included = [
  'Google Search Ads for "roof repair," "roof replacement," & storm damage keywords',
  'Local Services Ads, with the Google Guaranteed badge where Google offers them for roofing in your area',
  'Google Business Profile optimization with project photos & reviews',
  'Storm-response campaigns activated within 24 hours of major weather',
  'Landing pages with before-and-after galleries & instant quote forms',
  'Call tracking tied to booked estimates, not just inquiries',
  'Seasonal bid adjustments for BC\'s rainy season (Oct–Mar)',
  'Competitor monitoring & positioning across your service area',
];

const results = [
  { icon: Search, stat: 'Google Ads', label: 'Search campaigns for roofing keywords' },
  { icon: Share2, stat: 'No Contract', label: 'Month-to-month, 30 days\' notice' },
  { icon: ShieldCheck, stat: '90-Day', label: 'Performance guarantee included' },
];

const faqs = [
  {
    question: 'How much do Google Ads cost for roofers in Metro Vancouver?',
    answer: 'Roofing is one of the most competitive trades keywords — expect $15–$45 per click for terms like "roof replacement Vancouver." Most roofing companies invest $1,500–$3,000/month in ad spend plus a $759/month management fee. Average job values run $8K–$25K.',
  },
  {
    question: 'How fast will I get roofing leads from Google Ads?',
    answer: 'Storm-damage and emergency repair searches can generate calls within hours of launching. Replacement and re-roofing keywords cost more per click than repairs but carry far higher job values. Volume spikes significantly during and after BC\'s rainy season (October–March).',
  },
  {
    question: 'Should roofers use Google Ads or Meta Ads?',
    answer: 'Google Ads first — roofing is almost entirely search-driven. Nobody scrolls Instagram looking for a roofer. However, Meta Ads can work for proactive campaigns: targeting homeowners in neighborhoods with aging roofs, promoting free inspections, or retargeting website visitors who didn\'t call.',
  },
  {
    question: 'How do storm-response campaigns work?',
    answer: 'When a major windstorm or hail event hits Metro Vancouver, we activate pre-built storm-response campaigns within 24 hours. These target searches like "storm damage roof repair [city]" and "emergency roof tarp." Storm events create a sharp spike in search volume, and the leads convert fast because the damage is urgent.',
  },
  {
    question: 'What roofing keywords should I target?',
    answer: 'We target high-intent keywords: "roof replacement [city]," "roof repair near me," "roof leak repair," "metal roofing [city]," and "roof inspection." We also build campaigns for specific materials (asphalt shingle, metal, cedar shake) since these searches indicate a buyer who has already researched and is ready to get quotes.',
  },
  {
    question: 'How do I compete with big roofing companies?',
    answer: 'Local roofers win on trust, not budget. We focus your ads on your specific service area, build your Google reviews aggressively (homeowners check reviews before calling any roofer), and create landing pages with before-and-after project galleries from jobs in their neighborhood. Local credibility beats corporate scale.',
  },
  {
    question: 'Can you help me get more roofing reviews on Google?',
    answer: 'Yes. After every completed job, we trigger an automated review request via text with a direct link to your Google profile. Roofing reviews are especially powerful because the investment is large — homeowners spend more time reading reviews before calling a roofer than almost any other trade.',
  },
  {
    question: 'What is roofing SEO?',
    answer: 'Roofing SEO is the work of getting a roofing company into Google\'s Map Pack and organic results without paying per click. For a Metro Vancouver roofer it mostly means a Google Business Profile set up around the roofing services and area you actually want, reviews that mention the roof and the neighbourhood, a page for each roof type and service, and pages for the municipalities you most want work in.',
  },
  {
    question: 'Should a roofer start with roofing SEO or Google Ads?',
    answer: 'It depends on the month. SEO takes months to contribute, so work started in spring has time to take hold before the fall rain. A roofer who needs leads this season starts with Google Ads and Local Services Ads, which can produce calls within the first two weeks, and works on the Google Business Profile from day one because it feeds both.',
  },
  {
    question: 'When should a roofing company spend more on ads?',
    answer: 'Move budget with the season rather than keeping it flat. Leak and repair searches climb when the rain returns in fall, so repair budgets go up from late September. Replacement research starts in late winter and spring, which is when replacement campaigns and SEO earn the most. In a busy summer with the schedule full, spend can come down to the $1,000/month recommended minimum.',
  },
  {
    question: 'Are Local Services Ads worth it for roofers?',
    answer: 'Usually, where Google offers them for roofing in your area. You pay per lead rather than per click, and the ads sit above the regular search ads. They work best for repair and leak calls. Ranking leans on your reviews, how close you are to the searcher and how reliably you answer the phone, so they reward roofers who pick up. Run them alongside search ads, not instead.',
  },
  {
    question: 'How do I get more roofing leads in Vancouver?',
    answer: 'Cover the three places a Metro Vancouver homeowner looks: Local Services Ads and search ads at the top of Google, the Map Pack below them, and your own website for the replacement researchers. Then answer every call, follow up every quote, and track leads through to signed jobs so budget goes to the work that pays.',
  },
  {
    question: 'How do I get ready for storm damage roofing leads?',
    answer: 'Prepare before the weather turns. Build a storm campaign and landing page in advance and leave them paused, decide who answers the phone early in the morning and on weekends, know how many emergency jobs your crews can take in a week, and keep your Google Business Profile hours accurate. When a storm hits, switch the campaign on, and turn it down once your crews are booked.',
  },
  {
    question: 'Is there a contract?',
    answer: 'No. AP Digital works month-to-month. No lock-in contracts, no cancellation fees. 90-day performance guarantee included.',
  },
  {
    question: 'How do I find a roofer marketing agency near me?',
    answer: 'AP Digital serves roofing companies across Metro Vancouver and the Fraser Valley. We run Google Ads for storm-response and re-roofing searches, plus Meta Ads for seasonal lead generation. Month-to-month, no contracts.',
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    founderSchema,
    getServiceSchema('Roofer Marketing', DESC, '/roofer-marketing'),
    getFAQSchema(faqs),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Trades Marketing', url: '/trades-marketing' },
      { name: 'Roofer Marketing', url: '/roofer-marketing' },
    ]),
    getWebPageSchema(TITLE, DESC, '/roofer-marketing'),
  ]
};

const RooferMarketing = () => (
  <>
    <Helmet>
      <title>{TITLE}</title>
      <meta name="description" content={DESC} />
      <link rel="canonical" href={CANONICAL} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={CANONICAL} />
      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={DESC} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_CA" />
      <meta property="og:site_name" content="AP DIGITAL" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={TITLE} />
      <meta name="twitter:description" content={DESC} />
      <meta name="twitter:image" content={OG_IMAGE} />
      <meta name="robots" content="index, follow" />
    </Helmet>
    <JsonLd data={structuredData} />
    <Header />
    <main id="main-content" className="pt-24 pb-16">
      <div className="container-custom max-w-4xl">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground leading-[1.05] tracking-tight mb-8">
          Roofing Leads in Metro Vancouver
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          BC's rainy season means roofing searches spike every fall. AP Digital builds booked-estimate systems for Metro Vancouver roofing companies using Google Ads, Local Service Ads, storm-response campaigns, and Google Business Profile optimization.
        </p>

        <InlineCTA context="roofing company" />

        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">Highest job values in trades</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">Average roof replacement: $8K–$25K. A single closed job can easily cover months of ad spend. No other trade has this ratio.</p>
          </div>
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">Storm-response campaigns</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">When windstorms hit Metro Vancouver, we activate pre-built campaigns within 24 hours. Storm events create a sharp spike in search volume, and the buyers are urgent.</p>
          </div>
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">90-day guarantee</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">No contracts. If we miss the lead target we agree on in 90 days, we keep working at no fee for a further 30 days. Month-to-month, always.</p>
          </div>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-6">What You Get</h2>
        <ul className="grid sm:grid-cols-2 gap-4 mb-16">
          {included.map((item) => (
            <li key={item} className="flex items-start gap-3 text-foreground">
              <CheckCircle className="w-5 h-5 text-foreground mt-0.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-8">What Sets Us Apart</h2>
        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          {results.map((r) => (
            <div key={r.label} className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-7 text-center">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
              <r.icon className="reveal-ink relative z-10 w-8 h-8 text-foreground mx-auto mb-3" />
              <div className="reveal-ink relative z-10 font-serif text-3xl font-medium text-foreground mb-2">{r.stat}</div>
              <p className="reveal-body relative z-10 text-muted-foreground text-sm">{r.label}</p>
            </div>
          ))}
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">BC Roofing Market: What You're Competing For</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            Metro Vancouver's climate is a roofer's best friend and worst enemy. The October-to-March rainy season drives consistent demand for repairs and replacements, but it also compresses the peak installation window into spring and summer. Roofers who capture leads year-round — repairs in winter, replacements in summer — maintain steady revenue instead of feast-or-famine cycles.
          </p>
          <p className="mb-4">
            Roofing has the highest average job value of any residential trade. A full re-roof in Metro Vancouver runs $8K–$25K depending on size and material. That means even at higher cost-per-lead ($50–$80), closing one job covers months of ad spend. The roofers who win are the ones showing up consistently in Google Search and Local Service Ads.
          </p>
          <p>
            The key differentiator is storm-response campaigns — pre-built ad sets we activate within 24 hours of major weather events, capturing the surge of "roof leak emergency" and "storm damage repair" searches before your competitors react.
          </p>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">Roofing SEO: Getting Found Without Paying per Click</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            Roofing SEO is the work of earning the two places on Google a roofer cannot buy: the Map Pack, the three local businesses Google shows on a map, and the organic results below it. The general basics of a Google Business Profile, directory listings and site speed apply to every trade and are covered on our <Link to="/contractor-marketing" className="text-foreground underline underline-offset-4">contractor marketing</Link> page. What follows is what is different for a roofing company in Metro Vancouver.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Build the profile around roofing, not around a trade</h3>
          <p className="mb-4">
            Choose roofing contractor as the primary category on your Google Business Profile and add secondary categories only for work you actually want, such as gutters or skylights. List each service separately: roof repair, leak repair, re-roofing, inspections, and each material you install. Set a service area you can reach quickly when someone has water coming through the ceiling, and keep your hours accurate, because a homeowner searching on a wet Saturday morning is looking for a roofer who is open now. Most home-based roofers should hide their street address and show a service area instead.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Get reviews that name the roof and the neighbourhood</h3>
          <p className="mb-4">
            A review that says a cedar shake roof in Lynn Valley was replaced on time tells the next homeowner, and Google, far more than one that says great job. Ask at the moment the old roof is gone and the new one is on, send a direct link, and photograph the finished roof for your profile the same day. Our guide to <Link to="/blog/how-to-get-more-google-reviews-canada" className="text-foreground underline underline-offset-4">getting more Google reviews</Link> covers the process step by step.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Give every roof type and service its own page</h3>
          <p className="mb-4">
            A homeowner comparing metal roofing with asphalt shingles, or wondering whether a flat roof on a laneway house needs a membrane, wants a page that answers that question, not a homepage listing ten services. Separate pages for asphalt shingle, metal, cedar shake and flat or low-slope roofing, plus repair, leak repair, inspection and full replacement, give Google something specific to rank and give the researcher a reason to stay. Each page should explain what drives the price, how long the job takes, what the warranty covers and what happens on the day, using photos from your own jobs.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Write city pages around the roofs that are actually there</h3>
          <p className="mb-4">
            The roofs on a street of older Vancouver houses are not the roofs in a newer Surrey or Langley subdivision, and neither looks like a townhouse complex where the strata decides when the roof is replaced. A page for each municipality you want work in should talk about the roofs, permits and access issues you see there, with project photos from that area. In strata buildings the roof is usually common property, so the buyer is a strata council or property manager rather than a single homeowner, and that page should speak to them.
          </p>
          <p>
            Roofing SEO compounds. Pages and reviews added in spring help the following fall, and each fall the rain arrives to a stronger profile than the year before. It is the slowest channel to start and the cheapest one to keep.
          </p>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">Emergency Repair vs. Roof Replacement: Two Buyers, Two Campaigns</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            Almost every roofing search falls into one of two groups, and they behave so differently that they should never share a campaign, a landing page or a budget line.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">The emergency repair buyer</h3>
          <p className="mb-4">
            Searches like roof leak repair, emergency roofer near me or roof tarp come from someone with a problem right now. They call one of the first businesses they see, usually from a Local Services Ad, the Map Pack or the top search ad, and they call the next one if you do not answer. The decision takes minutes. What wins this buyer is being visible at that moment, a phone that is picked up by a person, and a landing page that says plainly that you can come today or tomorrow. Price matters less than speed.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">The replacement researcher</h3>
          <p className="mb-4">
            Searches like roof replacement cost, metal roof vs asphalt or best roofers in Burnaby come from someone planning a large purchase. They read several websites, check reviews, ask for two or three quotes and typically take weeks to decide, sometimes months. Clicks on these terms tend to cost more than repair clicks, and most visitors will not call on their first visit. What wins this buyer is depth: material and cost explanations, project galleries, clear warranty terms, and a quote request that is easy to make.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Why mixing them hides the truth</h3>
          <p>
            Put both into one campaign and the cheap, fast repair calls make the numbers look good while the replacement budget quietly underperforms, or the reverse. Splitting them lets each be judged on its own terms: repair campaigns on cost per booked call, replacement campaigns on cost per quote and, eventually, cost per signed job. The two also feed each other. A repair customer whose roof is near the end of its life is the warmest replacement lead you will ever get, so every repair visit should end with an honest note on the roof's condition.
          </p>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">Marketing a High-Ticket, Long-Consideration Purchase</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            A new roof is one of the largest bills most homeowners will ever pay for their house, and they behave accordingly. That changes what roofing company marketing has to do after the first click.
          </p>
          <p className="mb-4">
            Stay in front of people who are still deciding. Someone who read your metal roofing page last week and did not call is still in the market. Retargeting on Google and on Facebook and Instagram keeps your name in front of them while they gather quotes, at a much lower cost than winning them cold. This is the one part of roofing where Meta Ads earn a regular place in the budget.
          </p>
          <p className="mb-4">
            Win the quote, not just the lead. Replacement leads are usually lost between the estimate and the signature rather than at the ad. Getting the estimate booked quickly, sending a written quote with photos of the existing roof, and following up a few days later and again a week or two after that typically does more for revenue than another hundred dollars of clicks.
          </p>
          <p>
            Measure the signed job, not the form fill. A replacement lead that signs in six weeks will not show up in this month's cost-per-lead report. We track calls and forms through to booked estimates. Where you can share which quotes closed, those results can be imported into Google Ads as offline conversions, so its bidding learns which searches turn into signed roofs rather than which ones simply fill in a form.
          </p>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">Storm Response: What It Takes to Be Ready</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            Metro Vancouver's fall and winter windstorms and heavy rain events send a wave of emergency roofing searches within hours. The roofers who get those calls are the ones who prepared in September, not the ones who start building ads on the morning after. Storm-damage roofing leads are among the fastest to convert in the trade, but only if everything behind the ad is ready.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Before the season</h3>
          <p className="mb-4">
            We build a storm campaign in your Google Ads account in advance, with storm and leak keywords, ads that mention same-day tarping and emergency repair, and a landing page with a click-to-call button above everything else, then leave it paused. You decide who answers the phone at 7am on a Saturday, what you charge for an emergency tarp, and how many emergency jobs your crews can realistically handle in a week.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">When the weather hits</h3>
          <p className="mb-4">
            We switch the campaign on, raise bids on the emergency terms, and update your Google Business Profile with a post and accurate hours. Local Services Ads matter most here, because they sit at the very top of the page and rank partly on how reliably you answer.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">When the crews are full</h3>
          <p>
            Turn it down. Paying for calls you cannot serve wastes money and earns bad reviews. Then follow up every temporary repair: a homeowner whose roof needed tarping after a storm will often need permanent repair or replacement, and they already trust you.
          </p>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">Budgeting a Roofing Program Around BC's Seasons</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            A flat monthly ad budget suits a trade with flat demand, and roofing in BC is not that trade. The program cost itself is fixed: $759/month for management, month-to-month with 30 days' notice, plus ad spend paid directly to Google or Meta on your own account. We recommend at least $1,000/month in ad spend, so about $1,759/month all in at the minimum. What should move through the year is how that spend is split, and in which months it rises above the floor.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Late winter and spring: plant the replacement season</h3>
          <p className="mb-4">
            Replacement research picks up as homeowners look at what the winter did to their roof. This is the best time to start roofing SEO, add material and city pages, and weight ad spend toward replacement and inspection searches, since quotes given now become summer installs.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Summer: install season</h3>
          <p className="mb-4">
            Schedules fill. If you are booked out, spend can drop back toward the minimum, with what remains on replacement searches and retargeting to fill the late-summer and early-fall calendar. It is also the time to build the storm campaign so it is ready before it is needed.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Fall: the rain spike</h3>
          <p className="mb-4">
            In September, a short push aimed at homeowners who want the roof fixed before the rain. From October, leak and repair searches climb sharply, repair budgets and Local Services Ads go up, and the storm campaign stands ready to switch on.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Winter: repairs now, replacements later</h3>
          <p>
            Many crews slow down on full replacements in the wettest months, but leaks do not stop. Keep repair and emergency campaigns running, and treat the replacement researchers who find you now as next spring's pipeline, with quotes and follow-up rather than pressure to install in January. Every dollar of spend is visible in your own Google Ads account. See full <Link to="/pricing" className="text-foreground underline underline-offset-4">pricing</Link>.
          </p>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">Local Services Ads and the Map Pack for Roofers</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            On a roofing search in Metro Vancouver, Google can show up to three kinds of local result before the ordinary websites: Local Services Ads at the top, regular search ads, and the Map Pack. A roofer who appears in all three gets most of the calls on that search, and each works differently.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Local Services Ads</h3>
          <p className="mb-4">
            Where Google offers Local Services Ads for roofing in your area, they are pay-per-lead rather than pay-per-click: you pay when a homeowner calls or messages you through the ad, and Google typically lets you dispute leads that clearly are not valid, such as a wrong number or a service you do not offer. To appear you pass Google's screening, which typically includes business, licence and insurance checks. Ranking typically leans on proximity to the searcher, your review score and count, your stated hours, and how quickly and how often you answer. They suit repair and leak calls best, since the homeowner chooses from a short list and calls immediately.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">The Map Pack</h3>
          <p className="mb-4">
            The Map Pack is free to appear in and ranks heavily on how close you are to the person searching, which is why a roofer based in Abbotsford rarely shows for a search made in Richmond however good the profile is. Within the area you can realistically win, reviews, complete services and categories, recent photos and accurate hours decide who shows first. Your Local Services Ads and your Map Pack listing draw on the same Google Business Profile reviews, so every review helps twice.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Search ads</h3>
          <p className="mb-4">
            Regular Google search ads fill the gaps the other two cannot: replacement and material searches, the edges of your service area, and the hours when your Map Pack position is weaker. They are also the only one of the three you can point at a specific landing page, which matters for the replacement researcher. For what clicks typically cost in this market, see our guide to <Link to="/blog/how-much-do-google-ads-cost-vancouver" className="text-foreground underline underline-offset-4">Google Ads costs in Vancouver</Link>.
          </p>
          <p>
            You own all of it. Your Google Ads account and your Google Business Profile stay in your name, and ad spend is billed to you directly by Google. If you ever leave, the account history, the profile and every review stay with you. For how roofing fits alongside the other trades we work with, see <Link to="/trades-marketing" className="text-foreground underline underline-offset-4">trades marketing</Link>.
          </p>
        </div>

        <FaqLight faqs={faqs} />

        <div className="mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">Related Pages</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link to="/contractor-marketing" className="bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl p-6 transition-all duration-300">
              <p className="font-bold text-foreground">General Contractor Marketing</p>
              <p className="reveal-body relative z-10 text-sm text-muted-foreground">Renovation and build leads for BC contractors.</p>
            </Link>
            <Link to="/trades-marketing" className="bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl p-6 transition-all duration-300">
              <p className="font-bold text-foreground">Trades & Contractor Marketing</p>
              <p className="reveal-body relative z-10 text-sm text-muted-foreground">Our full trades marketing program for all contractor types.</p>
            </Link>
            <Link to="/plumber-marketing" className="bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl p-6 transition-all duration-300">
              <p className="font-bold text-foreground">Plumber Marketing</p>
              <p className="reveal-body relative z-10 text-sm text-muted-foreground">Google Ads & lead gen for plumbing companies in BC.</p>
            </Link>
            <Link to="/electrician-marketing" className="bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl p-6 transition-all duration-300">
              <p className="font-bold text-foreground">Electrician Marketing</p>
              <p className="reveal-body relative z-10 text-sm text-muted-foreground">Lead generation for BC electricians.</p>
            </Link>
            <Link to="/hvac-marketing" className="bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl p-6 transition-all duration-300">
              <p className="font-bold text-foreground">HVAC Marketing</p>
              <p className="reveal-body relative z-10 text-sm text-muted-foreground">Lead generation for HVAC companies in Metro Vancouver.</p>
            </Link>
          </div>
        </div>

        <OurServices />

        <div className="mt-16 mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-6">Cities We Serve</h2>
          <p className="text-muted-foreground mb-6">We help roofing companies across Metro Vancouver and the Fraser Valley.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { city: 'Vancouver', href: '/vancouver' },
              { city: 'Surrey', href: '/surrey' },
              { city: 'Burnaby', href: '/burnaby' },
              { city: 'Richmond', href: '/richmond' },
              { city: 'Langley', href: '/langley' },
              { city: 'Coquitlam', href: '/coquitlam' },
              { city: 'Abbotsford', href: '/abbotsford' },
            ].map(({ city, href }) => (
              <Link key={href} to={href} className="bg-white elev-1 hover:elev-2 hover:-translate-y-0.5 rounded-2xl p-4 text-center transition-all duration-300">
                <span className="font-medium text-foreground">{city}</span>
              </Link>
            ))}
          </div>
        </div>

        <PastelCTA />
      </div>
    </main>
    <Footer />
  </>
);

export default RooferMarketing;
