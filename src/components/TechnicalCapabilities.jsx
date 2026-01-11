import { motion } from "framer-motion";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Wrench } from "lucide-react";
import { Code2, Layers3, Database, BrainCircuit, Cloud } from "lucide-react";
import PremiumCard from "./PremiumCard";
import { useMemo, useState } from "react";

const data = [
  { skill: "Frontend", value: 95 },
  { skill: "UI/UX", value: 85 },
  { skill: "Backend", value: 72 },
  { skill: "System Arch", value: 78 },
  { skill: "DevOps", value: 58 },
  { skill: "Motion", value: 82 },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.28, ease: "easeOut" } },
};

function SkillTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const p = payload[0]?.payload;

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0b0b0f]/90 backdrop-blur-xl px-4 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.65)]">
      <p className="text-white/85 text-sm font-semibold">{p.skill}</p>
      <p className="text-orange-300 text-sm mt-1">
        Skill Level : <span className="font-semibold">{p.value}</span>
      </p>
    </div>
  );
}

function Bullet({ children }) {
  return (
    <motion.li
      variants={item}
      className="group flex items-start gap-3 text-white/65 text-sm leading-relaxed cursor-default"
    >
      <span className="mt-[7px] w-2 h-2 rounded-full bg-white/25 relative">
        <span className="absolute inset-0 rounded-full bg-orange-400/0 group-hover:bg-orange-400/80 transition" />
        <span className="absolute -inset-3 rounded-full bg-orange-400/0 group-hover:bg-orange-400/15 blur-xl transition" />
      </span>

      <span className="group-hover:text-white/90 transition">{children}</span>
    </motion.li>
  );
}

/* ----------------- Brand SVG Icons ----------------- */

/* Figma */
function FigmaIcon({ size = 18, colored = false }) {
  const dim = colored ? 1 : 0.45;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity: dim }}
    >
      <path
        d="M100 150C100 122.4 122.4 100 150 100C177.6 100 200 122.4 200 150C200 177.6 177.6 200 150 200C122.4 200 100 177.6 100 150Z"
        fill={colored ? "#1ABCFE" : "rgba(255,255,255,0.85)"}
      />
      <path
        d="M0 250C0 222.4 22.4 200 50 200H100V250C100 277.6 77.6 300 50 300C22.4 300 0 277.6 0 250Z"
        fill={colored ? "#0ACF83" : "rgba(255,255,255,0.85)"}
      />
      <path
        d="M100 0V100H150C177.6 100 200 77.6 200 50C200 22.4 177.6 0 150 0H100Z"
        fill={colored ? "#FF7262" : "rgba(255,255,255,0.85)"}
      />
      <path
        d="M0 50C0 77.6 22.4 100 50 100H100V0H50C22.4 0 0 22.4 0 50Z"
        fill={colored ? "#F24E1E" : "rgba(255,255,255,0.85)"}
      />
      <path
        d="M0 150C0 177.6 22.4 200 50 200H100V100H50C22.4 100 0 122.4 0 150Z"
        fill={colored ? "#A259FF" : "rgba(255,255,255,0.85)"}
      />
    </svg>
  );
}

/* Unity */
function UnityIcon({ size = 18, colored = false }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 256 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity: colored ? 1 : 0.55 }}
    >
      <path
        d="M128 20L54 62V194L128 236L202 194V62L128 20Z"
        fill={colored ? "#FFFFFF" : "rgba(255,255,255,0.85)"}
      />
      <path
        d="M128 44L74 74V182L128 212L182 182V74L128 44Z"
        fill={colored ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.25)"}
      />
    </svg>
  );
}

/* Cisco-ish */
function CiscoIcon({ size = 20, colored = false }) {
  const stroke = colored ? "#0EA5E9" : "rgba(255,255,255,0.55)";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 256 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity: colored ? 1 : 0.6 }}
    >
      <path
        d="M48 176C48 150 74 128 128 128C182 128 208 150 208 176"
        stroke={stroke}
        strokeWidth="18"
        strokeLinecap="round"
      />
      <path d="M64 96H72" stroke={stroke} strokeWidth="18" strokeLinecap="round" />
      <path d="M96 72H104" stroke={stroke} strokeWidth="18" strokeLinecap="round" />
      <path d="M128 60H136" stroke={stroke} strokeWidth="18" strokeLinecap="round" />
      <path d="M160 72H168" stroke={stroke} strokeWidth="18" strokeLinecap="round" />
      <path d="M192 96H200" stroke={stroke} strokeWidth="18" strokeLinecap="round" />
    </svg>
  );
}

function BulletBrand({ icon, glow, children }) {
  return (
    <motion.li
      variants={item}
      className="group flex items-center gap-3 text-white/65 text-sm leading-relaxed cursor-default"
    >
      <span className="relative w-9 h-9 rounded-2xl bg-white/5 border border-white/10 grid place-items-center group-hover:bg-white/10 transition overflow-hidden">
        {/* glow on hover */}
        <span
          className={`absolute -inset-6 blur-2xl opacity-0 group-hover:opacity-100 transition ${glow}`}
        />
        <span className="relative">{icon}</span>
      </span>

      <span className="group-hover:text-white/90 transition">{children}</span>
    </motion.li>
  );
}

export default function TechnicalCapabilities() {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const glow = useMemo(() => {
    if (!hoveredSkill) return "from-orange-500/10 via-purple-500/8 to-transparent";
    return "from-orange-500/18 via-yellow-500/10 to-transparent";
  }, [hoveredSkill]);

  return (
    <div className="mt-6">
      {/* section header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="mb-6"
      >
        <p className="text-orange-300/80 text-xs tracking-[0.25em] font-semibold uppercase">
          Proficiency Analysis
        </p>
        <h2 className="text-white/90 text-3xl font-semibold mt-2">
          Technical Capabilities
        </h2>
      </motion.div>

      {/* layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT RADAR */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="lg:col-span-1"
        >
          <PremiumCard glowPreset="orange" className="p-6 relative overflow-hidden">
            <div className={`absolute -inset-10 bg-gradient-to-br ${glow} blur-3xl`} />

            <div className="relative">
              <h3 className="text-white/90 font-semibold text-lg">
                Core Competencies
              </h3>

              <div className="h-[280px] mt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={data}>
                    <PolarGrid stroke="rgba(255,255,255,0.10)" />

                    <PolarAngleAxis
                      dataKey="skill"
                      tick={{
                        fill: "rgba(255,255,255,0.40)",
                        fontSize: 12,
                      }}
                    />

                    <Tooltip content={<SkillTooltip />} />

                    <motion.g
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                    >
                      <motion.g
                        initial={{ scale: 0.85, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, ease: "easeOut" }}
                      >
                        <Radar
                          dataKey="value"
                          stroke="rgba(249,115,22,1)"
                          fill="rgba(249,115,22,0.24)"
                          strokeWidth={2.3}
                          dot={{
                            r: 4,
                            fill: "rgba(249,115,22,1)",
                            stroke: "rgba(255,255,255,0.20)",
                            strokeWidth: 6,
                          }}
                          isAnimationActive={true}
                          animationDuration={900}
                          animationEasing="ease-out"
                          onMouseMove={(state) => {
                            const p = state?.activePayload?.[0]?.payload;
                            if (p?.skill) setHoveredSkill(p.skill);
                          }}
                          onMouseLeave={() => setHoveredSkill(null)}
                        />
                      </motion.g>
                    </motion.g>
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <p className="text-white/45 text-sm mt-1">
                Hover the radar for skill stats.
              </p>
            </div>
          </PremiumCard>
        </motion.div>

        {/* RIGHT LIST */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, ease: "easeOut", delay: 0.05 }}
          className="lg:col-span-2"
        >
          <PremiumCard glowPreset="orange" className="p-6">
            <h3 className="text-white/90 font-semibold text-lg">
              Technological Arsenal
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mt-6">
              {/* LANGUAGES */}
              <div>
                <div className="flex items-center gap-2 text-orange-300 font-semibold text-sm">
                  <Code2 size={16} />
                  <span>LANGUAGES</span>
                </div>

                <motion.ul
                  variants={container}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="mt-4 space-y-3"
                >
                  <Bullet>JavaScript (ES6+)</Bullet>
                  <Bullet>TypeScript (Strict)</Bullet>
                  <Bullet>Python</Bullet>
                  <Bullet>Java</Bullet>
                  <Bullet>C / C++</Bullet>
                  <Bullet>C #</Bullet>
                </motion.ul>
              </div>

              {/* FRAMEWORKS */}
              <div>
                <div className="flex items-center gap-2 text-orange-300 font-semibold text-sm">
                  <Layers3 size={16} />
                  <span>FRAMEWORKS & LIBRARIES</span>
                </div>

                <motion.ul
                  variants={container}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="mt-4 space-y-3"
                >
                  <Bullet>React 18 / Next.js</Bullet>
                  <Bullet>Tailwind CSS / Shadcn</Bullet>
                  <Bullet>Framer Motion</Bullet>
                  <Bullet>Recharts / Chart.js</Bullet>
                  <Bullet>FastAPI (Python)</Bullet>
                </motion.ul>
              </div>

              {/* DATABASES */}
              <div>
                <div className="flex items-center gap-2 text-orange-300 font-semibold text-sm">
                  <Database size={16} />
                  <span>DATABASES</span>
                </div>

                <motion.ul
                  variants={container}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="mt-4 space-y-3"
                >
                  <Bullet>MySQL</Bullet>
                  <Bullet>PostgreSQL</Bullet>
                  <Bullet>MongoDB</Bullet>
                  <Bullet>Firebase / Firestore</Bullet>
                </motion.ul>
              </div>

              {/* AI */}
              <div>
                <div className="flex items-center gap-2 text-orange-300 font-semibold text-sm">
                  <BrainCircuit size={16} />
                  <span>AI</span>
                </div>

                <motion.ul
                  variants={container}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="mt-4 space-y-3"
                >
                  <Bullet>OpenAI API (Chat/Tools)</Bullet>
                  <Bullet>Prompt Engineering</Bullet>
                </motion.ul>
              </div>

              {/* CLOUD */}
              <div>
                <div className="flex items-center gap-2 text-orange-300 font-semibold text-sm">
                  <Cloud size={16} />
                  <span>CLOUD</span>
                </div>

                <motion.ul
                  variants={container}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="mt-4 space-y-3"
                >
                  <Bullet>Vercel Deployments</Bullet>
                  <Bullet>Render / Railway</Bullet>
                  <Bullet>Docker</Bullet>
                  <Bullet>GitHub Actions (CI/CD)</Bullet>
                </motion.ul>
              </div>

              {/* ✅ OTHER TOOLS (grayscale -> color on hover) */}
              <div>
                <div className="flex items-center gap-2 text-orange-300 font-semibold text-sm">
                  <Wrench size={16} />
                  <span>OTHER TOOLS</span>
                </div>

                <motion.ul
                  variants={container}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="mt-4 space-y-3"
                >
                  <BulletBrand
                    glow="bg-gradient-to-r from-pink-500/20 via-purple-500/15 to-blue-500/10"
                    icon={
                      <span className="group-hover:opacity-100 transition">
                        <span className="block group-hover:hidden">
                          <FigmaIcon colored={false} />
                        </span>
                        <span className="hidden group-hover:block">
                          <FigmaIcon colored />
                        </span>
                      </span>
                    }
                  >
                    Figma
                  </BulletBrand>

                  <BulletBrand
                    glow="bg-gradient-to-r from-white/15 via-white/10 to-transparent"
                    icon={
                      <span className="group-hover:opacity-100 transition">
                        <span className="block group-hover:hidden">
                          <UnityIcon colored={false} />
                        </span>
                        <span className="hidden group-hover:block">
                          <UnityIcon colored />
                        </span>
                      </span>
                    }
                  >
                    Unity Engine
                  </BulletBrand>

                  <BulletBrand
                    glow="bg-gradient-to-r from-sky-500/18 via-cyan-500/12 to-transparent"
                    icon={
                      <span className="group-hover:opacity-100 transition">
                        <span className="block group-hover:hidden">
                          <CiscoIcon colored={false} />
                        </span>
                        <span className="hidden group-hover:block">
                          <CiscoIcon colored />
                        </span>
                      </span>
                    }
                  >
                    CISCO Packet Tracer
                  </BulletBrand>
                </motion.ul>
              </div>
            </div>
          </PremiumCard>
        </motion.div>
      </div>
    </div>
  );
}
