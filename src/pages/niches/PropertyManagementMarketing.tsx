import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { CheckCircle, Building2, Clock, FileSearch } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OurServices from '@/components/OurServices';
import JsonLd from '@/components/JsonLd';
import FaqLight from '@/components/light/FaqLight';
import PastelCTA from '@/components/light/PastelCTA';
import InlineCTA from '@/components/light/InlineCTA';
import { getServiceSchema, getBreadcrumbSchema, getFAQSchema, getWebPageSchema, founderSchema } from '@/lib/structuredData';

/**
 * Property management is a separate buyer from the realtor audience on
 * /real-estate-marketing, which is why this is a sibling page rather than a
 * section of it. Search Console shows that page pulling 1,847 impressions across
 * 118 queries with not one mentioning property management, rentals, tenants or
 * vacancies — the demand there is agents selling homes.
 *
 * Titles lead with the outcome rather than the category, because the same data
 * shows "leads" and "lead generation" phrasing ranking 17-30 while "marketing
 * agency" phrasing ranks 68-82.
 */

const TITLE = 'Property Management Marketing BC | Fill Vacancies Faster';
const DESC =
  'Meta and Google Ads for BC property managers. Send tenant enquiries to your own site instead of Marketplace. From $759/month, month-to-month, no contracts.';
const CANONICAL = 'https://ap-digital.ca/property-management-marketing';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const included = [
  'Vacancy campaigns on Meta targeted by building radius',
  'Google Ads for "apartments for rent" and neighbourhood searches',
  'Listing traffic sent to your own site, not a marketplace',
  'Lead forms that ask move-in date and budget, so you can filter',
  'Retargeting for people who viewed a unit and did not enquire',
  'Weekly reporting on enquiries per vacant unit',
  'Campaigns paused per building as units fill',
  'Fraser Valley and Metro Vancouver coverage',
];

const results = [
  { icon: Building2, stat: 'Meta + Google', label: 'Vacancy campaigns across both platforms' },
  { icon: Clock, stat: 'No Contract', label: 'Month-to-month, cancel with 30 days notice' },
  { icon: FileSearch, stat: '90-Day', label: 'Lead-volume target agreed before launch' },
];

const faqs = [
  {
    question: 'How much should a property manager spend on marketing?',
    answer:
      'Budget against the cost of the vacancy rather than a flat percentage. A unit renting at $1,800 a month loses roughly $60 for every day it sits empty, so a two-week reduction in time-to-lease is worth about $840 on that one unit. Most BC property managers we speak to run $800 to $2,000 a month in ad spend across a portfolio, plus $759/month management. Ad spend goes directly to Google or Meta on your own account.',
  },
  {
    question: 'Why not just use Facebook Marketplace and Craigslist?',
    answer:
      'Use them, but not only them. The problem is that every enquiry, every photo and every bit of traffic accumulates on someone else\'s platform. You build no audience you can retarget, no email list, and nothing that helps the next vacancy. Running paid campaigns to listings on your own site means the second vacancy costs less than the first, because you can retarget everyone who looked at the first.',
  },
  {
    question: 'Does this work for a small portfolio?',
    answer:
      'It works from roughly 20 units upward, because you need enough turnover for the campaigns to keep learning. Below that, the spend goes quiet between vacancies and the platforms lose their optimisation. If you manage fewer than 20 units we will usually tell you your money is better spent on your Google Business Profile and listing photography first.',
  },
  {
    question: 'How fast can you fill a vacancy?',
    answer:
      'Campaigns typically launch within a week and most clients see their first qualified enquiries within two weeks of launch. Whether that converts to a signed lease depends on your pricing, your photos and how fast you respond — we can generate the enquiry, we cannot make an overpriced unit rent.',
  },
  {
    question: 'Do you handle tenant screening or showings?',
    answer:
      'No. We generate and qualify enquiries; you handle screening, showings and leasing. The lead form captures move-in date and budget so your team is not calling people who wanted something in three months at half the rent.',
  },
  {
    question: 'What areas do you cover?',
    answer:
      'Metro Vancouver and the Fraser Valley, including Mission, Abbotsford, Chilliwack and Maple Ridge. The Fraser Valley is materially less competitive to advertise in than Vancouver, so the same budget reaches more renters there.',
  },
  {
    question: 'Do you have property management case studies?',
    answer:
      'Not yet. We do not publish case studies we cannot attribute to a named client with their permission, so rather than quoting numbers you cannot verify, we agree a target for enquiries per vacant unit before anything goes live and report against it weekly.',
  },
];

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    founderSchema,
    getServiceSchema(
      'Property Management Marketing',
      'Meta and Google Ads campaigns that fill rental vacancies for BC property managers.',
      '/property-management-marketing',
    ),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Property Management Marketing', url: '/property-management-marketing' },
    ]),
    getWebPageSchema(TITLE, DESC, '/property-management-marketing'),
    getFAQSchema(faqs),
  ],
};

const PropertyManagementMarketing = () => (
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
          Property Management Leads in BC — Fill Vacancies Faster
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          A vacant unit costs you money every day it sits. We run Meta and Google Ads that put your
          listings in front of renters in the right neighbourhood, and send them to your own site
          rather than to Facebook Marketplace where the traffic belongs to someone else.
        </p>

        <InlineCTA context="portfolio" />

        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
            <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">Days empty are the metric</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">A $1,800 unit loses about $60 a day standing empty. We report enquiries per vacant unit, not impressions.</p>
          </div>
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
            <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">Traffic you keep</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">Listings on your own site build an audience you can retarget, so the next vacancy costs less to fill than the last.</p>
          </div>
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
            <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">Per building, not per portfolio</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">Campaigns target a radius around each building and pause as units fill, so you are never paying to advertise a full property.</p>
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

        <FaqLight faqs={faqs} />

        <OurServices />

        <div className="mt-16 mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-6">Where We Work</h2>
          <p className="text-muted-foreground mb-6">
            We work with property managers across the Fraser Valley and Metro Vancouver. If you sell
            homes rather than manage rentals, our{' '}
            <Link to="/real-estate-marketing" className="text-foreground underline underline-offset-4 hover:text-foreground/70">real estate marketing</Link>{' '}
            page is the one you want. See{' '}
            <Link to="/pricing" className="text-foreground underline underline-offset-4 hover:text-foreground/70">pricing</Link>{' '}
            or read{' '}
            <Link to="/blog/property-management-marketing-cost" className="text-foreground underline underline-offset-4 hover:text-foreground/70">what property management marketing costs</Link>.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { city: 'Mission', href: '/abbotsford' },
              { city: 'Abbotsford', href: '/abbotsford' },
              { city: 'Langley', href: '/langley' },
              { city: 'Surrey', href: '/surrey' },
              { city: 'Coquitlam', href: '/coquitlam' },
              { city: 'Burnaby', href: '/burnaby' },
              { city: 'Richmond', href: '/richmond' },
              { city: 'Vancouver', href: '/vancouver' },
            ].map((c) => (
              <Link key={c.city} to={c.href} className="bg-white elev-1 hover:elev-2 hover:-translate-y-0.5 rounded-2xl p-4 text-center transition-all duration-300">
                {c.city}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <PastelCTA />
    </main>
    <Footer />
  </>
);

export default PropertyManagementMarketing;
