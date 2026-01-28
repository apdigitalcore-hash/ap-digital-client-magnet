import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Calendar, TrendingUp, Video, Users, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { getServiceSchema, getBreadcrumbSchema } from '@/lib/structuredData';

const SalonMarketing = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      getServiceSchema(
        "Salon Marketing Services",
        "Marketing agency for salons in Canada. We help hair salons, beauty spas, and barber shops fill their chairs with short-form video content and targeted ads.",
        "https://apdigital.lovable.app/salon-marketing"
      ),
      getBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Salon Marketing", url: "/salon-marketing" }
      ])
    ]
  };

  const problems = [
    'Empty chairs during off-peak hours',
    'Relying on word-of-mouth alone',
    'Inconsistent bookings month to month',
    'Spending money on ads that don\'t work',
    'No time to create social media content',
    'Competing with big chains on price',
  ];

  const solutions = [
    {
      icon: Video,
      title: 'Short-Form Video Content',
      description: 'We create scroll-stopping Reels and TikToks showcasing your transformations that attract new clients in your area.',
    },
    {
      icon: TrendingUp,
      title: 'Targeted Local Ads',
      description: 'Reach people in your neighbourhood actively looking for salon services with precision-targeted paid campaigns.',
    },
    {
      icon: Calendar,
      title: 'Booking-Focused Strategy',
      description: 'Every piece of content and ad is designed with one goal: getting more clients to book appointments.',
    },
    {
      icon: Users,
      title: 'Retention Campaigns',
      description: 'Keep your existing clients coming back with strategic email and SMS follow-up sequences.',
    },
  ];

  const results = [
    { metric: '3x', description: 'Average increase in monthly bookings' },
    { metric: '45%', description: 'Reduction in empty chair time' },
    { metric: '2 weeks', description: 'Average time to first new clients' },
  ];

  return (
    <main className="min-h-screen">
      <SEOHead
        title="Marketing Agency for Salons | Get More Booked Appointments"
        description="Marketing agency for salons in Canada. We help hair salons, beauty spas, and barber shops fill their chairs with short-form video content and targeted ads."
        canonicalUrl="/salon-marketing"
        keywords="salon marketing agency, hair salon marketing, beauty salon ads, salon lead generation Canada"
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
              Marketing for Salons in Canada
            </span>
            
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              Marketing Agency for Salons That Fills Your Chairs{' '}
              <span className="text-gradient">Consistently</span>
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mb-10">
              We help hair salons, beauty spas, and barber shops across Canada get booked solid using short-form video content and targeted local ads.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" asChild>
                <Link to="/contact" className="flex items-center gap-2">
                  Book a Free Salon Growth Call
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

      {/* Problems Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Sound Familiar?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Most salon owners we talk to are dealing with these exact challenges. If you're nodding along, you're in the right place.
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
                The Real Problem?
              </h3>
              <p className="text-muted-foreground mb-6">
                Most salons don't have a marketing system. They post inconsistently, run random ads, and hope for the best. That's not a strategy — that's a gamble.
              </p>
              <p className="text-foreground font-medium">
                You need a predictable way to attract new clients and keep your chairs full — without spending all your time on marketing.
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
              How We Fill Your Chairs
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A proven salon marketing system designed to get you consistent bookings
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

      {/* Why Salons Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6 text-center">
              Why We Specialize in Salons
            </h2>
            <div className="prose prose-lg text-muted-foreground mx-auto">
              <p>
                We understand the salon industry because we've worked with dozens of salons across Canada — from small barbershops to multi-location beauty spas.
              </p>
              <p>
                We know that salon marketing isn't just about getting likes and followers. It's about getting real people through your door, sitting in your chairs, and booking their next appointment before they leave.
              </p>
              <p>
                That's why our entire strategy is built around <strong className="text-foreground">bookings and revenue</strong> — not vanity metrics that don't pay your bills.
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
              Real Results for Salons
            </h2>
            <p className="text-primary-foreground/80 text-lg">
              What our salon clients typically experience
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
                Book a Free Salon Growth Call
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
              Ready to Fill Your Chairs?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Book a free salon growth call and see exactly how we can help you get more bookings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" asChild>
                <Link to="/contact" className="flex items-center gap-2">
                  Book a Free Salon Growth Call
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

export default SalonMarketing;
