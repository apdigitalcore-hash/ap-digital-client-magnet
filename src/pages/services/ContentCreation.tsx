import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

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

const ContentCreation = () => (
  <>
    <Helmet>
      <title>Short Form Content Creation Canada | Reels & TikTok for Business | AP DIGITAL</title>
      <meta name="description" content="AP DIGITAL creates scroll-stopping short-form video content for Canadian businesses. Reels, TikToks, and Shorts that capture attention and drive real business results." />
      <link rel="canonical" href="https://ap-digital.ca/services/content-creation" />
    </Helmet>
    <Header />
    <main className="pt-24 pb-16">
      <div className="container-custom max-w-4xl">
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8">
          Short-Form Content That Stops The Scroll and <span className="text-gradient">Drives Action</span>
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

        {/* Industries We Serve */}
        <IndustriesWeServe />

        <section className="bg-card border border-border rounded-2xl p-8 md:p-12 text-center mt-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground text-lg mb-8">Book your free strategy call and let's create content that actually moves the needle for your business.</p>
          <Button asChild size="lg" className="bg-teal hover:bg-teal/90 text-white">
            <Link to="/contact">Book Your Free Strategy Call</Link>
          </Button>
        </section>
      </div>
    </main>
    <Footer />
  </>
);

export default ContentCreation;
