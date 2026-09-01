import Link from "next/link";
import { site, yearsTrading } from "@/content/site";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Phone, Arrow, Star, Google } from "@/components/ui/Icons";
import { QuoteLink } from "@/components/ui/QuoteLink";
import { QuoteForm } from "@/components/quote/QuoteForm";

/*
 * The home hero.
 *
 * HEADLINE is the client's own, carried over from the WordPress site: "Your
 * Neighborhood's Plumbing Experts: Your Satisfaction, Our Guarantee", with the
 * spelling normalised to Australian. An earlier pass here replaced it with
 * "Gold Coast plumbing & drainage" on the grounds that the original could sit
 * on any plumber's website in the country; the client's call was to keep their
 * line, and it is theirs to make. The service-and-suburb detail that argument
 * was about now lives in the sub-heading directly underneath, so the page still
 * says what they do and where inside the first screen.
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
          <div className="xl:col-span-7">
          {/*
            The availability pill and the rating share one row — the slot the
            "Est. 2018 · Robina" line used to occupy. Two separate rows of
            micro-type above the headline would push it most of a line further
            down for no gain.
          */}
          <Reveal className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-3">
            <span className="hero-tag">
              <span className="relative flex h-1.5 w-1.5">
                <span className="ping absolute inline-flex h-full w-full rounded-full bg-[var(--aqua-bright)] opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--aqua-bright)] shadow-[0_0_8px_var(--aqua-bright)]" />
              </span>
              Same-day call-outs available
            </span>

            <span className="flex items-center gap-2.5">
              <Google size={17} />
              <span className="stars flex gap-0.5">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={14} />
                ))}
              </span>
              <span className="text-[12.8px] font-semibold text-white/80">
                {site.reviews.rating} from {site.reviews.count}+ reviews
              </span>
            </span>
          </Reveal>

          {/*
            The client's own headline, restored from the WordPress site — with
            "Neighborhood" normalised to the Australian spelling, as everywhere
            else in content/site.ts.

            It is roughly three times the length of "Gold Coast plumbing &
            drainage", so the size cap comes down with it: at the 57.6px GHP
            ceiling this ran to four lines in a 653px column and swallowed the
            hero. `.hero-h1-long` is the same weight, leading and tracking at a
            46px cap. The nowrap is gone too — it existed to keep a two-word
            trade name intact, and there is nothing here that must not break.
          */}
          <h1 className="hero-h1 hero-h1-long mb-[18px]">
            <Reveal variant="mask">
              <span>Your neighbourhood&rsquo;s plumbing experts:</span>
            </Reveal>
            <Reveal variant="mask" delay={90}>
              <span className="hi">your satisfaction, our guarantee</span>
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
            The quote form, in the hero rather than only halfway down the page.

            It carries id="quote", so every "get a free quote" control now
            resolves here. QuoteBand is removed from the home page as a result:
            two copies would have meant two elements sharing one id, and the
            scroll target would have been whichever the browser found first.
          */}
          <Reveal delay={200} className="on-light xl:col-span-5">
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
