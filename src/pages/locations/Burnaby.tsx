import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, TrendingUp, Star, Zap, Target, Users, MapPin } from 'lucide-react';
import OurServices from '@/components/OurServices';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { getServiceSchema, getBreadcrumbSchema, getFAQSchema, getWebPageSchema } from '@/lib/structuredData';

const TITLE = 'Burnaby Marketing Agency — No Contracts, 8.2x ROAS | AP Digital';
const DESC = 'Burnaby digital marketing agency for salons, trades, realtors & coaches. Google Ads, Meta Ads & SEO delivering 8.2x avg ROAS. Month-to-month — no lock-in.';
const CANONICAL = 'https://ap-digital.ca/burnaby';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const included = [
  'Meta Ads targeting Burnaby & Tri-Cities',
  'Google Ads for high-intent searches',
  'Google Business Profile optimization',
  'Review generation & reputation management',
  'Social media management',
  'Landing pages for Burnaby leads',
  'Monthly ROI reporting',
  'Local SEO for Burnaby',
];

const faqs = [
  {
    question: 'How quickly will I get leads in Burnaby?',
    answer: 'Most Burnaby businesses see their first leads within 2 weeks of launching their Meta Ads campaign with AP Digital.',
  },
  {
    question: 'Is there a contract for Burnaby clients?',
    answer: 'No lock-in contracts. AP Digital works month-to-month with every client in Burnaby and across Metro Vancouver.',
  },
  {
    question: 'How much does digital marketing cost in Burnaby?',
    answer: 'Most clients start with $500–$1,500/month in ad spend. Our management fee is separate, fully transparent, and quoted before you commit.',
  },
  {
    question: 'Who manages my account at AP Digital?',
    answer: 'Arjun Sharma personally manages every client account. No outsourcing, no junior account managers, no handoffs.',
  },
  {
    question: 'Do you work with Burnaby restaurants and retail businesses?',
    answer: 'We primarily serve service-based businesses — trades, salons, real estate, coaches, and health & wellness. If you run a restaurant or retail shop in Burnaby, reach out and we\'ll let you know honestly whether paid ads are the right fit for your specific situation.',
  },
  {
    question: 'What\'s the minimum budget for Burnaby clients?',
    answer: 'We recommend a minimum of $500/month in ad spend to generate meaningful results. Our management fee is quoted separately and upfront — no surprises. For most Burnaby businesses, the total investment starts in the $1,000–$2,000/month range including both ad spend and management.',
  },
  {
    question: 'Can you help a new Burnaby business with no online presence?',
    answer: 'Yes — we build from scratch. If your Burnaby business doesn\'t yet have a Google Business Profile, landing page, or social media presence, we handle all of it. We set up your GBP, build a high-converting landing page, launch your ads, and establish your social media foundation. You don\'t need to have everything in place before working with us.',
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    getServiceSchema('Digital Marketing Burnaby BC', DESC, '/burnaby'),
    getFAQSchema(faqs),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Burnaby', url: '/burnaby' },
    ]),
    getWebPageSchema(TITLE, DESC, '/burnaby'),
    {
      "@type": "LocalBusiness",
      "@id": "https://ap-digital.ca/burnaby",
      "name": "AP Digital — Burnaby Digital Marketing Agency",
      "description": DESC,
      "url": "https://ap-digital.ca/burnaby",
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
        { "@type": "City", "name": "Burnaby" },
        { "@type": "City", "name": "New Westminster" },
        { "@type": "City", "name": "Coquitlam" },
        { "@type": "City", "name": "North Burnaby" },
        { "@type": "City", "name": "Metrotown" }
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

const Burnaby = () => (
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
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
    <Header />
    <main id="main-content">

      {/* Hero */}
      <section className="relative bg-near-black pt-28 pb-20">
        <div className="container-custom">
          <div className="max-w-3xl animate-fade-up">
            <div className="inline-flex items-center gap-2 border border-teal/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
              <span className="text-teal text-sm font-medium">Serving Burnaby & Tri-Cities, BC</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              Digital Marketing Agency{' '}
              <span className="text-gradient">Burnaby BC</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-8">
              AP Digital helps Burnaby businesses get a predictable flow of qualified leads using Meta Ads, Google Ads & social media. No lock-in contracts. Personal service from founder Arjun Sharma.
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

      {/* Stats Strip */}
      <section className="bg-charcoal py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="font-display text-4xl font-bold text-teal mb-1">2 Weeks</div>
              <div className="text-muted-foreground text-sm">Average time to first leads</div>
            </div>
            <div>
              <div className="font-display text-4xl font-bold text-teal mb-1">5–10x</div>
              <div className="text-muted-foreground text-sm">Return on ad spend</div>
            </div>
            <div>
              <div className="font-display text-4xl font-bold text-teal mb-1">$500/mo</div>
              <div className="text-muted-foreground text-sm">Starting — no contracts</div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Help */}
      <section className="bg-background py-20">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
            Who We Help in <span className="text-gradient">Burnaby</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            From Metrotown to Brentwood, we help local Burnaby businesses compete and win online.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-2xl p-6 hover:border-teal/30 transition-colors">
              <Zap className="w-8 h-8 text-teal mb-4" />
              <h3 className="font-display text-xl font-bold text-foreground mb-2">Trades & Contractors</h3>
              <p className="text-muted-foreground">Plumbers, HVAC, and electricians across Burnaby & North Shore getting consistent job bookings through targeted campaigns.</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 hover:border-teal/30 transition-colors">
              <Star className="w-8 h-8 text-teal mb-4" />
              <h3 className="font-display text-xl font-bold text-foreground mb-2">Hair Salons & Beauty Studios</h3>
              <p className="text-muted-foreground">Consistent bookings for salons near Metrotown & Brentwood — no more slow weeks or empty appointment books.</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 hover:border-teal/30 transition-colors">
              <Target className="w-8 h-8 text-teal mb-4" />
              <h3 className="font-display text-xl font-bold text-foreground mb-2">Real Estate Agents</h3>
              <p className="text-muted-foreground">Buyer & seller leads in Burnaby's competitive condo market — targeted ads that reach motivated buyers and sellers.</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 hover:border-teal/30 transition-colors">
              <Users className="w-8 h-8 text-teal mb-4" />
              <h3 className="font-display text-xl font-bold text-foreground mb-2">Coaches & Consultants</h3>
              <p className="text-muted-foreground">Growing coaching businesses across Metro Vancouver with proven ad strategies that attract ideal clients consistently.</p>
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
            Everything your Burnaby business needs to generate leads and grow — all managed under one roof.
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

      {/* Why Burnaby Businesses Are Investing in Paid Ads */}
      <section className="bg-background py-20">
        <div className="container-custom max-w-4xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
            Why Burnaby Businesses Are Investing in <span className="text-gradient">Paid Ads</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            Burnaby sits at the centre of Metro Vancouver's economy — and local competition for customers is intensifying every year.
          </p>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              Burnaby is one of BC's most commercially dense cities, with distinct neighbourhoods that each attract different consumer profiles. Metrotown draws high foot traffic and houses hundreds of service businesses competing for the same local clientele. Brentwood has undergone a major transformation with its new towers and retail district, creating a fresh influx of residents who need local service providers — from trades to health and wellness. North Burnaby and Edmonds have established residential bases where small business marketing in Burnaby is shifting rapidly toward digital channels. As a digital marketing agency in Burnaby BC, we understand that winning in this market requires more than just showing up online — it requires showing up at the exact moment your ideal customer is searching or scrolling.
            </p>
            <p>
              The density of Burnaby's market is both an opportunity and a challenge. There are thousands of potential clients within a tight geographic radius, which makes paid advertising extraordinarily cost-efficient compared to cities with more dispersed populations. Lead generation in Burnaby through Google Ads means your business appears at the top of search results when someone in Metrotown types "HVAC repair near me" or when a Brentwood resident searches "hair salon Burnaby." Meta Ads let you layer on demographic and behavioural targeting — reaching the exact homeowner or lifestyle profile that converts best for your business. For Burnaby small business marketing, the combination of search intent (Google) and social discovery (Meta) creates a comprehensive digital presence that captures demand at every stage of the customer journey.
            </p>
            <p>
              What separates the Burnaby businesses that dominate their niche from those that struggle to break through is consistency. The businesses winning in Metrotown, Brentwood, North Burnaby, and Edmonds aren't spending more on ads — they're spending smarter. They have campaigns that are precisely geo-targeted, continuously optimized, and tied to landing pages designed specifically to convert Burnaby visitors into booked appointments or phone calls. As a focused marketing agency Burnaby clients rely on month after month, AP Digital brings that precision without the overhead of a large agency. No layers of account managers between you and the person making decisions on your campaigns — just direct, results-focused management from founder Arjun Sharma.
            </p>
          </div>
        </div>
      </section>

      {/* Our Burnaby Marketing Process */}
      <section className="bg-charcoal py-20">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground text-center mb-4">
            Our Burnaby Marketing Process
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            A clear, proven process that gets your Burnaby business generating leads fast — with no guesswork.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-charcoal-light border border-gray-800 rounded-xl p-6">
              <div className="font-display text-3xl font-bold text-teal mb-3">1</div>
              <h3 className="font-display text-lg font-bold text-primary-foreground mb-2">Free Strategy Call</h3>
              <p className="text-muted-foreground text-sm">We learn your Burnaby market, your competition, and your goals. Every campaign starts with a clear picture of what success looks like for your specific business.</p>
            </div>
            <div className="bg-charcoal-light border border-gray-800 rounded-xl p-6">
              <div className="font-display text-3xl font-bold text-teal mb-3">2</div>
              <h3 className="font-display text-lg font-bold text-primary-foreground mb-2">Campaign Build</h3>
              <p className="text-muted-foreground text-sm">We build your Meta Ads or Google Ads campaign targeting Burnaby and surrounding areas — Metrotown, Brentwood, North Burnaby, Edmonds, and beyond.</p>
            </div>
            <div className="bg-charcoal-light border border-gray-800 rounded-xl p-6">
              <div className="font-display text-3xl font-bold text-teal mb-3">3</div>
              <h3 className="font-display text-lg font-bold text-primary-foreground mb-2">Launch & Optimize</h3>
              <p className="text-muted-foreground text-sm">Live within 7 days. We monitor and optimize daily in the first 2 weeks to ensure your Burnaby campaign is performing from day one.</p>
            </div>
            <div className="bg-charcoal-light border border-gray-800 rounded-xl p-6">
              <div className="font-display text-3xl font-bold text-teal mb-3">4</div>
              <h3 className="font-display text-lg font-bold text-primary-foreground mb-2">Scale</h3>
              <p className="text-muted-foreground text-sm">Once leads are flowing, we scale what's working and cut what isn't. Your cost-per-lead improves as the campaign matures and data builds.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Areas We Serve */}
      <section className="bg-background py-20">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
            Areas We Serve Near <span className="text-gradient">Burnaby</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
            Our campaigns cover all of Burnaby and the surrounding Metro Vancouver region. We geo-target your specific neighbourhoods so your budget reaches the right customers — not just anyone in the Lower Mainland.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mb-16">
            {['Metrotown', 'Brentwood', 'North Burnaby', 'Edmonds', 'New Westminster', 'Coquitlam', 'Vancouver East'].map((area) => (
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
              { city: 'Richmond', href: '/richmond' },
              { city: 'Langley', href: '/langley' },
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
            Why Burnaby Businesses Choose <span className="text-gradient">AP Digital</span>
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
              <p className="text-muted-foreground text-sm">Most Burnaby clients see their first qualified leads within 2 weeks of launch. We move fast and optimize constantly.</p>
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

      {/* Dark CTA */}
      <section className="bg-near-black py-20 text-center">
        <div className="container-custom max-w-2xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Grow Your <span className="text-gradient">Burnaby Business?</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Book a free 20-minute strategy call. We'll show you exactly what we'd run for your business and what results to expect. No pitch, no pressure.
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

export default Burnaby;

