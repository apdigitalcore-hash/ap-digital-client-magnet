import type { Simulation, SimInputs } from './types';

/**
 * The shape of an ad preview, independent of how it is drawn.
 *
 * The report renders it as HTML, the PDF draws it with jsPDF and the share
 * image paints it on a canvas. Deriving all three from one function is what
 * stops the three drifting — the truncation in particular is the point of the
 * preview, so it has to be identical everywhere.
 */
export type PreviewKind = 'feed' | 'search';

export type PreviewCard = {
  headline: string;
  primaryText: string;
  description: string;
  /** Set when the platform would cut the text off at this length. */
  truncated: boolean;
  displayUrl?: string;
};

/**
 * Which preview a channel gets. Anything not listed renders nothing at all —
 * showing a feed card for a LinkedIn or TikTok ad would be a different
 * platform's layout, which is worse than no preview.
 */
export function previewKind(channel: string): PreviewKind | null {
  if (channel === 'Meta/Facebook' || channel === 'Instagram') return 'feed';
  if (channel === 'Google Search Ads') return 'search';
  return null;
}

/**
 * How tall the creative may be, as width / height.
 *
 * Meta's feed shows anything from 1.91:1 down to 4:5 without cropping, so a
 * 4:5 image must be previewed at 4:5. Forcing everything to 1.91:1 cut the top
 * third off a portrait creative and showed a problem that would never happen.
 */
export const FEED_ASPECT = { widest: 1.91, tallest: 0.8 } as const;

/** The aspect to draw the creative at: its own, clamped to what the feed allows. */
export function creativeAspect(image?: { width?: number; height?: number }): number {
  const w = image?.width, h = image?.height;
  if (!w || !h) return 1.91; // unknown: the platform default
  return Math.min(FEED_ASPECT.widest, Math.max(FEED_ASPECT.tallest, w / h));
}

/** Where each surface stops showing text. Exceeding it is the useful signal. */
export const LIMITS = {
  feed: { primaryText: 125, headline: 40 },
  search: { headline: 30, description: 90 },
} as const;

const cut = (s: string, n: number) => (s.length > n ? { text: s.slice(0, n).trimEnd(), truncated: true } : { text: s, truncated: false });

/** Display URL as a search ad shows it: host and first path segment, no scheme. */
export function displayUrl(raw: string): string {
  if (!raw) return '';
  try {
    const u = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
    const seg = u.pathname.split('/').filter(Boolean)[0];
    return u.hostname.replace(/^www\./, '') + (seg ? ` › ${seg}` : '');
  } catch {
    return raw.replace(/^https?:\/\//i, '').split('/')[0];
  }
}

function card(kind: PreviewKind, headline: string, primaryText: string, description: string, landingUrl: string): PreviewCard {
  if (kind === 'search') {
    const h = cut(headline, LIMITS.search.headline);
    const d = cut(description || primaryText, LIMITS.search.description);
    return {
      headline: h.text,
      primaryText: '',
      description: d.text,
      truncated: h.truncated || d.truncated,
      displayUrl: displayUrl(landingUrl),
    };
  }
  const t = cut(primaryText, LIMITS.feed.primaryText);
  return { headline: headline.slice(0, 80), primaryText: t.text, description, truncated: t.truncated };
}

/** The pair the report compares: what they wrote, and what ADvice suggests. */
export function previewPair(sim: Simulation): { kind: PreviewKind; yours: PreviewCard; rewritten: PreviewCard; image?: SimInputs['image'] } | null {
  const kind = previewKind(sim.inputs.channel);
  if (!kind) return null;
  const i = sim.inputs;
  const r = sim.results.recommendations;
  return {
    kind,
    yours: card(kind, i.headline, i.primaryText, i.description, i.landingUrl),
    rewritten: card(kind, r.headline, r.primaryText, r.description, i.landingUrl),
    image: i.image,
  };
}
