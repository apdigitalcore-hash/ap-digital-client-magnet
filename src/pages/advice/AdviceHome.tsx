import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ChevronRight, Gauge, PenLine, ShieldAlert, Sparkles, Users } from 'lucide-react';
import AdviceShell, { SPECTRUM } from '@/advice/AdviceShell';
import { CHANNELS } from '@/advice/types';

const TITLE = 'ADvice — Free AI Ad Campaign Simulator';
const DESC = 'Simulate your Google, Meta, TikTok or LinkedIn campaign before you spend a dollar. Predicted CTR, CPC, CPA and ROAS, a creative score, and rewritten ad copy. Free.';

const rise = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const },
};

const PrimaryButton = ({ children }: { children: ReactNode }) => (
  <Link
    to="/advice/simulate"
    className="inline-flex items-center rounded-full bg-[#1d1d1f] px-6 py-3 text-[17px] text-white transition-colors hover:bg-black"
  >
    {children}
  </Link>
);

/* The product shot: one report, set on a soft stage the way Apple sets a device. */
const Stat = ({ k, v }: { k: string; v: string }) => (
  <div>
    <p className="text-[12px] text-[#6e6e73]">{k}</p>
    <p className="mt-1 whitespace-nowrap text-[20px] font-semibold tabular-nums tracking-[-0.02em] sm:text-[24px]">{v}</p>
  </div>
);

const ProductShot = () => (
  <motion.div {...rise} className="relative mx-auto mt-16 max-w-[1040px] px-5">
    {/* Soft spectrum bloom behind the device */}
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-10 top-10 bottom-0 rounded-[48px] opacity-30 blur-[80px]" style={{ background: SPECTRUM }} />
    <div className="relative rounded-[36px] bg-[#f5f5f7] px-4 pt-10 sm:px-14 sm:pt-16">
      {/* 1.5px spectrum edge, like Apple Intelligence's glow */}
      <div className="relative mx-auto max-w-[780px] rounded-t-[22px] p-[1.5px] xl:max-w-[680px]" style={{ background: SPECTRUM }}>
        <div className="rounded-t-[21px] bg-white p-6 text-left sm:p-10">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <p className="text-[12px] text-[#6e6e73]">Google Search · Local service · $3,000/month</p>
              <p className="mt-1 text-[22px] font-semibold tracking-[-0.02em]">Emergency Plumbing</p>
            </div>
            <span className="rounded-full bg-[#fff4e5] px-3 py-1 text-[12px] font-medium text-[#b25000]">Needs work · 68</span>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-black/[0.06] pt-8 sm:grid-cols-4">
            <Stat k="Click-through rate" v="4.2–6.1%" />
            <Stat k="Cost per click" v="$6.50–9.80" />
            <Stat k="Clicks per month" v="306–461" />
            <Stat k="Cost per lead" v="$55–120" />
          </div>
          <div className="mt-8 rounded-2xl bg-[#f5f5f7] p-5">
            <p className="text-[12px] text-[#6e6e73]">Suggested headline</p>
            <p className="mt-2 text-[15px] text-[#86868b] line-through">24/7 Emergency Plumber</p>
            <p className="mt-1 text-[17px] font-medium">Plumber at Your Door in 60 Min — $149</p>
          </div>
        </div>
      </div>

      {/* Floating callouts */}
      <motion.div
        initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }}
        className="absolute -left-12 top-24 hidden w-[180px] rounded-3xl bg-white/90 p-5 text-left shadow-[0_20px_50px_-12px_rgba(0,0,0,0.18)] backdrop-blur xl:block"
      >
        <p className="text-[12px] text-[#6e6e73]">Creative score</p>
        <div className="mt-2 flex items-center gap-3">
          <Ring score={68} small />
          <p className="text-[13px] leading-snug text-[#1d1d1f]">CTA is missing. Fix that first.</p>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.45 }}
        className="absolute -right-12 top-52 hidden w-[180px] rounded-3xl bg-white/90 p-5 text-left shadow-[0_20px_50px_-12px_rgba(0,0,0,0.18)] backdrop-blur xl:block"
      >
        <p className="text-[12px] text-[#6e6e73]">Seasonality</p>
        <p className="mt-1 text-[17px] font-semibold text-[#248a3d]">Good time to launch</p>
        <p className="mt-1 text-[13px] leading-snug text-[#6e6e73]">Freeze season lifts emergency searches.</p>
      </motion.div>
    </div>
  </motion.div>
);

const Tile = ({ className = '', children }: { className?: string; children: ReactNode }) => (
  <motion.div {...rise} className={`rounded-[28px] bg-[#f5f5f7] p-8 transition-transform duration-500 hover:scale-[1.01] sm:p-10 ${className}`}>{children}</motion.div>
);

const Chip = ({ icon: Icon, color, children }: { icon: typeof Gauge; color: string; children: ReactNode }) => (
  <p className="flex items-center gap-2.5 text-[17px] font-semibold">
    <span className="flex h-8 w-8 items-center justify-center rounded-[10px] text-white" style={{ background: color }}>
      <Icon className="h-4 w-4" />
    </span>
    {children}
  </p>
);

const Bars = () => (
  <div className="mt-8 flex h-20 items-end gap-2" aria-hidden="true">
    {[38, 52, 46, 64, 58, 76, 70, 88].map((h, i) => (
      <motion.span key={i} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.05 }}
        className="flex-1 rounded-md" style={{ background: i === 7 ? '#ff9f0a' : '#e3e3e8' }} />
    ))}
  </div>
);

const Ring = ({ score, small = false }: { score: number; small?: boolean }) => {
  const r = 46, c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 110 110" className={small ? 'h-14 w-14 shrink-0' : 'h-28 w-28'} aria-hidden="true">
      <circle cx="55" cy="55" r={r} fill="none" stroke="#e8e8ed" strokeWidth="9" />
      <circle cx="55" cy="55" r={r} fill="none" stroke="#ff9f0a" strokeWidth="9" strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={c * (1 - score / 100)} transform="rotate(-90 55 55)" />
      <text x="55" y="62" textAnchor="middle" style={{ fontSize: 28, fontWeight: 600 }} fill="#1d1d1f">{score}</text>
    </svg>
  );
};

const STEPS = [
  { n: '1', t: 'Describe it.', d: 'What you sell, who it’s for, the channel and your budget.' },
  { n: '2', t: 'Paste your ad.', d: 'Headline, copy and — if you have one — your landing page.' },
  { n: '3', t: 'See the future.', d: 'Predicted results, a creative score and exactly what to fix.' },
];

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

    {/* Hero */}
    <section className="relative overflow-hidden pt-20 text-center sm:pt-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(60%_60%_at_50%_0%,#fff3ea_0%,#ffffff_70%)]" />
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }} className="relative mx-auto max-w-[980px] px-5">
        <p className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-4 py-1.5 text-[13px] font-medium text-[#1d1d1f] shadow-sm"><Sparkles className="h-3.5 w-3.5 text-[#ff375f]" /> The flight simulator for advertising</p>
        <h1 className="mx-auto mt-6 max-w-[16ch] text-balance text-[44px] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-[72px] lg:text-[80px]">
          Simulate your campaign{' '}
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: SPECTRUM }}>before you spend a dollar.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-[34ch] text-balance text-[19px] leading-snug text-[#6e6e73] sm:text-[24px]">
          Predicted results, a score for your ad, and what to fix. Free.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
          <PrimaryButton>Run a free simulation</PrimaryButton>
          <a href="#how" className="inline-flex items-center text-[17px] text-[#1d1d1f] hover:underline">
            See how it works <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </motion.div>
      <ProductShot />
    </section>

    {/* Channels */}
    <section className="mx-auto max-w-[980px] px-5 py-16 text-center">
      <p className="text-[14px] text-[#6e6e73]">Works for</p>
      <p className="mx-auto mt-3 max-w-[60ch] text-balance text-[19px] font-medium leading-relaxed sm:text-[21px]">
        {CHANNELS.join(' · ')}
      </p>
    </section>

    {/* What you get — bento */}
    <section id="features" className="mx-auto max-w-[1040px] scroll-mt-20 px-5 pb-24 pt-8">
      <motion.h2 {...rise} className="mx-auto max-w-[18ch] text-balance text-center text-[36px] font-semibold leading-[1.1] tracking-[-0.025em] sm:text-[48px]">
        Everything you need to know. Before launch.
      </motion.h2>
      <div className="mt-14 grid gap-5 md:grid-cols-2">
        <Tile>
          <Chip icon={Gauge} color="#ff9f0a">Performance predictions</Chip>
          <p className="mt-6 text-[48px] font-semibold leading-none tracking-[-0.03em] sm:text-[56px]">4.2–6.1%</p>
          <p className="mt-2 text-[15px] text-[#6e6e73]">predicted click-through rate</p>
          <Bars />
          <p className="mt-6 text-[15px] leading-relaxed text-[#6e6e73]">Clicks, conversions, cost per lead and ROAS — as honest ranges, with a confidence level.</p>
        </Tile>
        <Tile>
          <Chip icon={PenLine} color="#ff375f">Creative score</Chip>
          <div className="mt-6"><Ring score={68} /></div>
          <p className="mt-6 text-[15px] leading-relaxed text-[#6e6e73]">Headline, clarity, call to action, emotional pull and search-intent match — each scored out of 100.</p>
        </Tile>
        <Tile className="md:col-span-2">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <Chip icon={Sparkles} color="#bf5af2">Recommendations</Chip>
              <p className="mt-4 text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] sm:text-[32px]">Not “test more.” The exact change.</p>
              <p className="mt-4 text-[15px] leading-relaxed text-[#6e6e73]">Rewritten headline and copy you can paste, budget moves in real numbers, and audience tweaks for your product.</p>
            </div>
            <div className="rounded-2xl bg-white p-6">
              <p className="text-[12px] text-[#6e6e73]">Before</p>
              <p className="mt-1 text-[15px] text-[#86868b] line-through">Burst pipe? Call us today.</p>
              <p className="mt-4 text-[12px] text-[#6e6e73]">After</p>
              <p className="mt-1 text-[17px] font-medium">Burst pipe? A licensed plumber at your door in 60 minutes. Flat $149 — no surprises.</p>
            </div>
          </div>
        </Tile>
        <Tile>
          <Chip icon={ShieldAlert} color="#ff6b3d">Risk check</Chip>
          <p className="mt-6 text-[40px] font-semibold leading-none tracking-[-0.03em] text-[#b25000]">Medium</p>
          <p className="mt-8 text-[15px] leading-relaxed text-[#6e6e73]">Is the budget right for the niche? How crowded is it? Is now a good time to launch?</p>
        </Tile>
        <Tile>
          <Chip icon={Users} color="#34c759">Competitor snapshot</Chip>
          <p className="mt-6 text-[40px] font-semibold leading-none tracking-[-0.03em]">40–80</p>
          <p className="mt-2 text-[15px] text-[#6e6e73]">advertisers in your space</p>
          <p className="mt-6 text-[15px] leading-relaxed text-[#6e6e73]">The going cost per click, and what the best ads in your category do differently.</p>
        </Tile>
      </div>
    </section>

    {/* How it works */}
    <section id="how" className="scroll-mt-16 bg-[#f5f5f7] py-24">
      <div className="mx-auto max-w-[980px] px-5">
        <motion.h2 {...rise} className="text-center text-[36px] font-semibold tracking-[-0.025em] sm:text-[48px]">Three steps. Twenty seconds.</motion.h2>
        <div className="mt-16 grid gap-12 text-center md:grid-cols-3">
          {STEPS.map((s) => (
            <motion.div {...rise} key={s.n}>
              <p className="text-[56px] font-semibold leading-none tracking-[-0.03em] text-[#d2d2d7]">{s.n}</p>
              <p className="mt-4 text-[21px] font-semibold tracking-[-0.01em]">{s.t}</p>
              <p className="mx-auto mt-2 max-w-[26ch] text-[17px] leading-snug text-[#6e6e73]">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Mission */}
    <section className="py-28 text-center">
      <div className="mx-auto max-w-[980px] px-5">
        <motion.p {...rise} className="mx-auto max-w-[18ch] text-balance text-[36px] font-semibold leading-[1.1] tracking-[-0.025em] sm:text-[56px]">
          Our goal: build the most useful AI tool in marketing. Period.
        </motion.p>
        <motion.div {...rise} className="mt-10">
          <PrimaryButton>Run your first simulation</PrimaryButton>
        </motion.div>
      </div>
    </section>
  </AdviceShell>
);

export default AdviceHome;
