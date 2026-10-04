import { useEffect } from 'react';

/**
 * Calendly inline embed.
 *
 * This file used to fire Lead on the widget's `calendly.event_scheduled`
 * message. The event type also has a confirmation redirect to /thank-you,
 * which fires its own Lead, so every booking was counted twice — confirmed in
 * the pixel data on 29 Sep and 4 Oct, one booking and two Leads each day.
 *
 * /thank-you is now the only place a booking Lead fires. It has the better
 * coverage of the two: the redirect runs for bookings made through a direct
 * calendly.com link as well as through this embed, which the message listener
 * never saw.
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

/** Loads the Calendly widget assets and mounts any inline embed on the page. */
export function useCalendlyEmbed() {
  useEffect(() => {
    loadCalendlyAssets();
    initNewInlineWidgets();
  }, []);
}
