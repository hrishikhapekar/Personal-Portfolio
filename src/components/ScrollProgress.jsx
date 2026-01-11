import { useEffect, useState } from "react";

export default function ScrollProgress({ scrollRef }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = scrollRef?.current;
    if (!el) return;

    const onScroll = () => {
      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setProgress(pct);
    };

    onScroll();
    el.addEventListener("scroll", onScroll);

    return () => el.removeEventListener("scroll", onScroll);
  }, [scrollRef]);

  return (
    <div className="sticky top-0 z-50">
      <div className="h-[3px] w-full bg-white/5">
        <div
          className="h-[3px] rounded-full bg-white/60 shadow-[0_0_18px_rgba(255,255,255,0.35)] transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
