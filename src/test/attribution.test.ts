import { describe, it, expect, beforeEach } from 'vitest';
import { recordTouch, attributionFields, calendlyUtmParams } from '@/lib/attribution';

const setReferrer = (v: string) =>
  Object.defineProperty(document, 'referrer', { value: v, configurable: true });

describe('attribution', () => {
  beforeEach(() => {
    localStorage.clear();
    setReferrer('');
  });

  it('reports direct when nothing was ever recorded', () => {
    expect(attributionFields()).toEqual({ 'traffic-source': 'direct / none recorded' });
  });

  it('records a UTM landing', () => {
    recordTouch('/advice', '?utm_source=linkedin&utm_medium=social&utm_campaign=launch');
    const f = attributionFields();
    expect(f['traffic-source']).toContain('linkedin / social');
    expect(f['first-campaign']).toContain('utm_campaign=launch');
  });

  it('survives internal navigation to a clean URL', () => {
    recordTouch('/advice', '?utm_source=linkedin&utm_medium=social');
    recordTouch('/advice/simulate', '');
    expect(attributionFields()['traffic-source']).toContain('linkedin / social');
  });

  it('keeps the first touch when a later campaign arrives', () => {
    recordTouch('/advice', '?utm_source=linkedin&utm_medium=social');
    recordTouch('/pricing', '?gclid=abc123');
    const f = attributionFields();
    expect(f['traffic-source']).toContain('google / cpc');
    expect(f['first-seen']).toContain('linkedin / social');
  });

  it('treats a bare click id as paid', () => {
    recordTouch('/', '?fbclid=xyz');
    expect(attributionFields()['traffic-source']).toContain('facebook / cpc');
  });

  it('records an external referrer but ignores our own', () => {
    setReferrer('https://clutch.co/profile/ap-digital');
    recordTouch('/advice', '');
    expect(attributionFields()['traffic-source']).toContain('clutch.co / referral');

    localStorage.clear();
    setReferrer(`https://${location.hostname}/blog`);
    recordTouch('/advice', '');
    expect(attributionFields()).toEqual({ 'traffic-source': 'direct / none recorded' });
  });

  describe('AI referrers', () => {
    it.each([
      ['chatgpt.com', 'chatgpt'],
      ['chat.openai.com', 'chatgpt'],
      ['gemini.google.com', 'gemini'],
      ['bard.google.com', 'gemini'],
      ['perplexity.ai', 'perplexity'],
      ['copilot.microsoft.com', 'copilot'],
      ['claude.ai', 'claude'],
    ])('files %s as %s / ai', (host, source) => {
      setReferrer(`https://${host}/`);
      recordTouch('/advice', '');
      expect(attributionFields()['traffic-source']).toContain(`${source} / ai`);
    });

    it('beats the generic referrer rule for google hosts', () => {
      setReferrer('https://gemini.google.com/app');
      recordTouch('/advice', '');
      const s = attributionFields()['traffic-source'];
      expect(s).toContain('gemini / ai');
      expect(s).not.toContain('referral');
    });

    it('leaves plain google search alone, so AI Overviews stay organic', () => {
      setReferrer('https://www.google.com/');
      recordTouch('/advice', '');
      const s = attributionFields()['traffic-source'];
      expect(s).toContain('google.com / referral');
      expect(s).not.toContain('ai');
    });

    it('still lets an explicit utm_source win', () => {
      setReferrer('https://chatgpt.com/');
      recordTouch('/advice', '?utm_source=newsletter&utm_medium=email');
      expect(attributionFields()['traffic-source']).toContain('newsletter / email');
    });
  });

  describe('calendly parameters', () => {
    it('is empty for a visitor with no recorded touch', () => {
      expect(calendlyUtmParams()).toEqual({});
    });

    it('sends the last touch in the grouping slots and the first in content', () => {
      setReferrer('https://chatgpt.com/');
      recordTouch('/advice', '');
      setReferrer('');
      recordTouch('/pricing', '?utm_source=linkedin&utm_medium=social&utm_campaign=launch');
      const p = calendlyUtmParams();
      expect(p.utm_source).toBe('linkedin');
      expect(p.utm_medium).toBe('social');
      expect(p.utm_campaign).toBe('launch');
      expect(p.utm_content).toContain('first:chatgpt / ai');
    });

    it('falls back to the landing path when there is no campaign', () => {
      setReferrer('https://perplexity.ai/');
      recordTouch('/advice', '');
      expect(calendlyUtmParams().utm_campaign).toBe('/advice');
    });
  });

  it('reads a record written by the first version of this file', () => {
    localStorage.setItem('ap_attr_first', JSON.stringify({
      source: 'linkedin / social', referrer: '(none)', landing: '/advice', at: '2026-10-01T00:00:00.000Z',
    }));
    localStorage.setItem('ap_attr_last', JSON.stringify({
      source: 'chatgpt.com / referral', referrer: 'https://chatgpt.com/', landing: '/advice', at: '2026-10-02T00:00:00.000Z',
    }));
    const p = calendlyUtmParams();
    expect(p.utm_source).toBe('chatgpt.com');
    expect(p.utm_medium).toBe('referral');
    expect(p.utm_content).toBe('first:linkedin / social@2026-10-01');
    expect(p.utm_content).not.toContain('undefined');
  });

  it('does not throw when storage is unavailable', () => {
    const orig = Storage.prototype.setItem;
    Storage.prototype.setItem = () => { throw new Error('blocked'); };
    expect(() => recordTouch('/advice', '?utm_source=x&utm_medium=y')).not.toThrow();
    Storage.prototype.setItem = orig;
  });
});
