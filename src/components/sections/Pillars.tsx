import { pillars, stats } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

/*
 * The four proof points, which the old site rendered twice on the home page and
 * again on About as a row of blurb modules with a broken icon font (one of them
 * literally rendered as the letter "i"). Same four claims, set as a spec row:
 * hairline dividers, numbered, no icons at all.
 *
 * Icons were the wrong tool here. "No call-out fee" has no picture; any icon
 * chosen for it is decoration pretending to be information.
 */
export function Pillars() {
  return (
    <section className="border-b border-[var(--rule)] bg-paper">
      <div className="wrap">
        <div className="grid md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal
              key={p.label}
              delay={i * 90}
              className={`py-10 md:py-14 lg:px-8 lg:first:pl-0 lg:last:pr-0 ${
                i > 0 ? "border-t border-[var(--rule)] md:border-t-0" : ""
              } ${i % 2 === 1 ? "md:border-l md:border-[var(--rule)]" : ""} ${
                i >= 2 ? "md:border-t md:border-[var(--rule)]" : ""
              } lg:border-t-0 ${i > 0 ? "lg:border-l lg:border-[var(--rule)]" : ""}`}
            >
              <span className="mi block" style={{ color: "var(--ink-3)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="dsp-sm mt-5 text-[19px]">{p.label}</h3>
              <p className="bd-sm mt-3 max-w-[260px]">{p.body}</p>
            </Reveal>
          ))}
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
              className={`py-12 md:py-16 lg:px-8 lg:first:pl-0 ${
                i % 2 === 1 ? "border-l border-[var(--rule)]" : ""
              } ${i >= 2 ? "border-t border-[var(--rule)] lg:border-t-0" : ""} ${
                i === 2 ? "lg:border-l lg:border-[var(--rule)]" : ""
              }`}
            >
              <div className="num text-[clamp(40px,7vw,62px)]">{s.figure}</div>
              <div className="mi mt-4 max-w-[170px]" style={{ color: "var(--ink-3)" }}>
                {s.label}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
