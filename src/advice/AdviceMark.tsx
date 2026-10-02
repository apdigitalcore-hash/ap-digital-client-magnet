import { useId } from 'react';

/**
 * ADvice mark — a keycap.
 *
 * The product is the moment before you press launch, and the launch creative
 * already uses a keycap, so the mark is that object reduced to two shapes: the
 * body and the keytop, with AD on the top.
 *
 * The keytop is a cut-out rather than a white fill, so the mark inverts
 * correctly: on a light ground the body is dark and the letters read through
 * the hole; on a dark ground the body is light and the same hole shows the
 * dark behind it. One shape, no second colour to maintain.
 */
export const AdviceMark = ({ className = '', title }: { className?: string; title?: string }) => {
  const id = useId();
  return (
    <svg viewBox="0 0 64 64" className={className} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true}>
      {title && <title>{title}</title>}
      <mask id={id}>
        <rect x="4" y="7" width="56" height="50" rx="12" fill="#fff" />
        <rect x="12" y="13" width="40" height="32" rx="8" fill="#000" />
      </mask>
      <rect x="4" y="7" width="56" height="50" rx="12" fill="currentColor" mask={`url(#${id})`} />
      <text
        x="32" y="37"
        textAnchor="middle"
        fill="currentColor"
        style={{ font: '700 17px -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif', letterSpacing: '0.5px' }}
      >
        AD
      </text>
    </svg>
  );
};

/** Mark plus wordmark, for the nav and anywhere the tool introduces itself. */
export const AdviceLockup = ({ className = '' }: { className?: string }) => (
  <span className={`inline-flex items-center gap-2 ${className}`}>
    <AdviceMark className="h-[22px] w-[22px] text-[#1d1d1f]" />
    <span className="text-[19px] font-semibold tracking-[-0.02em] text-[#1d1d1f]">
      AD<span className="font-normal">vice</span>
    </span>
  </span>
);

export default AdviceMark;
