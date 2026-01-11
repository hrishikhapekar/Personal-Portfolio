import { useEffect, useRef, useState } from "react";

/**
 * Tracks currently visible section inside a scroll container (rootRef).
 */
export default function useActiveSection(sectionIds = [], rootRef = null) {
  const [activeId, setActiveId] = useState(sectionIds?.[0] || "");

  // lock observer updates while click-scrolling
  const lockRef = useRef(false);
  const lockTimeoutRef = useRef(null);

  const lockActive = (id, ms = 1000) => {
    lockRef.current = true;
    setActiveId(id);

    if (lockTimeoutRef.current) clearTimeout(lockTimeoutRef.current);
    lockTimeoutRef.current = setTimeout(() => {
      lockRef.current = false;
    }, ms);
  };

  useEffect(() => {
    const rootEl = rootRef?.current || null;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (lockRef.current) return;

        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        root: rootEl, // ✅ important: observe inside <main>
        threshold: [0.2, 0.35, 0.5, 0.65],
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      if (lockTimeoutRef.current) clearTimeout(lockTimeoutRef.current);
    };
  }, [sectionIds, rootRef]);

  return { activeId, lockActive };
}
