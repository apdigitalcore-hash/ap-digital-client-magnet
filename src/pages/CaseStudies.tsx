import { Helmet } from 'react-helmet-async';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DarkCTA from '@/components/DarkCTA';
import JsonLd from '@/components/JsonLd';
import { getBreadcrumbSchema, getWebPageSchema } from '@/lib/structuredData';
import { PAID_ADS, SOCIAL_MEDIA, TERMS, TIMELINES } from '@/lib/companyFacts';

/**
 * This page used to carry five case studies — Willow Hair Lounge, Summit Home
 * Services, Westcoast Electric, Momentum Coaching Group, Pacific Oak Realty —
 * with named clients, ROAS multiples, cost-per-lead figures and quotes. None of
 * it was real. It was removed on 2026-08-24 rather than left up, because
 * fabricated results are both against Google's policies and, in Canada,
 * deceptive marketing under the Competition Act.
 *
 * The route stays so the page does not become a soft 404 — this host serves the
 * SPA shell with a 200 for unknown paths, so deleting the route would be worse
 * than replacing the content. When there are real, named, permissioned results,
 * they belong here.
 */

const TITLE = 'Our Approach | How We Work | AP Digital';
const DESC =
  'How AP Digital runs paid ads and social media for BC businesses: what we report, what we charge, and the terms. No published case studies yet.';
const CANONICAL = 'https://ap-digital.ca/case-studies';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const HOW_WE_WORK = [
  {
    title: 'A target agreed before launch',
    body: 'We agree a lead-volume target at kickoff, so there is a number we are both accountable to rather than a vague promise to "drive growth".',
  },
  {
    title: 'Weekly reporting on leads, not reach',
    body: 'Every report leads with leads, cost per lead, and what we changed and why. Impressions and follower counts do not pay invoices.',
  },
  {
    title: 'Your ad spend stays yours',
    body: TERMS.adSpendSeparate,
  },
  {
    title: 'Month-to-month, always',
    body: `${TERMS.contract} ${TERMS.notice}`,
  },
];

const CaseStudies = () => {
  const { studyId } = useParams();

  // Old /case-studies/:id URLs have no page behind them any more.
  if (studyId) return <Navigate to="/case-studies" replace />;

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      getBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Our Approach', url: '/case-studies' },
      ]),
      getWebPageSchema(TITLE, DESC, '/case-studies'),
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href={CANONICAL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESC} />
        <meta property="og:url" content={CANONICAL} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <JsonLd data={structuredData} />
      <Header />

      <main className="pt-28 pb-20">
        <section className="container mx-auto px-4 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Our approach
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground leading-[1.05] tracking-tight mb-6">
            We don't have case studies up yet.
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            Most agency case-study pages are unverifiable. Ours would have been too, so it is not
            here. When we publish results, they will carry a real client name, real numbers, and
            that client's permission.
          </p>
          <p className="text-lg text-muted-foreground">
            Until then, the useful thing we can tell you is exactly how the work runs and what it
            costs — which is on this page and on{' '}
            <Link to="/pricing" className="text-foreground underline underline-offset-4">
              our pricing page
            </Link>
            , in full.
          </p>
        </section>

        <section className="container mx-auto px-4 max-w-3xl mt-16">
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-8">
            How we work
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {HOW_WE_WORK.map((item) => (
              <div key={item.title} className="bg-white elev-2 rounded-3xl p-6">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-foreground mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-foreground mb-1">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 max-w-3xl mt-16">
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-6">
            What it costs
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[PAID_ADS, SOCIAL_MEDIA].map((service) => (
              <div key={service.key} className="bg-white elev-2 rounded-3xl p-6">
                <p className="font-semibold text-foreground mb-1">{service.name}</p>
                <p className="font-serif text-3xl font-medium text-foreground mb-3">
                  {service.price}
                  <span className="text-base text-muted-foreground">{service.period}</span>
                </p>
                <p className="text-sm text-muted-foreground">{service.summary}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-6">{TIMELINES.firstLeads}</p>
        </section>

        <section className="container mx-auto px-4 max-w-3xl mt-12">
          <Button asChild size="lg">
            <Link to="/contact">
              Book a 20-minute call
              <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
            </Link>
          </Button>
        </section>

        <div className="mt-20">
          <DarkCTA />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CaseStudies;
