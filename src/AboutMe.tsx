import { useNavigate } from "react-router-dom";
import { about, personal } from "./portfolio.config";

export default function AboutMe() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-screen bg-my-bg text-black flex flex-col font-serif">

      <header className="h-[48px] md:h-[64px] w-full flex border-b border-black flex-shrink-0 z-10">
        <div className="w-full flex items-center pl-[24px] md:pl-[48px]">
          <span
            onClick={() => navigate("/")}
            className="text-sm tracking-widest uppercase font-sans cursor-pointer hover:opacity-50 transition-opacity"
          >
            Home
          </span>
        </div>
      </header>

      <div className="w-full flex flex-col md:flex-row border-b border-black">
        <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r border-black">
          <img
            src={about.photo}
            alt={personal.name}
            className="w-full h-full object-cover max-h-[70vh] aspect-ratio-[4/3]"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-end pt-[40px] md:pt-[64px] pl-[24px] md:pl-[48px] pr-[24px] md:pr-[48px] pb-[40px] md:pb-[64px]">
          <h2 className="text-[clamp(2.5rem,5vw,6rem)] tracking-tighter leading-[0.9] mb-[40px] md:mb-[64px]">
            About Me
          </h2>
          <div className="type-body max-w-[480px]">
            <p>{about.bio}</p>
          </div>
        </div>
      </div>

      <div className="w-full border-b border-black pt-[40px] md:pt-[64px] pl-[24px] md:pl-[48px] pr-[24px] md:pr-[48px] pb-[40px] md:pb-[64px]">
        <h3 className="type-eyebrow mb-[24px]">Skills</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[40px]">
          {about.skills.map((group) => (
            <div key={group.category}>
              <p className="type-subhead text-[18px] mb-[16px]">{group.category}</p>
              <div className="flex flex-wrap gap-[8px]">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="type-chip border border-black px-[12px] py-[6px] opacity-70"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full pt-[40px] md:pt-[64px] pl-[24px] md:pl-[48px] pr-[24px] md:pr-[48px] pb-[40px] md:pb-[64px]">
        <h3 className="font-sans text-sm tracking-widest uppercase opacity-40 mb-[40px]">CV</h3>
        <div className="w-full border border-black mb-[32px] overflow-hidden">
          <iframe
            src="/Weilin_Sun_Product_Designer.pdf"
            className="w-full h-[60vh] md:h-[80vh]"
            title={`${personal.name} CV`}
          />
        </div>
        <a
          href="./Weilin_Sun_Product_Designer.pdf"
          download
          className="inline-flex items-center gap-3 border border-black px-6 py-4 font-sans text-sm tracking-widest uppercase hover:bg-black hover:text-white transition-colors w-fit"
        >
          Download CV
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </a>
      </div>

    </div>
  );
}
