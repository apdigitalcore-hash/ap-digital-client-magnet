import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, TrendingUp, Phone, Star } from 'lucide-react';
import IndustriesWeServe from '@/components/IndustriesWeServe';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { getServiceSchema, getBreadcrumbSchema, getWebPageSchema, getFAQSchema, founderSchema } from '@/lib/structuredData';
import JsonLd from '@/components/JsonLd';

const TITLE = 'Social Media Management Rates Vancouver — $849/mo | AP Digital';
const DESC = 'Social media management at $849/month — 2 platforms, 12 posts, captions and community management. See how flat-rate pricing compares to per-post and hourly agency rates. Month-to-month.';
const CANONICAL = 'https://ap-digital.ca/services/social-media';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const included = [
  'Custom content calendar & scheduling',
  'Strategy for the 2 platforms that fit your business',
  'Community management & engagement',
  'Hashtag research & optimization',
  'Monthly reporting on enquiries, saves & profile visits',
  'Brand voice development',
  'Story & Reel planning (you film, we plan & edit captions)',
  'Competitor analysis',
];

const costs = [
  { line: 'Management fee', amount: '$849/month', note: '2 platforms, 12 custom posts, captions, scheduling, community management.' },
  { line: 'Content production', amount: 'You shoot it', note: 'We direct what to capture. Phone footage is genuinely fine.' },
  { line: 'Ad spend', amount: 'Not included', note: 'This is organic. Paid is a separate service at $759/month.' },
  { line: 'Contract', amount: 'Month-to-month', note: "30 days' notice to pause or cancel. No exit fee." },
];

// The four ways Canadian agencies bill. Ours is the first row; the rest are
// what a visitor comparing quotes will have been offered elsewhere.




const faqs = [
  {
    question: 'How much does social media management cost?',
    answer: 'It is $849 per month for two platforms, twelve custom posts, captions, hashtags, scheduling and community management, month-to-month with 30 days notice. That excludes ad spend, which is a separate service at $759 per month. Packages elsewhere typically run $500 to $3,000 depending mainly on whether content production is included — ours is not, which is why it sits where it does.',
  },
  {
    question: 'Should I be doing organic social or paid ads?',
    answer: 'They do different jobs. Paid ads produce leads within about two weeks. Organic compounds over 60 to 90 days and is what convinces someone once an ad has brought them to your profile. If you need bookings this month, start with ads. If your ads are working but your profile undermines them, start here.',
  },
  {
    question: 'Do you guarantee follower growth?',
    answer: 'No, and we would be suspicious of anyone who does. Follower count and booking count are different projects, and buying the first does nothing for the second. We report on enquiries, saves and profile visits, because those are the ones that turn into work.',
  },
  {
    question: 'Which social media platforms should my business be on?',
    answer: 'It depends on your industry and audience, and our service covers two. Instagram suits visual businesses such as salons, detailers and fitness studios. Facebook remains strong for local services and older audiences. LinkedIn suits coaches, consultants and B2B services. TikTok can work for visual businesses with someone willing to be on camera often. We recommend the two where your customers actually spend time.',
  },
  {
    question: 'Can I choose which two platforms you manage?',
    answer: 'Yes. Most clients pick Instagram and Facebook, which share one business account and suit most local service businesses. Coaches and B2B services often choose LinkedIn as one of the two, and visual businesses with someone comfortable on camera sometimes choose TikTok. We give you a recommendation on the call, and you can switch a platform later if it is not working.',
  },
  {
    question: 'Should I hire a social media manager or use an agency?',
    answer: 'It depends on how much you need and who will film. An employee knows the business and can film on site, but comes with a salary, holidays to cover and the risk of starting over when they leave. A freelancer is usually cheaper but varies widely in reliability. A flat-rate agency like ours gives a fixed scope at a fixed price, with you supplying the footage. If you need daily posting on several platforms, an in-house hire is often the better fit.',
  },
  {
    question: 'What happens if I want to stop?',
    answer: 'Give 30 days\' notice and we stop at the end of that period. There is no exit fee. Because we work through business-manager access rather than your passwords, removing our access takes a few clicks, and the posts we published stay on your accounts.',
  },
  {
    question: 'How often will you post on my accounts?',
    answer: 'Twelve custom posts per month across two platforms, which works out to roughly three a week. Consistency matters more than volume — a steady rhythm outperforms a burst of posting followed by three quiet weeks. The calendar is planned a month ahead so you always know what is going out.',
  },
  {
    question: 'Can you manage my social media if I have never posted before?',
    answer: 'Yes. We start with the basics: profile setup, bio, highlights, a content plan and your first month of posts. Expect it to take time; organic content typically compounds over 60 to 90 days rather than producing enquiries in the first weeks.',
  },
  {
    question: 'Do you create the content or do I need to provide it?',
    answer: 'You shoot, we do everything else — direction on what to capture, captions, hashtags, scheduling, publishing and community management. We do not send a videographer, and that is deliberate: footage taken in the moment on a phone often performs better than a scheduled shoot day, because it looks like the feed it appears in. It also keeps the price at $849 rather than the $1,500 to $3,000 that packages with shoot days typically cost.',
  },
  {
    question: 'How do you measure social media success?',
    answer: 'We report on the numbers that connect to business: enquiries and DMs, profile visits, website clicks, saves and shares. Follower count and likes are in the report for context, but they are not the measure of whether the account is working.',
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    founderSchema,
    getServiceSchema('Social Media Marketing', DESC, '/services/social-media', '849', 'MONTH'),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Social Media Marketing', url: '/services/social-media' },
    ]),
    getWebPageSchema(TITLE, DESC, '/services/social-media'),
    getFAQSchema(faqs),
  ]
};

const SocialMedia = () => (
  <>
    <Helmet>
      <title>{TITLE}</title>
      <meta name="description" content={DESC} />
      <link rel="canonical" href={CANONICAL} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={CANONICAL} />
      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={DESC} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_CA" />
      <meta property="og:site_name" content="AP DIGITAL" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={TITLE} />
      <meta name="twitter:description" content={DESC} />
      <meta name="twitter:image" content={OG_IMAGE} />
      <meta name="robots" content="index, follow" />
      
    </Helmet>
      <JsonLd data={structuredData} />
    <Header />
    <main id="main-content" className="pt-24 pb-16">
      <div className="container-custom max-w-4xl">
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8">
          Social Media Management in Vancouver — What It Costs
        </h1>

        {/* Short intro */}
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          Inconsistent posting undermines everything else you do online. You film short clips from your working day; we plan the calendar, write the captions, publish, and answer comments and DMs on two platforms. Combine with <Link to="/services/paid-ads" className="text-teal underline hover:text-teal/80">paid ads</Link> to turn followers into leads. See <Link to="/pricing" className="text-teal underline hover:text-teal/80">pricing</Link> or browse <Link to="/case-studies" className="text-teal underline hover:text-teal/80">how we work</Link>.
        </p>

        {/* 3-column why strip */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="font-bold text-foreground mb-1">Content calendar, handled</p>
            <p className="text-sm text-muted-foreground">We build a monthly content plan aligned with your business goals — no more scrambling for what to post.</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="font-bold text-foreground mb-1">Platform-native content</p>
            <p className="text-sm text-muted-foreground">Formats suited to each of your two platforms, such as Reels and carousels on Instagram or longer posts on Facebook or LinkedIn.</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="font-bold text-foreground mb-1">Community management included</p>
            <p className="text-sm text-muted-foreground">We respond to comments and DMs, so people who reach out get an answer rather than silence.</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <TrendingUp className="w-8 h-8 text-teal mx-auto mb-3" />
            <p className="font-display text-3xl font-bold text-teal mb-2">12</p>
            <p className="text-muted-foreground text-sm">Custom posts per month</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <Phone className="w-8 h-8 text-teal mx-auto mb-3" />
            <p className="font-display text-3xl font-bold text-teal mb-2">30 days</p>
            <p className="text-muted-foreground text-sm">Notice to pause or cancel</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <Star className="w-8 h-8 text-teal mx-auto mb-3" />
            <p className="font-display text-3xl font-bold text-teal mb-2">2</p>
            <p className="text-muted-foreground text-sm">Platforms managed</p>
          </div>
        </div>

        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">What's Included</h2>
        <ul className="grid sm:grid-cols-2 gap-4 mb-16">
          {included.map((item) => (
            <li key={item} className="flex items-start gap-3 text-foreground">
              <CheckCircle className="w-5 h-5 text-teal mt-0.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <IndustriesWeServe />

        {/* ── What it costs ───────────────────────────────────────────── */}
        <section className="mt-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">What Social Media Management Costs</h2>
          <p className="text-muted-foreground mb-6">
            One flat monthly fee, and a clear line about what sits outside it. Packages elsewhere
            run $500 to $3,000 a month, and the variable that moves the price most is whether
            someone comes to you to shoot content.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-3 pr-4 text-sm font-semibold text-foreground">Line item</th>
                  <th className="py-3 pr-4 text-sm font-semibold text-foreground">Amount</th>
                  <th className="py-3 text-sm font-semibold text-foreground">Detail</th>
                </tr>
              </thead>
              <tbody>
                {costs.map((c) => (
                  <tr key={c.line} className="border-b border-border/60">
                    <td className="py-3 pr-4 text-sm text-foreground font-medium whitespace-nowrap">{c.line}</td>
                    <td className="py-3 pr-4 text-sm text-teal font-semibold whitespace-nowrap">{c.amount}</td>
                    <td className="py-3 text-sm text-muted-foreground">{c.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">What 12 Posts a Month on 2 Platforms Realistically Achieves</h2>
          <p className="text-muted-foreground mb-4">
            Twelve posts a month is about three a week. That is enough to keep a profile visibly active, answer the questions a new customer has when they look you up, and build a record of your work over time. It is not enough to go viral, grow a large following quickly or replace advertising, and anyone who tells you otherwise is selling something.
          </p>
          <p className="text-muted-foreground mb-4">
            What it does well is support everything else. Someone who sees your ad, hears about you from a friend or finds you on Google will usually check your Instagram or Facebook before they book. A profile with recent, specific posts showing real work makes that check go your way. A profile that went quiet in March does the opposite.
          </p>
          <p className="text-muted-foreground">
            Results build over months. Organic content typically compounds over 60 to 90 days, so judge the account on whether enquiries, profile visits and saves are trending up across a quarter, not on any single post.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">Which Two Platforms Should You Pick?</h2>
          <p className="text-muted-foreground mb-4">
            Two platforms done consistently beat four done badly. The right pair depends on who your customers are and what you can film.
          </p>
          <h3 className="font-bold text-foreground mt-6 mb-2">Instagram for visual businesses</h3>
          <p className="text-muted-foreground mb-4">
            The default for visual businesses: salons, car detailers, restaurants, fitness studios, real estate. Your work is the content, and before-and-afters do much of the selling. Our <Link to="/salon-marketing" className="text-teal underline hover:text-teal/80">salon marketing</Link> and <Link to="/car-detailing-marketing" className="text-teal underline hover:text-teal/80">car detailing marketing</Link> pages cover how that works for those businesses.
          </p>
          <h3 className="font-bold text-foreground mt-6 mb-2">Facebook for local audiences</h3>
          <p className="text-muted-foreground mb-4">
            Still where many local customers and older audiences are, and where community groups and reviews live. Usually paired with Instagram, since the two share one business account.
          </p>
          <h3 className="font-bold text-foreground mt-6 mb-2">LinkedIn for coaches and B2B</h3>
          <p className="text-muted-foreground mb-4">
            For coaches, consultants and B2B services, where the buyer is a professional and the content is your thinking rather than your work. See <Link to="/coaching-marketing" className="text-teal underline hover:text-teal/80">coaching marketing</Link>.
          </p>
          <h3 className="font-bold text-foreground mt-6 mb-2">TikTok, if someone will be on camera</h3>
          <p className="text-muted-foreground">
            Can reach people outside your existing followers, but it rewards frequent, personality-led video. It only makes sense if someone in the business is comfortable on camera regularly.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">Organic Social vs. Paid Ads: Two Different Jobs</h2>
          <p className="text-muted-foreground mb-4">
            Organic social and paid ads use the same apps, which is why they get confused. They do different jobs. Paid ads put an offer in front of people who have never heard of you, on a budget you control, and most clients see their first qualified leads within two weeks. Organic content is what those people find when they look you up, and it keeps you in front of past customers and followers.
          </p>
          <p className="text-muted-foreground">
            A business that needs new enquiries this month should usually start with ads. A business whose ads work but whose profile undermines them, or one that relies on referrals and repeat customers, should usually start with organic. Many need both eventually; the order matters more than doing everything at once. Our <Link to="/services/paid-ads" className="text-teal underline hover:text-teal/80">paid ads management</Link> is $759 a month plus ad spend.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">Why Follower Count Is the Wrong Metric</h2>
          <p className="text-muted-foreground mb-4">
            Followers are easy to buy and easy to inflate, and neither helps a local business. A thousand followers in another country do nothing for a salon in Burnaby. Even real followers mostly do not see each post.
          </p>
          <p className="text-muted-foreground">
            The numbers that connect to business are the ones closer to a booking: DMs and enquiries, profile visits, website and booking-link clicks, saves and shares. Those are what our monthly report leads with. Follower count is in there for context, but it is not how we judge whether the account is working.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">When Social Media Is Not the Right Spend</h2>
          <p className="text-muted-foreground mb-4">
            We would rather say this on the call than after you have paid for three months. Organic social is the wrong first spend if you need new customers this month, since ads are faster. It is the wrong spend if nobody in the business can supply footage, because a feed of stock images and generic tips does more harm than good. And it may be the wrong spend if your customers simply are not on social media, which is true for some B2B and trade businesses where Google search and referrals do the work.
          </p>
          <p className="text-muted-foreground">
            In those cases we will tell you, and point you to what makes more sense. Ready to talk it through? <Link to="/book" className="text-teal underline hover:text-teal/80">Book a free 20-minute call</Link>.
          </p>
        </section>


        <section className="mt-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">Flat Rate vs. Per Post vs. Hourly vs. In-House</h2>
          <p className="text-muted-foreground mb-4">
            Canadian businesses pay for social media in four main ways, and the model changes what you are actually buying. We use a flat retainer. Here is each option with its trade-offs stated honestly, including where ours is not the best fit.
          </p>
          <h3 className="font-bold text-foreground mt-6 mb-2">Flat monthly retainer</h3>
          <p className="text-muted-foreground mb-4">
            Typically $500 to $5,000 a month across the market, depending mostly on whether content production is included. Ours is $849 for two platforms and 12 posts, without shoot days. The strength is predictability and aligned incentives: we do not earn more by posting more or working slower. The weakness is a fixed scope; if you need daily posting on four platforms, a $849 retainer is the wrong product.
          </p>
          <h3 className="font-bold text-foreground mt-6 mb-2">Paying by the post</h3>
          <p className="text-muted-foreground mb-4">
            Typically $50 to $250 a post. It looks cheap until you do the arithmetic: 12 posts at $150 is $1,800, usually with no strategy, community management or reporting attached. It suits a business that only needs occasional design work.
          </p>
          <h3 className="font-bold text-foreground mt-6 mb-2">Paying by the hour</h3>
          <p className="text-muted-foreground mb-4">
            Typically $75 to $200 an hour. You pay more when the work takes longer, which is fine for a one-off audit or a profile clean-up and poor value for ongoing posting.
          </p>
          <h3 className="font-bold text-foreground mt-6 mb-2">Hiring someone in-house</h3>
          <p className="text-muted-foreground mb-4">
            Hiring someone, or giving the job to an existing staff member. You get a person who knows the business and is on site to film, which is a real advantage. You also take on a salary or their time, cover for holidays and turnover, and a single point of failure when they leave. For many small businesses the honest comparison is not agency versus employee but agency versus the owner posting when they remember to.
          </p>
          <p className="text-muted-foreground">
            We charge a flat $849 a month because it is the model where our incentive and yours point the same way. For the full market survey with rates from every tier, see our <Link to="/blog/how-much-does-social-media-marketing-cost-canada" className="text-teal underline hover:text-teal/80">guide to social media marketing costs in Canada</Link>.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">What Is and Is Not Included</h2>
          <p className="text-muted-foreground mb-4">
            Most social media quotes are hard to compare because nobody lists the second column.
          </p>
          <h3 className="font-bold text-foreground mt-6 mb-2">Included in $849 a month</h3>
          <p className="text-muted-foreground mb-4">
            A content calendar planned a month ahead. Twelve custom posts a month across two platforms, with captions and hashtags written for each post rather than templated. Scheduling and publishing. Community management, meaning comments and DMs answered. Monthly reporting on enquiries and profile activity, not just reach.
          </p>
          <h3 className="font-bold text-foreground mt-6 mb-2">Not included in the fee</h3>
          <p className="text-muted-foreground">
            Shoot days with a videographer on site. Stock footage standing in for your actual work. Paid ad management, which is our separate <Link to="/services/paid-ads" className="text-teal underline hover:text-teal/80">paid ads service</Link> at $759 a month. Follower-count guarantees. Reputation management or review removal. And more than two platforms; if you need three or four, this is not the right package.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">What You Supply and What We Produce</h2>
          <p className="text-muted-foreground mb-4">
            The split is deliberate, and it is the main reason the price is $849 rather than the cost of a package with shoot days.
          </p>
          <h3 className="font-bold text-foreground mt-6 mb-2">You supply raw footage from your day</h3>
          <p className="text-muted-foreground mb-4">
            Before-and-afters, work in progress, the finished result, a quick word to camera. Filmed on a phone, in the moment, a few minutes at a time. We tell you what to capture each month. This is the single biggest factor in whether the account works, because nobody else can film your work.
          </p>
          <h3 className="font-bold text-foreground mt-6 mb-2">You supply one person who can answer a question</h3>
          <p className="text-muted-foreground mb-4">
            Captions need a fact-check now and then: a price, a service name, whether an offer is still running.
          </p>
          <h3 className="font-bold text-foreground mt-6 mb-2">You supply access, not passwords</h3>
          <p className="text-muted-foreground mb-4">
            We work through business-manager access rather than asking for your passwords, and you can revoke that access at any time.
          </p>
          <h3 className="font-bold text-foreground mt-6 mb-2">We produce everything else</h3>
          <p className="text-muted-foreground">
            The monthly plan, the selection and light editing of your clips, captions, hashtags, scheduling, publishing, replies to comments and DMs, and the monthly report.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">What Organic Social Will Not Do</h2>
          <p className="text-muted-foreground mb-4">
            Worth knowing before you pay anyone for it, including us.
          </p>
          <h3 className="font-bold text-foreground mt-6 mb-2">It rarely brings much new reach on its own</h3>
          <p className="text-muted-foreground mb-4">
            Instagram and Facebook show your posts to a fraction of your followers, and your followers are largely people who already know you. New customers mostly arrive through ads, referrals or search; organic content is what convinces them once they check you out.
          </p>
          <h3 className="font-bold text-foreground mt-6 mb-2">It compounds slowly</h3>
          <p className="text-muted-foreground mb-4">
            Organic content compounds over 60 to 90 days rather than producing enquiries in week two. If you need bookings this month, paid ads are the honest answer, and we will tell you so.
          </p>
          <h3 className="font-bold text-foreground mt-6 mb-2">A dormant account is worse than none</h3>
          <p className="text-muted-foreground mb-4">
            If posting stops, a months-old last post reads as a business that may have closed. That is why consistency matters more than volume.
          </p>
          <p className="text-sm text-muted-foreground mt-6">
            If leads this month are the priority, our 
            <Link to="/services/paid-ads" className="text-teal underline hover:text-teal/80">paid ads service</Link> 
            is the honest starting point, and we will say so on the call.
          </p>
        </section>

        <section className="mt-16 mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-left text-foreground font-medium">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <div className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">Cities We Serve</h2>
          <p className="text-muted-foreground mb-6">We provide social media marketing for businesses across Metro Vancouver and the Fraser Valley.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { city: 'Vancouver', href: '/vancouver' },
              { city: 'Surrey', href: '/surrey' },
              { city: 'Burnaby', href: '/burnaby' },
              { city: 'Richmond', href: '/richmond' },
              { city: 'Langley', href: '/langley' },
              { city: 'Coquitlam', href: '/coquitlam' },
              { city: 'Abbotsford', href: '/abbotsford' },
            ].map(({ city, href }) => (
              <Link key={href} to={href} className="bg-muted rounded-xl p-4 text-center hover:bg-muted/80 transition-colors">
                <span className="font-medium text-foreground">{city}</span>
              </Link>
            ))}
          </div>
        </div>

        <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 md:p-12 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground text-lg mb-8">Book a free 20-minute call and we will tell you honestly whether organic social, paid ads or neither is the right spend for you now.</p>
          <Button asChild size="lg" className="bg-teal hover:bg-teal/90 text-white">
            <Link to="/book">Book Your Free Strategy Call</Link>
          </Button>
        </section>
      </div>
    </main>
    <Footer />
  </>
);

export default SocialMedia;
