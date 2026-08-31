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
    <section className="on-dark relative min-h-[86vh] md:min-h-[92vh] overflow-hidden bg-navy-deep flex items-center">
      <div className="absolute inset-0">
        <Photo
          name="hero-team-van"
          alt="The Crystal Waters team standing beside the branded Crystal Waters Plumbing &amp; Drainage van"
          sizes="100vw"
          priority
          // .hero-photo carries the crop, which has to differ between the
          // portrait and landscape framings — see globals.css.
          className="hero-photo h-full w-full object-cover"
        />
        {/* Flat tint, kept light — the photograph is the subject here, not a
            texture, so the wash has to leave the van and the two of them
            readable. */}
        <div className="absolute inset-0 bg-navy-deep/26" />
        {/* Left ramp under the type, and a bottom edge. Standard hero
            treatment: the type is bottom-left, so that is where the contrast
            is built. */}
        {/* Eased back from /88 — the two of them stand inside this ramp, and
            at full strength it turned them into silhouettes. The bottom scrim
            below carries most of the contrast for the copy instead. */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/72 via-navy-deep/28 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-navy-deep/90 to-transparent" />
        {/* Top edge, seating the transparent header. */}
        <div className="absolute inset-x-0 top-0 h-52 bg-gradient-to-b from-navy-deep/80 to-transparent" />
      </div>

      {/* Equal padding top and bottom, so `items-center` actually centres
          rather than centring a lopsided box. 112px is also the floor that
          keeps the badge clear of the fixed header (78px) when a short
          viewport squeezes the section down to its content height. */}
      <div className="wrap relative w-full py-28 md:py-32">
        {/*
          Bottom-left, on the same left edge as every other section on the
          site. An earlier version pushed this into a right-hand column to keep
          it off the two figures in the photograph; that solved the overlap and
          created a worse problem — a block of type floating in the middle of
          the frame, aligned to nothing.

          The overlap is handled by the crop and the ramp instead: the photo is
          biased so the van and the two of them sit right of the text, and the
          left ramp carries the contrast.
        */}
        {/* No max-width on the block itself — the headline runs the full
            measure. The paragraph and the buttons set their own. */}
        <div>
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
            Two lines, and "PLUMBING & DRAINAGE" is never one of the places it
            breaks — hence the nowrap.

            The SIZE is unchanged — the block just runs the full measure now
            instead of being trapped in a 600px column, which is all it needed
            to fit on one line. At the 58px cap the long line measures about
            616px against a 1168px container, so there is plenty of room.

            The 26px floor is set by the same line at the other end: on a 320px
            phone it needs to be that small to stay on one line inside a 280px
            container.
          */}
          <h1 className="dsp text-[clamp(26px,5.6vw,58px)]">
            <Reveal variant="mask">
              <span>Gold Coast</span>
            </Reveal>
            <Reveal variant="mask" delay={90}>
              <span className="whitespace-nowrap">
                <span className="hi">plumbing</span> &amp; drainage
              </span>
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
