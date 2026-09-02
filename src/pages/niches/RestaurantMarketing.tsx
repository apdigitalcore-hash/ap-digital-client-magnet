import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, TrendingUp, Calendar, Users } from 'lucide-react';
import OurServices from '@/components/OurServices';
import { getServiceSchema, getBreadcrumbSchema, getFAQSchema, getWebPageSchema, founderSchema } from '@/lib/structuredData';
import JsonLd from '@/components/JsonLd';
import FaqLight from '@/components/light/FaqLight';
import PastelCTA from '@/components/light/PastelCTA';
import InlineCTA from '@/components/light/InlineCTA';

const TITLE = 'Restaurant Marketing Vancouver | AP Digital';
const DESC = 'Get more reservations & walk-ins with Meta Ads, Google Ads & social media. AP Digital serves Vancouver restaurants & cafes. Month-to-month. No contracts.';
const CANONICAL = 'https://ap-digital.ca/restaurant-marketing';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const included = [
  'Meta Ads with food photography & video content',
  'Google Ads for "restaurants near me" & cuisine-specific searches',
  'Google Business Profile optimization & review management',
  'Instagram content strategy & Reels production guidance',
  'Reservation & online ordering funnel optimization',
  'Monthly performance reporting & creative testing',
  'Event & seasonal promotion campaigns',
  'Competitor monitoring & local positioning',
];

const results = [
  { icon: TrendingUp, stat: 'Meta Ads', label: 'Instagram and Facebook campaigns for covers and walk-ins' },
  { icon: Calendar, stat: 'No Contract', label: 'Month-to-month, cancel with 30 days notice' },
  { icon: Users, stat: '90-Day', label: 'Lead-volume target agreed before launch' },
];

const faqs = [
  {
    question: 'How do I get more customers to my restaurant in Vancouver?',
    answer: 'A combination of Google Business Profile optimization, Instagram content, and targeted Meta Ads. When someone searches "best sushi near me" or scrolls past a mouth-watering food Reel, your restaurant needs to be there. AP Digital runs geo-targeted campaigns that drive reservations and walk-ins from people within 5–15 km of your location.',
  },
  {
    question: 'How much does restaurant marketing cost?',
    answer: 'Most restaurants start with $500–$1,500/month in ad spend plus a management fee starting at $759/month. Restaurant ads have lower cost-per-click than most industries, so even a modest budget drives significant foot traffic. No setup fees, no contracts.',
  },
  {
    question: 'How fast will I see more customers from ads?',
    answer: 'Instagram and Facebook ads drive foot traffic within the first week — especially when promoting a limited-time offer or new menu item. Google Ads captures people actively searching for restaurants and typically generates clicks within 48 hours of launch.',
  },
  {
    question: 'Should my restaurant focus on Instagram or Google?',
    answer: 'Both, but Instagram is the primary driver. Food is visual — a great photo of your signature dish stops the scroll in a way that text ads never will. Google captures high-intent searches like "Italian restaurant Kitsilano" or "brunch near me." We run both channels to cover discovery and intent.',
  },
  {
    question: 'Do you help with food photography and content?',
    answer: 'We provide content strategy and guidance on shooting high-converting food photos and Reels with your phone. For restaurants that want professional content, we can coordinate with local food photographers. The most effective restaurant ads use authentic, well-lit photos of real dishes — not stock images.',
  },
  {
    question: 'Can you help promote my restaurant events and specials?',
    answer: 'Yes. We run targeted campaigns for happy hours, live music nights, holiday menus, new menu launches, and seasonal specials. Event-based ads create urgency and drive spikes in reservations. We plan these campaigns around your calendar.',
  },
  {
    question: 'Is there a contract for restaurant marketing?',
    answer: 'No. AP Digital works month-to-month. No lock-in contracts, no cancellation fees. We also offer a 90-day performance guarantee — if you don\'t see more customers, you don\'t pay.',
  },
  {
    question: 'How do I compete with bigger restaurant chains on Google?',
    answer: 'Independent restaurants actually have an advantage — people search for unique dining experiences, not chains. We optimize your Google Business Profile with professional photos, respond to every review, and run Google Ads targeting cuisine-specific and neighborhood searches where chains don\'t bid.',
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    founderSchema,
    getServiceSchema('Restaurant Marketing', DESC, '/restaurant-marketing'),
    getFAQSchema(faqs),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Restaurant Marketing', url: '/restaurant-marketing' },
    ]),
    getWebPageSchema(TITLE, DESC, '/restaurant-marketing'),
  ]
};

const RestaurantMarketing = () => (
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
          Restaurant Marketing in Vancouver — Fill More Tables
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          Great food isn't enough. We make sure people in your neighborhood know about it — with Instagram content that makes them hungry and Google Ads that turn searches into reservations.
        </p>

        <InlineCTA context="restaurant" />

        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">Food sells itself visually</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">A great food photo on Instagram has a higher engagement rate than almost any other content type. We turn your dishes into scroll-stopping ads.</p>
          </div>
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">Hyper-local reach</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">People don't drive 30 minutes for dinner. We target hungry people within 5–15 km of your restaurant — the only radius that fills tables.</p>
          </div>
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">No contract, no risk</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">Month-to-month. 90-day guarantee. If we don't bring you more customers, you don't pay.</p>
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

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-8">How We Work</h2>
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

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">Why Instagram &amp; Google Are the Only Channels That Matter</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            Restaurant discovery happens in two places: Instagram and Google. Instagram is where people browse, get inspired, and screenshot places to try. Google is where they search "best Thai food Burnaby" or "restaurants open now near me" when they're ready to eat.
          </p>
          <p className="mb-4">
            We cover both. Instagram Reels and carousel ads showcase your food and atmosphere — building a list of people who want to visit. Google Ads capture them at the moment of decision. Your Google Business Profile (photos, reviews, menu, hours) is the final conversion point.
          </p>
          <p>
            The economics work: the average table is worth $60–$150, and repeat customers visit 2–4 times per month. At $2–$5 per new customer reached, one converted diner pays for hundreds of ad impressions over their lifetime.
          </p>
        </div>

        <FaqLight faqs={faqs} />

        <OurServices />

        <div className="mt-16 mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-6">Cities We Serve</h2>
          <p className="text-muted-foreground mb-6">We help restaurants and cafes across Metro Vancouver and the Fraser Valley. See <Link to="/pricing" className="text-foreground underline underline-offset-4 hover:text-foreground/70">pricing</Link> or browse <Link to="/case-studies" className="text-foreground underline underline-offset-4 hover:text-foreground/70">how we work</Link>.</p>
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

export default RestaurantMarketing;
