/**
 * Canonical company facts.
 *
 * The AI chat used to carry its own hardcoded copy of pricing, which drifted
 * badly from the site — it was quoting Paid Ads at $1,470/mo against an actual
 * $759/mo. Anything that states a price, a timeline, or a contact detail should
 * read it from here so there is exactly one number to change.
 *
 * Scope note: we sell two core services. Other capabilities (SEO, web design,
 * content, lead-gen systems) still have pages, but they are scoped on a call
 * rather than sold at a list price — so nothing here quotes a figure for them.
 */

export const CONTACT = {
  phone: '+1 (778) 682-5772',
  phoneHref: 'tel:+17786825772',
  email: 'apdigital.core@gmail.com',
  calendly: 'https://calendly.com/apdigital-core/20min',
  city: 'Vancouver, BC',
} as const;

export const TERMS = {
  contract: 'Month-to-month. No long-term contracts, no cancellation fees.',
  guarantee:
    '90-day results guarantee — we agree on a lead-volume target at kickoff, and if we miss it by month 3 we keep working at no charge until we hit it.',
  notice: '30 days\' notice to pause or cancel.',
  adSpendSeparate:
    'Ad spend is separate from management and paid directly to Google or Meta — you keep control of the budget. We recommend a minimum of $1,000/month in spend for meaningful data.',
} as const;

export type CoreService = {
  key: 'paid-ads' | 'social-media';
  name: string;
  href: string;
  price: string;
  period: string;
  summary: string;
  includes: string[];
};

/** The two services we actually sell at a list price. */
export const CORE_SERVICES: CoreService[] = [
  {
    key: 'paid-ads',
    name: 'Paid Ads',
    href: '/services/paid-ads',
    price: '$759',
    period: '/month',
    summary:
      'Meta and Google campaigns built, managed, and optimized — audience research, creative testing, retargeting, and a weekly performance report.',
    includes: [
      'Meta Ads (Facebook + Instagram)',
      'Google Search & Performance Max',
      'Audience research & creative testing',
      'Weekly performance report',
    ],
  },
  {
    key: 'social-media',
    name: 'Social Media',
    href: '/services/social-media',
    price: '$849',
    period: '/month',
    summary:
      'Consistent content across your key platforms, fully managed — calendars, captions, scheduling, and community management.',
    includes: [
      '2 platforms managed',
      '12 custom posts / month',
      'Captions, hashtags & scheduling',
      'Community management',
    ],
  },
];

export const getService = (key: CoreService['key']) =>
  CORE_SERVICES.find((s) => s.key === key)!;

export const PAID_ADS = getService('paid-ads');
export const SOCIAL_MEDIA = getService('social-media');

/** Cheapest entry point across the core services, e.g. "$759/month". */
export const STARTING_PRICE = `${PAID_ADS.price}${PAID_ADS.period}`;

/** Both services together, for "what does everything cost" answers. */
export const COMBINED_PRICE = '$1,608/month';

export const TIMELINES = {
  firstLeads: 'Most clients see their first qualified leads within 2 weeks of launch.',
  adsRamp: 'Paid ads typically show qualified leads within 2–3 weeks.',
  organicRamp: 'Organic content compounds over 60–90 days.',
} as const;

export const SERVICE_AREA = [
  'Vancouver',
  'Surrey',
  'Burnaby',
  'Richmond',
  'North Vancouver',
  'Coquitlam',
  'Langley',
  'Abbotsford',
] as const;

export const INDUSTRIES = [
  'salons & beauty',
  'trades & contractors',
  'real estate',
  'coaching & consulting',
  'dental clinics',
  'gyms & fitness',
  'restaurants',
  'law firms',
] as const;
