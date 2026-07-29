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

import MarketingAuditAI from '@/components/MarketingAuditAI';
import HeroMoveCard from '@/components/HeroMoveCard';
import WhileYouScroll from '@/components/WhileYouScroll';

import { organizationSchema, getWebSiteSchema, getWebPageSchema, getBreadcrumbSchema, founderSchema } from '@/lib/structuredData';
import apLogo from '@/assets/ap-logo.png';
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
    founderSchema,
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
        <link rel="preload" as="image" href={heroImageWebp} type="image/webp" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
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

          {/* H1 */}
          <h1
            className="font-display text-[2.5rem] sm:text-6xl md:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6 animate-fade-up"
            style={{ animationDelay: '0.08s' }}
          >
            More clients.<br />
            <span className="text-gradient">Predictably.</span>
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
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 animate-fade-up w-full sm:w-auto"
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

          {/* Trust line */}
          <p
            className="mt-14 text-xs text-white/40 animate-fade-up"
            style={{ animationDelay: '0.32s' }}
          >
            <span className="text-white/80 font-semibold">2,400+ leads</span> delivered for <span className="text-white/80 font-semibold">200+ BC businesses</span> &nbsp;·&nbsp; 90-day guarantee
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
      </section>

      {/* ── Trusted By — scrolling brand ticker ── */}
      <section className="py-14 bg-black border-t border-white/5 overflow-hidden">
        <p className="text-center text-sm uppercase tracking-[0.25em] text-white/80 font-medium mb-10">Trusted by businesses across BC</p>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10" />
          <div className="flex animate-scroll-x gap-16 sm:gap-20 items-center whitespace-nowrap">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-16 sm:gap-20 items-center shrink-0">
                {/* Aura Aesthetics */}
                <div className="flex items-center gap-2.5 opacity-40 hover:opacity-60 transition-opacity">
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><circle cx="13" cy="13" r="12" stroke="white" strokeWidth="1.2"/><path d="M9 18l4-12 4 12M10.5 14.5h5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span className="text-white text-base font-bold tracking-wider uppercase" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>AURA AESTHETICS</span>
                </div>
                {/* Harrington & Cole */}
                <div className="flex items-center gap-2.5 opacity-40 hover:opacity-60 transition-opacity">
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><rect x="1" y="1" width="24" height="24" rx="3" stroke="white" strokeWidth="1.2"/><text x="13" y="18" textAnchor="middle" fill="white" fontSize="14" fontWeight="600" fontFamily="Georgia, serif">HC</text></svg>
                  <span className="text-white text-base tracking-wider" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>Harrington & Cole</span>
                </div>
                {/* Vantage */}
                <div className="flex items-center gap-2.5 opacity-40 hover:opacity-60 transition-opacity">
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><polygon points="13,2 24,24 2,24" stroke="white" strokeWidth="1.2" fill="none"/><path d="M13 10v8M10 16h6" stroke="white" strokeWidth="1" strokeLinecap="round"/></svg>
                  <span className="text-white text-base font-extrabold tracking-[0.15em] uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>VANTAGE</span>
                </div>
                {/* The Brow Atelier */}
                <div className="flex items-center gap-2.5 opacity-40 hover:opacity-60 transition-opacity">
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><circle cx="13" cy="13" r="12" stroke="white" strokeWidth="1.2"/><path d="M7 11q3-4 6 0t6 0" stroke="white" strokeWidth="1.3" fill="none" strokeLinecap="round"/><path d="M7 15q3-4 6 0t6 0" stroke="white" strokeWidth="1.3" fill="none" strokeLinecap="round"/></svg>
                  <span className="text-white text-base font-semibold tracking-wide" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>The Brow Atelier</span>
                </div>
                {/* Onyx Group */}
                <div className="flex items-center gap-2.5 opacity-40 hover:opacity-60 transition-opacity">
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><rect x="3" y="3" width="20" height="20" fill="white" fillOpacity="0.85" rx="2"/><text x="13" y="18" textAnchor="middle" fill="black" fontSize="12" fontWeight="800" fontFamily="Inter, sans-serif">O</text></svg>
                  <span className="text-white text-base font-black tracking-[0.2em] uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>ONYX GROUP</span>
                </div>
                {/* Sterling Property Co. */}
                <div className="flex items-center gap-2.5 opacity-40 hover:opacity-60 transition-opacity">
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><rect x="1" y="1" width="24" height="24" rx="12" stroke="white" strokeWidth="1.2"/><path d="M10 17c0-2 1.5-2 3-3s3-1 3-3-1.5-3-3-3-3 1-3 2" stroke="white" strokeWidth="1.3" fill="none" strokeLinecap="round"/><circle cx="13" cy="19" r="0.8" fill="white"/></svg>
                  <span className="text-white text-base tracking-wider" style={{ fontFamily: "Georgia, serif", fontWeight: 400 }}>Sterling Property Co.</span>
                </div>
                {/* Revive Wellness */}
                <div className="flex items-center gap-2.5 opacity-40 hover:opacity-60 transition-opacity">
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><circle cx="13" cy="13" r="12" stroke="white" strokeWidth="1.2"/><path d="M13 7v12M9 11l4-4 4 4" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span className="text-white text-base font-bold tracking-wide uppercase" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>REVIVE WELLNESS</span>
                </div>
                {/* Kinetic */}
                <div className="flex items-center gap-2.5 opacity-40 hover:opacity-60 transition-opacity">
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><path d="M4 22L13 4l9 18" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 15h10" stroke="white" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  <span className="text-white text-base font-extrabold tracking-[0.12em] uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>KINETIC</span>
                </div>
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

      <WhileYouScroll />

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
              { to: '/salon-marketing', icon: Sparkles, name: 'Salons', tagline: 'Full bookings in 30 days' },
              { to: '/real-estate-marketing', icon: Building2, name: 'Real Estate', tagline: '15–30 qualified leads per month' },
              { to: '/trades-marketing', icon: Hammer, name: 'Trades', tagline: 'Stop relying on word-of-mouth' },
              { to: '/coaching-marketing', icon: GraduationCap, name: 'Coaching', tagline: 'Calendar filled with ideal clients' },
            ].map(({ to, icon: Icon, name, tagline }) => (
              <Link
                key={to}
                to={to}
                className="group relative aspect-square rounded-2xl bg-[#bdb9b4] border border-white/10 hover:border-teal/40 transition-all duration-500 flex flex-col items-center justify-center overflow-hidden"
              >
                <Icon className="absolute -top-3 -left-3 w-28 h-28 sm:w-36 sm:h-36 text-black/[0.18] group-hover:text-black/[0.25] transition-all duration-700" strokeWidth={0.7} />

                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-black/80 tracking-tight text-center px-4 relative z-10">
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

      <MarketingAuditAI />
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

      <DarkCTA
        headline="Ready to Get Predictable Leads?"
        subheadline="Book a free strategy call and see exactly how we can grow your leads and revenue."
      />

      <Footer />
    </main>
  );
};

export default HomePage;
