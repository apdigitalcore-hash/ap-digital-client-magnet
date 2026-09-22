import { ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';

export const AdviceLogo = ({ className = '' }: { className?: string }) => (
  <span className={`font-semibold tracking-tight ${className}`}>
    <span className="rounded-md bg-[#3b82f6] px-1.5 py-0.5 font-bold text-white">AD</span>
    <span className="ml-0.5 text-white">vice</span>
  </span>
);

const navClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm transition-colors ${isActive ? 'text-white' : 'text-white/55 hover:text-white'}`;

/** Dark, self-contained frame for every ADvice page — its own nav, not the agency header. */
const AdviceShell = ({ children }: { children: ReactNode }) => (
  <div className="advice min-h-screen bg-[#0a0a0a] text-white antialiased selection:bg-[#3b82f6]/40">
    <header className="advice-noprint sticky top-0 z-40 border-b border-white/[0.06] bg-[#0a0a0a]/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/advice" aria-label="ADvice home">
          <AdviceLogo className="text-lg" />
        </Link>
        <nav className="flex items-center gap-5 sm:gap-7">
          <NavLink to="/advice/simulate" className={navClass}>Simulator</NavLink>
          <NavLink to="/advice/my" className={navClass}>My simulations</NavLink>
          <Link
            to="/advice/simulate"
            className="hidden rounded-md bg-white px-3 py-1.5 text-sm font-medium text-black transition-colors hover:bg-white/85 sm:inline-block"
          >
            Run free simulation
          </Link>
        </nav>
      </div>
    </header>
    <main>{children}</main>
    <footer className="advice-noprint border-t border-white/[0.06] py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>Predictions are AI estimates grounded in industry benchmarks, not guarantees.</p>
        <p>
          Built by <Link to="/" className="text-white/60 hover:text-white">AP Digital</Link>
        </p>
      </div>
    </footer>
  </div>
);

export default AdviceShell;
