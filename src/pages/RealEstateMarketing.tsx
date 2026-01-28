import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Home, TrendingUp, Video, MapPin, Users, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { getServiceSchema, getBreadcrumbSchema } from '@/lib/structuredData';

const RealEstateMarketing = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      getServiceSchema(
        "Real Estate Marketing Services",
        "Marketing agency for real estate agents in Canada. We help realtors generate buyer and seller leads with targeted ads and short-form video content.",
        "https://apdigital.lovable.app/real-estate-marketing"
      ),
      getBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Real Estate Marketing", url: "/real-estate-marketing" }
      ])
    ]
  };

  const problems = [
    'Spending money on Zillow/Realtor.ca with no results',
    'Cold calling leads that never convert',
    'Competing with agents who have bigger budgets',
    'Inconsistent deal flow month to month',
    'No time to build your personal brand',
    'Relying only on referrals and hope',
  ];

  const solutions = [
    {
      icon: Video,
      title: 'Personal Brand Videos',
      description: 'Position yourself as the go-to realtor in your market with authentic short-form video content that builds trust.',
    },
    {
      icon: MapPin,
      title: 'Hyperlocal Targeting',
      description: 'Reach buyers and sellers in your exact farm area with precision-targeted Facebook and Instagram ads.',
    },
    {
      icon: Home,
      title: 'Listing Promotion',
      description: 'Get maximum exposure for your listings with video tours and targeted ads that attract qualified buyers.',
    },
    {
      icon: Users,
      title: 'Lead Nurture Systems',
      description: 'Convert more leads with automated follow-up sequences that keep you top of mind.',
    },
  ];

  const results = [
    { metric: '10-15', description: 'Qualified leads per month' },
    { metric: '40%', description: 'Lower cost per lead vs portals' },
    { metric: '30 days', description: 'To see consistent lead flow' },
  ];

  return (
    <main className="min-h-screen">
      <SEOHead
        title="Marketing Agency for Real Estate Agents | More Buyer & Seller Leads"
        description="Marketing agency for real estate agents in Canada. We help realtors generate buyer and seller leads with targeted ads and short-form video content."
        canonicalUrl="/real-estate-marketing"
        keywords="real estate marketing agency, realtor marketing, real estate lead generation Canada, buyer seller leads"
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
              Marketing for Real Estate in Canada
            </span>
            
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              Marketing Agency for Realtors Focused on{' '}
              <span className="text-gradient">Lead Generation</span>
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mb-10">
              We help real estate agents across Canada generate consistent buyer and seller leads using short-form video and targeted paid advertising.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" asChild>
                <Link to="/contact" className="flex items-center gap-2">
                  Book a Free Realtor Strategy Call
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
                Tired of Chasing Dead-End Leads?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Most realtors we work with are frustrated with the same issues. If this sounds like you, we can help.
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
                The Real Estate Marketing Problem
              </h3>
              <p className="text-muted-foreground mb-6">
                Portal leads are expensive and everyone's competing for them. Cold outreach takes forever. And most "marketing agencies" just post pretty graphics that don't generate leads.
              </p>
              <p className="text-foreground font-medium">
                You need a system that positions you as the obvious choice in your market and brings leads directly to you.
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
              How We Generate Real Estate Leads
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A proven system for realtors who want consistent buyer and seller leads
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

      {/* Local Targeting Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6 text-center">
              Hyperlocal Targeting for Canadian Realtors
            </h2>
            <div className="prose prose-lg text-muted-foreground mx-auto">
              <p>
                We help realtors dominate their local market — whether you're in Vancouver, Toronto, Calgary, or anywhere in between.
              </p>
              <p>
                Our hyperlocal approach means your ads reach the right people: homeowners thinking about selling, first-time buyers searching for homes, and investors looking for opportunities — all within your specific service areas.
              </p>
              <p>
                No more wasting money on leads from outside your market. Every dollar goes toward <strong className="text-foreground">attracting qualified buyers and sellers in your area</strong>.
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
              Real Results for Realtors
            </h2>
            <p className="text-primary-foreground/80 text-lg">
              What our real estate clients typically experience
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
                Book a Free Realtor Strategy Call
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
              Ready to Generate More Leads?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Book a free strategy call and see exactly how we can help you get more buyer and seller leads.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" asChild>
                <Link to="/contact" className="flex items-center gap-2">
                  Book a Free Realtor Strategy Call
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

export default RealEstateMarketing;
