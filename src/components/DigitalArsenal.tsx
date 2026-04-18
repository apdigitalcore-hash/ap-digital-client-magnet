import { ArrowRight, Zap, Star, Download, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

// ── Update this URL once the funnel is deployed ──────────────────────────────
const AI_EMPLOYEE_URL = 'https://ai-10k.vercel.app';
// ─────────────────────────────────────────────────────────────────────────────

const features = [
  '10 Marketing agents — copy, ads, landing pages',
  '8 Sales agents — outreach, objections, proposals',
  '8 Content agents — scripts, blogs, newsletters',
  '6 Social agents — calendars, captions, threads',
  '7 Ops agents — SOPs, onboarding, invoices',
  '5 Research agents — niche, trends, competitors',
  '6 Customer agents — support, testimonials, FAQs',
];

const bonuses = [
  '100 Viral Hooks Swipe File',
  '50 Call-to-Action Templates',
  '25 Irresistible Offer Ideas',
  '20 Lead Magnet Blueprints',
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

const DigitalArsenal = () => {
  return (
    <section className="relative py-20 md:py-28 bg-near-black overflow-hidden" id="digital-arsenal">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-0 left-1/4 w-[700px] h-[350px] bg-teal/4 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[250px] bg-teal/3 rounded-full blur-3xl" />
      </div>

      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal/25 to-transparent" />

      <div className="container-custom relative z-10">

        {/* ── Section Header ── */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 border border-teal/20 text-teal mb-6">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-semibold uppercase tracking-wider">Digital Arsenal</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            AI Tools Built for <span className="text-gradient">Business Owners</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            The same AI systems we use to run campaigns — packaged as copy-paste prompts you can use today.
            No agency retainer. No monthly fee. Just results.
          </p>
        </motion.div>

        {/* ── Product Card ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="max-w-5xl mx-auto"
        >
          <motion.div
            variants={itemVariants}
            className="relative rounded-3xl border border-gray-800 bg-charcoal-light/60 backdrop-blur-sm overflow-hidden hover:border-teal/30 transition-colors duration-500"
          >
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-teal/60 to-transparent" />

            <div className="p-8 md:p-12">
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

                {/* ── Left: Product Info ── */}
                <div>
                  {/* Badge + rating */}
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal/10 border border-teal/20 text-teal text-xs font-bold uppercase tracking-wider">
                      <Download className="w-3 h-3" /> Instant Download
                    </span>
                    <span className="inline-flex items-center gap-1 text-yellow-400 text-xs font-semibold">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 stroke-yellow-400" />
                      ))}
                      <span className="text-gray-400 ml-1">4.9 / 5</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                    The{' '}
                    <span className="text-gradient">$10K AI Employee</span>
                  </h3>

                  <p className="text-gray-400 text-base leading-relaxed mb-7">
                    50 AI agents covering every part of your business — marketing, sales, content,
                    ops, and customer support. Copy-paste into Claude. Get deliverables, not
                    suggestions.
                  </p>

                  {/* Features list */}
                  <ul className="space-y-2.5 mb-8">
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-gray-300">
                        <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-teal/15 border border-teal/30 flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-teal" strokeWidth={3} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Bonuses */}
                  <div className="rounded-2xl border border-gray-700/60 bg-gray-800/30 p-5">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                      + Free Bonuses Included
                    </p>
                    <ul className="space-y-2">
                      {bonuses.map((b) => (
                        <li key={b} className="flex items-center gap-2 text-sm text-gray-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal flex-shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* ── Right: Pricing & CTA ── */}
                <div className="lg:sticky lg:top-8">
                  <div className="rounded-2xl border border-gray-700/80 bg-gray-900/60 p-7 md:p-8">

                    {/* Value stack */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-500 text-sm">Total value</span>
                      <span className="text-gray-500 text-sm line-through">$330+</span>
                    </div>
                    <div className="flex items-end gap-3 mb-6">
                      <span className="font-display text-6xl font-black text-white leading-none">$9</span>
                      <span className="text-gray-400 text-base mb-2">one-time · no subscription</span>
                    </div>

                    {/* Urgency */}
                    <div className="flex items-center gap-2 mb-6 px-3 py-2 rounded-lg bg-teal/8 border border-teal/15">
                      <span className="w-2 h-2 rounded-full bg-teal animate-pulse flex-shrink-0" />
                      <span className="text-teal text-xs font-semibold">Price increases to $27 soon</span>
                    </div>

                    {/* CTA */}
                    <Button
                      variant="hero"
                      size="xl"
                      asChild
                      className="w-full shadow-teal-lg mb-4"
                    >
                      <a
                        href={AI_EMPLOYEE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        Get Instant Access — $9
                        <ArrowRight className="w-5 h-5" />
                      </a>
                    </Button>

                    {/* Trust signals */}
                    <ul className="space-y-2 mt-5">
                      {[
                        'Works with free Claude',
                        '30-day money-back guarantee',
                        'Instant PDF download',
                        'Lifetime updates included',
                      ].map((t) => (
                        <li key={t} className="flex items-center gap-2 text-xs text-gray-400">
                          <Check className="w-3.5 h-3.5 text-teal flex-shrink-0" strokeWidth={3} />
                          {t}
                        </li>
                      ))}
                    </ul>

                    {/* Divider */}
                    <div className="mt-6 pt-6 border-t border-gray-700/60">
                      <p className="text-xs text-gray-500 text-center">
                        Built by AP Digital — the same systems we use to run real campaigns for real clients.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>

      {/* Decorative bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal/20 to-transparent" />
    </section>
  );
};

export default DigitalArsenal;
