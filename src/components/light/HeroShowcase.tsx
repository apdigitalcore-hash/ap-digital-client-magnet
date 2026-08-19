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
    {/* Width is capped against viewport height as well as width — sizing purely
        in vw made the sphere outgrow its clearance on wide-but-short laptop
        screens and collide with the trust bar.

        The cap uses svh, not vh. On mobile, `vh` tracks the URL bar hiding and
        showing, so a vh-sized element visibly resizes mid-scroll. `svh` is
        pinned to the small (bar-visible) viewport and never changes. */}
    <div className="relative mb-[5svh] w-[min(52vw,23svh)] max-w-[330px] sm:mb-[5svh] sm:w-[min(26vw,24svh)]">
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
