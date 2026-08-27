import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, Search, Share2, ShieldCheck } from 'lucide-react';
import OurServices from '@/components/OurServices';
import { getServiceSchema, getBreadcrumbSchema, getFAQSchema, getWebPageSchema, founderSchema } from '@/lib/structuredData';
import JsonLd from '@/components/JsonLd';
import FaqLight from '@/components/light/FaqLight';
import PastelCTA from '@/components/light/PastelCTA';

const TITLE = 'HVAC Marketing Vancouver | More Service Calls | AP Digital';
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
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground leading-[1.05] tracking-tight mb-8">
          HVAC Marketing — Get More Service Calls with Google Ads
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          When a furnace dies at midnight, homeowners Google it. We make sure your company is the first call they make — not your competitor's.
        </p>

        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">Emergency searches convert</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">"Furnace repair near me" has a 60%+ call rate. These aren't browsers — they need help now and they'll hire the first company that answers.</p>
          </div>
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">High job values</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">A furnace install is $5K–$15K. High job values make HVAC one of the most profitable verticals for paid ads.</p>
          </div>
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">90-day guarantee</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">No contracts. If we don't deliver service calls in 90 days, you don't pay. We only win when your phones ring.</p>
          </div>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-6">What You Get</h2>
        <ul className="grid sm:grid-cols-2 gap-4 mb-16">
          {included.map((item) => (
            <li key={item} className="flex items-start gap-3 text-foreground">
              <CheckCircle className="w-5 h-5 text-foreground mt-0.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-8">What Sets Us Apart</h2>
        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          {results.map((r) => (
            <div key={r.label} className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-7 text-center">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
              <r.icon className="reveal-ink relative z-10 w-8 h-8 text-foreground mx-auto mb-3" />
              <div className="reveal-ink relative z-10 font-serif text-3xl font-medium text-foreground mb-2">{r.stat}</div>
              <p className="reveal-body relative z-10 text-muted-foreground text-sm">{r.label}</p>
            </div>
          ))}
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">Why Google Ads Dominates for HVAC</h2>
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

        <FaqLight faqs={faqs} />

        <OurServices />

        <div className="mt-16 mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-6">Cities We Serve</h2>
          <p className="text-muted-foreground mb-6">We help HVAC companies across Metro Vancouver and the Fraser Valley. See <Link to="/pricing" className="text-foreground underline underline-offset-4 hover:text-foreground/70">pricing</Link> or browse <Link to="/case-studies" className="text-foreground underline underline-offset-4 hover:text-foreground/70">how we work</Link>.</p>
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
              <Link key={href} to={href} className="bg-white elev-1 hover:elev-2 hover:-translate-y-0.5 rounded-2xl p-4 text-center transition-all duration-300">
                <span className="font-medium text-foreground">{city}</span>
              </Link>
            ))}
          </div>
        </div>

        <PastelCTA />
      </div>
    </main>
    <Footer />
  </>
);

export default HVACMarketing;
