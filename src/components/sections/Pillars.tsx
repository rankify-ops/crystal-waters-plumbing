import { pillars, stats } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { Spanner, Tag, Shield, Pin } from "@/components/ui/Icons";

/*
 * The four proof points, which the old site rendered twice on the home page and
 * again on About as a row of blurb modules with a broken icon font — one of
 * them literally rendered as the letter "i".
 *
 * Each now carries a chipped line icon and its index. The icons are the literal
 * thing where there is one (a spanner, a swing tag, a map pin) and the
 * conventional thing where there is not: "guaranteed work" gets a shield with a
 * tick, which is the mark people already read as a warranty.
 */
const MARKS = [Spanner, Tag, Shield, Pin];

export function Pillars() {
  return (
    <section className="border-b border-[var(--rule)] bg-paper">
      <div className="wrap">
        <div className="grid md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => {
            const Mark = MARKS[i];
            return (
            <Reveal
              key={p.label}
              delay={i * 90}
              /*
               * The gutter has to exist at EVERY breakpoint, not just lg.
               * `lg:px-8` alone left the two-column layouts with zero
               * horizontal padding, so the copy in the right-hand column
               * started hard against the divider rule and the copy in the left
               * column ran into it. Cells in a left column get padding on the
               * right, cells in a right column get it on the left, and the
               * outer edges stay flush with the container so the band still
               * lines up with every other section.
               */
              className={`group py-10 md:py-14 ${
                i % 2 === 0 ? "md:pr-8" : "md:pl-8"
              } lg:px-8 lg:first:pl-0 lg:last:pr-0 ${
                i > 0 ? "border-t border-[var(--rule)] md:border-t-0" : ""
              } ${i % 2 === 1 ? "md:border-l md:border-[var(--rule)]" : ""} ${
                i >= 2 ? "md:border-t md:border-[var(--rule)]" : ""
              } lg:border-t-0 ${i > 0 ? "lg:border-l lg:border-[var(--rule)]" : ""}`}
            >
              <div className="flex items-center gap-4">
                <span className="chip">
                  <Mark size={22} />
                </span>
                <span className="mi" style={{ color: "var(--ink-3)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="dsp-sm mt-6 text-[19px]">{p.label}</h3>
              <p className="bd-sm mt-3 max-w-[260px]">{p.body}</p>
            </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/*
 * The numbers band.
 *
 * The old site set these as three counters that animated up from zero on
 * scroll, which is a device that makes a real figure look like a slot machine.
 * Static, on navy, with the label beneath — the figures do the work.
 */
export function StatsBand() {
  return (
    <section className="on-dark bg-navy">
      <div className="wrap">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 80}
              /*
               * This band is two columns from 320px up, so the missing gutter
               * was worst here: "LIFETIME WORKMANSHIP WARRANTY" wrapped tight
               * against the rule on one side and "25+" sat on it from the
               * other. Same rule as the pillars above — inner edges padded,
               * outer edges flush with the container.
               */
              className={`py-12 md:py-16 ${
                i % 2 === 0 ? "pr-5 sm:pr-8" : "pl-5 sm:pl-8"
              } lg:px-8 lg:first:pl-0 lg:last:pr-0 ${
                i % 2 === 1 ? "border-l border-[var(--rule)]" : ""
              } ${i >= 2 ? "border-t border-[var(--rule)] lg:border-t-0" : ""} ${
                i === 2 ? "lg:border-l lg:border-[var(--rule)]" : ""
              }`}
            >
              <div className="num text-[clamp(36px,7vw,62px)]">{s.figure}</div>
              {/* max-w removed: at 170px the two-word labels wrapped to three
                  lines inside a column that had room for two. */}
              <div className="mi mt-4" style={{ color: "var(--ink-3)" }}>
                {s.label}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
