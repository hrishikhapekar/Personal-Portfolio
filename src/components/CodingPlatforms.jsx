import { motion } from "framer-motion";
import PremiumCard from "./PremiumCard";
import { Flame, ExternalLink, TerminalSquare, Activity } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

// ✅ manual data (for HackerRank stats)
import platformStats from "../data/codingPlatforms.json";

/* ---------------- helpers ---------------- */

function formatNum(n) {
  if (n === undefined || n === null || n === "") return "-";
  const num = Number(n);
  if (Number.isNaN(num)) return String(n);
  return new Intl.NumberFormat("en-IN").format(num);
}

function clamp01(x) {
  if (!Number.isFinite(x)) return 0;
  return Math.max(0, Math.min(1, x));
}

/* ✅ Count up hook */
function useCountUp(target, duration = 900) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    const t = Number(target);
    if (!Number.isFinite(t)) {
      setVal(target);
      return;
    }

    let raf = null;
    const start = performance.now();

    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(t * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    setVal(0);
    raf = requestAnimationFrame(tick);
    return () => raf && cancelAnimationFrame(raf);
  }, [target, duration]);

  return val;
}

function AnimatedNumber({ value, className = "" }) {
  const isNum = Number.isFinite(Number(value));
  const shown = useCountUp(isNum ? Number(value) : value, 900);
  return (
    <span className={className}>
      {isNum ? formatNum(shown) : String(value ?? "-")}
    </span>
  );
}

/* ---------------- UI bits ---------------- */

function LiveChip() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold
                     border border-emerald-400/25 bg-emerald-500/10 text-emerald-200">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-30 animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>
      LIVE
    </span>
  );
}

function Stat({ label, value, highlight = false, live = false }) {
  return (
    <div
      className={[
        "rounded-2xl border bg-white/5 px-4 py-3 min-h-[74px] flex flex-col justify-center transition relative overflow-hidden",
        highlight ? "border-orange-400/25" : "border-white/10",
      ].join(" ")}
    >
      {highlight && (
        <>
          <div className="absolute -inset-10 bg-gradient-to-r from-orange-500/25 via-yellow-400/15 to-purple-500/10 blur-3xl animate-pulse opacity-70" />
          <div className="absolute inset-0 bg-white/5 opacity-40" />
        </>
      )}

      <div className="relative flex items-center justify-between gap-2">
        <p className="text-white/45 text-xs">{label}</p>
        {live && <LiveChip />}
      </div>

      <p className="relative text-white/90 font-semibold mt-1">
        <AnimatedNumber value={value} />
      </p>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden">
      <div className="p-6 space-y-4">
        <div className="h-4 w-2/3 bg-white/5 rounded animate-pulse" />
        <div className="grid grid-cols-2 gap-3">
          <div className="h-16 bg-white/5 rounded-xl animate-pulse" />
          <div className="h-16 bg-white/5 rounded-xl animate-pulse" />
          <div className="h-16 bg-white/5 rounded-xl animate-pulse" />
          <div className="h-16 bg-white/5 rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  );
}

function DifficultyProgress({ easy = 0, medium = 0, hard = 0 }) {
  const total = Number(easy) + Number(medium) + Number(hard);

  const easyPct = total ? clamp01(Number(easy) / total) : 0;
  const medPct = total ? clamp01(Number(medium) / total) : 0;
  const hardPct = total ? clamp01(Number(hard) / total) : 0;

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between text-xs text-white/45 mb-2">
        <span className="inline-flex items-center gap-2">
          <Activity size={14} className="text-orange-300/70" />
          Difficulty Breakdown
        </span>
        <span>{formatNum(total)} solved</span>
      </div>

      <div className="h-3 rounded-full bg-white/5 border border-white/10 overflow-hidden flex">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${easyPct * 100}%` }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="h-full bg-emerald-400/70"
        />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${medPct * 100}%` }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
          className="h-full bg-yellow-400/70"
        />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${hardPct * 100}%` }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="h-full bg-rose-400/70"
        />
      </div>
    </div>
  );
}

/* ---------------- component ---------------- */

export default function CodingPlatforms() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/coding-stats", { cache: "no-store" });
      const json = await res.json();
      if (!json.ok) throw new Error("API failed");
      setStats(json.data || null);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setStats(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const leetcodeProgress = useMemo(() => {
    if (!stats?.leetcode) return null;
    return {
      easy: stats.leetcode.easySolved ?? 0,
      medium: stats.leetcode.mediumSolved ?? 0,
      hard: stats.leetcode.hardSolved ?? 0,
    };
  }, [stats]);

  const hr = platformStats?.hackerrank || {};

  return (
    <div className="space-y-6">
      <div>
        <p className="text-orange-300/80 text-xs tracking-[0.25em] font-semibold uppercase">
          Competitive Programming
        </p>
        <h2 className="text-white/90 text-3xl font-semibold mt-2">
          Coding Platforms
        </h2>
        <p className="text-white/50 text-sm mt-2">
          Coding stats are live.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : !stats ? (
        <PremiumCard glowPreset="orange" className="p-6">
          <p className="text-white/60 text-sm">
            No usernames configured. Add env variables for LeetCode / HackerRank.
          </p>
        </PremiumCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ✅ LeetCode */}
          {stats.leetcode && (
            <motion.div whileHover={{ y: -4 }} className="h-full">
              <PremiumCard glowPreset="orange" className="p-6 h-full">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 grid place-items-center">
                      <Flame size={18} className="text-orange-300" />
                    </div>
                    <div>
                      <p className="text-white/90 font-semibold">LeetCode</p>
                      <p className="text-white/45 text-xs">
                        @{stats.leetcode.username}
                      </p>
                    </div>
                  </div>

                  <a
                    href={`https://leetcode.com/${stats.leetcode.username}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 grid place-items-center text-white/60 hover:text-white hover:bg-white/10 transition"
                    title="Open Profile"
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-5">
                  <Stat label="Total Solved" value={stats.leetcode.totalSolved} />
                  <Stat label="Hard" value={stats.leetcode.hardSolved} />
                  <Stat label="Easy" value={stats.leetcode.easySolved} />
                  <Stat label="Medium" value={stats.leetcode.mediumSolved} />
                  <div className="col-span-2">
                    <Stat
                      label="Ranking"
                      value={stats.leetcode.ranking}
                      highlight
                      live
                    />
                  </div>
                </div>

                {leetcodeProgress && (
                  <DifficultyProgress
                    easy={leetcodeProgress.easy}
                    medium={leetcodeProgress.medium}
                    hard={leetcodeProgress.hard}
                  />
                )}
              </PremiumCard>
            </motion.div>
          )}

          {/* ✅ HackerRank */}
          {stats.hackerrank && (
            <motion.div whileHover={{ y: -4 }} className="h-full">
              <PremiumCard glowPreset="orange" className="p-6 h-full">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 grid place-items-center">
                      <TerminalSquare size={18} className="text-orange-300" />
                    </div>
                    <div>
                      <p className="text-white/90 font-semibold">HackerRank</p>
                      <p className="text-white/45 text-xs">
                        @{stats.hackerrank.username}
                      </p>
                    </div>
                  </div>

                  <a
                    href={stats.hackerrank.profile}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 grid place-items-center text-white/60 hover:text-white hover:bg-white/10 transition"
                    title="Open Profile"
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-5">
                  <Stat label="Badges" value={hr.badges ?? 0} />
                  <Stat label="Certificates" value={hr.certificates ?? 0} />
                  <Stat label="Problem Solving ⭐" value={hr.problemSolvingStars ?? 0} />
                  <Stat label="Python ⭐" value={hr.pythonStars ?? 0} />
                  <Stat label="SQL ⭐" value={hr.sqlStars ?? 0} />
                  <Stat label="Java ⭐" value={hr.javaStars ?? 0} />
                </div>
              </PremiumCard>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
