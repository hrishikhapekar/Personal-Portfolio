import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SystemStatusPill() {
  const [online, setOnline] = useState(null); // null = checking

  useEffect(() => {
    let interval;

    const checkHealth = async () => {
      try {
        const res = await fetch("/api/health", { cache: "no-store" });
        if (!res.ok) throw new Error("Health not ok");
        const data = await res.json();
        setOnline(Boolean(data?.ok));
      } catch (err) {
        setOnline(false);
      }
    };

    checkHealth();
    interval = setInterval(checkHealth, 5000); // check every 5 sec

    return () => clearInterval(interval);
  }, []);

  const label =
    online === null ? "Checking..." : online ? "System Online" : "System Offline";

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="relative rounded-full p-[1.5px]"
    >
      {/* ✅ Alive Animated Golden Border Glow */}
      <motion.div
        className="absolute -inset-1 rounded-full blur-xl opacity-70"
        style={{
          background:
            "linear-gradient(90deg, rgba(250,204,21,0.35), rgba(249,115,22,0.25), rgba(253,224,71,0.30))",
        }}
        animate={{ opacity: [0.45, 0.85, 0.45] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ✅ Gradient border ring */}
      <div className="relative rounded-full p-[1px] bg-gradient-to-r from-yellow-300/45 via-orange-400/30 to-yellow-200/45">
        {/* Glass pill */}
        <div className="flex items-center gap-3 px-5 py-2 rounded-full bg-[#0b0b0f]/60 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
          {/* Dot */}
          <div className="relative w-3.5 h-3.5">
            {/* outer glow */}
            <span
              className={[
                "absolute inset-0 rounded-full blur-md",
                online === null
                  ? "bg-yellow-300/40"
                  : online
                  ? "bg-emerald-400/50"
                  : "bg-red-500/50",
              ].join(" ")}
            />

            {/* main dot */}
            <span
              className={[
                "absolute inset-0 rounded-full",
                online === null
                  ? "bg-yellow-300 shadow-[0_0_18px_rgba(253,224,71,0.35)]"
                  : online
                  ? "bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.45)]"
                  : "bg-red-500 shadow-[0_0_18px_rgba(239,68,68,0.45)]",
              ].join(" ")}
            />

            {/* ✅ Premium shimmer sweep (only when online) */}
            {online && (
              <motion.span
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.85) 40%, transparent 70%)",
                }}
                animate={{ rotate: [0, 360] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            )}
          </div>

          {/* Text */}
          <span
            className={[
              "text-[13px] font-semibold tracking-wide",
              online === null
                ? "text-yellow-100/80"
                : online
                ? "text-yellow-100/90"
                : "text-red-200/90",
            ].join(" ")}
          >
            {label}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
