import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import IndustriesWeServe from '@/components/IndustriesWeServe';
import { getServiceSchema, getBreadcrumbSchema, getWebPageSchema } from '@/lib/structuredData';

const TITLE = 'Lead Generation Vancouver BC | AP Digital';
const DESC = 'Stop waiting for referrals. AP Digital builds predictable lead generation systems for salons, trades, realtors & coaches in Vancouver, BC. From $500/month.';
const CANONICAL = 'https://ap-digital.ca/services/lead-generation';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const included = [
  'Custom lead generation funnel design',
  'Landing page creation & optimization',
  'Email & SMS nurturing sequences',
  'CRM setup & integration',
  'Lead scoring & qualification systems',
  'Appointment booking automation',
  'Monthly lead flow reports',
  'Conversion rate optimization',
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    getServiceSchema('Lead Generation', DESC, '/services/lead-generation'),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Lead Generation', url: '/services/lead-generation' },
    ]),
    getWebPageSchema(TITLE, DESC, '/services/lead-generation'),
  ]
};

const LeadGeneration = () => (
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
          Lead Generation Agency Canada — Predictable Leads Every Month
        </h1>

        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6 mb-12">
          <p>The biggest challenge local businesses face isn't delivering great work — it's getting a consistent flow of new clients. Referrals are unpredictable, and hoping for the phone to ring isn't a growth strategy.</p>
          <p>At AP DIGITAL, we build lead generation systems that run on autopilot. From high-converting landing pages and targeted ad campaigns to automated follow-up sequences, we create a machine that attracts, qualifies, and nurtures leads until they're ready to book.</p>
          <p>Our approach combines paid advertising, funnel optimization, and CRM automation into one seamless system. You'll know exactly how many leads are coming in, what they cost, and how they're converting — giving you full control over your business growth.</p>
          <p>Whether you need 10 leads a week or 100, we'll design a system that scales with your capacity. No more feast-or-famine cycles — just predictable, profitable growth month after month.</p>
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

        <section className="bg-card border border-border rounded-2xl p-8 md:p-12 text-center mt-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground text-lg mb-8">Book your free strategy call and let us build a lead generation system that keeps your calendar full.</p>
          <Button asChild size="lg" className="bg-teal hover:bg-teal/90 text-white">
            <a href="https://calendly.com/apdigital-core/30min" target="_blank" rel="noopener noreferrer">Book Your Free Strategy Call</a>
          </Button>
        </section>
      </div>
    </main>
    <Footer />
  </>
);

export default LeadGeneration;
