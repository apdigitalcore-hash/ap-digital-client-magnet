import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, TrendingUp, Phone, Star } from 'lucide-react';
import IndustriesWeServe from '@/components/IndustriesWeServe';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { getServiceSchema, getBreadcrumbSchema, getWebPageSchema, getFAQSchema } from '@/lib/structuredData';

const TITLE = 'Web Design Vancouver | Small Business Sites | AP Digital';
const DESC = 'AP Digital builds fast, conversion-focused websites for Vancouver small businesses. Salons, trades, real estate & coaches.';
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

const faqs = [
  {
    question: 'How long does it take to build a website?',
    answer: 'Most small business websites are delivered in two to four weeks from the day we kick off. Larger projects with custom functionality, e-commerce, or multi-location pages can take four to six weeks. We give you a clear timeline before we start and hit our deadlines — no endless back-and-forth.',
  },
  {
    question: 'How much does a website cost?',
    answer: 'Our custom website builds typically range from $1,500 to $5,000 depending on the number of pages, functionality, and design complexity. We quote every project upfront with no hidden fees. Hosting and ongoing maintenance are optional add-ons at a flat monthly rate.',
  },
  {
    question: 'Do you build on WordPress, Webflow, or something custom?',
    answer: 'We build on the platform that makes the most sense for your business. For most small businesses, we recommend modern stacks like React or Webflow for speed, security, and easy updates. If you already have a WordPress site and want to keep it, we can redesign and optimize within that ecosystem too.',
  },
  {
    question: 'Will my website rank on Google?',
    answer: 'Every site we build is engineered for SEO from the ground up — clean code, fast load times, mobile-first design, proper heading structure, schema markup, and optimized images. This gives you the strongest possible foundation to rank. For aggressive local ranking, we also offer ongoing SEO services.',
  },
  {
    question: 'Do you handle hosting and maintenance?',
    answer: 'Yes. We offer fully managed hosting with SSL, daily backups, security monitoring, and ongoing updates. This means you never have to worry about your site going down, getting hacked, or becoming outdated. Most clients choose our managed hosting so they can focus on running their business.',
  },
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
    getFAQSchema(faqs),
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
      <meta name="robots" content="index, follow" />
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
    <Header />
    <main id="main-content" className="pt-24 pb-16">
      <div className="container-custom max-w-4xl">
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8">
          Web Design for Vancouver Small Business
        </h1>

        {/* Short intro */}
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          Your website is your #1 salesperson. We build fast, conversion-focused sites that turn visitors into booked clients — not just pretty pages no one acts on.
        </p>

        {/* 3-column why strip */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="font-bold text-foreground mb-1">Built to convert, not just look good</p>
            <p className="text-sm text-muted-foreground">Every page is designed around one goal: get the visitor to take action. CTA hierarchy, social proof, and friction removal baked in.</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="font-bold text-foreground mb-1">SEO foundations from day one</p>
            <p className="text-sm text-muted-foreground">Title tags, schema, site speed, mobile performance, and canonical structure built correctly from the start.</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="font-bold text-foreground mb-1">Delivered in 3–4 weeks</p>
            <p className="text-sm text-muted-foreground">Fast delivery, 30-day post-launch support, and A/B testing setup so results keep improving after launch.</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <TrendingUp className="w-8 h-8 text-teal mx-auto mb-3" />
            <p className="font-display text-3xl font-bold text-teal mb-2">2-4 wks</p>
            <p className="text-muted-foreground text-sm">Average build timeline</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <Phone className="w-8 h-8 text-teal mx-auto mb-3" />
            <p className="font-display text-3xl font-bold text-teal mb-2">90+</p>
            <p className="text-muted-foreground text-sm">PageSpeed score guaranteed</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <Star className="w-8 h-8 text-teal mx-auto mb-3" />
            <p className="font-display text-3xl font-bold text-teal mb-2">100%</p>
            <p className="text-muted-foreground text-sm">Mobile-optimized builds</p>
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
          <p className="text-muted-foreground mb-6">We build websites for businesses across Metro Vancouver and the Fraser Valley.</p>
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

        <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 md:p-12 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground text-lg mb-8">Book your free strategy call and get a website that works as hard as you do.</p>
          <Button asChild size="lg" className="bg-teal hover:bg-teal/90 text-white">
            <a href="https://calendly.com/apdigital-core/20min" target="_blank" rel="noopener noreferrer">Book Your Free Strategy Call</a>
          </Button>
        </section>
      </div>
    </main>
    <Footer />
  </>
);

export default WebDesign;
