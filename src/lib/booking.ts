import { track } from '@/lib/pixel';

/**
 * Booking conversion, fired once per session whichever path the booking takes.
 *
 * There are two possible signals that a call was booked, and which one exists
 * depends on the Calendly plan:
 *
 *  - the inline embed's `calendly.event_scheduled` postMessage, which works on
 *    every plan but only sees bookings made through the widget on our own site;
 *  - the event type's confirmation redirect to /thank-you, which also covers
 *    bookings made from a direct calendly.com link, but is a **paid** feature.
 *
 * Both have been the sole source at different times, and each failed in its own
 * way. Wiring both to the listener double-counted every embed booking — one
 * booking and two Leads on 29 Sep and 4 Oct. Removing the listener in favour of
 * the redirect alone then counted nothing at all, because the account is on the
 * free plan and the redirect cannot be configured, so /thank-you is unreachable.
 *
 * So both paths now call this, and the session guard makes that safe: whichever
 * fires first wins and the other is a no-op. Enabling or losing the paid
 * redirect changes the coverage, never the count.
 */

const ONCE_KEY = 'ap_booking_lead_sent';

type BookingSource = 'embed' | 'redirect';

export function trackBookingLead(source: BookingSource) {
  // Storage can throw in private mode or with site data blocked. If it does we
  // fall through and still fire, because an occasional double count is a much
  // smaller problem than silently losing the only conversion the site has.
  try {
    if (sessionStorage.getItem(ONCE_KEY)) return;
    sessionStorage.setItem(ONCE_KEY, '1');
  } catch {
    /* no-op */
  }

  track('Lead', { content_name: 'booking', content_category: source });
}

/** Exposed for tests, which need a clean slate between cases. */
export const BOOKING_LEAD_ONCE_KEY = ONCE_KEY;
