import { ClipboardCheck, Lightbulb, Rocket, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: ClipboardCheck,
    title: 'Audit',
    subtitle: 'Deep-Dive Analysis',
    description: 'We analyze your current marketing, competitors, and target audience to identify gaps and opportunities for growth.',
    details: [
      'Competitor analysis',
      'Website & SEO audit',
      'Social media review',
      'Audience research',
    ],
  },
  {
    number: '02',
    icon: Lightbulb,
    title: 'Strategy',
    subtitle: 'Custom Game Plan',
    description: 'Based on our findings, we create a tailored marketing strategy designed specifically for your niche and goals.',
    details: [
      'Channel selection',
      'Content strategy',
      'Budget allocation',
      'KPI definition',
    ],
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Scale',
    subtitle: 'Execute & Grow',
    description: 'We implement, optimize, and scale your campaigns while you focus on serving your new flood of customers.',
    details: [
      'Campaign launch',
      'Continuous optimization',
      'Performance reporting',
      'Scaling winners',
    ],
  },
];

const Process = () => {
  return (
    <section id="process" className="section-padding gradient-navy overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-teal font-semibold text-sm uppercase tracking-wider mb-4 block">
            Our Process
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Simple. Proven.{' '}
            <span className="text-gradient">Effective.</span>
          </h2>
          <p className="text-primary-foreground/70 text-lg">
            Our 3-step framework helps local businesses achieve predictable,
            sustainable growth. Here's how it works.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection Line (Desktop) */}
          <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-teal/0 via-teal/50 to-teal/0" />

          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              {/* Card */}
              <div className="bg-primary-foreground/5 backdrop-blur-sm rounded-2xl p-8 border border-primary-foreground/10 hover:border-teal/30 transition-colors group">
                {/* Step Number & Icon */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-teal/20 flex items-center justify-center group-hover:bg-teal/30 transition-colors">
                    <step.icon className="w-8 h-8 text-teal" />
                  </div>
                  <div>
                    <span className="text-teal font-mono text-sm">Step {step.number}</span>
                    <h3 className="font-display text-2xl font-bold text-primary-foreground">
                      {step.title}
                    </h3>
                  </div>
                </div>

                {/* Subtitle */}
                <div className="text-teal font-semibold mb-3">
                  {step.subtitle}
                </div>

                {/* Description */}
                <p className="text-primary-foreground/70 mb-6">
                  {step.description}
                </p>

                {/* Details */}
                <ul className="space-y-2">
                  {step.details.map((detail) => (
                    <li key={detail} className="flex items-center gap-2 text-sm text-primary-foreground/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Arrow (Mobile) */}
              {index < steps.length - 1 && (
                <div className="md:hidden flex justify-center my-4">
                  <ArrowRight className="w-6 h-6 text-teal rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
