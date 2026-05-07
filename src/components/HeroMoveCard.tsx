import { Sparkles, Calendar, Flame, Instagram } from 'lucide-react';

const HeroMoveCard = () => {
  // Mini bar-chart sparkline values (last 7 "drops" gauge)
  const bars = [40, 55, 35, 70, 60, 85, 95];

  return (
    <div className="relative w-full max-w-[460px] mx-auto lg:ml-auto lg:mr-0">
      {/* Glow behind card */}
      <div
        aria-hidden
        className="absolute -inset-4 bg-teal/15 blur-3xl rounded-[2.5rem] pointer-events-none"
      />

      <div className="relative rounded-3xl bg-white shadow-2xl ring-1 ring-black/5 p-6 sm:p-7">
        {/* Header row */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal" strokeWidth={2.5} />
            <span className="text-[11px] font-extrabold tracking-[0.18em] uppercase text-gray-700">
              Today's Move
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium">
            <Calendar className="w-3.5 h-3.5" strokeWidth={2} />
            <span>May 4</span>
            <span className="text-gray-300">·</span>
            <span>Day 124</span>
          </div>
        </div>

        {/* Tag pill */}
        <div className="inline-flex items-center px-3 py-1.5 rounded-lg border border-teal/30 bg-teal/10 mb-4">
          <span className="text-[10px] font-extrabold tracking-[0.18em] uppercase text-teal-dark">
            Retargeting
          </span>
        </div>

        {/* Headline */}
        <h3 className="font-display text-[1.35rem] sm:text-[1.55rem] font-extrabold text-gray-900 leading-[1.15] mb-3 tracking-tight">
          You're showing the same ad 11 times. CTR is dead.
        </h3>

        {/* Body */}
        <p className="text-sm text-gray-600 leading-relaxed mb-5">
          Cap retarget frequency at 4–7 per week. Beyond that, CTR halves and brand sentiment turns net-negative — you train people to ignore you.
        </p>

        {/* Divider */}
        <div className="h-px bg-gray-200 mb-5" />

        {/* Stat row */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <p className="text-[10px] font-extrabold tracking-[0.16em] uppercase text-gray-500 mb-1">
              Max Impressions / Week
            </p>
            <p className="font-display text-4xl font-black text-teal leading-none">7</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-extrabold tracking-[0.16em] uppercase text-gray-500 mb-1.5">
              From the Playbook
            </p>
            <a
              href="https://instagram.com/theapdigital"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 group"
            >
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600">
                <Instagram className="w-3 h-3 text-white" strokeWidth={2.5} />
              </span>
              <span className="text-sm font-bold text-gray-900 group-hover:text-teal transition-colors">
                @theapdigital
              </span>
            </a>
          </div>
        </div>

        {/* Footer row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-orange-500" fill="currentColor" />
            <span className="text-xs font-semibold text-gray-700">Drop 5 of 30</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold tracking-[0.18em] uppercase text-gray-500">
              Last 7
            </span>
            <div className="flex items-end gap-0.5 h-5">
              {bars.map((h, i) => (
                <div
                  key={i}
                  className="w-1 rounded-sm bg-teal"
                  style={{ height: `${h}%`, opacity: 0.45 + (i / bars.length) * 0.55 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroMoveCard;
