import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/Hero";
import { QuoteBand } from "@/components/sections/QuoteBand";
import { Reviews } from "@/components/sections/Reviews";
import { allServices, services, site } from "@/content/site";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Arrow, Phone } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "All Plumbing Services",
  description:
    "Everything Crystal Waters Plumbing & Drainage does on the Gold Coast — general plumbing, burst pipes, gas fitting, bathroom upgrades, drain unblocking, tanks and pumps and more.",
  alternates: { canonical: "/services/all-services/" },
};

/*
 * The full list.
 *
 * This URL is preserved from the old site, where the page was a POWER FLUSHING
 * headline over nine services and four "Jack Jones – Customer" testimonials,
 * all of it demo content from the Divi Plumber theme. Rebuilt as what the URL
 * promises: everything they do, in one list, with the four main services
 * pulled out and linked.
 */
export default function AllServicesPage() {
  return (
    <>
      <PageHero
        label="All services"
        title="Everything we do"
        lead="Leaky tap washers to new homes, and everything in between. If it carries water or gas, we work on it."
        image="wall-leak-chase"
        imageAlt="Chasing out a wall to reach a leaking pipe"
      />

      {/* ── The four main services, linked ────────────────────────────── */}
      <section className="sec bg-paper">
        <div className="wrap">
          <Reveal className="mi eyebrow mb-10">
            <span>Main services</span>
          </Reveal>
          <div className="grid overflow-hidden rounded-2xl border border-[var(--rule)] gap-px bg-[var(--rule)] md:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={i * 70} className="bg-paper">
                <Link href={`/services/${s.slug}/`} className="group block h-full bg-paper transition-colors duration-500 hover:bg-navy">
                  <div className="plate plate-zoom aspect-[4/3]">
                    <Photo name={s.image} alt={s.imageAlt} sizes="(min-width: 1024px) 25vw, 50vw" />
                  </div>
                  <div className="p-6">
                    <h3 className="dsp-sm text-[17px] transition-colors duration-500 group-hover:text-white">
                      {s.nav}
                    </h3>
                    <span className="mi mt-3 inline-flex items-center gap-2 transition-colors duration-500 group-hover:text-white" style={{ color: "var(--aqua)" }}>
                      View
                      <Arrow size={12} className="transition-transform duration-500 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── The full list ─────────────────────────────────────────────── */}
      <section className="on-dark bg-navy sec">
        <div className="wrap">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Reveal className="mi eyebrow mb-8">
                <span>The full list</span>
              </Reveal>
              <Reveal variant="mask">
                <h2 className="dsp text-[clamp(28px,4.6vw,48px)]">
                  If it carries
                  <br />
                  <span className="hi">water or gas</span>
                </h2>
              </Reveal>
              <Reveal delay={140}>
                <p className="bd-lg mt-7 max-w-[380px]">
                  Not sure whether what you need is on the list? Call and ask —
                  it usually is, and if it is not we will tell you who to ring.
                </p>
              </Reveal>
              <Reveal delay={200} className="mt-8">
                <a href={site.phoneHref} className="btn btn-aqua">
                  <Phone size={15} />
                  {site.phone}
                </a>
              </Reveal>
            </div>

            <div className="lg:col-span-8">
              <ul className="grid gap-x-10 border-t border-[var(--rule)] sm:grid-cols-2">
                {allServices.map((item, i) => (
                  <Reveal as="li" key={item} delay={(i % 2) * 60} className="block border-b border-[var(--rule)]">
                    <span className="tick mi-lg block py-5">{item}</span>
                  </Reveal>
                ))}
              </ul>

              {/* Electrical is not one of ours — it belongs to the sister
                  company the About page credits. Saying so here is better than
                  the old site's approach, which listed "Electrical work" as a
                  service tile that linked to a Facebook page. */}
              <Reveal delay={140} className="mt-10 border border-[var(--rule)] p-6 md:p-8">
                <span className="mi block" style={{ color: "var(--aqua-bright)" }}>
                  Need an electrician?
                </span>
                <p className="bd mt-4 max-w-[520px]">
                  Electrical work is handled by our sister company,{" "}
                  <span className="text-white">{site.sister.name}</span>. Talk to{" "}
                  {site.sister.contact} on{" "}
                  <a href={site.sister.phoneHref} className="ln text-white">
                    {site.sister.phone}
                  </a>{" "}
                  — he carries out some of the finest work on the Gold Coast.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <QuoteBand />
      <Reviews limit={6} />
    </>
  );
}
