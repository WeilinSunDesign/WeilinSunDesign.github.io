import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./components/Header";

// ── Nav sections ──────────────────────────────────────────────────────────────

const navSections = [
  { id: "s-context",   label: "01 — Overview" },
  { id: "s-role",      label: "02 — My Role & Team" },
  { id: "s-decisions", label: "03 — Key Decisions" },
  { id: "s-testing",   label: "04 — 12 Rounds of Playtesting" },
  { id: "s-ecosystem", label: "05 — Service Ecosystem & Ethics" },
  { id: "s-outcomes",  label: "06 — Outcomes" },
];

// ── Data ──────────────────────────────────────────────────────────────────────

const heroTags = ["Game Design", "Service Design", "Ethics & Safeguards", "Group Project"];

const introDetails: { label: string; value: string | React.ReactNode }[] = [
  {
    label: "Overview:",
    value:
      "A multiplayer card game — and the service ecosystem around it — designed to bring international (particularly Asian) students in the UK out of social isolation, by replacing addictive virtual activities with face-to-face, gamified cultural exchange.",
  },
  {
    label: "The core concept:",
    value: "Two card types — Cultural Cards and Lingo Cards — sourced from real student workshops, played face to face to turn cultural friction into shared laughter.",
  },
  { label: "Team:",    value: "5-person postgraduate group — Feng Pan, Weilin Sun, Trisha Mehta, Peiyun Wu, Min Zhou" },
  { label: "Duration:", value: "UK postgraduate group project" },
  { label: "My Role:", value: "Research framing, game-mechanism design & playtesting, service ecosystem & ethics" },
];

const rootCauses = [
  { label: "Stereotype",             sub: "Support Group Workshop" },
  { label: "Culture shock",          sub: "Support Group Workshop" },
  { label: "No common ground",       sub: "Culture Sharing Workshop" },
];

const cardTypes = [
  {
    title: "Cultural Cards",
    body: "Culturally significant, pride-evoking content — sourced from what students said they were proud of in their own culture.",
  },
  {
    title: "Lingo Cards",
    body: "Playful memes about customs, food, and behaviour — the material that turns cultural friction into shared laughter.",
  },
];

const testRounds = [
  {
    number: "Test 1",
    title: "No base score",
    label: "Pacing",
    body: "Without a starting score, losers emerged almost immediately and the game ended before it began.",
    fix: "Gave every player a base score of 3 points.",
  },
  {
    number: "Test 1–2",
    title: "Unfair stereotype penalty",
    label: "Fairness",
    body: "The original rule for drawing a stereotype card about your own country didn't feel fair to players.",
    fix: "Own-country cultural card adds points; stereotype cards skip a turn instead of deducting points.",
  },
  {
    number: "Test 3",
    title: "Ambiguous simultaneous finish",
    label: "Rules clarity",
    body: "The rules didn't originally define what happens if two players finish at once.",
    fix: "Game now ends as soon as any two players finish, regardless of who \"won.\"",
  },
  {
    number: "Test 6",
    title: "Snowballing via self-country cards",
    label: "Balance",
    body: "Letting a self-country card add 2 points let players win too fast by drawing two in a row.",
    fix: "Reduced to 1 point, slowing the pace deliberately.",
  },
  {
    number: "Tests 10–11",
    title: "Scaling broke pacing both ways",
    label: "Scaling",
    body: "5-player 8-point version made the endgame hard to read; dropping to 7 points made everyone converge on the same blocking strategy — replayability dropped either way.",
    fix: "Neither extreme worked — pointed toward adjusting the end condition instead of the score threshold.",
  },
  {
    number: "Test 12",
    title: "First full-length game",
    label: "Resolution",
    body: "Kept the 8-point structure but adjusted the end condition.",
    fix: "First version where the game ran its full length, used all the cards, and came down to the final round.",
  },
];

const ethicsRisks = [
  {
    risk: "Triggering trauma or negative emotions",
    source: "Card content touching lived experience",
    mitigation: "Workshop-vetted, regularly rotated content",
  },
  {
    risk: "Biased or self-flattering representation",
    source: "Students designing content about their own culture",
    mitigation: "Third-party review from non-student national groups or staff",
  },
  {
    risk: "Disruptive or racist behaviour during play",
    source: "Face-to-face, unmoderated group setting",
    mitigation: "In-game moderators empowered to intervene",
  },
];

// ── Sub-components (local to this page — mirrors swiftfood.tsx patterns) ──────

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
      <div className="absolute bg-black/20" style={{ left: "50%", transform: "translateX(-50%)", width: "1px", top: 0, height: "50%" }} />
      <div className="absolute bg-black/20" style={{ left: `${centers[0]}%`, right: `${100 - centers[count - 1]}%`, height: "1px", top: "50%" }} />
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
                  width:         "1px",
                  height:        "20px",
                  backgroundColor: "rgba(19,19,19,0.16)",
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

export default function CultureMemeMaster() {
  const [scrollY, setScrollY]         = useState(0);
  const [activeSection, setActive]    = useState(navSections[0].id);
  const [showSidebar, setShowSidebar] = useState(false);
  const [titleH, setTitleH]           = useState(0);
  const caseStudyRef                  = useRef<HTMLDivElement>(null);
  const titleBlockRef                 = useRef<HTMLDivElement>(null);

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

      {/* Fixed header — always visible */}
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
          backgroundImage:    "url(/cmm-bg.webp)",
          backgroundSize:     "cover",
          backgroundPosition: typeof window !== "undefined" && window.innerWidth < 768
            ? `center ${scrollY * 0.1}px`
            : `center ${scrollY * 0.22}px`,
          backgroundRepeat:   "no-repeat",
        }}
      >
        <div ref={titleBlockRef} className="sticky top-[48px] md:top-[64px] px-[24px] md:px-[48px] xl:px-[80px] pt-[20px] md:pt-[28px] pb-[16px] md:pb-[22px]">
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
            Culture Meme Master
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
      ══════════════════════════════════════════════ */}
      <section
        ref={introRef}
        className="flex flex-col pb-[56px] md:pb-[80px]"
      >
        <div className="flex flex-col md:grid md:grid-cols-2 px-[24px] md:px-[96px]">

          <div className="flex flex-col justify-center self-stretch">
            <ImagePlaceholder filename="cmm-intro.webp" caption="Culture Meme Master — game overview" ratio="auto" />
          </div>

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
          <section id="s-context" className="pb-[40px] md:pb-[56px] border-b border-black/15">
            <div className="border-t border-black/15 mb-[8px]" />
            <SectionLabel>01 — Overview</SectionLabel>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[56px] md:mb-[72px]">
              <div>
                <p className="type-eyebrow md:text-[14px] mb-[20px]">The problem</p>
                <p className="type-body">
                  Universities are often the first and most important touchpoint in an international student's life in a new country — but orientation services rarely go beyond information delivery. In their absence, many students substitute genuine connection with "addicting virtual activities" — scrolling rather than meeting people.
                </p>
              </div>
              <div className="md:col-span-3">
                <p className="type-body-key mb-[20px]">
                  Two co-creation workshops surfaced three concrete drivers of isolation.
                </p>
                <div className="flex flex-col items-center gap-0 w-full">
                  <TreeNode label="Co-creation workshops with international students" />
                  <TreeConnector count={3} />
                  <div className="flex items-start gap-[12px] w-full">
                    {rootCauses.map((c) => (
                      <div key={c.label} className="flex flex-col items-center flex-1 min-w-0">
                        <TreeNode label={c.label} sub={c.sub} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <SubDivider />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mt-[32px]">
              <div>
                <p className="type-eyebrow mb-[16px]">The brief</p>
              </div>
              <div className="md:col-span-3">
                <p className="type-body">
                  Design something that helps students break down these barriers face-to-face, without relying on social media and without putting anyone under financial burden — and see whether a card game could become the seed of a genuinely more inclusive campus culture, not just a one-off icebreaker.
                </p>
              </div>
            </div>
          </section>

          {/* 02 — My Role & the Team */}
          <section id="s-role" className="pt-[56px] pb-[80px] md:pb-[120px] border-b border-black/15">
            <SectionLabel>02 — My Role & the Team</SectionLabel>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[56px] md:mb-[72px]">
              <div>
                <p className="type-eyebrow mb-[16px]">The team</p>
                <p className="type-body">
                  A 5-person team project as part of a UK postgraduate programme — Feng Pan, Weilin Sun, Trisha Mehta, Peiyun Wu, Min Zhou.
                </p>
              </div>
              <div className="md:col-span-3">
                <p className="type-body-key mb-[16px]">
                  Card content, country visual systems, and brand identity (the Culture Meme Master logo, coin design, country colour frames) were primarily led by teammates.
                </p>
                <p className="type-body">I want to be upfront about that rather than blur the lines.</p>
              </div>
            </div>

            <SubDivider />

            <div className="mt-[32px]">
              <p className="type-eyebrow mb-[28px]">What I led or owned</p>
              <div className="flex flex-col gap-[8px]">
                {[
                  { title: "Research framing", body: "Synthesising the two workshops into the three root-cause categories that shaped what the cards needed to do — and what they explicitly should not do." },
                  { title: "Game-mechanism design & playtesting", body: "Ran the iterative testing process end-to-end: 12 documented rounds plus separate 3-player and 5-player variants." },
                  { title: "Service ecosystem & ethics design", body: "Mapped the \"Culture + Labs\" organisational structure and the full-journey service blueprint, and identified the three ethical risk categories the game needed to design against." },
                ].map(({ title, body }) => (
                  <div key={title} className="border border-black/15 px-[16px] py-[14px] flex flex-col gap-[4px]">
                    <p className="type-body-sm">{title}</p>
                    <p className="font-futura-medium text-[12px] leading-relaxed text-black/50">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 03 — Key Decisions */}
          <section id="s-decisions" className="pt-[56px] pb-[80px] md:pb-[120px] border-b border-black/15">
            <SectionLabel>03 — Key Decisions</SectionLabel>

            {/* Decision 1 — co-creation over top-down */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[48px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Co-creating content, not designing it top-down</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2">
                <p className="type-body-key mb-[16px]">
                  Writing "positive" cultural content ourselves risked reproducing exactly the stereotypes we were trying to dismantle.
                </p>
                <p className="type-body mb-[16px]">
                  We ran workshops to source content from international students, then filtered keywords into two card types.
                </p>
                <div className="flex gap-[12px]">
                  {cardTypes.map((c) => (
                    <div key={c.title} className="flex-1 border border-dashed border-black/25 p-[16px]">
                      <p className="type-body-sm mb-[8px]">{c.title}</p>
                      <p className="font-futura-medium text-[12px] leading-relaxed text-black/60">{c.body}</p>
                    </div>
                  ))}
                </div>
                <p className="type-body-sm text-black/40 italic mt-[16px]">A deliberate trade of speed for authenticity and safety.</p>
              </div>
            </div>

            <SubDivider />

            {/* Decision 2 — competition to sharing */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[48px] mt-[24px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Shifting the mechanism from competition to sharing</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2">
                <p className="type-body">
                  Early testing surfaced something important: players didn't really care about winning points — what they enjoyed was laughing at each other's stereotypes, learning new cultures, and sharing jokes.
                </p>
                <div className="border-l-2 border-brand pl-[12px] py-[2px] mt-[16px]">
                  <p className="type-body-sm text-brand">From win/lose reward → extending the sharing dynamic, including offline follow-up activities</p>
                </div>
              </div>
            </div>

            <SubDivider />

            {/* Decision 3 — ecosystem & ethics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mt-[24px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Designing the ecosystem and the ethics — not just the game</p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2">
                <p className="type-body">
                  A card game that works once in a workshop room doesn't automatically create "a new campus culture." That required a service blueprint and organisational structure, plus a proactive ethics framework — detail in sections 05 below.
                </p>
              </div>
            </div>
          </section>

          {/* 04 — 12 Rounds of Playtesting */}
          <section id="s-testing" className="pt-[56px] pb-[80px] md:pb-[120px] border-b border-black/15">
            <SectionLabel>04 — 12 Rounds of Playtesting</SectionLabel>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[56px] md:mb-[72px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Why this matters</p>
              </div>
              <div className="md:col-span-3">
                <p className="type-body-key">
                  A card game that took 12 documented rounds (plus separate 3- and 5-player variants) to balance is a much better story than one that worked first time.
                </p>
              </div>
            </div>

            <SubDivider />

            <div className="flex flex-col gap-[12px] mt-[32px]">
              {testRounds.map((t) => (
                <div key={t.number} className="border border-dashed border-black/25 p-[20px] md:p-[24px]">
                  <div className="flex items-baseline gap-[12px] mb-[10px]">
                    <p className="type-eyebrow">{t.number}</p>
                    <span className="inline-flex rounded-full border border-black px-3 py-1 type-chip text-black bg-my-bg">{t.label}</span>
                  </div>
                  <p className="type-body-key mb-[10px]">{t.title}</p>
                  <p className="type-body mb-[12px]">{t.body}</p>
                  <div className="border-l-2 border-brand pl-[12px] py-[2px]">
                    <p className="type-body-sm text-brand">Fix: {t.fix}</p>
                  </div>
                </div>
              ))}
            </div>

            <SubDivider />

            <div className="mt-[24px] flex gap-[12px]">
              <div className="flex-1"><ImagePlaceholder filename="cmm-playtest-1.webp" caption="Playtesting session" ratio="auto" /></div>
              <div className="flex-1"><ImagePlaceholder filename="cmm-playtest-2.webp" caption="Playtesting session" ratio="auto" /></div>
              <div className="flex-1"><ImagePlaceholder filename="cmm-playtest-3.webp" caption="Playtesting session" ratio="auto" /></div>
            </div>

            <SubDivider />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mt-[24px]">
              <div className="hidden md:block" />
              <div className="hidden md:block" />
              <div className="md:col-span-2">
                <p className="type-body-sm text-black/40 italic">
                  Playtester feedback validated the direction but also gave us a clear next step we didn't get to fully explore: introducing light "penalties" for winners and losers — such as winners sharing a cultural highlight and losers sharing a moment of cultural embarrassment — to deepen participation beyond the cards themselves.
                </p>
              </div>
            </div>
          </section>

          {/* 05 — Service Ecosystem & Ethics */}
          <section id="s-ecosystem" className="pt-[56px] pb-[80px] md:pb-[120px] border-b border-black/15">
            <SectionLabel>05 — Service Ecosystem & Ethics</SectionLabel>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[56px] md:mb-[72px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Sustaining it beyond one session</p>
                <p className="type-body">
                  "Culture + Labs" — the organisational structure connecting sponsorship, the design team, on-campus offices, faculty, and the student union to produce the app, workshops, and board game.
                </p>
              </div>
              <div className="md:col-span-3 flex flex-col items-center gap-0 w-full">
                <TreeNode label="Culture + Labs" />
                <TreeConnector count={4} />
                <div className="flex items-start gap-[12px] w-full">
                  {["Sponsorship", "Design team", "On-campus offices", "Faculty & student union"].map((n) => (
                    <div key={n} className="flex flex-col items-center flex-1 min-w-0">
                      <TreeNode label={n} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <SubDivider />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[48px] mt-[32px]">
              <div>
                <p className="type-eyebrow mb-[16px]">The full-journey blueprint</p>
                <p className="type-body">
                  Registration through to post-game feedback, mapped across customer actions, frontstage actions, backstage actions, and supporting processes.
                </p>
              </div>
              <div className="hidden md:block" />
              <div className="md:col-span-2">
                <ImagePlaceholder filename="cmm-blueprint.webp" caption="Service blueprint — registration to post-game feedback" ratio="auto" />
              </div>
            </div>

            <SubDivider />

            <div className="mt-[32px]">
              <p className="type-eyebrow mb-[28px]">Ethical risks — and the mitigation for each</p>
              <div className="flex flex-col gap-[8px]">
                {ethicsRisks.map((r) => (
                  <div key={r.risk} className="border border-black/15 px-[16px] py-[14px] flex flex-col gap-[6px]">
                    <p className="type-body-sm">{r.risk}</p>
                    <p className="font-futura-medium text-[11px] leading-relaxed text-black/40">{r.source}</p>
                    <div className="border-l-2 border-brand pl-[12px] py-[2px] mt-[4px]">
                      <p className="type-body-sm text-brand">{r.mitigation}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="type-body-sm text-black/40 italic mt-[20px]">
                This is the kind of judgment that doesn't show up in a card game's visual design, but is exactly what determines whether it's safe to actually run.
              </p>
            </div>
          </section>

          {/* 06 — Outcomes & Reflection */}
          <section id="s-outcomes" className="pt-[56px] pb-[80px] md:pb-[120px]">
            <SectionLabel>06 — Outcomes</SectionLabel>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mb-[48px]">
              <div>
                <p className="type-eyebrow mb-[16px]">What shipped</p>
              </div>
              <div className="md:col-span-3">
                <p className="type-body-key mb-[16px]">
                  A complete system, not just a card game.
                </p>
                <p className="type-body">
                  A working, playtested ruleset (stabilised after 12+ rounds and separate 3-/5-player variants), a co-created card content system sourced from real international-student workshops, a service blueprint and organisational structure for running it sustainably, and a proactive ethics framework for a culturally-sensitive product.
                </p>
              </div>
            </div>

            <SubDivider />

            <div className="mt-[32px]">
              <ImagePlaceholder filename="cmm-final.webp" caption="Culture Meme Master — final playtested version" ratio="auto" />
            </div>

            <SubDivider />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[32px] gap-y-[24px] mt-[32px]">
              <div>
                <p className="type-eyebrow mb-[16px]">Player feedback</p>
              </div>
              <div className="md:col-span-3">
                <p className="type-body">
                  Positive on clarity and replayability: "the mechanics and rules are simple and easy to understand... situations vary and the game can change a lot." By Test 8–12, the game reliably ran its full length, used all cards, and came down to the final round.
                </p>
              </div>
            </div>
          </section>

          {/* Reflection */}
          <section className="pt-[56px] pb-[80px] md:pb-[120px] border-t border-black/15">
            <p className="type-eyebrow mb-[32px] md:mb-[48px]" style={{ letterSpacing: "0.1em" }}>
              Reflection
            </p>

            <div className="max-w-[680px]">
              <p
                className="font-inria-serif leading-[1.3] tracking-tight text-black mb-[24px] md:mb-[32px]"
                style={{ fontSize: "clamp(1.2rem, 2vw, 1.8rem)" }}
              >
                Playtesting is a design tool in its own right, not a final QA step.
              </p>
              <p className="font-futura-medium text-[14px] md:text-[15px] leading-relaxed text-black/70 mb-[20px]">
                The most valuable part of this project for me wasn't the card content or the visual system — it was learning how much of "does this actually work" lives in small, unglamorous rule decisions: a base score, a point value, an end condition.
              </p>
              <p className="font-futura-medium text-[14px] md:text-[15px] leading-relaxed text-black/70">
                If I did this again, I'd want to test the ethics safeguards as rigorously as we tested the rules — running the workshop-vetting and third-party-review process on real card content earlier, rather than designing it as a framework we didn't get to fully stress-test.
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
