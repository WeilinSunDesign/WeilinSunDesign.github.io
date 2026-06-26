# Portfolio Context — Weilin Sun's Portfolio Website

This skill loads the full context of the portfolio codebase: architecture, design system, component conventions, and page patterns. Load this before making any changes to the project.

---

## Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS v4 (via `@theme` in `src/index.css` — NOT `tailwind.config.js`)
- **Animation**: Framer Motion
- **Routing**: `HashRouter` + `react-router-dom` (hash-based, required for GitHub Pages)
- **Language**: TypeScript (`.tsx` / `.ts`)
- **Deployment**: GitHub Pages
- **Analytics**: GoatCounter (`src/usePageView.ts`)

---

## Content Architecture (template system)

All site content lives in config files — **never hardcoded in page components**.

| File | Purpose |
|---|---|
| `src/portfolio.config.ts` | Single source of truth: personal info, projects list, about page, nav, carousel |
| `src/case-studies/types.ts` | TypeScript types for case study content |
| `src/case-studies/registry.ts` | Maps slug → content object for generic case study pages |
| `src/case-studies/example.ts` | Template showing all available block types |
| `src/case-studies/[slug].ts` | One file per generic case study |

### Two types of case study pages

- **`pageType: "custom"`** — hand-crafted `.tsx` file with custom layout (e.g. `src/swiftfood.tsx`). Registered explicitly in `src/main.tsx`.
- **`pageType: "generic"`** — rendered by `src/CaseStudyPage.tsx` using content from `src/case-studies/registry.ts`. Route auto-handled by the `/projects/:slug` catch-all.
- **`pageType: null`** — no page yet; card shows WIP toast.

---

## Project Structure

```
src/
  App.tsx                    — Homepage (/)
  ProjectsPage.tsx           — Projects grid (/projects)
  AboutMe.tsx                — About page (/about)
  CaseStudyPage.tsx          — Generic case study renderer (/projects/:slug)
  portfolio.config.ts        — All content data
  swiftfood.tsx              — Custom case study (/projects/swiftfood)
  healthtech.tsx             — Custom case study (/projects/healthtech)
  VrVolunteerSystem.tsx      — Custom case study (/projects/volunteer)
  Smarthome.tsx              — Custom case study (/projects/smarthome)
  generative-image.tsx       — Custom case study (/projects/creative-2)
  vibe-coding-portfolio.tsx  — Custom case study (/projects/vibe-coding-portfolio)
  other-4.tsx                — Custom case study (/projects/other-4)
  case-studies/
    types.ts                 — CaseStudyContent, Section, Block interfaces
    registry.ts              — { slug: content } map for generic pages
    example.ts               — Reference template with all block types
  components/
    Header.tsx               — Shared top nav bar
    ProjectCards.tsx         — Project card (reads Project type from config)
  index.css                  — Tailwind @theme tokens + typography classes
  main.tsx                   — Router: explicit custom routes + /:slug catch-all
  usePageView.ts             — GoatCounter analytics hook
  vibe-coding-workflow.css   — Extra CSS for vibe-coding-portfolio page only
```

---

## Routing (src/main.tsx)

```tsx
<Route path="/"                           element={<App />} />
<Route path="/about"                      element={<AboutMe />} />
<Route path="/projects"                   element={<ProjectsPage />} />
// Custom pages (explicit):
<Route path="/projects/swiftfood"         element={<SwiftfoodPage />} />
<Route path="/projects/healthtech"        element={<HealthtechPage />} />
<Route path="/projects/volunteer"         element={<VrVolunteerSystem />} />
<Route path="/projects/smarthome"         element={<SmarthomePage />} />
<Route path="/projects/other-4"           element={<Other4Page />} />
<Route path="/projects/creative-2"        element={<GenerativeImagePage />} />
<Route path="/projects/vibe-coding-portfolio" element={<VibeCodingPortfolio />} />
// Generic template catch-all (must be last):
<Route path="/projects/:slug"             element={<CaseStudyPage />} />
```

Adding a new custom page = new `.tsx` file + new explicit route before the catch-all.
Adding a generic page = new content file + registry entry + `pageType: "generic"` in config.

---

## Design System

### Color Tokens (`src/index.css` `@theme`)

| Token | Value | Usage |
|---|---|---|
| `--color-my-bg` | `#F8F7F3` | Page background (warm off-white) |
| `--color-brand` | `#63C2BD` | Accent teal — hover states, active dots, decision borders |
| `--color-black` | `#0D0D0D` | Primary text, borders |
| `--color-grey-1` | `#3B3B3B` | Section titles |
| `--color-grey-2` | `#5C5C5C` | Body text (muted) |
| `--color-grey-3` | `#B1B1B1` | Eyebrow labels, captions |

### Typography

| Role | Font | Tailwind class |
|---|---|---|
| Display / headings | Libre Bodoni (serif) | `font-serif` |
| UI / labels / body | Futura Cyrillic (custom TTF) | `font-futura-medium`, `font-futura-heavy`, `font-futura-light` |

### Typography utility classes (`@layer components` in `index.css`)

| Class | Description |
|---|---|
| `.type-eyebrow` | Futura-Medium, 11px, uppercase, grey-3 |
| `.type-section-nav` | Libre Bodoni, `clamp(1.4rem,2.8vw,2.5rem)` — "01 — Context" headings |
| `.type-section-title` | Libre Bodoni, `clamp(2.2rem,3.5vw,4rem)` — ProjectsPage section titles |
| `.type-display` | Libre Bodoni, `clamp(1.5rem,3.8vw,4.2rem)` — case study hero titles |
| `.type-body-key` | Futura-Medium, 17px, black — key emphasis paragraphs |
| `.type-body` | Futura-Medium, 15px, grey-2 — standard body |
| `.type-body-sm` | Futura-Medium, 13px, black |
| `.type-subhead` | Futura-Medium, 15px, black |
| `.type-chip` | Futura-Medium, 10px, uppercase |
| `.type-decision` | Futura-Medium, 15px, `border-left: 2px solid brand` |

---

## Header Component (`src/components/Header.tsx`)

```tsx
<Header />                         // "Home" left, "Projects" right
<Header right="title" title="X" /> // "Home" left, custom text right
```

64px desktop / 48px mobile. `bg-my-bg`, `border-b border-black`, `z-10`.

---

## ProjectCard (`src/components/ProjectCards.tsx`)

Takes `project: Project` from `portfolio.config.ts`. Live check:
```ts
isLive = project.pageType === "custom" || (project.pageType === "generic" && slug in registry)
```

---

## CaseStudyPage (`src/CaseStudyPage.tsx`)

Generic renderer. Reads content from `registry[slug]`. Supports:
- Sidebar nav with Intersection Observer (xl screens, fixed left)
- Hero with optional background image
- Intro metadata grid
- Sections with `blocks[]` of types: `paragraph`, `paragraph-key`, `decision`, `subhead`, `image`, `image-row`

---

## Case Study Content Schema

```ts
interface CaseStudyContent {
  title: string;
  heroBackground?: string;   // filename in /public
  heroTags: string[];
  intro: { label: string; value: string }[];
  sections: {
    id: string;              // e.g. "s-overview"
    navLabel: string;        // e.g. "01 — Overview"
    heading?: string;        // optional visible heading
    blocks: Block[];
  }[];
}
```

---

## Aesthetic Principles

1. **No shadows, no gradients, no decorations** — structure through borders only
2. **Editorial / Swiss graphic design** — generous whitespace, typographic hierarchy
3. **Teal sparingly** — hover states, active sidebar dots, `.type-decision` borders only
4. **Uppercase tracking** — all labels, tags, nav items: `tracking-widest uppercase`
5. **Responsive**: desktop-first, `max-md:` for mobile, `xl:` for sidebar nav
6. **Images**: always `.webp`, `loading="lazy"`, fallback placeholder on error

---

## Common Operations

**Add generic case study:**
1. Create `src/case-studies/[slug].ts` (copy `example.ts`)
2. Add to `src/case-studies/registry.ts`
3. Add project to `portfolio.config.ts` with `pageType: "generic"`

**Add custom case study:**
1. Create `src/[slug].tsx` (copy `swiftfood.tsx` structure)
2. Add explicit route in `src/main.tsx` BEFORE the catch-all
3. Add project to `portfolio.config.ts` with `pageType: "custom"`

**Add new section to a case study:**
- Add `{ id: "s-newid", navLabel: "N — Title" }` to `sections[]`
- Sidebar nav picks it up automatically

**Design decision callout:**
```tsx
{ type: "decision", text: "Insight stated clearly." }
```
