import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, TrendingUp, Phone, Star } from 'lucide-react';
import IndustriesWeServe from '@/components/IndustriesWeServe';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { getServiceSchema, getBreadcrumbSchema, getWebPageSchema, getFAQSchema } from '@/lib/structuredData';

const TITLE = 'Lead Generation Agency Vancouver | 2,400+ Leads Delivered';
const DESC = 'AP Digital has delivered 2,400+ leads for Vancouver salons, trades, realtors & coaches. 5–10× ROAS. First leads within 2 weeks. Month-to-month.';
const CANONICAL = 'https://ap-digital.ca/services/lead-generation';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const included = [
  'Custom lead generation funnel design',
  'Landing page creation & optimization',
  'Email & SMS nurturing sequences',
  'CRM setup & integration',
  'Lead scoring & qualification systems',
  'Appointment booking automation',
  'Monthly lead flow reports',
  'Conversion rate optimization',
];

const faqs = [
  {
    question: 'What industries do you generate leads for?',
    answer: 'We specialize in lead generation for local service businesses including salons, med spas, trades (roofing, HVAC, plumbing, electrical), real estate agents, coaches, consultants, and professional services. Our systems are battle-tested in these verticals, which means faster results and lower cost per lead than a generic agency.',
  },
  {
    question: 'How many leads will I get per month?',
    answer: 'It depends on your ad budget, industry, and target market. Most clients receive between 20 and 80 qualified leads per month from our systems. We set clear expectations upfront based on your budget and historical benchmarks in your industry, so you know exactly what to expect before we start.',
  },
  {
    question: 'What is a qualified lead?',
    answer: 'A qualified lead is someone who fits your ideal customer profile, has expressed real interest in your service, and is ready to have a sales conversation. We filter out tire-kickers and unqualified traffic through landing page copy, form questions, and automated lead scoring — so your time is spent talking to real potential customers, not wasting it on bad leads.',
  },
  {
    question: 'Do you integrate with my CRM?',
    answer: 'Yes. We integrate with every major CRM including HubSpot, Salesforce, GoHighLevel, Pipedrive, Zoho, and Keap. If you do not have a CRM, we can set one up for you as part of the engagement. Every lead is automatically captured, tagged, and routed so nothing falls through the cracks.',
  },
  {
    question: 'What happens to leads that do not convert right away?',
    answer: 'We build automated email and SMS nurture sequences that follow up with every lead for 30 to 90 days after they come in. Most service businesses close 20 to 40% of their leads after the initial inquiry, not during it — so long-term nurturing is critical. Our automations make sure you are the business they remember when they are finally ready to buy.',
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    getServiceSchema('Lead Generation', DESC, '/services/lead-generation'),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Lead Generation', url: '/services/lead-generation' },
    ]),
    getWebPageSchema(TITLE, DESC, '/services/lead-generation'),
    getFAQSchema(faqs),
  ]
};

const LeadGeneration = () => (
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
          Lead Generation — Predictable Leads Every Month
        </h1>

        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6 mb-12">
          <p>The biggest challenge local businesses face isn't delivering great work — it's getting a consistent flow of new clients. Referrals are unpredictable, and hoping for the phone to ring isn't a growth strategy.</p>
          <p>At AP DIGITAL, we build lead generation systems that run on autopilot. From high-converting landing pages and targeted ad campaigns to automated follow-up sequences, we create a machine that attracts, qualifies, and nurtures leads until they're ready to book.</p>
          <p>Our approach combines paid advertising, funnel optimization, and CRM automation into one seamless system. You'll know exactly how many leads are coming in, what they cost, and how they're converting — giving you full control over your business growth.</p>
          <p>Whether you need 10 leads a week or 100, we'll design a system that scales with your capacity. No more feast-or-famine cycles — just predictable, profitable growth month after month.</p>
          <p>Most lead generation agencies focus on one channel — usually Facebook ads — and call it a day. That is why their clients see inconsistent results. We build multi-channel systems that combine paid ads (Meta and Google), high-converting landing pages, SMS and email follow-up, lead scoring, and CRM automation into a single, integrated funnel. When one channel dips, the others keep leads flowing. This is the difference between a campaign and a system — and it is why our clients see consistent lead flow month after month, not feast-or-famine cycles tied to one platform's algorithm changes.</p>
          <p>Speed to lead is the single most important metric in lead generation — and it is where most local businesses lose deals. Studies show that responding to a lead within five minutes makes you 21 times more likely to qualify that prospect than responding within 30 minutes. We build automated SMS and email responses that fire the instant a lead submits a form, qualify them with follow-up questions, and book them directly into your calendar — all before a human ever gets involved. This infrastructure alone is often worth the entire engagement, because it takes leads that would have gone cold and turns them into booked appointments while your competitors are still checking their inbox.</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <TrendingUp className="w-8 h-8 text-teal mx-auto mb-3" />
            <p className="font-display text-3xl font-bold text-teal mb-2">20-80</p>
            <p className="text-muted-foreground text-sm">Qualified leads per month</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <Phone className="w-8 h-8 text-teal mx-auto mb-3" />
            <p className="font-display text-3xl font-bold text-teal mb-2">5 min</p>
            <p className="text-muted-foreground text-sm">Speed to lead automation</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <Star className="w-8 h-8 text-teal mx-auto mb-3" />
            <p className="font-display text-3xl font-bold text-teal mb-2">$500/mo</p>
            <p className="text-muted-foreground text-sm">Starting system investment</p>
          </div>
        </div>

        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">What's Included</h2>
        <ul className="grid sm:grid-cols-2 gap-4 mb-16">
          {included.map((item) => (
            <li key={item} className="flex items-start gap-3 text-foreground">
              <CheckCircle className="w-5 h-5 text-teal mt-0.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <IndustriesWeServe />

        <section className="mt-16 mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-left text-foreground font-medium">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <div className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">Cities We Serve</h2>
          <p className="text-muted-foreground mb-6">We build lead generation systems for businesses across Metro Vancouver and the Fraser Valley.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { city: 'Surrey', href: '/surrey' },
              { city: 'Burnaby', href: '/burnaby' },
              { city: 'Langley', href: '/langley' },
              { city: 'Coquitlam', href: '/coquitlam' },
            ].map(({ city, href }) => (
              <Link key={href} to={href} className="bg-muted rounded-xl p-4 text-center hover:bg-muted/80 transition-colors">
                <span className="font-medium text-foreground">{city}</span>
              </Link>
            ))}
          </div>
        </div>

        <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 md:p-12 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground text-lg mb-8">Book your free strategy call and let us build a lead generation system that keeps your calendar full.</p>
          <Button asChild size="lg" className="bg-teal hover:bg-teal/90 text-white">
            <a href="https://calendly.com/apdigital-core/30min" target="_blank" rel="noopener noreferrer">Book Your Free Strategy Call</a>
          </Button>
        </section>
      </div>
    </main>
    <Footer />
  </>
);

export default LeadGeneration;
