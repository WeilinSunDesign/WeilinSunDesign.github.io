import { useEffect } from "react";
import Header from "./components/Header";

const css = `
  .oceanus-page {
    background: var(--color-my-bg);
    color: #1A1A1A;
    font-size: clamp(16px, 1.1vw, 18px);
    line-height: 1.75;
    overflow-x: hidden;
  }
  .oceanus-page * { box-sizing: border-box; }
  .oceanus-page img { display: block; width: 100%; height: auto; }

  .oceanus-page .reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  .oceanus-page .reveal.visible {
    opacity: 1;
    transform: none;
  }

  /* ── Hero ── */
  .oceanus-hero {
    min-height: 100svh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: relative;
    overflow: hidden;
    background: black;
  }
  .oceanus-hero-img {
    position: absolute;
    inset: 0;
    object-fit: cover;
    width: 100%;
    height: 100%;
    opacity: 0.6;
  }
  .oceanus-hero-content {
    position: relative;
    z-index: 2;
    padding: clamp(40px, 6vw, 80px) clamp(24px, 5vw, 80px);
    border-top: 1px solid rgba(255,255,255,0.15);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    align-items: end;
  }
  .oceanus-hero-title {
    font-size: clamp(52px, 7vw, 96px);
    font-weight: 300;
    line-height: 0.95;
    letter-spacing: -0.02em;
    color: #fff;
    margin: 0;
  }
  .oceanus-hero-meta {
    display: flex;
    flex-direction: column;
    gap: 24px;
    align-items: flex-end;
    text-align: right;
  }
  .oceanus-hero-tagline {
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.55);
  }
  .oceanus-hero-desc {
    font-size: clamp(15px, 1.1vw, 17px);
    color: rgba(255,255,255,0.75);
    line-height: 1.65;
    max-width: 380px;
    margin: 0;
  }
  .oceanus-hero-tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    justify-content: flex-end;
  }
  .oceanus-tag {
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    border: 1px solid rgba(255,255,255,0.25);
    color: rgba(255,255,255,0.55);
    padding: 4px 10px;
  }

  /* ── Layout ── */
  .oceanus-container {
   max-width: calc(100% - 96px);
   margin: 0 auto;
   padding: 0;
  }
  .oceanus-section {
    padding: clamp(64px, 10vw, 120px) 0;
  }
  .oceanus-section + .oceanus-section {
    border-top: 1px solid #d0cec8;
  }
  .oceanus-section-label {
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: black;
    margin-bottom: 48px;
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .oceanus-section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #d0cec8;
  }

  /* ── Typography ── */
  .oceanus-page h2 {
    font-size: clamp(32px, 3.5vw, 52px);
    font-weight: 300;
    line-height: 1.1;
    letter-spacing: -0.01em;
    margin: 0;
  }
  .oceanus-page h3 {
    font-size: clamp(18px, 1.5vw, 22px);
    font-weight: 500;
    margin-bottom: 12px;
  }
  .oceanus-page h4 {
    margin: 0;
  }
  .oceanus-page p { color: rgba(26,26,26,0.78); max-width: 640px; margin: 0; }
  .oceanus-page p + p { margin-top: 1em; }
  .oceanus-blockquote {
    border-left: 2px solid var(--color-brand);
    padding-left: 24px;
    font-style: italic;
    color: rgba(26,26,26,0.78);
    font-size: clamp(16px, 1.2vw, 19px);
    line-height: 1.7;
    margin: 40px 0;
    max-width: 680px;
  }

  /* ── Video ── */
  .oceanus-video-section {
    padding: 0;
    background: #1A1A1A;
  }
  .oceanus-video-wrap {
    position: relative;
    width: 100%;
    aspect-ratio: 16/9;
    background: #1A1A1A;
    overflow: hidden;
    max-width: 1140px;
    margin: 0 auto;
  }
  .oceanus-video-wrap iframe {
    width: 100%;
    aspect-ratio: 16 / 9;
    border: none;
    display: block;
  }

  /* ── Two col ── */
  .oceanus-two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(40px, 6vw, 80px);
    align-items: start;
  }

  /* ── Stats ── */
  .oceanus-stat-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2px;
    margin: 48px 0;
  }
  .oceanus-stat-block {
    background: #1A1A1A;
    color: #fff;
    padding: clamp(24px, 3vw, 40px);
  }
  .oceanus-stat-block:nth-child(even) { background: #2a2a26; }
  .oceanus-stat-num {
    font-size: clamp(40px, 4vw, 64px);
    font-weight: 300;
    line-height: 1;
    margin-bottom: 8px;
    color: var(--color-brand);
  }
  .oceanus-stat-label {
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
  }

  /* ── Insight cards ── */
  .oceanus-insights {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: #d0cec8;
    border: 1px solid #d0cec8;
    margin: 48px 0;
  }
  .oceanus-insight-card {
    background: var(--color-my-bg);
    padding: clamp(24px, 3vw, 40px);
  }
  .oceanus-insight-num {
    font-size: 10px;
    letter-spacing: 0.14em;
    color: rgba(26,26,26,0.55);
    margin-bottom: 20px;
    text-transform: uppercase;
  }
  .oceanus-insight-card h4 {
    font-size: clamp(16px, 1.3vw, 20px);
    font-weight: 500;
    margin-bottom: 12px;
    line-height: 1.3;
    color: #1A1A1A;
  }
  .oceanus-insight-card p { font-size: 14px; line-height: 1.65; max-width: none; }

  /* ── Design points ── */
  .oceanus-design-points {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1px;
    background: #d0cec8;
    border: 1px solid #d0cec8;
    margin: 48px 0;
  }
  .oceanus-dp {
    background: var(--color-my-bg);
    padding: clamp(20px, 2.5vw, 36px);
    display: flex;
    gap: 20px;
  }
  .oceanus-dp-num {
    font-size: 10px;
    letter-spacing: 0.1em;
    color: rgba(26,26,26,0.55);
    flex-shrink: 0;
    padding-top: 3px;
    text-transform: uppercase;
  }
  .oceanus-dp-body h4 {
    font-weight: 500;
    font-size: clamp(15px, 1.1vw, 17px);
    margin-bottom: 8px;
    color: #1A1A1A;
  }
  .oceanus-dp-body p { font-size: 14px; max-width: none; }

  /* ── Screens strip ── */
  .oceanus-screens-strip {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2px;
    margin: 48px 0;
  }
  .oceanus-screen-item { position: relative; overflow: hidden; }
  .oceanus-screen-item img { transition: transform 0.4s ease; }
  .oceanus-screen-item:hover img { transform: scale(1.03); }
  .oceanus-screen-caption {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    background: linear-gradient(transparent, rgba(0,0,0,0.7));
    color: #fff;
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 20px 12px 10px;
  }

  /* ── Placeholder image ── */
  .oceanus-img-placeholder {
    width: 100%;
    background: #e8e6e1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(26,26,26,0.35);
    aspect-ratio: 16/9;
  }
  .oceanus-img-placeholder.square { aspect-ratio: 1/1; }
  .oceanus-img-placeholder.tall { aspect-ratio: 3/4; }
  .oceanus-img-placeholder.wide { aspect-ratio: 21/9; }

  /* ── Misc ── */
  .oceanus-scenario-label {
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(26,26,26,0.55);
    padding: 8px 0;
    border-bottom: 1px solid #d0cec8;
    margin-bottom: 4px;
  }
  .oceanus-credits {
    display: flex;
    gap: 48px;
    flex-wrap: wrap;
    padding-top: 40px;
  }
  .oceanus-credit-group { display: flex; flex-direction: column; gap: 4px; }
  .oceanus-credit-role {
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(26,26,26,0.55);
  }
  .oceanus-credit-name { font-size: 15px; color: #1A1A1A; }
  .oceanus-footer {
    border-top: 1px solid #d0cec8;
    padding: 40px clamp(24px, 5vw, 64px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 11px;
    letter-spacing: 0.1em;
    color: rgba(26,26,26,0.55);
    text-transform: uppercase;
  }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .oceanus-hero {
      min-height: unset;
      max-width: 100%;
      padding: 0 8px;
    }
    .oceanus-hero-img {
      position: static;
      width: 100%;
      height: auto;
      object-fit: unset;
      display: block;
      opacity: 1;
    }
    .oceanus-hero-content {
      grid-template-columns: 1fr;
      gap: 24px;
      background: #1A1A1A;
      position: relative;
    }
    .oceanus-hero-meta { align-items: flex-start; text-align: left; }
    .oceanus-hero-tags { justify-content: flex-start; }
    .oceanus-two-col { grid-template-columns: 1fr; }
    .oceanus-stat-row { grid-template-columns: 1fr 1fr; }
    .oceanus-insights { grid-template-columns: 1fr; }
    .oceanus-design-points { grid-template-columns: 1fr; }
    .oceanus-screens-strip { grid-template-columns: 1fr 1fr; }
    .oceanus-footer { flex-direction: column; gap: 8px; text-align: center; }
  }
`;

// ── Placeholder helpers ──────────────────────────────────────────────────────
const Img = ({ label = "Image Placeholder", ratio = "16/9" }: { label?: string; ratio?: string }) => (
  <div
    style={{
      width: "100%",
      background: "#e8e6e1",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 10,
      letterSpacing: "0.14em",
      textTransform: "uppercase" as const,
      color: "rgba(26,26,26,0.35)",
      aspectRatio: ratio,
    }}
  >
    {label}
  </div>
);

export default function ProjectPageTemplate() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <style>{css}</style>

      <Header />

      <div className="oceanus-page">

        {/* ══════════════════════════════════════════
            HERO
            — hero-img: 全幅背景图
            — hero-title: 项目主标题（大字）
            — hero-desc: 项目一句话简介
            — hero-tags: 分类标签，如 UX / AR / Research
        ══════════════════════════════════════════ */}
        <section className="oceanus-hero">
          <Img label="Hero Image" ratio="16/9" />
          <div className="oceanus-hero-content">
            <h1 className="oceanus-hero-title">Project Title</h1>
            <div className="oceanus-hero-meta">
              <p className="oceanus-hero-desc">
                A one-sentence project description that summarises the concept, context, and intended audience of this work.
              </p>
              <div className="oceanus-hero-tags">
                <span className="oceanus-tag">Tag A</span>
                <span className="oceanus-tag">Tag B</span>
                <span className="oceanus-tag">Tag C</span>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            OVERVIEW
            — h2: 核心问题或项目切入点
            — blockquote: 引言 / 核心洞察
            — body-copy: 项目背景段落（2–3句）
            — project-details table: 角色 / 工具 / 背景
        ══════════════════════════════════════════ */}
        <section className="oceanus-section">
          <div className="oceanus-container">
            <div className="oceanus-section-label">Overview</div>
            <div className="oceanus-two-col">
              <div className="reveal">
                <h2>Core question or framing headline goes here</h2>
                <blockquote className="oceanus-blockquote">
                  "A key quote or provocation that frames the project — this should capture the central tension or opportunity being explored."
                </blockquote>
                <p>
                  Body copy paragraph one. Describe the project's origin, context, and the problem space it addresses. Keep this grounded and specific — one or two concrete details will anchor the reader better than broad generalisations.
                </p>
                <p>
                  Body copy paragraph two. Expand on the approach, methodology, or key constraint that shaped the work. This is where you establish credibility and signal rigour.
                </p>
              </div>
              <div className="reveal" style={{ transitionDelay: "0.15s" }}>
                <div className="oceanus-scenario-label">Project Details</div>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, color: "rgba(26,26,26,0.78)" }}>
                  <tbody>
                    {[
                      ["Role", "Role A, Role B, Role C"],
                      ["Tools", "Tool A, Tool B, Tool C"],
                      ["Context", "Course / Studio / Organisation — brief context note"],
                    ].map(([label, value], i, arr) => (
                      <tr key={label} style={{ borderBottom: i < arr.length - 1 ? "1px solid #d0cec8" : "none" }}>
                        <td style={{ padding: "10px 24px 10px 0", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(26,26,26,0.55)", whiteSpace: "nowrap" }}>
                          {label}
                        </td>
                        <td style={{ padding: "10px 0" }}>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            VIDEO / DEMO
            — embed: YouTube iframe（替换 src）
            — caption: 视频说明文字
        ══════════════════════════════════════════ */}
        <section className="oceanus-video-section">
          <div className="oceanus-video-wrap reveal">
            <iframe
              src="https://www.youtube.com/embed/VIDEO_ID_HERE"
              title="Project video title"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="oceanus-video-caption" style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", textAlign: "center", padding: "16px 24px" }}>
            Video caption — describe what the viewer is watching and what it demonstrates
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 01 — RESEARCH / CONTEXT
            — h2: 研究阶段标题
            — body-copy: 研究方法与发现（2段）
            — blockquote: 关键引用
            — research-img-1 / research-img-2: 研究图表或数据截图
            — stat-row: 3个关键数据点
            — full-width-img: 大图（地图、时间线、数据可视化等）
        ══════════════════════════════════════════ */}
        <section className="oceanus-section">
          <div className="oceanus-container">
            <div className="oceanus-section-label">01 — Research & Context</div>
            <div className="oceanus-two-col reveal">
              <div>
                <h2>Research phase headline — what you set out to understand</h2>
                <p>
                  Research body copy paragraph one. Describe the sources, datasets, or methods used. Be specific: name the organisations, reports, or frameworks you drew from. Specificity builds trust.
                </p>
                <p style={{ marginTop: "1em" }}>
                  Research body copy paragraph two. Summarise a key finding or tension that emerged from the research. This should create a bridge to the next section.
                </p>
                <blockquote className="oceanus-blockquote">
                  "A direct quote from a research source, expert, or document that captures the stakes of the problem."
                </blockquote>
              </div>
              <div>
                <Img label="Research Image 1" ratio="4/3" />
                <div style={{ marginTop: 2 }}>
                  <Img label="Research Image 2" ratio="4/3" />
                </div>
              </div>
            </div>
            <div className="oceanus-stat-row reveal">
              {[
                { num: "Stat 1", label: "Label describing what this number means" },
                { num: "Stat 2", label: "Label describing what this number means" },
                { num: "Stat 3", label: "Label describing what this number means" },
              ].map(({ num, label }) => (
                <div className="oceanus-stat-block" key={num}>
                  <div className="oceanus-stat-num">{num}</div>
                  <div className="oceanus-stat-label">{label}</div>
                </div>
              ))}
            </div>
            <div className="reveal" style={{ marginTop: 16 }}>
              <Img label="Full-Width Research Visual — timeline, map, or data visualisation" ratio="21/9" />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 02 — SCENARIO / FRAMEWORK
            — h2: 场景或框架标题
            — body-copy: 方法论描述（2段）
            — bullet-list: 主要发现或设定条件
            — full-width-img: 场景矩阵或框架图
        ══════════════════════════════════════════ */}
        <section className="oceanus-section">
          <div className="oceanus-container">
            <div className="oceanus-section-label">02 — Scenario & Framework</div>
            <div className="oceanus-two-col reveal">
              <div>
                <h2>Scenario or framework headline</h2>
                <p>
                  Framework body copy paragraph one. Describe the methodology or conceptual framework used to structure the project. Name it if it has a name; explain what it does if it doesn't.
                </p>
                <p>
                  Framework body copy paragraph two. Describe the specific scenario or design space this project operates within. Include time horizon, geography, or user group as appropriate.
                </p>
              </div>
              <div style={{ fontSize: 14, color: "rgba(26,26,26,0.78)" }}>
                <p>
                  <strong style={{ color: "#1A1A1A" }}>Key conditions or assumptions identified:</strong>
                </p>
                <ul style={{ marginTop: 12, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    "Condition or assumption one",
                    "Condition or assumption two",
                    "Condition or assumption three",
                    "Condition or assumption four",
                    "Condition or assumption five",
                  ].map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </div>
            <div className="reveal" style={{ marginTop: 48 }}>
              <Img label="Framework / Scenario Matrix Image" ratio="16/7" />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 03 — ISSUE ANALYSIS
            — h2: 分析标题
            — body-copy: 问题背景描述
            — insight-cards (×3): 问题卡片
              · num: "Problem 01" etc.
              · title: 问题简名
              · body: 具体描述（2–3句）
            — full-width-img: 利益相关者图 / 系统图
        ══════════════════════════════════════════ */}
        <section className="oceanus-section">
          <div className="oceanus-container">
            <div className="oceanus-section-label">03 — Issue Analysis</div>
            <div className="reveal">
              <h2>Issue analysis headline — name the event or system being examined</h2>
              <p style={{ maxWidth: 700, marginTop: 16 }}>
                Issue analysis body copy. Describe the real-world event, system failure, or user pain point that grounds this section. Be specific about who was affected, what failed, and why. This establishes the problem space that the design will respond to.
              </p>
            </div>
            <div className="oceanus-insights reveal" style={{ marginTop: 48 }}>
              {[
                { num: "Problem 01", title: "Problem card title one", body: "Description of the first identified problem. Be specific — name the actor, the action, and the consequence. Two to three sentences." },
                { num: "Problem 02", title: "Problem card title two", body: "Description of the second identified problem. Use evidence or a direct quote if possible. Two to three sentences." },
                { num: "Problem 03", title: "Problem card title three", body: "Description of the third identified problem. Connect this back to the systemic issue identified in the section intro. Two to three sentences." },
              ].map(({ num, title, body }) => (
                <div className="oceanus-insight-card" key={num}>
                  <div className="oceanus-insight-num">{num}</div>
                  <h4>{title}</h4>
                  <p>{body}</p>
                </div>
              ))}
            </div>
            <div className="reveal">
              <Img label="Stakeholder Map / System Diagram" ratio="16/9" />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 04 — SYSTEM / CONCEPT DESIGN
            — h2: 设计方案标题
            — body-copy: 设计决策描述（2段）
            — comparison-img: 现有方案 vs. 新方案对比图
            — design-points (×4): 设计要点卡片
              · num: "DP 01" etc.
              · title: 设计点简名
              · body: 从洞察到决策的推理（3–4句）
        ══════════════════════════════════════════ */}
        <section className="oceanus-section">
          <div className="oceanus-container">
            <div className="oceanus-section-label">04 — System & Concept Design</div>
            <div className="oceanus-two-col reveal">
              <div>
                <h2>Design concept headline — describe the shift being made</h2>
                <p>
                  Design concept body copy paragraph one. Describe the core design response to the problems identified in Section 03. What is the system, product, or service? How does it work at a high level?
                </p>
                <p>
                  Design concept body copy paragraph two. Describe how users interact with the concept. Name the key components or touchpoints.
                </p>
              </div>
              <div>
                <Img label="Before / After or System Comparison Image" ratio="4/3" />
              </div>
            </div>
            <div className="reveal" style={{ marginTop: 64 }}>
              <div className="oceanus-section-label" style={{ marginBottom: 32 }}>
                Design Rationale — From Insights to Design Points
              </div>
              <div className="oceanus-design-points">
                {[
                  { num: "DP 01", title: "Design point title one", body: "Explain the insight this design point responds to, and describe the specific design decision made. Connect cause to effect clearly. Three to four sentences." },
                  { num: "DP 02", title: "Design point title two", body: "Explain the insight this design point responds to, and describe the specific design decision made. Connect cause to effect clearly. Three to four sentences." },
                  { num: "DP 03", title: "Design point title three", body: "Explain the insight this design point responds to, and describe the specific design decision made. Connect cause to effect clearly. Three to four sentences." },
                  { num: "DP 04", title: "Design point title four", body: "Explain the insight this design point responds to, and describe the specific design decision made. Connect cause to effect clearly. Three to four sentences." },
                ].map(({ num, title, body }) => (
                  <div className="oceanus-dp" key={num}>
                    <span className="oceanus-dp-num">{num}</span>
                    <div className="oceanus-dp-body">
                      <h4>{title}</h4>
                      <p>{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 05 — HARDWARE / PRODUCT DESIGN
            — h2: 产品设计标题
            — body-copy: 产品功能描述（1段）
            — feature-list (×2): 功能分组
              · role: 功能类型标签（如 INTERNAL / EXTERNAL）
              · desc: 功能说明
            — product-render: 产品渲染图
            — diagram-img: 产品结构或拆解图
        ══════════════════════════════════════════ */}
        <section className="oceanus-section">
          <div className="oceanus-container">
            <div className="oceanus-section-label">05 — Hardware & Product Design</div>
            <div className="oceanus-two-col reveal" style={{ alignItems: "center" }}>
              <div>
                <h2>Hardware or product design headline</h2>
                <p>
                  Product design body copy. Describe the physical or digital product that enables the system. What are its key components? How does the form factor serve the use case? Connect material decisions to functional requirements.
                </p>
                <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 16 }}>
                  {[
                    { role: "Feature Group A", desc: "Feature description — list the capabilities, sensors, or outputs that belong to this group of the product." },
                    { role: "Feature Group B", desc: "Feature description — list the capabilities, sensors, or outputs that belong to this group of the product." },
                  ].map(({ role, desc }) => (
                    <div key={role} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 10, letterSpacing: "0.1em", color: "rgba(26,26,26,0.55)", flexShrink: 0, paddingTop: 2, textTransform: "uppercase" as const }}>
                        {role}
                      </span>
                      <p style={{ fontSize: 14, maxWidth: "none" }}>{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Img label="Product Render Image" ratio="4/3" />
              </div>
            </div>
            <div className="reveal" style={{ marginTop: 48 }}>
              <Img label="Product Diagram / Exploded View / Component Breakdown" ratio="16/7" />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 06 — USER FLOW / SCREENS
            — h2: 用户流程标题
            — body-copy: 流程描述（1段，说明场景）
            — full-width-img: 流程总览图
            — screen-strip-1 (×4): 流程截图第一排
              · caption: "01 — Step Name"
            — screen-strip-2 (×3 + 1 placeholder): 第二排
        ══════════════════════════════════════════ */}
        <section className="oceanus-section">
          <div className="oceanus-container">
            <div className="oceanus-section-label">06 — User Flow & Screens</div>
            <div className="reveal">
              <h2>User flow headline — name the scenario being demonstrated</h2>
              <p style={{ marginTop: 16, maxWidth: 640 }}>
                User flow body copy. Describe the specific scenario shown in the screens below. Name the user, the task, the context, and the outcome. Walk the reader through what they are about to see before they see it.
              </p>
            </div>
            <div className="reveal" style={{ marginTop: 48 }}>
              <Img label="User Flow Overview / Journey Map" ratio="21/9" />
            </div>
            <div className="oceanus-screens-strip reveal">
              {[
                { caption: "01 — Step Name" },
                { caption: "02 — Step Name" },
                { caption: "03 — Step Name" },
                { caption: "04 — Step Name" },
              ].map(({ caption }) => (
                <div className="oceanus-screen-item" key={caption}>
                  <Img label={caption} ratio="9/16" />
                  <div className="oceanus-screen-caption">{caption}</div>
                </div>
              ))}
            </div>
            <div className="oceanus-screens-strip reveal">
              {[
                { caption: "05 — Step Name" },
                { caption: "06 — Step Name" },
                { caption: "07 — Step Name" },
              ].map(({ caption }) => (
                <div className="oceanus-screen-item" key={caption}>
                  <Img label={caption} ratio="9/16" />
                  <div className="oceanus-screen-caption">{caption}</div>
                </div>
              ))}
              <div className="oceanus-screen-item" style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(99,194,189,0.12)", padding: 32 }}>
                <p style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(26,26,26,0.55)", textAlign: "center", maxWidth: "none" }}>
                  Closing message<br />or next action prompt
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 07 — REFLECTION
            — h2: 反思标题
            — body-copy-left: 主要反思（2段）
            — body-copy-right: 关键洞察（bold句）+ 未来方向
        ══════════════════════════════════════════ */}
        <section className="oceanus-section">
          <div className="oceanus-container">
            <div className="oceanus-section-label">07 — Reflection</div>
            <div className="oceanus-two-col reveal">
              <div>
                <h2>Reflection headline — what you learned about the problem space</h2>
                <p>
                  Reflection paragraph one. Describe the most challenging aspect of the project — not the hardest task technically, but the most intellectually or strategically difficult problem to solve. What did you underestimate?
                </p>
                <p>
                  Reflection paragraph two. Describe how your methodology shaped the outcome. What would have changed if you had used a different approach? This shows critical distance from your own work.
                </p>
              </div>
              <div>
                <p style={{ fontSize: 15, marginBottom: 24 }}>
                  The insight that shaped the entire project:{" "}
                  <strong style={{ color: "#1A1A1A" }}>
                    A one-sentence distillation of the most important thing you learned — make it memorable and transferable.
                  </strong>{" "}
                  Follow-up sentence that contextualises why this matters beyond the project.
                </p>
                <p style={{ fontSize: 14 }}>
                  If repeated, describe what primary research, user testing, or expert validation you would conduct to pressure-test the assumptions embedded in the design. Be specific about who you would speak to and what you would be trying to learn.
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}