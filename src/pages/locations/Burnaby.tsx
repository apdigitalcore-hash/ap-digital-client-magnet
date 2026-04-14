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

const TITLE = 'Digital Marketing Agency Burnaby BC | AP Digital';
const DESC = 'AP Digital helps Burnaby businesses get consistent leads with Meta Ads, Google Ads & social media. Trades, salons, realtors & coaches in Burnaby, BC. No contracts.';
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
    <main>

      {/* Hero */}
      <section className="relative bg-near-black pt-28 pb-20">
        <div className="container-custom">
          <div className="max-w-3xl animate-fade-up">
            <div className="inline-flex items-center gap-2 border border-teal/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
              <span className="text-teal text-sm font-medium">Serving Burnaby & Tri-Cities, BC</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              Digital Marketing Agency in{' '}
              <span className="text-gradient">Burnaby, BC</span>{' '}
              — More Leads. No Contracts.
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-8">
              AP Digital helps Burnaby businesses get a predictable flow of qualified leads using Meta Ads, Google Ads & social media. No lock-in contracts. Personal service from founder Arjun Sharma.
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

      {/* Why AP Digital */}
      <section className="bg-background py-20">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
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
      <section className="bg-charcoal py-20">
        <div className="container-custom max-w-3xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground text-center mb-12">
            Common Questions
          </h2>
          <Accordion type="single" collapsible>
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-gray-800">
                <AccordionTrigger className="text-left text-primary-foreground font-medium hover:text-teal">
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

export default Burnaby;
