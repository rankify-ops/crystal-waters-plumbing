import Link from "next/link";
import { site, services } from "@/content/site";
import { Photo } from "@/components/ui/Photo";
import { Phone, Arrow } from "@/components/ui/Icons";

/*
 * 404.
 *
 * Exported as out/404.html, which GitHub Pages serves for any unmatched path.
 *
 * It carries the service links deliberately: the WordPress site had three blog
 * posts at root-level URLs (/how-often-should-i-get-my-boiler-serviced/ and
 * two others) that were pure Divi demo lorem ipsum and are not being migrated,
 * so anything still linking to them lands here. Better that it lands on a page
 * that offers the four services and a phone number than on a bare 404.
 */
export default function NotFound() {
  return (
    <section className="on-dark relative flex min-h-screen items-center overflow-hidden bg-navy-deep">
      <div className="absolute inset-0">
        <Photo name="hero-night-callout" alt="" sizes="100vw" priority className="h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/95 via-navy-deep/80 to-navy-deep/50" />
      </div>

      <div className="wrap relative py-32">
        <div className="max-w-[640px]">
          <span className="mi eyebrow mb-8 max-w-[300px]">
            <span>Error 404</span>
          </span>
          <h1 className="dsp text-[clamp(40px,8vw,84px)]">
            This page
            <br />
            <span className="hi">went down the drain</span>
          </h1>
          <p className="bd-lg mt-8 max-w-[460px]">
            The page you were after is not here any more. Everything we do is
            below, or call and we will sort it out on the phone.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href={site.phoneHref} className="btn btn-aqua">
              <Phone size={15} />
              {site.phone}
            </a>
            <Link href="/" className="btn">
              Back to home
              <Arrow size={14} />
            </Link>
          </div>

          {/* gap-x, not gap-px: each row ends in a right-aligned arrow, and
              with no column gutter that arrow butts straight into the next
              column's label. */}
          <ul className="mt-14 grid gap-x-10 border-t border-[var(--rule)] sm:grid-cols-2">
            {services.map((s) => (
              <li key={s.slug} className="border-b border-[var(--rule)]">
                <Link href={`/services/${s.slug}/`} className="mi-lg group flex items-center justify-between gap-4 py-4 transition-colors hover:text-[var(--aqua-bright)]">
                  {s.nav}
                  <Arrow size={14} className="opacity-40 transition-transform group-hover:translate-x-1.5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
