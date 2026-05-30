# Workflow Interface Lab

![Workflow Interface Demo](./assets/wf-interface-gif.gif)

Experimental UI showcase exploring operational interfaces, workflow-oriented layouts, modular frontend systems, and technical portfolio presentation patterns.

---

## Overview

This project started as a UI exploration and evolved into a structured frontend experiment focused on:

- Modular, single-file component architecture with clear separation of concerns
- Reusable UI primitives (`Cursor`, `Marquee`, `Reveal`, `ScanLines`) composed into a coherent layout system
- Workflow-oriented presentation: structured data models, category filtering, and state-driven rendering
- Maintainability through centralized data (`PROJECTS` array, `MARQUEE_ITEMS`) decoupled from rendering logic
- Scalable frontend organization that can grow without restructuring core layout

The interface showcases concepts related to operational AI systems, automation tooling, workflow orchestration, integration layers, and reliability-focused workflows — communicated through frontend architecture decisions rather than backend implementation.

---

## Tech Stack

| Technology | Role |
|---|---|
| **React 19** | Component model, hooks-based state and effects |
| **Create React App** | Build tooling, Webpack bundling, dev server |
| **Lucide React** | Icon system — lightweight, tree-shakeable SVG icons |
| **Google Fonts** | `Press Start 2P` (pixel display font) + `JetBrains Mono` (monospace body) |
| **CSS @keyframes** | Animation system: `marquee`, `fadeUp`, `blink`, `scandown` |
| **IntersectionObserver** | Scroll-triggered reveal animations without a library dependency |
| **RequestAnimationFrame** | Smooth cursor tracking via `rAF` loop |
| **Vercel** | Deployment and hosting |

**Why this stack:** The goal was intentional minimalism. No CSS framework, no animation library, no state management library. Every visual behaviour is implemented with platform APIs directly — `IntersectionObserver`, `rAF`, CSS `@keyframes`. This keeps the bundle small and the rendering logic legible.

---

## Frontend Architecture

The entire interface lives in a single composed module (`src/App.js`) organized by clear functional layers:

```
src/
├── App.js          — full component tree, data, and layout
├── App.css         — minimal reset (unused styles left for CRA compatibility)
├── index.css       — global body reset
└── index.js        — React root mount
```

**Component structure inside `App.js`:**

```
Utilities (pure, no props dependency)
  └── Cursor          — rAF-driven mouse tracker
  └── Marquee         — CSS-animated horizontal ticker
  └── Reveal          — IntersectionObserver scroll fade
  └── ScanLines       — fixed CRT scanline overlay

Data layer
  └── PROJECTS[]      — typed project records with PT/EN copy variants
  └── MARQUEE_ITEMS[] — centralized ticker content

Rendering
  └── Row             — single project card, featured-aware
  └── Portfolio       — root layout: nav, hero, filter, project list, contact, footer
```

**Key design decisions:**

- **Bilingual data model:** Each project entry carries both `PT` and `EN` content objects. The active language is a single React state value passed down — no i18n library required.
- **Category filter:** `cat` state maps to a string key that filters `PROJECTS` by `.cat` field. Adding a new category requires one new key in `cats` and a matching `p.cat` value — no structural changes.
- **Featured flag:** A `featured: true` field on a project record triggers alternate visual treatment in `Row` without a separate component or conditional rendering path outside the row itself.
- **Centralized copy:** All user-facing strings (hero, subtitles, stats, labels) are inline in the JSX with ternary `lang === "PT"` guards. A future i18n migration would be a clean extraction.

---

## Engineering Principles

- **No external state management.** Local `useState` covers all UI state: language toggle, category filter, load flag, tick counter for the live clock. No Redux, no Context for data that doesn't need it.
- **No animation library.** Scroll reveals use native `IntersectionObserver`. Marquee uses a CSS `transform` keyframe. Cursor uses `requestAnimationFrame`. Zero runtime animation overhead beyond what the browser already does.
- **Inline styles as a deliberate choice.** Co-locating styles with component logic eliminates dead CSS, class name collisions, and the cognitive overhead of mapping component states to class strings. Every visual state (hover, featured, loaded) is a direct JavaScript expression.
- **Data-driven rendering.** The project list is a plain JavaScript array. Filtering, ordering, and rendering are all derived from that single source of truth. The UI layer never owns content decisions.
- **Deployment-safe font loading.** Fonts are loaded via a `<link>` tag inside the React tree rather than `@import` in CSS, which keeps them visible to the Vercel edge and avoids FOIT on first load.
- **Platform APIs over dependencies.** `IntersectionObserver`, `rAF`, CSS animations. Browser-native, zero-weight, well-supported.

---

## UI / Design Direction

The visual language is deliberately systems-oriented:

- **Dark monochrome palette** — `#000` background, `#fff` / `#666` / `#888` text hierarchy, no color accents except the subtle flagship blue (`#3a3a88`)
- **Terminal-inspired typography** — `Press Start 2P` for display headings (pixel grid aesthetic), `JetBrains Mono` for all body text, labels, and metadata
- **Grid-based layout** — the project list uses a three-column CSS grid (`56px 1fr 130px`) giving it a structured table feel rather than a card grid
- **Operational microdetails** — live clock in the nav, blinking cursor `█` in the hero, CRT scanline overlay, moving scan line — these small elements reinforce the runtime/infrastructure tone without being decorative noise
- **Reveal on scroll** — content fades up on intersection rather than being immediately visible, reducing visual load on first paint

---

## Interface Concepts

The project explores how frontend interfaces can communicate systems thinking:

- **Workflow interfaces** — project cards are structured like operational records, not marketing tiles
- **Operational status patterns** — live clock, status indicator, numbered entries with category labels
- **Modular systems visualization** — tag taxonomy, category filtering, and data hierarchy reflect how you'd think about actual workflow systems
- **Technical portfolio presentation** — the interface itself demonstrates frontend engineering discipline, not just visual taste

---

## Deployment

Deployed on Vercel via the GitHub integration.

**Build configuration:**
- Build command: `npm run build` (CRA Webpack production build)
- Output directory: `build`
- Node version: default Vercel Node (18+)

**No environment variables** are required for the current build. If dynamic content or API connections are added later, the recommended pattern is:

```
REACT_APP_*    — CRA-compatible env vars, available at build time
```

All configuration is currently static and bundled at build time — intentional for a static portfolio with no runtime data dependencies.

---

## Local Setup

```bash
# Clone the repository
git clone https://github.com/shalasch/UI-P-Test.git
cd UI-P-Test

# Install dependencies
npm install

# Start development server
npm start
# → http://localhost:3000

# Production build
npm run build
```

**Requirements:** Node 18+, npm 9+

---

## Project Status

Active. The interface is under continuous iteration as a frontend architecture experiment. Planned directions include:

- Extracting the data layer into a separate `config/projects.ts` file
- Adding section-level routing (hash-based) for direct project linking
- Exploring a Next.js App Router migration for static generation and improved font handling

---

*Built as a frontend systems experiment. Interface architecture and visual direction by [@shalasch](https://github.com/shalasch).*
