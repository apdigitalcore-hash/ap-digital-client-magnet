import { ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';

export const AdviceLogo = ({ className = '' }: { className?: string }) => (
  <span className={`inline-flex items-baseline font-semibold tracking-[-0.02em] text-[#1d1d1f] ${className}`}>
    <span className="font-bold">AD</span>
    <span className="font-normal">vice</span>
  </span>
);

const navClass = ({ isActive }: { isActive: boolean }) =>
  `text-[13px] transition-colors ${isActive ? 'text-[#1d1d1f]' : 'text-[#6e6e73] hover:text-[#1d1d1f]'}`;

/** ADvice frame — Apple-style: system type, white ground, frosted nav. */
const AdviceShell = ({ children }: { children: ReactNode }) => (
  <div className="advice min-h-screen bg-white font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Text','SF_Pro_Display','Helvetica_Neue',Inter,sans-serif] text-[#1d1d1f] antialiased">
    <header className="advice-noprint sticky top-0 z-40 border-b border-black/[0.06] bg-white/75 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-12 max-w-[980px] items-center justify-between px-5">
        <Link to="/advice" aria-label="ADvice home">
          <AdviceLogo className="text-[19px]" />
        </Link>
        <nav className="flex items-center gap-6">
          <NavLink to="/advice/my" className={navClass}>My Simulations</NavLink>
          <Link
            to="/advice/simulate"
            className="rounded-full bg-[#1d1d1f] px-3.5 py-1 text-[12px] font-medium text-white transition-colors hover:bg-black"
          >
            Try it free
          </Link>
        </nav>
      </div>
    </header>
    <main>{children}</main>
    <footer className="advice-noprint bg-[#f5f5f7]">
      <div className="mx-auto flex max-w-[980px] flex-col gap-2 border-t border-black/[0.08] px-5 py-5 text-[12px] text-[#6e6e73] sm:flex-row sm:justify-between">
        <p>Predictions are estimates based on industry benchmarks, not guarantees.</p>
        <p>
          Made by <Link to="/" className="text-[#1d1d1f] hover:underline">AP Digital</Link> in Vancouver.
        </p>
      </div>
    </footer>
  </div>
);

export default AdviceShell;
