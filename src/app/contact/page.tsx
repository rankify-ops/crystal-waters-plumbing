import type { Metadata } from "next";
import { PageHero } from "@/components/sections/Hero";
import { QuoteBand } from "@/components/sections/QuoteBand";
import { Faq } from "@/components/sections/Faq";
import { StatsBand } from "@/components/sections/Pillars";
import { site, suburbs } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { Phone, Mail, Pin, Facebook } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Call Crystal Waters Plumbing on 0412 402 399, or send us a message and we will call you back. Based in Robina, covering Palm Beach to Helensvale.",
  alternates: { canonical: "/contact/" },
};

/*
 * Contact.
 *
 * The old page ran a six-field Divi form (name, email, phone, service, best
 * time to call, how did you hear about us, message) as one screen. "How did you
 * hear about us" is a question that serves the business, not the person filling
 * it in, and putting it in front of a submit button on a page someone reached
 * with a burst pipe is the wrong trade. The multi-stage form asks four
 * questions that change what we do next, and nothing else.
 */
export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact"
        title="Send us a message & we will call you back"
        lead="Or just ring — a plumber answers, not a call centre."
        image="team-vans"
        imageAlt="Crystal Waters Plumbing vans"
      />

      {/* ── The three ways to reach them ─────────────────────────────── */}
      <section className="border-b border-[var(--rule)] bg-paper">
        <div className="wrap">
          <div className="grid md:grid-cols-3">
            <Card
              icon={<Phone size={19} />}
              label="Call us"
              value={site.phone}
              href={site.phoneHref}
              note="Fastest way to reach us — especially for anything urgent."
              first
            />
            <Card
              icon={<Mail size={19} />}
              label="Email us"
              value={site.email}
              href={site.emailHref}
              note="Good for quotes, plans and anything with photographs attached."
            />
            <Card
              icon={<Pin size={19} />}
              label="Find us"
              value={site.address.full}
              note={`We come to you — anywhere from ${site.serviceArea.toLowerCase()}.`}
            />
          </div>
        </div>
      </section>

      <QuoteBand label="Get in touch" heading="Tell us what is going on" />

      {/* ── Service area ─────────────────────────────────────────────── */}
      <section className="sec bg-paper">
        <div className="wrap">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Reveal className="mi eyebrow mb-8">
                <span>Where we work</span>
              </Reveal>
              <Reveal variant="mask">
                <h2 className="dsp text-[clamp(28px,4.4vw,46px)]">
                  Palm Beach
                  <br />
                  <span className="hi">to Helensvale</span>
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="bd mt-7 max-w-[360px]">
                  And everything in between. If your suburb is not on the list,
                  call anyway — the corridor is a guide, not a fence.
                </p>
              </Reveal>
              <Reveal delay={180} className="mt-8">
                <a
                  href={site.facebook}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mi inline-flex items-center gap-2.5 transition-colors hover:text-aqua"
                >
                  <Facebook size={15} />
                  Follow us on Facebook
                </a>
              </Reveal>
            </div>

            <div className="lg:col-span-8">
              <ul className="grid grid-cols-2 gap-x-8 border-t border-[var(--rule)] sm:grid-cols-3">
                {suburbs.map((s, i) => (
                  <Reveal as="li" key={s} delay={(i % 3) * 50} className="block border-b border-[var(--rule)]">
                    <span className="mi block py-4">{s}</span>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <StatsBand />
      <Faq />
    </>
  );
}

function Card({
  icon,
  label,
  value,
  href,
  note,
  first = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  note: string;
  first?: boolean;
}) {
  const inner = (
    <>
      <span className="grid h-11 w-11 place-items-center border border-[var(--rule)] text-aqua">{icon}</span>
      <span className="mi mt-6 block" style={{ color: "var(--ink-3)" }}>
        {label}
      </span>
      <span className="dsp-sentence mt-3 block break-words text-[19px] md:text-[21px]">{value}</span>
      <span className="bd-sm mt-3 block max-w-[280px]">{note}</span>
    </>
  );

  const cls = `block py-11 md:px-9 md:py-14 md:first:pl-0 ${
    first ? "" : "border-t border-[var(--rule)] md:border-l md:border-t-0"
  }`;

  return href ? (
    <a href={href} className={`${cls} group transition-colors hover:bg-mist`}>
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  );
}
