import Link from "next/link";
import { site, services, suburbs, yearsTrading } from "@/content/site";
import { asset } from "@/lib/basePath";
import { Phone, Mail, Pin, Facebook, Arrow } from "@/components/ui/Icons";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";

/*
 * The footer carries the closing CTA as well as the sitemap, because the old
 * site ran a separate "With countless satisfied customer reviews…" band
 * immediately above an almost identical footer on every single page — two
 * blocks saying the same thing, stacked. Merged into one.
 */
export function Footer() {
  return (
    <footer className="on-dark bg-navy">
      {/* ── Closing CTA ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[var(--rule)]">
        <div className="absolute inset-0">
          <Photo
            name="team-vans"
            alt=""
            sizes="100vw"
            className="h-full w-full object-cover opacity-[0.16]"
          />
        </div>
        <div className="wrap relative py-20 md:py-28">
          <div className="max-w-[760px]">
            <Reveal className="mi eyebrow mb-7">
              <span>Free quote — no obligation</span>
            </Reveal>
            <Reveal variant="mask">
              <h2 className="dsp text-[clamp(34px,6vw,68px)]">
                Talk to a plumber,
                <br />
                <span className="hi">not a call centre</span>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="bd-lg mt-7 max-w-[560px]">
                {yearsTrading()} years on the Gold Coast, {site.reviews.count} five-star
                Google reviews, no call-out fee and a lifetime warranty on our
                workmanship. Tell us what is going on and we will tell you what it
                costs before we start.
              </p>
            </Reveal>
            <Reveal delay={200} className="mt-10 flex flex-wrap gap-3">
              <a href={site.phoneHref} className="btn btn-aqua">
                <Phone size={15} />
                {site.phone}
              </a>
              <Link href="/contact/#quote" className="btn btn-solid">
                Get a free quote
                <Arrow size={14} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Sitemap ─────────────────────────────────────────────────── */}
      <div className="wrap py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            {/* eslint-disable-next-line @next/next/no-img-element -- the export
                is unoptimised, so next/image would only add a wrapper. */}
            <img
              src={asset("/img/logo.png")}
              alt={site.legalName}
              width={190}
              height={44}
              className="h-9 w-auto"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <p className="bd-sm mt-6 max-w-[320px]">
              Your local community plumbing and drainage specialist, based in
              Robina and covering {site.serviceArea.toLowerCase()}.
            </p>
            <a
              href={site.facebook}
              target="_blank"
              rel="noreferrer noopener"
              className="mi mt-7 inline-flex items-center gap-2.5 transition-colors hover:text-[var(--aqua-bright)]"
            >
              <Facebook size={15} />
              Follow us on Facebook
            </a>
          </div>

          <div className="md:col-span-3">
            <h3 className="mi mb-6" style={{ color: "var(--aqua-bright)" }}>
              Contact
            </h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a href={site.phoneHref} className="flex items-start gap-3 transition-colors hover:text-[var(--aqua-bright)]">
                  <Phone size={15} className="mt-0.5 shrink-0 opacity-60" />
                  <span className="mi-lg">{site.phone}</span>
                </a>
              </li>
              <li>
                <a href={site.emailHref} className="flex items-start gap-3 transition-colors hover:text-[var(--aqua-bright)]">
                  <Mail size={15} className="mt-0.5 shrink-0 opacity-60" />
                  <span className="bd-sm break-all">{site.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Pin size={15} className="mt-0.5 shrink-0 opacity-60" />
                <span className="bd-sm">{site.address.full}</span>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="mi mb-6" style={{ color: "var(--aqua-bright)" }}>
              Services
            </h3>
            <ul className="flex flex-col gap-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}/`} className="mi transition-colors hover:text-[var(--aqua-bright)]">
                    {s.nav}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services/all-services/" className="mi transition-colors hover:text-[var(--aqua-bright)]">
                  All services
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="mi mb-6" style={{ color: "var(--aqua-bright)" }}>
              Navigation
            </h3>
            <ul className="flex flex-col gap-3">
              {[
                ["/", "Home"],
                ["/about-us/", "About us"],
                ["/gallery/", "Gallery"],
                ["/contact/", "Contact"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="mi transition-colors hover:text-[var(--aqua-bright)]">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Service area, spelled out. The old site said only "Palm Beach to
            Helensvale" — true, but invisible to anyone searching their suburb. */}
        <div className="mt-14 border-t border-[var(--rule)] pt-8">
          <h3 className="mi mb-5" style={{ color: "var(--aqua-bright)" }}>
            Areas we cover
          </h3>
          <p className="bd-sm leading-[2]">
            {suburbs.join(" · ")}
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-[var(--rule)] pt-8 md:flex-row md:items-center md:justify-between">
          <p className="mi" style={{ color: "var(--ink-3)" }}>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p className="mi" style={{ color: "var(--ink-3)" }}>
            Web design by{" "}
            <a
              href="https://rankify.com.au"
              target="_blank"
              rel="noreferrer noopener"
              className="ln transition-colors hover:text-[var(--aqua-bright)]"
            >
              Rankify Australia
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
