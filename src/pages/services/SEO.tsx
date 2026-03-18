import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import IndustriesWeServe from '@/components/IndustriesWeServe';
import { getServiceSchema, getBreadcrumbSchema, getWebPageSchema } from '@/lib/structuredData';

const TITLE = 'SEO Agency Canada | Rank Higher on Google and Get Found | AP DIGITAL';
const DESC = 'AP DIGITAL helps Canadian businesses rank higher on Google with proven SEO strategies. Get found by customers actively searching for your services — without paying for every click.';
const CANONICAL = 'https://ap-digital.ca/services/seo';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const included = [
  'Comprehensive technical SEO audit',
  'Keyword research & content strategy',
  'On-page optimization (titles, metas, headings)',
  'Local SEO & Google Business Profile optimization',
  'Backlink building & outreach',
  'Monthly ranking & traffic reports',
  'Site speed & Core Web Vitals optimization',
  'Competitor gap analysis',
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    getServiceSchema('Search Engine Optimization (SEO)', DESC, '/services/seo'),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'SEO Services', url: '/services/seo' },
    ]),
    getWebPageSchema(TITLE, DESC, '/services/seo'),
  ]
};

const SEO = () => (
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
          SEO That Gets Your Business to the <span className="text-gradient">Top of Google</span>
        </h1>

        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6 mb-12">
          <p>When someone searches for the services you offer, are they finding you — or your competitors? If you're not on the first page of Google, you're invisible to the customers who are ready to buy right now.</p>
          <p>At AP DIGITAL, we implement proven SEO strategies that move your business up the rankings and keep you there. From technical optimizations and keyword targeting to local SEO and content strategy, we cover every angle that Google cares about.</p>
          <p>Unlike paid ads, SEO builds long-term equity for your business. Every page we optimize, every backlink we earn, and every piece of content we create compounds over time — giving you a growing stream of organic traffic that doesn't cost you per click.</p>
          <p>We focus on the keywords that actually drive revenue for your business, not vanity rankings. You'll see exactly where you rank, how much traffic you're getting, and how it's converting — with transparent monthly reports and a clear roadmap for growth.</p>
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
          <p className="text-muted-foreground text-lg mb-8">Book your free strategy call and discover how SEO can bring you a steady stream of organic leads.</p>
          <Button asChild size="lg" className="bg-teal hover:bg-teal/90 text-white">
            <Link to="/contact">Book Your Free Strategy Call</Link>
          </Button>
        </section>
      </div>
    </main>
    <Footer />
  </>
);

export default SEO;
