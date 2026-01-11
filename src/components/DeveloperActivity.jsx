import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  // label is YYYY-MM
  const [yy, mm] = label.split("-");
  const dateObj = new Date(Number(yy), Number(mm) - 1, 1);
  const pretty = dateObj.toLocaleString("en-US", { month: "short", year: "numeric" });

  return (
    <div className="rounded-xl border border-white/10 bg-[#0b0b0f]/85 backdrop-blur-xl px-3 py-2 shadow-2xl">
      <p className="text-white/80 text-xs">{pretty}</p>
      <p className="text-orange-200 font-semibold text-sm">
        {payload[0].value} commits
      </p>
    </div>
  );
}

export default function DeveloperActivity() {
  const [data, setData] = useState([]);
  const [range, setRange] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCommits = async () => {
    try {
      setError("");
      setLoading(true);

      const res = await fetch("/api/github-contributions", {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      });

      const json = await res.json();
      console.log("GitHub contributions API:", json);

      if (!json.ok) {
        throw new Error(json.message || "API returned ok:false");
      }

      // ✅ Always 12 months expected
      const incoming = Array.isArray(json.data) ? json.data : [];

      setData(incoming);
      setRange(json.range || "");
      setLoading(false);
    } catch (err) {
      console.error("Commit fetch failed:", err);
      setError(err.message || "Failed");
      setData([]);
      setRange("");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommits();

    // refresh every 2 minutes
    const interval = setInterval(fetchCommits, 120000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5"
    >
      {/* glow */}
      <div className="absolute -inset-10 bg-gradient-to-r from-orange-500/10 via-yellow-500/5 to-transparent blur-3xl" />

      {/* header */}
      <div className="relative flex items-start justify-between gap-4 p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 grid place-items-center">
            <Activity className="text-orange-300" size={20} />
          </div>

          <div>
            <h3 className="text-white/90 font-semibold text-lg">
              Developer Activity
            </h3>
            <p className="text-white/50 text-sm">Last 12 months</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-1">
          <span
            className={[
              "w-2 h-2 rounded-full",
              loading ? "bg-yellow-300" : error ? "bg-red-500" : "bg-emerald-400",
            ].join(" ")}
          />
          <span
            className={[
              "text-sm font-medium",
              loading
                ? "text-yellow-200"
                : error
                ? "text-red-200"
                : "text-emerald-300",
            ].join(" ")}
          >
            {loading ? "SYNCING" : error ? "OFFLINE" : "LIVE"}
          </span>
        </div>
      </div>

      {/* chart */}
      <div className="relative px-4 pb-6">
        <div className="h-[220px] w-full">
          {data.length === 0 ? (
            <div className="h-full rounded-2xl border border-white/10 bg-black/20 grid place-items-center">
              <p className="text-white/50 text-sm">
                {loading
                  ? "Loading..."
                  : error
                  ? `Error: ${error}`
                  : "No commit data found"}
              </p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 10, right: 16, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="orangeFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(249,115,22,0.40)" />
                    <stop offset="75%" stopColor="rgba(249,115,22,0.05)" />
                    <stop offset="100%" stopColor="rgba(249,115,22,0)" />
                  </linearGradient>
                </defs>

                {/* ✅ Use YYYY-MM key to avoid year mixing */}
                <XAxis
                  dataKey="key"
                  tickFormatter={(key) => {
                    const [yy, mm] = key.split("-");
                    const d = new Date(Number(yy), Number(mm) - 1, 1);
                    return d.toLocaleString("en-US", { month: "short" });
                  }}
                  tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis hide />
                <Tooltip content={<CustomTooltip />} cursor={false} />

                <Area
                  type="monotone"
                  dataKey="commits"
                  stroke="rgba(249,115,22,1)"
                  strokeWidth={2.4}
                  fill="url(#orangeFill)"
                  dot={false}
                  activeDot={{
                    r: 5,
                    fill: "rgba(249,115,22,1)",
                    stroke: "rgba(255,255,255,0.25)",
                    strokeWidth: 6,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* ✅ year range */}
        {range && (
          <div className="flex justify-end px-2 mt-2">
            <span className="text-white/35 text-xs font-medium tracking-widest">
              {range}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
