import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Check, X } from 'lucide-react';

import JsonLd from '@/components/JsonLd';
import SectionLabel from '@/components/light/SectionLabel';
import FaqLight from '@/components/light/FaqLight';
import {
  organizationSchema,
  founderSchema,
  getWebPageSchema,
  getBreadcrumbSchema,
  getFAQSchema,
} from '@/lib/structuredData';
import { CONTACT, PAID_ADS } from '@/lib/companyFacts';

const CANONICAL = 'https://ap-digital.ca/free-pilot';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';
const DESC =
  'We run your Meta ads free for 14 days. You pay the ad budget directly to Meta. We charge nothing. A few spots available this month.';

/**
 * One page serves every vertical: `?for=roofing` swaps the industry word.
 * Whitelisted only — an unknown or hostile param falls back to generic
 * wording rather than rendering whatever was in the URL.
 */
const NICHE_MAP: Record<string, string> = {
  roofing: 'roofing', hvac: 'HVAC', plumbing: 'plumbing', electrical: 'electrical',
  landscaping: 'landscaping', cleaning: 'cleaning', painting: 'painting',
  flooring: 'flooring', renovation: 'renovation', restoration: 'restoration',
  windows: 'window', gutters: 'gutter', paving: 'paving', fencing: 'fencing',
  pestcontrol: 'pest control', junkremoval: 'junk removal', moving: 'moving',
  dental: 'dental', medspa: 'med spa', fitness: 'gym', salon: 'salon',
  realestate: 'real estate', law: 'law firm', restaurant: 'restaurant',
};

const TERMS = [
  { value: '$0', label: 'Paid to us during the pilot' },
  { value: '14 days', label: 'Then you decide, no obligation' },
  { value: 'Your card', label: 'Ad budget never touches our account' },
];

const TIMELINE = [
  {
    day: 'Day 1',
    title: 'Access and setup',
    body: 'You give us partner access to your Meta account. Takes about 10 minutes. Your billing stays yours.',
  },
  {
    day: 'Day 2',
    title: 'Build',
    body: 'We write the ads, build the creative, and set up a landing page and lead form for you.',
  },
  {
    day: 'Day 3',
    title: 'Live',
    body: 'Campaign launches. You set the daily budget, even $30 a day is enough to learn from.',
  },
  {
    day: 'Day 14',
    title: 'Results',
    body: 'We walk you through cost per lead and what came in. Then you decide whether to continue.',
  },
];

const INCLUDED = [
  'Campaign strategy and full build',
  'Ad copy and creative production',
  'Landing page and lead capture form',
  'Conversion tracking properly installed',
  'Daily monitoring and optimization',
  'A walkthrough of the numbers at day 14',
];

const NOT_INCLUDED = [
  'Your ad budget. That goes to Meta directly and stays under your control',
  "A guarantee on lead volume. It's 14 days, we're being honest about what that proves",
  'Answering your phone. Leads come to you and your team books them',
  'Any obligation at all after day 14',
];

const FAQS = [
  {
    question: "What's the catch?",
    answer:
      "There isn't one, but there is a reason. We need case studies to sell to other businesses like yours. You're getting free work because your results are worth something to us. If it goes well we'll ask you to continue as a paying client, and you're completely free to say no.",
  },
  {
    question: 'How much do I need to spend on ads?',
    answer:
      "Whatever you're comfortable with. $30 a day for the 14 days is enough to get real data. More gets you cleaner numbers faster. It goes to Meta on your card, we never touch it, and you can pause it at any moment from your own account.",
  },
  {
    question: 'Have you worked in my industry before?',
    answer:
      "We've run paid campaigns for home services and local businesses, and we're deliberately building out deeper case studies vertical by vertical. If we already had a shelf of results in your exact trade we'd be charging you instead of doing this for free. That's the honest version.",
  },
  {
    question: 'What happens to my ad account afterward?',
    answer:
      'It\'s yours and it always was. We work through partner access, which you can revoke with two clicks. Everything we build, the campaigns, the creative, the landing page, stays in your account whether you continue with us or not.',
  },
  {
    question: 'What does it cost if I want to continue?',
    answer: `Paid ads management starts at ${PAID_ADS.price} a month, month to month, no long contracts. We'd go through the numbers at day 14 and you'd decide from there. Plenty of people take the 14 days and stop, and that's a legitimate outcome.`,
  },
  {
    question: 'Why only a few companies?',
    answer:
      "Because we're doing this work for free and our time is the limit. We take on a small number at a time so none of them gets a worse job than a paying client would get.",
  },
  {
    question: 'Am I going to get spammed forever if I book a call?',
    answer:
      "No. It's a 15 minute call, and if we don't think we can help you we'll say so on the call rather than pitching you anyway.",
  },
];

/**
 * This page runs its own header and footer instead of the site's.
 *
 * The copy is deliberately geo-neutral because the page takes US traffic as
 * well as Canadian, and the global chrome is not: the footer states "Canadian
 * service businesses / Vancouver, BC, Canada" and the nav carries a BC
 * Locations menu. A roofer in Houston landing on a Vancouver agency is a
 * credibility gap on the one page whose job is making a stranger comfortable.
 */
const MinimalHeader = () => (
  <header className="border-b border-black/5 bg-white/90 backdrop-blur-md">
    <div className="container-custom flex h-16 items-center justify-between">
      <Link to="/" className="font-display text-xl font-bold tracking-tight text-foreground">
        AP DIGITAL
      </Link>
      <a
        href={CONTACT.calendly}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden rounded-full bg-foreground px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-background transition-colors hover:bg-foreground/85 sm:inline-flex"
      >
        Book a Call
      </a>
    </div>
  </header>
);

const MinimalFooter = () => (
  <footer className="border-t border-black/5 bg-white py-12">
    <div className="container-custom flex flex-col items-center gap-5 text-center">
      <Link to="/" className="font-display text-lg font-bold tracking-tight text-foreground">
        AP DIGITAL
      </Link>
      <p className="max-w-md text-sm text-foreground/70">
        Performance marketing for home services and local businesses.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-foreground/70">
        <a href={`mailto:${CONTACT.email}`} className="hover:text-foreground">{CONTACT.email}</a>
        <a href={CONTACT.phoneHref} className="hover:text-foreground">{CONTACT.phone}</a>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-foreground/55">
        <Link to="/privacy-policy" className="hover:text-foreground">Privacy Policy</Link>
        <Link to="/terms-of-service" className="hover:text-foreground">Terms of Service</Link>
      </div>
      <p className="text-xs text-foreground/45">
        &copy; {new Date().getFullYear()} AP Digital. All rights reserved.
      </p>
    </div>
  </footer>
);

const CtaButton = ({ children = 'Claim a Spot' }: { children?: string }) => (
  <a
    href={CONTACT.calendly}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-background transition-colors hover:bg-foreground/85"
  >
    {children}
    <ArrowRight className="h-4 w-4" />
  </a>
);

const FreePilot = () => {
  const [params] = useSearchParams();

  const niche = useMemo(() => {
    const raw = params.get('for') ?? '';
    const key = raw.toLowerCase().replace(/[^a-z]/g, '').slice(0, 24);
    return NICHE_MAP[key] ?? null;
  }, [params]);

  const yourAds = niche ? `your ${niche} ads` : 'your ads';
  const title = niche
    ? `Free 14-Day Ad Pilot for ${niche.charAt(0).toUpperCase() + niche.slice(1)} Companies | AP Digital`
    : 'Free 14-Day Ad Pilot | AP Digital';

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema,
      founderSchema,
      getWebPageSchema(title, DESC, '/free-pilot'),
      getBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Free 14-Day Pilot', url: '/free-pilot' },
      ]),
      getFAQSchema(FAQS),
    ],
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href={CANONICAL} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={CANONICAL} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={DESC} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={DESC} />
        {/* Offer page for outbound — keep it out of the index so it doesn't
            compete with the service pages or age badly between campaigns. */}
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <JsonLd data={structuredData} />

      <MinimalHeader />

      <main id="main-content" className="bg-background">
        {/* Scarcity notice */}
        <div className="bg-[#0C0E11] px-4 py-2.5 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80">
          Taking on a few companies this month at no charge
        </div>

        {/* ── HERO ── */}
        <section className="spotlight-top relative overflow-hidden bg-[#EDEFF2] py-20 md:py-28">
          <div className="container-custom relative z-10 max-w-3xl text-center">
            <SectionLabel label="Free 14-day pilot" />

            <h1 className="mt-6 font-serif text-[2.25rem] font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
              We'll run {yourAds} <span className="italic">free for 14 days</span>
            </h1>

            <p className="mx-auto mt-6 max-w-[54ch] text-base leading-relaxed text-foreground/70 sm:text-lg">
              You pay the ad budget straight to Meta on your own card. We charge you nothing.
              No contract, no setup fee, no catch. Shut it off whenever you want.
            </p>

            <div className="mt-9">
              <CtaButton />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              15 minute call. If it's not a fit we'll tell you on the call.
            </p>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {TERMS.map((t) => (
                <div key={t.value} className="rounded-2xl bg-white elev-1 px-5 py-6">
                  <p className="font-serif text-2xl text-foreground">{t.value}</p>
                  <p className="mt-1.5 text-sm text-muted-foreground">{t.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY FREE ── */}
        <section className="bg-white py-20 md:py-28">
          <div className="container-custom max-w-3xl">
            <SectionLabel label="Why free" />
            <h2 className="mt-6 font-serif text-3xl font-medium leading-[1.08] tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Why we're doing this <span className="italic">for free</span>
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              Fair question, and the honest answer is better than a pitch.
            </p>

            <div className="mt-10 rounded-3xl bg-[#F4F6F8] p-7 sm:p-10">
              <h3 className="font-serif text-xl font-medium text-foreground sm:text-2xl">
                We're building out our case studies
              </h3>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-foreground/70">
                <p>
                  We run paid ads for home services and local businesses. To sell that properly we
                  need results from companies like yours, with real numbers attached, not vague
                  claims.
                </p>
                <p>
                  So the deal is straightforward. We do the work free for 14 days. You risk nothing
                  but the ad budget you control and can switch off at any moment. In exchange, we
                  get permission to use the results as a case study.
                </p>
                <p>
                  You get a fully managed campaign at no cost. We get proof. Nobody has to pretend
                  this is charity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── TIMELINE ── */}
        <section className="bg-[#EDEFF2] py-20 md:py-28">
          <div className="container-custom max-w-4xl">
            <div className="text-center">
              <SectionLabel label="The 14 days" />
              <h2 className="mt-6 font-serif text-3xl font-medium leading-[1.08] tracking-tight text-foreground sm:text-4xl md:text-5xl">
                What the 14 days <span className="italic">actually look like</span>
              </h2>
            </div>

            <ol className="mt-12 grid gap-4 sm:grid-cols-2">
              {TIMELINE.map((step) => (
                <li key={step.day} className="rounded-3xl bg-white elev-1 p-7">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    {step.day}
                  </span>
                  <h3 className="mt-3 font-serif text-xl font-medium text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/70">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── INCLUDED / NOT INCLUDED ── */}
        <section className="bg-white py-20 md:py-28">
          <div className="container-custom max-w-4xl">
            <div className="text-center">
              <SectionLabel label="Scope" />
              <h2 className="mt-6 font-serif text-3xl font-medium leading-[1.08] tracking-tight text-foreground sm:text-4xl md:text-5xl">
                What's included, <span className="italic">and what isn't</span>
              </h2>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2">
              <div className="rounded-3xl bg-[#0C0E11] p-7 sm:p-9">
                <h3 className="font-serif text-xl font-medium text-white">
                  Included in the 14 days
                </h3>
                <ul className="mt-5 space-y-3.5">
                  {INCLUDED.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-white/75">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-white" strokeWidth={2.5} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl bg-[#F4F6F8] p-7 sm:p-9">
                <h3 className="font-serif text-xl font-medium text-foreground">Not included</h3>
                <ul className="mt-5 space-y-3.5">
                  {NOT_INCLUDED.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground/70">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-foreground/40" strokeWidth={2.5} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <FaqLight faqs={FAQS} />

        {/* ── CLOSING CTA ── */}
        <section className="bg-white py-20 md:py-28">
          <div className="container-custom">
            <div className="mx-auto max-w-3xl overflow-hidden rounded-[2rem] bg-[linear-gradient(110deg,#f8e9c9_0%,#f3d9e6_28%,#e6dcf7_55%,#d7e6f7_78%,#dff1ea_100%)] px-6 py-14 text-center sm:px-12">
              <h2 className="font-serif text-3xl font-medium leading-[1.1] tracking-tight text-foreground sm:text-4xl">
                A few spots this month
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm text-foreground/80 sm:text-base">
                15 minute call. If it's not a fit we'll tell you on the call.
              </p>
              <div className="mt-8">
                <CtaButton />
              </div>
              <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.18em] text-foreground/70">
                No contract · No setup fee · Cancel anytime
              </p>
            </div>
          </div>
        </section>

        {/* Sticky CTA — mobile only, where the page is long and the header CTA
            has scrolled away. */}
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/5 bg-white/90 p-3 backdrop-blur-md sm:hidden">
          <a
            href={CONTACT.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-background"
          >
            Claim a Spot
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        {/* Spacer so the sticky bar never covers the footer's last row. */}
        <div className="h-20 sm:hidden" aria-hidden="true" />
      </main>

      <MinimalFooter />
    </>
  );
};

export default FreePilot;
