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

const TITLE = 'Digital Marketing Agency Surrey BC | AP Digital';
const DESC = 'AP Digital helps Surrey businesses get more leads with Meta Ads, Google Ads & social media. Serving trades, salons, realtors & coaches in Surrey, BC. No contracts.';
const CANONICAL = 'https://ap-digital.ca/surrey';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const included = [
  'Meta Ads targeting Surrey & South Fraser homeowners',
  'Google Ads for high-intent local searches',
  'Google Business Profile optimization for Surrey',
  'Review generation & reputation management',
  'Social media content creation & management',
  'Landing pages built to convert Surrey leads',
  'Monthly reporting with real lead tracking',
  'Local SEO to rank in the Surrey market',
];

const results = [
  { icon: TrendingUp, stat: '5-10x', label: 'Return on ad spend for local clients' },
  { icon: Phone, stat: '2 weeks', label: 'Average time to first leads' },
  { icon: Star, stat: '$500/mo', label: 'Starting ad budget — no lock-in' },
];

const faqs = [
  {
    question: 'How quickly will I see leads in Surrey?',
    answer: 'Most Surrey businesses see their first leads within 2 weeks of launching Meta Ads with AP Digital.',
  },
  {
    question: 'Do I have to sign a long-term contract?',
    answer: 'No contracts. We work month-to-month with every client in Surrey and across Metro Vancouver.',
  },
  {
    question: 'How much does digital marketing cost in Surrey?',
    answer: 'Most clients start with $500–$1,500/month in ad spend. Our management fee is transparent and quoted upfront.',
  },
  {
    question: 'Will Arjun personally manage my account?',
    answer: 'Yes. Arjun Sharma personally manages every client account at AP Digital. No outsourcing, no junior account managers.',
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    getServiceSchema('Digital Marketing Surrey BC', DESC, '/surrey'),
    getFAQSchema(faqs),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Surrey', url: '/surrey' },
    ]),
    getWebPageSchema(TITLE, DESC, '/surrey'),
  ]
};

const Surrey = () => (
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
          Digital Marketing for Surrey, BC Businesses — Get More Leads
        </h1>

        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6 mb-16">
          <p>Surrey is one of BC's fastest-growing cities — and one of the most competitive markets for local businesses. Trades companies, hair salons, real estate agents, and coaches in Surrey are all competing for the same customers online. If your business isn't showing up on Google and social media, you're invisible to the people actively looking for your service right now.</p>
          <p>AP Digital builds lead generation systems for Surrey businesses using Meta Ads, Google Ads, and social media. We don't run generic campaigns — everything is targeted to Surrey and the surrounding South Fraser area, reaching the exact people most likely to book with you. When someone searches "plumber in Surrey" or "hair salon near Guildford," your business is the one that shows up.</p>
          <p>Every account is managed personally by Arjun Sharma — no outsourcing, no junior staff, no account managers passing your file around. You get direct communication, real transparency, and campaigns that are actually optimized for your market. Most Surrey clients see their first qualified leads within 2 weeks.</p>
          <p>We work month-to-month with no long-term contracts. If we're not delivering results, you're free to leave. That's the kind of accountability most marketing agencies won't offer — we do because we're confident in what we build.</p>
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

        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">Results Surrey Clients See</h2>
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
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">Ready to Get More Leads in Surrey?</h2>
          <p className="text-muted-foreground text-lg mb-8">Book a free 20-minute strategy call. We'll show you exactly what a campaign looks like for your business and your budget. No pitch, no pressure.</p>
          <Button asChild size="lg" className="bg-teal hover:bg-teal/90 text-white">
            <a href="https://calendly.com/apdigital-core/30min" target="_blank" rel="noopener noreferrer">Book Your Free Strategy Call</a>
          </Button>
        </section>
      </div>
    </main>
    <Footer />
  </>
);

export default Surrey;
