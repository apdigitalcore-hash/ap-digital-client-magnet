import { Helmet } from 'react-helmet-async';
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
import { getServiceSchema, getBreadcrumbSchema, getFAQSchema, getWebPageSchema } from '@/lib/structuredData';

const TITLE = 'Digital Marketing Agency Langley BC | AP Digital';
const DESC = 'AP Digital helps Langley businesses get more leads with Meta Ads, Google Ads & social media. Serving trades, salons, realtors & coaches in Langley, BC. No contracts.';
const CANONICAL = 'https://ap-digital.ca/langley';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const included = [
  'Meta Ads targeting Langley City & Township residents',
  'Google Ads for high-intent local service searches',
  'Google Business Profile setup & optimization',
  'Review generation & reputation management',
  'Social media content creation & management',
  'High-converting landing pages for Langley leads',
  'Monthly ROI reporting with full transparency',
  'Local SEO to rank in the Langley market',
];

const results = [
  { icon: TrendingUp, stat: '5-10x', label: 'Return on ad spend for local clients' },
  { icon: Phone, stat: '2 weeks', label: 'Average time to first qualified leads' },
  { icon: Star, stat: '$500/mo', label: 'Starting ad budget — month-to-month' },
];

const faqs = [
  {
    question: 'How quickly will I see leads in Langley?',
    answer: 'Most Langley businesses see their first leads within 2 weeks of launching Meta Ads with AP Digital.',
  },
  {
    question: 'Do I need a long-term contract?',
    answer: 'No contracts. We work month-to-month with every client — including all Langley businesses.',
  },
  {
    question: 'What does digital marketing cost in Langley?',
    answer: 'Most Langley clients start with $500–$1,500/month in ad spend. Our management fee is transparent and quoted before you commit.',
  },
  {
    question: 'Does AP Digital work with Langley trades businesses?',
    answer: 'Yes — Langley trades are one of our strongest niches. We run Meta and Google Ads for plumbers, HVAC, electricians, roofers, and contractors across Langley City and Township.',
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    getServiceSchema('Digital Marketing Langley BC', DESC, '/langley'),
    getFAQSchema(faqs),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Langley', url: '/langley' },
    ]),
    getWebPageSchema(TITLE, DESC, '/langley'),
  ]
};

const Langley = () => (
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
      <meta property="og:site_name" content="AP Digital" />
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
          Digital Marketing for Langley, BC — Lead Generation That Works
        </h1>

        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6 mb-16">
          <p>Langley is growing fast — both Langley City and the Township are seeing new residential developments, new businesses, and new competition. Whether you're a trades contractor servicing the Fraser Valley or a salon in Willowbrook, you need to be visible online to capture that growing demand. AP Digital builds the marketing systems that make that happen.</p>
          <p>We run Meta Ads and Google Ads campaigns specifically geo-targeted to Langley and surrounding areas. Every dollar of your ad budget reaches people in your actual service area — not random users across Metro Vancouver who'll never hire you. When a Langley homeowner searches for an electrician or a new hair salon, your business shows up first.</p>
          <p>Unlike big agencies that spread account managers thin across hundreds of clients, Arjun Sharma personally handles every AP Digital account. You get someone who knows your campaign inside out, responds quickly, and actually cares about your results. No layers of bureaucracy between you and the person running your ads.</p>
          <p>We don't lock you into contracts. If you're not seeing results, you're free to stop. We've built the business around actually delivering — and most Langley clients are seeing their first leads within 2 weeks of launch.</p>
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

        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">Results Langley Clients See</h2>
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
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">Ready to Get More Leads in Langley?</h2>
          <p className="text-muted-foreground text-lg mb-8">Book a free 20-minute strategy call. We'll walk you through exactly what a campaign for your Langley business would look like. No pitch, no pressure.</p>
          <Button asChild size="lg" className="bg-teal hover:bg-teal/90 text-white">
            <a href="https://calendly.com/apdigital-core/30min" target="_blank" rel="noopener noreferrer">Book Your Free Strategy Call</a>
          </Button>
        </section>
      </div>
    </main>
    <Footer />
  </>
);

export default Langley;
