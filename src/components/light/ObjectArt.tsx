/**
 * The objects that sit in the card media panels.
 *
 * These are hand-authored vector drawings rather than icon-font glyphs: each
 * has a lit face, a shaded face and a contact shadow, so it reads as an object
 * on a surface instead of a line symbol. That is the difference between these
 * cards and a row of stroked icons.
 *
 * `tone` picks the palette, not the shape — "light" for the pale panels on the
 * services band, "dark" for the panels on the process band. Gradient ids carry
 * the tone and the drawing name so two drawings on one page cannot collide.
 */
type Tone = 'light' | 'dark';

type ArtProps = { tone?: Tone; className?: string };

const PALETTE = {
  light: { lit: '#3C434D', shade: '#0C0E11', edge: '#5A6270', shadow: '#0C0E11' },
  dark: { lit: '#FFFFFF', shade: '#9AA3AF', edge: '#FFFFFF', shadow: '#000000' },
} as const;

/* Every drawing shares one 160x160 field and one contact shadow, so the objects
   sit at a consistent size and height across both bands. */
const Field = ({
  name,
  tone = 'light',
  className = '',
  children,
}: {
  name: string;
  tone?: Tone;
  className?: string;
  children: (ids: { body: string; sheen: string }, c: (typeof PALETTE)[Tone]) => React.ReactNode;
}) => {
  const c = PALETTE[tone];
  const ids = { body: `${name}-${tone}-body`, sheen: `${name}-${tone}-sheen` };
  return (
    <svg viewBox="0 0 160 160" fill="none" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={ids.body} x1="30" y1="22" x2="128" y2="140" gradientUnits="userSpaceOnUse">
          <stop stopColor={c.lit} />
          <stop offset="1" stopColor={c.shade} />
        </linearGradient>
        <linearGradient id={ids.sheen} x1="40" y1="30" x2="110" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" stopOpacity={tone === 'dark' ? 0.9 : 0.42} />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${name}-${tone}-ground`} cx="0.5" cy="0.5" r="0.5">
          <stop stopColor={c.shadow} stopOpacity={tone === 'dark' ? 0.55 : 0.22} />
          <stop offset="1" stopColor={c.shadow} stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="80" cy="139" rx="44" ry="9" fill={`url(#${name}-${tone}-ground)`} />
      {children(ids, c)}
    </svg>
  );
};

/** Audit — a magnifier over the account. */
export const MagnifierArt = ({ tone = 'light', className = '' }: ArtProps) => (
  <Field name="magnifier" tone={tone} className={className}>
    {(ids, c) => (
      <>
        <path
          d="M92 92 L120 120"
          stroke={`url(#${ids.body})`}
          strokeWidth="15"
          strokeLinecap="round"
        />
        <circle cx="68" cy="68" r="36" stroke={`url(#${ids.body})`} strokeWidth="13" />
        <circle cx="68" cy="68" r="29.5" fill={c.edge} fillOpacity={tone === 'dark' ? 0.16 : 0.1} />
        <path
          d="M47 57a26 26 0 0 1 21-14"
          stroke={`url(#${ids.sheen})`}
          strokeWidth="6"
          strokeLinecap="round"
        />
      </>
    )}
  </Field>
);

/** Launch — a paper plane, folded so the two faces catch different light. */
export const PlaneArt = ({ tone = 'light', className = '' }: ArtProps) => (
  <Field name="plane" tone={tone} className={className}>
    {(ids, c) => (
      <>
        {/* Underside, drawn first so the lit face overlaps it. */}
        <path d="M80 112 L126 30 L62 90 Z" fill={c.shade} fillOpacity={tone === 'dark' ? 0.55 : 1} />
        {/* Lit face. */}
        <path d="M126 30 L34 74 L62 90 Z" fill={`url(#${ids.body})`} />
        <path d="M126 30 L62 90 L80 112 Z" fill={c.edge} fillOpacity={tone === 'dark' ? 0.35 : 0.22} />
        <path d="M126 30 L48 81" stroke={`url(#${ids.sheen})`} strokeWidth="3" strokeLinecap="round" />
      </>
    )}
  </Field>
);

/** Optimize — a column chart with the trend drawn over it. */
export const TrendArt = ({ tone = 'light', className = '' }: ArtProps) => (
  <Field name="trend" tone={tone} className={className}>
    {(ids, c) => (
      <>
        <rect x="34" y="86" width="22" height="40" rx="8" fill={c.edge} fillOpacity={tone === 'dark' ? 0.3 : 0.2} />
        <rect x="69" y="68" width="22" height="58" rx="8" fill={c.edge} fillOpacity={tone === 'dark' ? 0.45 : 0.32} />
        <rect x="104" y="44" width="22" height="82" rx="8" fill={`url(#${ids.body})`} />
        <path
          d="M38 78 L74 56 L96 66 L119 36"
          stroke={`url(#${ids.body})`}
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* A filled head, not a stroked corner — at this weight a bracket read
            as a bent flag rather than an arrow. */}
        <path d="M132 20 L127 44 L110 30 Z" fill={`url(#${ids.body})`} />
        <path d="M40 76 L73 56" stroke={`url(#${ids.sheen})`} strokeWidth="3" strokeLinecap="round" />
      </>
    )}
  </Field>
);

/** Paid ads — the click itself. */
export const CursorArt = ({ tone = 'light', className = '' }: ArtProps) => (
  <Field name="cursor" tone={tone} className={className}>
    {(ids, c) => (
      <>
        {/* The ripple rings this had were centred on the tip, so the outer one
            fell outside the artboard and rendered as a clipped arc. The
            pointer is drawn larger instead. */}
        <path d="M46 20 L120 96 L83 98 L66 132 Z" fill={`url(#${ids.body})`} />
        <path d="M46 20 L83 98 L66 132 Z" fill={c.shade} fillOpacity={tone === 'dark' ? 0.45 : 0.55} />
        <path d="M49 27 L78 94" stroke={`url(#${ids.sheen})`} strokeWidth="4" strokeLinecap="round" />
      </>
    )}
  </Field>
);

/** Social — the conversation. */
export const ChatArt = ({ tone = 'light', className = '' }: ArtProps) => (
  <Field name="chat" tone={tone} className={className}>
    {(ids, c) => (
      <>
        <path
          d="M34 36h66a12 12 0 0 1 12 12v34a12 12 0 0 1-12 12H62l-20 16V94h-8a12 12 0 0 1-12-12V48a12 12 0 0 1 12-12Z"
          fill={c.edge}
          fillOpacity={tone === 'dark' ? 0.28 : 0.18}
        />
        <path
          d="M74 62h52a12 12 0 0 1 12 12v30a12 12 0 0 1-12 12h-6v14l-18-14H74a12 12 0 0 1-12-12V74a12 12 0 0 1 12-12Z"
          fill={`url(#${ids.body})`}
        />
        <path d="M78 70h44" stroke={`url(#${ids.sheen})`} strokeWidth="4" strokeLinecap="round" />
        <g fill={tone === 'dark' ? '#0C0E11' : '#FFFFFF'} fillOpacity="0.8">
          <circle cx="84" cy="90" r="5" />
          <circle cx="100" cy="90" r="5" />
          <circle cx="116" cy="90" r="5" />
        </g>
      </>
    )}
  </Field>
);
