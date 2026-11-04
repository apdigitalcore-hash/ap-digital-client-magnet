import { Link } from 'react-router-dom';
import { ArrowRight, Search, Rocket, TrendingUp } from 'lucide-react';

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
    stat: 'Weekly',
    statLabel: 'tests & reporting',
  },
];

const ProcessLight = () => {
  return (
    <section
      id="how-it-works"
      className="spotlight-dark relative overflow-hidden bg-[#0C0E11] py-24 md:py-32"
    >
      <div className="container-custom relative z-10">
        <div className="mb-14 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70">
            <span className="h-1 w-1 rounded-full bg-white/70" />
            <span className="text-white/75">Process</span>
          </span>
          <h2 className="mt-6 font-serif text-4xl font-medium leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
            How It <span className="italic">Works</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-white/65">
            A simple 3-step process, measured on leads.
          </p>
        </div>

        {/* Three static cards. This was a click-through walkthrough that
            revealed one step at a time; it hid two thirds of the process
            behind interaction nobody asked for, so all three are shown at
            once and nothing moves. */}
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="flex flex-col rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-7"
              >
                <div className="mb-6 flex items-start justify-between gap-4">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white">
                    <Icon className="h-5 w-5 text-[#0C0E11]" />
                  </span>
                  <span className="text-right">
                    <span className="block font-serif text-2xl leading-none text-white">{step.stat}</span>
                    <span className="mt-1 block text-[10px] uppercase tracking-[0.18em] text-white/45">
                      {step.statLabel}
                    </span>
                  </span>
                </div>

                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">
                  {step.number} / {step.label}
                </span>
                <h3 className="mt-3 font-serif text-2xl font-medium leading-snug text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{step.description}</p>

                <span className="mt-6 inline-flex items-center gap-2 border-t border-white/10 pt-5 text-xs font-medium text-white/60">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                  {step.deliverable}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/book"
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0C0E11] transition-colors hover:bg-white/90"
          >
            Book Free Call
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProcessLight;
