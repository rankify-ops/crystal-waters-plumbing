import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, site } from "@/content/site";
import { PageHero } from "@/components/sections/Hero";
import { Reviews } from "@/components/sections/Reviews";
import { QuoteBand } from "@/components/sections/QuoteBand";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Arrow } from "@/components/ui/Icons";

/*
 * The four service pages, from one template.
 *
 * The old build had these as four separately hand-laid Divi pages that had
 * drifted apart: one repeated the kitchen-and-bathroom intro under a hot water
 * heading, one had a "WHY HOOSE" typo in an H2, and all four ended with a
 * contact form whose mailto pointed at demo@diviplumber.co.uk. One template
 * means a fix lands on all four at once.
 *
 * Slugs are preserved exactly as WordPress served them — see content/site.ts.
 */

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    // `absolute` because metaTitle already carries the brand — going through
    // the root layout's "%s | Crystal Waters Plumbing" template would append it
    // a second time.
    title: { absolute: service.metaTitle },
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}/` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `${site.url}/services/${service.slug}/`,
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== slug);

  return (
    <>
      <PageHero
        label={service.nav}
        title={service.title}
        lead={service.lead}
        image={service.image}
        imageAlt={service.imageAlt}
      />

      {/* ── Editorial blocks. Alternating ground so a page with four of them
             (water leaks) does not read as one undifferentiated wall. ── */}
      {service.blocks.map((block, i) => (
        <section key={block.heading} className={`sec ${i % 2 === 0 ? "bg-paper" : "bg-mist"}`}>
          <div className="wrap">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <Reveal className="mi eyebrow lg:sticky lg:top-28">
                  <span>{block.label}</span>
                </Reveal>
              </div>
              <div className="lg:col-span-8">
                <Reveal variant="mask">
                  <h2 className="dsp-sm text-[clamp(24px,3.6vw,38px)]">{block.heading}</h2>
                </Reveal>
                {/*
                  Two changes for scanning, both measured.

                  MEASURE: these ran 680px at 17px — about 84 characters a
                  line, well past the 60–75 the eye tracks comfortably. 620px
                  brings it to roughly 76 and, more usefully, adds a line break
                  every 12 words or so instead of every 14.

                  ENTRY POINT: the first paragraph of each block is now set as
                  a lead — larger and in full-strength ink rather than the
                  secondary grey. A 60-word paragraph in uniform grey has
                  nowhere for the eye to land; giving the opening sentence
                  weight means the block can be skimmed by reading only its
                  first paragraph, which is how these pages are actually read.
                */}
                {block.body.map((p, j) => (
                  <Reveal key={j} delay={100 + j * 70}>
                    <p
                      className={
                        j === 0
                          ? "mt-6 max-w-[620px] text-[19px] font-medium leading-[1.6] text-ink"
                          : "bd-lg mt-5 max-w-[620px]"
                      }
                    >
                      {p}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── What is included ─────────────────────────────────────────── */}
      <section className="on-dark bg-navy sec">
        <div className="wrap">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal className="mi eyebrow mb-8">
                <span>{service.listLabel}</span>
              </Reveal>
              <Reveal variant="mask">
                <h2 className="dsp text-[clamp(28px,4.6vw,48px)]">
                  What we
                  <br />
                  <span className="hi">cover</span>
                </h2>
              </Reveal>
              <Reveal delay={140} className="mt-9">
                <div className="plate aspect-[4/3]">
                  <Photo name={service.image} alt={service.imageAlt} sizes="(min-width: 1024px) 40vw, 100vw" />
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <ul className="border-t border-[var(--rule)]">
                {service.list.map((item, i) => (
                  <Reveal as="li" key={item} delay={i * 50} className="block border-b border-[var(--rule)]">
                    <div className="flex items-baseline gap-6 py-5">
                      <span className="mi shrink-0 w-6" style={{ color: "var(--ink-3)" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="tick mi-lg">{item}</span>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why us ───────────────────────────────────────────────────── */}
      <section className="sec bg-paper">
        <div className="wrap">
          <Reveal className="mi eyebrow mb-8">
            <span>Why Crystal Waters</span>
          </Reveal>
          <Reveal variant="mask" className="mb-12">
            <h2 className="dsp-sm max-w-[880px] text-[clamp(24px,3.8vw,40px)]">{service.why.heading}</h2>
          </Reveal>

          {/*
            The column count follows the POINT COUNT, because the 1px dividers
            are the grid background showing through gap-px — which means any
            cell that has no card in it paints as a solid rule-coloured block.
            Drainage has four points; in three columns that left two grey
            rectangles on the second row. Four points go 2x2, three go 3-across,
            and neither ever has an empty cell at any breakpoint.
          */}
          <div className={`grid overflow-hidden rounded-2xl border border-[var(--rule)] gap-px bg-[var(--rule)] ${
            service.why.points.length === 4 ? "sm:grid-cols-2" : "md:grid-cols-3"
          }`}>
            {service.why.points.map((p, i) => (
              <Reveal key={p.term} delay={i * 90} className="bg-paper p-7 md:p-9">
                <span className="mi block" style={{ color: "var(--aqua)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="dsp-sentence mt-5 text-[19px]">{p.term}</h3>
                <p className="bd mt-3">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <QuoteBand
        presetJob={PRESET[service.slug]}
        label={`${service.nav} quote`}
        heading="Tell us what is going on"
      />

      <Reviews limit={6} />

      {/* ── The other three ──────────────────────────────────────────── */}
      <section className="sec bg-paper">
        <div className="wrap">
          <Reveal className="mi eyebrow mb-10">
            <span>Other services</span>
          </Reveal>
          <div className="grid overflow-hidden rounded-2xl border border-[var(--rule)] gap-px bg-[var(--rule)] md:grid-cols-3">
            {others.map((o, i) => (
              <Reveal key={o.slug} delay={i * 80} className="bg-paper">
                <Link href={`/services/${o.slug}/`} className="group block h-full bg-paper transition-colors duration-500 hover:bg-navy">
                  <div className="plate plate-zoom aspect-[16/10]">
                    <Photo name={o.image} alt={o.imageAlt} sizes="(min-width: 768px) 33vw, 100vw" />
                  </div>
                  <div className="p-6 md:p-7">
                    <h3 className="dsp-sm text-[18px] transition-colors duration-500 group-hover:text-white">
                      {o.title}
                    </h3>
                    <span className="mi mt-4 inline-flex items-center gap-2 transition-colors duration-500 group-hover:text-white" style={{ color: "var(--aqua)" }}>
                      View
                      <Arrow size={13} className="transition-transform duration-500 group-hover:translate-x-1.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/*
 * Maps a service slug onto the matching option in the quote form's first step,
 * so arriving from a service page skips a question that has already been
 * answered by the click that got you here. The strings must match the `value`
 * fields in QuoteForm's JOB list exactly.
 */
const PRESET: Record<string, string> = {
  "bathroom-kitchen": "Kitchen or bathroom",
  "hot-water-systems": "Hot water",
  "drainage-blockages": "Blocked drain",
  "water-leaks": "Leak or burst pipe",
};
