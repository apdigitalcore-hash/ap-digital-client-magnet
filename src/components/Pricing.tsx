import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const packages = [
  {
    name: 'Starter',
    price: '$699',
    period: '/month',
    description: 'Perfect for small businesses starting their digital journey',
    features: [
      'Social media management (2 platforms)',
      'Content calendar & 12 posts/month',
      'Basic SEO optimization',
      'Monthly performance report',
      'Email support',
    ],
    popular: false,
  },
  {
    name: 'Growth',
    price: '$2,100',
    period: '/month',
    description: 'For businesses ready to accelerate their growth',
    features: [
      'Everything in Starter, plus:',
      'Paid advertising (up to $1k ad spend)',
      'Social media (3 platforms)',
      '20 posts/month + stories',
      'Advanced SEO & local listings',
      'Weekly reporting & strategy calls',
      'Priority support',
    ],
    popular: true,
  },
  {
    name: 'Scale',
    price: '$4,500',
    period: '/month',
    description: 'Full-service marketing for maximum impact',
    features: [
      'Everything in Growth, plus:',
      'Paid advertising (up to $3k ad spend)',
      'All major social platforms',
      'Video content production',
      'Email marketing automation',
      'Conversion rate optimization',
      'Dedicated account manager',
    ],
    popular: false,
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="section-padding bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-teal font-semibold text-sm uppercase tracking-wider mb-4 block">
            Pricing
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Transparent Pricing,{' '}
            <span className="text-gradient">Real Results</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Choose the package that fits your goals. All plans include our 90-day results guarantee.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-start">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`relative rounded-2xl p-8 border ${
                pkg.popular
                  ? 'bg-primary border-teal shadow-teal md:scale-105'
                  : 'bg-card border-border'
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-teal text-accent-foreground text-sm font-semibold rounded-full">
                  Most Popular
                </div>
              )}

              {/* Header */}
              <div className="mb-8">
                <h3 className={`font-display text-xl font-bold mb-2 ${
                  pkg.popular ? 'text-primary-foreground' : 'text-foreground'
                }`}>
                  {pkg.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className={`text-4xl md:text-5xl font-display font-bold ${
                    pkg.popular ? 'text-primary-foreground' : 'text-foreground'
                  }`}>
                    {pkg.price}
                  </span>
                  <span className={pkg.popular ? 'text-primary-foreground/70' : 'text-muted-foreground'}>
                    {pkg.period}
                  </span>
                </div>
                <p className={`text-sm ${
                  pkg.popular ? 'text-primary-foreground/70' : 'text-muted-foreground'
                }`}>
                  {pkg.description}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                      pkg.popular ? 'text-teal' : 'text-teal'
                    }`} />
                    <span className={`text-sm ${
                      pkg.popular ? 'text-primary-foreground/90' : 'text-foreground'
                    }`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant={pkg.popular ? 'hero' : 'outline'}
                className="w-full"
                asChild
              >
                <a href="https://calendly.com/apdigital-core/20min" target="_blank" rel="noopener noreferrer">
                  Get Started
                </a>
              </Button>
            </div>
          ))}
        </div>

        {/* Custom Plans */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Need something custom? We create tailored solutions for unique needs.
          </p>
          <a
            href="https://calendly.com/apdigital-core/20min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-teal font-semibold hover:underline"
          >
            Request Custom Plan
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
