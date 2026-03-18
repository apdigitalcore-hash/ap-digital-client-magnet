import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import IndustriesWeServe from '@/components/IndustriesWeServe';
import { getServiceSchema, getBreadcrumbSchema, getWebPageSchema } from '@/lib/structuredData';

const TITLE = 'Web Design Agency Canada | Websites Built to Convert | AP DIGITAL';
const DESC = 'AP DIGITAL designs and builds high-converting websites for Canadian businesses. Mobile-first, fast-loading, and optimized to turn visitors into paying customers.';
const CANONICAL = 'https://ap-digital.ca/services/web-design';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const included = [
  'Custom responsive website design',
  'Mobile-first development',
  'Conversion-optimized landing pages',
  'Speed & performance optimization',
  'SEO-friendly site architecture',
  'Contact forms & lead capture integration',
  'SSL security & hosting setup',
  'Ongoing maintenance & support',
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    getServiceSchema('Web Design', DESC, '/services/web-design'),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Web Design', url: '/services/web-design' },
    ]),
    getWebPageSchema(TITLE, DESC, '/services/web-design'),
  ]
};

const WebDesign = () => (
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
          Web Design That Looks Great and Actually <span className="text-gradient">Converts Visitors</span>
        </h1>

        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6 mb-12">
          <p>Your website is your digital storefront — and if it's slow, outdated, or confusing, you're losing customers before they ever reach out. At AP DIGITAL, we design websites that don't just look beautiful — they're engineered to convert visitors into leads and customers.</p>
          <p>Every site we build starts with strategy. We research your industry, understand your ideal customer, and design a user experience that guides visitors toward taking action — whether that's booking a call, filling out a form, or making a purchase.</p>
          <p>Our websites are built mobile-first, load lightning-fast, and are fully optimized for search engines. We handle everything from design and development to hosting and ongoing maintenance, so you never have to worry about the technical side.</p>
          <p>Whether you need a complete website redesign or a high-converting landing page for your next campaign, we deliver polished, professional results that make your business stand out and drive measurable growth.</p>
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
          <p className="text-muted-foreground text-lg mb-8">Book your free strategy call and get a website that works as hard as you do.</p>
          <Button asChild size="lg" className="bg-teal hover:bg-teal/90 text-white">
            <Link to="/contact">Book Your Free Strategy Call</Link>
          </Button>
        </section>
      </div>
    </main>
    <Footer />
  </>
);

export default WebDesign;
