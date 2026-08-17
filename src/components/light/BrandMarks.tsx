/**
 * Platform marks used to show which ad networks we run.
 *
 * Nominative use — naming the platforms a service actually operates on. Each
 * is the official glyph in its own brand colours; they sit on white chips so
 * every mark keeps the contrast its brand guidelines assume.
 */

import { useId } from 'react';

type MarkProps = { className?: string };

export const GoogleMark = ({ className = '' }: MarkProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path
      fill="#4285F4"
      d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z"
    />
  </svg>
);

export const MetaMark = ({ className = '' }: MarkProps) => {
  // Gradient ids must be unique per document — the same mark renders in more
  // than one card, and duplicate ids would make later instances reference the
  // first definition.
  const gid = useId();
  return (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <defs>
      <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#0064E0" />
        <stop offset="55%" stopColor="#0082FB" />
        <stop offset="100%" stopColor="#19AFFF" />
      </linearGradient>
    </defs>
    <path
      fill={`url(#${gid})`}
      d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.999c.542-.939.861-2.219.861-3.966 0-2.516-.68-5.093-1.941-7.14-1.132-1.835-2.79-3.234-4.82-3.234-1.482 0-2.83.638-4.043 1.804-.36.346-.712.72-1.045 1.098-.286-.339-.585-.677-.888-.986C10.72 4.673 9.395 4.03 8.043 4.03zm.028 3.052c.76 0 1.472.312 2.208 1.058.303.307.6.653.882.984-.42.526-.83 1.093-1.192 1.61l-.76 1.087c-1.226 1.751-1.72 2.462-2.15 2.928-.508.55-.925.702-1.427.702-.523 0-.966-.229-1.28-.7-.313-.47-.492-1.174-.492-2.093 0-1.616.44-3.457 1.194-4.702.518-.855 1.211-1.42 2.017-1.42zm10.026 0c.72 0 1.35.34 1.88 1.007.884 1.113 1.402 3.02 1.402 5.062 0 .862-.135 1.516-.404 1.977-.269.46-.68.687-1.208.687-.55 0-.9-.213-1.408-.774-.52-.575-1.297-1.703-2.15-3.117l-.762-1.267c-.313-.522-.6-1.005-.865-1.44.303-.427.61-.822.917-1.163.74-.822 1.518-1.234 2.36-1.234z"
    />
  </svg>
  );
};

export const InstagramMark = ({ className = '' }: MarkProps) => {
  const gid = useId();
  return (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <defs>
      <radialGradient id={gid} cx="30%" cy="107%" r="150%">
        <stop offset="0%" stopColor="#FDF497" />
        <stop offset="5%" stopColor="#FDF497" />
        <stop offset="45%" stopColor="#FD5949" />
        <stop offset="60%" stopColor="#D6249F" />
        <stop offset="90%" stopColor="#285AEB" />
      </radialGradient>
    </defs>
    <path
      fill={`url(#${gid})`}
      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
    />
  </svg>
  );
};

export const FacebookMark = ({ className = '' }: MarkProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path
      fill="#1877F2"
      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
    />
  </svg>
);

/* TikTok's mark is the glyph offset in cyan and magenta behind a black copy. */
export const TikTokMark = ({ className = '' }: MarkProps) => {
  const d =
    'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z';
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#25F4EE" d={d} transform="translate(-1.1 0.7)" />
      <path fill="#FE2C55" d={d} transform="translate(1.1 -0.5)" />
      <path fill="#000000" d={d} />
    </svg>
  );
};

export const MARKS = {
  google: { Mark: GoogleMark, label: 'Google Ads' },
  meta: { Mark: MetaMark, label: 'Meta Ads' },
  instagram: { Mark: InstagramMark, label: 'Instagram' },
  facebook: { Mark: FacebookMark, label: 'Facebook' },
  tiktok: { Mark: TikTokMark, label: 'TikTok' },
} as const;

export type MarkKey = keyof typeof MARKS;
