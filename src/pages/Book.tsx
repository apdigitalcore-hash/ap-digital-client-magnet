import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import { Clock, Phone, DollarSign, Link2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { getBreadcrumbSchema, getWebPageSchema } from '@/lib/structuredData';
import { useCalendlyLeadTracking } from '@/lib/calendly';
import { CONTACT, PAID_ADS, SOCIAL_MEDIA, TERMS } from '@/lib/companyFacts';

/**
 * The booking page that makes the Lead event possible.
 *
 * The pixel's Lead event had never fired. The listener in lib/calendly.ts was
 * correct, and an inline widget did exist — but only on /free-pilot, which is
 * noindex, absent from the sitemap, and linked from nowhere. Every other CTA on
 * the site opened calendly.com in a new tab, where the pixel cannot see the
 * booking complete. So bookings happened and none were ever attributed.
 *
 * This page is indexable, in the sitemap, and is now the target of every
 * booking CTA, so the postMessage the listener is waiting for actually reaches
 * a page the listener is mounted on.
 */

const TITLE = 'Book a Free Strategy Call | AP Digital';
const DESC =
  'Book a free 20-minute call with AP Digital. We review what you are running now and tell you what we would do. No charge, no obligation.';
const CANONICAL = 'https://ap-digital.ca/book';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const EXPECT = [
  { icon: Clock, label: '20 minutes', detail: 'Not an hour. We keep to it.' },
  { icon: Phone, label: 'A phone call', detail: 'No screen share, no slide deck.' },
  { icon: DollarSign, label: 'No charge', detail: 'No obligation to buy anything after it.' },
  { icon: Link2, label: 'Have your URL handy', detail: 'We will look at your site while we talk.' },
];

const Book = () => {
  useCalendlyLeadTracking(null, 'book');

  // ContactForm sends name/email/answers through as query params. Forward them
  // to the widget so the form still prefills — previously it redirected
  // straight to calendly.com, which is exactly the path the pixel cannot see.
  const { search } = useLocation();
  const prefill = search.startsWith('?') ? search.slice(1) : search;
  const widgetUrl = `${CONTACT.calendly}?hide_gdpr_banner=1${prefill ? `&${prefill}` : ''}`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      getBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Book a Call', url: '/book' },
      ]),
      getWebPageSchema(TITLE, DESC, '/book'),
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href={CANONICAL} />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={CANONICAL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESC} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <JsonLd data={structuredData} />
      <Header />

      <main id="main-content" className="pt-28 pb-20">
        <div className="container-custom max-w-3xl">
          <h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground leading-[1.05] tracking-tight mb-5">
            Book a free strategy call
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Twenty minutes on the phone. We will look at what you are running now, tell you what we
            would change, and give you a straight answer on whether we are the right fit — including
            when the answer is no.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {EXPECT.map(({ icon: Icon, label, detail }) => (
              <div key={label} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-teal" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-foreground">{label}</p>
                  <p className="text-sm text-muted-foreground">{detail}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-sm text-muted-foreground mb-10">
            For reference before we speak: paid ads management is {PAID_ADS.price}
            {PAID_ADS.period} and social media management is {SOCIAL_MEDIA.price}
            {SOCIAL_MEDIA.period}. {TERMS.contract}{' '}
            <Link to="/pricing" className="text-teal underline hover:text-teal/80">
              Full pricing
            </Link>
            .
          </p>

          <div
            className="calendly-inline-widget overflow-hidden rounded-3xl bg-white elev-1"
            data-url={widgetUrl}
            style={{ minWidth: '320px', height: '700px' }}
          />
          <noscript>
            <p className="mt-4 text-sm">
              <a href={CONTACT.calendly} target="_blank" rel="noopener noreferrer" className="text-teal underline">
                Book a call on Calendly
              </a>{' '}
              — or call{' '}
              <a href={CONTACT.phoneHref} className="text-teal underline">
                {CONTACT.phone}
              </a>
              .
            </p>
          </noscript>

          <p className="mt-6 text-sm text-muted-foreground">
            Prefer to talk now?{' '}
            <a href={CONTACT.phoneHref} className="text-teal underline hover:text-teal/80">
              {CONTACT.phone}
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Book;
