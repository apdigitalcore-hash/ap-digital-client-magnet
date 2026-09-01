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
 * Hero skyline — Vancouver from the north shore, anchored to the base of the
 * hero in place of the sphere.
 *
 * The photograph is cropped to the band that carries information (mountains,
 * skyline, water) and its remaining sky is faded out with a mask, so the hero's
 * own #E4E7EB background supplies everything above it. That keeps the file
 * small and avoids a seam where the photo's sky meets the panel's.
 *
 * alt is empty on purpose: the <h1> beside it already says "Vancouver", so
 * describing the picture would only repeat the heading to a screen reader.
 * The image is decorative — it carries no information the copy does not.
 *
 * Source is 1024px wide, so 1024 is the largest honest width; a 2x export
 * would add bytes without adding detail. Replace both files if a higher
 * resolution original turns up.
 */
export const HeroSkyline = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-x-0 bottom-0 z-[1]"
  >
    <picture>
      <source
        type="image/webp"
        srcSet="/vancouver-skyline-640.webp 640w, /vancouver-skyline-1024.webp 1024w"
        sizes="100vw"
      />
      <img
        src="/vancouver-skyline-1024.jpg"
        srcSet="/vancouver-skyline-640.jpg 640w, /vancouver-skyline-1024.jpg 1024w"
        sizes="100vw"
        alt=""
        width={1024}
        height={594}
        // This is the hero's LCP element, so it must not be lazy.
        {...{ fetchpriority: 'high' }}
        decoding="async"
        className="w-full select-none object-cover object-bottom h-[190px] sm:h-[28svh] sm:max-h-[320px]"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, #000 34%, #000 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, #000 34%, #000 100%)',
        }}
      />
    </picture>
  </div>
);

export default HeroObject;
