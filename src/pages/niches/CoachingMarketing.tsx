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
import { getServiceSchema, getBreadcrumbSchema, getFAQSchema, getWebPageSchema } from '@/lib/structuredData';

const TITLE = 'Coaching Marketing Agency Canada | AP Digital';
const DESC = 'Grow your coaching business with predictable client leads. AP Digital runs paid ads & social media for fitness, business & life coaches across Canada.';
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
    answer: 'Paid social ads on Meta targeting your ideal client avatar are the fastest way to grow a coaching practice. AP Digital builds these campaigns for coaches across BC.',
  },
  {
    question: 'What types of coaches do you work with?',
    answer: 'AP Digital works with fitness coaches, business coaches, life coaches, and consultants across British Columbia.',
  },
  {
    question: 'How much does coaching marketing cost?',
    answer: "Most coaches start with $500/month in ad spend. AP Digital's fee is month-to-month and fully transparent.",
  },
  {
    question: 'Is there a contract?',
    answer: "No. Month-to-month only. You stay because you're getting clients.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
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
    <main className="pt-24 pb-16">
      <div className="container-custom max-w-4xl">
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8">
          Coaching Marketing Agency Canada — Fill Your Calendar
        </h1>

        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6 mb-16">
          <p>You've got the skills, the certifications, and the passion to change people's lives. But if your Instagram is inconsistent, your content isn't converting, and you're still relying on word of mouth to fill your roster — you're leaving money on the table. At AP DIGITAL, we build marketing systems specifically for coaches and personal trainers who are ready to scale.</p>
          <p>We start with your personal brand. In the coaching world, people buy from people they trust. Our content strategy positions you as the go-to expert in your niche through consistent, high-quality short-form video content on Instagram and TikTok. Client transformations, quick tips, behind-the-scenes training — content that builds authority and makes people want to work with you.</p>
          <p>But great content alone doesn't pay the bills. That's why we pair your organic presence with targeted Facebook and Instagram ad campaigns designed to turn viewers into leads and leads into paying clients. We build landing pages, lead capture funnels, and automated follow-up sequences that nurture prospects until they're ready to commit.</p>
          <p>Whether you're an online coach looking to scale beyond your local area or an in-person trainer wanting to fill every slot in your schedule, our marketing systems deliver predictable client acquisition month after month. No more feast-or-famine cycles — just steady growth and a full roster.</p>
          <p>We've helped coaches across Canada go from struggling to find clients to having a waitlist. Your expertise deserves to be seen — let us make that happen.</p>
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
            <a href="https://calendly.com/apdigital-core/30min" target="_blank" rel="noopener noreferrer">Book Your Free Strategy Call</a>
          </Button>
        </section>
      </div>
    </main>
    <Footer />
  </>
);

export default CoachingMarketing;
