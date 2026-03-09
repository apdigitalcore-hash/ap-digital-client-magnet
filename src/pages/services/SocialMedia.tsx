import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import IndustriesWeServe from '@/components/IndustriesWeServe';

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

const SocialMedia = () => (
  <>
    <Helmet>
      <title>Social Media Marketing Canada | Content That Grows Your Business | AP DIGITAL</title>
      <meta name="description" content="AP DIGITAL manages your social media so you can focus on your business. We create content, engage your community, and turn followers into paying clients across Canada." />
      <link rel="canonical" href="https://ap-digital.ca/services/social-media" />
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

        {/* Industries We Serve */}
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
