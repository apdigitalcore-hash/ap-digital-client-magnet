import { ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export const AdviceLogo = ({ className = '' }: { className?: string }) => (
  <span className={`inline-flex items-baseline font-semibold tracking-[-0.03em] ${className}`}>
    <span className="text-[#3b82f6]">AD</span>
    <span className="text-white/90">vice</span>
  </span>
);

const navClass = ({ isActive }: { isActive: boolean }) =>
  `text-[13px] transition-colors ${isActive ? 'text-white' : 'text-[#8A8F98] hover:text-white'}`;

/** Dark, self-contained frame for every ADvice page — its own nav, not the agency header. */
const AdviceShell = ({ children }: { children: ReactNode }) => (
  <div className="advice min-h-screen bg-[#0a0a0a] font-['Geist',_Inter,_system-ui,_sans-serif] text-[#EDEDED] antialiased selection:bg-[#3b82f6]/40">
    <Helmet>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet" />
    </Helmet>
    <header className="advice-noprint sticky top-0 z-40 border-b border-white/[0.07] bg-[#0a0a0a]/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/advice" aria-label="ADvice home" className="flex items-center gap-3">
          <AdviceLogo className="text-[19px]" />
          <span className="hidden border-l border-white/10 pl-3 font-['Geist_Mono',_monospace] text-[11px] uppercase tracking-[0.08em] text-[#8A8F98] sm:inline">
            Campaign simulator
          </span>
        </Link>
        <nav className="flex items-center gap-5 sm:gap-6">
          <NavLink to="/advice/my" className={navClass}>My simulations</NavLink>
          <Link
            to="/advice/simulate"
            className="rounded-md bg-[#EDEDED] px-3 py-1.5 text-[13px] font-medium text-black transition-colors hover:bg-white"
          >
            New simulation
          </Link>
        </nav>
      </div>
    </header>
    <main>{children}</main>
    <footer className="advice-noprint border-t border-white/[0.07]">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 font-['Geist_Mono',_monospace] text-[11px] uppercase tracking-[0.06em] text-[#5F646C] sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>Estimates from industry benchmarks · not guarantees</p>
        <p>
          Built by <Link to="/" className="text-[#8A8F98] hover:text-white">AP Digital</Link>, Vancouver
        </p>
      </div>
    </footer>
  </div>
);

export default AdviceShell;
