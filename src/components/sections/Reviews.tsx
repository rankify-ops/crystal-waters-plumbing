import { reviews, site } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { Star, Google, Arrow } from "@/components/ui/Icons";

/*
 * The Google reviews.
 *
 * The old site embedded a Trustindex widget: a third-party script that dropped
 * its own fonts, its own CSS and a carousel into the page, and rendered all ten
 * reviews as a horizontal slider on desktop and a stack on mobile. The text is
 * the client's asset, not the widget's, so it now lives in content/site.ts and
 * renders as static markup — no script, no layout shift, and the reviews are in
 * the HTML where a search engine can read them.
 *
 * A masonry column layout rather than equal cards, because these reviews range
 * from six words to eighty and forcing them into equal boxes means either
 * truncating the long ones or padding the short ones with air.
 */
export function Reviews({ limit }: { limit?: number }) {
  const shown = limit ? reviews.slice(0, limit) : reviews;

  return (
    <section className="sec bg-mist">
      <div className="wrap">
        <div className="mb-14 grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Reveal className="mi eyebrow mb-8">
              <span>What our customers say</span>
            </Reveal>
            <Reveal variant="mask">
              <h2 className="dsp text-[clamp(30px,5.4vw,58px)]">
                {site.reviews.count} reviews,
                <br />
                <span className="hi">five stars</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={120} className="md:col-span-5">
            <div className="flex items-center gap-4 border border-[var(--rule)] bg-paper px-5 py-4">
              <Google size={26} />
              <div>
                <div className="flex items-center gap-2">
                  <span className="stars flex gap-0.5">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} size={12} />
                    ))}
                  </span>
                  <span className="mi">{site.reviews.rating}</span>
                </div>
                <div className="mi mt-1" style={{ color: "var(--ink-3)" }}>
                  {site.reviews.count} Google reviews
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* CSS columns: each review is as tall as its own text. break-inside
            keeps a quote from being sliced across the column boundary. */}
        <div className="columns-1 gap-5 md:columns-2 lg:columns-3">
          {shown.map((r, i) => (
            <Reveal key={r.name} delay={(i % 3) * 90} className="mb-5 break-inside-avoid">
              <figure className="border border-[var(--rule)] bg-paper p-6 md:p-7">
                <span className="stars flex gap-0.5">
                  {Array.from({ length: 5 }, (_, s) => (
                    <Star key={s} size={12} />
                  ))}
                </span>
                <blockquote className="bd mt-4 text-ink">{r.body}</blockquote>
                <figcaption className="mi mt-5 flex items-center gap-2.5 border-t border-[var(--rule)] pt-4">
                  <Google size={14} />
                  <span>{r.name}</span>
                  <span style={{ color: "var(--ink-3)" }}>· Google</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-10">
          <a href={site.reviews.writeUrl} target="_blank" rel="noreferrer noopener" className="btn">
            Leave us a review
            <Arrow size={14} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
