"use client";

import { useEffect, useMemo, useState } from "react";
import { gallery } from "@/content/site";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Arrow } from "@/components/ui/Icons";

/*
 * The gallery.
 *
 * The old page was fifteen images in a Jetpack tiled mosaic with no captions,
 * no grouping and a lightbox that loaded the full 2048px original over a mobile
 * connection. Three changes:
 *
 *   - Grouped by trade, with a filter. Somebody who came for a bathroom quote
 *     should not have to scroll past nine gas fittings to find one.
 *   - Captioned. An uncaptioned photograph of pipework tells a prospective
 *     customer nothing; "kerb adaptor, driveway reinstated" tells them the job
 *     was finished properly.
 *   - The lightbox loads the same 1600px webp the grid already has in cache,
 *     rather than the original.
 */

const TAGS = ["All", "Bathroom", "Kitchen", "Hot water", "Gas", "Drainage"] as const;

export function GalleryGrid() {
  const [tag, setTag] = useState<(typeof TAGS)[number]>("All");
  const [open, setOpen] = useState<number | null>(null);

  const items = useMemo(
    () => (tag === "All" ? gallery : gallery.filter((g) => g.tag === tag)),
    [tag]
  );

  // Escape closes; arrows step through. A lightbox you can only leave with the
  // mouse is the most common way one of these gets shipped broken.
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? null : (i + 1) % items.length));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? null : (i - 1 + items.length) % items.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, items.length]);

  // The filter is only ever changed by the buttons below, which close the
  // lightbox as they switch. Doing it there rather than in an effect keeps the
  // two state updates in one render — `open` is an index into `items`, so a
  // frame where the filter has changed but the index has not would point at the
  // wrong photograph.
  function filter(next: (typeof TAGS)[number]) {
    setTag(next);
    setOpen(null);
  }

  const current = open === null ? null : items[open];

  return (
    <section className="sec bg-paper">
      <div className="wrap">
        <Reveal className="mb-10 flex flex-wrap gap-2">
          {TAGS.map((t) => {
            const count = t === "All" ? gallery.length : gallery.filter((g) => g.tag === t).length;
            return (
              <button
                key={t}
                type="button"
                onClick={() => filter(t)}
                aria-pressed={tag === t}
                className={`mi border px-4 py-2.5 transition-colors duration-300 ${
                  tag === t
                    ? "border-navy bg-navy text-white"
                    : "border-[var(--rule)] hover:border-[var(--ink-3)]"
                }`}
              >
                {t}
                <span className="ml-2 opacity-50">{count}</span>
              </button>
            );
          })}
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.image} delay={(i % 3) * 80}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group block w-full text-left"
                aria-label={`View ${item.caption}`}
              >
                <div className="plate plate-zoom aspect-[4/5]">
                  <Photo name={item.image} alt={item.alt} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-4">
                  <span className="mi-lg">{item.caption}</span>
                  <span className="mi shrink-0" style={{ color: "var(--ink-3)" }}>
                    {item.tag}
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ── Lightbox ─────────────────────────────────────────────────── */}
      {current && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-navy-deep/96 p-4 md:p-10"
          role="dialog"
          aria-modal="true"
          aria-label={current.caption}
          onClick={() => setOpen(null)}
        >
          <button
            type="button"
            onClick={() => setOpen(null)}
            aria-label="Close"
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center border border-white/25 text-white transition-colors hover:bg-white hover:text-navy"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M6 6 18 18M18 6 6 18" />
            </svg>
          </button>

          {items.length > 1 && (
            <>
              <NavButton
                side="left"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen((i) => (i === null ? null : (i - 1 + items.length) % items.length));
                }}
              />
              <NavButton
                side="right"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen((i) => (i === null ? null : (i + 1) % items.length));
                }}
              />
            </>
          )}

          <figure className="max-h-full max-w-[1000px]" onClick={(e) => e.stopPropagation()}>
            <Photo
              name={current.image}
              alt={current.alt}
              sizes="(min-width: 1024px) 1000px, 100vw"
              className="max-h-[76vh] w-auto object-contain"
            />
            <figcaption className="mt-4 flex items-baseline justify-between gap-6 text-white">
              <span className="mi-lg">{current.caption}</span>
              <span className="mi" style={{ color: "rgba(255,255,255,0.5)" }}>
                {(open ?? 0) + 1} / {items.length}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}

function NavButton({ side, onClick }: { side: "left" | "right"; onClick: (e: React.MouseEvent) => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Previous" : "Next"}
      className={`absolute top-1/2 hidden -translate-y-1/2 place-items-center border border-white/25 text-white transition-colors hover:bg-white hover:text-navy md:grid md:h-12 md:w-12 ${
        side === "left" ? "left-5" : "right-5"
      }`}
    >
      <Arrow size={18} className={side === "left" ? "rotate-180" : ""} />
    </button>
  );
}
