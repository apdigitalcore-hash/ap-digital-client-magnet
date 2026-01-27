import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, MapPin, TrendingUp, Search, Users, Phone, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const LocalMarketing = () => {
  useEffect(() => {
    document.title = 'Digital Marketing Agency in Pitt Meadows, BC | Local Lead Generation';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Digital marketing agency in Pitt Meadows, BC helping local businesses grow with targeted ads, SEO, and lead generation across British Columbia and Canada.');
    }
  }, []);

  const areas = [
    'Pitt Meadows',
    'Maple Ridge',
    'Port Coquitlam',
    'Coquitlam',
    'Vancouver',
    'Burnaby',
    'Surrey',
    'Langley',
  ];

  const benefits = [
    {
      icon: MapPin,
      title: 'Local Expertise',
      description: 'We understand the Pitt Meadows and BC market because we\'re based here and serve local businesses daily.',
    },
    {
      icon: Search,
      title: 'Local SEO',
      description: 'Get found when people in your area search for your services on Google.',
    },
    {
      icon: TrendingUp,
      title: 'Targeted Local Ads',
      description: 'Your ads reach customers in your exact service area — no wasted spend on people you can\'t serve.',
    },
    {
      icon: Users,
      title: 'Community Focus',
      description: 'We help you build a strong local presence and become the go-to business in your neighbourhood.',
    },
  ];

  const whyLocal = [
    'Face-to-face meetings when you need them',
    'Understanding of the local market and competition',
    'Quick response times in your timezone',
    'Knowledge of what works in BC and Canada',
    'Supporting local business growth',
  ];

  return (
    <main className="min-h-screen">
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
              Based in Pitt Meadows, BC
            </span>
            
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              Digital Marketing Agency in Pitt Meadows Helping{' '}
              <span className="text-gradient">Businesses Grow</span>
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mb-10">
              We're a local digital marketing agency based in Pitt Meadows, BC. We help businesses across British Columbia and Canada generate leads and grow with proven marketing strategies.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" asChild>
                <Link to="/contact" className="flex items-center gap-2">
                  Book a Free Local Growth Audit
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="light" size="lg" asChild>
                <a href="#why-local" className="flex items-center gap-2">
                  Why Choose Local
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Areas We Serve */}
      <section className="py-12 bg-background border-b border-border">
        <div className="container-custom">
          <p className="text-center text-muted-foreground mb-6">Serving businesses in:</p>
          <div className="flex flex-wrap justify-center gap-4">
            {areas.map((area) => (
              <span key={area} className="px-4 py-2 rounded-full bg-secondary text-foreground font-medium">
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Why Local Marketing */}
      <section className="section-padding bg-background" id="why-local">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why Local Marketing Matters
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                If you serve customers in a specific area, you need marketing that reaches those customers — not random people across the country.
              </p>
              <p className="text-muted-foreground text-lg mb-8">
                Local marketing ensures every dollar you spend goes toward attracting customers who can actually hire you. Whether you're a salon in Pitt Meadows, a contractor in Vancouver, or a realtor in Surrey, we help you dominate your local market.
              </p>
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact" className="flex items-center gap-2">
                  Get Your Free Audit
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
            <div className="bg-card p-8 rounded-2xl border border-border">
              <h3 className="font-display text-2xl font-bold text-foreground mb-6">
                Benefits of a Local Agency
              </h3>
              <ul className="space-y-4">
                {whyLocal.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Local Marketing Services in BC
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to grow your business in Pitt Meadows and beyond
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-card p-8 rounded-xl border border-border">
                <div className="w-14 h-14 rounded-lg bg-teal/10 flex items-center justify-center mb-6">
                  <benefit.icon className="w-7 h-7 text-teal" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pitt Meadows Focus */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <Building className="w-16 h-16 text-teal mx-auto mb-6" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Proudly Based in Pitt Meadows, BC
            </h2>
            <div className="prose prose-lg text-muted-foreground mx-auto">
              <p>
                AP DIGITAL is headquartered in Pitt Meadows, British Columbia. We're part of this community, and we're committed to helping local businesses thrive.
              </p>
              <p>
                While we serve clients across Canada, our roots are here in BC. We understand the unique challenges and opportunities that businesses in the Lower Mainland face, and we use that knowledge to deliver better results for our clients.
              </p>
              <p>
                <strong className="text-foreground">Ready to grow your local business?</strong> Let's talk about how we can help you attract more customers in your area.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Ready to Grow Your Local Business?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Book a free local growth audit and see exactly how we can help you attract more customers in Pitt Meadows, BC, and beyond.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" asChild>
                <Link to="/contact" className="flex items-center gap-2">
                  Book a Free Local Growth Audit
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
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

export default LocalMarketing;
