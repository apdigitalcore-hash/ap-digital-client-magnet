import { ArrowRight, Search, Rocket, TrendingUp } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Audit',
    description: 'We analyze your current marketing, identify gaps, and map out exactly what\'s working and what\'s not.',
    deliverable: 'Custom growth roadmap',
  },
  {
    number: '02',
    icon: Rocket,
    title: 'Launch',
    description: 'We build and launch high-converting campaigns using short-form content and targeted paid ads.',
    deliverable: 'Live campaigns in 2 weeks',
  },
  {
    number: '03',
    icon: TrendingUp,
    title: 'Optimize',
    description: 'We continuously refine your campaigns to maximize leads and lower your cost per acquisition.',
    deliverable: 'Weekly performance reports',
  },
];

const ProcessDark = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-background">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            A proven 3-step process to predictable lead generation.
          </p>
        </div>

        {/* Process steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[calc(50%+60px)] w-[calc(100%-120px)] h-px">
                  <div className="w-full h-full bg-gradient-to-r from-teal/50 to-teal/10" />
                  <ArrowRight className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-teal/50" />
                </div>
              )}

              <div className="text-center">
                {/* Icon container */}
                <div className="relative inline-flex mb-6">
                  <div className="w-24 h-24 rounded-2xl bg-teal/10 border border-teal/20 flex items-center justify-center">
                    <step.icon className="w-10 h-10 text-teal" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-teal text-white text-sm font-bold flex items-center justify-center">
                    {step.number}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {step.description}
                </p>
                <span className="inline-flex items-center gap-2 text-teal text-sm font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                  {step.deliverable}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessDark;
