"use client";

import { QuoteLink } from "@/components/ui/QuoteLink";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { Phone } from "@/components/ui/Icons";

/*
 * Fixed call bar, phones only.
 *
 * A blocked drain or a burst pipe is a phone-in-hand emergency, and the header
 * scrolls away. This does not. It appears after the first viewport so it never
 * covers the hero's own CTAs, and it hides again over the footer, where the
 * same two buttons already exist at full size — two identical call buttons
 * stacked on top of each other is how a site starts looking like an ad.
 */
export function CallBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const nearBottom =
        y + window.innerHeight > document.documentElement.scrollHeight - 620;
      setShow(y > window.innerHeight * 0.75 && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 lg:hidden transition-transform duration-500 ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      // Sits above the iOS home indicator rather than under it.
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-2 border-t border-[var(--rule)] bg-paper">
        <a
          href={site.phoneHref}
          className="mi flex items-center justify-center gap-2.5 bg-aqua py-4 text-white"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="ping absolute inline-flex h-full w-full rounded-full bg-white opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
          </span>
          <Phone size={14} />
          {site.phone}
        </a>
        <QuoteLink className="mi flex items-center justify-center gap-2 bg-navy py-4 text-white">
          Free quote
        </QuoteLink>
      </div>
    </div>
  );
}
