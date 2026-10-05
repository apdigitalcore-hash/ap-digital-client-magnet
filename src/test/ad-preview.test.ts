import { describe, it, expect } from 'vitest';
import { previewKind, displayUrl, LIMITS, previewPair } from '@/advice/adPreview';
import type { Simulation } from '@/advice/types';

const sim = (channel: string, over = false): Simulation => ({
  id: 'x', createdAt: '2026-10-05T00:00:00.000Z',
  inputs: {
    campaignName: 'c', product: 'p', productUrl: '', industry: 'Local service', audience: 'a',
    channel: channel as Simulation['inputs']['channel'], objective: 'Leads', budget: 1000, currency: 'CAD',
    headline: 'A headline that is quite long for a search ad indeed',
    primaryText: over ? 'x'.repeat(200) : 'Short and tidy primary text.',
    description: 'A description that runs on well past ninety characters so that it must be cut somewhere sensible.',
    landingUrl: 'https://clinic.ca/book-online/page',
  },
  results: { recommendations: { headline: 'Rewritten headline', primaryText: 'Rewritten text.', description: 'Rewritten description.' } } as Simulation['results'],
});

describe('ad preview', () => {
  it('gives Meta and Instagram a feed card', () => {
    expect(previewKind('Meta/Facebook')).toBe('feed');
    expect(previewKind('Instagram')).toBe('feed');
  });

  it('gives Google Search a search card', () => {
    expect(previewKind('Google Search Ads')).toBe('search');
  });

  it('shows nothing for channels without a built preview', () => {
    for (const c of ['TikTok', 'LinkedIn', 'Google Display']) expect(previewKind(c)).toBeNull();
    expect(previewPair(sim('TikTok'))).toBeNull();
  });

  it('truncates Meta primary text where the feed does', () => {
    const p = previewPair(sim('Meta/Facebook', true))!;
    expect(p.yours.primaryText.length).toBeLessThanOrEqual(LIMITS.feed.primaryText);
    expect(p.yours.truncated).toBe(true);
  });

  it('leaves short text alone', () => {
    const p = previewPair(sim('Meta/Facebook'))!;
    expect(p.yours.truncated).toBe(false);
    expect(p.yours.primaryText).toBe('Short and tidy primary text.');
  });

  it('cuts a search headline at 30 characters', () => {
    const p = previewPair(sim('Google Search Ads'))!;
    expect(p.yours.headline.length).toBeLessThanOrEqual(30);
    expect(p.yours.truncated).toBe(true);
  });

  it('formats the display URL without a scheme', () => {
    expect(displayUrl('https://www.clinic.ca/book-online/page')).toBe('clinic.ca › book-online');
    expect(displayUrl('clinic.ca')).toBe('clinic.ca');
    expect(displayUrl('')).toBe('');
  });

  it('carries the uploaded image through to both cards', () => {
    const s = sim('Meta/Facebook');
    s.inputs.image = { data: 'abc', mime: 'image/jpeg' };
    expect(previewPair(s)!.image?.data).toBe('abc');
  });
});
