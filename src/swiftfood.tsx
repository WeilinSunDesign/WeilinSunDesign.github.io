import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./components/Header";

// ── Nav sections ──────────────────────────────────────────────────────────────

const navSections = [
  { id: "s-context",       label: "01 — Overview" },
  { id: "s-evolution",     label: "02 — Evolution" },
  { id: "s-exploration",   label: "02b — Exploration" },
  { id: "s-challenge",     label: "03 — Challenge" },
  { id: "s-decisions",     label: "04 — Decisions" },
  { id: "s-design-system", label: "04b — Design System" },
  { id: "s-operations",    label: "05 — Operations" },
  { id: "s-access",        label: "06 — Access Control" },
  { id: "s-outcomes",      label: "07 — Outcomes" },
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

const roles = [
  {
    name: "Employee",
    goal: "Speed and ease",
    points: ["Personal lunch choice", "Fast, low-friction ordering", "Discovery without constraint"],
    pill: "Mobile app · primary consumer experience",
  },
  {
    name: "Manager",
    goal: "Budget control",
    points: ["Monitor team spending", "Set individual allowances", "Oversight — not ordering"],
    pill: "B2B portal · team budget & spend tracking",
  },
  {
    name: "Merchant",
    goal: "Operational feasibility",
    points: ["A production queue", "Real-time menu and order management", "Time-sensitive at peak hours"],
    pill: "Tablet portal · order & menu management",
  },
  {
    name: "Rider",
    goal: "Efficiency and clarity",
    points: ["Multi-stop pickup route", "Mixed-basket means multiple stalls per order", "Minimum cognitive load"],
    pill: "Mobile app · task execution · low cognitive load",
    wide: true,
  },
  {
    name: "Company",
    goal: "Cost structure",
    points: ["Budget framework — executed through Manager", "No independent portal needed", "Separate portal would add onboarding friction with no UX gain"],
    pill: "No independent portal — managed through Manager",
    wide: true,
  },
];


const merchantPrinciples = [
  { title: "One screen, one task",         body: "Merchants see only current orders for their stall, displayed as large ticket cards. No navigation — just what needs to be cooked now." },
  { title: "No typing required",           body: "Accepting an order, marking ready, and flagging an issue are single taps. Every interaction is binary: confirm or flag." },
  { title: "Loud, unmissable alerts",      body: "New orders trigger a full-screen alert with audio. Merchants are cooking — the notification had to be impossible to miss." },
  { title: "Error recovery over precision", body: "If a merchant dismisses an order accidentally, they can recover within 60 seconds. The interface is robust to human error." },
];

const outcomes = [
  { stat: "1,000+",  label: "Orders in first week" },
  { stat: "2×",      label: "Merchant growth" },
  { stat: "2×",      label: "Weekly orders after optimisation" },
  { stat: "~£7,000", label: "GMV in first 3 months" },
];

// ── Sub-components ─────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="type-section-nav mb-[32px] md:mb-[48px]">
      {children}
    </p>
  );
}


function DecisionBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-black pl-5 py-1 my-6 bg-black/[0.02]">
      <p className="type-eyebrow mb-2">Design decision</p>
      <p className="type-body-key">{children}</p>
    </div>
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

function InsightBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border border-black/20 p-5 md:p-6 my-4 flex flex-col md:flex-row gap-2 md:gap-5">
      <span className="type-eyebrow whitespace-nowrap md:mt-[2px]">{label}</span>
      <p className="font-futura-medium text-[14px] md:text-[15px] leading-relaxed text-black">{children}</p>
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
                  Swiftfood evolved from a consumer-focused delivery concept into a multi-line service ecosystem, spanning individual ordering, catering, and corporate lunch — all supported by a shared operational backbone.
                </p>
              </div>
              <div className="md:col-span-3 flex flex-col items-center gap-0 w-full">
                <TreeNode label="Swiftfood Product Ecosystem" />
                <TreeConnector count={3} />
                <div className="flex items-start gap-[12px] w-full">
                  <div className="flex flex-col items-center flex-1 min-w-0">
                    <TreeNode label="Individual Ordering (B2C)" />
                    <TreePipe />
                    <TreeNode label="Consumer App" sub="Mobile" />
                  </div>
                  <div className="flex flex-col items-center flex-1 min-w-0">
                    <TreeNode label="Catering & Event Ordering" />
                    <TreePipe />
                    <TreeNode label="Catering Web" sub="Desktop" />
                  </div>
                  <div className="flex flex-col items-center flex-1 min-w-0">
                    <TreeNode label="Corporate Office Ordering (B2B2C)" />
                    <TreeConnector count={2} />
                    <div className="flex items-start gap-[8px] w-full">
                      <div className="flex flex-col items-center flex-1 min-w-0">
                        <TreeNode label="Manager View" />
                      </div>
                      <div className="flex flex-col items-center flex-1 min-w-0">
                        <TreeNode label="Employee View" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full border-t border-black/10 border-dashed my-[20px]" />
                <TreeNode label="Shared Operational Layer" />
                <TreeConnector count={3} />
                <div className="flex items-start gap-[12px] w-full">
                  <div className="flex flex-col items-center flex-1 min-w-0">
                    <TreeNode label="Merchant App" sub="Mobile" />
                    <TreeConnector count={2} />
                    <div className="flex items-start gap-[8px] w-full">
                      <div className="flex flex-col items-center flex-1 min-w-0">
                        <TreeNode label="Manager View" />
                      </div>
                      <div className="flex flex-col items-center flex-1 min-w-0">
                        <TreeNode label="Order View" />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center flex-1 min-w-0">
                    <TreeNode label="Rider App" sub="Mobile" />
                  </div>
                  <div className="flex flex-col items-center flex-1 min-w-0">
                    <TreeNode label="Order Management System" />
                  </div>
                </div>
              </div>
            </div>

            <SubDivider />

            {/* My Role — horizontal tree: root left → 5 role boxes right */}
            <div className="mb-[40px] md:mb-[56px]">
              <p className="type-eyebrow md:text-[14px] mb-[20px]">My Role</p>

              <div className="hidden md:flex items-stretch">

                {/* Root node */}
                <div className="flex items-center flex-shrink-0 mr-[16px]">
                  <p className="font-futura-medium text-brand leading-snug whitespace-nowrap" style={{ fontSize: "17px" }}>
                    Founding Product Designer
                  </p>
                </div>

                {/* Connector: mirrors role column (same gap-[8px] + flex-1) so rows align */}
                <div className="flex flex-col gap-[8px] self-stretch flex-shrink-0" style={{ width: "48px" }}>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div key={i} className="relative flex-1">
                      {/* Vertical bar segment — from center of first to center of last */}
                      <div
                        className="absolute bg-black/20"
                        style={{ left: "50%", transform: "translateX(-50%)", width: "1px", top: i === 0 ? "50%" : "-4px", bottom: i === 4 ? "50%" : "-4px" }}
                      />
                      {/* Horizontal trunk from root (left edge) to vertical bar — center row only */}
                      {i === 2 && (
                        <div className="absolute bg-black/20" style={{ left: 0, right: "50%", height: "1px", top: "50%", transform: "translateY(-50%)" }} />
                      )}
                      {/* Horizontal prong from vertical bar to role box */}
                      <div className="absolute bg-black/20" style={{ left: "50%", right: 0, height: "1px", top: "50%", transform: "translateY(-50%)" }} />
                    </div>
                  ))}
                </div>

                {/* 5 role boxes — separate, not in one big border */}
                <div className="flex flex-col gap-[8px] flex-1">
                  {[
                    { title: "System Architect",            body: "Defined a multi-role system aligning five user mental models.",     icon: "/icons/icon-architecture.svg" },
                    { title: "Product Strategist",          body: "Scaled the product from B2C to catering and corporate.",            icon: "/icons/icon-structure.svg" },
                    { title: "UX Lead",                     body: "Led end-to-end UX across all platforms.",                          icon: "/icons/icon-interaction.svg" },
                    { title: "Front-end Collaborator",      body: "Worked with engineers to ship and refine front-end.",               icon: "/icons/icon-platforms.svg" },
                    { title: "Cross-functional Integrator", body: "Turned business and operational constraints into product decisions.", icon: "/icons/icon-bridge.svg" },
                  ].map(({ title, body, icon }) => (
                    <div key={title} className="border border-black/15 px-[16px] py-[12px] flex items-center gap-[12px]">
                      <img src={icon} alt="" className="w-[56px] h-[56px] flex-shrink-0" style={{ filter: "brightness(0)", opacity: 0.6 }} />
                      <div>
                        <p className="type-body-key mb-[2px]">{title}</p>
                        <p className="type-body">{body}</p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

              {/* Mobile fallback — simple list */}
              <div className="md:hidden flex flex-col gap-[8px]">
                {[
                  { title: "System Architect",            body: "Defined a multi-role system aligning five user mental models.",     icon: "/icons/icon-architecture.svg" },
                  { title: "Product Strategist",          body: "Scaled the product from B2C to catering and corporate.",            icon: "/icons/icon-structure.svg" },
                  { title: "UX Lead",                     body: "Led end-to-end UX across all platforms.",                          icon: "/icons/icon-interaction.svg" },
                  { title: "Front-end Collaborator",      body: "Worked with engineers to ship and refine front-end.",               icon: "/icons/icon-platforms.svg" },
                  { title: "Cross-functional Integrator", body: "Turned business and operational constraints into product decisions.", icon: "/icons/icon-bridge.svg" },
                ].map(({ title, body, icon }) => (
                  <div key={title} className="border border-black/15 px-[16px] py-[12px] flex items-start gap-[12px]">
                    <img src={icon} alt="" className="w-[28px] h-[28px] flex-shrink-0 mt-[2px]" style={{ filter: "brightness(0)", opacity: 0.6 }} />
                    <div>
                      <p className="type-body-key mb-[2px]">{title}</p>
                      <p className="type-body">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </section>

          {/* 02 — Product Evolution */}
          <section id="s-evolution" className="pt-[56px] pb-[256px] border-b border-black/15">
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

          {/* 02b — Early Exploration */}
          <section id="s-exploration" className="pt-[56px] pb-[256px] border-b border-black/15">
            <SectionLabel>02b — Early Exploration</SectionLabel>

            {/* A market-inspired interface — text col 1 | blank col 2 | bullets cols 3-4 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[48px]">
              <div>
                <p className="type-eyebrow mb-[16px]">A market-inspired interface</p>
                <p className="type-body-key mb-[16px]">
                  In the early stage, I explored a more expressive interaction model inspired by physical street markets.
                </p>
                <p className="type-body">
                  The goal was to create an experience closer to how people explore food in real life.
                </p>
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
                {/* Exploration sketches */}
                <div className="flex gap-[12px]">
                  <div className="flex-1"><ImagePlaceholder filename="sf-explore-map.webp" caption="Map-based entry" ratio="auto" /></div>
                  <div className="flex-1"><ImagePlaceholder filename="sf-explore-poster.webp" caption="Swipe navigation" ratio="auto" /></div>
                  <div className="flex-1"><ImagePlaceholder filename="sf-explore-swipe.webp" caption="Swipe navigation" ratio="auto" /></div>
                </div>
              </div>
            </div>

            <SubDivider />

            {/* Why this direction was abandoned — text col 1 | blank col 2 | bullets cols 3-4 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[40px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Why this direction was abandoned</p>
                <p className="type-body">Three key risks identified:</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2">
                <ul className="space-y-[12px]">
                  {[
                    "Higher learning cost for first-time users",
                    "Slower interaction in a time-sensitive context (lunch ordering)",
                    "Increased complexity when scaling across multiple roles",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-[12px]">
                      <span className="w-[4px] h-[4px] rounded-full bg-black/25 mt-[8px] flex-shrink-0" />
                      <p className="type-body">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <SubDivider />

            {/* The trade-off — text col 1 | blank col 2 | content cols 3-4 */}
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

          </section>

          {/* 03 — Core Challenge */}
          <section id="s-challenge" className="pt-[56px] pb-[256px] border-b border-black/15">
            <SectionLabel>03 — The Core Challenge</SectionLabel>

            {/* Framing — text col 1 | blank col 2 | body cols 3-4 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[48px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Multiple roles, conflicting goals</p>
                <p className="type-body">Each role optimises for something different. Improving one often degrades another.</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2">
                <p className="type-body-key mb-[16px]">
                  The problem was reframed:{" "}
                  <em className="font-inria-serif">how can one system support multiple truths simultaneously?</em>
                </p>
                <p className="type-body-sm text-black/40 italic">This was a system decision, not a UI optimisation.</p>
              </div>
            </div>

            <SubDivider />

            {/* Role cards — full width, 5 columns */}
            <div className="flex flex-col gap-[16px]">
              <div>
                <p className="type-eyebrow mb-[8px]">User roles</p>
                <p className="type-body">Five distinct roles, each with a different mental model and success criteria.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-[8px]">
                {roles.map((role) => (
                  <div key={role.name} className="border border-black/20 p-[20px] flex flex-col gap-[10px]">
                    <div className="flex flex-col gap-[4px]">
                      <p className="type-eyebrow">{role.name}</p>
                      <span className="font-futura-light text-[10px] uppercase tracking-[0.1em] text-black/35">Goal: {role.goal}</span>
                    </div>
                    <ul className="space-y-[4px] flex-1">
                      {role.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-[8px]">
                          <span className="type-body-sm text-black/30 shrink-0">→</span>
                          <p className="type-body-sm">{pt}</p>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-[6px]">
                      {role.pill.split(" · ").map((tag) => (
                        <span key={tag} className="inline-flex rounded-full border border-black px-3 py-1 type-chip text-black bg-my-bg">{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </section>

          {/* 04b — Design System */}
          <section id="s-design-system" className="pt-[56px] pb-[256px] border-b border-black/15">
            <SectionLabel>04b — Design System</SectionLabel>

            {/* Intro — text col 1 | blank col 2 | body cols 3-4 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[48px]">
              <div>
                <p className="type-eyebrow mb-[16px]">A unified system across platforms</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2">
                <p className="type-body-key">
                  To support a multi-role, multi-platform product, I established a unified design system
                  across all interfaces.
                </p>
              </div>
            </div>

            <SubDivider />

            {/* Design tokens — text col 1 | blank col 2 | content cols 3-4 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[48px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Design tokens</p>
                <p className="type-body">A shared foundation of typography, colour, and spacing applied consistently across every product surface.</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2 flex flex-col gap-[20px]">
                <ul className="space-y-[10px]">
                  {["Typography scale", "Colour system", "Spacing and layout grid"].map((item) => (
                    <li key={item} className="flex items-start gap-[12px]">
                      <span className="w-[4px] h-[4px] rounded-full bg-black/25 mt-[8px] flex-shrink-0" />
                      <p className="type-body">{item}</p>
                    </li>
                  ))}
                </ul>
                <ImagePlaceholder filename="sf-system-tokens.webp" caption="Design tokens" />
              </div>
            </div>

            <SubDivider />

            {/* Reusable components — text col 1 | blank col 2 | content cols 3-4 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[48px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Reusable components</p>
                <p className="type-body">Components shared across mobile and desktop, adapted per platform without diverging in logic.</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2 flex flex-col gap-[20px]">
                <ImagePlaceholder filename="sf-system-components.webp" caption="Component library" />
              </div>
            </div>

            <SubDivider />

            {/* Interaction patterns + outcome — text col 1 | blank col 2 | content cols 3-4 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Consistent interaction patterns</p>
                <p className="type-body">Employee, manager, merchant, and rider interfaces share the same interaction logic, built on a single underlying system.</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2">
                <div className="border border-black/20 p-[20px]">
                  <p className="type-eyebrow mb-[12px]">All products built on one system</p>
                  <div className="flex flex-wrap gap-[8px]">
                    {["Employee", "Manager", "Merchant", "Rider"].map((role) => (
                      <span key={role} className="inline-flex rounded-full border border-black px-3 py-1 type-chip text-black bg-my-bg">{role}</span>
                    ))}
                  </div>
                  <p className="type-body mt-[16px]">
                    The design system was not a UI layer — it was the foundation for scaling the product across roles and platforms.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 05 — Designing for Operations */}
          <section id="s-operations" className="pt-[56px] pb-[256px] border-b border-black/15">
            <SectionLabel>05 — Designing for Operations</SectionLabel>

            {/* Intro — text col 1 | blank col 2 | body cols 3-4 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[48px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Merchant experience</p>
                <p className="type-body">Designing for reality, not ideal workflows.</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2">
                <p className="type-body-key mb-[16px]">
                  Merchants operate in low-tech environments and high-pressure workflows. I designed for reality, not ideal conditions.
                </p>
                <p className="type-body-sm text-black/40 italic">This balanced user experience with operational constraints.</p>
              </div>
            </div>

            <SubDivider />

            {/* The constraint — text col 1 | blank col 2 | content cols 3-4 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[48px]">
              <div>
                <p className="type-eyebrow mb-[16px]">The constraint</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2">
                <p className="type-subhead mb-[12px]">Street food prep is slow. Delivery timing is unforgiving.</p>
                <p className="type-body-key">
                  Unlike restaurant kitchens, a street food stall has one or two people, limited equipment,
                  and no mise en place. On-demand ordering would require merchants to be ready to cook at
                  any moment — operationally impossible.
                </p>
              </div>
            </div>

            <SubDivider />

            {/* Ordering window — text col 1 | blank col 2 | timeline cols 3-4 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[48px]">
              <div>
                <p className="type-eyebrow mb-[16px]">The ordering window model</p>
                <p className="type-body">
                  Instead of on-demand ordering, I introduced fixed time windows. This enabled batch
                  preparation, lower stress, and more reliable delivery — a service design decision, not a
                  UX decision.
                </p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2">
                <ImagePlaceholder filename="sf-ordering-window.webp" caption="Ordering window — desktop" ratio="auto" />
              </div>
            </div>

            <SubDivider />

            {/* Interaction principles — text col 1 | blank col 2 | cards cols 3-4 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[48px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Interaction principles</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2">
                <div className="border border-black/20">
                  {merchantPrinciples.map((p) => (
                    <div key={p.title} className="border-b border-black/10 last:border-b-0 p-[20px]">
                      <p className="type-eyebrow mb-[8px]">Principle</p>
                      <p className="type-subhead mb-[10px]">{p.title}</p>
                      <p className="type-body">{p.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <SubDivider />

            {/* Merchant UI image — phone width */}
            <div className="w-[200px]">
              <ImagePlaceholder filename="sf-merchant-ui.webp" caption="Merchant mobile UI" ratio="auto" />
            </div>
          </section>

          {/* 06 — Smart Access Control */}
          <section id="s-access" className="pt-[56px] pb-[256px] border-b border-black/15">
            <SectionLabel>06 — Smart Access Control</SectionLabel>

            {/* Intro — text col 1 | blank col 2 | body cols 3-4 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[48px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Clock-in integration</p>
                <p className="type-body">Solving hybrid work automatically.</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2">
                <p className="type-body-key mb-[16px]">
                  London's hybrid work model created a specific UX problem: companies pay for lunches only on office days. Managing this manually was unsustainable for managers.
                </p>
                <p className="type-body-sm text-black/40 italic">This was a system decision, not a UI optimisation.</p>
              </div>
            </div>

            <SubDivider />

            {/* How it works — text col 1 | blank col 2 | cards cols 3-4 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[48px]">
              <div>
                <p className="type-eyebrow mb-[16px]">How it works</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2">
                <div className="border border-black/20">
                  {[
                    { eyebrow: "Daily · Automatic", title: "Clock-in sync",    body: "Company's HR / attendance system syncs with the platform each morning." },
                    { eyebrow: "Result · In office",  title: "Access granted",  body: "In-office employees automatically unlock the ordering window. No manager action needed." },
                    { eyebrow: "Result · Remote",     title: "Access withheld", body: "Remote or absent employees see the app but cannot order. No manual intervention required." },
                  ].map((c) => (
                    <div key={c.title} className="border-b border-black/10 last:border-b-0 p-[20px]">
                      <p className="type-eyebrow mb-[8px]">{c.eyebrow}</p>
                      <p className="type-subhead mb-[8px]">{c.title}</p>
                      <p className="type-body-sm">{c.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <SubDivider />

            {/* Edge case + decision — text col 1 | blank col 2 | content cols 3-4 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[48px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Edge case</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2 flex flex-col gap-[20px]">
                <InsightBlock label="→ Edge case">
                  Employees who come into the office unexpectedly, or whose clock-in fails to sync, needed a
                  way out. The solution was a self-serve override — employees can manually mark themselves as
                  "in office today," which triggers a one-tap manager notification (not approval — just visibility).
                </InsightBlock>
                <DecisionBlock>
                  The override was designed as a notification, not an approval flow. Requiring manager sign-off
                  would shift the cognitive burden back to the manager — defeating the purpose of
                  automation. Trust is the default; the manager can audit after the fact if needed.
                </DecisionBlock>
              </div>
            </div>

            <SubDivider />

            {/* Access control UI image */}
            <ImagePlaceholder filename="sf-access-ui.webp" caption="Employee app — locked state + override screen" ratio="auto" />
          </section>

          {/* 07 — Outcomes */}
          <section id="s-outcomes" className="pt-[56px] pb-[256px] border-b border-black/15">
            <SectionLabel>07 — Outcomes</SectionLabel>

            {/* Intro — text col 1 | blank col 2 | body cols 3-4 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[48px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Results after launch</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2">
                <p className="type-body-key">The platform launched in London. Key metrics from the first three months of operation.</p>
              </div>
            </div>

            <SubDivider />

            {/* Stats — text col 1 | blank col 2 | stats cols 3-4 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[48px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Key metrics</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2">
                <div className="grid grid-cols-2 gap-0 border border-black/20">
                  {outcomes.map((o) => (
                    <div key={o.label} className="border-b border-r border-black/10 p-[20px] text-center">
                      <p className="font-inria-serif text-[clamp(2rem,3.5vw,3rem)] leading-none tracking-tight text-black mb-[8px]">{o.stat}</p>
                      <p className="type-eyebrow">{o.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <SubDivider />

            {/* Learnings — text col 1 | blank col 2 | two lists cols 3-4 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[48px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Learnings</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2">
                <div className="border border-black/20">
                  <div className="border-b border-black/10 p-[20px]">
                    <p className="type-eyebrow mb-[12px]">What this demonstrates</p>
                    <ul className="space-y-[8px]">
                      {[
                        "A single system can support multiple roles without fragmentation",
                        "System-level decisions outperform UI optimisation",
                        "Product evolution defines design complexity",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-[10px]">
                          <span className="font-futura-light text-[11px] text-black/30 mt-[3px]">—</span>
                          <p className="type-body">{item}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-[20px]">
                    <p className="type-eyebrow mb-[12px]">My contribution</p>
                    <ul className="space-y-[8px]">
                      {[
                        "Defined multi-role system architecture",
                        "Led product structuring from 0→1",
                        "Translated business evolution into product logic",
                        "Designed cross-role interaction systems",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-[10px]">
                          <span className="font-futura-light text-[11px] text-black/30 mt-[3px]">—</span>
                          <p className="type-body">{item}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <SubDivider />

            {/* Reflection */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Reflection</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2">
                <InsightBlock label="→ Reflection">
                  Design was a product-defining function — not a delivery service for pre-specified requirements. The most valuable decisions were structural, made before any interface was drawn.
                </InsightBlock>
              </div>
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
