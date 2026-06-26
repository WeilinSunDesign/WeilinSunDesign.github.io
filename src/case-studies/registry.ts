// ─────────────────────────────────────────────────────────────────────────────
// CASE STUDY REGISTRY
//
// Add one entry per "generic" case study page.
// Key = slug (must match the slug in portfolio.config.ts)
// Value = imported content object
//
// Custom .tsx case studies (swiftfood, healthtech, etc.) do NOT go here —
// they have their own route in main.tsx.
// ─────────────────────────────────────────────────────────────────────────────

import type { CaseStudyContent } from "./types";

// ── Add your imports here ────────────────────────────────────────────────────
// import myProject from "./my-project";

export const registry: Record<string, CaseStudyContent> = {
  // "my-project": myProject,
};
