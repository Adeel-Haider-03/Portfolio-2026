# Adeel Haider — Portfolio

A personal portfolio for a full-stack developer. Built with React 19, Vite 7 and Tailwind CSS 4.

The premise of the design is a single line from the résumé — *"from database schema through to a Dockerised deployment behind Nginx"* — so the whole page is built out of engineering instruments: a measurement rail, a rotating machine, a dial, a riveted spec plate.

```bash
npm install
npm run dev
```

---

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Vite dev server on `localhost:5173` |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the built output locally |
| `npm run optimize:images` | Convert new PNG screenshots in `public/` to WebP |

---

## Editing the content

**Everything on the page reads from one file: [`src/data/resume.js`](src/data/resume.js).** No copy lives in the components. Adding a project, changing a job, correcting a grade — all of it happens there.

```js
export const profile   = { … }  // name, contact, headline, availability
export const projects  = [ … ]  // the six panels on the cylinder
export const experience= [ … ]  // the stops along the road
export const stack     = [ … ]  // the skill bubbles, one per group
export const education = { … }  // feeds the grade dial
export const awards    = [ … ]  // the sealed list
export const sections  = [ … ]  // the left-hand ruler and its order
```

Two conventions worth knowing:

- **`projects[].live` / `.code`** — leave either as an empty string and that button simply is not rendered. Nothing ever ships as a dead `href="#"`.
- **`projects[].image`** — an empty string falls back to a typographic panel instead of a broken image.

### Adding a project

Append to `projects` in `resume.js`, drop a screenshot in `public/`, run `npm run optimize:images`, and point `image` at the resulting `.webp`. The cylinder re-derives its geometry from the array length — six panels or ten, the ring spaces itself.

---

## Structure

```
src/
  data/resume.js          every piece of content on the site
  index.css               design tokens + all component styles
  App.jsx                 section order, scroll reset, reveal observer
  hooks/useMotion.js      reduced-motion, reveal-on-scroll, active section
  components/
    Wordmark.jsx          the name, falling in as bricks
    Hero.jsx
    ProjectCylinder.jsx   the rotating ring of project screenshots
    Skills.jsx            the skill bubbles
    Experience.jsx        the road and the car
    Background.jsx        the grade dial and the sealed awards
    Contact.jsx           contact details and the nameplate footer
    Ruler.jsx             the fixed measurement rail (≥1440px)
public/                   WebP screenshots, favicon, résumé PDF
screenshots-src/          PNG originals, kept out of the build
scripts/                  the image optimiser
```

---

## Design system

Defined once as `@theme` tokens at the top of [`src/index.css`](src/index.css).

| Token | Value | Role |
| --- | --- | --- |
| `--color-ink` | `#0E1420` | page ground — blue-black, not pure black, which reduces halation |
| `--color-paper` | `#E8E6E1` | body text — **15.4:1** on ink |
| `--color-slate` | `#7C8798` | secondary text — **6.4:1** |
| `--color-brass` | `#E0A458` | the only accent — **8.5:1** |

**Archivo** for display, **IBM Plex Sans** for body, **IBM Plex Mono** for data and labels. Plex because it was drawn for technical documentation, which is the subject matter.

There is deliberately **one** accent colour. Every glow, marker and highlight on the page is brass; nothing else competes.

> **On light mode:** brass drops from 8.5:1 on ink to **2.2:1 on white**, failing AA for text and even for large text. A light theme would need a different accent — a second brand, not the same one inverted — and four of the five signature effects (the headlight beam, the brick dust, the cylinder's dimming depth cue, every brass glow) are built out of darkness and would have to be re-authored. It was considered and deliberately declined.

---

## How the set pieces work

**The wordmark** — each letter is its own brick with `transform-origin: 50% 100%`, so it compresses against its own baseline on landing. The fall curve is two eases spliced together: gravity to the ground at 48%, then a decelerating settle with squash, rebound and a second smaller bounce. Landing order is a fixed scramble so it never reads as a left-to-right sweep, and each dust puff fires at `fallDelay + (1.05s × 0.48)` — the exact impact point, not a guess.

**The cylinder** — six panels on a ring, backs hidden so the far side drops away and the shape reads as hollow. Radius is derived from panel width and count: `(w / 2) / tan(π / n)`. **Scroll position is the single source of truth** — clicking a panel scrolls the page rather than running its own animation, so the two can never disagree.

**The road** — the car's position comes from where the road crosses a sightline 55% down the viewport, so it sits near whatever you are actually reading. A sine on progress gives it a small tilt and sway; without it the car looks like it is on rails.

**The dial** — a 240° sweep mapping the grade onto an arc, with the needle and the arc fill both animating from zero when the section reveals. Geometry is computed, not hand-placed.

---

## Progressive enhancement

The page is **fully legible with no JavaScript and no animation**. This is enforced structurally rather than assumed:

- Content is visible by default. The hidden starting states only apply under a `js-motion` class that JS adds after confirming the IntersectionObserver actually reports back.
- If the observer stays silent — some embedded and headless views never run the compositor — a 1s failsafe removes the class and everything simply appears. A missing animation is a far smaller problem than an invisible page.
- `prefers-reduced-motion` is honoured throughout. The cylinder falls back to a flat grid, the car stops driving, the bricks and dust are switched off, and the dial rests at its true value rather than at zero.
- No scroll handler is gated behind a `requestAnimationFrame` latch. A dropped frame callback would leave the guard set and freeze the effect permanently.

Also: single `<h1>`, `aria-label` on the wordmark so screen readers do not spell the name out letter by letter, visible keyboard focus on a brass outline, and `history.scrollRestoration = 'manual'` so a reload starts at the top instead of dropping you mid-cylinder.

---

## Images

Screenshots are converted to WebP at quality 80, capped at 1600px wide — panels render at 760px, so that still covers 2× displays.

```bash
npm run optimize:images
```

The script reads any PNG in `public/`, writes a `.webp` beside it, and moves the original into `screenshots-src/` so it stops shipping. The initial pass took **2.14 MB → 0.38 MB (−82%)**.

They are loaded eagerly rather than lazily: a panel that pops in blank as the ring turns looks broken, and these screenshots are the content.

---

## Deploying

Static output, no server. `npm run build` produces `dist/`; point Vercel, Netlify or GitHub Pages at it. Nothing needs a rewrite rule — the site is a single page.

---

## Maintenance notes

- **Keep `public/Adeel_Haider_Resume.pdf` in step with `resume.js`.** It is served from the Download button, and a PDF that contradicts the page is worse than either alone.
- `projects[].highlights` currently holds detailed per-project notes that **no component renders**. The data is there if the readout is ever expanded to show it.
- The ruler rail appears only at ≥1440px, where the gutter is genuinely wider than the rail plus its longest label. Below that it would reach into the text column.
