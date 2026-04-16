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

import { organizationSchema, getWebSiteSchema, getWebPageSchema, getBreadcrumbSchema } from '@/lib/structuredData';
import heroImage from '@/assets/hero-split.jpg';

const TITLE = 'Digital Marketing Agency Vancouver | AP Digital';
const DESC = 'AP Digital helps salons, trades, real estate agents & coaches get predictable leads using paid ads & social media. Based in Vancouver, BC. Month-to-month.';
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
        <meta name="keywords" content="digital marketing agency Canada, marketing agency Vancouver BC, lead generation Canada, salon marketing, real estate marketing, trades marketing" />
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
        <link rel="preload" as="image" href={heroImage} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
      <Header />

      {/* Hero Section - Clean Centered */}
      <section className="relative min-h-screen flex items-center justify-center bg-near-black overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Digital marketing agency for local businesses in Vancouver BC"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
            fetchPriority="high"
            loading="eager"
            decoding="sync"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,_rgba(255,255,255,0.08)_0%,_transparent_60%)]" />
          <div className="absolute inset-0 bg-near-black/60" />
        </div>

        {/* Centered content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* Eyebrow */}
          <p className="text-sm md:text-base uppercase tracking-[0.3em] text-muted-foreground mb-8 animate-fade-up font-medium">
            AP Digital Marketing
          </p>

          {/* Headline */}
          <h1
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-[1.08] tracking-tight mb-8 animate-fade-up"
            style={{ animationDelay: '0.1s' }}
          >
            Website Design &{' '}
            <br className="hidden sm:block" />
            Marketing Systems
          </h1>

          {/* Subheadline */}
          <p
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-up leading-relaxed"
            style={{ animationDelay: '0.2s' }}
          >
            Marketing does not have to be complicated.
            We provide the tools and systems you need to
            succeed. Your job is to show up and close them.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap items-center justify-center gap-4 animate-fade-up"
            style={{ animationDelay: '0.3s' }}
          >
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact" className="flex items-center gap-2">
                Book a Strategy Call
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="light" size="lg" asChild>
              <a href="#services">
                See What's Included
              </a>
            </Button>
          </div>
        </div>

        {/* Bottom trust bar */}
        <div className="absolute bottom-8 left-0 right-0 z-10 animate-fade-up" style={{ animationDelay: '0.5s' }}>
          <div className="flex items-center justify-center gap-10 md:gap-16 opacity-40">
            {['Google', 'Facebook', 'Instagram', 'LinkedIn'].map(brand => (
              <span key={brand} className="text-primary-foreground font-display font-semibold text-sm md:text-base tracking-wide">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Niche Services Sections */}
      <section className="py-20 md:py-28 bg-charcoal">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            <Link to="/salon-marketing" className="p-8 rounded-2xl bg-charcoal-light border border-gray-800 hover:border-teal/30 transition-colors block">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                Social Media & Paid Ads for <span className="text-gradient">Salons</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Instagram and Facebook ads that bring consistent new bookings to your salon every week — without you lifting a finger. Most salon partners see a full appointment book within 30 days.
              </p>
            </Link>

            <Link to="/real-estate-marketing" className="p-8 rounded-2xl bg-charcoal-light border border-gray-800 hover:border-teal/30 transition-colors block">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                Digital Marketing for <span className="text-gradient">Real Estate Agents</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Qualified buyer and seller leads through hyper-targeted Meta and Google Ads. Spend less time chasing and more time closing — typically 15–30 new leads per month.
              </p>
            </Link>

            <Link to="/trades-marketing" className="p-8 rounded-2xl bg-charcoal-light border border-gray-800 hover:border-teal/30 transition-colors block">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                Lead Generation for <span className="text-gradient">Trades Businesses</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Plumbers, electricians, roofers, and contractors — ads that put you in front of homeowners who need you right now. Stop relying on word-of-mouth and start filling your schedule.
              </p>
            </Link>

            <Link to="/coaching-marketing" className="p-8 rounded-2xl bg-charcoal-light border border-gray-800 hover:border-teal/30 transition-colors block">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                Marketing for <span className="text-gradient">Coaches & Consultants</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
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

      {/* What Makes Us Different */}
      <section className="py-20 md:py-28 bg-charcoal">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4">
              Why <span className="text-gradient">Choose Us</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              No fluff. No buzzwords. Just results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentiators.map((item) => (
              <div key={item.title} className="p-6 rounded-2xl bg-charcoal-light border border-gray-800 hover:border-teal/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-teal" />
                </div>
                <h3 className="font-display text-lg font-semibold text-primary-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities We Serve */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Cities We <span className="text-gradient">Serve</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Based in the Lower Mainland, we serve local businesses across Metro Vancouver and the Fraser Valley.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { city: 'Surrey', href: '/surrey', sub: 'South Fraser' },
              { city: 'Burnaby', href: '/burnaby', sub: 'Tri-Cities' },
              { city: 'Langley', href: '/langley', sub: 'Fraser Valley' },
              { city: 'Coquitlam', href: '/coquitlam', sub: 'Tri-Cities' },
            ].map(({ city, href, sub }) => (
              <Link
                key={href}
                to={href}
                className="group bg-card border border-border rounded-2xl p-6 text-center hover:border-teal/40 transition-colors"
              >
                <div className="font-display text-xl font-bold text-foreground group-hover:text-teal transition-colors mb-1">{city}</div>
                <div className="text-muted-foreground text-sm">{sub}</div>
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
