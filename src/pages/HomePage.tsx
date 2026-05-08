// HomePage - Main landing page for AP DIGITAL - Performance Marketing Agency
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Target, Users, TrendingUp } from 'lucide-react';
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

        {/* Background — single subtle gradient */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-near-black to-charcoal-dark" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_75%_30%,_rgba(20,184,166,0.10)_0%,_transparent_70%)]" />
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
