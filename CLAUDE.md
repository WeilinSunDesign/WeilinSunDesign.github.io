# Portfolio Template — Claude Code Guide

This is a portfolio template with a fixed design system. The visual style is non-negotiable — only content changes. Run `/setup-portfolio` to let Claude populate the site with your content automatically.

## Quick start

1. **Install and run**
   ```
   npm install
   npm run dev
   ```

2. **Let Claude set up your content**
   ```
   /setup-portfolio
   ```
   Claude will ask for your information and generate all config files.

3. **Deploy to GitHub Pages**
   ```
   npm run build
   # push to GitHub, enable Pages on the gh-pages or docs branch
   ```

---

## What you edit (content only)

| File | What it controls |
|---|---|
| `src/portfolio.config.ts` | Your name, bio, links, projects list, about page |
| `src/case-studies/registry.ts` | Which projects have detail pages |
| `src/case-studies/your-project.ts` | Content for each project detail page |
| `public/` | Your images (use `.webp` for web performance) |

## What you never touch (design system)

- `src/index.css` — colours, typography, spacing tokens
- `src/components/` — shared UI components
- `src/CaseStudyPage.tsx` — generic case study renderer
- `src/App.tsx`, `src/ProjectsPage.tsx`, `src/AboutMe.tsx` — page shells

---

## Adding a project

### With a detail page (generic template)

1. Add your project to `src/portfolio.config.ts`:
   ```ts
   {
     slug: "my-project",
     title: "Project Title",
     coverImage: "/my-project-cover.webp",
     year: "2025",
     chips: ["UX Design", "Mobile"],
     section: "ux-ui-projects",   // or "creative-coding" / "other-projects"
     pageType: "generic",
   }
   ```

2. Create `src/case-studies/my-project.ts` — copy `example.ts` as a starting point.

3. Register it in `src/case-studies/registry.ts`:
   ```ts
   import myProject from "./my-project";
   export const registry = {
     "my-project": myProject,
   };
   ```

4. Drop your images in `public/` and reference them by filename in the content file.

### Without a detail page (WIP)

Set `pageType: null` — the card will show a "check back soon" toast on click.

---

## Case study content blocks

Inside `sections[].blocks`, each block has a `type`:

| type | renders as |
|---|---|
| `"paragraph"` | Body text, muted grey |
| `"paragraph-key"` | Bold body text, black — use for key statements |
| `"decision"` | Teal left-border callout — use for design decisions |
| `"subhead"` | Small uppercase subheading within a section |
| `"image"` | Full-width image with optional caption |
| `"image-row"` | 2–3 images side by side |

See `src/case-studies/example.ts` for a complete example with all block types.

---

## Project sections

Three sections are configured in `portfolio.config.ts`:
- `"ux-ui-projects"` — UX/UI Projects
- `"creative-coding"` — Creative Coding  
- `"other-projects"` — Other Projects

Add/rename sections by editing the `projectSections` array and updating `homeNav`.

---

## Tech stack reference

- React 18 + Vite + TypeScript
- Tailwind CSS v4 (theme tokens in `src/index.css` `@theme` block — no `tailwind.config.js`)
- Framer Motion for animations
- HashRouter (required for GitHub Pages)
- GoatCounter for analytics (`src/usePageView.ts`)
