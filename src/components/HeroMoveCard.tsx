import { Sparkles, Calendar, Flame } from 'lucide-react';

const INSTAGRAM_URL = 'https://www.instagram.com/theapdigital/';

/* Official Instagram glyph — lucide's outline version reads as a generic
   camera tile and isn't recognisable at this size. */
const InstagramGlyph = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

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
  {
    tag: 'Message Match',
    headline: 'Your ad promised one thing. Your landing page says another.',
    body: "The headline someone clicks should be the headline they land on — same words, same offer, same number. Mismatched scent is the most common reason a good ad produces bad leads.",
    statLabel: 'Bounce reduction',
    statValue: '-30%',
  },
  {
    tag: 'Hook Rate',
    headline: 'Hook rate under 25% means nobody ever saw your offer.',
    body: "Hook rate is 3-second views divided by impressions. Below 25% the problem is never the offer, the targeting, or the budget — it is the first frame. Fix that before you touch anything else.",
    statLabel: 'Healthy hook rate',
    statValue: '30%+',
  },
  {
    tag: 'Static Ads',
    headline: 'Your best ad this quarter will probably be a still image.',
    body: "Everyone chases video, so the feed is saturated with it. A clean static with a specific price or a before-and-after often beats a produced video, costs a fraction, and ships the same day.",
    statLabel: 'Production cost',
    statValue: 'Near zero',
  },
  {
    tag: 'Disqualification',
    headline: 'Repel the wrong buyers in the ad, not on the call.',
    body: "Putting your starting price in the creative cuts lead volume and raises close rate. You are not paying for leads — you are paying for calls worth taking.",
    statLabel: 'Goal metric',
    statValue: 'Cost/sale',
  },
  {
    tag: 'Search Terms',
    headline: "You are paying for searches you would never have bid on.",
    body: "Pull the search terms report weekly, not monthly. On a typical local account, 20-30% of spend lands on queries with no purchase intent. Every one you exclude is budget moved to the ones that convert.",
    statLabel: 'Review cadence',
    statValue: 'Weekly',
  },
  {
    tag: 'Performance Max',
    headline: 'PMax will happily spend your budget on traffic you already had.',
    body: "Without brand exclusions, PMax claims credit for people searching your name and reports a beautiful ROAS. Exclude your brand terms, then judge it on new customers only.",
    statLabel: 'First setting',
    statValue: 'Exclusions',
  },
  {
    tag: 'Call Tracking',
    headline: "If you cannot tell which ad made the phone ring, you are optimising blind.",
    body: "Service businesses get most leads by phone, and most accounts track only form fills. You end up killing the campaign that drives calls because it looks like it produced nothing.",
    statLabel: 'Leads by phone',
    statValue: 'Most',
  },
  {
    tag: 'Lifetime Value',
    headline: 'Cost per lead is the wrong number to be proud of.',
    body: "If a client is worth $4,000 over two years, a $90 lead at a 20% close rate is excellent. Know your LTV and you can outbid every competitor who only knows their CPL.",
    statLabel: 'Number that matters',
    statValue: 'LTV : CAC',
  },
  {
    tag: 'Winback',
    headline: 'Your cheapest customer this month already bought from you once.',
    body: "Past customers convert at several times the rate of cold traffic and cost nothing to reach. Before raising ad spend, email everyone who bought 6-18 months ago with one specific reason to return.",
    statLabel: 'Cost to reach',
    statValue: '$0',
  },
  {
    tag: 'Segmentation',
    headline: 'One email to everyone underperforms three emails to three groups.',
    body: "Splitting by what someone actually did — enquired, bought once, went quiet — takes twenty extra minutes and consistently beats the single blast. Relevance is the whole game.",
    statLabel: 'Extra effort',
    statValue: '20 min',
  },
  {
    tag: 'Deliverability',
    headline: "Your open rate did not drop. Your emails stopped arriving.",
    body: "Mailbox providers score you on engagement. A list full of people who never open drags down inbox placement for everyone else. Remove 12-month non-openers and your real audience starts seeing you again.",
    statLabel: 'Prune after',
    statValue: '12 months',
  },
  {
    tag: 'Lead Magnets',
    headline: "A PDF nobody opens is not a lead magnet. It is a tax on your form.",
    body: "The best magnet solves one narrow problem in under five minutes — a quote calculator, a checklist, a real price list. Long guides get downloaded and never read, and the lead forgets you by Tuesday.",
    statLabel: 'Time to value',
    statValue: '< 5 min',
  },
  {
    tag: 'Discovery',
    headline: 'Talking more than a third of the sales call loses the deal.',
    body: "Top performers listen far more than they pitch. Ask what they tried, what it cost, and what happens if nothing changes — then quote against the answer instead of your standard package.",
    statLabel: 'Your talk time',
    statValue: '< 35%',
  },
  {
    tag: 'Objections',
    headline: 'Every objection you hear on call three belongs in the ad.',
    body: "If four prospects in a row ask whether there is a contract, that is not a sales problem — it is a creative brief. Answer it in the headline and the objection stops reaching the call.",
    statLabel: 'Where to answer',
    statValue: 'The ad',
  },
  {
    tag: 'Proposals',
    headline: 'A proposal sent 48 hours later is a proposal that already lost.',
    body: "Urgency decays fast after a good call. Send the same day, keep it to one page, and include a single price with a clear next step. Long documents signal deliberation, not confidence.",
    statLabel: 'Send within',
    statValue: 'Same day',
  },
  {
    tag: 'Budget Pacing',
    headline: "Spending the whole month's budget in week one is not scaling.",
    body: "Front-loaded spend starves the back half of the month and teaches the algorithm nothing stable. Raise daily budgets by 20% at a time and let the learning phase finish before the next increase.",
    statLabel: 'Safe increase',
    statValue: '20%',
  },
  {
    tag: 'Dayparting',
    headline: 'You are bidding at 3am, against nobody, for nobody.',
    body: "Pull performance by hour and day. Most local service accounts get their bookings inside business hours, and overnight clicks are the cheapest way to waste a budget while looking busy.",
    statLabel: 'Check',
    statValue: 'By hour',
  },
  {
    tag: 'Ad Fatigue',
    headline: 'Frequency 3 is fine. Frequency 3 on the same creative is not.',
    body: "Audiences tire of the execution long before they tire of the offer. Rotate the hook, the format, and the opening frame while keeping the promise identical — new creative, same message.",
    statLabel: 'Refresh every',
    statValue: '2-3 weeks',
  },
  {
    tag: 'Lookalikes',
    headline: 'A lookalike built from 40 leads is just a random audience.',
    body: "Seed lists need real volume and real quality before the model has anything to learn from. Below a few hundred conversions you are better off with interest targeting and strong creative.",
    statLabel: 'Minimum seed',
    statValue: '500+',
  },
  {
    tag: 'Comments',
    headline: 'Unanswered comments on a live ad are money left on the table.',
    body: "People ask about price and availability in the comments instead of clicking. Nobody replies, and the thread becomes social proof that you are unreachable. Answer every one within the day.",
    statLabel: 'Reply within',
    statValue: '24 hrs',
  },
  {
    tag: 'Repurposing',
    headline: 'One good long video is nine posts. You are publishing one.',
    body: "Every genuine question from a sales call is a short video, a caption, and an email. The constraint is almost never ideas — it is that nobody wrote down what clients actually ask.",
    statLabel: 'From one asset',
    statValue: '9 posts',
  },
  {
    tag: 'Vanity Metrics',
    headline: 'Nobody has ever deposited an impression.',
    body: "Reach, likes and follower count move independently of revenue. Track leads, cost per lead, and closed jobs. If a metric would not change a decision, it does not belong in the report.",
    statLabel: 'Metrics that count',
    statValue: '3',
  },
  {
    tag: 'Reporting',
    headline: 'Monthly reporting hides a problem for twenty-nine days.',
    body: "By the time a monthly report shows cost per lead doubling, you have already spent the month. A five-minute weekly check on spend, leads, and CPL catches it while it is still cheap.",
    statLabel: 'Check cadence',
    statValue: 'Weekly',
  },
  {
    tag: 'Cohorts',
    headline: 'Blended numbers hide the month everything actually broke.',
    body: "Averaging across all customers smooths over the point where quality dropped. Group by the month someone came in and compare — the trend line tells you what the average never will.",
    statLabel: 'Group by',
    statValue: 'Join month',
  },
  {
    tag: 'Service Pages',
    headline: 'One page per service. Not one page listing every service.',
    body: "A single page trying to rank for six services ranks for none. Give each its own page with its own price, its own proof, and its own call to action — then send matching ad traffic there.",
    statLabel: 'Pages needed',
    statValue: '1 each',
  },
  {
    tag: 'Internal Links',
    headline: 'Your best page links out eleven times and gets linked to once.',
    body: "Authority flows along internal links. If the page you most want ranking is a dead end that everything points away from, you are actively donating its strength to weaker pages.",
    statLabel: 'Audit',
    statValue: 'Inbound',
  },
  {
    tag: 'Review Replies',
    headline: 'Replying to reviews is free ranking and free sales copy.',
    body: "Responses are indexed, show prospects how you handle criticism, and signal an active profile. Reply to every review — especially the bad ones, where the reply is read more than the review.",
    statLabel: 'Reply rate target',
    statValue: '100%',
  },
  {
    tag: 'Profile Photos',
    headline: 'Your Google profile photos are three years old.',
    body: "Fresh, real photos of completed work and the actual team outperform stock imagery and lift calls from the map pack. Add a handful every month — it takes ten minutes and costs nothing.",
    statLabel: 'Add monthly',
    statValue: '5-10',
  },
  {
    tag: 'Payment Terms',
    headline: 'Price is rarely the objection. Cash flow usually is.',
    body: "A prospect who balks at $3,000 up front will often say yes to three payments of $1,100. Same revenue, higher total, more closes. Offer the split before you offer a discount.",
    statLabel: 'Discount given',
    statValue: 'None',
  },
  {
    tag: 'Offer Naming',
    headline: 'Nobody is searching for whatever you named your package.',
    body: "Clever names — Ignite, Momentum, Foundation — mean nothing to a buyer. Name it after the outcome and timeframe instead, and the offer starts explaining itself before you do.",
    statLabel: 'Name it after',
    statValue: 'Outcome',
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
      <div className="elev-3 relative overflow-hidden rounded-[1.5rem] bg-[#0C0E11] px-6 py-6 sm:px-7 sm:py-7">
        {/* Overhead sheen so the black panel carries its own light. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(75% 55% at 50% -10%, hsl(0 0% 100% / 0.13) 0%, transparent 70%)',
          }}
        />

        <div className="relative">
          {/* Header */}
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-white" strokeWidth={2} />
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70">
                Today's Move
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-medium">
              <span className="text-white/60">{dateLabel}</span>
              <span className="text-white/25">·</span>
              <span className="flex items-center gap-1 text-white/60">
                <Flame className="h-2.5 w-2.5" fill="currentColor" />
                {dropNumber}/{MOVES.length}
              </span>
            </div>
          </div>

          {/* Tag */}
          <div className="mb-3 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/65">
            {move.tag}
          </div>

          {/* Headline */}
          <h3 className="mb-3 font-serif text-xl leading-[1.2] tracking-tight text-white sm:text-2xl">
            {move.headline}
          </h3>

          {/* Body — clamped to 3 lines */}
          <p
            className="mb-5 overflow-hidden text-[12.5px] leading-relaxed text-white/75"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {move.body}
          </p>

          {/* Divider */}
          <div className="mb-5 h-px bg-white/10" />

          {/* Stat + Instagram */}
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/60">
                {move.statLabel}
              </p>
              <p className="font-serif text-[2rem] leading-none text-white">
                {move.statValue}
              </p>
            </div>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow @theapdigital on Instagram"
              className="group inline-flex items-center gap-2 pb-0.5"
            >
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-white/10 transition-colors group-hover:bg-white/20">
                <InstagramGlyph className="h-3.5 w-3.5 text-white" />
              </span>
              <span className="text-xs font-medium text-white/75 transition-colors group-hover:text-white">
                @theapdigital
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroMoveCard;
