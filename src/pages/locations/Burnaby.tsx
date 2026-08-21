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

const TITLE = 'Performance Marketing Agency Burnaby BC | AP Digital';
const DESC = 'Burnaby digital marketing agency for salons, trades, realtors & coaches. Google Ads, Meta Ads & SEO. Month-to-month — no lock-in.';
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
  {
    question: 'How do I find a digital marketing agency near me in Burnaby?',
    answer: 'AP Digital is a local agency serving Burnaby businesses across Metrotown, Brentwood, Lougheed, and Edmonds. We specialize in trades, salons, realtors, and coaches — with month-to-month service and no outsourcing.',
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    founderSchema,
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
      "name": "AP Digital — Burnaby Performance Marketing Agency",
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
              <span className="italic">Burnaby BC</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-8">
              AP Digital helps Burnaby businesses get a predictable flow of qualified leads using Meta Ads, Google Ads & social media. Searching for a marketing agency near you in Burnaby? You just found one. No lock-in contracts. Personal service from founder Arjun Sharma.
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
            Who We Help in <span className="italic">Burnaby</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            From Metrotown to Brentwood, we help local Burnaby businesses compete and win online.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="group relative overflow-hidden bg-white elev-2 hover:elev-3 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="absolute inset-0 bg-[#0C0E11] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <Zap className="relative z-10 w-8 h-8 text-foreground group-hover:text-white mb-4 transition-colors duration-500" />
              <h3 className="relative z-10 font-serif text-xl font-medium text-foreground group-hover:text-white mb-2 transition-colors duration-500">Trades & Contractors</h3>
              <p className="relative z-10 text-muted-foreground group-hover:text-white/65 transition-colors duration-500">Plumbers, HVAC, and electricians across Burnaby & North Shore getting consistent job bookings through targeted campaigns.</p>
            </div>
            <div className="group relative overflow-hidden bg-white elev-2 hover:elev-3 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="absolute inset-0 bg-[#0C0E11] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <Star className="relative z-10 w-8 h-8 text-foreground group-hover:text-white mb-4 transition-colors duration-500" />
              <h3 className="relative z-10 font-serif text-xl font-medium text-foreground group-hover:text-white mb-2 transition-colors duration-500">Hair Salons & Beauty Studios</h3>
              <p className="relative z-10 text-muted-foreground group-hover:text-white/65 transition-colors duration-500">Consistent bookings for salons near Metrotown & Brentwood — no more slow weeks or empty appointment books.</p>
            </div>
            <div className="group relative overflow-hidden bg-white elev-2 hover:elev-3 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="absolute inset-0 bg-[#0C0E11] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <Target className="relative z-10 w-8 h-8 text-foreground group-hover:text-white mb-4 transition-colors duration-500" />
              <h3 className="relative z-10 font-serif text-xl font-medium text-foreground group-hover:text-white mb-2 transition-colors duration-500">Real Estate Agents</h3>
              <p className="relative z-10 text-muted-foreground group-hover:text-white/65 transition-colors duration-500">Buyer & seller leads in Burnaby's competitive condo market — targeted ads that reach motivated buyers and sellers.</p>
            </div>
            <div className="group relative overflow-hidden bg-white elev-2 hover:elev-3 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="absolute inset-0 bg-[#0C0E11] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <Users className="relative z-10 w-8 h-8 text-foreground group-hover:text-white mb-4 transition-colors duration-500" />
              <h3 className="relative z-10 font-serif text-xl font-medium text-foreground group-hover:text-white mb-2 transition-colors duration-500">Coaches & Consultants</h3>
              <p className="relative z-10 text-muted-foreground group-hover:text-white/65 transition-colors duration-500">Growing coaching businesses across Metro Vancouver with proven ad strategies that attract ideal clients consistently.</p>
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
            Everything your Burnaby business needs to generate leads and grow — all managed under one roof.
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

      {/* Why Burnaby Businesses Are Investing in Paid Ads */}
      <section className="bg-white py-24">
        <div className="container-custom max-w-4xl">
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground text-center mb-4">
            Why Burnaby Businesses Are Investing in <span className="italic">Paid Ads</span>
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
      <section className="bg-[#EDEFF2] py-24">
        <div className="container-custom">
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground text-center mb-4">
            Our Burnaby Marketing Process
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            A clear, proven process that gets your Burnaby business generating leads fast — with no guesswork.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group relative overflow-hidden bg-white elev-2 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="absolute inset-0 bg-[#0C0E11] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <div className="relative z-10 font-serif text-3xl font-medium text-foreground/25 mb-3 group-hover:text-white transition-colors duration-500">1</div>
              <h3 className="relative z-10 font-serif text-lg font-medium text-foreground group-hover:text-white mb-2 transition-colors duration-500">Free Strategy Call</h3>
              <p className="relative z-10 text-muted-foreground group-hover:text-white/65 text-sm transition-colors duration-500">We learn your Burnaby market, your competition, and your goals. Every campaign starts with a clear picture of what success looks like for your specific business.</p>
            </div>
            <div className="group relative overflow-hidden bg-white elev-2 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="absolute inset-0 bg-[#0C0E11] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <div className="relative z-10 font-serif text-3xl font-medium text-foreground/25 mb-3 group-hover:text-white transition-colors duration-500">2</div>
              <h3 className="relative z-10 font-serif text-lg font-medium text-foreground group-hover:text-white mb-2 transition-colors duration-500">Campaign Build</h3>
              <p className="relative z-10 text-muted-foreground group-hover:text-white/65 text-sm transition-colors duration-500">We build your Meta Ads or Google Ads campaign targeting Burnaby and surrounding areas — Metrotown, Brentwood, North Burnaby, Edmonds, and beyond.</p>
            </div>
            <div className="group relative overflow-hidden bg-white elev-2 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="absolute inset-0 bg-[#0C0E11] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <div className="relative z-10 font-serif text-3xl font-medium text-foreground/25 mb-3 group-hover:text-white transition-colors duration-500">3</div>
              <h3 className="relative z-10 font-serif text-lg font-medium text-foreground group-hover:text-white mb-2 transition-colors duration-500">Launch & Optimize</h3>
              <p className="relative z-10 text-muted-foreground group-hover:text-white/65 text-sm transition-colors duration-500">Live within 7 days. We monitor and optimize daily in the first 2 weeks to ensure your Burnaby campaign is performing from day one.</p>
            </div>
            <div className="group relative overflow-hidden bg-white elev-2 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="absolute inset-0 bg-[#0C0E11] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <div className="relative z-10 font-serif text-3xl font-medium text-foreground/25 mb-3 group-hover:text-white transition-colors duration-500">4</div>
              <h3 className="relative z-10 font-serif text-lg font-medium text-foreground group-hover:text-white mb-2 transition-colors duration-500">Scale</h3>
              <p className="relative z-10 text-muted-foreground group-hover:text-white/65 text-sm transition-colors duration-500">Once leads are flowing, we scale what's working and cut what isn't. Your cost-per-lead improves as the campaign matures and data builds.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Areas We Serve */}
      <section className="bg-white py-24">
        <div className="container-custom">
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground text-center mb-4">
            Areas We Serve Near <span className="italic">Burnaby</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
            Our campaigns cover all of Burnaby and the surrounding Metro Vancouver region. We geo-target your specific neighbourhoods so your budget reaches the right customers — not just anyone in the Lower Mainland.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mb-16">
            {['Metrotown', 'Brentwood', 'North Burnaby', 'Edmonds', 'New Westminster', 'Coquitlam', 'Vancouver East'].map((area) => (
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
              { city: 'Richmond', href: '/richmond' },
              { city: 'Langley', href: '/langley' },
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
            Why Burnaby Businesses Choose <span className="italic">AP Digital</span>
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
              <p className="relative z-10 text-muted-foreground group-hover:text-white/65 text-sm transition-colors duration-500">Most Burnaby clients see their first qualified leads within 2 weeks of launch. We move fast and optimize constantly.</p>
            </div>
          </div>
        </div>
      </section>

            <FaqLight faqs={faqs} cityName="Burnaby" />

      {/* Our Services */}
      <OurServices />

      <IndustriesWeServe />

            <PastelCTA
        headline="Ready to Grow Your Burnaby Business?"
        subheadline="Book a free 20-minute strategy call. We'll show you exactly what a campaign looks like for your business and your budget. No pitch, no pressure."
      />

    </main>
    <Footer />
  </>
);

export default Burnaby;

