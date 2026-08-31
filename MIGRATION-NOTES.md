# Migration notes

What came across from the WordPress site, what changed, and what needs a decision
from Nick before this goes live.

---

## Needs a decision

### 1. The old site was still running the demo theme's placeholder text

The Divi Plumber theme it was built on ships with lorem ipsum, and several pages
were published without it ever being replaced. Specifically:

- **`/services/`** — the entire page introduction was
  *"Sed ut perspiciatis unde omnis iste natus sit volup tatem…"*
- **`/services/all-services/`** — headed **POWER FLUSHING** (a UK central-heating
  service), with four testimonials all attributed to *"Jack Jones – Customer"*,
  and a services list including **"Radiator replacements"** — again, UK heating,
  not a Gold Coast plumbing service.
- **All three blog posts** — 100% lorem ipsum, including leftover instructions to
  whoever was building the site (*"Add this class to the image – click the pencil
  edit icon"*).

Both service pages have been **rewritten** from claims the rest of the site
already makes. Nothing new has been promised on Nick's behalf, but the wording is
mine and should be read before launch. The rewritten sections are marked
`REWRITTEN` in `src/content/site.ts`.

**The blog is not migrated.** There was nothing to migrate — reproducing lorem
ipsum on a live client site is worse than not having a blog. The old URLs now
land on the 404 page, which offers the services and the phone number. Two of the
three titles were UK-specific anyway (*"How often should I get my boiler
serviced?"*, *"…reduce your energy bills during Winter"*). Say the word and I'll
write three real Gold-Coast-relevant articles to fill it.

### 2. Links pointing at the theme author's demo site

Several live links went to `diviplumber.digitalrefresh.uk` rather than to Crystal
Waters' own pages — including the **"MORE ABOUT US"** button on the home page and
the **"OUR GALLERY"** button on `/services/`. The contact form on all four
service pages also displayed a mailto for **`demo@diviplumber.co.uk`**. All fixed.

### 3. The "Electrical work" service tile

The old home page and `/services/` both listed **Electrical work** as one of four
services, linked to a Facebook page. Crystal Waters does not do electrical work —
it is the sister company. It now appears on the About page, in the FAQ, and on
`/services/all-services/` as a referral to Darren on 0402 555 032, which is what
it always actually was.

### 4. Stale numbers

- *"We are an established plumbing & drainage company for **5+ years**"* — written
  in 2023, when the business had been going since July 2018. Years trading is now
  **derived from the founding date**, so it will never go stale again.
- *"**25 years** experience"* was also written in 2023. I have left it as **25+**
  rather than quietly ageing it up. Correct it if it should be higher.
- Hayden *"going into his **3rd year**"* — written in 2023/24. Replaced with
  "our longest-standing employee", which does not need editing every January.
- Google reviews: **205**, taken off the Trustindex widget. Worth refreshing.

### 5. New content I wrote that is not on the old site

Flagging these so nothing arrives as a surprise:

- **The suburb list** (29 suburbs in the footer and on `/contact/`). The old site
  said only "Palm Beach to Helensvale and everything in-between" — true, but
  invisible to anyone searching for their own suburb. That corridor, named.
- **The FAQ** (7 questions). Every answer is drawn from a claim the old site
  already made — no call-out fee, lifetime warranty, service area, same-day hot
  water — so nothing here is a new promise.
- **The "How we work" section**. Written from what the Google reviews keep saying
  in the same order: they turn up when they said, the price is upfront, the site
  is left tidy.
- **Gallery captions.** The old gallery was uncaptioned. Captions are my reading
  of each photograph — worth a skim in case I have called a kerb adaptor
  something it is not.

---

## Fixed silently

Typos and inconsistencies corrected without changing meaning:

| Old | New |
| --- | --- |
| "lifetime WARRENTY on workmanship" | warranty |
| "Crystal Waters Plumbing & **Draiange**" (in the footer, every page) | Drainage |
| "WHY **HOOSE** CRYSTAL WATERS" (an H2) | WHY CHOOSE |
| "Toilers & faucets" | Toilets & tapware |
| "Your **Neighborhood's** Plumbing Experts" | neighbourhood |
| "Revita**liz**e", "special**iz**es", "minim**iz**e" | Australian -ise |
| "**Draw** Clearing blockages in sinks…" | Clearing blockages in sinks… |

The **hot water page repeated the kitchen-and-bathroom introduction word for
word** — a copy-paste that was never corrected. It now has its own copy, marked
`REWRITTEN`.

---

## What was thrown away, and why

- **The Trustindex review widget.** A third-party script that loaded its own
  fonts and CSS to render ten reviews. The review text is the client's asset, not
  the widget's, so it is now static markup — no script, no layout shift, and the
  reviews are in the HTML where Google can read them. All ten are verbatim.
- **The Jetpack tiled gallery**, whose lightbox served the full 2048px original
  over mobile data. Replaced with a filterable grid at two sensible widths.
- **The second footer.** Every page ran a "With countless satisfied customer
  reviews…" band immediately above an almost identical footer — two blocks saying
  the same thing, stacked. Merged into one.
- **The six-field contact form.** "How did you hear about us?" is a question that
  serves the business, not the person with a burst pipe. The new form asks four
  questions that change what happens next, and nothing else.
- **`Types-of-Plumbing.png`.** Despite the filename, it is a photograph of the
  sister company's *electrical* van, and it was being used as the illustration
  for the drainage service. Dropped.
- **`Perfection.jpg`** was captioned as a bathroom renovation. It is an under-sink
  water filter install. Re-captioned.

---

## Still outstanding

- **Google reviews count** — currently 205, from the old widget.
- **ABN / QBCC licence number.** Not on the old site. Worth adding to the footer;
  a licence number is one of the cheapest trust signals a plumber has.
- **Opening hours.** Not on the old site either. Currently absent from the
  LocalBusiness schema, which is the one gap in it.
- **A photograph of Ethan.** `Ethan.jpg` in the media library is a photo of a van.
