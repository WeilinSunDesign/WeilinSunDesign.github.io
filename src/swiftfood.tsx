import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./components/Header";

// ── Nav sections ──────────────────────────────────────────────────────────────

const navSections = [
  { id: "s-context",    label: "01 — Context" },
  { id: "s-evolution",  label: "02 — Evolution" },
  { id: "s-challenge",  label: "03 — Challenge" },
  { id: "s-decisions",  label: "04 — Decisions" },
  { id: "s-operations", label: "05 — Operations" },
  { id: "s-access",     label: "06 — Access Control" },
  { id: "s-outcomes",   label: "07 — Outcomes" },
];

// ── Data ──────────────────────────────────────────────────────────────────────

const heroTags = ["Multi-role system design", "B2B2C", "Food delivery", "Mobile + Desktop", "Shipped"];

const introDetails = [
  {
    label: "The core concept:",
    value: "Users can order from multiple street food vendors within a single delivery — a mixed-basket model that differs from traditional single-restaurant orders.",
  },
  {
    label: "Overview:",
    value: "Designing a multi-role food delivery system across B2C, catering, and corporate contexts",
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
    body: "The product began as a Gen Z–focused food delivery platform. We designed a mobile app for individual users and a web-based interface for catering. At this stage, the product was primarily consumer-focused, with catering as a secondary feature.",
  },
  {
    number: "Phase 02",
    title: "Catering as the core",
    label: "The shift",
    body: "Operational data revealed individual orders had low frequency and high delivery cost per order, while catering orders showed higher value and consistency. We shifted focus toward serving student societies and large group events — moving from on-demand to planned consumption.",
  },
  {
    number: "Phase 03",
    title: "Corporate system",
    label: "B2B2C",
    body: "Building on catering, we expanded into corporate services. Companies subscribe, managers control budgets, and employees place orders within shared constraints. One order — multiple realities: a personal lunch choice, a production queue, a multi-stop pickup route, a budget-controlled event.",
  },
];

const roles = [
  {
    name: "Employee",
    goal: "Speed and ease",
    detail: "A personal lunch choice. Wants a smooth, fast ordering experience that doesn't feel corporate or constrained — discover food, browse a market, check out quickly.",
    pill: "Mobile app · primary consumer experience",
  },
  {
    name: "Manager",
    goal: "Budget control",
    detail: "Needs to monitor team spending, set individual employee allowances, and approve or restrict ordering behaviour. Oversight is the primary job — not ordering.",
    pill: "B2B portal · team budget & spend tracking",
  },
  {
    name: "Merchant",
    goal: "Operational feasibility",
    detail: "A production queue. Needs to manage menu availability in real time, track incoming orders by ticket, and understand revenue. Fast-paced and time-sensitive — especially at peak lunch hours.",
    pill: "Tablet portal · order & menu management",
  },
  {
    name: "Rider",
    goal: "Efficiency and clarity",
    detail: "A multi-stop pickup route. The mixed-basket model means a single order may include items from two or three stalls — the rider interface had to communicate this with minimum cognitive load.",
    pill: "Mobile app · task execution · low cognitive load",
    wide: true,
  },
  {
    name: "Company",
    goal: "Cost structure",
    detail: "Operates through the Manager account. The company sets the budget framework; the manager executes it. A separate portal would have added onboarding friction with no meaningful UX gain.",
    pill: "No independent portal — managed through Manager",
    wide: true,
  },
];

const decisions = [
  {
    number: "01",
    title: "Soft control instead of rigid enforcement",
    tension: "Employees want freedom. Managers need control.",
    explored: ["Hard limits", "Approval flows", "Soft constraints (final decision)"],
    body: "We explored hard limits that would block checkout and approval flows that required manager sign-off. Both interrupted the employee's experience at the wrong moment.",
    decision: "Budget is visible throughout the ordering flow and highlighted when approaching the limit — but never blocks checkout. This balanced autonomy and control without placing cognitive burden on either role.",
  },
  {
    number: "02",
    title: "One system, multiple views",
    tension: "The same order means something different to everyone.",
    body: "The platform's mixed-basket model — ordering from multiple stalls in one delivery — creates three separate cognitive challenges simultaneously: the employee sees a meal, the merchant sees a production ticket, the rider sees a pickup sequence.",
    decision: "Instead of simplifying the system, we built a shared underlying data model with multiple role-specific representations. Each role sees only what matters to them. The data is shared; the view is not.",
  },
  {
    number: "03",
    title: "Removing a product that shouldn't exist",
    tension: "Complexity from building rather than not building.",
    body: "Early in the project we considered a dedicated company admin portal. After mapping actual tasks against the manager's workflow, we found near-total overlap in functionality.",
    decision: "Company functions were integrated into the manager role with elevated permission flags. The most impactful decision was choosing not to build something — reducing complexity and improving onboarding.",
  },
];

const merchantPrinciples = [
  { title: "One screen, one task",      body: "Merchants see only the current orders for their stall, displayed as large ticket cards. No navigation, no settings — just what needs to be cooked right now." },
  { title: "No typing required",        body: "Accepting an order, marking it as ready, and flagging an issue are all single taps. Every interaction is binary: confirm or flag." },
  { title: "Loud, unmissable alerts",   body: "New orders trigger a full-screen alert with audio. Merchants are cooking and can't watch a screen — the notification had to be impossible to miss." },
  { title: "Error recovery over precision", body: "If a merchant accidentally dismisses an order, they can recover it within 60 seconds. The UI needed to be robust to human error." },
];

const outcomes = [
  { stat: "1,000+",  label: "Orders in the first week" },
  { stat: "2×",      label: "Merchant count within the first week" },
  { stat: "2×",      label: "Weekly orders after optimisation" },
  { stat: "~£7,000", label: "GMV in the first 3 months" },
];

// ── Sub-components ─────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="font-futura-light text-[12px] uppercase tracking-[0.18em] text-black/45 mb-[8px]">
      {children}
    </p>
  );
}

function SectionTitle({ children }: { children: string }) {
  return (
    <h2 className="font-inria-serif text-[clamp(1.8rem,2.8vw,3rem)] leading-[1.05] tracking-tight mb-[20px] text-black">
      {children}
    </h2>
  );
}

function DecisionBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-black pl-5 py-1 my-6 bg-black/[0.02]">
      <p className="font-futura-light text-[11px] uppercase tracking-[0.18em] text-black/45 mb-2">Design decision</p>
      <p className="font-futura-light text-[15px] leading-relaxed text-black">{children}</p>
    </div>
  );
}

function InsightBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border border-black/20 p-5 md:p-6 my-4 flex flex-col md:flex-row gap-2 md:gap-5">
      <span className="font-futura-light text-[11px] uppercase tracking-[0.18em] text-black/45 whitespace-nowrap md:mt-[2px]">{label}</span>
      <p className="font-futura-light text-[14px] md:text-[15px] leading-relaxed text-black">{children}</p>
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
                  fontSize:      "10px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontFamily:    "var(--font-futura-light)",
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
          backgroundImage:    "url(/sfbg.png)",
          backgroundSize:     "cover",
          backgroundPosition: typeof window !== "undefined" && window.innerWidth < 768
            ? `center ${scrollY * 0.1}px`
            : `center ${scrollY * 0.22}px`,
          backgroundRepeat:   "no-repeat",
        }}
      >
        {/* Header scrolls away with hero */}
        <Header />

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
            Multi-role food delivery&nbsp;&nbsp;Platform design&nbsp;&nbsp;|&nbsp;&nbsp;0-1
          </h1>

          {/* Chips — filled with bg-my-bg */}
          <div className="flex flex-wrap gap-2 mt-[20px] md:mt-[32px]">
            {heroTags.map((t) => (
              <span
                key={t}
                className="inline-flex rounded-full border border-black px-3 py-1 font-futura-medium text-[10px] uppercase tracking-[0.12em] text-black bg-my-bg"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Down arrow — visible only at scroll=0, hides the moment user scrolls */}
        <button
          onClick={() => {
            window.scrollTo({ top: window.innerHeight - titleH, behavior: "smooth" });
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
        className="flex flex-col overflow-hidden"
        style={titleH > 0 && window.innerWidth >= 768
          ? { height: `calc(100svh - ${titleH}px)` }
          : undefined}
      >
        <div className="flex flex-col md:grid md:grid-cols-2 md:flex-1 md:min-h-0 md:h-full px-[24px] md:px-[96px]">

          {/* Left — image + intro paragraph, mobile: natural flow, desktop: column */}
          <div className="flex flex-col">
            <img
              src="/sfintro.png"
              alt="SwiftFood app on device mockups"
              className="w-full object-contain object-top"
              style={{ display: "block" }}
            />
            <div className="pt-[10px] pb-[24px]">
              <p className="font-futura-light text-[14px] md:text-[15px] leading-relaxed text-black">
                We built a food delivery platform targeting the London market, starting from individual
                consumers and evolving into{" "}
                <a href="https://swiftfood.uk/" target="_blank" rel="noopener noreferrer" className="text-brand">
                  catering
                </a>{" "}
                and{" "}
                <a href="https://swiftfood.co.uk/RestaurantCatalogue" target="_blank" rel="noopener noreferrer" className="text-brand">
                  corporate
                </a>{" "}
                use cases.
              </p>
            </div>
          </div>

          {/* Right — project details */}
          <div className="flex flex-col justify-center py-[28px] md:py-[40px] md:pl-[48px]">
            {introDetails.map((item) => (
              <div
                key={item.label}
                className="grid grid-cols-[110px_1fr] md:grid-cols-[150px_1fr] gap-x-[16px] md:gap-x-[20px] py-[12px] md:py-[20px] border-b border-black/12 last:border-b-0 items-start"
              >
                <p className="font-futura-light text-[11px] md:text-[12px] text-black/40 leading-relaxed pt-[2px]">
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
      <div ref={caseStudyRef} className="relative border-t border-black">

        <SidebarNav
          active={activeSection}
          visible={showSidebar}
          onNavigate={scrollToSection}
        />

        <div className="w-full px-[24px] md:px-[192px] pb-[80px]">

          {/* 01 — Context */}
          <section id="s-context" className="pt-[40px] md:pt-[56px] pb-[40px] md:pb-[56px] border-b border-black/15">
            <SectionLabel>01 — Context</SectionLabel>
            <SectionTitle>The platform and the system challenge</SectionTitle>
            <p className="font-futura-light text-[15px] leading-relaxed text-black mb-4">
              As the product evolved, one key complexity emerged:{" "}
              <strong className="font-futura-medium">one order — multiple realities.</strong> The same
              order is interpreted differently by each role: an employee sees a personal lunch choice; a
              merchant sees a production queue; a rider sees a multi-stop pickup route; a manager sees a
              budget-controlled event; a company sees a cost structure. This was not a UI problem — it
              was a system design problem.
            </p>
            <div className="border border-black/20 p-6">
              <p className="font-futura-light text-[11px] uppercase tracking-[0.18em] text-black/45 mb-3">My role</p>
              <h3 className="font-futura-medium text-[15px] mb-3 text-black">Founding Product Designer — 0→1</h3>
              <p className="font-futura-light text-[14px] leading-relaxed text-black mb-4">
                Working directly with the CEO and CMO to define the product from 0→1. My role was not
                just designing interfaces — it was defining how the system works.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-black/10 pt-4">
                {[
                  "Defining the overall product and system architecture",
                  "Translating business evolution into scalable product structures",
                  "Designing cross-role interaction logic",
                  "Leading UX across all platforms — mobile + desktop, multiple roles",
                  "Bridging business, operations, and engineering through design",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 py-1">
                    <span className="font-futura-light text-[11px] text-black/30 mt-[3px]">—</span>
                    <p className="font-futura-light text-[13.5px] leading-relaxed text-black">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 02 — Product Evolution */}
          <section id="s-evolution" className="pt-[40px] md:pt-[56px] pb-[40px] md:pb-[56px] border-b border-black/15">
            <SectionLabel>02 — Product Evolution</SectionLabel>
            <SectionTitle>From individual to group to organisation</SectionTitle>
            <p className="font-futura-light text-[15px] leading-relaxed text-black mb-8">
              The product didn't start as a B2B2C platform. Each phase of business evolution redefined
              what the product was — and required a complete rethinking of the system architecture.
            </p>
            <div className="space-y-0 border border-black/20">
              {phases.map((phase, i) => (
                <div
                  key={phase.number}
                  className={`p-6 flex flex-col md:flex-row gap-6 ${i < phases.length - 1 ? "border-b border-black/10" : ""}`}
                >
                  <div className="md:w-[180px] shrink-0">
                    <p className="font-futura-light text-[11px] uppercase tracking-[0.18em] text-black/45 mb-1">{phase.number}</p>
                    <h3 className="font-futura-medium text-[15px] text-black mb-1">{phase.title}</h3>
                    <span className="font-futura-light text-[10px] uppercase tracking-[0.1em] border border-black/20 px-2 py-1 text-black/45 inline-block">{phase.label}</span>
                  </div>
                  <p className="font-futura-light text-[14px] leading-relaxed text-black flex-1">{phase.body}</p>
                </div>
              ))}
            </div>
            <InsightBlock label="The shift">
              After launch, operational data revealed individual orders had low frequency and high
              delivery cost. Catering orders showed higher value and consistency. Catering was not just
              a feature — it was the first signal of a viable model.
            </InsightBlock>
            <DecisionBlock>
              I translated each stage of business evolution into product structure — redefining the
              system architecture at each phase, designing how orders scale across contexts, and
              establishing interaction logic across roles. The design problem shifted from designing for
              a user to designing for a system of users.
            </DecisionBlock>
          </section>

          {/* 03 — Core Challenge */}
          <section id="s-challenge" className="pt-[40px] md:pt-[56px] pb-[40px] md:pb-[56px] border-b border-black/15">
            <SectionLabel>03 — The Core Challenge</SectionLabel>
            <SectionTitle>Multiple roles, conflicting goals</SectionTitle>
            <p className="font-futura-light text-[15px] leading-relaxed text-black mb-8">
              Each role optimises for something different. Improving one often degrades another. Instead
              of designing separate interfaces, the problem was reframed as:{" "}
              <em className="font-inria-serif">how can one system support multiple truths simultaneously?</em>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-black/20">
              {roles.map((role) => (
                <div
                  key={role.name}
                  className={`border-b border-r border-black/10 p-6 ${role.wide ? "md:col-span-2" : ""}`}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <p className="font-futura-light text-[11px] uppercase tracking-[0.18em] text-black/45">{role.name}</p>
                    <span className="font-futura-light text-[10px] uppercase tracking-[0.1em] border border-black/15 px-2 py-1 text-black/35 shrink-0">Goal: {role.goal}</span>
                  </div>
                  <p className="font-futura-light text-[13.5px] leading-relaxed text-black mb-4">{role.detail}</p>
                  <span className="font-futura-light text-[10px] uppercase tracking-[0.1em] border border-black/20 px-3 py-1 text-black/45">{role.pill}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 04 — Key Design Decisions */}
          <section id="s-decisions" className="pt-[40px] md:pt-[56px] pb-[40px] md:pb-[56px] border-b border-black/15">
            <SectionLabel>04 — Key Design Decisions</SectionLabel>
            <SectionTitle>Where the real decisions lived</SectionTitle>
            <p className="font-futura-light text-[15px] leading-relaxed text-black mb-8">
              Multi-role systems aren't hard because they're large — they're hard because optimising for
              one user often compromises another. These three decisions defined how the system held together.
            </p>
            <div className="space-y-6">
              {decisions.map((d) => (
                <div key={d.number} className="border border-black/20 p-6">
                  <p className="font-futura-light text-[11px] uppercase tracking-[0.18em] text-black/45 mb-2">Decision {d.number}</p>
                  <h3 className="font-futura-medium text-[15px] mb-2 text-black">{d.title}</h3>
                  <p className="font-futura-light text-[13px] uppercase tracking-[0.1em] text-black/45 mb-4 italic">{d.tension}</p>
                  {d.explored && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {d.explored.map((opt) => (
                        <span key={opt} className="font-futura-light text-[10px] uppercase tracking-[0.1em] border border-black/15 px-2 py-1 text-black/45">{opt}</span>
                      ))}
                    </div>
                  )}
                  <p className="font-futura-light text-[14px] leading-relaxed text-black mb-2">{d.body}</p>
                  <DecisionBlock>{d.decision}</DecisionBlock>
                </div>
              ))}
            </div>
          </section>

          {/* 05 — Designing for Operations */}
          <section id="s-operations" className="pt-[40px] md:pt-[56px] pb-[40px] md:pb-[56px] border-b border-black/15">
            <SectionLabel>05 — Designing for Operations</SectionLabel>
            <SectionTitle>Merchant experience — designing for reality</SectionTitle>
            <p className="font-futura-light text-[15px] leading-relaxed text-black mb-6">
              Merchants operate in low-tech environments, high-pressure workflows, and with limited
              staffing. We designed for reality, not ideal workflows.
            </p>
            <div className="border border-black/20 p-6 mb-8">
              <p className="font-futura-light text-[11px] uppercase tracking-[0.18em] text-black/45 mb-2">The constraint</p>
              <h3 className="font-futura-medium text-[15px] mb-3 text-black">Street food prep is slow. Delivery timing is unforgiving.</h3>
              <p className="font-futura-light text-[15px] leading-relaxed text-black">
                Unlike restaurant kitchens, a street food stall has one or two people, limited equipment,
                and no mise en place. On-demand ordering would require merchants to be ready to cook at
                any moment — operationally impossible.
              </p>
            </div>

            <div className="mb-8">
              <SectionLabel>The ordering window model</SectionLabel>
              <p className="font-futura-light text-[14px] leading-relaxed text-black mb-10">
                Instead of on-demand ordering, we introduced fixed time windows. This enabled batch
                preparation, lower stress, and more reliable delivery — a service design decision, not a
                UX decision.
              </p>
              {/* Desktop: horizontal timeline. Mobile: vertical list. */}
              <div className="hidden md:block relative mt-4 mb-20">
                <div className="relative h-[3px] bg-black/10">
                  {[
                    { left: "0%",  width: "22%", opacity: "opacity-20" },
                    { left: "22%", width: "20%", opacity: "opacity-80" },
                    { left: "42%", width: "8%",  opacity: "opacity-10" },
                    { left: "50%", width: "30%", opacity: "opacity-40" },
                    { left: "80%", width: "20%", opacity: "opacity-10" },
                  ].map((seg, i) => (
                    <div key={i} className={`absolute top-0 h-full bg-black ${seg.opacity}`} style={{ left: seg.left, width: seg.width }} />
                  ))}
                  {[
                    { left: "22%", label: "Order window opens", time: "11:00" },
                    { left: "42%", label: "Window closes",      time: "11:30" },
                    { left: "50%", label: "Rider dispatched",   time: "11:38" },
                    { left: "80%", label: "Delivered",          time: "12:00" },
                  ].map((dot) => (
                    <div key={dot.left} className="absolute" style={{ left: dot.left, transform: "translateX(-50%)" }}>
                      <div className="w-3 h-3 rounded-full bg-black border-2 border-my-bg -mt-[5px]" />
                      <div className="absolute top-6 text-center" style={{ transform: "translateX(-50%)", whiteSpace: "nowrap" }}>
                        <p className="font-futura-light text-[10px] uppercase tracking-[0.1em] text-black/45">{dot.label}</p>
                        <p className="font-futura-medium text-[13px] text-black">{dot.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Mobile: vertical steps */}
              <div className="md:hidden flex flex-col gap-0 border-l border-black/20 ml-2 mb-8">
                {[
                  { label: "Order window opens", time: "11:00" },
                  { label: "Window closes",      time: "11:30" },
                  { label: "Rider dispatched",   time: "11:38" },
                  { label: "Delivered",          time: "12:00" },
                ].map((dot) => (
                  <div key={dot.time} className="flex items-start gap-4 pl-5 py-3 relative">
                    <div className="absolute left-[-5px] top-[18px] w-[9px] h-[9px] rounded-full bg-black border-2 border-my-bg" />
                    <div>
                      <p className="font-futura-light text-[10px] uppercase tracking-[0.1em] text-black/45">{dot.label}</p>
                      <p className="font-futura-medium text-[14px] text-black">{dot.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <SectionLabel>Interaction principles</SectionLabel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-black/20 mb-6">
              {merchantPrinciples.map((p) => (
                <div key={p.title} className="border-b border-r border-black/10 p-6">
                  <p className="font-futura-light text-[11px] uppercase tracking-[0.18em] text-black/45 mb-2">Principle</p>
                  <h3 className="font-futura-medium text-[15px] mb-3 text-black">{p.title}</h3>
                  <p className="font-futura-light text-[13.5px] leading-relaxed text-black">{p.body}</p>
                </div>
              ))}
            </div>
            <img
              src="/swiftfood.png"
              alt="Merchant tablet UI"
              className="w-full object-cover my-8"
              style={{ aspectRatio: "16/9", objectPosition: "center 20%" }}
            />
          </section>

          {/* 06 — Smart Access Control */}
          <section id="s-access" className="pt-[40px] md:pt-[56px] pb-[40px] md:pb-[56px] border-b border-black/15">
            <SectionLabel>06 — Smart Access Control</SectionLabel>
            <SectionTitle>Solving hybrid work with clock-in integration</SectionTitle>
            <p className="font-futura-light text-[15px] leading-relaxed text-black mb-6">
              London's hybrid work culture created a specific UX problem: companies pay for employee
              lunches on days people are in the office. Managing this manually was an unsustainable
              burden on managers.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border border-black/20 mb-6">
              {[
                { eyebrow: "Daily · Automatic", title: "Clock-in sync",    body: "Company's HR / attendance system syncs with the platform each morning." },
                { eyebrow: "Result · In office",  title: "Access granted",  body: "In-office employees automatically unlock the ordering window. No manager action needed." },
                { eyebrow: "Result · Remote",     title: "Access withheld", body: "Remote or absent employees see the app but cannot order. No manual intervention required." },
              ].map((c) => (
                <div key={c.title} className="border-b border-r border-black/10 p-6 text-center">
                  <p className="font-futura-light text-[10px] uppercase tracking-[0.14em] text-black/45 mb-3">{c.eyebrow}</p>
                  <h3 className="font-futura-medium text-[15px] mb-2 text-black">{c.title}</h3>
                  <p className="font-futura-light text-[13px] leading-relaxed text-black">{c.body}</p>
                </div>
              ))}
            </div>
            <InsightBlock label="→ Edge case">
              Employees who come into the office unexpectedly, or whose clock-in fails to sync, needed a
              way out. The solution was a self-serve override — employees can manually mark themselves as
              "in office today," which triggers a one-tap manager notification (not approval — just visibility).
            </InsightBlock>
            <DecisionBlock>
              We made the override a notification, not an approval flow. Requiring manager sign-off
              would shift the cognitive burden back to the manager — defeating the purpose of
              automation. Trust is the default; the manager can audit after the fact if needed.
            </DecisionBlock>
            <img
              src="/swiftfood.png"
              alt="Employee app — locked state + override screen"
              className="w-full object-cover my-8"
              style={{ aspectRatio: "16/9", objectPosition: "center 60%" }}
            />
          </section>

          {/* 07 — Outcomes */}
          <section id="s-outcomes" className="pt-[40px] md:pt-[56px] pb-[40px] md:pb-[56px] border-b border-black/15">
            <SectionLabel>07 — Outcomes</SectionLabel>
            <SectionTitle>Results after launch</SectionTitle>
            <p className="font-futura-light text-[15px] leading-relaxed text-black mb-8">
              The platform launched in London. Key metrics from the first three months of operation.
            </p>
            <div className="grid grid-cols-2 gap-0 border border-black/20 mb-8">
              {outcomes.map((o) => (
                <div key={o.label} className="border-b border-r border-black/10 p-6 text-center">
                  <p className="font-inria-serif text-[clamp(2rem,3.5vw,3rem)] leading-none tracking-tight text-black mb-2">{o.stat}</p>
                  <p className="font-futura-light text-[11px] uppercase tracking-[0.12em] text-black/45">{o.label}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-black/20 mb-6">
              <div className="border-r border-black/10 p-6">
                <p className="font-futura-light text-[11px] uppercase tracking-[0.16em] text-black/45 mb-3">What this demonstrates</p>
                <ul className="space-y-2">
                  {[
                    "A single system can support multiple roles without fragmentation",
                    "System-level decisions outperform UI optimisation",
                    "Product evolution defines design complexity",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="font-futura-light text-[11px] text-black/30 mt-[3px]">—</span>
                      <p className="font-futura-light text-[13.5px] leading-relaxed text-black">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6">
                <p className="font-futura-light text-[11px] uppercase tracking-[0.16em] text-black/45 mb-3">My contribution</p>
                <ul className="space-y-2">
                  {[
                    "Defined multi-role system architecture",
                    "Led product structuring from 0→1",
                    "Translated business evolution into product logic",
                    "Designed cross-role interaction systems",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="font-futura-light text-[11px] text-black/30 mt-[3px]">—</span>
                      <p className="font-futura-light text-[13.5px] leading-relaxed text-black">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <InsightBlock label="→ Reflection">
              Design was positioned as a product-defining function — not a delivery service for
              pre-specified requirements. The most valuable decisions were structural ones made before
              any interface was drawn.
            </InsightBlock>
          </section>

          {/* Back link */}
          <div className="pt-[48px]">
            <Link
              to="/projects"
              className="font-futura-light text-[12px] uppercase tracking-[0.18em] text-black/45 hover:text-black transition-colors inline-flex items-center gap-2"
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
