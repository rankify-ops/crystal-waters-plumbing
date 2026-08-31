import { asset } from "@/lib/basePath";

/**
 * Every photograph on the site.
 *
 * scripts/images.mjs writes each source at two widths as webp; this picks
 * between them with a plain srcset. next/image is deliberately not used —
 * `output: "export"` runs it unoptimised anyway, so it would add a wrapper and
 * a layout shift for no optimisation at all.
 *
 * `sizes` defaults to full-viewport. Pass the real measure wherever the image
 * is smaller than that, or phones download the 1600 for a 380px slot.
 */
export function Photo({
  name,
  alt,
  className = "",
  sizes = "100vw",
  priority = false,
  style,
}: {
  name: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    /* `output: "export"` runs next/image unoptimised, so it would add a wrapper
       element and its own layout behaviour while doing no optimisation at all.
       scripts/images.mjs has already produced the two widths this srcset picks
       between. */
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset(`/img/${name}-1600.webp`)}
      srcSet={`${asset(`/img/${name}-800.webp`)} 800w, ${asset(`/img/${name}-1600.webp`)} 1600w`}
      sizes={sizes}
      alt={alt}
      className={className}
      style={style}
      loading={priority ? "eager" : "lazy"}
      // The hero is the LCP element; everything else can wait for layout.
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
    />
  );
}
