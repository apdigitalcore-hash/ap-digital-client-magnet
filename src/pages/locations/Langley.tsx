import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, CheckCircle, TrendingUp, Star, Zap, Target, Users, MapPin } from 'lucide-react';
import OurServices from '@/components/OurServices';
import IndustriesWeServe from '@/components/IndustriesWeServe';
import { getServiceSchema, getBreadcrumbSchema, getFAQSchema, getWebPageSchema, founderSchema } from '@/lib/structuredData';
import apLogo from '@/assets/ap-logo.png';
import JsonLd from '@/components/JsonLd';
import FaqLight from '@/components/light/FaqLight';
import PastelCTA from '@/components/light/PastelCTA';

const TITLE = 'Performance Marketing Agency Langley BC | AP Digital';
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
  {
    question: 'How do I find a digital marketing agency near me in Langley?',
    answer: 'AP Digital serves businesses across Langley City, Langley Township, Walnut Grove, Willoughby, and Aldergrove. We run Google Ads, Meta Ads, and local SEO for trades, salons, realtors, and coaches. No contracts.',
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
      <section className="relative bg-[#E4E7EB] pt-32 pb-24">
        <div className="container-custom">
          <div className="max-w-3xl animate-fade-up">
            <div className="mb-6">
              <img src={apLogo} alt="AP Digital Marketing" className="w-20 h-20 sm:w-24 sm:h-24 rounded-full" />
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium text-foreground mb-6 leading-[1.05] tracking-tight">
              Performance Marketing Agency{' '}
              <span className="italic">Langley BC</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-8">
              AP Digital helps Langley businesses get more leads using Meta Ads, Google Ads & social media. From Langley City to the Township — trades, salons, realtors & coaches. If you're searching for a marketing agency near you in Langley, we've got you covered. Month-to-month.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
              <a
                href="https://calendly.com/apdigital-core/20min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-background transition-colors hover:bg-foreground/85"
              >
                Book Your Free Strategy Call
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                to="/services/paid-ads"
                className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
              >
                See Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Help */}
      <section className="bg-white py-24">
        <div className="container-custom">
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground text-center mb-4">
            Who We Help in <span className="italic">Langley</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            From Willowbrook to Murrayville, we help Langley businesses generate leads and fill their calendars.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="group relative overflow-hidden bg-white elev-2 hover:elev-3 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="absolute inset-0 bg-[#0C0E11] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <Zap className="relative z-10 w-8 h-8 text-foreground group-hover:text-white mb-4 transition-colors duration-500" />
              <h3 className="relative z-10 font-serif text-xl font-medium text-foreground group-hover:text-white mb-2 transition-colors duration-500">Trades & Contractors</h3>
              <p className="relative z-10 text-muted-foreground group-hover:text-white/65 transition-colors duration-500">Contractors across Langley City, Township & Fraser Valley staying booked with targeted Meta and Google ad campaigns.</p>
            </div>
            <div className="group relative overflow-hidden bg-white elev-2 hover:elev-3 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="absolute inset-0 bg-[#0C0E11] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <Star className="relative z-10 w-8 h-8 text-foreground group-hover:text-white mb-4 transition-colors duration-500" />
              <h3 className="relative z-10 font-serif text-xl font-medium text-foreground group-hover:text-white mb-2 transition-colors duration-500">Hair Salons & Beauty Studios</h3>
              <p className="relative z-10 text-muted-foreground group-hover:text-white/65 transition-colors duration-500">Filling appointment books in Willowbrook & Murrayville — consistent bookings that keep your salon running at full capacity.</p>
            </div>
            <div className="group relative overflow-hidden bg-white elev-2 hover:elev-3 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="absolute inset-0 bg-[#0C0E11] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <Target className="relative z-10 w-8 h-8 text-foreground group-hover:text-white mb-4 transition-colors duration-500" />
              <h3 className="relative z-10 font-serif text-xl font-medium text-foreground group-hover:text-white mb-2 transition-colors duration-500">Real Estate Agents</h3>
              <p className="relative z-10 text-muted-foreground group-hover:text-white/65 transition-colors duration-500">Buyer & seller leads across Langley's growing market — targeted campaigns that capture demand from a rapidly expanding region.</p>
            </div>
            <div className="group relative overflow-hidden bg-white elev-2 hover:elev-3 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="absolute inset-0 bg-[#0C0E11] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <Users className="relative z-10 w-8 h-8 text-foreground group-hover:text-white mb-4 transition-colors duration-500" />
              <h3 className="relative z-10 font-serif text-xl font-medium text-foreground group-hover:text-white mb-2 transition-colors duration-500">Coaches & Consultants</h3>
              <p className="relative z-10 text-muted-foreground group-hover:text-white/65 transition-colors duration-500">Attracting ideal clients from Langley and across BC with ad strategies built specifically for service-based coaches.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="bg-[#EDEFF2] py-24">
        <div className="container-custom">
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground text-center mb-4">
            What's Included
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            Everything your Langley business needs to generate leads and grow — all managed under one roof.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {included.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-foreground mt-0.5 shrink-0" />
                <span className="text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Langley Businesses Are Investing in Paid Ads */}
      <section className="bg-white py-24">
        <div className="container-custom max-w-4xl">
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground text-center mb-4">
            Why Langley Businesses Are Investing in <span className="italic">Paid Ads</span>
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
      <section className="bg-[#EDEFF2] py-24">
        <div className="container-custom">
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground text-center mb-4">
            Our Langley Marketing Process
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            A clear, proven process that gets your Langley business generating leads fast — with no guesswork.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group relative overflow-hidden bg-white elev-2 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="absolute inset-0 bg-[#0C0E11] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <div className="relative z-10 font-serif text-3xl font-medium text-foreground/25 mb-3 group-hover:text-white transition-colors duration-500">1</div>
              <h3 className="relative z-10 font-serif text-lg font-medium text-foreground group-hover:text-white mb-2 transition-colors duration-500">Free Strategy Call</h3>
              <p className="relative z-10 text-muted-foreground group-hover:text-white/65 text-sm transition-colors duration-500">We learn your Langley market, your competition, and your goals. Whether you serve Langley City, the Township, or both — we build around your actual service area.</p>
            </div>
            <div className="group relative overflow-hidden bg-white elev-2 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="absolute inset-0 bg-[#0C0E11] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <div className="relative z-10 font-serif text-3xl font-medium text-foreground/25 mb-3 group-hover:text-white transition-colors duration-500">2</div>
              <h3 className="relative z-10 font-serif text-lg font-medium text-foreground group-hover:text-white mb-2 transition-colors duration-500">Campaign Build</h3>
              <p className="relative z-10 text-muted-foreground group-hover:text-white/65 text-sm transition-colors duration-500">We build your Meta Ads or Google Ads campaign targeting Langley and surrounding areas — Willowbrook, Walnut Grove, Murrayville, Aldergrove, Cloverdale, and Abbotsford.</p>
            </div>
            <div className="group relative overflow-hidden bg-white elev-2 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="absolute inset-0 bg-[#0C0E11] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <div className="relative z-10 font-serif text-3xl font-medium text-foreground/25 mb-3 group-hover:text-white transition-colors duration-500">3</div>
              <h3 className="relative z-10 font-serif text-lg font-medium text-foreground group-hover:text-white mb-2 transition-colors duration-500">Launch & Optimize</h3>
              <p className="relative z-10 text-muted-foreground group-hover:text-white/65 text-sm transition-colors duration-500">Live within 7 days. We monitor and optimize daily in the first 2 weeks to make sure your Langley campaign is generating real, qualified leads.</p>
            </div>
            <div className="group relative overflow-hidden bg-white elev-2 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="absolute inset-0 bg-[#0C0E11] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <div className="relative z-10 font-serif text-3xl font-medium text-foreground/25 mb-3 group-hover:text-white transition-colors duration-500">4</div>
              <h3 className="relative z-10 font-serif text-lg font-medium text-foreground group-hover:text-white mb-2 transition-colors duration-500">Scale</h3>
              <p className="relative z-10 text-muted-foreground group-hover:text-white/65 text-sm transition-colors duration-500">Once leads are flowing, we scale what's working and cut what isn't. Most Langley clients see cost-per-lead improve significantly within the first 90 days.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Areas We Serve */}
      <section className="bg-white py-24">
        <div className="container-custom">
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground text-center mb-4">
            Areas We Serve Near <span className="italic">Langley</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
            Our campaigns cover all of Langley City, Langley Township, and the surrounding Fraser Valley communities. We target the specific areas where your customers live — not just a broad radius that wastes budget.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mb-16">
            {['Langley City', 'Walnut Grove', 'Murrayville', 'Willowbrook', 'Aldergrove', 'Cloverdale', 'Abbotsford'].map((area) => (
              <span key={area} className="rounded-full bg-white elev-1 px-4 py-2 text-sm text-foreground">
                {area}
              </span>
            ))}
          </div>

          <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground text-center mb-4">
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
              <Link key={href} to={href} className="bg-white elev-1 hover:elev-2 rounded-2xl p-4 text-center transition-shadow duration-300">
                <span className="font-medium text-foreground">{city}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why AP Digital */}
      <section className="bg-[#EDEFF2] py-24">
        <div className="container-custom">
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground text-center mb-4">
            Why Langley Businesses Choose <span className="italic">AP Digital</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            We're not a big agency with account managers and hand-offs. We're a focused team that delivers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group relative overflow-hidden bg-white elev-2 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="absolute inset-0 bg-[#0C0E11] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <MapPin className="relative z-10 w-8 h-8 text-foreground group-hover:text-white mb-4 transition-colors duration-500" />
              <h3 className="relative z-10 font-serif text-lg font-medium text-foreground group-hover:text-white mb-2 transition-colors duration-500">Personal Management</h3>
              <p className="relative z-10 text-muted-foreground group-hover:text-white/65 text-sm transition-colors duration-500">Arjun Sharma personally manages every account. No outsourcing, no hand-offs, no junior staff touching your campaigns.</p>
            </div>
            <div className="group relative overflow-hidden bg-white elev-2 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="absolute inset-0 bg-[#0C0E11] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <TrendingUp className="relative z-10 w-8 h-8 text-foreground group-hover:text-white mb-4 transition-colors duration-500" />
              <h3 className="relative z-10 font-serif text-lg font-medium text-foreground group-hover:text-white mb-2 transition-colors duration-500">No Contracts</h3>
              <p className="relative z-10 text-muted-foreground group-hover:text-white/65 text-sm transition-colors duration-500">Month-to-month with zero lock-in. We earn your business every single month by actually delivering results.</p>
            </div>
            <div className="group relative overflow-hidden bg-white elev-2 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="absolute inset-0 bg-[#0C0E11] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <Zap className="relative z-10 w-8 h-8 text-foreground group-hover:text-white mb-4 transition-colors duration-500" />
              <h3 className="relative z-10 font-serif text-lg font-medium text-foreground group-hover:text-white mb-2 transition-colors duration-500">Fast Results</h3>
              <p className="relative z-10 text-muted-foreground group-hover:text-white/65 text-sm transition-colors duration-500">Most Langley clients see their first qualified leads within 2 weeks of launch. We move fast and optimize constantly.</p>
            </div>
          </div>
        </div>
      </section>

            <FaqLight faqs={faqs} cityName="Langley" />

      {/* Our Services */}
      <OurServices />

      <IndustriesWeServe />

            <PastelCTA
        headline="Ready to Grow Your Langley Business?"
        subheadline="Book a free 20-minute strategy call. We'll show you exactly what a campaign looks like for your business and your budget. No pitch, no pressure."
      />

    </main>
    <Footer />
  </>
);

export default Langley;

