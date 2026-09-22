import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, Gauge, PenLine, ShieldAlert, Sparkles, Users } from 'lucide-react';
import AdviceShell from '@/advice/AdviceShell';
import { CHANNELS } from '@/advice/types';

const TITLE = 'ADvice — Free AI Ad Campaign Simulator';
const DESC = 'Simulate your Google, Meta, TikTok or LinkedIn campaign before you spend a dollar. Predicted CTR, CPC, CPA and ROAS, a creative score, and rewritten ad copy. Free.';

const STEPS = [
  { title: 'Describe the campaign', body: 'What you sell, who it’s for, the channel and the budget.' },
  { title: 'Paste your ad', body: 'Headline, primary text, description — and your landing page if you have one.' },
  { title: 'Get the simulation', body: 'Predicted results, a creative score, risks and exactly what to fix.' },
];

const FEATURES = [
  { icon: Gauge, title: 'Performance predictions', body: 'CTR, CPC, clicks, conversions, CPA and ROAS as honest ranges, with a confidence level.' },
  { icon: PenLine, title: 'Creative score', body: 'Headline, clarity, CTA, emotional triggers and search-intent match, scored out of 100.' },
  { icon: ShieldAlert, title: 'Risk assessment', body: 'Budget fit, competition in your niche and whether now is a good time to launch.' },
  { icon: Sparkles, title: 'AI recommendations', body: 'Rewritten headline and copy, budget moves and audience tweaks you can use today.' },
  { icon: Users, title: 'Competitor snapshot', body: 'How crowded your space is, the going CPC, and what the top ads do differently.' },
];

const fade = { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };

const AdviceHome = () => (
  <AdviceShell>
    <Helmet>
      <title>{TITLE}</title>
      <meta name="description" content={DESC} />
      <link rel="canonical" href="https://ap-digital.ca/advice" />
      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={DESC} />
      <meta property="og:url" content="https://ap-digital.ca/advice" />
    </Helmet>

    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-24 h-[420px] w-[720px] max-w-[120vw] -translate-x-1/2 rounded-full bg-[#3b82f6]/25 blur-[120px]"
      />
      <div className="relative mx-auto max-w-4xl px-4 pb-20 pt-24 text-center sm:px-6 sm:pt-32">
        <motion.p {...fade} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/70">
          <span className="h-1.5 w-1.5 rounded-full bg-[#3b82f6]" /> Free · No sign-up needed
        </motion.p>
        <motion.h1 {...fade} className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
          Simulate Your Campaign Before You Spend a Dollar
        </motion.h1>
        <motion.p {...fade} className="mx-auto mt-6 max-w-2xl text-balance text-base text-white/60 sm:text-lg">
          ADvice is the flight simulator for advertising. Paste your ad, pick a channel and budget, and see how it’s likely to perform — plus exactly what to fix before launch.
        </motion.p>
        <motion.div {...fade} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/advice/simulate"
            className="inline-flex items-center gap-2 rounded-lg bg-[#3b82f6] px-6 py-3 font-medium text-white shadow-[0_0_40px_-8px_#3b82f6] transition-colors hover:bg-[#2563eb]"
          >
            Run Free Simulation <ArrowRight className="h-4 w-4" />
          </Link>
          <a href="#how" className="px-4 py-3 text-sm text-white/60 transition-colors hover:text-white">How it works</a>
        </motion.div>
      </div>
    </section>

    <section className="border-y border-white/[0.06] py-8">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 text-sm text-white/45">
        <span className="text-white/30">Simulates</span>
        {CHANNELS.map((c) => <span key={c}>{c}</span>)}
      </div>
    </section>

    <section id="how" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-24 sm:px-6">
      <motion.h2 {...fade} className="text-center text-3xl font-semibold tracking-tight">How it works</motion.h2>
      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {STEPS.map((s, i) => (
          <motion.div {...fade} key={s.title} className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-6">
            <span className="text-sm font-medium text-[#3b82f6]">Step {i + 1}</span>
            <h3 className="mt-2 font-medium">{s.title}</h3>
            <p className="mt-2 text-sm text-white/55">{s.body}</p>
          </motion.div>
        ))}
      </div>
    </section>

    <section className="mx-auto max-w-5xl px-4 pb-24 sm:px-6">
      <motion.h2 {...fade} className="text-center text-3xl font-semibold tracking-tight">What you get</motion.h2>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <motion.div {...fade} key={f.title} className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-6">
            <f.icon className="h-5 w-5 text-[#3b82f6]" />
            <h3 className="mt-4 font-medium">{f.title}</h3>
            <p className="mt-2 text-sm text-white/55">{f.body}</p>
          </motion.div>
        ))}
        <motion.div {...fade} className="flex flex-col justify-between rounded-xl border border-[#3b82f6]/30 bg-[#3b82f6]/[0.06] p-6">
          <p className="text-sm text-white/70">Share any report with a link — your team, your client, your boss.</p>
          <Link to="/advice/simulate" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white">
            Try it now <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>

    <section className="border-t border-white/[0.06] py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <motion.p {...fade} className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
          Our goal: Build the most useful AI tool in marketing. Period.
        </motion.p>
        <motion.div {...fade} className="mt-10">
          <Link
            to="/advice/simulate"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-medium text-black transition-colors hover:bg-white/85"
          >
            Run Free Simulation <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  </AdviceShell>
);

export default AdviceHome;
