import { useEffect } from 'react';

import { trackBookingLead } from '@/lib/booking';

/**
 * Calendly inline embed.
 *
 * This fires the booking Lead from the widget's `calendly.event_scheduled`
 * message. /thank-you fires the same conversion for bookings that arrive via
 * the event type's confirmation redirect; `trackBookingLead` dedupes across
 * both, so running the pair cannot double-count the way it did on 29 Sep and
 * 4 Oct.
 *
 * The listener is load-bearing on the current plan. The confirmation redirect
 * is a paid Calendly feature and the account is on the free tier, so /thank-you
 * is unreachable after a booking and this message is the only evidence a call
 * was ever booked. See src/lib/booking.ts.
 */

const WIDGET_JS = 'https://assets.calendly.com/assets/external/widget.js';
const WIDGET_CSS = 'https://assets.calendly.com/assets/external/widget.css';

let assetsRequested = false;

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (opts: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

export function loadCalendlyAssets() {
  if (assetsRequested || typeof document === 'undefined') return;
  assetsRequested = true;

  if (!document.querySelector(`link[href="${WIDGET_CSS}"]`)) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = WIDGET_CSS;
    document.head.appendChild(link);
  }
  if (!document.querySelector(`script[src="${WIDGET_JS}"]`)) {
    const script = document.createElement('script');
    script.src = WIDGET_JS;
    script.async = true;
    document.head.appendChild(script);
  }
}

/**
 * widget.js only auto-initializes `.calendly-inline-widget` elements that exist
 * when the script first executes. In this SPA the booking routes unmount and
 * remount without a page reload, so on a repeat visit the script is already
 * loaded, never re-runs, and the freshly mounted div stays an empty grey box.
 * This explicitly initializes any widget that hasn't been initialized yet,
 * once `window.Calendly` is available.
 */
function initNewInlineWidgets() {
  const init = () => {
    document
      .querySelectorAll<HTMLElement>('.calendly-inline-widget[data-url]')
      .forEach((el) => {
        // Calendly replaces the div's children when it initializes; an iframe
        // child means this element is already live.
        if (el.querySelector('iframe')) return;
        window.Calendly?.initInlineWidget({
          url: el.dataset.url as string,
          parentElement: el,
        });
      });
  };

  if (window.Calendly) {
    init();
    return;
  }
  const script = document.querySelector(`script[src="${WIDGET_JS}"]`);
  if (script) {
    script.addEventListener('load', init, { once: true });
  } else {
    // Assets were consumed by an earlier visit but the script tag is gone
    // (shouldn't happen) — poll briefly for the global instead.
    let attempts = 0;
    const timer = window.setInterval(() => {
      attempts += 1;
      if (window.Calendly) {
        window.clearInterval(timer);
        init();
      } else if (attempts > 50) {
        window.clearInterval(timer);
      }
    }, 100);
  }
}

const CALENDLY_ORIGIN = 'https://calendly.com';

/**
 * Calendly posts its widget events up to the parent frame. The origin check is
 * not optional: without it any page that can reach this window could post a
 * fake booking and manufacture a conversion.
 */
function isEventScheduled(e: MessageEvent): boolean {
  if (e.origin !== CALENDLY_ORIGIN) return false;
  const data = e.data as { event?: unknown } | null;
  return !!data && typeof data === 'object' && data.event === 'calendly.event_scheduled';
}

/** Loads the Calendly widget assets and mounts any inline embed on the page. */
export function useCalendlyEmbed() {
  useEffect(() => {
    loadCalendlyAssets();
    initNewInlineWidgets();

    const onMessage = (e: MessageEvent) => {
      if (isEventScheduled(e)) trackBookingLead('embed');
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);
}
