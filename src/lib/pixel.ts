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
    fbq?: (
      command: 'track' | 'trackCustom' | 'init',
      event: string,
      params?: PixelParams
    ) => void;
  }
}

const ready = () => typeof window !== 'undefined' && typeof window.fbq === 'function';

/** Standard Meta event (PageView, Contact, Lead, …). */
export function track(event: string, params: PixelParams = {}) {
  if (!ready()) return;
  window.fbq!('track', event, params);
}

/** Custom event — use for anything that is not a real conversion. */
export function trackCustom(event: string, params: PixelParams = {}) {
  if (!ready()) return;
  window.fbq!('trackCustom', event, params);
}
