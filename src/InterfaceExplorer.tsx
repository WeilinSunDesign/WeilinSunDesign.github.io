import { useEffect, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// DATA — nested tree matching the information-architecture diagram.
// `hiFi` points at a filename in /public. Swap these and the `label`s to
// match your own screens/labels whenever you like.
//
// Every node has its own dedicated hi-fi filename, following the pattern
// `sl-hifi-<id>.webp` — drop each exported frame into /public under that name.
// ─────────────────────────────────────────────────────────────────────────────
type ArchNode = {
  id: string;
  label: string;
  hiFi: string;
  children?: ArchNode[];
};

const architecture: ArchNode = {
  id: "home", label: "Home", hiFi: "sl-hifi-home.webp",
  children: [
    {
      id: "login", label: "Login", hiFi: "sl-hifi-login.webp",
      children: [
        { id: "register-account", label: "Register Account", hiFi: "sl-hifi-register-account.webp" },
      ],
    },
    {
      id: "control-center", label: "Control Center", hiFi: "sl-hifi-control-center.webp",
      children: [
        {
          id: "condition", label: "Condition", hiFi: "sl-hifi-control-center.webp",
          children: [
            { id: "sensor",         label: "Sensor",         hiFi: "sl-hifi-control-center.webp" },
            { id: "device-linkage", label: "Device Linkage", hiFi: "sl-hifi-control-center.webp" },
          ],
        },
      ],
    },
    {
      id: "personal-page", label: "Personal Page", hiFi: "sl-hifi-health.webp",
      children: [
        { id: "health", label: "Health", hiFi: "sl-hifi-health.webp" },
        {
          id: "scenarios", label: "Scenarios", hiFi: "sl-hifi-health.webp",
          children: [
            { id: "related-device", label: "Related Device", hiFi: "sl-hifi-health.webp" },
          ],
        },
      ],
    },
    {
      id: "room", label: "Room", hiFi: "sl-hifi-room.webp",
      children: [
        { id: "video-monitors", label: "Video Monitors", hiFi: "sl-hifi-video-monitors.webp" },
        {
          id: "roommate", label: "Roommate", hiFi: "sl-hifi-roommate.webp",
          children: [
            { id: "situation", label: "Situation", hiFi: "sl-hifi-situation.webp" },
          ],
        },
        {
          id: "environment", label: "Environment", hiFi: "sl-hifi-environment.webp",
          children: [
            { id: "weather",  label: "Weather",  hiFi: "sl-hifi-weather.webp" },
            { id: "security", label: "Security", hiFi: "sl-hifi-security.webp" },
          ],
        },
      ],
    },
    {
      id: "emotion", label: "Emotion", hiFi: "sl-hifi-emotion.webp",
      children: [
        {
          id: "signal-lamp", label: "Signal Lamp", hiFi: "sl-hifi-signal-lamp.webp",
          children: [
            { id: "emotion-data", label: "Emotion Data", hiFi: "sl-hifi-signal-lamp.webp" },
          ],
        },
      ],
    },
    { id: "notification", label: "Notification", hiFi: "sl-hifi-notification.webp" },
    {
      id: "setting", label: "Setting", hiFi: "sl-hifi-setting.webp",
      children: [
        { id: "user-info", label: "User Info", hiFi: "sl-hifi-user-info.webp" },
      ],
    },
  ],
};

function findNode(node: ArchNode, id: string): ArchNode | null {
  if (node.id === id) return node;
  for (const child of node.children ?? []) {
    const found = findNode(child, id);
    if (found) return found;
  }
  return null;
}

// ── Information architecture sitemap ────────────────────────────────────────────

// x-coordinates are compressed to 69% of the original sitemap's spacing
// (y-coordinates and topology are untouched) so the diagram fits its column
// width without horizontal scrolling.
const iaNodes: { id: string; label: string; x: number; y: number }[] = [
  { id: "control-center",     label: "Control Center",    x: 290, y: 87 },
  { id: "condition",          label: "Condition",         x: 435, y: 87 },
  { id: "sensor",             label: "Sensor",            x: 580, y: 60 },
  { id: "device-linkage",     label: "Device Linkage",    x: 580, y: 115 },
  { id: "personal-page",      label: "Personal Page",     x: 290, y: 225 },
  { id: "health",             label: "Health",            x: 435, y: 170 },
  { id: "scenarios",          label: "Scenarios",         x: 435, y: 225 },
  { id: "related-device",     label: "Related Device",    x: 580, y: 225 },
  { id: "home",               label: "Home",              x: 69,  y: 335 },
  { id: "room",                label: "Room",              x: 290, y: 335 },
  { id: "video-monitors",     label: "Video Monitors",    x: 435, y: 280 },
  { id: "roommate",           label: "Roommate",          x: 435, y: 335 },
  { id: "situation",          label: "Situation",         x: 580, y: 335 },
  { id: "environment",        label: "Environment",       x: 435, y: 390 },
  { id: "weather",            label: "Weather",           x: 580, y: 390 },
  { id: "security",           label: "Security",          x: 580, y: 445 },
  { id: "login",              label: "Login",             x: 173, y: 390 },
  { id: "emotion",            label: "Emotion",           x: 290, y: 500 },
  { id: "signal-lamp",        label: "Signal Lamp",       x: 435, y: 500 },
  { id: "emotion-data",       label: "Emotion Data",      x: 580, y: 500 },
  { id: "notification",       label: "Notification",      x: 290, y: 555 },
  { id: "setting",            label: "Setting",           x: 290, y: 610 },
  { id: "user-info",          label: "User Info",         x: 435, y: 610 },
  { id: "register-account",   label: "Register Account",  x: 173, y: 610 },
];

const iaSolidPaths = [
  "M290,87 L435,87",
  "M435,87 L511,87",
  "M511,60 L511,115",
  "M511,60 L580,60",
  "M511,115 L580,115",
  "M290,225 L366,225",
  "M366,170 L366,225",
  "M366,170 L435,170",
  "M366,225 L435,225",
  "M435,225 L580,225",
  "M69,335 L290,335",
  "M69,335 L117,335 L117,390 L173,390",
  "M173,390 L173,610",
  "M290,87 L290,610",
  "M290,335 L366,335",
  "M366,280 L366,390",
  "M366,280 L435,280",
  "M366,335 L435,335",
  "M366,390 L435,390",
  "M435,335 L580,335",
  "M435,390 L511,390",
  "M511,390 L511,445",
  "M511,390 L580,390",
  "M511,445 L580,445",
  "M290,500 L435,500",
  "M435,500 L580,500",
  "M290,610 L435,610",
];

const iaDashedPaths = [
  "M580,115 L642,115",
  "M580,225 L642,225",
  "M580,500 L642,500",
  "M435,280 L642,280",
  "M642,115 L642,500",
];

const IA_CANVAS_W = 648;
const IA_CANVAS_H = 660;

function IADiagram({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <div className="relative" style={{ width: IA_CANVAS_W, height: IA_CANVAS_H }}>
        <svg
          width={IA_CANVAS_W}
          height={IA_CANVAS_H}
          viewBox={`0 0 ${IA_CANVAS_W} ${IA_CANVAS_H}`}
          className="absolute inset-0"
        >
          <g fill="none" stroke="currentColor" strokeWidth="1" className="text-black/30">
            {iaSolidPaths.map((d, i) => (
              <path key={`ia-solid-${i}`} d={d} />
            ))}
            {iaDashedPaths.map((d, i) => (
              <path key={`ia-dashed-${i}`} d={d} strokeDasharray="4 4" />
            ))}
          </g>
        </svg>
        {iaNodes.map((n) => {
          const isActive = n.id === activeId;
          return (
            <div
              key={n.id}
              className="absolute"
              style={{ left: n.x, top: n.y, transform: "translate(-50%, -50%)" }}
            >
              <button
                onClick={() => onSelect(n.id)}
                className="inline-flex items-center border px-[8px] py-[6px] type-body-sm leading-snug bg-my-bg whitespace-nowrap"
                style={{
                  cursor: "pointer",
                  borderColor: isActive ? "#63C2BD" : "#0D0D0D",
                  color: isActive ? "#63C2BD" : "#0D0D0D",
                  transition: "color 0.15s ease, border-color 0.15s ease",
                }}
              >
                {n.label}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── iPhone 12 frame ─────────────────────────────────────────────────────────

function PhoneFrame({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [src]);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "260px",
        aspectRatio: "390 / 844",
        margin: "0 auto",
        position: "relative",
        background: "#e8e8ea",
        borderRadius: "40px",
        padding: "11px",
        border: "2px solid #d4d4d7",
        boxShadow: "0 30px 60px -20px rgba(0,0,0,0.25), inset 0 0 0 1px rgba(255,255,255,0.6)",
      }}
    >
      {/* Notch */}
      <div
        style={{
          position: "absolute",
          top: "11px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "42%",
          height: "20px",
          background: "#050505",
          borderRadius: "0 0 14px 14px",
          zIndex: 2,
        }}
      />
      {/* Side buttons */}
      <div style={{ position: "absolute", left: "-2px", top: "88px",  width: "2px", height: "26px", background: "#c0c0c4", borderRadius: "2px" }} />
      <div style={{ position: "absolute", left: "-2px", top: "124px", width: "2px", height: "44px", background: "#c0c0c4", borderRadius: "2px" }} />
      <div style={{ position: "absolute", right: "-2px", top: "142px", width: "2px", height: "64px", background: "#c0c0c4", borderRadius: "2px" }} />

      {/* Screen */}
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "29px",
          overflow: "hidden",
          background: "#FFFFFF",
        }}
      >
        {error ? (
          <div className="w-full h-full flex items-center justify-center px-[16px]">
            <p className="type-eyebrow text-center" style={{ color: "rgba(0,0,0,0.3)" }}>{alt}</p>
          </div>
        ) : (
          <img
            key={src}
            src={`/${encodeURIComponent(src)}`}
            alt={alt}
            onError={() => setError(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        )}
      </div>
    </div>
  );
}

// ── Explorer ──────────────────────────────────────────────────────────────

export default function InterfaceExplorer() {
  const [activeId, setActiveId] = useState(architecture.id);

  const active = findNode(architecture, activeId) ?? architecture;

  return (
    <div>
      <p className="type-eyebrow mb-[24px]">Select a node to preview its screen</p>

      <div className="flex flex-col lg:flex-row gap-[32px] lg:gap-[40px]">
        {/* Left column — IA diagram (~65%) */}
        <div className="w-full lg:w-[65%]" style={{ flex: "0 0 auto" }}>
          <IADiagram activeId={activeId} onSelect={setActiveId} />
        </div>

        {/* Right column — phone frame (~35%) */}
        <div className="w-full lg:w-[35%] flex items-start justify-center">
          <PhoneFrame src={active.hiFi} alt={active.label} />
        </div>
      </div>
    </div>
  );
}
