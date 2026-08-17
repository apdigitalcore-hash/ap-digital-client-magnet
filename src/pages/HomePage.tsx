// HomePage - Main landing page for AP DIGITAL - Performance Marketing Agency
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Target, Users, TrendingUp, ChevronRight, CalendarDays, ShieldCheck, Clock, PlayCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

import SectionLabel from '@/components/light/SectionLabel';
import ProcessLight from '@/components/light/ProcessLight';
import ServicesLight from '@/components/light/ServicesLight';
import FaqLight from '@/components/light/FaqLight';
import PastelCTA from '@/components/light/PastelCTA';

import { lazy, Suspense } from 'react';
const SocialMediaBudgetCalculator = lazy(() => import('@/components/SocialMediaBudgetCalculator'));

import { organizationSchema, getWebSiteSchema, getWebPageSchema, getBreadcrumbSchema, getFAQSchema, founderSchema } from '@/lib/structuredData';
import JsonLd from '@/components/JsonLd';

const TITLE = 'Vancouver Performance Marketing Agency | AP Digital';
const DESC = 'Vancouver marketing agency for salons, trades, realtors & coaches. Meta & Google Ads that deliver predictable leads. Month-to-month, 90-day guarantee.';
const CANONICAL = 'https://ap-digital.ca/';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const homepageFAQs = [
  {
    question: "How much does AP Digital charge for marketing?",
    answer: "Our paid ads management starts at $759/month and social media management starts at $849/month. No long-term contracts — everything is month-to-month with a 90-day results guarantee."
  },
  {
    question: "What industries does AP Digital work with?",
    answer: "We specialize in service businesses across British Columbia including salons, real estate agents, trades (plumbing, HVAC, electrical), and coaches. Our strategies are tailored to each industry's unique lead generation needs."
  },
  {
    question: "How quickly will I see results from paid ads?",
    answer: "Most clients see their first leads within the first 2 weeks of campaign launch. We offer a 90-day guarantee — if you don't see measurable results, you don't pay."
  },
  {
    question: "What areas does AP Digital serve?",
    answer: "We're based in Vancouver, BC and serve businesses across Metro Vancouver and the Fraser Valley including Surrey, Burnaby, Richmond, Langley, Coquitlam, Abbotsford, and North Vancouver."
  },
  {
    question: "Do I need a long-term contract?",
    answer: "No. All our services are month-to-month with no long-term contracts. We believe in earning your business every month through results, not locking you into agreements."
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    organizationSchema,
    founderSchema,
    getWebSiteSchema(),
    getWebPageSchema(TITLE, DESC, '/'),
    getBreadcrumbSchema([{ name: 'Home', url: '/' }]),
    getFAQSchema(homepageFAQs),
  ]
};

const differentiators = [
  {
    icon: Zap,
    title: 'No Long-Term Contracts',
    description: 'Month-to-month flexibility.',
  },
  {
    icon: Target,
    title: 'Results-Focused',
    description: 'We track leads, not vanity metrics.',
  },
  {
    icon: Users,
    title: 'Niche Expertise',
    description: 'Built for service businesses.',
  },
  {
    icon: TrendingUp,
    title: 'Proven Systems',
    description: 'Battle-tested strategies.',
  },
];


const HomePage = () => {
  return (
    <main id="main-content" className="min-h-screen bg-background">
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <meta name="keywords" content="digital marketing agency Vancouver, performance marketing agency Vancouver BC, Meta Ads agency Vancouver, Google Ads agency BC, lead generation Vancouver BC, social media marketing agency BC, Facebook ads agency Vancouver, Instagram marketing BC, paid advertising agency Lower Mainland, digital marketing for small businesses Canada, marketing agency for salons Vancouver, real estate marketing BC, trades marketing Vancouver, coaching marketing BC, SEO agency Vancouver, marketing agency Surrey, marketing agency Burnaby, marketing agency Langley, marketing agency Coquitlam, marketing agency Richmond BC, marketing agency North Vancouver, marketing agency Abbotsford, content creation agency BC, conversion rate optimization Vancouver" />
        <link rel="canonical" href={CANONICAL} />
        <link rel="alternate" hrefLang="en-CA" href={CANONICAL} />
        <link rel="alternate" hrefLang="x-default" href={CANONICAL} />
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

      {/* ─────────────────── HERO ─────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
        <div className="relative z-10 w-full container-custom pt-32 pb-28 md:py-40">
          <div className="max-w-3xl mx-auto text-center">

            <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-muted-foreground mb-8">
              Performance Marketing — Vancouver, BC
            </p>

            <h1 className="font-serif text-[2.5rem] sm:text-6xl md:text-[5rem] font-medium text-foreground leading-[1.05] tracking-tight mb-7">
              Vancouver{' '}
              <span className="italic">Performance</span>{' '}
              Marketing Agency
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-[520px] mx-auto mb-10 leading-relaxed">
              We run your ads, create your content, and deliver real leads — guaranteed results in 90 days or you don't pay.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
              <a
                href="https://calendly.com/apdigital-core/20min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-background transition-colors hover:bg-foreground/85"
              >
                Book a Call
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <PlayCircle className="w-6 h-6" strokeWidth={1.5} />
                <span className="text-xs font-semibold tracking-[0.18em] uppercase">How It Works</span>
              </a>
            </div>
          </div>
        </div>

        {/* Trust bar */}
        <div className="absolute bottom-10 left-0 right-0 z-10 container-custom">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-muted-foreground">
            {[
              { icon: CalendarDays, label: 'Month-to-Month' },
              { icon: ShieldCheck, label: 'No Contracts' },
              { icon: Clock, label: '90-Day Guarantee' },
            ].map(({ icon: Icon, label }, i) => (
              <div key={label} className="flex items-center gap-8">
                {i > 0 && <span className="hidden sm:block h-4 w-px bg-foreground/10" />}
                <span className="flex items-center gap-2">
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                  <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">{label}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── INDUSTRIES ─────────────────── */}
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container-custom">
          <div className="text-center mb-14">
            <SectionLabel number="001" label="Industries" />
            <h2 className="mt-6 font-serif text-4xl sm:text-5xl md:text-6xl font-medium leading-[1.05] tracking-tight text-foreground">
              Built for your <span className="italic">industry.</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-5 max-w-3xl mx-auto">
            {[
              { to: '/salon-marketing', name: 'Salons', tagline: 'Full bookings in 30 days' },
              { to: '/real-estate-marketing', name: 'Real Estate', tagline: '15–30 qualified leads per month' },
              { to: '/trades-marketing', name: 'Trades', tagline: 'Stop relying on word-of-mouth' },
              { to: '/coaching-marketing', name: 'Coaching', tagline: 'Calendar filled with ideal clients' },
            ].map(({ to, name, tagline }) => (
              <Link
                key={to}
                to={to}
                className="group relative aspect-square rounded-3xl bg-background shadow-custom-sm hover:shadow-custom-lg transition-all duration-300 flex flex-col items-center justify-center overflow-hidden"
              >
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-foreground tracking-tight text-center px-4">
                  {name}
                </h3>
                <p className="text-sm text-muted-foreground font-medium transition-all duration-300 mt-3 text-center px-6 max-w-[220px] leading-snug opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                  {tagline}
                </p>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0">
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-background">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <Suspense fallback={null}>
              <SocialMediaBudgetCalculator />
            </Suspense>
          </div>
        </div>
      </section>

      <ProcessLight />
      <ServicesLight />

      {/* ─────────────────── WHY CHOOSE US ─────────────────── */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container-custom">
          <div className="text-center mb-14">
            <SectionLabel number="004" label="Why Us" />
            <h2 className="mt-6 font-serif text-4xl sm:text-5xl md:text-6xl font-medium leading-[1.05] tracking-tight text-foreground">
              Why <span className="italic">Choose</span> Us
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground">
              No fluff. No buzzwords. Just results.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {differentiators.map((item) => (
              <div key={item.title} className="p-6 sm:p-8 rounded-3xl bg-secondary transition-shadow duration-300 hover:shadow-custom-sm">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-background shadow-custom-sm mb-5">
                  <item.icon className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-medium text-foreground mb-2 leading-tight">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── CITIES ─────────────────── */}
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container-custom">
          <div className="text-center mb-14">
            <SectionLabel number="005" label="Locations" />
            <h2 className="mt-6 font-serif text-4xl sm:text-5xl md:text-6xl font-medium leading-[1.05] tracking-tight text-foreground">
              Cities We <span className="italic">Serve</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground">
              Based in the Lower Mainland, we serve local businesses across Metro Vancouver and the Fraser Valley.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { city: 'Vancouver', href: '/vancouver', sub: 'Metro Vancouver' },
              { city: 'Surrey', href: '/surrey', sub: 'South Fraser' },
              { city: 'Burnaby', href: '/burnaby', sub: 'Metro Vancouver' },
              { city: 'Richmond', href: '/richmond', sub: 'Metro Vancouver' },
              { city: 'North Vancouver', href: '/contact', sub: 'North Shore' },
              { city: 'Coquitlam', href: '/coquitlam', sub: 'Tri-Cities' },
              { city: 'Langley', href: '/langley', sub: 'Fraser Valley' },
              { city: 'Abbotsford', href: '/abbotsford', sub: 'Fraser Valley' },
            ].map(({ city, href, sub }) => (
              <Link
                key={city}
                to={href}
                className="group bg-background rounded-2xl p-5 sm:p-7 text-center transition-shadow duration-300 hover:shadow-custom-sm"
              >
                <div className="font-serif text-lg sm:text-xl font-medium text-foreground group-hover:text-foreground/70 transition-colors mb-1">{city}</div>
                <div className="text-muted-foreground text-xs sm:text-sm">{sub}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FaqLight faqs={homepageFAQs} />

      <PastelCTA
        headline="Ready to Get Predictable Leads?"
        subheadline="Book a free strategy call and see exactly how we can grow your leads and revenue."
      />

      <Footer />
    </main>
  );
};

export default HomePage;
