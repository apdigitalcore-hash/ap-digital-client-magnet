import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ArrowRight, Search, Rocket, TrendingUp, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  {
    number: '01',
    icon: Search,
    label: 'Audit',
    teaser: 'Ready to see what\'s broken?',
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
    teaser: 'Time to go live.',
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
    teaser: 'Now we turn it up.',
    title: 'We optimize relentlessly.',
    description:
      'Weekly A/B tests, bid adjustments, creative refreshes, and performance reports. Your campaigns get better every single week.',
    deliverable: 'Weekly performance reports',
    stat: '340%',
    statLabel: 'avg traffic growth',
  },
];

const ProcessLight = () => {
  const [activeStep, setActiveStep] = useState(-1);
  const isIntro = activeStep === -1;
  const currentStep = steps[activeStep];

  const advance = () => {
    setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : -1));
  };

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
            A proven 3-step process to predictable lead generation.
          </p>
        </div>

        <div className="mx-auto max-w-2xl">
          {/* Progress bar */}
          <div className="mb-8 flex items-center gap-3 px-1">
            {steps.map((step, i) => (
              <button
                key={step.number}
                onClick={() => setActiveStep(i)}
                className="group flex flex-1 flex-col items-center gap-2.5"
                aria-label={`Go to step ${step.number}: ${step.label}`}
              >
                <span className="h-[3px] w-full overflow-hidden rounded-full bg-white/10">
                  <motion.span
                    className="block h-full rounded-full bg-white"
                    initial={false}
                    animate={{ width: i <= activeStep ? '100%' : '0%' }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                  />
                </span>
                <span
                  className={`text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors ${
                    i <= activeStep ? 'text-white' : 'text-white/45 group-hover:text-white/70'
                  }`}
                >
                  {step.label}
                </span>
              </button>
            ))}
          </div>

          {/* Card */}
          <div className="relative min-h-[400px] sm:min-h-[380px]">
            <AnimatePresence mode="wait">
              {isIntro ? (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96, y: -20 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="absolute inset-0"
                >
                  <button
                    onClick={advance}
                    className="group flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-8 transition-colors duration-500 hover:border-white/25"
                  >
                    <motion.span
                      animate={{ scale: [1, 1.06, 1] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                      className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-[#0C0E11]"
                    >
                      <ArrowRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
                    </motion.span>
                    <h3 className="mb-3 font-serif text-3xl font-medium text-white sm:text-4xl">
                      Ready to <span className="italic">grow?</span>
                    </h3>
                    <p className="mb-7 text-base text-white/65">
                      See our 3-step process in action.
                    </p>
                    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-all group-hover:gap-3">
                      Start <ChevronRight className="h-4 w-4" />
                    </span>
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="absolute inset-0"
                >
                  <div className="flex h-full w-full flex-col rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-8 sm:p-10">
                    {/* Header */}
                    <div className="mb-7 flex items-start justify-between">
                      <div className="flex items-center gap-3.5">
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#0C0E11]">
                          {currentStep && <currentStep.icon className="h-5 w-5" strokeWidth={1.75} />}
                        </span>
                        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70">
                          {currentStep?.number} / {currentStep?.label}
                        </span>
                      </div>
                      {currentStep && (
                        <div className="text-right">
                          <p className="font-serif text-2xl text-white">{currentStep.stat}</p>
                          <p className="text-[10px] uppercase tracking-[0.18em] text-white/60">
                            {currentStep.statLabel}
                          </p>
                        </div>
                      )}
                    </div>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.4 }}
                      className="mb-2 font-serif text-sm italic text-white/55"
                    >
                      {currentStep?.teaser}
                    </motion.p>

                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25, duration: 0.4 }}
                      className="mb-3.5 font-serif text-2xl font-medium leading-tight text-white sm:text-3xl"
                    >
                      {currentStep?.title}
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35, duration: 0.4 }}
                      className="mb-7 flex-1 text-sm leading-relaxed text-white/70 sm:text-base"
                    >
                      {currentStep?.description}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.45, duration: 0.4 }}
                      className="flex items-center justify-between gap-4 border-t border-white/10 pt-5"
                    >
                      <span className="inline-flex items-center gap-2 text-xs font-medium text-white/60">
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                        {currentStep?.deliverable}
                      </span>

                      {activeStep < steps.length - 1 ? (
                        <button
                          onClick={advance}
                          className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/55 transition-colors hover:text-white"
                        >
                          Next
                          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </button>
                      ) : (
                        <Link to="/book" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0C0E11] transition-colors hover:bg-white/90">
                          Book Free Call
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessLight;
