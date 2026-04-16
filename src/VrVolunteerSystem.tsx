import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./components/Header";

// ── Nav sections ──────────────────────────────────────────────────────────────

const navSections = [
  { id: "s-overview",    label: "01 — Overview" },
  { id: "s-research",    label: "02 — Research" },
  { id: "s-scenario",    label: "03 — Scenario" },
  { id: "s-issue",       label: "04 — Issue Analysis" },
  { id: "s-system",      label: "05 — System Design" },
  { id: "s-hardware",    label: "06 — AR Hardware" },
  { id: "s-vision",      label: "07 — AR Vision" },
  { id: "s-reflection",  label: "08 — Reflection" },
];

// ── Data ──────────────────────────────────────────────────────────────────────

const heroTags = ["Speculative Design", "AR UX", "Futures Research", "Disaster Response", "University Project"];

const introDetails: { label: string; value: string | React.ReactNode }[] = [
  {
    label: "Overview:",
    value: "A speculative design project imagining how AR glasses could coordinate volunteer response during catastrophic London Thames flooding in 2070.",
  },
  {
    label: "The core concept:",
    value: "Rather than the fragmented, six-step volunteer pipeline exposed by the 2021 London floods, OCEANUS condenses mobilisation into a streamlined AR-enabled flow — volunteers active in under two minutes.",
  },
  { label: "Duration:",  value: "University Project" },
  { label: "Tools:",     value: "Figma, Rhino, PS, PR" },
  { label: "My Role:",   value: "UX Research, Speculative Design, AR Interface" },
];

const researchStats = [
  { stat: "2070",  label: "Scenario year — Thames surge event" },
  { stat: "28",    label: "Historical sea-level events mapped" },
  { stat: "12/28", label: "Events directly associated with floods" },
];

const problems = [
  { num: "Problem 01", title: "Failure to assess severity",    body: "Thames Water were unable to accurately estimate the severity of the storm, so did not trigger normal incident processes or proactively contact elected representatives." },
  { num: "Problem 02", title: "Lack of on-ground staff",       body: '"This overwhelmed the number of people on duty in our Customer Contact Centre, leading to unacceptable waiting times." Teams were widely and thinly spread across the area.' },
  { num: "Problem 03", title: "Communication breakdown",       body: "No further help beyond what Thames Water were already providing was requested. The London Resilience Group offered support — but it was never taken up." },
];

const designPoints = [
  { num: "DP 01", title: "Real-time task assignment",          body: "Fragmented communication was the core failure in 2021. OCEANUS uses a central AI dispatch system to push missions directly to volunteers' AR field of view — no phone calls, no waiting." },
  { num: "DP 02", title: "Step-by-step contextual guidance",   body: "Untrained volunteers cannot perform medical or technical tasks reliably. The AR overlay provides illustrated, voice-guided instructions overlaid directly onto the real environment." },
  { num: "DP 03", title: "Identity and role signalling",       body: "Citizens could not tell who was a volunteer or what role they held. The external display on the glasses broadcasts the volunteer's current mission to people around them." },
  { num: "DP 04", title: "Minimal onboarding friction",        body: "Training was the biggest bottleneck in the current system. OCEANUS glasses are designed for three-step setup: get glasses → fixed to head → identification scan. Active in under two minutes." },
];

const arFlowRow1 = [
  { src: "oceanus-arflow-setup.webp",      caption: "01 — Scanning & Setup" },
  { src: "oceanus-arflow-dispatch.webp",   caption: "02 — Mission Dispatched" },
  { src: "oceanus-arflow-navigation.webp", caption: "03 — AR Navigation" },
  { src: "oceanus-arflow-arrive.webp",     caption: "04 — Arrive at Scene" },
];

const arFlowRow2 = [
  { src: "oceanus-arflow-guidance.webp",    caption: "05 — Guidance Overlay" },
  { src: "oceanus-arflow-immobilize.webp",  caption: "06 — Immobilize Instruction" },
  { src: "oceanus-arflow-complete.webp",    caption: "07 — Mission Complete" },
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

function SubDivider() {
  return <div className="border-t border-black/[0.07] mt-[40px] mb-[8px]" />;
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

export default function VrVolunteerSystem() {
  const [scrollY, setScrollY]         = useState(0);
  const [activeSection, setActive]    = useState(navSections[0].id);
  const [showSidebar, setShowSidebar] = useState(false);
  const [titleH, setTitleH]           = useState(0);
  const caseStudyRef                  = useRef<HTMLDivElement>(null);
  const titleBlockRef                 = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
          backgroundImage:    "url(/volunteerhero.webp)",
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
            AR Coordination System for Future Disaster Response
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
              src="/oceanus-intro.webp"
              alt="OCEANUS AR glasses render"
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

          {/* 01 — Overview */}
          <section id="s-overview" className="pb-[40px] md:pb-[56px] border-b border-black/15">
            <div className="border-t border-black/15 mb-[8px]" />
            <SectionLabel>01 — Overview</SectionLabel>

            {/* Video — full width */}
            <div className="w-full aspect-video bg-[#1A1A1A] overflow-hidden mb-[48px]">
              <iframe
                className="w-full h-full border-0 block"
                src="https://www.youtube.com/embed/wKhigvu9ygY"
                title="OCEANUS volunteer experience"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <SubDivider />

            {/* Context — 4-col grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[48px]">
              <div>
                <p className="type-eyebrow mb-[16px]">The question</p>
                <p className="type-body">What if the Thames floods London in 2070?</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2 flex flex-col gap-[16px]">
                <p className="type-body-key">
                  OCEANUS is a future-facing AR coordination system designed for civilian volunteers
                  responding to a major London flood event between 2070–2080.
                </p>
                <p className="type-body">
                  Built on speculative design methodology, the project starts from real climate data and
                  models a plausible future in which volunteer organisations become the backbone of urban
                  resilience.
                </p>
                <blockquote className="border-l-2 border-brand pl-[16px] py-[2px] font-inria-serif text-[clamp(15px,1.2vw,18px)] italic text-black/70 leading-relaxed">
                  "In 2070, when sea level rise is out of our control, we will be helpless in the face of
                  catastrophic floods. So what can be done to prevent disaster?"
                </blockquote>
              </div>
            </div>

            <SubDivider />

            {/* Volunteer system comparison */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px]">
              <div>
                <p className="type-eyebrow mb-[16px]">The system gap</p>
                <p className="type-body">
                  OCEANUS reimagines the volunteer pipeline from a fragmented six-step process into a
                  streamlined AR-enabled flow.
                </p>
              </div>
            </div>
            <div className="mt-[24px] flex flex-col gap-[8px]">
              <img src="/oceanus-system-comparison.webp" alt="Current vs future volunteer system" className="w-full block" />
              <p className="font-futura-heavy text-[11px] opacity-30 text-black">
                Current six-step pipeline vs. OCEANUS three-step AR-enabled flow
              </p>
            </div>
          </section>

          {/* 02 — Research */}
          <section id="s-research" className="pt-[40px] md:pt-[56px] pb-[40px] md:pb-[56px] border-b border-black/15">
            <SectionLabel>02 — Sea Level Rising Research</SectionLabel>

            {/* Framing — 4-col */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[48px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Understanding the scale</p>
                <p className="type-body">Grounding speculative design in real climate data.</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2 flex flex-col gap-[16px]">
                <p className="type-body-key">
                  We began with a comprehensive analysis of sea level rise: its causes, historical
                  trajectory, and projected futures. Using NASA and IPCC datasets, we mapped 28 key
                  historical events on a global timeline — 12 of which were directly flood-related.
                </p>
                <p className="type-body">
                  River avulsions — catastrophic floods triggered when a river charts a new path to the
                  sea — are projected to increase significantly along the Thames as sea levels accelerate.
                  The rate of extreme water-level events is already accelerating.
                </p>
                <blockquote className="border-l-2 border-brand pl-[16px] py-[2px] font-inria-serif text-[clamp(15px,1.2vw,18px)] italic text-black/70 leading-relaxed">
                  "Continuous monitoring of this change is vital to safeguard London and the Thames
                  Estuary's continued existence as one of the world's most important coastal regions."
                </blockquote>
              </div>
            </div>

            <SubDivider />

            {/* Stats — 4-col */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[48px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Key data points</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2">
                <div className="grid grid-cols-3 gap-0 border border-black/20">
                  {researchStats.map((s) => (
                    <div key={s.stat} className="border-r border-black/10 last:border-r-0 p-[20px] text-center">
                      <p className="font-inria-serif text-[clamp(1.8rem,3vw,2.8rem)] leading-none tracking-tight text-brand mb-[8px]">{s.stat}</p>
                      <p className="type-eyebrow">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <SubDivider />

            {/* Research images */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Analysis materials</p>
              </div>
            </div>
            <div className="mt-[24px] flex flex-col gap-[16px]">
              <div>
                <img src="/oceanus-research-analysis-1.webp" alt="Sea level rising analysis" className="w-full block" />
                <img src="/oceanus-research-analysis-2.webp" alt="Sea level rising analysis" className="w-full block" />
              </div>
              <img src="/oceanus-research-thames.webp" alt="London Thames flood history and data" className="w-full block" />
              <p className="font-futura-heavy text-[11px] opacity-30 text-black">London Thames flood history and data visualisation</p>
            </div>
          </section>

          {/* 03 — Scenario */}
          <section id="s-scenario" className="pt-[40px] md:pt-[56px] pb-[40px] md:pb-[56px] border-b border-black/15">
            <SectionLabel>03 — Scenario &amp; Futures Cone</SectionLabel>

            {/* Framing — 4-col */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[48px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Mapping probable and preferable futures</p>
                <p className="type-body">Futures cone methodology applied to London 2070–2080.</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2 flex flex-col gap-[16px]">
                <p className="type-body-key">
                  Using the futures cone methodology, we mapped economic, political, technological,
                  social, and ecological dimensions across probable, possible, and preferable futures for
                  London 2070–2080.
                </p>
                <p className="type-body">
                  Our scenario: during a River Thames surge, London's public organisations — supported by
                  AR-equipped volunteers — coordinate to save coastal areas from disaster.
                </p>
              </div>
            </div>

            <SubDivider />

            {/* Probable issues — 4-col */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[48px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Probable future issues identified</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2">
                <div className="border border-black/20">
                  {[
                    "Low surface permeability along the river",
                    "Huge social human input, waste of resources",
                    "Rapid AI replacing positions in city management",
                    "Multiple organisations unable to communicate in emergencies",
                    "Rising reliance on smart city tech creates single-point failures",
                  ].map((item, i) => (
                    <div key={i} className="border-b border-black/10 last:border-b-0 p-[16px] flex items-start gap-[12px]">
                      <span className="type-eyebrow shrink-0 mt-[2px]">{String(i + 1).padStart(2, "0")}</span>
                      <p className="type-body">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <SubDivider />

            {/* Scenario matrix image */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Futures cone matrix</p>
              </div>
            </div>
            <div className="mt-[24px] flex flex-col gap-[8px]">
              <img src="/oceanus-scenario-matrix.webp" alt="Futures cone scenario matrix" className="w-full block" />
              <p className="font-futura-heavy text-[11px] opacity-30 text-black">Futures cone scenario matrix — London 2070–2080</p>
            </div>
          </section>

          {/* 04 — Issue Analysis */}
          <section id="s-issue" className="pt-[40px] md:pt-[56px] pb-[40px] md:pb-[56px] border-b border-black/15">
            <SectionLabel>04 — Issue Analysis</SectionLabel>

            {/* Framing — 4-col */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[48px]">
              <div>
                <p className="type-eyebrow mb-[16px]">The 2021 London floods revealed the cracks</p>
                <p className="type-body">Real incident data grounding the speculative scenario.</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2">
                <p className="type-body-key">
                  The 2021 floods exposed complex, fragmented management of flood risk and a critical
                  lack of coordinated response across multiple organisations. Thames Water, the Met
                  Office, NHS, Fire Brigade, and the London Resilience Group all operated in silos —
                  leading to confusion and ineffective flood mitigation.
                </p>
              </div>
            </div>

            <SubDivider />

            {/* Problem cards — 4-col */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[48px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Three failure modes</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2">
                <div className="border border-black/20">
                  {problems.map((p) => (
                    <div key={p.num} className="border-b border-black/10 last:border-b-0 p-[20px]">
                      <p className="type-eyebrow mb-[8px]">{p.num}</p>
                      <p className="type-subhead mb-[10px]">{p.title}</p>
                      <p className="type-body">{p.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <SubDivider />

            {/* Stakeholder map */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Stakeholder analysis</p>
              </div>
            </div>
            <div className="mt-[24px] flex flex-col gap-[8px]">
              <img src="/oceanus-issue-stakeholders.webp" alt="Stakeholder analysis diagram" className="w-full block" />
              <p className="font-futura-heavy text-[11px] opacity-30 text-black">Stakeholder relationship map — 2021 flood incident</p>
            </div>
          </section>

          {/* 05 — System Design */}
          <section id="s-system" className="pt-[40px] md:pt-[56px] pb-[40px] md:pb-[56px] border-b border-black/15">
            <SectionLabel>05 — OCEANUS System Design</SectionLabel>

            {/* Framing — 4-col */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[48px]">
              <div>
                <p className="type-eyebrow mb-[16px]">From fragmented response to coordinated action</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2 flex flex-col gap-[16px]">
                <p className="type-body-key">
                  OCEANUS reimagines the volunteer pipeline. Rather than the current six-step process —
                  assessment, mobilisation, training, dispatch, evaluation, rehabilitation — the system
                  condenses this into a streamlined AR-enabled flow.
                </p>
                <p className="type-body">
                  Volunteers receive AR glasses, are taught basic operation in minutes, and are
                  immediately assigned to specialist roles: Traffic Services, Community Services, Animal
                  Services, or Medical Services.
                </p>
              </div>
            </div>

            <SubDivider />

            {/* Design points — 4-col */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[48px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Design rationale</p>
                <p className="type-body">From insights to design points.</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2">
                <div className="border border-black/20">
                  {designPoints.map((dp) => (
                    <div key={dp.num} className="border-b border-black/10 last:border-b-0 p-[20px] flex gap-[16px]">
                      <span className="type-eyebrow shrink-0 mt-[2px]">{dp.num}</span>
                      <div>
                        <p className="type-subhead mb-[8px]">{dp.title}</p>
                        <p className="type-body">{dp.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <SubDivider />

            <DecisionBlock>
              The insight that shaped the entire system: volunteers don't fail because they lack courage
              — they fail because they lack coordination and instruction. OCEANUS addresses exactly that gap.
            </DecisionBlock>
          </section>

          {/* 06 — AR Hardware */}
          <section id="s-hardware" className="pt-[40px] md:pt-[56px] pb-[40px] md:pb-[56px] border-b border-black/15">
            <SectionLabel>06 — AR Glasses Hardware</SectionLabel>

            {/* Framing — 4-col */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[48px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Designed for the chaos of disaster response</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2 flex flex-col gap-[16px]">
                <p className="type-body-key">
                  The OCEANUS AR glasses feature two distinct display systems working in parallel. The
                  internal display provides the volunteer with visual guidance, directional audio, and a
                  fixator for extended wear. The external display signals role and status to people around
                  them.
                </p>
              </div>
            </div>

            <SubDivider />

            {/* Display systems — 4-col */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[48px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Dual display system</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2">
                <div className="border border-black/20">
                  {[
                    { role: "Internal",  desc: "Visual aid · Fixator · Auditory aid — provides information and guidance on volunteer tasks" },
                    { role: "External",  desc: "External visual aid · Sensor · Audio reception — shows people who you are and provides guidance when necessary" },
                  ].map((d) => (
                    <div key={d.role} className="border-b border-black/10 last:border-b-0 p-[20px] flex gap-[16px]">
                      <span className="type-eyebrow shrink-0 mt-[2px] uppercase">{d.role}</span>
                      <p className="type-body">{d.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <SubDivider />

            {/* Glasses renders */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Hardware renders</p>
              </div>
            </div>
            <div className="mt-[24px] flex flex-col gap-[16px]">
              <img src="/oceanus-glasses-render-2.webp" alt="AR glasses hardware render" className="w-full block" />
              <img src="/oceanus-glasses-diagram.webp" alt="AR glasses internal and external display system" className="w-full block" />
              <p className="font-futura-heavy text-[11px] opacity-30 text-black">OCEANUS AR glasses — internal and external display system diagram</p>
            </div>
          </section>

          {/* 07 — AR Vision */}
          <section id="s-vision" className="pt-[40px] md:pt-[56px] pb-[40px] md:pb-[56px] border-b border-black/15">
            <SectionLabel>07 — AR Vision — Medical Treatment User Flow</SectionLabel>

            {/* Framing — 4-col */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[48px]">
              <div>
                <p className="type-eyebrow mb-[16px]">What the volunteer sees</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2 flex flex-col gap-[16px]">
                <p className="type-body-key">
                  The full AR user flow demonstrates a Medical Treatment mission. A volunteer is
                  dispatched to assist a girl with a suspected fracture near a subway station.
                </p>
                <p className="type-body">
                  OCEANUS navigates them to the scene, identifies the situation, and provides
                  step-by-step first aid guidance — all within the AR field of view.
                </p>
              </div>
            </div>

            <SubDivider />

            {/* Flow overview image */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[48px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Full flow overview</p>
              </div>
            </div>
            <div className="mt-[24px] flex flex-col gap-[8px]">
              <img src="/oceanus-arflow-overview.webp" alt="AR user flow overview" className="w-full block" />
              <p className="font-futura-heavy text-[11px] opacity-30 text-black">Complete AR user flow — Medical Treatment mission</p>
            </div>

            <SubDivider />

            {/* Screen strips */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[40px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Mission steps 01–04</p>
              </div>
            </div>
            <div className="mt-[24px] flex flex-col gap-[8px]">
              {arFlowRow1.map(({ src, caption }) => (
                <div key={src} className="relative overflow-hidden">
                  <img src={`/${src}`} alt={caption} className="w-full block" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-[10px] pb-[8px] pt-[20px]">
                    <p className="font-futura-medium text-[9px] tracking-[0.1em] uppercase text-white/80">{caption}</p>
                  </div>
                </div>
              ))}
            </div>

            <SubDivider />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Mission steps 05–07</p>
              </div>
            </div>
            <div className="mt-[24px] flex flex-col gap-[8px]">
              {arFlowRow2.map(({ src, caption }) => (
                <div key={src} className="relative overflow-hidden">
                  <img src={`/${src}`} alt={caption} className="w-full block" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-[10px] pb-[8px] pt-[20px]">
                    <p className="font-futura-medium text-[9px] tracking-[0.1em] uppercase text-white/80">{caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 08 — Reflection */}
          <section id="s-reflection" className="pt-[40px] md:pt-[56px] pb-[40px] md:pb-[56px] border-b border-black/15">
            <SectionLabel>08 — Reflection</SectionLabel>

            {/* Framing — 4-col */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[48px]">
              <div>
                <p className="type-eyebrow mb-[16px]">What this project taught us</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2 flex flex-col gap-[16px]">
                <p className="type-body-key">
                  The most challenging part of OCEANUS was not designing the AR interface — it was
                  understanding how a disaster response system actually fails.
                </p>
                <p className="type-body">
                  The 2021 London floods showed that technology alone is insufficient. The real problem
                  was organisational: siloed stakeholders, unclear chains of authority, and no mechanism
                  for rapidly deploying untrained but willing people.
                </p>
                <p className="type-body">
                  Speculative design forced us to hold two things simultaneously: the rigour of real
                  climate data and the imagination of a world 50 years away. The futures cone methodology
                  was essential for keeping our scenario grounded in plausibility rather than fantasy.
                </p>
              </div>
            </div>

            <SubDivider />

            {/* Learnings */}
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
                        "Speculative design works best when anchored in real systemic failures",
                        "Organisational coordination is a harder problem than interface design",
                        "Futures cone methodology keeps scenarios plausible rather than fantastical",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-[10px]">
                          <span className="font-futura-light text-[11px] text-black/30 mt-[3px]">—</span>
                          <p className="type-body">{item}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-[20px]">
                    <p className="type-eyebrow mb-[12px]">If repeated</p>
                    <p className="type-body">
                      Conduct primary research with actual British Red Cross volunteers to pressure-test
                      the system against real operational constraints, and run usability studies with
                      the AR prototype to validate the cognitive load assumptions baked into the
                      interface design.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <SubDivider />

            {/* Key insight */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Reflection</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2">
                <InsightBlock label="→ Key insight">
                  Volunteers don't fail because they lack courage — they fail because they lack
                  coordination and instruction. The design challenge was never the AR interface. It was
                  building the organisational logic that makes the interface meaningful.
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
