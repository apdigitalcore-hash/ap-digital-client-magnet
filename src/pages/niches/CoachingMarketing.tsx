import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, TrendingUp, Users, Video } from 'lucide-react';
import OurServices from '@/components/OurServices';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { getServiceSchema, getBreadcrumbSchema, getFAQSchema, getWebPageSchema, founderSchema } from '@/lib/structuredData';

const TITLE = 'Coaching Marketing BC | Get Consistent Clients | AP Digital';
const DESC = 'AP Digital helps BC life, business & fitness coaches get 20–40 new leads/month with Meta Ads funnels. Month-to-month. No lock-in contracts.';
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
  { icon: TrendingUp, stat: '2-4x', label: 'Client roster growth in first 6 months' },
  { icon: Users, stat: '15-30', label: 'New client inquiries per month from ads' },
  { icon: Video, stat: '500%', label: 'Average increase in content engagement' },
];

const faqs = [
  {
    question: 'How do coaches get more clients in BC?',
    answer: 'The fastest path is running Instagram and Facebook ads promoting a lead magnet (free workshop, guide, or discovery call) to your ideal client avatar. AP Digital builds these funnels for coaches across BC — from ad creative to landing page to follow-up sequence — generating 20–40 leads per month.',
  },
  {
    question: 'What types of coaches do you work with?',
    answer: 'AP Digital works with life coaches, business coaches, executive coaches, fitness coaches, wellness coaches, career coaches, and consultants across British Columbia. If you sell a service that starts with a discovery call, our system works for you.',
  },
  {
    question: 'How much does coaching marketing cost in BC?',
    answer: 'Most coaches start with $600–$1,000/month in ad spend plus a $759/month management fee. At this budget, you can expect 20–40 qualified leads per month. Social media management starts at $849/month for 2 platforms.',
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
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
    <Header />
    <main id="main-content" className="pt-24 pb-16">
      <div className="container-custom max-w-4xl">
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8">
          Coaching Marketing BC — Fill Your Calendar
        </h1>

        {/* Short intro */}
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          You've got the skills. We get you the clients. Funnels, ads, and content that scale your coaching practice without trading more time for money.
        </p>

        {/* 3-column why strip */}
        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="font-bold text-foreground mb-1">High-ticket lead funnels</p>
            <p className="text-sm text-muted-foreground">We build VSL and webinar funnels that attract serious, pre-qualified prospects — not tire-kickers.</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="font-bold text-foreground mb-1">Content that builds authority</p>
            <p className="text-sm text-muted-foreground">Short-form video, email sequences, and social content that make you the obvious choice in your niche.</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="font-bold text-foreground mb-1">No contract, no risk</p>
            <p className="text-sm text-muted-foreground">Month-to-month. We earn your business every month with results.</p>
          </div>
        </div>

        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">What You Get</h2>
        <ul className="grid sm:grid-cols-2 gap-4 mb-16">
          {included.map((item) => (
            <li key={item} className="flex items-start gap-3 text-foreground">
              <CheckCircle className="w-5 h-5 text-teal mt-0.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">Results Our Coaching Clients See</h2>
        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          {results.map((r) => (
            <div key={r.label} className="bg-card border border-border rounded-xl p-6 text-center">
              <r.icon className="w-8 h-8 text-teal mx-auto mb-3" />
              <div className="font-display text-3xl font-bold text-teal mb-2">{r.stat}</div>
              <p className="text-muted-foreground text-sm">{r.label}</p>
            </div>
          ))}
        </div>

        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="mb-16">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left text-foreground font-medium">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <OurServices />

        <section className="bg-card border border-border rounded-2xl p-8 md:p-12 text-center mt-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground text-lg mb-8">Book your free strategy call and let us build a marketing system that fills your roster with dream clients.</p>
          <Button asChild size="lg" className="bg-teal hover:bg-teal/90 text-white">
            <a href="https://calendly.com/apdigital-core/20min" target="_blank" rel="noopener noreferrer">Book Your Free Strategy Call</a>
          </Button>
        </section>
      </div>
    </main>
    <Footer />
  </>
);

export default CoachingMarketing;
