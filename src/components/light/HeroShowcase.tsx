import { ArrowUpRight, TrendingUp } from 'lucide-react';

/* Angles of the light fan behind the card. Mirrored around centre so the
   spread reads as one source rather than a scatter of streaks. */
const BEAMS = [-38, -26, -15, -6, 6, 15, 26, 38];

const metrics = [
  { value: '5–10x', label: 'Average ROAS' },
  { value: '14', label: 'Days to launch' },
  { value: '90', label: 'Day guarantee' },
];

const HeroShowcase = () => (
  <div className="relative mx-auto mt-14 w-full max-w-[540px] text-left sm:mt-16">
    {/* Light fan — the source sits behind the card and throws upward. */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[820px] w-[1200px] -translate-x-1/2 -translate-y-[56%]"
      style={{
        maskImage: 'radial-gradient(56% 50% at 50% 50%, #000 0%, transparent 76%)',
        WebkitMaskImage: 'radial-gradient(56% 50% at 50% 50%, #000 0%, transparent 76%)',
      }}
    >
      {BEAMS.map((deg) => (
        <span
          key={deg}
          className="absolute left-1/2 top-1/2 block h-[820px] w-[88px] origin-center"
          style={{
            transform: `translate(-50%, -50%) rotate(${deg}deg)`,
            background:
              'linear-gradient(to top, transparent 4%, hsl(0 0% 100% / 1) 40%, hsl(0 0% 100% / 1) 66%, transparent 100%)',
            filter: 'blur(7px)',
          }}
        />
      ))}
    </div>

    {/* Dark anchor card */}
    <div className="elev-3 relative overflow-hidden rounded-[1.75rem] bg-[#0C0E11] p-6 sm:p-8">
      {/* Interior sheen so the black surface has a light source of its own. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(70% 55% at 50% -10%, hsl(0 0% 100% / 0.14) 0%, transparent 70%)',
        }}
      />

      <div className="relative">
        <div className="mb-7 flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
            </span>
            Live campaigns
          </span>
          <TrendingUp className="h-4 w-4 text-white/40" strokeWidth={1.75} />
        </div>

        <p className="font-serif text-[2.75rem] leading-none text-white sm:text-[3.25rem]">
          340<span className="text-white/40">%</span>
        </p>
        <p className="mt-2.5 text-sm text-white/45">
          Average traffic growth across managed accounts
        </p>

        <div className="mt-7 grid grid-cols-3 gap-3 border-t border-white/10 pt-6">
          {metrics.map((m) => (
            <div key={m.label}>
              <p className="font-serif text-xl text-white sm:text-2xl">{m.value}</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-white/35">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Floating chip — breaks the card silhouette so it sits in space. */}
    <div className="elev-2 absolute -right-3 -top-4 hidden items-center gap-2 rounded-full bg-white px-4 py-2.5 sm:flex">
      <ArrowUpRight className="h-3.5 w-3.5 text-foreground" strokeWidth={2.25} />
      <span className="text-[11px] font-semibold text-foreground">First leads in 2 weeks</span>
    </div>
  </div>
);

export default HeroShowcase;
