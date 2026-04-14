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

const TITLE = 'Digital Marketing Agency Burnaby BC | AP Digital';
const DESC = 'AP Digital helps Burnaby businesses get consistent leads with Meta Ads, Google Ads & social media. Trades, salons, realtors & coaches in Burnaby, BC. No contracts.';
const CANONICAL = 'https://ap-digital.ca/burnaby';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const included = [
  'Meta Ads targeting Burnaby & Tri-Cities residents',
  'Google Ads for high-intent local service searches',
  'Google Business Profile setup & optimization',
  'Review generation & reputation management',
  'Social media content creation & management',
  'High-converting landing pages for Burnaby leads',
  'Monthly ROI reporting with full transparency',
  'Local SEO to dominate Burnaby search results',
];

const results = [
  { icon: TrendingUp, stat: '5-10x', label: 'Return on ad spend for local clients' },
  { icon: Phone, stat: '2 weeks', label: 'Average time to first qualified leads' },
  { icon: Star, stat: '$500/mo', label: 'Starting ad budget — month-to-month' },
];

const faqs = [
  {
    question: 'How quickly will I get leads in Burnaby?',
    answer: 'Most Burnaby businesses see their first leads within 2 weeks of launching their Meta Ads campaign with AP Digital.',
  },
  {
    question: 'Is there a contract for Burnaby clients?',
    answer: 'No lock-in contracts. AP Digital works month-to-month with every client in Burnaby and across Metro Vancouver.',
  },
  {
    question: 'How much does digital marketing cost in Burnaby?',
    answer: 'Most clients start with $500–$1,500/month in ad spend. Our management fee is separate, fully transparent, and quoted before you commit.',
  },
  {
    question: 'Who manages my account at AP Digital?',
    answer: 'Arjun Sharma personally manages every client account. No outsourcing, no junior account managers, no handoffs.',
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    getServiceSchema('Digital Marketing Burnaby BC', DESC, '/burnaby'),
    getFAQSchema(faqs),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Burnaby', url: '/burnaby' },
    ]),
    getWebPageSchema(TITLE, DESC, '/burnaby'),
  ]
};

const Burnaby = () => (
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
          Digital Marketing Agency in Burnaby, BC — More Leads. No Contracts.
        </h1>

        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6 mb-16">
          <p>Burnaby is one of Metro Vancouver's most competitive markets. With businesses packed between Vancouver, Coquitlam, and Surrey, standing out online isn't optional — it's survival. Trades companies, salons, real estate agents, and coaches in Burnaby all need one thing: a steady stream of new customers. That's exactly what AP Digital delivers.</p>
          <p>We build paid ad campaigns on Meta and Google specifically targeting Burnaby and the surrounding Tri-Cities area. Whether you're a plumber in North Burnaby, a salon near Metrotown, or a realtor working Brentwood — we create campaigns that reach the right people at the right time with the right message. No wasted spend on clicks that never convert.</p>
          <p>Arjun Sharma personally manages every account at AP Digital. When you sign up, you're not handed off to a team or an account manager. You work directly with the founder who built your campaign. That means faster decisions, real accountability, and results you can actually verify.</p>
          <p>We work month-to-month because we believe in earning your business every single month. Most Burnaby clients see their first leads within 2 weeks. From there, we optimize, scale, and compound your results over time.</p>
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

        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">Results Burnaby Clients See</h2>
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
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">Ready to Get More Leads in Burnaby?</h2>
          <p className="text-muted-foreground text-lg mb-8">Book a free 20-minute strategy call. We'll show you exactly what we'd run for your business and what results to expect. No pitch, no pressure.</p>
          <Button asChild size="lg" className="bg-teal hover:bg-teal/90 text-white">
            <a href="https://calendly.com/apdigital-core/30min" target="_blank" rel="noopener noreferrer">Book Your Free Strategy Call</a>
          </Button>
        </section>
      </div>
    </main>
    <Footer />
  </>
);

export default Burnaby;
