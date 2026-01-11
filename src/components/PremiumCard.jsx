import { motion } from "framer-motion";
import { setGlowColors } from "./CursorGlow";

export default function PremiumCard({ children, glowPreset = "default", className = "" }) {
  const presets = {
    default: {
      from: "rgba(168,85,247,0.45)",
      mid: "rgba(249,115,22,0.25)",
      to: "rgba(236,72,153,0.25)",
    },
    orange: {
      from: "rgba(249,115,22,0.50)",
      mid: "rgba(234,179,8,0.25)",
      to: "rgba(255,255,255,0.10)",
    },
    cyan: {
      from: "rgba(34,211,238,0.45)",
      mid: "rgba(59,130,246,0.25)",
      to: "rgba(168,85,247,0.15)",
    },
    green: {
      from: "rgba(34,197,94,0.40)",
      mid: "rgba(20,184,166,0.20)",
      to: "rgba(255,255,255,0.10)",
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onMouseEnter={() => setGlowColors(presets[glowPreset] || presets.default)}
      onMouseLeave={() => setGlowColors(presets.default)}
      className={
        "rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition p-5 relative overflow-hidden " +
        className
      }
    >
      {children}
    </motion.div>
  );
}
