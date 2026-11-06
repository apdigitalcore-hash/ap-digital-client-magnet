import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { MagnifierArt, PlaneArt, TrendArt } from './ObjectArt';

/**
 * Three steps, each as a media panel over a title and a short line.
 *
 * Each card used to carry a number, a label, a title, a description, a stat, a
 * stat label and a deliverable — seven fields, with the label ("Audit") saying
 * the same thing as the title ("We audit everything."). The facts those fields
 * held were worth keeping, so the timing now sits inside the sentence rather
 * than in a stat block beside it.
 *
 * The numbering stays. Unlike most numbered sections this one is genuinely a
 * sequence: the audit has to happen before the launch.
 *
 * The section keeps its dark ground. It sits between the grey industries band
 * and the grey services band, and those three would run together without it.
 */
const steps = [
  {
    number: '01',
    Art: MagnifierArt,
    title: 'We audit everything.',
    description:
      'Your ads, your funnel, your competitors — and where the leads are hiding. Back to you inside 48 hours.',
  },
  {
    number: '02',
    Art: PlaneArt,
    title: 'Campaigns go live.',
    description:
      'Meta and Google Ads, content, and landing pages built to capture. Live in under two weeks.',
  },
  {
    number: '03',
    Art: TrendArt,
    title: 'We optimize relentlessly.',
    description:
      'A/B tests, bid adjustments and creative refreshes, with a performance report every week.',
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
          <h2 className="font-serif text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
            <span className="text-white/35">How It</span>{' '}
            <span className="italic text-white">Works</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-white/55">
            Three steps, measured on leads.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
          {steps.map((step) => {
            const { Art } = step;
            return (
              <article
                key={step.number}
                className="flex flex-col rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4"
              >
                {/* Media panel. The step number sits in the corner so the
                    sequence reads without a separate eyebrow line. */}
                <div className="relative mb-6 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[1.15rem] bg-white/[0.05]">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                      backgroundImage:
                        'linear-gradient(hsl(0 0% 100% / 0.045) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100% / 0.045) 1px, transparent 1px)',
                      backgroundSize: '24px 24px',
                    }}
                  />
                  <span className="absolute left-4 top-3.5 text-[10px] font-semibold tracking-[0.18em] text-white/30">
                    {step.number}
                  </span>
                  <Art tone="dark" className="relative h-[82%] w-[82%]" />
                </div>

                <h3 className="px-2 font-serif text-xl font-medium leading-snug text-white">
                  {step.title}
                </h3>
                <p className="mt-2.5 px-2 pb-3 text-sm leading-relaxed text-white/55">
                  {step.description}
                </p>
              </article>
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
