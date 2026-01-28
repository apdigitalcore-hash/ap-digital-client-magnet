import { Link } from 'react-router-dom';
import { ArrowRight, Play, CheckCircle, Users, TrendingUp, Target, Zap, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { organizationSchema, getWebPageSchema } from '@/lib/structuredData';

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

  const niches = [
    { name: 'Salons & Beauty', icon: '💇', link: '/salon-marketing' },
    { name: 'Real Estate Agents', icon: '🏠', link: '/real-estate-marketing' },
    { name: 'Trades & Contractors', icon: '🔧', link: '/trades-marketing' },
    { name: 'Coaches & Consultants', icon: '🎯', link: '/local-marketing' },
  ];

  const steps = [
    {
      number: '01',
      title: 'Audit',
      description: 'We analyze your current marketing, identify gaps, and map out exactly what\'s working and what\'s not.',
    },
    {
      number: '02',
      title: 'Launch',
      description: 'We build and launch high-converting campaigns using short-form content and targeted paid ads.',
    },
    {
      number: '03',
      title: 'Optimize',
      description: 'We continuously refine your campaigns to maximize leads and lower your cost per acquisition.',
    },
  ];

  const differentiators = [
    {
      icon: Zap,
      title: 'No Long-Term Contracts',
      description: 'Month-to-month flexibility. We earn your business every month.',
    },
    {
      icon: Target,
      title: 'Results-Focused',
      description: 'We track leads and revenue, not vanity metrics like impressions.',
    },
    {
      icon: Users,
      title: 'Niche Expertise',
      description: 'We specialize in local service businesses across Canada.',
    },
    {
      icon: TrendingUp,
      title: 'Proven Systems',
      description: 'Battle-tested strategies that have generated thousands of leads.',
    },
  ];

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
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center gradient-hero overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-teal blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-teal-light blur-3xl" />
        </div>

        <div className="container-custom relative z-10 pt-24 pb-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 border border-teal/20 text-teal mb-8 animate-fade-up">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">Serving Businesses Across Canada</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Digital Marketing Agency Helping Local Businesses Get{' '}
              <span className="text-gradient">Consistent Leads</span>
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              We help salons, real estate agents, trades, and coaches get predictable leads using short-form content and paid ads — without long-term contracts.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <Button variant="hero" size="xl" asChild>
                <Link to="/contact" className="flex items-center gap-2">
                  Book a Free Growth Audit
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

            <div className="mt-16 pt-12 border-t border-primary-foreground/10 animate-fade-up" style={{ animationDelay: '0.4s' }}>
              <p className="text-primary-foreground/60 text-sm mb-6">Based in British Columbia, serving all of Canada</p>
              <div className="flex flex-wrap justify-center items-center gap-4">
                {['Pitt Meadows', 'Vancouver', 'Surrey', 'Burnaby', 'Toronto', 'Coquitlam', 'Calgary', 'Langley', 'Edmonton'].map((city) => (
                  <span key={city} className="px-3 py-1 rounded-full bg-primary-foreground/10 text-primary-foreground/70 text-sm">
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Help Section */}
      <section className="section-padding bg-background" id="who-we-help">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Who We Help
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We specialize in marketing for local service businesses across Canada who want more leads without the guesswork.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {niches.map((niche) => (
              <Link
                key={niche.name}
                to={niche.link}
                className="group p-8 bg-card rounded-xl border border-border hover:border-teal/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-4xl mb-4">{niche.icon}</div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-teal transition-colors">
                  {niche.name}
                </h3>
                <span className="text-teal text-sm font-medium flex items-center gap-1">
                  Learn More <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-padding bg-secondary" id="how-it-works">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A simple 3-step process to get you more leads in Canada
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                <div className="bg-card p-8 rounded-xl border border-border h-full">
                  <span className="text-6xl font-display font-bold text-teal/20">{step.number}</span>
                  <h3 className="font-display text-2xl font-bold text-foreground mt-4 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-teal" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Makes Us Different
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              No fluff. No buzzwords. Just real results for Canadian businesses.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentiators.map((item) => (
              <div key={item.title} className="p-6 bg-card rounded-xl border border-border">
                <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-teal" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Trusted by Local Businesses Across Canada
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              From Pitt Meadows, BC to Toronto, ON — we've helped service businesses generate consistent leads and grow their revenue.
            </p>
            
            <div className="grid grid-cols-3 gap-8 mb-12">
              <div>
                <div className="text-4xl font-display font-bold text-teal">72+</div>
                <div className="text-primary-foreground/70 text-sm">Clients Served</div>
              </div>
              <div>
                <div className="text-4xl font-display font-bold text-teal">$630k</div>
                <div className="text-primary-foreground/70 text-sm">Revenue Generated</div>
              </div>
              <div>
                <div className="text-4xl font-display font-bold text-teal">90 Day</div>
                <div className="text-primary-foreground/70 text-sm">Results Guarantee</div>
              </div>
            </div>

            <Button variant="hero" size="xl" asChild>
              <Link to="/contact" className="flex items-center gap-2">
                Book a Free Growth Audit
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Get More Leads?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Book a free growth audit and see exactly how we can help your business grow in Canada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" asChild>
                <Link to="/contact" className="flex items-center gap-2">
                  Book a Free Growth Audit
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="tel:+17786825772" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Call Us Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default HomePage;
