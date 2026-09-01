import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, CheckCircle, TrendingUp, Star, Zap, Target, Users, MapPin } from 'lucide-react';
import OurServices from '@/components/OurServices';
import IndustriesWeServe from '@/components/IndustriesWeServe';
import { getServiceSchema, getBreadcrumbSchema, getFAQSchema, getWebPageSchema, founderSchema } from '@/lib/structuredData';
import apLogoMark from '@/assets/ap-logo-mark-256.webp';
import JsonLd from '@/components/JsonLd';
import FaqLight from '@/components/light/FaqLight';
import PastelCTA from '@/components/light/PastelCTA';

const TITLE = 'Richmond Google Ads for Local Business — No Contract';
const DESC = 'Richmond businesses in City Centre, Steveston and Brighouse: Google Ads and Meta Ads from $759/month. No contract, cancel with 30 days\' notice.';
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
    question: 'Who is the best digital marketing agency in Richmond for contractors?',
    answer: 'For Richmond trades — plumbers, HVAC, electricians, roofers — the agency worth hiring is the one that targets at neighbourhood level rather than blanketing Metro Vancouver, and that reports cost per booked job rather than impressions. AP Digital runs Google Ads and Meta Ads for Richmond contractors across City Centre, Steveston, Broadmoor and Brighouse, month-to-month with no lock-in. Arjun Sharma manages every account personally, so the person building your campaign is the person you talk to.',
  },
  {
    question: 'Is there a Richmond marketing company that works month-to-month?',
    answer: 'Yes. AP Digital works month-to-month with every Richmond client — pause or cancel with 30 days\' notice, no exit fee. Most agencies ask for six or twelve months up front because it protects them through a slow start. We would rather earn the next month by producing leads in this one.',
  },
  {
    question: 'How much does a marketing agency in Richmond cost?',
    answer: 'Paid ads management is $759/month and social media management is $849/month, quoted separately so you only pay for what you use. Ad spend is separate again and goes straight to Google or Meta, so you keep control of the budget. Most Richmond businesses start between $1,000 and $2,000/month all in.',
  },
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
  {
    question: 'How do I find a digital marketing agency near me in Richmond?',
    answer: 'AP Digital serves Richmond businesses across Steveston, City Centre, Ironwood, and Bridgeport. We run Google Ads, Meta Ads, and local SEO for trades, salons, realtors, and coaches. Month-to-month, no contracts.',
  },
];

const structuredData = {"@context":"https://schema.org","@graph": [
    founderSchema,
    getServiceSchema('Digital Marketing Richmond BC', DESC, '/richmond'),
    getFAQSchema(faqs),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Richmond', url: '/richmond' },
    ]),
    getWebPageSchema(TITLE, DESC, '/richmond'),
    {"@type":"LocalBusiness","@id":"https://ap-digital.ca/richmond","name":"AP Digital — Richmond BC Digital Marketing Agency","description": DESC,"url":"https://ap-digital.ca/richmond","telephone":"+1-778-682-5772","email":"apdigital.core@gmail.com","priceRange":"$$","address": {"@type":"PostalAddress","addressLocality":"Vancouver","addressRegion":"BC","addressCountry":"CA"
      },"areaServed": [
        {"@type":"City","name":"Richmond" },
        {"@type":"City","name":"Steveston" },
        {"@type":"City","name":"City Centre Richmond" },
        {"@type":"City","name":"Brighouse" },
        {"@type":"City","name":"Broadmoor" }
      ],"openingHoursSpecification": {"@type":"OpeningHoursSpecification","dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],"opens":"09:00","closes":"18:00"
      },"founder": {"@type":"Person","name":"Arjun Sharma" },"sameAs": ["https://ap-digital.ca"]
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
      
    </Helmet>
      <JsonLd data={structuredData} />
    <Header />
    <main id="main-content">

      {/* Hero */}
      <section className="relative bg-[#E4E7EB] pt-32 pb-24">
        <div className="container-custom">
          <div className="max-w-3xl animate-fade-up">
            <img
              src={apLogoMark}
              alt=""
              width={96}
              height={96}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mb-7"
            />
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium text-foreground mb-6 leading-[1.05] tracking-tight">
              Richmond{' '}
              <span className="italic">Google &amp; Meta Ads</span>{' '}
              + Social Media Management
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-8">
              AP Digital helps Richmond businesses get a predictable flow of qualified leads using Meta Ads, Google Ads & social media. Looking for a digital marketing agency near you in Richmond? We're local and we specialize in your industry. No lock-in contracts. Personal service from founder Arjun Sharma.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
              <Link to="/book" className="inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-background transition-colors hover:bg-foreground/85">
                Book Your Free Strategy Call
                <ArrowRight className="w-4 h-4" />
              </Link>
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
            Who We Help in <span className="italic">Richmond</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            From the No. 3 Road corridor to Steveston, we generate qualified leads for local Richmond businesses.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
              <Zap className="relative z-10 w-8 h-8 text-foreground reveal-ink mb-4" />
              <h3 className="relative z-10 font-serif text-xl font-medium text-foreground reveal-ink mb-2">Trades & Contractors</h3>
              <p className="relative z-10 text-muted-foreground reveal-body">Plumbers, HVAC, electricians, and roofers across Richmond capturing local job searches from homeowners who need help now.</p>
            </div>
            <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
              <Star className="relative z-10 w-8 h-8 text-foreground reveal-ink mb-4" />
              <h3 className="relative z-10 font-serif text-xl font-medium text-foreground reveal-ink mb-2">Hair Salons & Beauty Studios</h3>
              <p className="relative z-10 text-muted-foreground reveal-body">Consistent bookings for Richmond salons — reaching the area's affluent residential base with targeted Instagram and Facebook ads.</p>
            </div>
            <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
              <Target className="relative z-10 w-8 h-8 text-foreground reveal-ink mb-4" />
              <h3 className="relative z-10 font-serif text-xl font-medium text-foreground reveal-ink mb-2">Real Estate Agents</h3>
              <p className="relative z-10 text-muted-foreground reveal-body">Buyer & seller leads in Richmond's high-demand real estate market — targeted campaigns that reach motivated homeowners and investors.</p>
            </div>
            <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
              <Users className="relative z-10 w-8 h-8 text-foreground reveal-ink mb-4" />
              <h3 className="relative z-10 font-serif text-xl font-medium text-foreground reveal-ink mb-2">Coaches & Consultants</h3>
              <p className="relative z-10 text-muted-foreground reveal-body">Growing coaching and consulting businesses in Richmond and across Metro Vancouver with ad strategies that attract ideal, high-value clients.</p>
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
            Everything your Richmond business needs to generate leads consistently — all managed under one roof.
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

      {/* Why Richmond Businesses */}
      <section className="bg-white py-24">
        <div className="container-custom max-w-4xl">
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground text-center mb-4">
            Why Richmond Businesses Are Investing in <span className="italic">Paid Ads</span>
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
      <section className="bg-[#EDEFF2] py-24">
        <div className="container-custom">
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground text-center mb-4">
            Our Richmond Marketing Process
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            A clear, proven process that gets your Richmond business generating leads fast.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group reveal-card relative overflow-hidden bg-white elev-2 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
              <div className="relative z-10 font-serif text-3xl font-medium text-foreground/25 mb-3 reveal-ink">1</div>
              <h3 className="relative z-10 font-serif text-lg font-medium text-foreground reveal-ink mb-2">Free Strategy Call</h3>
              <p className="relative z-10 text-muted-foreground reveal-body text-sm">We learn your Richmond market, your service area, your competition, and your goals — before we recommend anything.</p>
            </div>
            <div className="group reveal-card relative overflow-hidden bg-white elev-2 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
              <div className="relative z-10 font-serif text-3xl font-medium text-foreground/25 mb-3 reveal-ink">2</div>
              <h3 className="relative z-10 font-serif text-lg font-medium text-foreground reveal-ink mb-2">Campaign Build</h3>
              <p className="relative z-10 text-muted-foreground reveal-body text-sm">We build your Meta Ads or Google Ads campaign targeting your exact Richmond service area — City Centre, Steveston, Broadmoor, Brighouse — with creatives built for your audience.</p>
            </div>
            <div className="group reveal-card relative overflow-hidden bg-white elev-2 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
              <div className="relative z-10 font-serif text-3xl font-medium text-foreground/25 mb-3 reveal-ink">3</div>
              <h3 className="relative z-10 font-serif text-lg font-medium text-foreground reveal-ink mb-2">Launch & Optimize</h3>
              <p className="relative z-10 text-muted-foreground reveal-body text-sm">Live within 7 days. We optimize daily in the first 2 weeks to make sure your Richmond campaign hits its stride fast.</p>
            </div>
            <div className="group reveal-card relative overflow-hidden bg-white elev-2 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
              <div className="relative z-10 font-serif text-3xl font-medium text-foreground/25 mb-3 reveal-ink">4</div>
              <h3 className="relative z-10 font-serif text-lg font-medium text-foreground reveal-ink mb-2">Scale</h3>
              <p className="relative z-10 text-muted-foreground reveal-body text-sm">Once leads flow consistently, we scale what's working and cut what isn't. Your cost-per-lead drops as the campaign matures.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Areas Served */}
      <section className="bg-white py-24">
        <div className="container-custom">
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground text-center mb-4">
            Areas We Serve Near <span className="italic">Richmond</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
            Our campaigns cover all of Richmond and surrounding areas. We geo-target your exact service zone so every ad dollar works as hard as possible.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mb-16">
            {['City Centre', 'Steveston', 'Broadmoor', 'Brighouse', 'Sea Island', 'Hamilton', 'Shellmont', 'South Arm', 'Lackner'].map((area) => (
              <span key={area} className="rounded-full bg-white elev-1 px-4 py-2 text-sm text-foreground">
                {area}
              </span>
            ))}
          </div>

          <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground text-center mb-4">
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
            Why Richmond Businesses Choose <span className="italic">AP Digital</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            Not a big agency with account managers and hand-offs. A focused team that delivers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group reveal-card relative overflow-hidden bg-white elev-2 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
              <MapPin className="relative z-10 w-8 h-8 text-foreground reveal-ink mb-4" />
              <h3 className="relative z-10 font-serif text-lg font-medium text-foreground reveal-ink mb-2">Personal Management</h3>
              <p className="relative z-10 text-muted-foreground reveal-body text-sm">Arjun Sharma personally manages every account. No outsourcing, no hand-offs, no junior staff touching your campaigns.</p>
            </div>
            <div className="group reveal-card relative overflow-hidden bg-white elev-2 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
              <TrendingUp className="relative z-10 w-8 h-8 text-foreground reveal-ink mb-4" />
              <h3 className="relative z-10 font-serif text-lg font-medium text-foreground reveal-ink mb-2">No Contracts</h3>
              <p className="relative z-10 text-muted-foreground reveal-body text-sm">Month-to-month with zero lock-in. We earn your business every single month by delivering results you can measure.</p>
            </div>
            <div className="group reveal-card relative overflow-hidden bg-white elev-2 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
              <Zap className="relative z-10 w-8 h-8 text-foreground reveal-ink mb-4" />
              <h3 className="relative z-10 font-serif text-lg font-medium text-foreground reveal-ink mb-2">Fast Results</h3>
              <p className="relative z-10 text-muted-foreground reveal-body text-sm">Most Richmond clients see their first qualified leads within 2 weeks of launch. We move fast and optimize constantly.</p>
            </div>
          </div>
        </div>
      </section>

            <FaqLight faqs={faqs} cityName="Richmond" />

      <OurServices />

      <IndustriesWeServe />

            <PastelCTA
        headline="Ready to Grow Your Richmond Business?"
        subheadline="Book a free 20-minute strategy call. We'll show you exactly what a campaign looks like for your business and your budget. No pitch, no pressure."
      />

    
      {/* Internal links — these pages previously dead-ended at /book, so nothing
          flowed to the niche pages or between cities. */}
      <section className="py-16 bg-white border-t border-foreground/[0.07]">
        <div className="container-custom max-w-3xl text-muted-foreground leading-relaxed">
          <h2 className="font-serif text-2xl text-foreground mb-4">More on working with us in Richmond</h2>
          <p className="mb-4">
            We run <Link to="/services/paid-ads" className="underline underline-offset-4 hover:text-foreground">Google and Meta Ads</Link> and{' '}
            <Link to="/services/social-media" className="underline underline-offset-4 hover:text-foreground">social media management</Link> for Richmond businesses — most often <Link to="/trades-marketing" className="underline underline-offset-4 hover:text-foreground">trades and contractors</Link>, <Link to="/salon-marketing" className="underline underline-offset-4 hover:text-foreground">salons</Link>, <Link to="/real-estate-marketing" className="underline underline-offset-4 hover:text-foreground">real estate agents</Link>, <Link to="/dental-marketing" className="underline underline-offset-4 hover:text-foreground">dental clinics</Link>.
          </p>
          <p className="mb-4">
            Full pricing is on the <Link to="/pricing" className="underline underline-offset-4 hover:text-foreground">pricing page</Link>, and{' '}
            <Link to="/how-to-choose-a-marketing-agency-vancouver" className="underline underline-offset-4 hover:text-foreground">how to choose a marketing agency</Link> covers what to ask before you hire anyone.
          </p>
          <p>
            Nearby: <Link to="/surrey" className="underline underline-offset-4 hover:text-foreground">Surrey</Link> and{' '}
            <Link to="/vancouver" className="underline underline-offset-4 hover:text-foreground">Vancouver</Link>.
          </p>
        </div>
      </section>

      </main>
    <Footer />
  </>
);

export default Richmond;
