import { useState } from 'react';
import { ArrowRight, Zap, Star, Download, Check, Copy, CheckCheck, Clock, TrendingDown, Calculator } from 'lucide-react';
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

// ── Lead Magnet 1: Free Prompts ───────────────────────────────────────────────
const FREE_PROMPTS = [
  {
    id: 'cold-email',
    label: 'Cold Email',
    icon: '✉️',
    hoursSaved: '3 hrs/week',
    prompt: `You are an elite B2B cold email copywriter. Write a 4-sentence cold email for:

Product/Service: [YOUR OFFER]
Target: [JOB TITLE] at [COMPANY TYPE]
Their #1 pain: [PAIN POINT]
Proof: [ONE RESULT OR METRIC]

Rules: No fluff. No "I hope this finds you well." Lead with their pain. End with one soft CTA. Max 80 words.`,
    output: `Subject: {First name} — losing leads to follow-up gaps?

Most {job title}s I talk to are leaving 30–40% of warm leads on the table because follow-up dies after day 3.

We built a 7-touch sequence that brought {client} from 4% to 19% reply rates in 6 weeks — using only Claude and a spreadsheet.

Worth a 15-min call this week?`,
  },
  {
    id: 'sales-hook',
    label: 'Sales Page Hook',
    icon: '🎯',
    hoursSaved: '5 hrs/page',
    prompt: `You are a direct-response copywriter trained on Gary Halbert and Eugene Schwartz. Write the opening 3 lines of a sales page for:

Product: [PRODUCT NAME]
Buyer: [WHO THEY ARE]
Core desire: [WHAT THEY WANT]
Hidden fear: [WHAT THEY'RE AFRAID OF]

Format: One bold headline. One sub-headline. One opening sentence that opens a loop. No jargon.`,
    output: `**You're not bad at marketing. You're using the wrong prompts.**

Most business owners are one system away from $10K months — they just don't know which prompts to copy-paste.

Here's what changes when your AI actually knows your business...`,
  },
  {
    id: 'content-cal',
    label: 'Content Calendar',
    icon: '📅',
    hoursSaved: '4 hrs/week',
    prompt: `You are a social media strategist. Create a 7-day content calendar for:

Brand: [YOUR BRAND]
Niche: [YOUR NICHE]
Platform: [PLATFORM]
Goal: [AWARENESS / LEADS / SALES]
Tone: [TONE — e.g. bold, educational, conversational]

For each day provide: Day, Content type, Hook (first line), Core message, CTA. Keep hooks under 10 words.`,
    output: `Day 1 | Carousel | "5 things killing your conversion rate" | Common mistakes + fixes | Save this
Day 2 | Reel | "I made $4K in one week using this" | Behind the scenes of one campaign | Comment "system"
Day 3 | Story Poll | "Which is harder: getting leads or closing them?" | Audience engagement | DM me your answer
Day 4 | Quote graphic | "Your offer isn't the problem. Your positioning is." | Mindset shift | Follow for more
Day 5 | Thread | "Here's the exact email that got a 34% reply rate" | Full email breakdown | Repost if helpful
Day 6 | Talking head | "Stop doing this in your DMs" | DM sales mistake + fix | Link in bio
Day 7 | Testimonial | Real client result screenshot | Social proof | Book a call`,
  },
  {
    id: 'objection',
    label: 'Objection Handler',
    icon: '🛡️',
    hoursSaved: '2 hrs/week',
    prompt: `You are a sales coach specializing in objection handling. Write 3 responses to this objection:

Objection: "[OBJECTION — e.g. I need to think about it]"
Product: [YOUR PRODUCT/SERVICE]
Price: [PRICE POINT]
Buyer type: [WHO THEY ARE]

For each response: Name the technique, write the script (under 50 words), explain why it works.`,
    output: `**Objection: "It's too expensive."**

**1. Feel-Felt-Found:** "I totally get that — a lot of our clients felt the same way. What they found was the first campaign paid for the investment within 30 days."

**2. Cost of inaction:** "What's it costing you right now to not have this solved? If it's stealing 10 hours a week, that's $[X] a month already gone."

**3. Reframe the unit:** "It's not $997. It's $33/day to have a full marketing system running. What do you spend on coffee?"`,
  },
  {
    id: 'seo',
    label: 'SEO Blog Outline',
    icon: '🔍',
    hoursSaved: '6 hrs/post',
    prompt: `You are an SEO content strategist. Create a complete blog post outline optimized to rank for:

Target keyword: [KEYWORD]
Search intent: [INFORMATIONAL / COMMERCIAL / TRANSACTIONAL]
Business: [YOUR BUSINESS TYPE]
Competitor to outrank: [COMPETITOR URL — optional]

Deliver: Title tag (60 chars), meta description (155 chars), H1, 6 H2s with bullet sub-points, internal link suggestions, CTA placement.`,
    output: `**Title:** How to Get More Clients as a Marketing Agency in 2025 (Without Cold Calling)

**Meta:** Struggling to grow your agency client roster? Here are 7 proven strategies top agencies use to book 10+ discovery calls a month — no cold calls required.

**H1:** 7 Ways to Get More Agency Clients in 2025

**H2s:**
1. Why most agencies plateau at 5–10 clients (and how to break through)
2. The referral engine: turning one client into three
3. LinkedIn content that attracts inbound (exact posting cadence)
4. Niche positioning: how going narrow 3x'd our close rate
5. The 15-minute proposal that wins deals on the first call
6. Retargeting your website visitors into booked calls

**CTA placement:** After H2 #4 (highest intent moment) + end of post`,
  },
];

// ── Lead Magnet 2: Calculator config ─────────────────────────────────────────
const SLIDER_CONFIG = [
  { key: 'writing' as const, label: 'Writing & Content', icon: '✍️', desc: 'emails, blogs, social, scripts' },
  { key: 'sales' as const, label: 'Sales & Outreach', icon: '📞', desc: 'proposals, follow-ups, DMs' },
  { key: 'ops' as const, label: 'Ops & Admin', icon: '⚙️', desc: 'SOPs, reports, onboarding' },
];

// ── Animation variants ────────────────────────────────────────────────────────
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

// ── Sub-component: Free Prompts ───────────────────────────────────────────────
const FreePrompts = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const active = FREE_PROMPTS[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(active.prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <motion.div
      variants={itemVariants}
      className="relative rounded-3xl border border-gray-800 bg-charcoal-light/60 backdrop-blur-sm overflow-hidden hover:border-teal/30 transition-colors duration-500"
    >
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-teal/60 to-transparent" />

      <div className="p-8 md:p-12">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal/10 border border-teal/20 text-teal text-xs font-bold uppercase tracking-wider mb-3">
              <Zap className="w-3 h-3" />
              Free — No Email Required
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white leading-tight">
              5 Prompts, <span className="text-gradient">On Us</span>
            </h3>
            <p className="text-gray-400 text-sm mt-2 max-w-lg">
              Real, fully-engineered prompts from the playbook. Copy, paste into Claude, get results.
              No catch — just a taste of what 50 more can do.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {FREE_PROMPTS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => { setActiveTab(i); setCopied(false); }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === i
                  ? 'bg-teal text-near-black shadow-teal-lg'
                  : 'bg-gray-800/60 text-gray-400 hover:text-white hover:bg-gray-700/60 border border-gray-700/60'
              }`}
            >
              <span>{p.icon}</span>
              {p.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Prompt */}
          <div className="rounded-2xl border border-gray-700/60 bg-gray-900/60 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700/60">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-300">Prompt</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-teal/10 border border-teal/20 text-teal text-xs font-bold">
                  <Clock className="w-3 h-3" />
                  Saves {active.hoursSaved}
                </span>
              </div>
              <button
                onClick={handleCopy}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                  copied
                    ? 'bg-teal/20 text-teal border border-teal/30'
                    : 'bg-gray-800 text-gray-400 border border-gray-700 hover:text-white hover:border-gray-600'
                }`}
              >
                {copied ? (
                  <><CheckCheck className="w-3.5 h-3.5" /> Copied!</>
                ) : (
                  <><Copy className="w-3.5 h-3.5" /> Copy Prompt</>
                )}
              </button>
            </div>
            <pre className="p-4 text-xs text-gray-300 leading-relaxed whitespace-pre-wrap font-mono overflow-auto max-h-64">
              {active.prompt}
            </pre>
          </div>

          {/* Sample output */}
          <div className="rounded-2xl border border-gray-700/60 bg-gray-900/60 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-700/60">
              <span className="text-sm font-semibold text-gray-300">Sample Output</span>
              <span className="text-xs text-gray-500">(real Claude result)</span>
            </div>
            <div className="p-4 text-xs text-gray-300 leading-relaxed overflow-auto max-h-64 whitespace-pre-wrap">
              {active.output}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-5 rounded-2xl bg-teal/5 border border-teal/15">
          <div>
            <p className="text-white font-semibold text-sm">
              These are 5 of the 50 prompts inside the playbook.
            </p>
            <p className="text-gray-400 text-xs mt-0.5">
              The other 45 cover sales, content, ops, research & customer support — all $9 one-time.
            </p>
          </div>
          <Button variant="hero" size="default" asChild className="flex-shrink-0 shadow-teal-lg">
            <a href={AI_EMPLOYEE_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              Get All 50 — $9
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

// ── Sub-component: Time Drain Calculator ─────────────────────────────────────
const TimeCalculator = () => {
  const [hours, setHours] = useState({ writing: 8, sales: 6, ops: 4 });
  const [rate, setRate] = useState(75);

  const totalHours = hours.writing + hours.sales + hours.ops;
  const monthlyHours = totalHours * 4.33;
  const monthlyCost = Math.round(monthlyHours * rate);
  const annualCost = monthlyCost * 12;
  const savedCost = Math.round(monthlyCost * 0.8);

  const updateHours = (key: keyof typeof hours, val: number) =>
    setHours((prev) => ({ ...prev, [key]: val }));

  return (
    <motion.div
      variants={itemVariants}
      className="relative rounded-3xl border border-gray-800 bg-charcoal-light/60 backdrop-blur-sm overflow-hidden hover:border-teal/30 transition-colors duration-500"
    >
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-teal/60 to-transparent" />

      <div className="p-8 md:p-12">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal/10 border border-teal/20 text-teal text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-3 h-3" />
            Free Tool
          </div>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-white leading-tight">
            AI Time Drain <span className="text-gradient">Calculator</span>
          </h3>
          <p className="text-gray-400 text-sm mt-2 max-w-lg">
            See exactly how much money you're losing every month doing tasks Claude can handle in minutes.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left: Sliders */}
          <div className="space-y-6">
            {/* Hourly rate */}
            <div className="rounded-2xl border border-gray-700/60 bg-gray-900/40 p-5">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold text-gray-300">Your hourly rate (or value)</label>
                <span className="text-teal font-bold text-sm">${rate}/hr</span>
              </div>
              <input
                type="range"
                min={25}
                max={500}
                step={5}
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-teal"
              />
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>$25</span><span>$500</span>
              </div>
            </div>

            {/* Task sliders */}
            {SLIDER_CONFIG.map(({ key, label, icon, desc }) => (
              <div key={key} className="rounded-2xl border border-gray-700/60 bg-gray-900/40 p-5">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm font-semibold text-gray-300 flex items-center gap-1.5">
                    <span>{icon}</span> {label}
                  </label>
                  <span className="text-teal font-bold text-sm">{hours[key]} hrs/wk</span>
                </div>
                <p className="text-xs text-gray-500 mb-3">{desc}</p>
                <input
                  type="range"
                  min={0}
                  max={20}
                  step={1}
                  value={hours[key]}
                  onChange={(e) => updateHours(key, Number(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-teal"
                />
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>0 hrs</span><span>20 hrs</span>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Results */}
          <div className="space-y-4">
            {/* Summary stats */}
            <div className="rounded-2xl border border-gray-700/80 bg-gray-900/60 p-6 space-y-4">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Your numbers</p>

              <div className="flex items-center justify-between py-3 border-b border-gray-800">
                <span className="text-sm text-gray-400">Hours burned / week</span>
                <span className="text-white font-bold">{totalHours} hrs</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-800">
                <span className="text-sm text-gray-400">Hours burned / month</span>
                <span className="text-white font-bold">{Math.round(monthlyHours)} hrs</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-800">
                <span className="text-sm text-gray-400">Monthly value lost</span>
                <span className="text-red-400 font-bold text-lg">${monthlyCost.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-sm text-gray-400">Annual bleed</span>
                <span className="text-red-400 font-black text-2xl">${annualCost.toLocaleString()}</span>
              </div>
            </div>

            {/* The fix */}
            <div className="rounded-2xl border border-teal/25 bg-teal/5 p-6">
              <div className="flex items-center gap-2 mb-3">
                <TrendingDown className="w-4 h-4 text-teal" />
                <p className="text-xs font-bold text-teal uppercase tracking-wider">With 50 Claude prompts</p>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                Our buyers report cutting these tasks by <span className="text-white font-bold">80%</span>. At your numbers, that's{' '}
                <span className="text-teal font-bold">${savedCost.toLocaleString()}/month</span> back in your pocket — or redirected to work that actually grows revenue.
              </p>

              <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-gray-900/60 border border-gray-700/60 mb-4">
                <span className="text-gray-400 text-sm">Cost of the solution</span>
                <span className="text-white font-black text-xl">$9</span>
              </div>

              <Button variant="hero" size="lg" asChild className="w-full shadow-teal-lg">
                <a href={AI_EMPLOYEE_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                  Stop the bleed — Get the $9 Playbook
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>

              <p className="text-center text-xs text-gray-600 mt-3">
                One-time · Works with free Claude · 30-day guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ── Main Section ──────────────────────────────────────────────────────────────
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

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="max-w-5xl mx-auto space-y-8"
        >
          {/* ── Product Card ── */}
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

          {/* ── Lead Magnet 1: 5 Prompts, On Us ── */}
          <FreePrompts />

          {/* ── Lead Magnet 2: AI Time Drain Calculator ── */}
          <TimeCalculator />

        </motion.div>

      </div>

      {/* Decorative bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal/20 to-transparent" />
    </section>
  );
};

export default DigitalArsenal;
