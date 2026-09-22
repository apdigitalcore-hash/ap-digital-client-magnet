import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import AdviceShell from '@/advice/AdviceShell';
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
    <p className="mt-1 text-[22px] font-semibold tabular-nums tracking-[-0.02em] sm:text-[26px]">{v}</p>
  </div>
);

const ProductShot = () => (
  <motion.div {...rise} className="mx-auto mt-16 max-w-[980px] px-5">
    <div className="rounded-[32px] bg-[#f5f5f7] px-5 pb-0 pt-10 sm:px-12 sm:pt-14">
      <div className="mx-auto max-w-[760px] rounded-t-[20px] bg-white p-6 text-left shadow-[0_2px_40px_rgba(0,0,0,0.08)] sm:p-10">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <p className="text-[12px] text-[#6e6e73]">Google Search · Local service · $3,000/month</p>
            <p className="mt-1 text-[21px] font-semibold tracking-[-0.02em]">Emergency Plumbing</p>
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
  </motion.div>
);

const Tile = ({ className = '', children }: { className?: string; children: ReactNode }) => (
  <motion.div {...rise} className={`rounded-[28px] bg-[#f5f5f7] p-8 sm:p-10 ${className}`}>{children}</motion.div>
);

const Ring = ({ score }: { score: number }) => {
  const r = 46, c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 110 110" className="h-28 w-28" aria-hidden="true">
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
    <section className="pt-20 text-center sm:pt-28">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }} className="mx-auto max-w-[980px] px-5">
        <p className="text-[17px] font-semibold text-[#6e6e73] sm:text-[21px]">ADvice</p>
        <h1 className="mx-auto mt-3 max-w-[16ch] text-balance text-[44px] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-[72px] lg:text-[80px]">
          Simulate your campaign before you spend a dollar.
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
    <section className="mx-auto max-w-[980px] px-5 pb-24">
      <motion.h2 {...rise} className="mx-auto max-w-[18ch] text-balance text-center text-[36px] font-semibold leading-[1.1] tracking-[-0.025em] sm:text-[48px]">
        Everything you need to know. Before launch.
      </motion.h2>
      <div className="mt-14 grid gap-5 md:grid-cols-2">
        <Tile>
          <p className="text-[17px] font-semibold">Performance predictions</p>
          <p className="mt-6 text-[48px] font-semibold leading-none tracking-[-0.03em] sm:text-[56px]">4.2–6.1%</p>
          <p className="mt-2 text-[15px] text-[#6e6e73]">predicted click-through rate</p>
          <p className="mt-8 text-[15px] leading-relaxed text-[#6e6e73]">Clicks, conversions, cost per lead and ROAS — as honest ranges, with a confidence level.</p>
        </Tile>
        <Tile>
          <p className="text-[17px] font-semibold">Creative score</p>
          <div className="mt-4"><Ring score={68} /></div>
          <p className="mt-6 text-[15px] leading-relaxed text-[#6e6e73]">Headline, clarity, call to action, emotional pull and search-intent match — each scored out of 100.</p>
        </Tile>
        <Tile className="md:col-span-2">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-[17px] font-semibold">Recommendations</p>
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
          <p className="text-[17px] font-semibold">Risk check</p>
          <p className="mt-6 text-[40px] font-semibold leading-none tracking-[-0.03em] text-[#b25000]">Medium</p>
          <p className="mt-8 text-[15px] leading-relaxed text-[#6e6e73]">Is the budget right for the niche? How crowded is it? Is now a good time to launch?</p>
        </Tile>
        <Tile>
          <p className="text-[17px] font-semibold">Competitor snapshot</p>
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
