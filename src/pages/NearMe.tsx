import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, MapPin } from 'lucide-react';
import OurServices from '@/components/OurServices';
import IndustriesWeServe from '@/components/IndustriesWeServe';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { getServiceSchema, getBreadcrumbSchema, getFAQSchema, getWebPageSchema, founderSchema } from '@/lib/structuredData';
import JsonLd from '@/components/JsonLd';

const TITLE = 'Digital Marketing Agency Near Me | BC Local Ads | AP Digital';
const DESC = 'Looking for a digital marketing agency near you in BC? AP Digital runs Google Ads & Meta Ads for trades, salons, realtors & coaches across Metro Vancouver. No contracts.';
const CANONICAL = 'https://ap-digital.ca/digital-marketing-near-me';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const included = [
  'Google Ads targeting your exact service area',
  'Meta Ads reaching homeowners & clients nearby',
  'Google Business Profile optimization',
  'Review generation & reputation management',
  'Landing pages built to convert local leads',
  'Monthly reporting with lead tracking',
  'Local SEO for Google Maps visibility',
  'No contracts — month-to-month',
];

const cities = [
  { name: 'Vancouver', href: '/vancouver' },
  { name: 'Surrey', href: '/surrey' },
  { name: 'Burnaby', href: '/burnaby' },
  { name: 'Richmond', href: '/richmond' },
  { name: 'Langley', href: '/langley' },
  { name: 'Coquitlam', href: '/coquitlam' },
  { name: 'Abbotsford', href: '/abbotsford' },
];

const faqs = [
  {
    question: 'How do I find a good digital marketing agency near me?',
    answer: 'Look for an agency that specializes in your industry, works month-to-month (no long contracts), and can show real client results. AP Digital works exclusively with local BC businesses — trades, salons, realtors, and coaches — so every campaign is built for your market.',
  },
  {
    question: 'Do you only work with businesses in Vancouver?',
    answer: 'No. We serve businesses across all of Metro Vancouver and the Fraser Valley — Vancouver, Surrey, Burnaby, Richmond, Langley, Coquitlam, Abbotsford, and surrounding areas. Your ads target the exact neighbourhoods where your customers live.',
  },
  {
    question: 'How much does local digital marketing cost in BC?',
    answer: 'Most clients start with $500–$1,500/month in ad spend plus a management fee that\'s quoted upfront. No hidden costs, no setup fees. You always know exactly what you\'re paying before anything goes live.',
  },
  {
    question: 'How quickly will I start getting leads?',
    answer: 'Most businesses see their first qualified leads within 2 weeks. Google Ads for high-intent searches (like "plumber near me" or "hair salon near me") can produce calls within days. Meta Ads typically ramp up by week 3 as the algorithm learns your audience.',
  },
  {
    question: 'Is there a contract or commitment?',
    answer: 'No. AP Digital works month-to-month with every client. No lock-in, no cancellation fees. You stay because the leads keep coming — not because a contract says you have to.',
  },
  {
    question: 'What makes AP Digital different from other local agencies?',
    answer: 'The founder, Arjun Sharma, personally manages every account — no outsourcing, no junior staff. We also specialize in four industries (trades, salons, real estate, coaching), so your campaigns use proven playbooks, not guesswork.',
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    founderSchema,
    getServiceSchema('Digital Marketing Near Me', DESC, '/digital-marketing-near-me'),
    getFAQSchema(faqs),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Digital Marketing Near Me', url: '/digital-marketing-near-me' },
    ]),
    getWebPageSchema(TITLE, DESC, '/digital-marketing-near-me'),
    {
      "@type": "LocalBusiness",
      "@id": "https://ap-digital.ca/digital-marketing-near-me",
      "name": "AP Digital — Local Performance Marketing Agency",
      "description": DESC,
      "url": "https://ap-digital.ca/digital-marketing-near-me",
      "telephone": "+1-778-682-5772",
      "email": "apdigital.core@gmail.com",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Vancouver",
        "addressRegion": "BC",
        "postalCode": "V6B 2W9",
        "addressCountry": "CA"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 49.2827,
        "longitude": -123.1207
      },
      "areaServed": [
        { "@type": "City", "name": "Vancouver" },
        { "@type": "City", "name": "Surrey" },
        { "@type": "City", "name": "Burnaby" },
        { "@type": "City", "name": "Richmond" },
        { "@type": "City", "name": "Langley" },
        { "@type": "City", "name": "Coquitlam" },
        { "@type": "City", "name": "Abbotsford" }
      ],
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    }
  ]
};

const NearMe = () => (
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
          Performance Marketing Agency Near You — Metro Vancouver & Fraser Valley
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          You searched for a digital marketing agency near you — and you found one that actually specializes in local businesses. AP Digital runs Google Ads, Meta Ads, and local SEO for trades, salons, realtors, and coaches across BC.
        </p>

        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="font-bold text-foreground mb-1">Your neighbourhood, your ads</p>
            <p className="text-sm text-muted-foreground">We target the exact postal codes and cities where your customers live — not the whole province.</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="font-bold text-foreground mb-1">Local business expertise</p>
            <p className="text-sm text-muted-foreground">We only work with service businesses in BC — trades, salons, realtors, and coaches. Your campaigns use proven playbooks.</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="font-bold text-foreground mb-1">No contract required</p>
            <p className="text-sm text-muted-foreground">Month-to-month. If we're not delivering leads, you can leave any time — no fees, no hassle.</p>
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

        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">Cities We Serve</h2>
        <p className="text-muted-foreground mb-6">
          We run campaigns for local businesses across Metro Vancouver and the Fraser Valley. Click your city to see how we help businesses in your area.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-16">
          {cities.map(({ name, href }) => (
            <Link key={href} to={href} className="bg-card border border-border rounded-xl p-4 text-center hover:border-teal/50 transition-colors flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4 text-teal shrink-0" />
              <span className="font-medium text-foreground">{name}</span>
            </Link>
          ))}
        </div>

        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">Industries We Specialize In</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          <Link to="/trades-marketing" className="bg-card border border-border rounded-xl p-5 hover:border-teal/50 transition-colors">
            <p className="font-bold text-foreground">Trades & Home Services</p>
            <p className="text-sm text-muted-foreground">Plumbers, electricians, HVAC, roofers</p>
          </Link>
          <Link to="/salon-marketing" className="bg-card border border-border rounded-xl p-5 hover:border-teal/50 transition-colors">
            <p className="font-bold text-foreground">Salons & Beauty</p>
            <p className="text-sm text-muted-foreground">Hair salons, spas, aesthetics</p>
          </Link>
          <Link to="/real-estate-marketing" className="bg-card border border-border rounded-xl p-5 hover:border-teal/50 transition-colors">
            <p className="font-bold text-foreground">Real Estate</p>
            <p className="text-sm text-muted-foreground">Agents, teams, brokerages</p>
          </Link>
          <Link to="/coaching-marketing" className="bg-card border border-border rounded-xl p-5 hover:border-teal/50 transition-colors">
            <p className="font-bold text-foreground">Coaches & Consultants</p>
            <p className="text-sm text-muted-foreground">Life coaches, business coaches</p>
          </Link>
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
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">Ready to Grow Your Local Business?</h2>
          <p className="text-muted-foreground text-lg mb-8">Book a free strategy call and find out how we can fill your calendar with qualified local leads.</p>
          <Button asChild size="lg" className="bg-teal hover:bg-teal/90 text-white">
            <Link to="/book">Book Your Free Strategy Call</Link>
          </Button>
        </section>
      </div>
    </main>
    <Footer />
  </>
);

export default NearMe;
