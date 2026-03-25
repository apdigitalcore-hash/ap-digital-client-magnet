import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, TrendingUp, Home, Users } from 'lucide-react';
import OurServices from '@/components/OurServices';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { getServiceSchema, getBreadcrumbSchema, getFAQSchema, getWebPageSchema } from '@/lib/structuredData';

const TITLE = 'Real Estate Marketing Agency Canada | Leads for Realtors | AP Digital';
const DESC = 'AP Digital generates real estate leads across Canada using Meta Ads & social content. Serving realtors, brokerages & investors. Month-to-month.';
const CANONICAL = 'https://ap-digital.ca/real-estate-marketing';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const included = [
  'Facebook & Instagram lead ad campaigns',
  'Personal brand content strategy',
  'Short-form video for listings & market updates',
  'Google Ads for buyer & seller keywords',
  'Landing page & lead capture funnel',
  'CRM integration & automated follow-up',
  'Monthly analytics & lead quality reporting',
  'Social media management & posting',
];

const results = [
  { icon: TrendingUp, stat: '$15-25', label: 'Average cost per qualified real estate lead' },
  { icon: Home, stat: '50+', label: 'Leads per month for top-performing agents' },
  { icon: Users, stat: '300%', label: 'Average social media growth in 6 months' },
];

const faqs = [
  {
    question: 'What kind of leads will I get from Facebook and Instagram ads?',
    answer: "We generate buyer and seller leads through targeted lead form ads. These are people in your market who have actively expressed interest in buying or selling a home. We qualify them through the ad funnel so you're only talking to serious prospects.",
  },
  {
    question: 'How does personal branding help me sell more homes?',
    answer: "In real estate, people choose agents they know, like, and trust. A strong personal brand on social media — through Reels, market updates, and behind-the-scenes content — positions you as the go-to agent in your area. When someone is ready to buy or sell, you're the first person they think of.",
  },
  {
    question: 'Do you work with teams or just individual agents?',
    answer: "We work with both individual agents and real estate teams. For teams, we can create campaigns that generate leads for the team while also building individual agent brands. We'll customize the strategy based on your team structure and goals.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
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
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
    <Header />
    <main className="pt-24 pb-16">
      <div className="container-custom max-w-4xl">
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8">
          Real Estate Marketing That Brings Qualified Buyers and Sellers <span className="text-gradient">to You</span>
        </h1>

        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6 mb-16">
          <p>The real estate market in Canada is more competitive than ever. Buyers and sellers have endless options when choosing an agent — so the one who shows up consistently on social media, runs targeted ads, and builds a recognizable personal brand is the one who wins. At AP DIGITAL, we help real estate agents do exactly that.</p>
          <p>We build lead generation systems using Facebook and Instagram lead ads that put your services in front of people actively looking to buy or sell in your market. Every lead is captured, qualified, and delivered to your CRM so you can focus on closing deals instead of chasing cold prospects.</p>
          <p>But leads are only part of the equation. We also build your personal brand through strategic short-form video content — listing tours, market updates, neighbourhood highlights, and behind-the-scenes content that positions you as the trusted local expert. When someone in your area is ready to make a move, your name is the first one that comes to mind.</p>
          <p>Whether you're a new agent trying to build momentum or an experienced producer looking to scale, our marketing systems are designed to deliver a predictable pipeline of qualified leads every single month. We've helped agents across BC and Canada grow their business with marketing that actually works.</p>
          <p>Stop competing on price and start competing on presence. Let us build the marketing engine that takes your real estate business to the next level.</p>
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

        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">Results Our Real Estate Clients See</h2>
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
          <p className="text-muted-foreground text-lg mb-8">Book your free strategy call and discover how we can fill your pipeline with qualified buyer and seller leads.</p>
          <Button asChild size="lg" className="bg-teal hover:bg-teal/90 text-white">
            <a href="https://calendly.com/apdigital-core/30min" target="_blank" rel="noopener noreferrer">Book Your Free Strategy Call</a>
          </Button>
        </section>
      </div>
    </main>
    <Footer />
  </>
);

export default RealEstateMarketing;
