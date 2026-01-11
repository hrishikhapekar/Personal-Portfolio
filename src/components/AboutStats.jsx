import { useEffect, useRef, useState } from "react";

/**
 * ✅ Count up hook with decimals support
 */
function useCountUp(target = 0, duration = 1000, decimals = 0) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let started = false;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry.isIntersecting || started) return;
        started = true;

        const start = performance.now();

        const animate = (t) => {
          const elapsed = t - start;
          const progress = Math.min(elapsed / duration, 1);

          // easeOutCubic
          const eased = 1 - Math.pow(1 - progress, 3);

          const raw = eased * target;
          const fixed = Number(raw.toFixed(decimals));
          setValue(fixed);

          if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
      },
      { threshold: 0.35 }
    );

    io.observe(node);

    return () => io.disconnect();
  }, [target, duration, decimals]);

  return { ref, value };
}

function AboutStatCard({ value, label, suffix = "", decimals = 0 }) {
  const isNumber = typeof value === "number";
  const { ref, value: animated } = useCountUp(isNumber ? value : 0, 900, decimals);

  return (
    <div
      ref={ref}
      className="
        group relative overflow-hidden rounded-2xl
        border border-white/10 bg-white/5
        px-6 py-6 text-center
        backdrop-blur-xl
        shadow-[0_18px_45px_rgba(0,0,0,0.35)]
        transition duration-300
        hover:bg-white/10
      "
    >
      {/* ✅ Neon border glow */}
      <div
        className="
          pointer-events-none absolute inset-0 rounded-2xl
          opacity-0 group-hover:opacity-100 transition duration-300
          shadow-[0_0_0_1px_rgba(16,185,129,0.35),0_0_28px_rgba(16,185,129,0.18)]
        "
      />

      {/* ✅ Soft aura glow */}
      <div
        className="
          pointer-events-none absolute -inset-10
          opacity-0 group-hover:opacity-100 transition duration-300
          bg-emerald-400/12 blur-3xl
        "
      />

      {/* ✅ shimmer sweep */}
      <div
        className="
          pointer-events-none absolute inset-0
          opacity-0 group-hover:opacity-100 transition duration-500
          bg-gradient-to-r from-transparent via-white/10 to-transparent
          translate-x-[-120%] group-hover:translate-x-[120%]
          duration-[900ms]
        "
      />

      <div className="relative">
        <div
          className="
            text-3xl md:text-4xl font-bold
            bg-gradient-to-r from-sky-400 via-blue-300 to-sky-500
            bg-[length:220%_220%]
            bg-clip-text text-transparent
            animate-numberShimmer
            transition duration-300
            group-hover:bg-gradient-to-r group-hover:from-emerald-300 group-hover:via-green-400 group-hover:to-emerald-200
            group-hover:drop-shadow-[0_0_18px_rgba(16,185,129,0.25)]
          "
        >
          {isNumber ? animated.toFixed(decimals) : value}
          {suffix}
        </div>

        <div className="mt-1 text-white/55 text-sm group-hover:text-white/70 transition">
          {label}
        </div>
      </div>
    </div>
  );
}

export default function AboutStats() {
  const [repoCount, setRepoCount] = useState(null);

  // ✅ Fetch repo count from your GitHub API
  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch("/api/github-repos-all");
        const data = await res.json();

        // supports data shape: { repos: [...] } OR [...] directly
        const repos = Array.isArray(data) ? data : data?.repos;

        if (!Array.isArray(repos)) {
          throw new Error("Invalid github repos response");
        }

        // ✅ subtract 1 safely
        const adjustedCount = Math.max(repos.length - 1, 0);

        setRepoCount(adjustedCount);
      } catch (e) {
        console.error("AboutStats GitHub fetch failed:", e);
        setRepoCount(null);
      }
    };

    run();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-7">
      {/* ✅ CGPA exact 2 decimals */}
      <AboutStatCard value={8.04} label="CGPA" decimals={2} />

      {/* ✅ Projects from GitHub repo count (-1) */}
      <AboutStatCard
        value={typeof repoCount === "number" ? repoCount : 0}
        label="Projects"
        suffix={typeof repoCount === "number" ? "+" : ""}
        decimals={0}
      />

      <AboutStatCard value={1} label="Years Coding" suffix="+" decimals={0} />
    </div>
  );
}
