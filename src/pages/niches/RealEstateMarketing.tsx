import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, Share2, Home, ShieldCheck } from 'lucide-react';
import OurServices from '@/components/OurServices';
import { getServiceSchema, getBreadcrumbSchema, getFAQSchema, getWebPageSchema, founderSchema } from '@/lib/structuredData';
import JsonLd from '@/components/JsonLd';
import FaqLight from '@/components/light/FaqLight';
import PastelCTA from '@/components/light/PastelCTA';
import InlineCTA from '@/components/light/InlineCTA';

const TITLE = 'Real Estate Marketing BC | Buyer & Seller Leads | AP Digital';
const DESC = 'Real estate marketing with Meta Ads & Google Ads for BC realtors. Serving Vancouver, Surrey & Burnaby. Month-to-month. No contracts.';
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
  { icon: Home, stat: 'Meta Ads', label: 'Facebook & Instagram lead campaigns' },
  { icon: Share2, stat: 'No Contract', label: 'Month-to-month, cancel anytime' },
  { icon: ShieldCheck, stat: '90-Day', label: 'Performance guarantee included' },
];

const faqs = [
  {
    question: 'How do real estate agents get more leads in Vancouver?',
    answer: 'The most effective approach is running Meta Ads targeting buyers and sellers in your farm area combined with Google Ads capturing high-intent searches like "homes for sale [neighbourhood]." AP Digital builds, manages, and optimizes these campaigns for consistent qualified leads.',
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
  {
    question: 'How do I find a real estate marketing agency near me?',
    answer: 'AP Digital works with real estate agents, teams, and brokerages across Metro Vancouver and the Fraser Valley. We run Meta Ads for buyer and seller leads, plus Google Ads for high-intent searches like "realtor near me." No contracts.',
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
      
    </Helmet>
      <JsonLd data={structuredData} />
    <Header />
    <main id="main-content" className="pt-24 pb-16">
      <div className="container-custom max-w-4xl">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground leading-[1.05] tracking-tight mb-8">
          Real Estate Marketing BC — Leads for Agents &amp; Brokerages
        </h1>

        {/* Short intro */}
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          The agent who shows up first wins. We get you in front of buyers and sellers before they call anyone else — with video, ads, and SEO.
        </p>

        <InlineCTA context="real estate business" />

        {/* 3-column why strip */}
        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">Qualified leads, delivered</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">Facebook and Instagram lead ads capture buyers and sellers in your market and push them straight to your CRM.</p>
          </div>
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">Build the brand people trust</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">Listing tours, market updates, and neighbourhood content that position you as the go-to local expert.</p>
          </div>
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">No contract, no risk</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">Month-to-month. Most agents see their first leads within two weeks of launch.</p>
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

        <FaqLight faqs={faqs} />

        <OurServices />

        <div className="mt-16 mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-6">Cities We Serve</h2>
          <p className="text-muted-foreground mb-6">We help realtors across Metro Vancouver and the Fraser Valley. See <Link to="/pricing" className="text-foreground underline underline-offset-4 hover:text-foreground/70">pricing</Link> or browse <Link to="/case-studies" className="text-foreground underline underline-offset-4 hover:text-foreground/70">how we work</Link>. Managing rentals rather than selling? See <Link to="/property-management-marketing" className="text-foreground underline underline-offset-4 hover:text-foreground/70">property management marketing</Link>.</p>
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

export default RealEstateMarketing;
