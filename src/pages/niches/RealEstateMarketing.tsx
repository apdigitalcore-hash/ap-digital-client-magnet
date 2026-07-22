import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, TrendingUp, Home, Users } from 'lucide-react';
import OurServices from '@/components/OurServices';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { getServiceSchema, getBreadcrumbSchema, getFAQSchema, getWebPageSchema, founderSchema } from '@/lib/structuredData';

const TITLE = 'Real Estate Marketing BC | Buyer & Seller Leads | AP Digital';
const DESC = 'AP Digital generates 15–30 buyer & seller leads/month for BC realtors using Meta Ads. Serving Vancouver, Surrey & Burnaby. Month-to-month.';
const CANONICAL = 'https://ap-digital.ca/real-estate-marketing';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const included = [
  'Facebook & Instagram lead ad campaigns',
  'Personal brand content strategy',
  'Short-form video for listings & market updates',
  'Google Ads for buyer & seller keywords',
  'Landing page & lead capture funnel',
  'CRM integration & automated follow-up',
  'Monthly analytics & lead quality reporting',
  'Social media management & posting',
];

const results = [
  { icon: TrendingUp, stat: '$15-25', label: 'Average cost per qualified real estate lead' },
  { icon: Home, stat: '50+', label: 'Leads per month for top-performing agents' },
  { icon: Users, stat: '300%', label: 'Average social media growth in 6 months' },
];

const faqs = [
  {
    question: 'How do real estate agents get more leads in Vancouver?',
    answer: 'The most effective approach is running Meta Ads targeting buyers and sellers in your farm area combined with Google Ads capturing high-intent searches like "homes for sale [neighbourhood]." AP Digital builds, manages, and optimizes these campaigns to generate 15–30 qualified leads per month.',
  },
  {
    question: 'How much do real estate leads cost in BC?',
    answer: 'Cost per lead varies by area and competition. In Metro Vancouver, buyer leads typically cost $15–$35 on Meta and $25–$50 on Google. Seller leads are more expensive — $40–$80 — because there\'s more competition. Most realtors start with $800–$1,500/month in ad spend plus a $759/month management fee.',
  },
  {
    question: 'Is there a contract for real estate marketing?',
    answer: 'No. AP Digital works month-to-month with all real estate clients. No lock-in contracts, no setup fees, no cancellation penalties. We earn your business every month by delivering qualified buyer and seller leads.',
  },
  {
    question: 'Do you work with new real estate agents?',
    answer: 'Yes. We work with both new and experienced realtors across Metro Vancouver, Surrey, Burnaby, Richmond, and the Fraser Valley. New agents especially benefit from paid ads because they build pipeline faster than organic methods alone.',
  },
  {
    question: 'What social media platforms work best for realtors?',
    answer: 'Instagram is essential for showcasing listings and building your personal brand. Facebook is powerful for running targeted lead generation ads to homeowners in specific neighbourhoods. LinkedIn works well for luxury and commercial real estate. We manage your presence across all relevant platforms.',
  },
  {
    question: 'Can you help me get seller leads specifically?',
    answer: 'Yes. We run dedicated seller lead campaigns using home valuation landing pages and targeted ads reaching homeowners in your farm area. These campaigns target people likely to sell based on home ownership duration, equity position, and life events.',
  },
  {
    question: 'How is AP Digital different from other real estate marketing companies?',
    answer: 'Most real estate marketing companies sell you a template. AP Digital builds custom campaigns managed by the founder — not a junior account manager. We focus exclusively on paid ads and social media, we work month-to-month, and we guarantee results within 90 days or we work for free until we deliver.',
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    founderSchema,
    getServiceSchema('Real Estate Marketing', DESC, '/real-estate-marketing'),
    getFAQSchema(faqs),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Real Estate Marketing', url: '/real-estate-marketing' },
    ]),
    getWebPageSchema(TITLE, DESC, '/real-estate-marketing'),
  ]
};

const RealEstateMarketing = () => (
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
          Real Estate Marketing BC — Leads for Agents &amp; Brokerages
        </h1>

        {/* Short intro */}
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          The agent who shows up first wins. We get you in front of buyers and sellers before they call anyone else — with video, ads, and SEO.
        </p>

        {/* 3-column why strip */}
        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="font-bold text-foreground mb-1">Qualified leads, delivered</p>
            <p className="text-sm text-muted-foreground">Facebook and Instagram lead ads capture buyers and sellers in your market and push them straight to your CRM.</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="font-bold text-foreground mb-1">Build the brand people trust</p>
            <p className="text-sm text-muted-foreground">Listing tours, market updates, and neighbourhood content that position you as the go-to local expert.</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="font-bold text-foreground mb-1">No contract, no risk</p>
            <p className="text-sm text-muted-foreground">Month-to-month. Most agents see their first leads within two weeks of launch.</p>
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

        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">Results Our Real Estate Clients See</h2>
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
          <p className="text-muted-foreground text-lg mb-8">Book your free strategy call and discover how we can fill your pipeline with qualified buyer and seller leads.</p>
          <Button asChild size="lg" className="bg-teal hover:bg-teal/90 text-white">
            <a href="https://calendly.com/apdigital-core/20min" target="_blank" rel="noopener noreferrer">Book Your Free Strategy Call</a>
          </Button>
        </section>
      </div>
    </main>
    <Footer />
  </>
);

export default RealEstateMarketing;
