"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Two entrances, one observer.
 *
 * `mask` clips and slides display type out from behind a hard edge, so the
 * letters are genuinely occluded rather than transparent over it.
 * `rise` fades and lifts everything else.
 *
 * Both fire once and then disconnect. Elements that re-animate every time they
 * re-enter the viewport make a long page feel restless.
 */
export function Reveal({
  children,
  variant = "rise",
  delay = 0,
  className = "",
  as: Tag = "div",
  style,
}: {
  children: ReactNode;
  variant?: "rise" | "mask";
  delay?: number;
  className?: string;
  as?: "div" | "span" | "li";
  /** Merged after the transition delay, so a caller can re-point CSS
      variables for the subtree without losing the stagger. */
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.shown = "true";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      // One ref type across three possible tags; the DOM node is the same
      // shape for the purposes of dataset and IntersectionObserver.
      ref={ref as React.Ref<never>}
      className={`${variant} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {/* .mask needs a single block child to translate; .rise ignores it. */}
      {variant === "mask" ? <span>{children}</span> : children}
    </Tag>
  );
}
