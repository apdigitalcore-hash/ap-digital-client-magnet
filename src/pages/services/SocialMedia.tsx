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

const TITLE = 'Social Media Marketing Agency Vancouver | AP Digital';
const DESC = 'AP Digital manages social media for Vancouver salons, trades & real estate professionals. Short-form content & organic growth.';
const CANONICAL = 'https://ap-digital.ca/services/social-media';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const included = [
  'Custom content calendar & scheduling',
  'Platform-specific strategy (Instagram, Facebook, TikTok)',
  'Community management & engagement',
  'Hashtag research & optimization',
  'Monthly analytics & growth reports',
  'Brand voice development',
  'Story & Reel strategy',
  'Competitor analysis',
];

const costs = [
  { line: 'Management fee', amount: '$849/month', note: '2 platforms, 12 custom posts, captions, scheduling, community management.' },
  { line: 'Content production', amount: 'You shoot it', note: 'We direct what to capture. Phone footage is genuinely fine.' },
  { line: 'Ad spend', amount: 'Not included', note: 'This is organic. Paid is a separate service at $759/month.' },
  { line: 'Contract', amount: 'Month-to-month', note: "30 days' notice to pause or cancel. No exit fee." },
];

const scope = [
  { yes: 'A content calendar planned a month ahead', no: 'Shoot days with a videographer on site' },
  { yes: 'Captions and hashtags written per post, not templated', no: 'Stock footage standing in for your actual work' },
  { yes: 'Scheduling and publishing across two platforms', no: 'Paid ad management (that is a separate line)' },
  { yes: 'Community management — comments and DMs answered', no: 'Follower-count guarantees' },
  { yes: 'Monthly reporting on enquiries, not just reach', no: 'Reputation management or review removal' },
];

const whatWeNeed = [
  { thing: 'Raw footage from your day', detail: 'Before-and-afters, work in progress, the finished result. Filmed on a phone, in the moment. This is the single biggest predictor of whether the account works.' },
  { thing: 'One person who can answer a question', detail: 'Captions need a fact-check occasionally — a price, a service name, whether something is still offered.' },
  { thing: 'Access, not passwords', detail: 'You keep ownership of every account. We work through business-manager access you can revoke at any time.' },
];

const honestLimits = [
  'Organic social does not deliver new reach the way it did. Instagram shows your posts to a fraction of your followers, and your followers are largely people who already know you. New customers come from ads; organic is what convinces them once they check you out.',
  'It compounds over 60 to 90 days rather than producing leads in week two. If you need bookings this month, paid ads are the honest answer and we will tell you so.',
  'A dormant account is worse than no account. If posting stops, the stale last post reads as a business that may have closed — which is why consistency matters more than volume.',
];

const faqs = [
  {
    question: 'How much does social media management cost?',
    answer: 'It is $849 per month for two platforms, twelve custom posts, captions, hashtags, scheduling and community management, month-to-month with 30 days notice. That excludes ad spend, which is a separate service at $759 per month. Packages elsewhere run $500 to $3,000 depending mainly on whether content production is included — ours is not, which is why it sits where it does.',
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
    answer: 'It depends on your industry and target audience. Instagram and TikTok work best for visual businesses like salons, med spas, and fitness studios. Facebook and Instagram are ideal for trades and home services. LinkedIn is the go-to for coaches, consultants, and B2B service providers. We analyze your market and recommend the platforms where your ideal customers actually spend their time.',
  },
  {
    question: 'How often will you post on my accounts?',
    answer: 'Twelve custom posts per month across two platforms, which works out to roughly three a week. Consistency matters more than volume — a steady rhythm outperforms a burst of posting followed by three quiet weeks. The calendar is planned a month ahead so you always know what is going out.',
  },
  {
    question: 'Can you manage my social media if I have never posted before?',
    answer: 'Absolutely. We start from scratch — profile setup, branding, bio optimization, content strategy, and your first month of posts. Many of our best-performing clients came to us with zero social media presence and now have thriving accounts that generate real business.',
  },
  {
    question: 'Do you create the content or do I need to provide it?',
    answer: 'You shoot, we do everything else — direction on what to capture, captions, hashtags, scheduling, publishing and community management. We do not send a videographer, and that is deliberate: footage taken in the moment on a phone consistently outperforms a scheduled shoot day, because it looks like the feed it appears in. It also keeps the price at $849 rather than the $1,500 to $3,000 that packages with shoot days cost.',
  },
  {
    question: 'How do you measure social media success?',
    answer: 'We track metrics that matter for your business: engagement rate, follower growth, direct messages and inquiries, website clicks, and lead conversions. We do not focus on vanity metrics like random likes — every report ties social performance back to real business outcomes.',
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
          Social Media Marketing Agency Vancouver
        </h1>

        {/* Short intro */}
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          Inconsistent posting kills reach. We plan, create, and publish your content every week so your brand stays top of mind — without you lifting a finger. Combine with <Link to="/services/paid-ads" className="text-teal underline hover:text-teal/80">paid ads</Link> to turn followers into leads. See <Link to="/pricing" className="text-teal underline hover:text-teal/80">pricing</Link> or browse <Link to="/case-studies" className="text-teal underline hover:text-teal/80">how we work</Link>.
        </p>

        {/* 3-column why strip */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="font-bold text-foreground mb-1">Content calendar, handled</p>
            <p className="text-sm text-muted-foreground">We build a monthly content plan aligned with your business goals — no more scrambling for what to post.</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="font-bold text-foreground mb-1">Platform-native content</p>
            <p className="text-sm text-muted-foreground">Different formats for each platform — Reels for Instagram, carousels for LinkedIn, short-form for TikTok. Everything optimized.</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="font-bold text-foreground mb-1">Community management included</p>
            <p className="text-sm text-muted-foreground">We respond to comments and DMs so every follower interaction builds trust and keeps the algorithm happy.</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <TrendingUp className="w-8 h-8 text-teal mx-auto mb-3" />
            <p className="font-display text-3xl font-bold text-teal mb-2">3x</p>
            <p className="text-muted-foreground text-sm">Average engagement increase</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <Phone className="w-8 h-8 text-teal mx-auto mb-3" />
            <p className="font-display text-3xl font-bold text-teal mb-2">30 days</p>
            <p className="text-muted-foreground text-sm">To see measurable growth</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <Star className="w-8 h-8 text-teal mx-auto mb-3" />
            <p className="font-display text-3xl font-bold text-teal mb-2">4+</p>
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
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">What It Costs</h2>
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

        {/* ── Scope, both directions ──────────────────────────────────── */}
        <section className="mt-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">What Is and Is Not Included</h2>
          <p className="text-muted-foreground mb-6">
            Most social media quotes are hard to compare because nobody lists the second column.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-3 pr-4 text-sm font-semibold text-foreground">Included</th>
                  <th className="py-3 text-sm font-semibold text-foreground">Not included</th>
                </tr>
              </thead>
              <tbody>
                {scope.map((row) => (
                  <tr key={row.yes} className="border-b border-border/60">
                    <td className="py-3 pr-4 text-sm text-foreground">{row.yes}</td>
                    <td className="py-3 text-sm text-muted-foreground">{row.no}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── What we need from you ───────────────────────────────────── */}
        <section className="mt-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">What We Need From You</h2>
          <p className="text-muted-foreground mb-6">
            Three things, and only the first one takes any real effort.
          </p>
          <div className="space-y-4">
            {whatWeNeed.map((n) => (
              <div key={n.thing} className="bg-card border border-border rounded-xl p-5">
                <p className="font-bold text-foreground mb-1">{n.thing}</p>
                <p className="text-sm text-muted-foreground">{n.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Honest limits ───────────────────────────────────────────── */}
        <section className="mt-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">What Organic Social Will Not Do</h2>
          <p className="text-muted-foreground mb-6">
            Worth knowing before you pay anyone for it, including us.
          </p>
          <ul className="space-y-3">
            {honestLimits.map((l) => (
              <li key={l} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span aria-hidden="true" className="mt-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/50 shrink-0" />
                {l}
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground mt-6">
            If leads this month are the priority, our{' '}
            <Link to="/services/paid-ads" className="text-teal underline hover:text-teal/80">paid ads service</Link>{' '}
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
          <p className="text-muted-foreground text-lg mb-8">Book your free strategy call and let us build a social media engine that grows your business.</p>
          <Button asChild size="lg" className="bg-teal hover:bg-teal/90 text-white">
            <a href="https://calendly.com/apdigital-core/20min" target="_blank" rel="noopener noreferrer">Book Your Free Strategy Call</a>
          </Button>
        </section>
      </div>
    </main>
    <Footer />
  </>
);

export default SocialMedia;
