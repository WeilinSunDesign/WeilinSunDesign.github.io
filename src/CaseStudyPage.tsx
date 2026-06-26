import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "./components/Header";
import { registry } from "./case-studies/registry";
import type { Block, Section } from "./case-studies/types";

// ── Image block ───────────────────────────────────────────────────────────────

function CaseImage({ src, caption, ratio = "auto" }: { src: string; caption?: string; ratio?: string }) {
  const [error, setError] = useState(false);
  return (
    <div className="flex flex-col gap-[6px]">
      {error ? (
        <div
          className="w-full bg-black/[0.03] border border-dashed border-black/12 flex items-center justify-center"
          style={{ aspectRatio: ratio === "auto" ? undefined : ratio, minHeight: "120px" }}
        >
          <p className="type-eyebrow text-black/25">{src}</p>
        </div>
      ) : (
        <img
          src={`/${src}`}
          alt={caption || src}
          className="w-full object-cover"
          style={ratio === "auto" ? undefined : { aspectRatio: ratio }}
          loading="lazy"
          decoding="async"
          onError={() => setError(true)}
        />
      )}
      {caption && (
        <p className="font-futura-heavy text-[11px] opacity-30 text-black">{caption}</p>
      )}
    </div>
  );
}

// ── Block renderer ────────────────────────────────────────────────────────────

function RenderBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "paragraph":
      return <p className="type-body mb-[20px]">{block.text}</p>;

    case "paragraph-key":
      return <p className="type-body-key mb-[20px]">{block.text}</p>;

    case "decision":
      return (
        <p className="type-decision mb-[20px]">{block.text}</p>
      );

    case "subhead":
      return (
        <p className="font-futura-heavy text-[14px] uppercase tracking-[0.06em] text-black mb-[12px] mt-[32px]">
          {block.text}
        </p>
      );

    case "image":
      return (
        <div className="mb-[32px]">
          <CaseImage src={block.src!} caption={block.caption} ratio={block.ratio} />
        </div>
      );

    case "image-row":
      return (
        <div
          className="mb-[32px] grid gap-[12px]"
          style={{ gridTemplateColumns: `repeat(${block.images?.length ?? 2}, 1fr)` }}
        >
          {block.images?.map((img, i) => (
            <CaseImage key={i} src={img.src} caption={img.caption} />
          ))}
        </div>
      );

    default:
      return null;
  }
}

// ── Sidebar nav ───────────────────────────────────────────────────────────────

function SidebarNav({
  sections,
  active,
  visible,
  onNavigate,
}: {
  sections: Section[];
  active: string;
  visible: boolean;
  onNavigate: (id: string) => void;
}) {
  const activeIdx = sections.findIndex((s) => s.id === active);

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
      {sections.map((section, i) => {
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
                  fontFamily:    "var(--font-futura-medium)",
                  color:         isActive ? "#63C2BD" : "#131313",
                  whiteSpace:    "nowrap",
                  opacity:       isActive ? 1 : 0,
                  transform:     isActive ? "translateX(0)" : "translateX(-4px)",
                  transition:    "opacity 0.3s ease, transform 0.3s ease",
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                {section.navLabel}
              </span>
            </button>

            {i < sections.length - 1 && (
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

// ── Main page ─────────────────────────────────────────────────────────────────

export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const content = slug ? registry[slug] : undefined;

  const [activeSection, setActiveSection] = useState("");
  const [navVisible,    setNavVisible]    = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  useEffect(() => {
    if (!content) return;
    window.scrollTo({ top: 0, behavior: "auto" });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    content.sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) { sectionRefs.current[s.id] = el; observer.observe(el); }
    });

    const handleScroll = () => setNavVisible(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [content]);

  // ── 404 / WIP state ──
  if (!content) {
    return (
      <div className="min-h-screen w-full bg-my-bg flex flex-col font-serif">
        <Header />
        <div className="flex-1 flex items-center justify-center px-[48px]">
          <div className="text-center">
            <p className="type-eyebrow mb-[16px]">Case study</p>
            <h1 className="font-futura-heavy text-[2rem] mb-[24px]">Not found</h1>
            <Link to="/projects" className="type-body hover:text-brand transition-colors">
              ← Back to projects
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-my-bg text-black flex flex-col font-serif">
      <Header />

      <SidebarNav
        sections={content.sections}
        active={activeSection}
        visible={navVisible}
        onNavigate={scrollTo}
      />

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden"
        style={
          content.heroBackground
            ? {
                backgroundImage:    `url(/${content.heroBackground})`,
                backgroundSize:     "cover",
                backgroundPosition: "center",
              }
            : {}
        }
      >
        <div className="bg-my-bg/80 backdrop-blur-[2px] px-[24px] pt-[48px] pb-[48px] md:px-[80px] md:pt-[64px] md:pb-[64px] xl:px-[120px]">
          <div className="flex flex-wrap gap-[8px] mb-[32px]">
            {content.heroTags.map((tag) => (
              <span
                key={tag}
                className="type-chip border border-black/30 px-[12px] py-[5px] rounded-full text-black/60"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="type-display max-w-[900px] mb-[48px] md:mb-[64px]">
            {content.title}
          </h1>

          {/* Intro metadata grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[48px] gap-y-[16px] max-w-[800px]">
            {content.intro.map(({ label, value }) => (
              <div key={label} className="flex gap-[16px]">
                <span className="font-futura-heavy text-[13px] opacity-40 shrink-0 w-[90px]">
                  {label}
                </span>
                <span className="type-body">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sections ───────────────────────────────────────────────────────── */}
      <div className="flex-1 w-full max-w-[860px] mx-auto px-[24px] md:px-[48px] xl:px-0 pb-[96px]">
        {content.sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="pt-[64px] md:pt-[80px] scroll-mt-[80px]"
          >
            {section.heading && (
              <p className="type-section-nav mb-[32px] md:mb-[48px]">
                {section.heading}
              </p>
            )}

            {section.blocks.map((block, i) => (
              <RenderBlock key={i} block={block} />
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
