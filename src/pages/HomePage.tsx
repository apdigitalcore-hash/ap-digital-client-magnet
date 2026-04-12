// HomePage - Main landing page for AP DIGITAL - Performance Marketing Agency
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Zap, Target, Users, TrendingUp } from 'lucide-react';
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
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
      <Header />

      {/* Hero Section - Split Layout */}
      <section className="relative min-h-screen flex bg-near-black overflow-hidden">
        {/* Left Content */}
        <div className="relative z-10 w-full lg:w-1/2 flex flex-col justify-between min-h-screen px-6 sm:px-10 lg:px-16 pt-28 pb-12">
          <div className="flex-1 flex flex-col justify-center max-w-xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-teal/20 text-teal mb-8 w-fit animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
              <span className="text-sm font-bold uppercase tracking-widest">#1 Marketing Agency in Canada</span>
            </div>

            {/* Headline */}
            <h1
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold text-primary-foreground leading-[1.15] tracking-normal mb-6 animate-fade-up"
              style={{ animationDelay: '0.1s' }}
            >
              Digital Marketing Agency Canada — Leads for Salons, Trades &amp; Real Estate
            </h1>

            {/* Subheadline */}
            <p
              className="text-base md:text-lg text-muted-foreground max-w-md mb-10 animate-fade-up leading-relaxed"
              style={{ animationDelay: '0.2s' }}
            >
              We help local businesses generate leads, boost visibility, and scale revenue—guaranteed results in 90 days.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-wrap items-center gap-4 animate-fade-up"
              style={{ animationDelay: '0.3s' }}
            >
              <Button variant="hero" size="xl" asChild className="shadow-teal-lg">
                <Link to="/contact" className="flex items-center gap-2">
                  Book a Free Strategy Call
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="light" size="lg" asChild>
                <a href="#how-it-works" className="flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  See How It Works
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Right Image - visible on all screens */}
        <div className="hidden lg:block w-1/2 relative">
          <img
            src={heroImage}
            alt="Digital marketing agency creative"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-near-black via-near-black/40 to-transparent" />
        </div>

        {/* Mobile Hero Image */}
        <div className="block lg:hidden absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Digital marketing agency creative"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-near-black/60" />
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-teal rounded-full" />
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
                We run Instagram and Facebook ads that bring new bookings to your salon every week — without you lifting a finger.
                Our campaigns target local clients actively searching for hair, beauty, and wellness services in your area.
                Most salon partners see a full appointment book within the first 30 days.
              </p>
            </Link>

            <Link to="/real-estate-marketing" className="p-8 rounded-2xl bg-charcoal-light border border-gray-800 hover:border-teal/30 transition-colors block">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                Digital Marketing for <span className="text-gradient">Real Estate Agents</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We generate qualified buyer and seller leads through hyper-targeted social media campaigns and Google Ads.
                Our proven funnels capture contact info and nurture prospects so you spend less time chasing and more time closing.
                Real estate agents we work with typically see 15–30 new leads per month.
              </p>
            </Link>

            <Link to="/trades-marketing" className="p-8 rounded-2xl bg-charcoal-light border border-gray-800 hover:border-teal/30 transition-colors block">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                Lead Generation for <span className="text-gradient">Trades Businesses</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Plumbers, electricians, roofers, and contractors — we build ad campaigns that put your business in front of homeowners who need you right now.
                No more relying on word-of-mouth alone. Our clients consistently fill their schedules with high-value jobs week after week.
              </p>
            </Link>

            <Link to="/coaching-marketing" className="p-8 rounded-2xl bg-charcoal-light border border-gray-800 hover:border-teal/30 transition-colors block">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                Marketing for <span className="text-gradient">Private Coaches & Trainers</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Whether you're a personal trainer, life coach, or fitness studio owner, we create content and ad campaigns that attract your ideal clients.
                Our systems automate lead capture and follow-up so you can focus on coaching.
                Most coaches double their client base within 90 days of working with us.
              </p>
            </Link>
          </div>
        </div>
      </section>

      <ResultsProof />
      
      <ProcessDark />
      <ServicesDark />
      <TestimonialsDark />

      <DarkCTA
        headline="Ready to Dominate Your Market?"
        subheadline="Book a free strategy call and discover how we can scale your business."
      />

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

      <DarkCTA
        headline="Ready to Get Predictable Leads?"
        subheadline="Book a free strategy call and see exactly how we can grow your leads and revenue."
      />

      <Footer />
    </main>
  );
};

export default HomePage;
