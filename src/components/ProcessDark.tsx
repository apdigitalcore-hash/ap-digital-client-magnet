import { useState } from 'react';
import { ArrowRight, Search, Rocket, TrendingUp, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  {
    number: '01',
    icon: Search,
    label: 'Audit',
    teaser: 'Ready to see what\'s broken?',
    teaserSub: 'We start by looking under the hood.',
    title: 'We audit everything.',
    description: 'Your ads, your funnel, your competitors. We find the gaps costing you money and map out exactly where the leads are hiding.',
    deliverable: 'Custom growth roadmap',
    stat: '48hr',
    statLabel: 'turnaround',
  },
  {
    number: '02',
    icon: Rocket,
    label: 'Launch',
    teaser: 'Time to go live.',
    teaserSub: 'No more planning. We ship.',
    title: 'Campaigns go live.',
    description: 'High-converting Meta & Google Ads, scroll-stopping content, and landing pages built to capture — launched in under 2 weeks.',
    deliverable: 'Live campaigns in 2 weeks',
    stat: '14',
    statLabel: 'days to launch',
  },
  {
    number: '03',
    icon: TrendingUp,
    label: 'Optimize',
    teaser: 'Now we turn it up.',
    teaserSub: 'More leads. Lower cost. Every week.',
    title: 'We optimize relentlessly.',
    description: 'Weekly A/B tests, bid adjustments, creative refreshes, and performance reports. Your campaigns get better every single week.',
    deliverable: 'Weekly performance reports',
    stat: '340%',
    statLabel: 'avg traffic growth',
  },
];

const ProcessDark = () => {
  const [activeStep, setActiveStep] = useState(-1);
  const isIntro = activeStep === -1;
  const currentStep = steps[activeStep];

  const advance = () => {
    setActiveStep(prev => prev < steps.length - 1 ? prev + 1 : -1);
  };

  const goToStep = (index: number) => {
    setActiveStep(index);
  };

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-black">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            A proven 3-step process to predictable lead generation.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Progress bar */}
          <div className="flex items-center gap-2 mb-8 px-4">
            {steps.map((step, i) => (
              <button
                key={i}
                onClick={() => goToStep(i)}
                className="flex-1 group flex flex-col items-center gap-2"
              >
                <div className="w-full h-1 rounded-full overflow-hidden bg-white/10">
                  <motion.div
                    className="h-full bg-teal rounded-full"
                    initial={false}
                    animate={{ width: i <= activeStep ? '100%' : '0%' }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                  />
                </div>
                <span className={`text-[11px] font-semibold tracking-wider uppercase transition-colors ${
                  i <= activeStep ? 'text-teal' : 'text-white/30'
                }`}>
                  {step.label}
                </span>
              </button>
            ))}
          </div>

          {/* Card */}
          <div className="relative min-h-[380px] sm:min-h-[360px]">
            <AnimatePresence mode="wait">
              {isIntro ? (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="absolute inset-0"
                >
                  <button
                    onClick={advance}
                    className="w-full h-full rounded-3xl bg-gradient-to-br from-[#0a0a0a] to-[#141414] border border-white/10 hover:border-teal/30 transition-all duration-500 flex flex-col items-center justify-center cursor-pointer group p-8"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-16 h-16 rounded-2xl bg-teal/10 border border-teal/20 flex items-center justify-center mb-6"
                    >
                      <ArrowRight className="w-7 h-7 text-teal group-hover:translate-x-1 transition-transform duration-300" />
                    </motion.div>
                    <h3 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
                      Ready to grow?
                    </h3>
                    <p className="text-white/50 text-base mb-6">
                      See our 3-step process in action.
                    </p>
                    <span className="inline-flex items-center gap-2 text-teal text-sm font-semibold group-hover:gap-3 transition-all">
                      Start <ChevronRight className="w-4 h-4" />
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
                  <div className="w-full h-full rounded-3xl bg-gradient-to-br from-[#0a0a0a] to-[#141414] border border-white/10 p-8 sm:p-10 flex flex-col">
                    {/* Step header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <span className="w-10 h-10 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center">
                          {currentStep && <currentStep.icon className="w-5 h-5 text-teal" />}
                        </span>
                        <div>
                          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-teal">
                            Step {currentStep?.number}
                          </p>
                          <p className="text-white/40 text-xs">{currentStep?.label}</p>
                        </div>
                      </div>
                      {currentStep && (
                        <div className="text-right">
                          <p className="font-display text-2xl font-bold text-white">{currentStep.stat}</p>
                          <p className="text-[11px] text-white/40 uppercase tracking-wider">{currentStep.statLabel}</p>
                        </div>
                      )}
                    </div>

                    {/* Teaser line */}
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.4 }}
                      className="text-white/30 text-sm font-medium italic mb-2"
                    >
                      {currentStep?.teaser}
                    </motion.p>

                    {/* Title */}
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25, duration: 0.4 }}
                      className="font-display text-2xl sm:text-3xl font-bold text-white mb-3"
                    >
                      {currentStep?.title}
                    </motion.h3>

                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35, duration: 0.4 }}
                      className="text-white/50 text-sm sm:text-base leading-relaxed mb-6 flex-1"
                    >
                      {currentStep?.description}
                    </motion.p>

                    {/* Footer */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.45, duration: 0.4 }}
                      className="flex items-center justify-between"
                    >
                      <span className="inline-flex items-center gap-2 text-teal text-sm font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                        {currentStep?.deliverable}
                      </span>

                      {activeStep < steps.length - 1 ? (
                        <button
                          onClick={advance}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-teal transition-colors group"
                        >
                          Next
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      ) : (
                        <a
                          href="https://calendly.com/apdigital-core/20min"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-teal text-black text-sm font-bold hover:bg-teal-light transition-colors"
                        >
                          Book Free Call
                          <ArrowRight className="w-4 h-4" />
                        </a>
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

export default ProcessDark;
