# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the Project

No build process. This is a pure static site — open `index.html` with a local HTTP server.

- **VSCode Live Server**: configured for port `5504` (`.vscode/settings.json`)
- Entry point: `index.html` → auto-redirects to `main.html` after the intro animation

## Tech Stack

- Vanilla HTML5 / CSS3 / JavaScript (no framework, no bundler)
- **GSAP 3.12.2** (animation + ScrollTrigger) — loaded via CDN
- **Three.js 0.154.0** (3D model rendering) — loaded via CDN
- Deployed to GitHub Pages: `https://yeonflower2na.github.io/yeoni-portfolio/`

## Page Structure

```
index.html   → Intro/loading animation, redirects to main.html
main.html    → Hero + 3D "D" model (Three.js) + preview cards
about.html   → Bio, experience carousel, skill bars
project.html → Web project showcase with frame animations
design.html  → Design archive with category filter (data from designData.json)
detailPage01–05.html → Individual project detail pages
```

Shared HTML partials (`header.html`, `footer.html`, `contact.html`) are injected at runtime via `fetch()` in `common.js`.

## Architecture Patterns

**Partial injection** — Every page includes `.header-include`, `.contact-include`, `.footer-include` divs. `common.js` fetches and injects the shared partials on `DOMContentLoaded`. Page-specific scripts run after this.

**Navigation state** — `sessionStorage.activeNav` tracks the current page; each page sets its own nav item active on load.

**Wheel-based navigation** — `main.html` and `about.html` intercept `wheel` events for custom slide/page transitions instead of native scroll. The `currentLocation` variable tracks position in `main.js`; `about.js` uses a similar state for its multi-section layout.

**3D model** — `modeling.js` sets up the Three.js scene, loads `assets/images/D.glb` via GLTFLoader/DRACOLoader, and enables OrbitControls for drag-to-rotate and scroll-to-zoom.

**Design data** — `design.html` fetches `scripts/designData.json` to render the archive grid. Category filtering and hover-preview are handled entirely in `design.js`.

## Key Files

| File | Role |
|------|------|
| `scripts/common.js` | Shared setup: cursor, partial fetch, nav sync, clipboard copy, scroll-to-top |
| `scripts/main.js` | Wheel slide nav, 3D model interaction, preview carousel |
| `scripts/about.js` | Multi-section scroll, experience carousel, modal, skill bar animation |
| `scripts/modeling.js` | Three.js scene, GLTF load, model interaction |
| `scripts/designData.json` | Design archive metadata (year, category, title, image path) |
| `reset.css` | Base styles and CSS custom properties (colors, fonts) |

## Next.js Migration (`next-portfolio/`)

A full Next.js 16 + Tailwind CSS port lives in `next-portfolio/`. It mirrors every page and all interactive behavior of the original site.

**Dev / build commands** (run from `next-portfolio/`):
```
npm run dev      # http://localhost:3000
npm run build
npm run start    # serve production build
```

**Route mapping** (original → Next.js):
| Original | Next.js |
|----------|---------|
| `index.html` | `/` |
| `main.html` | `/main` |
| `about.html` | `/about` |
| `project.html` | `/project` |
| `design.html` | `/design` |
| `detailPage01–05.html` | `/detail/01`–`/detail/05` |

**Key component files:**
- `components/Cursor.tsx` – custom cursor + `window.copyToClipboard` / `window.scrollToTop` globals
- `components/Header.tsx` – nav with `usePathname()` for active state
- `components/Footer.tsx` – wrapped in `.footer-include` div
- `components/Contact.tsx` – holo modal, footer hover interactions
- `components/ThreeModel.tsx` – Three.js D.glb model (dynamically imported, no SSR)

**CSS**: all original CSS files are combined into `app/globals.css` with asset paths updated to `/assets/...`. Body background per page is set via `useEffect` in each page component.

**Static assets**: copied to `next-portfolio/public/assets/`. The `designData.json` is at `public/designData.json`.

**Playwright tests** (run both servers first):
```
npm run start        # Next.js on :3000
serve .. -p 5504     # Original on :5504
npx playwright test  # 38 tests, all passing
```

## Known Issues

- `assets/video/` paths referenced in some detail pages may not resolve — verify before adding video assets.
- `about.js` contains duplicate function declarations (`moveToPage2`, `moveToPage3`, `updateCarousel`); the last declaration wins.
- Common initialization logic (cursor, partial fetch) is repeated across page scripts; be careful not to add more duplication.
