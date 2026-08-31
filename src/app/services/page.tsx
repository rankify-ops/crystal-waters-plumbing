import type { Metadata } from "next";
import { PageHero } from "@/components/sections/Hero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { StatsBand } from "@/components/sections/Pillars";
import { Process } from "@/components/sections/Process";
import { QuoteBand } from "@/components/sections/QuoteBand";
import { Faq } from "@/components/sections/Faq";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Plumbing Services Gold Coast",
  description:
    "Blocked drains, hot water systems, leak detection and kitchen and bathroom renovations across the Gold Coast. No call-out fee, lifetime workmanship warranty.",
  alternates: { canonical: "/services/" },
};

/*
 * The services hub.
 *
 * The old /services/ page was almost entirely the Divi Plumber demo theme's
 * placeholder text — "Sed ut perspiciatis unde omnis iste natus…" set as the
 * page's own introduction, with an "OUR GALLERY" button pointing at
 * diviplumber.digitalrefresh.uk and an "Electrical work" tile linking to a
 * Facebook page. None of that was salvageable, so the introduction below is
 * written from the claims the rest of the site actually makes. Worth a read
 * from Nick before this goes live.
 */
export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Services"
        title="Plumbing, gas & drainage"
        lead="A full range of plumbing, gas and drainage services from Palm Beach to Helensvale — the same team, the same upfront pricing, whether it is a dripping tap or a full bathroom."
        image="svc-kitchen"
        imageAlt="A new Gold Coast kitchen plumbed and fitted off by Crystal Waters"
      />

      <section className="sec bg-paper">
        <div className="wrap">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Reveal className="mi eyebrow">
                <span>What we do</span>
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <Reveal variant="mask">
                <h2 className="dsp-sm text-[clamp(24px,3.6vw,38px)]">
                  One team, the whole property
                </h2>
              </Reveal>
              <Reveal delay={100}>
                <p className="bd-lg mt-6 max-w-[680px]">
                  Most plumbing jobs are not one job. A blocked drain turns out
                  to be a root in a cracked line; a hot water replacement turns
                  into relocating a pipe that should never have been where it
                  was. We hold the licences for all of it — plumbing, drainage
                  and gas — so the work does not stop while somebody else gets
                  booked in.
                </p>
              </Reveal>
              <Reveal delay={160}>
                <p className="bd-lg mt-5 max-w-[680px]">
                  With 25+ years in the plumbing and building industry behind the
                  business, we also know what the other trades need from us.
                  On a renovation that is the difference between a tiler waiting
                  and a tiler working.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <ServicesGrid heading={false} />
      <StatsBand />
      <Process />
      <QuoteBand />
      <Faq />
    </>
  );
}
