"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { site, services } from "@/content/site";
import { asset } from "@/lib/basePath";
import { Phone, Mail, Facebook, Arrow } from "@/components/ui/Icons";

/*
 * One header for the whole site.
 *
 * Every page opens on a dark hero, so the bar starts transparent and inverts to
 * solid white once the hero is behind it. The threshold is 40px rather than 0
 * so a one-pixel scroll jitter on a trackpad does not strobe the background.
 *
 * The old site ran two stacked bars — a utility strip with the phone number and
 * a nav below it — which cost 120px of vertical space before any content. That
 * strip is kept, but only above 1024px and only 34px tall; below that the phone
 * number lives in the bar itself and in the fixed call bar at the bottom of the
 * viewport, where a thumb can reach it.
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
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /*
   * Close the drawer on navigation — a client-side route change would
   * otherwise leave it open over the new page.
   *
   * Adjusted during render rather than in an effect. An effect would paint the
   * new page with the drawer still covering it for one frame, and setState
   * inside an effect body is the cascading-render pattern React now warns
   * about. Comparing against the path the drawer was opened at also catches
   * back/forward navigation, which an onClick on the links would miss.
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

  const solid = scrolled || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-500 ${
          solid
            ? "bg-paper border-b border-[var(--rule)] shadow-[0_1px_24px_rgba(6,42,68,0.06)]"
            : "on-dark border-b border-transparent"
        }`}
      >
        {/* Utility strip. Desktop only — see the note above. */}
        <div
          className={`hidden lg:block border-b transition-colors duration-500 ${
            solid ? "border-[var(--rule)]" : "border-white/12"
          }`}
        >
          <div className="wrap flex h-[34px] items-center justify-between">
            <div className="flex items-center gap-6">
              <a href={site.phoneHref} className="mi flex items-center gap-2 hover:text-aqua transition-colors">
                <Phone size={13} />
                {site.phone}
              </a>
              <a href={site.emailHref} className="mi flex items-center gap-2 hover:text-aqua transition-colors">
                <Mail size={13} />
                {site.email}
              </a>
            </div>
            <div className="flex items-center gap-5">
              <span className="mi" style={{ color: "var(--ink-3)" }}>
                {site.serviceArea}
              </span>
              <a
                href={site.facebook}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Crystal Waters Plumbing on Facebook"
                className="hover:text-aqua transition-colors"
              >
                <Facebook size={14} />
              </a>
            </div>
          </div>
        </div>

        <div className="wrap flex h-[62px] lg:h-[72px] items-center justify-between gap-6">
          <Link href="/" className="shrink-0" aria-label={`${site.name} — home`}>
            {/*
              The supplied logo is a blue wordmark with a dark subtitle, which
              disappears against the dark hero. Rather than commission a second
              file, the whole mark is brightness-inverted while the bar is
              transparent — the blue survives the invert as a pale blue, and the
              dark subtitle becomes legible.
            */}
            {/* eslint-disable-next-line @next/next/no-img-element -- the export
                is unoptimised, so next/image would only add a wrapper. */}
            <img
              src={asset("/img/logo.png")}
              alt={site.legalName}
              width={190}
              height={44}
              className="h-[30px] lg:h-[36px] w-auto transition-[filter] duration-500"
              style={{ filter: solid ? "none" : "brightness(0) invert(1)" }}
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
                      <svg width="9" height="9" viewBox="0 0 10 10" aria-hidden="true" className="opacity-50">
                        <path d="m2 4 3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.4" />
                      </svg>
                    )}
                  </Link>

                  {item.children && (
                    // Opens on hover and on keyboard focus within, so the
                    // submenu is reachable without a mouse.
                    <div className="invisible absolute left-0 top-full w-[290px] translate-y-1 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                      <div className="mt-1 border border-[var(--rule)] bg-paper py-2 shadow-[0_18px_44px_rgba(6,42,68,0.13)]">
                        {item.children.map((child) => (
                          <Link
                            key={child.slug}
                            href={`/services/${child.slug}/`}
                            className="mi block px-5 py-3 text-ink transition-colors hover:bg-mist hover:text-aqua"
                          >
                            {child.nav}
                          </Link>
                        ))}
                        <div className="mx-5 my-2 h-px bg-[var(--rule)]" />
                        <Link
                          href="/services/all-services/"
                          className="mi block px-5 py-3 transition-colors hover:bg-mist hover:text-aqua"
                          style={{ color: "var(--ink-3)" }}
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

          <div className="flex items-center gap-2">
            <a href={site.phoneHref} className="btn btn-aqua lg:hidden !px-4 !py-2.5" aria-label={`Call ${site.phone}`}>
              <Phone size={14} />
              Call
            </a>
            <Link href="/contact/#quote" className="btn btn-solid hidden sm:inline-flex">
              Get a free quote
              <Arrow size={14} />
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="lg:hidden ml-1 grid h-10 w-10 place-items-center"
            >
              <span className="relative block h-[13px] w-[22px]">
                {[0, 6, 12].map((top, i) => (
                  <span
                    key={top}
                    className="absolute left-0 block h-px w-full bg-current transition-all duration-400"
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
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-400 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-paper" />
        <div className="relative h-full overflow-y-auto px-6 pb-10 pt-[74px]">
          <nav className="flex flex-col">
            {NAV.map((item) => (
              <div key={item.href} className="border-b border-[var(--rule)]">
                <Link href={item.href} className="dsp-sm block py-5 text-[26px]">
                  {item.label}
                </Link>
                {item.children && (
                  <div className="-mt-1 pb-5 flex flex-col gap-3">
                    {item.children.map((child) => (
                      <Link key={child.slug} href={`/services/${child.slug}/`} className="mi" style={{ color: "var(--ink-3)" }}>
                        {child.nav}
                      </Link>
                    ))}
                    <Link href="/services/all-services/" className="mi" style={{ color: "var(--ink-3)" }}>
                      All services
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="mt-8 flex flex-col gap-3">
            <a href={site.phoneHref} className="btn btn-aqua w-full">
              <Phone size={15} />
              {site.phone}
            </a>
            <Link href="/contact/#quote" className="btn btn-solid w-full">
              Get a free quote
              <Arrow size={14} />
            </Link>
          </div>

          <div className="mt-8 flex flex-col gap-2">
            <a href={site.emailHref} className="mi" style={{ color: "var(--ink-3)" }}>
              {site.email}
            </a>
            <span className="mi" style={{ color: "var(--ink-3)" }}>
              {site.address.full}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
