import { site } from "@/content/site";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { Phone, Mail, Pin, Clock } from "@/components/ui/Icons";

/*
 * The quote form in a section, with the contact details beside it.
 *
 * Used on the home page, every service page and the contact page — the same
 * component each time, with `presetJob` filled in on the service pages so
 * someone arriving from /services/water-leaks/ does not have to tell the form
 * what it could already work out.
 */
export function QuoteBand({
  presetJob,
  heading = "Get a price, not a run-around",
  label = "Free quote",
}: {
  presetJob?: string;
  heading?: string;
  label?: string;
}) {
  return (
    <section className="on-dark relative overflow-hidden bg-navy" id="quote-section">
      <div className="absolute inset-0">
        <Photo name="sink-and-drain" alt="" sizes="100vw" className="h-full w-full object-cover opacity-[0.13]" />
      </div>

      <div className="wrap relative py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal className="mi eyebrow mb-8">
              <span>{label}</span>
            </Reveal>
            <Reveal variant="mask">
              <h2 className="dsp text-[clamp(30px,5vw,52px)]">{heading}</h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="bd-lg mt-7 max-w-[420px]">
                Answer four quick questions and we will call you back with a
                price. No call-out fee, no obligation, and nothing starts until
                you say so.
              </p>
            </Reveal>

            <Reveal delay={200} className="mt-11 flex flex-col gap-5 border-t border-[var(--rule)] pt-9">
              <a href={site.phoneHref} className="group flex items-center gap-4">
                <span className="chip chip-sm">
                  <Phone size={16} />
                </span>
                <span>
                  <span className="mi block" style={{ color: "var(--ink-3)" }}>
                    Call us
                  </span>
                  <span className="mi-lg block transition-colors group-hover:text-[var(--aqua-bright)]">{site.phone}</span>
                </span>
              </a>
              <a href={site.emailHref} className="group flex items-center gap-4">
                <span className="chip chip-sm">
                  <Mail size={16} />
                </span>
                <span className="min-w-0">
                  <span className="mi block" style={{ color: "var(--ink-3)" }}>
                    Email us
                  </span>
                  <span className="bd-sm block text-white transition-colors group-hover:text-[var(--aqua-bright)]">
                    {site.email}
                  </span>
                </span>
              </a>
              <div className="flex items-center gap-4">
                <span className="chip chip-sm">
                  <Pin size={16} />
                </span>
                <span>
                  <span className="mi block" style={{ color: "var(--ink-3)" }}>
                    Based at
                  </span>
                  <span className="bd-sm block text-white">{site.address.full}</span>
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="chip chip-sm">
                  <Clock size={16} />
                </span>
                <span>
                  <span className="mi block" style={{ color: "var(--ink-3)" }}>
                    Service area
                  </span>
                  <span className="bd-sm block text-white">{site.serviceArea}</span>
                </span>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            {/* The form is a light island on the navy slab — it is the one
                thing in the section that has to read as an interface rather
                than as page furniture. `.on-light` puts the ink tokens and the
                button treatments back for this subtree; see globals.css. */}
            <Reveal delay={80} className="on-light">
              <QuoteForm presetJob={presetJob} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
