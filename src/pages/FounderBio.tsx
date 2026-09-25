import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PastelCTA from '@/components/light/PastelCTA';
import { ArrowRight, Wrench, Target, BarChart3, Users, Star, TrendingUp, Award } from 'lucide-react';
import JsonLd from '@/components/JsonLd';
import { founderSchema, organizationSchema, getBreadcrumbSchema, getWebPageSchema } from '@/lib/structuredData';

const TITLE = 'Arjun Sharma | Founder & Lead Strategist | AP Digital Vancouver';
const DESC = 'Arjun Sharma is the founder of AP Digital, a Vancouver performance marketing agency. He personally manages every client account, specializing in Google Ads and Meta Ads for trades contractors and local service businesses across BC.';
const CANONICAL = 'https://ap-digital.ca/about/arjun-sharma';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      ...founderSchema,
      "url": "https://ap-digital.ca/about/arjun-sharma",
      "image": OG_IMAGE,
      "alumniOf": { "@type": "Organization", "name": "AP Digital" },
      "knowsAbout": [
        "Google Ads for Contractors",
        "Meta Ads for Local Businesses",
        "Lead Generation Systems",
        "Performance Marketing",
        "Local SEO",
        "Social Media Marketing",
        "Conversion Rate Optimization",
        "Google Business Profile Optimization",
      ],
    },
    organizationSchema,
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'About', url: '/about' },
      { name: 'Arjun Sharma', url: '/about/arjun-sharma' },
    ]),
    getWebPageSchema(TITLE, DESC, '/about/arjun-sharma'),
  ]
};

const specialties = [
  { icon: Wrench, title: 'Trades & Contractor Lead Gen', desc: 'Built booked-estimate systems for plumbers, electricians, HVAC, roofers, and general contractors across Metro Vancouver. Primary niche.' },
  { icon: Target, title: 'Google Ads & Local Service Ads', desc: 'Runs Google Ads for local service businesses. Specialist in high-intent keyword targeting and call-based conversion tracking.' },
  { icon: BarChart3, title: 'Meta Ads for Service Businesses', desc: 'Designs Meta Ads funnels that generate leads for salons, coaches, real estate agents, and contractors across Metro Vancouver.' },
  { icon: Users, title: 'Google Business Profile & Local SEO', desc: 'Optimizes GBP listings, builds review generation systems, and manages NAP consistency for Local Pack visibility across BC service areas.' },
];

const stats = [
  { icon: TrendingUp, value: 'Trades', label: 'Primary niche — contractors across BC' },
  { icon: Star, value: 'Hands-on', label: 'Personally manages every account' },
  { icon: Award, value: '90-day', label: 'Results guarantee on every engagement' },
  { icon: Users, value: 'Local', label: 'Metro Vancouver & Fraser Valley' },
];

const articles = [
  { title: 'Best Ads for Trades Businesses in Canada', href: '/blog/trades-marketing-vancouver-bc' },
  { title: 'How Much Do Google Ads Cost in Vancouver?', href: '/blog/how-much-do-google-ads-cost-vancouver' },
  { title: 'Meta Ads Cost for Contractors in BC', href: '/blog/meta-ads-cost-contractors-bc' },
  { title: 'Vancouver Small Business SEO Guide', href: '/blog/vancouver-small-business-seo-guide' },
  { title: 'Trades Marketing Vancouver BC', href: '/blog/trades-marketing-vancouver-bc' },
  { title: 'Plumber Marketing Metro Vancouver', href: '/plumber-marketing' },
];

const FounderBio = () => (
  <>
    <Helmet>
      <title>{TITLE}</title>
      <meta name="description" content={DESC} />
      <link rel="canonical" href={CANONICAL} />
      <meta property="og:type" content="profile" />
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
    <main id="main-content">
      {/* Hero */}
      {/* Light hero, matching the city and niche pages. */}
      <section className="relative bg-[#E4E7EB] pt-32 pb-24">
        <div className="container-custom max-w-4xl">
          <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">Founder &amp; Lead Strategist</p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.05] tracking-tight text-foreground mb-6">
            Arjun Sharma
          </h1>
          <p className="text-foreground/70 text-lg md:text-xl max-w-3xl leading-relaxed">
            Founder of AP Digital. Personally manages every client account. Specializes in building booked-estimate systems for trades contractors and local service businesses across British Columbia using Google Ads, Meta Ads, and performance marketing.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <a href="https://www.linkedin.com/in/arjun-sharma-9b2520395/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-foreground/20 text-foreground text-sm hover:bg-foreground hover:text-background transition-colors">
              LinkedIn
            </a>
            <a href="https://www.instagram.com/theapdigital/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-foreground/20 text-foreground text-sm hover:bg-foreground hover:text-background transition-colors">
              Instagram
            </a>
            <Link to="/blog" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-foreground/20 text-foreground text-sm hover:bg-foreground hover:text-background transition-colors">
              Articles
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-12 md:py-16 border-b border-foreground/[0.07]">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-8 h-8 text-foreground/70 mx-auto mb-3" strokeWidth={1.6} />
                <p className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-1">{stat.value}</p>
                <p className="text-foreground/60 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bio */}
      <section className="container-custom py-16 md:py-24 max-w-4xl">
        <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-foreground mb-8">Background</h2>
        <div className="space-y-5 text-muted-foreground text-lg leading-relaxed">
          <p>
            Arjun Sharma founded AP Digital in Vancouver, BC after watching local service businesses — plumbers, electricians, salon owners, realtors — get burned by agencies selling impressions instead of leads. Every contractor he talked to had the same story: they'd spent $3K–$10K on "digital marketing" and had nothing to show for it except a prettier Instagram page.
          </p>
          <p>
            He built AP Digital around one principle: marketing is only valuable if it makes the phone ring with qualified jobs. Not impressions. Not clicks. Not followers. Booked estimates and closed deals. That philosophy shaped everything about the agency — from month-to-month contracts (no lock-ins) to reporting dashboards that track cost-per-booked-job (not vanity metrics) to the 90-day performance guarantee (if we miss the lead target we agree on, we keep working free until we hit it).
          </p>
          <p>
            Arjun personally manages every client account. When you work with AP Digital, you talk to the person running your campaigns — not a junior account manager, not an overseas team, not a chatbot. He runs campaigns across Google Ads, Meta Ads, and Local Service Ads for trades contractors, salons, real estate agents, coaches, dental clinics, gyms, and restaurants across Metro Vancouver.
          </p>
          <p>
            His primary focus is trades contractors — plumbers, electricians, HVAC companies, roofers, and general contractors. He's built a methodology he calls "booked-estimate systems": campaigns designed to generate not just leads, but actual booked service calls and on-site estimates. The system tracks from ad click → phone call → booked estimate → completed job → revenue, so every client knows their true cost-per-job, not just cost-per-click.
          </p>
        </div>
      </section>

      {/* Methodology */}
      <section className="bg-[#EDEFF2] py-16 md:py-20">
        <div className="container-custom max-w-4xl">
          <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-foreground mb-4">Methodology: Booked-Estimate Systems</h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl">How Arjun builds campaigns that generate booked jobs — not just form fills.</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <p className="font-serif text-lg font-medium text-foreground mb-2">1. Capture high-intent searches</p>
              <p className="text-muted-foreground">Google Ads and Local Service Ads targeting people actively searching for your trade in your service area. Emergency keywords first, then service keywords, then brand defense.</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <p className="font-serif text-lg font-medium text-foreground mb-2">2. Convert to phone calls</p>
              <p className="text-muted-foreground">Landing pages built for phone calls and click-to-call, not generic form fills. Call tracking on every number so you know which ad generated which call.</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <p className="font-serif text-lg font-medium text-foreground mb-2">3. Track to booked estimates</p>
              <p className="text-muted-foreground">Every call is tracked through to a booked estimate. Reporting shows cost-per-booked-job, not just cost-per-lead. This is the metric that actually matters to a contractor.</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <p className="font-serif text-lg font-medium text-foreground mb-2">4. Optimize for revenue</p>
              <p className="text-muted-foreground">Monthly optimization based on which keywords, ads, and landing pages generate the highest-value jobs — not just the most clicks. Budget shifts toward what makes you money.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section className="container-custom py-16 md:py-20 max-w-4xl">
        <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-foreground mb-10">Areas of Expertise</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {specialties.map((s) => (
            <div key={s.title} className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#EDEFF2] flex items-center justify-center">
                <s.icon className="w-6 h-6 text-foreground/70" />
              </div>
              <h3 className="font-serif text-xl font-medium text-foreground">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Articles */}
      <section className="bg-[#EDEFF2] py-16 md:py-20">
        <div className="container-custom max-w-4xl">
          <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-foreground mb-4">Articles by Arjun</h2>
          <p className="text-muted-foreground text-lg mb-8">Guides and strategies for trades contractors and local service businesses.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {articles.map((a) => (
              <Link key={a.href} to={a.href} className="bg-card border border-border rounded-xl p-5 hover:border-foreground/25 transition-colors group">
                <p className="font-medium text-foreground transition-colors">{a.title}</p>
              </Link>
            ))}
          </div>
          <Link to="/blog" className="inline-flex items-center gap-2 text-foreground underline underline-offset-4 hover:text-foreground/70 mt-6 font-medium">
            View all articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <PastelCTA
        headline="Work with Arjun Directly"
        subheadline="Book a free 20-minute strategy call. Arjun will show you how many leads are available in your area and what it would cost to capture them. No pitch. No pressure."
      />
    </main>
    <Footer />
  </>
);

export default FounderBio;
