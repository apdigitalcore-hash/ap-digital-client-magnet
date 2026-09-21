import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Shield, Zap, Trophy, Target, Megaphone } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SectionLabel from '@/components/light/SectionLabel';
import FaqLight from '@/components/light/FaqLight';
import PastelCTA from '@/components/light/PastelCTA';
import JsonLd from '@/components/JsonLd';
import {
  organizationSchema,
  founderSchema,
  getBreadcrumbSchema,
  getWebPageSchema,
  getFAQSchema,
} from '@/lib/structuredData';

const TITLE = 'Marketing Pricing Vancouver | From $759/mo | AP Digital';
const DESC = 'Transparent pricing for paid ads and social media marketing. Month-to-month. 90-day results guarantee. Free strategy call.';
const CANONICAL = 'https://ap-digital.ca/pricing';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const guarantees = [
  {
    icon: Shield,
    title: '90-Day Results Guarantee',
    description: 'If we don\'t hit the lead targets we agree on in your first 90 days, we work for free until we do.',
  },
  {
    icon: Zap,
    title: 'No Long-Term Contracts',
    description: 'Every engagement is month-to-month. We earn your business with results, not lock-in clauses.',
  },
  {
    icon: Trophy,
    title: 'Senior Strategist Lead',
    description: 'You\'re never handed off to an intern. The founder runs strategy on every account, every month.',
  },
];

const serviceCards = [
  {
    icon: Target,
    name: 'Paid Ads',
    ourPrice: '$759',
    period: '/month',
    description: 'Profitable Meta & Google ad campaigns for BC trades — built, managed, and optimized for $759/mo.',
    includes: [
      'Meta Ads (Facebook + Instagram)',
      'Google Search & Performance Max',
      'Audience research & creative testing',
      'Weekly performance report',
    ],
  },
  {
    icon: Megaphone,
    name: 'Social Media',
    ourPrice: '$849',
    period: '/month',
    description: 'Consistent content across your key platforms, fully managed.',
    includes: [
      '2 platforms managed',
      '12 custom posts / month',
      'Captions, hashtags & scheduling',
      'Community management',
    ],
  },
];

const faqs = [
  {
    question: 'Do you require a long-term contract?',
    answer: 'No. Every package is month-to-month. You can pause or cancel with 15 days\' notice — no hidden fees, no exit penalties. Most clients stay long-term because the campaigns are profitable, not because they\'re obligated.',
  },
  {
    question: 'Is the ad spend included in the monthly fee?',
    answer: 'No — the $759/month covers management (strategy, builds, creative testing, optimization, and reporting). You pay your ad spend directly to Google or Meta and keep full control of the budget. We recommend a minimum of $1,000/month in spend to get meaningful data.',
  },
  {
    question: 'How does the 90-day results guarantee work?',
    answer: 'In your kickoff call we agree on a specific lead-volume or pipeline target tied to your industry, budget, and current baseline. If we miss that target by month 3, we keep working at no charge until we hit it. We put the target in writing in your service agreement.',
  },
  {
    question: 'What if my industry isn\'t one of your specialties?',
    answer: 'We focus on salons, trades, real estate, and coaches because that\'s where our playbooks already work. If your business is outside those — book a free call anyway. If we don\'t think we\'re the right fit, we\'ll tell you straight up and refer you to someone who is.',
  },
  {
    question: 'Can I add or drop a service later?',
    answer: 'Anytime. Most clients start with one or two services and add more once results are flowing. Changes take effect the following billing cycle — no penalties, no re-onboarding fees.',
  },
  {
    question: 'Do you offer custom packages?',
    answer: 'For businesses with unique needs (multi-location, e-commerce, B2B SaaS) we build custom retainers. Book a strategy call and we\'ll scope it during the conversation — no hidden upcharges, just transparent pricing.',
  },
  {
    question: 'When do I see results?',
    answer: 'Paid ads typically show qualified leads within 2–3 weeks. Organic content (SEO, social) compounds over 60–90 days. We track and report from day 1 so you always know where you stand — not just at month-end.',
  },
];

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    organizationSchema,
    founderSchema,
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Pricing', url: '/pricing' },
    ]),
    getWebPageSchema(TITLE, DESC, '/pricing'),
    getFAQSchema(faqs),
  ],
};


const Pricing = () => {
  return (
    // Light system, matching the homepage, the 7 city pages and the 14 niche
    // pages. This page was the last commercial one still on the old dark theme
    // — near-black ground, white headings, teal accents — and it is linked from
    // every one of those, so the jump was visible on the path to the money page.
    <main id="main-content" className="min-h-screen bg-background">
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href={CANONICAL} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={CANONICAL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESC} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <JsonLd data={structuredData} />

      <Header />

      {/* Hero — same shell as the city pages: #E4E7EB ground, serif H1. */}
      <section className="relative bg-[#E4E7EB] pt-32 pb-24">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              Pricing
            </p>

            {/* Wording unchanged — restyled only. */}
            <h1 className="font-serif text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl mb-6">
              Marketing Service Packages &amp; Pricing
            </h1>

            <p className="mx-auto mb-9 max-w-2xl text-base leading-relaxed text-foreground/70 sm:text-lg">
              Per-service pricing built around how your business actually grows. Every service is month-to-month and backed by our 90-day results guarantee.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
              <Link
                to="/book"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-background transition-colors hover:bg-foreground/85"
              >
                Book a Free Strategy Call
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust markers on white, matching the band under the homepage hero.
          The Google rating claim is dropped: the profile has 2 reviews, so
          "5.0 on Google" oversold a number a visitor can check in one click. */}
      <section className="border-b border-foreground/[0.07] bg-white">
        <div className="container-custom py-6 sm:py-7">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-foreground/70 sm:gap-x-12">
            {['Month-to-Month', 'No Contracts', '90-Day Guarantee'].map((label) => (
              <span key={label} className="flex items-center gap-2.5">
                <Check className="h-4 w-4 shrink-0" strokeWidth={2} />
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] sm:text-[11px]">{label}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Service cards */}
      <section className="bg-white py-24">
        <div className="container-custom">
          <div className="mb-14 text-center">
            <SectionLabel label="Our Services" className="justify-center" />
            <h2 className="mt-4 font-serif text-3xl font-medium leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Pick what your business needs.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-foreground/70 sm:text-lg">
              Transparent monthly pricing per service. No bundles, no contracts — just what you need to grow. Learn more about our{' '}
              <Link to="/services/paid-ads" className="underline underline-offset-4 hover:text-foreground">paid ads</Link> and{' '}
              <Link to="/services/social-media" className="underline underline-offset-4 hover:text-foreground">social media</Link> services, or see{' '}
              <Link to="/case-studies" className="underline underline-offset-4 hover:text-foreground">how we work</Link>.
            </p>
          </div>

          <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
            {serviceCards.map((svc) => (
              <div
                key={svc.name}
                className="elev-1 hover:elev-2 flex flex-col rounded-2xl bg-white p-7 transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EDEFF2]">
                    <svc.icon className="h-5 w-5 text-foreground" strokeWidth={1.6} />
                  </span>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{svc.name}</p>
                </div>

                <p className="mb-5 text-sm leading-relaxed text-foreground/70">{svc.description}</p>

                <div className="mb-5 rounded-xl bg-[#EDEFF2] p-5">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-serif text-4xl font-medium text-foreground">{svc.ourPrice}</span>
                    <span className="text-sm text-foreground/60">{svc.period}</span>
                  </div>
                </div>

                <ul className="mb-6 flex-1 space-y-2.5">
                  {svc.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-foreground/70" strokeWidth={2.4} />
                      <span className="text-sm leading-snug text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/book"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-foreground/20 px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-foreground transition-colors hover:bg-foreground hover:text-background"
                >
                  Get Started <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="bg-[#EDEFF2] py-24">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <SectionLabel label="Why Us" className="justify-center" />
            <h2 className="mt-4 font-serif text-3xl font-medium leading-tight tracking-tight text-foreground sm:text-4xl">
              Why clients trust us
            </h2>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {guarantees.map((g) => (
              <div key={g.title} className="elev-1 rounded-2xl bg-white p-7">
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#EDEFF2]">
                  <g.icon className="h-5 w-5 text-foreground" strokeWidth={1.6} />
                </span>
                <h3 className="mb-2 font-serif text-lg font-medium leading-tight text-foreground">{g.title}</h3>
                <p className="text-sm leading-relaxed text-foreground/70">{g.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — the shared component, so the accordion behaves as it does
          everywhere else and the FAQ parser keeps finding `const faqs`. */}
      <FaqLight faqs={faqs} />

      <PastelCTA
        headline="Ready to lock in your package?"
        subheadline="Book a free 30-minute strategy call. We'll review your current marketing, agree on a 90-day target, and quote you on the package that fits."
      />

      <Footer />
    </main>
  );
};

export default Pricing;
