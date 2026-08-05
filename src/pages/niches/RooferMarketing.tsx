import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, TrendingUp, Phone, DollarSign } from 'lucide-react';
import OurServices from '@/components/OurServices';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { getServiceSchema, getBreadcrumbSchema, getFAQSchema, getWebPageSchema, founderSchema } from '@/lib/structuredData';
import JsonLd from '@/components/JsonLd';

const TITLE = 'Roofer Marketing Vancouver | Get More Roofing Jobs | AP Digital';
const DESC = 'Get 15–25 qualified roofing leads/month with Google Ads & Local SEO. AP Digital serves Metro Vancouver roofers. Month-to-month. No contracts. 90-day guarantee.';
const CANONICAL = 'https://ap-digital.ca/roofer-marketing';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const included = [
  'Google Search Ads for "roof repair," "roof replacement," & storm damage keywords',
  'Local Service Ads (LSA) with Google Guaranteed badge',
  'Google Business Profile optimization with project photos & reviews',
  'Storm-response campaigns activated within 24 hours of major weather',
  'Landing pages with before-and-after galleries & instant quote forms',
  'Call tracking tied to booked estimates, not just inquiries',
  'Seasonal bid adjustments for BC\'s rainy season (Oct–Mar)',
  'Competitor monitoring & positioning across your service area',
];

const results = [
  { icon: TrendingUp, stat: '12x', label: 'Average ROAS for roofing clients' },
  { icon: Phone, stat: '15–25', label: 'Qualified roofing leads per month' },
  { icon: DollarSign, stat: '$65', label: 'Average cost per qualified lead' },
];

const faqs = [
  {
    question: 'How much do Google Ads cost for roofers in Metro Vancouver?',
    answer: 'Roofing is one of the most competitive trades keywords — expect $15–$45 per click for terms like "roof replacement Vancouver." Most roofing companies invest $1,500–$3,000/month in ad spend plus a $759/month management fee. But with average job values of $8K–$25K, even at $65/lead the ROI is exceptional.',
  },
  {
    question: 'How fast will I get roofing leads from Google Ads?',
    answer: 'Storm-damage and emergency repair searches can generate calls within hours of launching. Replacement and re-roofing keywords typically produce 1–3 qualified leads per day within the first two weeks. Volume spikes significantly during and after BC\'s rainy season (October–March).',
  },
  {
    question: 'Should roofers use Google Ads or Meta Ads?',
    answer: 'Google Ads first — roofing is almost entirely search-driven. Nobody scrolls Instagram looking for a roofer. However, Meta Ads can work for proactive campaigns: targeting homeowners in neighborhoods with aging roofs, promoting free inspections, or retargeting website visitors who didn\'t call.',
  },
  {
    question: 'How do storm-response campaigns work?',
    answer: 'When a major windstorm or hail event hits Metro Vancouver, we activate pre-built storm-response campaigns within 24 hours. These target searches like "storm damage roof repair [city]" and "emergency roof tarp." Storm events create 3–5x normal search volume and the leads convert fast because the damage is urgent.',
  },
  {
    question: 'What roofing keywords should I target?',
    answer: 'We target high-intent keywords: "roof replacement [city]," "roof repair near me," "roof leak repair," "metal roofing [city]," and "roof inspection." We also build campaigns for specific materials (asphalt shingle, metal, cedar shake) since these searches indicate a buyer who has already researched and is ready to get quotes.',
  },
  {
    question: 'How do I compete with big roofing companies?',
    answer: 'Local roofers win on trust, not budget. We focus your ads on your specific service area, build your Google reviews aggressively (homeowners check reviews before calling any roofer), and create landing pages with before-and-after project galleries from jobs in their neighborhood. Local credibility beats corporate scale.',
  },
  {
    question: 'Can you help me get more roofing reviews on Google?',
    answer: 'Yes. After every completed job, we trigger an automated review request via text with a direct link to your Google profile. Roofing reviews are especially powerful because the investment is large — homeowners spend more time reading reviews before calling a roofer than almost any other trade.',
  },
  {
    question: 'Is there a contract?',
    answer: 'No. AP Digital works month-to-month. No lock-in contracts, no cancellation fees. 90-day performance guarantee included.',
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    founderSchema,
    getServiceSchema('Roofer Marketing', DESC, '/roofer-marketing'),
    getFAQSchema(faqs),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Trades Marketing', url: '/trades-marketing' },
      { name: 'Roofer Marketing', url: '/roofer-marketing' },
    ]),
    getWebPageSchema(TITLE, DESC, '/roofer-marketing'),
  ]
};

const RooferMarketing = () => (
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
    </Helmet>
    <JsonLd data={structuredData} />
    <Header />
    <main id="main-content" className="pt-24 pb-16">
      <div className="container-custom max-w-4xl">
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8">
          Roofer Marketing — Get More Roofing Jobs with Google Ads
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          BC's rainy season means roofing searches spike every fall. AP Digital builds booked-estimate systems for Metro Vancouver roofing companies using Google Ads, Local Service Ads, storm-response campaigns, and Google Business Profile optimization.
        </p>

        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="font-bold text-foreground mb-1">Highest job values in trades</p>
            <p className="text-sm text-muted-foreground">Average roof replacement: $8K–$25K. Even at $65/lead, a single closed job can return 100x+ your ad spend. No other trade has this ratio.</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="font-bold text-foreground mb-1">Storm-response campaigns</p>
            <p className="text-sm text-muted-foreground">When windstorms hit Metro Vancouver, we activate pre-built campaigns within 24 hours. Storm events create 3–5x search volume and urgent buyers.</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="font-bold text-foreground mb-1">90-day guarantee</p>
            <p className="text-sm text-muted-foreground">No contracts. If we don't deliver qualified roofing leads in 90 days, you don't pay. Month-to-month, always.</p>
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

        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">Results Our Roofing Clients See</h2>
        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          {results.map((r) => (
            <div key={r.label} className="bg-card border border-border rounded-xl p-6 text-center">
              <r.icon className="w-8 h-8 text-teal mx-auto mb-3" />
              <div className="font-display text-3xl font-bold text-teal mb-2">{r.stat}</div>
              <p className="text-muted-foreground text-sm">{r.label}</p>
            </div>
          ))}
        </div>

        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">BC Roofing Market: What You're Competing For</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            Metro Vancouver's climate is a roofer's best friend and worst enemy. The October-to-March rainy season drives consistent demand for repairs and replacements, but it also compresses the peak installation window into spring and summer. Roofers who capture leads year-round — repairs in winter, replacements in summer — maintain steady revenue instead of feast-or-famine cycles.
          </p>
          <p className="mb-4">
            Roofing has the highest average job value of any residential trade. A full re-roof in Metro Vancouver runs $8K–$25K depending on size and material. That means even at higher cost-per-lead ($50–$80), closing one job covers months of ad spend. The roofers who win are the ones showing up consistently in Google Search and Local Service Ads.
          </p>
          <p>
            Our roofing clients see an average 12x ROAS with $65/qualified lead. The key differentiator is storm-response campaigns — pre-built ad sets we activate within 24 hours of major weather events, capturing the surge of "roof leak emergency" and "storm damage repair" searches before your competitors react.
          </p>
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

        <div className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">Related Pages</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link to="/trades-marketing" className="bg-card border border-border rounded-xl p-5 hover:border-teal/50 transition-colors">
              <p className="font-bold text-foreground">Trades & Contractor Marketing</p>
              <p className="text-sm text-muted-foreground">Our full trades marketing program for all contractor types.</p>
            </Link>
            <Link to="/plumber-marketing" className="bg-card border border-border rounded-xl p-5 hover:border-teal/50 transition-colors">
              <p className="font-bold text-foreground">Plumber Marketing</p>
              <p className="text-sm text-muted-foreground">Google Ads & lead gen for plumbing companies in BC.</p>
            </Link>
            <Link to="/electrician-marketing" className="bg-card border border-border rounded-xl p-5 hover:border-teal/50 transition-colors">
              <p className="font-bold text-foreground">Electrician Marketing</p>
              <p className="text-sm text-muted-foreground">Lead generation for BC electricians.</p>
            </Link>
            <Link to="/hvac-marketing" className="bg-card border border-border rounded-xl p-5 hover:border-teal/50 transition-colors">
              <p className="font-bold text-foreground">HVAC Marketing</p>
              <p className="text-sm text-muted-foreground">Lead generation for HVAC companies in Metro Vancouver.</p>
            </Link>
          </div>
        </div>

        <OurServices />

        <div className="mt-16 mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">Cities We Serve</h2>
          <p className="text-muted-foreground mb-6">We help roofing companies across Metro Vancouver and the Fraser Valley.</p>
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

        <section className="bg-card border border-border rounded-2xl p-8 md:p-12 text-center mt-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">Ready to Get More Roofing Jobs?</h2>
          <p className="text-muted-foreground text-lg mb-8">Book your free strategy call and we'll show you how many roofing searches are happening in your area right now.</p>
          <Button asChild size="lg" className="bg-teal hover:bg-teal/90 text-white">
            <a href="https://calendly.com/apdigital-core/20min" target="_blank" rel="noopener noreferrer">Book Your Free Strategy Call</a>
          </Button>
        </section>
      </div>
    </main>
    <Footer />
  </>
);

export default RooferMarketing;
