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

const TITLE = 'Performance Marketing Agency Abbotsford BC | AP Digital';
const DESC = 'Abbotsford marketing agency for Fraser Valley trades, salons & realtors. Google Ads + Meta Ads. Month-to-month. No contracts. Free strategy call.';
const CANONICAL = 'https://ap-digital.ca/abbotsford';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const included = [
  'Meta Ads targeting Abbotsford & Fraser Valley',
  'Google Ads for high-intent local searches',
  'Google Business Profile setup & optimization',
  'Review generation & reputation management',
  'Short-form video & social media content',
  'Landing pages built for Abbotsford leads',
  'Monthly ROI reporting — leads & revenue',
  'Local SEO for Abbotsford service areas',
];

const faqs = [
  {
    question: 'How quickly will I get leads as an Abbotsford business?',
    answer: 'Most Abbotsford businesses see their first qualified leads within 2 weeks of launching. Google Ads targeting "plumber Abbotsford" or "HVAC Abbotsford BC" can produce leads the same week the campaign goes live. Meta Ads typically optimize within 1–2 weeks.',
  },
  {
    question: 'Is there a contract for Abbotsford clients?',
    answer: 'No contracts. AP Digital works month-to-month with every client in Abbotsford and across the Fraser Valley. We earn your business with results, not lock-in.',
  },
  {
    question: 'How much does digital marketing cost in Abbotsford?',
    answer: 'Most Abbotsford clients start with $500–$1,500/month in ad spend. Our management fee is quoted transparently upfront and billed separately — no surprises.',
  },
  {
    question: 'Who manages my Abbotsford marketing campaign?',
    answer: 'Arjun Sharma personally manages every AP Digital account. No outsourcing, no junior account managers. When you have a question, you talk directly to the person running your campaign.',
  },
  {
    question: 'What industries do you serve in Abbotsford?',
    answer: 'We specialize in four verticals in Abbotsford and the Fraser Valley: trades and home services (plumbers, HVAC, electricians, roofers), hair salons and beauty studios, real estate agents, and coaches and consultants. If you run a local service business in Abbotsford, we have a playbook for your industry.',
  },
  {
    question: 'Do you also serve Chilliwack and Mission from Abbotsford?',
    answer: 'Yes. We run campaigns across the Fraser Valley — Abbotsford, Mission, Chilliwack, and surrounding communities. If your service area covers the eastern Fraser Valley, we can build campaigns that target the exact postal codes where your ideal customers live.',
  },
  {
    question: 'How do I find a digital marketing agency near me in Abbotsford?',
    answer: 'AP Digital serves Abbotsford and the eastern Fraser Valley — including Mission and Chilliwack. We run Google Ads, Meta Ads, and local SEO for trades, salons, realtors, and coaches. No contracts, month-to-month.',
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    founderSchema,
    getServiceSchema('Digital Marketing Abbotsford BC', DESC, '/abbotsford'),
    getFAQSchema(faqs),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Abbotsford', url: '/abbotsford' },
    ]),
    getWebPageSchema(TITLE, DESC, '/abbotsford'),
    {
      "@type": "LocalBusiness",
      "@id": "https://ap-digital.ca/abbotsford",
      "name": "AP Digital — Abbotsford Performance Marketing Agency",
      "description": DESC,
      "url": "https://ap-digital.ca/abbotsford",
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
        { "@type": "City", "name": "Abbotsford" },
        { "@type": "City", "name": "Mission" },
        { "@type": "City", "name": "Chilliwack" },
        { "@type": "City", "name": "Clearbrook" },
        { "@type": "City", "name": "West Abbotsford" }
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

const Abbotsford = () => (
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
              <span className="text-gradient">Abbotsford BC</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-8">
              AP Digital helps Abbotsford and Fraser Valley businesses generate consistent, qualified leads using Meta Ads & Google Ads. If you're looking for a marketing agency near you in Abbotsford, we specialize in local service businesses. No lock-in contracts. Managed personally by founder Arjun Sharma.
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
            Who We Help in <span className="text-gradient">Abbotsford</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            From West Abbotsford to Clearbrook to Mission, we generate qualified leads for Fraser Valley businesses.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-2xl p-6 hover:border-teal/30 transition-colors">
              <Zap className="w-8 h-8 text-teal mb-4" />
              <h3 className="font-display text-xl font-bold text-foreground mb-2">Trades & Contractors</h3>
              <p className="text-muted-foreground">Plumbers, HVAC techs, electricians, and roofers across Abbotsford & the Fraser Valley capturing job searches from local homeowners.</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 hover:border-teal/30 transition-colors">
              <Star className="w-8 h-8 text-teal mb-4" />
              <h3 className="font-display text-xl font-bold text-foreground mb-2">Hair Salons & Beauty Studios</h3>
              <p className="text-muted-foreground">Consistent bookings for Abbotsford salons — reaching the region's large, growing residential base with targeted social media ads.</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 hover:border-teal/30 transition-colors">
              <Target className="w-8 h-8 text-teal mb-4" />
              <h3 className="font-display text-xl font-bold text-foreground mb-2">Real Estate Agents</h3>
              <p className="text-muted-foreground">Qualified buyer and seller leads in Abbotsford's growing market — campaigns targeting motivated homeowners in the Fraser Valley's most active communities.</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 hover:border-teal/30 transition-colors">
              <Users className="w-8 h-8 text-teal mb-4" />
              <h3 className="font-display text-xl font-bold text-foreground mb-2">Coaches & Consultants</h3>
              <p className="text-muted-foreground">Growing coaching and consulting businesses in Abbotsford and the Fraser Valley with proven digital ad strategies that attract premium clients.</p>
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
            Everything your Abbotsford business needs to generate leads and grow — all managed under one roof.
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

      {/* Why Abbotsford Businesses */}
      <section className="bg-background py-20">
        <div className="container-custom max-w-4xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
            Why Abbotsford Businesses Are Investing in <span className="text-gradient">Paid Ads</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            The Fraser Valley is one of BC's fastest-growing regions — and competition for local customers is accelerating.
          </p>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              Abbotsford is BC's third-largest city and the Fraser Valley's commercial hub — and its small business environment has changed dramatically over the past five years. Rapid population growth, new residential developments in West Abbotsford and Auguston, and a surge in young families moving from Metro Vancouver have created enormous demand for local service businesses. The challenge is visibility. When a new resident in Abbotsford needs a plumber, they search Google — not the Yellow Pages. When a homeowner in Clearbrook wants to find a new salon, they browse Instagram, not newspapers. For a digital marketing agency serving Abbotsford BC businesses, the opportunity is clear: the consumer base has grown massively, but many local businesses still rely on word-of-mouth and referrals that can't scale fast enough to capture it.
            </p>
            <p>
              The competitive landscape in Abbotsford is also shifting rapidly. Trades businesses, salons, and real estate agents that have moved to paid digital advertising are outpacing competitors who haven't. A well-structured Google Ads campaign targeting "HVAC Abbotsford" or "electrician Abbotsford BC" consistently captures the highest-intent searches at the moment of need — generating job leads that referral networks simply cannot match for volume and consistency. Meta Ads on Facebook and Instagram let Abbotsford businesses reach specific demographics and postal codes with offers tailored to their neighbourhood — filling appointment books for salons, generating listing inquiries for realtors, and booking service calls for trades businesses with remarkable efficiency.
            </p>
            <p>
              What makes Abbotsford particularly interesting for paid advertising is the relative lack of saturation compared to Metro Vancouver. The cost-per-click on Google Ads for local service keywords in Abbotsford is often significantly lower than comparable searches in Vancouver or Burnaby — which means your ad budget goes further, your cost-per-lead is lower, and your return on ad spend is higher. This window of relative affordability won't stay open as more Abbotsford businesses discover digital advertising. The businesses that invest now are building a data advantage — audience insights, conversion data, and campaign history — that will compound into a lasting competitive edge in the Fraser Valley market.
            </p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-charcoal py-20">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground text-center mb-4">
            Our Abbotsford Marketing Process
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            A clear, proven process that gets your Abbotsford business generating leads fast — with no guesswork.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-charcoal-light border border-gray-800 rounded-xl p-6">
              <div className="font-display text-3xl font-bold text-teal mb-3">1</div>
              <h3 className="font-display text-lg font-bold text-primary-foreground mb-2">Free Strategy Call</h3>
              <p className="text-muted-foreground text-sm">We learn your Abbotsford market, service area, competition, and revenue goals before recommending anything.</p>
            </div>
            <div className="bg-charcoal-light border border-gray-800 rounded-xl p-6">
              <div className="font-display text-3xl font-bold text-teal mb-3">2</div>
              <h3 className="font-display text-lg font-bold text-primary-foreground mb-2">Campaign Build</h3>
              <p className="text-muted-foreground text-sm">We build your Meta Ads or Google Ads campaign targeting your Abbotsford and Fraser Valley service area with creatives built for your specific audience.</p>
            </div>
            <div className="bg-charcoal-light border border-gray-800 rounded-xl p-6">
              <div className="font-display text-3xl font-bold text-teal mb-3">3</div>
              <h3 className="font-display text-lg font-bold text-primary-foreground mb-2">Launch & Optimize</h3>
              <p className="text-muted-foreground text-sm">Live within 7 days. We optimize daily in the first 2 weeks to make sure your Abbotsford campaign hits its stride fast.</p>
            </div>
            <div className="bg-charcoal-light border border-gray-800 rounded-xl p-6">
              <div className="font-display text-3xl font-bold text-teal mb-3">4</div>
              <h3 className="font-display text-lg font-bold text-primary-foreground mb-2">Scale</h3>
              <p className="text-muted-foreground text-sm">Once leads flow, we scale what's working and cut what isn't. Your cost-per-lead drops as the campaign matures.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Areas Served */}
      <section className="bg-background py-20">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
            Areas We Serve Near <span className="text-gradient">Abbotsford</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
            Our campaigns cover all of Abbotsford and the surrounding Fraser Valley — including Mission, Chilliwack, and Maple Ridge.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mb-16">
            {['West Abbotsford', 'Clearbrook', 'Auguston', 'Matsqui', 'Bradner', 'Mission', 'Chilliwack', 'Maple Ridge'].map((area) => (
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
              { city: 'Richmond', href: '/richmond' },
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
            Why Abbotsford Businesses Choose <span className="text-gradient">AP Digital</span>
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
              <p className="text-muted-foreground text-sm">Most Abbotsford clients see their first qualified leads within 2 weeks of launch. We move fast and optimize constantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background py-20">
        <div className="container-custom max-w-3xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            Common Questions — Abbotsford Businesses
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

      <IndustriesWeServe />

      {/* Dark CTA */}
      <section className="bg-near-black py-20 text-center">
        <div className="container-custom max-w-2xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Grow Your <span className="text-gradient">Abbotsford Business?</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Book a free 20-minute strategy call. We'll show you exactly what a campaign looks like for your business and budget — no pitch, no pressure.
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

export default Abbotsford;
