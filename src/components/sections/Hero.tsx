import Link from "next/link";
import { site, yearsTrading } from "@/content/site";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Phone, Arrow, Google, Spanner, Shield, Tag } from "@/components/ui/Icons";

/*
 * The home hero.
 *
 * The old site opened on the headline "Your Neighborhood's Plumbing Experts:
 * Your Satisfaction, Our Guarantee", which is a sentence that could sit on any
 * plumber's website in the country. This one says what they do and where, and
 * puts the two things people are actually deciding between — call now, or get
 * a price — in front of everything else.
 *
 * WHICH PHOTOGRAPH is decided in scripts/images.mjs, and that note is worth
 * reading before swapping it: the library has no usable wide shot of the team
 * without a van in it, so the page currently leads on the work.
 *
 * The photograph carries a three-part wash: a flat tint, a left-weighted ramp
 * under the type, and a bottom edge, plus a top edge that seats the
 * transparent header. White type over an unwashed photo is a coin toss;
 * washing only the side the type sits on keeps the picture visible.
 */
export function Hero() {
  return (
    <section className="on-dark relative min-h-[86vh] md:min-h-[92vh] overflow-hidden bg-navy-deep flex items-center">
      <div className="absolute inset-0">
        <Photo
          name="hero-lead"
          alt="A completed Crystal Waters bathroom — twin basins, backlit mirrors and a tiled feature wall"
          sizes="100vw"
          priority
          // .hero-photo carries the crop, which has to differ between the
          // portrait and landscape framings — see globals.css.
          className="hero-photo h-full w-full object-cover"
        />
        {/* Flat tint, kept light — the photograph is the subject here, not a
            texture, so the wash has to leave the room readable. */}
        <div className="absolute inset-0 bg-navy-deep/26" />
        {/* Left ramp under the type, and a bottom edge. Standard hero
            treatment: the type is bottom-left, so that is where the contrast
            is built. */}
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
          it clear of the figures in a previous photograph; that solved the
          overlap and created a worse problem — a block of type floating in the
          middle of the frame, aligned to nothing.
        */}
        {/* No max-width on the block itself — the headline runs the full
            measure. The paragraph and the buttons set their own. */}
        <div>
          {/* Pill, not a rectangle — the header CTA is a pill, so a squared
              badge two inches below it read as a different design system. */}
          <Reveal className="mb-7">
            <span className="mi inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/[0.07] px-4 py-2 backdrop-blur-md">
              <span className="relative flex h-1.5 w-1.5">
                <span className="ping absolute inline-flex h-full w-full rounded-full bg-[var(--aqua-bright)] opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--aqua-bright)]" />
              </span>
              Same-day call-outs available
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

          {/* Pills, and side by side rather than stacked — two full-width
              buttons on a phone is a stack of slabs, and it is what made the
              hero feel unevenly spaced next to the Prime Group reference. */}
          <Reveal delay={340} className="mt-9 flex flex-wrap gap-2.5">
            <a href={site.phoneHref} className="pill !py-3.5 !px-6">
              <Phone size={15} />
              {site.phone}
            </a>
            <Link href="/contact/#quote" className="pill pill-ghost !py-3.5 !px-6">
              Get a free quote
              <Arrow size={14} />
            </Link>
          </Reveal>

          {/*
            The four proof points, as a card grid.

            This replaces a single wide, thin review pill that never sat well —
            2x2 on a phone, 4 across on a desktop, every card the same height.
            It is the pattern from the Prime Group hero, and it works for the
            same reason: an even grid reads as deliberate where one stretched
            capsule reads as leftover space.

            It also lets the home page drop the separate numbers band further
            down, which was repeating three of these four figures verbatim.
          */}
          {/* auto-rows-fr, so the row whose label wraps does not end up taller
              than the row whose label does not. Shortening the labels got the
              cards within a row matching; this is what matches the rows to
              each other. */}
          <Reveal delay={420} className="mt-9 grid max-w-[560px] auto-rows-fr grid-cols-2 gap-2.5 lg:max-w-[760px] lg:grid-cols-4">
            {[
              /* Labels are kept to two words. At this card width anything
                 longer wrapped to a second line, and because only some of them
                 wrapped, the rows came out different heights — which is the
                 exact unevenness the grid was brought in to fix. The Google
                 mark already says "Google", so the first label does not. */
              { mark: <Google size={20} />, value: site.reviews.rating, label: `${site.reviews.count}+ reviews` },
              { mark: <Spanner size={19} />, value: "25+", label: "Years trading" },
              { mark: <Shield size={19} />, value: "Lifetime", label: "Warranty" },
              { mark: <Tag size={19} />, value: "$0", label: "Call-out fee" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-3 rounded-2xl border border-white/14 bg-white/[0.07] px-3.5 py-3 backdrop-blur-md"
              >
                <span className="grid h-9 w-9 flex-none place-items-center rounded-xl bg-white/10 text-[var(--aqua-bright)]">
                  {s.mark}
                </span>
                <span className="min-w-0">
                  <span className="num block text-[17px] text-white">{s.value}</span>
                  <span className="mi mt-1 block leading-tight text-white/55">{s.label}</span>
                </span>
              </div>
            ))}
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
