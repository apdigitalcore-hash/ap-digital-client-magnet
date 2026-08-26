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
  'Google Ads search & display campaigns',
  'Audience research & targeting strategy',
  'A/B testing of creatives and copy',
  'Retargeting & lookalike audience campaigns',
  'Weekly performance reports & optimization',
  'Landing page recommendations',
  'Dedicated account manager',
];

const costs = [
  { line: 'Management fee', amount: '$759/month', note: 'Flat. Not a percentage of your spend.' },
  { line: 'Ad spend', amount: '$1,000+/month', note: 'Paid directly to Google or Meta on your own card.' },
  { line: 'Setup fee', amount: 'None', note: 'Tracking, research and build are inside the fee.' },
  { line: 'Contract', amount: 'Month-to-month', note: "30 days' notice to pause or cancel. No exit fee." },
];

const platformFit = [
  { type: 'Trades & contractors', platform: 'Google Ads first', why: 'A burst pipe or a dead furnace gets typed into Google at the moment of need.' },
  { type: 'Salons & spas', platform: 'Meta Ads first', why: 'Nobody searches for a new hair colour. They see one in a feed and book.' },
  { type: 'Dental & health clinics', platform: 'Google Ads first', why: 'High intent, local, and people compare before they call.' },
  { type: 'Real estate', platform: 'Meta Ads first', why: 'Buyers and sellers are discovered long before they search for an agent.' },
  { type: 'Coaches & consultants', platform: 'Meta Ads first', why: 'Demand has to be created, not captured.' },
  { type: 'Restaurants', platform: 'Meta Ads first', why: 'Visual, local, and impulse-driven.' },
];

const firstThirtyDays = [
  { when: 'Days 1-3', what: 'Conversion tracking before anything else. If we cannot tell which ad produced which lead, nothing after this matters. Calls get tracked, not just form fills.' },
  { when: 'Days 3-7', what: 'Audience and keyword research, negative keyword list, first creative built, and a lead-volume target agreed with you in writing before launch.' },
  { when: 'Week 2', what: 'Campaigns live. Most clients see their first qualified leads in this window. Cost per lead is still noisy and we do not read much into it yet.' },
  { when: 'Weeks 3-4', what: 'Enough conversion data to optimise against. Search terms pruned weekly, losing creative cut, budget shifted to what is producing.' },
];

const wasteSources = [
  'Boosted posts instead of campaigns. Boosting optimises for engagement, not enquiries.',
  'Broad match with no negative keywords, which quietly spends a third of a local budget on searches with no purchase intent.',
  'Performance Max with no brand exclusion, claiming credit for people already searching your name.',
  'Sending ad traffic to a homepage instead of a page with one offer and one action.',
  'Judging the account in week one, before there is enough data for the numbers to mean anything.',
  'No call tracking, on a business that gets most of its leads by phone.',
];

const notFor = [
  'Budgets under $500/month in ad spend. Below that the platforms cannot gather enough conversion data to optimise, and you pay near-full price for every click indefinitely.',
  'Businesses with no way to answer a lead within the hour. Speed to first contact changes conversion more than anything we can do in the ad account.',
  'Anyone who needs a guaranteed cost per lead before launch. We agree a volume target, not a price we cannot know yet.',
];

const faqs = [
  {
    question: 'Do you charge a percentage of ad spend?',
    answer: 'No. The fee is a flat $759 per month regardless of what you spend. Percentage billing at 10 to 20% is common and it rewards the agency for spending more of your money whether or not it produces anything. A flat fee removes that incentive entirely.',
  },
  {
    question: 'Who owns the ad account and the data?',
    answer: 'You do. The ad account, the pixel, the audiences and the entire conversion history stay in your name. If you leave, you keep all of it. Agencies that own the account are creating a switching cost disguised as an administrative detail.',
  },
  {
    question: 'What is the minimum ad spend that actually works?',
    answer: 'Around $500 per month is the practical floor and $1,000 is where we recommend starting. Below $500 the platforms cannot gather enough conversion data to optimise, so you pay close to full price for every click indefinitely. That is a platform limitation, not an agency upsell.',
  },
  {
    question: 'Do you guarantee results?',
    answer: 'We agree a lead-volume target before anything goes live, and if we miss it by month three we keep working at no charge until we hit it. What we do not do is guarantee a cost per lead before launch, because nobody can know that until the account has data. We also have no published case studies yet, and we say so rather than quoting numbers you cannot verify.',
  },
  {
    question: 'How much do paid ads cost in Vancouver?',
    answer: 'Management is $759 per month, flat, and ad spend is separate and paid directly to Google or Meta on your own card. We recommend a minimum of $1,000 per month in ad spend, so most Vancouver businesses run $1,750 to $3,000 a month all in. There is no setup fee and no percentage of spend.',
  },
  {
    question: 'How fast will I see results from paid ads?',
    answer: 'Most clients see their first qualified leads within two weeks of campaign launch. We optimize aggressively during the first 30 days to dial in targeting, creatives, and landing pages for the best possible cost per lead.',
  },
  {
    question: 'Should I use Facebook Ads or Google Ads?',
    answer: 'It depends on your business. Meta Ads (Facebook and Instagram) are excellent for brand awareness, retargeting, and visual offers. Google Ads capture high-intent searches from people actively looking for your service. We recommend the best platform based on your industry and goals — and many clients benefit from running both.',
  },
  {
    question: 'Do you require a long-term contract?',
    answer: 'No. All of our paid ads management is month-to-month. We earn your business with results, not lock-in contracts. Most clients stay because the campaigns are profitable, not because they are obligated to.',
  },
  {
    question: 'Who manages my ad campaigns?',
    answer: 'Arjun Sharma personally manages every account — there is no outsourcing to junior staff or overseas teams. You get direct access to the strategist running your campaigns, which means faster communication and better results.',
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
          Google Ads, Facebook &amp; Instagram campaigns managed end-to-end for BC businesses.
        </p>

        {/* Short intro */}
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          Most businesses waste their first $5k figuring out what works. We've already done that testing — your campaigns launch with proven structure from day one. Pair ads with our <Link to="/services/social-media" className="text-teal underline hover:text-teal/80">social media management</Link> for full-funnel coverage. See <Link to="/pricing" className="text-teal underline hover:text-teal/80">pricing</Link> or browse <Link to="/case-studies" className="text-teal underline hover:text-teal/80">how we work</Link>.
        </p>

        {/* 3-column why strip */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="font-bold text-foreground mb-1">Facebook &amp; Meta Ads</p>
            <p className="text-sm text-muted-foreground">Facebook and Instagram ads that interrupt your ideal customer with an offer they can't ignore — perfect for salons, realtors, and coaches.</p>
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
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">What It Costs</h2>
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
            Most Vancouver businesses land between $1,750 and $3,000 a month all in, and the
            majority of that is ad spend rather than fees. Full breakdown on the{' '}
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
            {platformFit.map((row) => (
              <div key={row.type} className="bg-card border border-border rounded-xl p-5">
                <p className="font-bold text-foreground mb-1">{row.type}</p>
                <p className="text-sm text-teal font-semibold mb-2">{row.platform}</p>
                <p className="text-sm text-muted-foreground">{row.why}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── First 30 days ───────────────────────────────────────────── */}
        <section className="mt-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">The First 30 Days</h2>
          <p className="text-muted-foreground mb-6">
            No strategy decks. Here is what actually happens, in order.
          </p>
          <div className="space-y-4">
            {firstThirtyDays.map((step) => (
              <div key={step.when} className="bg-card border border-border rounded-xl p-5">
                <p className="text-sm font-bold text-teal mb-1">{step.when}</p>
                <p className="text-sm text-muted-foreground">{step.what}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Where budgets leak ──────────────────────────────────────── */}
        <section className="mt-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">Where Ad Budgets Leak</h2>
          <p className="text-muted-foreground mb-6">
            The six things that cost self-managed and badly-managed accounts the most money. If you
            are running ads yourself, this list is worth checking before you hire anyone.
          </p>
          <ul className="space-y-3">
            {wasteSources.map((w) => (
              <li key={w} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span aria-hidden="true" className="mt-2 w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                {w}
              </li>
            ))}
          </ul>
        </section>

        {/* ── Who this is not for ─────────────────────────────────────── */}
        <section className="mt-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">When This Is Not the Right Spend</h2>
          <p className="text-muted-foreground mb-6">
            We would rather say this before you pay us than after.
          </p>
          <ul className="space-y-3">
            {notFor.map((n) => (
              <li key={n} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span aria-hidden="true" className="mt-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/50 shrink-0" />
                {n}
              </li>
            ))}
          </ul>
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
          <p className="text-muted-foreground text-lg mb-8">Book your free strategy call and find out how paid ads can fill your pipeline with qualified leads.</p>
          <Button asChild size="lg" className="bg-teal hover:bg-teal/90 text-white">
            <a href="https://calendly.com/apdigital-core/20min" target="_blank" rel="noopener noreferrer">Book Your Free Strategy Call</a>
          </Button>
        </section>
      </div>
    </main>
    <Footer />
  </>
);

export default PaidAds;
