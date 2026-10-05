import { describe, it, expect, beforeEach } from 'vitest';
import { recordTouch, attributionFields } from '@/lib/attribution';

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
    setReferrer('https://chatgpt.com/');
    recordTouch('/advice', '');
    expect(attributionFields()['traffic-source']).toContain('chatgpt.com / referral');

    localStorage.clear();
    setReferrer(`https://${location.hostname}/blog`);
    recordTouch('/advice', '');
    expect(attributionFields()).toEqual({ 'traffic-source': 'direct / none recorded' });
  });

  it('does not throw when storage is unavailable', () => {
    const orig = Storage.prototype.setItem;
    Storage.prototype.setItem = () => { throw new Error('blocked'); };
    expect(() => recordTouch('/advice', '?utm_source=x&utm_medium=y')).not.toThrow();
    Storage.prototype.setItem = orig;
  });
});
