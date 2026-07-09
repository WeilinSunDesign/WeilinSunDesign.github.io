import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./components/Header";

// ── Nav sections ──────────────────────────────────────────────────────────────

const navSections = [
  { id: "s-overview",     label: "01 — Overview" },
  { id: "s-research",     label: "02 — Market Research" },
  { id: "s-userinsights", label: "03 — User Insights" },
  { id: "s-concept",      label: "04 — Affective Computing & Colour" },
  { id: "s-publication",  label: "05 — Published Research" },
  { id: "s-system",       label: "06 — Design Overview & System" },
  { id: "s-livinglab",    label: "07 — Living Lab (Beijing)" },
  { id: "s-output",       label: "08 — Applied Output: Signal Light" },
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

const marketStats = [
  { stat: "$40B+",  label: "Forecast value of the global smart-home market" },
  { stat: "81%",    label: "Of buyers more likely to purchase a home with smart products pre-installed" },
  { stat: "47%",    label: "Of Millennials already own smart-home products" },
];

const innovationPoints = [
  { num: "01", title: "Interconnected home system",              body: "Every device across the environment-monitoring, entity-interaction and behaviour-identity systems is linked to a central hub, which links each piece of equipment together." },
  { num: "02", title: "Future Lab independent innovation",       body: "Custom-built sensors collect richer, more diverse data — motion, expression, voice, smell, behaviour — analysed with AI to understand residents accurately." },
  { num: "03", title: "Adaptive design, autonomous learning",    body: "The system records long-term resident data to extract behaviour patterns and preferences, optimising itself without manual adjustment." },
  { num: "04", title: "People-oriented user experience",         body: "Sensors and home design are planned as a whole, embedded naturally into the home, and iterated on user feedback rather than pure technology." },
];

const researchStats = [
  { stat: "270",   label: "People surveyed on smart-home attitudes and needs" },
  { stat: "13.4%", label: "Of all-day-at-home users rank emotional needs as important — vs 3.2% of low-home-time users" },
  { stat: "18.8%", label: "Of people living with friends rank emotional needs as the most important smart-home function" },
];

const surveyConclusions = [
  "The group who spend a longer time at home have a greater need for emotional support in the smart-home scenario.",
  "People who live with their peers (friends or partners) pay more attention to the emotional needs of smart-home product features.",
];

const interviewees = [
  { age: "23", gender: "M", role: "Programmer" },
  { age: "20", gender: "F", role: "Actor" },
  { age: "34", gender: "M", role: "Teacher" },
  { age: "28", gender: "M", role: "Businessman" },
  { age: "27", gender: "M", role: "Doctor" },
];

const interviewProblems = [
  { num: "01", title: "The pace of modern city life", body: "The rhythm of modern city life is always very fast — people have little unstructured time at home." },
  { num: "02", title: "Lack of emotional communication", body: "People feel that they and the people around them lack emotional communication in daily life." },
  { num: "03", title: "Technology overlooks feeling", body: "Smart products today focus only on technology and overlook the emotional feel of the people using them." },
];

const personaWorry = [
  "During the night, washing clothes and other activities may disturb roommates.",
  "The lamps can't be remote-controlled from the bed, so it's easy to forget to turn them off.",
];
const personaNeeds = [
  "I don't want to disturb my roommate. I hope there is an intelligent system that can display whether my roommate needs a quiet and dark environment.",
  "Lack of efficient communication with roommates.",
];
const personaPain = [
  "Lack of efficient communication with roommates.",
  "The affective needs are not satisfied.",
];
const personaGoals = [
  "Experience a more comfortable personal life.",
  "Avoid noise disturbing roommates.",
];

const swimlaneStages = [
  {
    stage: "Preparation",
    touchpoint: "Website, mobile phone, smart speaker UI",
    painpoints: ["Nutritional collocation", "Food waste"],
    innovation: ["Nutrition advice", "Diets recommend"],
  },
  {
    stage: "Cooking",
    touchpoint: "Smart device UI",
    painpoints: ["Fire temperature / cooking time", "Fire risk in kitchens"],
    innovation: ["Environment monitor"],
  },
  {
    stage: "Share",
    touchpoint: "Social media",
    painpoints: ["Shoot video by yourself", "Few suitable platforms"],
    innovation: ["Auto save", "Smart editor"],
  },
  {
    stage: "Regulation",
    touchpoint: "Smart device UI",
    painpoints: ["Oil smoke pollution", "Forget steps"],
    innovation: ["Step guidance", "Smart cleaner"],
  },
  {
    stage: "End",
    touchpoint: "Smart device UI",
    painpoints: ["Food insulation"],
    innovation: ["Auto insulation"],
  },
];

const emotionColors = [
  { emotion: "Sadness",  color: "#8B5FBF" },
  { emotion: "Happiness", color: "#F2C94C" },
  { emotion: "Fear",     color: "#6FCF97" },
  { emotion: "Surprise", color: "#56CCF2" },
  { emotion: "Anger",    color: "#EB5757" },
  { emotion: "Disgust",  color: "#F2789F" },
];

const relatedCases = [
  { id: "sl-case-malmo.webp",   title: "Malmö University city lab",                 body: "A vibrant university city of 300,000 inhabitants using Bluetooth systems to monitor daily activity — the city itself treated as a living lab." },
  { id: "sl-case-aarhus.webp",  title: "Dept. of Computer Science, Aarhus University", body: "159 apartments fitted with sensors across more than 200 students, linking real-world electricity and water use to a game." },
  { id: "sl-case-mit.webp",     title: "MIT Place Lab",                              body: "A 1,000 sq ft apartment where individuals or couples live for days or weeks while multi-modal sensor data is collected for shared studies." },
];

const inspirationRefs = [
  { id: "sl-inspiration-places.webp",    title: "Places | Mental-Soothing Device", body: "A series of lighting effects combining colours and motion. Place is a product that creates an immersive, calming experience." },
  { id: "sl-inspiration-awareness.webp", title: "Sense of Awareness — Hyunwoo Lee (RCA)", body: "Provides a unique stimulus to people in low-alertness moments, attracting natural light to create a moment of consciousness." },
  { id: "sl-inspiration-artreform.webp", title: "ArtReform — Sara Poggiaspalla",   body: "An art installation that increases the feeling of safety when people walk through low-activeness areas such as cold alleys and underpasses." },
];

const designProgress = ["Research", "Site selection", "Interior construction", "System test", "System operation", "Data environment"];

const environmentSensors = ["Temperature sensor", "Light sensors", "Pressure sensors", "Noise sensors", "Air quality monitor", "Electric sensor (support by Xiaomi)"];

const productDimensions = [
  { id: "sl-dimension-side.webp", caption: "Side profile — 32cm × 9cm" },
  { id: "sl-dimension-track.webp", caption: "Track detail — 4cm" },
  { id: "sl-dimension-top.webp",  caption: "Top view — 32cm × 27cm, base 9cm" },
];

const lifestyleRenders = [
  { id: "sl-render-shelf.webp",   caption: "Yellow — happiness, on a wooden shelf" },
  { id: "sl-render-table.webp",   caption: "Blue — surprise, bedside table" },
  { id: "sl-render-red.webp",     caption: "Red — anger, side table" },
  { id: "sl-render-plant.webp",   caption: "Green — fear, styled with foliage" },
];

const storyboardPanels = [
  { id: "sl-storyboard-1.webp", num: "01", text: "It showed the time to be about 9 o'clock — Kim arrives home." },
  { id: "sl-storyboard-2.webp", num: "02", text: "Vicky noticed that Kim sat alone in his bedroom." },
  { id: "sl-storyboard-3.webp", num: "03", text: "Vicky wanted to know the mood of Kim, and starts the signal light." },
  { id: "sl-storyboard-4.webp", num: "04", text: "One turn took 24s. It showed the last 24h of Kim's emotional state." },
  { id: "sl-storyboard-5.webp", num: "05", text: "It was known that Kim was upset." },
  { id: "sl-storyboard-6.webp", num: "06", text: "Vicky could give him a hot drink to make him happy." },
];

// ── Published research ──────────────────────────────────────────────────────────

const publication = {
  title:   "Gesture-based Fear Recognition Using Non-performance Dataset from VR Horror Games",
  venue:   "2021 9th International Conference on Affective Computing and Intelligent Interaction (ACII)",
  doiUrl:  "https://ieeexplore.ieee.org/document/9597450",
  authors: "Xinyi Fu, Cheng Xue, Qiuyi Yin, Yu Jiang, Ye Li, Yichen Cai, Weilin Sun",
  myAffiliation: "Weilin Sun — Dept. of Materials Science & Technology, Beijing Forestry University",
  abstract: "Existing emotion-recognition research mostly relies on performance datasets — actors deliberately acting out an emotion — which poorly reflects how fear actually presents in the body. This paper proposes a non-performance emotional data-collection scheme using VR horror games to construct a high-quality gesture-modality dataset with fear labels, then trains an optimised BLSTM model for gesture-based fear recognition.",
  contributions: [
    "A non-performance emotional data-collection scheme using VR.",
    "A high-quality non-performance dataset in gesture modality with fear labels.",
    "An optimised BLSTM algorithm for gesture-based fear recognition, reaching up to 71.43% accuracy.",
  ],
  applications: "Potential applications include domestic-violence detection and VR game evaluation.",
};

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

function DecisionBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-black pl-5 py-1 my-6 bg-black/[0.02]">
      <p className="type-eyebrow mb-2">Conclusion</p>
      <p className="type-body-key">{children}</p>
    </div>
  );
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

function FlowStep({ label, sub }: { label: string; sub?: string }) {
  return (
    <div className="border border-black/70 px-[14px] py-[10px] text-center flex-1 min-w-0">
      <p className="type-body-sm leading-snug break-words">{label}</p>
      {sub && <p className="type-eyebrow mt-[4px]">{sub}</p>}
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="flex items-center justify-center flex-shrink-0 px-[4px] md:px-[8px]">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-black/30">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
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

export default function SmarthomePage() {
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
          backgroundImage:    "url(/slbg.webp)",
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
            Affective Computing for Smart Home — Sensing and Representing Emotional Needs at Home
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
              src="/slintro.webp"
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

          {/* ══════════ 01 — OVERVIEW ══════════ */}
          <section id="s-overview" className="pb-[40px] md:pb-[56px] border-b border-black/15">
            <div className="border-t border-black/15 mb-[8px]" />
            <SectionLabel>01 — Overview</SectionLabel>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[48px]">
              <div>
                <p className="type-eyebrow mb-[16px]">The question</p>
                <p className="type-body">How can a smart home sense and communicate the emotional needs of the people living in it?</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2 flex flex-col gap-[16px]">
                <p className="type-body-key">
                  This project sits inside The Future Lab's broader affective-computing research programme for
                  smart homes — studying how multimodal signals (gesture, expression, voice, physiological data)
                  can be sensed in the home, interpreted, and fed back into the living environment.
                </p>
                <p className="type-body">
                  Over the course of the internship, the research produced two concrete outputs: a peer-reviewed
                  paper on gesture-based fear recognition, published at ACII 2021, and a physical prototype —
                  Signal Light — that translates the lab's affective-computing pipeline into a single, tangible
                  signal for roommates sharing a home.
                </p>
                <p className="type-body">
                  The rhythm of modern city life is fast, and even the limited time people spend at home often
                  isn't comfortable. Existing smart-home products focus heavily on technology and convenience, but
                  overlook the emotional feel of the people who actually live in the space.
                </p>
                <blockquote className="border-l-2 border-brand pl-[16px] py-[2px] font-inria-serif text-[clamp(15px,1.2vw,18px)] italic text-black/70 leading-relaxed">
                  "I have to work for a long time, and even the limited time at home is not comfortable enough. That's hard."
                </blockquote>
              </div>
            </div>

            <SubDivider />

            {/* Smart home market background */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[48px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Homes are getting smarter</p>
                <p className="type-body">The global smart-home category is growing fast — but emotional needs remain unaddressed.</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2">
                <div className="grid grid-cols-3 gap-0 border border-black/20">
                  {marketStats.map((s) => (
                    <div key={s.stat} className="border-r border-black/10 last:border-r-0 p-[20px] text-center">
                      <p className="font-inria-serif text-[clamp(1.6rem,2.6vw,2.4rem)] leading-none tracking-tight text-brand mb-[8px]">{s.stat}</p>
                      <p className="type-eyebrow">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-[24px] flex flex-col gap-[8px]">
              <ImagePlaceholder filename="sl-market-growth.webp" caption="Estimated households worldwide with smart devices, 2022 vs 2027" ratio="21/9" />
            </div>

            <SubDivider />

            {/* Innovation points */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[24px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Grounded in Future Lab research</p>
                <p className="type-body">Four principles carried through the lab's broader smart-home research into this project.</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2">
                <div className="border border-black/20">
                  {innovationPoints.map((p) => (
                    <div key={p.num} className="border-b border-black/10 last:border-b-0 p-[20px]">
                      <p className="type-eyebrow mb-[8px]">{p.num}</p>
                      <p className="type-subhead mb-[10px]">{p.title}</p>
                      <p className="type-body">{p.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ══════════ 02 — MARKET RESEARCH ══════════ */}
          <section id="s-research" className="pt-[40px] md:pt-[56px] pb-[40px] md:pb-[56px] border-b border-black/15">
            <SectionLabel>02 — Market Research</SectionLabel>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[48px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Questionnaire</p>
                <p className="type-body">A survey of smart-home users, filtered to respondents over 20 for consumption-relevant analysis.</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2">
                <div className="grid grid-cols-3 gap-0 border border-black/20">
                  {researchStats.map((s) => (
                    <div key={s.stat} className="border-r border-black/10 last:border-r-0 p-[20px] text-center">
                      <p className="font-inria-serif text-[clamp(1.6rem,2.6vw,2.4rem)] leading-none tracking-tight text-brand mb-[8px]">{s.stat}</p>
                      <p className="type-eyebrow">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <SubDivider />

            {/* Demographics + cross analysis images */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[24px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Demographics &amp; cross analysis</p>
                <p className="type-body">Gender, age, housing situation, home time, and concerns, cross-referenced against emotional-needs priority.</p>
              </div>
            </div>
            <div className="mt-[16px] flex flex-col gap-[16px]">
              <ImagePlaceholder filename="sl-survey-demographics.webp" caption="Questionnaire — gender, age, housing situation, home time, main concerns" ratio="21/9" />
              <ImagePlaceholder filename="sl-survey-crossanalysis.webp" caption="Cross analysis — emotion needs vs. home time / housing situation" ratio="21/9" />
            </div>

            <SubDivider />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Conclusion</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2 flex flex-col">
                {surveyConclusions.map((c, i) => (
                  <DecisionBlock key={i}>{c}</DecisionBlock>
                ))}
              </div>
            </div>
          </section>

          {/* ══════════ 03 — USER INSIGHTS ══════════ */}
          <section id="s-userinsights" className="pt-[40px] md:pt-[56px] pb-[40px] md:pb-[56px] border-b border-black/15">
            <SectionLabel>03 — User Insights</SectionLabel>

            {/* Interviews */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[32px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Interviews</p>
                <p className="type-body">Five interviewees who enjoy smart/AI products and live in a smart-home environment.</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2">
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-[8px]">
                  {interviewees.map((p, i) => (
                    <div key={i} className="border border-black/20 p-[12px] text-center">
                      <p className="type-body-sm mb-[2px]">{p.role}</p>
                      <p className="type-eyebrow">{p.age} · {p.gender}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-[16px]">
              <ImagePlaceholder filename="sl-interview-photos.webp" caption="Interview sessions" ratio="21/9" />
            </div>

            <SubDivider />

            {/* Interview problems */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[48px]">
              <div>
                <p className="type-eyebrow mb-[16px]">What we heard</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2">
                <div className="border border-black/20">
                  {interviewProblems.map((p) => (
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

            {/* Persona */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[24px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Persona — Kim</p>
                <p className="type-body">27 · Male · Sharing rent · Computer scientist</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2 flex flex-col gap-[16px]">
                <blockquote className="border-l-2 border-brand pl-[16px] py-[2px] font-inria-serif text-[clamp(15px,1.2vw,18px)] italic text-black/70 leading-relaxed">
                  "I have to work for a long time, and even the limited time at home is not comfortable enough. That's hard."
                </blockquote>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px]">
                  <div className="border border-black/20 p-[16px]">
                    <p className="type-eyebrow mb-[10px]">Worry</p>
                    <ul className="space-y-[8px]">
                      {personaWorry.map((item, i) => (
                        <li key={i} className="flex items-start gap-[10px]">
                          <span className="w-[4px] h-[4px] rounded-full bg-black/25 mt-[7px] flex-shrink-0" />
                          <p className="type-body-sm">{item}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border border-black/20 p-[16px]">
                    <p className="type-eyebrow mb-[10px]">Needs</p>
                    <ul className="space-y-[8px]">
                      {personaNeeds.map((item, i) => (
                        <li key={i} className="flex items-start gap-[10px]">
                          <span className="w-[4px] h-[4px] rounded-full bg-black/25 mt-[7px] flex-shrink-0" />
                          <p className="type-body-sm">{item}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border border-black/20 p-[16px]">
                    <p className="type-eyebrow mb-[10px]">Pain point</p>
                    <ul className="space-y-[8px]">
                      {personaPain.map((item, i) => (
                        <li key={i} className="flex items-start gap-[10px]">
                          <span className="w-[4px] h-[4px] rounded-full bg-black/25 mt-[7px] flex-shrink-0" />
                          <p className="type-body-sm">{item}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border border-black/20 p-[16px]">
                    <p className="type-eyebrow mb-[10px]">Goals</p>
                    <ul className="space-y-[8px]">
                      {personaGoals.map((item, i) => (
                        <li key={i} className="flex items-start gap-[10px]">
                          <span className="w-[4px] h-[4px] rounded-full bg-black/25 mt-[7px] flex-shrink-0" />
                          <p className="type-body-sm">{item}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <SubDivider />

            {/* Scenario research */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[24px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Scenario research</p>
                <p className="type-body">Mapping smart devices needed across the main home spaces — balcony, kitchen, study room, lavatory, bedroom, living room.</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2">
                <ImagePlaceholder filename="sl-scenario-mindmap.webp" caption="Scenario mind map — space, device, activity" ratio="4/3" />
              </div>
            </div>

            <div className="mt-[16px] grid grid-cols-1 sm:grid-cols-3 gap-[12px]">
              <ImagePlaceholder filename="sl-scenario-photo-1.webp" caption="Research session" ratio="1/1" />
              <ImagePlaceholder filename="sl-scenario-photo-2.webp" caption="Research session" ratio="1/1" />
              <ImagePlaceholder filename="sl-scenario-photo-3.webp" caption="Research session" ratio="1/1" />
            </div>

            <SubDivider />

            {/* Swim-lane */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[24px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Scenario description swim-lanes</p>
                <p className="type-body">Example: kitchen. Used to reproduce and analyse user behaviour and structure the research data.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-[8px]">
              {swimlaneStages.map((s) => (
                <div key={s.stage} className="border border-black/20 flex flex-col">
                  <div className="border-b border-black/15 p-[10px] text-center">
                    <p className="type-eyebrow">{s.stage}</p>
                  </div>
                  <div className="p-[10px] border-b border-black/10">
                    <p className="font-futura-medium text-[10px] text-black/35 uppercase tracking-[0.08em] mb-[4px]">Touchpoint</p>
                    <p className="type-body-sm">{s.touchpoint}</p>
                  </div>
                  <div className="p-[10px] border-b border-black/10">
                    <p className="font-futura-medium text-[10px] text-black/35 uppercase tracking-[0.08em] mb-[4px]">Painpoints</p>
                    <ul className="space-y-[4px]">
                      {s.painpoints.map((pp, i) => (
                        <li key={i} className="type-body-sm">{pp}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-[10px]">
                    <p className="font-futura-medium text-[10px] text-brand uppercase tracking-[0.08em] mb-[4px]">Innovation</p>
                    <ul className="space-y-[4px]">
                      {s.innovation.map((inn, i) => (
                        <li key={i} className="type-body-sm text-brand">{inn}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ══════════ 04 — AFFECTIVE COMPUTING & COLOUR ══════════ */}
          <section id="s-concept" className="pt-[40px] md:pt-[56px] pb-[40px] md:pb-[56px] border-b border-black/15">
            <SectionLabel>04 — Affective Computing &amp; Colour</SectionLabel>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[48px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Technical research</p>
                <p className="type-body">500+ pieces of literature and 15 living labs reviewed across five research areas.</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2 flex flex-col gap-[12px]">
                <p className="type-body">
                  Emotion recognition is a rising research trend, but little work focuses on gesture-based emotion
                  recognition using non-performance emotional datasets. Reviewed literature spans affective computing,
                  affective databases, smart-home research, olfactory research, and sensor-based living labs.
                </p>
                <div className="flex flex-wrap gap-[8px]">
                  {["Affective computing", "Affective database", "Smart home", "Olfactory research", "Sensor-based living lab"].map((tag) => (
                    <span key={tag} className="inline-flex rounded-full border border-black px-3 py-1 type-chip text-black bg-my-bg">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <SubDivider />

            {/* Related cases */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[24px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Related cases</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-[12px]">
              {relatedCases.map((c) => (
                <div key={c.id} className="flex flex-col gap-[10px]">
                  <ImagePlaceholder filename={c.id} ratio="4/3" />
                  <p className="type-body-sm font-futura-medium">{c.title}</p>
                  <p className="type-body-sm text-black/60">{c.body}</p>
                </div>
              ))}
            </div>

            <SubDivider />

            {/* Law of light */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[24px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Law of light — how light conveys emotion</p>
                <p className="type-body">Colours constantly trigger mental and emotional reactions. People have six basic emotions — sadness, happiness, fear, surprise, anger, and disgust — each mapped to a distinct colour of light.</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2">
                <ImagePlaceholder filename="sl-colorwheel.webp" caption="Colour-association wheel" ratio="4/3" />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-[12px]">
              {emotionColors.map((e) => (
                <div key={e.emotion} className="border border-black/20 p-[16px] flex flex-col items-center gap-[10px]">
                  <div className="w-[36px] h-[36px] rounded-full" style={{ backgroundColor: e.color, boxShadow: `0 0 16px ${e.color}66` }} />
                  <p className="type-body-sm">{e.emotion}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ══════════ 05 — PUBLISHED RESEARCH ══════════ */}
          <section id="s-publication" className="pt-[40px] md:pt-[56px] pb-[40px] md:pb-[56px] border-b border-black/15">
            <SectionLabel>05 — Published Research</SectionLabel>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[24px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Peer-reviewed output</p>
                <p className="type-body">A dedicated strand of the research — non-performance fear recognition from body gesture — was written up and published at ACII 2021.</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2">
                <div className="border border-black/20 p-[24px] md:p-[28px] flex flex-col gap-[16px]">
                  <div>
                    <p className="type-eyebrow mb-[8px]">{publication.venue}</p>
                    <a
                      href={publication.doiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-inria-serif leading-[1.2] tracking-tight text-black hover:text-brand transition-colors"
                      style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)" }}
                    >
                      {publication.title}
                    </a>
                  </div>
                  <p className="type-body-sm text-black/60">{publication.authors}</p>
                  <div className="border-l-2 border-brand pl-[12px] py-[2px]">
                    <p className="type-body-sm text-brand">{publication.myAffiliation}</p>
                  </div>

                  <SubDivider />

                  <p className="type-body">{publication.abstract}</p>

                  <div>
                    <p className="type-eyebrow mb-[10px]">Contributions</p>
                    <ul className="space-y-[8px]">
                      {publication.contributions.map((c, i) => (
                        <li key={i} className="flex items-start gap-[10px]">
                          <span className="w-[4px] h-[4px] rounded-full bg-black/25 mt-[7px] flex-shrink-0" />
                          <p className="type-body-sm">{c}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center gap-[20px] flex-wrap">
                    <div className="text-center">
                      <p className="font-inria-serif text-[clamp(1.6rem,2.6vw,2.4rem)] leading-none tracking-tight text-brand mb-[6px]">71.43%</p>
                      <p className="type-eyebrow">Peak recognition accuracy (BLSTM)</p>
                    </div>
                    <p className="type-body-sm text-black/60 flex-1 min-w-[200px]">{publication.applications}</p>
                  </div>

                  <a
                    href={publication.doiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-futura-heavy text-[12px] opacity-50 hover:opacity-100 transition-opacity inline-flex items-center gap-2 self-start"
                  >
                    View on IEEE Xplore
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M7 17L17 7M17 7H9M17 7V15" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* ══════════ 06 — DESIGN OVERVIEW & SYSTEM ══════════ */}
          <section id="s-system" className="pt-[40px] md:pt-[56px] pb-[40px] md:pb-[56px] border-b border-black/15">
            <SectionLabel>06 — Design Overview &amp; System</SectionLabel>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[24px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Design purpose</p>
                <p className="type-body">Humans move between physical spaces every day. Affective computing bridges environment, entity and human, feeding a continuous loop back into an intelligent living environment.</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2 flex items-center gap-[8px]">
                <FlowStep label="Environment" />
                <FlowArrow />
                <FlowStep label="Entity" />
                <FlowArrow />
                <FlowStep label="Human" />
              </div>
            </div>

            <SubDivider />

            {/* Data framework */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[24px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Data framework</p>
                <p className="type-body">Natural interaction is captured in the living lab, processed through affective computing, and expressed via a multimodal emotional channel.</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2 flex flex-col gap-[12px]">
                <div className="flex items-center gap-[8px]">
                  <FlowStep label="Living Lab" sub="Collect emotional information" />
                  <FlowArrow />
                  <FlowStep label="Affective Computing" sub="Emotional data" />
                  <FlowArrow />
                  <FlowStep label="Multimodal Channel" sub="Phonological · Facial · Gesture · Health" />
                </div>
              </div>
            </div>

            <SubDivider />

            {/* New form diagram */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[24px]">
              <div>
                <p className="type-eyebrow mb-[16px]">New form</p>
                <p className="type-body">The living room system streams data into affective computing, split across a visual terminal and an entity terminal, resolving into emotional expression.</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2 flex flex-col gap-[8px]">
                <div className="flex items-center gap-[8px]">
                  <FlowStep label="Living Room System" />
                  <FlowArrow />
                  <FlowStep label="Affective Computing" />
                </div>
                <div className="flex items-center gap-[8px] pl-[10%]">
                  <FlowStep label="Visual Terminal" />
                  <FlowArrow />
                  <FlowStep label="Emotional Expression" />
                </div>
                <div className="flex items-center gap-[8px] pl-[10%]">
                  <FlowStep label="Entity Terminal" />
                </div>
              </div>
            </div>

            <SubDivider />

            {/* Inspiration */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[24px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Inspiration</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-[12px] mb-[24px]">
              {inspirationRefs.map((r) => (
                <div key={r.id} className="flex flex-col gap-[10px]">
                  <ImagePlaceholder filename={r.id} ratio="4/3" />
                  <p className="type-body-sm font-futura-medium">{r.title}</p>
                  <p className="type-body-sm text-black/60">{r.body}</p>
                </div>
              ))}
            </div>

            <SubDivider />

            {/* Design progress */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Design progress</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2 flex flex-wrap items-center gap-[8px]">
                {designProgress.map((step, i) => (
                  <React.Fragment key={step}>
                    <span className="inline-flex rounded-full border border-black px-3 py-1 type-chip text-black bg-my-bg">{step}</span>
                    {i < designProgress.length - 1 && <FlowArrow />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </section>

          {/* ══════════ 07 — LIVING LAB ══════════ */}
          <section id="s-livinglab" className="pt-[40px] md:pt-[56px] pb-[40px] md:pb-[56px] border-b border-black/15">
            <SectionLabel>07 — Living Lab (Beijing)</SectionLabel>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[24px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Test environment</p>
                <p className="type-body">A furnished apartment in Beijing, instrumented as a living lab across living room, bedroom, kitchen, study room, balcony and lavatory.</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2">
                <ImagePlaceholder filename="sl-livinglab-floorplan.webp" caption="Living lab floor plan — Beijing" ratio="4/3" />
              </div>
            </div>

            <div className="mt-[16px] grid grid-cols-2 gap-[12px]">
              <ImagePlaceholder filename="sl-livinglab-livingroom.webp" caption="Living room" ratio="4/3" />
              <ImagePlaceholder filename="sl-livinglab-bedroom.webp" caption="Bedroom" ratio="4/3" />
              <ImagePlaceholder filename="sl-livinglab-kitchen.webp" caption="Kitchen" ratio="4/3" />
              <ImagePlaceholder filename="sl-livinglab-inprocess.webp" caption="Sensor wiring — room in process" ratio="4/3" />
            </div>

            <SubDivider />

            {/* Environmental monitoring */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[24px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Environmental monitoring system</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2 flex flex-wrap gap-[8px]">
                {environmentSensors.map((s) => (
                  <span key={s} className="inline-flex rounded-full border border-black px-3 py-1 type-chip text-black bg-my-bg">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <SubDivider />

            {/* Gait / gesture recognition */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] mb-[24px]">
              <div>
                <p className="type-eyebrow mb-[10px]">Gait recognition</p>
                <p className="type-body-sm mb-[12px]">A sensing floor detects walking patterns.</p>
                <ImagePlaceholder filename="sl-gait-recognition.webp" ratio="4/3" />
              </div>
              <div>
                <p className="type-eyebrow mb-[10px]">Gesture recognition</p>
                <p className="type-body-sm mb-[12px]">A depth-sensing camera captures gesture data.</p>
                <ImagePlaceholder filename="sl-gesture-recognition.webp" ratio="4/3" />
              </div>
            </div>

            <SubDivider />

            {/* Light behaviour inspiration */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[24px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Light behaviour</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2 flex flex-col gap-[10px]">
                <p className="type-body-key">Different colour means different mood.</p>
                <p className="type-body">The light goes round, as the moon rises in the east and sets in the west — but in reverse direction. Just like time turning back, the light retells the mood of the day.</p>
              </div>
            </div>

            <div className="mt-[16px]">
              <ImagePlaceholder filename="sl-sketch.webp" caption="Concept sketches — colour, form, motion" ratio="21/9" />
            </div>
          </section>

          {/* ══════════ 08 — APPLIED OUTPUT: SIGNAL LIGHT ══════════ */}
          <section id="s-output" className="pt-[40px] md:pt-[56px] pb-[80px] md:pb-[120px]">
            <SectionLabel>08 — Applied Output: Signal Light</SectionLabel>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[48px]">
              <div>
                <p className="type-eyebrow mb-[16px]">From research to artefact</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2">
                <p className="type-body-key">
                  Signal Light is the tangible design output of this research — a single-lamp system that carries
                  the lab's affective-computing pipeline into everyday domestic life, without requiring residents
                  to read a dashboard or a screen.
                </p>
              </div>
            </div>

            <p className="font-inria-serif mb-[32px] md:mb-[48px]" style={{ fontSize: "clamp(1.1rem, 2vw, 1.8rem)", lineHeight: 1 }}>08a — Hardware</p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[24px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Product details</p>
                <p className="type-body">A lampshade and bulb sit within a track that orbits a magnetic base, powered by an internal battery.</p>
                <ul className="space-y-[8px] mt-[16px]">
                  {["Lampshade", "Bulb", "Track", "Base + battery + magnet", "Screw"].map((item) => (
                    <li key={item} className="flex items-start gap-[10px]">
                      <span className="w-[4px] h-[4px] rounded-full bg-black/25 mt-[7px] flex-shrink-0" />
                      <p className="type-body-sm">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2">
                <ImagePlaceholder filename="sl-exploded-view.webp" caption="Exploded view" ratio="4/3" />
              </div>
            </div>

            <SubDivider />

            {/* Dimensions */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[24px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Dimensions</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-[12px] mb-[24px]">
              {productDimensions.map((d) => (
                <ImagePlaceholder key={d.id} filename={d.id} caption={d.caption} ratio="4/3" />
              ))}
            </div>

            <SubDivider />

            {/* Final design + colours */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[24px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Final design</p>
                <p className="type-body-key">Different colours represent different emotions.</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2 flex gap-[16px]">
                {emotionColors.map((e) => (
                  <div key={e.emotion} className="w-[28px] h-[28px] rounded-full flex-shrink-0" style={{ backgroundColor: e.color, boxShadow: `0 0 16px ${e.color}66` }} title={e.emotion} />
                ))}
              </div>
            </div>

            <div className="mt-[16px]">
              <ImagePlaceholder filename="sl-render-hero.webp" caption="Signal Light — full colour spectrum across the track" ratio="21/9" />
            </div>

            <div className="mt-[16px] grid grid-cols-2 sm:grid-cols-4 gap-[12px]">
              {lifestyleRenders.map((r) => (
                <ImagePlaceholder key={r.id} filename={r.id} caption={r.caption} ratio="1/1" />
              ))}
            </div>

            <SubDivider />

            <p className="font-inria-serif mt-[40px] mb-[32px] md:mb-[48px]" style={{ fontSize: "clamp(1.1rem, 2vw, 1.8rem)", lineHeight: 1 }}>08b — Interface &amp; Final Design</p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[24px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Information architecture</p>
                <p className="type-body">The app organises around five hubs off the home screen.</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[8px]">
                  {[
                    { hub: "Control Center", items: "Condition · Sensor · Device linkage" },
                    { hub: "Personal Page",  items: "Health · Scenarios · Related device" },
                    { hub: "Room",           items: "Video monitors · Roommate situation · Environment (weather, security)" },
                    { hub: "Emotion",        items: "Signal lamp · Emotion data" },
                    { hub: "Notification",   items: "Alerts across all hubs" },
                    { hub: "Setting",        items: "User info · Account" },
                  ].map((h) => (
                    <div key={h.hub} className="border border-black/20 p-[14px]">
                      <p className="type-body-sm mb-[4px]">{h.hub}</p>
                      <p className="font-futura-medium text-[11px] leading-relaxed text-black/50">{h.items}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <SubDivider />

            {/* Low-fi */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[24px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Low-fidelity wireframes</p>
                <p className="type-body">Welcome → sign up/in → home → control center, room, emotion and settings tabs → personal and room schedule pages.</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2">
                <ImagePlaceholder filename="sl-lofi-wireframes.webp" caption="Low-fidelity flow" ratio="4/3" />
              </div>
            </div>

            <SubDivider />

            {/* Logo / colour / font */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[24px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Logo, colour &amp; type</p>
                <p className="type-body">Myriad Variable Concept for UI type; a navy, gold and dusty-rose palette carried from wireframe to final screens.</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2 flex flex-col gap-[16px]">
                <div className="flex gap-[12px]">
                  {[
                    { name: "Navy",       hex: "#003366" },
                    { name: "Gold",       hex: "#E7A505" },
                    { name: "Dusty Rose", hex: "#BF7F80" },
                  ].map((c) => (
                    <div key={c.hex} className="flex flex-col items-center gap-[8px]">
                      <div className="w-[44px] h-[44px] rounded-full border border-black/10" style={{ backgroundColor: c.hex }} />
                      <p className="type-eyebrow">{c.name}</p>
                    </div>
                  ))}
                </div>
                <ImagePlaceholder filename="sl-logo-exploration.webp" caption="Logo exploration" ratio="16/9" />
              </div>
            </div>

            <SubDivider />

            {/* Hi-fi screens */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[24px]">
              <div>
                <p className="type-eyebrow mb-[16px]">High-fidelity screens</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2">
                <ImagePlaceholder filename="sl-hifi-screens.webp" caption="Control center, room, emotion, notifications, settings and profile" ratio="4/3" />
              </div>
            </div>

            <SubDivider />

            {/* Final storyboard */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[24px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Final design — Kim &amp; Vicky</p>
                <p className="type-body">A day in the life of two roommates, told through the signal light.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-[12px] mb-[24px]">
              {storyboardPanels.map((p) => (
                <div key={p.id} className="flex flex-col gap-[8px]">
                  <ImagePlaceholder filename={p.id} ratio="4/3" />
                  <div className="flex items-start gap-[8px]">
                    <span className="type-eyebrow shrink-0">{p.num}</span>
                    <p className="type-body-sm">{p.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <ImagePlaceholder filename="sl-final-scene.webp" caption="It was known that Kim was upset, so Vicky could give him a hot drink to make him happy." ratio="21/9" />
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
