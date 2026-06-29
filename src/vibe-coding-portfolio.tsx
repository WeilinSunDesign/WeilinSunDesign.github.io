import { useEffect, useRef, useState } from "react";
import "./vibe-coding-workflow.css";
import Header from "./components/Header";

// ── Data ──────────────────────────────────────────────────────────────────────

const heroTags = [
  "Vibe Coding",
  "AI-Assisted Development",
  "React",
  "Claude Code",
  "Design System",
];

const introDetails: { label: string; value: string }[] = [
  {
    label: "Overview:",
    value:
      "A documentation of building this portfolio from Figma spec to deployed React site — using AI as the engineering layer while keeping every design decision entirely human.",
  },
  {
    label: "Approach:",
    value:
      "Design-first. The full visual language was specified in Figma before any code was generated, then translated through Google AI Studio for initial scaffolding and Claude Code for precise iterative refinement.",
  },
  { label: "Year:", value: "2026" },
  {
    label: "Tools:",
    value: "Figma, Google AI Studio, Claude Code, React + Vite, GitHub Pages",
  },
  { label: "Type:", value: "Personal Project / Process Documentation" },
];

const designPrompt = `DESIGN SYSTEM

Background color: #F5F3EE (warm cream, slightly off-white)
Primary text color: #1A1A1A (near black)
Secondary/muted text: #888888
Accent color: #63C2BD (teal/blue-green) — use sparingly
Dark panel background: #111111 (used on homepage right half)

Heading font: Inria Serif, Bold — for all large display text
Body font: Futura PT or Futura, Regular — for navigation, labels,
           body copy, tags
Both fonts should be loaded from Google Fonts.

Overall aesthetic: editorial, clean, generous whitespace, minimal.
No shadows, no gradients, no decorative elements. Everything should
feel intentional and restrained.

---

PAGE 1: HOMEPAGE

Layout: Full viewport height. Split exactly 50/50 horizontally.
Left half has the cream background. Right half has the dark
(#111111) background.

TOP NAVIGATION BAR (spans full width, above the split):
- Left: "HOME" in uppercase, small, Futura, tracking wide
- Right: project title text + ↗ arrow icon (this updates to
  show the currently featured project name)
- A thin 1px line (#1A1A1A) runs the full width beneath the nav

LEFT HALF CONTENT (cream background, padding ~60px):
- Small text at top: "Portfolio 2021–2026" in Futura, light weight
- Name in huge bold Inria Serif: "Weilin Sun"
  (font size should be very large, roughly 80–90px, dominant)
- Two pill-shaped outlined buttons side by side:
  "Product Designer" and "London/ Remote"
- Bio paragraph in Futura Regular, small size (~15px)
- Numbered navigation list, with large Inria Serif text:
    01  UX/UI Projects
    02  Creative Computing
    03  Other Projects
    04  About me
- Bottom: "Linkedin ↗   Email ↗   Resume ↗"

RIGHT HALF CONTENT (dark #111111 background):
- A project image carousel with left/right navigation

---

PAGE 2: UX/UI PROJECTS

Below: a 3-column grid of project cards.
Each card: category tag pill, year badge, image area, title,
tag pills, VIEW button. No card border or shadow.

---

PAGE 3: PROJECT DETAIL PAGE

Large Inria Serif heading (~60px), full project title.
Row of outlined pill tags. Large full-width project image.
Project description. Scrollable.

---

PAGE 4: ABOUT ME

Full viewport height split 50/50.
Left: full-bleed portrait photo.
Right: cream background — "About Me" heading + bio.

---

GLOBAL RULES

- All navigation text is uppercase Futura, small, wide tracking
- No rounded corners anywhere except the pill tags
- No box shadows
- Hover: subtle underline or opacity change only
- Responsive: 50/50 split layouts stack vertically on mobile
- React with separate component files for Header, ProjectCard,
  PillTag, and each page
- Use React Router for all internal navigation`;

// ── Page ───────────────────────────────────────────────────────────────────────

export default function VibeCodingPortfolio() {
  const [scrollY, setScrollY] = useState(0);
  const [titleH, setTitleH] = useState(0);
  const [copied, setCopied] = useState(false);
  const titleBlockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const measure = () => {
      if (titleBlockRef.current) setTitleH(titleBlockRef.current.offsetHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(designPrompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen w-full bg-my-bg text-black font-serif">

      {/* Fixed header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header right="projects" />
      </div>

      {/* ── SCREEN 1: HERO ───────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          height: "100svh",
          backgroundImage: "url(/portfolio-build-bg.webp)",
          backgroundSize: "cover",
          backgroundPosition:
            typeof window !== "undefined" && window.innerWidth < 768
              ? `center ${scrollY * 0.1}px`
              : `center ${scrollY * 0.22}px`,
          backgroundRepeat: "no-repeat",
          backgroundColor: "#E8E4DC",
        }}
      >
        <div
          ref={titleBlockRef}
          className="sticky top-[48px] md:top-[64px] px-[24px] md:px-[48px] xl:px-[80px] pt-[20px] md:pt-[28px] pb-[16px] md:pb-[22px]"
        >
          <h1
            className="font-inria-serif leading-[0.95] tracking-tighter text-black bg-my-bg"
            style={{
              fontSize: "clamp(1.5rem, 3.8vw, 4.2rem)",
              paddingLeft: "4px",
              paddingRight: "4px",
              display: "inline",
            }}
          >
            Building This Portfolio
          </h1>

          <div className="flex flex-wrap gap-2 mt-[20px] md:mt-[32px]">
            {heroTags.map((t) => (
              <span
                key={t}
                className="inline-flex rounded-full border border-black px-3 py-1 type-chip text-black bg-my-bg"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={() => {
            const headerH = window.innerWidth >= 768 ? 64 : 48;
            window.scrollTo({
              top: window.innerHeight - titleH - headerH,
              behavior: "smooth",
            });
          }}
          aria-label="Scroll down"
          className="absolute left-1/2 -translate-x-1/2 bottom-[28px] flex items-center justify-center rounded-full bg-my-bg border border-black/25 group hover:border-brand transition-colors duration-200"
          style={{
            width: "44px",
            height: "44px",
            cursor: "pointer",
            opacity: scrollY > 0 ? 0 : 1,
            pointerEvents: scrollY > 0 ? "none" : "auto",
            transition: "opacity 0.3s ease",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-black/60 group-hover:text-brand transition-colors duration-200"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </button>
      </section>

      {/* ── SCREEN 2: INTRO ──────────────────────────────────────────────────── */}
      <section className="flex flex-col pb-[56px] md:pb-[80px]">
        <div className="flex flex-col md:grid md:grid-cols-2 px-[24px] md:px-[96px]">

          {/* Left — intro image */}
          <div className="flex flex-col justify-center self-stretch">
            <img
              src="/portfolio-build-intro.webp"
              alt="Portfolio build process"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right — project details */}
          <div className="flex flex-col justify-center py-[28px] md:pt-[112px] md:pb-[72px] md:pl-[48px]">
            {introDetails.map((item) => (
              <div
                key={item.label}
                className="grid grid-cols-[100px_1fr] md:grid-cols-[130px_1fr] gap-x-[10px] md:gap-x-[14px] py-[12px] md:py-[20px] border-b border-black/12 last:border-b-0 items-start"
              >
                <p className="type-eyebrow md:text-[14px] leading-relaxed pt-[2px]">
                  {item.label}
                </p>
                <p className="font-futura-medium text-[13px] md:text-[15px] leading-relaxed text-black">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION: PREMISE ─────────────────────────────────────────────────── */}
      <section className="px-[24px] md:px-[96px] pb-[80px] md:pb-[120px]">
        <div className="border-t border-black/15 mb-[48px] md:mb-[72px]" />
        <p className="type-eyebrow mb-[32px] md:mb-[48px]" style={{ letterSpacing: "0.1em" }}>
          The Premise
        </p>

        <div className="max-w-[680px]">
          <p
            className="font-inria-serif leading-[1.3] tracking-tight text-black mb-[24px] md:mb-[32px]"
            style={{ fontSize: "clamp(1.4rem, 2.4vw, 2.2rem)" }}
          >
            AI is an executor. Design still has to come from you.
          </p>
          <p className="font-futura-medium text-[14px] md:text-[15px] leading-relaxed text-black/70 mb-[20px]">
            The promise of vibe coding is that you can build real software without writing code. That promise is true — but it comes with a condition: you need to know what you want with unusual precision. For a designer, that is actually a familiar constraint. We already work in the language of systems, decisions, and specifications. The gap from Figma to a prompt-ready brief is smaller than it looks.
          </p>
          <p className="font-futura-medium text-[14px] md:text-[15px] leading-relaxed text-black/70">
            The sites that come out looking generic from AI generation are the ones where the design work was offloaded along with the engineering. If you arrive with a fully resolved visual language — a considered typeface pairing, a restrained colour system, clear layout rules — the AI can build exactly that. Your taste and design clarity are the parts that cannot be automated.
          </p>
        </div>
      </section>

      {/* ── SECTION: WORKFLOW ────────────────────────────────────────────────── */}
      <section className="px-[24px] md:px-[96px] pb-[80px] md:pb-[120px]">
        <div className="border-t border-black/15 mb-[48px] md:mb-[72px]" />
        <p className="type-eyebrow mb-[32px] md:mb-[48px]" style={{ letterSpacing: "0.1em" }}>
          Workflow
        </p>

        <div className="vf" role="region" aria-label="Vibe coding workflow — five steps from Figma design to published website">

          {/* Step 1: Figma */}
          <div className="vf-step">
            <div className="vf-left">
              <div className="vf-spine">
                <div className="vf-badge">
                  <img src="/figma-logo.png" alt="Figma" width={56} height={56} style={{ objectFit: "contain" }} />
                </div>
                <div className="vf-line" />
              </div>
              <div className="vf-body">
                <h3 className="vf-head">Design every page before you build</h3>
                <p className="vf-desc">Create a frame for each page — homepage, project list, each case study, about. Decide exact colours, typefaces, layout grids, and spacing. Every visual decision gets made here, before touching any other tool.</p>
                <span className="vf-why">AI needs a precise visual reference — this is it</span>
              </div>
            </div>
            <div className="vf-img">
              <img src="/workflow-1-figma.webp" alt="Figma design workspace" />
              <p className="vf-caption">All four pages fully designed in Figma before writing a single line of code</p>
            </div>
          </div>

          {/* Step 2: Google AI Studio */}
          <div className="vf-step">
            <div className="vf-left">
              <div className="vf-spine">
                <div className="vf-badge">
                  <img src="/google-ai-studio-logo.png" alt="Google AI Studio" width={56} height={56} style={{ objectFit: "contain" }} />
                </div>
                <div className="vf-line" />
              </div>
              <div className="vf-body">
                <h3 className="vf-head">Turn your design into working code</h3>
                <p className="vf-desc">Upload screenshots of your Figma frames. Paste a detailed prompt describing your design system — exact colour codes, font names, each page's structure, mobile layout. AI Studio reads your design and generates a complete React codebase.</p>
                <span className="vf-why">Translates visual design into real code, no programming required</span>
              </div>
            </div>
            <div className="vf-img">
              <img src="/workflow-2-ai-studio.webp" alt="Google AI Studio code generation" />
              <p className="vf-caption">AI Studio generating a complete React codebase from the design spec</p>
            </div>
          </div>

          {/* Step 3: GitHub + local setup */}
          <div className="vf-step">
            <div className="vf-left">
              <div className="vf-spine">
                <div className="vf-badge">
                  <img src="/github-logo.png" alt="GitHub" width={56} height={56} style={{ objectFit: "contain" }} />
                </div>
                <div className="vf-line" />
              </div>
              <div className="vf-body">
                <h3 className="vf-head">Export your code to GitHub in one click</h3>
                <p className="vf-desc">Use AI Studio's built-in GitHub export button. It creates a new repository and uploads all the generated code automatically. No manual copying, no setup — done in seconds. You'll land on a GitHub page with all your files ready.</p>
                <span className="vf-why">Code is stored safely in the cloud and ready to download to your machine</span>

                <div style={{ marginTop: "28px", paddingTop: "20px", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
                  <h3 className="vf-head">Clone the code and run it on your computer</h3>
                  <p className="vf-desc">Open Terminal. Copy the repository URL from GitHub, then run these four commands in order:</p>
                  <p className="vf-desc" style={{ marginBottom: "6px" }}><span className="vf-cmd">git clone [your repo url]</span> — downloads the code to your Desktop</p>
                  <p className="vf-desc" style={{ marginBottom: "6px" }}><span className="vf-cmd">cd [folder name]</span> — moves into the project folder</p>
                  <p className="vf-desc" style={{ marginBottom: "6px" }}><span className="vf-cmd">npm install</span> — installs everything the site needs to run</p>
                  <p className="vf-desc" style={{ marginBottom: "10px" }}><span className="vf-cmd">npm run dev</span> — starts the site locally. Open the localhost link in your browser.</p>
                  <span className="vf-why">You need the files on your machine to edit them and see changes instantly</span>
                </div>
              </div>
            </div>
            <div className="vf-img">
              <img src="/workflow-3-github.webp" alt="GitHub repository and local dev server" />
              <p className="vf-caption">Code exported to GitHub, then cloned and running locally via npm run dev</p>
            </div>
          </div>

          {/* Step 4: VS Code + Claude Code */}
          <div className="vf-step">
            <div className="vf-left">
              <div className="vf-spine">
                <div className="vf-badge" style={{ flexDirection: "column", gap: "4px", height: "auto" }}>
                  <img src="/vscode-logo.png" alt="VS Code" width={40} height={40} style={{ objectFit: "contain" }} />
                  <img src="/claude-logo.png" alt="Claude Code" width={40} height={40} style={{ objectFit: "contain" }} />
                </div>
                <div className="vf-line" />
              </div>
              <div className="vf-body">
                <h3 className="vf-head">Refine the details against your Figma spec</h3>
                <p className="vf-desc">Open the project folder in VS Code and install the Claude Code extension. Describe changes in plain language — "this heading is too small", "the mobile layout is broken", "this colour needs to be darker". Claude reads the files directly and edits them. Compare to your Figma frames. Keep iterating until it matches.</p>
                <span className="vf-why">The first AI draft is about 70% right — this step closes the gap to your actual design</span>
              </div>
            </div>
            <div className="vf-img">
              <img src="/workflow-4-claude-code.webp" alt="VS Code and Claude Code refinement" />
              <p className="vf-caption">Claude Code reading the project files and making precise edits against the Figma spec</p>
            </div>
          </div>

          {/* Step 5: GitHub Pages */}
          <div className="vf-step">
            <div className="vf-left">
              <div className="vf-spine">
                <div className="vf-badge">
                  <img src="/github-logo.png" alt="GitHub Pages" width={56} height={56} style={{ objectFit: "contain" }} />
                </div>
              </div>
              <div className="vf-body">
                <h3 className="vf-head">Publish your site — free, forever</h3>
                <p className="vf-desc">Push your refined code back to GitHub using VS Code's Source Control panel. In the repository Settings, enable GitHub Pages and select your branch. GitHub generates a public URL — your site is live. Anyone with the link can open it. No server costs, no hosting fees.</p>
                <span className="vf-why">Your portfolio is on the real internet with a link you can share anywhere</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION: THE PROMPT ──────────────────────────────────────────────── */}
      <section className="px-[24px] md:px-[96px] pb-[120px] md:pb-[160px]">
        <div className="border-t border-black/15 mb-[48px] md:mb-[72px]" />
        <p className="type-eyebrow mb-[24px] md:mb-[40px]" style={{ letterSpacing: "0.1em" }}>
          The Prompt
        </p>

        <p className="font-futura-medium text-[13px] md:text-[14px] leading-relaxed text-black/55 mb-[32px] md:mb-[48px] max-w-[560px]">
          The specification sent to Google AI Studio. Every value explicit. No ambiguity delegated to the model.
        </p>

        <div className="mx-auto w-full md:w-1/3 border border-black/15 bg-black/[0.025]">
          {/* Header — copy button, always visible */}
          <div className="flex justify-end px-[12px] py-[8px] border-b border-black/10">
            <button
              onClick={handleCopy}
              className="flex items-center gap-[6px] px-[10px] py-[5px] bg-my-bg border border-black/20 hover:border-brand transition-colors duration-200"
              style={{ borderRadius: "4px" }}
            >
              {copied ? (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="font-futura-medium text-[10px] text-brand" style={{ letterSpacing: "0.08em" }}>COPIED</span>
                </>
              ) : (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black/40">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  <span className="font-futura-medium text-[10px] text-black/40" style={{ letterSpacing: "0.08em" }}>COPY</span>
                </>
              )}
            </button>
          </div>
          {/* Scrollable body */}
          <div className="overflow-y-auto" style={{ maxHeight: "280px" }}>
            <pre
              className="p-[16px] font-futura-medium text-[11px] md:text-[12px] leading-[1.9] text-black/60 whitespace-pre-wrap"
              style={{ letterSpacing: "0.02em" }}
            >
              {designPrompt}
            </pre>
          </div>
        </div>
      </section>

    </div>
  );
}
