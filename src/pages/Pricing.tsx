import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Shield, Zap, Trophy, Star, Target, Megaphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DarkCTA from '@/components/DarkCTA';
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
    answer: 'No. Every package is month-to-month. You can pause or cancel with 30 days\' notice — no hidden fees, no exit penalties. Most clients stay long-term because the campaigns are profitable, not because they\'re obligated.',
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
    <main id="main-content" className="min-h-screen bg-near-black">
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

      {/* Hero */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 bg-near-black overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,_rgba(20,184,166,0.12)_0%,_transparent_60%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal/30 to-transparent" />

        <div className="container-custom relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 border border-teal/20 text-teal text-xs font-bold uppercase tracking-[0.2em] mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-teal" />
            Pricing
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.04] tracking-tight">
            Marketing Service<br />
            <span className="text-gradient">Packages &amp; Pricing</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-400 leading-relaxed mb-10 max-w-2xl mx-auto">
            Per-service pricing built around how your business actually grows. Every service is month-to-month and backed by our 90-day results guarantee.
          </p>

          {/* Trust bar */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-gray-400 mb-10">
            <span className="flex items-center gap-2"><Check className="w-4 h-4 text-teal" strokeWidth={3} /> No contracts</span>
            <span className="flex items-center gap-2"><Check className="w-4 h-4 text-teal" strokeWidth={3} /> 90-day guarantee</span>
            <span className="flex items-center gap-2"><Check className="w-4 h-4 text-teal" strokeWidth={3} /> Cancel anytime</span>
            <span className="flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-1">5.0 on Google</span>
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button variant="hero" size="lg" asChild>
              <Link to="/book" className="flex items-center gap-2">
                Book a free strategy call
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Individual service cards */}
      <section className="py-16 sm:py-20 bg-charcoal">
        <div className="container-custom">
          <div className="text-center mb-10 sm:mb-14">
            <span className="inline-block text-[10px] font-bold tracking-[0.25em] uppercase text-teal mb-4">
              Our services
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-3">
              Pick what your business needs.
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              Transparent monthly pricing per service. No bundles, no contracts — just what you need to grow. Learn more about our <Link to="/services/paid-ads" className="text-teal underline hover:text-teal/80">paid ads</Link> and <Link to="/services/social-media" className="text-teal underline hover:text-teal/80">social media</Link> services, or see <Link to="/case-studies" className="text-teal underline hover:text-teal/80">how we work</Link>.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {serviceCards.map((svc) => (
              <div
                key={svc.name}
                className="group flex flex-col rounded-2xl bg-charcoal-light border border-gray-800 hover:border-teal/30 transition-all duration-300 hover:-translate-y-0.5 p-6 sm:p-7"
              >
                {/* Icon + name */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center flex-shrink-0">
                    <svc.icon className="w-5 h-5 text-teal" strokeWidth={1.8} />
                  </div>
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-teal">{svc.name}</p>
                </div>

                <p className="text-sm text-gray-400 leading-relaxed mb-5">{svc.description}</p>

                {/* Price */}
                <div className="rounded-xl bg-near-black/60 border border-gray-800 p-5 mb-5">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display text-4xl font-black text-white">{svc.ourPrice}</span>
                    <span className="text-gray-400 text-sm">{svc.period}</span>
                  </div>
                </div>

                <div className="h-px bg-gray-800 mb-4" />

                <ul className="space-y-2.5 flex-1 mb-6">
                  {svc.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-teal/15 border border-teal/30 flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-teal" strokeWidth={3} />
                      </span>
                      <span className="text-sm text-gray-300 leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/book" className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border border-teal/40 text-teal text-sm font-semibold hover:bg-teal/10 transition-colors duration-200">
                  Get started <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-16 sm:py-20 bg-charcoal">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
              Why clients trust us
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
            {guarantees.map((g) => (
              <div key={g.title} className="p-6 sm:p-7 rounded-2xl border border-gray-800 bg-charcoal-light/60 hover:border-teal/25 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center mb-4">
                  <g.icon className="w-5 h-5 text-teal" />
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2 leading-tight">
                  {g.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">{g.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-24 bg-charcoal">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-10 sm:mb-12">
            <span className="inline-block text-[10px] font-bold tracking-[0.25em] uppercase text-teal mb-4">
              Common questions
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 leading-tight">
              Pricing <span className="text-gradient">FAQ</span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg">
              Honest answers to the questions every business owner asks.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={faq.question}
                value={`faq-${i}`}
                className="border border-gray-800 rounded-xl bg-charcoal-light/40 px-5 data-[state=open]:border-teal/40"
              >
                <AccordionTrigger className="text-left text-white font-semibold hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <DarkCTA
        headline="Ready to lock in your package?"
        subheadline="Book a free 30-minute strategy call. We'll review your current marketing, agree on a 90-day target, and quote you on the package that fits."
      />

      <Footer />
    </main>
  );
};

export default Pricing;
