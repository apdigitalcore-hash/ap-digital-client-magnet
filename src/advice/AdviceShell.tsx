import { ReactNode, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

export const AdviceLogo = ({ className = '' }: { className?: string }) => (
  <span className={`inline-flex items-baseline font-semibold tracking-[-0.02em] text-[#1d1d1f] ${className}`}>
    <span className="font-bold">AD</span>
    <span className="font-normal">vice</span>
  </span>
);

// Every tap target clears 44px on a phone, which is why the nav links carry a
// minimum height rather than relying on their text size.
const navClass = ({ isActive }: { isActive: boolean }) =>
  `inline-flex min-h-[44px] items-center text-[14px] transition-colors ${
    isActive ? 'text-[#1d1d1f]' : 'text-[#6e6e73] hover:text-[#1d1d1f]'
  }`;

/**
 * ADvice frame — Apple-style: system type, white ground, frosted nav.
 *
 * `title` is applied directly rather than through Helmet: on these routes the
 * SPA shell's <title> is not one Helmet owns, so the tab kept showing the
 * agency homepage title while navigating the tool.
 */
const AdviceShell = ({ children, title }: { children: ReactNode; title?: string }) => {
  useEffect(() => {
    document.title = title ?? 'ADvice — Free AI Ad Campaign Simulator';
  }, [title]);

  return (
  <div className="advice min-h-screen bg-white font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Text','SF_Pro_Display','Helvetica_Neue',Inter,sans-serif] text-[#1d1d1f] antialiased">
    <header className="advice-noprint sticky top-0 z-40 border-b border-black/[0.06] bg-white/75 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-14 max-w-[980px] items-center justify-between px-5">
        {/* Two links, not one: the mark and wordmark open the tool, the credit
            goes back to the agency site. Nested anchors are not valid HTML. */}
        <div className="flex items-center gap-2.5">
          <Link to="/advice" aria-label="ADvice home" className="inline-flex min-h-[44px] items-center gap-2.5">
            <AdviceLogo className="text-[19px]" />
          </Link>
          <Link
            to="/"
            className="hidden min-h-[44px] items-center border-l border-black/[0.12] pl-2.5 text-[12px] leading-tight text-[#86868b] transition-colors hover:text-[#1d1d1f] sm:inline-flex"
          >
            by AP Digital Co.
          </Link>
        </div>
        <nav className="flex items-center gap-5">
          <NavLink to="/advice/my" className={navClass}>My Simulations</NavLink>
          <Link
            to="/advice/simulate"
            className="inline-flex min-h-[44px] items-center rounded-full bg-[#1d1d1f] px-4 text-[14px] font-medium text-white transition-colors hover:bg-black"
          >
            Try it free
          </Link>
        </nav>
      </div>
    </header>
    <main>{children}</main>
    <footer className="advice-noprint bg-[#f5f5f7]">
      <div className="mx-auto flex max-w-[980px] flex-col gap-1 border-t border-black/[0.08] px-5 py-5 text-[12px] text-[#6e6e73] sm:flex-row sm:items-center sm:justify-between">
        <p>Predictions are estimates based on industry benchmarks, not guarantees.</p>
        <p>
          Made by{' '}
          <Link to="/" className="inline-flex min-h-[44px] items-center text-[#1d1d1f] hover:underline">AP Digital</Link>{' '}
          in Vancouver ·{' '}
          <Link to="/privacy-policy" className="inline-flex min-h-[44px] items-center text-[#1d1d1f] hover:underline">Privacy</Link>
        </p>
      </div>
    </footer>
  </div>
  );
};

export default AdviceShell;
