# Repository Guidelines

Guidance for working in this repository. `DESIGN.md` is the source of truth for the visual system.

## Project Structure & Module Organization

Next.js App Router site for diamond saw blades. Italian, German, Chinese, Arabic, and Russian ship beside English. English is the default locale.

- `app/[locale]/` — server-rendered pages: home, `/blades`, `/blades/[id]`, `/inquiry`.
- `messages/` — UI copy. One JSON file per locale: `en`, `de`, `it`, `zh`, `ar`, `ru`.
- `data/products.json` — catalog read by the server. Product names and specification tables stay in the source-catalog wording.
- `product-data.js` — catalog source. `npm run catalog:sync` rewrites `data/products.json` from it.
- `assets/` — hero, factory, and product images. `public/assets` is a symlink to this folder, and `public/brochure.pdf` points at the brochure PDF.
- `lib/catalog.ts` — classifies products into saw blades, cup wheels, and core bits, and normalizes specification tables.
- `proxy.ts` — locale negotiation. `/` follows `Accept-Language` and falls back to English.
- `i18n/` — next-intl routing, navigation, and request config.

Saw blades lead. Cup wheels and core bits are matching tools in the same catalog. Do not add TCT blades, conventional abrasives, garden tools, or cordless accessories.

`index.html`, `app.js`, `styles.css`, `de.html`, and `it.html` are the previous static site. The Next.js app does not serve them. `next.config.ts` redirects `/index.html`, `/de.html`, and `/it.html` to the locale routes.

## Build, Test, and Development Commands

```sh
npm install
npm run dev
npm run build
npm run catalog:sync
docker build -t ibelieve-tools . && docker run -p 8080:80 ibelieve-tools
```

`npm run dev` serves the site locally. `npm run build` produces the standalone server used by the Docker image. There is no test runner or linter. After a UI change, open the affected locale and exercise the catalog filter, a specification page, and the inquiry form.

The Docker image copies `assets/` and the brochure into `public/` before building, so the symlinks are not required inside the container.

## Architecture

Pages are rendered on the server. Catalog filters are URL search params (`kind`, `material`, `process`, `d`, `q`), and each product has a stable page at `/[locale]/blades/[id]` using the existing catalog id.

`messages/*.json` holds every interface string. Adding, removing, or renaming a key requires the same change in all six files. Product titles and table cells are not translated.

The inquiry form posts to a Server Action, which sends mail with SMTP to `INQUIRY_TO` (default `jessica@ibelievetools.com`). Copy `.env.example` to `.env`. When SMTP is not configured, the form reports that the message was not sent.

`generateMetadata` supplies the title, description, canonical URL, and hreflang for each locale. The home page includes Organization and FAQ JSON-LD. Specification pages include Product JSON-LD. `app/sitemap.ts` lists every locale and product URL.

Factory facts stay inside the brochure: founded 2014, Danyang, 3,000 m², more than 2 million pieces a year, ISO 9001:2000, and German MPA. Do not add offices, sales history, or certifications that the brochure does not state.

## Design

Follow `DESIGN.md`. Limestone and ink carry the page, slag is the dark section, and copper `#c84b24` is the only accent, used as the kerf line. Headlines use the locale serif (Fraunces, Noto Serif SC, Source Serif 4, or Amiri). Body text uses the matching sans. Arabic sets `dir="rtl"` on the locale layout; styles use logical properties.

## Coding Style & Naming Conventions

For Markdown, use sentence-case headings unless matching an existing title. Keep paragraphs short and prefer bullets for rules and examples. Wrap paths, commands, and file names in backticks.

For code, match the existing TypeScript files: one component or library module per file, named for what it renders or returns. Keep locale-facing copy in `messages/`, not in components.

## Testing Guidelines

There are no automated tests. For documentation edits, check that headings, commands, and design tokens still match the app and `DESIGN.md`. For application changes, verify the changed flow in the browser, including the Arabic right-to-left layout when layout or direction is involved.

## Commit & Pull Request Guidelines

Use concise, imperative commit messages. Pull requests should summarize the change, explain why it is needed, and include screenshots for visual changes.

## Security & Configuration Tips

Do not commit credentials, private API keys, local environment files, or licensed font binaries. SMTP settings belong in `.env`, with the variable names documented in `.env.example`. Strip line breaks from inquiry fields that are placed in mail headers.
