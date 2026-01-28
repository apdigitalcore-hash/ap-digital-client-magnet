import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Wrench, TrendingUp, MapPin, Phone, FileText, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { getServiceSchema, getBreadcrumbSchema } from '@/lib/structuredData';

const TradesMarketing = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      getServiceSchema(
        "Trades Marketing Services",
        "Marketing agency for trades in Canada. We help plumbers, roofers, HVAC, electricians, and contractors get job-ready leads with paid ads and landing pages.",
        "https://apdigital.lovable.app/trades-marketing"
      ),
      getBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Trades Marketing", url: "/trades-marketing" }
      ])
    ]
  };

  const trades = [
    'Plumbers',
    'Roofers',
    'HVAC Technicians',
    'Electricians',
    'General Contractors',
    'Landscapers',
    'Painters',
    'Flooring Installers',
  ];

  const problems = [
    'Relying on HomeStars or word of mouth',
    'Inconsistent work during slow seasons',
    'Competing with lowball contractors',
    'No time to follow up on leads',
    'Wasting money on ads that don\'t work',
    'Getting tire-kicker calls instead of real jobs',
  ];

  const solutions = [
    {
      icon: TrendingUp,
      title: 'High-Intent Paid Ads',
      description: 'Reach homeowners actively searching for your services on Google and Facebook with ads designed to generate calls.',
    },
    {
      icon: FileText,
      title: 'Conversion-Focused Landing Pages',
      description: 'Custom landing pages built to turn ad clicks into phone calls and quote requests.',
    },
    {
      icon: MapPin,
      title: 'Local Service Area Targeting',
      description: 'Your ads only show to homeowners in the neighbourhoods you want to work in — no wasted spend.',
    },
    {
      icon: Users,
      title: 'Lead Follow-Up Systems',
      description: 'Automated follow-up that converts more inquiries into booked jobs.',
    },
  ];

  const results = [
    { metric: '20-30', description: 'Job-ready leads per month' },
    { metric: '$15-40', description: 'Average cost per lead' },
    { metric: '2 weeks', description: 'To first qualified leads' },
  ];

  return (
    <main className="min-h-screen">
      <SEOHead
        title="Marketing Agency for Trades | Get More Local Service Leads"
        description="Marketing agency for trades in Canada. We help plumbers, roofers, HVAC, electricians, and contractors get job-ready leads with paid ads and landing pages."
        canonicalUrl="/trades-marketing"
        keywords="trades marketing agency, contractor marketing, plumber marketing, HVAC marketing Canada"
        structuredData={structuredData}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 gradient-hero overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-teal blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-teal-light blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 rounded-full bg-teal/10 border border-teal/20 text-teal text-sm font-medium mb-6">
              Marketing for Trades in Canada
            </span>
            
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              Marketing Agency for Trades That Delivers{' '}
              <span className="text-gradient">Job-Ready Leads</span>
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mb-10">
              We help tradespeople across Canada — plumbers, roofers, HVAC techs, electricians, and contractors — get consistent leads using paid ads and high-converting landing pages.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" asChild>
                <Link to="/contact" className="flex items-center gap-2">
                  Book a Free Trades Growth Call
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="light" size="lg" asChild>
                <a href="#how-we-help" className="flex items-center gap-2">
                  See How We Help
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trades We Work With */}
      <section className="py-12 bg-background border-b border-border">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4">
            {trades.map((trade) => (
              <span key={trade} className="px-4 py-2 rounded-full bg-secondary text-foreground font-medium">
                {trade}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Tired of Inconsistent Work?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Most trades businesses we talk to face the same challenges. If this sounds like you, we can help.
              </p>
              <ul className="space-y-4">
                {problems.map((problem) => (
                  <li key={problem} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-destructive text-sm">✕</span>
                    </div>
                    <span className="text-foreground">{problem}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card p-8 rounded-2xl border border-border">
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                The Trades Marketing Problem
              </h3>
              <p className="text-muted-foreground mb-6">
                You're great at your trade, but marketing? That's a different skill set. Most tradespeople waste thousands on marketing that doesn't work — or worse, don't market at all and rely on luck.
              </p>
              <p className="text-foreground font-medium">
                You need a proven system that brings job-ready leads directly to your phone — without you having to figure out the marketing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="section-padding bg-secondary" id="how-we-help">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              How We Get You Job-Ready Leads
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A proven lead generation system for trades businesses across Canada
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {solutions.map((solution) => (
              <div key={solution.title} className="bg-card p-8 rounded-xl border border-border">
                <div className="w-14 h-14 rounded-lg bg-teal/10 flex items-center justify-center mb-6">
                  <solution.icon className="w-7 h-7 text-teal" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {solution.title}
                </h3>
                <p className="text-muted-foreground">{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Focus Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6 text-center">
              Local Lead Generation for Canadian Trades
            </h2>
            <div className="prose prose-lg text-muted-foreground mx-auto">
              <p>
                We don't run generic campaigns. Every ad is targeted to your specific service area — whether you're serving Pitt Meadows, the Greater Vancouver Area, or anywhere in Canada.
              </p>
              <p>
                This means no wasted ad spend on leads outside your territory. Every lead is a potential job in a neighbourhood you actually want to work in.
              </p>
              <p>
                And because we build custom landing pages for each service you offer, you get <strong className="text-foreground">higher quality leads</strong> from homeowners who know exactly what they're looking for.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Real Results for Trades
            </h2>
            <p className="text-primary-foreground/80 text-lg">
              What our trades clients typically experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {results.map((result) => (
              <div key={result.metric} className="text-center">
                <div className="text-5xl font-display font-bold text-teal mb-2">
                  {result.metric}
                </div>
                <div className="text-primary-foreground/80">{result.description}</div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact" className="flex items-center gap-2">
                Book a Free Trades Growth Call
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
              Ready to Get More Jobs?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Book a free trades growth call and see exactly how we can help you get more leads.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" asChild>
                <Link to="/contact" className="flex items-center gap-2">
                  Book a Free Trades Growth Call
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

export default TradesMarketing;
