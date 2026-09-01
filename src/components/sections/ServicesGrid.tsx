import Link from "next/link";
import { services } from "@/content/site";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Arrow } from "@/components/ui/Icons";

/*
 * The four services.
 *
 * The old home page rendered these as four small tiles, one of which — the
 * "Electrical work" tile — linked to a Facebook page rather than to a page on
 * the site, and none of which said what the service actually covered. Here each
 * card carries its photograph, the first line of its own page's lead, and a
 * count of what it includes, so the grid is a summary rather than a menu.
 *
 * Electrical is no longer one of the four. It is not a service this business
 * performs — it belongs to their sister company — so it appears in the FAQ and
 * on the About page as a referral, which is what it always was.
 */
export function ServicesGrid({ heading = true }: { heading?: boolean }) {
  return (
    <section className="sec bg-mist">
      <div className="wrap">
        {heading && (
          <>
            <Reveal className="mi eyebrow mb-8">
              <span>What we do</span>
            </Reveal>
            <div className="mb-14 grid gap-8 md:grid-cols-12 md:items-end">
              <Reveal variant="mask" className="md:col-span-7">
                <h2 className="dsp text-[clamp(32px,5.6vw,60px)]">
                  Four things,
                  <br />
                  <span className="hi">done properly</span>
                </h2>
              </Reveal>
              <Reveal delay={120} className="md:col-span-5">
                <p className="bd">
                  We believe in fair and honest pricing. You get an upfront quote
                  with no hidden fees and no call-out fee, so you always know
                  what to expect before anyone picks up a tool.
                </p>
              </Reveal>
            </div>
          </>
        )}

        <div className="grid overflow-hidden rounded-2xl border border-[var(--rule)] gap-px bg-[var(--rule)] md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 80} className="bg-paper">
              <Link
                href={`/services/${s.slug}/`}
                className="group relative block h-full bg-paper transition-colors duration-500 hover:bg-navy"
              >
                <div className="plate plate-zoom aspect-[16/10] w-full">
                  <Photo name={s.image} alt={s.imageAlt} sizes="(min-width: 768px) 50vw, 100vw" />
                </div>
                <div className="p-7 md:p-9">
                  <span className="mi block transition-colors duration-500 group-hover:text-[var(--aqua-bright)]" style={{ color: "var(--aqua)" }}>
                    {String(i + 1).padStart(2, "0")} — {s.list.length} services
                  </span>
                  <h3 className="dsp-sm mt-4 text-[22px] transition-colors duration-500 group-hover:text-white md:text-[26px]">
                    {s.title}
                  </h3>
                  <p className="bd-sm mt-4 line-clamp-3 max-w-[420px] transition-colors duration-500 group-hover:text-white/72">
                    {s.lead}
                  </p>
                  <span className="mi mt-7 inline-flex items-center gap-2.5 transition-colors duration-500 group-hover:text-white">
                    View service
                    <Arrow size={14} className="transition-transform duration-500 group-hover:translate-x-1.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-10">
          <Link href="/services/all-services/" className="btn">
            See everything we do
            <Arrow size={14} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
