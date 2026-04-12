import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import IndustriesWeServe from '@/components/IndustriesWeServe';
import { getServiceSchema, getBreadcrumbSchema, getWebPageSchema } from '@/lib/structuredData';

const TITLE = 'Content Creation for Small Business Vancouver | AP Digital';
const DESC = 'Short-form video & social content that gets your business noticed. AP Digital creates scroll-stopping content for salons, trades & local businesses in BC.';
const CANONICAL = 'https://ap-digital.ca/services/content-creation';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const included = [
  'Short-form video production (Reels, TikToks, Shorts)',
  'Script writing & creative direction',
  'Professional editing & motion graphics',
  'Branded social media graphics',
  'Content repurposing across platforms',
  'Trend research & creative strategy',
  'Brand photography sessions',
  'Monthly content batches',
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    getServiceSchema('Short-Form Content Creation', DESC, '/services/content-creation'),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Content Creation', url: '/services/content-creation' },
    ]),
    getWebPageSchema(TITLE, DESC, '/services/content-creation'),
  ]
};

const ContentCreation = () => (
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
      <meta name="robots" content="index, follow" />
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
    <Header />
    <main className="pt-24 pb-16">
      <div className="container-custom max-w-4xl">
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8">
          Short-Form Content Creation for Canadian Businesses
        </h1>

        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6 mb-12">
          <p>In today's attention economy, you have less than three seconds to make an impression. That's why short-form video content — Reels, TikToks, and YouTube Shorts — has become the most powerful tool for growing a local business online.</p>
          <p>At AP DIGITAL, we produce thumb-stopping content that showcases your brand, tells your story, and drives action. From concept and scripting to filming and editing, we handle the entire production process so all you have to do is show up and be yourself.</p>
          <p>We stay ahead of trends without chasing gimmicks. Every piece of content we create is strategically designed to build trust, demonstrate expertise, and move potential clients closer to booking with you.</p>
          <p>Whether you need a month's worth of Reels, branded graphics for your feed, or a full content strategy — we deliver polished, on-brand assets that make you look like the authority you are.</p>
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
          <p className="text-muted-foreground text-lg mb-8">Book your free strategy call and let's create content that actually moves the needle for your business.</p>
          <Button asChild size="lg" className="bg-teal hover:bg-teal/90 text-white">
            <a href="https://calendly.com/apdigital-core/30min" target="_blank" rel="noopener noreferrer">Book Your Free Strategy Call</a>
          </Button>
        </section>
      </div>
    </main>
    <Footer />
  </>
);

export default ContentCreation;
