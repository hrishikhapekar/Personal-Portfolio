import { Home, User, Briefcase, Mail, Github, Award ,Code2} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { setGlowColors } from "./CursorGlow";
import { useEffect, useRef, useState } from "react";

const nav = [
  { icon: Home, label: "Home", id: "home", glow: "cyan" },
  { icon: User, label: "About", id: "about", glow: "purple" },

  // ✅ NEW: Experience
  { icon: Award, label: "Experience", id: "experience", glow: "orange" },

  { icon: Briefcase, label: "Projects", id: "projects", glow: "orange" },
  { icon: Github, label: "GitHub", id: "github", glow: "green" },

  { icon: Code2, label: "Coding", id: "coding", glow: "orange" },

  { icon: Mail, label: "Contact", id: "contact", glow: "cyan" },
];

const glowPresets = {
  cyan: {
    from: "rgba(34,211,238,0.45)",
    mid: "rgba(59,130,246,0.25)",
    to: "rgba(168,85,247,0.15)",
  },
  purple: {
    from: "rgba(168,85,247,0.45)",
    mid: "rgba(236,72,153,0.20)",
    to: "rgba(255,255,255,0.10)",
  },
  orange: {
    from: "rgba(249,115,22,0.50)",
    mid: "rgba(234,179,8,0.25)",
    to: "rgba(255,255,255,0.10)",
  },
  green: {
    from: "rgba(34,197,94,0.40)",
    mid: "rgba(20,184,166,0.20)",
    to: "rgba(255,255,255,0.10)",
  },
};

export default function Sidebar({ activeId, lockActive, setSnapEnabled }) {
  const containerRef = useRef(null);
  const [indicatorTop, setIndicatorTop] = useState(0);
  const [hovered, setHovered] = useState(null);

  const handleNav = (id, glow) => {
    lockActive?.(id, 1100);
    setSnapEnabled?.(false);

    setGlowColors(glowPresets[glow]);

    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });

    setTimeout(() => {
      setSnapEnabled?.(true);
    }, 950);
  };

  // ✅ active indicator sync
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const activeBtn = container.querySelector(`[data-id="${activeId}"]`);
    if (!activeBtn) return;

    const containerRect = container.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();

    setIndicatorTop(btnRect.top - containerRect.top + btnRect.height / 2);
  }, [activeId]);

  return (
    <aside className="w-full shrink-0 flex justify-center py-6">
      <div
        className="relative h-[calc(100vh-48px)] w-[86px] rounded-[28px]
                   bg-[#0b0b0f]/80 border border-white/5
                   shadow-[0_18px_60px_rgba(0,0,0,0.65)]
                   backdrop-blur-xl flex flex-col items-center py-5 gap-6"
      >
        {/* logo */}
        <motion.div
          whileHover={{ rotate: 8, scale: 1.02 }}
          className="w-10 h-10 rounded-xl bg-white/10 grid place-items-center"
        >
          <span className="text-white font-bold">𖦹</span>
        </motion.div>

        {/* nav */}
        <div ref={containerRef} className="relative flex flex-col gap-3 mt-2">
          {/* active indicator */}
          <motion.div
            className="absolute -left-3 w-[4px] h-7 rounded-full bg-white/70 shadow-[0_0_18px_rgba(255,255,255,0.35)]"
            animate={{ top: indicatorTop - 14 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
          />

          {nav.map((item) => {
            const Icon = item.icon;
            const isActive = activeId === item.id;

            return (
              <div key={item.id} className="relative">
                <motion.button
                  data-id={item.id}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNav(item.id, item.glow)}
                  onMouseEnter={() => {
                    setHovered(item.id);
                    setGlowColors(glowPresets[item.glow]);
                  }}
                  onMouseLeave={() => setHovered(null)}
                  className={[
                    "w-11 h-11 rounded-xl grid place-items-center transition relative overflow-hidden",
                    isActive
                      ? "bg-white/15 border border-white/20 text-white"
                      : "text-white/65 hover:text-white hover:bg-white/10",
                  ].join(" ")}
                >
                  {/* glow active */}
                  {isActive && (
                    <span className="absolute inset-0 pointer-events-none">
                      <span className="absolute inset-[-30px] bg-[radial-gradient(circle,rgba(249,115,22,0.13)_0%,transparent_60%)] blur-xl" />
                      <span className="absolute inset-[-30px] bg-[radial-gradient(circle,rgba(255,255,255,0.08)_0%,transparent_65%)] blur-2xl" />
                    </span>
                  )}

                  <Icon size={20} className="relative z-10" />
                </motion.button>

                {/* tooltip */}
                <AnimatePresence>
                  {hovered === item.id && (
                    <motion.div
                      initial={{ opacity: 0, x: -8, scale: 0.98 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -8, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute left-[64px] top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-[#0f0f16]/95 border border-white/10 text-white/90 text-xs shadow-xl whitespace-nowrap"
                    >
                      {item.label}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
