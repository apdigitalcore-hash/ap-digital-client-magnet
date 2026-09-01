// HomePage - Main landing page for AP DIGITAL - Performance Marketing Agency
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Target, Users, TrendingUp, ChevronRight, CalendarDays, ShieldCheck, Clock, PlayCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

import SectionLabel from '@/components/light/SectionLabel';
import ProcessLight from '@/components/light/ProcessLight';
import ServicesLight from '@/components/light/ServicesLight';
import FaqLight from '@/components/light/FaqLight';
import PastelCTA from '@/components/light/PastelCTA';
// HeroObject (the sphere) is still exported from HeroShowcase; swapping it back
// in here is a one-line change if the photograph does not earn its place.
import { HeroSkyline, HeroScrim } from '@/components/light/HeroShowcase';
import HeroMoveCard from '@/components/HeroMoveCard';
import WhileYouScroll from '@/components/WhileYouScroll';

import { lazy, Suspense } from 'react';
const SocialMediaBudgetCalculator = lazy(() => import('@/components/SocialMediaBudgetCalculator'));

import { organizationSchema, getWebSiteSchema, getWebPageSchema, getBreadcrumbSchema, getFAQSchema, founderSchema } from '@/lib/structuredData';
import JsonLd from '@/components/JsonLd';

const TITLE = 'Vancouver Performance Marketing Agency | AP Digital';
const DESC = 'Vancouver marketing agency for salons, trades, realtors & coaches. Meta & Google Ads that deliver predictable leads. Month-to-month, 90-day guarantee.';
const CANONICAL = 'https://ap-digital.ca/';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const homepageFAQs = [
  {
    question: "How much does AP Digital charge for marketing?",
    answer: "Our paid ads management starts at $759/month and social media management starts at $849/month. No long-term contracts — everything is month-to-month with a 90-day results guarantee."
  },
  {
    question: "What industries does AP Digital work with?",
    answer: "We specialize in service businesses across British Columbia including salons, real estate agents, trades (plumbing, HVAC, electrical), and coaches. Our strategies are tailored to each industry's unique lead generation needs."
  },
  {
    question: "How quickly will I see results from paid ads?",
    answer: "Most clients see their first leads within the first 2 weeks of campaign launch. We offer a 90-day guarantee — if you don't see measurable results, you don't pay."
  },
  {
    question: "What areas does AP Digital serve?",
    answer: "We're based in Vancouver, BC and serve businesses across Metro Vancouver and the Fraser Valley including Surrey, Burnaby, Richmond, Langley, Coquitlam, Abbotsford, and North Vancouver."
  },
  {
    question: "Do I need a long-term contract?",
    answer: "No. All our services are month-to-month with no long-term contracts. We believe in earning your business every month through results, not locking you into agreements."
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    organizationSchema,
    founderSchema,
    getWebSiteSchema(),
    getWebPageSchema(TITLE, DESC, '/'),
    getBreadcrumbSchema([{ name: 'Home', url: '/' }]),
    getFAQSchema(homepageFAQs),
  ]
};

const differentiators = [
  {
    icon: Zap,
    title: 'No Long-Term Contracts',
    description: 'Month-to-month flexibility.',
  },
  {
    icon: Target,
    title: 'Results-Focused',
    description: 'We track leads, not vanity metrics.',
  },
  {
    icon: Users,
    title: 'Niche Expertise',
    description: 'Built for service businesses.',
  },
  {
    icon: TrendingUp,
    title: 'Proven Systems',
    description: 'Battle-tested strategies.',
  },
];


const HomePage = () => {
  return (
    <main id="main-content" className="min-h-screen bg-background">
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <meta name="keywords" content="digital marketing agency Vancouver, performance marketing agency Vancouver BC, Meta Ads agency Vancouver, Google Ads agency BC, lead generation Vancouver BC, social media marketing agency BC, Facebook ads agency Vancouver, Instagram marketing BC, paid advertising agency Lower Mainland, digital marketing for small businesses Canada, marketing agency for salons Vancouver, real estate marketing BC, trades marketing Vancouver, coaching marketing BC, SEO agency Vancouver, marketing agency Surrey, marketing agency Burnaby, marketing agency Langley, marketing agency Coquitlam, marketing agency Richmond BC, marketing agency North Vancouver, marketing agency Abbotsford, content creation agency BC, conversion rate optimization Vancouver" />
        <link rel="canonical" href={CANONICAL} />
        <link rel="alternate" hrefLang="en-CA" href={CANONICAL} />
        <link rel="alternate" hrefLang="x-default" href={CANONICAL} />
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

      {/* ─────────────────── HERO ─────────────────── */}
      {/* The photograph is the hero, not a band beneath it. Copy sits on the
          pale left of the frame, over a scrim that guarantees contrast.

          MOBILE HEIGHT IS DRIVEN BY CONTENT AND vw — NEVER vh/svh/dvh.
          Mobile browsers change the viewport height as the URL bar hides and
          shows, so any vh-family height makes the full-bleed photograph resize
          mid-scroll, visibly. HeroShowcase carries the same note from an
          earlier round on the sphere: vh was tried, then svh, and both still
          resized on a real phone.

          A fixed vw multiple does not work either. The plate is bottom-anchored,
          so the skyline lands at (sectionHeight - 0.717 x width). Narrow phones
          wrap the headline onto more lines, so the copy ends LOWER while a
          ratio-based height gets SHORTER — at 170vw the copy cleared the
          skyline by 41px at 430px wide and collided with it by 134px at 375px.

          So the section takes its height from the content, and the copy reserves
          the photograph underneath it: 72vw covers the 0.717 x width offset and
          the +40px is the gap. That holds the same gap at every phone width, and
          contains no unit the URL bar can change. Desktop keeps svh — no URL
          bar, no problem. */}
      <section className="texture-rules relative isolate flex items-start sm:items-center overflow-hidden bg-[#E4E7EB] sm:min-h-[92svh] lg:min-h-[100svh]">
        <HeroSkyline />
        <HeroScrim />

        <div className="relative z-10 w-full container-custom pt-20 pb-[calc(72vw+40px)] sm:pt-32 sm:pb-16 lg:py-24">
          <div className="max-w-[620px] text-left">

            <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-muted-foreground mb-5 sm:mb-6">
              Performance Marketing — Vancouver, BC
            </p>

            <h1 className="font-serif text-[2.4rem] sm:text-6xl lg:text-[4.5rem] font-medium text-foreground leading-[1.05] tracking-tight mb-5 sm:mb-6">
              Vancouver{' '}
              <span className="italic">Performance</span>{' '}
              <span className="whitespace-nowrap">Marketing Agency</span>
            </h1>

            <p className="text-[15px] sm:text-lg text-foreground/70 max-w-[500px] mb-7 sm:mb-9 leading-relaxed">
              We run your ads, create your content, and deliver real leads — guaranteed results in 90 days or you don't pay.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
              <Link to="/book" className="inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-background transition-colors hover:bg-foreground/85">
                Book a Call
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-3 text-foreground/70 hover:text-foreground transition-colors"
              >
                <PlayCircle className="w-6 h-6" strokeWidth={1.5} />
                <span className="text-xs font-semibold tracking-[0.18em] uppercase">How It Works</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────── TRUST BAR ─────────────────── */}
      {/* These lived in the hero and spent the evening fighting the photograph
          for contrast — over the buildings on desktop, over Canada Place on
          mobile. On the white below it there is nothing behind them, so they
          read at every size without a scrim propping them up. */}
      <section className="bg-white border-b border-foreground/[0.07]">
        <div className="container-custom py-6 sm:py-7">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:gap-x-12 text-foreground/70">
            {[
              { icon: CalendarDays, label: 'Month-to-Month' },
              { icon: ShieldCheck, label: 'No Contracts' },
              { icon: Clock, label: '90-Day Guarantee' },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-2.5">
                <Icon className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase">{label}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── TODAY'S MOVE ─────────────────── */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container-custom">
          {/* Grey panel holds the whole section, so the dark card sits on grey
              on white — three layers of depth instead of a card floating alone. */}
          <div className="mx-auto max-w-4xl rounded-[2.25rem] bg-[#EDEFF2] px-6 py-14 sm:px-12 sm:py-16">
            <div className="text-center mb-12">
              <SectionLabel label="Daily Insight" />
              <h2 className="mt-6 font-serif text-4xl sm:text-5xl font-medium leading-[1.05] tracking-tight text-foreground">
                Today's <span className="italic">Move</span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground">
                One actionable marketing insight, every single day.
              </p>
            </div>
            <div className="mx-auto max-w-[480px]">
              <HeroMoveCard />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────── INDUSTRIES ─────────────────── */}
      <section className="py-24 md:py-32 bg-[#EDEFF2]">
        <div className="container-custom">
          <div className="text-center mb-14">
            <SectionLabel label="Industries" />
            <h2 className="mt-6 font-serif text-4xl sm:text-5xl md:text-6xl font-medium leading-[1.05] tracking-tight text-foreground">
              Built for your <span className="italic">industry.</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-5 max-w-3xl mx-auto">
            {[
              { to: '/salon-marketing', name: 'Salons', tagline: 'Full bookings in 30 days' },
              { to: '/real-estate-marketing', name: 'Real Estate', tagline: '15–30 qualified leads per month' },
              { to: '/trades-marketing', name: 'Trades', tagline: 'Stop relying on word-of-mouth' },
              { to: '/coaching-marketing', name: 'Coaching', tagline: 'Calendar filled with ideal clients' },
            ].map(({ to, name, tagline }) => (
              <Link
                key={to}
                to={to}
                className="group reveal-card relative aspect-square rounded-3xl bg-white elev-2 hover:elev-3 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center overflow-hidden"
              >
                {/* Dark wash sweeps up on hover — the card becomes the anchor. */}
                <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
                <h3 className="relative z-10 font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-foreground reveal-ink tracking-tight text-center px-4">
                  {name}
                </h3>
                <p className="reveal-fade relative z-10 text-sm text-white/60 font-medium mt-3 text-center px-6 max-w-[220px] leading-snug">
                  {tagline}
                </p>
                <span className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0">
                  <ChevronRight className="w-4 h-4 text-white/70" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-white">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <Suspense fallback={null}>
              <SocialMediaBudgetCalculator />
            </Suspense>
          </div>
        </div>
      </section>

      <ProcessLight />
      <ServicesLight />

      {/* ─────────────────── WHY CHOOSE US ─────────────────── */}
      <section className="py-24 md:py-32 bg-[#EDEFF2]">
        <div className="container-custom">
          <div className="text-center mb-14">
            <SectionLabel label="Why Us" />
            <h2 className="mt-6 font-serif text-4xl sm:text-5xl md:text-6xl font-medium leading-[1.05] tracking-tight text-foreground">
              Why <span className="italic">Choose</span> Us
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground">
              No fluff. No buzzwords. Just results.
            </p>
          </div>

          {/* Same dark-wash reveal as the industry tiles. */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {differentiators.map((item) => (
              <div
                key={item.title}
                className="group reveal-card relative overflow-hidden rounded-3xl bg-white elev-2 hover:elev-3 hover:-translate-y-1 transition-all duration-300 p-6 sm:p-8"
              >
                <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />

                <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl mb-5 bg-[#EDEFF2] reveal-chip">
                  <item.icon
                    className="w-5 h-5 text-foreground reveal-ink"
                    strokeWidth={1.5}
                  />
                </span>
                <h3 className="relative z-10 font-serif text-lg sm:text-xl font-medium mb-2 leading-tight text-foreground reveal-ink">
                  {item.title}
                </h3>
                <p className="relative z-10 text-sm leading-relaxed text-muted-foreground reveal-body">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── CITIES ─────────────────── */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <SectionLabel label="Locations" />
            <h2 className="mt-6 font-serif text-4xl sm:text-5xl md:text-6xl font-medium leading-[1.05] tracking-tight text-foreground">
              Cities We <span className="italic">Serve</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground">
              Based in the Lower Mainland, we serve local businesses across Metro Vancouver and the Fraser Valley.
            </p>
          </div>
          {/* Vancouver leads as a wide dark tile; the rest are light rows that
              slide to dark on hover. Breaks the eight-identical-boxes grid. */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { city: 'Vancouver', href: '/vancouver', sub: 'Metro Vancouver', pop: 'HQ', feature: true },
              { city: 'Surrey', href: '/surrey', sub: 'South Fraser', pop: '02' },
              { city: 'Burnaby', href: '/burnaby', sub: 'Metro Vancouver', pop: '03' },
              { city: 'Richmond', href: '/richmond', sub: 'Metro Vancouver', pop: '04' },
              { city: 'North Vancouver', href: '/contact', sub: 'North Shore', pop: '05' },
              { city: 'Coquitlam', href: '/coquitlam', sub: 'Tri-Cities', pop: '06' },
              { city: 'Langley', href: '/langley', sub: 'Fraser Valley', pop: '07' },
              { city: 'Abbotsford', href: '/abbotsford', sub: 'Fraser Valley', pop: '08' },
            ].map(({ city, href, sub, pop, feature }) =>
              feature ? (
                <Link
                  key={city}
                  to={href}
                  className="group relative overflow-hidden rounded-3xl bg-[#0C0E11] elev-3 p-7 sm:col-span-2 sm:p-9 lg:col-span-2 lg:row-span-2"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        'radial-gradient(70% 90% at 84% 0%, hsl(0 0% 100% / 0.16) 0%, transparent 66%)',
                    }}
                  />
                  <div className="relative flex h-full items-end justify-between gap-6">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">
                        {pop} · {sub}
                      </span>
                      <p className="mt-3 font-serif text-3xl font-medium text-white sm:text-4xl">
                        {city}
                      </p>
                      <p className="mt-2 text-sm text-white/50">
                        Where we're based — and where most of our clients are.
                      </p>
                    </div>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#0C0E11] transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ) : (
                <Link
                  key={city}
                  to={href}
                  className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl bg-white elev-1 hover:elev-2 px-6 py-5 transition-all duration-300"
                >
                  <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
                  <span className="relative z-10">
                    <span className="block font-serif text-lg font-medium text-foreground reveal-ink sm:text-xl">
                      {city}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted-foreground reveal-ink/55">
                      {sub}
                    </span>
                  </span>
                  <span className="relative z-10 text-[10px] font-semibold tracking-[0.18em] text-foreground/25 reveal-ink/40">
                    {pop}
                  </span>
                </Link>
              )
            )}
          </div>
        </div>
      </section>

      <WhileYouScroll />

      <FaqLight faqs={homepageFAQs} />

      <PastelCTA
        headline="Ready to Get Predictable Leads?"
        subheadline="Book a free strategy call and see exactly how we can grow your leads and revenue."
      />

      <Footer />
    </main>
  );
};

export default HomePage;
