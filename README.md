# Crystal Waters Plumbing & Drainage

Rebuild of [crystalwatersplumbing.com.au](https://crystalwatersplumbing.com.au),
migrated off WordPress/Divi. Next.js static export, deployed to GitHub Pages.

Same stack as `gold-coast-shower-screens` and `adalytical-next`: Next 16, React
19, Tailwind v4, `output: "export"`. No server, no Vercel, no database.

## Running it

```bash
npm install
npm run dev
```

```bash
npm run build
```

`npm run build` writes the whole site to `out/`. Pushing to `main` runs the same
build in Actions and publishes it.

## Where things are

| Path | What |
| --- | --- |
| `src/content/site.ts` | **Every word on the site.** Copy, services, reviews, team, gallery captions, FAQs, suburbs. Edit here, not in components. |
| `src/app/globals.css` | The whole design system — palette, type scale, controls. |
| `src/components/quote/QuoteForm.tsx` | The four-step quote form. |
| `scripts/images.mjs` | `assets-raw/` → `public/img/`, two widths as webp. |
| `assets-raw/` | Original images pulled from the WordPress media library. |
| `scrape/` | The captured WordPress HTML and extracted text, kept as the migration record. |

Re-run the image pipeline after adding anything to `assets-raw/`:

```bash
node scripts/images.mjs
```

## The quote form

Submissions go to [Web3Forms](https://web3forms.com) — no server needed, which
is the point on a static export. The access key lives in `.env` as
`NEXT_PUBLIC_WEB3FORMS_KEY` and is committed on purpose: it is a `NEXT_PUBLIC_`
variable, so it is compiled into the client bundle and visible in the page
source regardless, and Web3Forms treats it as public.

If the key is ever missing, the form does **not** fail silently — it shows the
phone number and email instead of pretending to have sent.

After any deploy, confirm the key actually made it into the bundle rather than
trusting a green build:

```bash
grep -rl "$(grep NEXT_PUBLIC_WEB3FORMS_KEY .env | cut -d= -f2)" out/_next
```

## Going live on the real domain

The site currently builds for the GitHub Pages **project URL**, so every asset
is prefixed with `/<repo>/`. Cutting over to `crystalwatersplumbing.com.au` is
two changes that must happen together:

1. Delete the `env: NEXT_PUBLIC_BASE_PATH` block from
   `.github/workflows/deploy.yml`.
2. Add `public/CNAME` containing `crystalwatersplumbing.com.au`.

Then point the DNS at Pages. Doing only one of the two ships a site whose assets
all 404.

## URLs

Every URL the old site had is preserved, so the existing search index carries
over rather than being rebuilt:

- `/`
- `/services/`
- `/services/bathroom-kitchen/`
- `/services/hot-water-systems/`
- `/services/drainage-blockages/`
- `/services/water-leaks/`
- `/services/all-services/`
- `/gallery/`
- `/about-us/`
- `/contact/`

`/services/bathroom-kitchen/` keeps its slightly awkward slug deliberately —
renaming it to the more natural `kitchen-bathroom` would throw away three years
of indexing for a cosmetic gain.

The three WordPress blog posts are **not** migrated. See `MIGRATION-NOTES.md`.
Anything still linking to them lands on the 404 page, which offers the four
services and the phone number.
