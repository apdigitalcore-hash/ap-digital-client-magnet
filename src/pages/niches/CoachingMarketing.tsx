import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, TrendingUp, Users, Video } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

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
    question: 'I\'m a coach/trainer — do I really need paid ads?',
    answer: 'Organic content builds your brand, but paid ads accelerate your growth. Even a small ad budget ($500-$1,000/month) can consistently fill your roster with qualified clients who are ready to invest. We combine organic and paid strategies for the fastest results.',
  },
  {
    question: 'What kind of content should I be posting as a coach?',
    answer: 'The best-performing content for coaches includes client transformation stories, quick tips and educational clips, day-in-the-life content, and behind-the-scenes training sessions. We build a content strategy around your unique expertise and create the content for you.',
  },
  {
    question: 'How do you help me stand out from other coaches in my area?',
    answer: 'We position you as the authority in your niche through strategic personal branding. This means consistent, high-quality content that showcases your expertise, client results, and personality. Combined with targeted ads, you become the obvious choice for anyone looking for a coach in your market.',
  },
];

const CoachingMarketing = () => (
  <>
    <Helmet>
      <title>Marketing for Coaches Canada | Fill Your Roster With Social Media & Ads | AP DIGITAL</title>
      <meta name="description" content="AP DIGITAL helps private coaches and personal trainers across Canada attract more clients with Instagram growth, short-form content, and targeted paid ads. Book your free strategy call." />
      <link rel="canonical" href="https://ap-digital.ca/coaching-marketing" />
    </Helmet>
    <Header />
    <main className="pt-24 pb-16">
      <div className="container-custom max-w-4xl">
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8">
          Coaching Marketing That Turns Your Audience Into <span className="text-gradient">Paying Clients</span>
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

        {/* Our Services */}
        <OurServices />

        <section className="bg-card border border-border rounded-2xl p-8 md:p-12 text-center mt-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground text-lg mb-8">Book your free strategy call and let us build a marketing system that fills your roster with dream clients.</p>
          <Button asChild size="lg" className="bg-teal hover:bg-teal/90 text-white">
            <Link to="/contact">Book Your Free Strategy Call</Link>
          </Button>
        </section>
      </div>
    </main>
    <Footer />
  </>
);

export default CoachingMarketing;
