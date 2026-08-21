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

const TITLE = 'Digital Marketing Agency Coquitlam BC | AP Digital';
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
    answer: 'It depends on your business type. For high-intent searches — someone actively looking for"plumber Coquitlam" or"electrician Port Moody" — Google Ads is typically the highest-converting channel. For awareness, retargeting, and businesses where customers need to see you multiple times before booking (salons, coaches, health & wellness), Meta Ads on Facebook and Instagram work exceptionally well. Most Coquitlam service businesses benefit from both platforms running together. We assess your specific situation on the strategy call and recommend the right starting point.',
  },
  {
    question: 'How do I find a digital marketing agency near me in Coquitlam?',
    answer: 'AP Digital serves the Tri-Cities — Coquitlam, Port Coquitlam, and Port Moody. We run Google Ads, Meta Ads, and local SEO for trades, salons, realtors, and coaches. Month-to-month with no contracts.',
  },
];

const structuredData = {"@context":"https://schema.org","@graph": [
    founderSchema,
    getServiceSchema('Digital Marketing Coquitlam BC', DESC, '/coquitlam'),
    getFAQSchema(faqs),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Coquitlam', url: '/coquitlam' },
    ]),
    getWebPageSchema(TITLE, DESC, '/coquitlam'),
    {"@type":"LocalBusiness","@id":"https://ap-digital.ca/coquitlam","name":"AP Digital — Coquitlam Digital Marketing Agency","description": DESC,"url":"https://ap-digital.ca/coquitlam","telephone":"+1-778-682-5772","email":"apdigital.core@gmail.com","priceRange":"$$","address": {"@type":"PostalAddress","addressLocality":"Vancouver","addressRegion":"BC","postalCode":"V3Y 0G3","addressCountry":"CA"
      },"areaServed": [
        {"@type":"City","name":"Coquitlam" },
        {"@type":"City","name":"Port Moody" },
        {"@type":"City","name":"Port Coquitlam" },
        {"@type":"City","name":"New Westminster" },
        {"@type":"City","name":"Vancouver" }
      ],"openingHoursSpecification": {"@type":"OpeningHoursSpecification","dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],"opens":"09:00","closes":"18:00"
      },"founder": {"@type":"Person","name":"Arjun Sharma" },"sameAs": ["https://ap-digital.ca"]
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
              Marketing Agency{' '}
              <span className="italic">Coquitlam</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-8">
              AP Digital helps Coquitlam businesses — and across Port Moody & Port Coquitlam — generate qualified leads with Meta Ads, Google Ads & social media. Searching for a digital marketing agency near you in the Tri-Cities? We specialize in local businesses. No contracts, month-to-month.
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
            Who We Help in <span className="italic">Coquitlam</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            Across Coquitlam, Port Moody, and Port Coquitlam — we help local businesses generate leads and grow.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
              <Zap className="relative z-10 w-8 h-8 text-foreground reveal-ink mb-4" />
              <h3 className="relative z-10 font-serif text-xl font-medium text-foreground reveal-ink mb-2">Trades & Contractors</h3>
              <p className="relative z-10 text-muted-foreground reveal-body">Plumbers, HVAC, and electricians across Coquitlam & Tri-Cities staying booked solid with precision-targeted campaigns.</p>
            </div>
            <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
              <Star className="relative z-10 w-8 h-8 text-foreground reveal-ink mb-4" />
              <h3 className="relative z-10 font-serif text-xl font-medium text-foreground reveal-ink mb-2">Hair Salons & Beauty Studios</h3>
              <p className="relative z-10 text-muted-foreground reveal-body">Consistent bookings in Coquitlam & Port Moody — no more relying on word-of-mouth and hoping the phone rings.</p>
            </div>
            <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
              <Target className="relative z-10 w-8 h-8 text-foreground reveal-ink mb-4" />
              <h3 className="relative z-10 font-serif text-xl font-medium text-foreground reveal-ink mb-2">Real Estate Agents</h3>
              <p className="relative z-10 text-muted-foreground reveal-body">Leads across the Tri-Cities market — targeted ad campaigns that reach motivated buyers and sellers throughout the area.</p>
            </div>
            <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
              <Users className="relative z-10 w-8 h-8 text-foreground reveal-ink mb-4" />
              <h3 className="relative z-10 font-serif text-xl font-medium text-foreground reveal-ink mb-2">Coaches & Consultants</h3>
              <p className="relative z-10 text-muted-foreground reveal-body">Growing coaching businesses across Metro Vancouver with proven ad strategies that attract ideal clients online.</p>
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
            Everything your Coquitlam business needs to generate leads and grow — all managed under one roof.
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

      {/* Why Coquitlam Businesses Are Investing in Paid Ads */}
      <section className="bg-white py-24">
        <div className="container-custom max-w-4xl">
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground text-center mb-4">
            Why Coquitlam Businesses Are Investing in <span className="italic">Paid Ads</span>
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
      <section className="bg-[#EDEFF2] py-24">
        <div className="container-custom">
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground text-center mb-4">
            Our Coquitlam Marketing Process
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            A clear, proven process that gets your Coquitlam business generating leads fast — with no guesswork.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group reveal-card relative overflow-hidden bg-white elev-2 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
              <div className="relative z-10 font-serif text-3xl font-medium text-foreground/25 mb-3 reveal-ink">1</div>
              <h3 className="relative z-10 font-serif text-lg font-medium text-foreground reveal-ink mb-2">Free Strategy Call</h3>
              <p className="relative z-10 text-muted-foreground reveal-body text-sm">We learn your Coquitlam market, your competition, and your goals. Whether you serve Coquitlam, Port Moody, PoCo, or all three — we plan around your service area.</p>
            </div>
            <div className="group reveal-card relative overflow-hidden bg-white elev-2 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
              <div className="relative z-10 font-serif text-3xl font-medium text-foreground/25 mb-3 reveal-ink">2</div>
              <h3 className="relative z-10 font-serif text-lg font-medium text-foreground reveal-ink mb-2">Campaign Build</h3>
              <p className="relative z-10 text-muted-foreground reveal-body text-sm">We build your Meta Ads or Google Ads campaign targeting Coquitlam and surrounding areas — Westwood Plateau, Burke Mountain, Port Moody, Port Coquitlam, and New Westminster.</p>
            </div>
            <div className="group reveal-card relative overflow-hidden bg-white elev-2 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
              <div className="relative z-10 font-serif text-3xl font-medium text-foreground/25 mb-3 reveal-ink">3</div>
              <h3 className="relative z-10 font-serif text-lg font-medium text-foreground reveal-ink mb-2">Launch & Optimize</h3>
              <p className="relative z-10 text-muted-foreground reveal-body text-sm">Live within 7 days. We monitor and optimize daily in the first 2 weeks to ensure your Tri-Cities campaign is delivering real, qualified leads from day one.</p>
            </div>
            <div className="group reveal-card relative overflow-hidden bg-white elev-2 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
              <div className="relative z-10 font-serif text-3xl font-medium text-foreground/25 mb-3 reveal-ink">4</div>
              <h3 className="relative z-10 font-serif text-lg font-medium text-foreground reveal-ink mb-2">Scale</h3>
              <p className="relative z-10 text-muted-foreground reveal-body text-sm">Once leads are flowing, we scale what's working and cut what isn't. Your cost-per-lead drops and your pipeline becomes predictable and reliable.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Areas We Serve */}
      <section className="bg-white py-24">
        <div className="container-custom">
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground text-center mb-4">
            Areas We Serve Near <span className="italic">Coquitlam</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
            Our campaigns cover all of Coquitlam and the Tri-Cities region. We geo-target your exact service area so every ad dollar reaches the neighbourhoods and communities where your best customers live.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mb-16">
            {['Port Moody', 'Port Coquitlam', 'Burnaby', 'New Westminster', 'Pitt Meadows', 'Maple Ridge'].map((area) => (
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
              { city: 'Langley', href: '/langley' },
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
            Why Coquitlam Businesses Choose <span className="italic">AP Digital</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            We're not a big agency with account managers and hand-offs. We're a focused team that delivers.
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
              <p className="relative z-10 text-muted-foreground reveal-body text-sm">Month-to-month with zero lock-in. We earn your business every single month by actually delivering results.</p>
            </div>
            <div className="group reveal-card relative overflow-hidden bg-white elev-2 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
              <Zap className="relative z-10 w-8 h-8 text-foreground reveal-ink mb-4" />
              <h3 className="relative z-10 font-serif text-lg font-medium text-foreground reveal-ink mb-2">Fast Results</h3>
              <p className="relative z-10 text-muted-foreground reveal-body text-sm">Most Coquitlam clients see their first qualified leads within 2 weeks of launch. We move fast and optimize constantly.</p>
            </div>
          </div>
        </div>
      </section>

            <FaqLight faqs={faqs} cityName="Coquitlam" />

      {/* Our Services */}
      <OurServices />

      <IndustriesWeServe />

            <PastelCTA
        headline="Ready to Grow Your Coquitlam Business?"
        subheadline="Book a free 20-minute strategy call. We'll show you exactly what a campaign looks like for your business and your budget. No pitch, no pressure."
      />

    </main>
    <Footer />
  </>
);

export default Coquitlam;

