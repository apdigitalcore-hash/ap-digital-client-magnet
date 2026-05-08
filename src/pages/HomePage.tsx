// HomePage - Main landing page for AP DIGITAL - Performance Marketing Agency
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Zap, Target, Users, TrendingUp, BarChart3, ShieldCheck, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import ResultsProof from '@/components/ResultsProof';
import ServicesDark from '@/components/ServicesDark';
import TestimonialsDark from '@/components/TestimonialsDark';
import ProcessDark from '@/components/ProcessDark';
import DarkCTA from '@/components/DarkCTA';
import DigitalArsenal from '@/components/DigitalArsenal';
import MarketingAuditAI from '@/components/MarketingAuditAI';
import HeroMoveCard from '@/components/HeroMoveCard';
import Pricing from '@/components/Pricing';

import { organizationSchema, getWebSiteSchema, getWebPageSchema, getBreadcrumbSchema } from '@/lib/structuredData';
import heroImage from '@/assets/hero-split.jpg';
import heroImageWebp from '@/assets/hero-split.webp';

const TITLE = 'Digital Marketing Agency Vancouver BC | Meta Ads & Google Ads Experts | AP Digital';
const DESC = 'AP Digital is Vancouver\'s #1 performance marketing agency — 2,400+ qualified leads delivered for BC salons, realtors, trades & coaches via Meta Ads, Google Ads & content creation. 90-day results guarantee. Month-to-month, no contracts.';
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
    <main className="min-h-screen">
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <meta name="keywords" content="digital marketing agency Vancouver, performance marketing agency Vancouver BC, Meta Ads agency Vancouver, Google Ads agency BC, lead generation Vancouver BC, social media marketing agency BC, Facebook ads agency Vancouver, Instagram marketing BC, paid advertising agency Lower Mainland, digital marketing for small businesses Canada, marketing agency for salons Vancouver, real estate marketing BC, trades marketing Vancouver, coaching marketing BC, SEO agency Vancouver, marketing agency Surrey, marketing agency Burnaby, marketing agency Langley, marketing agency Coquitlam, content creation agency BC, conversion rate optimization Vancouver" />
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
      <section className="relative min-h-screen flex items-center bg-near-black overflow-hidden pt-20 sm:pt-24 pb-24 lg:py-0">

        {/* Background layers */}
        <div className="absolute inset-0 z-0">
          <picture>
            <source srcSet={heroImageWebp} type="image/webp" />
            <img
              src={heroImage}
              alt="Performance marketing agency Vancouver BC — AP Digital"
              className="absolute inset-0 w-full h-full object-cover opacity-[0.06]"
              fetchPriority="high"
              loading="eager"
              decoding="sync"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-br from-near-black via-near-black to-charcoal-dark" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_78%_28%,_rgba(20,184,166,0.13)_0%,_transparent_65%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_8%_82%,_rgba(99,102,241,0.055)_0%,_transparent_70%)]" />
          <div
            className="absolute inset-0"
            style={{
              opacity: 0.022,
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)',
              backgroundSize: '36px 36px',
            }}
          />
        </div>

        <div className="container-custom relative z-10 w-full">
          <div className="grid lg:grid-cols-[1fr_1.08fr] gap-10 xl:gap-16 items-center">

            {/* ── Left: Copy ── */}
            <div className="text-center lg:text-left">

              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-teal/25 bg-teal/10 mb-8 sm:mb-10 animate-fade-up">
                <span className="relative flex h-2 w-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal" />
                </span>
                <span className="text-teal text-xs sm:text-sm font-semibold tracking-wide leading-none">
                  Trusted by 200+ Canadian Businesses &nbsp;·&nbsp; Now Accepting New Clients
                </span>
              </div>

              {/* H1 */}
              <h1
                className="font-display text-[2.6rem] sm:text-[3.4rem] md:text-[4.2rem] xl:text-[5rem] font-black text-primary-foreground leading-[1.0] tracking-tight mb-7 sm:mb-9 animate-fade-up"
                style={{ animationDelay: '0.08s' }}
              >
                Fill Your Calendar<br />
                With{' '}
                <span className="text-gradient">Qualified Clients.</span>
                <br />
                <span className="relative inline-block mt-1">
                  Guaranteed.
                  <span className="absolute -bottom-1.5 left-0 right-[15%] h-[3px] rounded-full bg-gradient-to-r from-teal via-teal-light to-transparent" />
                </span>
              </h1>

              {/* Sub */}
              <p
                className="text-base sm:text-lg md:text-xl text-gray-400 max-w-xl mx-auto lg:mx-0 mb-9 sm:mb-11 animate-fade-up leading-relaxed"
                style={{ animationDelay: '0.18s' }}
              >
                Vancouver's performance marketing agency for salons, realtors, trades &amp; coaches.
                Meta Ads · Google Ads · Content Creation · SEO.{' '}
                <span className="text-gray-200 font-semibold">
                  2,400+ leads delivered. 90-day results guarantee.
                </span>
              </p>

              {/* CTAs */}
              <div
                className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 animate-fade-up mb-12 sm:mb-14"
                style={{ animationDelay: '0.28s' }}
              >
                <Button variant="hero" size="lg" asChild>
                  <a
                    href="https://calendly.com/apdigital-core/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-base font-bold"
                  >
                    Book Free Strategy Call
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </Button>
                <Button variant="heroOutline" size="lg" asChild>
                  <Link
                    to="/pricing"
                    className="flex items-center justify-center gap-1.5"
                  >
                    See Pricing &amp; Plans
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>

              {/* Stats row */}
              <div
                className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-4 pt-8 border-t border-white/[0.08] animate-fade-up"
                style={{ animationDelay: '0.38s' }}
              >
                {[
                  { value: '2,400+', label: 'Leads Delivered' },
                  { value: '200+', label: 'BC Clients Served' },
                  { value: '$4.2M+', label: 'Ad Spend Managed' },
                  { value: '4.9 ★', label: 'Average Rating' },
                ].map((s) => (
                  <div key={s.label} className="text-center lg:text-left">
                    <div className="font-display text-2xl sm:text-3xl font-black text-primary-foreground leading-none mb-1.5">
                      {s.value}
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest font-semibold">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Platform bar */}
              <div
                className="mt-8 sm:mt-10 animate-fade-up"
                style={{ animationDelay: '0.48s' }}
              >
                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-600 mb-3 font-semibold text-center lg:text-left">
                  Campaigns running on
                </p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2">
                  {['Google', 'Meta', 'Instagram', 'TikTok', 'LinkedIn'].map(brand => (
                    <span
                      key={brand}
                      className="text-gray-500 hover:text-gray-300 font-display font-bold text-xs tracking-wide transition-colors duration-200 cursor-default"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Right: Today's Move card + floating badges ── */}
            <div
              className="relative animate-fade-up pt-12 pb-12"
              style={{ animationDelay: '0.35s' }}
            >
              {/* Floating: ROAS — top-left, desktop only */}
              <div className="hidden lg:flex absolute top-0 left-0 z-20 items-center gap-2.5 bg-charcoal-light/95 backdrop-blur-sm border border-teal/25 rounded-2xl px-3.5 py-2.5 shadow-2xl shadow-black/50">
                <div className="w-9 h-9 rounded-xl bg-teal/15 flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-4 h-4 text-teal" />
                </div>
                <div>
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider leading-none mb-1">
                    Avg. Return on Ad Spend
                  </p>
                  <p className="text-sm font-black text-white leading-none">4.2× ROAS</p>
                </div>
              </div>

              {/* Floating: Active leads — bottom-right, desktop only */}
              <div className="hidden lg:flex absolute bottom-0 right-0 z-20 items-center gap-2.5 bg-charcoal-light/95 backdrop-blur-sm border border-gray-700/60 rounded-2xl px-3.5 py-2.5 shadow-2xl shadow-black/50">
                <div className="w-9 h-9 rounded-xl bg-green-500/15 flex items-center justify-center flex-shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                </div>
                <div>
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider leading-none mb-1">
                    New Leads This Week
                  </p>
                  <p className="text-sm font-black text-white leading-none">+47 qualified</p>
                </div>
              </div>

              {/* Floating: No contracts — top-right, desktop only */}
              <div className="hidden lg:flex absolute top-0 right-0 z-20 items-center gap-2 bg-charcoal-light/95 backdrop-blur-sm border border-gray-700/60 rounded-2xl px-3 py-2 shadow-xl shadow-black/50">
                <ShieldCheck className="w-4 h-4 text-teal flex-shrink-0" />
                <div>
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider leading-none mb-0.5">
                    Contract
                  </p>
                  <p className="text-xs font-black text-white leading-none">Month-to-Month</p>
                </div>
              </div>

              <HeroMoveCard />
            </div>

          </div>
        </div>
      </section>

      {/* Niche Services Sections */}
      <section className="py-8 sm:py-16 md:py-28 bg-charcoal">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-5 sm:gap-8 md:gap-12 lg:gap-16">
            <Link to="/salon-marketing" className="p-5 sm:p-7 md:p-8 rounded-2xl bg-charcoal-light border border-gray-800 hover:border-teal/30 transition-colors block">
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-primary-foreground mb-3 sm:mb-4 leading-tight">
                Social Media & Paid Ads for <span className="text-gradient">Salons</span>
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Instagram and Facebook ads that bring consistent new bookings to your salon every week — without you lifting a finger. Most salon partners see a full appointment book within 30 days.
              </p>
            </Link>

            <Link to="/real-estate-marketing" className="p-5 sm:p-7 md:p-8 rounded-2xl bg-charcoal-light border border-gray-800 hover:border-teal/30 transition-colors block">
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-primary-foreground mb-3 sm:mb-4 leading-tight">
                Digital Marketing for <span className="text-gradient">Real Estate Agents</span>
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Qualified buyer and seller leads through hyper-targeted Meta and Google Ads. Spend less time chasing and more time closing — typically 15–30 new leads per month.
              </p>
            </Link>

            <Link to="/trades-marketing" className="p-5 sm:p-7 md:p-8 rounded-2xl bg-charcoal-light border border-gray-800 hover:border-teal/30 transition-colors block">
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-primary-foreground mb-3 sm:mb-4 leading-tight">
                Lead Generation for <span className="text-gradient">Trades Businesses</span>
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Plumbers, electricians, roofers, and contractors — ads that put you in front of homeowners who need you right now. Stop relying on word-of-mouth and start filling your schedule.
              </p>
            </Link>

            <Link to="/coaching-marketing" className="p-5 sm:p-7 md:p-8 rounded-2xl bg-charcoal-light border border-gray-800 hover:border-teal/30 transition-colors block">
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-primary-foreground mb-3 sm:mb-4 leading-tight">
                Marketing for <span className="text-gradient">Coaches & Consultants</span>
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Personal trainers, life coaches, and fitness studio owners — we build ad campaigns and content systems that attract your ideal clients and keep your calendar full.
              </p>
            </Link>
          </div>
        </div>
      </section>

      <ResultsProof />
      <ProcessDark />
      <ServicesDark />
      <TestimonialsDark />
      <div id="digital-arsenal">
        <DigitalArsenal />
      </div>
      <MarketingAuditAI />
      <Pricing />

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
              { city: 'Surrey', href: '/surrey', sub: 'South Fraser' },
              { city: 'Burnaby', href: '/burnaby', sub: 'Tri-Cities' },
              { city: 'Langley', href: '/langley', sub: 'Fraser Valley' },
              { city: 'Coquitlam', href: '/coquitlam', sub: 'Tri-Cities' },
            ].map(({ city, href, sub }) => (
              <Link
                key={href}
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
