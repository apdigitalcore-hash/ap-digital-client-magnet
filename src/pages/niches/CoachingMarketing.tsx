import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, Share2, Users, ShieldCheck } from 'lucide-react';
import OurServices from '@/components/OurServices';
import { getServiceSchema, getBreadcrumbSchema, getFAQSchema, getWebPageSchema, founderSchema } from '@/lib/structuredData';
import JsonLd from '@/components/JsonLd';
import FaqLight from '@/components/light/FaqLight';
import PastelCTA from '@/components/light/PastelCTA';

const TITLE = 'Coaching Marketing BC | Get Consistent Clients | AP Digital';
const DESC = 'Coaching marketing with Meta Ads funnels & social media for BC life, business & fitness coaches. Month-to-month. No lock-in contracts.';
const CANONICAL = 'https://ap-digital.ca/coaching-marketing';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const included = [
  'Instagram & TikTok growth strategy',
  'Short-form video content creation (Reels, TikToks)',
  'Facebook & Instagram ad campaigns for client acquisition',
  'Personal brand positioning & content pillars',
  'Lead capture funnel & landing page',
  'Email nurturing sequences for warm leads',
  'Monthly analytics & client acquisition reporting',
  'Community engagement & DM strategy',
];

const results = [
  { icon: Users, stat: 'Meta Ads', label: 'Facebook & Instagram lead campaigns' },
  { icon: Share2, stat: 'No Contract', label: 'Month-to-month, cancel anytime' },
  { icon: ShieldCheck, stat: '90-Day', label: 'Performance guarantee included' },
];

const faqs = [
  {
    question: 'How do coaches get more clients in BC?',
    answer: 'The fastest path is running Instagram and Facebook ads promoting a lead magnet (free workshop, guide, or discovery call) to your ideal client avatar. AP Digital builds these funnels for coaches across BC — from ad creative to landing page to follow-up sequence.',
  },
  {
    question: 'What types of coaches do you work with?',
    answer: 'AP Digital works with life coaches, business coaches, executive coaches, fitness coaches, wellness coaches, career coaches, and consultants across British Columbia. If you sell a service that starts with a discovery call, our system works for you.',
  },
  {
    question: 'How much does coaching marketing cost in BC?',
    answer: 'Most coaches start with $600–$1,000/month in ad spend plus a $759/month management fee. Social media management starts at $849/month for 2 platforms.',
  },
  {
    question: 'Is there a contract for coaching marketing?',
    answer: 'No. AP Digital works month-to-month with all coaching clients. No lock-in, no cancellation fees. We guarantee results within 90 days or we work for free until we deliver.',
  },
  {
    question: 'Should coaches use Instagram or Facebook for marketing?',
    answer: 'Both. Instagram is where you build your personal brand through Reels, carousels, and Stories — it creates the know-like-trust factor coaching requires. Facebook is where you run lead generation ads and build community through groups. We manage both platforms and run paid campaigns across the Meta network.',
  },
  {
    question: 'How do I build a personal brand as a coach online?',
    answer: 'Start with a consistent posting schedule (3–5 times per week) mixing teaching content, client results, and personal stories. Use Instagram Reels for reach and carousels for saves. AP Digital handles your content calendar, posting, and community management so you can focus on coaching.',
  },
  {
    question: 'Can you help me fill my coaching program or group?',
    answer: 'Yes. We run launch campaigns for group programs, courses, and masterminds using a proven sequence: awareness ads, webinar/workshop registration ads, and retargeting. Most coaches see their programs fill within 2–3 launch cycles.',
  },
  {
    question: 'How do I find a coaching marketing agency near me?',
    answer: 'AP Digital works with life coaches, business coaches, and consultants across BC. We run Meta Ads for lead generation and Google Ads for high-intent searches like "business coach near me." Month-to-month, no contracts.',
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    founderSchema,
    getServiceSchema('Coaching Marketing', DESC, '/coaching-marketing'),
    getFAQSchema(faqs),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Coaching Marketing', url: '/coaching-marketing' },
    ]),
    getWebPageSchema(TITLE, DESC, '/coaching-marketing'),
  ]
};

const CoachingMarketing = () => (
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
          Coaching Marketing BC — Fill Your Calendar
        </h1>

        {/* Short intro */}
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          You've got the skills. We get you the clients. Funnels, ads, and content that scale your coaching practice without trading more time for money.
        </p>

        {/* 3-column why strip */}
        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">High-ticket lead funnels</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">We build VSL and webinar funnels that attract serious, pre-qualified prospects — not tire-kickers.</p>
          </div>
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">Content that builds authority</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">Short-form video, email sequences, and social content that make you the obvious choice in your niche.</p>
          </div>
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">No contract, no risk</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">Month-to-month. We earn your business every month with results.</p>
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

        <FaqLight faqs={faqs} />

        <OurServices />

        <div className="mt-16 mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-6">Cities We Serve</h2>
          <p className="text-muted-foreground mb-6">We help coaches across Metro Vancouver and the Fraser Valley. See our <Link to="/pricing" className="text-foreground underline underline-offset-4 hover:text-foreground/70">pricing</Link> or browse <Link to="/case-studies" className="text-foreground underline underline-offset-4 hover:text-foreground/70">client results</Link>.</p>
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

export default CoachingMarketing;
