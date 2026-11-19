# Key Ledger

Static directory of US car key-fob and smart-key replacement notes, organized by make, model, and year. Pages say whether an owner can program a replacement, and they cite a URL and an access date for every procedure, FCC ID, part number, and price. Anything that was not checked is labeled **unverified / not yet researched**. The site does not publish ratings or testimonials.

The three seed pages are:

- [2003–2006 Chevrolet Silverado 1500](src/content/vehicles/chevrolet-silverado-1500-2003-2006.yaml)
- [2011–2014 Ford F-150](src/content/vehicles/ford-f-150-2011-2014.yaml)
- [2012–2016 Honda CR-V](src/content/vehicles/honda-cr-v-2012-2016.yaml)

## Requirements

Node.js 22.23.4 or newer (the Astro version in this repo declares that engine).

## Scripts

```bash
npm install
npm run check    # fails if a vehicle file is missing fields or sources
npm run build    # runs the check, then writes the static site to dist/
npm run dev      # local preview
```

Build output folder: **`dist/`**. Do not commit it. A host should run `npm run build` and publish `dist/`.

`npm run check` also runs a self-test that expects failure when a safety note or a source list is removed, when a verified price has no source, when an unverified price includes a dollar amount, and when on-board status has no steps.

## Add a vehicle page

1. Copy `src/content/vehicles/chevrolet-silverado-1500-2003-2006.yaml` to a new file named `{makeSlug}-{modelSlug}-{yearSlug}.yaml`.
   Example: `toyota-camry-2018-2021.yaml` for years 2018–2021. A single year uses `2018`, not `2018-2018`.
2. Set `make`, `makeSlug`, `model`, `modelSlug`, `yearStart`, `yearEnd`, `yearSlug`, and `market: US`. Slugs are lowercase kebab-case. `yearSlug` must be `2003-2006` when the years differ and `2013` when they are the same.
3. Write a unique `title`, `description` (50–180 characters, this is the meta description), `summary`, `scope`, and `reviewed` (`YYYY-MM-DD`, the day you checked the sources).
4. Set `programmingFacts`: `onboardStatus` (`yes`, `no`, `needs-tool`, or `unknown`), `minimumWorkingKeys` (`0`, `1`, `2`, or `unknown`), `pushButtonProcedure` (`covered`, `not-covered`, or `unknown`), and `ignitionKeyInCylinder` (`required`, `not-required`, or `unknown`). If any of those is not `unknown`, `sourceIds` is required. `required` means a sourced procedure tells the owner to put a key in the ignition. Set `diy.status` to one of `yes`, `no`, or `needs-tool`.
   - `yes` means an on-board sequence was found. `diy.steps` is required. Every step needs `text` and `sourceIds`.
   - `no` and `needs-tool` must not include steps. Explain the limit in `diy.summary`.
   - `diy.safetyNote` is always required and must mention a locksmith.
   - `diy.sourceIds` must point at entries in `sources`.
5. Add one or more `variants`. Each needs:
   - `keyType`: `flip-key`, `remote-head-key`, `smart-prox`, `transponder-only`, or `separate-remote`
   - `keyTypeNote` and `keyTypeSourceIds`
   - `fccIds` (each with `id`, `role`, and `sourceIds`) or `fccUnverified`
   - `oemPartNumbers` (each with `number` and `sourceIds`) or `partsUnverified`
   - `battery` and `frequency`, each either `{ status: verified, ... sourceIds }` or `{ status: unverified, note }` with no guessed value. A battery type such as `CR2032` is allowed only when a source names it.
   - optional `buttons.count` with `sourceIds` when a source states the button count
   - FCC `role`: `oem`, `aftermarket-example`, or `seller-listed`
6. Add `priceRanges` covering `dealer`, `locksmith`, and `online-diy`. Every row needs `currency: USD`, `retailer`, `checkedAt` (`YYYY-MM-DD`), and `stock` (`in-stock`, `out-of-stock`, or `unknown`). A `verified` row needs `lowUsd` or `highUsd`, `sourceIds`, and a stock value other than `unknown`. An `unverified` row needs `stock: unknown` and must not include a dollar amount. Use `retailer: none` when no shop was found. Read stock and `priceCurrency` from product JSON or JSON-LD. Do not store a price whose currency is not USD. Put the check date in `checkedAt`.
7. Optional `ignitionKey` (`verified` needs `sourceIds`; do not name a blade unless it is verified) and optional `troubleshooting` (each item needs `id`, `title`, `text`, and `sourceIds`). Leave them off when no source covers them.
8. Add `sources`. Each source needs `id`, `title`, `url` (http or https), `publisher`, and `accessed`. Every `sourceIds` / `sourceId` in the file must match one, and every source must be cited at least once.
9. Add `shopLinks` (or an empty list). `retailer` must be a key in `src/config/affiliates.json`, and `url` must start with that retailer's `baseUrl`.
10. Add `unverified`: a list of strings for facts you could not pin down. Use an empty list only when you truly have nothing open.
11. Run `npm run check`, then `npm run build`. Pages are English only, at `/{makeSlug}/{modelSlug}/{yearSlug}/`. No other registration step.

Do not guess an FCC ID, part number, programming step, or price. Do not add reviews, testimonials, star ratings, or review schema.

## Language

The site is English only. Pages use a self-canonical URL and do not publish hreflang alternates. Prices stay in US dollars.

## Affiliate parameters

Edit only `src/config/affiliates.json`. `affiliateQuery` is a raw query string without `?` or `&`, for example `tag=yourtag-20`. Leave it `""` until a program is joined. Empty means the link is unchanged. A non-empty value is appended to every shop link for that retailer, and those links are marked `rel="sponsored"`.

Configured retailers: Car and Truck Remotes, Car Keys Express, Tom's Key Company, Amazon.

## Hosting

The approved GitHub Pages address is `https://rzhuang4.github.io/key-ledger/`. This repo does not deploy itself. Build with `SITE_URL=https://rzhuang4.github.io` and `BASE_PATH=/key-ledger/`, then publish `dist/`.

Set these at build time:

| Variable | GitHub Pages, user or org site (`https://name.github.io/`) | GitHub Pages, project site | Cloudflare Pages |
| --- | --- | --- | --- |
| `SITE_URL` | `https://name.github.io` | `https://name.github.io` | `https://your-domain.example` |
| `BASE_PATH` | `/` | `/repository-name/` | `/` |

If `SITE_URL` is omitted, the build still succeeds and warns that canonical URLs and `sitemap-index.xml` use `https://example.com`. Change it before a public deploy. `robots.txt` points at that sitemap.

**GitHub Pages.** Build command `npm run build`, publish the `dist/` directory. Use a GitHub Action that uploads `dist/` as a Pages artifact, or build in any CI and push the artifact. Do not point Pages at the repository root. Project sites need `BASE_PATH`. The build emits `404.html`, which Pages serves for unknown URLs. No server functions.

**Cloudflare Pages.** Framework preset none, or Astro if the preset matches. Build command `npm run build`. Output directory `dist`. Set `SITE_URL` and leave `BASE_PATH` unset or `/`. The same `404.html` is used. No Workers or functions are required.

Both hosts can serve the files as a plain static site. There is no client-side router and almost no JavaScript (one small search filter on the home page; the vehicle list is in the HTML).
