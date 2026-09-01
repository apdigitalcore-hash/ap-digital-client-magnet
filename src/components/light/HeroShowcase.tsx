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
 * Hero skyline — Vancouver from the north shore, in its own column beside the copy.
 *
 * It keeps the photograph's natural square frame rather than being stretched
 * across the full width. A square source cropped to a wide band throws away
 * everything above the waterline: on a 1900px viewport the earlier full-bleed
 * version was upscaling 1.85x and showing only the bottom fifth, so the
 * mountains and sky — the reason to use this photo — were cropped out.
 *
 * The left and top edges are feathered into the section's #E4E7EB so the photo
 * sits in the panel rather than on it.
 *
 * alt is empty by design: the <h1> beside it already says "Vancouver", so
 * describing the picture would only repeat the heading to a screen reader.
 */
export const HeroSkyline = () => (
  // h-full on the img only works if every element between it and the sized
  // wrapper is also full-height: <picture> is display:inline by default, so
  // without this the image rendered at its natural square size and hung ~470px
  // below the column, putting the skyline under the fold.
  <div aria-hidden="true" className="pointer-events-none select-none h-full w-full overflow-hidden">
    <picture className="block h-full w-full">
      <source
        type="image/webp"
        srcSet="/vancouver-skyline-640.webp 640w, /vancouver-skyline-1024.webp 1024w"
        sizes="(min-width: 1024px) 46vw, 100vw"
      />
      <img
        src="/vancouver-skyline-1024.jpg"
        srcSet="/vancouver-skyline-640.jpg 640w, /vancouver-skyline-1024.jpg 1024w"
        sizes="(min-width: 1024px) 46vw, 100vw"
        alt=""
        width={1024}
        height={1024}
        // Hero LCP element — must not be lazy. React 18.3.1 drops the camelCase
        // prop from the DOM, so it is spread lowercase to actually reach the browser.
        {...{ fetchpriority: 'high' }}
        decoding="async"
        className="w-full h-full object-cover object-bottom"
        style={{
          // One gradient, not two composited layers: -webkit-mask-composite
          // takes different keywords than mask-composite, and the mismatched
          // pair blanked the image out entirely in Chrome. A single diagonal
          // feathers the top and left edges together into the panel.
          maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 10%, #000 18%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 10%, #000 18%)',
        }}
      />
    </picture>
  </div>
);

export default HeroObject;
