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
 * Hero object — a single glossy black sphere resting on the base of the hero.
 * A sphere is the one form that reads as a deliberate, physically-lit object
 * rather than an ambiguous piece of hardware: one light source, one specular
 * highlight, one terminator, one contact shadow.
 */
export const HeroObject = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] flex justify-center"
  >
    <div className="relative mb-[9vh] w-[42vw] max-w-[300px] sm:mb-[7vh] sm:w-[26vw]">
      {/* Contact shadow — tight and dark where the sphere meets the ground,
          spreading and softening outward. This is what sells the weight. */}
      <div
        className="absolute inset-x-[-14%] bottom-[6%] h-[16%]"
        style={{
          borderRadius: '50%',
          background:
            'radial-gradient(50% 50% at 50% 50%, hsl(220 28% 10% / 0.42) 0%, hsl(220 28% 10% / 0.18) 42%, transparent 72%)',
          filter: 'blur(26px)',
        }}
      />
      {/* Core occlusion — the near-black kiss directly under the sphere. */}
      <div
        className="absolute inset-x-[24%] bottom-[9%] h-[7%]"
        style={{
          borderRadius: '50%',
          background:
            'radial-gradient(50% 50% at 50% 50%, hsl(220 30% 8% / 0.55) 0%, transparent 70%)',
          filter: 'blur(10px)',
        }}
      />

      {/* Sphere */}
      <div
        className="relative aspect-square w-full rounded-full"
        style={{
          background:
            'radial-gradient(circle at 34% 24%, #6E757E 0%, #3A4048 12%, #1E2229 32%, #101317 54%, #08090C 76%, #050608 100%)',
          boxShadow:
            '0 60px 90px -40px hsl(220 30% 8% / 0.55), inset -16px -20px 60px hsl(0 0% 0% / 0.75)',
        }}
      >
        {/* Specular highlight — small, bright, offset toward the light. */}
        <span
          className="absolute left-[26%] top-[16%] h-[19%] w-[25%]"
          style={{
            borderRadius: '50%',
            background:
              'radial-gradient(50% 50% at 42% 38%, hsl(0 0% 100% / 0.95) 0%, hsl(0 0% 100% / 0.45) 38%, transparent 72%)',
            filter: 'blur(5px)',
          }}
        />
        {/* Secondary sheen spreading from the highlight. */}
        <span
          className="absolute inset-0 rounded-full"
          style={{
            background:
              'radial-gradient(42% 38% at 32% 22%, hsl(210 20% 88% / 0.20) 0%, transparent 66%)',
          }}
        />
        {/* Rim light along the lower-right edge — bounce off the ground. */}
        <span
          className="absolute inset-0 rounded-full"
          style={{
            background:
              'radial-gradient(72% 72% at 78% 84%, hsl(214 24% 76% / 0.26) 0%, transparent 46%)',
          }}
        />
        {/* Cool bounce along the left silhouette. */}
        <span
          className="absolute inset-0 rounded-full"
          style={{
            background:
              'radial-gradient(48% 60% at 3% 58%, hsl(214 30% 74% / 0.16) 0%, transparent 52%)',
          }}
        />
        {/* Crisp edge so the silhouette stays clean against the light fan. */}
        <span
          className="absolute inset-0 rounded-full"
          style={{ boxShadow: 'inset 0 0 0 1px hsl(220 20% 60% / 0.10)' }}
        />
      </div>
    </div>
  </div>
);

export default HeroObject;
