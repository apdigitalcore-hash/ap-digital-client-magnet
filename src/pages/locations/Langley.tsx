import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, TrendingUp, Star, Zap, Target, Users, MapPin } from 'lucide-react';
import OurServices from '@/components/OurServices';
import IndustriesWeServe from '@/components/IndustriesWeServe';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { getServiceSchema, getBreadcrumbSchema, getFAQSchema, getWebPageSchema, founderSchema } from '@/lib/structuredData';
import apLogo from '@/assets/ap-logo.png';
import JsonLd from '@/components/JsonLd';

const TITLE = 'Langley Marketing Agency | Leads & Ads | AP Digital';
const DESC = 'Langley marketing agency for salons, trades, realtors & coaches. Most clients see leads within 2 weeks. Google Ads, Meta Ads & local SEO. No contracts.';
const CANONICAL = 'https://ap-digital.ca/langley';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const included = [
  'Meta Ads targeting Langley City & Township',
  'Google Ads for local service searches',
  'Google Business Profile optimization',
  'Review generation & reputation management',
  'Social media content creation',
  'Landing pages for Langley leads',
  'Monthly ROI reporting',
  'Local SEO for Langley',
];

const faqs = [
  {
    question: 'How quickly will I see leads in Langley?',
    answer: 'Most Langley businesses see their first leads within 2 weeks of launching Meta Ads with AP Digital.',
  },
  {
    question: 'Do I need a long-term contract?',
    answer: 'No contracts. We work month-to-month with every client — including all Langley businesses.',
  },
  {
    question: 'What does digital marketing cost in Langley?',
    answer: 'Most Langley clients start with $500–$1,500/month in ad spend. Our management fee is transparent and quoted before you commit.',
  },
  {
    question: 'Does AP Digital work with Langley trades businesses?',
    answer: 'Yes — Langley trades are one of our strongest niches. We run Meta and Google Ads for plumbers, HVAC, electricians, roofers, and contractors across Langley City and Township.',
  },
  {
    question: 'Do you work with Langley farms or agricultural businesses?',
    answer: 'We primarily serve service-based businesses, but agri-tourism and farm retail can work very well with Meta Ads. If you run a farm market, u-pick operation, or agri-tourism destination in the Langley area, reach out and we\'ll walk you through whether a campaign makes sense for your model.',
  },
  {
    question: 'Can you target both Langley City and the Township?',
    answer: 'Yes — we geo-target Langley City and the Township separately or combined, depending on your service area. Many Langley businesses serve both, and we can set up campaigns that cover all of Langley, Walnut Grove, Willowbrook, Murrayville, Aldergrove, and surrounding areas simultaneously.',
  },
  {
    question: 'What results can Langley trades businesses expect?',
    answer: 'Most Langley contractors — plumbers, HVAC, electricians, roofers — see 10 to 30 qualified leads per month within 60 days of launching with AP Digital. Results depend on your service area, budget, and niche, but trades businesses in Langley consistently perform well because local search intent is high and the competition, while present, is beatable with a well-structured campaign.',
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    founderSchema,
    getServiceSchema('Digital Marketing Langley BC', DESC, '/langley'),
    getFAQSchema(faqs),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Langley', url: '/langley' },
    ]),
    getWebPageSchema(TITLE, DESC, '/langley'),
    {
      "@type": "LocalBusiness",
      "@id": "https://ap-digital.ca/langley",
      "name": "AP Digital — Langley Performance Marketing Agency",
      "description": DESC,
      "url": "https://ap-digital.ca/langley",
      "telephone": "+1-778-682-5772",
      "email": "apdigital.core@gmail.com",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Vancouver",
        "addressRegion": "BC",
        "postalCode": "V3Y 0G3",
        "addressCountry": "CA"
      },
      "areaServed": [
        { "@type": "City", "name": "Langley" },
        { "@type": "City", "name": "Langley City" },
        { "@type": "City", "name": "Aldergrove" },
        { "@type": "City", "name": "Walnut Grove" },
        { "@type": "City", "name": "Abbotsford" }
      ],
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      "founder": { "@type": "Person", "name": "Arjun Sharma" },
      "sameAs": ["https://ap-digital.ca"]
    }
  ]
};

const Langley = () => (
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
      <meta property="og:site_name" content="AP Digital" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={TITLE} />
      <meta name="twitter:description" content={DESC} />
      <meta name="twitter:image" content={OG_IMAGE} />
      <meta name="robots" content="index, follow" />
      
    </Helmet>
      <JsonLd data={structuredData} />
    <Header />
    <main id="main-content">

      {/* Hero */}
      <section className="relative bg-near-black pt-28 pb-20">
        <div className="container-custom">
          <div className="max-w-3xl animate-fade-up">
            <div className="mb-6">
              <img src={apLogo} alt="AP Digital Marketing" className="w-20 h-20 sm:w-24 sm:h-24 rounded-full" />
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              Performance Marketing Agency{' '}
              <span className="text-gradient">Langley BC</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-8">
              AP Digital helps Langley businesses get more leads using Meta Ads, Google Ads & social media. From Langley City to the Township — trades, salons, realtors & coaches. Month-to-month.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild variant="hero" size="xl" className="shadow-teal-lg">
                <a href="https://calendly.com/apdigital-core/20min" target="_blank" rel="noopener noreferrer">
                  Book Your Free Strategy Call
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button asChild variant="light" size="lg">
                <a href="/services/paid-ads">See Our Services</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Help */}
      <section className="bg-background py-20">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
            Who We Help in <span className="text-gradient">Langley</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            From Willowbrook to Murrayville, we help Langley businesses generate leads and fill their calendars.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-2xl p-6 hover:border-teal/30 transition-colors">
              <Zap className="w-8 h-8 text-teal mb-4" />
              <h3 className="font-display text-xl font-bold text-foreground mb-2">Trades & Contractors</h3>
              <p className="text-muted-foreground">Contractors across Langley City, Township & Fraser Valley staying booked with targeted Meta and Google ad campaigns.</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 hover:border-teal/30 transition-colors">
              <Star className="w-8 h-8 text-teal mb-4" />
              <h3 className="font-display text-xl font-bold text-foreground mb-2">Hair Salons & Beauty Studios</h3>
              <p className="text-muted-foreground">Filling appointment books in Willowbrook & Murrayville — consistent bookings that keep your salon running at full capacity.</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 hover:border-teal/30 transition-colors">
              <Target className="w-8 h-8 text-teal mb-4" />
              <h3 className="font-display text-xl font-bold text-foreground mb-2">Real Estate Agents</h3>
              <p className="text-muted-foreground">Buyer & seller leads across Langley's growing market — targeted campaigns that capture demand from a rapidly expanding region.</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 hover:border-teal/30 transition-colors">
              <Users className="w-8 h-8 text-teal mb-4" />
              <h3 className="font-display text-xl font-bold text-foreground mb-2">Coaches & Consultants</h3>
              <p className="text-muted-foreground">Attracting ideal clients from Langley and across BC with ad strategies built specifically for service-based coaches.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="bg-charcoal py-20">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground text-center mb-4">
            What's Included
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            Everything your Langley business needs to generate leads and grow — all managed under one roof.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {included.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-teal mt-0.5 shrink-0" />
                <span className="text-primary-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Langley Businesses Are Investing in Paid Ads */}
      <section className="bg-background py-20">
        <div className="container-custom max-w-4xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
            Why Langley Businesses Are Investing in <span className="text-gradient">Paid Ads</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            Langley is one of the fastest-growing communities in BC — and local businesses that move first on digital marketing are capturing market share that's hard to take back.
          </p>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              Langley — spanning both the City and the Township — is in the middle of a sustained growth surge that's creating enormous opportunity for local service businesses. Willowbrook continues to evolve as a commercial hub, drawing consumers from across the southern Fraser Valley. Murrayville, Walnut Grove, and Aldergrove have dense residential populations whose residents are increasingly searching for and booking local services online. This is the environment where a digital marketing agency in Langley BC that understands the local geography makes an outsized difference. Generic campaigns targeting broad Metro Vancouver audiences waste budget reaching people who would never drive to your location. Precision targeting at the neighbourhood level is what converts.
            </p>
            <p>
              Langley's market has a distinctive character: it's suburban and semi-rural, with strong community identity, high homeownership rates, and a trades market that reflects the active development and renovation happening throughout the Township. Lead generation in Langley for contractors — plumbers, HVAC companies, electricians, roofers — is particularly high-return because the demand is real and consistent. There's always a new build or renovation project in Walnut Grove or Willowbrook that needs service providers. Meta Ads work exceptionally well for Langley small business marketing because the demographic targeting lets you reach homeowners specifically, filtering out renters and apartment dwellers who are unlikely to need your services. That precision is the difference between an ad budget that pays for itself tenfold and one that bleeds money.
            </p>
            <p>
              What makes the current moment so important for a marketing agency Langley businesses should be acting on is the competitive window that still exists. Unlike Vancouver or Burnaby where every niche is saturated with advertisers driving up cost-per-click, Langley still offers relatively affordable ad costs with high intent. A plumber in Langley Township running Google Ads today is capturing leads at a fraction of what the same campaign costs in Vancouver. A salon in Willowbrook running Meta Ads can reach the entire Langley and Cloverdale market at lower CPMs than their counterparts in Metrotown or Brentwood. That window won't stay open as more businesses discover what's working — the time to build a dominant position in Langley's digital landscape is now, before competitors do.
            </p>
          </div>
        </div>
      </section>

      {/* Our Langley Marketing Process */}
      <section className="bg-charcoal py-20">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground text-center mb-4">
            Our Langley Marketing Process
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            A clear, proven process that gets your Langley business generating leads fast — with no guesswork.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-charcoal-light border border-gray-800 rounded-xl p-6">
              <div className="font-display text-3xl font-bold text-teal mb-3">1</div>
              <h3 className="font-display text-lg font-bold text-primary-foreground mb-2">Free Strategy Call</h3>
              <p className="text-muted-foreground text-sm">We learn your Langley market, your competition, and your goals. Whether you serve Langley City, the Township, or both — we build around your actual service area.</p>
            </div>
            <div className="bg-charcoal-light border border-gray-800 rounded-xl p-6">
              <div className="font-display text-3xl font-bold text-teal mb-3">2</div>
              <h3 className="font-display text-lg font-bold text-primary-foreground mb-2">Campaign Build</h3>
              <p className="text-muted-foreground text-sm">We build your Meta Ads or Google Ads campaign targeting Langley and surrounding areas — Willowbrook, Walnut Grove, Murrayville, Aldergrove, Cloverdale, and Abbotsford.</p>
            </div>
            <div className="bg-charcoal-light border border-gray-800 rounded-xl p-6">
              <div className="font-display text-3xl font-bold text-teal mb-3">3</div>
              <h3 className="font-display text-lg font-bold text-primary-foreground mb-2">Launch & Optimize</h3>
              <p className="text-muted-foreground text-sm">Live within 7 days. We monitor and optimize daily in the first 2 weeks to make sure your Langley campaign is generating real, qualified leads.</p>
            </div>
            <div className="bg-charcoal-light border border-gray-800 rounded-xl p-6">
              <div className="font-display text-3xl font-bold text-teal mb-3">4</div>
              <h3 className="font-display text-lg font-bold text-primary-foreground mb-2">Scale</h3>
              <p className="text-muted-foreground text-sm">Once leads are flowing, we scale what's working and cut what isn't. Most Langley clients see cost-per-lead improve significantly within the first 90 days.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Areas We Serve */}
      <section className="bg-background py-20">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
            Areas We Serve Near <span className="text-gradient">Langley</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
            Our campaigns cover all of Langley City, Langley Township, and the surrounding Fraser Valley communities. We target the specific areas where your customers live — not just a broad radius that wastes budget.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mb-16">
            {['Langley City', 'Walnut Grove', 'Murrayville', 'Willowbrook', 'Aldergrove', 'Cloverdale', 'Abbotsford'].map((area) => (
              <span key={area} className="rounded-full bg-muted px-4 py-2 text-sm text-foreground">
                {area}
              </span>
            ))}
          </div>

          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-4">
            Also Serving Metro Vancouver
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-8">
            We run campaigns across Metro Vancouver and the Fraser Valley. Click your city for localized information.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {[
              { city: 'Vancouver', href: '/vancouver' },
              { city: 'Surrey', href: '/surrey' },
              { city: 'Burnaby', href: '/burnaby' },
              { city: 'Richmond', href: '/richmond' },
              { city: 'Coquitlam', href: '/coquitlam' },
              { city: 'Abbotsford', href: '/abbotsford' },
            ].map(({ city, href }) => (
              <Link key={href} to={href} className="bg-muted rounded-xl p-4 text-center hover:bg-muted/80 transition-colors">
                <span className="font-medium text-foreground">{city}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why AP Digital */}
      <section className="bg-charcoal py-20">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground text-center mb-4">
            Why Langley Businesses Choose <span className="text-gradient">AP Digital</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            We're not a big agency with account managers and hand-offs. We're a focused team that delivers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <MapPin className="w-8 h-8 text-teal mb-4" />
              <h3 className="font-display text-lg font-bold text-foreground mb-2">Personal Management</h3>
              <p className="text-muted-foreground text-sm">Arjun Sharma personally manages every account. No outsourcing, no hand-offs, no junior staff touching your campaigns.</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <TrendingUp className="w-8 h-8 text-teal mb-4" />
              <h3 className="font-display text-lg font-bold text-foreground mb-2">No Contracts</h3>
              <p className="text-muted-foreground text-sm">Month-to-month with zero lock-in. We earn your business every single month by actually delivering results.</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <Zap className="w-8 h-8 text-teal mb-4" />
              <h3 className="font-display text-lg font-bold text-foreground mb-2">Fast Results</h3>
              <p className="text-muted-foreground text-sm">Most Langley clients see their first qualified leads within 2 weeks of launch. We move fast and optimize constantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background py-20">
        <div className="container-custom max-w-3xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            Common Questions
          </h2>
          <Accordion type="single" collapsible>
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-gray-800">
                <AccordionTrigger className="text-left text-foreground font-medium hover:text-teal">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Our Services */}
      <OurServices />

      <IndustriesWeServe />

      {/* Dark CTA */}
      <section className="bg-near-black py-20 text-center">
        <div className="container-custom max-w-2xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Grow Your <span className="text-gradient">Langley Business?</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Book a free 20-minute strategy call. We'll walk you through exactly what a campaign for your Langley business would look like. No pitch, no pressure.
          </p>
          <Button asChild variant="hero" size="xl" className="shadow-teal-lg">
            <a href="https://calendly.com/apdigital-core/20min" target="_blank" rel="noopener noreferrer">
              Book Your Free Strategy Call
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </Button>
        </div>
      </section>

    </main>
    <Footer />
  </>
);

export default Langley;

