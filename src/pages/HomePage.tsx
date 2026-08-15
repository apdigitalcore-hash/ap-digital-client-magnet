// HomePage - Main landing page for AP DIGITAL - Performance Marketing Agency
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Target, Users, TrendingUp, Scissors, Home, Wrench, ChevronRight, Instagram, Linkedin, Sparkles, Building2, Hammer, GraduationCap, PlayCircle, CalendarDays, ShieldCheck, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

import ServicesDark from '@/components/ServicesDark';
import ProcessDark from '@/components/ProcessDark';
import DarkCTA from '@/components/DarkCTA';

import { lazy, Suspense } from 'react';
const SocialMediaBudgetCalculator = lazy(() => import('@/components/SocialMediaBudgetCalculator'));
import HeroMoveCard from '@/components/HeroMoveCard';
import WhileYouScroll from '@/components/WhileYouScroll';

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
    <main id="main-content" className="min-h-screen">
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
        <link rel="preload" as="image" href="/hero-bg.webp" type="image/webp" fetchPriority="high" />
      </Helmet>
      <JsonLd data={structuredData} />
      <Header />

      {/* ─────────────────── HERO ─────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-black">

        {/* Background image */}
        <img
          src="/hero-bg.webp"
          alt="Vancouver performance marketing agency"
          className="absolute inset-0 w-full h-full object-cover object-center"
          fetchPriority="high"
          loading="eager"
          decoding="sync"
        />
        {/* Gradient overlay — uniform/darker on mobile, left-to-right on desktop */}
        <div className="absolute inset-0 bg-black/70 md:bg-[linear-gradient(90deg,_rgba(0,0,0,0.85)_0%,_rgba(0,0,0,0.65)_40%,_rgba(0,0,0,0.2)_100%)]" />

        <div className="relative z-10 w-full container-custom pt-32 pb-28 md:py-32">
          <div className="w-full md:max-w-[45%] text-center md:text-left mx-auto md:mx-0">

            {/* Eyebrow */}
            <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-white/60 mb-6">
              Performance Marketing — Vancouver, BC
            </p>

            {/* H1 */}
            <h1
              className="font-display text-[2.5rem] sm:text-6xl md:text-[4.25rem] font-bold text-white leading-[1.03] tracking-tight mb-6"
            >
              Vancouver Performance{' '}
              <span className="text-teal">Marketing Agency</span>
            </h1>

            {/* Sub */}
            <p
              className="text-base sm:text-lg text-white/60 max-w-[480px] mx-auto md:mx-0 mb-10 leading-relaxed"
            >
              We run your ads, create your content, and deliver real leads — guaranteed results in 90 days or you don't pay.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row items-center md:items-center justify-center md:justify-start gap-4 sm:gap-6"
            >
              <Button variant="hero" size="lg" asChild>
                <a
                  href="https://calendly.com/apdigital-core/20min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 tracking-[0.12em] uppercase text-xs font-semibold"
                >
                  Book a Call
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
              <a
                href="#how-it-works"
                className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
              >
                <PlayCircle className="w-7 h-7" strokeWidth={1.5} />
                <span className="text-xs font-semibold tracking-[0.18em] uppercase">How It Works</span>
              </a>
            </div>
          </div>
        </div>

        {/* Trust bar */}
        <div className="absolute bottom-8 left-0 right-0 z-10 container-custom">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-3 text-white/60">
            {[
              { icon: CalendarDays, label: 'Month-to-Month' },
              { icon: ShieldCheck, label: 'No Contracts' },
              { icon: Clock, label: '90-Day Guarantee' },
            ].map(({ icon: Icon, label }, i) => (
              <div key={label} className="flex items-center gap-6">
                {i > 0 && <span className="hidden sm:block h-4 w-px bg-white/20" />}
                <span className="flex items-center gap-2">
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                  <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">{label}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ── Today's Move card ── */}
      <section className="py-16 sm:py-20 bg-black">
        <div className="container-custom flex justify-center">
          <div className="w-full max-w-[420px] animate-fade-up">
            <HeroMoveCard />
          </div>
        </div>
      </section>

      {/* Niche Services Sections */}
      <section className="py-16 sm:py-20 md:py-28 bg-charcoal">
        <div className="container-custom">

          {/* Section header */}
          <div className="text-center mb-10 sm:mb-14">
            <span className="inline-block text-[10px] font-bold tracking-[0.25em] uppercase text-teal mb-4">
              Industries We Serve
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight">
              Built for your industry.
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-3xl mx-auto">
            {[
              { to: '/salon-marketing', name: 'Salons', tagline: 'Full bookings in 30 days' },
              { to: '/real-estate-marketing', name: 'Real Estate', tagline: '15–30 qualified leads per month' },
              { to: '/trades-marketing', name: 'Trades', tagline: 'Stop relying on word-of-mouth' },
              { to: '/coaching-marketing', name: 'Coaching', tagline: 'Calendar filled with ideal clients' },
            ].map(({ to, name, tagline }) => (
              <Link
                key={to}
                to={to}
                className="group relative aspect-square rounded-2xl bg-[#bdb9b4] border border-white/10 hover:border-teal/40 transition-all duration-500 flex flex-col items-center justify-center overflow-hidden"
              >
                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-black/80 tracking-tight text-center px-4">
                  {name}
                </h3>
                <p className="text-sm text-black/0 group-hover:text-black/60 font-medium transition-all duration-500 mt-3 text-center px-6 max-w-[220px] leading-snug translate-y-2 group-hover:translate-y-0 relative z-10">
                  {tagline}
                </p>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0 z-10">
                  <ChevronRight className="w-4 h-4 text-black/50" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <SocialMediaBudgetCalculator />
      </Suspense>
      <ProcessDark />
      <ServicesDark />


      {/* What Makes Us Different */}
      <section className="py-14 sm:py-20 md:py-28 bg-charcoal">
        <div className="container-custom">
          <div className="text-center mb-10 sm:mb-14 md:mb-16">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-3 sm:mb-4 leading-tight">
              Why <span className="text-gradient">Choose Us</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto px-2">
              No fluff. No buzzwords. Just results.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
            {differentiators.map((item) => (
              <div key={item.title} className="p-4 sm:p-6 rounded-2xl bg-charcoal-light border border-gray-800 hover:border-teal/30 transition-all duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-teal/10 flex items-center justify-center mb-3 sm:mb-4">
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-teal" />
                </div>
                <h3 className="font-display text-base sm:text-lg font-semibold text-primary-foreground mb-1.5 sm:mb-2 leading-tight">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities We Serve */}
      <section className="py-14 sm:py-20 md:py-28 bg-background">
        <div className="container-custom">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
              Cities We <span className="text-gradient">Serve</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto px-2">
              Based in the Lower Mainland, we serve local businesses across Metro Vancouver and the Fraser Valley.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
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
                className="group bg-card border border-border rounded-2xl p-4 sm:p-6 text-center hover:border-teal/40 transition-colors"
              >
                <div className="font-display text-lg sm:text-xl font-bold text-foreground group-hover:text-teal transition-colors mb-1">{city}</div>
                <div className="text-muted-foreground text-xs sm:text-sm">{sub}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <WhileYouScroll />
      <DarkCTA
        headline="Ready to Get Predictable Leads?"
        subheadline="Book a free strategy call and see exactly how we can grow your leads and revenue."
      />

      <Footer />
    </main>
  );
};

export default HomePage;
