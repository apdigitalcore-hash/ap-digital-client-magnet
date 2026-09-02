import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, TrendingUp, Scale, Phone } from 'lucide-react';
import OurServices from '@/components/OurServices';
import { getServiceSchema, getBreadcrumbSchema, getFAQSchema, getWebPageSchema, founderSchema } from '@/lib/structuredData';
import JsonLd from '@/components/JsonLd';
import FaqLight from '@/components/light/FaqLight';
import PastelCTA from '@/components/light/PastelCTA';
import InlineCTA from '@/components/light/InlineCTA';

const TITLE = 'Law Firm Marketing Vancouver — Case Leads | AP Digital';
const DESC = 'Google & Meta Ads for Vancouver law firms — family, injury, immigration and real estate practices. Month-to-month, no lock-in contracts.';
const CANONICAL = 'https://ap-digital.ca/law-firm-marketing';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const included = [
  'Google Search Ads for "lawyer near me" and practice-area terms',
  'Practice-area landing pages (family, injury, immigration, real estate)',
  'Google Business Profile optimization and review generation',
  'Call tracking so you know which cases came from which keyword',
  'Meta Ads retargeting for people who visited but didn\'t call',
  'Consultation booking forms wired to your intake process',
  'Competitor ad monitoring across Metro Vancouver firms',
  'Monthly reporting on cost per signed case, not just clicks',
];

const results = [
  { icon: TrendingUp, stat: 'Google Ads', label: 'Search campaigns for high-intent case enquiries' },
  { icon: Phone, stat: 'No Contract', label: 'Month-to-month, cancel with 30 days notice' },
  { icon: Scale, stat: '90-Day', label: 'Lead-volume target agreed before launch' },
];

const faqs = [
  {
    question: 'How do law firms in Vancouver get more clients online?',
    answer: 'Legal intent lives on Google. Someone typing "family lawyer Vancouver" or "ICBC injury lawyer" is looking to hire this week. We run geo-targeted Google Search Ads into practice-area landing pages, then retarget non-callers on Meta so your firm stays in front of them through the decision window.',
  },
  {
    question: 'How much does law firm marketing cost in BC?',
    answer: 'Most firms start with $2,000–$4,000/month in ad spend plus management starting at $759/month. Legal keywords are among the most expensive in Canada ($15–$40 per click), so budget matters more here than in other niches — but one signed file usually pays for the entire quarter.',
  },
  {
    question: 'Which practice areas work best with paid ads?',
    answer: 'Personal injury and ICBC claims, family law and divorce, immigration, criminal defence, and real estate conveyancing all perform well because the searcher has an urgent, specific need. Corporate and commercial work usually converts better through content and referral channels.',
  },
  {
    question: 'Do you follow Law Society advertising rules?',
    answer: 'Yes. All ad copy and landing pages we write for BC firms avoid guarantees of outcome, comparative superiority claims, and testimonials about results — in line with the Law Society of British Columbia\'s marketing rules. Your firm reviews and approves every piece of copy before it goes live.',
  },
  {
    question: 'How fast will my firm see case inquiries?',
    answer: 'Google Ads usually generates the first consultation calls within the first week of launch. Most legal clients reach a steady flow of 20–30 inquiries per month by week 4–6 once we\'ve cut wasted spend and tightened negative keywords.',
  },
  {
    question: 'Can you help my firm rank in Google Maps?',
    answer: 'Yes. We optimize your Google Business Profile — practice areas, office photos, hours, and a compliant review request process — so your firm shows in the Maps 3-pack for searches like "lawyer near me" alongside your paid results.',
  },
  {
    question: 'Do you work with solo practitioners?',
    answer: 'Yes. Solo and two-lawyer firms are a good fit as long as there is intake capacity to answer calls quickly. Legal leads go cold fast — the firm that answers first usually signs the file.',
  },
  {
    question: 'Is there a contract?',
    answer: 'No. AP Digital works month-to-month with every client, including law firms. No lock-in, no cancellation fee, and a 90-day performance guarantee.',
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    founderSchema,
    getServiceSchema('Law Firm Marketing', DESC, '/law-firm-marketing'),
    getFAQSchema(faqs),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Law Firm Marketing', url: '/law-firm-marketing' },
    ]),
    getWebPageSchema(TITLE, DESC, '/law-firm-marketing'),
  ]
};

const LawFirmMarketing = () => (
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
          Law Firm Case Leads in Vancouver
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          People don't browse for a lawyer. They search once, call two or three firms, and hire the one that answers. We put your firm in front of those searches across Metro Vancouver — and track it all the way to signed files.
        </p>

        <InlineCTA context="firm" />

        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">Urgent, high-intent search</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">"Family lawyer Vancouver," "ICBC injury lawyer," "immigration lawyer near me" — these people need counsel now, not a newsletter.</p>
          </div>
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">Case value changes the math</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">A single retainer can be worth $5,000–$50,000+. That's why a $95 case inquiry is a bargain — we build campaigns around your case economics.</p>
          </div>
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">Compliance-aware copy</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">Ads and pages written to respect Law Society of BC marketing rules — no outcome guarantees, no result testimonials. You approve everything.</p>
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

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">Why Search Wins for Vancouver Law Firms</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            Legal hiring is event-driven. A separation, a car accident, a visa refusal, a closing date — something happens, and the search starts the same day. That makes Google Search the single most reliable channel for a BC firm: you're paying to appear at the exact moment intent exists, in the exact neighbourhoods you practise in.
          </p>
          <p className="mb-4">
            The catch is cost. Legal clicks in Vancouver run $15–$40, so sloppy campaigns burn budget fast. We control that with tight practice-area segmentation, aggressive negative keyword lists, and call tracking that tells us which keywords produce actual consultations instead of tire-kickers.
          </p>
          <p>
            Around that, your Google Business Profile earns the Maps 3-pack placement, and Meta retargeting keeps your firm visible to people who read your page but didn't call the first time — which, in legal, is most of them.
          </p>
        </div>

        <FaqLight faqs={faqs} />

        <OurServices />

        <div className="mt-16 mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-6">Cities We Serve</h2>
          <p className="text-muted-foreground mb-6">We work with law firms across Metro Vancouver and the Fraser Valley. See <Link to="/pricing" className="text-foreground underline underline-offset-4 hover:text-foreground/70">pricing</Link> or browse <Link to="/case-studies" className="text-foreground underline underline-offset-4 hover:text-foreground/70">how we work</Link>.</p>
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

export default LawFirmMarketing;
