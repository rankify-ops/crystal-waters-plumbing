import { process } from "@/content/site";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";

/*
 * How a job actually runs.
 *
 * New — the old site had nothing like it. It exists because the Google reviews
 * kept describing the same four moments in the same order ("turned up when they
 * said", "price was good value", "left a tidy job"), and a process section that
 * is just the reviews restated as promises is the one kind of marketing copy
 * that is verifiable by scrolling further down the page.
 *
 * Numbered rows against a single photograph rather than four cards: cards would
 * imply the steps are parallel, and they are not — they are a sequence.
 */
export function Process() {
  return (
    <section className="sec bg-paper">
      <div className="wrap">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Reveal className="mi eyebrow mb-8">
              <span>How we work</span>
            </Reveal>
            <Reveal variant="mask">
              <h2 className="dsp text-[clamp(30px,5vw,52px)]">
                No surprises,
                <br />
                <span className="hi">start to finish</span>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="bd mt-7 max-w-[400px]">
                Your satisfaction is our top priority. We stand behind our work
                and offer a satisfaction guarantee on every job — the goal is to
                leave you knowing your plumbing is in expert hands.
              </p>
            </Reveal>
            {/* Was hidden below lg. A photograph of Nick actually on the job
                is the only face the page has above the team section, and it is
                doing more for trust than anything else in this column — so it
                shows at every width now. */}
            <Reveal delay={200} className="mt-10">
              <div className="plate aspect-[4/5]">
                <Photo
                  name="nick-shower-rough-in"
                  alt="Nick setting out a shower rough-in on a Gold Coast bathroom renovation"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <ol className="border-t border-[var(--rule)]">
              {process.map((p, i) => (
                <Reveal as="li" key={p.step} delay={i * 90} className="block border-b border-[var(--rule)]">
                  <div className="flex gap-6 py-8 md:gap-10 md:py-10">
                    <span className="num shrink-0 text-[28px] md:text-[34px]" style={{ color: "var(--aqua)" }}>
                      {p.step}
                    </span>
                    <div>
                      <h3 className="dsp-sentence text-[19px] md:text-[22px]">{p.title}</h3>
                      <p className="bd mt-3 max-w-[520px]">{p.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
