import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, TrendingUp, Phone, Star } from 'lucide-react';
import IndustriesWeServe from '@/components/IndustriesWeServe';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { getServiceSchema, getBreadcrumbSchema, getWebPageSchema, getFAQSchema } from '@/lib/structuredData';

const TITLE = 'Social Media Marketing Vancouver | Content & Growth | AP Digital';
const DESC = 'AP Digital manages social media for Vancouver salons, trades & real estate professionals. Short-form content & organic growth.';
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

const faqs = [
  {
    question: 'Which social media platforms should my business be on?',
    answer: 'It depends on your industry and target audience. Instagram and TikTok work best for visual businesses like salons, med spas, and fitness studios. Facebook and Instagram are ideal for trades and home services. LinkedIn is the go-to for coaches, consultants, and B2B service providers. We analyze your market and recommend the platforms where your ideal customers actually spend their time.',
  },
  {
    question: 'How often will you post on my accounts?',
    answer: 'Typically we post three to five times per week per platform, including a mix of feed posts, stories, and Reels or TikToks. Consistency is key to growing your audience and staying top of mind, so we build a content calendar that keeps your brand active without overwhelming your followers.',
  },
  {
    question: 'Can you manage my social media if I have never posted before?',
    answer: 'Absolutely. We start from scratch — profile setup, branding, bio optimization, content strategy, and your first month of posts. Many of our best-performing clients came to us with zero social media presence and now have thriving accounts that generate real business.',
  },
  {
    question: 'Do you create the content or do I need to provide it?',
    answer: 'We handle everything: scripting, shooting guidance, editing, graphic design, copywriting, and posting. If you can provide raw photos or video clips, that helps — but it is not required. We can create high-quality content using stock assets, brand templates, and creative direction.',
  },
  {
    question: 'How do you measure social media success?',
    answer: 'We track metrics that matter for your business: engagement rate, follower growth, direct messages and inquiries, website clicks, and lead conversions. We do not focus on vanity metrics like random likes — every report ties social performance back to real business outcomes.',
  },
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
    getFAQSchema(faqs),
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
      <meta name="robots" content="index, follow" />
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
    <Header />
    <main className="pt-24 pb-16">
      <div className="container-custom max-w-4xl">
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8">
          Social Media Marketing for Vancouver Small Business
        </h1>

        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6 mb-12">
          <p>Posting randomly and hoping for the best isn't a strategy. At AP DIGITAL, we build a social media presence that positions you as the go-to expert in your industry — and drives real business results, not just likes.</p>
          <p>We handle everything from content creation and scheduling to community engagement and analytics. Every post is crafted with purpose: to educate, inspire, and convert your audience into customers who trust you before they ever pick up the phone.</p>
          <p>Our team stays on top of algorithm changes and platform trends so you don't have to. Whether it's Instagram Reels, TikTok, or Facebook, we know what works right now and we execute it consistently for your brand.</p>
          <p>The result? A professional, active social presence that builds authority, attracts your ideal clients, and keeps your business top of mind — all without you spending hours on your phone.</p>
          <p>Each platform requires a different approach, and we tailor our strategy accordingly. On Instagram, we focus on polished visuals, Reels that tap into trending audio, and story sequences that drive DMs and bookings. TikTok demands raw authenticity and hook-driven content — we create videos that feel native to the platform while still representing your brand professionally. Facebook remains the strongest platform for local community engagement, targeted groups, and driving traffic to your website. We match the right format and tone to each platform so your content performs instead of falling flat.</p>
          <p>As a Vancouver and BC-focused agency, we understand the local market dynamics that national agencies miss. We know when Lower Mainland audiences are most active, what local trends resonate, and how to position your business within the Metro Vancouver community. Whether you are a salon in Kitsilano, a contractor in Surrey, or a coach in Burnaby, our social media management is built around your local audience and the specific way they discover and engage with businesses like yours.</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <TrendingUp className="w-8 h-8 text-teal mx-auto mb-3" />
            <p className="font-display text-3xl font-bold text-teal mb-2">3x</p>
            <p className="text-muted-foreground text-sm">Average engagement increase</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <Phone className="w-8 h-8 text-teal mx-auto mb-3" />
            <p className="font-display text-3xl font-bold text-teal mb-2">30 days</p>
            <p className="text-muted-foreground text-sm">To see measurable growth</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <Star className="w-8 h-8 text-teal mx-auto mb-3" />
            <p className="font-display text-3xl font-bold text-teal mb-2">4+</p>
            <p className="text-muted-foreground text-sm">Platforms managed</p>
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
          <p className="text-muted-foreground mb-6">We provide social media marketing for businesses across Metro Vancouver and the Fraser Valley.</p>
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
          <p className="text-muted-foreground text-lg mb-8">Book your free strategy call and let us build a social media engine that grows your business.</p>
          <Button asChild size="lg" className="bg-teal hover:bg-teal/90 text-white">
            <a href="https://calendly.com/apdigital-core/30min" target="_blank" rel="noopener noreferrer">Book Your Free Strategy Call</a>
          </Button>
        </section>
      </div>
    </main>
    <Footer />
  </>
);

export default SocialMedia;
