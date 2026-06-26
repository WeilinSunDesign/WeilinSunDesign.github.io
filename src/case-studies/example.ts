// ─────────────────────────────────────────────────────────────────────────────
// EXAMPLE CASE STUDY — copy this file, rename it, and fill in your content.
//
// Then register it in src/case-studies/registry.ts.
// Then add the project to src/portfolio.config.ts with pageType: "generic".
// ─────────────────────────────────────────────────────────────────────────────

import type { CaseStudyContent } from "./types";

const content: CaseStudyContent = {
  title: "Your Project Title Here",

  // A full-width background image in the hero. Put the file in /public.
  // If omitted, the hero uses a plain bg-my-bg background.
  heroBackground: "project-bg.webp",

  // Pill tags shown in the hero area.
  heroTags: ["UX Design", "Mobile App", "Shipped"],

  // Left-column metadata grid below the hero.
  intro: [
    { label: "Overview:",  value: "One or two sentences describing what this project is." },
    { label: "My Role:",   value: "UX Designer" },
    { label: "Duration:",  value: "3 months" },
    { label: "Tools:",     value: "Figma, Protopie" },
  ],

  // Scrollable content sections.
  // Each section maps to one dot in the sidebar nav (xl screens only).
  sections: [
    {
      id: "s-overview",
      navLabel: "01 — Overview",
      heading: "01 — Overview",
      blocks: [
        {
          type: "paragraph-key",
          text: "A short key statement that frames the problem — one or two sentences max.",
        },
        {
          type: "paragraph",
          text: "Longer explanation of the context, the user group, and why this mattered. Write naturally; multiple paragraph blocks are fine.",
        },
        {
          type: "image",
          src: "project-intro.webp",
          caption: "Optional caption text",
          ratio: "16/9",
        },
      ],
    },

    {
      id: "s-research",
      navLabel: "02 — Research",
      heading: "02 — Research",
      blocks: [
        {
          type: "paragraph",
          text: "Describe your research approach and key findings.",
        },
        {
          // Two images side by side.
          type: "image-row",
          images: [
            { src: "research-1.webp", caption: "User interviews" },
            { src: "research-2.webp", caption: "Affinity diagram" },
          ],
        },
      ],
    },

    {
      id: "s-decisions",
      navLabel: "03 — Key Decisions",
      heading: "03 — Key Decisions",
      blocks: [
        {
          type: "subhead",
          text: "Why we chose X over Y",
        },
        {
          type: "paragraph",
          text: "Explanation of the trade-off and what led to the decision.",
        },
        {
          // A callout block with a teal left border — use for pivots, insights, principles.
          type: "decision",
          text: "Design insight or principle stated clearly in one sentence.",
        },
      ],
    },

    {
      id: "s-outcome",
      navLabel: "04 — Outcome",
      heading: "04 — Outcome",
      blocks: [
        {
          type: "paragraph-key",
          text: "What shipped and what it achieved.",
        },
        {
          type: "image",
          src: "project-final.webp",
          ratio: "4/3",
        },
        {
          type: "paragraph",
          text: "Any measurable results, team feedback, or next steps.",
        },
      ],
    },
  ],
};

export default content;
