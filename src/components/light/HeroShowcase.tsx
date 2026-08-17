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

/** Dark glossy object anchoring the base of the hero. */
export const HeroObject = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] flex justify-center"
  >
    <div className="relative w-[74vw] max-w-[720px] translate-y-[26%] sm:w-[88vw] sm:translate-y-[20%]">
      {/* Contact shadow grounding the form. */}
      <div
        className="absolute inset-x-[8%] bottom-[22%] h-[42%] rounded-[50%]"
        style={{
          background:
            'radial-gradient(50% 50% at 50% 50%, hsl(220 25% 12% / 0.30) 0%, transparent 72%)',
          filter: 'blur(34px)',
        }}
      />

      {/* Body — a wide visor form, dark and glossy. */}
      <div
        className="relative aspect-[780/430] w-full overflow-hidden"
        style={{
          borderRadius: '46% 46% 30% 30% / 58% 58% 24% 24%',
          background:
            'linear-gradient(178deg, #33383F 0%, #1E2228 22%, #101317 52%, #090B0E 78%, #06080A 100%)',
          boxShadow:
            '0 40px 90px -30px hsl(220 30% 8% / 0.55), inset 0 -20px 50px hsl(0 0% 0% / 0.6)',
        }}
      >
        {/* Broad specular sweep across the crown. */}
        <span
          className="absolute inset-x-[6%] top-[3%] h-[46%]"
          style={{
            borderRadius: '50%',
            background:
              'linear-gradient(to bottom, hsl(220 20% 92% / 0.42) 0%, hsl(220 20% 88% / 0.14) 42%, transparent 78%)',
            filter: 'blur(2px)',
          }}
        />

        {/* Tight highlight — the hard glint that sells the gloss. */}
        <span
          className="absolute left-1/2 top-[6%] h-[13%] w-[42%] -translate-x-1/2"
          style={{
            borderRadius: '50%',
            background:
              'radial-gradient(60% 100% at 50% 40%, hsl(0 0% 100% / 0.75) 0%, hsl(0 0% 100% / 0.18) 55%, transparent 80%)',
            filter: 'blur(6px)',
          }}
        />

        {/* Rim light along the upper edge. */}
        <span
          className="absolute inset-x-[3%] top-[1.5%] h-[2px]"
          style={{
            borderRadius: '50%',
            background:
              'linear-gradient(90deg, transparent 0%, hsl(0 0% 100% / 0.55) 26%, hsl(0 0% 100% / 0.8) 50%, hsl(0 0% 100% / 0.55) 74%, transparent 100%)',
            filter: 'blur(0.6px)',
          }}
        />

        {/* Inset lens band — gives the form structure instead of a blank blob. */}
        <span
          className="absolute left-1/2 top-[46%] h-[34%] w-[54%] -translate-x-1/2"
          style={{
            borderRadius: '50% 50% 44% 44% / 46% 46% 54% 54%',
            background:
              'radial-gradient(70% 80% at 50% 22%, hsl(220 14% 30% / 0.85) 0%, hsl(220 16% 12% / 0.9) 55%, hsl(220 20% 6% / 0.95) 100%)',
            boxShadow:
              'inset 0 2px 10px hsl(0 0% 100% / 0.10), inset 0 -8px 22px hsl(0 0% 0% / 0.7)',
          }}
        />

        {/* Cool bounce from the left, warm-neutral from the right. */}
        <span
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(38% 60% at 6% 46%, hsl(215 30% 70% / 0.16) 0%, transparent 62%), radial-gradient(38% 60% at 94% 46%, hsl(220 12% 78% / 0.13) 0%, transparent 62%)',
          }}
        />
      </div>
    </div>
  </div>
);

export default HeroObject;
