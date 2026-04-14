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

const TITLE = 'Digital Marketing Agency Coquitlam BC | AP Digital';
const DESC = 'AP Digital helps Coquitlam businesses get more leads with Meta Ads, Google Ads & social media. Serving trades, salons, realtors & coaches in Coquitlam, BC. No contracts.';
const CANONICAL = 'https://ap-digital.ca/coquitlam';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const included = [
  'Meta Ads targeting Coquitlam & Tri-Cities residents',
  'Google Ads for high-intent local service searches',
  'Google Business Profile setup & optimization',
  'Review generation & reputation management',
  'Social media content creation & management',
  'High-converting landing pages for Coquitlam leads',
  'Monthly ROI reporting with full transparency',
  'Local SEO to rank in Coquitlam & Port Moody',
];

const results = [
  { icon: TrendingUp, stat: '5-10x', label: 'Return on ad spend for local clients' },
  { icon: Phone, stat: '2 weeks', label: 'Average time to first qualified leads' },
  { icon: Star, stat: '$500/mo', label: 'Starting ad budget — month-to-month' },
];

const faqs = [
  {
    question: 'How quickly will I see leads in Coquitlam?',
    answer: 'Most Coquitlam businesses see their first qualified leads within 2 weeks of launching Meta Ads with AP Digital.',
  },
  {
    question: 'Is there a long-term contract for Coquitlam clients?',
    answer: 'No lock-in contracts. AP Digital works month-to-month with every client in Coquitlam and the Tri-Cities.',
  },
  {
    question: 'How much does digital marketing cost in Coquitlam?',
    answer: 'Most clients start with $500–$1,500/month in ad spend. Our management fee is transparent and quoted before you commit to anything.',
  },
  {
    question: 'Does AP Digital serve Port Moody and Port Coquitlam too?',
    answer: 'Yes — we run campaigns across the entire Tri-Cities area including Coquitlam, Port Moody, and Port Coquitlam, as well as New Westminster and Burnaby.',
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    getServiceSchema('Digital Marketing Coquitlam BC', DESC, '/coquitlam'),
    getFAQSchema(faqs),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Coquitlam', url: '/coquitlam' },
    ]),
    getWebPageSchema(TITLE, DESC, '/coquitlam'),
  ]
};

const Coquitlam = () => (
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
          Digital Marketing for Coquitlam, BC — Get Consistent, Qualified Leads
        </h1>

        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6 mb-16">
          <p>Coquitlam and the Tri-Cities are home to thousands of local businesses all competing for the same customers. Homeowners in Port Moody, families in Port Coquitlam, and professionals throughout the area are searching for local services online every day — trades, beauty, real estate, coaching. If your business isn't at the top of those results, a competitor is taking that call instead.</p>
          <p>AP Digital runs targeted paid ad campaigns on Meta and Google for Coquitlam businesses. We geo-target your ads to your actual service area — not a vague radius that wastes budget on people who'll never hire you. Every campaign is built to generate real inquiries: people who need your service, in your city, ready to book.</p>
          <p>What makes AP Digital different is personal accountability. Arjun Sharma runs every client account himself — no juniors, no outsourcing, no hand-offs. You communicate directly with the person running your campaigns. You get fast responses, honest reporting, and someone who treats your ad budget like their own.</p>
          <p>Month-to-month with no contracts. We work hard to keep you because we have to earn it every month. Most Coquitlam clients see their first leads within 2 weeks of launch, and results continue to build from there.</p>
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

        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">Results Coquitlam Clients See</h2>
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
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">Ready to Get More Leads in Coquitlam?</h2>
          <p className="text-muted-foreground text-lg mb-8">Book a free 20-minute strategy call. We'll show you what a campaign for your Coquitlam business would look like and what to expect. No pitch, no pressure.</p>
          <Button asChild size="lg" className="bg-teal hover:bg-teal/90 text-white">
            <a href="https://calendly.com/apdigital-core/30min" target="_blank" rel="noopener noreferrer">Book Your Free Strategy Call</a>
          </Button>
        </section>
      </div>
    </main>
    <Footer />
  </>
);

export default Coquitlam;
