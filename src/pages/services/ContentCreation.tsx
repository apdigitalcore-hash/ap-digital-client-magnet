import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, TrendingUp, Phone, Star } from 'lucide-react';
import IndustriesWeServe from '@/components/IndustriesWeServe';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { getServiceSchema, getBreadcrumbSchema, getWebPageSchema, getFAQSchema } from '@/lib/structuredData';

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

const faqs = [
  {
    question: 'What type of content do you create?',
    answer: 'We specialize in short-form video content including Instagram Reels, TikToks, and YouTube Shorts. We also create branded graphics, carousel posts, story sequences, and behind-the-scenes content. Every piece is designed to stop the scroll and drive engagement for your specific industry.',
  },
  {
    question: 'Do I need to be on camera?',
    answer: 'Not necessarily. While on-camera content tends to build the strongest personal brand, we can create highly effective b-roll content, text-overlay videos, product showcases, and behind-the-scenes clips without you ever appearing on screen. We work with your comfort level and find a style that fits.',
  },
  {
    question: 'How many pieces of content do I get per month?',
    answer: 'It depends on your package, but most clients receive between 12 and 20 or more pieces per month. This typically includes a mix of short-form videos, branded graphics, story content, and carousel posts — all optimized for the platforms where your audience is most active.',
  },
  {
    question: 'Can you match my brand style?',
    answer: 'Absolutely. Before we create a single piece of content, we develop a brand guide covering your colours, fonts, tone of voice, and visual style. Everything we produce is on-brand and consistent, so your social presence looks polished and professional across every platform.',
  },
  {
    question: 'Do you handle posting and scheduling?',
    answer: 'Yes, we manage the entire content pipeline from creation to posting to performance tracking. We schedule posts at optimal times for your audience, engage with comments when needed, and provide monthly analytics so you can see exactly how your content is performing.',
  },
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
    getFAQSchema(faqs),
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
          <p>Video is the dominant content format in 2026, and it is not slowing down. Algorithms on every major platform prioritize video content because it keeps users engaged longer. Businesses that invest in consistent video content see dramatically higher reach, more profile visits, and stronger brand recall than those relying on static images alone. We help you capitalize on this shift by producing a steady stream of short-form videos that are optimized for each platform — vertical format, trending audio, strong hooks within the first second, and clear calls to action that drive real business outcomes.</p>
          <p>One of the biggest advantages of working with us is content repurposing. A single video shoot can produce content for Instagram Reels, TikTok, YouTube Shorts, Facebook, and even LinkedIn — all reformatted and optimized for each platform. This means you get maximum value from every piece of content we create. We have helped local BC businesses — from salons in Vancouver to contractors in the Fraser Valley — build their brands through consistent, high-quality content that positions them as the clear choice in their market.</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <TrendingUp className="w-8 h-8 text-teal mx-auto mb-3" />
            <p className="font-display text-3xl font-bold text-teal mb-2">50+</p>
            <p className="text-muted-foreground text-sm">Pieces of content delivered monthly</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <Phone className="w-8 h-8 text-teal mx-auto mb-3" />
            <p className="font-display text-3xl font-bold text-teal mb-2">3 sec</p>
            <p className="text-muted-foreground text-sm">Average hook time for scroll-stopping content</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <Star className="w-8 h-8 text-teal mx-auto mb-3" />
            <p className="font-display text-3xl font-bold text-teal mb-2">5x</p>
            <p className="text-muted-foreground text-sm">More engagement vs static posts</p>
          </div>
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

        <section className="mt-16 mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-left text-foreground font-medium">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <div className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">Cities We Serve</h2>
          <p className="text-muted-foreground mb-6">We provide content creation for businesses across Metro Vancouver and the Fraser Valley.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { city: 'Surrey', href: '/surrey' },
              { city: 'Burnaby', href: '/burnaby' },
              { city: 'Langley', href: '/langley' },
              { city: 'Coquitlam', href: '/coquitlam' },
            ].map(({ city, href }) => (
              <Link key={href} to={href} className="bg-muted rounded-xl p-4 text-center hover:bg-muted/80 transition-colors">
                <span className="font-medium text-foreground">{city}</span>
              </Link>
            ))}
          </div>
        </div>

        <section className="bg-card border border-border rounded-2xl p-8 md:p-12 text-center">
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
