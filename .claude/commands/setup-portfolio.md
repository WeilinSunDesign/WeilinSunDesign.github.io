# Setup Portfolio

You are helping a new user populate this portfolio template with their own content. The design system is fixed — only content changes. Your job is to fill in `src/portfolio.config.ts`, create case study content files in `src/case-studies/`, and update `src/case-studies/registry.ts`.

## Step 1 — Gather content

Ask the user for the following. Accept any format: pasted text, a PDF summary, bullet points, or a filled-in questionnaire. Extract what you can and ask follow-up questions for anything missing.

**Personal info needed:**
- Full name
- Job title (e.g. "UX Designer", "Product Designer")
- Location (e.g. "London / Remote")
- Short bio (1–2 sentences for the homepage, 2–3 sentences for the About page)
- LinkedIn URL
- Email address
- Resume/CV PDF filename (they'll put it in `/public/`)
- Portfolio year range (e.g. 2022–2025)

**Projects list needed (for each project):**
- Project title
- Cover image filename (they'll put it in `/public/`)
- Year
- 3–4 tag chips (first chip = primary category)
- Which section: `ux-ui-projects`, `creative-coding`, or `other-projects`
- Does it have a case study? (yes = create a detail page; no = WIP)

**For each project WITH a case study:**
- Hero background image filename (optional)
- 3–5 hero tags
- Intro metadata: role, duration, tools, overview
- Content: describe each section of the case study (what happened, what they decided, what images they have)

**About page:**
- Photo filename
- Skills grouped by category (Design, Tools, Development, Methods — or their own categories)

## Step 2 — Write the config

Edit `src/portfolio.config.ts` completely. Replace ALL of Weilin's content with the user's content. Keep the exact TypeScript structure — only change the values.

Key rules:
- `personal.name` — full name
- `personal.title` — job title, one string
- `personal.location` — city / work style
- `personal.bio` — array of strings, one per paragraph
- `personal.links` — array of `{ label, href }` — include LinkedIn, Email, Resume at minimum
- `personal.yearStart` / `personal.yearEnd` — as numbers
- `projects[].coverImage` — `/filename.webp` (leading slash, no path prefix)
- `projects[].pageType` — `"generic"` if has case study, `null` if WIP, keep `"custom"` only if they have hand-crafted TSX pages

## Step 3 — Create case study content files

For each project where `pageType: "generic"`, create `src/case-studies/[slug].ts`.

Use this template structure (from `src/case-studies/example.ts`):

```typescript
import type { CaseStudyContent } from "./types";

const content: CaseStudyContent = {
  title: "Full project title",
  heroBackground: "background-image.webp", // optional
  heroTags: ["Tag 1", "Tag 2", "Tag 3"],
  intro: [
    { label: "Overview:", value: "..." },
    { label: "My Role:",  value: "..." },
    { label: "Duration:", value: "..." },
    { label: "Tools:",    value: "..." },
  ],
  sections: [
    {
      id: "s-overview",
      navLabel: "01 — Overview",
      heading: "01 — Overview",
      blocks: [
        { type: "paragraph-key", text: "Key statement." },
        { type: "paragraph",     text: "Supporting detail." },
        { type: "image",         src: "image.webp", caption: "Caption", ratio: "16/9" },
      ],
    },
    // ... more sections
  ],
};

export default content;
```

**Block type guide:**
- `paragraph` — regular body text
- `paragraph-key` — bold emphasis paragraph (use for key insights)
- `decision` — teal left-border callout (use for design decisions, pivots, principles)
- `subhead` — small uppercase heading within a section
- `image` — single image; `ratio` can be `"16/9"`, `"4/3"`, `"auto"`
- `image-row` — side-by-side images: `images: [{ src, caption }, ...]`

Write natural, concise copy. Match the editorial tone: direct, specific, no fluff. Aim for 3–5 sections per case study.

## Step 4 — Update the registry

Edit `src/case-studies/registry.ts` to register all new generic case studies:

```typescript
import type { CaseStudyContent } from "./types";
import myProject from "./my-project";
import anotherProject from "./another-project";

export const registry: Record<string, CaseStudyContent> = {
  "my-project": myProject,
  "another-project": anotherProject,
};
```

## Step 5 — Update homepage carousel

The `carouselImages` array in `portfolio.config.ts` controls which projects appear in the homepage slideshow. Update it to use the user's projects (pick 4–6 visually strong ones).

## Step 6 — Confirm and review

After writing all files:
1. List every file you created or modified
2. List any images the user still needs to add to `/public/`
3. Tell them to run `npm run dev` to preview
4. Offer to adjust any content they want to change

## Important constraints

- Never modify `src/index.css`, `src/components/`, `src/CaseStudyPage.tsx` — these are the design system
- Never add styling, layout, or CSS — the template handles all of that
- Image filenames must match exactly what the user says they'll upload
- Slugs in `portfolio.config.ts` must match exactly the keys in `registry.ts` and the filenames in `src/case-studies/`
- Keep `pageType: "custom"` only if the user specifically says they have a custom-coded page
