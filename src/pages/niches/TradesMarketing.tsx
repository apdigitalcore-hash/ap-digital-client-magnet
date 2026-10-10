import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, TrendingUp, Phone, Star } from 'lucide-react';
import OurServices from '@/components/OurServices';
import { getServiceSchema, getBreadcrumbSchema, getFAQSchema, getWebPageSchema, founderSchema } from '@/lib/structuredData';
import JsonLd from '@/components/JsonLd';
import FaqLight from '@/components/light/FaqLight';
import PastelCTA from '@/components/light/PastelCTA';
import InlineCTA from '@/components/light/InlineCTA';

const TITLE = 'Trades Marketing BC | Contractor Lead Generation | AP Digital';
const DESC = 'AP Digital runs Google & Meta Ads for BC plumbers, electricians, HVAC companies & roofers. $759/month management, month-to-month. 90-day guarantee.';
const CANONICAL = 'https://ap-digital.ca/trades-marketing';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const included = [
  'Google Ads campaigns for local service searches',
  'Facebook & Instagram ads targeting homeowners',
  'Google Business Profile optimization & management',
  'Review generation & reputation management',
  'Before-and-after project content creation',
  'Landing pages built to convert job inquiries',
  'Monthly lead tracking & ROI reporting',
  'Local SEO to rank in your service area',
];

const results = [
  { icon: TrendingUp, stat: 'Google Ads', label: 'High-intent search campaigns for emergency & service calls' },
  { icon: Phone, stat: 'Meta Ads', label: 'Homeowner targeting for routine jobs & seasonal work' },
  { icon: Star, stat: 'No Contract', label: 'Month-to-month with 90-day results guarantee' },
];

const faqs = [
  {
    question: 'How quickly will I get leads as a trades business in BC?',
    answer: 'Most trades businesses in Metro Vancouver see their first qualified leads within 2 weeks of launching. Google Ads for emergency searches (plumber near me, HVAC repair) can produce calls within days. Meta Ads typically ramp up by week 3.',
  },
  {
    question: 'Is there a contract for trades marketing?',
    answer: 'No. AP Digital works month-to-month with all trades clients — plumbers, electricians, HVAC techs, roofers, and landscapers. No lock-in, no cancellation fees. You stay because the leads keep coming.',
  },
  {
    question: 'How much does trades marketing cost in BC?',
    answer: 'Most BC contractors start with $1,000–$1,500/month in ad spend plus a $759/month management fee. This covers Google Ads, Meta Ads, creative testing, and weekly reporting. Cost per lead varies a lot by trade, season and how competitive your area is — emergency call-outs are cheaper to win than large installs, and we report yours every week rather than quoting an average up front.',
  },
  {
    question: 'Should my trades business use Google Ads or Facebook Ads?',
    answer: 'Both work, but for different reasons. Google Ads captures emergency and high-intent searches — someone whose pipe just burst is Googling, not scrolling Facebook. Meta Ads build awareness and generate leads from homeowners who need routine work. Most trades businesses get the best results running both.',
  },
  {
    question: 'Do you work with plumbers, electricians, and HVAC companies in Vancouver?',
    answer: 'Yes. We specialize in trades businesses across Metro Vancouver including plumbers, electricians, HVAC technicians, roofers, landscapers, and general contractors. We have proven playbooks for each trade that generate consistent leads.',
  },
  {
    question: 'How do I get my trades business to show up on Google?',
    answer: 'We run Google Search Ads targeting high-intent keywords specific to your trade and service area. We also optimize your Google Business Profile for local pack visibility, help generate reviews, and ensure your NAP (name, address, phone) is consistent across directories.',
  },
  {
    question: 'Can you help my trades business get more reviews?',
    answer: 'Yes. We set up automated review request sequences that go out after every completed job. More 5-star Google reviews improve your local search ranking and build trust with potential customers searching for contractors in their area.',
  },
  {
    question: 'Is it better to buy leads or run my own ads?',
    answer: 'Shared-lead sites like HomeStars and Angi are an easy start, but they typically send each homeowner to several contractors at once and own the customer relationship. Running your own Google Ads, Meta Ads and Google Business Profile means each call comes only to you and the reviews build on your own listing. Many trades use both while their own channels ramp up.',
  },
  {
    question: 'What is the minimum budget for trades marketing?',
    answer: 'We recommend at least $1,000/month in ad spend, paid directly to Google or Meta, plus $759/month for management, so about $1,759/month all in. Below that, campaigns rarely gather enough data to optimize.',
  },
  {
    question: 'Do I own my Google Ads account and Google Business Profile?',
    answer: 'Yes. Your Google Ads account and Google Business Profile stay in your name, and ad spend is billed directly to you by Google or Meta. If you leave, with 30 days\' notice, you keep the accounts, the history and the reviews.',
  },
  {
    question: 'How do I find a trades marketing agency near me in BC?',
    answer: 'AP Digital specializes in marketing for trades businesses across Metro Vancouver and the Fraser Valley. We serve plumbers, electricians, HVAC techs, roofers, and contractors in Vancouver, Surrey, Burnaby, Richmond, Langley, Coquitlam, and Abbotsford. No contracts, month-to-month.',
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    founderSchema,
    getServiceSchema('Trades Marketing', DESC, '/trades-marketing'),
    getFAQSchema(faqs),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Trades Marketing', url: '/trades-marketing' },
    ]),
    getWebPageSchema(TITLE, DESC, '/trades-marketing'),
  ]
};

const TradesMarketing = () => (
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
      <meta property="og:site_name" content="AP DIGITAL" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={TITLE} />
      <meta name="twitter:description" content={DESC} />
      <meta name="twitter:image" content={OG_IMAGE} />
      <meta name="robots" content="index, follow" />
      
    </Helmet>
      <JsonLd data={structuredData} />
    <Header />
    <main id="main-content" className="pt-24 pb-16">
      <div className="container-custom max-w-4xl">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground leading-[1.05] tracking-tight mb-8">
          Trades Marketing and Contractor Leads in BC
        </h1>

        {/* Short intro */}
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          When a pipe bursts, people Google. We make sure they find you first — and that your phone keeps ringing year-round.
        </p>

        <InlineCTA context="trades business" />

        {/* 3-column why strip */}
        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">Google Ads for high-intent searches</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">Capture people searching 'plumber near me' or 'HVAC Vancouver' right when they're ready to book.</p>
          </div>
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">Local SEO that sticks</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">We get you into the Google Maps pack, where local searches turn into calls, and keep you there.</p>
          </div>
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">No contract, no risk</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">Month-to-month. If we miss the lead target we agree on in 90 days, we keep working at no fee for a further 30 days.</p>
          </div>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-6">What You Get</h2>
        <ul className="grid sm:grid-cols-2 gap-4 mb-16">
          {included.map((item) => (
            <li key={item} className="flex items-start gap-3 text-foreground">
              <CheckCircle className="w-5 h-5 text-foreground mt-0.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-8">Results Our Trades Clients See</h2>
        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          {results.map((r) => (
            <div key={r.label} className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-7 text-center">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
              <r.icon className="reveal-ink relative z-10 w-8 h-8 text-foreground mx-auto mb-3" />
              <div className="reveal-ink relative z-10 font-serif text-3xl font-medium text-foreground mb-2">{r.stat}</div>
              <p className="reveal-body relative z-10 text-muted-foreground text-sm">{r.label}</p>
            </div>
          ))}
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">What Trades Marketing Actually Covers</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            Marketing for tradespeople is not a brand exercise. It is a phone-and-calendar problem: getting enough of the right jobs, in the right part of town, at a cost that leaves margin. For a plumbing, electrical, HVAC, roofing or contracting business in BC, three channels do almost all of that work.
          </p>
          <p className="mb-4">
            Google Ads puts you at the top of the page when someone searches for your service in your area. It is the fastest of the three: you pay per click, and leads typically start within the first two weeks. Your Google Business Profile and local SEO decide whether you appear in the Map Pack, the three businesses Google shows on a map, which is where a large share of "near me" calls come from. That builds more slowly but costs nothing per click once you are there. Meta Ads, on Facebook and Instagram, reach homeowners before they search, which matters most for planned work like renovations, heat pumps and re-roofs rather than emergencies.
          </p>
          <p>
            Which mix is right depends far more on your trade than on your city. An emergency plumber and a renovation contractor in the same Surrey postcode need almost opposite campaigns, which is why each trade has its own page below.
          </p>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">Contractor Lead Generation in BC: Rent the Leads or Own Them</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            Most BC trades businesses get their first online leads from a marketplace: HomeStars, Angi, Thumbtack, or Google's own Local Services Ads. These are a reasonable place to start, but the model is worth understanding before you build a business on it.
          </p>
          <p className="mb-4">
            Shared-lead marketplaces typically send the same homeowner to several contractors at once, so you are racing three or four competitors to the phone and the job often goes to whoever is cheapest or quickest. Local Services Ads charge per lead rather than per click and only show a handful of businesses, which makes them useful for emergency trades, but you have little control over which leads you pay for. In every case the platform owns the customer relationship, and when you stop paying, the leads stop.
          </p>
          <p>
            Running your own Google Ads, Meta Ads and Google Business Profile works the other way round. The homeowner calls you and only you, the reviews and profile history accumulate on your own listing, and you can see exactly what each job cost to win. You also own the accounts: your Google Ads account and your Google Business Profile stay in your name, and ad spend is paid directly to Google or Meta, so if you ever leave us you keep all of it.
          </p>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">How the Trades Differ</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            The same budget can work brilliantly for one trade and poorly for another. These are the differences that shape every campaign we build.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Plumbing: speed wins</h3>
          <p className="mb-4">
            A large share of plumbing searches are urgent, and the homeowner usually calls the first business that answers. Google Ads and the Map Pack matter most, and a missed call is a lost job, so call answering after hours is as important as the ads themselves. Details on our <Link to="/plumber-marketing" className="text-foreground underline underline-offset-4">plumber marketing</Link> page.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Electrical: planned jobs with a permit</h3>
          <p className="mb-4">
            Panel upgrades, EV chargers and renovation wiring are mostly planned, researched purchases. Homeowners compare a few electricians, check reviews and licensing, and book days or weeks later. Search ads still lead, but reviews and a credible website carry more weight. See <Link to="/electrician-marketing" className="text-foreground underline underline-offset-4">electrician marketing</Link>.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">HVAC: two seasons and rebates</h3>
          <p className="mb-4">
            Heating demand peaks when the weather turns in fall, cooling demand during summer heat, and heat pump installs are driven partly by rebate programs that change over time. HVAC budgets should move with the season rather than stay flat all year. More on <Link to="/hvac-marketing" className="text-foreground underline underline-offset-4">HVAC marketing</Link>.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Roofing: rain sets the calendar</h3>
          <p className="mb-4">
            Leak repairs spike when the fall rains arrive, while full replacements are high-value jobs homeowners research for weeks. A roofer needs fast response for one and patient follow-up for the other. See <Link to="/roofer-marketing" className="text-foreground underline underline-offset-4">roofer marketing</Link>.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">General contracting: the longest sales cycle</h3>
          <p>
            Renovations and additions are the largest jobs in home services and take the longest to close, often weeks from first enquiry to signed contract. Portfolio photos and Meta Ads do more of the work here than in any other trade. See <Link to="/contractor-marketing" className="text-foreground underline underline-offset-4">contractor marketing</Link>.
          </p>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">What the Money Looks Like</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            There are two separate costs. Management is $759/month, month-to-month, with 30 days' notice to pause or cancel. Ad spend is paid directly to Google or Meta on your own card, and we recommend a minimum of $1,000/month so campaigns gather enough data to optimize. So the realistic starting point for a trades business is about $1,759/month all in.
          </p>
          <p className="mb-4">
            The useful question is not what that costs but how many jobs it needs to cover. Take your average job value and your gross margin and work backwards. For example, a trade with a $600 average job and a 40% margin earns about $240 per job, so roughly eight booked jobs a month cover $1,759. A trade whose average job is $10,000 needs one. That arithmetic, more than any industry average, tells you whether paid marketing makes sense for your business right now.
          </p>
          <p>
            Our weekly performance report includes cost per booked job, so you can see which work is profitable to advertise and which is not. See full <Link to="/pricing" className="text-foreground underline underline-offset-4">pricing</Link>.
          </p>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">Your First 90 Days</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Weeks 1–2: Build and launch</h3>
          <p className="mb-4">
            We agree a lead-volume target with you at kickoff, set up call and form tracking, review your Google Business Profile and website, and launch Google Ads on the services and areas you most want. Most clients see their first qualified leads within 2 weeks of launch.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Weeks 3–6: Find what books</h3>
          <p className="mb-4">
            Meta Ads typically show qualified leads within 2–3 weeks. With real call data coming in, we cut searches that bring price-shoppers or jobs outside your area, shift budget toward the services that book, and set up review requests after each completed job.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Weeks 7–12: Measure against the target</h3>
          <p>
            By the end of month three you have a cost per booked job for each service and a clear view of whether the program pays for itself. If we have missed the lead target we agreed at kickoff, we keep working at no fee for a further 30 days. That is the 90-day results guarantee.
          </p>
        </div>

        <FaqLight faqs={faqs} />

        <div className="mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">Marketing by Trade</h2>
          <p className="text-muted-foreground mb-6">We build trade-specific campaigns with keyword targeting, ad copy, and benchmarks tuned to each vertical.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/plumber-marketing" className="bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl p-6 transition-all duration-300">
              <p className="font-bold text-foreground">Plumber Marketing</p>
              <p className="reveal-body relative z-10 text-sm text-muted-foreground">Emergency & service call campaigns across BC</p>
            </Link>
            <Link to="/electrician-marketing" className="bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl p-6 transition-all duration-300">
              <p className="font-bold text-foreground">Electrician Marketing</p>
              <p className="reveal-body relative z-10 text-sm text-muted-foreground">Residential & commercial lead generation</p>
            </Link>
            <Link to="/hvac-marketing" className="bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl p-6 transition-all duration-300">
              <p className="font-bold text-foreground">HVAC Marketing</p>
              <p className="reveal-body relative z-10 text-sm text-muted-foreground">Seasonal campaigns for heating & cooling</p>
            </Link>
            <Link to="/roofer-marketing" className="bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl p-6 transition-all duration-300">
              <p className="font-bold text-foreground">Roofer Marketing</p>
              <p className="reveal-body relative z-10 text-sm text-muted-foreground">Storm-response & re-roofing lead campaigns</p>
            </Link>
            <Link to="/contractor-marketing" className="bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl p-6 transition-all duration-300">
              <p className="font-bold text-foreground">General Contractor Marketing</p>
              <p className="reveal-body relative z-10 text-sm text-muted-foreground">Renovation & new build lead generation</p>
            </Link>
          </div>
        </div>

        <OurServices />

        <div className="mt-16 mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-6">Cities We Serve</h2>
          <p className="text-muted-foreground mb-6">We help trades businesses across Metro Vancouver and the Fraser Valley. See <Link to="/pricing" className="text-foreground underline underline-offset-4 hover:text-foreground/70">pricing</Link> or browse <Link to="/case-studies" className="text-foreground underline underline-offset-4 hover:text-foreground/70">how we work</Link>.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { city: 'Vancouver', href: '/vancouver' },
              { city: 'Surrey', href: '/surrey' },
              { city: 'Burnaby', href: '/burnaby' },
              { city: 'Richmond', href: '/richmond' },
              { city: 'Langley', href: '/langley' },
              { city: 'Coquitlam', href: '/coquitlam' },
              { city: 'Abbotsford', href: '/abbotsford' },
            ].map(({ city, href }) => (
              <Link key={href} to={href} className="bg-white elev-1 hover:elev-2 hover:-translate-y-0.5 rounded-2xl p-4 text-center transition-all duration-300">
                <span className="font-medium text-foreground">{city}</span>
              </Link>
            ))}
          </div>
        </div>

        <PastelCTA />
      </div>
    </main>
    <Footer />
  </>
);

export default TradesMarketing;
