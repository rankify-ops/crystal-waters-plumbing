"use client";

import { useState } from "react";
import { faqs } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

/*
 * FAQ accordion.
 *
 * Built on <details>-style state rather than a real <details> element, because
 * a native details cannot animate its own height and the alternative — a
 * hard-cut open/close — is the one interaction on the page that would feel
 * unfinished next to everything else.
 *
 * Every answer is in the DOM whether or not the row is open (max-height, not
 * conditional rendering), so search engines and Ctrl+F both find it.
 */
export function Faq({ limit }: { limit?: number }) {
  const [open, setOpen] = useState<number | null>(0);
  const shown = limit ? faqs.slice(0, limit) : faqs;

  return (
    <section className="sec bg-paper">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-4">
            <Reveal className="mi eyebrow mb-8">
              <span>Questions</span>
            </Reveal>
            <Reveal variant="mask">
              <h2 className="dsp text-[clamp(30px,5vw,52px)]">
                Before
                <br />
                <span className="hi">you call</span>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <div className="border-t border-[var(--rule)]">
              {shown.map((f, i) => {
                const isOpen = open === i;
                return (
                  <Reveal key={f.q} delay={i * 60} className="block border-b border-[var(--rule)]">
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        className="flex w-full items-start justify-between gap-8 py-7 text-left transition-colors hover:text-aqua"
                      >
                        <span className="dsp-sentence text-[17px] md:text-[19px]">{f.q}</span>
                        {/* A plus that becomes a minus: one bar rotates out. */}
                        <span className="relative mt-1.5 block h-3 w-3 shrink-0">
                          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
                          <span
                            className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current transition-transform duration-500"
                            style={{ transform: `translateX(-50%) rotate(${isOpen ? 90 : 0}deg)`, opacity: isOpen ? 0 : 1 }}
                          />
                        </span>
                      </button>
                    </h3>
                    <div
                      className="grid transition-[grid-template-rows] duration-500"
                      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <p className="bd max-w-[620px] pb-8 pr-8">{f.a}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
