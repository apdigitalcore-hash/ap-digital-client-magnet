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

const TITLE = 'Richmond Digital Marketing Agency & Services | AP Digital BC';
const DESC = 'Richmond digital marketing agency offering Google Ads, Meta Ads & SEO services. For salons, trades, realtors & coaches in Richmond BC. 5-10x ROAS.';
const CANONICAL = 'https://ap-digital.ca/richmond';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const included = [
  'Meta Ads targeting Richmond & South Vancouver',
  'Google Ads for high-intent local searches',
  'Google Business Profile setup & optimization',
  'Review generation & reputation management',
  'Short-form video content creation',
  'Landing pages built for Richmond leads',
  'Monthly ROI reporting — leads & revenue',
  'Local SEO for Richmond service areas',
];

const faqs = [
  {
    question: 'How quickly will I see leads as a Richmond business?',
    answer: 'Most Richmond businesses see their first qualified leads within 2 weeks of launching their campaign. Google Ads can produce results within days for high-intent searches like "plumber Richmond BC" — Meta Ads typically optimize within 1–2 weeks.',
  },
  {
    question: 'Do Richmond clients need a long-term contract?',
    answer: 'No contracts. AP Digital works month-to-month with every client in Richmond and across Metro Vancouver. We earn your business with results, not lock-in.',
  },
  {
    question: 'How much does digital marketing cost in Richmond?',
    answer: 'Most Richmond clients start with $500–$1,500/month in ad spend. Our management fee is separate, transparent, and quoted before you commit — no surprises.',
  },
  {
    question: 'Who personally manages my Richmond campaign?',
    answer: 'Arjun Sharma personally manages every AP Digital account. No outsourcing, no junior account managers. You talk directly to the person running your Richmond campaign.',
  },
  {
    question: 'What industries do you serve in Richmond BC?',
    answer: 'We specialize in four verticals in Richmond: trades and home services (plumbers, HVAC, electricians), hair salons and beauty studios, real estate agents, and coaches and consultants. Richmond\'s large service-based business community is exactly where we operate.',
  },
  {
    question: 'Can you run bilingual ads for my Richmond business?',
    answer: 'Yes. Richmond has a large Mandarin and Cantonese-speaking demographic, and we can build campaigns that reach both English-speaking and Chinese-Canadian audiences effectively. We advise on targeting and messaging to maximize reach across Richmond\'s diverse community.',
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    getServiceSchema('Digital Marketing Richmond BC', DESC, '/richmond'),
    getFAQSchema(faqs),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Richmond', url: '/richmond' },
    ]),
    getWebPageSchema(TITLE, DESC, '/richmond'),
    {
      "@type": "LocalBusiness",
      "@id": "https://ap-digital.ca/richmond",
      "name": "AP Digital — Richmond BC Digital Marketing Agency",
      "description": DESC,
      "url": "https://ap-digital.ca/richmond",
      "telephone": "+1-778-682-5772",
      "email": "apdigital.core@gmail.com",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Vancouver",
        "addressRegion": "BC",
        "addressCountry": "CA"
      },
      "areaServed": [
        { "@type": "City", "name": "Richmond" },
        { "@type": "City", "name": "Steveston" },
        { "@type": "City", "name": "City Centre Richmond" },
        { "@type": "City", "name": "Brighouse" },
        { "@type": "City", "name": "Broadmoor" }
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

const Richmond = () => (
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
              <span className="text-teal text-sm font-medium">Serving Richmond & South Vancouver, BC</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              Digital Marketing Agency{' '}
              <span className="text-gradient">Richmond BC</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-8">
              AP Digital helps Richmond businesses get a predictable flow of qualified leads using Meta Ads, Google Ads & social media. No lock-in contracts. Personal service from founder Arjun Sharma.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild variant="hero" size="xl" className="shadow-teal-lg">
                <a href="https://calendly.com/apdigital-core/30min" target="_blank" rel="noopener noreferrer">
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
            Who We Help in <span className="text-gradient">Richmond</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            From the No. 3 Road corridor to Steveston, we generate qualified leads for local Richmond businesses.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-2xl p-6 hover:border-teal/30 transition-colors">
              <Zap className="w-8 h-8 text-teal mb-4" />
              <h3 className="font-display text-xl font-bold text-foreground mb-2">Trades & Contractors</h3>
              <p className="text-muted-foreground">Plumbers, HVAC, electricians, and roofers across Richmond capturing local job searches from homeowners who need help now.</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 hover:border-teal/30 transition-colors">
              <Star className="w-8 h-8 text-teal mb-4" />
              <h3 className="font-display text-xl font-bold text-foreground mb-2">Hair Salons & Beauty Studios</h3>
              <p className="text-muted-foreground">Consistent bookings for Richmond salons — reaching the area's affluent residential base with targeted Instagram and Facebook ads.</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 hover:border-teal/30 transition-colors">
              <Target className="w-8 h-8 text-teal mb-4" />
              <h3 className="font-display text-xl font-bold text-foreground mb-2">Real Estate Agents</h3>
              <p className="text-muted-foreground">Buyer & seller leads in Richmond's high-demand real estate market — targeted campaigns that reach motivated homeowners and investors.</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 hover:border-teal/30 transition-colors">
              <Users className="w-8 h-8 text-teal mb-4" />
              <h3 className="font-display text-xl font-bold text-foreground mb-2">Coaches & Consultants</h3>
              <p className="text-muted-foreground">Growing coaching and consulting businesses in Richmond and across Metro Vancouver with ad strategies that attract ideal, high-value clients.</p>
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
            Everything your Richmond business needs to generate leads consistently — all managed under one roof.
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

      {/* Why Richmond Businesses */}
      <section className="bg-background py-20">
        <div className="container-custom max-w-4xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
            Why Richmond Businesses Are Investing in <span className="text-gradient">Paid Ads</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            Richmond is Metro Vancouver's second-largest city and one of its most commercially active — digital visibility is now the primary growth lever.
          </p>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              Richmond is one of the most economically active cities in Metro Vancouver — and its business landscape is uniquely diverse. The No. 3 Road corridor from Brighouse to Aberdeen Centre houses an extraordinary density of service businesses competing for the same local consumer base. Steveston's tight-knit community attracts residents who are highly loyal to local businesses but need to discover them first. City Centre Richmond draws a mix of long-term residents and newcomers who discover most of their service providers through Google searches and social media feeds. For a digital marketing agency serving Richmond BC businesses, understanding this diversity is essential — a one-size-fits-all campaign doesn't work here. Neighbourhood-level targeting and culturally aware messaging is what gets results.
            </p>
            <p>
              Richmond's consumer behaviour has shifted decisively online. When a homeowner in Broadmoor needs an HVAC technician, they're not asking neighbours — they're searching Google within minutes. When someone in Steveston is looking for a new salon, they're clicking on Instagram ads and checking Google reviews before they book. When a Richmond real estate agent wants more listings, they need digital campaigns reaching homeowners in the specific submarkets they serve. The businesses in Richmond that are running targeted Google Ads and Meta Ads campaigns are consistently out-competing businesses relying on referrals and walk-in traffic alone. The gap between digitally active businesses and those without a structured ad strategy is widening every quarter.
            </p>
            <p>
              What sets paid advertising apart from other growth strategies in Richmond is the immediacy and precision of results. A well-built Google Ads campaign targeting "plumber Richmond BC" or "HVAC Richmond" can generate job leads the same day it goes live — without waiting months for SEO to compound. A Meta Ads campaign targeting the right demographic in a specific Richmond postal code can fill a salon's appointment book within two weeks of launch. This is why Richmond businesses in our core verticals — trades, beauty, real estate, and coaching — consistently see strong returns on ad spend when campaigns are built correctly from the start.
            </p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-charcoal py-20">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground text-center mb-4">
            Our Richmond Marketing Process
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            A clear, proven process that gets your Richmond business generating leads fast.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-charcoal-light border border-gray-800 rounded-xl p-6">
              <div className="font-display text-3xl font-bold text-teal mb-3">1</div>
              <h3 className="font-display text-lg font-bold text-primary-foreground mb-2">Free Strategy Call</h3>
              <p className="text-muted-foreground text-sm">We learn your Richmond market, your service area, your competition, and your goals — before we recommend anything.</p>
            </div>
            <div className="bg-charcoal-light border border-gray-800 rounded-xl p-6">
              <div className="font-display text-3xl font-bold text-teal mb-3">2</div>
              <h3 className="font-display text-lg font-bold text-primary-foreground mb-2">Campaign Build</h3>
              <p className="text-muted-foreground text-sm">We build your Meta Ads or Google Ads campaign targeting your exact Richmond service area — City Centre, Steveston, Broadmoor, Brighouse — with creatives built for your audience.</p>
            </div>
            <div className="bg-charcoal-light border border-gray-800 rounded-xl p-6">
              <div className="font-display text-3xl font-bold text-teal mb-3">3</div>
              <h3 className="font-display text-lg font-bold text-primary-foreground mb-2">Launch & Optimize</h3>
              <p className="text-muted-foreground text-sm">Live within 7 days. We optimize daily in the first 2 weeks to make sure your Richmond campaign hits its stride fast.</p>
            </div>
            <div className="bg-charcoal-light border border-gray-800 rounded-xl p-6">
              <div className="font-display text-3xl font-bold text-teal mb-3">4</div>
              <h3 className="font-display text-lg font-bold text-primary-foreground mb-2">Scale</h3>
              <p className="text-muted-foreground text-sm">Once leads flow consistently, we scale what's working and cut what isn't. Your cost-per-lead drops as the campaign matures.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Areas Served */}
      <section className="bg-background py-20">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
            Areas We Serve Near <span className="text-gradient">Richmond</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
            Our campaigns cover all of Richmond and surrounding areas. We geo-target your exact service zone so every ad dollar works as hard as possible.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mb-16">
            {['City Centre', 'Steveston', 'Broadmoor', 'Brighouse', 'Sea Island', 'Hamilton', 'Shellmont', 'South Arm', 'Lackner'].map((area) => (
              <span key={area} className="rounded-full bg-muted px-4 py-2 text-sm text-foreground">
                {area}
              </span>
            ))}
          </div>

          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-4">
            Also Serving Metro Vancouver
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {[
              { city: 'Vancouver', href: '/vancouver' },
              { city: 'Surrey', href: '/surrey' },
              { city: 'Burnaby', href: '/burnaby' },
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
            Why Richmond Businesses Choose <span className="text-gradient">AP Digital</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            Not a big agency with account managers and hand-offs. A focused team that delivers.
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
              <p className="text-muted-foreground text-sm">Month-to-month with zero lock-in. We earn your business every single month by delivering results you can measure.</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <Zap className="w-8 h-8 text-teal mb-4" />
              <h3 className="font-display text-lg font-bold text-foreground mb-2">Fast Results</h3>
              <p className="text-muted-foreground text-sm">Most Richmond clients see their first qualified leads within 2 weeks of launch. We move fast and optimize constantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background py-20">
        <div className="container-custom max-w-3xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            Common Questions — Richmond Businesses
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

      <OurServices />

      {/* Dark CTA */}
      <section className="bg-near-black py-20 text-center">
        <div className="container-custom max-w-2xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Grow Your <span className="text-gradient">Richmond Business?</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Book a free 20-minute strategy call. We'll show you exactly what a campaign looks like for your business and budget. No pitch, no pressure.
          </p>
          <Button asChild variant="hero" size="xl" className="shadow-teal-lg">
            <a href="https://calendly.com/apdigital-core/30min" target="_blank" rel="noopener noreferrer">
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

export default Richmond;
