import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, TrendingUp, Phone, Star } from 'lucide-react';
import OurServices from '@/components/OurServices';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { getServiceSchema, getBreadcrumbSchema, getFAQSchema, getWebPageSchema, founderSchema } from '@/lib/structuredData';

const TITLE = 'Trades Marketing BC | Plumber & HVAC Leads | AP Digital';
const DESC = 'AP Digital gets BC plumbers, electricians, HVAC companies & roofers 20–50 qualified leads/month via Google & Meta Ads. No contracts. Starts at $500/month.';
const CANONICAL = 'https://ap-digital.ca/trades-marketing';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const included = [
  'Google Ads campaigns for local service searches',
  'Facebook & Instagram ads targeting homeowners',
  'Google Business Profile optimization & management',
  'Review generation & reputation management',
  'Before-and-after project content creation',
  'Landing pages built to convert job inquiries',
  'Monthly lead tracking & ROI reporting',
  'Local SEO to rank in your service area',
];

const results = [
  { icon: TrendingUp, stat: '5-10x', label: 'Return on ad spend for trades clients' },
  { icon: Phone, stat: '30+', label: 'Qualified job leads per month' },
  { icon: Star, stat: '4.8★', label: 'Average Google rating after review strategy' },
];

const faqs = [
  {
    question: 'How quickly will I get leads as a trades business in BC?',
    answer: 'Most trades businesses in Metro Vancouver see their first qualified leads within 2 weeks of launching. Google Ads for emergency searches (plumber near me, HVAC repair) can produce calls within days. Meta Ads typically ramp up by week 3.',
  },
  {
    question: 'Is there a contract for trades marketing?',
    answer: 'No. AP Digital works month-to-month with all trades clients — plumbers, electricians, HVAC techs, roofers, and landscapers. No lock-in, no cancellation fees. You stay because the leads keep coming.',
  },
  {
    question: 'How much does trades marketing cost in BC?',
    answer: 'Most BC contractors start with $800–$1,500/month in ad spend plus a $759/month management fee. This covers Google Ads, Meta Ads, creative testing, and weekly reporting. Cost per lead typically ranges from $15–$40 depending on the trade.',
  },
  {
    question: 'Should my trades business use Google Ads or Facebook Ads?',
    answer: 'Both work, but for different reasons. Google Ads captures emergency and high-intent searches — someone whose pipe just burst is Googling, not scrolling Facebook. Meta Ads build awareness and generate leads from homeowners who need routine work. Most trades businesses get the best results running both.',
  },
  {
    question: 'Do you work with plumbers, electricians, and HVAC companies in Vancouver?',
    answer: 'Yes. We specialize in trades businesses across Metro Vancouver including plumbers, electricians, HVAC technicians, roofers, landscapers, and general contractors. We have proven playbooks for each trade that generate consistent leads.',
  },
  {
    question: 'How do I get my trades business to show up on Google?',
    answer: 'We run Google Search Ads targeting high-intent keywords specific to your trade and service area. We also optimize your Google Business Profile for local pack visibility, help generate reviews, and ensure your NAP (name, address, phone) is consistent across directories.',
  },
  {
    question: 'Can you help my trades business get more reviews?',
    answer: 'Yes. We set up automated review request sequences that go out after every completed job. More 5-star Google reviews improve your local search ranking and build trust with potential customers searching for contractors in their area.',
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    founderSchema,
    getServiceSchema('Trades Marketing', DESC, '/trades-marketing'),
    getFAQSchema(faqs),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Trades Marketing', url: '/trades-marketing' },
    ]),
    getWebPageSchema(TITLE, DESC, '/trades-marketing'),
  ]
};

const TradesMarketing = () => (
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
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8">
          Trades Marketing for BC Contractors — Get Leads with Meta Ads
        </h1>

        {/* Short intro */}
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          When a pipe bursts, people Google. We make sure they find you first — and that your phone keeps ringing year-round.
        </p>

        {/* 3-column why strip */}
        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="font-bold text-foreground mb-1">Google Ads for high-intent searches</p>
            <p className="text-sm text-muted-foreground">Capture people searching 'plumber near me' or 'HVAC Vancouver' right when they're ready to book.</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="font-bold text-foreground mb-1">Local SEO that sticks</p>
            <p className="text-sm text-muted-foreground">We get you into the Google Maps pack — where 40%+ of local clicks go — and keep you there.</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="font-bold text-foreground mb-1">No contract, no risk</p>
            <p className="text-sm text-muted-foreground">Month-to-month. If the phone isn't ringing more within 30 days, you pay nothing.</p>
          </div>
        </div>

        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">What You Get</h2>
        <ul className="grid sm:grid-cols-2 gap-4 mb-16">
          {included.map((item) => (
            <li key={item} className="flex items-start gap-3 text-foreground">
              <CheckCircle className="w-5 h-5 text-teal mt-0.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">Results Our Trades Clients See</h2>
        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          {results.map((r) => (
            <div key={r.label} className="bg-card border border-border rounded-xl p-6 text-center">
              <r.icon className="w-8 h-8 text-teal mx-auto mb-3" />
              <div className="font-display text-3xl font-bold text-teal mb-2">{r.stat}</div>
              <p className="text-muted-foreground text-sm">{r.label}</p>
            </div>
          ))}
        </div>

        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="mb-16">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left text-foreground font-medium">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <OurServices />

        <section className="bg-card border border-border rounded-2xl p-8 md:p-12 text-center mt-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground text-lg mb-8">Book your free strategy call and find out how we can keep your crew booked with quality jobs.</p>
          <Button asChild size="lg" className="bg-teal hover:bg-teal/90 text-white">
            <a href="https://calendly.com/apdigital-core/20min" target="_blank" rel="noopener noreferrer">Book Your Free Strategy Call</a>
          </Button>
        </section>
      </div>
    </main>
    <Footer />
  </>
);

export default TradesMarketing;
