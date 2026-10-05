export const CHANNELS = ['Google Search Ads', 'Google Display', 'Meta/Facebook', 'Instagram', 'TikTok', 'LinkedIn'] as const;
export const INDUSTRIES = ['Ecommerce', 'SaaS', 'Local service', 'Real estate', 'Health & wellness', 'Finance', 'Education', 'Food & beverage', 'Other'] as const;

/**
 * What the campaign is actually meant to produce.
 *
 * Without this the model was told `conversions = clicks x conversion rate` and
 * left to guess what a conversion is, so it assumed a website lead for
 * everyone — a Messages campaign came back with a landing-page conversion
 * rate and a cost per lead for a landing page the advertiser never built.
 */
export const OBJECTIVES = [
  'Leads', 'Messages', 'Calls', 'Sales', 'Website traffic', 'Brand awareness',
] as const;

export const CURRENCIES = ['CAD', 'USD'] as const;
export type Currency = (typeof CURRENCIES)[number];

export type Channel = (typeof CHANNELS)[number];
export type Industry = (typeof INDUSTRIES)[number];
export type Objective = (typeof OBJECTIVES)[number];

/** Objectives each channel can actually be bought on. */
export const OBJECTIVES_BY_CHANNEL: Record<Channel, readonly Objective[]> = {
  'Google Search Ads': ['Leads', 'Calls', 'Sales', 'Website traffic'],
  'Google Display': ['Leads', 'Sales', 'Website traffic', 'Brand awareness'],
  'Meta/Facebook': ['Leads', 'Messages', 'Calls', 'Sales', 'Website traffic', 'Brand awareness'],
  Instagram: ['Leads', 'Messages', 'Sales', 'Website traffic', 'Brand awareness'],
  TikTok: ['Leads', 'Sales', 'Website traffic', 'Brand awareness'],
  LinkedIn: ['Leads', 'Website traffic', 'Brand awareness'],
};

/**
 * What one conversion is called for each objective, so the report says "cost
 * per conversation" rather than "cost per lead" for a Messages campaign.
 * `null` means the objective has no conversion step beyond the click, and the
 * conversion block is hidden rather than filled with an invented number.
 */
export const CONVERSION_NOUN: Record<Objective, { one: string; many: string; cost: string } | null> = {
  Leads: { one: 'lead', many: 'leads', cost: 'Cost per lead' },
  Messages: { one: 'conversation', many: 'conversations', cost: 'Cost per conversation' },
  Calls: { one: 'call', many: 'calls', cost: 'Cost per call' },
  Sales: { one: 'sale', many: 'sales', cost: 'Cost per sale' },
  'Website traffic': null,
  'Brand awareness': null,
};

export interface SimInputs {
  campaignName: string;
  product: string;
  productUrl: string;
  industry: Industry | '';
  audience: string;
  channel: Channel | '';
  /** What the campaign is for. Drives what a "conversion" means downstream. */
  objective: Objective | '';
  budget: number;
  /** Currency every figure in the report is expressed in. */
  currency: Currency;
  headline: string;
  primaryText: string;
  description: string;
  landingUrl: string;
  /** Ad creative, sent for this request only — never saved or put in a share link. */
  image?: { data: string; mime: string };
}

export interface Range { low: number; high: number }
export interface Scored { score: number; note: string }
export type Level = 'low' | 'medium' | 'high';

export interface SimResults {
  summary: string;
  predictions: {
    ctr: Range; cpc: Range; clicks: Range; conversionRate: Range; conversions: Range; cpa: Range;
    roas: Range | null;
    confidence: Level;
    confidenceReason: string;
    assumptions: string[];
  };
  creative: {
    overall: number;
    verdict: 'Strong' | 'Needs Work' | 'Weak';
    headline: Scored; clarity: Scored; cta: Scored;
    emotion: Scored & { triggers: string[] };
    intent: Scored | null;
  };
  risk: {
    overall: Level;
    summary: string;
    budget: { status: 'too_low' | 'healthy' | 'too_high'; note: string };
    competition: { level: Level; note: string };
    seasonality: { status: 'good' | 'neutral' | 'bad'; note: string };
  };
  recommendations: {
    improvements: { title: string; detail: string; impact: Level }[];
    headline: string;
    primaryText: string;
    description: string;
    budget: string;
    audience: string[];
    landingPage: string | null;
  };
  competitors: { advertisers: Range; avgCpc: Range; patterns: string[] };
}

export interface Simulation {
  id: string;
  createdAt: string;
  inputs: SimInputs;
  results: SimResults;
}

export const EMPTY_INPUTS: SimInputs = {
  campaignName: '', product: '', productUrl: '', industry: '', audience: '', channel: '',
  objective: 'Leads',
  budget: 2500, currency: 'CAD', headline: '', primaryText: '', description: '', landingUrl: '',
};
