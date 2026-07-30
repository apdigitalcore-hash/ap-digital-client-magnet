import { Helmet } from 'react-helmet-async';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { getBreadcrumbSchema, getWebPageSchema } from '@/lib/structuredData';
import JsonLd from '@/components/JsonLd';

const TITLE = 'Case Studies | Real Results for BC Businesses | AP Digital';
const DESC = 'See how AP Digital generated 94 salon leads in 60 days, 30+ plumbing jobs/month, and 8.2x ROAS for BC businesses. Real results, real numbers.';
const CANONICAL = 'https://ap-digital.ca/case-studies';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const caseStudies = [
  {
    id: 'velvet-hair-co',
    brand: 'Velvet Hair Co.',
    initials: 'V',
    brandColor: '#E8567F',
    brandBg: 'from-pink-500/20 to-pink-600/5',
    cardBg: 'bg-gradient-to-br from-pink-100 to-pink-50',
    service: 'Meta Ads + Content',
    industry: 'Salon & Beauty',
    location: 'Kitsilano, Vancouver',
    tagline: '94 leads in 60 days',
    headline: '94 leads in 60 days — from empty mid-week chairs to a waitlist.',
    challenge: 'Velvet Hair Co. had 3 stylists and ran on referrals. Mid-week occupancy was stuck at 60%. The owner had tried boosting Instagram posts with no measurable results — she needed a system, not experiments.',
    approach: [
      'Meta Ads targeting women 24–45 within 8km of the salon',
      'Before-and-after Reel content for Facebook & Instagram',
      'Lead form ad with "First visit 20% off" linked to booking system',
      'Retargeted website visitors and IG profile viewers within 14 days',
    ],
    results: [
      { metric: '94', label: 'Qualified leads' },
      { metric: '$8.51', label: 'Cost per lead' },
      { metric: '68%', label: 'Lead-to-booking rate' },
      { metric: '4.2x', label: 'ROAS' },
    ],
    timeline: '60 days',
    adSpend: '$800/mo',
    quote: 'We went from scrambling to fill Tuesday and Wednesday to having a waitlist. I had to hire a fourth stylist.',
    quoteName: 'Owner, Velvet Hair Co.',
  },
  {
    id: 'clearline-plumbing',
    brand: 'Clearline Plumbing & Drain',
    initials: 'CL',
    brandColor: '#3B82F6',
    brandBg: 'from-blue-500/20 to-blue-600/5',
    cardBg: 'bg-gradient-to-br from-blue-100 to-blue-50',
    service: 'Google Ads + GBP',
    industry: 'Trades & Contractors',
    location: 'Surrey, BC',
    tagline: '30+ jobs/month',
    headline: '30+ booked jobs per month — HomeStars cancelled in 6 weeks.',
    challenge: 'Clearline was a two-truck operation fully dependent on HomeStars — paying per-lead fees that were unpredictable and often unqualified. They needed direct inbound calls without the middleman.',
    approach: [
      'Google Search Ads for "plumber Surrey", "emergency plumber", "drain cleaning Surrey"',
      'Call tracking to measure booked jobs vs. clicks',
      'Google Business Profile overhaul — 40+ photos, responded to all reviews',
      'Fast-loading landing page with click-to-call above the fold',
    ],
    results: [
      { metric: '30+', label: 'Jobs per month' },
      { metric: '$31', label: 'Cost per booked call' },
      { metric: '9.1x', label: 'ROAS vs HomeStars' },
      { metric: '4.8★', label: 'Google rating' },
    ],
    timeline: '45 days',
    adSpend: '$1,200/mo',
    quote: 'Within 6 weeks I cancelled HomeStars. The leads are better quality and I own the channel now.',
    quoteName: 'Owner, Clearline Plumbing',
  },
  {
    id: 'west-main-realty',
    brand: 'West & Main Realty',
    initials: 'WM',
    brandColor: '#2DD4BF',
    brandBg: 'from-teal/20 to-teal/5',
    cardBg: 'bg-gradient-to-br from-teal-100 to-teal-50',
    service: 'Meta Ads + Landing Pages',
    industry: 'Real Estate',
    location: 'Burnaby, BC',
    tagline: '22 leads in month one',
    headline: '22 qualified leads in month one — 3 listings taken within 90 days.',
    challenge: 'West & Main specialized in Burnaby condo listings but generated all their business through personal networks. Their previous agency delivered impressions reports with zero actual leads.',
    approach: [
      'Seller-focused Meta Ads targeting homeowners 35–60 in Burnaby & Coquitlam',
      '"Home Valuation" lead magnet landing page as the core offer',
      'Parallel buyer campaign targeting couples searching for condos under $800k',
      'CRM integration tracking leads from ad click to closed deal',
    ],
    results: [
      { metric: '22', label: 'Qualified leads (month 1)' },
      { metric: '$41', label: 'Cost per lead' },
      { metric: '3', label: 'Listings in 90 days' },
      { metric: '12x', label: 'ROI after first closing' },
    ],
    timeline: '30 days',
    adSpend: '$900/mo',
    quote: 'The home valuation angle worked better than we expected. Motivated sellers are raising their hand directly.',
    quoteName: 'Founder, West & Main Realty',
  },
  {
    id: 'basecamp-strategy',
    brand: 'Basecamp Strategy',
    initials: 'B',
    brandColor: '#A855F7',
    brandBg: 'from-purple-500/20 to-purple-600/5',
    cardBg: 'bg-gradient-to-br from-purple-100 to-purple-50',
    service: 'Meta Ads + Funnel',
    industry: 'Coaching',
    location: 'Vancouver, BC',
    tagline: '8 clients in 90 days',
    headline: '8 high-ticket clients in 90 days — $28K MRR added.',
    challenge: 'Basecamp Strategy charged $3,500/month for 1-on-1 programs but had plateaued at 5 clients from referrals. The founder needed a scalable acquisition system without discounting her offer.',
    approach: [
      'Meta Ads video campaign featuring the coach speaking directly to business owners',
      'Two-step funnel: free webinar → strategy call → enrolment',
      'Targeted business owners 30–50 in Metro Vancouver interested in entrepreneurship',
      'A/B tested four creative angles in month one to find the highest-converting hook',
    ],
    results: [
      { metric: '8', label: 'New clients (90 days)' },
      { metric: '$187', label: 'Cost per call booked' },
      { metric: '$28K', label: 'MRR added' },
      { metric: '8.2x', label: 'ROAS' },
    ],
    timeline: '90 days',
    adSpend: '$1,500/mo',
    quote: 'I went from 5 to 13 clients in three months. I had to close the funnel temporarily because I was at capacity.',
    quoteName: 'Founder, Basecamp Strategy',
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Case Studies', url: '/case-studies' },
    ]),
    getWebPageSchema(TITLE, DESC, '/case-studies'),
    {
      "@type": "ItemList",
      "name": "AP Digital Client Case Studies",
      "description": "Real results generated by AP Digital for Vancouver-area small businesses.",
      "itemListElement": caseStudies.map((cs, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": `${cs.brand} — ${cs.headline}`,
        "url": `https://ap-digital.ca/case-studies/${cs.id}`,
      }))
    },
  ]
};

const BrandMark = ({ initials, color, size = 'lg' }: { initials: string; color: string; size?: 'sm' | 'lg' }) => {
  const dims = size === 'lg' ? 'w-20 h-20 text-2xl rounded-2xl' : 'w-8 h-8 text-xs rounded-full';
  return (
    <div
      className={`${dims} flex items-center justify-center text-white font-bold tracking-tight shadow-lg`}
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  );
};

// ─── Grid view (landing page) ───
const CaseStudyGrid = () => (
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
      <meta property="og:site_name" content="AP Digital" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={TITLE} />
      <meta name="twitter:description" content={DESC} />
      <meta name="twitter:image" content={OG_IMAGE} />
      <meta name="robots" content="index, follow" />
    </Helmet>
    <JsonLd data={structuredData} />
    <Header />
    <main id="main-content">

      {/* Hero */}
      <section className="pt-32 pb-16 bg-near-black">
        <div className="container-custom max-w-5xl">
          <span className="inline-block text-[10px] font-bold tracking-[0.25em] uppercase text-teal mb-4">
            Case Studies
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-5 leading-tight max-w-3xl">
            Real campaigns.<br />
            <span className="text-gradient">Real numbers.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Every result below comes from a paid ads or social media campaign run by AP Digital for a real business in Metro Vancouver.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-10 bg-charcoal border-t border-white/5">
        <div className="container-custom max-w-5xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: '2,400+', label: 'Leads delivered' },
              { value: '8.2x', label: 'Avg. ROAS' },
              { value: '14 days', label: 'To first leads' },
              { value: '$0', label: 'Lock-in fees' },
            ].map((s) => (
              <div key={s.label} className="text-center py-3">
                <p className="font-display text-2xl sm:text-3xl font-bold text-white mb-1">{s.value}</p>
                <p className="text-xs sm:text-sm text-white/40 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Card grid */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container-custom max-w-5xl">
          <div className="grid sm:grid-cols-2 gap-5">
            {caseStudies.map((cs) => (
              <Link
                key={cs.id}
                to={`/case-studies/${cs.id}`}
                className="group block rounded-2xl overflow-hidden border border-border hover:border-gray-300 transition-all duration-300 hover:shadow-lg"
              >
                {/* Brand banner */}
                <div className={`${cs.cardBg} p-8 sm:p-10 flex flex-col items-center text-center min-h-[220px] justify-center relative`}>
                  <BrandMark initials={cs.initials} color={cs.brandColor} />
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-gray-900 mt-5 group-hover:text-gray-700 transition-colors">
                    {cs.brand}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">{cs.industry} · {cs.location}</p>
                </div>

                {/* Info strip */}
                <div className="bg-card p-5 sm:p-6">
                  <p className="font-display text-base font-semibold text-foreground mb-3 leading-snug">
                    {cs.headline}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-3">
                      {cs.results.slice(0, 2).map((r) => (
                        <div key={r.label}>
                          <p className="font-display text-lg font-bold" style={{ color: cs.brandColor }}>{r.metric}</p>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{r.label}</p>
                        </div>
                      ))}
                    </div>
                    <span className="text-sm font-medium text-muted-foreground group-hover:text-teal transition-colors flex items-center gap-1">
                      Read <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-near-black">
        <div className="container-custom max-w-3xl text-center">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Want results like these?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Book a free strategy call and we'll show you what a campaign looks like for your industry and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="hero" size="lg">
              <a href="https://calendly.com/apdigital-core/20min" target="_blank" rel="noopener noreferrer">
                Book Your Free Strategy Call <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </Button>
            <Button asChild variant="heroOutline" size="lg">
              <Link to="/pricing">See Pricing</Link>
            </Button>
          </div>
        </div>
      </section>

    </main>
    <Footer />
  </>
);

// ─── Single case study view ───
const CaseStudyDetail = ({ study }: { study: typeof caseStudies[0] }) => (
  <>
    <Helmet>
      <title>{study.brand} Case Study | AP Digital</title>
      <meta name="description" content={study.headline} />
      <link rel="canonical" href={`https://ap-digital.ca/case-studies/${study.id}`} />
      <meta name="robots" content="index, follow" />
    </Helmet>
    <JsonLd data={{
      "@context": "https://schema.org",
      "@graph": [
        getBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Case Studies', url: '/case-studies' },
          { name: study.brand, url: `/case-studies/${study.id}` },
        ]),
        getWebPageSchema(`${study.brand} Case Study | AP Digital`, study.headline, `/case-studies/${study.id}`),
      ]
    }} />
    <Header />
    <main id="main-content">

      {/* Hero banner */}
      <section className={`pt-32 pb-16 bg-gradient-to-br ${study.brandBg} bg-near-black`}>
        <div className="container-custom max-w-4xl">
          <Link to="/case-studies" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> All Case Studies
          </Link>
          <div className="flex items-center gap-5 mb-6">
            <BrandMark initials={study.initials} color={study.brandColor} />
            <div>
              <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground">
                {study.brand}
              </h1>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5">
                <span className="text-sm text-muted-foreground">{study.industry}</span>
                <span className="text-muted-foreground/30">·</span>
                <span className="text-sm text-muted-foreground">{study.location}</span>
                <span className="text-muted-foreground/30">·</span>
                <span className="text-sm font-medium" style={{ color: study.brandColor }}>{study.service}</span>
              </div>
            </div>
          </div>
          <p className="font-display text-lg sm:text-xl md:text-2xl font-semibold text-primary-foreground leading-snug max-w-2xl">
            {study.headline}
          </p>
        </div>
      </section>

      {/* Results */}
      <section className="py-12 bg-charcoal border-t border-white/5">
        <div className="container-custom max-w-4xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {study.results.map((r) => (
              <div key={r.label} className="text-center py-3">
                <p className="font-display text-2xl sm:text-3xl font-bold text-white mb-1">{r.metric}</p>
                <p className="text-xs text-white/40 uppercase tracking-wider">{r.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="py-16 bg-background">
        <div className="container-custom max-w-4xl">
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-card border border-border rounded-xl p-6 sm:p-8">
              <h2 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">The Challenge</h2>
              <p className="text-muted-foreground leading-relaxed">{study.challenge}</p>
              <div className="flex items-center gap-6 mt-6 pt-6 border-t border-border">
                <div>
                  <p className="text-xs text-muted-foreground">Ad spend</p>
                  <p className="font-semibold text-foreground text-lg">{study.adSpend}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Timeline</p>
                  <p className="font-semibold text-foreground text-lg">{study.timeline}</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 sm:p-8">
              <h2 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">What We Did</h2>
              <ul className="space-y-3">
                {study.approach.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-muted-foreground">
                    <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: study.brandColor }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quote */}
          <blockquote className="rounded-xl bg-card border border-border p-8 sm:p-10">
            <p className="text-foreground text-lg sm:text-xl leading-relaxed italic mb-5">
              "{study.quote}"
            </p>
            <div className="flex items-center gap-3">
              <BrandMark initials={study.initials[0]} color={study.brandColor} size="sm" />
              <span className="text-sm text-muted-foreground font-medium">{study.quoteName}</span>
            </div>
          </blockquote>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-near-black">
        <div className="container-custom max-w-3xl text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary-foreground mb-4">
            Want results like {study.brand}?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Book a free strategy call and we'll build a campaign plan for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="hero" size="lg">
              <a href="https://calendly.com/apdigital-core/20min" target="_blank" rel="noopener noreferrer">
                Book Your Free Strategy Call <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </Button>
            <Button asChild variant="heroOutline" size="lg">
              <Link to="/case-studies">See All Case Studies</Link>
            </Button>
          </div>
        </div>
      </section>

    </main>
    <Footer />
  </>
);

// ─── Router wrapper ───
const CaseStudies = () => {
  const { studyId } = useParams();
  const navigate = useNavigate();

  if (studyId) {
    const study = caseStudies.find(cs => cs.id === studyId);
    if (!study) {
      navigate('/case-studies', { replace: true });
      return null;
    }
    return <CaseStudyDetail study={study} />;
  }

  return <CaseStudyGrid />;
};

export default CaseStudies;
