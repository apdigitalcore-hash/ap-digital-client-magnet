import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import IndustriesWeServe from '@/components/IndustriesWeServe';
import { getServiceSchema, getBreadcrumbSchema, getWebPageSchema } from '@/lib/structuredData';

const TITLE = 'Paid Ads Agency Canada | Facebook & Google Ads That Generate Leads | AP DIGITAL';
const DESC = 'AP DIGITAL runs high-converting Facebook, Instagram, and Google ad campaigns for Canadian businesses. Get predictable leads every week with data-driven paid advertising.';
const CANONICAL = 'https://ap-digital.ca/services/paid-ads';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const included = [
  'Facebook & Instagram ad campaign setup',
  'Google Ads search & display campaigns',
  'Audience research & targeting strategy',
  'A/B testing of creatives and copy',
  'Retargeting & lookalike audience campaigns',
  'Weekly performance reports & optimization',
  'Landing page recommendations',
  'Dedicated account manager',
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    getServiceSchema('Paid Advertising', DESC, '/services/paid-ads'),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Paid Ads', url: '/services/paid-ads' },
    ]),
    getWebPageSchema(TITLE, DESC, '/services/paid-ads'),
  ]
};

const PaidAds = () => (
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
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
    <Header />
    <main className="pt-24 pb-16">
      <div className="container-custom max-w-4xl">
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8">
          Paid Ads That Bring You Leads <span className="text-gradient">Every Single Week</span>
        </h1>

        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6 mb-12">
          <p>Most businesses waste thousands on ads that don't convert. The problem isn't the platform — it's the strategy. At AP DIGITAL, we build paid ad campaigns on Facebook, Instagram, and Google that are designed from day one to generate qualified leads, not just impressions.</p>
          <p>We start by understanding your ideal customer, then craft scroll-stopping creatives and laser-targeted audiences that put your offer in front of the right people at the right time. Every dollar is tracked, tested, and optimized so your cost per lead keeps dropping.</p>
          <p>Whether you're a salon owner looking for more bookings, a real estate agent chasing buyer leads, or a trades business that needs the phone to ring — our paid ads system delivers consistent, measurable results month after month.</p>
          <p>You'll get full transparency with weekly reports, a dedicated strategist, and campaigns that scale as your business grows. No long-term contracts, no vanity metrics — just leads that turn into revenue.</p>
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

        <section className="bg-card border border-border rounded-2xl p-8 md:p-12 text-center mt-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground text-lg mb-8">Book your free strategy call and find out how paid ads can fill your pipeline with qualified leads.</p>
          <Button asChild size="lg" className="bg-teal hover:bg-teal/90 text-white">
            <Link to="/contact">Book Your Free Strategy Call</Link>
          </Button>
        </section>
      </div>
    </main>
    <Footer />
  </>
);

export default PaidAds;
