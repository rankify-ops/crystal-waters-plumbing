/*
 * assets-raw/ → public/img/
 *
 * Everything the old WordPress site served, re-encoded once at build-authoring
 * time rather than at request time. The export is static, so there is no image
 * optimiser at runtime — this script IS the optimiser.
 *
 * Two widths per photograph (1600 and 800) so the srcset has something real to
 * choose between on a phone; logos and the favicon pass through at one size.
 */
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const OUT = "public/img";
mkdirSync(OUT, { recursive: true });

// [source, slug, treatment]
const PHOTOS = [
  // Hero + section photography.
  ["Untitled-design-32.jpg", "hero-night-callout"],
  ["Untitled-design-25.jpg", "team-vans"],
  ["Untitled-design-33.jpg", "sink-and-drain"],
  ["Untitled-design-26.jpg", "nick-shower-rough-in"],
  ["Untitled-design-28.jpg", "wall-leak-chase"],
  ["Waterfall.jpg", "waterfall"],
  ["House.jpg", "house"],
  ["DJI_0129.jpg", "drone-roof"],
  ["Surf-Life-Saving.jpg", "surf-life-saving"],
  ["Lightning.jpg", "storm"],
  // Service leads
  ["Bathroom-1.jpg", "svc-bathroom"],
  // Types-of-Plumbing.png is deliberately not here: despite the filename it is a
  // photograph of the sister company's ELECTRICAL van, not a plumbing job.
  ["Kitchen.jpg", "svc-kitchen"],
  ["Hot-2-1.jpg", "svc-hot-water"],
  ["Water-Leak.jpg", "svc-water-leak"],
  ["Thermal.jpg", "svc-thermal"],
  // Team portraits
  ["Me.jpg", "team-nick"],
  ["Hayden.jpg", "team-hayden"],
  ["Ethan.jpg", "team-ethan"],
  ["Lee.jpg", "team-lee"],
  // Gallery
  ["Vanity.jpg", "g-vanity"],
  ["Shower.jpg", "g-shower"],
  ["Perfection.jpg", "g-perfection"],
  ["1-1.jpg", "g-bathroom-1"],
  ["4-1.jpg", "g-bathroom-2"],
  ["1.jpg", "g-bathroom-3"],
  ["2-1.jpg", "g-bathroom-4"],
  ["3-1.jpg", "g-bathroom-5"],
  ["Kerb.jpg", "g-kerb-1"],
  ["Kerb-2-1.jpg", "g-kerb-2"],
  ["Kerb-3.jpg", "g-kerb-3"],
  ["Gas-1.jpg", "g-gas-1"],
  ["Gas-2.jpg", "g-gas-2"],
  ["Gas-3.jpg", "g-gas-3"],
  ["Hot-1.jpg", "g-hot-1"],
  ["Hot-2.jpg", "g-hot-2"],
  ["Hot-3.jpg", "g-hot-3"],
  ["Bathroom.jpg", "g-bathroom-6"],
];

const WIDTHS = [1600, 800];

/*
 * Deliberate upscales, by slug: [wide, narrow].
 *
 * Empty, and that is the good outcome. It existed to prop up a 995x664 shot
 * that was leading the page; the hero is now Lee.jpg at 2048x1536, which is
 * larger than anything the layout asks for. Kept as a hook because the rest of
 * this library is phone photography and the next hero may not be so lucky.
 */
const UPSCALED = {};

/*
 * THE HERO, PRE-CROPPED TO THE HERO'S OWN RATIO
 *
 * WHICH PHOTOGRAPH. Ethan.jpg, not Lee.jpg. Both show a team member with the
 * branded van; the difference is where the person stands. In Lee.jpg the two
 * of them are at 14–43% across, which is exactly where a left-aligned headline
 * goes — no crop could separate them, because there is nothing to their left
 * in the frame to push them rightward with. In Ethan.jpg the van's lettering
 * runs along the left and the person stands at about 80%, so the copy lands on
 * the plain white flank of the van and the human being is left alone. It is
 * also the highest-resolution photograph in the library at 2048x1536.
 *
 * WHY PRE-CROP AT ALL. The source is 4:3 and a full-bleed hero is roughly 2:1,
 * so `object-fit: cover` throws away a third of the height — and the amount it
 * throws away depends on the viewport's ratio. That is what made this
 * unfixable by tuning `object-position` alone: a value that framed a face
 * neatly at 1440x860 sliced heads off under the header at 1920x1080, because
 * the same percentage of a different crop is a different part of the picture.
 *
 * Deciding it once, here, at 2:1 — wider than any hero the layout produces —
 * leaves the browser a few percent of horizontal trim and nothing else, so the
 * composition is identical on every screen.
 *
 * top: 220 puts his head at about 16% of the frame: below the fixed header at
 * every viewport rather than at one, with his feet cropped instead of the sky
 * kept.
 */
await (async () => {
  const src = "assets-raw/Ethan.jpg";
  const crop = { left: 0, top: 220, width: 2048, height: 1024 };
  for (const w of WIDTHS) {
    await sharp(src)
      .rotate()
      .extract(crop)
      .resize(w, null, { withoutEnlargement: true, kernel: "lanczos3" })
      .webp({ quality: 82 })
      .toFile(`${OUT}/hero-team-van-${w}.webp`);
  }
  console.log("hero  hero-team-van (Ethan.jpg, pre-cropped to 2:1)");
})();

const manifest = {};

for (const [src, slug] of PHOTOS) {
  const input = `assets-raw/${src}`;
  const meta = await sharp(input).metadata();
  manifest[slug] = { w: meta.width, h: meta.height };
  const upscale = UPSCALED[slug];

  for (const [i, w] of WIDTHS.entries()) {
    // Never upscale by default — a 600px source blown to 1600 is just a bigger
    // blur. The hero is the one deliberate exception; see UPSCALED above.
    const width = upscale ? upscale[i] : Math.min(w, meta.width);
    const pipe = sharp(input).rotate().resize(width, null, {
      withoutEnlargement: !upscale,
      kernel: "lanczos3",
    });
    if (upscale) pipe.sharpen({ sigma: 0.7, m1: 0.4, m2: 0.9 });
    await pipe.webp({ quality: upscale ? 84 : 78 }).toFile(`${OUT}/${slug}-${w}.webp`);
  }
  console.log("photo", slug, `${meta.width}x${meta.height}`, upscale ? "(upscaled)" : "");
}

/*
 * THE LOGO, IN TWO VERSIONS
 *
 * The supplied file is three things stacked: a skyline drawn in thin BLACK
 * strokes, "Crystal Waters" as a blue gradient wordmark with a white outline,
 * and "PLUMBING & DRAINAGE" in BLACK type underneath.
 *
 * That means two thirds of it disappears on a dark ground — and the obvious
 * CSS shortcut, `filter: brightness(0) invert(1)`, is worse than useless here:
 * flattening everything to white merges the wordmark's fill, its white outline
 * and its drop shadow into one solid mass, and the letters lose their counters.
 * It rendered as an unreadable smear.
 *
 * So the dark-ground version is generated properly, per pixel: anything
 * NEUTRAL and DARK — the skyline strokes, the subtitle, the wordmark's shadow —
 * is repainted white, while anything saturated is left alone. The blue
 * wordmark survives intact with its own white outline still separating it from
 * the navy, and the recoloured drop shadow becomes a faint glow, which on a
 * dark ground is doing the same job the shadow did on a light one.
 *
 * Both are trimmed of their transparent margin so the header can size them by
 * height without a mystery gap either side.
 */
const logoSrc = await sharp("assets-raw/Crystal-Waters-Plumbing-Logo.pdf.png")
  .trim()
  .toBuffer();

/** Repaint every neutral, dark pixel white; leave the saturated blue alone. */
async function forDarkGround(buffer) {
  const { data, info } = await sharp(buffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const px = Buffer.from(data);
  for (let i = 0; i < px.length; i += 4) {
    if (px[i + 3] < 8) continue;
    const r = px[i];
    const g = px[i + 1];
    const b = px[i + 2];
    const max = Math.max(r, g, b);
    const saturation = max === 0 ? 0 : (max - Math.min(r, g, b)) / max;
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    if (saturation < 0.28 && luminance < 150) {
      px[i] = 255;
      px[i + 1] = 255;
      px[i + 2] = 255;
    }
  }
  return sharp(px, {
    raw: { width: info.width, height: info.height, channels: 4 },
  });
}

/*
 * TWO LOCKUPS, NOT ONE
 *
 * The full mark is 2:1 — the skyline occupies the top 55% of it, above the
 * wordmark. A header sizes a logo by HEIGHT, so at any height a header can
 * afford, the skyline eats the budget and the company name renders about four
 * pixels tall. It was illegible.
 *
 * The header therefore uses a horizontal lockup — wordmark and subtitle, no
 * skyline, roughly 4.5:1 — which sets the name three times larger in the same
 * vertical space. The full mark with the skyline keeps the footer, where there
 * is room for it.
 *
 * The lockup is a file the client supplied (assets-raw/logo-lockup.png, 1190 x
 * 301) rather than a crop of the big mark, which is what an earlier version of
 * this script had to do. It is both higher resolution and cleaner.
 *
 * They also supplied a pre-made dark-ground version. It is NOT used: its
 * "PLUMBING & DRAINAGE" was knocked out to white but left almost entirely
 * transparent — 884 opaque pixels against 10,097 in the light version — so it
 * renders as broken letter fragments on navy. It is kept in assets-raw as
 * logo-lockup-supplied-dark.png for reference. The dark version below is
 * generated from the good light file instead, and is solid.
 */
const wordmark = await sharp("assets-raw/logo-lockup.png").trim().toBuffer();

for (const [buf, name] of [
  [logoSrc, "logo"],
  [wordmark, "logo-mark"],
]) {
  await sharp(buf)
    .resize(900, null, { withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toFile(`${OUT}/${name}.png`);

  await (await forDarkGround(buf))
    .resize(900, null, { withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toFile(`${OUT}/${name}-dark.png`);
}
console.log("logo, logo-mark (+ dark variants)");

// Favicon, from the same mark.
for (const size of [32, 180, 192, 512]) {
  await sharp("assets-raw/cropped-cropped-Divi-Plumber-Favicon.png")
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(`${OUT}/icon-${size}.png`);
}

console.log("\nmanifest:", JSON.stringify(manifest, null, 0).slice(0, 200), "…");
console.log("done");
