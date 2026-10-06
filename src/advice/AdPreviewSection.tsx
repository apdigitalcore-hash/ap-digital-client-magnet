import type { Simulation } from './types';
import { creativeAspect, previewPair, type PreviewCard, type PreviewKind } from './adPreview';

/**
 * The ad as the surface would show it, theirs beside the rewrite.
 *
 * The comparison is the point — a rewrite on its own is just a tidier text
 * box. The truncation is deliberate: seeing their own first line cut off at
 * 125 characters tells an advertiser more than any note about length.
 *
 * Deliberately generic. No platform name, logo or wordmark appears here: these
 * are other companies' trademarks and this is a mockup, not their product.
 */

const Chrome = ({ children }: { children: React.ReactNode }) => (
  <div className="overflow-hidden rounded-2xl border border-black/[0.08] bg-white">{children}</div>
);

const FeedCard = ({ c, image }: { c: PreviewCard; image?: { data: string; mime: string; width?: number; height?: number } }) => (
  <Chrome>
    <div className="flex items-center gap-2 px-4 pt-4">
      <div className="h-8 w-8 rounded-full bg-[#e8e8ed]" />
      <div>
        <div className="h-2.5 w-24 rounded-full bg-[#e8e8ed]" />
        <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-[#86868b]">Sponsored</p>
      </div>
    </div>
    <p className="whitespace-pre-wrap px-4 pt-3 text-[13px] leading-snug text-[#1d1d1f]">
      {c.primaryText}
      {c.truncated && <span className="text-[#86868b]">… See more</span>}
    </p>
    {image ? (
      <img
        src={`data:${image.mime};base64,${image.data}`}
        alt=""
        style={{ aspectRatio: String(creativeAspect(image)) }}
        className="mt-3 block w-full object-cover"
      />
    ) : (
      <div className="mt-3" />
    )}
    <div className="flex items-center justify-between gap-3 border-t border-black/[0.06] bg-[#f5f5f7] px-4 py-3">
      <div className="min-w-0">
        {c.description && <p className="truncate text-[10px] uppercase tracking-[0.12em] text-[#86868b]">{c.description}</p>}
        <p className="truncate text-[13px] font-medium text-[#1d1d1f]">{c.headline}</p>
      </div>
      <span className="shrink-0 rounded-md bg-[#e8e8ed] px-3 py-1.5 text-[11px] font-medium text-[#1d1d1f]">Learn more</span>
    </div>
  </Chrome>
);

const SearchCard = ({ c }: { c: PreviewCard }) => (
  <Chrome>
    <div className="px-4 py-4">
      <div className="flex items-center gap-2">
        <span className="rounded border border-black/[0.12] px-1.5 py-0.5 text-[10px] font-semibold text-[#1d1d1f]">Ad</span>
        <span className="truncate text-[12px] text-[#6e6e73]">{c.displayUrl || '—'}</span>
      </div>
      <p className="mt-1.5 text-[17px] leading-snug text-[#1a0dab]">{c.headline}</p>
      <p className="mt-1 text-[13px] leading-snug text-[#4d5156]">
        {c.description}
        {c.truncated && <span className="text-[#86868b]">…</span>}
      </p>
    </div>
  </Chrome>
);

const Card = ({ kind, c, image }: { kind: PreviewKind; c: PreviewCard; image?: { data: string; mime: string; width?: number; height?: number } }) =>
  kind === 'feed' ? <FeedCard c={c} image={image} /> : <SearchCard c={c} />;

const AdPreview = ({ sim }: { sim: Simulation }) => {
  const p = previewPair(sim);
  if (!p) return null;
  const empty = !p.yours.headline && !p.yours.primaryText && !p.yours.description;
  if (empty) return null;

  // When the claim guard withholds the rewrite, the advertiser's own wording is
  // returned in its place — so the two cards would be identical. Showing one
  // card and saying why beats showing the same ad twice.
  const withheld = !!sim.results.recommendations.claimNotice;

  return (
    <div>
      <div className={`grid gap-4 ${withheld ? 'max-w-md' : 'md:grid-cols-2'}`}>
        <div>
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.14em] text-[#86868b]">
            {withheld ? 'Your ad' : 'Your ad'}
          </p>
          <Card kind={p.kind} c={p.yours} image={p.image} />
        </div>
        {!withheld && (
          <div>
            <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.14em] text-[#1d1d1f]">Rewritten</p>
            <Card kind={p.kind} c={p.rewritten} image={p.image} />
          </div>
        )}
      </div>

      {withheld && (
        <p className="mt-3 rounded-xl bg-[#fff4e5] px-4 py-3 text-[13px] leading-relaxed text-[#b25000]">
          No rewrite to compare: the suggested version made claims your input did not support, so it was withheld.
        </p>
      )}
      <p className="mt-3 text-[13px] leading-relaxed text-[#86868b]">
        Preview — an approximation of how the ad is laid out and where the text is cut off, not a screenshot of any
        platform.{' '}
        {p.yours.truncated && 'Your text is being cut off: the first line has to carry the message.'}
      </p>
    </div>
  );
};

export default AdPreview;
