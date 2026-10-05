/**
 * Where a visitor came from, recorded at landing rather than at submit.
 *
 * UTMs live in the URL of the page someone arrives on. By the time they run a
 * simulation and save their email they are on /advice/report with a clean URL,
 * so reading the query string at submit time reports nothing. `document.referrer`
 * has the same problem in reverse: it is set once per document load, so after a
 * client-side navigation it still names the external site — right for the first
 * page, but it will not tell you which campaign brought them.
 *
 * So the touch is recorded on every route change and kept in storage. Two of
 * them are worth having:
 *
 *   first  — the very first visit this browser ever made. Answers "what
 *            originally found us", which is what a content cluster is judged on.
 *   last   — the most recent visit that carried a campaign or an outside
 *            referrer. Answers "what brought them back to convert".
 *
 * Direct visits deliberately do not overwrite `last`: someone who arrives from
 * an ad, leaves, then types the URL a day later was still produced by the ad.
 */

const FIRST_KEY = 'ap_attr_first';
const LAST_KEY = 'ap_attr_last';

export type Touch = {
  /** "chatgpt", "google", "linkedin" … */
  source: string;
  /** "ai", "cpc", "referral", "social" … */
  medium: string;
  referrer: string;
  landing: string;
  at: string;
  utm?: Record<string, string>;
};

/** "chatgpt / ai" */
export const label = (t: Touch) => `${t.source} / ${t.medium}`;

/**
 * Assistants that send traffic, matched before the generic referrer rule.
 *
 * Without this they fall through to "<host> / referral" and sit among ordinary
 * referrers, so the channel is only legible to someone who already knows which
 * hostnames are assistants. Google's own assistants matter most here:
 * gemini.google.com and bard.google.com would otherwise read as just another
 * google host.
 *
 * Bare google.com is deliberately absent. AI Overviews link out with a plain
 * google.com referrer and no marker, so counting that as AI would relabel
 * ordinary organic search.
 */
const AI_REFERRERS: Record<string, string> = {
  'chatgpt.com': 'chatgpt',
  'chat.openai.com': 'chatgpt',
  'openai.com': 'chatgpt',
  'gemini.google.com': 'gemini',
  'bard.google.com': 'gemini',
  'perplexity.ai': 'perplexity',
  'copilot.microsoft.com': 'copilot',
  'claude.ai': 'claude',
  'you.com': 'you.com',
  'poe.com': 'poe',
};

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
const CLICK_IDS = ['gclid', 'gbraid', 'wbraid', 'fbclid', 'msclkid', 'ttclid', 'li_fat_id'];

// Private mode and blocked site data both throw rather than return null, and a
// lead is worth more than its attribution, so every access is guarded.
const read = (k: string): Touch | null => {
  try {
    const raw = localStorage.getItem(k);
    if (!raw) return null;
    const t = JSON.parse(raw) as Partial<Touch>;
    if (!t.source) return null;
    // The first version of this stored source and medium as one "a / b"
    // string. Anyone who visited while that shipped still carries it, and
    // reading it as-is produced "linkedin / social / undefined". Split it.
    if (!t.medium) {
      const [source, medium] = t.source.split(' / ');
      return { ...t, source, medium: medium ?? 'unknown' } as Touch;
    }
    return t as Touch;
  } catch {
    return null;
  }
};
const write = (k: string, t: Touch) => {
  try {
    localStorage.setItem(k, JSON.stringify(t));
  } catch {
    /* nothing to do — the lead still sends, just without this field */
  }
};

const host = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
};

/** Builds the touch for the page being viewed, or null if it carries no signal. */
function currentTouch(search: string, pathname: string): Touch | null {
  const params = new URLSearchParams(search);
  const utm: Record<string, string> = {};
  for (const k of [...UTM_KEYS, ...CLICK_IDS]) {
    const v = params.get(k);
    if (v) utm[k] = v.slice(0, 200);
  }

  const ref = typeof document !== 'undefined' ? document.referrer : '';
  const refHost = host(ref);
  const selfHost = typeof location !== 'undefined' ? location.hostname.replace(/^www\./, '') : '';
  const external = refHost && refHost !== selfHost;

  // Order matters. An explicit utm_source is a deliberate statement and wins.
  // Assistants come next, ahead of the generic referrer rule, so they get
  // their own label rather than disappearing into "<host> / referral". Click
  // ids follow: they mark a paid click, which no referrer can tell you.
  let source: string;
  let medium: string;
  const ai = external ? AI_REFERRERS[refHost] : undefined;

  if (utm.utm_source) {
    source = utm.utm_source;
    medium = utm.utm_medium ?? 'unknown';
  } else if (ai) {
    source = ai;
    medium = 'ai';
  } else if (utm.gclid || utm.gbraid || utm.wbraid) {
    source = 'google';
    medium = 'cpc';
  } else if (utm.fbclid) {
    source = 'facebook';
    medium = 'cpc';
  } else if (utm.msclkid) {
    source = 'bing';
    medium = 'cpc';
  } else if (external) {
    source = refHost;
    medium = 'referral';
  } else {
    return null; // direct, and nothing to learn from it
  }

  return {
    source,
    medium,
    referrer: ref || '(none)',
    landing: pathname + (search || ''),
    at: new Date().toISOString(),
    ...(Object.keys(utm).length ? { utm } : {}),
  };
}

/**
 * Called on every route change. Cheap, and a no-op for direct navigation
 * within the site.
 */
export function recordTouch(pathname: string, search: string) {
  const touch = currentTouch(search, pathname);
  if (!touch) return;
  if (!read(FIRST_KEY)) write(FIRST_KEY, touch);
  write(LAST_KEY, touch);
}

/** Flat, readable fields to attach to a lead notification. */
export function attributionFields(): Record<string, string> {
  const first = read(FIRST_KEY);
  const last = read(LAST_KEY);
  if (!first && !last) return { 'traffic-source': 'direct / none recorded' };

  const line = (t: Touch) =>
    [label(t), t.landing, t.referrer !== '(none)' ? t.referrer : null]
      .filter(Boolean)
      .join(' · ');

  const out: Record<string, string> = {};
  if (last) out['traffic-source'] = line(last);
  if (first) {
    out['first-seen'] = `${line(first)} · ${first.at.slice(0, 10)}`;
    const u = first.utm;
    if (u) out['first-campaign'] = Object.entries(u).map(([k, v]) => `${k}=${v}`).join(' · ');
  }
  return out;
}

/**
 * Attribution as Calendly UTM parameters.
 *
 * Calendly carries exactly five UTM fields through to the booking record and
 * its webhooks, and we have two touches to express, so the last touch takes
 * the three conventional slots and the first touch is packed into utm_content.
 * That ordering is deliberate: utm_source and utm_medium are what any report
 * groups by, and the question asked of a booking is which channel closed it.
 * The first touch still travels, just somewhere that needs reading rather than
 * grouping.
 *
 * Returns an empty object for a visitor with no recorded touch, so a direct
 * booking link stays clean rather than carrying "(none)" values.
 */
export function calendlyUtmParams(): Record<string, string> {
  const first = read(FIRST_KEY);
  const last = read(LAST_KEY) ?? first;
  if (!last) return {};

  const params: Record<string, string> = {
    utm_source: last.source,
    utm_medium: last.medium,
    utm_campaign: last.utm?.utm_campaign ?? (last.landing.split('?')[0] || '/'),
  };
  if (first) params.utm_content = `first:${label(first)}@${first.at.slice(0, 10)}`;
  if (last.utm?.utm_term) params.utm_term = last.utm.utm_term;
  return params;
}
