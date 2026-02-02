// HomePage - Main landing page for AP DIGITAL - Performance Marketing Agency
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Zap, Target, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import ResultsProof from '@/components/ResultsProof';
import VisualShowcase from '@/components/VisualShowcase';
import ServicesDark from '@/components/ServicesDark';
import TestimonialsDark from '@/components/TestimonialsDark';
import ProcessDark from '@/components/ProcessDark';
import DarkCTA from '@/components/DarkCTA';
import Portfolio from '@/components/Portfolio';
import { organizationSchema, getWebPageSchema } from '@/lib/structuredData';
import { useIsMobile } from '@/hooks/use-mobile';
import heroVideo from '@/assets/hero-video.mp4';
import heroFallback from '@/assets/hero-fallback.jpg';

const HomePage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema,
      getWebPageSchema(
        "Digital Marketing Agency in Canada",
        "AP DIGITAL is a Canadian digital marketing agency helping salons, real estate agents, trades, and coaches get predictable leads using short-form content and paid ads.",
        "/"
      )
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

  const isMobile = useIsMobile();

  return (
    <main className="min-h-screen">
      <SEOHead
        title="Digital Marketing Agency in Canada | Get More Leads & Sales"
        description="AP DIGITAL is a Canadian digital marketing agency helping salons, real estate agents, trades, and coaches get predictable leads using short-form content and paid ads."
        canonicalUrl="/"
        keywords="digital marketing agency Canada, marketing agency BC, lead generation Canada, Pitt Meadows marketing"
        structuredData={structuredData}
      />
      <Header />
      
      {/* Hero Section - Dark, Bold, Minimal */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-near-black">
        {/* Video/Image Background with heavy overlay */}
        <div className="absolute inset-0 z-0">
          {!isMobile ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-40"
              poster={heroFallback}
            >
              <source src={heroVideo} type="video/mp4" />
            </video>
          ) : (
            <img
              src={heroFallback}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
          )}
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-near-black via-near-black/90 to-near-black" />
        </div>

        {/* Accent glow */}
        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-teal/10 rounded-full blur-3xl opacity-60" />
        </div>

        <div className="container-custom relative z-10 pt-32 pb-20">
          <div className="max-w-5xl mx-auto text-center">
            {/* Minimal badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 border border-teal/20 text-teal mb-8 animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
              <span className="text-sm font-semibold uppercase tracking-wider">Performance Marketing Agency</span>
            </div>

            {/* Bold headline - reduced text */}
            <h1 
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-primary-foreground leading-[1.1] mb-6 animate-fade-up" 
              style={{ animationDelay: '0.1s' }}
            >
               Digital Marketing Built to Generate
               <br />
               <span className="text-gradient">Qualified Leads.</span>
            </h1>

            {/* Short subheadline */}
            <p 
              className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-10 animate-fade-up" 
              style={{ animationDelay: '0.2s' }}
            >
              Trusted by 150+ Canadian service businesses to drive qualified leads on autopilot.
            </p>

            {/* CTAs */}
            <div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up" 
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

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
          <div className="w-6 h-10 rounded-full border-2 border-gray-600 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-teal rounded-full" />
          </div>
        </div>
      </section>

      {/* Results / Proof Section - Right after hero */}
      <ResultsProof />

      {/* Visual Showcase - Content that converts */}
      <VisualShowcase />

      {/* Process Section */}
      <ProcessDark />

      {/* Services Section */}
      <ServicesDark />

      {/* Testimonials */}
      <TestimonialsDark />

      {/* Mid-page CTA */}
      <DarkCTA 
        headline="Ready to Dominate Your Market?" 
        subheadline="Book a free strategy call and discover how we can scale your business."
      />

      {/* Portfolio */}
      <Portfolio />

      {/* What Makes Us Different */}
      <section className="py-20 md:py-28 bg-charcoal">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4">
              Why <span className="text-gradient">Choose Us</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
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
                <p className="text-gray-500 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <DarkCTA />

      <Footer />
    </main>
  );
};

export default HomePage;
