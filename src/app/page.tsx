import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { Pillars } from "@/components/sections/Pillars";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Process } from "@/components/sections/Process";
import { Reviews } from "@/components/sections/Reviews";
import { Faq } from "@/components/sections/Faq";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Arrow } from "@/components/ui/Icons";
import { site, yearsTrading } from "@/content/site";

export default function Home() {
  return (
    <>
      <Hero />
      <Pillars />
      <ServicesGrid />
      <Intro />
      <Process />
      <Reviews limit={6} />
      <Faq limit={5} />
    </>
  );
}

/*
 * The "who we are" band.
 *
 * The old home page ran this as a paragraph headed "Expert Plumbing Services
 * You Can Rely On" with a "MORE ABOUT US" button that pointed at
 * diviplumber.digitalrefresh.uk — the demo site the theme was built from. The
 * copy is kept; the link now goes to their own About page.
 */
function Intro() {
  return (
    <section className="sec bg-paper">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-6">
            <div className="plate aspect-[5/4]">
              <Photo
                name="team-vans"
                alt="The Crystal Waters Plumbing team and vans on a Gold Coast job"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </Reveal>

          <div className="lg:col-span-6 lg:pt-6">
            <Reveal className="mi eyebrow mb-8">
              <span>Crystal Waters Plumbing &amp; Drainage</span>
            </Reveal>
            <Reveal variant="mask">
              <h2 className="dsp text-[clamp(30px,5vw,52px)]">
                Your local
                <br />
                <span className="hi">community</span>
                <br />
                plumber
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="bd-lg mt-8 max-w-[520px]">
                When plumbing problems strike, you need a dependable local
                plumber you can trust. With {yearsTrading()} years of dedicated
                service to the Gold Coast, we have earned a reputation for
                excellence you can count on.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <p className="bd mt-5 max-w-[520px]">
                Established in July {site.establishedYear}, Crystal Waters Plumbing
                &amp; Drainage was named after the crystal-clear waterfalls that
                carve their way through the rainforest behind the coast, tumbling
                down the creeks before snaking out to the Pacific. We fix leaky
                tap washers, we plumb new homes, and we do everything in between.
                Burst pipe? We have you covered. Gas leak? That too.
              </p>
            </Reveal>
            <Reveal delay={240} className="mt-10 flex flex-wrap gap-3">
              <Link href="/about-us/" className="btn">
                More about us
                <Arrow size={14} />
              </Link>
              <Link href="/gallery/" className="btn">
                See our work
                <Arrow size={14} />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
