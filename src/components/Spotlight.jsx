import { useEffect, useRef } from "react";

export default function Spotlight() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      el.style.setProperty("--x", `${x}px`);
      el.style.setProperty("--y", `${y}px`);
    };

    el.addEventListener("mousemove", handleMove);
    return () => el.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={ref}
      className="absolute inset-0 pointer-events-auto z-0"
      style={{
        background:
          "radial-gradient(600px circle at var(--x) var(--y), rgba(255,255,255,0.08), transparent 60%)",
      }}
    />
  );
}
