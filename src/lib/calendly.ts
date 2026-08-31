import { useEffect } from 'react';
import { track } from './pixel';

/**
 * Calendly inline embed + booking-completion tracking.
 *
 * Why the inline embed rather than a confirmation redirect: redirecting to an
 * external site is a Calendly paid feature. The embed widget is available on
 * every plan, and it posts `calendly.event_scheduled` to the parent window when
 * a booking completes — so Lead fires on an actual booking rather than on a
 * click, and the visitor never leaves the page.
 */

const WIDGET_JS = 'https://assets.calendly.com/assets/external/widget.js';
const WIDGET_CSS = 'https://assets.calendly.com/assets/external/widget.css';

/** Only messages genuinely from Calendly may fire a conversion. */
const CALENDLY_ORIGIN = /^https:\/\/([a-z0-9-]+\.)?calendly\.com$/;

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

/**
 * Loads the widget assets and fires a Lead when Calendly reports a completed
 * booking. `niche` is attached so Events Manager can attribute the conversion
 * to the same vertical as the Contact click that preceded it.
 */
export function useCalendlyLeadTracking(niche?: string | null, source = 'free-pilot') {
  useEffect(() => {
    loadCalendlyAssets();
    initNewInlineWidgets();

    const onMessage = (e: MessageEvent) => {
      // Without this any embedded third-party frame could post a fake booking
      // and inflate the Lead count.
      if (!CALENDLY_ORIGIN.test(e.origin)) return;
      const data = e.data as { event?: unknown } | null;
      if (!data || typeof data.event !== 'string') return;

      if (data.event === 'calendly.event_scheduled') {
        track('Lead', {
          // content_name was hardcoded to 'free-pilot', so a booking made on
          // /book would have been attributed to a page the visitor never saw.
          content_name: source,
          content_category: niche || 'general',
        });
      }
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [niche, source]);
}
