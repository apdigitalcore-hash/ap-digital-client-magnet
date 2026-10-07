import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { runCount, bumpRunCount, gateState, FREE_TOTAL } from '@/advice/api';

const KEY = 'advice:runs';
const todayUTC = () => new Date().toISOString().slice(0, 10);

describe('daily run count', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => vi.useRealTimers());

  it('starts at zero', () => {
    expect(runCount()).toBe(0);
  });

  it('counts today and rolls over tomorrow', () => {
    bumpRunCount();
    bumpRunCount();
    expect(runCount()).toBe(2);
    localStorage.setItem(KEY, JSON.stringify({ d: '2020-01-01', n: 3 }));
    expect(runCount()).toBe(0);
  });

  it('does not carry a lifetime lockout forward', () => {
    // The bug: a bare number was a permanent count, so three runs ever meant
    // "that is your 3 for today" forever.
    localStorage.setItem(KEY, '7');
    expect(runCount()).toBe(0);
    expect(gateState()).not.toBe('limit');
  });

  it('still gates at the daily limit within one day', () => {
    for (let i = 0; i < FREE_TOTAL; i++) bumpRunCount();
    expect(runCount()).toBe(FREE_TOTAL);
    expect(gateState()).toBe('limit');
  });

  it('asks for an email after the first run, not before', () => {
    expect(gateState()).toBe('ok');
    bumpRunCount();
    expect(gateState()).toBe('email');
  });

  it('stores the day alongside the count', () => {
    bumpRunCount();
    expect(JSON.parse(localStorage.getItem(KEY)!)).toEqual({ d: todayUTC(), n: 1 });
  });

  it('survives unreadable storage', () => {
    localStorage.setItem(KEY, 'not json {');
    expect(() => runCount()).not.toThrow();
    expect(runCount()).toBe(0);
  });
});
