/*
 * Line icons, drawn rather than imported.
 *
 * The old site used emoji (📞 ✉ 🏠) for exactly this job, which renders as a
 * different picture on every platform and drops colour into a two-colour
 * design. These are 1.5px strokes on a 24 grid, all inheriting currentColor,
 * so they sit at the same weight as the hairlines around them.
 */

type P = { className?: string; size?: number };

function Svg({ children, className = "", size = 18 }: P & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export const Phone = (p: P) => (
  <Svg {...p}>
    <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5L16 12l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3.5 5.2 2 2 0 0 1 5.5 3Z" />
  </Svg>
);

export const Mail = (p: P) => (
  <Svg {...p}>
    <rect x="2.5" y="5" width="19" height="14" rx="1.5" />
    <path d="m3 6.5 9 6 9-6" />
  </Svg>
);

export const Pin = (p: P) => (
  <Svg {...p}>
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </Svg>
);

export const Arrow = (p: P) => (
  <Svg {...p}>
    <path d="M4 12h15" />
    <path d="m13 6 6 6-6 6" />
  </Svg>
);

export const Clock = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5.2l3.2 2" />
  </Svg>
);

/* ── The four service marks. Each one is the actual thing, not a generic
      wrench: a bath, a hot water cylinder, a drain grate, and a drip.
      They are read at 22px, so anything with more than about five strokes
      turns to mush — the earlier mixer-tap and camera-reel drawings did
      exactly that and have been replaced with these. ── */

export const Tap = (p: P) => (
  <Svg {...p}>
    <path d="M3 12.5h18" />
    <path d="M5 12.5v3.5a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-3.5" />
    <path d="M7.5 19.5 6.5 21.5M16.5 19.5l1 2" />
    <path d="M7.5 12.5V6a2 2 0 0 1 4 0" />
  </Svg>
);

export const Cylinder = (p: P) => (
  <Svg {...p}>
    <rect x="7" y="3.5" width="10" height="17" rx="4" />
    <path d="M7 8h10" />
    <path d="M12 12v4.5" />
    <path d="M10 21h4" />
  </Svg>
);

/* A drain grate, viewed from above. */
export const Camera = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="3" />
    <path d="M12 3.5v5.5M12 15v5.5M3.5 12H9M15 12h5.5" />
  </Svg>
);

export const Drip = (p: P) => (
  <Svg {...p}>
    <path d="M12 3.5c3 4 5 6.6 5 9a5 5 0 0 1-10 0c0-2.4 2-5 5-9Z" />
    <path d="M9.8 12.8a2.4 2.4 0 0 0 2 2.6" />
  </Svg>
);

export const Star = ({ className = "", size = 13 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="m12 2.6 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.4l-5.8 3.1 1.1-6.5L2.6 9.4l6.5-.9Z" />
  </svg>
);

/* Google's four-colour mark, for the reviews badge. The only place on the site
   where a colour outside the palette is allowed — because a recoloured Google
   logo stops reading as a Google rating, which is the whole point of it. */
export const Google = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.9 33.6 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.2-2.6-.4-3.9z" />
    <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.5 15.1 18.8 12 24 12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.3 0-9.8-3.4-11.4-8.1l-6.5 5C9.5 39.6 16.2 44 24 44z" />
    <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C36.9 39.2 44 34 44 24c0-1.3-.2-2.6-.4-3.9z" />
  </svg>
);

export const Facebook = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H16.7V3.6c-.3-.04-1.3-.13-2.47-.13-2.44 0-4.11 1.49-4.11 4.23V9.9H7.4V13h2.72v8Z" />
  </svg>
);
