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
        fetchPriority="high"
        decoding="async"
      />
    </div>
  </div>
);

export default HeroObject;
