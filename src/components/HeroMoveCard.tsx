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
  {
    tag: 'Geo-Targeting',
    headline: 'Running ads across the whole province? That\'s a leak, not a strategy.',
    body: 'If your service area is 30 km, your ad radius should be 30 km. Every click from outside your zone is wasted money. Pin your campaigns to the neighbourhoods that matter.',
    statLabel: 'Wasted spend cut',
    statValue: '−40%',
  },
  {
    tag: 'Video',
    headline: 'Vertical video gets 68% more reach than horizontal. Stop filming landscape.',
    body: '9:16 owns mobile. Every platform — Reels, TikTok, Shorts, Stories — rewards vertical. If your content isn\'t filling the screen, it\'s losing the scroll.',
    statLabel: 'Reach boost',
    statValue: '+68%',
  },
  {
    tag: 'Scheduling',
    headline: 'Post at 7 AM or 7 PM. Everything in between is a ghost town.',
    body: 'Engagement peaks bookend the workday. Morning commute and evening wind-down are when thumbs are scrolling. Posting at 2 PM gets buried by 5 PM.',
    statLabel: 'Peak engagement',
    statValue: '7 AM / PM',
  },
  {
    tag: 'UGC',
    headline: 'Customer content converts 4.5× better than branded content.',
    body: 'Real people using your product in bad lighting with no script beats your $5K brand shoot. Ask customers to tag you, reshare it, run it as an ad.',
    statLabel: 'UGC conversion lift',
    statValue: '4.5×',
  },
  {
    tag: 'Negative Keywords',
    headline: 'You\'re paying for "free" clicks right now. Check your search terms.',
    body: 'Google Ads defaults to broad matching. "Free plumber," "plumber salary," "DIY plumbing" — all eating your budget. Add negative keywords weekly.',
    statLabel: 'Budget saved',
    statValue: '15–25%',
  },
  {
    tag: 'Mobile',
    headline: '73% of your leads come from mobile. Is your page built for thumbs?',
    body: 'Desktop-first design is dead. If the CTA button is below the fold on mobile, if the form is tiny, if load time exceeds 3 seconds — you\'re losing 3 out of 4 visitors.',
    statLabel: 'Mobile traffic share',
    statValue: '73%',
  },
  {
    tag: 'Scarcity',
    headline: 'Real scarcity doubles conversion. Fake scarcity destroys trust.',
    body: '"Only 3 onboarding slots left this month" works when it\'s true. A fake countdown timer running forever gets screenshotted and posted to Reddit. Keep it honest.',
    statLabel: 'Honest urgency lift',
    statValue: '+94%',
  },
  {
    tag: 'Carousel',
    headline: 'Carousel posts get 3× the engagement of single images.',
    body: 'Swipeable = interactive. More swipes = more time on post = algorithm boost. Use 5–7 slides: hook, problem, proof, solution, CTA. Every slide earns the next.',
    statLabel: 'Avg engagement lift',
    statValue: '3.1×',
  },
  {
    tag: 'Referrals',
    headline: 'Your best clients know your next best clients. Ask them.',
    body: 'A referral program that gives $50 credit for each introduction costs 10× less than ads and closes 2× faster. Send the ask after a positive review, not randomly.',
    statLabel: 'Referral CAC vs ads',
    statValue: '10×cheaper',
  },
  {
    tag: 'A/B Testing',
    headline: 'Test one variable at a time. Or learn nothing.',
    body: 'Changing the headline, image, and CTA simultaneously tells you nothing about what worked. Isolate. Test. Measure. Repeat. Science, not vibes.',
    statLabel: 'Tests per month',
    statValue: '4+',
  },
  {
    tag: 'Google Business',
    headline: 'Your Google Business Profile is your best free marketing tool.',
    body: 'Weekly posts, fresh photos, Q&A answers, review responses — businesses that update GBP weekly rank 2× higher in map pack. It\'s free. Just do it.',
    statLabel: 'Map pack lift',
    statValue: '2×',
  },
  {
    tag: 'Speed',
    headline: 'Every second of load time costs you 7% in conversions.',
    body: 'Run PageSpeed Insights right now. Compress images, lazy-load below the fold, ditch the slider nobody clicks. A 2-second site beats a pretty 6-second site.',
    statLabel: 'Conversion loss / sec',
    statValue: '−7%',
  },
  {
    tag: 'Consistency',
    headline: 'Posting 3× a week for 6 months beats 30 posts in one week.',
    body: 'Algorithms reward consistency, not volume spikes. Set a cadence you can maintain, automate scheduling, and batch-create content. Show up or get forgotten.',
    statLabel: 'Min frequency',
    statValue: '3× / week',
  },
  {
    tag: 'SMS',
    headline: 'SMS open rates are 98%. Email is 22%. Use both, lead with SMS.',
    body: 'For appointment reminders, flash offers, and follow-ups — SMS wins every time. Keep messages under 160 chars, include one link, and always allow opt-out.',
    statLabel: 'SMS open rate',
    statValue: '98%',
  },
  {
    tag: 'Storytelling',
    headline: 'Case studies with numbers close deals. Testimonials without them don\'t.',
    body: '"We helped a Vancouver salon go from 40% booked to 92% in 6 weeks" beats "great service!" every single time. The number is the proof.',
    statLabel: 'Story + number CVR',
    statValue: '+27%',
  },
  {
    tag: 'Competitor',
    headline: 'Your competitor\'s best ad is your free research.',
    body: 'Go to Meta Ad Library, search their name, see what they\'ve been running longest. Longevity = profitability. Don\'t copy — learn the angle, then improve it.',
    statLabel: 'Research time needed',
    statValue: '15 min',
  },
  {
    tag: 'Retargeting',
    headline: 'Site visitors who don\'t convert are 70% cheaper to re-acquire.',
    body: 'Install the Meta Pixel and Google tag day one. Even if you don\'t run ads yet, you\'re building an audience. When you do start, your warmest audience is ready.',
    statLabel: 'Retarget CPA vs cold',
    statValue: '−70%',
  },
  {
    tag: 'SEO',
    headline: 'Page 2 of Google gets 0.63% of clicks. You\'re either on page 1 or invisible.',
    body: 'Focus on 5–10 keywords you can realistically rank for. Long-tail beats head terms — "plumber North Vancouver emergency" beats "plumber" every time.',
    statLabel: 'Page 1 click share',
    statValue: '99.4%',
  },
  {
    tag: 'Email Subject',
    headline: 'Subject lines under 7 words get 15% more opens.',
    body: 'Short = scannable = opened. "Your leads this week" beats "Here\'s a comprehensive breakdown of your marketing results for the week of July 7th." Respect the inbox.',
    statLabel: 'Ideal subject length',
    statValue: '< 7 words',
  },
  {
    tag: 'Attribution',
    headline: 'Ask every lead: "How did you hear about us?" Then track it.',
    body: 'UTM parameters catch digital. But word-of-mouth, drive-bys, and "a friend told me" need a manual ask. Add one dropdown to your form. The data changes everything.',
    statLabel: 'Hidden channel share',
    statValue: '~30%',
  },
  {
    tag: 'Seasonality',
    headline: 'Start your holiday campaign in October, not December.',
    body: 'CPMs spike 30–50% in November. Smart advertisers build warm audiences in Sept/Oct when costs are low, then retarget them through the holiday rush.',
    statLabel: 'CPM spike in Q4',
    statValue: '+45%',
  },
  {
    tag: 'Simplicity',
    headline: 'The business with the simplest offer wins.',
    body: 'If explaining your services takes 3 minutes, you\'ve already lost. "We get you 20 leads/month or you don\'t pay" beats a 47-slide deck. Simplify or die.',
    statLabel: 'Pitch length',
    statValue: '< 10 sec',
  },
  {
    tag: 'Micro-Content',
    headline: 'Turn 1 long video into 12 pieces of content.',
    body: 'Film one 10-minute video. Cut it into 4 Reels, 3 quote cards, 2 carousels, 1 blog post, 1 email, and 1 tweet thread. Content isn\'t created — it\'s multiplied.',
    statLabel: 'Content pieces per video',
    statValue: '12',
  },
  {
    tag: 'Trust',
    headline: 'Your "About" page is your second-most visited page. Make it sell.',
    body: 'Buyers check who\'s behind the business before they buy. Photo of you + your story + specific results = trust. Stock photos + generic mission statement = bounce.',
    statLabel: 'About page traffic rank',
    statValue: '#2',
  },
  {
    tag: 'Automation',
    headline: 'If you\'re doing it manually more than twice, automate it.',
    body: 'Lead notifications, follow-up emails, review requests, invoice reminders — set up once, run forever. Your time is worth more than repetition.',
    statLabel: 'Hours saved / week',
    statValue: '8+',
  },
  {
    tag: 'Guarantees',
    headline: 'A guarantee doesn\'t cost you — it costs your competitors.',
    body: '"90-day results or your money back" scares bad agencies and attracts serious buyers. If you deliver results, the guarantee costs you nothing. If you don\'t, you shouldn\'t charge.',
    statLabel: 'Conversion lift w/ guarantee',
    statValue: '+32%',
  },
  {
    tag: 'Local',
    headline: 'The best ad for a local business mentions the neighbourhood, not the city.',
    body: '"Kitsilano\'s top-rated salon" beats "Vancouver salon." Hyper-local signals cut through noise. People trust businesses that feel like theirs.',
    statLabel: 'CTR lift w/ local',
    statValue: '+23%',
  },
  {
    tag: 'Patience',
    headline: 'Ads need 2–3 weeks to optimize. Killing campaigns on day 3 is the #1 mistake.',
    body: 'The algorithm needs 50+ conversions to learn. If you panic-pause after 48 hours of "bad" results, you reset the learning phase every time. Give it time.',
    statLabel: 'Learning phase',
    statValue: '2–3 weeks',
  },
  {
    tag: 'Positioning',
    headline: 'You\'re not expensive. You\'re not for everyone.',
    body: 'Competing on price is a race to zero. Compete on specificity + speed + guarantee. The client who picks you on price will leave you on price.',
    statLabel: 'Price sensitivity',
    statValue: 'Irrelevant',
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
  const { move, dropNumber, dateLabel } = getTodaysMove();

  return (
    <div className="relative w-full">
      <div className="relative rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 px-5 py-4 sm:px-6 sm:py-5">

        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-teal" strokeWidth={2.5} />
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-gray-700">
              Today's Move
            </span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-medium">
            <span className="text-gray-400">{dateLabel}</span>
            <span className="text-gray-200">·</span>
            <span className="flex items-center gap-1 text-gray-400">
              <Flame className="w-2.5 h-2.5 text-orange-500" fill="currentColor" />
              {dropNumber}/{MOVES.length}
            </span>
          </div>
        </div>

        {/* Tag */}
        <div className="text-[9px] font-bold tracking-[0.18em] uppercase text-teal mb-2">
          {move.tag}
        </div>

        {/* Headline */}
        <h3 className="font-display text-[1.1rem] sm:text-[1.2rem] font-bold text-gray-900 leading-[1.2] mb-2.5 tracking-tight">
          {move.headline}
        </h3>

        {/* Body — clamped to 3 lines */}
        <p
          className="text-[11.5px] text-gray-600 leading-relaxed mb-3.5 overflow-hidden"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {move.body}
        </p>

        {/* Divider */}
        <div className="h-px bg-gray-100 mb-3" />

        {/* Stat + Instagram */}
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[9px] font-bold tracking-[0.16em] uppercase text-gray-400 mb-0.5">
              {move.statLabel}
            </p>
            <p className="font-display text-[1.75rem] font-bold text-teal leading-none">
              {move.statValue}
            </p>
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow @theapdigital on Instagram"
            className="inline-flex items-center gap-1.5 group pb-0.5"
          >
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 group-hover:scale-110 transition-transform">
              <Instagram className="w-3 h-3 text-white" strokeWidth={2.5} />
            </span>
            <span className="text-xs font-semibold text-gray-700 group-hover:text-teal transition-colors">
              @theapdigital
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroMoveCard;
