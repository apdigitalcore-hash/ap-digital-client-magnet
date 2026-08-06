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

const TITLE = 'HVAC Marketing Vancouver | Get More Service Calls | AP Digital';
const DESC = 'HVAC marketing with Google Ads & Local SEO for Metro Vancouver. Month-to-month. No contracts. 90-day guarantee.';
const CANONICAL = 'https://ap-digital.ca/hvac-marketing';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const included = [
  'Google Ads for "furnace repair," "AC installation," & emergency searches',
  'Google Business Profile optimization & review generation',
  'Call tracking with recorded calls for quality assurance',
  'Landing pages built for phone call conversions',
  'Local Service Ads (LSA) setup & management',
  'Monthly performance reporting & bid optimization',
  'Seasonal campaign adjustments (heating vs. cooling)',
  'Competitor monitoring & ad positioning',
];

const results = [
  { icon: Search, stat: 'Google Ads', label: 'Search campaigns for HVAC keywords' },
  { icon: Share2, stat: 'No Contract', label: 'Month-to-month, cancel anytime' },
  { icon: ShieldCheck, stat: '90-Day', label: 'Performance guarantee included' },
];

const faqs = [
  {
    question: 'How do I get more HVAC leads in Vancouver?',
    answer: 'Google Ads and Local Service Ads are the fastest channels. When someone\'s furnace breaks at 11pm, they Google "emergency furnace repair near me." AP Digital runs campaigns that put your company at the top of those searches.',
  },
  {
    question: 'How much does HVAC marketing cost?',
    answer: 'Most HVAC companies start with $1,500–$3,000/month in ad spend plus a management fee starting at $759/month. HVAC has higher cost-per-click than other trades, but the average job value ($500–$15,000) makes the ROI exceptional.',
  },
  {
    question: 'How fast will I get new HVAC service calls from ads?',
    answer: 'Google Ads generates calls within 48 hours of launch. Most HVAC clients see 3–5 calls per day within the first two weeks. Emergency searches ("no heat," "AC not working") convert fastest because the caller needs help immediately.',
  },
  {
    question: 'Should I use Google Ads or Local Service Ads for HVAC?',
    answer: 'Both. Local Service Ads (LSAs) appear at the very top of Google with a "Google Guaranteed" badge and you only pay per lead, not per click. Standard Google Ads cover the broader search results. We run both simultaneously to dominate the entire first page.',
  },
  {
    question: 'How do I compete with bigger HVAC companies on Google?',
    answer: 'You don\'t need to outspend them — you need to out-target them. We focus your budget on high-intent emergency searches in your specific service area, optimize your Google Business Profile for local visibility, and build a review strategy that makes your company the obvious choice.',
  },
  {
    question: 'Do seasonal changes affect HVAC marketing?',
    answer: 'Yes. We adjust campaigns seasonally — furnace and heating keywords in fall/winter, AC and cooling keywords in spring/summer. We also ramp up budgets during peak demand periods and scale back during shoulder seasons to maximize your ROI year-round.',
  },
  {
    question: 'Is there a contract for HVAC marketing?',
    answer: 'No. AP Digital works month-to-month. No lock-in contracts, no cancellation fees. We also offer a 90-day performance guarantee — if you don\'t see results, you don\'t pay.',
  },
  {
    question: 'Can you help my HVAC company rank on Google Maps?',
    answer: 'Yes. We optimize your Google Business Profile with service categories, photos of your team and trucks, response to every review, and consistent NAP (name, address, phone) across all directories. Combined with Google Ads, this gets you into the Maps 3-pack for HVAC searches in your area.',
  },
  {
    question: 'How do I find an HVAC marketing agency near me?',
    answer: 'AP Digital runs HVAC marketing campaigns across Metro Vancouver and the Fraser Valley. We target seasonal searches like "AC repair near me" and "furnace installation" with Google Ads, plus homeowner awareness campaigns on Meta. No contracts.',
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    founderSchema,
    getServiceSchema('HVAC Marketing', DESC, '/hvac-marketing'),
    getFAQSchema(faqs),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'HVAC Marketing', url: '/hvac-marketing' },
    ]),
    getWebPageSchema(TITLE, DESC, '/hvac-marketing'),
  ]
};

const HVACMarketing = () => (
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
          HVAC Marketing — Get More Service Calls with Google Ads
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          When a furnace dies at midnight, homeowners Google it. We make sure your company is the first call they make — not your competitor's.
        </p>

        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="font-bold text-foreground mb-1">Emergency searches convert</p>
            <p className="text-sm text-muted-foreground">"Furnace repair near me" has a 60%+ call rate. These aren't browsers — they need help now and they'll hire the first company that answers.</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="font-bold text-foreground mb-1">High job values</p>
            <p className="text-sm text-muted-foreground">A furnace install is $5K–$15K. High job values make HVAC one of the most profitable verticals for paid ads.</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="font-bold text-foreground mb-1">90-day guarantee</p>
            <p className="text-sm text-muted-foreground">No contracts. If we don't deliver service calls in 90 days, you don't pay. We only win when your phones ring.</p>
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

        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">Why Google Ads Dominates for HVAC</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            HVAC is a search-first industry. Nobody scrolls Instagram looking for a furnace repair company. They Google it — and they call the first company they see. That's why Google Ads and Local Service Ads are the highest-ROI channels for HVAC.
          </p>
          <p className="mb-4">
            The math is simple: if a furnace installation is worth $8,000 and you're paying $30 per lead with a 25% close rate, your cost to acquire that job is $120. That's a 66x return. No other marketing channel comes close.
          </p>
          <p>
            We also run seasonal campaigns — heating-focused keywords from October to March, cooling from April to September — so your budget tracks demand and you're never paying for clicks that don't convert.
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

        <OurServices />

        <div className="mt-16 mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">Cities We Serve</h2>
          <p className="text-muted-foreground mb-6">We help HVAC companies across Metro Vancouver and the Fraser Valley. See our <Link to="/pricing" className="text-teal underline hover:text-teal/80">pricing</Link> or browse <Link to="/case-studies" className="text-teal underline hover:text-teal/80">client results</Link>.</p>
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
          <p className="text-muted-foreground text-lg mb-8">Book your free strategy call and we'll show you how many HVAC searches are happening in your area right now.</p>
          <Button asChild size="lg" className="bg-teal hover:bg-teal/90 text-white">
            <a href="https://calendly.com/apdigital-core/20min" target="_blank" rel="noopener noreferrer">Book Your Free Strategy Call</a>
          </Button>
        </section>
      </div>
    </main>
    <Footer />
  </>
);

export default HVACMarketing;
