import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, Share2, Home, ShieldCheck } from 'lucide-react';
import OurServices from '@/components/OurServices';
import { getServiceSchema, getBreadcrumbSchema, getFAQSchema, getWebPageSchema, founderSchema } from '@/lib/structuredData';
import JsonLd from '@/components/JsonLd';
import FaqLight from '@/components/light/FaqLight';
import PastelCTA from '@/components/light/PastelCTA';
import InlineCTA from '@/components/light/InlineCTA';

const TITLE = 'Real Estate Leads BC — Realtor Marketing | AP Digital';
const DESC = 'Real estate marketing with Meta Ads & Google Ads for BC realtors. Serving Vancouver, Surrey & Burnaby. Month-to-month. No contracts.';
const CANONICAL = 'https://ap-digital.ca/real-estate-marketing';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const included = [
  'Facebook & Instagram lead ad campaigns',
  'Personal brand content strategy',
  'Short-form video plans for listings & market updates',
  'Google Ads for buyer & seller keywords',
  'Landing page & lead capture funnel',
  'CRM integration & automated follow-up',
  'Monthly analytics & lead quality reporting',
  'Social media management & posting',
];

const results = [
  { icon: Home, stat: 'Meta Ads', label: 'Facebook & Instagram lead campaigns' },
  { icon: Share2, stat: 'No Contract', label: 'Month-to-month, 30 days\' notice' },
  { icon: ShieldCheck, stat: '90-Day', label: 'Performance guarantee included' },
];

const faqs = [
  {
    question: 'How do real estate agents get more leads in Vancouver?',
    answer: 'The most effective approach is running Meta Ads targeting buyers and sellers in your farm area combined with Google Ads capturing high-intent searches like "homes for sale [neighbourhood]." AP Digital builds, manages, and optimizes these campaigns for consistent qualified leads.',
  },
  {
    question: 'How much do real estate leads cost in BC?',
    answer: 'Cost per lead varies widely by area, season, platform and offer, so we report yours weekly rather than quote an average up front. Seller leads typically cost more than buyer leads because fewer homeowners are ready to list at any moment and more agents compete for them. Most realtors start with $1,000–$1,500/month in ad spend, paid directly to Meta or Google, plus a $759/month management fee.',
  },
  {
    question: 'Is there a contract for real estate marketing?',
    answer: 'No. AP Digital works month-to-month with all real estate clients. No lock-in contracts, no setup fees, no cancellation penalties. We earn your business every month by delivering qualified buyer and seller leads.',
  },
  {
    question: 'Do you work with new real estate agents?',
    answer: 'Yes. We work with both new and experienced realtors across Metro Vancouver, Surrey, Burnaby, Richmond, and the Fraser Valley. New agents especially benefit from paid ads because they build pipeline faster than organic methods alone.',
  },
  {
    question: 'What social media platforms work best for realtors?',
    answer: 'Instagram is essential for showcasing listings and building your personal brand. Facebook is strong for lead generation ads aimed at homeowners in your area. LinkedIn can suit luxury and commercial real estate. Our social media management covers two platforms, usually Instagram and Facebook, and paid ads run across the Meta network.',
  },
  {
    question: 'Can you help me get seller leads specifically?',
    answer: 'Yes. We run dedicated seller lead campaigns built around home valuation and neighbourhood market report offers, aimed at homeowners in the areas you farm. Canada\'s housing ad rules on Meta and Google do not allow targeting by age, gender or full postal code, so the campaigns reach the right people through the offer and the neighbourhood named in the ad rather than through demographic targeting.',
  },
  {
    question: 'Are seller leads worth more than buyer leads?',
    answer: 'Usually, yes. A seller lead can become a listing, which gives you control of the transaction, a sign on the street and a stream of buyer enquiries of its own. Buyer leads are more plentiful and cheaper to generate, but many buyers are early in their search or already talking to another agent. Most realtors run both and judge each on what it produces: buyer campaigns on showings booked, seller campaigns on listing appointments.',
  },
  {
    question: 'Can I target a specific neighbourhood or postal code with Facebook ads?',
    answer: 'Not directly. Meta treats real estate as a special ad category for housing, and for ads aimed at Canada that blocks targeting by postal code, age and gender and requires a wide minimum radius around any location. Google Ads has similar housing rules in Canada, though it allows the first three characters of a postal code. Neighbourhood farming still works, but through the neighbourhood named in the ad and the landing page rather than through tight targeting.',
  },
  {
    question: 'How long does it take to turn a real estate lead into a listing?',
    answer: 'It varies widely. Some sellers are ready within weeks, but many homeowners who request a valuation are typically six to eighteen months from listing. That is why follow-up matters as much as the ads: a monthly market update, a check-in call at the right moment and a CRM that tells you who is warming up.',
  },
  {
    question: 'What is listing marketing?',
    answer: 'Listing marketing is everything an agent does to sell a specific property: photography, video, just-listed and open-house ads, the listing page and the follow-up with enquiries. Done well it sells the home and also shows every neighbour watching that you market listings properly, which is often how the next seller finds you.',
  },
  {
    question: 'Do I need my brokerage\'s approval to run ads?',
    answer: 'Check with your managing broker before you launch. In BC, real estate advertising typically has to identify your brokerage clearly, and many brokerages have their own branding and approval rules for agent ads. We build campaigns to fit those requirements, but your brokerage has the final word on what complies.',
  },
  {
    question: 'Do I keep my ad accounts if I change brokerages?',
    answer: 'Yes, when the accounts are set up in your name, which is how we set them up. Your Google Ads account, Meta ad account and Google Business Profile stay yours, and ad spend is billed to you directly by Google or Meta. If you move brokerages, or leave us with 30 days\' notice, the account history and audiences stay with you.',
  },
  {
    question: 'How is AP Digital different from other real estate marketing companies?',
    answer: 'Most real estate marketing companies sell you a template. AP Digital builds custom campaigns managed by the founder — not a junior account manager. We focus exclusively on paid ads and social media, we work month-to-month, and if we miss the lead target we agree on in 90 days, we keep working at no fee for a further 30 days.',
  },
  {
    question: 'How do I find a real estate marketing agency near me?',
    answer: 'AP Digital works with real estate agents, teams, and brokerages across Metro Vancouver and the Fraser Valley. We run Meta Ads for buyer and seller leads, plus Google Ads for high-intent searches like "realtor near me." No contracts.',
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    founderSchema,
    getServiceSchema('Real Estate Marketing', DESC, '/real-estate-marketing'),
    getFAQSchema(faqs),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Real Estate Marketing', url: '/real-estate-marketing' },
    ]),
    getWebPageSchema(TITLE, DESC, '/real-estate-marketing'),
  ]
};

const RealEstateMarketing = () => (
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
          Real Estate Leads in BC for Agents &amp; Brokerages
        </h1>

        {/* Short intro */}
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          The agent who shows up first wins. We get you in front of buyers and sellers before they call anyone else — with video, ads, and SEO.
        </p>

        <InlineCTA context="real estate business" />

        {/* 3-column why strip */}
        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">Qualified leads, delivered</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">Facebook and Instagram lead ads capture buyers and sellers in your market and push them straight to your CRM.</p>
          </div>
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">Build the brand people trust</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">Listing tours, market updates, and neighbourhood content that position you as the go-to local expert.</p>
          </div>
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">No contract, no risk</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">Month-to-month. Most agents see their first leads within two weeks of launch.</p>
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

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">Buyer Leads vs. Seller Leads: Why the Listing Is the Prize</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            Realtor lead generation produces two very different kinds of lead, and treating them as one is the most common reason an agent's ad budget disappoints.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Buyer leads</h3>
          <p className="mb-4">
            Buyer leads are easier to generate. Someone who taps an ad for townhouse listings in Langley is showing real interest, but many are months from buying and some already have an agent. Buyer campaigns should be judged on conversations and booked showings, not on the raw number of forms.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Seller leads</h3>
          <p className="mb-4">
            Seller leads are scarcer, slower and usually worth far more. A seller lead can become a listing, and a listing gives you control of the transaction, a sign on the street, buyer enquiries of its own and proof to every neighbour that you sell homes in their area. Fewer homeowners are ready to list at any given moment, and more agents compete for them, so seller leads typically cost more and take longer to convert. Seller campaigns are best judged on listing appointments booked.
          </p>
          <p>
            Most agents need both, in separate campaigns with separate offers and separate reporting. Buyer leads keep the calendar moving this month. Seller leads build the business next year.
          </p>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">Farming a Neighbourhood Under Canada's Housing Ad Rules</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            Farming, becoming the agent a neighbourhood thinks of first, is how most listing businesses are built. Online, it works differently from what many agents expect, because both major ad platforms treat real estate as housing advertising with restricted targeting.
          </p>
          <p className="mb-4">
            At the time of writing, Meta requires real estate ads aimed at Canada to run in its special ad category for housing. That blocks targeting by postal code, age and gender, and location targeting has to cover a wide radius around any point you choose. Google Ads has its own housing policy for Canada: no targeting by age, gender, parental or marital status, or full postal code, although the first three characters of a postal code and a radius of at least 1 km are allowed. Any agency promising to show your ads only to homeowners aged 55 and over on one street is describing targeting these rules do not permit.
          </p>
          <p className="mb-4">
            So online farming works through relevance rather than tight targeting. The ad names the neighbourhood and the property type, such as a monthly market report for East Van detached homes or recent sales in a Burnaby townhouse complex, and the people who care self-select. Google search campaigns pick up people typing the neighbourhood name with words like sold prices or home value. A landing page for each farm area, with recent activity and your own commentary, gives both something specific to point at.
          </p>
          <p>
            Farming is a long game, and the online work is strongest alongside what you already do on the ground: open houses, door knocking and mailers.
          </p>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">The Long Nurture: From Lead to Signed Listing Agreement</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            A homeowner who requests a home valuation today is typically six to eighteen months from listing. Most of the value in real estate lead generation is won or lost in that gap, long after the ad has done its job.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">The first five minutes</h3>
          <p className="mb-4">
            Lead form submissions go cold fast. The agent who calls or texts first, while the person still remembers filling in the form, is far more likely to get a conversation. That is why every lead should arrive in your CRM and on your phone immediately, with an automatic text acknowledging the request while you get to it.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Sorting by timeline</h3>
          <p className="mb-4">
            The first conversation should establish when they might move. Someone listing this spring needs a listing presentation soon. Someone thinking about next year needs a light touch: a monthly market update, an updated value estimate a few times a year, and a call when something changes.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Tracking what actually matters</h3>
          <p className="mb-4">
            The useful measure is not cost per lead but how leads move through the stages: lead, conversation, appointment, signed listing agreement, sold. Tracking those stages in your CRM shows which campaigns produce sellers and which produce only form fills. For choosing a system, see our guide to the <Link to="/blog/best-crm-small-business-canada" className="text-foreground underline underline-offset-4">best CRM for small businesses in Canada</Link>.
          </p>
          <p>
            We set up the capture and the automated follow-up and report on lead quality. The conversations are yours: no ad campaign replaces an agent picking up the phone.
          </p>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">Listing Promotion vs. Personal Brand</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            Real estate agent marketing pulls in two directions. Listing promotion sells a specific property on a deadline. Personal brand building makes you the agent people already know when they decide to move. Both matter, and they need different campaigns.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Just-listed campaigns</h3>
          <p className="mb-4">
            When a listing goes live, a short campaign with video and the best photos, aimed at a broad radius around the property and at people who have visited your site, brings buyer enquiries and shows your seller their home is being marketed. Every neighbour who sees it is a potential future seller watching how you work.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Open-house campaigns</h3>
          <p className="mb-4">
            An event-style ad running for a few days before the open house, with the address, times and one strong image, fills the room. Collect contact details at the door and follow up the same week, since open-house visitors include buyers without an agent and neighbours curious about values.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Brand content</h3>
          <p className="mb-4">
            Short videos on market updates and neighbourhood guides build familiarity over months. They rarely produce a lead on the day, but people recognise your face when your other ads appear.
          </p>
          <p>
            Listing photos and video belong to whoever holds the rights, often the photographer, so confirm usage before running them in ads, and never advertise another brokerage's listing without permission.
          </p>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">Why Meta Ads Are Unusually Strong for Realtors</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            Homes are visual, and Facebook and Instagram are built for visual content. A walkthrough video or a carousel of a renovated kitchen stops the scroll in a way a text ad cannot, which is why <Link to="/services/paid-ads" className="text-foreground underline underline-offset-4">Meta Ads</Link> usually carry the larger share of a real estate budget, with Google Ads catching people actively searching for an agent or a home value.
          </p>
          <p className="mb-4">
            Meta's instant lead forms make it easy to capture a name and phone number without leaving the app. That convenience cuts both ways: forms that are too easy bring low-intent leads. Adding a qualifying question, such as when the person is thinking of moving, typically reduces volume but raises quality, which is usually the right trade for a seller campaign.
          </p>
          <p>
            Retargeting is the other strength: people who watched a listing video or visited your valuation page can keep seeing your market updates for months, which suits a decision often a year in the making.
          </p>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">Working Under a Brokerage: Accounts, Branding and Compliance</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            Almost every BC realtor advertises as an individual working under a brokerage, and that shapes how campaigns should be set up.
          </p>
          <p className="mb-4">
            Own your accounts. Your Google Ads account, Meta ad account and Google Business Profile should be in your name, not the brokerage's or an agency's. That is how we set them up, and ad spend is billed to you directly by Google or Meta. Agents change brokerages more often than most businesses change suppliers, and when you move you keep the account history, the audiences and the reviews.
          </p>
          <p className="mb-4">
            Follow the branding rules. In BC, real estate advertising typically has to identify your brokerage clearly, and most brokerages have their own requirements for logos, disclaimers and team names. Check with your managing broker before launch. We build to those requirements, but compliance is the brokerage's call.
          </p>
          <p>
            Teams and brokerages running shared campaigns should decide in advance who owns the account, the leads and the data if someone leaves.
          </p>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">BC Market Realities: Strata, Detached and Presale</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            Metro Vancouver is not one housing market, and real estate marketing in Vancouver works best when the campaign speaks to the property type the buyer or seller is dealing with.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Strata</h3>
          <p className="mb-4">
            Condo and townhouse buyers ask about strata fees, bylaws, rental and pet restrictions, and the health of the building's finances. Content that explains what to look for in strata documents attracts serious buyers and positions you as the agent who has done the homework. Strata owners who rent out their units also overlap with the landlords and investors our <Link to="/property-management-marketing" className="text-foreground underline underline-offset-4">property management marketing</Link> page serves.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Detached</h3>
          <p className="mb-4">
            Detached sellers are often long-term owners, sometimes downsizing or leaving the region. They respond to clear, local evidence: recent sales on comparable lots and an agent who knows the neighbourhood.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Presale</h3>
          <p>
            Presale condos are marketed heavily by developers, so an agent's angle is representation: helping buyers compare projects, read contracts and understand deposit structures and assignments. Advertising a developer's project directly usually needs the developer's agreement, so check before you run ads for a specific building.
          </p>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">What It Costs and What to Expect</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            Management is $759/month, month-to-month with 30 days' notice. Ad spend is separate and paid directly to Meta or Google on your own account, and we recommend at least $1,000/month so campaigns gather enough data to optimize. That makes about $1,759/month all in at the minimum. See full <Link to="/pricing" className="text-foreground underline underline-offset-4">pricing</Link>.
          </p>
          <p>
            Most clients see their first qualified leads within 2 weeks of launch. Listings take longer, because sellers move on their own timeline, so at kickoff we agree a lead-volume target that you can judge us on within 90 days. If we miss it, we keep working at no fee for a further 30 days. For more on what works for agents here, read our <Link to="/blog/real-estate-agent-marketing-vancouver-bc" className="text-foreground underline underline-offset-4">realtor marketing guide</Link>.
          </p>
        </div>

        <FaqLight faqs={faqs} />

        <OurServices />

        <div className="mt-16 mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-6">Cities We Serve</h2>
          <p className="text-muted-foreground mb-6">We help realtors across Metro Vancouver and the Fraser Valley. See <Link to="/pricing" className="text-foreground underline underline-offset-4 hover:text-foreground/70">pricing</Link> or browse <Link to="/case-studies" className="text-foreground underline underline-offset-4 hover:text-foreground/70">how we work</Link>. Managing rentals rather than selling? See <Link to="/property-management-marketing" className="text-foreground underline underline-offset-4 hover:text-foreground/70">property management marketing</Link>.</p>
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

export default RealEstateMarketing;
