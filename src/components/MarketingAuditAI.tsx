import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap, ArrowRight, ArrowLeft, Loader2, CheckCircle2, AlertTriangle,
  TrendingUp, Sparkles, Share2, Download, RotateCcw, Check, ChevronDown,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

/* ────────────────────────────────────────────────────────────────────────────
 * Config
 * ────────────────────────────────────────────────────────────────────────── */

const STRIPE_URL = 'https://buy.stripe.com/aFa5kF5R27g1flhg2o8EM03';

const INDUSTRIES = [
  { id: 'trades', label: 'Trades & Contractors', icon: '🔧' },
  { id: 'salon', label: 'Salon / Med Spa', icon: '💇' },
  { id: 'real-estate', label: 'Real Estate', icon: '🏠' },
  { id: 'coaching', label: 'Coaching / Consulting', icon: '🎯' },
  { id: 'ecommerce', label: 'E-commerce', icon: '🛒' },
  { id: 'saas', label: 'SaaS / Tech', icon: '💻' },
  { id: 'restaurant', label: 'Restaurant / Food', icon: '🍽️' },
  { id: 'fitness', label: 'Fitness / Gym', icon: '💪' },
  { id: 'professional-services', label: 'Professional Services', icon: '📊' },
  { id: 'other', label: 'Something else', icon: '✨' },
] as const;

type IndustryId = typeof INDUSTRIES[number]['id'];

type Dimension = 'social' | 'ads' | 'seo' | 'website' | 'content' | 'reviews' | 'funnel';

const DIMENSION_ORDER: Dimension[] = ['social', 'ads', 'seo', 'website', 'content', 'reviews', 'funnel'];
const DIMENSION_LABELS: Record<Dimension, string> = {
  social: 'Social',
  ads: 'Ads',
  seo: 'SEO',
  website: 'Website',
  content: 'Content',
  reviews: 'Reviews',
  funnel: 'Funnel',
};

type Question = {
  dim: Dimension;
  category: string;
  text: string;
  answers: { text: string; score: number }[];
};

const QUESTIONS: Question[] = [
  {
    dim: 'social',
    category: 'Social Media',
    text: 'How often do you post content where your buyers actually scroll?',
    answers: [
      { text: "I don't post at all", score: 10 },
      { text: 'Maybe once a month when I remember', score: 30 },
      { text: 'Every few weeks, inconsistent', score: 50 },
      { text: 'Weekly, with a rough plan', score: 75 },
      { text: 'Daily, with a content calendar and hooks', score: 95 },
    ],
  },
  {
    dim: 'ads',
    category: 'Paid Ads',
    text: 'What does your paid advertising look like right now?',
    answers: [
      { text: 'Never run ads — scared of wasting money', score: 15 },
      { text: 'Tried once or twice, lost money, stopped', score: 35 },
      { text: 'Running ads, results are unpredictable', score: 55 },
      { text: 'Running ads, consistent leads, unclear ROI', score: 75 },
      { text: 'Running ads profitably with clear CAC and LTV', score: 95 },
    ],
  },
  {
    dim: 'seo',
    category: 'Google / SEO',
    text: 'When someone Googles what you sell, what happens?',
    answers: [
      { text: 'Nothing — I have no Google presence', score: 15 },
      { text: "I'm listed but have no reviews or rankings", score: 35 },
      { text: 'A few rankings, some reviews, shows up sometimes', score: 55 },
      { text: 'Ranking locally for most key terms + good reviews', score: 80 },
      { text: 'Dominating Google locally — top 3 consistently', score: 95 },
    ],
  },
  {
    dim: 'website',
    category: 'Website',
    text: 'How is your website performing as a conversion machine?',
    answers: [
      { text: "I don't have a website", score: 10 },
      { text: "I have one, but it's old and slow", score: 35 },
      { text: 'Decent site but visitors rarely convert', score: 55 },
      { text: 'Fast site, converting about 2-3% of traffic', score: 75 },
      { text: 'High-converting, fast, built around one offer', score: 95 },
    ],
  },
  {
    dim: 'content',
    category: 'Content',
    text: 'How is your content creation going?',
    answers: [
      { text: 'I make nothing', score: 15 },
      { text: 'Occasional posts, no real plan', score: 35 },
      { text: 'Posting regularly, getting some traction', score: 60 },
      { text: 'Content driving leads on autopilot', score: 80 },
      { text: 'Multiple formats, viral moments, compounding reach', score: 95 },
    ],
  },
  {
    dim: 'reviews',
    category: 'Reviews & Reputation',
    text: 'How many reviews have you collected in the last 12 months?',
    answers: [
      { text: 'None — I never ask', score: 15 },
      { text: 'Less than 5', score: 35 },
      { text: '5-20, mostly unprompted', score: 55 },
      { text: '20-50 with an ask-after-service system', score: 80 },
      { text: '50+ with automated review collection', score: 95 },
    ],
  },
  {
    dim: 'funnel',
    category: 'Sales & Follow-up',
    text: 'What happens after someone fills out your contact form?',
    answers: [
      { text: 'I contact them when I get around to it', score: 20 },
      { text: 'I try to reply within a day or two', score: 40 },
      { text: 'I call/text within an hour during work hours', score: 65 },
      { text: 'Auto-email + text within 5 min + human follow-up', score: 85 },
      { text: 'Full automated sequence across email, SMS, retargeting', score: 95 },
    ],
  },
];

const ANALYZE_STAGES = [
  'Scanning your marketing channels…',
  'Comparing against industry benchmarks…',
  'Identifying your highest-ROI fixes…',
  'Writing your personalized report…',
];

/* ────────────────────────────────────────────────────────────────────────────
 * Types from the edge function
 * ────────────────────────────────────────────────────────────────────────── */

interface DimensionAnalysis {
  dimension: Dimension;
  label: string;
  score: number;
  benchmark: number;
  insight: string;
  actions: string[];
}

interface AnalysisResult {
  overall: number;
  benchmark: number;
  tier: string;
  headline: string;
  summary: string;
  nextStep: string;
  dimensions: DimensionAnalysis[];
  weakest: Dimension;
  strongest: Dimension;
}

/* ────────────────────────────────────────────────────────────────────────────
 * Radar helpers
 * ────────────────────────────────────────────────────────────────────────── */

const SVG_SIZE = 500;
const SVG_CENTER = 250;
const SVG_RADIUS = 170;
const LABEL_RADIUS = SVG_RADIUS + 32;
const N = DIMENSION_ORDER.length;

function axisPt(idx: number, r: number): [number, number] {
  const rad = ((-90 + (idx * 360) / N) * Math.PI) / 180;
  return [SVG_CENTER + r * Math.cos(rad), SVG_CENTER + r * Math.sin(rad)];
}
function ringPoints(frac: number): string {
  return Array.from({ length: N }, (_, i) =>
    axisPt(i, SVG_RADIUS * frac).map((n) => n.toFixed(1)).join(',')
  ).join(' ');
}
function buildScorePath(values: number[]): string {
  const pts = values.map((v, i) =>
    axisPt(i, (v / 100) * SVG_RADIUS).map((n) => n.toFixed(1)).join(',')
  );
  return `M ${pts.join(' L ')} Z`;
}
function labelAnchor(i: number): 'middle' | 'start' | 'end' {
  const rad = ((-90 + (i * 360) / N) * Math.PI) / 180;
  const x = Math.cos(rad);
  if (x > 0.2) return 'start';
  if (x < -0.2) return 'end';
  return 'middle';
}

/* ────────────────────────────────────────────────────────────────────────────
 * Grade, revenue-leak & service-recommendation helpers
 * ────────────────────────────────────────────────────────────────────────── */

function getGrade(score: number): string {
  if (score >= 90) return 'A';
  if (score >= 75) return 'B';
  if (score >= 55) return 'C';
  if (score >= 35) return 'D';
  return 'F';
}

function getGradeStyle(grade: string): string {
  switch (grade) {
    case 'A': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30';
    case 'B': return 'text-teal bg-teal/10 border-teal/30';
    case 'C': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
    case 'D': return 'text-orange-400 bg-orange-400/10 border-orange-400/30';
    default:  return 'text-red-400 bg-red-400/10 border-red-400/30';
  }
}

/* Conservative per-dimension monthly revenue-impact multipliers.
   Based on AP Digital client data for typical BC service businesses ($15K-$40K/mo).
   Each point of gap below benchmark × weight = estimated $ left on the table. */
const DIM_REVENUE_WEIGHT: Record<Dimension, number> = {
  ads: 3200, funnel: 2600, seo: 2000, website: 1600,
  reviews: 1400, social: 1000, content: 800,
};

function estimateMonthlyLeak(dims: DimensionAnalysis[]): number {
  return dims.reduce((sum, d) => {
    const gap = Math.max(0, d.benchmark - d.score);
    return sum + Math.round((gap / 100) * (DIM_REVENUE_WEIGHT[d.dimension] ?? 1000));
  }, 0);
}

const SERVICE_REC: Record<Dimension, { label: string; path: string; pitch: string }> = {
  ads:     { label: 'Paid Ads',         path: '/services/paid-ads',         pitch: 'Google + Meta ads managed for $759/mo — 20-50 leads/month for BC trades, salons & realtors.' },
  seo:     { label: 'SEO',              path: '/services/seo',              pitch: 'Local SEO + Google Business Profile optimization. Most clients hit page 1 in 90-180 days.' },
  social:  { label: 'Social Media',     path: '/services/social-media',     pitch: '12 custom posts/month, 2 platforms managed, community engagement — fully done for you.' },
  content: { label: 'Content Creation', path: '/services/content-creation', pitch: 'Scroll-stopping short-form video + social content that builds brand and drives leads.' },
  website: { label: 'Web Design',       path: '/services/web-design',       pitch: 'Fast, conversion-focused websites that turn visitors into paying clients. One-time $2,100.' },
  reviews: { label: 'Lead Generation',  path: '/services/lead-generation',  pitch: 'Automated review collection + reputation systems. Part of our lead gen service.' },
  funnel:  { label: 'Lead Generation',  path: '/services/lead-generation',  pitch: 'End-to-end lead nurture — email, SMS, CRM automation. 2,400+ leads delivered for BC businesses.' },
};

/* ────────────────────────────────────────────────────────────────────────────
 * Phases
 * ────────────────────────────────────────────────────────────────────────── */

type Phase =
  | 'intro'
  | 'business'
  | 'quiz'
  | 'gate'
  | 'analyzing'
  | 'results';

/* ────────────────────────────────────────────────────────────────────────────
 * Component
 * ────────────────────────────────────────────────────────────────────────── */

const MarketingAuditAI = () => {
  const [phase, setPhase] = useState<Phase>('intro');

  const [industry, setIndustry] = useState<IndustryId | null>(null);
  const [firstName, setFirstName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [email, setEmail] = useState('');

  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Partial<Record<Dimension, number>>>({});
  const [selected, setSelected] = useState<number | null>(null);

  const [analyzeIdx, setAnalyzeIdx] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [source, setSource] = useState<'claude' | 'rule-based' | null>(null);
  const [emailed, setEmailed] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [copiedShare, setCopiedShare] = useState(false);
  const [expandedDims, setExpandedDims] = useState<Set<Dimension>>(new Set());

  const sectionRef = useRef<HTMLElement>(null);
  const scrollToSelf = () => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Analyzing animation
  useEffect(() => {
    if (phase !== 'analyzing') return;
    setAnalyzeIdx(0);
    const timers = ANALYZE_STAGES.map((_, i) =>
      window.setTimeout(() => setAnalyzeIdx(i), i * 800)
    );
    return () => timers.forEach(window.clearTimeout);
  }, [phase]);

  const q = QUESTIONS[currentQ];
  const quizProgress = ((currentQ + 1) / QUESTIONS.length) * 100;

  const handleAnswer = useCallback(
    (index: number, score: number) => {
      if (selected !== null) return;
      setSelected(index);
      const next: Partial<Record<Dimension, number>> = { ...answers, [q.dim]: score };

      window.setTimeout(() => {
        setAnswers(next);
        if (currentQ < QUESTIONS.length - 1) {
          setCurrentQ((i) => i + 1);
          setSelected(null);
        } else {
          setPhase('gate');
          scrollToSelf();
        }
      }, 260);
    },
    [answers, currentQ, q.dim, selected]
  );

  const handleQuizBack = () => {
    if (currentQ === 0) {
      setPhase('business');
      return;
    }
    setCurrentQ((i) => i - 1);
    setSelected(null);
  };

  const submitAudit = async () => {
    if (!industry) return;
    const emailClean = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailClean)) {
      setErrorMsg('Please enter a valid email so we can send your report.');
      return;
    }
    setErrorMsg(null);
    setSubmitting(true);
    setPhase('analyzing');

    const minDelay = new Promise((r) => window.setTimeout(r, 2800));

    try {
      const payload = {
        email: emailClean,
        firstName: firstName.trim() || undefined,
        businessName: businessName.trim() || undefined,
        websiteUrl: websiteUrl.trim() || undefined,
        industry,
        answers: DIMENSION_ORDER.reduce((acc, d) => {
          acc[d] = answers[d] ?? 50;
          return acc;
        }, {} as Record<Dimension, number>),
      };

      const [res] = await Promise.all([
        supabase.functions.invoke('audit-analysis', { body: payload }),
        minDelay,
      ]);

      if (res.error) throw res.error;
      const data = res.data as {
        ok?: boolean;
        source?: 'claude' | 'rule-based';
        analysis?: AnalysisResult;
        emailed?: boolean;
        error?: string;
      };
      if (!data?.ok || !data.analysis) throw new Error(data?.error || 'Analysis failed');

      setResult(data.analysis);
      setSource(data.source || 'rule-based');
      setEmailed(Boolean(data.emailed));
      setPhase('results');
      scrollToSelf();
    } catch (err) {
      console.error(err);
      setErrorMsg(
        "We hit a snag generating your report. Please try again — if it persists, email arjun@ap-digital.ca and I'll run it manually."
      );
      setPhase('gate');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setPhase('intro');
    setIndustry(null);
    setFirstName('');
    setBusinessName('');
    setWebsiteUrl('');
    setEmail('');
    setCurrentQ(0);
    setAnswers({});
    setSelected(null);
    setResult(null);
    setSource(null);
    setErrorMsg(null);
    setExpandedDims(new Set());
    scrollToSelf();
  };

  const toggleDim = useCallback((dim: Dimension) => {
    setExpandedDims(prev => {
      const next = new Set(prev);
      if (next.has(dim)) next.delete(dim); else next.add(dim);
      return next;
    });
  }, []);

  const shareText = useMemo(() => {
    if (!result) return '';
    const biz = businessName ? ` for ${businessName}` : '';
    const grade = getGrade(result.overall);
    return `Just scored ${result.overall}% (Grade: ${grade}) on the AP Digital Marketing Audit${biz}. Industry benchmark: ${result.benchmark}%. Biggest opportunity: ${DIMENSION_LABELS[result.weakest]}. Take the free audit → https://ap-digital.ca/#marketing-audit`;
  }, [result, businessName]);

  const sortedDimensions = useMemo(() => {
    if (!result) return [];
    return [...result.dimensions].sort((a, b) => (b.benchmark - b.score) - (a.benchmark - a.score));
  }, [result]);

  const monthlyLeak = useMemo(() => {
    if (!result) return 0;
    return estimateMonthlyLeak(result.dimensions);
  }, [result]);

  const overallGrade = useMemo(() => {
    if (!result) return 'C';
    return getGrade(result.overall);
  }, [result]);

  const serviceRec = useMemo(() => {
    if (!result) return SERVICE_REC.ads;
    return SERVICE_REC[result.weakest] ?? SERVICE_REC.ads;
  }, [result]);

  const handleCopyShare = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopiedShare(true);
      window.setTimeout(() => setCopiedShare(false), 2000);
    } catch { /* ignore */ }
  };

  const scoreValues = result
    ? DIMENSION_ORDER.map((d) => result.dimensions.find((x) => x.dimension === d)?.score ?? 0)
    : [];
  const benchmarkValues = result
    ? DIMENSION_ORDER.map((d) => result.dimensions.find((x) => x.dimension === d)?.benchmark ?? 0)
    : [];

  return (
    <section
      ref={sectionRef}
      id="marketing-audit"
      className="relative py-20 md:py-28 bg-near-black overflow-hidden"
    >
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-teal/5 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-gold/4 rounded-full blur-3xl" />
      </div>
      <div aria-hidden className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal/25 to-transparent" />

      <div className="container-custom relative z-10">
        {phase !== 'results' && (
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 border border-teal/20 text-teal mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold uppercase tracking-wider">Free AI Marketing Audit</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
              Get a Real Diagnosis of Your{' '}
              <span className="text-gradient">Marketing Engine</span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
              7 questions. 90 seconds. You'll get a personalized report with industry benchmarks and the exact next move — written by AI trained on AP Digital's playbook.
            </p>
          </div>
        )}

        <AnimatePresence mode="wait">
          {phase === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl mx-auto"
            >
              <div className="rounded-3xl border border-gray-800 bg-charcoal-light/60 backdrop-blur-sm p-6 sm:p-8 md:p-10">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
                  First — what kind of business do you run?
                </h3>
                <p className="text-sm text-gray-400 mb-6">
                  Benchmarks vary wildly by industry. We'll tailor your report to what good looks like in yours.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                  {INDUSTRIES.map((ind) => {
                    const active = industry === ind.id;
                    return (
                      <button
                        key={ind.id}
                        onClick={() => setIndustry(ind.id)}
                        className={`group relative flex flex-col items-center text-center gap-2 p-3 sm:p-4 rounded-2xl border transition-all ${
                          active
                            ? 'border-teal bg-teal/10 shadow-teal'
                            : 'border-gray-800 bg-charcoal hover:border-teal/50 hover:bg-teal/5'
                        }`}
                        aria-pressed={active}
                      >
                        <span className="text-2xl" aria-hidden>{ind.icon}</span>
                        <span className={`text-xs sm:text-sm font-semibold leading-tight ${active ? 'text-white' : 'text-gray-300'}`}>
                          {ind.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    disabled={!industry}
                    onClick={() => setPhase('business')}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-teal text-near-black font-bold text-sm hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {phase === 'business' && (
            <motion.div
              key="business"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              <div className="rounded-3xl border border-gray-800 bg-charcoal-light/60 backdrop-blur-sm p-6 sm:p-8 md:p-10">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
                  Who's this report for?
                </h3>
                <p className="text-sm text-gray-400 mb-6">
                  Optional — we use this to write your report directly to you, not to some generic business.
                </p>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="audit-firstName" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                      First name
                    </label>
                    <input
                      id="audit-firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Jamie"
                      maxLength={60}
                      className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-600 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30 transition"
                    />
                  </div>
                  <div>
                    <label htmlFor="audit-business" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                      Business name
                    </label>
                    <input
                      id="audit-business"
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="Northshore Plumbing"
                      maxLength={120}
                      className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-600 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30 transition"
                    />
                  </div>
                  <div>
                    <label htmlFor="audit-url" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                      Website <span className="text-gray-400 normal-case tracking-normal">(optional)</span>
                    </label>
                    <input
                      id="audit-url"
                      type="url"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      placeholder="https://yourbusiness.com"
                      maxLength={300}
                      className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-600 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30 transition"
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setPhase('intro')}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white transition"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    onClick={() => setPhase('quiz')}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-teal text-near-black font-bold text-sm hover:opacity-90 transition"
                  >
                    Start the audit <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {phase === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              <div className="mb-6">
                <div className="flex justify-between text-xs text-gray-400 mb-2">
                  <span>Question {currentQ + 1} of {QUESTIONS.length}</span>
                  <span className="font-semibold text-teal">{q.category}</span>
                </div>
                <div className="h-1.5 rounded-full bg-gray-800 overflow-hidden">
                  <motion.div
                    className="h-1.5 rounded-full bg-teal"
                    animate={{ width: `${quizProgress}%` }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQ}
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -40, opacity: 0 }}
                  transition={{ duration: 0.22, ease: 'easeInOut' }}
                >
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-6 leading-snug">
                    {q.text}
                  </h3>

                  <div className="space-y-2.5" role="radiogroup" aria-label={q.category}>
                    {q.answers.map(({ text, score }, i) => {
                      const isSel = selected === i;
                      return (
                        <button
                          key={i}
                          onClick={() => handleAnswer(i, score)}
                          disabled={selected !== null}
                          role="radio"
                          aria-checked={isSel}
                          className={[
                            'group w-full flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer',
                            isSel
                              ? 'border-teal bg-teal/10'
                              : 'border-gray-800 bg-charcoal hover:border-teal/50 hover:bg-teal/5',
                            selected !== null && !isSel ? 'opacity-40 cursor-not-allowed' : '',
                          ].join(' ')}
                        >
                          <span
                            className={[
                              'flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-colors',
                              isSel
                                ? 'bg-teal text-near-black'
                                : 'bg-gray-800 text-gray-400 group-hover:bg-teal/20 group-hover:text-teal',
                            ].join(' ')}
                          >
                            {String.fromCharCode(65 + i)}
                          </span>
                          <span className={`text-sm sm:text-base leading-snug ${isSel ? 'text-white' : 'text-gray-300'}`}>
                            {text}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-6 flex items-center justify-between">
                <button
                  onClick={handleQuizBack}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white transition"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <span className="text-xs text-gray-400">Your answers are private</span>
              </div>
            </motion.div>
          )}

          {phase === 'gate' && (
            <motion.div
              key="gate"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              <div className="rounded-3xl border border-teal/25 bg-charcoal-light/80 backdrop-blur-sm p-6 sm:p-8 md:p-10">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-teal" />
                  <p className="text-xs font-bold text-teal uppercase tracking-wider">Answers locked in</p>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
                  Where should we send your report?
                </h3>
                <p className="text-sm text-gray-400 mb-6">
                  You'll get the full breakdown on this page + a copy in your inbox. No newsletter, no spam — one email with your report and your next step.
                </p>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="audit-email" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                      Email
                    </label>
                    <input
                      id="audit-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errorMsg) setErrorMsg(null);
                      }}
                      placeholder="you@yourbusiness.com"
                      maxLength={255}
                      autoComplete="email"
                      className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-600 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30 transition"
                    />
                  </div>
                  {errorMsg && (
                    <div className="flex items-start gap-2 px-3 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
                      <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex items-center justify-between gap-3">
                  <button
                    onClick={() => { setPhase('quiz'); setCurrentQ(QUESTIONS.length - 1); }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white transition"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    onClick={submitAudit}
                    disabled={submitting}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-teal text-near-black font-bold text-sm hover:opacity-90 disabled:opacity-50 transition shadow-teal-lg"
                  >
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    Get my report
                  </button>
                </div>

                <p className="text-center text-xs text-gray-400 mt-5">
                  We use your email only to send this report. Unsubscribe anytime.
                </p>
              </div>
            </motion.div>
          )}

          {phase === 'analyzing' && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center py-20 gap-6"
            >
              <div className="relative w-20 h-20">
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-teal/20 border-t-teal"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-teal" />
                </div>
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={analyzeIdx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="text-gray-300 text-base sm:text-lg font-medium text-center"
                >
                  {ANALYZE_STAGES[analyzeIdx]}
                </motion.p>
              </AnimatePresence>
              <div className="flex gap-1.5">
                {ANALYZE_STAGES.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 w-8 rounded-full transition-colors ${i <= analyzeIdx ? 'bg-teal' : 'bg-gray-800'}`}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {phase === 'results' && result && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="max-w-6xl mx-auto"
            >
              <div className="rounded-3xl border border-gray-800 bg-charcoal-light/60 backdrop-blur-sm p-6 sm:p-10 md:p-12 mb-6">
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal/10 border border-teal/20 text-teal text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3 h-3" /> {source === 'claude' ? 'AI-Generated Report' : 'Personalized Report'}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-800 text-gray-400 text-xs font-semibold">
                    {INDUSTRIES.find((i) => i.id === industry)?.label}
                  </span>
                </div>

                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
                  {result.headline}
                </h2>

                <div className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-8 items-start">
                  <div className="flex items-end gap-4 md:flex-col md:items-start">
                    <div>
                      <p className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Your score</p>
                      <div className="flex items-end gap-3">
                        <div className="font-display text-5xl sm:text-6xl md:text-7xl font-black text-teal leading-none">
                          {result.overall}<span className="text-2xl sm:text-3xl">%</span>
                        </div>
                        <span className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl border font-display text-xl sm:text-2xl font-black mb-1 ${getGradeStyle(overallGrade)}`}>
                          {overallGrade}
                        </span>
                      </div>
                    </div>
                    <div className="md:mt-2">
                      <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Benchmark</p>
                      <div className="font-display text-2xl sm:text-3xl font-bold text-gray-400 leading-none">
                        {result.benchmark}%
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-bold uppercase tracking-wider mb-3">
                      Tier: {result.tier}
                    </div>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      {result.summary}
                    </p>
                  </div>
                </div>
              </div>

              {/* Revenue leak estimate */}
              {monthlyLeak > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="rounded-2xl border border-orange-500/25 bg-orange-500/5 p-5 sm:p-6 mb-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="w-5 h-5 text-orange-400" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-1">Estimated revenue gap</p>
                        <p className="text-sm text-gray-300 leading-relaxed">
                          Based on your scores vs. industry benchmarks, you're likely leaving an estimated{' '}
                          <span className="text-white font-bold">${monthlyLeak.toLocaleString()}/month</span>{' '}
                          on the table from marketing gaps alone.
                        </p>
                      </div>
                    </div>
                    <div className="flex-shrink-0 text-center sm:text-right">
                      <div className="font-display text-3xl sm:text-4xl font-black text-orange-400 leading-none">
                        ${monthlyLeak.toLocaleString()}
                      </div>
                      <p className="text-[10px] text-gray-500 mt-1">est. /month</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-600 mt-3 leading-relaxed">
                    Estimate based on AP Digital's client data for BC service businesses. Actual impact varies by market, pricing, and competition.
                  </p>
                </motion.div>
              )}

              <div className="grid lg:grid-cols-5 gap-6 mb-6">
                <div className="lg:col-span-2 rounded-3xl border border-gray-800 bg-charcoal-light/60 backdrop-blur-sm p-5 sm:p-8">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Marketing Map</p>
                  <div className="w-full max-w-sm mx-auto">
                    <svg viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`} className="w-full" aria-hidden>
                      {[0.25, 0.5, 0.75, 1].map((f) => (
                        <polygon key={f} points={ringPoints(f)} fill="none" stroke="#1f2937" strokeWidth={f === 1 ? 1.5 : 1} />
                      ))}
                      {Array.from({ length: N }, (_, i) => {
                        const [x, y] = axisPt(i, SVG_RADIUS);
                        return <line key={i} x1={SVG_CENTER} y1={SVG_CENTER} x2={x} y2={y} stroke="#374151" strokeWidth={1} />;
                      })}
                      <motion.path
                        d={buildScorePath(benchmarkValues)}
                        stroke="hsl(var(--gray-500))"
                        strokeWidth={1.5}
                        strokeDasharray="4 4"
                        fill="hsl(var(--gray-500))"
                        fillOpacity={0.06}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                      />
                      <motion.path
                        d={buildScorePath(scoreValues)}
                        className="stroke-teal fill-teal"
                        strokeWidth={2.5}
                        strokeLinejoin="round"
                        fillOpacity={0}
                        initial={{ pathLength: 0, fillOpacity: 0 }}
                        animate={{ pathLength: 1, fillOpacity: 0.25 }}
                        transition={{ pathLength: { duration: 1.3, ease: 'easeInOut' }, fillOpacity: { duration: 0.5, delay: 0.9 } }}
                      />
                      {scoreValues.map((v, i) => {
                        const [cx, cy] = axisPt(i, (v / 100) * SVG_RADIUS);
                        return (
                          <motion.circle
                            key={i}
                            cx={cx}
                            cy={cy}
                            r={4.5}
                            className="fill-teal"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.1 + i * 0.06 }}
                          />
                        );
                      })}
                      {DIMENSION_ORDER.map((d, i) => {
                        const [lx, ly] = axisPt(i, LABEL_RADIUS);
                        return (
                          <text
                            key={d}
                            x={lx}
                            y={ly}
                            fill="hsl(var(--teal))"
                            fontSize="13"
                            fontWeight="600"
                            fontFamily="Plus Jakarta Sans, Inter, system-ui"
                            textAnchor={labelAnchor(i)}
                            dominantBaseline="middle"
                          >
                            {DIMENSION_LABELS[d]}
                          </text>
                        );
                      })}
                    </svg>
                  </div>
                  <div className="flex items-center justify-center gap-4 mt-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-teal" /> You</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 border-t border-dashed border-gray-500" /> Benchmark</span>
                  </div>
                </div>

                <div className="lg:col-span-3 rounded-3xl border border-gray-800 bg-charcoal-light/60 backdrop-blur-sm p-5 sm:p-8">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Channel Breakdown</p>
                    <p className="text-[10px] text-gray-600">Sorted by opportunity · Click to expand</p>
                  </div>
                  <div className="space-y-3.5">
                    {sortedDimensions.map((d, i) => {
                      const isWeakest = d.dimension === result.weakest;
                      const isStrongest = d.dimension === result.strongest;
                      const gap = d.score - d.benchmark;
                      const grade = getGrade(d.score);
                      const isExpanded = expandedDims.has(d.dimension);
                      return (
                        <motion.div
                          key={d.dimension}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + i * 0.05 }}
                          className={`rounded-2xl border transition-colors ${
                            isWeakest ? 'border-orange-500/30 bg-orange-500/5'
                            : isStrongest ? 'border-teal/25 bg-teal/5'
                            : 'border-gray-800 bg-gray-900/40'
                          }`}
                        >
                          <button
                            onClick={() => toggleDim(d.dimension)}
                            className="w-full text-left p-4 focus:outline-none focus:ring-2 focus:ring-teal/30 rounded-2xl"
                            aria-expanded={isExpanded}
                          >
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <div className="flex items-center gap-2.5 min-w-0">
                                <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg border font-display text-sm font-black flex-shrink-0 ${getGradeStyle(grade)}`}>
                                  {grade}
                                </span>
                                <h4 className={`font-semibold text-sm sm:text-base truncate ${isWeakest ? 'text-orange-300' : isStrongest ? 'text-teal' : 'text-white'}`}>
                                  {d.label}
                                </h4>
                                {isWeakest && <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400 flex-shrink-0 hidden sm:inline">#1 opportunity</span>}
                                {isStrongest && <span className="text-[10px] font-bold uppercase tracking-wider text-teal flex-shrink-0 hidden sm:inline">Strength</span>}
                              </div>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <div className="flex items-baseline gap-1.5">
                                  <span className={`font-bold text-sm ${isWeakest ? 'text-orange-400' : isStrongest ? 'text-teal' : 'text-white'}`}>
                                    {d.score}%
                                  </span>
                                  <span className={`text-[10px] font-semibold ${gap >= 0 ? 'text-teal' : 'text-gray-500'}`}>
                                    {gap >= 0 ? `+${gap}` : gap}
                                  </span>
                                </div>
                                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                              </div>
                            </div>
                            <div className="relative h-1.5 rounded-full bg-gray-800 overflow-hidden mb-3">
                              <motion.div
                                className={`absolute top-0 left-0 h-1.5 rounded-full ${isWeakest ? 'bg-orange-400' : 'bg-teal'}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${d.score}%` }}
                                transition={{ duration: 0.8, delay: 0.3 + i * 0.08 }}
                              />
                              <div className="absolute top-0 h-1.5 w-0.5 bg-gray-400" style={{ left: `${d.benchmark}%` }} aria-hidden />
                            </div>
                            <p className="text-sm text-gray-300 leading-relaxed">{d.insight}</p>
                          </button>

                          <AnimatePresence>
                            {isExpanded && d.actions && d.actions.length > 0 && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: 'easeInOut' }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 pb-4 pt-1">
                                  <div className="h-px bg-gray-800 mb-3" />
                                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2.5">
                                    Fix it — action plan
                                  </p>
                                  <ol className="space-y-2">
                                    {d.actions.map((a, ai) => (
                                      <li key={ai} className="flex items-start gap-2.5 text-sm text-gray-300 leading-relaxed">
                                        <span className={`flex-shrink-0 w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold mt-0.5 ${
                                          isWeakest ? 'bg-orange-500/15 border border-orange-500/25 text-orange-400'
                                          : 'bg-teal/15 border border-teal/25 text-teal'
                                        }`}>
                                          {ai + 1}
                                        </span>
                                        <span>{a}</span>
                                      </li>
                                    ))}
                                  </ol>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Next step + dynamic service recommendation */}
                <div className="rounded-3xl border border-teal/30 bg-teal/5 p-6 sm:p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-5 h-5 text-teal" />
                    <p className="text-xs font-bold text-teal uppercase tracking-wider">Your #1 next move</p>
                  </div>
                  <p className="text-white font-semibold text-base sm:text-lg leading-relaxed mb-4">
                    {result.nextStep}
                  </p>

                  {/* Dynamic service recommendation based on weakest dimension */}
                  <div className="rounded-xl bg-near-black/40 border border-teal/15 p-4 mb-5">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                      Recommended AP Digital service
                    </p>
                    <p className="text-sm text-white font-semibold mb-1">{serviceRec.label}</p>
                    <p className="text-xs text-gray-400 leading-relaxed">{serviceRec.pitch}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <Link
                      to={serviceRec.path}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-teal text-near-black font-bold text-sm hover:opacity-90 transition shadow-teal-lg"
                    >
                      Learn about {serviceRec.label} <ArrowRight className="w-4 h-4" />
                    </Link>
                    <a
                      href="https://calendly.com/apdigital-core/20min"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-teal/40 text-teal font-semibold text-sm hover:bg-teal/10 transition"
                    >
                      Book a free strategy call
                    </a>
                  </div>
                </div>

                {/* Grade summary card */}
                <div className="rounded-3xl border border-gray-800 bg-charcoal-light/60 p-6 sm:p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-5 h-5 text-gold" />
                    <p className="text-xs font-bold text-gold uppercase tracking-wider">Your scorecard</p>
                  </div>
                  <div className="space-y-2.5">
                    {sortedDimensions.map((d) => {
                      const grade = getGrade(d.score);
                      const isWeakest = d.dimension === result.weakest;
                      return (
                        <div key={d.dimension} className="flex items-center justify-between gap-3 py-2 border-b border-gray-800/60 last:border-0">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg border text-xs font-black flex-shrink-0 ${getGradeStyle(grade)}`}>
                              {grade}
                            </span>
                            <span className={`text-sm font-medium truncate ${isWeakest ? 'text-orange-300' : 'text-gray-300'}`}>
                              {d.label}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-sm font-bold text-white">{d.score}%</span>
                            <span className="text-[10px] text-gray-600">/ {d.benchmark}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-700/60 flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Overall</span>
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg border text-xs font-black ${getGradeStyle(overallGrade)}`}>
                        {overallGrade}
                      </span>
                      <span className="text-lg font-black text-white">{result.overall}%</span>
                    </div>
                  </div>

                  <a
                    href={STRIPE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl border border-gold/40 text-gold font-semibold text-sm hover:bg-gold/10 transition"
                  >
                    Get the $9 AI Playbook <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleCopyShare}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-900/60 text-gray-300 text-sm font-semibold hover:border-teal/40 hover:text-white transition"
                >
                  {copiedShare ? <Check className="w-4 h-4 text-teal" /> : <Share2 className="w-4 h-4" />}
                  {copiedShare ? 'Copied!' : 'Share my score'}
                </button>
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-900/60 text-gray-300 text-sm font-semibold hover:border-teal/40 hover:text-white transition"
                >
                  <Download className="w-4 h-4" /> Save as PDF
                </button>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-gray-400 text-sm font-semibold hover:text-gray-200 transition"
                >
                  <RotateCcw className="w-4 h-4" /> Retake the audit
                </button>
              </div>

              <p className="text-center text-xs text-gray-400 mt-6">
                {emailed
                  ? <>Report saved. A copy has been sent to {email}. </>
                  : <>Report saved. Use the Save as PDF button above to keep a copy. </>}
                Benchmarks sourced from AP Digital's client data and public industry reports.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MarketingAuditAI;
