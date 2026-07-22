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
import { getServiceSchema, getBreadcrumbSchema, getFAQSchema, getWebPageSchema, founderSchema } from '@/lib/structuredData';

const TITLE = 'Vancouver Marketing Agency | Leads & Ads | AP Digital';
const DESC = 'Vancouver digital marketing agency. 2,400+ leads delivered for salons, trades, realtors & coaches. Google Ads, Meta Ads & SEO. Month-to-month. Free strategy call.';
const CANONICAL = 'https://ap-digital.ca/vancouver';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const included = [
  'Meta Ads targeting Vancouver & surrounding areas',
  'Google Ads for high-intent local searches',
  'Google Business Profile setup & optimization',
  'Review generation & reputation management',
  'Short-form video content (Reels & TikTok)',
  'High-converting landing pages for Vancouver leads',
  'Monthly ROI reporting — leads & revenue only',
  'Local SEO targeting Vancouver neighbourhoods',
];

const faqs = [
  {
    question: 'How quickly will I get leads in Vancouver?',
    answer: 'Most Vancouver businesses see their first qualified leads within 2 weeks of launching their campaign with AP Digital. Google Ads campaigns often produce results within days — Meta Ads typically 1–2 weeks as the algorithm optimizes.',
  },
  {
    question: 'Do I need a long-term contract?',
    answer: 'No. AP Digital operates month-to-month with every Vancouver client. We earn your business every 30 days by actually delivering results — there is no lock-in, no setup penalty, and no cancellation fee.',
  },
  {
    question: 'How much does digital marketing cost in Vancouver?',
    answer: 'Most clients start with $500–$1,500/month in ad spend. Our management fee is quoted transparently upfront and billed separately from your ad spend. You always know exactly what you\'re paying before anything goes live.',
  },
  {
    question: 'Who manages my Vancouver marketing campaign?',
    answer: 'Arjun Sharma personally manages every AP Digital account — no outsourcing, no junior account managers, no overseas teams. When you have a question about your Vancouver campaign, you talk directly to the person running it.',
  },
  {
    question: 'Should I use Google Ads or Facebook Ads in Vancouver?',
    answer: 'Both platforms work well in Vancouver, but for different goals. Google Ads are ideal for capturing high-intent searchers — people actively looking for your service right now. Meta Ads (Facebook & Instagram) are better for brand awareness, retargeting, and visual offers. Salons and coaches tend to perform best on Meta; trades and real estate agents often see the strongest ROI from Google. We recommend the right mix after learning about your business on a free strategy call.',
  },
  {
    question: 'What industries do you serve in Vancouver?',
    answer: 'We specialize in four verticals across Vancouver: trades and home services (plumbers, HVAC, electricians, roofers), hair salons and beauty studios, real estate agents, and coaches and consultants. If you run a local service business in Vancouver, we have a playbook that already works for your industry.',
  },
  {
    question: 'How is AP Digital different from other Vancouver marketing agencies?',
    answer: 'Most Vancouver agencies put you through a sales team and then hand your account to a generalist. At AP Digital, the founder personally manages every account — so you always know exactly who is running your campaigns. We also work month-to-month, which means we have to earn your business every month by actually delivering leads.',
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    founderSchema,
    getServiceSchema('Digital Marketing Vancouver BC', DESC, '/vancouver'),
    getFAQSchema(faqs),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Vancouver', url: '/vancouver' },
    ]),
    getWebPageSchema(TITLE, DESC, '/vancouver'),
    {
      "@type": "LocalBusiness",
      "@id": "https://ap-digital.ca/vancouver",
      "name": "AP Digital — Vancouver Digital Marketing Agency",
      "description": DESC,
      "url": "https://ap-digital.ca/vancouver",
      "telephone": "+1-778-682-5772",
      "email": "apdigital.core@gmail.com",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Vancouver",
        "addressRegion": "BC",
        "postalCode": "V6B 2W9",
        "addressCountry": "CA"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 49.2827,
        "longitude": -123.1207
      },
      "areaServed": [
        { "@type": "City", "name": "Vancouver" },
        { "@type": "City", "name": "Kitsilano" },
        { "@type": "City", "name": "Mount Pleasant" },
        { "@type": "City", "name": "East Vancouver" },
        { "@type": "City", "name": "Yaletown" },
        { "@type": "City", "name": "West End" }
      ],
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "14",
        "bestRating": "5",
        "worstRating": "1"
      },
      "founder": { "@type": "Person", "name": "Arjun Sharma" },
      "sameAs": ["https://ap-digital.ca"]
    }
  ]
};

const Vancouver = () => (
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
              <span className="text-teal text-sm font-medium">Headquartered in Vancouver, BC</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              Digital Marketing Agency{' '}
              <span className="text-gradient">Vancouver BC</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-8">
              AP Digital is a Vancouver-based marketing agency helping local businesses — trades, salons, real estate agents & coaches — get consistent, qualified leads using Meta Ads & Google Ads. Month-to-month. Managed personally by founder Arjun Sharma.
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
              <div className="text-muted-foreground text-sm">Starting ad budget — no contracts</div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Help */}
      <section className="bg-background py-20">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
            Who We Help in <span className="text-gradient">Vancouver</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            From Kitsilano to Commercial Drive, we help Vancouver's local businesses get booked solid with qualified leads.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-2xl p-6 hover:border-teal/30 transition-colors">
              <Zap className="w-8 h-8 text-teal mb-4" />
              <h3 className="font-display text-xl font-bold text-foreground mb-2">Trades & Contractors</h3>
              <p className="text-muted-foreground">Plumbers, HVAC, electricians, and roofers across Vancouver capturing high-intent job searches the moment homeowners need them.</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 hover:border-teal/30 transition-colors">
              <Star className="w-8 h-8 text-teal mb-4" />
              <h3 className="font-display text-xl font-bold text-foreground mb-2">Hair Salons & Beauty Studios</h3>
              <p className="text-muted-foreground">Filling appointment books with consistent new clients for salons in Kitsilano, Mount Pleasant, South Granville, and East Van.</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 hover:border-teal/30 transition-colors">
              <Target className="w-8 h-8 text-teal mb-4" />
              <h3 className="font-display text-xl font-bold text-foreground mb-2">Real Estate Agents</h3>
              <p className="text-muted-foreground">Buyer & seller leads in Vancouver's ultra-competitive real estate market — targeted campaigns reaching motivated homeowners and investors.</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 hover:border-teal/30 transition-colors">
              <Users className="w-8 h-8 text-teal mb-4" />
              <h3 className="font-display text-xl font-bold text-foreground mb-2">Coaches & Consultants</h3>
              <p className="text-muted-foreground">Growing coaching businesses in Vancouver's competitive professional market with proven ad strategies that attract ideal, high-value clients.</p>
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
            Everything your Vancouver business needs to generate leads and grow — all managed under one roof.
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

      {/* Why Vancouver Businesses Are Investing in Paid Ads */}
      <section className="bg-background py-20">
        <div className="container-custom max-w-4xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
            Why Vancouver Businesses Are Investing in <span className="text-gradient">Paid Ads</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            Vancouver is one of Canada's most expensive and competitive markets — standing out online is no longer optional.
          </p>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              Vancouver is one of the most densely competitive small business markets in Canada. Every neighbourhood carries its own commercial character — Kitsilano's health-conscious, high-income demographic makes it a goldmine for wellness businesses, fitness studios, and premium salons willing to target precisely. Commercial Drive and East Van have a dense, loyal local customer base that responds strongly to community-rooted brands and local-first messaging. Yaletown and the West End attract young professionals and higher spenders who discover businesses almost entirely through Instagram and Google. Mount Pleasant and South Main have become hubs for creative businesses and boutique services with clients who are extremely online. For a marketing agency in Vancouver BC, understanding these micro-markets is the difference between campaigns that fill your calendar and campaigns that burn budget with nothing to show.
            </p>
            <p>
              Vancouver's digital-first consumer behaviour has reached a saturation point that no local business can ignore. When someone in Kitsilano needs a plumber, they're not asking neighbours — they're Googling "plumber Vancouver" or "emergency plumber near me" within minutes of the problem appearing. When a homeowner in Point Grey is looking for a renovation contractor, they're scrolling Instagram and Facebook for before-and-after project photos from local tradespeople. When a professional in Yaletown wants to book a haircut or consult a business coach, they're clicking on an ad they saw in their feed. The businesses capturing these moments with Google Ads and Meta Ads are growing. The ones waiting for referrals are slowly getting left behind.
            </p>
            <p>
              What makes paid advertising uniquely powerful in Vancouver's digital marketing landscape is the precision it unlocks. We geo-target campaigns to the specific Vancouver neighbourhoods where your ideal clients live — Dunbar, Kerrisdale, Fairview, Hastings-Sunrise, Riley Park — so your ad budget is never wasted on impressions from outside your service radius. For a trades business, this means every click is from someone within your callout zone. For a salon in South Granville, it means reaching women in a 5-kilometre radius who match the profile of your highest-spending existing clients. This is why Vancouver businesses that run properly structured Meta Ads and Google Ads campaigns routinely see returns that justify every dollar — while businesses relying on organic alone wait months for results that may never come.
            </p>
          </div>
        </div>
      </section>

      {/* Our Vancouver Marketing Process */}
      <section className="bg-charcoal py-20">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground text-center mb-4">
            Our Vancouver Marketing Process
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            A clear, proven process that gets your Vancouver business generating leads fast — with no guesswork.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-charcoal-light border border-gray-800 rounded-xl p-6">
              <div className="font-display text-3xl font-bold text-teal mb-3">1</div>
              <h3 className="font-display text-lg font-bold text-primary-foreground mb-2">Free Strategy Call</h3>
              <p className="text-muted-foreground text-sm">We learn your Vancouver market, your neighbourhood, your competition, and your revenue goals. No cookie-cutter approach — every campaign starts with your specific business context.</p>
            </div>
            <div className="bg-charcoal-light border border-gray-800 rounded-xl p-6">
              <div className="font-display text-3xl font-bold text-teal mb-3">2</div>
              <h3 className="font-display text-lg font-bold text-primary-foreground mb-2">Campaign Build</h3>
              <p className="text-muted-foreground text-sm">We build your Meta Ads or Google Ads campaign targeting your exact Vancouver service area — from Dunbar to Hastings-Sunrise, from Yaletown to East Van — with creatives built for your audience.</p>
            </div>
            <div className="bg-charcoal-light border border-gray-800 rounded-xl p-6">
              <div className="font-display text-3xl font-bold text-teal mb-3">3</div>
              <h3 className="font-display text-lg font-bold text-primary-foreground mb-2">Launch & Optimize</h3>
              <p className="text-muted-foreground text-sm">Live within 7 days. We monitor and optimize daily in the first 2 weeks to make sure your Vancouver campaign hits its stride as fast as possible.</p>
            </div>
            <div className="bg-charcoal-light border border-gray-800 rounded-xl p-6">
              <div className="font-display text-3xl font-bold text-teal mb-3">4</div>
              <h3 className="font-display text-lg font-bold text-primary-foreground mb-2">Scale</h3>
              <p className="text-muted-foreground text-sm">Once leads are flowing, we scale what's working and cut what isn't. Your cost-per-lead drops as the campaign matures and data accumulates across your Vancouver target area.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Areas We Serve */}
      <section className="bg-background py-20">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
            Vancouver Neighbourhoods We Target
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
            Our campaigns cover all of Vancouver and the surrounding region. We geo-target your exact service area so every ad dollar reaches your ideal local customer.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mb-16">
            {['Kitsilano', 'Mount Pleasant', 'East Vancouver', 'Commercial Drive', 'Yaletown', 'West End', 'Fairview', 'South Granville', 'Kerrisdale', 'Dunbar', 'Hastings-Sunrise', 'Riley Park'].map((area) => (
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
              { city: 'Surrey', href: '/surrey' },
              { city: 'Burnaby', href: '/burnaby' },
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
            Why Vancouver Businesses Choose <span className="text-gradient">AP Digital</span>
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
              <p className="text-muted-foreground text-sm">Month-to-month with zero lock-in. We earn your business every single month by actually delivering results you can measure.</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <Zap className="w-8 h-8 text-teal mb-4" />
              <h3 className="font-display text-lg font-bold text-foreground mb-2">Fast Results</h3>
              <p className="text-muted-foreground text-sm">Most Vancouver clients see their first qualified leads within 2 weeks of launch. We move fast and optimize constantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background py-20">
        <div className="container-custom max-w-3xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            Common Questions — Vancouver Businesses
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
            Ready to Grow Your <span className="text-gradient">Vancouver Business?</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Book a free 20-minute strategy call. We'll show you exactly what a campaign looks like for your business and your budget — no pitch, no pressure.
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

export default Vancouver;
