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
import InlineCTA from '@/components/light/InlineCTA';

const TITLE = 'Electrician Marketing Vancouver — Jobs | AP Digital';
const DESC = 'Electrician marketing with Google Ads & Local SEO for Metro Vancouver. Month-to-month. No contracts. 90-day guarantee.';
const CANONICAL = 'https://ap-digital.ca/electrician-marketing';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const included = [
  'Google Search Ads for "electrician near me," "panel upgrade," & emergency keywords',
  'Local Service Ads (LSA) setup with Google Guaranteed badge',
  'Google Business Profile optimization with service categories & photos',
  'Call tracking tied to booked estimates, not just inquiries',
  'Landing pages built for residential & commercial electricians',
  'EV charger installation campaign (fastest-growing keyword in BC)',
  'Monthly reporting with cost-per-booked-job metrics',
  'Negative keyword management to block DIY & job-seeker traffic',
];

const results = [
  { icon: Search, stat: 'Google Ads', label: 'Search campaigns for electrical keywords' },
  { icon: Share2, stat: 'No Contract', label: 'Month-to-month, cancel anytime' },
  { icon: ShieldCheck, stat: '90-Day', label: 'Performance guarantee included' },
];

const faqs = [
  {
    question: 'How much do Google Ads cost for electricians in BC?',
    answer: 'Most electrical companies invest $1,000–$2,000/month in ad spend plus a $759/month management fee. Electrical keywords cost $10–$30 per click in Metro Vancouver. With average job values of $300–$5,000+ (panel upgrades, EV charger installs, rewiring), the ROI is strong even at higher click costs.',
  },
  {
    question: 'What electrical services get the most searches in Vancouver?',
    answer: 'Panel upgrades and electrical panel replacement are the highest-volume searches, followed by EV charger installation (up 140% year-over-year in BC), emergency electrician services, outlet and switch installation, and commercial electrical work. We build separate ad groups for each service to maximize relevance.',
  },
  {
    question: 'How fast will I get leads from Google Ads?',
    answer: 'Emergency electrical searches generate calls within 24–48 hours. Service keywords like "panel upgrade" and "EV charger installation" typically produce 2–3 qualified leads per day within the first two weeks. We see the strongest volume from Monday to Thursday when homeowners are planning projects.',
  },
  {
    question: 'Should electricians use Google Ads or Meta Ads?',
    answer: 'Google Ads first, always. Electrical work is search-driven — people Google when they need an electrician, they don\'t scroll Facebook looking for one. Meta Ads can work for awareness campaigns (especially EV charger installs targeting Tesla/EV owners), but 80% of your budget should be on Google.',
  },
  {
    question: 'How do I get more electrical jobs without HomeStars?',
    answer: 'Google Ads and Local Service Ads give you direct inbound calls — no middleman, no shared leads, no per-lead fees. Combined with a strong Google Business Profile (photos of your work, consistent 5-star reviews, verified licenses), you own the channel instead of renting it from HomeStars.',
  },
  {
    question: 'Is EV charger installation worth advertising for?',
    answer: 'Yes — it\'s the fastest-growing electrical keyword in BC. BC\'s Zero-Emission Vehicle mandate means EV charger installation searches are up 140% year-over-year. The average Level 2 charger install is $1,500–$3,000, and homeowners are actively searching. We run dedicated EV charger campaigns for several electrical clients.',
  },
  {
    question: 'Do you work with commercial electricians?',
    answer: 'Yes. We run separate campaigns for residential and commercial electrical services. Commercial keywords ("commercial electrician Vancouver," "tenant improvement electrical") have lower volume but much higher job values — $5K–$50K+ per project.',
  },
  {
    question: 'Is there a contract?',
    answer: 'No. AP Digital works month-to-month with all electrical clients. No lock-in, no cancellation fees. We also offer a 90-day performance guarantee.',
  },
  {
    question: 'How do I find an electrician marketing agency near me?',
    answer: 'AP Digital serves electricians across Metro Vancouver and the Fraser Valley. We run Google Ads targeting "electrician near me" searches and Meta Ads for residential and commercial lead generation. Month-to-month, no contracts.',
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    founderSchema,
    getServiceSchema('Electrician Marketing', DESC, '/electrician-marketing'),
    getFAQSchema(faqs),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Trades Marketing', url: '/trades-marketing' },
      { name: 'Electrician Marketing', url: '/electrician-marketing' },
    ]),
    getWebPageSchema(TITLE, DESC, '/electrician-marketing'),
  ]
};

const ElectricianMarketing = () => (
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
          Electrician Leads in Metro Vancouver
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          Panel upgrades, EV charger installs, emergency rewiring — when homeowners need an electrician, they Google it. AP Digital builds booked-estimate systems for BC electricians using Google Ads, Local Service Ads, and Google Business Profile optimization.
        </p>

        <InlineCTA context="electrical company" />

        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">EV chargers: BC's fastest-growing keyword</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">EV charger installation searches are up 140% YoY in BC. Average install: $1,500–$3,000. Electricians running ads for this service are printing money.</p>
          </div>
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">High job values</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">Panel upgrades run $2K–$5K. Rewiring can be $8K–$15K. High job values mean strong ROI on your ad spend.</p>
          </div>
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">90-day guarantee</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">No contracts. If we don't deliver qualified electrical leads in 90 days, you don't pay. Month-to-month, always.</p>
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

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">BC Electrical Market: What You're Competing For</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            BC's electrical market is being reshaped by the EV transition and aging housing stock. The province's Zero-Emission Vehicle mandate is driving a surge in Level 2 charger installations, while Vancouver's pre-1980 homes need panel upgrades to support modern loads. Electricians who capture these searches now will own the market for the next decade.
          </p>
          <p className="mb-4">
            Metro Vancouver has 500+ licensed electrical contractors. The ones showing up in Google's Local Service Ads and Search Ads are getting 70%+ of inbound calls. The rest depend on word-of-mouth and HomeStars — which means inconsistent volume and shared leads.
          </p>
          <p>
            The highest-converting campaigns focus on specific services (panel upgrades, EV chargers, knob-and-tube replacement) rather than generic "electrician" keywords — specificity wins in this vertical.
          </p>
        </div>

        <FaqLight faqs={faqs} />

        <div className="mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">Related Pages</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link to="/trades-marketing" className="bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl p-6 transition-all duration-300">
              <p className="font-bold text-foreground">Trades & Contractor Marketing</p>
              <p className="reveal-body relative z-10 text-sm text-muted-foreground">Our full trades marketing program for all contractor types.</p>
            </Link>
            <Link to="/plumber-marketing" className="bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl p-6 transition-all duration-300">
              <p className="font-bold text-foreground">Plumber Marketing</p>
              <p className="reveal-body relative z-10 text-sm text-muted-foreground">Google Ads & lead gen for plumbing companies in BC.</p>
            </Link>
            <Link to="/hvac-marketing" className="bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl p-6 transition-all duration-300">
              <p className="font-bold text-foreground">HVAC Marketing</p>
              <p className="reveal-body relative z-10 text-sm text-muted-foreground">Lead generation for HVAC companies in Metro Vancouver.</p>
            </Link>
            <Link to="/roofer-marketing" className="bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl p-6 transition-all duration-300">
              <p className="font-bold text-foreground">Roofer Marketing</p>
              <p className="reveal-body relative z-10 text-sm text-muted-foreground">Google Ads for roofing companies in BC.</p>
            </Link>
          </div>
        </div>

        <OurServices />

        <div className="mt-16 mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-6">Cities We Serve</h2>
          <p className="text-muted-foreground mb-6">We help electrical companies across Metro Vancouver and the Fraser Valley.</p>
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

export default ElectricianMarketing;
