import { describe, it, expect } from 'vitest';
import {
  CHANNELS, OBJECTIVES, OBJECTIVES_BY_CHANNEL, CONVERSION_NOUN, EMPTY_INPUTS,
  type Objective,
} from '@/advice/types';

describe('campaign objective', () => {
  it('defaults to Leads so the form gains no required step', () => {
    expect(EMPTY_INPUTS.objective).toBe('Leads');
  });

  it('offers every channel at least one objective, all of them real', () => {
    for (const c of CHANNELS) {
      const list = OBJECTIVES_BY_CHANNEL[c];
      expect(list.length).toBeGreaterThan(0);
      for (const o of list) expect(OBJECTIVES).toContain(o);
    }
  });

  it('does not offer Messages on channels that cannot be bought on it', () => {
    expect(OBJECTIVES_BY_CHANNEL['Google Search Ads']).not.toContain('Messages');
    expect(OBJECTIVES_BY_CHANNEL.LinkedIn).not.toContain('Messages');
    expect(OBJECTIVES_BY_CHANNEL['Meta/Facebook']).toContain('Messages');
  });

  it('names the conversion for every objective that has one', () => {
    for (const o of OBJECTIVES) {
      const noun = CONVERSION_NOUN[o];
      if (noun) {
        expect(noun.cost).toMatch(/^Cost per /);
        expect(noun.many).not.toBe('');
      }
    }
  });

  it('has no conversion step for traffic or awareness', () => {
    expect(CONVERSION_NOUN['Website traffic']).toBeNull();
    expect(CONVERSION_NOUN['Brand awareness']).toBeNull();
  });

  it('labels a Messages campaign as conversations, not leads', () => {
    expect(CONVERSION_NOUN.Messages?.cost).toBe('Cost per conversation');
    expect(CONVERSION_NOUN.Leads?.cost).toBe('Cost per lead');
  });

  it('treats a report saved before this field existed as Leads', () => {
    const legacy = { objective: '' } as { objective: Objective | '' };
    expect(CONVERSION_NOUN[(legacy.objective || 'Leads') as Objective]?.cost).toBe('Cost per lead');
  });
});
