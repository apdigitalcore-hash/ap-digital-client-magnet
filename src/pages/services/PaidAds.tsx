import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, TrendingUp, Phone, Star } from 'lucide-react';
import IndustriesWeServe from '@/components/IndustriesWeServe';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { getServiceSchema, getBreadcrumbSchema, getWebPageSchema, getFAQSchema, founderSchema } from '@/lib/structuredData';

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

const faqs = [
  {
    question: 'How much do paid ads cost in Vancouver?',
    answer: 'Most of our clients invest between $500 and $1,500 per month in ad spend, plus a management fee that is quoted upfront before we start. There are no hidden costs — you know exactly what you are paying before any campaign goes live.',
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
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
    <Header />
    <main id="main-content" className="pt-24 pb-16">
      <div className="container-custom max-w-4xl">
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Google Ads Agency Vancouver
        </h1>
        <p className="text-base text-teal font-semibold mb-6">
          PPC management, Facebook Ads & Meta campaigns for BC businesses.
        </p>

        {/* Short intro */}
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          Most businesses waste their first $5k figuring out what works. We've already done that testing — your campaigns launch with proven structure from day one. Pair ads with our <Link to="/services/social-media" className="text-teal underline hover:text-teal/80">social media management</Link> for full-funnel coverage. See <Link to="/pricing" className="text-teal underline hover:text-teal/80">pricing</Link> or browse <Link to="/case-studies" className="text-teal underline hover:text-teal/80">client results</Link>.
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
            <p className="font-display text-3xl font-bold text-teal mb-2">5-10x</p>
            <p className="text-muted-foreground text-sm">ROAS for clients</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <Phone className="w-8 h-8 text-teal mx-auto mb-3" />
            <p className="font-display text-3xl font-bold text-teal mb-2">30+</p>
            <p className="text-muted-foreground text-sm">Qualified leads per month</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <Star className="w-8 h-8 text-teal mx-auto mb-3" />
            <p className="font-display text-3xl font-bold text-teal mb-2">$500/mo</p>
            <p className="text-muted-foreground text-sm">Starting ad budget</p>
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
