import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import AdviceShell from '@/advice/AdviceShell';
import { CHANNELS } from '@/advice/types';

const TITLE = 'ADvice — Free AI Ad Campaign Simulator';
const DESC = 'Simulate your Google, Meta, TikTok or LinkedIn campaign before you spend a dollar. Predicted CTR, CPC, CPA and ROAS, a creative score, and rewritten ad copy. Free.';

const mono = "font-['Geist_Mono',_monospace]";
const label = `${mono} text-[11px] uppercase tracking-[0.08em] text-[#8A8F98]`;

/* The hero's picture is the product: a real-looking readout of one simulation. */
const Readout = ({ k, v, tone = 'text-[#EDEDED]' }: { k: string; v: string; tone?: string }) => (
  <div className="border-b border-r border-white/[0.07] p-4">
    <p className={label}>{k}</p>
    <p className={`${mono} mt-2 text-[17px] tabular-nums ${tone}`}>{v}</p>
  </div>
);

const SamplePanel = () => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.15 }}
    className="overflow-hidden rounded-lg border border-white/[0.09] bg-[#0f0f10] shadow-[0_30px_80px_-30px_rgba(59,130,246,0.25)]"
    aria-label="Example simulation report"
  >
    <div className={`flex items-center justify-between border-b border-white/[0.07] px-4 py-3 ${mono} text-[11px] uppercase tracking-[0.08em]`}>
      <span className="text-[#8A8F98]">Sim · Google Search · $3,000/mo</span>
      <span className="flex items-center gap-1.5 text-[#4ADE80]"><span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80]" />Complete</span>
    </div>

    <div className="grid grid-cols-2 border-l border-white/[0.07] sm:grid-cols-3 [&>*]:-ml-px">
      <Readout k="CTR" v="4.2–6.1%" />
      <Readout k="CPC" v="$6.50–9.80" />
      <Readout k="Clicks / mo" v="306–461" />
      <Readout k="Conv. rate" v="8–12%" />
      <Readout k="CPA" v="$55–120" />
      <Readout k="Risk" v="Medium" tone="text-[#FACC15]" />
    </div>

    <div className="border-b border-white/[0.07] p-4">
      <div className="flex items-baseline justify-between">
        <p className={label}>Creative score</p>
        <p className={`${mono} text-[13px] text-[#FACC15]`}>68 / 100 · Needs work</p>
      </div>
      <div className="mt-3 h-1 rounded-full bg-white/[0.06]">
        <motion.div className="h-full rounded-full bg-[#FACC15]" initial={{ width: 0 }} animate={{ width: '68%' }} transition={{ duration: 1, delay: 0.5 }} />
      </div>
    </div>

    <div className="space-y-2 p-4">
      <p className={label}>Headline rewrite</p>
      <p className={`${mono} text-[13px] text-[#F87171]/80 line-through decoration-[#F87171]/50`}>24/7 Emergency Plumber</p>
      <p className={`${mono} text-[13px] text-[#4ADE80]`}>Plumber at Your Door in 60 Min — $149</p>
    </div>
  </motion.div>
);

const STEPS = [
  { t: 'Describe the campaign', d: 'What you sell, who it’s for, the channel and your monthly budget.' },
  { t: 'Paste the ad', d: 'Headline, body copy, description — plus your landing page, if you have one.' },
  { t: 'Read the simulation', d: 'Predicted results, what’s weak, and the exact changes to make before launch.' },
];

const ANATOMY = [
  { k: 'Predictions', t: 'What the month is likely to look like', d: 'CTR, CPC, clicks, conversions, CPA and ROAS as honest ranges, with a confidence level that drops when your inputs are vague.', v: 'CPA $55–120' },
  { k: 'Creative', t: 'A score for the ad itself', d: 'Headline, clarity, call to action, emotional triggers and — for Search — how well the copy matches what people actually type.', v: '68 / 100' },
  { k: 'Risk', t: 'Reasons it could go sideways', d: 'Whether the budget fits the niche, how crowded the auction is, and whether now is a good or bad time to launch.', v: 'Medium' },
  { k: 'Fixes', t: 'What to change, specifically', d: 'Three to five improvements ranked by impact, a rewritten headline and body you can paste, budget moves and audience tweaks.', v: '5 changes' },
  { k: 'Market', t: 'Who you’re up against', d: 'Roughly how many advertisers target your space, the going CPC, and what the best ads in your category do differently.', v: '40–80 rivals' },
];

const reveal = { initial: { opacity: 0, y: 10 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-60px' }, transition: { duration: 0.45 } };

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

    {/* ── Hero ── */}
    <section className="relative border-b border-white/[0.07]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 70% 40%, #000 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 70% 40%, #000 30%, transparent 75%)',
        }}
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div>
          <p className={label}>Free · no sign-up</p>
          <h1 className="mt-5 max-w-[14ch] text-balance text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.035em] text-white sm:text-6xl">
            Simulate your campaign before you spend a dollar
          </h1>
          <p className="mt-6 max-w-[46ch] text-[17px] leading-relaxed text-[#A1A6AE]">
            Paste your ad, pick the channel and budget. ADvice predicts how it will perform, scores the creative, and tells you what to fix — before a single click is paid for.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              to="/advice/simulate"
              className="inline-flex items-center gap-2 rounded-md bg-[#3b82f6] px-5 py-3 text-[15px] font-medium text-white transition-colors hover:bg-[#2f74e6]"
            >
              Run free simulation <ArrowRight className="h-4 w-4" />
            </Link>
            <span className={`${mono} text-[12px] text-[#5F646C]`}>~20 seconds per run</span>
          </div>
        </div>
        <SamplePanel />
      </div>
    </section>

    {/* ── Channels ── */}
    <section className="border-b border-white/[0.07]">
      <div className={`mx-auto flex max-w-6xl flex-wrap items-center gap-x-5 gap-y-2 px-4 py-5 sm:px-6 ${mono} text-[12px] uppercase tracking-[0.06em]`}>
        <span className="text-[#5F646C]">Calibrated for</span>
        {CHANNELS.map((c, i) => (
          <span key={c} className="text-[#A1A6AE]">
            {c}{i < CHANNELS.length - 1 && <span className="ml-5 text-white/15">/</span>}
          </span>
        ))}
      </div>
    </section>

    {/* ── How it works: a real sequence, so it's numbered ── */}
    <section className="border-b border-white/[0.07]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid md:grid-cols-3">
          {STEPS.map((s, i) => (
            <motion.div
              {...reveal}
              key={s.t}
              className={`py-10 md:py-14 ${i > 0 ? 'border-t border-white/[0.07] md:border-l md:border-t-0 md:pl-8' : ''} ${i < 2 ? 'md:pr-8' : ''}`}
            >
              <span className={`${mono} text-[12px] text-[#3b82f6]`}>0{i + 1}</span>
              <h2 className="mt-3 text-lg font-medium tracking-[-0.01em] text-white">{s.t}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-[#8A8F98]">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Anatomy of a report ── */}
    <section className="border-b border-white/[0.07]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[320px_1fr] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className={label}>The report</p>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-[-0.03em] text-white">Five readouts, one decision: launch, fix, or rethink.</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#8A8F98]">Every report is written for your product, audience and copy — then you can share it with a link.</p>
        </div>
        <ol className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
          {ANATOMY.map((a) => (
            <motion.li {...reveal} key={a.k} className="grid gap-3 py-7 sm:grid-cols-[120px_1fr_auto] sm:gap-8">
              <span className={`${label} pt-1`}>{a.k}</span>
              <div>
                <h3 className="font-medium text-white">{a.t}</h3>
                <p className="mt-1.5 max-w-[56ch] text-[15px] leading-relaxed text-[#8A8F98]">{a.d}</p>
              </div>
              <span className={`${mono} whitespace-nowrap pt-1 text-[13px] text-[#EDEDED]`}>{a.v}</span>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>

    {/* ── Mission ── */}
    <section>
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-24 sm:px-6 md:flex-row md:items-end md:justify-between">
        <motion.p {...reveal} className="max-w-[20ch] text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-5xl">
          Our goal: build the most useful AI tool in marketing. Period.
        </motion.p>
        <motion.div {...reveal}>
          <Link
            to="/advice/simulate"
            className="inline-flex items-center gap-2 rounded-md bg-[#EDEDED] px-5 py-3 text-[15px] font-medium text-black transition-colors hover:bg-white"
          >
            Run your first simulation <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  </AdviceShell>
);

export default AdviceHome;
