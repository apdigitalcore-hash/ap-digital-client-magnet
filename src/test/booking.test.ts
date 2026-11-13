import { describe, it, expect, beforeEach, vi } from 'vitest';

import { trackBookingLead, BOOKING_LEAD_ONCE_KEY } from '@/lib/booking';
import { track } from '@/lib/pixel';

vi.mock('@/lib/pixel', () => ({ track: vi.fn() }));

const mockTrack = vi.mocked(track);

describe('trackBookingLead', () => {
  beforeEach(() => {
    mockTrack.mockClear();
    sessionStorage.removeItem(BOOKING_LEAD_ONCE_KEY);
  });

  it('fires a Lead for a booking made through the embed', () => {
    trackBookingLead('embed');

    expect(mockTrack).toHaveBeenCalledTimes(1);
    expect(mockTrack).toHaveBeenCalledWith('Lead', {
      content_name: 'booking',
      content_category: 'embed',
    });
  });

  // The regression that removed the listener on 4 Oct: the embed message and
  // the /thank-you redirect both firing for a single booking.
  it('counts a booking once when both the embed and the redirect fire', () => {
    trackBookingLead('embed');
    trackBookingLead('redirect');

    expect(mockTrack).toHaveBeenCalledTimes(1);
  });

  it('still counts the booking when only the redirect fires', () => {
    trackBookingLead('redirect');

    expect(mockTrack).toHaveBeenCalledTimes(1);
    expect(mockTrack).toHaveBeenCalledWith('Lead', {
      content_name: 'booking',
      content_category: 'redirect',
    });
  });

  it('counts a genuinely separate booking in a new session', () => {
    trackBookingLead('embed');
    sessionStorage.removeItem(BOOKING_LEAD_ONCE_KEY);
    trackBookingLead('embed');

    expect(mockTrack).toHaveBeenCalledTimes(2);
  });

  it('still fires when sessionStorage is unavailable', () => {
    const getItem = vi
      .spyOn(Storage.prototype, 'getItem')
      .mockImplementation(() => {
        throw new Error('blocked');
      });

    trackBookingLead('embed');

    expect(mockTrack).toHaveBeenCalledTimes(1);
    getItem.mockRestore();
  });
});
