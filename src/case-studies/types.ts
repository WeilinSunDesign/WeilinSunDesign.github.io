// ─────────────────────────────────────────────────────────────────────────────
// Case study content types
// Used by registry.ts and CaseStudyPage.tsx
// ─────────────────────────────────────────────────────────────────────────────

export type BlockType =
  | "paragraph"      // regular body text — type-body, grey-2
  | "paragraph-key"  // emphasis paragraph — type-body-key, black
  | "decision"       // design decision callout — teal left border
  | "subhead"        // sub-section heading inside a section
  | "image"          // single image
  | "image-row";     // 2–3 images side by side

export interface Block {
  type: BlockType;
  text?: string;                              // for paragraph, paragraph-key, decision, subhead
  src?: string;                               // for image — filename only, e.g. "project-screen.webp"
  caption?: string;                           // for image
  ratio?: string;                             // for image, e.g. "16/9", "4/3" (default: "auto")
  images?: { src: string; caption?: string }[]; // for image-row
}

export interface Section {
  id: string;       // used for sidebar nav + scroll target, e.g. "s-overview"
  navLabel: string; // sidebar label, e.g. "01 — Overview"
  heading?: string; // optional visible section heading (type-section-nav)
  blocks: Block[];
}

export interface CaseStudyContent {
  title: string;
  heroBackground?: string;  // filename in /public, e.g. "project-bg.webp"
  heroTags: string[];        // pill tags in hero, e.g. ["UX Design", "Mobile"]
  intro: {
    label: string;           // e.g. "Overview:"
    value: string;
  }[];
  sections: Section[];
}
