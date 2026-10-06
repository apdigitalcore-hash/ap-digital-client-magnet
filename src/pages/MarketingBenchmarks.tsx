import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { getBreadcrumbSchema, getWebPageSchema, getFAQSchema, founderSchema } from '@/lib/structuredData';
import JsonLd from '@/components/JsonLd';

const TITLE = 'Marketing Costs & Benchmarks Canada 2026 | AP Digital';
const DESC = 'Real 2026 benchmarks for Canadian small businesses: Google Ads cost per click by industry, Meta Ads cost per lead, and what agencies charge. Vancouver data included.';
const CANONICAL = 'https://ap-digital.ca/marketing-benchmarks';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const googleCpc = [
  { industry: 'Plumbers', cpc: '$8 – $15', note: 'Emergency keywords ("burst pipe", "after hours plumber") sit at the top of the range.' },
  { industry: 'HVAC', cpc: '$10 – $20', note: 'Furnace and AC repair spike in seasonal peaks — December and July in BC.' },
  { industry: 'Electricians', cpc: '$6 – $12', note: 'EV charger installation terms have climbed steadily in BC since 2023.' },
  { industry: 'Roofers', cpc: '$8 – $18', note: 'Storm-response terms cost more but convert fastest.' },
  { industry: 'General contractors', cpc: '$5 – $12', note: 'Renovation keywords ("kitchen reno Vancouver") are cheaper than emergency trades.' },
  { industry: 'Dentists', cpc: '$5 – $10', note: '"Dentist near me" is competitive in Vancouver; new-patient offers lower effective cost.' },
  { industry: 'Lawyers', cpc: '$15 – $40', note: 'Family and injury law are the most expensive local keywords in Canada.' },
  { industry: 'Real estate agents', cpc: '$2 – $5', note: 'Cheap clicks, low intent — most realtor lead gen works better on Meta.' },
  { industry: 'Salons & spas', cpc: '$2 – $4', note: 'Low search volume; discovery-driven businesses usually get more from Meta.' },
  { industry: 'Restaurants', cpc: '$1 – $3', note: 'Cheap clicks, but reservations convert better from Maps and Instagram.' },
  { industry: 'Gyms & fitness', cpc: '$3 – $6', note: 'January is the most expensive month; June the cheapest.' },
];

const metaCpl = [
  { industry: 'Salons & spas', cpl: '$5 – $15', note: 'Offer-led creative (first-visit discount) outperforms brand awareness.' },
  { industry: 'Real estate agents', cpl: '$4 – $8', note: 'Qualification questions cut volume ~30% but roughly double show-up rates.' },
  { industry: 'Coaches & consultants', cpl: '$10 – $30', note: 'Lead magnets (guide, quiz, webinar) beat "book a call" cold.' },
  { industry: 'Restaurants', cpl: '$3 – $8', note: 'Reservation and offer campaigns; walk-in attribution is the hard part.' },
  { industry: 'Gyms & fitness', cpl: '$8 – $20', note: 'Free-trial offers convert best; January CPLs drop as volume rises.' },
  { industry: 'Trades (retargeting)', cpl: '$15 – $40', note: 'Meta works for trades as retargeting on top of Google, rarely cold.' },
];

const agencyNorms = [
  { item: 'Freelancer ad management', range: '$300 – $800/mo', note: 'Usually one platform, limited reporting.' },
  { item: 'Boutique agency management', range: '$750 – $2,500/mo', note: 'AP Digital sits here: $759/mo flat for paid ads, $849/mo for social.' },
  { item: 'Large agency management', range: '$2,500 – $10,000+/mo', note: 'Often percentage-of-spend on top.' },
  { item: 'Percentage-of-spend billing', range: '10% – 20% of spend', note: 'Common, and it rewards the agency for spending more of your money.' },
  { item: 'Setup fees', range: '$0 – $1,500', note: 'Increasingly rare at the boutique level.' },
  { item: 'Typical contract length', range: '3 – 12 months', note: 'Month-to-month is still the exception, not the rule.' },
];

const localData = [
  'Metro Vancouver has roughly 80,000 small businesses; the Fraser Valley adds about 25,000 more.',
  'Google processes an estimated 46% of local-service searches with "near me" or a city name in the query.',
  'In BC, searches for "EV charger installation" have more than doubled since 2023 — a leading indicator for electrician demand.',
  'A vacant $1,800/month rental unit in Metro Vancouver loses about $60 per day — the math that drives property-management ad budgets.',
  'Most Vancouver local-service businesses we audit spend between $1,000 and $3,000/month all-in on paid acquisition.',
];

const faqs = [
  {
    question: 'How much does Google Ads cost per click in Canada in 2026?',
    answer: 'For local service businesses, most clicks cost between $2 and $20. Trades like plumbing and HVAC sit at $8–$20, lawyers at $15–$40, and restaurants or salons at $1–$4. Vancouver runs slightly above the national average because of competition density.',
  },
  {
    question: 'What is a good cost per lead on Facebook Ads in Canada?',
    answer: 'For local services, $5–$30 per lead is a healthy range depending on the industry. Salons and restaurants can land under $10, coaches and consultants typically run $10–$30, and trades retargeting sits at $15–$40. Anything under $10 for a qualified local lead is strong.',
  },
  {
    question: 'How much should a small business in Vancouver spend on marketing?',
    answer: 'A common rule of thumb is 5–10% of revenue. In practice, most Metro Vancouver service businesses we work with spend $1,000–$3,000 per month all-in (management fee plus ad spend) and see meaningful lead flow from that level.',
  },
  {
    question: 'Are these benchmarks from AP Digital client campaigns?',
    answer: 'No. These are industry-typical ranges compiled from published platform data and market rates, not claims about our own client results — we do not publish client numbers without named permission. Use them as planning ranges, not guarantees.',
  },
  {
    question: 'Why do Vancouver Google Ads cost more than other Canadian cities?',
    answer: 'More advertisers bidding on the same local searches. A plumber in Vancouver competes with dozens of others for the same emergency keywords, while a smaller market like Abbotsford or Kelowna has fewer bidders and lower click prices for the same term.',
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    founderSchema,
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Marketing Benchmarks', url: '/marketing-benchmarks' },
    ]),
    getWebPageSchema(TITLE, DESC, '/marketing-benchmarks'),
    getFAQSchema(faqs),
  ]
};

const BenchmarkTable = ({ title, intro, rows, cols }: {
  title: string;
  intro: string;
  rows: { label: string; value: string; note: string }[];
  cols: [string, string, string];
}) => (
  <section className="mt-16">
    <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">{title}</h2>
    <p className="text-muted-foreground mb-6">{intro}</p>
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-border">
            <th className="py-3 pr-4 text-sm font-semibold text-foreground">{cols[0]}</th>
            <th className="py-3 pr-4 text-sm font-semibold text-foreground">{cols[1]}</th>
            <th className="py-3 text-sm font-semibold text-foreground">{cols[2]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-b border-border/60">
              <td className="py-3 pr-4 text-sm text-foreground font-medium whitespace-nowrap">{r.label}</td>
              <td className="py-3 pr-4 text-sm text-teal font-semibold whitespace-nowrap">{r.value}</td>
              <td className="py-3 text-sm text-muted-foreground">{r.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

const MarketingBenchmarks = () => (
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
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Marketing Costs &amp; Benchmarks for Canadian Small Businesses (2026)
        </h1>
        <p className="text-base text-teal font-semibold mb-6">
          What clicks, leads, and agency management actually cost in Canada right now — with Vancouver-specific notes.
        </p>

        <p className="text-lg text-muted-foreground leading-relaxed mb-4">
          These are industry-typical ranges compiled from published platform data and current market rates —
          planning numbers, not promises. They are deliberately not our client results: we don't publish client
          numbers without named permission. If you want the version of this page tailored to your business, run a
          free <Link to="/advice" className="text-teal underline hover:text-teal/80">ADvice simulation</Link> or
          check our <Link to="/pricing" className="text-teal underline hover:text-teal/80">pricing</Link>.
        </p>
        <p className="text-sm text-muted-foreground mb-8">Last updated: October 2026.</p>

        <BenchmarkTable
          title="Google Ads Cost Per Click by Industry (Canada, 2026)"
          intro="What one click costs on Google Search for local-service keywords. Vancouver sits at or slightly above the top of each range."
          cols={['Industry', 'Typical CPC', 'Notes']}
          rows={googleCpc.map((g) => ({ label: g.industry, value: g.cpc, note: g.note }))}
        />

        <BenchmarkTable
          title="Meta Ads Cost Per Lead by Industry (Canada, 2026)"
          intro="What one lead (form fill, call, or booking request) typically costs on Facebook and Instagram for local businesses."
          cols={['Industry', 'Typical CPL', 'Notes']}
          rows={metaCpl.map((m) => ({ label: m.industry, value: m.cpl, note: m.note }))}
        />

        <BenchmarkTable
          title="What Marketing Agencies Charge in Canada (2026)"
          intro="The going rates for ongoing management, so you can place any quote you receive — including ours — in context."
          cols={['Line item', 'Typical range', 'Notes']}
          rows={agencyNorms.map((a) => ({ label: a.item, value: a.range, note: a.note }))}
        />

        <section className="mt-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">Vancouver &amp; BC Local Data Points</h2>
          <p className="text-muted-foreground mb-6">
            Local context that changes how these benchmarks apply in Metro Vancouver and the Fraser Valley.
          </p>
          <ul className="space-y-3">
            {localData.map((d) => (
              <li key={d} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span aria-hidden="true" className="mt-2 w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                {d}
              </li>
            ))}
          </ul>
        </section>

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

        <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 md:p-12 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">Want Numbers for Your Business?</h2>
          <p className="text-muted-foreground text-lg mb-8">Book a free 20-minute call and we'll tell you what leads actually cost in your niche and your city.</p>
          <Button asChild size="lg" className="bg-teal hover:bg-teal/90 text-white">
            <Link to="/book">Book Your Free Strategy Call</Link>
          </Button>
        </section>
      </div>
    </main>
    <Footer />
  </>
);

export default MarketingBenchmarks;
