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

const TITLE = 'Dental Marketing Vancouver — More Patients, No Contract';
const DESC = 'Google Ads & Meta Ads for Vancouver dental clinics — new patient campaigns from $759/month. Month-to-month, no contracts.';
const CANONICAL = 'https://ap-digital.ca/dental-marketing';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const included = [
  'Google Ads targeting "dentist near me" & high-intent searches',
  'Meta Ads campaigns for cosmetic & family dentistry',
  'Google Business Profile optimization & review strategy',
  'Landing pages built for patient conversions',
  'Call tracking to measure booked appointments',
  'Monthly performance reporting & optimization',
  'Retargeting campaigns for website visitors',
  'Competitor ad analysis & positioning',
];

const results = [
  { icon: TrendingUp, stat: 'Google + Meta', label: 'Search and social campaigns for new-patient enquiries' },
  { icon: Calendar, stat: 'No Contract', label: 'Month-to-month, cancel with 30 days notice' },
  { icon: Users, stat: '90-Day', label: 'Lead-volume target agreed before launch' },
];

const faqs = [
  {
    question: 'How do I get more dental patients in Vancouver?',
    answer: 'Google Ads is the fastest channel — people searching "dentist near me" or "emergency dentist Vancouver" are ready to book. AP Digital runs geo-targeted Google and Meta campaigns that put your clinic in front of patients within 10–15 km, generating 30–60 new patient inquiries per month.',
  },
  {
    question: 'How much does dental marketing cost?',
    answer: 'Most dental clinics start with $1,000–$2,000/month in ad spend plus a management fee starting at $759/month. This covers Google Ads, Meta Ads, landing pages, call tracking, and weekly optimization. No setup fees, no contracts.',
  },
  {
    question: 'How fast will I see new patients from ads?',
    answer: 'Google Ads typically generates calls within the first week. Most dental clients see a steady flow of 5–10 new patient inquiries per week by week 3 as campaigns optimize. Meta Ads build awareness and drive cosmetic consultations within 2–3 weeks.',
  },
  {
    question: 'Which services should I advertise as a dentist?',
    answer: 'High-value services convert best: dental implants, Invisalign, cosmetic dentistry, emergency dental, and teeth whitening. We also run general "new patient" campaigns for family dentistry. We help you prioritize based on your margins and availability.',
  },
  {
    question: 'Do you work with dental clinics outside Vancouver?',
    answer: 'Yes. We work with dental clinics across Metro Vancouver including Surrey, Burnaby, Richmond, Langley, Coquitlam, and Abbotsford. Our geo-targeting ensures your ads reach patients in your specific catchment area.',
  },
  {
    question: 'Is there a contract for dental marketing?',
    answer: 'No. AP Digital works month-to-month with all dental clients. No lock-in contracts, no cancellation fees. We also offer a 90-day performance guarantee — if you don\'t see results, you don\'t pay.',
  },
  {
    question: 'Can you help my dental clinic rank on Google Maps?',
    answer: 'Yes. We optimize your Google Business Profile with complete information, photos, services, and a review generation strategy. Combined with Google Ads, this gets your clinic into the Maps 3-pack for searches like "dentist near me" in your area.',
  },
  {
    question: 'What makes dental marketing different from other industries?',
    answer: 'Dental patients have high lifetime value — one new patient is worth $3,000–$10,000+ over their lifetime. This means you can afford a higher cost per lead and still see massive ROI. We structure campaigns around this — targeting high-intent searches and high-value procedures.',
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    founderSchema,
    getServiceSchema('Dental Marketing', DESC, '/dental-marketing'),
    getFAQSchema(faqs),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Dental Marketing', url: '/dental-marketing' },
    ]),
    getWebPageSchema(TITLE, DESC, '/dental-marketing'),
  ]
};

const DentalMarketing = () => (
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
          Dental Patient Leads in Metro Vancouver
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          Your chairs shouldn't be empty. We run Google Ads and Meta campaigns that put your clinic in front of people actively searching for a dentist — and turn them into booked appointments.
        </p>

        <InlineCTA context="clinic" />

        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">High-intent patients</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">We target people Googling "dentist near me," "dental implants," and "emergency dentist" — they're ready to book, not just browsing.</p>
          </div>
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">$3K–$10K lifetime value</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">One new patient is worth thousands over their lifetime. Even at $50/lead, your ROI is massive. We structure campaigns around this math.</p>
          </div>
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">90-day guarantee</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">No contracts, no lock-in. If we don't deliver new patients in 90 days, you don't pay. That's how confident we are.</p>
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

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">Why Google Ads Works for Dentists</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            Unlike salons or coaches, dental patients almost always start with a Google search. They're not scrolling Instagram looking for a dentist — they're typing "dentist near me" or "Invisalign cost Vancouver" into Google with intent to book.
          </p>
          <p className="mb-4">
            That's why Google Ads is the highest-ROI channel for dental clinics. You're paying to show up at the exact moment someone needs you. Combined with a strong Google Business Profile (photos, reviews, accurate hours), your clinic appears in both the Maps 3-pack and the paid results — dominating the entire first page.
          </p>
          <p>
            We layer Meta Ads on top for cosmetic services — Invisalign, veneers, whitening — where before-and-after visuals drive consideration. This two-channel approach fills chairs with both urgent-need and elective patients.
          </p>
        </div>

        <FaqLight faqs={faqs} />

        <OurServices />

        <div className="mt-16 mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-6">Cities We Serve</h2>
          <p className="text-muted-foreground mb-6">We help dental clinics across Metro Vancouver and the Fraser Valley. See <Link to="/pricing" className="text-foreground underline underline-offset-4 hover:text-foreground/70">pricing</Link> or browse <Link to="/case-studies" className="text-foreground underline underline-offset-4 hover:text-foreground/70">how we work</Link>.</p>
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

export default DentalMarketing;
