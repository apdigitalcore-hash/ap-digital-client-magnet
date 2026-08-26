import { useEffect, useRef } from 'react';

/**
 * Google Preferred Sources button.
 *
 * Google shipped this on 2026-08-20. When a reader adds us, our pages carry a
 * "preferred" badge for them in Top Stories, AI Mode and AI Overviews — the one
 * ranking lever the reader pulls rather than the algorithm.
 *
 * Eligibility is domain or subdomain level only, and the test is whether the
 * site is listed in Google's source preferences tool. Verified 2026-08-25:
 * ap-digital.ca is listed.
 *
 * Two things this has to work around:
 *
 * 1. The library auto-scans the DOM once, on load. It is loaded async in the
 *    head while this container is rendered by React afterwards, so on a cold
 *    load the scan finds nothing and the button silently never appears. The
 *    PREFERRED_SOURCE callback queue exists for exactly this — it runs whether
 *    the library has loaded yet or not, so init() happens after mount either
 *    way.
 * 2. The library stamps `width: 100%` on its own container, which resolves to
 *    zero inside an auto-width flex child. The explicit width below is what
 *    keeps the button from rendering invisibly.
 */

type PreferredSourceApi = {
  init: (opts: { theme?: 'light' | 'dark'; lang?: string }) => void;
};

declare global {
  interface Window {
    PREFERRED_SOURCE?: Array<(api: PreferredSourceApi) => void>;
  }
}

const PreferredSourceButton = ({ className = '' }: { className?: string }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    // Already rendered by the library's own scan — nothing to do.
    if (!el || el.getAttribute('data-initialized') === 'true') return;

    window.PREFERRED_SOURCE = window.PREFERRED_SOURCE || [];
    window.PREFERRED_SOURCE.push((api) => {
      try {
        api.init({ theme: 'light', lang: 'en' });
      } catch {
        // Leaves the noscript deeplink below as the fallback.
      }
    });
  }, []);

  return (
    <div className={`w-[260px] shrink-0 ${className}`}>
      <div ref={ref} google-add-preferred-source-btn="" data-lang="en" />
      <noscript>
        <a
          href="https://www.google.com/preferences/source?q=ap-digital.ca"
          className="text-sm text-foreground underline underline-offset-4"
        >
          Add AP Digital as a preferred source on Google
        </a>
      </noscript>
    </div>
  );
};

export default PreferredSourceButton;
