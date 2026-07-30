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
import { getServiceSchema, getBreadcrumbSchema, getFAQSchema, getWebPageSchema, founderSchema } from '@/lib/structuredData';
import JsonLd from '@/components/JsonLd';

const TITLE = 'Gym & Fitness Marketing Vancouver | Get More Members | AP Digital';
const DESC = 'Get 30–50 new gym memberships/month with Meta Ads & Google Ads. AP Digital serves Vancouver gyms, studios & personal trainers. Month-to-month. No contracts.';
const CANONICAL = 'https://ap-digital.ca/fitness-marketing';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const included = [
  'Meta Ads campaigns targeting fitness-minded locals',
  'Google Ads for "gym near me" & class-specific searches',
  'Lead form ads with free trial & intro offer funnels',
  'Google Business Profile optimization & review strategy',
  'Landing pages built for membership sign-ups',
  'Monthly performance reporting & creative testing',
  'Retargeting campaigns for website visitors & free trial no-shows',
  'Seasonal campaigns (New Year, summer, back-to-school)',
];

const results = [
  { icon: TrendingUp, stat: '4-7x', label: 'Average return on ad spend for fitness clients' },
  { icon: Calendar, stat: '35+', label: 'New member sign-ups per month from ads' },
  { icon: Users, stat: '$18', label: 'Average cost per free trial lead' },
];

const faqs = [
  {
    question: 'How do I get more gym members in Vancouver?',
    answer: 'Meta Ads are the highest-ROI channel for gyms and studios. We target people within 5–10 km of your location who match your ideal member profile — age, fitness interests, income — and drive them to a free trial or intro offer. Most gyms see 30–50 new leads per month.',
  },
  {
    question: 'How much does fitness marketing cost?',
    answer: 'Most gyms and studios start with $800–$1,500/month in ad spend plus a management fee starting at $759/month. This covers Meta Ads, Google Ads, landing pages, and weekly optimization. No setup fees, no contracts.',
  },
  {
    question: 'How fast will I see new members from ads?',
    answer: 'Meta Ads typically generate free trial bookings within the first week. Most fitness clients see a steady flow of 8–12 leads per week by week 3. The key is having a compelling intro offer — free week, $1 first month, or free class — that lowers the barrier to entry.',
  },
  {
    question: 'What type of fitness businesses do you work with?',
    answer: 'We work with gyms, CrossFit boxes, yoga studios, Pilates studios, personal trainers, martial arts studios, boxing gyms, and boutique fitness studios across Metro Vancouver. The strategy adapts to your model — membership-based, class-based, or personal training.',
  },
  {
    question: 'Should my gym use Instagram or Google Ads?',
    answer: 'Both, but Meta (Instagram + Facebook) is the primary driver for most fitness businesses. People don\'t Google "gym near me" every day, but they do scroll Instagram. Transformation photos, class highlights, and community content drive consideration. Google Ads captures the high-intent searches that do happen.',
  },
  {
    question: 'How do I compete with big chain gyms like GoodLife or Anytime Fitness?',
    answer: 'You don\'t compete on price — you compete on community and specialization. We position your gym around what makes it different (coaching quality, class variety, atmosphere) and target people who value that over $10/month memberships. Boutique fitness members have 3–5x higher lifetime value than big-box members.',
  },
  {
    question: 'Is there a contract for fitness marketing?',
    answer: 'No. AP Digital works month-to-month. No lock-in contracts, no cancellation fees. We also offer a 90-day performance guarantee — if you don\'t see results, you don\'t pay.',
  },
  {
    question: 'Can you help with New Year and seasonal fitness campaigns?',
    answer: 'Yes. January is the biggest month for gym sign-ups, and we plan campaigns months in advance to capture that demand. We also run seasonal pushes for summer body prep (March–May), back-to-school (September), and holiday gift memberships (December).',
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    founderSchema,
    getServiceSchema('Fitness Marketing', DESC, '/fitness-marketing'),
    getFAQSchema(faqs),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Fitness Marketing', url: '/fitness-marketing' },
    ]),
    getWebPageSchema(TITLE, DESC, '/fitness-marketing'),
  ]
};

const FitnessMarketing = () => (
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
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8">
          Gym &amp; Fitness Marketing — Fill Your Classes with Meta Ads
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          Empty class slots and slow sign-up months kill studios. We build ad campaigns that keep your membership pipeline full year-round — not just in January.
        </p>

        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="font-bold text-foreground mb-1">Transformation content sells</p>
            <p className="text-sm text-muted-foreground">Before-and-after photos and member testimonial videos are the highest-converting ad creative in fitness. We help you produce and promote them.</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="font-bold text-foreground mb-1">Hyper-local targeting</p>
            <p className="text-sm text-muted-foreground">Members won't drive 30 minutes to your gym. We target fitness-interested people within 5–10 km of your location — the only radius that matters.</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="font-bold text-foreground mb-1">No contract, no risk</p>
            <p className="text-sm text-muted-foreground">Month-to-month. 90-day guarantee. If we don't get you new members, you don't pay.</p>
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

        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">Results Our Fitness Clients See</h2>
        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          {results.map((r) => (
            <div key={r.label} className="bg-card border border-border rounded-xl p-6 text-center">
              <r.icon className="w-8 h-8 text-teal mx-auto mb-3" />
              <div className="font-display text-3xl font-bold text-teal mb-2">{r.stat}</div>
              <p className="text-muted-foreground text-sm">{r.label}</p>
            </div>
          ))}
        </div>

        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">Why Meta Ads Work for Gyms &amp; Studios</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            Joining a gym isn't an emergency — nobody Googles "gym near me" at midnight because they need one right now. It's a considered decision driven by motivation, inspiration, and seeing what's possible. That's why Instagram and Facebook are the dominant channels for fitness.
          </p>
          <p className="mb-4">
            Transformation photos stop the scroll. Class highlight reels build FOMO. Member testimonials create trust. We run these as paid ads targeting people who already follow fitness accounts, have visited competitor websites, or match your ideal member demographics.
          </p>
          <p>
            The funnel is simple: ad → free trial landing page → booked visit → membership. We optimize every step — from the creative that hooks attention to the retargeting that brings back people who clicked but didn't book.
          </p>
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

        <div className="mt-16 mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">Cities We Serve</h2>
          <p className="text-muted-foreground mb-6">We help gyms and fitness studios across Metro Vancouver and the Fraser Valley. See our <Link to="/pricing" className="text-teal underline hover:text-teal/80">pricing</Link> or browse <Link to="/case-studies" className="text-teal underline hover:text-teal/80">client results</Link>.</p>
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
              <Link key={href} to={href} className="bg-muted rounded-xl p-4 text-center hover:bg-muted/80 transition-colors">
                <span className="font-medium text-foreground">{city}</span>
              </Link>
            ))}
          </div>
        </div>

        <section className="bg-card border border-border rounded-2xl p-8 md:p-12 text-center mt-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">Ready to Fill Your Classes?</h2>
          <p className="text-muted-foreground text-lg mb-8">Book your free strategy call and we'll show you how to get more members through the door every month.</p>
          <Button asChild size="lg" className="bg-teal hover:bg-teal/90 text-white">
            <a href="https://calendly.com/apdigital-core/20min" target="_blank" rel="noopener noreferrer">Book Your Free Strategy Call</a>
          </Button>
        </section>
      </div>
    </main>
    <Footer />
  </>
);

export default FitnessMarketing;
