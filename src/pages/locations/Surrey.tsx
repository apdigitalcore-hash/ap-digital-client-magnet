import { Helmet } from 'react-helmet-async';
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

const TITLE = 'Digital Marketing Agency Surrey BC | Meta Ads & Google Ads | AP Digital';
const DESC = 'Top-rated digital marketing agency in Surrey, BC. AP Digital runs Meta Ads & Google Ads for Surrey trades, salons, realtors & coaches. Get leads in 2 weeks. No contracts.';
const CANONICAL = 'https://ap-digital.ca/surrey';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const included = [
  'Meta Ads targeting Surrey & South Fraser',
  'Google Ads for local service searches',
  'Google Business Profile optimization',
  'Review generation & reputation management',
  'Social media content creation',
  'High-converting landing pages',
  'Monthly ROI reporting',
  'Local SEO for Surrey',
];

const faqs = [
  {
    question: 'How quickly will I see leads in Surrey?',
    answer: 'Most Surrey businesses see their first leads within 2 weeks of launching Meta Ads with AP Digital.',
  },
  {
    question: 'Do I have to sign a long-term contract?',
    answer: 'No contracts. We work month-to-month with every client in Surrey and across Metro Vancouver.',
  },
  {
    question: 'How much does digital marketing cost in Surrey?',
    answer: 'Most clients start with $500–$1,500/month in ad spend. Our management fee is transparent and quoted upfront.',
  },
  {
    question: 'Will Arjun personally manage my account?',
    answer: 'Yes. Arjun Sharma personally manages every client account at AP Digital. No outsourcing, no junior account managers.',
  },
  {
    question: 'Do you run Google Ads for Surrey businesses?',
    answer: 'Yes — we run both Google Ads and Meta Ads for Surrey businesses. Which platform we prioritize depends on your business type. For high-intent searches like "plumber Surrey" or "electrician near me," Google Ads typically delivers the best results. For awareness and retargeting — salons, coaches, and health & wellness — Meta Ads often wins. We recommend the right mix after your free strategy call.',
  },
  {
    question: 'What industries do you serve in Surrey?',
    answer: 'We work with all service-based businesses in Surrey, BC — trades (plumbers, HVAC, electricians, roofers), hair salons & beauty studios, real estate agents, coaches & consultants, restaurants, and health & wellness businesses. If you run a local service business in Surrey, we can build a campaign for you.',
  },
  {
    question: 'How is AP Digital different from other Surrey marketing agencies?',
    answer: 'The founder, Arjun Sharma, personally manages every single account — no outsourcing, no handing you off to a junior team member. We also work month-to-month with no lock-in contracts, so we earn your business every month by actually delivering results. Most Surrey marketing agencies put you through a sales team, then hand your account to a generalist. We don\'t operate that way.',
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    getServiceSchema('Digital Marketing Surrey BC', DESC, '/surrey'),
    getFAQSchema(faqs),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Surrey', url: '/surrey' },
    ]),
    getWebPageSchema(TITLE, DESC, '/surrey'),
    {
      "@type": "LocalBusiness",
      "@id": "https://ap-digital.ca/surrey",
      "name": "AP Digital — Surrey Digital Marketing Agency",
      "description": DESC,
      "url": "https://ap-digital.ca/surrey",
      "telephone": "+1-778-682-5772",
      "email": "apdigital.core@gmail.com",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Pitt Meadows",
        "addressRegion": "BC",
        "postalCode": "V3Y 0G3",
        "addressCountry": "CA"
      },
      "areaServed": [
        { "@type": "City", "name": "Surrey" },
        { "@type": "City", "name": "White Rock" },
        { "@type": "City", "name": "Delta" },
        { "@type": "City", "name": "Langley" },
        { "@type": "City", "name": "Cloverdale" }
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

const Surrey = () => (
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
    <main>

      {/* Hero */}
      <section className="relative bg-near-black pt-28 pb-20">
        <div className="container-custom">
          <div className="max-w-3xl animate-fade-up">
            <div className="inline-flex items-center gap-2 border border-teal/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
              <span className="text-teal text-sm font-medium">Serving Surrey & South Fraser, BC</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              Digital Marketing Agency in{' '}
              <span className="text-gradient">Surrey, BC</span>{' '}
              — Get More Leads
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-8">
              AP Digital helps Surrey businesses — trades, salons, real estate agents & coaches — get consistent, predictable leads using Meta Ads & Google Ads. Month-to-month. Managed personally by Arjun Sharma.
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
            Who We Help in <span className="text-gradient">Surrey</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            From South Surrey to Guildford, we generate qualified leads for local businesses across the region.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-2xl p-6 hover:border-teal/30 transition-colors">
              <Zap className="w-8 h-8 text-teal mb-4" />
              <h3 className="font-display text-xl font-bold text-foreground mb-2">Trades & Contractors</h3>
              <p className="text-muted-foreground">Plumbers, HVAC, electricians, and roofers across Surrey & South Fraser getting booked solid with targeted ads.</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 hover:border-teal/30 transition-colors">
              <Star className="w-8 h-8 text-teal mb-4" />
              <h3 className="font-display text-xl font-bold text-foreground mb-2">Hair Salons & Beauty Studios</h3>
              <p className="text-muted-foreground">Filling chairs with consistent, reliable bookings for salons throughout Surrey and the surrounding area.</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 hover:border-teal/30 transition-colors">
              <Target className="w-8 h-8 text-teal mb-4" />
              <h3 className="font-display text-xl font-bold text-foreground mb-2">Real Estate Agents</h3>
              <p className="text-muted-foreground">Buyer & seller leads in Surrey's competitive market — targeted campaigns that reach motivated homeowners.</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 hover:border-teal/30 transition-colors">
              <Users className="w-8 h-8 text-teal mb-4" />
              <h3 className="font-display text-xl font-bold text-foreground mb-2">Coaches & Consultants</h3>
              <p className="text-muted-foreground">Attracting ideal clients online and scaling coaching businesses across BC with proven ad strategies.</p>
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
            Everything your Surrey business needs to generate leads and grow — all managed under one roof.
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

      {/* Why Surrey Businesses Are Investing in Paid Ads */}
      <section className="bg-background py-20">
        <div className="container-custom max-w-4xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
            Why Surrey Businesses Are Investing in <span className="text-gradient">Paid Ads</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            Surrey is one of the fastest-growing cities in Metro Vancouver — and the competition for local customers is only intensifying.
          </p>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              Surrey, BC is no longer just a bedroom community — it's a full economic hub with distinct neighbourhoods each carrying their own commercial energy. Newton has a dense population of service-hungry households. Guildford is a retail and service corridor where competition among trades and beauty businesses is fierce. South Surrey and White Rock attract higher-income demographics actively searching for premium service providers. Cloverdale and Whalley are home to a growing number of small business owners who need a digital marketing agency in Surrey BC that actually understands their local market. Running generic, city-wide campaigns doesn't cut it here — neighbourhood-level targeting is what separates the businesses that get booked solid from those that wonder why their ads aren't working.
            </p>
            <p>
              The shift toward digital-first customer behaviour in Surrey has accelerated dramatically. Surrey small business marketing is no longer optional — it's the primary growth lever. When a homeowner in Guildford needs an HVAC technician, they're not flipping through a directory. They're searching on Google or scrolling Facebook and Instagram. When someone in South Surrey is looking for a new salon, they're clicking on ads they see in their feed. Lead generation in Surrey now happens almost entirely online, and the businesses that invest in Meta Ads and Google Ads are capturing that demand while competitors who rely on word-of-mouth slowly fade. The window to build a dominant local presence before your niche gets saturated is still open — but it won't stay open forever.
            </p>
            <p>
              What makes paid advertising uniquely powerful for a marketing agency Surrey clients can trust is the precision of targeting. Unlike SEO, which takes months to compound, a well-structured Google Ads or Meta Ads campaign for a Surrey business can generate qualified leads within days of going live. We geo-target specific postal codes in Newton, Guildford, South Surrey, Cloverdale, and Whalley so your ad budget reaches the exact neighbourhoods where your ideal customers live. For trades businesses, this means fewer wasted clicks from outside your service radius. For salons, it means filling chairs with local clients who are actually within driving distance. For realtors, it means reaching motivated buyers and sellers in the specific Surrey submarkets you specialize in — not wasting impressions on people who'll never convert.
            </p>
          </div>
        </div>
      </section>

      {/* Our Surrey Marketing Process */}
      <section className="bg-charcoal py-20">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground text-center mb-4">
            Our Surrey Marketing Process
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            A clear, proven process that gets your Surrey business generating leads fast — with no guesswork.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-charcoal-light border border-gray-800 rounded-xl p-6">
              <div className="font-display text-3xl font-bold text-teal mb-3">1</div>
              <h3 className="font-display text-lg font-bold text-primary-foreground mb-2">Free Strategy Call</h3>
              <p className="text-muted-foreground text-sm">We learn your Surrey market, your competition, and your goals. No cookie-cutter approach — every campaign starts with understanding your specific business.</p>
            </div>
            <div className="bg-charcoal-light border border-gray-800 rounded-xl p-6">
              <div className="font-display text-3xl font-bold text-teal mb-3">2</div>
              <h3 className="font-display text-lg font-bold text-primary-foreground mb-2">Campaign Build</h3>
              <p className="text-muted-foreground text-sm">We build your Meta Ads or Google Ads campaign targeting Surrey and surrounding areas — Newton, Guildford, South Surrey, Cloverdale, White Rock, and beyond.</p>
            </div>
            <div className="bg-charcoal-light border border-gray-800 rounded-xl p-6">
              <div className="font-display text-3xl font-bold text-teal mb-3">3</div>
              <h3 className="font-display text-lg font-bold text-primary-foreground mb-2">Launch & Optimize</h3>
              <p className="text-muted-foreground text-sm">Live within 7 days. We monitor and optimize daily in the first 2 weeks to make sure your Surrey campaign hits its stride as fast as possible.</p>
            </div>
            <div className="bg-charcoal-light border border-gray-800 rounded-xl p-6">
              <div className="font-display text-3xl font-bold text-teal mb-3">4</div>
              <h3 className="font-display text-lg font-bold text-primary-foreground mb-2">Scale</h3>
              <p className="text-muted-foreground text-sm">Once leads are flowing, we scale what's working and cut what isn't. Your cost-per-lead drops as the campaign matures and data accumulates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Areas We Serve */}
      <section className="bg-background py-20">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
            Areas We Serve Near <span className="text-gradient">Surrey</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
            Our digital marketing campaigns cover all of Surrey and the surrounding South Fraser region. Whether you're based in Newton or South Surrey, we target your exact service area so every ad dollar is working as hard as possible.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {['Newton', 'Guildford', 'South Surrey', 'Cloverdale', 'Whalley', 'White Rock', 'Delta', 'Langley'].map((area) => (
              <span key={area} className="rounded-full bg-muted px-4 py-2 text-sm text-foreground">
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Why AP Digital */}
      <section className="bg-charcoal py-20">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground text-center mb-4">
            Why Surrey Businesses Choose <span className="text-gradient">AP Digital</span>
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
              <p className="text-muted-foreground text-sm">Most Surrey clients see their first qualified leads within 2 weeks of launch. We move fast and optimize constantly.</p>
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
            Ready to Grow Your <span className="text-gradient">Surrey Business?</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Book a free 20-minute strategy call. We'll show you exactly what a campaign looks like for your business and your budget. No pitch, no pressure.
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

export default Surrey;
