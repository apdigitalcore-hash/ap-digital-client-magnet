import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { getBreadcrumbSchema, getWebPageSchema } from '@/lib/structuredData';
import JsonLd from '@/components/JsonLd';

const TITLE = 'Case Studies | Real Results for BC Businesses | AP Digital';
const DESC = 'See how AP Digital generated 94 salon leads in 60 days, 30+ plumbing jobs/month, and 8.2x ROAS for BC businesses. Real results, real numbers.';
const CANONICAL = 'https://ap-digital.ca/case-studies';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const caseStudies = [
  {
    id: 'glow-studio',
    brand: 'Glow Studio',
    initials: 'GS',
    brandColor: '#E8567F',
    brandBg: 'from-pink-500/20 to-pink-600/5',
    service: 'Meta Ads + Content',
    industry: 'Salon & Beauty',
    location: 'Kitsilano, Vancouver',
    headline: '94 leads in 60 days — from empty mid-week chairs to a waitlist.',
    challenge: 'Glow Studio had 3 stylists and ran on referrals. Mid-week occupancy was stuck at 60%. The owner had tried boosting Instagram posts with no measurable results — she needed a system, not experiments.',
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
    quoteName: 'Owner, Glow Studio',
  },
  {
    id: 'flowright-plumbing',
    brand: 'FlowRight Plumbing',
    initials: 'FR',
    brandColor: '#3B82F6',
    brandBg: 'from-blue-500/20 to-blue-600/5',
    service: 'Google Ads + GBP',
    industry: 'Trades & Contractors',
    location: 'Surrey, BC',
    headline: '30+ booked jobs per month — HomeStars cancelled in 6 weeks.',
    challenge: 'FlowRight was a two-truck operation fully dependent on HomeStars — paying per-lead fees that were unpredictable and often unqualified. They needed direct inbound calls without the middleman.',
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
    quoteName: 'Owner, FlowRight Plumbing',
  },
  {
    id: 'priya-kaur-realty',
    brand: 'Priya Kaur Realty',
    initials: 'PK',
    brandColor: '#2DD4BF',
    brandBg: 'from-teal/20 to-teal/5',
    service: 'Meta Ads + Landing Pages',
    industry: 'Real Estate',
    location: 'Burnaby, BC',
    headline: '22 qualified leads in month one — 3 listings taken within 90 days.',
    challenge: 'Priya specialized in Burnaby condo listings but generated all her business through her personal network. Her previous agency delivered impressions reports with zero actual leads.',
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
    quote: 'The home valuation angle worked better than I expected. Motivated sellers are raising their hand directly.',
    quoteName: 'Priya Kaur, Realtor',
  },
  {
    id: 'ascend-coaching',
    brand: 'Ascend Coaching',
    initials: 'AC',
    brandColor: '#A855F7',
    brandBg: 'from-purple-500/20 to-purple-600/5',
    service: 'Meta Ads + Funnel',
    industry: 'Coaching',
    location: 'Vancouver, BC',
    headline: '8 high-ticket clients in 90 days — $28K MRR added.',
    challenge: 'Ascend Coaching charged $3,500/month for 1-on-1 programs but had plateaued at 5 clients from referrals. The founder needed a scalable acquisition system without discounting her offer.',
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
    quoteName: 'Founder, Ascend Coaching',
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
        "url": `https://ap-digital.ca/case-studies#${cs.id}`,
      }))
    },
  ]
};

const BrandMark = ({ initials, color }: { initials: string; color: string }) => (
  <div
    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-white font-bold text-xl sm:text-2xl tracking-tight shadow-lg"
    style={{ backgroundColor: color }}
  >
    {initials}
  </div>
);

const CaseStudies = () => (
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
            Every result below comes from a paid ads or social media campaign run by AP Digital for a real business in Metro Vancouver. No invented metrics.
          </p>
        </div>
      </section>

      {/* Summary stats */}
      <section className="py-12 bg-charcoal border-t border-white/5">
        <div className="container-custom max-w-5xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: '2,400+', label: 'Leads delivered' },
              { value: '8.2x', label: 'Avg. ROAS' },
              { value: '14 days', label: 'To first leads' },
              { value: '$0', label: 'Lock-in fees' },
            ].map((s) => (
              <div key={s.label} className="text-center py-4">
                <p className="font-display text-2xl sm:text-3xl font-bold text-white mb-1">{s.value}</p>
                <p className="text-xs sm:text-sm text-white/40 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section className="bg-background">
        <div className="container-custom max-w-5xl py-16 sm:py-20">
          <div className="flex flex-col gap-20">
            {caseStudies.map((cs, index) => (
              <article key={cs.id} id={cs.id} className="scroll-mt-24">

                {/* Brand header */}
                <div className={`rounded-2xl bg-gradient-to-br ${cs.brandBg} border border-border p-6 sm:p-8 mb-8`}>
                  <div className="flex items-center gap-5 mb-6">
                    <BrandMark initials={cs.initials} color={cs.brandColor} />
                    <div>
                      <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                        {cs.brand}
                      </h2>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5">
                        <span className="text-sm text-muted-foreground">{cs.industry}</span>
                        <span className="text-muted-foreground/30">·</span>
                        <span className="text-sm text-muted-foreground">{cs.location}</span>
                        <span className="text-muted-foreground/30">·</span>
                        <span className="text-sm font-medium" style={{ color: cs.brandColor }}>{cs.service}</span>
                      </div>
                    </div>
                  </div>
                  <p className="font-display text-lg sm:text-xl font-semibold text-foreground leading-snug max-w-2xl">
                    {cs.headline}
                  </p>
                </div>

                {/* Results */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                  {cs.results.map((r) => (
                    <div key={r.label} className="bg-card border border-border rounded-xl p-4 sm:p-5 text-center">
                      <p className="font-display text-2xl sm:text-3xl font-bold mb-1" style={{ color: cs.brandColor }}>{r.metric}</p>
                      <p className="text-xs text-muted-foreground leading-tight">{r.label}</p>
                    </div>
                  ))}
                </div>

                {/* Details */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wider">The Challenge</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{cs.challenge}</p>
                    <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
                      <div>
                        <p className="text-xs text-muted-foreground">Ad spend</p>
                        <p className="font-semibold text-foreground">{cs.adSpend}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Timeline</p>
                        <p className="font-semibold text-foreground">{cs.timeline}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wider">What We Did</h3>
                    <ul className="space-y-2.5">
                      {cs.approach.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: cs.brandColor }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="rounded-xl bg-card border border-border p-6 sm:p-8">
                  <p className="text-foreground text-base sm:text-lg leading-relaxed italic mb-4">
                    "{cs.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: cs.brandColor }}
                    >
                      {cs.initials[0]}
                    </div>
                    <span className="text-sm text-muted-foreground">{cs.quoteName}</span>
                  </div>
                </blockquote>

                {index < caseStudies.length - 1 && (
                  <div className="divider-glow mt-20" />
                )}
              </article>
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
            Book a free strategy call and we'll show you what a campaign looks like for your industry and budget — with realistic projections.
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

export default CaseStudies;
