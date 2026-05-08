// HomePage - Main landing page for AP DIGITAL - Performance Marketing Agency
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Target, Users, TrendingUp, Instagram, Linkedin } from 'lucide-react';
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
      <section className="relative min-h-screen flex items-center bg-near-black overflow-hidden pt-20 sm:pt-24 pb-20 lg:py-0">

        {/* Background — gradient + Vancouver skyline silhouette */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-near-black to-charcoal-dark" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_75%_28%,_rgba(20,184,166,0.10)_0%,_transparent_70%)]" />

          {/* Vancouver skyline */}
          <svg
            viewBox="0 0 1440 280"
            preserveAspectRatio="xMidYMax slice"
            className="absolute bottom-0 left-0 right-0 w-full h-[220px] sm:h-[280px] md:h-[340px] pointer-events-none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="skylineMountain" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(170, 35%, 55%)" stopOpacity="0" />
                <stop offset="100%" stopColor="hsl(170, 40%, 55%)" stopOpacity="0.13" />
              </linearGradient>
              <linearGradient id="skylineCity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(170, 60%, 50%)" stopOpacity="0" />
                <stop offset="100%" stopColor="hsl(170, 65%, 55%)" stopOpacity="0.24" />
              </linearGradient>
              <radialGradient id="skylineGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="hsl(170, 85%, 55%)" stopOpacity="0.18" />
                <stop offset="100%" stopColor="hsl(170, 85%, 55%)" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* North Shore mountains — wavy ridge */}
            <path
              d="M0 132 L70 96 L140 112 L210 76 L290 102 L360 72 L430 96 L510 60 L590 88 L670 56 L760 92 L840 66 L920 96 L1010 60 L1100 92 L1190 66 L1280 96 L1370 72 L1440 88 L1440 280 L0 280 Z"
              fill="url(#skylineMountain)"
            />

            {/* Horizon glow — city lights at dusk */}
            <ellipse cx="720" cy="200" rx="700" ry="55" fill="url(#skylineGlow)" />

            {/* Downtown silhouette */}
            <g fill="url(#skylineCity)">
              {/* Stanley Park tree line */}
              <path d="M0 222 Q15 204 30 218 Q45 208 60 218 Q72 210 88 218 L88 280 L0 280 Z" />

              {/* Coal Harbour towers */}
              <rect x="100" y="158" width="32" height="122" />
              <rect x="138" y="172" width="28" height="108" />
              <rect x="172" y="146" width="38" height="134" />

              {/* Convention Centre — curving sail roof */}
              <path d="M220 200 Q240 168 260 178 Q272 156 292 172 Q304 162 316 176 L316 280 L220 280 Z" />

              {/* Harbour Centre — tower with observation disc */}
              <rect x="338" y="138" width="28" height="142" />
              <ellipse cx="352" cy="128" rx="22" ry="9" />
              <rect x="348" y="102" width="8" height="32" />

              {/* Downtown row */}
              <rect x="386" y="156" width="34" height="124" />
              <rect x="426" y="122" width="30" height="158" />
              <rect x="462" y="142" width="40" height="138" />
              <rect x="508" y="102" width="35" height="178" />

              {/* Mid-tall office tower */}
              <rect x="550" y="82" width="42" height="198" />
              <rect x="598" y="136" width="35" height="144" />

              {/* Living Shangri-La — tall thin */}
              <rect x="640" y="42" width="32" height="238" />

              {/* Mid buildings */}
              <rect x="680" y="126" width="40" height="154" />
              <rect x="726" y="98" width="38" height="182" />
              <rect x="770" y="116" width="35" height="164" />
              <rect x="812" y="140" width="42" height="140" />
              <rect x="860" y="92" width="32" height="188" />
              <rect x="898" y="120" width="35" height="160" />

              {/* Yaletown low-mid */}
              <rect x="940" y="146" width="40" height="134" />

              {/* BC Place dome */}
              <path d="M998 280 L998 202 Q1040 134 1086 202 L1086 280 Z" />

              {/* False Creek towers */}
              <rect x="1100" y="106" width="33" height="174" />
              <rect x="1140" y="132" width="38" height="148" />
              <rect x="1184" y="86" width="30" height="194" />

              {/* East side */}
              <rect x="1222" y="136" width="36" height="144" />
              <rect x="1264" y="116" width="42" height="164" />
              <rect x="1314" y="156" width="36" height="124" />
              <rect x="1356" y="172" width="40" height="108" />
              <rect x="1402" y="148" width="38" height="132" />
            </g>

            {/* Subtle horizon line */}
            <line
              x1="0"
              y1="216"
              x2="1440"
              y2="216"
              stroke="hsl(170, 60%, 55%)"
              strokeOpacity="0.08"
              strokeWidth="1"
            />
          </svg>
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
                className="text-base sm:text-lg text-gray-400 max-w-lg mx-auto lg:mx-0 mb-10 animate-fade-up leading-relaxed"
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
                    href="https://calendly.com/apdigital-core/30min"
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
                className="mt-10 text-xs text-gray-500 animate-fade-up text-center lg:text-left"
                style={{ animationDelay: '0.32s' }}
              >
                <span className="text-gray-300 font-semibold">2,400+ leads</span> delivered for <span className="text-gray-300 font-semibold">200+ BC businesses</span> &nbsp;·&nbsp; 90-day guarantee
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
                  href="https://www.linkedin.com/company/ap-digitalmarketing/?viewAsMember=true"
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

            {/* ── Right: Today's Move card ── */}
            <div
              className="animate-fade-up"
              style={{ animationDelay: '0.3s' }}
            >
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
