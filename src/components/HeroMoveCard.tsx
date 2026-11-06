const INSTAGRAM_URL = 'https://www.instagram.com/theapdigital/';

/* Official Instagram glyph — lucide's outline version reads as a generic
   camera tile and isn't recognisable at this size. */
const InstagramGlyph = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

/**
 * This began as 30 pieces of advice rotating by day-of-year inside a card, under
 * a section heading of its own. Between the heading, the subhead, the eyebrow,
 * the headline, the body, the stat and the handle, one idea was carrying seven
 * pieces of text and two competing headlines.
 *
 * It is now one statement. The banner is the whole section — there is no section
 * heading above it any more, because the statement is the heading.
 */
const HeroMoveCard = () => {
  return (
    <aside className="elev-3 relative overflow-hidden rounded-[2rem] bg-[#0C0E11] px-7 py-16 sm:px-16 sm:py-24">
      {/* Overhead sheen so the black band carries its own light. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 70% at 50% -5%, hsl(0 0% 100% / 0.11) 0%, transparent 72%)',
        }}
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <span className="text-[10px] font-semibold uppercase tracking-[0.26em] text-white/45">
          Free advice
        </span>

        {/* The global heading rule applies font-bold; at Playfair's weight that
            reads as a slab on a dark band, so this sets 400. */}
        <p
          className="mt-7 font-serif text-[27px] font-normal leading-[1.2] tracking-normal text-white sm:text-[44px]"
          style={{ textWrap: 'balance' }}
        >
          No amount of advertising will fix an offer nobody wants.
        </p>

        <p className="mx-auto mt-7 max-w-lg text-[13.5px] leading-relaxed text-white/55">
          Make it specific enough that a stranger can repeat it back to you.
          Targeting, creative and budget only multiply whatever the offer already
          is.
        </p>

        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow @theapdigital on Instagram"
          className="group mt-10 inline-flex items-center gap-2"
        >
          <InstagramGlyph className="h-3.5 w-3.5 text-white/45 transition-colors group-hover:text-white" />
          <span className="text-[11px] font-medium tracking-wide text-white/45 transition-colors group-hover:text-white">
            @theapdigital
          </span>
        </a>
      </div>
    </aside>
  );
};

export default HeroMoveCard;
