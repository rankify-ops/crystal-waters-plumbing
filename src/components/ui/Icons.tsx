/*
 * The icon set, drawn rather than imported.
 *
 * The old site used emoji (📞 ✉ 🏠) for this job, which renders as a different
 * picture on every platform and drops full colour into a two-colour design.
 *
 * All of these are 1.5px strokes on a 24 grid with round caps and joins, and
 * every one inherits currentColor — so they sit at exactly the weight of the
 * hairlines around them, and a chip or a button can recolour a whole icon by
 * setting `color`.
 *
 * The constraint that matters: these are read at 20–26px. Anything past about
 * six strokes turns to mush at that size. An earlier mixer-tap drawing and a
 * camera-on-a-reel both failed that test and were replaced — the tap by a bath,
 * the camera by a drain grate — because the recognisable silhouette beats the
 * literal object every time.
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

/* ── Contact & interface ─────────────────────────────────────────────── */

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

export const Check = (p: P) => (
  <Svg {...p}>
    <path d="m4.5 12.5 5 5 10-11" />
  </Svg>
);

/* ── The trades ──────────────────────────────────────────────────────────
   One per job type on the quote form's first question. Each is the thing
   itself: a bath, a hot water cylinder, a drain grate, a drip, a flame. */

/** Kitchen or bathroom renovation. A bath with its tap riser. */
export const Bath = (p: P) => (
  <Svg {...p}>
    <path d="M3 12.5h18" />
    <path d="M5 12.5v3.5a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-3.5" />
    <path d="M7.5 19.5 6.5 21.5M16.5 19.5l1 2" />
    <path d="M7.5 12.5V6a2 2 0 0 1 4 0" />
  </Svg>
);

/** Hot water. A storage cylinder with its flow and return. */
export const Cylinder = (p: P) => (
  <Svg {...p}>
    <rect x="7" y="3.5" width="10" height="17" rx="4" />
    <path d="M7 8h10" />
    <path d="M12 12v4.5" />
    <path d="M10 21h4" />
  </Svg>
);

/** Blocked drains. A grate, viewed from above. */
export const Drain = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="3" />
    <path d="M12 3.5v5.5M12 15v5.5M3.5 12H9M15 12h5.5" />
  </Svg>
);

/** Leaks and burst pipes. A drip, with the ripple it lands in. */
export const Drip = (p: P) => (
  <Svg {...p}>
    <path d="M12 3.5c3 4 5 6.6 5 9a5 5 0 0 1-10 0c0-2.4 2-5 5-9Z" />
    <path d="M9.8 12.8a2.4 2.4 0 0 0 2 2.6" />
  </Svg>
);

/** Gas fitting. A flame with its inner cone. */
export const Flame = (p: P) => (
  <Svg {...p}>
    <path d="M12 21a5.5 5.5 0 0 0 5.5-5.5c0-4.6-5.4-6.4-4-12.5-3 1.5-7 5-7 12.5A5.5 5.5 0 0 0 12 21Z" />
    <path d="M12 21a2.4 2.4 0 0 0 2.4-2.4c0-2-2.4-2.9-1.7-5.4-1.4.8-3.1 2.2-3.1 5.4A2.4 2.4 0 0 0 12 21Z" />
  </Svg>
);

/** Anything else. A conversation. */
export const Chat = (p: P) => (
  <Svg {...p}>
    <path d="M20.5 11.6a7.6 7.6 0 0 1-11 6.8L4.5 19.8l1.4-4.8a7.6 7.6 0 1 1 14.6-3.4Z" />
    <path d="M9 11.8h.01M12 11.8h.01M15 11.8h.01" />
  </Svg>
);

/* ── Urgency ─────────────────────────────────────────────────────────────
   The quote form's second question. */

/** Emergency. A warning triangle — the one shape nobody has to decode. */
export const Alert = (p: P) => (
  <Svg {...p}>
    <path d="M12 3.6 21.2 19.4a1 1 0 0 1-.9 1.5H3.7a1 1 0 0 1-.9-1.5L12 3.6Z" />
    <path d="M12 10v4.2" />
    <path d="M12 17.6h.01" />
  </Svg>
);

export const Calendar = (p: P) => (
  <Svg {...p}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
    <path d="M3.5 10h17" />
    <path d="M8 3v4M16 3v4" />
  </Svg>
);

/** Just getting a price. A swing tag. */
export const Tag = (p: P) => (
  <Svg {...p}>
    <path d="M12.4 2.8H19a1.7 1.7 0 0 1 1.7 1.7v6.6a2 2 0 0 1-.6 1.4l-7.2 7.2a2 2 0 0 1-2.8 0L4 13.6a2 2 0 0 1 0-2.8L11.1 3.4a2 2 0 0 1 1.3-.6Z" />
    <circle cx="16.4" cy="7.1" r="1.3" />
  </Svg>
);

/* ── Property types ──────────────────────────────────────────────────────
   The quote form's third question. */

export const House = (p: P) => (
  <Svg {...p}>
    <path d="M3.2 10.6 12 3.4l8.8 7.2" />
    <path d="M5.4 9.1V20.6h13.2V9.1" />
    <path d="M9.6 20.6v-6.2h4.8v6.2" />
  </Svg>
);

export const Apartment = (p: P) => (
  <Svg {...p}>
    <path d="M2.5 20.8h19" />
    <path d="M4.6 20.8V5.4a1.6 1.6 0 0 1 1.6-1.6h6.2a1.6 1.6 0 0 1 1.6 1.6v15.4" />
    <path d="M14 10.4h3.8a1.6 1.6 0 0 1 1.6 1.6v8.8" />
    <path d="M7.4 7.4h3.4M7.4 11h3.4M7.4 14.6h3.4M16.6 14.6h.01M16.6 17.6h.01" />
  </Svg>
);

export const Shopfront = (p: P) => (
  <Svg {...p}>
    <path d="M4 9.6h16v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-10Z" />
    <path d="M3.2 9.6 5 4.2a1 1 0 0 1 1-.7h12a1 1 0 0 1 1 .7l1.8 5.4" />
    <path d="M9.4 20.6v-5.4h5.2v5.4" />
  </Svg>
);

export const BodyCorporate = (p: P) => (
  <Svg {...p}>
    <path d="M2.5 20.8h19" />
    <path d="M4.6 20.8V6.4a1 1 0 0 1 1-1h4.8a1 1 0 0 1 1 1v14.4" />
    <path d="M13 20.8V11a1 1 0 0 1 1-1h4.4a1 1 0 0 1 1 1v9.8" />
    <path d="M7 9h1.6M7 12.6h1.6M7 16.2h1.6M15.4 13.4H17M15.4 17H17" />
  </Svg>
);

/* ── Trust marks ─────────────────────────────────────────────────────────
   The four proof points. */

/** Expert plumbers. A spanner. */
export const Spanner = (p: P) => (
  <Svg {...p}>
    <path d="M15.6 3.3a5.6 5.6 0 0 0-6.2 8.7l-5.9 5.9a2 2 0 0 0 2.8 2.8l5.9-5.9a5.6 5.6 0 0 0 8.7-6.2l-3.4 3.4-3.2-.6-.6-3.2 3.4-3.4Z" />
  </Svg>
);

/** Guaranteed work. A shield with a tick in it. */
export const Shield = (p: P) => (
  <Svg {...p}>
    <path d="M12 2.8 4.6 5.6v6.1c0 4.6 3.1 8.3 7.4 9.5 4.3-1.2 7.4-4.9 7.4-9.5V5.6L12 2.8Z" />
    <path d="m8.9 11.8 2.3 2.3 4-4.4" />
  </Svg>
);

/* ── Rating & brand marks ────────────────────────────────────────────── */

export const Star = ({ className = "", size = 13 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="m12 2.6 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.4l-5.8 3.1 1.1-6.5L2.6 9.4l6.5-.9Z" />
  </svg>
);

/* Google's four-colour mark, for the reviews badge. The only place on the site
   where a colour outside the palette is allowed — a recoloured Google logo
   stops reading as a Google rating, which is the entire point of it. */
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

/*
 * Aliases kept so the two names that were already in use elsewhere still
 * resolve. `Tap` was the bath before it was redrawn, and `Camera` was the drain
 * grate before it was — the drawings changed, the imports did not need to.
 */
export const Tap = Bath;
export const Camera = Drain;
