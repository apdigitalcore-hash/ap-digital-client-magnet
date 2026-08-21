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

const TITLE = 'General Contractor Marketing Vancouver | More Renovation Jobs | AP Digital';
const DESC = 'General contractor marketing with Google Ads & Meta Ads for Metro Vancouver. Month-to-month. No contracts. 90-day guarantee.';
const CANONICAL = 'https://ap-digital.ca/contractor-marketing';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const included = [
  'Google Search Ads for "home renovation," "kitchen remodel," & "bathroom reno" keywords',
  'Meta Ads targeting homeowners planning renovations in your service area',
  'Before-and-after project galleries on landing pages',
  'Google Business Profile optimization with project photos & reviews',
  'Call tracking tied to booked estimates, not just inquiries',
  'Retargeting campaigns for website visitors who didn\'t convert',
  'Monthly reporting with cost-per-estimate and close-rate metrics',
  'Seasonal campaigns aligned with BC renovation peaks (spring & summer)',
];

const results = [
  { icon: Search, stat: 'Google + Meta', label: 'Full-funnel ad campaigns' },
  { icon: Share2, stat: 'No Contract', label: 'Month-to-month, cancel anytime' },
  { icon: ShieldCheck, stat: '90-Day', label: 'Performance guarantee included' },
];

const faqs = [
  {
    question: 'How much do Google Ads cost for general contractors in BC?',
    answer: 'Most general contractors invest $1,500–$3,000/month in ad spend plus a $759/month management fee. Renovation keywords cost $12–$35 per click in Metro Vancouver. With average job values of $15K–$100K+, the ROI is outstanding — one closed kitchen renovation can cover a year of ad spend.',
  },
  {
    question: 'Should general contractors use Google Ads or Meta Ads?',
    answer: 'Both, but for different stages. Google Ads captures homeowners actively searching ("kitchen renovation Vancouver," "bathroom remodel contractor"). Meta Ads reaches homeowners who are in the dreaming/planning phase — they haven\'t searched yet, but they\'re scrolling Instagram and seeing beautiful renovation before-and-afters. Google closes now; Meta builds your pipeline.',
  },
  {
    question: 'How fast will I get renovation leads?',
    answer: 'Google Ads typically generates the first qualified leads within 1–2 weeks. Meta Ads take 2–3 weeks to optimize as the algorithm learns who converts. Most GCs see steady volume by week 4. Renovation leads have a longer sales cycle (2–8 weeks from inquiry to signed contract), so patience in the funnel is key.',
  },
  {
    question: 'What renovation keywords should I target?',
    answer: 'We target service-specific keywords: "kitchen renovation [city]," "bathroom remodel contractor," "basement finishing," "home addition Vancouver," and "full home renovation." We also build campaigns around trending renovation types — ADU/laneway house construction is surging in Vancouver due to BC\'s housing density policies.',
  },
  {
    question: 'How important are before-and-after photos for contractor marketing?',
    answer: 'Critical. For general contractors, before-and-after project galleries are the single highest-converting element on your landing page. Homeowners need to see your work before they\'ll call. We build landing pages with full project galleries, and use your best transformations in Meta Ads creative. Contractors with strong portfolios convert 2–3x better.',
  },
  {
    question: 'Is ADU/laneway house marketing worth investing in?',
    answer: 'Yes — it\'s one of the fastest-growing contractor keywords in BC. Vancouver and BC municipalities have relaxed zoning to allow accessory dwelling units (ADUs), laneway houses, and garden suites. Searches for "laneway house builder Vancouver" and "ADU contractor BC" are up significantly. Average project value: $150K–$350K.',
  },
  {
    question: 'How do I get more renovation estimates from my website?',
    answer: 'Three things: a project gallery with high-quality before-and-after photos, a clear "Get a Free Estimate" CTA above the fold, and social proof (Google reviews, project count, years in business). We build landing pages with all three elements optimized for conversions, not just aesthetics.',
  },
  {
    question: 'Is there a contract?',
    answer: 'No. AP Digital works month-to-month with all contractor clients. No lock-in, no cancellation fees. 90-day performance guarantee included.',
  },
  {
    question: 'How do I find a contractor marketing agency near me?',
    answer: 'AP Digital serves general contractors across Metro Vancouver and the Fraser Valley. We run Google Ads for renovation and new build searches, plus Meta Ads for homeowner targeting. No contracts, month-to-month.',
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    founderSchema,
    getServiceSchema('General Contractor Marketing', DESC, '/contractor-marketing'),
    getFAQSchema(faqs),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Trades Marketing', url: '/trades-marketing' },
      { name: 'Contractor Marketing', url: '/contractor-marketing' },
    ]),
    getWebPageSchema(TITLE, DESC, '/contractor-marketing'),
  ]
};

const ContractorMarketing = () => (
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
          General Contractor Marketing — Get More Renovation Jobs
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          Kitchen renos, bathroom remodels, basement finishing, laneway houses — when Metro Vancouver homeowners plan a renovation, they search online first. AP Digital builds booked-estimate systems for general contractors using Google Ads, Meta Ads, and portfolio-driven landing pages.
        </p>

        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">Highest job values in home services</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">Kitchen renovations: $25K–$80K. Basement finishing: $30K–$60K. Laneway houses: $150K–$350K. One closed deal can return 100x+ your monthly ad spend.</p>
          </div>
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">Google + Meta: full funnel</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">Google captures homeowners searching now. Meta reaches homeowners dreaming and planning. Running both fills your estimate calendar with qualified projects.</p>
          </div>
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">90-day guarantee</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">No contracts. If we don't deliver qualified renovation leads in 90 days, you don't pay. Month-to-month, always.</p>
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

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">BC Renovation Market: What You're Competing For</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            Metro Vancouver's renovation market is booming. High home prices mean more homeowners are renovating instead of moving. BC's new ADU and laneway house policies are creating an entirely new category of $150K–$350K projects. And aging housing stock (60%+ of Vancouver homes are pre-1990) means a steady flow of kitchen, bathroom, and whole-home renovation demand.
          </p>
          <p className="mb-4">
            The challenge for general contractors is that renovation leads have a longer sales cycle than emergency trades. A homeowner researching a kitchen renovation may take 2–8 weeks from first search to signed contract. That's why running both Google Ads (for active searchers) and Meta Ads (for planners and dreamers) is critical — Google closes deals now, Meta fills your pipeline for next month.
          </p>
          <p>
            The contractors who convert best have strong before-and-after portfolios, fast response times (calling within 5 minutes of a lead), and competitive but not lowball pricing. We optimize for booked estimates, not just form fills.
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
            <Link to="/electrician-marketing" className="bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl p-6 transition-all duration-300">
              <p className="font-bold text-foreground">Electrician Marketing</p>
              <p className="reveal-body relative z-10 text-sm text-muted-foreground">Lead generation for BC electricians.</p>
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
          <p className="text-muted-foreground mb-6">We help general contractors across Metro Vancouver and the Fraser Valley.</p>
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

export default ContractorMarketing;
