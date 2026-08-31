import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/Hero";
import { Pillars, StatsBand } from "@/components/sections/Pillars";
import { Reviews } from "@/components/sections/Reviews";
import { QuoteBand } from "@/components/sections/QuoteBand";
import { team, site, yearsTrading } from "@/content/site";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Arrow } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Crystal Waters Plumbing & Drainage is a small family-run business in Robina, established 2018, covering Palm Beach to Helensvale. Meet Nick, Hayden and Ethan.",
  alternates: { canonical: "/about-us/" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About"
        title="Your local plumbing & drainage company"
        lead="A very small family-run business that would rather do a handful of jobs properly than a lot of them quickly."
        image="team-vans"
        imageAlt="The Crystal Waters Plumbing team and vans"
      />

      {/* ── The name ─────────────────────────────────────────────────── */}
      <section className="sec bg-paper">
        <div className="wrap">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-6">
              <Reveal className="mi eyebrow mb-8">
                <span>Crystal Waters Plumbing &amp; Drainage</span>
              </Reveal>
              <Reveal variant="mask">
                <h2 className="dsp text-[clamp(28px,4.6vw,50px)]">
                  We are your
                  <br />
                  local <span className="hi">specialist</span>
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="bd-lg mt-8 max-w-[520px]">
                  Established in July {site.establishedYear}, Crystal Waters
                  Plumbing &amp; Drainage was named after the spectacular
                  crystal-clear waterfalls that cascade down and carve their way
                  through the towering rainforest, tumbling through the creeks
                  before snaking out to the Pacific Ocean.
                </p>
              </Reveal>
              <Reveal delay={180}>
                <p className="bd mt-5 max-w-[520px]">
                  Our work is carried out to an extremely high standard and
                  customer service is of the utmost importance. With 25+ years
                  of experience in the plumbing industry, we fix leaky tap
                  washers, we plumb new homes, and we do everything in between.
                  Burst pipe? We have you covered. Gas leak? That too.
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-9 border-l-2 border-aqua pl-6">
                  <p className="bd max-w-[480px]">
                    If you need an electrician, check out our sister company,{" "}
                    <span className="text-ink">{site.sister.name}</span>. Talk to{" "}
                    {site.sister.contact} on{" "}
                    <a href={site.sister.phoneHref} className="ln text-ink">
                      {site.sister.phone}
                    </a>{" "}
                    — he carries out some of the finest work on the Gold Coast.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={100} className="lg:col-span-6">
              {/* The waterfall the business is named after. On the old site
                  this image was decoration on a page that never explained it;
                  here it sits directly beside the paragraph that does. */}
              <div className="plate aspect-[4/3]">
                <Photo
                  name="waterfall"
                  alt="A rainforest waterfall in the Gold Coast hinterland — the business is named after these"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
              <p className="mi mt-4" style={{ color: "var(--ink-3)" }}>
                The hinterland falls the business is named after
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <Pillars />
      <StatsBand />

      {/* ── Team ─────────────────────────────────────────────────────── */}
      <section className="sec bg-paper">
        <div className="wrap">
          <div className="mb-14 grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Reveal className="mi eyebrow mb-8">
                <span>Who we are</span>
              </Reveal>
              <Reveal variant="mask">
                <h2 className="dsp text-[clamp(30px,5.4vw,58px)]">
                  Get to know
                  <br />
                  <span className="hi">the team</span>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={120} className="md:col-span-5">
              <p className="bd">
                We are a very small family-run business that sets out to offer
                one of the best services available on the Gold Coast. We keep it
                simple, so we can keep doing it properly.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-px bg-[var(--rule)] md:grid-cols-3">
            {team.map((member, i) => (
              <Reveal key={member.name} delay={i * 90} className="bg-paper">
                <div className="plate aspect-[4/5]">
                  <Photo name={member.image} alt={`${member.name} — ${member.role}`} sizes="(min-width: 768px) 33vw, 100vw" />
                </div>
                <div className="p-7 md:p-8">
                  <span className="mi block" style={{ color: "var(--aqua)" }}>
                    {member.role}
                  </span>
                  <h3 className="dsp mt-4 text-[30px]">{member.name}</h3>
                  {member.body.map((p, j) => (
                    <p key={j} className="bd-sm mt-4">
                      {p}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Surf club ────────────────────────────────────────────────── */}
      <section className="on-dark relative overflow-hidden bg-navy">
        <div className="absolute inset-0">
          <Photo name="surf-life-saving" alt="" sizes="100vw" className="h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/40" />
        </div>
        <div className="wrap relative py-20 md:py-28">
          <div className="max-w-[620px]">
            <Reveal className="mi eyebrow mb-8">
              <span>Miami Beach SLSC</span>
            </Reveal>
            <Reveal variant="mask">
              <h2 className="dsp text-[clamp(26px,4.4vw,46px)]">
                Two of us patrol
                <br />
                <span className="hi">your beaches</span>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="bd-lg mt-7">
                Nick looks after the equipment at Miami Beach Surf Life Saving
                Club and patrols as a member; Ethan patrols there too. It is not
                a plumbing credential, but it is the reason you will see the
                vans around Miami on a Sunday.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Closing ──────────────────────────────────────────────────── */}
      <section className="sec bg-mist">
        <div className="wrap">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal className="mi eyebrow mb-8">
                <span>{yearsTrading()} years on the coast</span>
              </Reveal>
              <Reveal variant="mask">
                <h2 className="dsp-sm text-[clamp(24px,3.8vw,40px)]">
                  With {site.reviews.count} five-star reviews, we are the plumbers
                  Gold Coast locals prefer
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="bd-lg mt-7 max-w-[620px]">
                  Our team consistently strives to give you the best possible
                  experience, regardless of the scale of the project. We keep the
                  same level of precision and care throughout the entire process,
                  no matter the size of the job.
                </p>
              </Reveal>
              <Reveal delay={180} className="mt-9 flex flex-wrap gap-3">
                <Link href="/contact/#quote" className="btn btn-solid">
                  Contact us
                  <Arrow size={14} />
                </Link>
                <Link href="/gallery/" className="btn">
                  See our work
                  <Arrow size={14} />
                </Link>
              </Reveal>
            </div>
            <Reveal delay={100} className="lg:col-span-5">
              <div className="plate aspect-[4/3]">
                <Photo name="house" alt="A Gold Coast home Crystal Waters has worked on" sizes="(min-width: 1024px) 40vw, 100vw" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Reviews />
      <QuoteBand />
    </>
  );
}
