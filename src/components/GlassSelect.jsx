import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function GlassSelect({ value, onChange, options = [] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const handler = (e) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) setOpen(false);
    };
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group flex items-center justify-between gap-3
                   px-4 py-2.5 rounded-xl
                   border border-white/10 bg-white/5
                   backdrop-blur-xl text-white/80 text-sm
                   hover:bg-white/10 hover:border-white/15 transition
                   min-w-[220px]"
      >
        <span className="truncate">{selected?.label || "Select"}</span>

        <ChevronDown
          size={16}
          className={`text-white/60 transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-full z-50
                       rounded-2xl overflow-hidden
                       border border-white/10 bg-[#0b0b0f]/90
                       backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.60)]"
          >
            {/* subtle glow */}
            <div className="absolute -inset-10 bg-gradient-to-r from-orange-500/10 via-purple-500/10 to-cyan-500/10 blur-3xl" />

            <div className="relative py-2">
              {options.map((opt) => {
                const active = opt.value === value;

                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onChange(opt.value);
                      setOpen(false);
                    }}
                    className={[
                      "w-full text-left px-4 py-2.5 text-sm transition flex items-center justify-between",
                      active
                        ? "bg-white/10 text-white"
                        : "text-white/75 hover:bg-white/5 hover:text-white",
                    ].join(" ")}
                  >
                    <span>{opt.label}</span>

                    {active && (
                      <span className="text-[11px] text-emerald-300 font-medium">
                        ACTIVE
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
