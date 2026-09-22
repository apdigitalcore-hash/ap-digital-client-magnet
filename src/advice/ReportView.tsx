import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CalendarClock, Copy, Swords, TrendingUp, Wallet } from 'lucide-react';
import type { Level, Range, Scored, Simulation } from './types';

// ── formatting ────────────────────────────────────────────────────────────
const money = (n: number) =>
  n >= 100 ? `$${Math.round(n).toLocaleString('en-US')}` : `$${n.toFixed(2)}`;
const int = (n: number) => Math.round(n).toLocaleString('en-US');
const pct = (n: number) => `${n.toFixed(n < 10 ? 1 : 0)}%`;
const span = (r: Range, f: (n: number) => string) =>
  Math.abs(r.high - r.low) < 1e-9 ? f(r.low) : `${f(r.low)} – ${f(r.high)}`;

// ── colour language: green good, amber middling, red bad ────────────────────
const TONE = {
  good: 'text-[#248a3d] bg-[#e8f7ec] border-[#248a3d]/20',
  mid: 'text-[#b25000] bg-[#fff4e5] border-[#b25000]/20',
  bad: 'text-[#d70015] bg-[#fff0f0] border-[#d70015]/20',
  neutral: 'text-[#6e6e73] bg-[#f5f5f7] border-black/[0.1]',
};
const scoreTone = (s: number) => (s >= 75 ? TONE.good : s >= 50 ? TONE.mid : TONE.bad);
const scoreBar = (s: number) => (s >= 75 ? 'bg-[#34c759]' : s >= 50 ? 'bg-[#ff9f0a]' : 'bg-[#ff3b30]');
const riskTone = (l: Level) => (l === 'low' ? TONE.good : l === 'medium' ? TONE.mid : TONE.bad);
const confidenceTone = (l: Level) => (l === 'high' ? TONE.good : l === 'medium' ? TONE.mid : TONE.bad);

const Pill = ({ tone, children }: { tone: string; children: ReactNode }) => (
  <span className={`inline-flex items-center rounded border px-2 py-0.5 text-[11px] ${tone}`}>{children}</span>
);

const Card = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`advice-card rounded-2xl border border-black/[0.06] bg-[#f5f5f7] p-5 ${className}`}>{children}</div>
);

const Section = ({ n, title, right, children }: { n: number; title: string; right?: ReactNode; children: ReactNode }) => (
  <motion.section
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45, delay: n * 0.08 }}
    className="advice-section"
  >
    <div className="mb-4 flex items-center justify-between gap-4">
      <h2 className="flex items-baseline gap-3 text-lg font-semibold tracking-[-0.02em] text-[#1d1d1f]"><span className="text-[12px] font-normal text-[#86868b]">0{n}</span>{title}</h2>
      {right}
    </div>
    {children}
  </motion.section>
);

const Metric = ({ label, value, sub }: { label: string; value: string; sub?: string }) => (
  <Card>
    <p className="text-[11px] text-[#6e6e73]">{label}</p>
    <p className="mt-2 text-lg tabular-nums text-[#1d1d1f] sm:text-xl">{value}</p>
    {sub && <p className="mt-1 text-xs text-[#86868b]">{sub}</p>}
  </Card>
);

const ScoreRow = ({ label, s }: { label: string; s: Scored }) => (
  <div className="py-3">
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm font-medium">{label}</span>
      <span className="text-sm tabular-nums text-[#1d1d1f]">{s.score}</span>
    </div>
    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#e8e8ed]">
      <motion.div
        className={`h-full rounded-full ${scoreBar(s.score)}`}
        initial={{ width: 0 }}
        animate={{ width: `${s.score}%` }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
    </div>
    <p className="mt-2 text-sm text-[#6e6e73]">{s.note}</p>
  </div>
);

const ScoreRing = ({ score }: { score: number }) => {
  const r = 52, c = 2 * Math.PI * r;
  const stroke = score >= 75 ? '#34c759' : score >= 50 ? '#ff9f0a' : '#ff3b30';
  return (
    <svg viewBox="0 0 120 120" className="h-32 w-32" role="img" aria-label={`Creative score ${score} out of 100`}>
      <circle cx="60" cy="60" r={r} fill="none" stroke="#e8e8ed" strokeWidth="8" />
      <motion.circle
        cx="60" cy="60" r={r} fill="none" stroke={stroke} strokeWidth="8" strokeLinecap="round"
        strokeDasharray={c} transform="rotate(-90 60 60)"
        initial={{ strokeDashoffset: c }}
        animate={{ strokeDashoffset: c * (1 - score / 100) }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
      <text x="60" y="58" textAnchor="middle" className="fill-[#1d1d1f]" style={{ fontSize: 30, fontWeight: 600 }}>{score}</text>
      <text x="60" y="78" textAnchor="middle" className="fill-[#86868b]" style={{ fontSize: 11 }}>/ 100</text>
    </svg>
  );
};

const CopyBlock = ({ label, text }: { label: string; text: string }) => (
  <div className="rounded-2xl border border-black/[0.06] bg-white p-4">
    <div className="mb-2 flex items-center justify-between">
      <span className="text-[11px] text-[#6e6e73]">{label}</span>
      <button
        type="button"
        onClick={() => navigator.clipboard?.writeText(text)}
        className="advice-noprint inline-flex items-center gap-1 text-xs text-[#86868b] hover:text-[#1d1d1f]"
      >
        <Copy className="h-3 w-3" /> Copy
      </button>
    </div>
    <p className="whitespace-pre-line text-[13px] leading-relaxed text-[#1d1d1f]">{text}</p>
  </div>
);

const BUDGET_LABEL = { too_low: 'Too low', healthy: 'Healthy', too_high: 'Higher than needed' } as const;
const SEASON_LABEL = { good: 'Good time', neutral: 'Neutral', bad: 'Poor timing' } as const;

const ReportView = ({ sim }: { sim: Simulation }) => {
  const { inputs: i, results: r } = sim;
  const p = r.predictions;

  return (
    <div className="space-y-12">
      <header>
        <p className="text-[12px] text-[#6e6e73]">
          {i.channel} · {i.industry} · {money(i.budget)}/month · {new Date(sim.createdAt).toLocaleDateString('en-US', { dateStyle: 'medium' })}
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.035em] text-[#1d1d1f] sm:text-4xl">{i.campaignName || 'Simulation report'}</h1>
        <p className="mt-4 max-w-3xl text-[#6e6e73]">{r.summary}</p>
      </header>

      <Section n={1} title="Performance predictions" right={<Pill tone={confidenceTone(p.confidence)}>{p.confidence} confidence</Pill>}>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Metric label="Click-through rate" value={span(p.ctr, pct)} />
          <Metric label="Cost per click" value={span(p.cpc, money)} />
          <Metric label="Monthly clicks" value={span(p.clicks, int)} />
          <Metric label="Conversion rate" value={span(p.conversionRate, pct)} />
          <Metric label="Conversions / month" value={span(p.conversions, int)} />
          <Metric label="Cost per acquisition" value={span(p.cpa, money)} />
          <Metric label="ROAS" value={p.roas ? span(p.roas, (n) => `${n.toFixed(1)}x`) : '—'} sub={p.roas ? undefined : 'Needs a known order value'} />
          <Metric label="Budget" value={money(i.budget)} sub="per month" />
        </div>
        <Card className="mt-3">
          <p className="text-sm text-[#6e6e73]">{p.confidenceReason}</p>
          {p.assumptions.length > 0 && (
            <ul className="mt-3 space-y-1 text-sm text-[#86868b]">
              {p.assumptions.map((a) => <li key={a}>· {a}</li>)}
            </ul>
          )}
        </Card>
      </Section>

      <Section n={2} title="Creative score" right={<Pill tone={scoreTone(r.creative.overall)}>{r.creative.verdict}</Pill>}>
        <div className="grid gap-3 lg:grid-cols-[240px_1fr]">
          <Card className="flex flex-col items-center justify-center text-center">
            <ScoreRing score={r.creative.overall} />
            <p className="mt-3 text-sm text-[#6e6e73]">Overall creative score</p>
          </Card>
          <Card className="divide-y divide-black/[0.06] py-2">
            <ScoreRow label="Headline strength" s={r.creative.headline} />
            <ScoreRow label="Copy clarity & persuasion" s={r.creative.clarity} />
            <ScoreRow label="Call to action" s={r.creative.cta} />
            <div>
              <ScoreRow label="Emotional triggers" s={r.creative.emotion} />
              {r.creative.emotion.triggers.length > 0 && (
                <div className="-mt-1 flex flex-wrap gap-1.5 pb-3">
                  {r.creative.emotion.triggers.map((t) => <Pill key={t} tone={TONE.neutral}>{t}</Pill>)}
                </div>
              )}
            </div>
            {r.creative.intent && <ScoreRow label="Keyword–intent alignment" s={r.creative.intent} />}
          </Card>
        </div>
      </Section>

      <Section n={3} title="Risk assessment" right={<Pill tone={riskTone(r.risk.overall)}>{r.risk.overall} risk</Pill>}>
        <p className="mb-3 text-sm text-[#6e6e73]">{r.risk.summary}</p>
        <div className="grid gap-3 md:grid-cols-3">
          <Card>
            <div className="flex items-center justify-between"><Wallet className="h-4 w-4 text-[#86868b]" />
              <Pill tone={r.risk.budget.status === 'healthy' ? TONE.good : TONE.mid}>{BUDGET_LABEL[r.risk.budget.status]}</Pill></div>
            <h3 className="mt-3 text-sm font-medium">Budget efficiency</h3>
            <p className="mt-1 text-sm text-[#6e6e73]">{r.risk.budget.note}</p>
          </Card>
          <Card>
            <div className="flex items-center justify-between"><Swords className="h-4 w-4 text-[#86868b]" />
              <Pill tone={riskTone(r.risk.competition.level)}>{r.risk.competition.level} competition</Pill></div>
            <h3 className="mt-3 text-sm font-medium">Competition</h3>
            <p className="mt-1 text-sm text-[#6e6e73]">{r.risk.competition.note}</p>
          </Card>
          <Card>
            <div className="flex items-center justify-between"><CalendarClock className="h-4 w-4 text-[#86868b]" />
              <Pill tone={r.risk.seasonality.status === 'good' ? TONE.good : r.risk.seasonality.status === 'neutral' ? TONE.neutral : TONE.bad}>
                {SEASON_LABEL[r.risk.seasonality.status]}</Pill></div>
            <h3 className="mt-3 text-sm font-medium">Seasonality</h3>
            <p className="mt-1 text-sm text-[#6e6e73]">{r.risk.seasonality.note}</p>
          </Card>
        </div>
      </Section>

      <Section n={4} title="AI recommendations">
        <div className="space-y-3">
          {r.recommendations.improvements.map((m, idx) => (
            <Card key={m.title} className="flex gap-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded border border-black/[0.06] text-[12px] text-[#1d1d1f]">{idx + 1}</span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-medium">{m.title}</h3>
                  <Pill tone={m.impact === 'high' ? TONE.good : m.impact === 'medium' ? TONE.mid : TONE.neutral}>{m.impact} impact</Pill>
                </div>
                <p className="mt-1.5 text-sm text-[#6e6e73]">{m.detail}</p>
              </div>
            </Card>
          ))}
        </div>

        <h3 className="mb-3 mt-8 text-sm font-medium text-[#1d1d1f]">Rewritten ad</h3>
        <div className="grid gap-3 md:grid-cols-2">
          <CopyBlock label="Headline" text={r.recommendations.headline} />
          <CopyBlock label="Description" text={r.recommendations.description} />
          <div className="md:col-span-2"><CopyBlock label="Primary text" text={r.recommendations.primaryText} /></div>
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <Card>
            <div className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-[#1d1d1f]" /><h3 className="text-sm font-medium">Budget advice</h3></div>
            <p className="mt-2 text-sm text-[#6e6e73]">{r.recommendations.budget}</p>
          </Card>
          <Card>
            <h3 className="text-sm font-medium">Audience refinement</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-[#6e6e73]">
              {r.recommendations.audience.map((a) => <li key={a}>· {a}</li>)}
            </ul>
          </Card>
        </div>
        {r.recommendations.landingPage && (
          <Card className="mt-3">
            <h3 className="text-sm font-medium">Landing page feedback</h3>
            <p className="mt-2 whitespace-pre-line text-sm text-[#6e6e73]">{r.recommendations.landingPage}</p>
          </Card>
        )}
      </Section>

      <Section n={5} title="Competitor snapshot">
        <div className="grid gap-3 md:grid-cols-[1fr_1fr_2fr]">
          <Metric label="Est. advertisers" value={span(r.competitors.advertisers, int)} sub="in this niche and region" />
          <Metric label="Average CPC" value={span(r.competitors.avgCpc, money)} sub="across the category" />
          <Card>
            <h3 className="text-sm font-medium">What top ads do differently</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-[#6e6e73]">
              {r.competitors.patterns.map((x) => <li key={x}>· {x}</li>)}
            </ul>
          </Card>
        </div>
      </Section>

      <p className="flex items-start gap-2 text-xs text-[#86868b]">
        <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        These are AI estimates based on industry benchmarks and the details provided, not guarantees of performance.
      </p>
    </div>
  );
};

export default ReportView;
