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

const TITLE = 'Coquitlam Marketing Agency | Leads & Ads | AP Digital';
const DESC = 'Coquitlam digital marketing focused on getting you more leads. Google Ads, Meta Ads & local SEO for salons, trades & realtors. 90-day guarantee. No lock-in.';
const CANONICAL = 'https://ap-digital.ca/coquitlam';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const included = [
  'Meta Ads targeting Coquitlam & Tri-Cities',
  'Google Ads for high-intent searches',
  'Google Business Profile optimization',
  'Review generation & reputation management',
  'Social media management',
  'Landing pages for Coquitlam leads',
  'Monthly ROI reporting',
  'Local SEO for Coquitlam & Port Moody',
];

const faqs = [
  {
    question: 'How quickly will I see leads in Coquitlam?',
    answer: 'Most Coquitlam businesses see their first qualified leads within 2 weeks of launching Meta Ads with AP Digital.',
  },
  {
    question: 'Is there a long-term contract for Coquitlam clients?',
    answer: 'No lock-in contracts. AP Digital works month-to-month with every client in Coquitlam and the Tri-Cities.',
  },
  {
    question: 'How much does digital marketing cost in Coquitlam?',
    answer: 'Most clients start with $500–$1,500/month in ad spend. Our management fee is transparent and quoted before you commit to anything.',
  },
  {
    question: 'Does AP Digital serve Port Moody and Port Coquitlam too?',
    answer: 'Yes — we run campaigns across the entire Tri-Cities area including Coquitlam, Port Moody, and Port Coquitlam, as well as New Westminster and Burnaby.',
  },
  {
    question: 'Do you serve Port Moody and Port Coquitlam too?',
    answer: 'Yes — AP Digital provides full Tri-Cities coverage. Our campaigns geo-target Coquitlam, Port Coquitlam (PoCo), Port Moody, and New Westminster simultaneously or individually depending on your service area. If your customers come from anywhere in the Tri-Cities, we make sure your ads reach them.',
  },
  {
    question: 'Can you help a Coquitlam business compete with Vancouver companies?',
    answer: 'Yes — this is one of the biggest advantages of geo-targeted paid advertising. When you run Google Ads or Meta Ads for a Coquitlam business, you only pay to reach people in your actual service area. You\'re not competing with budget against every Vancouver agency in a city-wide auction. You\'re targeting Westwood Plateau, Burke Mountain, Maillardville, and the surrounding Tri-Cities area specifically — which means lower costs, higher relevance, and better conversion rates than trying to run a Metro-wide campaign.',
  },
  {
    question: 'What\'s the best platform for Coquitlam service businesses?',
    answer: 'It depends on your business type. For high-intent searches — someone actively looking for "plumber Coquitlam" or "electrician Port Moody" — Google Ads is typically the highest-converting channel. For awareness, retargeting, and businesses where customers need to see you multiple times before booking (salons, coaches, health & wellness), Meta Ads on Facebook and Instagram work exceptionally well. Most Coquitlam service businesses benefit from both platforms running together. We assess your specific situation on the strategy call and recommend the right starting point.',
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    founderSchema,
    getServiceSchema('Digital Marketing Coquitlam BC', DESC, '/coquitlam'),
    getFAQSchema(faqs),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Coquitlam', url: '/coquitlam' },
    ]),
    getWebPageSchema(TITLE, DESC, '/coquitlam'),
    {
      "@type": "LocalBusiness",
      "@id": "https://ap-digital.ca/coquitlam",
      "name": "AP Digital — Coquitlam Digital Marketing Agency",
      "description": DESC,
      "url": "https://ap-digital.ca/coquitlam",
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
        { "@type": "City", "name": "Coquitlam" },
        { "@type": "City", "name": "Port Moody" },
        { "@type": "City", "name": "Port Coquitlam" },
        { "@type": "City", "name": "New Westminster" },
        { "@type": "City", "name": "Vancouver" }
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

const Coquitlam = () => (
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
              <span className="text-teal text-sm font-medium">Serving Coquitlam & Tri-Cities, BC</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              Digital Marketing Agency{' '}
              <span className="text-gradient">Coquitlam BC</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-8">
              AP Digital helps Coquitlam businesses — and across Port Moody & Port Coquitlam — generate qualified leads with Meta Ads, Google Ads & social media. No contracts, month-to-month.
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
            Who We Help in <span className="text-gradient">Coquitlam</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            Across Coquitlam, Port Moody, and Port Coquitlam — we help local businesses generate leads and grow.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-2xl p-6 hover:border-teal/30 transition-colors">
              <Zap className="w-8 h-8 text-teal mb-4" />
              <h3 className="font-display text-xl font-bold text-foreground mb-2">Trades & Contractors</h3>
              <p className="text-muted-foreground">Plumbers, HVAC, and electricians across Coquitlam & Tri-Cities staying booked solid with precision-targeted campaigns.</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 hover:border-teal/30 transition-colors">
              <Star className="w-8 h-8 text-teal mb-4" />
              <h3 className="font-display text-xl font-bold text-foreground mb-2">Hair Salons & Beauty Studios</h3>
              <p className="text-muted-foreground">Consistent bookings in Coquitlam & Port Moody — no more relying on word-of-mouth and hoping the phone rings.</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 hover:border-teal/30 transition-colors">
              <Target className="w-8 h-8 text-teal mb-4" />
              <h3 className="font-display text-xl font-bold text-foreground mb-2">Real Estate Agents</h3>
              <p className="text-muted-foreground">Leads across the Tri-Cities market — targeted ad campaigns that reach motivated buyers and sellers throughout the area.</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 hover:border-teal/30 transition-colors">
              <Users className="w-8 h-8 text-teal mb-4" />
              <h3 className="font-display text-xl font-bold text-foreground mb-2">Coaches & Consultants</h3>
              <p className="text-muted-foreground">Growing coaching businesses across Metro Vancouver with proven ad strategies that attract ideal clients online.</p>
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
            Everything your Coquitlam business needs to generate leads and grow — all managed under one roof.
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

      {/* Why Coquitlam Businesses Are Investing in Paid Ads */}
      <section className="bg-background py-20">
        <div className="container-custom max-w-4xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
            Why Coquitlam Businesses Are Investing in <span className="text-gradient">Paid Ads</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            The Tri-Cities are among the fastest-growing markets in Metro Vancouver — and local businesses that invest in digital marketing now are building advantages that compound over time.
          </p>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              Coquitlam has transformed dramatically over the last decade. Westwood Plateau and Burke Mountain are now established residential communities with tens of thousands of homeowners who need local services — from trades to health and wellness to professional coaching. Maillardville, one of the oldest neighbourhoods in the Tri-Cities, has its own commercial strip and a tight-knit community increasingly using online search to find local businesses. Port Moody and Port Coquitlam round out the Tri-Cities with their own distinct populations and commercial areas. For a digital marketing agency in Coquitlam BC, this geographic diversity is an asset — it means there's a large, multi-neighbourhood market to target, and businesses that get their geo-targeting right see dramatically better results than those running city-wide or Metro-wide campaigns.
            </p>
            <p>
              The case for paid advertising as the primary lead generation channel for Coquitlam small businesses is straightforward: the Tri-Cities market is large enough to support real ad volume, but local competition hasn't caught up to Vancouver-level saturation yet. A plumber in Coquitlam running Google Ads today is not bidding against 50 other local plumbers the way a Vancouver contractor would be. A salon in Port Moody running Meta Ads can reach every woman in the target age demographic within a 10km radius at costs that would shock a salon owner in Burnaby or Vancouver. Lead generation in Coquitlam, Port Moody, and Port Coquitlam is still a relatively undercrowded space in the paid advertising ecosystem — and that translates directly to lower cost-per-lead for businesses that move now.
            </p>
            <p>
              What drives results for a marketing agency Coquitlam businesses can rely on isn't just running ads — it's the combination of precise targeting, compelling creative, and landing pages built to convert. We target Westwood Plateau homeowners differently than we target Burke Mountain families because their demographics, income levels, and service needs differ. We build separate ad sets for Coquitlam proper versus Port Moody versus PoCo when the data supports it, ensuring your budget is concentrated where your best customers actually live. That level of Tri-Cities-specific precision is what separates campaigns that generate 5–10 qualified leads per week from campaigns that generate noise. For Coquitlam service businesses ready to stop relying on referrals and build a predictable lead pipeline, paid advertising managed by someone who knows this market is the highest-leverage investment you can make.
            </p>
          </div>
        </div>
      </section>

      {/* Our Coquitlam Marketing Process */}
      <section className="bg-charcoal py-20">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground text-center mb-4">
            Our Coquitlam Marketing Process
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            A clear, proven process that gets your Coquitlam business generating leads fast — with no guesswork.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-charcoal-light border border-gray-800 rounded-xl p-6">
              <div className="font-display text-3xl font-bold text-teal mb-3">1</div>
              <h3 className="font-display text-lg font-bold text-primary-foreground mb-2">Free Strategy Call</h3>
              <p className="text-muted-foreground text-sm">We learn your Coquitlam market, your competition, and your goals. Whether you serve Coquitlam, Port Moody, PoCo, or all three — we plan around your service area.</p>
            </div>
            <div className="bg-charcoal-light border border-gray-800 rounded-xl p-6">
              <div className="font-display text-3xl font-bold text-teal mb-3">2</div>
              <h3 className="font-display text-lg font-bold text-primary-foreground mb-2">Campaign Build</h3>
              <p className="text-muted-foreground text-sm">We build your Meta Ads or Google Ads campaign targeting Coquitlam and surrounding areas — Westwood Plateau, Burke Mountain, Port Moody, Port Coquitlam, and New Westminster.</p>
            </div>
            <div className="bg-charcoal-light border border-gray-800 rounded-xl p-6">
              <div className="font-display text-3xl font-bold text-teal mb-3">3</div>
              <h3 className="font-display text-lg font-bold text-primary-foreground mb-2">Launch & Optimize</h3>
              <p className="text-muted-foreground text-sm">Live within 7 days. We monitor and optimize daily in the first 2 weeks to ensure your Tri-Cities campaign is delivering real, qualified leads from day one.</p>
            </div>
            <div className="bg-charcoal-light border border-gray-800 rounded-xl p-6">
              <div className="font-display text-3xl font-bold text-teal mb-3">4</div>
              <h3 className="font-display text-lg font-bold text-primary-foreground mb-2">Scale</h3>
              <p className="text-muted-foreground text-sm">Once leads are flowing, we scale what's working and cut what isn't. Your cost-per-lead drops and your pipeline becomes predictable and reliable.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Areas We Serve */}
      <section className="bg-background py-20">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
            Areas We Serve Near <span className="text-gradient">Coquitlam</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
            Our campaigns cover all of Coquitlam and the Tri-Cities region. We geo-target your exact service area so every ad dollar reaches the neighbourhoods and communities where your best customers live.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mb-16">
            {['Port Moody', 'Port Coquitlam', 'Burnaby', 'New Westminster', 'Pitt Meadows', 'Maple Ridge'].map((area) => (
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
              { city: 'Langley', href: '/langley' },
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
            Why Coquitlam Businesses Choose <span className="text-gradient">AP Digital</span>
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
              <p className="text-muted-foreground text-sm">Most Coquitlam clients see their first qualified leads within 2 weeks of launch. We move fast and optimize constantly.</p>
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
            Ready to Grow Your <span className="text-gradient">Coquitlam Business?</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Book a free 20-minute strategy call. We'll show you what a campaign for your Coquitlam business would look like and what to expect. No pitch, no pressure.
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

export default Coquitlam;

