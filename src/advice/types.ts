export const CHANNELS = ['Google Search Ads', 'Google Display', 'Meta/Facebook', 'Instagram', 'TikTok', 'LinkedIn'] as const;
export const INDUSTRIES = ['Ecommerce', 'SaaS', 'Local service', 'Real estate', 'Health & wellness', 'Finance', 'Education', 'Food & beverage', 'Other'] as const;

export type Channel = (typeof CHANNELS)[number];
export type Industry = (typeof INDUSTRIES)[number];

export interface SimInputs {
  campaignName: string;
  product: string;
  productUrl: string;
  industry: Industry | '';
  audience: string;
  channel: Channel | '';
  budget: number;
  headline: string;
  primaryText: string;
  description: string;
  landingUrl: string;
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
  shareId: string;
  createdAt: string;
  inputs: SimInputs;
  results: SimResults;
}

export const EMPTY_INPUTS: SimInputs = {
  campaignName: '', product: '', productUrl: '', industry: '', audience: '', channel: '',
  budget: 2500, headline: '', primaryText: '', description: '', landingUrl: '',
};
