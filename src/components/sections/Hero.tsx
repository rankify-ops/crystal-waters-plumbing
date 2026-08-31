import Link from "next/link";
import { site, yearsTrading } from "@/content/site";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Phone, Arrow, Star, Google } from "@/components/ui/Icons";

/*
 * The home hero.
 *
 * A full-bleed photograph of an actual night call-out — their van, their light
 * tower, their cones on somebody's driveway. The old site opened on a stock
 * hero with the headline "Your Neighborhood's Plumbing Experts: Your
 * Satisfaction, Our Guarantee", which is a sentence that could sit on any
 * plumber's website in the country. This one says what they do and where, and
 * puts the two things people are actually deciding between — call now, or get a
 * price — in front of everything else.
 *
 * The photograph carries a four-part wash: a flat tint, a heavy top edge that
 * seats the transparent header, a heavier bottom edge, and a left-weighted
 * ramp under the type. White type over an unwashed photo is a coin toss;
 * washing only the side the type sits on keeps the picture visible.
 */
export function Hero() {
  return (
    <section className="on-dark relative min-h-[86vh] md:min-h-[92vh] overflow-hidden bg-navy-deep flex items-end">
      <div className="absolute inset-0">
        <Photo
          name="team-vans"
          alt="Nick and the Crystal Waters team in hi-vis between the Crystal Waters and EIC Electrical vans"
          sizes="100vw"
          priority
          // .hero-photo carries the crop, which has to differ between the
          // portrait and landscape framings — see globals.css.
          className="hero-photo h-full w-full object-cover"
        />
        {/* Flat tint, kept light — this photograph is the subject, not a
            texture, so the wash has to leave the two of them readable. */}
        <div className="absolute inset-0 bg-navy-deep/26" />
        {/* The scrim runs from the BOTTOM and from the RIGHT, which is where
            the type now sits. The old version ramped from the left and put the
            two of them in shadow to light a headline that was standing on top
            of them anyway. */}
        <div className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-navy-deep via-navy-deep/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-l from-navy-deep/88 via-navy-deep/30 to-transparent" />
        {/* Top edge, seating the transparent header. */}
        <div className="absolute inset-x-0 top-0 h-52 bg-gradient-to-b from-navy-deep/80 to-transparent" />
      </div>

      <div className="wrap relative w-full pb-14 pt-36 md:pb-20 md:pt-44">
        {/*
          The copy sits in the RIGHT column from lg up.

          Not a stylistic choice — the photograph decides it. Nick and his mate
          stand at 19–30% of the rendered width, and a left-hand headline runs
          to about 66%, so the two people the client actually wants leading the
          site were standing behind their own headline. Text right, subjects
          left. Below lg the column is full width and the type sits under them
          rather than beside them, which is why the bottom scrim carries the
          contrast on a phone.
        */}
        <div className="max-w-[620px] lg:ml-auto lg:max-w-[560px]">
          <Reveal className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            <span className="mi flex items-center gap-2.5 border border-white/20 px-3 py-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="ping absolute inline-flex h-full w-full rounded-full bg-[var(--aqua-bright)] opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--aqua-bright)]" />
              </span>
              Same-day call-outs available
            </span>
            <span className="mi" style={{ color: "var(--ink-3)" }}>
              Est. {site.establishedYear} · Robina
            </span>
          </Reveal>

          {/*
            Down from a 96px cap. At that size the three stacked lines of
            uppercase filled most of the frame and read as a poster rather than
            as a headline — and the display tracking, which is tuned for a
            couple of words, compounded it across nine syllables.
          */}
          <h1 className="dsp text-[clamp(32px,5.6vw,58px)]">
            <Reveal variant="mask">
              <span>Gold Coast</span>
            </Reveal>
            <Reveal variant="mask" delay={90}>
              <span className="hi">plumbing &amp;</span>
            </Reveal>
            <Reveal variant="mask" delay={180}>
              <span>drainage</span>
            </Reveal>
          </h1>

          <Reveal delay={260}>
            <p className="bd-lg mt-8 max-w-[520px] text-white/72">
              Blocked drains, hot water, leaks and renovations — from Palm Beach
              to Helensvale. {yearsTrading()} years trading, no call-out fee, and a
              lifetime warranty on every job we do.
            </p>
          </Reveal>

          <Reveal delay={340} className="mt-10 flex flex-wrap gap-3">
            <a href={site.phoneHref} className="btn btn-aqua">
              <Phone size={15} />
              {site.phone}
            </a>
            <Link href="/contact/#quote" className="btn">
              Get a free quote
              <Arrow size={14} />
            </Link>
          </Reveal>

          <Reveal delay={420} className="mt-12 flex items-center gap-4 border-t border-white/12 pt-7">
            <Google size={22} />
            <span className="stars flex gap-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} size={13} />
              ))}
            </span>
            <span className="mi">
              {site.reviews.rating} from {site.reviews.count} Google reviews
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/*
 * Inner-page hero.
 *
 * Shorter than the home hero and always the same height, so moving between
 * service pages does not feel like the site is resizing under you. Takes the
 * page's own photograph where it has one and falls back to the team shot.
 */
export function PageHero({
  label,
  title,
  lead,
  image = "team-vans",
  imageAlt = "",
}: {
  label: string;
  title: React.ReactNode;
  lead?: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="on-dark relative overflow-hidden bg-navy-deep">
      <div className="absolute inset-0">
        <Photo name={image} alt={imageAlt} sizes="100vw" priority className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-navy-deep/62" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/92 via-navy-deep/62 to-navy-deep/30" />
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-navy-deep/85 to-transparent" />
      </div>

      <div className="wrap relative pb-16 pt-32 md:pb-24 md:pt-44">
        <div className="max-w-[840px]">
          <Reveal className="mi eyebrow mb-7 max-w-[420px]">
            <span>{label}</span>
          </Reveal>
          <Reveal variant="mask">
            <h1 className="dsp-sm text-[clamp(32px,6.4vw,64px)]">{title}</h1>
          </Reveal>
          {lead && (
            <Reveal delay={140}>
              <p className="bd-lg mt-7 max-w-[600px] text-white/70">{lead}</p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
