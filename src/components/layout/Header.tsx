"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { site, services } from "@/content/site";
import { asset } from "@/lib/basePath";
import { Phone, Mail, Pin, Facebook, Arrow } from "@/components/ui/Icons";

/*
 * One header for the whole site, modelled on the MJB Electrical bar.
 *
 * The four things that make that one work, and what each one is doing here:
 *
 *   1. FROSTED, NOT SOLID. Over the hero it is transparent; past 40px it
 *      becomes a blurred glass panel rather than a flat white bar, so the
 *      photograph stays visible through it and the page keeps some depth. The
 *      blur lives in `.frost` — see the warning there about Lightning CSS.
 *   2. IT SHRINKS. 78px down to 64px. Small enough not to be a visible event,
 *      big enough that the page feels like it made room once you started
 *      reading.
 *   3. TWO LOGO FILES, CROSSFADED. Not a CSS filter — see scripts/images.mjs
 *      for why `brightness(0) invert(1)` produced an unreadable smear on this
 *      particular mark.
 *   4. ONE PILL CTA. The phone number sits beside it as plain bold text, so
 *      there is exactly one filled control in the bar and no competition for
 *      where to look.
 *
 * The old two-row layout (a utility strip above the nav) is gone: it cost 34px
 * of permanent vertical space to repeat an email address and a service area
 * that both already live in the footer and in the mobile drawer.
 */

const NAV = [
  { href: "/", label: "Home" },
  { href: "/services/", label: "Services", children: services },
  { href: "/gallery/", label: "Gallery" },
  { href: "/about-us/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // 40px rather than 0, so a one-pixel trackpad jitter at the top of the page
    // does not strobe the background on and off.
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /*
   * Close the drawer on navigation. Adjusted during render rather than in an
   * effect: an effect would paint the new page with the drawer still covering
   * it for one frame. Comparing against the path the drawer was opened at also
   * catches back/forward, which an onClick on the links would miss.
   */
  const [openedAt, setOpenedAt] = useState(pathname);
  if (pathname !== openedAt) {
    setOpenedAt(pathname);
    if (open) setOpen(false);
  }

  // Lock the page behind the open drawer, or iOS scrolls the body underneath.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const light = scrolled && !open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-400 ${
          light ? "frost" : "on-dark border-b border-transparent"
        }`}
      >
        {/*
          The header's own scrim, for the transparent state.

          Legibility here used to depend on the hero underneath happening to be
          dark at the top. That is not a property a header should have: swap in
          a photograph of a white-tiled bathroom and the whole bar becomes white
          type on near-white. This gradient belongs to the header, so it is
          correct over any hero the page is ever given. It fades out as the
          frosted panel fades in.
        */}
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-x-0 top-0 h-[190%] bg-gradient-to-b from-black/72 via-black/34 to-transparent transition-opacity duration-400 ${
            light ? "opacity-0" : "opacity-100"
          }`}
        />

        <div
          className={`wrap relative flex items-center justify-between gap-6 transition-[height] duration-400 ${
            scrolled ? "h-[64px]" : "h-[78px]"
          }`}
        >
          <Link href="/" className="relative block shrink-0" aria-label={`${site.name} — home`}>
            {/* Both files are always in the DOM and crossfade on scroll. The
                dark-ground one is absolutely positioned over the light one so
                there is no reflow between them, and the light one carries the
                layout height. */}
            <Logo
              src="logo-mark.png"
              scrolled={scrolled}
              className="relative"
              style={{ opacity: light ? 1 : 0 }}
            />
            <Logo
              src="logo-mark-dark.png"
              scrolled={scrolled}
              className="absolute inset-0"
              style={{ opacity: light ? 0 : 1 }}
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <div key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    className="mi flex items-center gap-1.5 px-3.5 py-2.5 transition-colors hover:text-aqua"
                    style={{ color: active ? "var(--aqua)" : undefined }}
                  >
                    {item.label}
                    {item.children && (
                      <svg width="9" height="9" viewBox="0 0 10 10" aria-hidden="true" className="opacity-50 transition-transform duration-300 group-hover:rotate-180">
                        <path d="m2 4 3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.4" />
                      </svg>
                    )}
                  </Link>

                  {item.children && (
                    // Opens on hover and on keyboard focus within, so the
                    // submenu is reachable without a mouse.
                    <div className="invisible absolute left-0 top-full w-[290px] translate-y-1 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                      <div className="mt-2 overflow-hidden rounded-2xl border border-[rgba(6,42,68,0.07)] bg-white/90 py-2 shadow-[0_18px_44px_rgba(6,42,68,0.16)] backdrop-blur-xl">
                        {item.children.map((child) => (
                          <Link
                            key={child.slug}
                            href={`/services/${child.slug}/`}
                            className="mi block px-5 py-3 text-ink transition-colors hover:bg-[rgba(0,166,224,0.08)] hover:text-aqua"
                          >
                            {child.nav}
                          </Link>
                        ))}
                        <div className="mx-5 my-2 h-px bg-[rgba(6,42,68,0.09)]" />
                        <Link
                          href="/services/all-services/"
                          className="mi block px-5 py-3 text-ink/55 transition-colors hover:bg-[rgba(0,166,224,0.08)] hover:text-aqua"
                        >
                          All services
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            {/* Plain bold text on desktop — one filled control in the bar. */}
            <a
              href={site.phoneHref}
              className="mi-lg hidden xl:flex items-center gap-2 transition-colors hover:text-aqua"
            >
              <Phone size={15} />
              {site.phone}
            </a>

            {/* No call button here on phones. The fixed call bar at the bottom
                of the viewport already carries one, permanently and within
                thumb reach — two of them stacked in the same view is how a site
                starts reading as an ad. It stays on desktop, where there is no
                call bar. */}
            <Link href="/contact/#quote" className="pill hidden sm:inline-flex">
              Free quote
              <Arrow size={13} />
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="lg:hidden grid h-10 w-10 place-items-center"
            >
              <span className="relative block h-[13px] w-[22px]">
                {[0, 6, 12].map((top, i) => (
                  <span
                    key={top}
                    className="absolute left-0 block h-[2px] w-full rounded bg-current transition-all duration-300"
                    style={
                      open
                        ? {
                            top: 6,
                            transform: i === 1 ? "scaleX(0)" : `rotate(${i === 0 ? 45 : -45}deg)`,
                          }
                        : { top }
                    }
                  />
                ))}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ──────────────────────────────────────────────── */}
      <div
        className={`on-dark fixed inset-0 z-40 lg:hidden transition-opacity duration-400 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-navy-deep" />
        <div className="relative flex h-full flex-col overflow-y-auto px-6 pb-8 pt-[92px]">
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className="dsp-sm block rounded-xl px-4 py-3.5 text-[22px] transition-colors hover:bg-white/[0.07]"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="mb-2 flex flex-col">
                    {item.children.map((child) => (
                      <Link
                        key={child.slug}
                        href={`/services/${child.slug}/`}
                        className="mi rounded-lg px-4 py-2.5 text-white/50 transition-colors hover:bg-white/[0.07] hover:text-white"
                      >
                        {child.nav}
                      </Link>
                    ))}
                    <Link
                      href="/services/all-services/"
                      className="mi rounded-lg px-4 py-2.5 text-white/50 transition-colors hover:bg-white/[0.07] hover:text-white"
                    >
                      All services
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="mt-auto pt-8">
            <div className="flex flex-col gap-2.5">
              <a href={site.phoneHref} className="pill w-full !py-3.5">
                <Phone size={15} />
                {site.phone}
              </a>
              <Link href="/contact/#quote" className="pill pill-ghost w-full !py-3.5">
                Get a free quote
                <Arrow size={13} />
              </Link>
            </div>

            <div className="mt-7 flex flex-col gap-3 border-t border-white/12 pt-6">
              <a href={site.emailHref} className="mi flex items-center gap-2.5 text-white/55 transition-colors hover:text-white">
                <Mail size={14} />
                <span>{site.email}</span>
              </a>
              <span className="mi flex items-center gap-2.5 text-white/55">
                <Pin size={14} />
                {site.address.full}
              </span>
              <a
                href={site.facebook}
                target="_blank"
                rel="noreferrer noopener"
                className="mi flex items-center gap-2.5 text-white/55 transition-colors hover:text-white"
              >
                <Facebook size={14} />
                Follow us on Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/*
 * The horizontal lockup — the wordmark and its subtitle, with the skyline
 * cropped away. See scripts/images.mjs: the full 2:1 mark spends most of any
 * header-sized height budget on the skyline and renders the company name about
 * four pixels tall. At 44px this sets the name at roughly 28px cap-height.
 */
function Logo({
  src,
  scrolled,
  className = "",
  style,
}: {
  src: string;
  scrolled: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    /* The export is unoptimised, so next/image would only add a wrapper. */
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset(`/img/${src}`)}
      alt={site.legalName}
      width={894}
      height={200}
      className={`w-auto transition-[height,opacity] duration-400 ${
        scrolled ? "h-[34px] lg:h-[38px]" : "h-[38px] lg:h-[44px]"
      } ${className}`}
      style={style}
    />
  );
}
