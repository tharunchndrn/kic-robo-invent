<div align="center">
  <img src="src/assets/Event%20LOGOS/Event%20LOGOS/robo-INVENT%20Logo.png" alt="Robo-Invent 2026" width="350" />
  
  <p align="center">
    <strong>Landing site for the Kandy Schools Robotics Championship</strong><br>
    <em>Run by the Kandy Innovation Centre at NIBM</em>
  </p>
</div>

---

Built with **React 19**, **Vite 8**, and **Tailwind CSS v4**. Animations powered by `framer-motion`, and fluid momentum scrolling handled by `lenis`.

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start the local development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```

## 🎨 Design System

The visual identity is anchored in a dark theme inspired by the event logo: deep navy `#0D2F54` and circuit cyan `#12B5DE`. The entire design system lives in `src/index.css` under `@theme`. All components use semantic token names instead of raw color hexes.

> [!TIP]
> **Token philosophy:** Token names describe **role, not lightness**. `paper` is the substrate (the page), and `ink` is what is printed on it. Since this is a dark theme by default, `paper` is navy-black and `ink` is a cool bone-white. This semantic approach makes the new Light Mode toggle work seamlessly!

### The Palette

- **Surfaces (Darkest to lightest):** `void` (footer bookend), `paper` (main page background), `paper-deep` (alternating sections), `card` (raised panels and hero frames).
- **Marks:** `ink` → `ink-soft` → `ink-mute` → `ink-faint` in descending prominence. All four clear a 4:1 contrast ratio against `paper`.
- **Lines:** `rule` for structural hairlines, `rule-soft` for secondary dividers. Hairlines define layout boundaries (boxes are rarely used).
- **Accents:** `flare` (cyan) is the loudest color, reserved exclusively for the most critical focal points. `ember` and `navy` provide gradient support; `moss` indicates positive status.
  - *Note: Text sitting directly on cyan uses `text-carbon` (black), not white, to maintain accessible contrast.*

### Typography & Assets
- **Families:** `font-display` uses **Archivo** for all headings, body text, and UI. `font-mono` uses **JetBrains Mono** exclusively for micro-labels: eyebrows, table headers, spec values, and buttons.
- **Logos:** Production-ready, pre-cropped UI variants live in `src/assets/brand/`. The original source logos (including full-color versions) are safely stored in `src/assets/Event LOGOS/`.

## 🧩 Component Library

| Class | Purpose |
| --- | --- |
| `.display` | Uppercase headline setting — tight tracking, 0.92 leading |
| `.eyebrow` / `.eyebrow-bare` | Mono micro-label, with and without the leading decorative rule |
| `.frame` / `.panel` | The large rounded canvas, and section-level surfaces |
| `.chip` | Floating glass caption card |
| `.btn` | Base pill button. Modifiers: `.btn-solid`, `.btn-flare`, `.btn-ghost`, `.btn-invert` |
| `.ulink` | Underlined link with a sweep animation on hover |
| `.field` / `.field-label`| Elegant underlined form inputs |

**Utilities:** `.grain` (page-wide film grain), `.bleed-warm`, `.paper-grid`, `.watermark`, `.tnum` (tabular figures for counters/numbers).

## 📐 Layout Rules of Thumb

- Sections alternate between `paper` and `paper-deep` backgrounds to establish vertical rhythm.
- Section headers are strictly asymmetric (heading on the left, supporting text on the right) — **never** centered stacks.
- Each section is sequentially numbered in its eyebrow (e.g., `01 — About`, `10 — Contact`).
- Illustrations are hand-built, inline SVGs designed in a technical "drawing-office" style (see `RoverSchematic.jsx`, `SmartCityTrack.jsx`). **No generic icon libraries are used.**

## 📋 Open Tasks

- [ ] **Contact Form:** `Contact.jsx` currently logs inquiries to the console. It needs to be hooked up to a real backend handler (e.g., EmailJS, Formspree, or a serverless function).
- [x] **Rulebook PDF:** The rulebook PDF is now live and linked across the site!
- [ ] **Dynamic Registrations:** Slot counts (`40 / 40`) are currently hard-coded.

---
<div align="center">
  <sub>Designed for KIC NIBM • Built for Robo-Invent 2026</sub>
</div>
