import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, Search, Share2, ShieldCheck } from 'lucide-react';
import OurServices from '@/components/OurServices';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { getServiceSchema, getBreadcrumbSchema, getFAQSchema, getWebPageSchema, founderSchema } from '@/lib/structuredData';
import JsonLd from '@/components/JsonLd';

const TITLE = 'Plumber Marketing Vancouver | Get More Service Calls | AP Digital';
const DESC = 'Plumber marketing with Google Ads & Local SEO for Metro Vancouver. Month-to-month. No contracts. 90-day guarantee.';
const CANONICAL = 'https://ap-digital.ca/plumber-marketing';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const included = [
  'Google Search Ads for "plumber near me," "drain cleaning," & emergency keywords',
  'Local Service Ads (LSA) setup with Google Guaranteed badge',
  'Google Business Profile optimization & weekly review generation',
  'Call tracking with recorded calls so you know which ads drive jobs',
  'Landing pages built for phone calls, not form fills',
  'Seasonal campaigns: frozen pipes in winter, drain clearing in spring',
  'Monthly reporting tied to booked jobs, not just clicks',
  'Competitor keyword monitoring across your service area',
];

const results = [
  { icon: Search, stat: 'Google Ads', label: 'Search campaigns targeting plumbing keywords' },
  { icon: Share2, stat: 'No Contract', label: 'Month-to-month, cancel anytime' },
  { icon: ShieldCheck, stat: '90-Day', label: 'Performance guarantee included' },
];

const faqs = [
  {
    question: 'How much do Google Ads cost for plumbers in Metro Vancouver?',
    answer: 'Most plumbing companies invest $1,000–$2,500/month in ad spend plus a $759/month management fee. Plumbing keywords like "plumber near me" cost $8–$25 per click in Metro Vancouver, but the average service call is worth $200–$800 — making the ROI excellent. Emergency keywords convert fastest and have the highest value per call.',
  },
  {
    question: 'How fast will I get calls from Google Ads?',
    answer: 'Most plumbers see their first inbound calls within 48 hours of launching Google Ads. Emergency plumbing searches ("burst pipe," "clogged drain," "no hot water") convert immediately because the caller needs help right now. We typically see 3–5 calls per day within the first two weeks.',
  },
  {
    question: 'Should plumbers use Google Ads or Local Service Ads?',
    answer: 'Both. Local Service Ads (LSAs) appear at the very top of Google with a "Google Guaranteed" badge and you only pay per verified lead. Standard Google Search Ads capture the rest of the first page. Running both means you dominate the search results for plumbing queries in your area.',
  },
  {
    question: 'How do I compete with big plumbing companies like Mr. Rooter?',
    answer: 'You don\'t need to outspend franchise operations. We geo-target your ads to your specific service area, focus on emergency and high-intent keywords where local plumbers win, and build your Google reviews to establish trust. Most homeowners prefer a local plumber over a franchise when the reviews are strong.',
  },
  {
    question: 'What plumbing keywords should I target in BC?',
    answer: 'We target a mix of emergency keywords ("emergency plumber [city]," "burst pipe repair"), service keywords ("drain cleaning," "water heater installation," "sewer line repair"), and location keywords ("plumber Surrey," "plumber Burnaby"). We also add negative keywords to block searches for DIY plumbing, plumbing jobs, and plumbing supplies.',
  },
  {
    question: 'Can you help my plumbing company get more Google reviews?',
    answer: 'Yes. We set up an automated review request system that texts customers after every completed job with a direct link to your Google Business Profile. More 5-star reviews improve your Local Pack ranking and make your ads convert better — it\'s the single highest-leverage thing a plumber can do for online visibility.',
  },
  {
    question: 'Do you work with plumbers outside Vancouver?',
    answer: 'Yes. We serve plumbing companies across Metro Vancouver and the Fraser Valley — Surrey, Burnaby, Richmond, Langley, Coquitlam, Abbotsford, Maple Ridge, and beyond. We adjust keyword targeting and ad copy for each service area.',
  },
  {
    question: 'Is there a contract?',
    answer: 'No. AP Digital works month-to-month with all plumbing clients. No lock-in contracts, no cancellation fees. We also offer a 90-day performance guarantee — if we don\'t deliver service calls, you don\'t pay.',
  },
  {
    question: 'How do I find a plumber marketing agency near me?',
    answer: 'AP Digital runs plumber marketing campaigns across Metro Vancouver and the Fraser Valley — Vancouver, Surrey, Burnaby, Richmond, Langley, Coquitlam, and Abbotsford. We specialize in Google Ads for emergency plumbing searches and Meta Ads for routine service work.',
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    founderSchema,
    getServiceSchema('Plumber Marketing', DESC, '/plumber-marketing'),
    getFAQSchema(faqs),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Trades Marketing', url: '/trades-marketing' },
      { name: 'Plumber Marketing', url: '/plumber-marketing' },
    ]),
    getWebPageSchema(TITLE, DESC, '/plumber-marketing'),
  ]
};

const PlumberMarketing = () => (
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
          Plumber Marketing — Get More Service Calls with Google Ads
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          When a pipe bursts at 2am, homeowners Google it. We make sure your plumbing company is the first call they make — not your competitor's. AP Digital builds booked-estimate systems for BC plumbers using Google Ads, Local Service Ads, and Google Business Profile optimization.
        </p>

        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="font-bold text-foreground mb-1">Emergency searches = instant calls</p>
            <p className="text-sm text-muted-foreground">"Plumber near me" has a 50%+ call rate in Metro Vancouver. These are homeowners with water on their floor — they call the first company they find.</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="font-bold text-foreground mb-1">High job values</p>
            <p className="text-sm text-muted-foreground">The average plumbing service call is $200–$800. Drain cleaning, water heater replacement, and re-pipes can be $2K–$15K. The math works in your favour.</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="font-bold text-foreground mb-1">90-day guarantee</p>
            <p className="text-sm text-muted-foreground">No contracts. If we don't deliver booked service calls in 90 days, you don't pay. We only win when your phone rings with real jobs.</p>
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

        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">What Sets Us Apart</h2>
        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          {results.map((r) => (
            <div key={r.label} className="bg-card border border-border rounded-xl p-6 text-center">
              <r.icon className="w-8 h-8 text-teal mx-auto mb-3" />
              <div className="font-display text-3xl font-bold text-teal mb-2">{r.stat}</div>
              <p className="text-muted-foreground text-sm">{r.label}</p>
            </div>
          ))}
        </div>

        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">BC Plumbing Market: What You're Competing For</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            Metro Vancouver has 800+ licensed plumbing companies competing for the same homeowner searches. The plumbers who show up first on Google — both in Local Service Ads and Search Ads — capture 70% of the calls. Everyone else fights for referrals and HomeStars scraps.
          </p>
          <p className="mb-4">
            The BC plumbing market has clear seasonal patterns: frozen pipe emergencies spike from November to February, drain cleaning peaks in spring after winter debris, and water heater replacements are year-round. We build campaigns that match these cycles so your budget tracks real demand.
          </p>
          <p>
            The key is targeting emergency and high-intent keywords, not broad terms like "plumber" — and tracking all the way to booked estimates, not just form fills.
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
            <Link to="/hvac-marketing" className="bg-card border border-border rounded-xl p-5 hover:border-teal/50 transition-colors">
              <p className="font-bold text-foreground">HVAC Marketing</p>
              <p className="text-sm text-muted-foreground">Google Ads & lead gen for HVAC companies in BC.</p>
            </Link>
            <Link to="/electrician-marketing" className="bg-card border border-border rounded-xl p-5 hover:border-teal/50 transition-colors">
              <p className="font-bold text-foreground">Electrician Marketing</p>
              <p className="text-sm text-muted-foreground">Lead generation for BC electricians.</p>
            </Link>
            <Link to="/roofer-marketing" className="bg-card border border-border rounded-xl p-5 hover:border-teal/50 transition-colors">
              <p className="font-bold text-foreground">Roofer Marketing</p>
              <p className="text-sm text-muted-foreground">Google Ads for roofing companies in Metro Vancouver.</p>
            </Link>
          </div>
        </div>

        <OurServices />

        <div className="mt-16 mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">Cities We Serve</h2>
          <p className="text-muted-foreground mb-6">We help plumbing companies across Metro Vancouver and the Fraser Valley.</p>
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
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">Ready to Get More Service Calls?</h2>
          <p className="text-muted-foreground text-lg mb-8">Book your free strategy call and we'll show you how many plumbing searches are happening in your area right now.</p>
          <Button asChild size="lg" className="bg-teal hover:bg-teal/90 text-white">
            <a href="https://calendly.com/apdigital-core/20min" target="_blank" rel="noopener noreferrer">Book Your Free Strategy Call</a>
          </Button>
        </section>
      </div>
    </main>
    <Footer />
  </>
);

export default PlumberMarketing;
