// ─────────────────────────────────────────────────────────────────────────────
// PORTFOLIO CONFIG — edit this file to customise the entire site
// ─────────────────────────────────────────────────────────────────────────────
//
// This is the single source of truth for all content.
// Design, layout and component code are untouched — only this file changes.
//
// pageType:
//   "custom"  — has a hand-crafted .tsx case study (see src/swiftfood.tsx etc.)
//   "generic" — uses CaseStudyPage.tsx + a content file in src/case-studies/
//   null      — no detail page yet (shows a WIP toast on click)
// ─────────────────────────────────────────────────────────────────────────────

// ── Personal info ─────────────────────────────────────────────────────────────

export const personal = {
  name: "Weilin Sun",
  title: "Product Designer",       // used as page/tab title
  location: "London/ Remote",
  badges: [
    "Product Designer",
    "London/ Remote",
    "MDes Design Futures @RCA",
    "Undergraduate UX Researcher @Tsinghua Future Lab",
  ],
  yearStart: 2021,
  yearEnd: 2026,
  bio: [
    "I'm a Product Designer with a background in UX research, AI-assisted product design and interdisciplinary collaboration. My work focuses on transforming complex technologies into intuitive digital experiences through user research, systems thinking and rapid prototyping. From AI-powered products to public services, I enjoy designing solutions that are both technically feasible and genuinely valuable to people.",
  ],
  links: [
    { label: "Linkedin", href: "https://www.linkedin.com/in/weilin-sun-429701291/" },
    { label: "Email",    href: "mailto:sunweilin3399@gmail.com" },
    { label: "Resume",   href: "/Weilin_Sun_Product_Designer.pdf" },
  ],
};

// ── About page ────────────────────────────────────────────────────────────────

export const about = {
  photo: "/me.webp",
  bio: "Hi, I am Weilin, a designer with a background in Material Science and Engineering. I design futures that are grounded in reality, approaching problems through both speculative thinking and real-world constraints. I care deeply about the intersection of technology, people, and systems.",
  skills: [
    { category: "Design",      items: ["UX Research", "Wireframing", "Prototyping", "User Testing", "Information Architecture"] },
    { category: "Tools",       items: ["Figma", "Adobe XD", "Illustrator", "Photoshop", "Miro"] },
    { category: "Development", items: ["HTML", "CSS", "React", "TypeScript"] },
    { category: "Methods",     items: ["Design Thinking", "Agile", "Speculative Design", "Systems Thinking"] },
  ],
};

// ── Homepage nav menu ─────────────────────────────────────────────────────────

export const homeNav = [
  { id: "01", label: "UX/UI Projects",    target: "/projects#ux-ui-projects"  },
  { id: "02", label: "Creative Computing", target: "/projects#creative-coding" },
  { id: "03", label: "Other Projects",    target: "/projects#other-projects"  },
  { id: "04", label: "About me",          target: "/about"                    },
];

// ── Project grid sections (order controls display order) ──────────────────────

export const projectSections = [
  { id: "ux-ui-projects",  title: "UX/UI Projects"   },
  { id: "creative-coding", title: "Creative Coding"  },
  { id: "other-projects",  title: "Other Projects"   },
];

// ── Projects ──────────────────────────────────────────────────────────────────

export type PageType = "custom" | "generic" | null;

export interface Project {
  slug: string;
  title: string;
  coverImage: string;
  year: string;
  chips: string[];
  section: string;
  pageType: PageType;
}

export const projects: Project[] = [
  // ── UX / UI ──────────────────────────────────────────────────────────────
  {
    slug: "swiftfood",
    title: "Multi-sided Marketplace Platform for Food Delivery",
    coverImage: "/swiftfood.webp",
    year: "2025",
    chips: ["Marketplace UX", "B2C/B2B", "Multi-sided Platform"],
    section: "ux-ui-projects",
    pageType: "custom",
  },
  {
    slug: "healthtech",
    title: "Building an AI-driven nutrition platform for gestational diabetes management",
    coverImage: "/healthtech.webp",
    year: "2024",
    chips: ["HealthTech", "AI Product", "Startup Concept"],
    section: "ux-ui-projects",
    pageType: "custom",
  },
  {
    slug: "volunteer",
    title: "AR Future Volunteer System Design",
    coverImage: "/volunteer.webp",
    year: "2024",
    chips: ["AR", "Service Design", "Future Scenario"],
    section: "ux-ui-projects",
    pageType: "custom",
  },
  {
    slug: "smarthome",
    title: "Smart Home System Based on Affective Computing",
    coverImage: "/logo.webp",
    year: "2021",
    chips: ["Smart Home", "AI", "Affective Computing"],
    section: "ux-ui-projects",
    pageType: "custom",
  },
  {
    slug: "vrlibrary",
    title: "Future VR Library of Language Preservation",
    coverImage: "/vrlibrary.webp",
    year: "2024",
    chips: ["VR", "Cultural Preservation", "Speculative Design"],
    section: "ux-ui-projects",
    pageType: "custom",
  },
  {
    slug: "cardgame",
    title: "Gamified System for Cross-Cultural Communication",
    coverImage: "/cardgame.webp",
    year: "2023",
    chips: ["Game Design", "Education", "Cross-cultural"],
    section: "ux-ui-projects",
    pageType: null,
  },
  // ── Creative Coding ───────────────────────────────────────────────────────
  {
    slug: "creative-2",
    title: "Generative Image Study",
    coverImage: "/gis-cover.webp",
    year: "2026",
    chips: ["Generative", "Visual System", "Experiment"],
    section: "creative-coding",
    pageType: "custom",
  },
  {
    slug: "vibe-coding-portfolio",
    title: "Building This Portfolio: A Design-First Vibe Coding Workflow",
    coverImage: "/portfolio-build.webp",
    year: "2026",
    chips: ["Vibe Coding", "AI-Assisted Dev", "React", "Claude Code"],
    section: "creative-coding",
    pageType: "custom",
  },
  {
    slug: "foldable-robot",
    title: "Foldable Robot",
    coverImage: "/foldablerobot.webp",
    year: "2024",
    chips: ["Physical Computing", "Robotics", "Prototype"],
    section: "creative-coding",
    pageType: null,
  },
  // ── Other ─────────────────────────────────────────────────────────────────
  {
    slug: "other-2",
    title: "Mortise and tenon structure parent-child furniture",
    coverImage: "/logo.webp",
    year: "2021",
    chips: ["Furniture design", "Critical thinking", "Carpentry"],
    section: "other-projects",
    pageType: null,
  },
];

// ── Homepage carousel ─────────────────────────────────────────────────────────
// Subset of project images shown in the homepage slideshow.

export const carouselImages = [
  { img: "./swiftfood.webp",     title: "Multi-Sided B2B2C Catering Platform",              slug: "swiftfood"     },
  { img: "./healthtech.webp",    title: "AI Nutrition for GDM Care",                        slug: "healthtech"    },
  { img: "./volunteer.webp",     title: "AR Future Volunteer System",                       slug: "volunteer"     },
  { img: "./vrlibrary.webp",     title: "VR Library of Language Preservation",              slug: "vrlibrary"     },
  { img: "./cardgame.webp",      title: "Gamified System for Cross-Cultural Communication", slug: "cardgame"      },
  { img: "./foldablerobot.webp", title: "Foldable Robot",                                   slug: "foldablerobot" },
];
