import { TrendingUp, Eye, MousePointerClick, Clock } from 'lucide-react';

const metrics = [
  {
    icon: TrendingUp,
    value: '3.2x',
    label: 'Average Revenue Increase',
    description: 'Our clients see significant revenue growth within the first 6 months',
  },
  {
    icon: Eye,
    value: '250%',
    label: 'More Visibility',
    description: 'Increased brand awareness and organic reach across all platforms',
  },
  {
    icon: MousePointerClick,
    value: '45%',
    label: 'Higher Conversions',
    description: 'Optimized funnels that turn more visitors into paying customers',
  },
  {
    icon: Clock,
    value: '90 Days',
    label: 'To See Results',
    description: 'Our proven system delivers measurable results in just 90 days',
  },
];

const Benefits = () => {
  return (
    <section id="benefits" className="section-padding bg-background">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <span className="text-teal font-semibold text-sm uppercase tracking-wider mb-4 block">
              Why Choose Us
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Real Results,{' '}
              <span className="text-gradient">Not Empty Promises</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              We're not just another agency—we're your growth partner. Our data-driven 
              approach ensures every dollar you invest works harder for your business.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center">
                  <span className="text-teal font-bold">01</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Niche Expertise
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Specialized strategies for salons, real estate, trades, and coaching businesses.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center">
                  <span className="text-teal font-bold">02</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Transparent Reporting
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Weekly updates and monthly deep-dives so you always know what's working.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center">
                  <span className="text-teal font-bold">03</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Performance Guarantee
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    If we don't hit agreed targets in 90 days, the next month is on us.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-4 lg:gap-6">
            {metrics.map((metric, index) => (
              <div
                key={metric.label}
                className="bg-card rounded-xl p-6 border border-border card-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                  <metric.icon className="w-5 h-5 text-teal" />
                </div>
                <div className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                  {metric.value}
                </div>
                <div className="text-sm font-semibold text-foreground mb-1">
                  {metric.label}
                </div>
                <p className="text-xs text-muted-foreground">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
