import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, Search, Share2, ShieldCheck } from 'lucide-react';
import OurServices from '@/components/OurServices';
import { getServiceSchema, getBreadcrumbSchema, getFAQSchema, getWebPageSchema, founderSchema } from '@/lib/structuredData';
import JsonLd from '@/components/JsonLd';
import FaqLight from '@/components/light/FaqLight';
import PastelCTA from '@/components/light/PastelCTA';
import InlineCTA from '@/components/light/InlineCTA';

const TITLE = 'Contractor Marketing Vancouver | AP Digital';
const DESC = 'General contractor marketing with Google Ads & Meta Ads for Metro Vancouver. Month-to-month. No contracts. 90-day guarantee.';
const CANONICAL = 'https://ap-digital.ca/contractor-marketing';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const included = [
  'Google Search Ads for "home renovation," "kitchen remodel," & "bathroom reno" keywords',
  'Meta Ads targeting homeowners planning renovations in your service area',
  'Before-and-after project galleries on landing pages',
  'Google Business Profile optimization with project photos & reviews',
  'Call tracking tied to booked estimates, not just inquiries',
  'Retargeting campaigns for website visitors who didn\'t convert',
  'Monthly reporting with cost-per-estimate and close-rate metrics',
  'Seasonal campaigns aligned with BC renovation peaks (spring & summer)',
];

const results = [
  { icon: Search, stat: 'Google + Meta', label: 'Full-funnel ad campaigns' },
  { icon: Share2, stat: 'No Contract', label: 'Month-to-month, 30 days\' notice' },
  { icon: ShieldCheck, stat: '90-Day', label: 'Performance guarantee included' },
];

const faqs = [
  {
    question: 'How much do Google Ads cost for general contractors in BC?',
    answer: 'Most general contractors invest $1,500–$3,000/month in ad spend plus a $759/month management fee. Renovation keywords cost $12–$35 per click in Metro Vancouver. With average job values of $15K–$100K+, the ROI is outstanding — one closed kitchen renovation can cover a year of ad spend.',
  },
  {
    question: 'Should general contractors use Google Ads or Meta Ads?',
    answer: 'Both, but for different stages. Google Ads captures homeowners actively searching ("kitchen renovation Vancouver," "bathroom remodel contractor"). Meta Ads reaches homeowners who are in the dreaming/planning phase — they haven\'t searched yet, but they\'re scrolling Instagram and seeing beautiful renovation before-and-afters. Google closes now; Meta builds your pipeline.',
  },
  {
    question: 'How fast will I get renovation leads?',
    answer: 'Google Ads typically generates the first qualified leads within 1–2 weeks. Meta Ads take 2–3 weeks to optimize as the algorithm learns who converts. Most GCs see steady volume by week 4. Renovation leads have a longer sales cycle (2–8 weeks from inquiry to signed contract), so patience in the funnel is key.',
  },
  {
    question: 'What renovation keywords should I target?',
    answer: 'We target service-specific keywords: "kitchen renovation [city]," "bathroom remodel contractor," "basement finishing," "home addition Vancouver," and "full home renovation." We also build campaigns around trending renovation types — ADU/laneway house construction is surging in Vancouver due to BC\'s housing density policies.',
  },
  {
    question: 'How important are before-and-after photos for contractor marketing?',
    answer: 'Critical. For general contractors, before-and-after project galleries are the single highest-converting element on your landing page. Homeowners need to see your work before they\'ll call. We build landing pages with full project galleries, and use your best transformations in Meta Ads creative. Contractors with strong portfolios convert 2–3x better.',
  },
  {
    question: 'Is ADU/laneway house marketing worth investing in?',
    answer: 'Yes — it\'s one of the fastest-growing contractor keywords in BC. Vancouver and BC municipalities have relaxed zoning to allow accessory dwelling units (ADUs), laneway houses, and garden suites. Searches for "laneway house builder Vancouver" and "ADU contractor BC" are up significantly. Average project value: $150K–$350K.',
  },
  {
    question: 'How do I get more renovation estimates from my website?',
    answer: 'Three things: a project gallery with high-quality before-and-after photos, a clear "Get a Free Estimate" CTA above the fold, and social proof (Google reviews, project count, years in business). We build landing pages with all three elements optimized for conversions, not just aesthetics.',
  },
  {
    question: 'What is contractor SEO?',
    answer: 'Contractor SEO is the work of getting a renovation or building company to show up in Google\'s Map Pack and organic results without paying per click. In Metro Vancouver it mostly comes down to a complete Google Business Profile, a page for each service and key city, a steady flow of reviews, consistent directory listings, and a fast site that shows your projects.',
  },
  {
    question: 'Is SEO or Google Ads better for contractors?',
    answer: 'They do different jobs. Google Ads produces qualified leads within 1–2 weeks but stops the day you stop paying. SEO takes months before it contributes but does not charge per click once you rank. Most general contractors are best served by running ads first to fill the pipeline, working on their Google Business Profile from day one, and adding deeper SEO once they can afford to wait for it.',
  },
  {
    question: 'How much does SEO for contractors cost?',
    answer: 'Ongoing SEO for a single-location Canadian service business typically runs $750–$1,500/month, or $1,500–$3,500/month in competitive metros or with several service lines. A one-off local SEO setup typically costs $1,000–$2,500. AP Digital\'s contractor program is $759/month in management plus ad spend and includes Google Business Profile optimization; further SEO work is scoped on a call rather than sold at a list price.',
  },
  {
    question: 'How long does roofing SEO take to work?',
    answer: 'Map Pack movement in a roofer\'s core service area typically starts showing within 60–90 days. Organic rankings for competitive terms like "roof replacement Vancouver" commonly take 6–12 months. Because roofing searches spike every fall with the rain, SEO work is best started in spring; roofers who need leads this season usually rely on Google Ads first.',
  },
  {
    question: 'Is there a contract?',
    answer: 'No. AP Digital works month-to-month with all contractor clients. No lock-in, no cancellation fees. 90-day performance guarantee included.',
  },
  {
    question: 'How do I find a contractor marketing agency near me?',
    answer: 'AP Digital serves general contractors across Metro Vancouver and the Fraser Valley. We run Google Ads for renovation and new build searches, plus Meta Ads for homeowner targeting. No contracts, month-to-month.',
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    founderSchema,
    getServiceSchema('General Contractor Marketing', DESC, '/contractor-marketing'),
    getFAQSchema(faqs),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Trades Marketing', url: '/trades-marketing' },
      { name: 'Contractor Marketing', url: '/contractor-marketing' },
    ]),
    getWebPageSchema(TITLE, DESC, '/contractor-marketing'),
  ]
};

const ContractorMarketing = () => (
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
          General Contractor Leads in Metro Vancouver
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          Kitchen renos, bathroom remodels, basement finishing, laneway houses — when Metro Vancouver homeowners plan a renovation, they search online first. AP Digital builds booked-estimate systems for general contractors using Google Ads, Meta Ads, and portfolio-driven landing pages.
        </p>

        <InlineCTA context="contracting business" />

        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">Highest job values in home services</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">Kitchen renovations: $25K–$80K. Basement finishing: $30K–$60K. Laneway houses: $150K–$350K. One closed deal can return 100x+ your monthly ad spend.</p>
          </div>
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">Google + Meta: full funnel</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">Google captures homeowners searching now. Meta reaches homeowners dreaming and planning. Running both fills your estimate calendar with qualified projects.</p>
          </div>
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">90-day guarantee</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">No contracts. If we miss the lead target we agree on in 90 days, we keep working at no fee for a further 30 days. Month-to-month, always.</p>
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

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-8">What Sets Us Apart</h2>
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

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">BC Renovation Market: What You're Competing For</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            Metro Vancouver's renovation market is booming. High home prices mean more homeowners are renovating instead of moving. BC's new ADU and laneway house policies are creating an entirely new category of $150K–$350K projects. And aging housing stock (60%+ of Vancouver homes are pre-1990) means a steady flow of kitchen, bathroom, and whole-home renovation demand.
          </p>
          <p className="mb-4">
            The challenge for general contractors is that renovation leads have a longer sales cycle than emergency trades. A homeowner researching a kitchen renovation may take 2–8 weeks from first search to signed contract. That's why running both Google Ads (for active searchers) and Meta Ads (for planners and dreamers) is critical — Google closes deals now, Meta fills your pipeline for next month.
          </p>
          <p>
            The contractors who convert best have strong before-and-after portfolios, fast response times (calling within 5 minutes of a lead), and competitive but not lowball pricing. We optimize for booked estimates, not just form fills.
          </p>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">Contractor SEO vs. Google Ads: What Each One Does</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            Search a renovation term in Metro Vancouver and Google shows three things: paid ads at the top, the Map Pack (three local businesses on a map), and the regular organic results below. Google Ads buys the first spot. Contractor SEO is the work of earning the other two. They are not competing options so much as two different timelines.
          </p>
          <p className="mb-4">
            Google Ads is rented visibility. You pay for every click, typically $12–$35 for renovation keywords here, and qualified leads usually start within 1–2 weeks of launch. The day you stop paying, the leads stop too. That makes ads the right tool when your calendar has gaps now, when you want to test which job types are profitable, or when you are entering a new city.
          </p>
          <p className="mb-4">
            SEO for contractors is owned visibility. Nobody charges you per click when a homeowner finds you in the Map Pack or on page one. The cost is the time and work to get there, and the payoff is slow: a few months before anything moves, then compounding. It suits a GC who already has steady work and wants lead flow that does not depend on a monthly ad budget a year from now.
          </p>
          <p>
            For most general contractors we talk to, the honest order is: ads first to fill the pipeline and learn what converts, Google Business Profile work from day one because it feeds both, and deeper SEO once the business can afford to wait for it.
          </p>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">What SEO for Contractors Actually Involves in Metro Vancouver</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            Contractor SEO is less about blog posts and keywords than most agencies make it sound. For a renovation or building company serving Metro Vancouver, the work that moves rankings falls into five areas.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">1. Google Business Profile and the Map Pack</h3>
          <p className="mb-4">
            The Map Pack takes most of the clicks on "contractor near me" style searches, and it ranks heavily on how close the business is to the searcher. A GC based in Langley will rarely appear in the Map Pack for a search made in North Vancouver, however good the profile. So the profile has to be complete and accurate in the area you can realistically win: correct categories, every service listed, a defined service area, project photos added regularly, and questions answered. Service-area businesses can hide their address, which most home-based contractors should.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">2. One page per service, and per city that matters</h3>
          <p className="mb-4">
            A homeowner searching "basement finishing Burnaby" wants a page about basement finishing in Burnaby, not a homepage that lists twelve services. Separate pages for kitchens, bathrooms, basements, additions and laneway or coach houses, plus pages for the two or three cities you most want work in, give Google something specific to rank. Local terms matter too: Vancouver homeowners search "laneway house", while Surrey homeowners are more likely to search "coach house".
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">3. Reviews, and what they say</h3>
          <p className="mb-4">
            Review count, recency and rating all affect Map Pack position and click-through. Reviews that mention the job type and neighbourhood, such as a kitchen renovation in Kitsilano, help more than "great job". The fix is a process: ask every client at handover, with a direct link, while they are happiest.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">4. Consistent listings across directories</h3>
          <p className="mb-4">
            Your business name, phone number and service area should read the same on Google, HomeStars, Houzz, Yelp, the BBB and any trade association listing. Inconsistent or duplicate listings, often left over from an old phone number or a former business name, confuse Google about which details are correct.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">5. A fast site that shows the work</h3>
          <p>
            Most renovation searches happen on a phone. A site that loads slowly, or buries the project gallery behind three clicks, loses the visitor before rankings matter. Project pages with real photos, the scope of work and the neighbourhood double as SEO content and as proof for the homeowner comparing three quotes.
          </p>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">Roofing SEO: Why It Works Differently</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            Roofing SEO splits into two very different searches. "Roof leak repair" is urgent: the homeowner calls one of the first businesses they see, usually from the Map Pack or an ad, often the same day. "Roof replacement cost" is research: they read, compare and get several quotes over weeks. A roofing company needs a strong Google Business Profile and fast phone response for the first, and detailed replacement pages covering materials, pricing ranges and process for the second.
          </p>
          <p>
            Roofing searches in BC also spike every fall when the rain arrives. SEO work started in the spring has time to take hold before that spike. Work started in October mostly will not, which is why roofers who need leads this season usually lean on Google Ads first. More on that on our <Link to="/roofer-marketing" className="text-foreground underline underline-offset-4">roofer marketing</Link> page.
          </p>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">What Contractor SEO and Marketing Cost</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            Our contractor program is $759/month in management, month-to-month with no lock-in, plus ad spend paid directly to Google and Meta. Most general contractors spend $1,500–$3,000/month on ads. Google Business Profile optimization is included in that fee. We do not sell standalone SEO at a list price; if your situation calls for more SEO work than the profile, we scope it on a call and tell you what it would take before you commit to anything.
          </p>
          <p className="mb-4">
            For comparison, ongoing SEO for a single-location Canadian service business typically runs $750–$1,500/month, and $1,500–$3,500/month in competitive metros or for companies with several service lines. A one-off local SEO setup typically costs $1,000–$2,500. Our <Link to="/blog/how-much-does-seo-cost-canada" className="text-foreground underline underline-offset-4">SEO cost guide</Link> breaks down what each tier should include.
          </p>
          <p>
            Be wary of any SEO quote well under $750/month for a competitive market like Vancouver. At that price nobody can spend meaningful hours on your site, and the work tends to be automated reports rather than the profile, page and review work above.
          </p>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">What a GC Should Expect, Month by Month</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            Timelines vary with your market, your site and how competitive your trade is in your area. This is what a typical engagement looks like with us, and what is realistic for the SEO side running alongside it.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Month 1: Setup and first leads</h3>
          <p className="mb-4">
            We agree on a lead target together, set up call and form tracking tied to booked estimates, build or fix the landing pages, clean up the Google Business Profile and launch Google Ads. Qualified leads from Google Ads typically start within 1–2 weeks. Meta Ads take 2–3 weeks to optimize.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Month 2: Cut what does not book</h3>
          <p className="mb-4">
            With a few weeks of data we can see which keywords, job types and areas produce booked estimates rather than tire-kickers, and move budget toward them. Profile activity such as calls, direction requests and photo views usually starts to pick up as the profile fills out and reviews come in.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Month 3: The guarantee check</h3>
          <p className="mb-4">
            By day 90 you should know your cost per booked estimate and whether the program pays for itself. If we have missed the lead target we agreed on, we keep working at no fee for a further 30 days. Map Pack movement in your core area typically starts showing in the 60–90 day window.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Months 4 to 6: SEO starts to contribute</h3>
          <p className="mb-4">
            Service and city pages typically begin ranking for less competitive terms, such as a specific job type in a suburb, before the broad ones. This is usually the earliest point to judge whether more SEO investment is worth it for your business.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Months 6 to 12: Compounding, or a clear answer</h3>
          <p>
            For competitive terms in Vancouver proper, organic rankings commonly take 6–12 months. If organic leads are growing, ad spend can come down. If they are not, you will have the numbers to decide, and you can stop at any time with 30 days' notice.
          </p>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">Choosing a Contractor Marketing Agency</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            Whoever you hire, digital marketing for contractors should be judged on booked estimates and signed jobs, not clicks or impressions. Five questions sort out most agencies quickly.
          </p>
          <p className="mb-4">
            Who owns the Google Ads account and the Google Business Profile? It should be you, so you keep the history if you leave. How long is the contract? A long lock-in usually means the agency does not expect results to keep you. What do the reports measure? Look for cost per booked estimate, not just cost per click. Who actually does the work? At AP Digital, founder Arjun Sharma personally manages every account. And will they tell you when a channel is not worth it yet? Not every GC needs SEO this year.
          </p>
          <p>
            We work with general contractors across Metro Vancouver and the Fraser Valley from Vancouver, BC. Month-to-month, 30 days' notice, with the 90-day results guarantee on every account.
          </p>
        </div>

        <FaqLight faqs={faqs} />

        <div className="mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">Related Pages</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link to="/trades-marketing" className="bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl p-6 transition-all duration-300">
              <p className="font-bold text-foreground">Trades & Contractor Marketing</p>
              <p className="reveal-body relative z-10 text-sm text-muted-foreground">Our full trades marketing program for all contractor types.</p>
            </Link>
            <Link to="/plumber-marketing" className="bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl p-6 transition-all duration-300">
              <p className="font-bold text-foreground">Plumber Marketing</p>
              <p className="reveal-body relative z-10 text-sm text-muted-foreground">Google Ads & lead gen for plumbing companies in BC.</p>
            </Link>
            <Link to="/electrician-marketing" className="bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl p-6 transition-all duration-300">
              <p className="font-bold text-foreground">Electrician Marketing</p>
              <p className="reveal-body relative z-10 text-sm text-muted-foreground">Lead generation for BC electricians.</p>
            </Link>
            <Link to="/roofer-marketing" className="bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl p-6 transition-all duration-300">
              <p className="font-bold text-foreground">Roofer Marketing</p>
              <p className="reveal-body relative z-10 text-sm text-muted-foreground">Google Ads for roofing companies in BC.</p>
            </Link>
          </div>
        </div>

        <OurServices />

        <div className="mt-16 mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-6">Cities We Serve</h2>
          <p className="text-muted-foreground mb-6">We help general contractors across Metro Vancouver and the Fraser Valley.</p>
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

export default ContractorMarketing;
