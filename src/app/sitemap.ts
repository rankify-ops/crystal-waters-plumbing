import type { MetadataRoute } from "next";
import { site, services } from "@/content/site";

/*
 * Emitted as out/sitemap.xml at build time.
 *
 * Every URL here matches a slug the old WordPress site served, so the existing
 * index carries over rather than being rebuilt from scratch. The only page the
 * old sitemap listed that is deliberately absent is the blog — its three posts
 * were unedited Divi demo lorem ipsum, so there was nothing to migrate.
 */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/services/`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...services.map((s) => ({
      url: `${site.url}/services/${s.slug}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    { url: `${site.url}/services/all-services/`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/gallery/`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/about-us/`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${site.url}/contact/`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
  ];
}
