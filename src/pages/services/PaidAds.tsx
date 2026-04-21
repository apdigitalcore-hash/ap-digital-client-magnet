import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, TrendingUp, Phone, Star } from 'lucide-react';
import IndustriesWeServe from '@/components/IndustriesWeServe';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { getServiceSchema, getBreadcrumbSchema, getWebPageSchema, getFAQSchema } from '@/lib/structuredData';

const TITLE = 'Paid Ads Agency Vancouver | Meta & Google Ads | AP Digital';
const DESC = 'AP Digital manages Meta Ads & Google Ads for Vancouver small businesses. Salons, trades, realtors & coaches. Month-to-month.';
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
    getServiceSchema('Paid Advertising', DESC, '/services/paid-ads'),
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
    <main className="pt-24 pb-16">
      <div className="container-custom max-w-4xl">
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8">
          Paid Ads Management for Vancouver Small Business
        </h1>

        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6 mb-12">
          <p>Most businesses waste thousands on ads that don't convert. The problem isn't the platform — it's the strategy. At AP DIGITAL, we build paid ad campaigns on Facebook, Instagram, and Google that are designed from day one to generate qualified leads, not just impressions.</p>
          <p>We start by understanding your ideal customer, then craft scroll-stopping creatives and laser-targeted audiences that put your offer in front of the right people at the right time. Every dollar is tracked, tested, and optimized so your cost per lead keeps dropping.</p>
          <p>Whether you're a salon owner looking for more bookings, a real estate agent chasing buyer leads, or a trades business that needs the phone to ring — our paid ads system delivers consistent, measurable results month after month.</p>
          <p>You'll get full transparency with weekly reports, a dedicated strategist, and campaigns that scale as your business grows. No long-term contracts, no vanity metrics — just leads that turn into revenue.</p>
          <p>Understanding the difference between Meta Ads and Google Ads is critical to spending your budget wisely. Meta Ads (Facebook and Instagram) excel at interrupting your ideal customer with a compelling offer — they are perfect for visual businesses like salons, med spas, and real estate where stunning imagery drives clicks. Google Ads, on the other hand, capture people who are already searching for what you offer — making them ideal for trades, emergency services, and high-intent local searches. We analyze your business, competition, and margins to recommend the right mix of both platforms so every dollar works harder.</p>
          <p>We proudly serve small businesses across Metro Vancouver and the Fraser Valley, including Surrey, Burnaby, Langley, and Coquitlam. Whether you are a contractor in Surrey looking for renovation leads, a salon owner in Burnaby trying to fill empty chairs, or a real estate agent in Langley targeting new buyers — our paid ads management is tailored to your local market. We understand the competitive landscape in each city and build geo-targeted campaigns that put your business in front of the customers who matter most.</p>
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
              { city: 'Surrey', href: '/surrey' },
              { city: 'Burnaby', href: '/burnaby' },
              { city: 'Langley', href: '/langley' },
              { city: 'Coquitlam', href: '/coquitlam' },
            ].map(({ city, href }) => (
              <Link key={href} to={href} className="bg-muted rounded-xl p-4 text-center hover:bg-muted/80 transition-colors">
                <span className="font-medium text-foreground">{city}</span>
              </Link>
            ))}
          </div>
        </div>

        <section className="bg-card border border-border rounded-2xl p-8 md:p-12 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground text-lg mb-8">Book your free strategy call and find out how paid ads can fill your pipeline with qualified leads.</p>
          <Button asChild size="lg" className="bg-teal hover:bg-teal/90 text-white">
            <a href="https://calendly.com/apdigital-core/30min" target="_blank" rel="noopener noreferrer">Book Your Free Strategy Call</a>
          </Button>
        </section>
      </div>
    </main>
    <Footer />
  </>
);

export default PaidAds;
