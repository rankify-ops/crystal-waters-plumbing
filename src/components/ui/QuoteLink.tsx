"use client";

import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Every "get a free quote" control on the site.
 *
 * Every page carries its own quote form, so these should scroll DOWN the page
 * the visitor is already on rather than throwing them to /contact/ and making
 * them find their place again. They used to be hard links to /contact/#quote,
 * which on the contact page itself was a same-page jump and everywhere else
 * was a navigation nobody asked for.
 *
 * The href stays /contact/#quote so the markup is correct without JavaScript,
 * for a crawler, and on the 404 page — which is the one page with a header but
 * no form on it. The click handler only takes over when there is genuinely a
 * #quote on this page to scroll to.
 */
export function QuoteLink({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href="/contact/#quote"
      className={className}
      onClick={(e) => {
        // Modified clicks are the visitor asking for a new tab or window.
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

        const target = document.getElementById("quote");
        if (!target) return; // No form here — let the link navigate.

        e.preventDefault();
        target.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
          block: "start",
        });
        // Move focus as well as the viewport, or a keyboard visitor is still
        // parked back up in the header. #quote is the form card, which takes a
        // tabIndex of -1 for exactly this.
        target.focus?.({ preventScroll: true });
      }}
    >
      {children}
    </Link>
  );
}
