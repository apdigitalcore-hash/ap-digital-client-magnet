import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, TrendingUp, Calendar, Users } from 'lucide-react';
import OurServices from '@/components/OurServices';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { getServiceSchema, getBreadcrumbSchema, getFAQSchema, getWebPageSchema } from '@/lib/structuredData';

const TITLE = 'Salon Marketing Vancouver | Fill Your Chair Every Week | AP Digital';
const DESC = 'Get 20–40 new salon clients/month with Meta Ads & Instagram content. AP Digital serves Vancouver salons. Month-to-month. No contracts.';
const CANONICAL = 'https://ap-digital.ca/salon-marketing';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const included = [
  'Instagram & Facebook ad campaigns targeting local clients',
  'Short-form video strategy (Reels & TikToks)',
  'Before-and-after content creation',
  'Google Business Profile optimization',
  'Online booking funnel setup',
  'Monthly performance reporting & optimization',
  'Branded social media content calendar',
  'Retargeting campaigns for website visitors',
];

const results = [
  { icon: TrendingUp, stat: '3-5x', label: 'Average return on ad spend for salon clients' },
  { icon: Calendar, stat: '40+', label: 'New bookings per month from paid ads alone' },
  { icon: Users, stat: '200%', label: 'Average follower growth in the first 90 days' },
];

const faqs = [
  {
    question: 'How do I get more salon clients in Vancouver?',
    answer: 'The fastest way is targeted Instagram and Facebook ads reaching people in your area who are actively looking for salon services. AP Digital sets this up and manages it for you.',
  },
  {
    question: 'How much does salon marketing cost?',
    answer: "Most salons start with $500/month in ad spend. AP Digital's management fee is transparent and month-to-month — no long-term contracts.",
  },
  {
    question: 'How fast will I see new bookings?',
    answer: 'Most salon clients see new bookings within the first 2 weeks of launching their campaign.',
  },
  {
    question: 'Is there a contract?',
    answer: 'No. AP Digital works month-to-month with all salon clients. You stay because it works.',
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    getServiceSchema('Salon Marketing', DESC, '/salon-marketing'),
    getFAQSchema(faqs),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Salon Marketing', url: '/salon-marketing' },
    ]),
    getWebPageSchema(TITLE, DESC, '/salon-marketing'),
  ]
};

const SalonMarketing = () => (
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
          Salon Marketing — Get More Bookings with Meta Ads
        </h1>

        {/* Short intro */}
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          Most salons run on referrals and hope. We build you a system — Meta Ads, Reels, and retargeting — that fills every chair on autopilot.
        </p>

        {/* 3-column why strip */}
        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="font-bold text-foreground mb-1">Before &amp; afters convert</p>
            <p className="text-sm text-muted-foreground">Before-and-after content drives 3× more bookings than any other format. We produce it for you.</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="font-bold text-foreground mb-1">Local targeting that works</p>
            <p className="text-sm text-muted-foreground">We put your offer in front of women in your area who are actively searching for a new stylist — not random impressions.</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="font-bold text-foreground mb-1">No contract, no risk</p>
            <p className="text-sm text-muted-foreground">Month-to-month. If we don't get you new bookings within 30 days, you don't owe us a thing.</p>
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

        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">Results Our Salon Clients See</h2>
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
          <p className="text-muted-foreground text-lg mb-8">Book your free strategy call and find out how we can fill your salon's calendar with high-value clients.</p>
          <Button asChild size="lg" className="bg-teal hover:bg-teal/90 text-white">
            <a href="https://calendly.com/apdigital-core/30min" target="_blank" rel="noopener noreferrer">Book Your Free Strategy Call</a>
          </Button>
        </section>
      </div>
    </main>
    <Footer />
  </>
);

export default SalonMarketing;
