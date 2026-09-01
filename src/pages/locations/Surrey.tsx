import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, CheckCircle, TrendingUp, Star, Zap, Target, Users, MapPin } from 'lucide-react';
import OurServices from '@/components/OurServices';
import IndustriesWeServe from '@/components/IndustriesWeServe';
import { getServiceSchema, getBreadcrumbSchema, getFAQSchema, getWebPageSchema, founderSchema } from '@/lib/structuredData';
import JsonLd from '@/components/JsonLd';
import FaqLight from '@/components/light/FaqLight';
import PastelCTA from '@/components/light/PastelCTA';

const TITLE = 'Surrey Lead Generation: Google & Meta Ads, No Lock-In';
const DESC = 'Paid ads for Surrey businesses in Newton, Guildford, South Surrey and Cloverdale. $759/month, cancel with 30 days\' notice. No long-term contract.';
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
    question: 'Who is the best digital marketing agency in Surrey for contractors?',
    answer: 'For Surrey trades — plumbers, HVAC, electricians, roofers — the agency worth hiring is the one that targets at neighbourhood level rather than blanketing Metro Vancouver, and that reports cost per booked job rather than impressions. AP Digital runs Google Ads and Meta Ads for Surrey contractors across Newton, Guildford, South Surrey and Cloverdale, month-to-month with no lock-in. Arjun Sharma manages every account personally, so the person building your campaign is the person you talk to.',
  },
  {
    question: 'Is there a Surrey marketing company that works month-to-month?',
    answer: 'Yes. AP Digital works month-to-month with every Surrey client — pause or cancel with 30 days\' notice, no exit fee. Most agencies ask for six or twelve months up front because it protects them through a slow start. We would rather earn the next month by producing leads in this one.',
  },
  {
    question: 'How much does a marketing agency in Surrey cost?',
    answer: 'Paid ads management is $759/month and social media management is $849/month, quoted separately so you only pay for what you use. Ad spend is separate again and goes straight to Google or Meta, so you keep control of the budget. Most Surrey businesses start between $1,000 and $2,000/month all in.',
  },
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
  {
    question: 'How do I find a digital marketing agency near me in Surrey?',
    answer: 'AP Digital serves Surrey businesses across all neighbourhoods — Fleetwood, Guildford, Newton, Cloverdale, South Surrey, and White Rock. We specialize in trades, salons, realtors, and coaches. No contracts, and the founder manages your account personally.',
  },
];

const structuredData = {"@context":"https://schema.org","@graph": [
    founderSchema,
    getServiceSchema('Digital Marketing Surrey BC', DESC, '/surrey'),
    getFAQSchema(faqs),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Surrey', url: '/surrey' },
    ]),
    getWebPageSchema(TITLE, DESC, '/surrey'),
    {"@type":"LocalBusiness","@id":"https://ap-digital.ca/surrey","name":"AP Digital — Surrey Digital Marketing Agency","description": DESC,"url":"https://ap-digital.ca/surrey","telephone":"+1-778-682-5772","email":"apdigital.core@gmail.com","priceRange":"$$","address": {"@type":"PostalAddress","addressLocality":"Vancouver","addressRegion":"BC","postalCode":"V3Y 0G3","addressCountry":"CA"
      },"areaServed": [
        {"@type":"City","name":"Surrey" },
        {"@type":"City","name":"White Rock" },
        {"@type":"City","name":"Delta" },
        {"@type":"City","name":"Langley" },
        {"@type":"City","name":"Cloverdale" }
      ],"openingHoursSpecification": {"@type":"OpeningHoursSpecification","dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],"opens":"09:00","closes":"18:00"
      },"founder": {"@type":"Person","name":"Arjun Sharma" },"sameAs": ["https://ap-digital.ca"]
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
      
    </Helmet>
      <JsonLd data={structuredData} />
    <Header />
    <main id="main-content">

      {/* Hero */}
      <section className="relative bg-[#E4E7EB] pt-32 pb-24">
        <div className="container-custom">
          <div className="max-w-3xl animate-fade-up">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium text-foreground mb-6 leading-[1.05] tracking-tight">
              Surrey{' '}
              <span className="italic">Google &amp; Meta Ads</span>{' '}
              + Social Media Management
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-8">
              AP Digital helps Surrey businesses — trades, salons, real estate agents & coaches — get consistent, predictable leads using Meta Ads & Google Ads. When someone searches "marketing agency near me" in Surrey, we put you in front of them. Month-to-month. Managed personally by Arjun Sharma.
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
            Who We Help in <span className="italic">Surrey</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            From South Surrey to Guildford, we generate qualified leads for local businesses across the region.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
              <Zap className="relative z-10 w-8 h-8 text-foreground reveal-ink mb-4" />
              <h3 className="relative z-10 font-serif text-xl font-medium text-foreground reveal-ink mb-2">Trades & Contractors</h3>
              <p className="relative z-10 text-muted-foreground reveal-body">Plumbers, HVAC, electricians, and roofers across Surrey & South Fraser getting booked solid with targeted ads.</p>
            </div>
            <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
              <Star className="relative z-10 w-8 h-8 text-foreground reveal-ink mb-4" />
              <h3 className="relative z-10 font-serif text-xl font-medium text-foreground reveal-ink mb-2">Hair Salons & Beauty Studios</h3>
              <p className="relative z-10 text-muted-foreground reveal-body">Filling chairs with consistent, reliable bookings for salons throughout Surrey and the surrounding area.</p>
            </div>
            <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
              <Target className="relative z-10 w-8 h-8 text-foreground reveal-ink mb-4" />
              <h3 className="relative z-10 font-serif text-xl font-medium text-foreground reveal-ink mb-2">Real Estate Agents</h3>
              <p className="relative z-10 text-muted-foreground reveal-body">Buyer & seller leads in Surrey's competitive market — targeted campaigns that reach motivated homeowners.</p>
            </div>
            <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
              <Users className="relative z-10 w-8 h-8 text-foreground reveal-ink mb-4" />
              <h3 className="relative z-10 font-serif text-xl font-medium text-foreground reveal-ink mb-2">Coaches & Consultants</h3>
              <p className="relative z-10 text-muted-foreground reveal-body">Attracting ideal clients online and scaling coaching businesses across BC with proven ad strategies.</p>
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
            Everything your Surrey business needs to generate leads and grow — all managed under one roof.
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

      {/* Why Surrey Businesses Are Investing in Paid Ads */}
      <section className="bg-white py-24">
        <div className="container-custom max-w-4xl">
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground text-center mb-4">
            Why Surrey Businesses Are Investing in <span className="italic">Paid Ads</span>
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
      <section className="bg-[#EDEFF2] py-24">
        <div className="container-custom">
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground text-center mb-4">
            Our Surrey Marketing Process
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            A clear, proven process that gets your Surrey business generating leads fast — with no guesswork.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group reveal-card relative overflow-hidden bg-white elev-2 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
              <div className="relative z-10 font-serif text-3xl font-medium text-foreground/25 mb-3 reveal-ink">1</div>
              <h3 className="relative z-10 font-serif text-lg font-medium text-foreground reveal-ink mb-2">Free Strategy Call</h3>
              <p className="relative z-10 text-muted-foreground reveal-body text-sm">We learn your Surrey market, your competition, and your goals. No cookie-cutter approach — every campaign starts with understanding your specific business.</p>
            </div>
            <div className="group reveal-card relative overflow-hidden bg-white elev-2 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
              <div className="relative z-10 font-serif text-3xl font-medium text-foreground/25 mb-3 reveal-ink">2</div>
              <h3 className="relative z-10 font-serif text-lg font-medium text-foreground reveal-ink mb-2">Campaign Build</h3>
              <p className="relative z-10 text-muted-foreground reveal-body text-sm">We build your Meta Ads or Google Ads campaign targeting Surrey and surrounding areas — Newton, Guildford, South Surrey, Cloverdale, White Rock, and beyond.</p>
            </div>
            <div className="group reveal-card relative overflow-hidden bg-white elev-2 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
              <div className="relative z-10 font-serif text-3xl font-medium text-foreground/25 mb-3 reveal-ink">3</div>
              <h3 className="relative z-10 font-serif text-lg font-medium text-foreground reveal-ink mb-2">Launch & Optimize</h3>
              <p className="relative z-10 text-muted-foreground reveal-body text-sm">Live within 7 days. We monitor and optimize daily in the first 2 weeks to make sure your Surrey campaign hits its stride as fast as possible.</p>
            </div>
            <div className="group reveal-card relative overflow-hidden bg-white elev-2 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
              <div className="relative z-10 font-serif text-3xl font-medium text-foreground/25 mb-3 reveal-ink">4</div>
              <h3 className="relative z-10 font-serif text-lg font-medium text-foreground reveal-ink mb-2">Scale</h3>
              <p className="relative z-10 text-muted-foreground reveal-body text-sm">Once leads are flowing, we scale what's working and cut what isn't. Your cost-per-lead drops as the campaign matures and data accumulates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Areas We Serve */}
      <section className="bg-white py-24">
        <div className="container-custom">
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground text-center mb-4">
            Areas We Serve Near <span className="italic">Surrey</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
            Our digital marketing campaigns cover all of Surrey and the surrounding South Fraser region. Whether you're based in Newton or South Surrey, we target your exact service area so every ad dollar is working as hard as possible.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mb-16">
            {['Newton', 'Guildford', 'South Surrey', 'Cloverdale', 'Whalley', 'White Rock', 'Delta', 'Langley'].map((area) => (
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
              { city: 'Burnaby', href: '/burnaby' },
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
            Why Surrey Businesses Choose <span className="italic">AP Digital</span>
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
              <p className="relative z-10 text-muted-foreground reveal-body text-sm">Most Surrey clients see their first qualified leads within 2 weeks of launch. We move fast and optimize constantly.</p>
            </div>
          </div>
        </div>
      </section>

            <FaqLight faqs={faqs} cityName="Surrey" />

      {/* Our Services */}
      <OurServices />

      <IndustriesWeServe />

            <PastelCTA
        headline="Ready to Grow Your Surrey Business?"
        subheadline="Book a free 20-minute strategy call. We'll show you exactly what a campaign looks like for your business and your budget. No pitch, no pressure."
      />

    
      {/* Internal links — these pages previously dead-ended at /book, so nothing
          flowed to the niche pages or between cities. */}
      <section className="py-16 bg-white border-t border-foreground/[0.07]">
        <div className="container-custom max-w-3xl text-muted-foreground leading-relaxed">
          <h2 className="font-serif text-2xl text-foreground mb-4">More on working with us in Surrey</h2>
          <p className="mb-4">
            We run <Link to="/services/paid-ads" className="underline underline-offset-4 hover:text-foreground">Google and Meta Ads</Link> and{' '}
            <Link to="/services/social-media" className="underline underline-offset-4 hover:text-foreground">social media management</Link> for Surrey businesses — most often <Link to="/trades-marketing" className="underline underline-offset-4 hover:text-foreground">trades and contractors</Link>, <Link to="/salon-marketing" className="underline underline-offset-4 hover:text-foreground">salons</Link>, <Link to="/real-estate-marketing" className="underline underline-offset-4 hover:text-foreground">real estate agents</Link>, <Link to="/dental-marketing" className="underline underline-offset-4 hover:text-foreground">dental clinics</Link>.
          </p>
          <p className="mb-4">
            Full pricing is on the <Link to="/pricing" className="underline underline-offset-4 hover:text-foreground">pricing page</Link>, and{' '}
            <Link to="/how-to-choose-a-marketing-agency-vancouver" className="underline underline-offset-4 hover:text-foreground">how to choose a marketing agency</Link> covers what to ask before you hire anyone.
          </p>
          <p>
            Nearby: <Link to="/richmond" className="underline underline-offset-4 hover:text-foreground">Richmond</Link> and{' '}
            <Link to="/langley" className="underline underline-offset-4 hover:text-foreground">Langley</Link>.
          </p>
        </div>
      </section>

      </main>
    <Footer />
  </>
);

export default Surrey;

