import { useCallback, useEffect, useRef } from 'react';
import { track } from './pixel';

/**
 * Calendly popup + booking-completion tracking.
 *
 * Why the popup rather than a confirmation redirect: redirecting to an external
 * site is a Calendly paid feature. The embed widget is available on every plan,
 * and it posts `calendly.event_scheduled` to the parent window when a booking
 * completes — so Lead fires on an actual booking rather than on a click, which
 * is the more accurate signal regardless of plan.
 */

const WIDGET_JS = 'https://assets.calendly.com/assets/external/widget.js';
const WIDGET_CSS = 'https://assets.calendly.com/assets/external/widget.css';

/** Only messages genuinely from Calendly may fire a conversion. */
const CALENDLY_ORIGIN = /^https:\/\/([a-z0-9-]+\.)?calendly\.com$/;

declare global {
  interface Window {
    Calendly?: { initPopupWidget: (opts: { url: string }) => void };
  }
}

let assetsRequested = false;

function loadAssets() {
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

export function useCalendlyPopup(niche?: string | null) {
  const nicheRef = useRef(niche);
  nicheRef.current = niche;

  useEffect(() => {
    loadAssets();

    const onMessage = (e: MessageEvent) => {
      // Without this any page embedded in an iframe could post a fake booking
      // and inflate the Lead count.
      if (!CALENDLY_ORIGIN.test(e.origin)) return;
      const data = e.data as { event?: unknown } | null;
      if (!data || typeof data.event !== 'string') return;

      if (data.event === 'calendly.event_scheduled') {
        track('Lead', {
          content_name: 'free-pilot',
          content_category: nicheRef.current || 'general',
        });
      }
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  /**
   * Returns true if the popup opened. False means Calendly's script has not
   * loaded (slow network, blocker), and the caller should let the plain link
   * through so booking still works — just without on-page Lead tracking.
   */
  return useCallback((url: string) => {
    if (typeof window === 'undefined' || !window.Calendly) return false;
    window.Calendly.initPopupWidget({ url });
    return true;
  }, []);
}
