import { ReactNode, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

/** Apple-Intelligence-style spectrum, used sparingly: logo mark, key phrase, glow edges. */
export const SPECTRUM = 'linear-gradient(90deg, #ff9f0a 0%, #ff375f 50%, #bf5af2 100%)';

export const AdviceLogo = ({ className = '' }: { className?: string }) => (
  <span className={`inline-flex items-center gap-[3px] ${className}`}>
    <span
      className="flex h-8 w-8 items-center justify-center rounded-[9px] text-[12px] font-bold tracking-[-0.02em] text-white shadow-[0_2px_8px_rgba(255,55,95,0.35)]"
      style={{ background: SPECTRUM }}
    >
      AD
    </span>
    <span className="text-[20px] font-semibold tracking-[-0.02em] text-[#1d1d1f]">vice</span>
  </span>
);

const LINKS = [
  { to: '/advice/simulate', label: 'Simulator' },
  { to: '/advice#features', label: 'Features' },
  { to: '/advice#how', label: 'How it works' },
  { to: '/advice/my', label: 'My simulations' },
];

const navClass = ({ isActive }: { isActive: boolean }) =>
  `text-[14px] transition-colors ${isActive ? 'font-medium text-[#1d1d1f]' : 'text-[#424245] hover:text-[#1d1d1f]'}`;

/** ADvice frame — Apple-style: system type, white ground, frosted nav. */
const AdviceShell = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="advice min-h-screen bg-white font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Text','SF_Pro_Display','Helvetica_Neue',Inter,sans-serif] text-[#1d1d1f] antialiased">
      <header className="advice-noprint sticky top-0 z-40 border-b border-black/[0.08] bg-white/80 backdrop-blur-xl backdrop-saturate-150">
        <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between px-5">
          <Link to="/advice" aria-label="ADvice home" onClick={() => setOpen(false)}>
            <AdviceLogo />
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            {LINKS.map((l) =>
              l.to.includes('#') ? (
                <a key={l.to} href={l.to} className="text-[14px] text-[#424245] transition-colors hover:text-[#1d1d1f]">{l.label}</a>
              ) : (
                <NavLink key={l.to} to={l.to} end className={navClass}>{l.label}</NavLink>
              ),
            )}
          </nav>
          <div className="flex items-center gap-3">
            <Link
              to="/advice/simulate"
              className="hidden rounded-full bg-[#1d1d1f] px-5 py-2 text-[14px] font-medium text-white transition-colors hover:bg-black sm:inline-block"
            >
              Run free simulation
            </Link>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="rounded-full p-2 text-[#1d1d1f] hover:bg-black/5 md:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {open && (
          <nav className="border-t border-black/[0.06] bg-white px-5 py-3 md:hidden">
            {LINKS.map((l) => (
              <a key={l.to} href={l.to} onClick={() => setOpen(false)} className="block py-3 text-[17px] text-[#1d1d1f]">{l.label}</a>
            ))}
          </nav>
        )}
      </header>
      <main>{children}</main>
      <footer className="advice-noprint bg-[#f5f5f7]">
        <div className="mx-auto flex max-w-[1120px] flex-col gap-4 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
          <AdviceLogo />
          <div className="text-[12px] leading-relaxed text-[#6e6e73] sm:text-right">
            <p>Predictions are estimates based on industry benchmarks, not guarantees.</p>
            <p>
              Made by <Link to="/" className="text-[#1d1d1f] hover:underline">AP Digital</Link> in Vancouver.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdviceShell;
