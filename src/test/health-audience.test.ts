import { describe, it, expect } from 'vitest';
import { sanitiseHealthAudience } from '../../services/advice-api/api/simulate';

const HEALTH = 'Health & wellness';

describe('health audience guard', () => {
  it('removes the exact advice the dental run gave', () => {
    const out = sanitiseHealthAudience(
      ['If sufficient first-party data is available, consider creating lookalike audiences based on existing patient lists.',
       'Target parents within 10km of the clinic.'],
      HEALTH,
    );
    expect(out.join(' ')).not.toMatch(/lookalike/i);
    expect(out[0]).toMatch(/Do not upload patient lists/);
    expect(out).toContain('Target parents within 10km of the clinic.');
  });

  it.each([
    'Build a lookalike from your customer list',
    'Upload your patient list to Meta',
    'Use Customer Match with your CRM data',
    'Create a seed audience from client data',
    'Leverage first-party data for similar audiences',
  ])('strips %s', (line) => {
    expect(sanitiseHealthAudience([line], HEALTH).some((a) => a === line)).toBe(false);
  });

  it('keeps website retargeting and interest targeting', () => {
    const safe = ['Retarget visitors who viewed the booking page.', 'Target interests: parenting, childcare.'];
    expect(sanitiseHealthAudience(safe, HEALTH)).toEqual(safe);
  });

  it('leaves other industries alone — an ecommerce list upload is legitimate', () => {
    const a = ['Build a lookalike from your customer list'];
    expect(sanitiseHealthAudience(a, 'Ecommerce')).toEqual(a);
  });

  it('survives an empty or missing list', () => {
    expect(sanitiseHealthAudience([], HEALTH)).toEqual([]);
  });
});
