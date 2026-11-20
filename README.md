# Glossy Petal Nail Studio (`next-nails-gloss`)

A bright, glossy Next.js static website for **Glossy Petal Nail Studio** — a colour-obsessed nail
studio on South Congress in Austin offering gel, BIAB and classic manicures, spa pedicures and
hand-painted nail art. Built as a self-contained static export ready for GitHub Pages and the
Jamstacks template gallery.

## Local preview and checks

Requires Node 24+ and npm.

```sh
npm ci
npm run dev      # local development server
npm run check    # tests, typecheck and static production build (out/)
npm start        # preview the built static output from out/
```

To verify a project-path export (for example GitHub Pages under a repository subpath):

```sh
PAGES_BASE_PATH=/preview PAGES_BASE_URL=https://owner.github.io/preview npm run build
npm start -- --base /preview --port 3000
```

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home: light/dark hero photography inside a nail-arch frame (drawn-hand fallback for other shades), open-now chip, polish-rack bottles with derived "from" prices, Shade of the Month band with the full shade rack, six featured lookbook sets, 4-step visit guide, address & hours, closing CTA, and `NailSalon` JSON-LD |
| `/menu/` | Full price list (`#manicures`, `#pedicures`, `#nail-art`, `#add-ons`), category jump bar, policy sign, and "Taking a break" badges for unavailable items |
| `/lookbook/` | Colour-family & technique filter bar over 14 SVG nail-art sets (all visible without JavaScript) |
| `/aftercare/` | First-24-hours gloss timer, service care labels, Do/Don't split card, return timeline ruler (weeks) and soak-off removal advice |
| `/contact/` | Appointment enquiry guide, visible email (`hello@glossypetal.example`), phone, address, hours, and the hosted Jamstacks support form (or direct-email fallback when unconfigured) |
| `/404.html` | Playful "Smudged" 404 page with links back to Home, Menu and Lookbook |

## Make it yours (owner editing guide)

| File | Owns |
| --- | --- |
| `content/business.ts` | Studio name, wordmark, email, phone, South Congress address, landmark, weekly opening hours, `America/Chicago` time zone and enquiry guidance |
| `content/menu.ts` | Service prices (`priceUsd`), durations (`durationMinutes`), `available` flags (false shows "Taking a break" and excludes from Home "from" prices) and `popular` badges |
| `content/shades.ts` | The 12-shade polish rack (`hex`, `family`, `finish`) and the single `featured: true` Shade of the Month + `story` |
| `content/lookbook.ts` | The 14 SVG nail-art designs (`shape`, five-nail pattern specs, `technique` service link, `family`, `featured` picks for Home) |
| `content/aftercare.ts` | First-24-hours checklist, service care guides (`returnAfterWeeks`), and Do/Don't lists |
| `app/**/page.tsx` | Editable headings, intro copy, step descriptions, policy notes and calls to action for each route |
| `site.config.json` | Public site name, meta description, domain, `timeZone` and Jamstacks integration (`siteId`, `cdnUrl`) |
| `app/tailwind.input.css` | Light ("bare": rose-nude and oxblood) and dark ("after dark": black cherry) palette tokens, display type scale, lacquer button and band styles and `--jamstacks-*` variables |
| `components/art/` | Inline SVG artwork: hero hand, glass polish bottle, glossy nail-tip renderer and thin-line icons |
| `lib/structured-data.ts` | `NailSalon` schema.org JSON-LD derived from `content/business.ts` |

### Common owner edits

- **Change the Shade of the Month**: In `content/shades.ts`, move `featured: true` (and ensure `story` is filled in) to another shade such as `mint-fizz`, then run `npm run check`. Home's "Wearing" caption, the Shade of the Month band and the raised tip in the shade rack all update automatically. The hero photos in `public/hero-light.webp` and `public/hero-dark.webp` show Raspberry Gloss, so they appear only while `heroPhoto.shadeId` in `content/shades.ts` is the featured shade; any other shade shows the drawn hand painted in that colour instead.
- **Replace the hero photos**: Save new 4:5 portrait shots (1200×1500 WebP) of a hand wearing one shade over `public/hero-light.webp` (rose-nude backdrop) and `public/hero-dark.webp` (black-cherry backdrop), then set `heroPhoto.shadeId` and `heroPhoto.alt` in `content/shades.ts`. CSS shows the photo matching the active light/dark theme.
- **Pause a service or update prices**: Edit `available: false` or `priceUsd` in `content/menu.ts`. Unavailable items show `"Taking a break"` on `/menu/` and are excluded from Home's `"from $X"` bottle labels.
- **Swap featured lookbook sets**: Keep exactly six designs marked `featured: true` in `content/lookbook.ts`.
- **Update opening hours**: Edit the seven weekday entries in `content/business.ts` (same-day `HH:MM` intervals only; overnight spans fail validation).

## Typography & licences

- **Bodoni Moda Variable** (`@fontsource-variable/bodoni-moda`) — display, wordmark and prices; SIL Open Font License 1.1 (OFL), self-hosted via npm. Its optical-size axis is pinned low (`opsz` 12–16) so hairlines survive at display sizes.
- **Instrument Sans Variable** (`@fontsource-variable/instrument-sans`) — body copy and labels; SIL Open Font License 1.1 (OFL), self-hosted via npm.

## Public configuration & Contact form

`site.config.json` preserves the Jamstacks provisioner contract (`name`, `description`, `domain`, `timeZone`, `jamstacks.siteId`, `jamstacks.cdnUrl`, optional `provisioningId`). Business content never goes in `site.config.json`.

| Environment variable | Public build-time meaning |
| --- | --- |
| `JAMSTACKS_SITE` | Website ID; blank keeps file default; absent ID renders direct-email fallback |
| `NEXT_PUBLIC_JAMSTACKS_CDN_URL` | CDN base URL (default `https://cdn.jamstacks.net`) |
| `NEXT_PUBLIC_SITE_DOMAIN` | Hostname overriding `site.config.json`'s `domain` |
| `SITE_TIME_ZONE` | IANA time zone overriding `site.config.json`'s `timeZone` |
| `PAGES_BASE_PATH` | Subpath such as `/preview`; blank for root/custom domain |
| `PAGES_BASE_URL` | Deployed Pages origin + path; takes precedence for canonical URLs |
| `JAMSTACKS_ALLOW_LOCAL_CDN` | Localhost CDN testing opt-in (rejected in GitHub Actions) |

Only `/contact/` mounts `<jamstacks-support-form>` and loads `{cdn}/sites/{siteId}/embed.js` when configured. Navigation to and from Contact uses full-document loads via `SiteLink`. Public email and phone remain visible regardless of form configuration.

## Gallery publishing assets

`jamstacks/` holds removable source-gallery metadata (`config.json`, `screenshots.json`, `home-light.jpg`, `home-dark.jpg`, `config.test.mjs`). Customer builds, tests and Pages deployments never read it. Run the gallery manifest check separately with:

```sh
node --test jamstacks/config.test.mjs
```
