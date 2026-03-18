import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import IndustriesWeServe from '@/components/IndustriesWeServe';
import { getServiceSchema, getBreadcrumbSchema, getWebPageSchema } from '@/lib/structuredData';

const TITLE = 'Social Media Marketing Canada | Content That Grows Your Business | AP DIGITAL';
const DESC = 'AP DIGITAL manages your social media so you can focus on your business. We create content, engage your community, and turn followers into paying clients across Canada.';
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

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    getServiceSchema('Social Media Marketing', DESC, '/services/social-media'),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Social Media Marketing', url: '/services/social-media' },
    ]),
    getWebPageSchema(TITLE, DESC, '/services/social-media'),
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
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
    <Header />
    <main className="pt-24 pb-16">
      <div className="container-custom max-w-4xl">
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8">
          Social Media Management That Turns Followers Into <span className="text-gradient">Paying Clients</span>
        </h1>

        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6 mb-12">
          <p>Posting randomly and hoping for the best isn't a strategy. At AP DIGITAL, we build a social media presence that positions you as the go-to expert in your industry — and drives real business results, not just likes.</p>
          <p>We handle everything from content creation and scheduling to community engagement and analytics. Every post is crafted with purpose: to educate, inspire, and convert your audience into customers who trust you before they ever pick up the phone.</p>
          <p>Our team stays on top of algorithm changes and platform trends so you don't have to. Whether it's Instagram Reels, TikTok, or Facebook, we know what works right now and we execute it consistently for your brand.</p>
          <p>The result? A professional, active social presence that builds authority, attracts your ideal clients, and keeps your business top of mind — all without you spending hours on your phone.</p>
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
          <p className="text-muted-foreground text-lg mb-8">Book your free strategy call and let us build a social media engine that grows your business.</p>
          <Button asChild size="lg" className="bg-teal hover:bg-teal/90 text-white">
            <Link to="/contact">Book Your Free Strategy Call</Link>
          </Button>
        </section>
      </div>
    </main>
    <Footer />
  </>
);

export default SocialMedia;
