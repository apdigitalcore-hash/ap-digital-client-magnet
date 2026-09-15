/**
 * Meta Pixel helpers.
 *
 * The pixel base in index.html only initialises on the production hostname, so
 * `window.fbq` is undefined in dev and in Lovable previews. Every call here
 * guards on that, which makes tracking calls silent no-ops off production
 * rather than crashes — and keeps test traffic out of the dataset.
 */

type PixelParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (
      command: 'track' | 'trackCustom' | 'init',
      event: string,
      params?: PixelParams
    ) => void;
  }
}

const ready = () => typeof window !== 'undefined' && typeof window.fbq === 'function';

/**
 * Standard Meta event (PageView, Contact, Lead, …).
 *
 * Params are omitted entirely when empty rather than sent as `{}` — Events
 * Manager was tagging a bare PageView as "Custom event", and an empty payload
 * is the most likely reason fbq would not match it to the standard signature.
 */
// Conversions are mirrored into GA4 so Analytics can answer the question Meta
// cannot: which organic page produced the booking. Only real conversions are
// mirrored — PageView stays Meta-only, since GA4 records page views itself.
const GA4_EVENT: Record<string, string> = { Lead: 'generate_lead', Contact: 'contact' };

export function track(event: string, params?: PixelParams) {
  const ga = GA4_EVENT[event];
  if (ga && typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', ga, params ?? {});
  }
  if (!ready()) return;
  if (params && Object.keys(params).length > 0) {
    window.fbq!('track', event, params);
  } else {
    window.fbq!('track', event);
  }
}

/** Custom event — use for anything that is not a real conversion. */
export function trackCustom(event: string, params?: PixelParams) {
  if (!ready()) return;
  if (params && Object.keys(params).length > 0) {
    window.fbq!('trackCustom', event, params);
  } else {
    window.fbq!('trackCustom', event);
  }
}
