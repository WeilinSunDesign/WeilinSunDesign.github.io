import { useState } from "react";
import { Link } from "react-router-dom";

const LIVE_SLUGS = new Set(["healthtech", "swiftfood", "volunteer"]);

export default function ProjectCard({ project }) {
  const [imgError, setImgError]   = useState(false);
  const [showToast, setShowToast] = useState(false);

  const isLive = LIVE_SLUGS.has(project.slug);

  const handleWipClick = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const cardContent = (
    <div className="group relative flex h-full min-h-[420px] flex-col bg-my-bg">
      {project.year && (
        <div className="absolute right-5 top-5 font-futura-heavy text-[16px] tracking-[0.08em] text-black">
          {project.year}
        </div>
      )}

      <div className="px-5 pt-5 md:px-6 md:pt-6">
        {project.chips?.[0] && (
          <span className="inline-flex rounded-full border border-black px-3 py-1 font-futura-medium text-[10px] uppercase tracking-[0.12em] text-black">
            {project.chips[0]}
          </span>
        )}
      </div>

      <div className="w-full aspect-[4/3] overflow-hidden px-5 py-4 md:px-8 md:py-6">
        {imgError ? (
          <div className="w-full h-full border border-dashed border-black/15 bg-black/[0.02] flex items-center justify-center">
            <span className="font-futura-medium text-[10px] text-black/25 uppercase tracking-widest">
              Cover image
            </span>
          </div>
        ) : (
          <img
            src={project.image}
            alt={project.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
          />
        )}
      </div>

      <div className="mt-auto flex items-end justify-between gap-4 px-5 pb-5 pt-2 md:px-6 md:pb-6">
        <div className="min-w-0 flex-1">
          <h3 className="font-futura-heavy text-[14px] uppercase tracking-[0.04em] leading-[1.2] text-black md:text-[15px]">
            {project.title}
          </h3>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.chips.slice(1).map((chip: string) => (
              <span
                key={chip}
                className="rounded-full border border-black px-3 py-1 font-futura-medium text-[10px] uppercase tracking-[0.12em] text-black/70"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

        <div className="flex-shrink-0 rounded-full border border-black px-4 py-2 font-futura-medium text-[11px] font-medium uppercase tracking-[0.08em] text-black transition-colors duration-200 hover:bg-brand hover:text-white hover:border-brand">
          View
        </div>
      </div>

      {/* WIP toast — appears inside the card at the bottom */}
      <div
        style={{
          position:   "absolute",
          bottom:     "20px",
          left:       "50%",
          transform:  showToast ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(8px)",
          opacity:    showToast ? 1 : 0,
          transition: "opacity 0.25s ease, transform 0.25s ease",
          pointerEvents: "none",
          whiteSpace: "nowrap",
          zIndex:     10,
        }}
        className="bg-black text-white font-futura-medium text-[11px] tracking-[0.04em] px-4 py-2 rounded-full"
      >
        This case study is currently being documented — check back soon.
      </div>
    </div>
  );

  if (isLive) {
    return (
      <Link
        to={`/projects/${project.slug}`}
        className="block border-r border-b border-black first:border-l"
        aria-label={project.title}
      >
        {cardContent}
      </Link>
    );
  }

  return (
    <div
      onClick={handleWipClick}
      className="block border-r border-b border-black first:border-l cursor-pointer"
      aria-label={project.title}
    >
      {cardContent}
    </div>
  );
}
