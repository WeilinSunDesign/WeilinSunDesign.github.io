import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import Header from "./components/Header";
import ProjectCards from "./components/ProjectCards";
import { projects, projectSections } from "./portfolio.config";

// Build the section+projects structure from config at module level
const sections = projectSections.map((section) => ({
  ...section,
  projects: projects.filter((p) => p.section === section.id),
}));

export default function ProjectsPage() {
  const location = useLocation();

  const hashTarget = useMemo(() => {
    return location.hash ? location.hash.replace("#", "") : null;
  }, [location.hash]);

  useEffect(() => {
    if (!hashTarget) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    const el = document.getElementById(hashTarget);

    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 32;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [hashTarget]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-my-bg text-black flex flex-col font-serif">
      <Header />

      <div className="flex-1 mx-auto w-full max-w-[1920px] pb-[56px] md:pb-[72px]">
        <div className="space-y-0">
          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-10"
            >
              <div className="border-b border-black px-[24px] pb-[24px] md:pb-[48px] pt-[24px] md:pt-[48px] py-[2px] md:px-[36px] md:py-[2px] xl:px-[48px]">
                <p className="type-eyebrow mb-[8px]">Selected Work</p>
                <h2 className="type-section-title">{section.title}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {section.projects.map((project) => (
                  <ProjectCards key={project.slug} project={project} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
