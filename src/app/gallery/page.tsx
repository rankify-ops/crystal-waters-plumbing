import type { Metadata } from "next";
import { PageHero } from "@/components/sections/Hero";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { QuoteBand } from "@/components/sections/QuoteBand";
import { Reviews } from "@/components/sections/Reviews";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Recent plumbing work across the Gold Coast — bathroom renovations, hot water system installs, gas fitting and drainage. Photographs from actual Crystal Waters jobs.",
  alternates: { canonical: "/gallery/" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        label="Gallery"
        title="Some of our recent work"
        lead="Every photograph here is a job we did, photographed on the day. No stock, no renders."
        image="g-shower"
        imageAlt="A completed marble bathroom by Crystal Waters Plumbing"
      />
      <GalleryGrid />
      <QuoteBand heading="Want yours to look like this?" />
      <Reviews limit={6} />
    </>
  );
}
