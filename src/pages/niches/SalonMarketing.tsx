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

const TITLE = 'Salon Marketing Vancouver | Fill Every Chair | AP Digital';
const DESC = 'Get 20–40 new salon clients/month with Meta Ads & Instagram content. AP Digital serves Vancouver salons. Month-to-month. No contracts.';
const CANONICAL = 'https://ap-digital.ca/salon-marketing';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const included = [
  'Instagram & Facebook ad campaigns targeting local clients',
  'Short-form video strategy (Reels & TikToks)',
  'Before-and-after content creation',
  'Google Business Profile optimization',
  'Online booking funnel setup',
  'Monthly performance reporting & optimization',
  'Branded social media content calendar',
  'Retargeting campaigns for website visitors',
];

const results = [
  { icon: TrendingUp, stat: '3-5x', label: 'Average return on ad spend for salon clients' },
  { icon: Calendar, stat: '40+', label: 'New bookings per month from paid ads alone' },
  { icon: Users, stat: '200%', label: 'Average follower growth in the first 90 days' },
];

const faqs = [
  {
    question: 'How do I get more salon clients in Vancouver?',
    answer: 'The fastest way is targeted Instagram and Facebook ads reaching people in your area who are actively looking for salon services. AP Digital sets up geo-targeted campaigns on Meta and Google that reach potential clients within 10–15 km of your salon, generating 20–40 new bookings per month.',
  },
  {
    question: 'How much does salon marketing cost in BC?',
    answer: 'Most salons start with $500–$1,000/month in ad spend plus a $759/month management fee. This covers campaign strategy, creative testing, audience optimization, and weekly reporting. There are no setup fees or long-term contracts.',
  },
  {
    question: 'How fast will I see new bookings from ads?',
    answer: 'Most salon clients see their first new bookings within 2 weeks of campaign launch. Instagram and Facebook ads typically generate consistent lead flow by week 3 as the algorithm optimizes for your ideal client profile.',
  },
  {
    question: 'Is there a contract for salon marketing?',
    answer: 'No. AP Digital works month-to-month with all salon clients. There are no lock-in contracts, no cancellation fees, and no setup penalties. You stay because the campaigns are profitable.',
  },
  {
    question: 'What social media platforms work best for salons?',
    answer: 'Instagram is the top platform for salons — your work is visual, and Reels drive massive organic reach. Facebook is strong for reaching women 30–55 in your local area. We manage both platforms and run paid ads across the Meta network to maximize bookings.',
  },
  {
    question: 'Do you create content for my salon social media?',
    answer: 'Yes. Our social media management package includes 12 custom posts per month across 2 platforms, including captions, hashtag research, scheduling, and community management. We also provide guidance on shooting before-and-after content that converts.',
  },
  {
    question: 'Can you help my salon rank on Google?',
    answer: 'Absolutely. We optimize your Google Business Profile, run Google Ads targeting high-intent searches like "salon near me" and "balayage Vancouver," and build your local visibility through review generation and consistent content.',
  },
  {
    question: 'How do I find a salon marketing agency near me?',
    answer: 'AP Digital works with hair salons, spas, and beauty studios across Metro Vancouver and the Fraser Valley. We run Instagram and Facebook ads for bookings, plus Google Ads for searches like "hair salon near me." Month-to-month, no contracts.',
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    founderSchema,
    getServiceSchema('Salon Marketing', DESC, '/salon-marketing'),
    getFAQSchema(faqs),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Salon Marketing', url: '/salon-marketing' },
    ]),
    getWebPageSchema(TITLE, DESC, '/salon-marketing'),
  ]
};

const SalonMarketing = () => (
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
          Salon Marketing — Get More Bookings with Meta Ads
        </h1>

        {/* Short intro */}
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          Most salons run on referrals and hope. We build you a system — Meta Ads, Reels, and retargeting — that fills every chair on autopilot.
        </p>

        {/* 3-column why strip */}
        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">Before &amp; afters convert</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">Before-and-after content drives 3× more bookings than any other format. We produce it for you.</p>
          </div>
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">Local targeting that works</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">We put your offer in front of women in your area who are actively searching for a new stylist — not random impressions.</p>
          </div>
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">No contract, no risk</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">Month-to-month. If we don't get you new bookings within 30 days, you don't owe us a thing.</p>
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

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-8">Results Our Salon Clients See</h2>
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

        <FaqLight faqs={faqs} />

        <OurServices />

        <div className="mt-16 mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-6">Cities We Serve</h2>
          <p className="text-muted-foreground mb-6">We help salons across Metro Vancouver and the Fraser Valley. See our <Link to="/pricing" className="text-foreground underline underline-offset-4 hover:text-foreground/70">pricing</Link> or browse <Link to="/case-studies" className="text-foreground underline underline-offset-4 hover:text-foreground/70">client results</Link>.</p>
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

export default SalonMarketing;
