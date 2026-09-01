import Link from "next/link";
import { site, yearsTrading } from "@/content/site";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Phone, Arrow, Google, Spanner, Shield, Tag } from "@/components/ui/Icons";
import { QuoteLink } from "@/components/ui/QuoteLink";
import { QuoteForm } from "@/components/quote/QuoteForm";

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
 * SIZING AND SPACING are ported from the Geelong Heat Pumps hero
 * (geelong-heat-pumps/assets/site.css) — its rem values converted to px in
 * globals.css so a different root size cannot rescale them. That reference is
 * why the headline here is sentence case at weight 800 rather than the
 * uppercase 600 the rest of this site uses.
 *
 * Two things deliberately depart from it, both because this content is not
 * that content: the headline clamp floor (theirs clips "plumbing & drainage"
 * mid-word on a phone) and the two-column button grid below sm (theirs lets
 * the buttons run at natural width, which left them misaligned with the cards).
 */
/*
 * NO min-height on the section, deliberately.
 *
 * Prime Group's .hero is `padding:0; display:flex; align-items:center` and
 * nothing else — its height comes entirely from the content plus .hero-inner's
 * 140/80 padding. This had min-h-[92vh], which on a 1440px-tall 2K screen
 * stretched the hero to 1325px and left the copy marooned in the middle of an
 * empty photograph. Sizing to content is the whole reason theirs still looks
 * right on a big monitor.
 */
export function Hero() {
  return (
    <section className="on-dark relative overflow-hidden bg-navy-deep flex items-center">
      <div className="absolute inset-0">
        <Photo
          name="hero-lead"
          alt="The Crystal Waters team in surf lifesaving kit beside the Crystal Waters and EIC Electrical vans"
          sizes="100vw"
          priority
          // .hero-photo carries the crop, which has to differ between the
          // portrait and landscape framings — see globals.css.
          className="hero-photo h-full w-full object-cover"
        />
        {/*
          The wash, ported from GHP's .hero-bg::after — a single 105deg ramp
          rather than the three stacked overlays this had before:

            linear-gradient(105deg, .78 → .55 @35% → .18 @65% → brand @100%)

          105deg (not 90) tilts the dark corner up to where the copy actually
          starts, and the faint brand tint at the far end stops the bright side
          of the photograph reading as a blown-out hole. Navy here rather than
          their near-black, so it stays this site's palette.
        */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(105deg, rgba(4,27,44,0.80) 0%, rgba(4,27,44,0.56) 35%, rgba(4,27,44,0.20) 65%, rgba(0,166,224,0.10) 100%)",
          }}
        />
        {/* Kept from before, and still earning it: the header has to stay
            legible over whatever photograph this becomes. */}
        <div className="absolute inset-x-0 top-0 h-52 bg-gradient-to-b from-navy-deep/70 to-transparent" />
      </div>

      {/*
        GHP .hero-inner: 140px top / 80px bottom on desktop, 120/70 below
        980px. Asymmetric on purpose — the section is still flex-centred, but
        the extra weight up top is what clears the fixed header without the
        content drifting to the middle of the frame.
      */}
      <div className="wrap relative w-full pb-[70px] pt-[120px] lg:pb-20 lg:pt-[140px]">
        {/*
          THE SPLIT STARTS AT xl (1280), NOT lg.

          Measured, not guessed: "plumbing & drainage" runs 616px at the 57.6px
          cap and is set never to break, while a 7-of-12 column is only 523px
          at 1024 and 597px at 1152 — the headline would be clipped at both. It
          first clears at 1280, where the column is 653px. Below that the form
          stacks under the copy, which costs nothing.
        */}
        <div className="grid gap-12 xl:grid-cols-12">
          <div className="xl:order-1 xl:col-span-7">
          <Reveal className="mb-6">
            <span className="hero-tag">
              <span className="relative flex h-1.5 w-1.5">
                <span className="ping absolute inline-flex h-full w-full rounded-full bg-[var(--aqua-bright)] opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--aqua-bright)] shadow-[0_0_8px_var(--aqua-bright)]" />
              </span>
              Same-day call-outs available
            </span>
          </Reveal>

          {/*
            SENTENCE CASE at weight 800 — the one big departure from the rest
            of this site, and the change that does most of the work. Uppercase
            at 600 with heavy negative tracking reads as an engineering
            drawing; this reads as a person talking. Sizing is GHP's
            clamp(2.6rem, 5vw, 3.6rem) converted to px.
          */}
          <h1 className="hero-h1 mb-[18px]">
            <Reveal variant="mask">
              <span>Gold Coast</span>
            </Reveal>
            <Reveal variant="mask" delay={90}>
              <span className="hi whitespace-nowrap">plumbing &amp; drainage</span>
            </Reveal>
          </h1>

          <Reveal delay={260}>
            <p className="hero-sub mb-8 max-w-[520px]">
              Blocked drains, hot water, leaks and renovations — from Palm Beach
              to Helensvale. {yearsTrading()} years trading, no call-out fee, and a
              lifetime warranty on every job we do.
            </p>
          </Reveal>

          {/*
            GHP .hero-btns is a plain flex row at 10px. The two-column grid on
            phones is kept from the previous pass: it lines the buttons up with
            the cards below, which the reference does not bother doing and
            which looked wrong here once the cards existed.
          */}
          <Reveal delay={340} className="grid grid-cols-2 gap-2.5 lg:flex lg:gap-2.5">
            {/* Below sm the pills share a 163px grid cell, which will not take
                the full 15.2px label — the phone number and "Get a free quote"
                both overflowed. Font and padding step down, and the secondary
                drops to its short label rather than being clipped. */}
            <a href={site.phoneHref} className="pill !px-3 !text-[13.6px] sm:!px-[30px] sm:!text-[15.2px]">
              <Phone size={15} />
              {site.phone}
            </a>
            <QuoteLink className="pill pill-ghost !px-3 !text-[13.6px] sm:!px-[30px] sm:!text-[15.2px]">
              <span className="sm:hidden">Free quote</span>
              <span className="hidden sm:inline">Get a free quote</span>
              <Arrow size={14} />
            </QuoteLink>
          </Reveal>

          {/* GHP .hero-ph — a quiet third action under the buttons, underlined
              rather than boxed so it does not compete with them. */}
          <Reveal delay={380} className="mt-7">
            <Link
              href="/gallery/"
              className="text-[14px] text-white/70 underline decoration-white/40 underline-offset-[3px] transition-colors hover:text-white"
            >
              See the work we have done nearby →
            </Link>
          </Reveal>

          </div>

          {/*
            The four proof points, BELOW both columns and spanning the full
            container — a single row of four, as Prime Group has them.

            They cannot live in the copy column: squeezed into the seven columns
            beside the form, four across would be about 150px each, narrower than
            their own labels. Out here each one gets roughly 284px.

            2x2 on a phone, one row from lg. In the DOM they sit BETWEEN the
            copy and the form, so a phone reads copy -> proof -> form; on xl the
            order classes put the form back beside the copy and drop the cards
            onto their own full-width row underneath.
          */}
          <Reveal delay={420} className="mt-9 grid auto-rows-fr grid-cols-2 gap-2.5 lg:flex xl:order-3 xl:col-span-12">
            {[
              { mark: <Google size={22} />, value: site.reviews.rating, label: `${site.reviews.count}+ Google reviews` },
              { mark: <Spanner size={21} />, value: "25+", label: "Years experience" },
              { mark: <Shield size={21} />, value: "Lifetime", label: "Workmanship warranty" },
              { mark: <Tag size={21} />, value: "$0", label: "Call-out fee, ever" },
            ].map((s) => (
              <div key={s.label} className="hero-card lg:flex-1">
                <span className="grid h-7 w-7 flex-none place-items-center text-white">
                  {s.mark}
                </span>
                <span className="min-w-0">
                  <span className="hero-card-val block">{s.value}</span>
                  <span className="hero-card-label mt-1 block">{s.label}</span>
                </span>
              </div>
            ))}
          </Reveal>

          {/*
            The quote form, in the hero rather than only halfway down the page.

            It carries id="quote", so every "get a free quote" control now
            resolves here. QuoteBand is removed from the home page as a result:
            two copies would have meant two elements sharing one id, and the
            scroll target would have been whichever the browser found first.
          */}
          <Reveal delay={200} className="on-light xl:order-2 xl:col-span-5">
            <QuoteForm />
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
