import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./components/Header";

// ── Nav sections ──────────────────────────────────────────────────────────────

const navSections = [
  { id: "s-context",       label: "01 — Overview" },
  { id: "s-evolution",     label: "02 — Evolution" },
  { id: "s-roles",         label: "03 — Four Roles" },
  { id: "s-challenge",     label: "04 — Individual Ordering" },
  { id: "s-design-system", label: "05 — Merchants" },
  { id: "s-operations",    label: "06 — Catering & Corporate" },
  { id: "s-riders",        label: "07 — Rider's App" },
  { id: "s-outcomes",      label: "08 — Outcomes" },
];

// ── Data ──────────────────────────────────────────────────────────────────────

const heroTags = ["Multi-role system design", "B2B2C", "Food delivery", "Mobile + Desktop", "Shipped"];

const introDetails: { label: string; value: string | React.ReactNode }[] = [
  {
    label: "Overview:",
    value: (
      <>
        A food delivery platform targeting the London market, starting from individual
        consumers and evolving into{" "}
        <a href="https://swiftfood.uk/" target="_blank" rel="noopener noreferrer" className="text-brand underline">
          catering
        </a>{" "}
        and{" "}
        <a href="https://swiftfood.co.uk/RestaurantCatalogue" target="_blank" rel="noopener noreferrer" className="text-brand underline">
          corporate
        </a>{" "}
        use cases.
      </>
    ),
  },
  {
    label: "The core concept:",
    value: "Users can order from multiple street food vendors within a single delivery — a mixed-basket model that differs from traditional single-restaurant orders.",
  },
  { label: "Duration:", value: "1 Year" },
  { label: "Tools:",    value: "Figma, Google Ai Studio, Claude Code" },
  { label: "My Role:",  value: "Founding Product Designer" },
];

const orderFlowRoles = [
  {
    role: "Employee",
    platform: "Mobile App",
    reality: "A meal",
    point: "Budget visible before browsing — not at checkout.",
  },
  {
    role: "Manager",
    platform: "Dashboard",
    reality: "A budget entry",
    point: "Headcount driven by clock-in sync — no daily approval.",
  },
  {
    role: "Merchant",
    platform: "Merchant App",
    reality: "A production ticket",
    point: "Mobile-only. Every competitor chose desktop.",
  },
  {
    role: "Driver",
    platform: "Driver App",
    reality: "A pickup route",
    point: "One stop per order — not one stop per vendor.",
  },
];

const phases = [
  {
    number: "Phase 01",
    title: "Individual ordering",
    label: "B2C foundation",
    body: "I designed a mobile app for individual users and a web interface for catering. The product was consumer-focused, with catering as a secondary feature.",
  },
  {
    number: "Phase 02",
    title: "Catering as the core",
    label: "Event",
    body: "Operational data showed individual orders had low frequency and high cost. Catering showed higher value. I shifted focus toward student societies and large group events — from on-demand to planned consumption.",
  },
  {
    number: "Phase 03",
    title: "Corporate system",
    label: "B2B2C",
    body: "The product expanded into corporate services. Companies subscribe, managers control budgets, employees order within shared constraints. One order — multiple realities: a meal, a production ticket, a pickup route, a budget entry.",
  },
];

// ── Sub-components ─────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="type-section-nav mb-[32px] md:mb-[48px]">
      {children}
    </p>
  );
}


function TreeNode({ label, sub }: { label: string; sub?: string }) {
  return (
    <div className="border border-black/70 px-[8px] py-[6px] text-center min-w-0">
      <p className="type-body-sm leading-snug break-words">{label}</p>
      {sub && <p className="type-eyebrow mt-[2px]">{sub}</p>}
    </div>
  );
}

function TreePipe() {
  return <div className="w-px h-[16px] bg-black/20 mx-auto" />;
}


function TreeConnector({ count }: { count: number }) {
  const centers = Array.from({ length: count }, (_, i) =>
    ((2 * i + 1) / (2 * count)) * 100
  );
  return (
    <div className="relative w-full" style={{ height: "24px" }}>
      {/* Vertical from parent down to bar */}
      <div className="absolute bg-black/20" style={{ left: "50%", transform: "translateX(-50%)", width: "1px", top: 0, height: "50%" }} />
      {/* Horizontal bar: first child center → last child center */}
      <div className="absolute bg-black/20" style={{ left: `${centers[0]}%`, right: `${100 - centers[count - 1]}%`, height: "1px", top: "50%" }} />
      {/* Vertical drop to each child */}
      {centers.map((pct, i) => (
        <div key={i} className="absolute bg-black/20" style={{ left: `${pct}%`, transform: "translateX(-50%)", width: "1px", top: "50%", bottom: 0 }} />
      ))}
    </div>
  );
}

function SubDivider() {
  return <div className="border-t border-black/[0.07] mt-[40px] mb-[8px]" />;
}

function ImagePlaceholder({ filename, caption, ratio = "auto" }: { filename: string; caption?: string; ratio?: string }) {
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
          className="w-full object-cover"
          style={ratio === "auto" ? undefined : { aspectRatio: ratio }}
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
              {/* Circle — animates size, fill, border */}
              <div
                style={{
                  width:           isActive ? "8px" : "5px",
                  height:          isActive ? "8px" : "5px",
                  borderRadius:    "50%",
                  border:          isActive ? "1px solid #63C2BD" : "1px solid rgba(19,19,19,0.28)",
                  backgroundColor: isActive ? "#63C2BD" : "transparent",
                  flexShrink:      0,
                  // smooth all geometric + colour changes
                  transition:      "width 0.35s cubic-bezier(.4,0,.2,1), height 0.35s cubic-bezier(.4,0,.2,1), background-color 0.3s ease, border-color 0.3s ease",
                }}
              />
              {/* Label: only for active, fade in/out */}
              <span
                style={{
                  fontSize:      "11px",
                  letterSpacing: "0.02em",
                  textTransform: "none",
                  fontFamily:    "var(--font-futura-medium)",
                  color:         isActive ? "#63C2BD" : "#131313",
                  whiteSpace:    "nowrap",
                  opacity:       isActive ? 1 : 0,
                  // slide-in from left while fading
                  transform:     isActive ? "translateX(0)" : "translateX(-4px)",
                  transition:    "opacity 0.3s ease, transform 0.3s ease",
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                {section.label}
              </span>
            </button>

            {/* Connecting line between dots */}
            {i < navSections.length - 1 && (
              <div
                style={{
                  width:         "1px",
                  height:        "20px",
                  backgroundColor: "rgba(19,19,19,0.16)",
                  // nudge line to stay centred under the circle regardless of size
                  marginLeft:    isActive ? "3.5px" : "2px",
                  marginTop:     "2px",
                  marginBottom:  "2px",
                  transition:    "margin-left 0.35s cubic-bezier(.4,0,.2,1)",
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

export default function SwiftFood() {
  const [scrollY, setScrollY]         = useState(0);
  const [activeSection, setActive]    = useState(navSections[0].id);
  const [showSidebar, setShowSidebar] = useState(false);
  const [titleH, setTitleH]           = useState(0);
  const caseStudyRef                  = useRef<HTMLDivElement>(null);
  const titleBlockRef                 = useRef<HTMLDivElement>(null);

  // Scroll → parallax value + arrow visibility
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Measure sticky title block height so intro can fill exactly 100svh - titleH
  useEffect(() => {
    const measure = () => {
      if (titleBlockRef.current) setTitleH(titleBlockRef.current.offsetHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Sidebar: show only when intro section is completely off screen (scrolled past),
  // hide again if user scrolls back up and intro re-enters the viewport.
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

  // Active section tracking
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

      {/* Fixed header — always visible */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header right="projects" />
      </div>

      {/* ══════════════════════════════════════════════
          SCREEN 1 — HERO
          Full-viewport. swiftfood.png is the background.
          Title row: bg-my-bg background on the text so it
          reads clearly over the image. No border below.
          Chips: filled with bg-my-bg.
      ══════════════════════════════════════════════ */}
      <section
        style={{
          position:           "relative",
          height:             "100svh",
          backgroundImage:    "url(/sfbg.webp)",
          backgroundSize:     "cover",
          backgroundPosition: typeof window !== "undefined" && window.innerWidth < 768
            ? `center ${scrollY * 0.1}px`
            : `center ${scrollY * 0.22}px`,
          backgroundRepeat:   "no-repeat",
        }}
      >

        {/* Sticky title block — stays put while image parallaxes under it */}
        <div ref={titleBlockRef} className="sticky top-[48px] md:top-[64px] px-[24px] md:px-[48px] xl:px-[80px] pt-[20px] md:pt-[28px] pb-[16px] md:pb-[22px]">
          {/* H1 — bg-my-bg fills behind the text for readability */}
          <h1
            className="font-inria-serif leading-[0.95] tracking-tighter text-black bg-my-bg"
            style={{
              fontSize: "clamp(1.5rem, 3.8vw, 4.2rem)",
              paddingLeft:  "4px",
              paddingRight: "4px",
              display: "inline",
              marginBottom: "0",
            }}
          >
            Multi-sided Marketplace Platform for Food Delivery
          </h1>

          {/* Chips — filled with bg-my-bg */}
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

        {/* Down arrow — visible only at scroll=0, hides the moment user scrolls */}
        <button
          onClick={() => {
            const headerH = window.innerWidth >= 768 ? 64 : 48;
            window.scrollTo({ top: window.innerHeight - titleH - headerH, behavior: "smooth" });
          }}
          aria-label="Scroll down"
          className="absolute left-1/2 -translate-x-1/2 bottom-[28px] flex items-center justify-center rounded-full bg-my-bg border border-black/25 group hover:border-brand transition-colors duration-200"
          style={{
            width: "44px", height: "44px", cursor: "pointer",
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

      {/* ══════════════════════════════════════════════
          SCREEN 2 — PROJECT INTRO
          Exactly one viewport tall. No outer borders,
          no centre divider.
          Left: image at its natural ratio (contain).
          Right: detail table with dividers between rows.
      ══════════════════════════════════════════════ */}
      {/* Mobile: auto height, single column. md+: calc(100svh - titleH), two-column. */}
      <section
        ref={introRef}
        className="flex flex-col pb-[56px] md:pb-[80px]"
      >
        <div className="flex flex-col md:grid md:grid-cols-2 px-[24px] md:px-[96px]">

          {/* Left — image */}
          <div className="flex flex-col justify-center self-stretch">
            <img
              src="/sfintro.webp"
              alt="SwiftFood app on device mockups"
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
          Sidebar appears once this div enters the viewport.
      ══════════════════════════════════════════════ */}
      <div ref={caseStudyRef} className="relative">

        <SidebarNav
          active={activeSection}
          visible={showSidebar}
          onNavigate={scrollToSection}
        />

        <div className="w-full px-[24px] md:px-[192px] pb-[80px]">

          {/* 01 — Overview */}
          <section id="s-context" className="pb-[40px] md:pb-[56px] border-b border-black/15">
            <div className="border-t border-black/15 mb-[8px]" />
            <SectionLabel>01 — Overview</SectionLabel>

            {/* Product Ecosystem — text col 1 | diagram cols 2-4 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[56px] md:mb-[72px]">
              <div>
                <p className="type-eyebrow md:text-[14px] mb-[20px]">Product Ecosystem</p>
                <p className="type-body">
                  Swiftfood operates across three parallel services — individual ordering, catering, and corporate — each addressing different use cases and user needs.
                </p>
              </div>
              <div className="md:col-span-3 flex flex-col items-center gap-0 w-full">
                <TreeNode label="Swiftfood Platform" />
                <TreeConnector count={3} />
                <div className="flex items-start gap-[12px] w-full">
                  <div className="flex flex-col items-center flex-1 min-w-0">
                    <TreeNode label="Individual Ordering (B2C)" />
                    <TreePipe />
                    <TreeNode label="Consumer App" sub="Mobile" />
                  </div>
                  <div className="flex flex-col items-center flex-1 min-w-0">
                    <TreeNode label="Catering & Events" />
                    <TreePipe />
                    <TreeNode label="Catering Web" sub="Desktop" />
                  </div>
                  <div className="flex flex-col items-center flex-1 min-w-0">
                    <TreeNode label="Corporate (B2B2C)" />
                    <TreeConnector count={2} />
                    <div className="flex items-start gap-[8px] w-full">
                      <div className="flex flex-col items-center flex-1 min-w-0">
                        <TreeNode label="Manager Interface" />
                      </div>
                      <div className="flex flex-col items-center flex-1 min-w-0">
                        <TreeNode label="Employee App" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <SubDivider />

            {/* My Role — Five roles desktop */}
            <div className="hidden md:flex items-stretch mt-[32px]">
              <div className="flex items-center flex-shrink-0 mr-[16px]">
                <p className="font-futura-medium text-brand leading-snug whitespace-nowrap" style={{ fontSize: "17px" }}>
                  Founding Product Designer
                </p>
              </div>
              <div className="flex flex-col gap-[8px] self-stretch flex-shrink-0" style={{ width: "48px" }}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="relative flex-1">
                    <div className="absolute bg-black/20" style={{ left: "50%", transform: "translateX(-50%)", width: "1px", top: i === 0 ? "50%" : "-4px", bottom: i === 4 ? "50%" : "-4px" }} />
                    {i === 2 && (
                      <div className="absolute bg-black/20" style={{ left: 0, right: "50%", height: "1px", top: "50%", transform: "translateY(-50%)" }} />
                    )}
                    <div className="absolute bg-black/20" style={{ left: "50%", right: 0, height: "1px", top: "50%", transform: "translateY(-50%)" }} />
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-[8px] flex-1">
                {[
                  { title: "System Architect",            body: "Defined a multi-role system aligning four user mental models.",      icon: "/icons/icon-architecture.svg" },
                  { title: "Product Strategist",          body: "Scaled the product from B2C to catering and corporate.",             icon: "/icons/icon-structure.svg" },
                  { title: "UX Lead",                     body: "Led end-to-end UX across all platforms.",                           icon: "/icons/icon-interaction.svg" },
                  { title: "Front-end Collaborator",      body: "Worked with engineers to ship and refine front-end.",                icon: "/icons/icon-platforms.svg" },
                  { title: "Cross-functional Integrator", body: "Turned business and operational constraints into product decisions.", icon: "/icons/icon-bridge.svg" },
                ].map(({ title, body, icon }) => (
                  <div key={title} className="border border-black/15 px-[12px] py-[10px] flex items-center gap-[10px]">
                    <img src={icon} alt="" className="w-[36px] h-[36px] flex-shrink-0" style={{ filter: "brightness(0)", opacity: 0.6 }} />
                    <div>
                      <p className="type-body-sm mb-[2px]">{title}</p>
                      <p className="font-futura-medium text-[11px] leading-relaxed text-black/50">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* My Role — Five roles mobile */}
            <div className="md:hidden flex flex-col gap-[8px] mt-[32px]">
              {[
                { title: "System Architect",            body: "Defined a multi-role system aligning four user mental models.",      icon: "/icons/icon-architecture.svg" },
                { title: "Product Strategist",          body: "Scaled the product from B2C to catering and corporate.",             icon: "/icons/icon-structure.svg" },
                { title: "UX Lead",                     body: "Led end-to-end UX across all platforms.",                           icon: "/icons/icon-interaction.svg" },
                { title: "Front-end Collaborator",      body: "Worked with engineers to ship and refine front-end.",                icon: "/icons/icon-platforms.svg" },
                { title: "Cross-functional Integrator", body: "Turned business and operational constraints into product decisions.", icon: "/icons/icon-bridge.svg" },
              ].map(({ title, body, icon }) => (
                <div key={title} className="border border-black/15 px-[12px] py-[10px] flex items-start gap-[10px]">
                  <img src={icon} alt="" className="w-[28px] h-[28px] flex-shrink-0 mt-[1px]" style={{ filter: "brightness(0)", opacity: 0.6 }} />
                  <div>
                    <p className="type-body-sm mb-[2px]">{title}</p>
                    <p className="font-futura-medium text-[11px] leading-relaxed text-black/50">{body}</p>
                  </div>
                </div>
              ))}
            </div>

          </section>

          {/* 02 — Product Evolution */}
          <section id="s-evolution" className="pt-[56px] pb-[80px] md:pb-[120px] border-b border-black/15">
            <SectionLabel>02 — Product Evolution: From individual to catering to B2B2C</SectionLabel>
            <div className="flex flex-col">

              {/* Full-width spine with 3 phase dots + brand dot at 1/3 */}
              <div className="relative flex items-center w-full mb-[24px]" style={{ height: "16px" }}>
                <div className="absolute left-0 right-0 h-px bg-black/15" />
                <div className="absolute inset-0 flex justify-between items-center">
                  {phases.map((phase) => (
                    <div key={phase.number} className="flex flex-col items-center" style={{ width: "33.33%" }}>
                      <div className="w-[8px] h-[8px] rounded-full border border-black/70 bg-my-bg" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Phase brief content */}
              <div className="flex w-full mb-[32px]">
                {phases.map((phase) => (
                  <div key={phase.number} className="flex-1 flex flex-col items-center text-center px-[32px]">
                    <p className="type-eyebrow mb-[6px]">{phase.number}</p>
                    <h3 className="type-subhead mb-[8px]">{phase.title}</h3>
                    <span className="inline-flex rounded-full border border-black px-3 py-1 type-chip text-black bg-my-bg">{phase.label}</span>
                  </div>
                ))}
              </div>

              {/* Phase design detail cards — dashed borders, aligned with timeline dots above */}
              <div className="flex w-full gap-[12px]">

                {/* Phase 01 */}
                <div className="flex-1 border border-dashed border-black/25 p-[24px]">
                  <p className="font-futura-medium text-[11px] text-black/35 uppercase tracking-[0.1em] mb-[16px]">Mobile-led</p>
                  <p className="type-body mb-[20px]">The product initially focused on individual ordering, with a mobile app as the primary interface.</p>
                  <p className="type-eyebrow mb-[10px]">The design prioritised</p>
                  <ul className="space-y-[8px]">
                    {["Fast ordering flow", "Expressive, Gen Z–oriented visual style", "Discovery-driven browsing"].map((item) => (
                      <li key={item} className="flex items-start gap-[10px]">
                        <span className="w-[4px] h-[4px] rounded-full bg-black/25 mt-[7px] flex-shrink-0" />
                        <p className="type-body-sm">{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Phase 02 */}
                <div className="flex-1 border border-dashed border-black/25 p-[24px]">
                  <p className="font-futura-medium text-[11px] text-black/35 uppercase tracking-[0.1em] mb-[16px]">Web-led</p>
                  <p className="type-body mb-[16px]">Catering demand shifted the product toward group ordering.</p>
                  <div className="border-l-2 border-brand pl-[12px] py-[2px] mb-[20px]">
                    <p className="type-body-sm text-brand">From mobile-first → web-first</p>
                  </div>
                  <p className="type-eyebrow mb-[10px]">Catering required</p>
                  <ul className="space-y-[8px] mb-[20px]">
                    {["Planning and coordination", "Larger order volumes", "Shared decision-making"].map((item) => (
                      <li key={item} className="flex items-start gap-[10px]">
                        <span className="w-[4px] h-[4px] rounded-full bg-black/25 mt-[7px] flex-shrink-0" />
                        <p className="type-body-sm">{item}</p>
                      </li>
                    ))}
                  </ul>
                  <p className="type-eyebrow mb-[10px]">Interface evolved to support</p>
                  <ul className="space-y-[8px]">
                    {["Clarity over exploration", "Structured flows over expressive navigation"].map((item) => (
                      <li key={item} className="flex items-start gap-[10px]">
                        <span className="w-[4px] h-[4px] rounded-full bg-black/25 mt-[7px] flex-shrink-0" />
                        <p className="type-body-sm">{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Phase 03 */}
                <div className="flex-1 border border-dashed border-black/25 p-[24px]">
                  <p className="font-futura-medium text-[11px] text-black/35 uppercase tracking-[0.1em] mb-[16px]">System-led</p>
                  <p className="type-body mb-[16px]">Corporate services expanded the product into a multi-role platform.</p>
                  <div className="border-l-2 border-brand pl-[12px] py-[2px] mb-[20px]">
                    <p className="type-body-sm text-brand">From expressive → systematic</p>
                  </div>
                  <p className="type-body-sm">The original Gen Z visual style was replaced with a neutral, scalable design language that works across roles and contexts.</p>
                  <p className="type-body-sm mt-[12px] text-black/40 italic">This prioritised scalability over expressiveness.</p>
                </div>

              </div>


            </div>
          </section>

          {/* 03 — The Design Challenge: Four Roles */}
          <section id="s-roles" className="pt-[56px] pb-[80px] md:pb-[120px] border-b border-black/15">
            <SectionLabel>03 — The Design Challenge</SectionLabel>

            {/* Thesis */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[56px] md:mb-[72px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Why this project is different</p>
              </div>
              <div className="md:col-span-3">
                <p
                  className="font-inria-serif leading-[1.2] tracking-tight text-black mb-[20px]"
                  style={{ fontSize: "clamp(1.4rem, 2.4vw, 2.2rem)" }}
                >
                  I wasn't designing for one user. I was designing for four.
                </p>
                <p className="font-futura-medium text-[14px] md:text-[15px] leading-relaxed text-black/70 max-w-[600px]">
                  Every order placed moves through four people — each with a different goal, a different device, a different definition of success. Optimising for one often works against another. The challenge was not to build four interfaces. It was to build one system that holds all four realities without fragmenting.
                </p>
              </div>
            </div>

            <SubDivider />

            {/* One order — four realities */}
            <div className="mt-[32px]">
              <p className="type-eyebrow mb-[28px]">One order — four realities</p>

              {/* Desktop: hub-and-spoke diagram */}
              <div className="hidden md:flex flex-col items-center">
                <TreeNode label="Order Placed" />
                <TreeConnector count={4} />
                <div className="flex items-start gap-[8px] w-full">
                  {orderFlowRoles.map(({ role, platform, reality, point }) => (
                    <div key={role} className="flex flex-col flex-1 min-w-0">
                      <TreeNode label={role} sub={platform} />
                      <TreePipe />
                      <div className="border border-dashed border-black/20 p-[10px] flex flex-col gap-[8px]">
                        <p
                          className="font-inria-serif text-brand text-center"
                          style={{ fontSize: "13px", lineHeight: 1.3 }}
                        >
                          "{reality}"
                        </p>
                        <div className="border-t border-black/10 pt-[8px]">
                          <p className="type-eyebrow mb-[4px]">Design point</p>
                          <p className="font-futura-medium text-[11px] leading-relaxed text-black/60">{point}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile: stacked list */}
              <div className="md:hidden flex flex-col gap-[12px]">
                {orderFlowRoles.map(({ role, platform, reality, point }) => (
                  <div key={role} className="border border-dashed border-black/20 p-[16px] flex flex-col gap-[8px]">
                    <div className="flex items-baseline gap-[12px]">
                      <p className="type-eyebrow">{role}</p>
                      <p className="font-futura-medium text-[10px] text-black/30 uppercase tracking-[0.08em]">{platform}</p>
                    </div>
                    <p className="font-inria-serif text-brand" style={{ fontSize: "14px", lineHeight: 1.3 }}>"{reality}"</p>
                    <div className="border-t border-black/10 pt-[8px]">
                      <p className="type-eyebrow mb-[4px]">Design point</p>
                      <p className="font-futura-medium text-[12px] leading-relaxed text-black/60">{point}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </section>

          {/* 04 — Individual Ordering */}
          <section id="s-challenge" className="pt-[56px] pb-[80px] md:pb-[120px] border-b border-black/15">
            <SectionLabel>04 — Individual Ordering</SectionLabel>

            {/* 04a — Path Not Taken */}
            <div id="s-exploration">
              <p className="font-inria-serif mb-[32px] md:mb-[48px]" style={{ fontSize: "clamp(1.1rem, 2vw, 1.8rem)", lineHeight: 1 }}>04a — Path Not Taken</p>

              {/* Why I abandoned the map-based interface */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[48px]">
                <div>
                  <p className="type-eyebrow mb-[16px]">Why I Abandoned the Map-Based Interface</p>
                  <p className="type-body-key mb-[16px]">
                    Early on, I explored a more expressive interaction model inspired by physical street markets — and ultimately abandoned it.
                  </p>
                  <div className="border border-black/20 p-[16px] mt-[8px]">
                    <p className="font-futura-heavy text-[13px] md:text-[14px] leading-snug mb-[12px]">Ruled out by user friction and business constraints</p>
                    <div className="border-l-2 border-brand pl-[12px] py-[2px] mb-[12px]">
                      <p className="type-body-sm text-brand">Two key risks identified:</p>
                    </div>
                    <ul className="space-y-[10px]">
                      {[
                        "Higher learning cost for first-time users",
                        "Slower interaction in a time-sensitive context (lunch ordering)",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-[10px]">
                          <span className="w-[4px] h-[4px] rounded-full bg-black/25 mt-[7px] flex-shrink-0" />
                          <p className="type-body-sm">{item}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="hidden md:block" />
                <div className="md:col-span-2 flex flex-col gap-[24px]">
                  <ul className="space-y-[12px]">
                    {[
                      "A map-based entry point instead of a list",
                      "Tinder-like swiping for menu navigation",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-[12px]">
                        <span className="w-[4px] h-[4px] rounded-full bg-black/25 mt-[8px] flex-shrink-0" />
                        <p className="type-body">{item}</p>
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-[12px]">
                    <div className="flex-1"><ImagePlaceholder filename="sf-explore-map.webp" caption="Map-based entry" ratio="auto" /></div>
                    <div className="flex-1"><ImagePlaceholder filename="sf-explore-poster.webp" caption="Swipe navigation" ratio="auto" /></div>
                    <div className="flex-1"><ImagePlaceholder filename="sf-explore-swipe.webp" caption="Swipe navigation" ratio="auto" /></div>
                  </div>
                </div>
              </div>

              <SubDivider />

              {/* The trade-off */}
              <div className="border border-black/20 p-[24px] md:p-[28px] mt-[24px] grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[20px]">
                <div>
                  <p className="type-eyebrow mb-[16px]">The trade-off</p>
                  <div className="border-l-2 border-brand pl-[12px] py-[2px]">
                    <p className="type-body-sm text-brand">Novelty vs usability</p>
                  </div>
                </div>
                <div className="hidden md:block" />
                <div className="md:col-span-2">
                  <p className="type-body mb-[16px]">
                    An expressive interface might have matched the street-market brand, but it would have introduced friction at every point in the ordering flow.
                  </p>
                  <p className="type-body mb-[16px]">
                    I adopted a more familiar structure: list-based browsing, standard navigation, and faster, more predictable interactions.
                  </p>
                  <p className="type-eyebrow mb-[12px]">I prioritised</p>
                  <div className="flex flex-wrap gap-[8px] mb-[16px]">
                    {["Speed", "Learnability", "Scalability"].map((tag) => (
                      <span key={tag} className="inline-flex rounded-full border border-black px-3 py-1 type-chip text-black bg-my-bg">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="type-body-sm text-black/40 italic">This was not a visual decision — it was a product decision prioritising speed and learnability over novelty.</p>
                </div>
              </div>
            </div>

            <SubDivider />

            {/* 04b — Individual Ordering */}
            <div>
              <p className="font-inria-serif mb-[32px] md:mb-[48px]" style={{ fontSize: "clamp(1.1rem, 2vw, 1.8rem)", lineHeight: 1 }}>04b — Individual Ordering</p>

              {/* Intro — text col 1 | blank col 2 | body cols 3-4 */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[48px]">
                <div>
                  <p className="type-eyebrow mb-[16px]">The baseline</p>
                  <p className="type-body">The product started with a simple consumer flow focused on individual ordering.</p>
                </div>
                <div className="hidden md:block" />
                <div className="md:col-span-2">
                  <p className="type-body-key mb-[16px]">
                    Users browse food by market, select items from multiple vendors, and place a single combined order.
                  </p>
                  <p className="type-body">
                    A key concept introduced early on: <span className="font-futura-medium">one delivery fee per market.</span>
                  </p>
                </div>
              </div>

              <SubDivider />

              {/* Design focus — text col 1 | blank col 2 | images cols 3-4 */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[48px]">
                <div>
                  <p className="type-eyebrow mb-[16px]">Design focus</p>
                  <p className="type-body mb-[16px]">This concept was reinforced across the key journey:</p>
                  <ul className="space-y-[8px]">
                    {["Homepage", "Market view", "Cart"].map((item) => (
                      <li key={item} className="flex items-start gap-[10px]">
                        <span className="w-[4px] h-[4px] rounded-full bg-black/25 mt-[7px] flex-shrink-0" />
                        <p className="type-body-sm">{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="hidden md:block" />
                <div className="md:col-span-2 flex gap-[12px]">
                  <div className="flex-1"><ImagePlaceholder filename="sf-b2c-home.webp" caption="Homepage — entry point for market-based browsing" ratio="auto" /></div>
                  <div className="flex-1"><ImagePlaceholder filename="sf-b2c-market.webp" caption="Market — multi-vendor selection within one context" ratio="auto" /></div>
                  <div className="flex-1"><ImagePlaceholder filename="sf-b2c-cart.webp" caption="Cart — unified checkout with one delivery fee" ratio="auto" /></div>
                </div>
              </div>

              <SubDivider />

              {/* Closing note */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px]">
                <div className="hidden md:block" />
                <div className="hidden md:block" />
                <div className="md:col-span-2">
                  <p className="type-body-sm text-black/40 italic">This established a clear and simple baseline for the product experience.</p>
                </div>
              </div>
            </div>

          </section>

          {/* 05 — Designing for Merchants */}
          <section id="s-design-system" className="pt-[56px] pb-[256px] border-b border-black/15">
            <SectionLabel>05 — Designing for merchants</SectionLabel>

            {/* Intro — text col 1 | blank col 2 | body cols 3-4 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[48px]">
              <div>
                <p className="type-eyebrow mb-[16px]">The constraint</p>
                <p className="type-body">The system had to adapt to real-world constraints.</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2">
                <p className="type-body-key mb-[16px]">Most merchants are small street food vendors:</p>
                <ul className="space-y-[8px]">
                  {[
                    "Limited staff (often 1–2 people)",
                    "No dedicated workspace",
                    "No desktop setup",
                    "High-pressure, time-sensitive environment",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-[10px]">
                      <span className="w-[4px] h-[4px] rounded-full bg-black/25 mt-[7px] flex-shrink-0" />
                      <p className="type-body-sm">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <SubDivider />

            {/* Design decision — text col 1 | blank col 2 | content cols 3-4 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[48px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Design decision</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2">
                <p className="type-body-key mb-[16px]">
                  Instead of building a desktop-first system, we designed a mobile-first merchant experience.
                </p>
                <p className="type-body mb-[24px]">
                  Merchants are provided with a tablet / POS device running a simplified fulfilment app.
                </p>
                <p className="type-eyebrow mb-[12px]">This approach:</p>
                <ul className="space-y-[8px] mb-[24px]">
                  {[
                    "Reduces learning cost",
                    "Eliminates the need for additional hardware",
                    "Fits into existing workflows",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-[10px]">
                      <span className="w-[4px] h-[4px] rounded-full bg-black/25 mt-[7px] flex-shrink-0" />
                      <p className="type-body-sm">{item}</p>
                    </li>
                  ))}
                </ul>
                <div className="border-l-2 border-brand pl-[12px] py-[2px]">
                  <p className="type-body-sm text-brand">We designed for reality, not ideal workflows.</p>
                </div>
              </div>
            </div>

            <SubDivider />

            {/* Employee Mode */}
            <div className="mb-[40px]">
              <p className="font-futura-medium text-[11px] text-black/35 uppercase tracking-[0.1em] mb-[20px]">Employee Mode — Order Receiving</p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px]">
                <div className="hidden md:block" />
                <div className="hidden md:block" />
                <div className="md:col-span-2 flex gap-[12px]">
                  <div className="flex-1"><ImagePlaceholder filename="merchant-orders-1.webp" caption="Incoming order" ratio="auto" /></div>
                  <div className="flex-1"><ImagePlaceholder filename="merchant-orders-2.webp" caption="Order fulfilment" ratio="auto" /></div>
                </div>
              </div>
            </div>

            <SubDivider />

            {/* Manager Mode */}
            <div>
              <p className="font-futura-medium text-[11px] text-black/35 uppercase tracking-[0.1em] mb-[20px]">Manager Mode — Store Management</p>
              <div className="flex gap-[12px]">
                <div className="flex-1"><ImagePlaceholder filename="merchant-stall.webp" caption="Stall overview" ratio="auto" /></div>
                <div className="flex-1"><ImagePlaceholder filename="merchant-data.webp" caption="Order data" ratio="auto" /></div>
                <div className="flex-1"><ImagePlaceholder filename="merchant-revenue.webp" caption="Revenue" ratio="auto" /></div>
                <div className="flex-1"><ImagePlaceholder filename="sf-merchant-ui.webp" caption="Menu management" ratio="auto" /></div>
              </div>
            </div>

          </section>

          {/* 06 — Catering & Corporate */}
          <section id="s-operations" className="pt-[56px] pb-[80px] md:pb-[120px] border-b border-black/15">
            <SectionLabel>06 — Catering & Corporate</SectionLabel>

            {/* 06a — Catering */}
            <div className="mb-[56px]">
              <p className="font-inria-serif mb-[32px] md:mb-[48px]" style={{ fontSize: "clamp(1.1rem, 2vw, 1.8rem)", lineHeight: 1 }}>06a — Catering</p>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[48px]">
                <div>
                  <p className="type-eyebrow mb-[16px]">Group ordering</p>
                  <p className="type-body">Catering shifted the product toward planned, large-group consumption — from on-demand to structured events.</p>
                </div>
                <div className="hidden md:block" />
                <div className="md:col-span-2">
                  <p className="type-body-key mb-[16px]">Designed for student societies and corporate events.</p>
                  <p className="type-body">Users plan ahead, select from multiple vendors, and coordinate delivery for large groups in a single order.</p>
                </div>
              </div>

              <SubDivider />

              <div className="flex flex-col gap-[12px] mt-[32px]">
                <div className="flex gap-[12px]">
                  <div className="flex-1"><ImagePlaceholder filename="catering-home.webp" caption="Homepage" ratio="auto" /></div>
                  <div className="flex-1"><ImagePlaceholder filename="catering-order-1.webp" caption="Order process — step 1" ratio="auto" /></div>
                </div>
                <div className="flex gap-[12px]">
                  <div className="flex-1"><ImagePlaceholder filename="catering-order-2.webp" caption="Order process — step 2" ratio="auto" /></div>
                  <div className="flex-1"><ImagePlaceholder filename="catering-order-3.webp" caption="Order process — step 3" ratio="auto" /></div>
                </div>
              </div>
            </div>

            <SubDivider />

            {/* 06b — Corporate */}
            <div className="pt-[40px]">
              <p className="font-inria-serif mb-[32px] md:mb-[48px]" style={{ fontSize: "clamp(1.1rem, 2vw, 1.8rem)", lineHeight: 1 }}>06b — Corporate</p>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[48px]">
                <div>
                  <p className="type-eyebrow mb-[16px]">Where complexity emerges</p>
                  <p className="type-body">While the product spans multiple services, the real complexity emerges in the corporate system.</p>
                </div>
                <div className="hidden md:block" />
                <div className="md:col-span-2">
                  <p className="type-body-key mb-[16px]">
                    Here, the system shifts from a single-user experience to a multi-role platform.
                  </p>
                  <p className="type-subhead mb-[16px]">A single order is interpreted differently by each role.</p>
                  <p className="type-body">
                    This introduces a fundamentally different design problem: not interface design, but system design.
                  </p>
                </div>
              </div>

              <SubDivider />

              <div className="flex gap-[12px]">
                <div className="flex-1">
                  <ImagePlaceholder filename="sf-decision-01.webp" caption="Employee view" ratio="auto" />
                </div>
                <div className="flex-1">
                  <ImagePlaceholder filename="sf-decision-02.webp" caption="Manager view" ratio="auto" />
                </div>
              </div>
            </div>

          </section>

          {/* 07 — Rider's App */}
          <section id="s-riders" className="pt-[56px] pb-[80px] md:pb-[120px] border-b border-black/15">
            <SectionLabel>07 — Rider's App</SectionLabel>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[48px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Last-mile delivery</p>
                <p className="type-body">The rider app is the operational backbone of the platform — translating orders into routes.</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2">
                <p className="type-body-key mb-[16px]">Designed for speed and clarity under pressure.</p>
                <p className="type-body">Riders receive consolidated pickup instructions — one stop per order regardless of vendor count.</p>
              </div>
            </div>

            <SubDivider />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px]">
              <div className="hidden md:block" />
              <div className="hidden md:block" />
              <div className="md:col-span-2 flex gap-[12px]">
                <div className="flex-1"><ImagePlaceholder filename="riders-app-1.webp" caption="Route view" ratio="auto" /></div>
                <div className="flex-1"><ImagePlaceholder filename="riders-app-2.webp" caption="Order detail" ratio="auto" /></div>
                <div className="flex-1"><ImagePlaceholder filename="riders-app-3.webp" caption="Delivery confirmation" ratio="auto" /></div>
              </div>
            </div>

          </section>

          {/* 08 — Outcomes */}
          <section id="s-outcomes" className="pt-[56px] pb-[80px] md:pb-[120px] border-b border-black/15">
            <SectionLabel>08 — Outcomes</SectionLabel>

            {/* Business metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px] mb-[48px] md:mb-[64px]">
              {[
                { value: "1,000+", label: "Orders processed",  note: "across individual, catering, and corporate" },
                { value: "2×",     label: "Revenue growth",    note: "after shift to corporate and catering focus" },
                { value: "£7,000", label: "GMV achieved",      note: "in the first operational year" },
              ].map(({ value, label, note }) => (
                <div key={label} className="border border-black/15 px-[24px] py-[28px]">
                  <p className="font-inria-serif leading-none tracking-tight text-black mb-[10px]" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>{value}</p>
                  <p className="type-body-key mb-[4px]">{label}</p>
                  <p className="type-body-sm text-black/40">{note}</p>
                </div>
              ))}
            </div>

            <SubDivider />

            {/* Design-specific outcomes */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mt-[32px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Design outcomes</p>
                <p className="type-body">Beyond the business metrics, the design system delivered measurable structural results.</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2 flex flex-col gap-[20px]">
                {[
                  {
                    heading: "One design system, three product lines",
                    body: "The design system — tokens, component patterns, and interaction models — scales across individual, catering, and corporate without a rebuild. Built once; adapted, not duplicated.",
                  },
                  {
                    heading: "Merchant onboarding eliminated training overhead",
                    body: "The ordering window model removed the need for live menu-synchronisation training. Merchants configure once; the system handles the rest.",
                  },
                ].map(({ heading, body }) => (
                  <div key={heading} className="border-l-2 border-brand pl-[16px] py-[4px]">
                    <p className="type-body-key mb-[6px]">{heading}</p>
                    <p className="type-body">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Reflection */}
          <section className="pt-[56px] pb-[80px] md:pb-[120px]">
            <p className="type-eyebrow mb-[32px] md:mb-[48px]" style={{ letterSpacing: "0.1em" }}>
              Reflection
            </p>

            <div className="max-w-[680px]">
              <p
                className="font-inria-serif leading-[1.3] tracking-tight text-black mb-[24px] md:mb-[32px]"
                style={{ fontSize: "clamp(1.2rem, 2vw, 1.8rem)" }}
              >
                Design was a product-defining function, not a finishing layer.
              </p>
              <p className="font-futura-medium text-[14px] md:text-[15px] leading-relaxed text-black/70 mb-[20px]">
                Every structural decision in this project — the ordering window model, the multi-role system, the choice to abandon map-based navigation — was a design decision first. The visual layer followed from the structure, not the other way around.
              </p>
              <p className="font-futura-medium text-[14px] md:text-[15px] leading-relaxed text-black/70">
                What this project taught me: I'm drawn to systemic, structural problems more than visual ones. The most interesting design work here happened at the level of information architecture and role-based flows, not UI polish. I want my next role to take that further — designing for complex workflows, technical users, and systems that require that kind of structural rigour.
              </p>
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
