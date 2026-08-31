import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CallBar } from "@/components/layout/CallBar";
import { site, services, suburbs } from "@/content/site";
import { asset } from "@/lib/basePath";
import "./globals.css";

/*
 * One typeface doing every job — display, body and micro-type are all Geist at
 * different sizes. Two weights only; there is no bold anywhere on this site.
 * The old build loaded four families across Divi, Google Fonts and an icon
 * font, which is most of a megabyte before a single photograph.
 */
const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Crystal Waters Plumbing | Gold Coast Plumber & Drainage",
    template: "%s | Crystal Waters Plumbing",
  },
  description:
    "Local Gold Coast plumbers covering Palm Beach to Helensvale. Blocked drains, hot water, leak detection and bathroom renovations. No call-out fee, lifetime workmanship warranty. Call 0412 402 399.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: site.legalName,
    url: site.url,
    title: "Crystal Waters Plumbing | Gold Coast Plumber & Drainage",
    description:
      "Blocked drains, hot water, leak detection and renovations across the Gold Coast. No call-out fee, lifetime workmanship warranty.",
  },
  icons: {
    icon: [{ url: asset("/img/icon-32.png"), sizes: "32x32" }, { url: asset("/img/icon-192.png"), sizes: "192x192" }],
    apple: asset("/img/icon-180.png"),
  },
  other: {
    "geo.region": "AU-QLD",
    "geo.placename": "Gold Coast",
  },
};

/*
 * LocalBusiness schema.
 *
 * The old site emitted Yoast's generic WebPage/Organization graph with no
 * address, no service area, no opening hours and no aggregate rating — which is
 * to say, none of the things that make a plumber show up in a map pack. This is
 * the whole record.
 */
const schema = {
  "@context": "https://schema.org",
  "@type": "Plumber",
  "@id": `${site.url}/#business`,
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  foundingDate: `${site.establishedYear}-07`,
  priceRange: "$$",
  image: `${site.url}/img/hero-night-callout-1600.webp`,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.suburb,
    addressRegion: site.address.state,
    postalCode: site.address.postcode,
    addressCountry: "AU",
  },
  areaServed: suburbs.map((s) => ({ "@type": "City", name: `${s}, QLD` })),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: site.reviews.rating,
    reviewCount: site.reviews.count,
    bestRating: 5,
  },
  sameAs: [site.facebook],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Plumbing & drainage services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title, url: `${site.url}/services/${s.slug}/` },
    })),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={geist.variable}>
      {/* .grain paints one fixed noise plane over the whole viewport. */}
      <body className="grain">
        <Header />
        <main>{children}</main>
        <Footer />
        <CallBar />
        <script
          type="application/ld+json"
          // Static, author-controlled JSON — no user input reaches this string.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </body>
    </html>
  );
}
