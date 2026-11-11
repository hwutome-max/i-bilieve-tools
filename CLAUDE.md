# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This is a static site with no build system or package manager.

- **Serve locally**: `python3 -m http.server 8080` or `npx serve`
- **Docker build**: `docker build -t ibelieve-tools . && docker run -p 8080:80 ibelieve-tools`

No test runner, bundler, or linter is configured.

## Architecture

**Client-rendered static site.** `index.html` loads `styles.css` and `app.js`, which renders all markup into `#app` at runtime. There is no framework — everything is vanilla JS, CSS, and HTML.

### Rendering model

`app.js` is a single-file application. It stores all content in a `translations` object (keys: `en`, `de`, `it`, `zh`) and renders the entire page by setting `app.innerHTML` to a large template literal string.

Key functions:
- `render(lang)` — rebuilds the full DOM from scratch for the given language
- `getInitialLanguage()` — resolves language from `?lang=` URL param, then `localStorage.getItem('ibelieve-language')`, defaulting to `it` (Italian)
- `bindEvents(lang)` — re-attaches all event listeners after each render
- `initCutDemo()` — scroll-driven hero animation that updates CSS custom properties (`--cut-progress`, `--head-y`, `--blade-spin`, etc.) on `window` scroll/resize

When switching languages via the `<select data-language-select>`, the URL is updated with `history.replaceState` and `render()` is called again. Event listeners and scroll handlers are torn down and re-attached on every render via `cleanupCutDemo` and `cleanupModalEvents`.

### Content structure

- `translations` — All UI copy for 4 languages. Any new user-facing string must be added to all 4 language objects.
- `productCategoryDefinitions` — 6 category objects (`key`, `image`, `products[]`) that map to `translations[lang].productCategories`. These drive both the product grid cards and the modal galleries.
- `images` — Path map for hero and feature images.

### Product modals

Each product category renders a modal inline (`productModal()`), toggled via the `hidden` HTML attribute and `data-product-modal` / `data-category-open` data attributes. Clicking a category card opens its matching modal; Escape or backdrop click closes all.

### Contact form

The contact form (`data-contact-form`) validates email and message length client-side, then submits via a `mailto:jessica@ibelievetools.com` link with the form body URL-encoded. No server endpoint exists.

## Design System

`DESIGN.md` is the source of truth for the Apple-inspired visual system. Key constraints:

- **Color rhythm**: Sections alternate between pure black (`#000000`) and light gray (`#f5f5f7`). Only accent is Apple Blue (`#0071e3`).
- **Typography**: SF Pro Display (20px+) and SF Pro Text (below 20px). Negative letter-spacing at all sizes.
- **CTAs**: Pill-shaped links use `border-radius: 980px`. Standard buttons use `8px`.
- **Navigation glass**: `rgba(0,0,0,0.8)` with `backdrop-filter: saturate(180%) blur(20px)`.

## Important Conventions

- **Cache-busting**: `index.html` appends `?v=YYYYMMDDD-...` query strings to `styles.css` and `app.js`. Bumping these versions is required when changing those files.
- **Multilingual sync**: Adding, removing, or renaming any translation key requires updating all 4 language objects (`en`, `de`, `it`, `zh`). Italian is the default language.
- **SEO / Schema**: `index.html` contains JSON-LD `Organization` and `FAQPage` structured data. Update it if company facts, contact info, or FAQ content changes.
- **Assets**: Product images live in `assets/catalog/` with numbered folders per category (e.g., `01-sintered-diamond-saw-blades/`). The root `assets/catalog/` also holds loose images referenced by the `images` map.
- **Deployment**: The `Dockerfile` uses nginx with the included `nginx.conf`. The site is served from the repo root.
