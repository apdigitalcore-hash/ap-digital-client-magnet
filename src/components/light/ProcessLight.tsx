import { Search, Rocket, TrendingUp, ArrowRight } from 'lucide-react';
import SectionLabel from './SectionLabel';

const steps = [
  {
    number: '01',
    icon: Search,
    label: 'Audit',
    title: 'We audit everything.',
    description:
      'Your ads, your funnel, your competitors. We find the gaps costing you money and map out exactly where the leads are hiding.',
    deliverable: 'Custom growth roadmap',
    stat: '48hr',
    statLabel: 'turnaround',
  },
  {
    number: '02',
    icon: Rocket,
    label: 'Launch',
    title: 'Campaigns go live.',
    description:
      'High-converting Meta & Google Ads, scroll-stopping content, and landing pages built to capture — launched in under 2 weeks.',
    deliverable: 'Live campaigns in 2 weeks',
    stat: '14',
    statLabel: 'days to launch',
  },
  {
    number: '03',
    icon: TrendingUp,
    label: 'Optimize',
    title: 'We optimize relentlessly.',
    description:
      'Weekly A/B tests, bid adjustments, creative refreshes, and performance reports. Your campaigns get better every single week.',
    deliverable: 'Weekly performance reports',
    stat: '340%',
    statLabel: 'avg traffic growth',
  },
];

const ProcessLight = () => (
  <section id="how-it-works" className="bg-background py-24 md:py-32">
    <div className="container-custom">
      <div className="mb-16 text-center">
        <SectionLabel number="002" label="Process" />
        <h2 className="mt-6 font-serif text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
          How It <span className="italic">Works</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground">
          A proven 3-step process to predictable lead generation.
        </p>
      </div>

      {/* Vertical timeline */}
      <div className="relative mx-auto max-w-4xl">
        <div
          className="absolute left-6 top-0 hidden h-full border-l border-dashed border-foreground/15 md:left-1/2 md:block"
          aria-hidden="true"
        />

        <div className="space-y-6 md:space-y-10">
          {steps.map((step, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div key={step.number} className="relative md:grid md:grid-cols-2 md:items-center md:gap-12">
                {/* Node */}
                <span
                  className="absolute left-1/2 top-1/2 hidden h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/20 bg-background md:block"
                  aria-hidden="true"
                >
                  <span className="absolute inset-[3px] rounded-full bg-foreground" />
                </span>

                {/* Content */}
                <div
                  className={`rounded-3xl bg-secondary p-7 sm:p-9 ${
                    isLeft ? 'md:col-start-1 md:text-right' : 'md:col-start-2'
                  }`}
                >
                  <div
                    className={`mb-5 flex items-center gap-4 ${isLeft ? 'md:flex-row-reverse' : ''}`}
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-background shadow-custom-sm">
                      <step.icon className="h-5 w-5 text-foreground" strokeWidth={1.5} />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                      {step.number} / {step.label}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-medium leading-tight text-foreground sm:text-3xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {step.description}
                  </p>

                  <div
                    className={`mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-foreground/10 pt-5 ${
                      isLeft ? 'md:justify-end' : ''
                    }`}
                  >
                    <span className="text-xs font-medium text-foreground/70">{step.deliverable}</span>
                    <span className="flex items-baseline gap-2">
                      <span className="font-serif text-xl text-foreground">{step.stat}</span>
                      <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                        {step.statLabel}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-14 text-center">
        <a
          href="https://calendly.com/apdigital-core/20min"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-background transition-colors hover:bg-foreground/85"
        >
          Book Free Call
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  </section>
);

export default ProcessLight;
