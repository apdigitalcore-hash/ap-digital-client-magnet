import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

/* ─── Data ──────────────────────────────────────────────────── */

const QUESTIONS = [
  {
    category: 'Social Media',
    text: 'How consistent is your social media presence?',
    answers: [
      { letter: 'A', text: 'Never post', points: 25 },
      { letter: 'B', text: 'Post occasionally', points: 50 },
      { letter: 'C', text: 'Post weekly with a strategy', points: 75 },
      { letter: 'D', text: 'Daily content with strong engagement', points: 100 },
    ],
  },
  {
    category: 'Paid Ads',
    text: 'Are you running paid ads right now?',
    answers: [
      { letter: 'A', text: 'Never tried', points: 25 },
      { letter: 'B', text: 'Tried but lost money', points: 50 },
      { letter: 'C', text: 'Running but inconsistent results', points: 75 },
      { letter: 'D', text: 'Profitable campaigns running', points: 100 },
    ],
  },
  {
    category: 'SEO',
    text: 'How does your Google presence look?',
    answers: [
      { letter: 'A', text: 'Not on Google', points: 25 },
      { letter: 'B', text: 'Listed but no reviews', points: 50 },
      { letter: 'C', text: 'Some rankings + reviews', points: 75 },
      { letter: 'D', text: 'Page 1 for key terms', points: 100 },
    ],
  },
  {
    category: 'Website',
    text: 'How is your website performing?',
    answers: [
      { letter: 'A', text: 'No website', points: 25 },
      { letter: 'B', text: "Have one but it's old", points: 50 },
      { letter: 'C', text: 'Decent site, low conversions', points: 75 },
      { letter: 'D', text: 'High-converting, fast site', points: 100 },
    ],
  },
  {
    category: 'Content',
    text: 'How much content are you creating?',
    answers: [
      { letter: 'A', text: 'None', points: 25 },
      { letter: 'B', text: 'Occasional posts', points: 50 },
      { letter: 'C', text: 'Regular content, some traction', points: 75 },
      { letter: 'D', text: 'Viral content driving leads', points: 100 },
    ],
  },
];

const ANALYZE_MESSAGES = [
  'Scanning your marketing channels...',
  'Identifying growth gaps...',
  'Building your personalized report...',
];

const DIMENSION_LABELS = ['Social', 'Ads', 'SEO', 'Website', 'Content'];

const LEAK_MESSAGES: Record<string, string> = {
  Social: "Your biggest leak: Social Media — You're invisible where your customers scroll.",
  Ads: "Your biggest leak: Paid Ads — You're leaving money on the table every single day.",
  SEO: "Your biggest leak: SEO — Your competitors are getting found. You're not.",
  Website: "Your biggest leak: Website — People visit and leave. Your site isn't converting.",
  Content: "Your biggest leak: Content — No content = no trust = no clients.",
};

/* ─── SVG Radar Helpers ─────────────────────────────────────── */

const SVG_CENTER = 250;
const SVG_RADIUS = 180;
const LABEL_RADIUS = SVG_RADIUS + 28;
const LABEL_ANCHORS: Array<'middle' | 'start' | 'end'> = [
  'middle', 'start', 'start', 'end', 'end',
];

function axisPt(idx: number, r: number): [number, number] {
  const rad = ((-90 + idx * 72) * Math.PI) / 180;
  return [SVG_CENTER + r * Math.cos(rad), SVG_CENTER + r * Math.sin(rad)];
}

function ringPoints(frac: number): string {
  return [0, 1, 2, 3, 4]
    .map(i => axisPt(i, SVG_RADIUS * frac).map(n => n.toFixed(1)).join(','))
    .join(' ');
}

function buildScorePath(values: number[]): string {
  const pts = values.map((v, i) =>
    axisPt(i, (v / 100) * SVG_RADIUS).map(n => n.toFixed(1)).join(','),
  );
  return `M ${pts.join(' L ')} Z`;
}

/* ─── Component ─────────────────────────────────────────────── */

type Phase = 'quiz' | 'analyzing' | 'results';

const MarketingAuditAI = () => {
  const [phase, setPhase] = useState<Phase>('quiz');
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [pendingScores, setPendingScores] = useState<number[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [analyzeIdx, setAnalyzeIdx] = useState(0);

  useEffect(() => {
    if (phase !== 'analyzing') return;
    setAnalyzeIdx(0);

    const timers = ANALYZE_MESSAGES.map((_, i) =>
      window.setTimeout(() => setAnalyzeIdx(i), i * 650),
    );
    const done = window.setTimeout(() => {
      setScores(pendingScores);
      setPhase('results');
    }, 2000);

    return () => {
      timers.forEach(window.clearTimeout);
      window.clearTimeout(done);
    };
  }, [phase, pendingScores]);

  const handleAnswer = useCallback(
    (letter: string, points: number) => {
      if (selected) return;
      setSelected(letter);
      const next = [...pendingScores, points];

      window.setTimeout(() => {
        if (currentQ < QUESTIONS.length - 1) {
          setPendingScores(next);
          setCurrentQ(q => q + 1);
          setSelected(null);
        } else {
          setPendingScores(next);
          setPhase('analyzing');
        }
      }, 300);
    },
    [selected, pendingScores, currentQ],
  );

  const handleReset = () => {
    setPhase('quiz');
    setCurrentQ(0);
    setScores([]);
    setPendingScores([]);
    setSelected(null);
    setAnalyzeIdx(0);
  };

  const avg = scores.length
    ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    : 0;
  const lowestIdx = scores.length ? scores.indexOf(Math.min(...scores)) : 0;
  const lowestDim = DIMENSION_LABELS[lowestIdx];

  const q = QUESTIONS[currentQ];
  const progressPct = ((currentQ + 1) / QUESTIONS.length) * 100;

  return (
    <section className="relative py-20 md:py-28 bg-near-black overflow-hidden">
      {/* Radial teal glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-teal/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 border border-teal/20 text-teal">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-semibold uppercase tracking-wider">
              ⚡ Free Marketing Audit
            </span>
          </div>
        </div>

        {/* Section heading */}
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
            Discover Your Marketing{' '}
            <span className="text-gradient">Health Score</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
            Answer 5 quick questions. Get your personalized audit in 60 seconds.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {/* ── QUIZ ── */}
          {phase === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="max-w-2xl mx-auto"
            >
              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>Question {currentQ + 1} of {QUESTIONS.length}</span>
                  <span>{q.category}</span>
                </div>
                <div className="h-1.5 rounded-full bg-gray-800 overflow-hidden">
                  <motion.div
                    className="h-1.5 rounded-full bg-teal"
                    animate={{ width: `${progressPct}%` }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                </div>
              </div>

              {/* Question slide */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQ}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -50, opacity: 0 }}
                  transition={{ duration: 0.22, ease: 'easeInOut' }}
                >
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-6 text-center leading-snug px-2">
                    {q.text}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {q.answers.map(({ letter, text, points }) => {
                      const isSelected = selected === letter;
                      return (
                        <button
                          key={letter}
                          onClick={() => handleAnswer(letter, points)}
                          disabled={!!selected}
                          className={[
                            'group flex items-start gap-4 p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer',
                            isSelected
                              ? 'border-teal bg-teal/10'
                              : 'border-gray-800 bg-charcoal hover:border-teal/50 hover:bg-teal/5',
                            selected && !isSelected ? 'opacity-40 cursor-not-allowed' : '',
                          ].join(' ')}
                        >
                          <span
                            className={[
                              'flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-colors',
                              isSelected
                                ? 'bg-teal text-near-black'
                                : 'bg-gray-800 text-gray-400 group-hover:bg-teal/20 group-hover:text-teal',
                            ].join(' ')}
                          >
                            {letter}
                          </span>
                          <span
                            className={`text-sm sm:text-base leading-snug pt-0.5 ${
                              isSelected ? 'text-white' : 'text-gray-300'
                            }`}
                          >
                            {text}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}

          {/* ── ANALYZING ── */}
          {phase === 'analyzing' && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col items-center justify-center py-20 gap-8"
            >
              <div className="relative w-20 h-20">
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-teal/20 border-t-teal"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-4 h-4 rounded-full bg-teal"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.p
                  key={analyzeIdx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28 }}
                  className="text-gray-300 text-lg font-medium text-center"
                >
                  {ANALYZE_MESSAGES[analyzeIdx]}
                </motion.p>
              </AnimatePresence>
            </motion.div>
          )}

          {/* ── RESULTS ── */}
          {phase === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
            >
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

                {/* Left: Radar Chart */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.55, delay: 0.1 }}
                  className="w-full max-w-sm mx-auto lg:max-w-none"
                >
                  <svg viewBox="0 0 500 500" className="w-full" aria-hidden="true">
                    {/* Background rings */}
                    {[0.25, 0.5, 0.75, 1].map(f => (
                      <polygon
                        key={f}
                        points={ringPoints(f)}
                        fill="none"
                        stroke="#1f2937"
                        strokeWidth={f === 1 ? 1.5 : 1}
                      />
                    ))}

                    {/* Axis lines */}
                    {[0, 1, 2, 3, 4].map(i => {
                      const [x, y] = axisPt(i, SVG_RADIUS);
                      return (
                        <line
                          key={i}
                          x1={SVG_CENTER}
                          y1={SVG_CENTER}
                          x2={x}
                          y2={y}
                          stroke="#374151"
                          strokeWidth={1}
                        />
                      );
                    })}

                    {/* Score polygon — animated pathLength */}
                    <motion.path
                      d={buildScorePath(scores)}
                      className="stroke-teal fill-teal"
                      strokeWidth={2.5}
                      strokeLinejoin="round"
                      fillOpacity={0}
                      initial={{ pathLength: 0, fillOpacity: 0 }}
                      animate={{ pathLength: 1, fillOpacity: 0.25 }}
                      transition={{
                        pathLength: { duration: 1.5, ease: 'easeInOut' },
                        fillOpacity: { duration: 0.6, delay: 1.0 },
                      }}
                    />

                    {/* Score vertex dots */}
                    {scores.map((score, i) => {
                      const [cx, cy] = axisPt(i, (score / 100) * SVG_RADIUS);
                      return (
                        <motion.circle
                          key={i}
                          cx={cx}
                          cy={cy}
                          r={5}
                          className="fill-teal"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.2 + i * 0.08 }}
                        />
                      );
                    })}

                    {/* Axis labels */}
                    {DIMENSION_LABELS.map((label, i) => {
                      const [lx, ly] = axisPt(i, LABEL_RADIUS);
                      return (
                        <text
                          key={label}
                          x={lx}
                          y={ly}
                          className="fill-teal"
                          fontSize="13"
                          fontWeight="600"
                          fontFamily="Plus Jakarta Sans, Inter, system-ui, sans-serif"
                          textAnchor={LABEL_ANCHORS[i]}
                          dominantBaseline={i === 0 ? 'auto' : 'middle'}
                        >
                          {label}
                        </text>
                      );
                    })}
                  </svg>
                </motion.div>

                {/* Right: Score + Bars + CTA */}
                <div className="space-y-5">
                  {/* Overall score */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="text-gray-500 text-xs font-semibold uppercase tracking-widest mb-1">
                      Your Marketing Health Score
                    </p>
                    <div className="font-display text-6xl sm:text-7xl font-bold text-teal leading-none">
                      {avg}%
                    </div>
                  </motion.div>

                  {/* Progress bars per dimension */}
                  <motion.div
                    className="space-y-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {DIMENSION_LABELS.map((label, i) => {
                      const score = scores[i];
                      const isLowest = i === lowestIdx;
                      return (
                        <div key={label}>
                          <div className="flex justify-between mb-1.5">
                            <span
                              className={`text-sm font-semibold ${
                                isLowest ? 'text-orange-400' : 'text-gray-300'
                              }`}
                            >
                              {label}
                            </span>
                            <span
                              className={`text-sm font-bold ${
                                isLowest ? 'text-orange-400' : 'text-teal'
                              }`}
                            >
                              {score}%
                            </span>
                          </div>
                          <div className="h-2 rounded-full bg-gray-800 overflow-hidden">
                            <motion.div
                              className={`h-2 rounded-full ${
                                isLowest ? 'bg-orange-400' : 'bg-teal'
                              }`}
                              initial={{ width: 0 }}
                              animate={{ width: `${score}%` }}
                              transition={{
                                duration: 0.8,
                                delay: 0.4 + i * 0.1,
                                ease: 'easeOut',
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </motion.div>

                  {/* Biggest leak */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20"
                  >
                    <p className="text-orange-300 font-semibold text-sm sm:text-base leading-snug">
                      {LEAK_MESSAGES[lowestDim]}
                    </p>
                  </motion.div>

                  {/* CTA card */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                    className="p-5 sm:p-6 rounded-2xl border border-teal/30 bg-charcoal"
                  >
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
                      Fix Your{' '}
                      <span className="text-teal">{lowestDim}</span>{' '}
                      in 7 Days
                    </h3>
                    <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                      The $9 AI Employee Playbook shows you exactly how to plug this gap — step by step.
                    </p>
                    <div className="flex flex-col gap-3">
                      <a
                        href="https://buy.stripe.com/aFa5kF5R27g1flhg2o8EM03"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full text-center px-6 py-3 rounded-xl bg-teal text-near-black font-bold text-sm sm:text-base hover:opacity-90 transition-opacity"
                      >
                        Get the $9 Playbook →
                      </a>
                      <Link
                        to="/contact"
                        className="w-full text-center px-6 py-3 rounded-xl border border-teal/40 text-teal font-semibold text-sm sm:text-base hover:bg-teal/10 transition-colors"
                      >
                        Book a Free Audit Call
                      </Link>
                      <button
                        onClick={handleReset}
                        className="w-full text-center px-4 py-2 text-gray-500 text-sm hover:text-gray-300 transition-colors"
                      >
                        Retake the audit
                      </button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MarketingAuditAI;
