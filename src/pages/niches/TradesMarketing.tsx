import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, TrendingUp, Phone, Star } from 'lucide-react';
import OurServices from '@/components/OurServices';
import { getServiceSchema, getBreadcrumbSchema, getFAQSchema, getWebPageSchema, founderSchema } from '@/lib/structuredData';
import JsonLd from '@/components/JsonLd';
import FaqLight from '@/components/light/FaqLight';
import PastelCTA from '@/components/light/PastelCTA';
import InlineCTA from '@/components/light/InlineCTA';

const TITLE = 'Trades Marketing BC — Contractor Leads | AP Digital';
const DESC = 'AP Digital runs Google & Meta Ads for BC plumbers, electricians, HVAC companies & roofers. No contracts. Starts at $500/month.';
const CANONICAL = 'https://ap-digital.ca/trades-marketing';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const included = [
  'Google Ads campaigns for local service searches',
  'Facebook & Instagram ads targeting homeowners',
  'Google Business Profile optimization & management',
  'Review generation & reputation management',
  'Before-and-after project content creation',
  'Landing pages built to convert job inquiries',
  'Monthly lead tracking & ROI reporting',
  'Local SEO to rank in your service area',
];

const results = [
  { icon: TrendingUp, stat: 'Google Ads', label: 'High-intent search campaigns for emergency & service calls' },
  { icon: Phone, stat: 'Meta Ads', label: 'Homeowner targeting for routine jobs & seasonal work' },
  { icon: Star, stat: 'No Contract', label: 'Month-to-month with 90-day results guarantee' },
];

const faqs = [
  {
    question: 'How quickly will I get leads as a trades business in BC?',
    answer: 'Most trades businesses in Metro Vancouver see their first qualified leads within 2 weeks of launching. Google Ads for emergency searches (plumber near me, HVAC repair) can produce calls within days. Meta Ads typically ramp up by week 3.',
  },
  {
    question: 'Is there a contract for trades marketing?',
    answer: 'No. AP Digital works month-to-month with all trades clients — plumbers, electricians, HVAC techs, roofers, and landscapers. No lock-in, no cancellation fees. You stay because the leads keep coming.',
  },
  {
    question: 'How much does trades marketing cost in BC?',
    answer: 'Most BC contractors start with $800–$1,500/month in ad spend plus a $759/month management fee. This covers Google Ads, Meta Ads, creative testing, and weekly reporting. Cost per lead typically ranges from $15–$40 depending on the trade.',
  },
  {
    question: 'Should my trades business use Google Ads or Facebook Ads?',
    answer: 'Both work, but for different reasons. Google Ads captures emergency and high-intent searches — someone whose pipe just burst is Googling, not scrolling Facebook. Meta Ads build awareness and generate leads from homeowners who need routine work. Most trades businesses get the best results running both.',
  },
  {
    question: 'Do you work with plumbers, electricians, and HVAC companies in Vancouver?',
    answer: 'Yes. We specialize in trades businesses across Metro Vancouver including plumbers, electricians, HVAC technicians, roofers, landscapers, and general contractors. We have proven playbooks for each trade that generate consistent leads.',
  },
  {
    question: 'How do I get my trades business to show up on Google?',
    answer: 'We run Google Search Ads targeting high-intent keywords specific to your trade and service area. We also optimize your Google Business Profile for local pack visibility, help generate reviews, and ensure your NAP (name, address, phone) is consistent across directories.',
  },
  {
    question: 'Can you help my trades business get more reviews?',
    answer: 'Yes. We set up automated review request sequences that go out after every completed job. More 5-star Google reviews improve your local search ranking and build trust with potential customers searching for contractors in their area.',
  },
  {
    question: 'How do I find a trades marketing agency near me in BC?',
    answer: 'AP Digital specializes in marketing for trades businesses across Metro Vancouver and the Fraser Valley. We serve plumbers, electricians, HVAC techs, roofers, and contractors in Vancouver, Surrey, Burnaby, Richmond, Langley, Coquitlam, and Abbotsford. No contracts, month-to-month.',
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    founderSchema,
    getServiceSchema('Trades Marketing', DESC, '/trades-marketing'),
    getFAQSchema(faqs),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Trades Marketing', url: '/trades-marketing' },
    ]),
    getWebPageSchema(TITLE, DESC, '/trades-marketing'),
  ]
};

const TradesMarketing = () => (
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
          Trades &amp; Contractor Leads in Metro Vancouver
        </h1>

        {/* Short intro */}
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          When a pipe bursts, people Google. We make sure they find you first — and that your phone keeps ringing year-round.
        </p>

        <InlineCTA context="trades business" />

        {/* 3-column why strip */}
        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">Google Ads for high-intent searches</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">Capture people searching 'plumber near me' or 'HVAC Vancouver' right when they're ready to book.</p>
          </div>
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">Local SEO that sticks</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">We get you into the Google Maps pack — where 40%+ of local clicks go — and keep you there.</p>
          </div>
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">No contract, no risk</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">Month-to-month. If the phone isn't ringing more within 30 days, you pay nothing.</p>
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

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-8">Results Our Trades Clients See</h2>
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

        <FaqLight faqs={faqs} />

        <div className="mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">Marketing by Trade</h2>
          <p className="text-muted-foreground mb-6">We build trade-specific campaigns with keyword targeting, ad copy, and benchmarks tuned to each vertical.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/plumber-marketing" className="bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl p-6 transition-all duration-300">
              <p className="font-bold text-foreground">Plumber Marketing</p>
              <p className="reveal-body relative z-10 text-sm text-muted-foreground">Emergency & service call campaigns across BC</p>
            </Link>
            <Link to="/electrician-marketing" className="bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl p-6 transition-all duration-300">
              <p className="font-bold text-foreground">Electrician Marketing</p>
              <p className="reveal-body relative z-10 text-sm text-muted-foreground">Residential & commercial lead generation</p>
            </Link>
            <Link to="/hvac-marketing" className="bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl p-6 transition-all duration-300">
              <p className="font-bold text-foreground">HVAC Marketing</p>
              <p className="reveal-body relative z-10 text-sm text-muted-foreground">Seasonal campaigns for heating & cooling</p>
            </Link>
            <Link to="/roofer-marketing" className="bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl p-6 transition-all duration-300">
              <p className="font-bold text-foreground">Roofer Marketing</p>
              <p className="reveal-body relative z-10 text-sm text-muted-foreground">Storm-response & re-roofing lead campaigns</p>
            </Link>
            <Link to="/contractor-marketing" className="bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl p-6 transition-all duration-300">
              <p className="font-bold text-foreground">General Contractor Marketing</p>
              <p className="reveal-body relative z-10 text-sm text-muted-foreground">Renovation & new build lead generation</p>
            </Link>
          </div>
        </div>

        <OurServices />

        <div className="mt-16 mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-6">Cities We Serve</h2>
          <p className="text-muted-foreground mb-6">We help trades businesses across Metro Vancouver and the Fraser Valley. See <Link to="/pricing" className="text-foreground underline underline-offset-4 hover:text-foreground/70">pricing</Link> or browse <Link to="/case-studies" className="text-foreground underline underline-offset-4 hover:text-foreground/70">how we work</Link>.</p>
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

export default TradesMarketing;
