import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./components/Header";

// ── Nav sections ──────────────────────────────────────────────────────────────

const navSections = [
  { id: "s-userresearch",         label: "01 — User Research" },
  { id: "s-competeana",           label: "02 — Competitive Analysis" },
  { id: "s-market",               label: "03 — Market Analysis" },
  { id: "s-solution",             label: "04 — Solution" },
  { id: "s-informationarchitect", label: "05 — Information Architecture" },
  { id: "s-userflow",             label: "06 — User Flow" },
  { id: "s-productexperience",    label: "07 — Product Experience" },
];

// ── Data ──────────────────────────────────────────────────────────────────────

const heroTags = ["AI Product", "HealthTech", "Product Design", "AI SaaS", "Startup Concept", "UX Strategy"];

const introDetails: { label: string; value: string | React.ReactNode }[] = [
  { label: "Role:",     value: "Product Design · UX Research · Concept Development" },
  { label: "Type:",     value: "Startup Concept / AI Product" },
  { label: "Duration:", value: "1 month" },
  { label: "Tools:",    value: "Figma, Google Stitch, Claude Code" },
  { label: "Focus:",    value: "AI-assisted decision-making · Health data · Personalisation" },
];

// ── Case study images ─────────────────────────────────────────────────────────

const caseStudyImagesBefore = [
  { id: "s-userresearch",         src: "/ht-userresearch.webp",        label: "01 — User Research" },
  { id: "s-competeana",           src: "/ht-competeana.webp",          label: "02 — Competitive Analysis" },
  { id: "s-market",               src: "/ht-market1.webp",             label: "03 — Market Analysis" },
  { id: "s-solution",             src: "/ht-solution.webp",            label: "04 — Solution" },
  { id: "s-informationarchitect", src: "/ht-informationarchitect.webp",label: "05 — Information Architecture" },
  { id: "s-userflow",             src: "/ht-userflow2.webp",           label: "06 — User Flow" },
];

// ── Product Experience data ───────────────────────────────────────────────────

const productExperienceItems = [
  {
    num: "01",
    title: "A calm entry point to daily health",
    images: ["/Tracking & Logs.webp"],
    paragraphs: [
      "Rather than presenting medical data as alerts or warnings, the system reframes glucose tracking into a calm daily rhythm — reducing anxiety while maintaining awareness.",
      "Real-time glucose data is continuously interpreted in the background, allowing the interface to surface only what matters in the moment, without overwhelming the user.",
    ],
  },
  {
    num: "02",
    title: "From data \u2192 decision",
    images: ["/conversation.webp", "/Your Morning Glow.webp", "/Nourishing Suggestions.webp"],
    paragraphs: [
      "Instead of leaving users to interpret numbers, the system translates glucose readings into actionable guidance through a conversational interface.",
      "Based on real-time glucose levels and user context, the system generates personalized suggestions — helping users understand not just what to eat, but why.",
      "This interaction model allows users to move seamlessly from \u201cwhat is happening\u201d to \u201cwhat should I do next,\u201d reducing cognitive load and decision fatigue.",
    ],
  },
  {
    num: "03",
    title: "Making nutrition understandable",
    images: ["/Recipe Details.webp"],
    paragraphs: [
      "Nutritional complexity is simplified into clear, structured information.",
      "The system not only presents nutritional values, but also interprets them — explaining why each meal supports stable glucose levels in a way that is accessible without medical expertise.",
    ],
  },
  {
    num: "04",
    title: "Bridging recommendation with real-world action",
    images: ["/Shopping List.webp"],
    paragraphs: [
      "Recommendations are directly connected to execution.",
      "Suggested meals are automatically translated into structured shopping lists, enabling users to move from personalized guidance to real-world action without friction.",
    ],
  },
  {
    num: "05",
    title: "Structuring long-term care journeys",
    images: ["/Welcome to Lullaby & Bloom.webp", "/Profile & Settings.webp"],
    paragraphs: [
      "The system structures a long-term pregnancy journey into manageable milestones.",
      "Health targets adapt to the user\u2019s stage and condition, ensuring that guidance remains relevant and supportive throughout the experience.",
    ],
  },
  {
    num: "06",
    title: "Extending care beyond the individual",
    images: ["/Family Circle.webp"],
    paragraphs: [
      "Care is extended beyond the individual through a shared support system.",
      "The system surfaces meaningful updates that allow partners and family members to participate actively in the journey.",
    ],
  },
  {
    num: "07",
    title: "Supporting habit formation",
    images: ["/Meal Planner.webp"],
    paragraphs: [
      "Rather than focusing on one-time interactions, the system supports continuous habit formation.",
      "Meal planning evolves based on user patterns and preferences, helping build sustainable routines aligned with both health goals and daily life.",
    ],
  },
];

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

export default function HealthTechPage() {
  const [activeSection, setActive]    = useState(navSections[0].id);
  const [showSidebar, setShowSidebar] = useState(false);
  const [titleH, setTitleH]           = useState(0);
  const caseStudyRef                  = useRef<HTMLDivElement>(null);
  const titleBlockRef                 = useRef<HTMLDivElement>(null);
  const heroRef                       = useRef<HTMLElement>(null);
  const arrowRef                      = useRef<HTMLButtonElement>(null);

  // Scroll to top before first paint — prevents visible jump on refresh
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Drive parallax + arrow visibility directly on the DOM — no re-renders
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (heroRef.current) {
        const offset = window.innerWidth < 768 ? y * 0.1 : y * 0.22;
        heroRef.current.style.backgroundPosition = `center ${offset}px`;
      }
      if (arrowRef.current) {
        arrowRef.current.style.opacity       = y > 0 ? "0" : "1";
        arrowRef.current.style.pointerEvents = y > 0 ? "none" : "auto";
      }
    };
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
        ref={heroRef}
        style={{
          position:           "relative",
          height:             "100svh",
          backgroundImage:    "url(/htbg.webp)",
          backgroundSize:     "cover",
          backgroundPosition: "center 0px",
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
            Building an AI-driven nutrition platform for gestational diabetes management
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
          ref={arrowRef}
          aria-label="Scroll down"
          className="absolute left-1/2 -translate-x-1/2 bottom-[28px] flex items-center justify-center rounded-full bg-my-bg border border-black/25 group hover:border-brand transition-colors duration-200"
          style={{
            width: "44px", height: "44px", cursor: "pointer",
            opacity:    "1",
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
              src="/htintro.webp"
              alt="HealthTech data visualisation"
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
          CASE STUDY — 10 IMAGES
      ══════════════════════════════════════════════ */}
      <div ref={caseStudyRef} className="relative">

        <SidebarNav
          active={activeSection}
          visible={showSidebar}
          onNavigate={scrollToSection}
        />

        <div className="w-full px-[24px] md:px-[192px] pb-[80px]">

          {/* ── Research → User Flow ── */}
          <section>
            <div className="border-t border-black/15 mb-[24px]" />
            <div className="flex flex-col gap-[24px]">
              {caseStudyImagesBefore.map((img) => (
                <div key={img.id} id={img.id} className="w-full">
                  <img
                    src={img.src}
                    alt={img.label}
                    loading="lazy"
                    decoding="async"
                    className="w-full block"
                    style={{ aspectRatio: "16/9", objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* ── 07 — Product Experience ── */}
          <section id="s-productexperience" className="pt-[40px] md:pt-[56px] mt-[24px]">
            <div className="border-t border-black/15 mb-[8px]" />
            <p className="type-section-nav mb-[20px] md:mb-[28px]">07 — Product Experience</p>
            <p className="type-body mb-[40px] md:mb-[56px]">
              The product is designed not as a tracking tool, but as an adaptive decision-support system — continuously learning from user data to reduce cognitive load and support both physical health and emotional wellbeing.
            </p>

            {productExperienceItems.map((item, i) => (
              <div key={item.num}>
                {i > 0 && <div className="border-t border-black/[0.07] mt-[40px] mb-[8px]" />}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[48px] gap-y-[24px] mt-[40px] items-start">

                  {/* Left — title + text */}
                  <div className="flex flex-col gap-[16px]">
                    <div>
                      <p
                        className="font-inria-serif text-black leading-[1.15]"
                        style={{ fontSize: "clamp(1rem, 1.8vw, 1.4rem)" }}
                      >
                        {item.title}
                      </p>
                    </div>
                    <div className="flex flex-col gap-[10px]">
                      {item.paragraphs.map((p, j) => (
                        <p key={j} className="type-body">{p}</p>
                      ))}
                    </div>
                  </div>

                  {/* Right — images only */}
                  <div className="flex gap-[12px] items-start">
                    {item.images.map((src) => (
                      <img
                        key={src}
                        src={src}
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
                        className="block rounded-[8px]"
                        style={{
                          width:  "calc(33.33% - 8px)",
                          height: "auto",
                        }}
                      />
                    ))}
                  </div>

                </div>
              </div>
            ))}

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
