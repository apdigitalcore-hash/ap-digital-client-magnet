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
      <section className="relative bg-[#E4E7EB] pt-32 pb-24">
        <div className="container-custom">
          <div className="max-w-3xl animate-fade-up">
            <div className="mb-6">
              <img src={apLogo} alt="AP Digital Marketing" className="w-20 h-20 sm:w-24 sm:h-24 rounded-full" />
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium text-foreground mb-6 leading-[1.05] tracking-tight">
              Performance Marketing Agency{' '}
              <span className="italic">Abbotsford BC</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-8">
              AP Digital helps Abbotsford and Fraser Valley businesses generate consistent, qualified leads using Meta Ads & Google Ads. If you're looking for a marketing agency near you in Abbotsford, we specialize in local service businesses. No lock-in contracts. Managed personally by founder Arjun Sharma.
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
            Who We Help in <span className="italic">Abbotsford</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            From West Abbotsford to Clearbrook to Mission, we generate qualified leads for Fraser Valley businesses.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="group relative overflow-hidden bg-white elev-2 hover:elev-3 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="absolute inset-0 bg-[#0C0E11] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <Zap className="relative z-10 w-8 h-8 text-foreground group-hover:text-white mb-4 transition-colors duration-500" />
              <h3 className="relative z-10 font-serif text-xl font-medium text-foreground group-hover:text-white mb-2 transition-colors duration-500">Trades & Contractors</h3>
              <p className="relative z-10 text-muted-foreground group-hover:text-white/65 transition-colors duration-500">Plumbers, HVAC techs, electricians, and roofers across Abbotsford & the Fraser Valley capturing job searches from local homeowners.</p>
            </div>
            <div className="group relative overflow-hidden bg-white elev-2 hover:elev-3 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="absolute inset-0 bg-[#0C0E11] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <Star className="relative z-10 w-8 h-8 text-foreground group-hover:text-white mb-4 transition-colors duration-500" />
              <h3 className="relative z-10 font-serif text-xl font-medium text-foreground group-hover:text-white mb-2 transition-colors duration-500">Hair Salons & Beauty Studios</h3>
              <p className="relative z-10 text-muted-foreground group-hover:text-white/65 transition-colors duration-500">Consistent bookings for Abbotsford salons — reaching the region's large, growing residential base with targeted social media ads.</p>
            </div>
            <div className="group relative overflow-hidden bg-white elev-2 hover:elev-3 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="absolute inset-0 bg-[#0C0E11] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <Target className="relative z-10 w-8 h-8 text-foreground group-hover:text-white mb-4 transition-colors duration-500" />
              <h3 className="relative z-10 font-serif text-xl font-medium text-foreground group-hover:text-white mb-2 transition-colors duration-500">Real Estate Agents</h3>
              <p className="relative z-10 text-muted-foreground group-hover:text-white/65 transition-colors duration-500">Qualified buyer and seller leads in Abbotsford's growing market — campaigns targeting motivated homeowners in the Fraser Valley's most active communities.</p>
            </div>
            <div className="group relative overflow-hidden bg-white elev-2 hover:elev-3 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="absolute inset-0 bg-[#0C0E11] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <Users className="relative z-10 w-8 h-8 text-foreground group-hover:text-white mb-4 transition-colors duration-500" />
              <h3 className="relative z-10 font-serif text-xl font-medium text-foreground group-hover:text-white mb-2 transition-colors duration-500">Coaches & Consultants</h3>
              <p className="relative z-10 text-muted-foreground group-hover:text-white/65 transition-colors duration-500">Growing coaching and consulting businesses in Abbotsford and the Fraser Valley with proven digital ad strategies that attract premium clients.</p>
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
            Everything your Abbotsford business needs to generate leads and grow — all managed under one roof.
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

      {/* Why Abbotsford Businesses */}
      <section className="bg-white py-24">
        <div className="container-custom max-w-4xl">
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground text-center mb-4">
            Why Abbotsford Businesses Are Investing in <span className="italic">Paid Ads</span>
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
      <section className="bg-[#EDEFF2] py-24">
        <div className="container-custom">
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground text-center mb-4">
            Our Abbotsford Marketing Process
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            A clear, proven process that gets your Abbotsford business generating leads fast — with no guesswork.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group relative overflow-hidden bg-white elev-2 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="absolute inset-0 bg-[#0C0E11] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <div className="relative z-10 font-serif text-3xl font-medium text-foreground/25 mb-3 group-hover:text-white transition-colors duration-500">1</div>
              <h3 className="relative z-10 font-serif text-lg font-medium text-foreground group-hover:text-white mb-2 transition-colors duration-500">Free Strategy Call</h3>
              <p className="relative z-10 text-muted-foreground group-hover:text-white/65 text-sm transition-colors duration-500">We learn your Abbotsford market, service area, competition, and revenue goals before recommending anything.</p>
            </div>
            <div className="group relative overflow-hidden bg-white elev-2 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="absolute inset-0 bg-[#0C0E11] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <div className="relative z-10 font-serif text-3xl font-medium text-foreground/25 mb-3 group-hover:text-white transition-colors duration-500">2</div>
              <h3 className="relative z-10 font-serif text-lg font-medium text-foreground group-hover:text-white mb-2 transition-colors duration-500">Campaign Build</h3>
              <p className="relative z-10 text-muted-foreground group-hover:text-white/65 text-sm transition-colors duration-500">We build your Meta Ads or Google Ads campaign targeting your Abbotsford and Fraser Valley service area with creatives built for your specific audience.</p>
            </div>
            <div className="group relative overflow-hidden bg-white elev-2 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="absolute inset-0 bg-[#0C0E11] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <div className="relative z-10 font-serif text-3xl font-medium text-foreground/25 mb-3 group-hover:text-white transition-colors duration-500">3</div>
              <h3 className="relative z-10 font-serif text-lg font-medium text-foreground group-hover:text-white mb-2 transition-colors duration-500">Launch & Optimize</h3>
              <p className="relative z-10 text-muted-foreground group-hover:text-white/65 text-sm transition-colors duration-500">Live within 7 days. We optimize daily in the first 2 weeks to make sure your Abbotsford campaign hits its stride fast.</p>
            </div>
            <div className="group relative overflow-hidden bg-white elev-2 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="absolute inset-0 bg-[#0C0E11] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <div className="relative z-10 font-serif text-3xl font-medium text-foreground/25 mb-3 group-hover:text-white transition-colors duration-500">4</div>
              <h3 className="relative z-10 font-serif text-lg font-medium text-foreground group-hover:text-white mb-2 transition-colors duration-500">Scale</h3>
              <p className="relative z-10 text-muted-foreground group-hover:text-white/65 text-sm transition-colors duration-500">Once leads flow, we scale what's working and cut what isn't. Your cost-per-lead drops as the campaign matures.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Areas Served */}
      <section className="bg-white py-24">
        <div className="container-custom">
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground text-center mb-4">
            Areas We Serve Near <span className="italic">Abbotsford</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
            Our campaigns cover all of Abbotsford and the surrounding Fraser Valley — including Mission, Chilliwack, and Maple Ridge.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mb-16">
            {['West Abbotsford', 'Clearbrook', 'Auguston', 'Matsqui', 'Bradner', 'Mission', 'Chilliwack', 'Maple Ridge'].map((area) => (
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
              { city: 'Richmond', href: '/richmond' },
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
            Why Abbotsford Businesses Choose <span className="italic">AP Digital</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            Not a big agency with account managers and hand-offs. A focused team that delivers.
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
              <p className="relative z-10 text-muted-foreground group-hover:text-white/65 text-sm transition-colors duration-500">Month-to-month with zero lock-in. We earn your business every single month by delivering results you can measure.</p>
            </div>
            <div className="group relative overflow-hidden bg-white elev-2 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="absolute inset-0 bg-[#0C0E11] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <Zap className="relative z-10 w-8 h-8 text-foreground group-hover:text-white mb-4 transition-colors duration-500" />
              <h3 className="relative z-10 font-serif text-lg font-medium text-foreground group-hover:text-white mb-2 transition-colors duration-500">Fast Results</h3>
              <p className="relative z-10 text-muted-foreground group-hover:text-white/65 text-sm transition-colors duration-500">Most Abbotsford clients see their first qualified leads within 2 weeks of launch. We move fast and optimize constantly.</p>
            </div>
          </div>
        </div>
      </section>

            <FaqLight faqs={faqs} cityName="Abbotsford" />

      <OurServices />

      <IndustriesWeServe />

            <PastelCTA
        headline="Ready to Grow Your Abbotsford Business?"
        subheadline="Book a free 20-minute strategy call. We'll show you exactly what a campaign looks like for your business and your budget. No pitch, no pressure."
      />

    </main>
    <Footer />
  </>
);

export default Abbotsford;
