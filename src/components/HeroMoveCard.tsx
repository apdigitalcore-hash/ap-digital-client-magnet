const INSTAGRAM_URL = 'https://www.instagram.com/theapdigital/';

/* Official Instagram glyph — lucide's outline version reads as a generic
   camera tile and isn't recognisable at this size. */
const InstagramGlyph = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

/**
 * This was a 30-item array that rotated by day-of-year, headed "Today's Move"
 * with a date and an N/89 streak counter. Nothing actually published daily, so
 * the date and counter implied a cadence that did not exist — and a visitor who
 * came back twice saw a different "insight" with no way to find the first one.
 * It is now one fixed piece of advice in a banner. The 21x figure is the Lead
 * Response Management study (Oldroyd et al., MIT/InsideSales), which is why it
 * is attributed on the page rather than stated as ours.
 */
const ADVICE = {
  label: 'The one that matters most',
  headline: 'Most leads die in the first five minutes.',
  body: 'Contacting an inbound lead within five minutes converts far better than waiting half an hour — the MIT lead-response study put it at roughly 21x. Nothing else on your marketing list moves the number that much for that little work. An SMS auto-reply the moment a form submits beats silence, even if all it says is "got it, calling now."',
  statLabel: 'Respond within',
  statValue: '5 min',
};

const HeroMoveCard = () => {
  return (
    <div className="elev-3 relative overflow-hidden rounded-[1.5rem] bg-[#0C0E11] px-6 py-8 sm:px-10 sm:py-10">
      {/* Overhead sheen so the black panel carries its own light. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(70% 60% at 50% -10%, hsl(0 0% 100% / 0.12) 0%, transparent 70%)',
        }}
      />

      <div className="relative grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-12">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
            {ADVICE.label}
          </span>
          {/* The global h3 rule applies font-bold; at Playfair's weight that
              reads as a slab on a dark panel, so this sets 400. */}
          <h3 className="mt-4 font-serif text-[26px] font-normal leading-[1.25] tracking-normal text-white sm:text-[34px]">
            {ADVICE.headline}
          </h3>
          <p className="mt-4 max-w-xl text-[13.5px] leading-relaxed text-white/70">
            {ADVICE.body}
          </p>
        </div>

        {/* Stat rail — a vertical divider on desktop, a horizontal one on mobile. */}
        <div className="flex items-end justify-between gap-6 border-t border-white/10 pt-6 md:flex-col md:items-start md:justify-center md:gap-8 md:border-l md:border-t-0 md:pl-12 md:pt-0">
          <div>
            <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/55">
              {ADVICE.statLabel}
            </p>
            <p className="font-serif text-[2.75rem] leading-none text-white">
              {ADVICE.statValue}
            </p>
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow @theapdigital on Instagram"
            className="group inline-flex items-center gap-2"
          >
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-white/10 transition-colors group-hover:bg-white/20">
              <InstagramGlyph className="h-3.5 w-3.5 text-white" />
            </span>
            <span className="text-xs font-medium text-white/70 transition-colors group-hover:text-white">
              @theapdigital
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroMoveCard;
