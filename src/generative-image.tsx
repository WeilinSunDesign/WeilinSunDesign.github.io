import React, { useEffect, useRef, useState } from "react";
import Header from "./components/Header";

// ── Data ──────────────────────────────────────────────────────────────────────

const heroTags = ["Generative Art", "Creative Coding", "Visual System", "Experiment"];

const introDetails: { label: string; value: string | React.ReactNode }[] = [
  {
    label: "Overview:",
    value:
      "A study in generative image-making — exploring how rule-based systems, noise fields, and iterative processes can produce unexpected visual outcomes from minimal instruction.",
  },
  {
    label: "Approach:",
    value:
      "Each image emerges from a distinct algorithm or parameter set, treated as a specimen within a larger visual taxonomy. The work sits between system design and image-making.",
  },
  { label: "Year:",  value: "2026" },
  { label: "Tools:", value: "p5.js, TouchDesigner, Python" },
  { label: "Type:",  value: "Personal Experiment / Creative Research" },
];

// Six square images — replace paths with your own files
const images = [
  {
    filename: "gis-01.webp",
    caption: "Seed Form — the generative origin, iteration 01",
  },
  {
    filename: "gis-02.webp",
    caption: "Noise Field — organic patterning across a 512 × 512 grid",
  },
  {
    filename: "gis-03.webp",
    caption: "Growth Pattern — branching structure, iteration 12",
  },
  {
    filename: "gis-04.webp",
    caption: "Fragment Study — decomposition and scatter",
  },
  {
    filename: "gis-05.webp",
    caption: "System Output — final compositional render",
  },
  {
    filename: "gis-06.webp",
    caption: "Residue — what the system leaves behind",
  },
];

// ── Sub-components ─────────────────────────────────────────────────────────────

function SquareImage({ filename, caption }: { filename: string; caption: string }) {
  const [error, setError] = useState(false);

  return (
    <div className="flex flex-col gap-[10px]">
      <div className="w-full overflow-hidden" style={{ aspectRatio: "1 / 1" }}>
        {error ? (
          <div className="w-full h-full bg-black/[0.03] border border-dashed border-black/15 flex items-center justify-center">
            <p
              className="font-futura-medium text-[11px] text-black/25 text-center px-4"
              style={{ letterSpacing: "0.04em" }}
            >
              {filename}
            </p>
          </div>
        ) : (
          <img
            src={`/${filename}`}
            alt={caption}
            onError={() => setError(true)}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <p className="font-futura-medium text-[11px] md:text-[12px] text-black/40 leading-snug">
        {caption}
      </p>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function GenerativeImageStudy() {
  const [scrollY, setScrollY]   = useState(0);
  const [titleH, setTitleH]     = useState(0);
  const titleBlockRef           = useRef<HTMLDivElement>(null);

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

  return (
    <div className="min-h-screen w-full bg-my-bg text-black font-serif">

      {/* Fixed header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header right="projects" />
      </div>

      {/* ══════════════════════════════════════════════
          SCREEN 1 — HERO
          Full-viewport, background image with parallax.
          Replace /gis-bg.png with your own cover image.
      ══════════════════════════════════════════════ */}
      <section
        style={{
          position:           "relative",
          height:             "100svh",
          backgroundImage:    "url(/gis-bg.webp)",
          backgroundSize:     "cover",
          backgroundPosition: typeof window !== "undefined" && window.innerWidth < 768
            ? `center ${scrollY * 0.1}px`
            : `center ${scrollY * 0.22}px`,
          backgroundRepeat:   "no-repeat",
          backgroundColor:    "#E8E8E4", // fallback when image not yet added
        }}
      >
        {/* Sticky title block */}
        <div
          ref={titleBlockRef}
          className="sticky top-[48px] md:top-[64px] px-[24px] md:px-[48px] xl:px-[80px] pt-[20px] md:pt-[28px] pb-[16px] md:pb-[22px]"
        >
          <h1
            className="font-inria-serif leading-[0.95] tracking-tighter text-black bg-my-bg"
            style={{
              fontSize:     "clamp(1.5rem, 3.8vw, 4.2rem)",
              paddingLeft:  "4px",
              paddingRight: "4px",
              display:      "inline",
            }}
          >
            Generative Image Study
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
            width="16" height="16"
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
          Two-column on desktop: image left, details right.
          Replace /gis-intro.png with your own intro image.
      ══════════════════════════════════════════════ */}
      <section className="flex flex-col pb-[56px] md:pb-[80px]">
        <div className="flex flex-col md:grid md:grid-cols-2 px-[24px] md:px-[96px]">

          {/* Left — image */}
          <div className="flex flex-col justify-center self-stretch">
            <div
              className="w-full bg-black/[0.03] border border-dashed border-black/10 flex items-center justify-center"
              style={{ aspectRatio: "4 / 3" }}
            >
              <p className="font-futura-medium text-[11px] text-black/20" style={{ letterSpacing: "0.04em" }}>
                gis-intro.png
              </p>
            </div>
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
          CASE STUDY — IMAGE GALLERY
          Five square images in an asymmetric artistic layout.
          Mobile: stacked single column.
          Desktop: free-form grid with offsets.
      ══════════════════════════════════════════════ */}
      <section className="px-[24px] md:px-[96px] pb-[120px] md:pb-[160px]">

        {/* Section divider + label */}
        <div className="border-t border-black/15 mb-[48px] md:mb-[72px]" />
        <p
          className="type-eyebrow mb-[48px] md:mb-[80px]"
          style={{ letterSpacing: "0.1em" }}
        >
          Image Studies
        </p>

        {/* ── Mobile layout: single column ─────────── */}
        <div className="flex flex-col gap-[48px] md:hidden">
          {images.map((img) => (
            <SquareImage key={img.filename} filename={img.filename} caption={img.caption} />
          ))}
        </div>

        {/* ── Desktop layout: asymmetric arrangement ── */}
        <div className="hidden md:block relative">

          {/* Row 1 — img1 (large, left) + img2 (smaller, right, pushed down) */}
          <div className="flex items-start gap-[40px]">
            <div className="w-[58%] flex-shrink-0">
              <SquareImage filename={images[0].filename} caption={images[0].caption} />
            </div>
            <div className="flex-1 mt-[22%]">
              <SquareImage filename={images[1].filename} caption={images[1].caption} />
            </div>
          </div>

          {/* Row 2 — img3 (medium, left-center offset) */}
          <div className="flex mt-[80px]">
            <div className="ml-[12%] w-[46%]">
              <SquareImage filename={images[2].filename} caption={images[2].caption} />
            </div>
          </div>

          {/* Row 3 — img4 (small, left) + img5 (large, right, pulled up) */}
          <div className="flex items-start gap-[48px] mt-[60px]">
            <div className="w-[34%] flex-shrink-0 mt-[6%]">
              <SquareImage filename={images[3].filename} caption={images[3].caption} />
            </div>
            <div className="flex-1">
              <SquareImage filename={images[4].filename} caption={images[4].caption} />
            </div>
          </div>

          {/* Row 4 — img6 (medium, right-aligned, solo) */}
          <div className="flex justify-end mt-[80px]">
            <div className="w-[40%] mr-[6%]">
              <SquareImage filename={images[5].filename} caption={images[5].caption} />
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
