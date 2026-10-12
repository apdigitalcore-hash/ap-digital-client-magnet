import { describe, it, expect } from 'vitest';
import { sanitiseHousingAudience, sanitiseAudience } from '../../services/advice-api/api/simulate';

const RE = 'Real estate';

describe('housing audience guard', () => {
  it('strips the targeting the site itself used to promise realtors', () => {
    const out = sanitiseHousingAudience(
      ['Target people likely to sell based on home ownership duration, equity position, and life events.',
       'Promote the listing to people interested in moving to Burnaby.'],
      RE,
    );
    expect(out.join(' ')).not.toMatch(/equity position/i);
    expect(out[0]).toMatch(/housing category/);
    expect(out).toContain('Promote the listing to people interested in moving to Burnaby.');
  });

  it.each([
    'Build a lookalike from your past buyer list',
    'Target postal code V5H and the surrounding blocks',
    'Narrow to ZIP code level around the listing',
    'Target homeowners aged 35-55 within 2km',
    'Focus on women aged 30 to 45 in Richmond',
    'Use Customer Match with your CRM data',
    'Layer household income above $150k',
    'Reach people likely to move in the next six months',
  ])('strips %s', (line) => {
    expect(sanitiseHousingAudience([line], RE)).not.toContain(line);
  });

  it.each([
    'Target people searching for homes in East Vancouver.',
    'Run a wide radius around the neighbourhood and name it in the headline.',
    'Retarget visitors to the listing page from your own website pixel.',
  ])('keeps compliant line %s', (line) => {
    expect(sanitiseHousingAudience([line], RE)).toEqual([line]);
  });

  it('leaves other industries untouched', () => {
    const line = ['Build a lookalike from your customer list'];
    expect(sanitiseHousingAudience(line, 'Ecommerce')).toEqual(line);
    expect(sanitiseHousingAudience(line, 'Local service')).toEqual(line);
  });

  it('dispatcher applies the right guard per industry', () => {
    const lookalike = ['Build a lookalike from your patient list'];
    expect(sanitiseAudience(lookalike, 'Health & wellness')[0]).toMatch(/Do not upload patient lists/);
    expect(sanitiseAudience(['Target postal code V6B'], RE)[0]).toMatch(/housing category/);
    expect(sanitiseAudience(lookalike, 'SaaS')).toEqual(lookalike);
  });
});
