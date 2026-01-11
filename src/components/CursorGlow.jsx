import { useEffect, useRef, useState } from "react";

export default function CursorGlow() {
  const glowRef = useRef(null);

  // default glow (purple-orange)
  const [glow, setGlow] = useState({
    from: "rgba(168,85,247,0.45)", // purple
    mid: "rgba(249,115,22,0.25)",  // orange
    to: "rgba(236,72,153,0.25)",   // pink
  });

  useEffect(() => {
    const glowEl = glowRef.current;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // listen for glow-change events
    const handleGlowChange = (e) => {
      setGlow(e.detail);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("glow-change", handleGlowChange);

    const animate = () => {
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;

      if (glowEl) {
        glowEl.style.transform = `translate(${currentX - 200}px, ${currentY - 200}px)`;
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("glow-change", handleGlowChange);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed top-0 left-0 w-[420px] h-[420px] rounded-full blur-3xl opacity-70 mix-blend-screen z-0"
      style={{
        background: `radial-gradient(circle, ${glow.from} 0%, ${glow.mid} 45%, ${glow.to} 80%, transparent 100%)`,
      }}
    />
  );
}

/** helper function */
export function setGlowColors(colors) {
  window.dispatchEvent(new CustomEvent("glow-change", { detail: colors }));
}
