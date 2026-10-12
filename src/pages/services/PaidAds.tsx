import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, TrendingUp, Phone, Star } from 'lucide-react';
import IndustriesWeServe from '@/components/IndustriesWeServe';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { getServiceSchema, getBreadcrumbSchema, getWebPageSchema, getFAQSchema, founderSchema } from '@/lib/structuredData';
import JsonLd from '@/components/JsonLd';

const TITLE = 'Google Ads Agency Vancouver | PPC & Meta Ads | AP Digital';
const DESC = 'Google Ads, PPC & Facebook Ads agency in Vancouver. AP Digital manages Meta and Google campaigns for BC salons, trades, realtors & coaches. Month-to-month.';
const CANONICAL = 'https://ap-digital.ca/services/paid-ads';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const included = [
  'Facebook & Instagram ad campaign setup',
  'Google Search & Performance Max campaigns',
  'Audience research & targeting strategy',
  'A/B testing of creatives and copy',
  'Retargeting & lookalike audience campaigns',
  'Weekly performance reports & optimization',
  'Landing page recommendations',
  'Every account managed personally by founder Arjun Sharma',
];

const costs = [
  { line: 'Management fee', amount: '$759/month', note: 'Flat. Not a percentage of your spend.' },
  { line: 'Ad spend', amount: '$1,000+/month', note: 'Paid directly to Google or Meta on your own card.' },
  { line: 'Setup fee', amount: 'None', note: 'Tracking, research and build are inside the fee.' },
  { line: 'Contract', amount: 'Month-to-month', note: "30 days' notice to pause or cancel. No exit fee." },
];





const faqs = [
  {
    question: 'Do you charge a percentage of ad spend?',
    answer: 'No. The fee is a flat $759 per month regardless of what you spend. Percentage billing, typically 10 to 20% of spend, is common and it rewards the agency for spending more of your money whether or not it produces anything. A flat fee removes that incentive entirely.',
  },
  {
    question: 'Who owns the ad account and the data?',
    answer: 'Your Google Ads account and Google Business Profile stay in your name, with their full history, and ad spend is billed to you directly by Google or Meta. If you leave, the Google account and everything in it stay with you. Agencies that own the client\'s ad account are creating a switching cost disguised as an administrative detail.',
  },
  {
    question: 'What is the minimum ad spend that actually works?',
    answer: 'We recommend at least $1,000 per month in ad spend. The platforms\' automated bidding learns from conversions, and below that level most local businesses produce too few conversions each week for it to learn quickly, so decisions get made on noise. You can run less, with a narrower scope, and we will tell you on the call what that realistically allows.',
  },
  {
    question: 'Do you guarantee results?',
    answer: 'We agree a lead-volume target before anything goes live, and if we miss it by month three we keep working at no fee for a further 30 days. What we do not do is guarantee a cost per lead before launch, because nobody can know that until the account has data. We also have no published case studies yet, and we say so rather than quoting numbers you cannot verify.',
  },
  {
    question: 'How much do paid ads cost in Vancouver?',
    answer: 'Management is $759 per month, flat, and ad spend is separate and paid directly to Google or Meta on your own card. We recommend a minimum of $1,000 per month in ad spend, so the minimum is about $1,759 a month all in, and the total rises with whatever ad spend you choose above that. There is no setup fee and no percentage of spend.',
  },
  {
    question: 'How fast will I see results from paid ads?',
    answer: 'How quickly the first qualified leads arrive depends on your market, budget and how much people search for what you sell. Most clients see their first qualified leads within 2 weeks of launch. The first 30 days are mostly about tightening targeting, search terms, creative and landing pages as real data comes in.',
  },
  {
    question: 'Should I use Facebook Ads or Google Ads?',
    answer: 'It depends on your business. Meta Ads (Facebook and Instagram) are excellent for brand awareness, retargeting, and visual offers. Google Ads capture high-intent searches from people actively looking for your service. We recommend a platform based on your industry and goals, and suggest getting one working properly before adding the second.',
  },
  {
    question: 'Do you require a long-term contract?',
    answer: 'No. All of our paid ads management is month-to-month, with 30 days\' notice to pause or cancel and no exit fee.',
  },
  {
    question: 'Who manages my ad campaigns?',
    answer: 'Arjun Sharma personally manages every account — there is no outsourcing to junior staff or overseas teams. You get direct access to the strategist running your campaigns, which means faster communication and no hand-offs.',
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    founderSchema,
    getServiceSchema('Paid Advertising', DESC, '/services/paid-ads', '759', 'MONTH'),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Paid Ads', url: '/services/paid-ads' },
    ]),
    getWebPageSchema(TITLE, DESC, '/services/paid-ads'),
    getFAQSchema(faqs),
  ]
};

const PaidAds = () => (
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
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Google &amp; Meta Ads Agency Vancouver
        </h1>
        <p className="text-base text-teal font-semibold mb-6">
          Google Ads, Facebook and Instagram campaigns managed end-to-end for BC businesses.
        </p>

        {/* Short intro */}
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          Most accounts lose money early on structure mistakes — broad match with no negatives, one ad set for every service, no conversion tracking. Your campaigns launch without those. Pair ads with our <Link to="/services/social-media" className="text-teal underline hover:text-teal/80">social media management</Link> for full-funnel coverage. See <Link to="/pricing" className="text-teal underline hover:text-teal/80">pricing</Link> or browse <Link to="/case-studies" className="text-teal underline hover:text-teal/80">how we work</Link>.
        </p>

        {/* 3-column why strip */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="font-bold text-foreground mb-1">Facebook &amp; Meta Ads</p>
            <p className="text-sm text-muted-foreground">Facebook and Instagram ads that put a clear offer in front of people who were not searching yet. Usually the lead channel for salons, realtors and coaches.</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="font-bold text-foreground mb-1">Google Ads for high-intent buyers</p>
            <p className="text-sm text-muted-foreground">Capture people already searching for your service. Ideal for trades, clinics, and any business with high-intent local searches.</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="font-bold text-foreground mb-1">Weekly reports, zero fluff</p>
            <p className="text-sm text-muted-foreground">You see exactly what you're spending, how many leads you got, and what we're doing next. No vanity metrics.</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <TrendingUp className="w-8 h-8 text-teal mx-auto mb-3" />
            <p className="font-display text-3xl font-bold text-teal mb-2">$759</p>
            <p className="text-muted-foreground text-sm">Per month, month-to-month</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <Phone className="w-8 h-8 text-teal mx-auto mb-3" />
            <p className="font-display text-3xl font-bold text-teal mb-2">2 wks</p>
            <p className="text-muted-foreground text-sm">To first qualified leads</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <Star className="w-8 h-8 text-teal mx-auto mb-3" />
            <p className="font-display text-3xl font-bold text-teal mb-2">$1,000</p>
            <p className="text-muted-foreground text-sm">Recommended min. ad spend</p>
          </div>
        </div>

        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">What's Included</h2>
        <ul className="grid sm:grid-cols-2 gap-4 mb-16">
          {included.map((item) => (
            <li key={item} className="flex items-start gap-3 text-foreground">
              <CheckCircle className="w-5 h-5 text-teal mt-0.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <IndustriesWeServe />


        {/* ── What it costs ───────────────────────────────────────────── */}
        <section className="mt-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">What Paid Ads Management Costs</h2>
          <p className="text-muted-foreground mb-6">
            Two separate bills, and conflating them is where most agency quotes get confusing.
            Management pays for the work. Ad spend goes to the platform on your own card, so you
            see the real numbers and keep control of the budget.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-3 pr-4 text-sm font-semibold text-foreground">Line item</th>
                  <th className="py-3 pr-4 text-sm font-semibold text-foreground">Amount</th>
                  <th className="py-3 text-sm font-semibold text-foreground">Detail</th>
                </tr>
              </thead>
              <tbody>
                {costs.map((c) => (
                  <tr key={c.line} className="border-b border-border/60">
                    <td className="py-3 pr-4 text-sm text-foreground font-medium whitespace-nowrap">{c.line}</td>
                    <td className="py-3 pr-4 text-sm text-teal font-semibold whitespace-nowrap">{c.amount}</td>
                    <td className="py-3 text-sm text-muted-foreground">{c.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            At the recommended minimum that is about $1,759 a month all in, and anything above it is
            ad spend you choose, not fees. Full breakdown on the{' '}
            <Link to="/pricing" className="text-teal underline hover:text-teal/80">pricing page</Link>.
          </p>
        </section>

        {/* ── Which platform ──────────────────────────────────────────── */}
        <section className="mt-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">Google Ads or Meta Ads?</h2>
          <p className="text-muted-foreground mb-6">
            The honest split is intent versus discovery. Google captures people already looking for
            what you sell. Meta creates demand from people who were not looking yet. Most businesses
            should get one working properly before adding the second — two half-funded channels
            perform worse than one funded properly.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-bold text-foreground mb-1">Trades and contractors: Google Ads first</h3>
              <p className="text-sm text-muted-foreground">A burst pipe or a dead furnace gets typed into Google at the moment of need, so search ads catch it.</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-bold text-foreground mb-1">Salons and spas: Meta Ads first</h3>
              <p className="text-sm text-muted-foreground">Nobody searches for a new hair colour. They see one in a feed, and a visual ad is what prompts the booking.</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-bold text-foreground mb-1">Dental and health clinics: Google Ads first</h3>
              <p className="text-sm text-muted-foreground">High intent, local, and people compare clinics before they call. Health ad rules limit retargeting.</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-bold text-foreground mb-1">Real estate: Meta Ads first</h3>
              <p className="text-sm text-muted-foreground">Buyers and sellers are reached long before they search for an agent, within Canada's housing ad rules.</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-bold text-foreground mb-1">Coaches and consultants: Meta Ads first</h3>
              <p className="text-sm text-muted-foreground">Demand for coaching mostly has to be created rather than captured, and video of the coach does that.</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-bold text-foreground mb-1">Restaurants and car detailing: Meta Ads first</h3>
              <p className="text-sm text-muted-foreground">Visual, local and often impulse-driven, so before-and-after or food photography does the selling.</p>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">Google Search, Performance Max or Meta: When Each Is Wrong</h2>
          <p className="text-muted-foreground mb-4">
            Each campaign type is the right answer for some businesses and an expensive mistake for others. Knowing when not to use one matters as much as knowing when to use it.
          </p>
          <h3 className="font-bold text-foreground mt-6 mb-2">Google Search campaigns</h3>
          <p className="text-muted-foreground mb-4">
            Text ads on the results page for the keywords you choose. The clearest intent signal in advertising, and the easiest to control and audit. It is the wrong choice when hardly anyone searches for what you sell, which is common for new products, coaching and anything people buy on impulse.
          </p>
          <h3 className="font-bold text-foreground mt-6 mb-2">Performance Max campaigns</h3>
          <p className="text-muted-foreground mb-4">
            Google's automated campaign type, which spreads one budget across Search, YouTube, Display, Gmail and Maps and decides placement itself. It can work well for a business with reliable conversion tracking, a steady flow of conversions and good creative assets. It is the wrong choice when tracking is weak, the budget is small, or you need to see exactly which searches you are paying for, because it reports far less than a Search campaign. We add brand exclusions so it does not take credit for people already looking for you.
          </p>
          <h3 className="font-bold text-foreground mt-6 mb-2">Meta Ads on Facebook and Instagram</h3>
          <p className="text-muted-foreground">
            Facebook and Instagram ads shown to people who were not searching. Strong for visual offers, local discovery and retargeting. It is the wrong choice when demand is urgent and search-led, such as an emergency repair, and it is restricted for some categories: real estate falls under Meta's housing rules in Canada, and health-related ads have their own limits on targeting and wording.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">Why We Recommend $1,000 a Month in Ad Spend</h2>
          <p className="text-muted-foreground mb-4">
            The recommendation comes from how the platforms learn, not from what we would like you to spend. Both Google's automated bidding and Meta's delivery system optimise by learning from conversions. Meta's own guidance is that an ad set typically needs around 50 optimisation events in a week to leave its learning phase. Google's smart bidding similarly performs better with a steady volume of conversions.
          </p>
          <p className="text-muted-foreground mb-4">
            At typical local click costs, $1,000 a month is roughly where many small businesses start producing enough enquiries for that learning to happen within weeks rather than months. Below it, the platforms keep guessing, a single good or bad week swings the numbers, and it takes much longer to know what works.
          </p>
          <p className="text-muted-foreground">
            You can still advertise on less. The usual approach is to narrow the scope: one service, one area, one campaign, so the smaller budget is concentrated rather than spread thin. We will tell you on the call whether that is likely to be worth it for your business.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">Conversion Tracking: Why Most Accounts Measure the Wrong Thing</h2>
          <p className="text-muted-foreground mb-4">
            The most common problem we find in an existing ad account is not the ads. It is that the account is counting the wrong things as success, so the platform is optimising toward them.
          </p>
          <p className="text-muted-foreground mb-4">
            Typical examples: page views or button clicks counted as conversions; one enquiry counted two or three times because several tags fire; phone calls not tracked at all on a business that lives on the phone; and every form fill treated as equal, so a spam submission counts the same as a real customer. Automated bidding takes those signals literally and finds more of whatever is being counted.
          </p>
          <p className="text-muted-foreground">
            Our setup counts actual enquiries once: form submissions, calls from ads and calls from the website. Where you can tell us which enquiries became customers, those outcomes can be fed back into Google Ads so bidding learns what a good lead looks like, subject to Google's rules for sensitive categories such as health.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">What the Weekly Report Contains</h2>
          <p className="text-muted-foreground mb-4">
            A short email, written for a business owner rather than a marketer. It covers what was spent on each platform, how many enquiries came in and from which campaigns, the cost per enquiry, and how that compares with the previous weeks and the target we agreed.
          </p>
          <p className="text-muted-foreground">
            It also says what we changed that week and why, and what we plan to test next. It leaves out impressions, reach and click-through rates unless one of them explains a change in enquiries. If something is not working, the report says so.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">What Our Management Does Not Include</h2>
          <p className="text-muted-foreground mb-4">
            Clear edges make quotes easier to compare. The $759 fee covers Google and Meta ads management. It does not include building a new website, though we review and recommend changes to the pages ads send people to. SEO and other services are scoped on a call rather than sold at a list price. Organic social media is a separate service, our <Link to="/services/social-media" className="text-teal underline hover:text-teal/80">social media management</Link> at $849 a month.
          </p>
          <p className="text-muted-foreground">
            We do not charge a percentage of ad spend, lock you into a contract, promise a cost per lead before launch, or run campaigns that make claims we cannot stand behind. And we do not take on an account when we think the money would be better spent elsewhere first.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">What $759 a Month Actually Buys, Week by Week</h2>
          <p className="text-muted-foreground mb-4">
            The management fee pays for work, not access to a dashboard. Here is what happens, in order, for a typical new account. Every account is run by founder Arjun Sharma, not passed to a junior.
          </p>
          <h3 className="font-bold text-foreground mt-6 mb-2">Days 1 to 3: tracking before anything else</h3>
          <p className="text-muted-foreground mb-4">
            Conversion tracking comes first. If we cannot tell which ad produced which lead, nothing after this matters. Calls get tracked as well as form fills, and we check that a single enquiry is counted once, not three times.
          </p>
          <h3 className="font-bold text-foreground mt-6 mb-2">Days 3 to 7: research and build</h3>
          <p className="text-muted-foreground mb-4">
            Keyword and audience research, a starting negative keyword list, the first ads and creative, and a review of the page each ad will send people to. Before launch we agree a lead-volume target with you in writing; that target is what the 90-day guarantee is measured against.
          </p>
          <h3 className="font-bold text-foreground mt-6 mb-2">Week 2: campaigns go live</h3>
          <p className="text-muted-foreground mb-4">
            Campaigns go live. Most clients see their first qualified leads in this window. Cost per lead is still noisy, so we watch it without reacting to it.
          </p>
          <h3 className="font-bold text-foreground mt-6 mb-2">Weeks 3 and 4: the first real optimisation</h3>
          <p className="text-muted-foreground mb-4">
            Meta campaigns typically take two to three weeks to settle. By now there is enough data to prune search terms, cut losing creative and move budget toward what is producing enquiries.
          </p>
          <h3 className="font-bold text-foreground mt-6 mb-2">Every week after that</h3>
          <p className="text-muted-foreground">
            The same cycle: review the search terms people actually typed and add negatives, check budget pacing and bids, test one new ad or creative against the current best, check that tracking still works, and send you a report. Most of the value of management is in that unglamorous weekly loop.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">Negative Keywords and Where Ad Budgets Leak</h2>
          <p className="text-muted-foreground mb-4">
            Most wasted spend in a self-managed account comes from a handful of structural mistakes rather than bad luck. If you run ads yourself, this list is worth checking before you hire anyone.
          </p>
          <h3 className="font-bold text-foreground mt-6 mb-2">Searches you never wanted</h3>
          <p className="text-muted-foreground mb-4">
            Broad match keywords with no negative list pay for searches with no purchase intent: people looking for jobs, free versions, DIY instructions, or a business with a similar name in another city. Negative keywords tell Google which searches to ignore. A starting list goes in before launch, and it grows every week from the search terms report, which shows what people actually typed before clicking.
          </p>
          <h3 className="font-bold text-foreground mt-6 mb-2">Paying for people already looking for you</h3>
          <p className="text-muted-foreground mb-4">
            Performance Max with no brand exclusion can spend heavily on people who were already searching for your business by name, then take credit for leads you would have had anyway.
          </p>
          <h3 className="font-bold text-foreground mt-6 mb-2">Boosted posts instead of campaigns</h3>
          <p className="text-muted-foreground mb-4">
            Boosting a post optimises for engagement, not enquiries. It looks cheap and produces likes.
          </p>
          <h3 className="font-bold text-foreground mt-6 mb-2">Sending ad traffic to the homepage</h3>
          <p className="text-muted-foreground mb-4">
            A homepage tries to say everything. An ad should send people to a page with one offer and one action that matches what the ad promised.
          </p>
          <h3 className="font-bold text-foreground mt-6 mb-2">No call tracking, judged too early</h3>
          <p className="text-muted-foreground">
            A business that gets most of its leads by phone but only tracks forms is optimising against a fraction of its results. And an account judged in week one, before there is enough data, usually gets changed in the wrong direction.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">When You Should Not Run Paid Ads at All</h2>
          <p className="text-muted-foreground mb-4">
            We would rather say this before you pay us than after. Paid ads amplify what already works; they do not fix a business that is not ready for more enquiries.
          </p>
          <h3 className="font-bold text-foreground mt-6 mb-2">You cannot answer a lead quickly</h3>
          <p className="text-muted-foreground mb-4">
            If enquiries sit for a day before anyone replies, ad spend mostly buys leads for whoever replied first. Speed to first contact typically changes results more than anything we can do inside the ad account.
          </p>
          <h3 className="font-bold text-foreground mt-6 mb-2">The numbers do not work yet</h3>
          <p className="text-muted-foreground mb-4">
            If your average sale and margin cannot cover a realistic cost of winning a customer, more traffic makes the loss bigger, not smaller. We will do that arithmetic with you on the call.
          </p>
          <h3 className="font-bold text-foreground mt-6 mb-2">The budget is well below what we recommend</h3>
          <p className="text-muted-foreground mb-4">
            Below about $1,000 a month in ad spend, most local businesses produce too few conversions for the platforms to learn from, and results stay slow and noisy. Sometimes the right advice is to wait, or to fix the website and Google Business Profile first.
          </p>
          <h3 className="font-bold text-foreground mt-6 mb-2">You need a guaranteed cost per lead before launch</h3>
          <p className="text-muted-foreground">
            Nobody can know that until the account has data. We agree a lead-volume target instead, and if we miss it by month three we keep working at no fee for a further 30 days. Ad spend is paid to Google or Meta either way.
          </p>
        </section>

        <section className="mt-16 mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-left text-foreground font-medium">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <div className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">Cities We Serve</h2>
          <p className="text-muted-foreground mb-6">We provide paid ads management for businesses across Metro Vancouver and the Fraser Valley.</p>
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
              <Link key={href} to={href} className="bg-muted rounded-xl p-4 text-center hover:bg-muted/80 transition-colors">
                <span className="font-medium text-foreground">{city}</span>
              </Link>
            ))}
          </div>
        </div>

        <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 md:p-12 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground text-lg mb-8">Book a free 20-minute call and we will tell you honestly whether paid ads make sense for your business right now.</p>
          <Button asChild size="lg" className="bg-teal hover:bg-teal/90 text-white">
            <Link to="/book">Book Your Free Strategy Call</Link>
          </Button>
        </section>
      </div>
    </main>
    <Footer />
  </>
);

export default PaidAds;
