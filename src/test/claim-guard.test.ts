import { describe, it, expect } from 'vitest';
import { findInventedClaims } from '../../services/advice-api/api/simulate';

// The dental run that prompted this: the advertiser said only that the
// practice accepts the Canadian Dental Care Plan.
const DENTAL = 'Pediatric dental clinic in Langley. We accept the Canadian Dental Care Plan. Parents of children under 12.';

describe('claim guard', () => {
  it('catches the free claim the dental run invented', () => {
    const found = findInventedClaims(
      { headline: 'Free Kids Dental? CDCP Accepted!', primaryText: "Your child's check-up & cleaning could be FREE" },
      DENTAL,
    );
    expect(found.length).toBe(2);
    expect(found.join(' ')).toContain('free or no-cost claim');
  });

  it('catches the superlative the dental run invented', () => {
    expect(findInventedClaims({ description: "Langley's Top Pediatric Dentists" }, DENTAL).join(' '))
      .toContain('superlative or ranking');
  });

  it.each([
    ['Guaranteed results in 30 days', 'a guarantee'],
    ['Cleanings from $99', 'a price or discount'],
    ['Trusted by 2,000+ patients', 'a statistic'],
    ['Pain-free dentistry for kids', 'a health outcome claim'],
  ])('flags %s', (headline, label) => {
    expect(findInventedClaims({ headline }, DENTAL).join(' ')).toContain(label);
  });

  it('allows a claim the advertiser already made themselves', () => {
    const supplied = 'Free consultation for new patients. We are the best rated clinic in Langley.';
    expect(findInventedClaims({ headline: 'Free consultation — book today' }, supplied)).toEqual([]);
    expect(findInventedClaims({ description: 'Best rated in Langley' }, supplied)).toEqual([]);
  });

  it('leaves an honest rewrite alone', () => {
    expect(findInventedClaims(
      { headline: 'Langley kids dentist, CDCP accepted', primaryText: 'We bill the Canadian Dental Care Plan directly.' },
      DENTAL,
    )).toEqual([]);
  });

  it('ignores empty and missing fields', () => {
    expect(findInventedClaims({ headline: '', description: undefined }, DENTAL)).toEqual([]);
  });
});
