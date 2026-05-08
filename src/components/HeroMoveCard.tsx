import { Sparkles, Calendar, Flame, Instagram } from 'lucide-react';

const INSTAGRAM_URL = 'https://www.instagram.com/theapdigital/';

type Move = {
  tag: string;
  headline: string;
  body: string;
  statLabel: string;
  statValue: string;
};

// 30 daily marketing moves — rotates by day-of-year so each day shows a new one
const MOVES: Move[] = [
  {
    tag: 'Retargeting',
    headline: "You're showing the same ad 11 times. CTR is dead.",
    body: "Cap retarget frequency at 4–7 per week. Beyond that, CTR halves and brand sentiment turns net-negative — you train people to ignore you.",
    statLabel: 'Max Impressions / Week',
    statValue: '7',
  },
  {
    tag: 'Hooks',
    headline: 'Your first 3 seconds decide whether you make money today.',
    body: 'On Reels and TikTok, 75% of drop-off happens before second 3. Open with a pattern interrupt or a specific dollar number — never a logo or "hi guys."',
    statLabel: 'Avg watch time gain',
    statValue: '+38%',
  },
  {
    tag: 'Lead Forms',
    headline: 'Cut form fields from 7 to 3. Watch CPL fall in half.',
    body: 'Every extra field adds friction. Ask for name, phone, and one qualifier. Everything else gets handled on the call. Speed-to-qualified > completeness.',
    statLabel: 'Conversion lift',
    statValue: '2.1×',
  },
  {
    tag: 'Offer',
    headline: 'Stop selling the service. Sell the next 30 days.',
    body: 'Buyers don\'t want "social media management." They want 12 booked calls by month-end. Lead with the outcome and timeframe — vague offers convert at 1%.',
    statLabel: 'Offer clarity score',
    statValue: '9 / 10',
  },
  {
    tag: 'Follow-up',
    headline: 'Most leads die in the first 5 minutes. Yours included.',
    body: 'Lead-to-call within 5 min converts 21× higher than at 30 min. Set up an SMS auto-reply the second a form submits — even a "got it, calling now" beats silence.',
    statLabel: 'Speed window',
    statValue: '< 5 min',
  },
  {
    tag: 'Creative',
    headline: 'One winning ad funds the next 12 losers. Test ruthlessly.',
    body: 'Ship 5 creatives a week, kill the bottom 3 within 48 hours. Fortune isn\'t in the variations — it\'s in finding the one angle that breaks through.',
    statLabel: 'Creatives per week',
    statValue: '5',
  },
  {
    tag: 'Landing Page',
    headline: 'Your homepage is not a landing page. Stop sending ad traffic to it.',
    body: 'Dedicated LPs convert 3–5× higher than homepages. One offer, one CTA, no nav. Every link out of the page is money walking away.',
    statLabel: 'CVR uplift',
    statValue: '+220%',
  },
  {
    tag: 'Tracking',
    headline: 'If you\'re running ads without the Meta Pixel + CAPI, you\'re flying blind.',
    body: 'iOS 14+ killed half your reporting. Server-side conversions API recovers 30–40% of lost signal — algorithms learn faster, CPLs drop, scaling unlocks.',
    statLabel: 'Signal recovered',
    statValue: '~38%',
  },
  {
    tag: 'Testimonials',
    headline: 'Generic reviews don\'t sell. Specific dollar amounts do.',
    body: '"Great service" → ignored. "Booked 14 new clients in 3 weeks for $312" → wallet opens. Always ask for the number, the timeframe, and the photo.',
    statLabel: 'Specificity = trust',
    statValue: '3×',
  },
  {
    tag: 'Pricing',
    headline: 'Charge based on outcome, not hours.',
    body: 'Hourly billing punishes you for getting better. Package by result: "12 booked calls / month" — clients understand value, you protect margin as you improve.',
    statLabel: 'Margin protected',
    statValue: '+45%',
  },
  {
    tag: 'Email',
    headline: '70% of opt-in leads never get a single email. Worth $0.',
    body: 'Day-0 welcome → day-2 case study → day-5 soft offer. A 5-email sequence built once recovers 3–8% of your dead list every month.',
    statLabel: 'Re-activation rate',
    statValue: '6%',
  },
  {
    tag: 'CRO',
    headline: 'Above-the-fold copy answers one question: "What\'s in it for me?"',
    body: 'Visitors decide in 8 seconds. If your H1 says "Welcome to [agency]" you lose. Lead with the transformation, not your name.',
    statLabel: 'Decision window',
    statValue: '8 sec',
  },
  {
    tag: 'Niche',
    headline: 'Talking to everyone = talking to no one. Pick one vertical for 90 days.',
    body: 'Generic agencies blend in. "We help solar installers book 40 quotes a month" gets premium pricing because the buyer self-identifies in seconds.',
    statLabel: 'Niche premium',
    statValue: '+60%',
  },
  {
    tag: 'Reels',
    headline: 'Talking-head reels outperform b-roll. Show your face.',
    body: 'Algorithm rewards hold time and faces hold longer than stock. 1 reel/day for 30 days will out-leverage any paid campaign for trust building.',
    statLabel: 'Reels per month',
    statValue: '30',
  },
  {
    tag: 'Cold DMs',
    headline: 'Stop pitching in DM 1. Compliment, then question.',
    body: 'Pitches in the opener get hidden. Reference something specific from their last post, ask one question, hold the offer until DM 3 minimum.',
    statLabel: 'Reply rate jump',
    statValue: '14%',
  },
  {
    tag: 'Offer Stack',
    headline: 'Bonuses move more buyers than discounts.',
    body: 'Discounting cheapens the brand. A $97 audit + $200 ad credit + 30-min strategy call beats "20% off" every time — and protects your margin.',
    statLabel: 'Perceived value',
    statValue: '+$497',
  },
  {
    tag: 'Booking',
    headline: 'Calendly link in the ad = lower CVR. Book on the call.',
    body: 'Forms beat calendars at the top of funnel. Calendars convert visitors who already trust you. Match the asset to the awareness stage.',
    statLabel: 'Form vs cal CVR',
    statValue: '2.4×',
  },
  {
    tag: 'Audience',
    headline: 'Lookalikes off your customer list outperform interest targeting 4× over.',
    body: 'Upload your last 100 buyers (hashed), build a 1% LAL, run cold creative against it. This single move can drop CAC 30–40% in week one.',
    statLabel: 'CAC drop',
    statValue: '−35%',
  },
  {
    tag: 'Reviews',
    headline: 'Ask for the review on day 7, not month 3.',
    body: 'Memory of the result is freshest within the first week. Send a one-tap link with a fill-in-the-blank prompt — review volume 5×.',
    statLabel: 'Review velocity',
    statValue: '5×',
  },
  {
    tag: 'Budget',
    headline: 'Your ad budget below $1,500/mo isn\'t a campaign. It\'s a prayer.',
    body: 'Below 50 conversions/week, the algorithm can\'t learn. Either consolidate spend, narrow geo, or use a cheaper conversion event (lead vs purchase).',
    statLabel: 'Min weekly conv.',
    statValue: '50',
  },
  {
    tag: 'Headlines',
    headline: 'Numbers in headlines outperform adjectives 3:1.',
    body: '"Fast service" → forgettable. "Avg lead in 47 minutes" → screenshot-worthy. The brain anchors on specifics; vague claims trigger skepticism.',
    statLabel: 'CTR lift w/ numbers',
    statValue: '+31%',
  },
  {
    tag: 'Funnel',
    headline: 'Stop sending cold traffic to a sales call. Warm them up first.',
    body: 'Cold → article → retarget → call. 3-step funnels close 2.5× more than 1-step. People buy from agencies they recognize, not strangers.',
    statLabel: 'Close rate gain',
    statValue: '2.5×',
  },
  {
    tag: 'Copy',
    headline: 'Write at a Grade 6 reading level. Yes, even for "premium" buyers.',
    body: 'Smart people read fast and skim. Big words slow them down. The most expensive copy on the internet (Apple, Tesla) reads like a text message.',
    statLabel: 'Readability target',
    statValue: 'Gr. 6',
  },
  {
    tag: 'Reactivation',
    headline: 'Your dead leads are worth more than your cold audience.',
    body: 'Send a one-line "still working on this?" SMS to any lead 30+ days old. 8–12% will reply. CAC: $0.',
    statLabel: 'Reactivation cost',
    statValue: '$0',
  },
  {
    tag: 'Brand',
    headline: 'Your logo is not your brand. Your customer outcome is.',
    body: 'Spend nothing on a redesign until you can write your brand promise in one sentence. "We help X get Y in Z time." That sentence > any visual.',
    statLabel: 'Promise clarity',
    statValue: '1 sentence',
  },
  {
    tag: 'Webinars',
    headline: 'Live webinars convert 4× higher than evergreen replays.',
    body: 'Scarcity + interaction. Run live monthly, evergreen the replay. Don\'t flip the order — your live shows are the leverage.',
    statLabel: 'Live vs replay',
    statValue: '4×',
  },
  {
    tag: 'Onboarding',
    headline: 'Win the first 7 days. Keep the client for 7 months.',
    body: 'Quickest win in week one beats any retention program in month six. Map the smallest possible result you can deliver in days, not weeks.',
    statLabel: 'Retention from W1 win',
    statValue: '+92%',
  },
  {
    tag: 'CTAs',
    headline: 'One CTA per page beats three. Always.',
    body: 'Decision fatigue kills conversion. Pick the highest-leverage action and remove every other path off the page. "Book a Call" — that\'s it.',
    statLabel: 'Single-CTA lift',
    statValue: '+161%',
  },
  {
    tag: 'Social Proof',
    headline: 'Logos of clients build more trust than testimonials about them.',
    body: 'Buyers scan, they don\'t read. Logos of recognizable brands above the fold communicate credibility in 2 seconds. Quotes earn attention; logos earn it free.',
    statLabel: 'Trust signal speed',
    statValue: '2 sec',
  },
  {
    tag: 'Audit',
    headline: 'Your first call should be a free audit, not a sales pitch.',
    body: 'Pitching strangers fails. Diagnosing them works. Show them what\'s broken in their funnel for free, and 35–50% will ask "how do I fix it?" themselves.',
    statLabel: 'Audit-to-close',
    statValue: '42%',
  },
];

// Pick today's move + footer drop number from day-of-year
const getTodaysMove = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / 86_400_000);
  const idx = dayOfYear % MOVES.length;
  const move = MOVES[idx];
  const dateLabel = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  return { move, dropNumber: idx + 1, dayOfYear, dateLabel };
};

const HeroMoveCard = () => {
  const { move, dropNumber, dayOfYear, dateLabel } = getTodaysMove();
  const bars = [38, 52, 33, 68, 58, 82, 100];

  return (
    <div className="relative w-full max-w-[480px] mx-auto lg:ml-auto lg:mr-0">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[3rem] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(20,184,166,0.18) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />

      {/* Gradient border ring */}
      <div
        aria-hidden
        className="absolute -inset-[1.5px] rounded-[1.6rem] pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(20,184,166,0.35) 0%, rgba(255,255,255,0.06) 50%, rgba(20,184,166,0.15) 100%)',
        }}
      />

      <div className="relative rounded-[1.5rem] bg-white shadow-[0_32px_80px_-12px_rgba(0,0,0,0.35)] p-6 sm:p-8">

        {/* Header row */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-teal to-teal-dark flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-[11px] font-extrabold tracking-[0.2em] uppercase text-gray-800">
              Today's Move
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1">
            <Calendar className="w-3 h-3 text-gray-400" strokeWidth={2} />
            <span className="text-[10px] text-gray-500 font-semibold">{dateLabel}</span>
            <span className="text-gray-300">·</span>
            <span className="text-[10px] text-gray-400 font-medium">Day {dayOfYear}</span>
          </div>
        </div>

        {/* Tag pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-teal/30 bg-gradient-to-r from-teal/10 to-teal/5 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-teal" />
          <span className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-teal-dark">
            {move.tag}
          </span>
        </div>

        {/* Headline */}
        <h3 className="font-display text-[1.3rem] sm:text-[1.5rem] font-extrabold text-gray-900 leading-[1.18] mb-3.5 tracking-tight">
          {move.headline}
        </h3>

        {/* Body */}
        <p className="text-[0.875rem] text-gray-500 leading-relaxed mb-5">
          {move.body}
        </p>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-5" />

        {/* Stat + Instagram row */}
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <p className="text-[9px] font-extrabold tracking-[0.18em] uppercase text-gray-400 mb-1">
              {move.statLabel}
            </p>
            <p className="font-display text-[2.6rem] font-black text-transparent bg-clip-text leading-none"
              style={{ backgroundImage: 'linear-gradient(135deg, hsl(170,80%,36%) 0%, hsl(170,70%,48%) 100%)' }}>
              {move.statValue}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[9px] font-extrabold tracking-[0.16em] uppercase text-gray-400 mb-2">
              Daily Drop
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow @theapdigital on Instagram"
              className="inline-flex items-center gap-2 group"
            >
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-gradient-to-br from-amber-400 via-rose-500 to-violet-600 shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-200">
                <Instagram className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
              </span>
              <span className="text-sm font-bold text-gray-900 group-hover:text-teal-dark transition-colors duration-200">
                @theapdigital
              </span>
            </a>
          </div>
        </div>

        {/* Footer: drop counter + sparkline */}
        <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
          <div className="flex items-center gap-2">
            <Flame className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" fill="currentColor" />
            <span className="text-xs font-bold text-gray-700">
              Drop {dropNumber}
            </span>
            <span className="text-xs text-gray-400 font-medium">/ {MOVES.length} this season</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-extrabold tracking-[0.18em] uppercase text-gray-400">
              7d
            </span>
            <div className="flex items-end gap-[3px] h-5">
              {bars.map((h, i) => (
                <div
                  key={i}
                  className="w-[3px] rounded-full"
                  style={{
                    height: `${h}%`,
                    background: `hsl(170, 75%, ${36 + (i / bars.length) * 16}%)`,
                    opacity: 0.5 + (i / bars.length) * 0.5,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroMoveCard;
