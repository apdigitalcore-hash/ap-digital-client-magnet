import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, X, ArrowRight } from 'lucide-react';
import { getBreadcrumbSchema, getWebPageSchema, getFAQSchema } from '@/lib/structuredData';

const TITLE = 'How to Choose a Google Ads Agency in Vancouver | AP Digital';
const DESC = 'What to look for when hiring a Vancouver Google Ads or Meta Ads agency — red flags, questions to ask, and what separates agencies that deliver from those that don\'t.';
const CANONICAL = 'https://ap-digital.ca/how-to-choose-a-marketing-agency-vancouver';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const faqs = [
  {
    question: 'How much should I pay a Google Ads agency in Vancouver?',
    answer: 'Vancouver Google Ads agencies typically charge $500–$2,500/month in management fees, separate from your ad spend. Flat-fee models (like AP Digital) give you more predictability than percentage-of-spend models, which reward agencies for increasing your budget rather than your ROI. Watch out for agencies bundling ad spend into a single "all-in" price — you want to see the split clearly.',
  },
  {
    question: 'What questions should I ask a Vancouver marketing agency before hiring?',
    answer: 'Ask: (1) Who specifically will manage my account day-to-day? (2) How do you measure success — leads and revenue, or impressions and reach? (3) Can I see examples of campaigns you\'ve run for businesses in my industry? (4) What is your policy if we don\'t see results in the first 90 days? (5) Is there a contract, and what are the cancellation terms? Any agency that can\'t answer all five clearly is worth reconsidering.',
  },
  {
    question: 'What\'s the difference between a full-service agency and a specialist agency?',
    answer: 'Full-service agencies offer everything — SEO, social media, paid ads, web design, PR — but typically spread their attention across all of it at a generalist level. Specialist agencies focus on one or two channels and build deep expertise in specific industries. For most small businesses in Vancouver, a specialist agency that knows your industry and your ad platform will outperform a generalist agency that manages 50 different verticals.',
  },
  {
    question: 'How long does it take to see results from a Vancouver marketing agency?',
    answer: 'Google Ads and Meta Ads campaigns run by a competent agency should produce their first leads within 2–4 weeks of launch. SEO takes 3–6 months. Social media organic growth typically takes 60–90 days to show meaningful traction. If an agency promises instant SEO results or guarantees specific ad rankings, those are red flags — good agencies set realistic timelines and measure by leads, not rankings or impressions.',
  },
  {
    question: 'Should I hire an agency or do my own ads?',
    answer: 'DIY ads work at very small budgets ($300–$500/month) if you have time to learn the platforms properly — expect 3–6 months before you\'re running effective campaigns. At $1,000+/month in ad spend, professional management almost always produces better ROI than self-managed campaigns because the learning curve is steep, mistakes are expensive, and optimizing Google Ads or Meta Ads well requires daily attention and platform-specific expertise.',
  },
  {
    question: 'What is AP Digital\'s guarantee?',
    answer: 'AP Digital operates month-to-month with no lock-in contracts. If you don\'t see qualified leads within 90 days of your campaign going live, we don\'t expect you to stay. We commit to transparent reporting — every report shows your cost per lead, lead volume, and return on ad spend — so you always know exactly what you\'re getting for your money.',
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Hiring Guide', url: '/how-to-choose-a-marketing-agency-vancouver' },
    ]),
    getWebPageSchema(TITLE, DESC, '/how-to-choose-a-marketing-agency-vancouver'),
    getFAQSchema(faqs),
    {
      "@type": "Article",
      "@id": "https://ap-digital.ca/how-to-choose-a-marketing-agency-vancouver#article",
      "headline": "How to Choose a Google Ads Agency in Vancouver BC",
      "description": DESC,
      "url": CANONICAL,
      "datePublished": "2026-05-01",
      "dateModified": "2026-05-16",
      "inLanguage": "en-CA",
      "author": {
        "@type": "Person",
        "name": "Arjun Sharma",
        "jobTitle": "Founder, AP Digital",
        "url": "https://ap-digital.ca/about"
      },
      "publisher": { "@id": "https://ap-digital.ca/#organization" },
      "image": { "@type": "ImageObject", "url": OG_IMAGE, "width": 1200, "height": 630 }
    }
  ]
};

const criteria = [
  {
    title: 'They measure results by leads and revenue — not vanity metrics',
    good: 'Reports show cost per lead, lead volume, booked jobs, and ROAS. Every number ties back to your business outcomes.',
    bad: 'Monthly reports full of impressions, reach, clicks, and engagement rate — with no mention of actual leads or revenue.',
  },
  {
    title: 'You know exactly who is managing your account',
    good: 'The person you meet on the sales call is the person running your campaigns. You have their direct contact.',
    bad: 'You sign with a senior person and then get handed off to a junior account manager or an offshore team you\'ve never spoken to.',
  },
  {
    title: 'Industry experience in your specific vertical',
    good: 'The agency has run at least 10–15 campaigns for businesses like yours. They know your cost-per-lead benchmarks, your seasonality, and your audience before you give them a single dollar.',
    bad: 'They\'ve worked with "many industries" and will "apply general best practices" to your vertical. That\'s code for: they\'ll learn on your budget.',
  },
  {
    title: 'No lock-in contracts or long-term commitments',
    good: 'Month-to-month with the ability to pause or cancel with 30 days notice. Agencies with good results don\'t need contractual lock-in.',
    bad: '6-month or 12-month minimums with hefty cancellation fees. This protects the agency, not you.',
  },
  {
    title: 'Transparent ad spend — yours, not theirs',
    good: 'Your ad budget goes directly into your Google Ads or Meta Ads account. You can see every dollar spent, pause campaigns yourself, and take the account with you if you leave.',
    bad: 'The agency owns your ad account. If you leave, you start from zero — no data, no history, no audiences.',
  },
  {
    title: 'They can show you real case studies with real numbers',
    good: '"We helped a Kitsilano salon generate 94 leads in 60 days at $8.51 per lead" — specific, verifiable, comparable to your situation.',
    bad: '"We helped businesses like yours grow significantly" — vague claims, stock photos, and testimonials that say "great service" but nothing about actual results.',
  },
];

const HiringGuide = () => (
  <>
    <Helmet>
      <title>{TITLE}</title>
      <meta name="description" content={DESC} />
      <link rel="canonical" href={CANONICAL} />
      <meta property="og:type" content="article" />
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
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
    <Header />
    <main id="main-content" className="pt-24 pb-16 bg-background">
      <article className="container-custom max-w-3xl">

        <div className="mb-3">
          <span className="text-teal text-sm font-semibold">Buyer's Guide · Vancouver, BC</span>
        </div>
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
          How to Choose a Google Ads Agency in Vancouver
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-4">
          There are over 200 marketing agencies operating in Metro Vancouver. Most will happily take your budget and send you monthly reports full of impressions and reach. A much smaller number will actually make your phone ring.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-12">
          This guide covers what separates the agencies that deliver from the ones that don't — and the six questions you should ask before handing over a dollar. Written by Arjun Sharma, founder of <Link to="/about" className="text-teal underline hover:text-teal/80">AP Digital</Link>.
        </p>

        {/* Six criteria */}
        <section className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
            6 Things to Look For When Hiring a Vancouver Marketing Agency
          </h2>
          <div className="flex flex-col gap-8">
            {criteria.map((c, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6 md:p-8">
                <h3 className="font-display text-lg font-bold text-foreground mb-5">
                  <span className="text-teal mr-2">{i + 1}.</span>{c.title}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-teal/5 border border-teal/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-teal shrink-0" />
                      <span className="text-sm font-semibold text-teal">Good sign</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{c.good}</p>
                  </div>
                  <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <X className="w-4 h-4 text-red-400 shrink-0" />
                      <span className="text-sm font-semibold text-red-400">Red flag</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{c.bad}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Agency types comparison */}
        <section className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            Types of Vancouver Marketing Agencies
          </h2>
          <p className="text-muted-foreground mb-8">
            Not all agencies are structured the same. Here is how the main categories differ and who each is suited for.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 pr-6 font-semibold text-foreground">Agency Type</th>
                  <th className="text-left py-3 pr-6 font-semibold text-foreground">Best For</th>
                  <th className="text-left py-3 pr-6 font-semibold text-foreground">Typical Cost</th>
                  <th className="text-left py-3 font-semibold text-foreground">Watch Out For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="py-4 pr-6 font-medium text-foreground">Large full-service agency</td>
                  <td className="py-4 pr-6 text-muted-foreground">Enterprises, national brands</td>
                  <td className="py-4 pr-6 text-muted-foreground">$3,000–$10,000+/mo</td>
                  <td className="py-4 text-muted-foreground">Junior staff, slow communication, generalist campaigns</td>
                </tr>
                <tr>
                  <td className="py-4 pr-6 font-medium text-foreground">Mid-size generalist agency</td>
                  <td className="py-4 pr-6 text-muted-foreground">Mid-size businesses, multiple channels</td>
                  <td className="py-4 pr-6 text-muted-foreground">$1,500–$4,000/mo</td>
                  <td className="py-4 text-muted-foreground">Account turnover, lock-in contracts, vanity metrics</td>
                </tr>
                <tr className="bg-teal/5">
                  <td className="py-4 pr-6 font-medium text-teal">Specialist boutique (like AP Digital)</td>
                  <td className="py-4 pr-6 text-muted-foreground">Local service businesses: salons, trades, real estate, coaches</td>
                  <td className="py-4 pr-6 text-muted-foreground">$500–$2,000/mo</td>
                  <td className="py-4 text-muted-foreground">Less bandwidth for complex multi-channel campaigns</td>
                </tr>
                <tr>
                  <td className="py-4 pr-6 font-medium text-foreground">Freelancer</td>
                  <td className="py-4 pr-6 text-muted-foreground">Very small budgets, simple campaigns</td>
                  <td className="py-4 pr-6 text-muted-foreground">$300–$1,000/mo</td>
                  <td className="py-4 text-muted-foreground">No backup, limited tools, hard to scale</td>
                </tr>
                <tr>
                  <td className="py-4 pr-6 font-medium text-foreground">DIY (self-managed)</td>
                  <td className="py-4 pr-6 text-muted-foreground">Founders willing to invest 10+ hours/week learning</td>
                  <td className="py-4 pr-6 text-muted-foreground">Ad spend only</td>
                  <td className="py-4 text-muted-foreground">6–12 month learning curve, high error cost</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* What to expect section */}
        <section className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            Realistic Expectations from a Vancouver Ads Agency
          </h2>
          <p className="text-muted-foreground mb-6">
            Good agencies set honest timelines. Here is what you should realistically expect based on the channel:
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="font-bold text-foreground mb-1">Google Ads</p>
              <p className="text-teal text-sm font-semibold mb-2">First leads: 3–14 days</p>
              <p className="text-sm text-muted-foreground">High-intent search traffic converts fast. Optimized campaigns typically see strong lead flow by week two. Best for trades, services with active search demand.</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="font-bold text-foreground mb-1">Meta Ads (Facebook & Instagram)</p>
              <p className="text-teal text-sm font-semibold mb-2">First leads: 7–21 days</p>
              <p className="text-sm text-muted-foreground">Algorithm needs 7–14 days of data to optimize delivery. First results typically arrive in week two. Strongest for salons, real estate, coaches, and visual businesses.</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="font-bold text-foreground mb-1">Local SEO</p>
              <p className="text-teal text-sm font-semibold mb-2">Results: 60–180 days</p>
              <p className="text-sm text-muted-foreground">Google Business Profile improvements can show within 30 days. Organic ranking changes take 3–6 months. Compounding long-term value but slower short-term payoff than paid.</p>
            </div>
          </div>
        </section>

        {/* AP Digital positioning */}
        <section className="mb-16 bg-card border border-border rounded-2xl p-8">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">
            How AP Digital Approaches This
          </h2>
          <p className="text-muted-foreground mb-6">
            AP Digital was built specifically for local service businesses in Metro Vancouver. Here is how we address each of the six criteria above:
          </p>
          <ul className="space-y-3">
            {[
              'Every report shows cost per lead, lead volume, and ROAS — nothing else. No impressions reports.',
              'Arjun Sharma personally manages every account. You have his direct contact from day one.',
              'We work in four verticals only: salons, trades, real estate, and coaches. No generalism.',
              'Month-to-month. No contracts, no cancellation fees, no lock-in.',
              'Your ad account is yours. You own the data, the audiences, and the campaign history.',
              'Four detailed case studies with specific numbers are published at ap-digital.ca/case-studies.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col gap-6">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-border pb-6 last:border-0">
                <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-card border border-border rounded-2xl p-8 md:p-10 text-center">
          <h2 className="font-display text-2xl font-bold text-foreground mb-3">
            Ready to Find Out If AP Digital Is the Right Fit?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Book a free 20-minute strategy call. We'll tell you honestly what results are realistic for your business and budget — no pitch, no pressure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-teal hover:bg-teal/90 text-white">
              <a href="https://calendly.com/apdigital-core/20min" target="_blank" rel="noopener noreferrer">
                Book Your Free Strategy Call <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/case-studies">See Case Studies</Link>
            </Button>
          </div>
        </section>

      </article>
    </main>
    <Footer />
  </>
);

export default HiringGuide;
