import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

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

const PaidAds = () => (
  <>
    <Helmet>
      <title>Paid Ads Agency Canada | Facebook & Instagram Ads That Generate Leads | AP DIGITAL</title>
      <meta name="description" content="AP DIGITAL runs high-converting Facebook, Instagram, and Google ad campaigns for Canadian businesses. Get predictable leads every week with data-driven paid advertising." />
      <link rel="canonical" href="https://ap-digital.ca/services/paid-ads" />
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

        {/* Industries We Serve */}
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
