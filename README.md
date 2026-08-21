# Robo-Invent 2026

Landing site for the Kandy Schools Robotics Championship, run by the Kandy
Innovation Centre at NIBM.

React 19 + Vite 8 + Tailwind v4. Motion via `framer-motion`, momentum scrolling
via `lenis`.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run lint
```

## Design system

Dark theme, built from the event logo: deep navy `#0D2F54` and circuit cyan
`#12B5DE`. Everything lives in `src/index.css` under `@theme`, so components
use token names rather than raw values.

Token names describe **role, not lightness** — `paper` is whatever the page is
printed on, `ink` is whatever it is printed with. Here the substrate is
navy-black and the ink is a cool bone, so `bg-ink text-paper` is the *inverted*
(bright) treatment used for primary buttons, timeline dots and the like.

**Surfaces**, darkest first — `void` (footer bookend), `paper` (page),
`paper-deep` (alternating bands), `card` (raised panels and the hero frame).

**Marks** — `ink` → `ink-soft` → `ink-mute` → `ink-faint`, in descending
prominence. All four clear 4:1 against `paper`.

**Lines** — `rule` for structural hairlines, `rule-soft` for secondary ones.
Hairlines carry most of the layout; there are very few boxes.

**Accents** — `flare` (cyan) is the only loud colour and is reserved for the
single most important thing in view. `ember` and `navy` support it in
gradients; `moss` is for positive status only. Anything sitting *on* cyan uses
`text-paper`, not white — white on this cyan is only ~2.1:1.

**Families** — `font-display` is Archivo (headings, body, UI). `font-mono` is
JetBrains Mono, used only for micro-labels: eyebrows, table headers, spec
values, button text.

**Logos** — `src/assets/brand/` holds the white, pre-cropped variants used in
the UI (`BrandLogo.jsx` wraps the lockup). Originals, including the colour
versions, stay untouched in `src/assets/Event LOGOS/`.

### Component classes

| Class | Use |
| --- | --- |
| `.display` | Uppercase headline setting — tight tracking, 0.92 leading |
| `.eyebrow` / `.eyebrow-bare` | Mono micro-label, with and without the leading rule |
| `.frame` / `.panel` | The big rounded canvas, and section-level surfaces |
| `.chip` | Floating glass caption card |
| `.btn` + `.btn-solid` / `.btn-flare` / `.btn-ghost` / `.btn-invert` | Pill buttons |
| `.ulink` | Underlined link with a sweep on hover |
| `.field` / `.field-label` | Underline form inputs |

Utilities: `.grain` (page-wide film grain), `.bleed-warm`, `.paper-grid`,
`.watermark`, `.tnum` (tabular figures for anything counting).

### Rules of thumb

- Sections alternate `paper` and `paper-deep` to give the page rhythm.
- Section headers are asymmetric — heading left, supporting text right — never
  centred stacks.
- Each section is numbered in its eyebrow (`01 — About` … `10 — Contact`).
- Illustrations are hand-built inline SVG in the drawing-office style
  (`RoverSchematic.jsx`, `SmartCityTrack.jsx`). No icon library.

## Things still open

- `Contact.jsx` logs the inquiry form to the console; it needs a real backend
  (EmailJS, Formspree, or a serverless handler).
- The rulebook PDF link in `Registration.jsx` is a placeholder.
- Slot counts (40 / 40) are hard-coded in `Registration.jsx`.
