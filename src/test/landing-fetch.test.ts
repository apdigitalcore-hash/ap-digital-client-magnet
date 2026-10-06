import { describe, it, expect } from 'vitest';
import { findHandoff, clientRedirect } from '../../services/advice-api/api/simulate';

describe('conversion handoff', () => {
  it('spots a booking system on another domain', () => {
    const html = `<a href="https://glowdental.nexhealth.com/book">Book online</a>`;
    expect(findHandoff(html, 'glowpediatricdentistry.com')).toEqual(['glowdental.nexhealth.com']);
  });

  it('spots an embedded scheduler', () => {
    const html = `<iframe src="https://calendly.com/clinic/checkup"></iframe>`;
    expect(findHandoff(html, 'clinic.ca')).toEqual(['calendly.com']);
  });

  it('ignores booking on the advertiser’s own domain and subdomains', () => {
    const html = `<a href="https://book.clinic.ca/appointments">Book</a><form action="https://clinic.ca/submit">`;
    expect(findHandoff(html, 'clinic.ca')).toEqual([]);
  });

  it('ignores ordinary external links that are not schedulers', () => {
    const html = `<a href="https://facebook.com/clinic">Follow us</a><a href="https://maps.google.com/x">Map</a>`;
    expect(findHandoff(html, 'clinic.ca')).toEqual([]);
  });

  it('catches a booking vendor no list has heard of, by what the link says', () => {
    // The real failure: recallmax and flexbook were on no list, and the report
    // praised the button instead of warning about it.
    const html = `<a href="https://can9.recallmax.com/x">Book Online at Langley Location</a>`;
    expect(findHandoff(html, 'glowpediatricdentistry.ca')).toEqual(['can9.recallmax.com']);
  });

  it('catches booking intent in the URL when the link has no text', () => {
    const html = `<a href="https://flexbook.me/appointment"><img src="/btn.png"></a>`;
    expect(findHandoff(html, 'clinic.ca')).toEqual(['flexbook.me']);
  });

  it('does not flag social, maps or review links that say book', () => {
    const html = `
      <a href="https://facebook.com/clinic">Book via Messenger</a>
      <a href="https://maps.google.com/x">Book directions</a>
      <a href="https://yelp.com/biz/clinic">Book a table</a>`;
    expect(findHandoff(html, 'clinic.ca')).toEqual([]);
  });

  it('does not flag ordinary outbound links', () => {
    const html = `<a href="https://cda-adc.ca/oral-health">Oral health advice</a>`;
    expect(findHandoff(html, 'clinic.ca')).toEqual([]);
  });

  it('does not repeat the same host', () => {
    const html = `<a href="https://janeapp.com/a">A</a><a href="https://janeapp.com/b">B</a>`;
    expect(findHandoff(html, 'clinic.ca')).toEqual(['janeapp.com']);
  });
});

describe('client-side redirect', () => {
  const base = new URL('https://example.com/book-online/');

  it('reads the JS redirect that made the dental page unreadable', () => {
    const html = `<html><head><script>window.onload=function(){window.location.href="/lander"}</script></head></html>`;
    expect(clientRedirect(html, base)?.href).toBe('https://example.com/lander');
  });

  it('reads a meta refresh', () => {
    expect(clientRedirect(`<meta http-equiv="refresh" content="0; url=/next">`, base)?.href)
      .toBe('https://example.com/next');
  });

  it('returns null for a normal page', () => {
    expect(clientRedirect('<html><body><h1>Book online</h1></body></html>', base)).toBeNull();
  });
});
