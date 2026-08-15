// HomePage - Main landing page for AP DIGITAL - Performance Marketing Agency
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Target, Users, TrendingUp, Scissors, Home, Wrench, ChevronRight, Instagram, Linkedin, Sparkles, Building2, Hammer, GraduationCap } from 'lucide-react';
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
import apLogo from '@/assets/ap-logo.png';
import heroImage from '@/assets/hero-split.jpg';
import heroImageWebp from '@/assets/hero-split.webp';

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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

        {/* Background — Codex-inspired gradient wash */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          {/* Center glow behind logo — soft teal wash */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_35%_at_50%_38%,_rgba(45,212,191,0.12)_0%,_rgba(45,212,191,0.03)_50%,_transparent_80%)]" />
          {/* Wide ambient glow — adds depth */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_45%,_rgba(255,255,255,0.03)_0%,_transparent_70%)]" />
          {/* Top edge light — mimics overhead studio lighting */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(255,255,255,0.04)_0%,_transparent_30%)]" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center px-4 pt-32 pb-24 sm:pt-40 sm:pb-32 w-full max-w-3xl mx-auto">

          {/* Logo mark */}
          <div className="mb-10 animate-fade-up">
            <img src={apLogo} alt="AP Digital Marketing" className="w-24 h-24 sm:w-32 sm:h-32 rounded-full" />
          </div>

          {/* Descriptor */}
          <div className="animate-fade-up mb-5" style={{ animationDelay: '0.02s' }}>
            <span className="inline-block text-[11px] font-semibold tracking-[0.25em] uppercase text-white/50 border border-white/10 rounded-full px-4 py-1.5">
              Performance Marketing — Vancouver, BC
            </span>
          </div>

          {/* H1 */}
          <h1
            className="font-display text-[2.5rem] sm:text-6xl md:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6 animate-fade-up"
            style={{ animationDelay: '0.08s' }}
          >
            Vancouver Performance<br />
            <span className="text-gradient">Marketing Agency</span>
          </h1>

          {/* Sub */}
          <p
            className="text-base sm:text-lg text-white/60 max-w-xl mx-auto mb-12 animate-fade-up leading-relaxed"
            style={{ animationDelay: '0.16s' }}
          >
            We run your ads, create your content, and deliver real leads — guaranteed results in 90 days or you don't pay.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col items-center gap-4 animate-fade-up w-full sm:w-auto"
            style={{ animationDelay: '0.24s' }}
          >
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full sm:w-auto">
              <Button variant="hero" size="lg" asChild>
                <a
                  href="https://calendly.com/apdigital-core/20min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  Book a Call
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <a href="#how-it-works" className="flex items-center justify-center">
                  How It Works
                </a>
              </Button>
            </div>
            <Link to="/pricing" className="text-base text-white/60 hover:text-white transition-colors underline underline-offset-4 font-medium">
              See Pricing
            </Link>
          </div>

          {/* Trust line */}
          <p
            className="mt-14 text-xs text-white/40 animate-fade-up"
            style={{ animationDelay: '0.32s' }}
          >
Month-to-month &nbsp;·&nbsp; No contracts &nbsp;·&nbsp; 90-day guarantee
          </p>

          {/* Social links */}
          <div
            className="mt-6 flex items-center justify-center gap-3 animate-fade-up"
            style={{ animationDelay: '0.4s' }}
          >
            <a
              href="https://www.instagram.com/theapdigital/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow AP Digital on Instagram"
              className="w-9 h-9 rounded-full border border-white/10 text-gray-400 hover:text-teal hover:border-teal/40 flex items-center justify-center transition-colors duration-200"
            >
              <Instagram className="w-4 h-4" strokeWidth={2} />
            </a>
            <a
              href="https://www.linkedin.com/company/theapdigital/?viewAsMember=true"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow AP Digital on LinkedIn"
              className="w-9 h-9 rounded-full border border-white/10 text-gray-400 hover:text-teal hover:border-teal/40 flex items-center justify-center transition-colors duration-200"
            >
              <Linkedin className="w-4 h-4" strokeWidth={2} />
            </a>
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
