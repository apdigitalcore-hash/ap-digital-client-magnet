/* Angles of the light fan. The source sits behind the object at the base of
   the hero and throws upward, so the headline reads inside the light rather
   than on top of a flat panel. Mirrored around centre to read as one source. */
const BEAMS = [-40, -30, -21, -13, -6, 6, 13, 21, 30, 40];

/** Light fan — rendered behind the hero copy. */
export const HeroLightFan = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex justify-center overflow-hidden"
    style={{ height: '100%' }}
  >
    <div
      className="relative h-[150%] w-full max-w-[1400px]"
      style={{
        maskImage:
          'radial-gradient(58% 62% at 50% 78%, #000 0%, rgba(0,0,0,0.55) 55%, transparent 82%)',
        WebkitMaskImage:
          'radial-gradient(58% 62% at 50% 78%, #000 0%, rgba(0,0,0,0.55) 55%, transparent 82%)',
      }}
    >
      {BEAMS.map((deg) => (
        <span
          key={deg}
          className="absolute bottom-[18%] left-1/2 block w-[90px] origin-bottom"
          style={{
            height: '105%',
            transform: `translateX(-50%) rotate(${deg}deg)`,
            background:
              'linear-gradient(to top, hsl(0 0% 100% / 0.98) 0%, hsl(0 0% 100% / 0.92) 45%, hsl(0 0% 100% / 0.4) 78%, transparent 100%)',
            filter: 'blur(11px)',
          }}
        />
      ))}
    </div>
  </div>
);

/**
 * Hero object — a raytraced glossy yin-yang sphere rendered for this site
 * (scripts/render-hero-object.py), lit to match the hero's overhead light fan.
 */
export const HeroObject = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] flex justify-center"
  >
    {/*
      Mobile uses FIXED PIXEL sizing with no viewport unit of any kind.

      Two previous attempts (vh -> svh) both still resized mid-scroll on a real
      phone. Rather than keep guessing which viewport unit misbehaves on which
      mobile browser, this removes the variable entirely: a px width cannot be
      changed by the URL bar, the visual viewport, or anything else the browser
      does while scrolling.

      Desktop keeps the height-aware cap, which is needed there so the sphere
      does not outgrow its clearance on wide-but-short laptop screens.
    */}
    <div className="relative mb-10 w-[190px] sm:mb-[5svh] sm:w-[min(26vw,24svh)] sm:max-w-[330px]">
      {/* Contact shadow — the render has no floor, so grounding is composited
          here: a wide soft spread plus a tight core where it meets the base. */}
      <div
        className="absolute inset-x-[-10%] bottom-[1%] h-[15%]"
        style={{
          borderRadius: '50%',
          background:
            'radial-gradient(50% 50% at 50% 50%, hsl(220 28% 10% / 0.32) 0%, hsl(220 28% 10% / 0.13) 45%, transparent 74%)',
          filter: 'blur(26px)',
        }}
      />
      <div
        className="absolute inset-x-[26%] bottom-[4%] h-[6%]"
        style={{
          borderRadius: '50%',
          background:
            'radial-gradient(50% 50% at 50% 50%, hsl(220 30% 8% / 0.45) 0%, transparent 70%)',
          filter: 'blur(11px)',
        }}
      />

      <img
        src="/hero-object.webp"
        alt=""
        width={1314}
        height={1314}
        className="relative w-full"
        {...{ fetchpriority: 'high' }}
        decoding="async"
      />
    </div>
  </div>
);

/**
 * Hero skyline — Vancouver from the north shore, as the hero's own backdrop.
 *
 * Landscape plate, not a square. Three earlier versions forced a 1:1 photo into
 * a wide slot, so the visible slice of the frame changed with window width and
 * the composition was never the same twice. A 3:2 plate covering the whole
 * section removes that failure mode: object-cover has almost nothing to crop.
 *
 * The copy sits ON the photograph rather than in a panel above it, so there is
 * no mask, no fade and no seam to keep in sync — see HeroScrim for the one
 * thing that does need managing, which is contrast under the text.
 *
 * alt is empty by design: the <h1> over it already says "Vancouver", so
 * describing the picture would only repeat the heading to a screen reader.
 */
export const HeroSkyline = () => (
  // Full-bleed from sm up. On a narrow viewport a 3:2 plate cropped to a tall
  // frame zooms to a vertical sliver of skyline, so mobile keeps it as a band
  // below the copy instead — same element, same download, different box.
  <div
    aria-hidden="true"
    className="pointer-events-none select-none absolute inset-0"
  >
    <picture className="block h-full w-full">
      {/* Portrait plate for narrow screens, listed first because <source>
          matches in document order. A phone viewport is ~0.46 wide-to-tall and
          this plate is 0.474, so object-cover discards almost nothing — which
          is why mobile can now be full-bleed like desktop instead of a cropped
          landscape strip sitting in a band. */}
      <source
        media="(max-width: 639px)"
        type="image/webp"
        srcSet="/vancouver-skyline-p560.webp 560w, /vancouver-skyline-p864.webp 864w"
        sizes="100vw"
      />
      <source
        media="(max-width: 639px)"
        srcSet="/vancouver-skyline-p560.jpg 560w, /vancouver-skyline-p864.jpg 864w"
        sizes="100vw"
      />
      <source
        type="image/webp"
        srcSet="/vancouver-skyline-640.webp 640w, /vancouver-skyline-1024.webp 1024w, /vancouver-skyline-1402.webp 1402w"
        sizes="100vw"
      />
      <img
        src="/vancouver-skyline-1402.jpg"
        srcSet="/vancouver-skyline-640.jpg 640w, /vancouver-skyline-1024.jpg 1024w, /vancouver-skyline-1402.jpg 1402w"
        sizes="100vw"
        alt=""
        width={1402}
        height={935}
        // Hero LCP element — must not be lazy. React 18.3.1 drops the camelCase
        // prop from the DOM, so it is spread lowercase to actually reach the browser.
        {...{ fetchpriority: 'high' }}
        decoding="async"
        className="h-full w-full object-cover object-bottom"
      />
    </picture>
  </div>
);

/**
 * Scrim under the copy.
 *
 * The photograph's left side is pale sky, so dark type reads on it at the
 * reference size — but "reads at one size" is exactly the assumption that broke
 * the previous three heroes. On a narrow or short window the skyline shifts
 * left and the trust bar, which is only 55% opacity, would land on the towers.
 * This keeps the left third reliably light regardless of how the photo crops,
 * and fades out before it reaches the buildings.
 */
export const HeroScrim = () => (
  <>
    {/* Desktop: horizontal, because the copy sits in the open left of the
        frame — beside the skyline, not over it. Centring the copy here was
        tried and reverted: this photograph's empty space is on the left, so a
        centred block lands on the densest part of the city, and no scrim
        rescues the subhead without washing the photograph out. Mobile centres
        instead, where the copy sits above the skyline rather than beside it. */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden sm:block"
      style={{
        background:
          'linear-gradient(100deg, rgba(228,231,235,0.92) 0%, rgba(228,231,235,0.82) 26%, rgba(228,231,235,0.38) 46%, rgba(228,231,235,0) 62%)',
      }}
    />
    {/* Mobile: vertical, because the copy is above the band, not beside it.
        The desktop gradient left "NO CONTRACTS" sitting unreadable on the
        Canada Place sails at 375px — a horizontal fade cannot protect text
        that is stacked rather than side-by-side. */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 sm:hidden"
      style={{
        background:
          'linear-gradient(to bottom, rgba(228,231,235,0.82) 0%, rgba(228,231,235,0.72) 42%, rgba(228,231,235,0.30) 60%, rgba(228,231,235,0) 72%)',
      }}
    />
  </>
);

export default HeroObject;
