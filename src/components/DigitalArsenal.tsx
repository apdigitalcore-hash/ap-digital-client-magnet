import { useState, useMemo, useCallback } from 'react';
import {
  ArrowRight, Zap, Download, Check, Copy, CheckCheck, Clock, TrendingDown,
  Calculator, Play, Shield, Sparkles, ChevronDown, Wand2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion';

/* ────────────────────────────────────────────────────────────────────────────
 * Config
 * ────────────────────────────────────────────────────────────────────────── */

const AI_EMPLOYEE_URL = 'https://buy.stripe.com/aFa5kF5R27g1flhg2o8EM03';

/* ────────────────────────────────────────────────────────────────────────────
 * Product data
 * ────────────────────────────────────────────────────────────────────────── */

const CATEGORIES = [
  { icon: '📢', name: 'Marketing', count: 10, example: 'Landing page headlines, ad copy, email campaigns' },
  { icon: '💼', name: 'Sales',     count: 8,  example: 'Cold outreach, objection handling, proposals' },
  { icon: '✍️', name: 'Content',   count: 8,  example: 'Blog posts, video scripts, newsletters' },
  { icon: '📱', name: 'Social',    count: 6,  example: 'Content calendars, captions, thread hooks' },
  { icon: '⚙️', name: 'Ops',       count: 7,  example: 'SOPs, onboarding docs, client invoices' },
  { icon: '🔎', name: 'Research',  count: 5,  example: 'Niche analysis, competitor teardowns, trends' },
  { icon: '💬', name: 'Customer',  count: 6,  example: 'Support replies, testimonial requests, FAQs' },
] as const;

const BONUSES = [
  '100 Viral Hooks Swipe File',
  '50 Call-to-Action Templates',
  '25 Irresistible Offer Ideas',
  '20 Lead Magnet Blueprints',
] as const;

const TRUST_POINTS = [
  { icon: Zap,      label: 'Works with the free Claude plan — no paid AI subscription needed.' },
  { icon: Download, label: 'Delivered instantly as a clean PDF + Notion workspace.' },
  { icon: Shield,   label: '30-day money-back guarantee. One email, no questions.' },
  { icon: Sparkles, label: 'Lifetime updates. New prompts added monthly, at no extra cost.' },
] as const;

/* ────────────────────────────────────────────────────────────────────────────
 * Free sample prompts (expanded to 6, with better variety)
 * ────────────────────────────────────────────────────────────────────────── */

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

We built a 7-touch sequence that took {client} from 4% to 19% reply rates in 6 weeks — using only Claude and a spreadsheet.

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
Day 2 | Reel    | "I made $4K in one week using this" | Behind the scenes of one campaign | Comment "system"
Day 3 | Poll    | "Which is harder: getting leads or closing them?" | Audience engagement | DM me your answer
Day 4 | Quote   | "Your offer isn't the problem. Your positioning is." | Mindset shift | Follow for more
Day 5 | Thread  | "Here's the exact email that got a 34% reply rate" | Full email breakdown | Repost if helpful
Day 6 | Talking | "Stop doing this in your DMs" | DM sales mistake + fix | Link in bio
Day 7 | Review  | Client screenshot with result | Social proof | Book a call`,
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
4. Niche positioning: how going narrow 3×'d our close rate
5. The 15-minute proposal that wins deals on the first call
6. Retargeting your website visitors into booked calls

**CTA placement:** After H2 #4 (highest-intent moment) + end of post`,
  },
  {
    id: 'review',
    label: 'Review Request',
    icon: '⭐',
    hoursSaved: '1 hr/week',
    prompt: `You are a customer success specialist. Write a 3-message SMS sequence to collect a Google review from a happy client:

Business: [YOUR BUSINESS]
Service they received: [SERVICE]
Time since service: [HOURS / DAYS]
Client first name: [NAME]

Rules: Friendly but direct. Mention the service. Include the direct review link. Max 280 chars per message. Space messages 2 days apart if no response.`,
    output: `**Day 0:** Hey {name}! It's {your name} from {business}. Hope the {service} is working great. Quick favor — would you mind leaving a quick Google review? Takes 30 seconds and it means the world for small businesses like ours: {link} 🙏

**Day 2:** Hey {name} — totally get life gets busy. Here's the review link again if you have 30 sec: {link}. Even one line helps a ton.

**Day 4:** No worries if not! Let me know if I can help with anything else. If you'd prefer to leave feedback privately instead, just reply here — I'm all ears.`,
  },
] as const;

/* ────────────────────────────────────────────────────────────────────────────
 * Live playground — fills a template with user's business context
 * ────────────────────────────────────────────────────────────────────────── */

function buildPersonalizedPrompt(business: string, outcome: string, audience: string): string {
  const biz = business.trim() || '[your business]';
  const goal = outcome.trim() || '[your core outcome]';
  const aud = audience.trim() || '[your ideal customer]';

  return `You are ${biz}'s senior marketing strategist. I need a week of high-converting content.

Context:
• Business: ${biz}
• Ideal customer: ${aud}
• Primary outcome I help them achieve: ${goal}

Deliver a 7-day content plan with:
1. One hook per day (under 10 words, specific to ${aud})
2. A 3-beat content body (pain → story → resolution)
3. One CTA per day that escalates from free value → booked call
4. A "don't post this" list of 3 clichés to avoid in the ${goal} space

Format as a clean table. No fluff. Be opinionated.`;
}

/* ────────────────────────────────────────────────────────────────────────────
 * FAQ
 * ────────────────────────────────────────────────────────────────────────── */

const FAQS = [
  {
    q: "Do I need a paid ChatGPT or Claude subscription?",
    a: "No. Every prompt is tested on the free Claude plan. If you already have a paid AI plan, they'll run faster — but the outputs are the same.",
  },
  {
    q: "Isn't $9 suspiciously cheap? What's the catch?",
    a: "No catch. It's priced to be a no-brainer so business owners actually use it instead of letting it sit in a folder. AP Digital runs a full-service agency — the playbook is a way to earn trust with people who aren't ready to hire an agency yet.",
  },
  {
    q: "How is this different from the hundreds of prompt packs already online?",
    a: "Most prompt packs are one-liners you still have to figure out how to use. Ours are fully-engineered: role, context, constraints, output format. They produce deliverables, not vague suggestions. They're also built for service businesses — not generic corporate use.",
  },
  {
    q: "What if the prompts don't work for my business?",
    a: "Reply to the receipt email within 30 days and you'll get a full refund. No forms, no survey. We'd rather refund someone than keep $9 they didn't find useful.",
  },
  {
    q: "Will this replace an actual marketing agency?",
    a: "No — and we won't pretend it does. It replaces the hours you'd spend staring at a blank page writing copy yourself. If you need strategy, paid ads, and execution, that's what AP Digital's agency services are for.",
  },
  {
    q: "How often is the playbook updated?",
    a: "We add new prompts roughly once a month, based on what's working in our live client campaigns. You get all updates for free, forever.",
  },
] as const;

/* ────────────────────────────────────────────────────────────────────────────
 * Animation variants
 * ────────────────────────────────────────────────────────────────────────── */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

/* ────────────────────────────────────────────────────────────────────────────
 * Sub-component: Prompt Playground (live templater)
 * ────────────────────────────────────────────────────────────────────────── */

const PromptPlayground = () => {
  const [business, setBusiness] = useState('');
  const [outcome, setOutcome] = useState('');
  const [audience, setAudience] = useState('');
  const [copied, setCopied] = useState(false);

  const personalizedPrompt = useMemo(
    () => buildPersonalizedPrompt(business, outcome, audience),
    [business, outcome, audience]
  );

  const isFilled = business.trim() && outcome.trim() && audience.trim();

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(personalizedPrompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  }, [personalizedPrompt]);

  return (
    <motion.div
      variants={itemVariants}
      className="relative rounded-3xl border border-gray-800 bg-charcoal-light/60 backdrop-blur-sm overflow-hidden hover:border-teal/30 transition-colors duration-500"
    >
      <div aria-hidden className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      <div className="p-5 sm:p-8 md:p-12">
        <div className="mb-7">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-bold uppercase tracking-wider mb-3">
            <Wand2 className="w-3 h-3" />
            Try it live · No signup
          </div>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-white leading-tight">
            Type your business. <span className="text-gradient">Watch a prompt become yours.</span>
          </h3>
          <p className="text-gray-400 text-sm mt-2 max-w-xl">
            This is one of the 50 prompts from the playbook, personalized to you in real-time. Fill the fields, copy the prompt, paste into Claude. Done.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          <div className="space-y-4">
            <div>
              <label htmlFor="pp-business" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                Your business
              </label>
              <input
                id="pp-business"
                type="text"
                value={business}
                onChange={(e) => setBusiness(e.target.value.slice(0, 100))}
                placeholder="Northshore Plumbing"
                className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-600 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30 transition"
              />
            </div>
            <div>
              <label htmlFor="pp-outcome" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                The outcome you deliver
              </label>
              <input
                id="pp-outcome"
                type="text"
                value={outcome}
                onChange={(e) => setOutcome(e.target.value.slice(0, 100))}
                placeholder="emergency plumbing fixes in under 2 hours"
                className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-600 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30 transition"
              />
            </div>
            <div>
              <label htmlFor="pp-audience" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                Your ideal customer
              </label>
              <input
                id="pp-audience"
                type="text"
                value={audience}
                onChange={(e) => setAudience(e.target.value.slice(0, 100))}
                placeholder="homeowners in North Vancouver, 35-65"
                className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-600 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30 transition"
              />
            </div>
            {!isFilled && (
              <p className="text-xs text-gray-400 pt-1">
                Fill all three to unlock the copy button. Works instantly — no signup, no email.
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-gray-700/60 bg-gray-900/60 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700/60">
              <span className="text-sm font-semibold text-gray-300">Your personalized prompt</span>
              <button
                onClick={handleCopy}
                disabled={!isFilled}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  copied
                    ? 'bg-teal/20 text-teal border border-teal/30'
                    : isFilled
                    ? 'bg-teal text-near-black hover:opacity-90'
                    : 'bg-gray-800 text-gray-400 border border-gray-700 cursor-not-allowed'
                }`}
              >
                {copied ? (
                  <><CheckCheck className="w-3.5 h-3.5" /> Copied!</>
                ) : (
                  <><Copy className="w-3.5 h-3.5" /> Copy prompt</>
                )}
              </button>
            </div>
            <pre className="p-4 text-xs text-gray-300 leading-relaxed whitespace-pre-wrap font-mono overflow-auto flex-1 max-h-[360px]">
              {personalizedPrompt}
            </pre>
          </div>
        </div>

        <div className="mt-7 flex flex-col sm:flex-row items-start sm:items-center gap-3 px-4 sm:px-5 py-4 rounded-2xl bg-gold/5 border border-gold/15">
          <div className="flex-1">
            <p className="text-white font-semibold text-sm">This is 1 of 50 prompts in the playbook.</p>
            <p className="text-gray-400 text-xs mt-0.5">The other 49 cover every major workflow — sales, content, ops, research. All $9 one-time.</p>
          </div>
          <Button variant="hero" size="default" asChild className="w-full sm:w-auto shadow-teal-lg">
            <a href={AI_EMPLOYEE_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
              See all 50 — $9 <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

/* ────────────────────────────────────────────────────────────────────────────
 * Sub-component: Free Prompts Library
 * ────────────────────────────────────────────────────────────────────────── */

const FreePrompts = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const active = FREE_PROMPTS[activeTab];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(active.prompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setActiveTab((i) => (i + 1) % FREE_PROMPTS.length);
      setCopied(false);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setActiveTab((i) => (i - 1 + FREE_PROMPTS.length) % FREE_PROMPTS.length);
      setCopied(false);
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      className="relative rounded-3xl border border-gray-800 bg-charcoal-light/60 backdrop-blur-sm overflow-hidden hover:border-teal/30 transition-colors duration-500"
    >
      <div aria-hidden className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-teal/60 to-transparent" />

      <div className="p-5 sm:p-8 md:p-12">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-7">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal/10 border border-teal/20 text-teal text-xs font-bold uppercase tracking-wider mb-3">
              <Zap className="w-3 h-3" />
              6 Free Prompts · No Email Required
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white leading-tight">
              Real Prompts. <span className="text-gradient">On Us.</span>
            </h3>
            <p className="text-gray-400 text-sm mt-2 max-w-lg">
              Fully-engineered prompts from the playbook. Copy, paste into Claude, get deliverables.
              No signup. No catch. Just a taste of what the other 44 can do.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Free prompt library"
          onKeyDown={handleKeyDown}
          tabIndex={0}
          className="flex flex-wrap gap-2 mb-6 focus:outline-none focus:ring-2 focus:ring-teal/30 rounded-xl p-1 -m-1"
        >
          {FREE_PROMPTS.map((p, i) => {
            const active = activeTab === i;
            return (
              <button
                key={p.id}
                role="tab"
                aria-selected={active}
                aria-controls={`panel-${p.id}`}
                id={`tab-${p.id}`}
                onClick={() => { setActiveTab(i); setCopied(false); }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  active
                    ? 'bg-teal text-near-black shadow-teal-lg'
                    : 'bg-gray-800/60 text-gray-400 hover:text-white hover:bg-gray-700/60 border border-gray-700/60'
                }`}
              >
                <span aria-hidden>{p.icon}</span>
                {p.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div
          id={`panel-${active.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${active.id}`}
          className="grid md:grid-cols-2 gap-5"
        >
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
                aria-label={copied ? 'Copied!' : 'Copy prompt'}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                  copied
                    ? 'bg-teal/20 text-teal border border-teal/30'
                    : 'bg-gray-800 text-gray-400 border border-gray-700 hover:text-white hover:border-gray-600'
                }`}
              >
                {copied ? (
                  <><CheckCheck className="w-3.5 h-3.5" /> Copied!</>
                ) : (
                  <><Copy className="w-3.5 h-3.5" /> Copy</>
                )}
              </button>
            </div>
            <pre className="p-4 text-xs text-gray-300 leading-relaxed whitespace-pre-wrap font-mono overflow-auto max-h-72">
              {active.prompt}
            </pre>
          </div>

          <div className="rounded-2xl border border-gray-700/60 bg-gray-900/60 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-700/60">
              <span className="text-sm font-semibold text-gray-300">Sample Output</span>
              <span className="text-xs text-gray-400">(real Claude result)</span>
            </div>
            <div className="p-4 text-xs text-gray-300 leading-relaxed overflow-auto max-h-72 whitespace-pre-wrap">
              {active.output}
            </div>
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-4 px-4 sm:px-6 py-5 rounded-2xl bg-teal/5 border border-teal/15">
          <div>
            <p className="text-white font-semibold text-sm">
              These are 6 of the 50 prompts inside the playbook.
            </p>
            <p className="text-gray-400 text-xs mt-0.5">
              The other 44 cover sales, content, ops, research & support — all $9 one-time.
            </p>
          </div>
          <Button variant="hero" size="default" asChild className="w-full sm:w-auto shadow-teal-lg">
            <a href={AI_EMPLOYEE_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
              Get All 50 — $9
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

/* ────────────────────────────────────────────────────────────────────────────
 * Sub-component: Time Calculator (honest framing)
 * ────────────────────────────────────────────────────────────────────────── */

const SLIDER_CONFIG = [
  { key: 'writing' as const, label: 'Writing & Content', icon: '✍️', desc: 'emails, blogs, social, scripts' },
  { key: 'sales'   as const, label: 'Sales & Outreach',  icon: '📞', desc: 'proposals, follow-ups, DMs' },
  { key: 'ops'     as const, label: 'Ops & Admin',        icon: '⚙️', desc: 'SOPs, reports, onboarding' },
];

const TimeCalculator = () => {
  const [hours, setHours] = useState({ writing: 8, sales: 6, ops: 4 });
  const [rate, setRate] = useState(75);

  const totalHours = hours.writing + hours.sales + hours.ops;
  const monthlyHours = Math.round(totalHours * 4.33);
  const monthlyCost = Math.round(monthlyHours * rate);
  const annualCost = monthlyCost * 12;

  // Honest framing: clients self-report ~50-70% reduction on these tasks. Use 60% midpoint.
  // Frame it as hours reclaimed, not dollars saved.
  const reclaimedHours = Math.round(monthlyHours * 0.6);
  const reclaimedValue = Math.round(reclaimedHours * rate);

  const updateHours = (key: keyof typeof hours, val: number) =>
    setHours((prev) => ({ ...prev, [key]: val }));

  return (
    <motion.div
      variants={itemVariants}
      className="relative rounded-3xl border border-gray-800 bg-charcoal-light/60 backdrop-blur-sm overflow-hidden hover:border-teal/30 transition-colors duration-500"
    >
      <div aria-hidden className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-teal/60 to-transparent" />

      <div className="p-5 sm:p-8 md:p-12">
        <div className="mb-7">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal/10 border border-teal/20 text-teal text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-3 h-3" />
            Free Tool
          </div>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-white leading-tight">
            AI Time Reclaim <span className="text-gradient">Calculator</span>
          </h3>
          <p className="text-gray-400 text-sm mt-2 max-w-lg">
            See the hours — and dollars — you're spending on tasks Claude can handle with the right prompt.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 items-start">
          <div className="space-y-4">
            <div className="rounded-2xl border border-gray-700/60 bg-gray-900/40 p-4 sm:p-5">
              <div className="flex items-center justify-between mb-3 gap-2">
                <label htmlFor="calc-rate" className="text-sm font-semibold text-gray-300 min-w-0">
                  Your hourly rate (or time value)
                </label>
                <span className="text-teal font-bold text-sm flex-shrink-0">${rate}/hr</span>
              </div>
              <input
                id="calc-rate"
                type="range"
                min={25}
                max={500}
                step={5}
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                aria-label="Hourly rate"
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-teal"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>$25</span><span>$500</span>
              </div>
            </div>

            {SLIDER_CONFIG.map(({ key, label, icon, desc }) => (
              <div key={key} className="rounded-2xl border border-gray-700/60 bg-gray-900/40 p-4 sm:p-5">
                <div className="flex items-center justify-between mb-1 gap-2">
                  <label htmlFor={`calc-${key}`} className="text-sm font-semibold text-gray-300 flex items-center gap-1.5 min-w-0">
                    <span className="flex-shrink-0" aria-hidden>{icon}</span>
                    <span className="truncate">{label}</span>
                  </label>
                  <span className="text-teal font-bold text-sm flex-shrink-0">{hours[key]} hrs/wk</span>
                </div>
                <p className="text-xs text-gray-400 mb-3">{desc}</p>
                <input
                  id={`calc-${key}`}
                  type="range"
                  min={0}
                  max={20}
                  step={1}
                  value={hours[key]}
                  onChange={(e) => updateHours(key, Number(e.target.value))}
                  aria-label={`${label} hours per week`}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-teal"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>0 hrs</span><span>20 hrs</span>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-gray-700/80 bg-gray-900/60 p-5 sm:p-6 space-y-3 overflow-hidden">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Where your time goes today</p>

              <div className="flex items-center justify-between py-2.5 border-b border-gray-800 gap-3">
                <span className="text-sm text-gray-400 min-w-0">Hours / week on these tasks</span>
                <span className="text-white font-bold flex-shrink-0">{totalHours} hrs</span>
              </div>
              <div className="flex items-center justify-between py-2.5 border-b border-gray-800 gap-3">
                <span className="text-sm text-gray-400 min-w-0">Hours / month</span>
                <span className="text-white font-bold flex-shrink-0">{monthlyHours} hrs</span>
              </div>
              <div className="flex items-center justify-between py-2.5 border-b border-gray-800 gap-3">
                <span className="text-sm text-gray-400 min-w-0">At ${rate}/hr, that's</span>
                <span className="text-white font-bold text-lg flex-shrink-0">${monthlyCost.toLocaleString()}/mo</span>
              </div>
              <div className="flex items-center justify-between py-2.5 gap-3">
                <span className="text-sm text-gray-400 min-w-0">Annualized</span>
                <span className="text-white font-black text-xl sm:text-2xl flex-shrink-0">${annualCost.toLocaleString()}</span>
              </div>
            </div>

            <div className="rounded-2xl border border-teal/25 bg-teal/5 p-5 sm:p-6 overflow-hidden">
              <div className="flex items-center gap-2 mb-3">
                <TrendingDown className="w-4 h-4 text-teal flex-shrink-0" />
                <p className="text-xs font-bold text-teal uppercase tracking-wider">With the playbook</p>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                In our own work and what clients report, these tasks shrink by <span className="text-white font-bold">50–70%</span> with the right prompts. Let's use 60%:
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-gray-900/60 border border-gray-700/60 gap-3">
                  <span className="text-gray-400 text-sm min-w-0">Hours reclaimed / month</span>
                  <span className="text-teal font-black text-xl flex-shrink-0">{reclaimedHours} hrs</span>
                </div>
                <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-gray-900/60 border border-gray-700/60 gap-3">
                  <span className="text-gray-400 text-sm min-w-0">At your rate, that's worth</span>
                  <span className="text-teal font-black text-xl flex-shrink-0">${reclaimedValue.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-gray-900/60 border border-gray-700/60 gap-3">
                  <span className="text-gray-400 text-sm min-w-0">Cost of the playbook</span>
                  <span className="text-white font-black text-xl flex-shrink-0">$9</span>
                </div>
              </div>

              <Button variant="hero" size="default" asChild className="w-full shadow-teal-lg">
                <a href={AI_EMPLOYEE_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-sm">
                  Reclaim the hours — $9 Playbook
                  <ArrowRight className="w-4 h-4 flex-shrink-0" />
                </a>
              </Button>

              <p className="text-center text-xs text-gray-400 mt-3">
                One-time · Works with free Claude · 30-day refund
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ────────────────────────────────────────────────────────────────────────────
 * Sub-component: Product Card
 * ────────────────────────────────────────────────────────────────────────── */

const ProductCard = () => (
  <motion.div
    variants={itemVariants}
    className="relative rounded-3xl border border-gray-800 bg-charcoal-light/60 backdrop-blur-sm overflow-hidden hover:border-teal/30 transition-colors duration-500"
  >
    <div aria-hidden className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-teal/60 to-transparent" />

    <div className="p-5 sm:p-8 md:p-12">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start">
        {/* Left: Info */}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal/10 border border-teal/20 text-teal text-xs font-bold uppercase tracking-wider">
              <Download className="w-3 h-3" /> Instant Download
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3" /> Built by AP Digital
            </span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
            The{' '}
            <span className="text-gradient">$10K AI Employee</span>{' '}
            <span className="text-gray-400 text-xl sm:text-2xl md:text-3xl font-bold">Playbook</span>
          </h3>

          <p className="text-gray-400 text-base leading-relaxed mb-6">
            50 fully-engineered AI prompts covering every workflow in a service business — marketing, sales, content,
            ops, and customer support. Copy, paste into Claude, get deliverables. Not suggestions.
          </p>

          {/* Categories grid */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.name}
                className="flex items-start gap-2.5 p-3 rounded-xl border border-gray-700/60 bg-gray-900/40"
              >
                <span className="text-xl flex-shrink-0 leading-none mt-0.5" aria-hidden>{cat.icon}</span>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-white leading-tight">
                    {cat.count} {cat.name}
                  </p>
                  <p className="text-[11px] text-gray-400 leading-snug mt-0.5 line-clamp-2">{cat.example}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-gray-700/60 bg-gray-800/30 p-5">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              + Free bonuses included
            </p>
            <ul className="space-y-2">
              {BONUSES.map((b) => (
                <li key={b} className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal flex-shrink-0" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Pricing + Trust */}
        <div className="lg:sticky lg:top-8">
          <div className="rounded-2xl border border-gray-700/80 bg-gray-900/60 p-6 md:p-8">
            <div className="mb-2">
              <span className="text-gray-400 text-sm">One-time · No subscription</span>
            </div>
            <div className="flex items-end gap-3 mb-6">
              <span className="font-display text-5xl sm:text-6xl md:text-7xl font-black text-white leading-none">
                $9
              </span>
              <span className="text-gray-400 text-sm mb-3">lifetime access</span>
            </div>

            <Button variant="hero" size="xl" asChild className="w-full shadow-teal-lg mb-4">
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

            <ul className="space-y-2.5 mt-5">
              {TRUST_POINTS.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-start gap-2.5 text-xs text-gray-400">
                  <Icon className="w-3.5 h-3.5 text-teal flex-shrink-0 mt-0.5" />
                  <span className="leading-snug">{label}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-5 border-t border-gray-700/60">
              <p className="text-xs text-gray-400 text-center leading-relaxed">
                Built by AP Digital — the same prompt systems we use to run live client campaigns across trades, salon, real estate & coaching.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

/* ────────────────────────────────────────────────────────────────────────────
 * Sub-component: FAQ
 * ────────────────────────────────────────────────────────────────────────── */

const FAQSection = () => (
  <motion.div variants={itemVariants} className="rounded-3xl border border-gray-800 bg-charcoal-light/60 backdrop-blur-sm p-6 sm:p-8 md:p-10">
    <div className="mb-6 text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal/10 border border-teal/20 text-teal text-xs font-bold uppercase tracking-wider mb-3">
        FAQ
      </div>
      <h3 className="font-display text-2xl md:text-3xl font-bold text-white leading-tight">
        Questions, <span className="text-gradient">answered</span>
      </h3>
    </div>

    <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
      {FAQS.map((item, i) => (
        <AccordionItem
          key={i}
          value={`faq-${i}`}
          className="border-b border-gray-800 last:border-0"
        >
          <AccordionTrigger className="text-left text-sm sm:text-base font-semibold text-white hover:text-teal hover:no-underline py-4">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="text-sm text-gray-400 leading-relaxed pb-4">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </motion.div>
);

/* ────────────────────────────────────────────────────────────────────────────
 * Main Section
 * ────────────────────────────────────────────────────────────────────────── */

const DigitalArsenal = () => {
  return (
    <section
      id="digital-arsenal"
      className="relative py-20 md:py-28 bg-near-black overflow-hidden"
    >
      {/* Background */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[700px] h-[350px] bg-teal/4 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[250px] bg-gold/3 rounded-full blur-3xl" />
      </div>
      <div aria-hidden className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal/25 to-transparent" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-14 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 border border-teal/20 text-teal mb-6">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-semibold uppercase tracking-wider">Digital Arsenal</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            AI Tools Built for <span className="text-gradient">Business Owners</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            The same AI systems we use to run live campaigns — packaged as copy-paste prompts and interactive tools you can use right now. No agency retainer. No monthly fee. Just leverage.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="max-w-5xl mx-auto space-y-8"
        >
          <ProductCard />
          <TimeCalculator />
          <FAQSection />
        </motion.div>
      </div>

      <div aria-hidden className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal/20 to-transparent" />
    </section>
  );
};

export default DigitalArsenal;
