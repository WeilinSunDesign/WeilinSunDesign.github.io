import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./components/Header";
import InterfaceExplorer from "./InterfaceExplorer";

// ── Nav sections ──────────────────────────────────────────────────────────────

const navSections = [
  { id: "s-background",     label: "01 — Background" },
  { id: "s-research",       label: "02 — Research" },
  { id: "s-designoverview", label: "03 — Design Overview" },
  { id: "s-livinglab",      label: "04 — Living Lab" },
  { id: "s-productdesign",  label: "05 — Product Design" },
];

// ── Data ──────────────────────────────────────────────────────────────────────

const heroTags = ["Affective Computing", "Smart Home Research", "UX Research", "Academic Publication", "Living Lab", "Tsinghua Future Lab"];

const introDetails: { label: string; value: string | React.ReactNode }[] = [
  { label: "Role:",        value: "UX & Affective-Computing Research · Industrial & UI Design" },
  { label: "Type:",        value: "Research Intern Project — The Future Lab, Tsinghua University" },
  { label: "Location:",    value: "Beijing, China" },
  { label: "Focus:",       value: "Affective computing in the home · Emotion recognition · Emotional communication" },
  {
    label: "Publication:",
    value: (
      <>
        Co-author,{" "}
        <a href="https://ieeexplore.ieee.org/document/9597450" target="_blank" rel="noopener noreferrer" className="text-brand underline">
          "Gesture-based Fear Recognition Using Non-performance Dataset from VR Horror Games"
        </a>
        , 2021 9th ACII
      </>
    ),
  },
];

const researchImages = [
  { id: "ac-research-01.webp", caption: "Research — 01" },
  { id: "ac-research-02.webp", caption: "Research — 02" },
  { id: "ac-research-03.webp", caption: "Research — 03" },
  { id: "ac-research-04.webp", caption: "Research — 04" },
  { id: "ac-research-05.webp", caption: "Research — 05" },
  { id: "ac-research-06.webp", caption: "Research — 06" },
];

const productDesignImagesTop = [
  { id: "ac-product01.webp", caption: "Product design — 01" },
  { id: "ac-product02.webp", caption: "Product design — 02" },
  { id: "ac-product03.webp", caption: "Product design — 03" },
];

const productStoryboard = [
  { id: "ac-storyboard-01.webp", caption: "Storyboard — 01" },
  { id: "ac-storyboard-02.webp", caption: "Storyboard — 02" },
  { id: "ac-storyboard-03.webp", caption: "Storyboard — 03" },
  { id: "ac-storyboard-04.webp", caption: "Storyboard — 04" },
  { id: "ac-storyboard-05.webp", caption: "Storyboard — 05" },
  { id: "ac-storyboard-06.webp", caption: "Storyboard — 06" },
];

const productDesignImagesBottom = [
  { id: "ac-product-05.webp", caption: "Product design — 05" },
];

// ── Sub-components ─────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="type-section-nav mb-[32px] md:mb-[48px]">
      {children}
    </p>
  );
}

function SubDivider() {
  return <div className="border-t border-black/[0.07] mt-[40px] mb-[8px]" />;
}

function ImagePlaceholder({ filename, caption, ratio = "16/9" }: { filename: string; caption?: string; ratio?: string }) {
  const [error, setError] = useState(false);
  return (
    <div className="flex flex-col gap-[6px]">
      {error ? (
        <div
          className="w-full bg-black/[0.03] border border-dashed border-black/12 flex items-center justify-center"
          style={{ aspectRatio: ratio }}
        >
          <p className="type-eyebrow text-black/25">{filename}</p>
        </div>
      ) : (
        <img
          src={`/${filename}`}
          alt={caption || filename}
          className="w-full h-auto block"
          loading="lazy"
          decoding="async"
          onError={() => setError(true)}
        />
      )}
      {caption && <p className="font-futura-heavy text-[11px] opacity-30 text-black">{caption}</p>}
    </div>
  );
}

// ── Sidebar nav ───────────────────────────────────────────────────────────────

function SidebarNav({
  active,
  visible,
  onNavigate,
}: {
  active: string;
  visible: boolean;
  onNavigate: (id: string) => void;
}) {
  const activeIdx = navSections.findIndex((s) => s.id === active);

  return (
    <nav
      className="hidden xl:flex flex-col items-start"
      style={{
        position:      "fixed",
        left:          "36px",
        top:           "50%",
        transform:     "translateY(-50%)",
        zIndex:        20,
        opacity:       visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition:    "opacity 0.4s ease",
      }}
    >
      {navSections.map((section, i) => {
        const isActive = i === activeIdx;
        return (
          <div key={section.id} className="flex flex-col items-start">
            <button
              onClick={() => onNavigate(section.id)}
              className="flex items-center gap-[10px] py-[2px]"
              style={{ outline: "none", background: "none", border: "none", cursor: "pointer" }}
            >
              <div
                style={{
                  width:           isActive ? "8px" : "5px",
                  height:          isActive ? "8px" : "5px",
                  borderRadius:    "50%",
                  border:          isActive ? "1px solid #63C2BD" : "1px solid rgba(19,19,19,0.28)",
                  backgroundColor: isActive ? "#63C2BD" : "transparent",
                  flexShrink:      0,
                  transition:      "width 0.35s cubic-bezier(.4,0,.2,1), height 0.35s cubic-bezier(.4,0,.2,1), background-color 0.3s ease, border-color 0.3s ease",
                }}
              />
              <span
                style={{
                  fontSize:      "11px",
                  letterSpacing: "0.02em",
                  textTransform: "none",
                  fontFamily:    "var(--font-futura-medium)",
                  color:         isActive ? "#63C2BD" : "#131313",
                  whiteSpace:    "nowrap",
                  opacity:       isActive ? 1 : 0,
                  transform:     isActive ? "translateX(0)" : "translateX(-4px)",
                  transition:    "opacity 0.3s ease, transform 0.3s ease",
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                {section.label}
              </span>
            </button>

            {i < navSections.length - 1 && (
              <div
                style={{
                  width:           "1px",
                  height:          "20px",
                  backgroundColor: "rgba(19,19,19,0.16)",
                  marginLeft:      isActive ? "3.5px" : "2px",
                  marginTop:       "2px",
                  marginBottom:    "2px",
                  transition:      "margin-left 0.35s cubic-bezier(.4,0,.2,1)",
                }}
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function AffectiveComputingPage() {
  const [scrollY, setScrollY]         = useState(0);
  const [activeSection, setActive]    = useState(navSections[0].id);
  const [showSidebar, setShowSidebar] = useState(false);
  const [titleH, setTitleH]           = useState(0);
  const caseStudyRef                  = useRef<HTMLDivElement>(null);
  const titleBlockRef                 = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const introRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = introRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setShowSidebar(!e.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    navSections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(id); },
        { rootMargin: "-20% 0px -60% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen w-full bg-my-bg text-black font-serif">

      {/* Fixed header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header right="projects" />
      </div>

      {/* ══════════════════════════════════════════════
          SCREEN 1 — HERO
      ══════════════════════════════════════════════ */}
      <section
        style={{
          position:           "relative",
          height:             "100svh",
          backgroundImage:    "url(/slbg.png)",
          backgroundSize:     "cover",
          backgroundPosition: typeof window !== "undefined" && window.innerWidth < 768
            ? `center ${scrollY * 0.1}px`
            : `center ${scrollY * 0.22}px`,
          backgroundRepeat:   "no-repeat",
        }}
      >
        {/* Sticky title block */}
        <div ref={titleBlockRef} className="sticky top-[48px] md:top-[64px] px-[24px] md:px-[48px] xl:px-[80px] pt-[20px] md:pt-[28px] pb-[16px] md:pb-[22px]">
          <h1
            className="font-inria-serif leading-[0.95] tracking-tighter text-black bg-my-bg"
            style={{
              fontSize:     "clamp(1.5rem, 3.8vw, 4.2rem)",
              paddingLeft:  "4px",
              paddingRight: "4px",
              display:      "inline",
              marginBottom: "0",
            }}
          >
            Affective computing in human habitats— Emotional Needs at shared House
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

        {/* Down arrow */}
        <button
          onClick={() => {
            const headerH = window.innerWidth >= 768 ? 64 : 48;
            window.scrollTo({ top: window.innerHeight - titleH - headerH, behavior: "smooth" });
          }}
          aria-label="Scroll down"
          className="absolute left-1/2 -translate-x-1/2 bottom-[28px] flex items-center justify-center rounded-full bg-my-bg border border-black/25 group hover:border-brand transition-colors duration-200"
          style={{
            width: "44px", height: "44px", cursor: "pointer",
            opacity:       scrollY > 0 ? 0 : 1,
            pointerEvents: scrollY > 0 ? "none" : "auto",
            transition:    "opacity 0.3s ease",
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

      {/* ══════════════════════════════════════════════
          SCREEN 2 — PROJECT INTRO
      ══════════════════════════════════════════════ */}
      <section
        ref={introRef}
        className="flex flex-col pb-[56px] md:pb-[80px]"
      >
        <div className="flex flex-col md:grid md:grid-cols-2 px-[24px] md:px-[96px]">

          {/* Left — image */}
          <div className="flex flex-col justify-center self-stretch">
            <img
              src="/slintro.png"
              alt="Affective computing research overview"
              className="w-full"
              style={{ display: "block" }}
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

      {/* ══════════════════════════════════════════════
          CASE STUDY SECTIONS
      ══════════════════════════════════════════════ */}
      <div ref={caseStudyRef} className="relative">

        <SidebarNav
          active={activeSection}
          visible={showSidebar}
          onNavigate={scrollToSection}
        />

        <div className="w-full px-[24px] md:px-[192px] pb-[80px]">

          {/* ══════════ 01 — BACKGROUND ══════════ */}
          <section id="s-background" className="pb-[40px] md:pb-[56px] border-b border-black/15">
            <div className="border-t border-black/15 mb-[8px]" />
            <SectionLabel>01 — Background</SectionLabel>
            <ImagePlaceholder filename="ac-background.webp" caption="Background" ratio="16/9" />
          </section>

          {/* ══════════ 02 — RESEARCH ══════════ */}
          <section id="s-research" className="pt-[40px] md:pt-[56px] pb-[40px] md:pb-[56px] border-b border-black/15">
            <SectionLabel>02 — Research</SectionLabel>
            <div className="flex flex-col gap-[24px] md:gap-[32px]">
              {researchImages.map((img) => (
                <ImagePlaceholder key={img.id} filename={img.id} caption={img.caption} ratio="16/9" />
              ))}
            </div>
          </section>

          {/* ══════════ 03 — DESIGN OVERVIEW ══════════ */}
          <section id="s-designoverview" className="pt-[40px] md:pt-[56px] pb-[40px] md:pb-[56px] border-b border-black/15">
            <SectionLabel>03 — Design Overview</SectionLabel>
            <ImagePlaceholder filename="ac-design-overview.webp" caption="Design overview" ratio="16/9" />
          </section>

          {/* ══════════ 04 — LIVING LAB ══════════ */}
          <section id="s-livinglab" className="pt-[40px] md:pt-[56px] pb-[40px] md:pb-[56px] border-b border-black/15">
            <SectionLabel>04 — Living Lab</SectionLabel>
            <ImagePlaceholder filename="ac-research-livinglab.webp" caption="Living lab" ratio="16/9" />
          </section>

          {/* ══════════ 05 — PRODUCT DESIGN ══════════ */}
          <section id="s-productdesign" className="pt-[40px] md:pt-[56px] pb-[80px] md:pb-[120px]">
            <SectionLabel>05 — Product Design</SectionLabel>

            <div className="flex flex-col gap-[24px] md:gap-[32px]">
              {productDesignImagesTop.map((img) => (
                <ImagePlaceholder key={img.id} filename={img.id} caption={img.caption} ratio="16/9" />
              ))}
            </div>

            <SubDivider />

            {/* Interactive screen explorer — hi-fi, by architecture node */}
            <div className="mt-[24px] mb-[24px]">
              <p className="type-eyebrow mb-[16px]">User Interface Design</p>
              <InterfaceExplorer />
            </div>

            <SubDivider />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-[12px] mt-[24px]">
              {productStoryboard.map((img) => (
                <ImagePlaceholder key={img.id} filename={img.id} caption={img.caption} ratio="16/9" />
              ))}
            </div>

            <div className="flex flex-col gap-[24px] md:gap-[32px] mt-[24px]">
              {productDesignImagesBottom.map((img) => (
                <ImagePlaceholder key={img.id} filename={img.id} caption={img.caption} ratio="16/9" />
              ))}
            </div>
          </section>

          {/* Back link */}
          <div className="pt-[48px]">
            <Link
              to="/projects"
              className="font-futura-heavy text-[12px] opacity-30 hover:opacity-100 transition-opacity inline-flex items-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" />
              </svg>
              Back to projects
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
