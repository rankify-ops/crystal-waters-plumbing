import { site } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { Star, Spanner, Shield, Tag } from "@/components/ui/Icons";

/*
 * The four proof points, as a white card straddling the hero's bottom edge.
 *
 * Ported from geelong-heat-pumps `.benefits` / `.benefits-grid` / `.ben-item`,
 * which is the same device Prime Group uses:
 *
 *   .benefits       padding:0; position:relative; z-index:2; margin-top:-48px
 *   .benefits-grid  4 equal columns, NO gap, white, radius 16, overflow hidden,
 *                   shadow 0 8px 32px rgba(0,0,0,.08)
 *   .ben-item       padding 28px 24px, centred; hover tints the cell
 *   .ben-ico        48x48, radius 12, tinted square, 24px icon at 1.75 stroke
 *   .ben-item h4    0.88rem / 700        →  14.1px
 *   .ben-item p     0.78rem / 1.5 / grey →  12.5px
 *   ≤980px          margin-top:-32px, two columns, hairline under each cell
 *
 * The negative margin is the whole trick: the card is pulled up INTO the hero
 * so it reads as one object bridging two sections, rather than as a strip
 * sitting politely below a hard edge. `z-index: 2` is what keeps it above the
 * hero's photograph and gradients.
 *
 * These replace the four glass cards that used to sit inside the hero. Same
 * four claims, but out here they get a full row, real descriptions and a light
 * ground — and the hero gets its copy back without competing with them.
 */
const ITEMS = [
  {
    Icon: Star,
    title: `${site.reviews.rating} from ${site.reviews.count}+ reviews`,
    body: "Gold Coast locals from Palm Beach to Helensvale, on Google.",
  },
  {
    Icon: Spanner,
    title: "25+ years experience",
    body: "On the tools across plumbing, drainage and gas — not a call centre.",
  },
  {
    Icon: Shield,
    title: "Lifetime workmanship warranty",
    body: "We stand behind the work on every job we do. No exceptions.",
  },
  {
    Icon: Tag,
    title: "No call-out fee",
    body: "Upfront pricing. You approve the number before a tool comes out.",
  },
];

export function Benefits() {
  return (
    <section className="relative z-[2] -mt-8 md:-mt-12">
      {/*
        The ground behind the card, and why it is a layer rather than a
        background on the section.

        The section is pulled UP over the hero by the negative margin, so a
        background on the section itself would paint over the bottom of the
        hero photograph and kill the straddle. This layer is inset from the top
        by exactly the amount of that pull — top-8 against -mt-8, md:top-12
        against md:-mt-12 — so it begins on the hero's bottom edge, not above it.

        Mist, because the section immediately below (ServicesGrid) is bg-mist.
        Left transparent it fell through to the body white and read as a white
        band wedged between the photograph and the mist section.
      */}
      <div className="absolute inset-x-0 bottom-0 top-8 bg-mist md:top-12" aria-hidden="true" />
      <div className="wrap relative">
        <div className="grid overflow-hidden rounded-2xl bg-paper shadow-[0_8px_32px_rgba(6,42,68,0.10)] sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map(({ Icon, title, body }, i) => (
            <Reveal
              key={title}
              delay={i * 80}
              /* Hairlines rather than gaps — the four cells have to read as one
                 card, so they are divided from the inside, not spaced apart. */
              className={`group px-6 py-7 text-center transition-colors duration-300 hover:bg-mist ${
                i < ITEMS.length - 1 ? "border-b border-[var(--rule)] lg:border-b-0" : ""
              } ${i % 2 === 1 ? "sm:border-l sm:border-[var(--rule)]" : ""} ${
                i > 0 ? "lg:border-l lg:border-[var(--rule)]" : ""
              } ${i < 2 ? "sm:border-b sm:border-[var(--rule)] lg:border-b-0" : ""}`}
            >
              <span className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-xl bg-aqua/10 text-aqua transition-transform duration-300 group-hover:-translate-y-[3px]">
                <Icon size={24} />
              </span>
              <h3 className="text-[14.1px] font-bold leading-snug text-ink">{title}</h3>
              <p className="mx-auto mt-1 max-w-[230px] text-[12.5px] leading-[1.5] text-ink-3">
                {body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
