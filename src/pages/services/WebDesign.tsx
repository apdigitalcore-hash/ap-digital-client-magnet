import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, TrendingUp, Phone, Star } from 'lucide-react';
import IndustriesWeServe from '@/components/IndustriesWeServe';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { getServiceSchema, getBreadcrumbSchema, getWebPageSchema, getFAQSchema } from '@/lib/structuredData';

const TITLE = 'Web Design Agency Vancouver | Websites for Small Business | AP Digital';
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
    <main className="pt-24 pb-16">
      <div className="container-custom max-w-4xl">
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8">
          Web Design for Vancouver Small Business
        </h1>

        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6 mb-12">
          <p>Your website is your digital storefront — and if it's slow, outdated, or confusing, you're losing customers before they ever reach out. At AP DIGITAL, we design websites that don't just look beautiful — they're engineered to convert visitors into leads and customers.</p>
          <p>Every site we build starts with strategy. We research your industry, understand your ideal customer, and design a user experience that guides visitors toward taking action — whether that's booking a call, filling out a form, or making a purchase.</p>
          <p>Our websites are built mobile-first, load lightning-fast, and are fully optimized for search engines. We handle everything from design and development to hosting and ongoing maintenance, so you never have to worry about the technical side.</p>
          <p>Whether you need a complete website redesign or a high-converting landing page for your next campaign, we deliver polished, professional results that make your business stand out and drive measurable growth.</p>
          <p>In 2026, your website needs to do more than look good — it needs to load in under two seconds, pass Google's Core Web Vitals, and adapt perfectly to every screen size. We build every site on modern, lightweight frameworks that score 90+ on PageSpeed Insights, which directly impacts both user experience and your Google rankings. Slow websites lose 40% of visitors before they even see your offer, which is why performance is baked into every decision we make — from image compression and lazy loading to CDN delivery and minimal third-party scripts.</p>
          <p>We design for conversion, not just aesthetics. Every section on your homepage follows a proven framework: a clear headline, a compelling value proposition, social proof, and a single primary call to action. We have helped small businesses across Metro Vancouver — from Surrey contractors to Burnaby salons and Langley realtors — replace outdated websites that produced zero leads with modern, high-converting sites that drive bookings, phone calls, and revenue. Your website should be your hardest-working salesperson, and we make sure it is.</p>
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
            <a href="https://calendly.com/apdigital-core/30min" target="_blank" rel="noopener noreferrer">Book Your Free Strategy Call</a>
          </Button>
        </section>
      </div>
    </main>
    <Footer />
  </>
);

export default WebDesign;
