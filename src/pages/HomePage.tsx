// HomePage - Main landing page for AP DIGITAL - Performance Marketing Agency
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Target, Users, TrendingUp, Instagram, Linkedin, Scissors, Home, Wrench, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import ResultsProof from '@/components/ResultsProof';
import ServicesDark from '@/components/ServicesDark';
import ProcessDark from '@/components/ProcessDark';
import DarkCTA from '@/components/DarkCTA';
import DigitalArsenal from '@/components/DigitalArsenal';
import MarketingAuditAI from '@/components/MarketingAuditAI';
import HeroMoveCard from '@/components/HeroMoveCard';

import { organizationSchema, getWebSiteSchema, getWebPageSchema, getBreadcrumbSchema } from '@/lib/structuredData';
import heroImage from '@/assets/hero-split.jpg';
import heroImageWebp from '@/assets/hero-split.webp';

const TITLE = 'AP Digital | Vancouver Marketing — Meta & Google Ads';
const DESC = 'Vancouver performance marketing agency. 2,400+ leads delivered for BC salons, trades, realtors & coaches. 90-day guarantee. Month-to-month.';
const CANONICAL = 'https://ap-digital.ca/';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    organizationSchema,
    getWebSiteSchema(),
    getWebPageSchema(TITLE, DESC, '/'),
    getBreadcrumbSchema([{ name: 'Home', url: '/' }]),
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
        <link rel="preload" as="image" href={heroImageWebp} type="image/webp" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
      <Header />

      {/* ─────────────────── HERO ─────────────────── */}
      <section className="relative min-h-screen flex items-center bg-near-black overflow-hidden pt-20 sm:pt-24 pb-20 lg:py-0">

        {/* Background — gradient + money rain + lead notifications */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-near-black to-charcoal-dark" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_75%_30%,_rgba(20,184,166,0.10)_0%,_transparent_70%)]" />

          {/* Money rain — falling dollar bills (💵 emoji) */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 16 }).map((_, i) => {
              const sizes = [28, 36, 44, 52, 32, 40, 48, 56];
              const size = sizes[i % sizes.length];
              const left = (i * 6.4 + (i % 3) * 1.7) % 95;
              const duration = 10 + (i % 5) * 2;
              const delay = (i * 0.8) % 12;
              const opacity = 0.55 + (i % 4) * 0.1;
              return (
                <span
                  key={i}
                  className="absolute select-none"
                  style={{
                    left: `${left}%`,
                    top: 0,
                    fontSize: `${size}px`,
                    opacity,
                    animation: `moneyFall ${duration}s linear ${delay}s infinite`,
                    animationFillMode: 'backwards',
                    willChange: 'transform, opacity',
                  }}
                  aria-hidden="true"
                >
                  💵
                </span>
              );
            })}
          </div>
        </div>

        <div className="container-custom relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

            {/* ── Left: Copy ── */}
            <div className="text-center lg:text-left">

              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 mb-8 animate-fade-up">
                <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                <span className="text-teal text-xs font-semibold tracking-[0.2em] uppercase">
                  Performance Marketing · Vancouver, BC
                </span>
              </div>

              {/* H1 */}
              <h1
                className="font-display text-[2.5rem] sm:text-5xl md:text-6xl xl:text-[4.5rem] font-bold text-primary-foreground leading-[1.05] tracking-tight mb-6 animate-fade-up"
                style={{ animationDelay: '0.08s' }}
              >
                More clients.<br />
                <span className="text-gradient">Predictably.</span>
              </h1>

              {/* Sub */}
              <p
                className="text-base sm:text-lg text-white/70 max-w-lg mx-auto lg:mx-0 mb-10 animate-fade-up leading-relaxed"
                style={{ animationDelay: '0.16s' }}
              >
                We build paid ad and content systems that fill your calendar with qualified clients — for salons, realtors, trades, and coaches across BC.
              </p>

              {/* CTAs */}
              <div
                className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 animate-fade-up"
                style={{ animationDelay: '0.24s' }}
              >
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
                  <Link to="/pricing" className="flex items-center justify-center">
                    See Pricing
                  </Link>
                </Button>
              </div>

              {/* Inline trust line */}
              <p
                className="mt-10 text-xs text-white/50 animate-fade-up text-center lg:text-left"
                style={{ animationDelay: '0.32s' }}
              >
                <span className="text-white font-semibold">2,400+ leads</span> delivered for <span className="text-white font-semibold">200+ BC businesses</span> &nbsp;·&nbsp; 90-day guarantee
              </p>

              {/* Social links */}
              <div
                className="mt-6 flex items-center justify-center lg:justify-start gap-3 animate-fade-up"
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
                <a
                  href="https://share.google/BaN9E261WFEfP1lME"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View AP Digital on Google"
                  className="w-9 h-9 rounded-full border border-white/10 text-gray-400 hover:text-teal hover:border-teal/40 flex items-center justify-center transition-colors duration-200"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M21.35 11.1H12v3.2h5.35c-.5 2.5-2.7 4-5.35 4-3.2 0-5.8-2.6-5.8-5.8s2.6-5.8 5.8-5.8c1.5 0 2.85.55 3.9 1.45l2.4-2.4C16.6 4.2 14.4 3.3 12 3.3c-4.8 0-8.7 3.9-8.7 8.7s3.9 8.7 8.7 8.7c5.05 0 8.4-3.55 8.4-8.55 0-.6-.05-1.05-.15-1.55z"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* ── Right: Dashboard card ── */}
            <div
              className="animate-fade-up w-full max-w-[400px] mx-auto lg:ml-auto lg:mr-0"
              style={{ animationDelay: '0.3s' }}
            >
              <HeroMoveCard />
            </div>

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

          <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
            {/* Salons */}
            <Link
              to="/salon-marketing"
              className="group p-6 sm:p-7 rounded-2xl bg-charcoal-light border border-gray-800 hover:border-teal/30 transition-all duration-300 hover:-translate-y-0.5 block"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center flex-shrink-0">
                  <Scissors className="w-5 h-5 text-teal" strokeWidth={1.8} />
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-teal group-hover:translate-x-0.5 transition-all duration-200 mt-0.5" />
              </div>
              <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-teal mb-2">Salons</p>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-primary-foreground mb-2 leading-snug">
                Full bookings in 30 days
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-5">
                Instagram & Facebook ads that fill your chair consistently — without you lifting a finger.
              </p>
              <span className="inline-flex items-center gap-1.5 bg-teal/10 text-teal text-[11px] font-semibold rounded-full px-3 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal flex-shrink-0" />
                30-day results guarantee
              </span>
            </Link>

            {/* Real Estate */}
            <Link
              to="/real-estate-marketing"
              className="group p-6 sm:p-7 rounded-2xl bg-charcoal-light border border-gray-800 hover:border-teal/30 transition-all duration-300 hover:-translate-y-0.5 block"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center flex-shrink-0">
                  <Home className="w-5 h-5 text-teal" strokeWidth={1.8} />
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-teal group-hover:translate-x-0.5 transition-all duration-200 mt-0.5" />
              </div>
              <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-teal mb-2">Real Estate</p>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-primary-foreground mb-2 leading-snug">
                15–30 qualified leads per month
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-5">
                Hyper-targeted Meta & Google Ads that bring serious buyers and sellers directly to you.
              </p>
              <span className="inline-flex items-center gap-1.5 bg-teal/10 text-teal text-[11px] font-semibold rounded-full px-3 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal flex-shrink-0" />
                Avg 18 leads/month
              </span>
            </Link>

            {/* Trades */}
            <Link
              to="/trades-marketing"
              className="group p-6 sm:p-7 rounded-2xl bg-charcoal-light border border-gray-800 hover:border-teal/30 transition-all duration-300 hover:-translate-y-0.5 block"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center flex-shrink-0">
                  <Wrench className="w-5 h-5 text-teal" strokeWidth={1.8} />
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-teal group-hover:translate-x-0.5 transition-all duration-200 mt-0.5" />
              </div>
              <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-teal mb-2">Trades</p>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-primary-foreground mb-2 leading-snug">
                Stop relying on word-of-mouth
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-5">
                Plumbers, electricians, roofers — ads that put you in front of homeowners who need you right now.
              </p>
              <span className="inline-flex items-center gap-1.5 bg-teal/10 text-teal text-[11px] font-semibold rounded-full px-3 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal flex-shrink-0" />
                Schedule booked solid
              </span>
            </Link>

            {/* Coaching */}
            <Link
              to="/coaching-marketing"
              className="group p-6 sm:p-7 rounded-2xl bg-charcoal-light border border-gray-800 hover:border-teal/30 transition-all duration-300 hover:-translate-y-0.5 block"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-teal" strokeWidth={1.8} />
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-teal group-hover:translate-x-0.5 transition-all duration-200 mt-0.5" />
              </div>
              <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-teal mb-2">Coaching</p>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-primary-foreground mb-2 leading-snug">
                Calendar filled with ideal clients
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-5">
                Ad campaigns and content systems that attract and convert your perfect-fit clients — month after month.
              </p>
              <span className="inline-flex items-center gap-1.5 bg-teal/10 text-teal text-[11px] font-semibold rounded-full px-3 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal flex-shrink-0" />
                Month-to-month, no lock-in
              </span>
            </Link>
          </div>
        </div>
      </section>

      <MarketingAuditAI />
      <ResultsProof />
      <ProcessDark />
      <ServicesDark />

      <div id="digital-arsenal">
        <DigitalArsenal />
      </div>

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

      <DarkCTA
        headline="Ready to Get Predictable Leads?"
        subheadline="Book a free strategy call and see exactly how we can grow your leads and revenue."
      />

      <Footer />
    </main>
  );
};

export default HomePage;
