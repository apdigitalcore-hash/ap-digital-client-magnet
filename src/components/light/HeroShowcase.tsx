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
 * Hero object — a raytraced glossy torus rendered for this site
 * (scripts/render-hero-object.py), lit to match the hero's overhead light fan.
 * The ring's hole lets the fan show through, which seats the object in the
 * scene instead of pasting it on top.
 */
export const HeroObject = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] flex justify-center"
  >
    <div className="relative mb-[10vh] w-[76vw] max-w-[560px] sm:mb-[8vh] sm:w-[46vw]">
      {/* Contact shadow — tight and dark under the ring, spreading outward.
          The render has no floor, so the grounding is composited here. */}
      <div
        className="absolute inset-x-[2%] bottom-[2%] h-[26%]"
        style={{
          borderRadius: '50%',
          background:
            'radial-gradient(50% 50% at 50% 50%, hsl(220 28% 10% / 0.34) 0%, hsl(220 28% 10% / 0.14) 46%, transparent 74%)',
          filter: 'blur(30px)',
        }}
      />
      {/* Core occlusion — the near-black kiss where it meets the ground. */}
      <div
        className="absolute inset-x-[16%] bottom-[7%] h-[10%]"
        style={{
          borderRadius: '50%',
          background:
            'radial-gradient(50% 50% at 50% 50%, hsl(220 30% 8% / 0.42) 0%, transparent 70%)',
          filter: 'blur(16px)',
        }}
      />

      <img
        src="/hero-object.webp"
        alt=""
        width={1442}
        height={755}
        className="relative w-full"
        fetchPriority="high"
        decoding="async"
      />
    </div>
  </div>
);

export default HeroObject;
