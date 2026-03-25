import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, TrendingUp, Calendar, Users } from 'lucide-react';
import OurServices from '@/components/OurServices';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { getServiceSchema, getBreadcrumbSchema, getFAQSchema, getWebPageSchema } from '@/lib/structuredData';

const TITLE = 'Salon Marketing Agency Canada | Get More Bookings with Social Media & Ads | AP DIGITAL';
const DESC = 'AP DIGITAL helps salons across Canada fill their chairs with high-value clients using Instagram Reels, Facebook Ads, and short-form video marketing. Book your free strategy call today.';
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
    question: 'How quickly will I see new bookings from marketing?',
    answer: "Most salon clients start seeing new appointment requests within the first 2 weeks of launching ad campaigns. By month two, you'll have a predictable flow of new clients coming in weekly. We optimize continuously to keep your cost per booking as low as possible.",
  },
  {
    question: 'Do I need to create content myself or do you handle everything?',
    answer: 'We handle everything. Our team creates scroll-stopping Reels, stories, and graphics using your existing photos and videos, or we can guide you through simple filming sessions. You focus on your clients — we handle the marketing.',
  },
  {
    question: 'What budget do I need for salon marketing?',
    answer: "We recommend a minimum ad spend of $500-$1,000/month to start seeing consistent results. Combined with our management fee, most salon owners see a positive ROI within the first month. We'll help you find the right budget based on your goals and location.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
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
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
    <Header />
    <main className="pt-24 pb-16">
      <div className="container-custom max-w-4xl">
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8">
          Salon Marketing That Fills Your Chair <span className="text-gradient">Every Single Week</span>
        </h1>

        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6 mb-16">
          <p>You're an incredible stylist — but incredible work doesn't matter if no one knows about it. Most salon owners rely on word of mouth and hope, but in today's market, that's not enough to keep every chair booked. At AP DIGITAL, we specialize in salon marketing that brings a steady stream of new, high-value clients through your doors every single week.</p>
          <p>We use a proven combination of Instagram Reels, Facebook and Instagram Ads, and short-form video content to showcase your transformations, build your brand, and drive bookings. Your best work deserves to be seen by thousands of potential clients in your area — and we make that happen.</p>
          <p>Our approach is built specifically for salons. We know that before-and-after content outperforms everything else. We know that local targeting on Facebook can put your offer in front of women actively searching for a new stylist. And we know that a consistent, professional social media presence builds the trust that turns a follower into a loyal client.</p>
          <p>Whether you're a solo stylist looking to fill your own book or a salon owner who wants to keep every chair occupied, our marketing systems are designed to deliver predictable, measurable results. No guesswork, no wasted ad spend — just more bookings, more revenue, and more freedom to do what you love.</p>
          <p>We've helped salons across Canada go from relying on referrals to having a waitlist. Your transformation is next.</p>
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

        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">Results Our Salon Clients See</h2>
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
          <p className="text-muted-foreground text-lg mb-8">Book your free strategy call and find out how we can fill your salon's calendar with high-value clients.</p>
          <Button asChild size="lg" className="bg-teal hover:bg-teal/90 text-white">
            <a href="https://calendly.com/apdigital-core/30min" target="_blank" rel="noopener noreferrer">Book Your Free Strategy Call</a>
          </Button>
        </section>
      </div>
    </main>
    <Footer />
  </>
);

export default SalonMarketing;
