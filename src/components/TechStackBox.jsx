import { motion } from "framer-motion";

const TECH = [
  // Core Web
  { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },

  // Backend
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },

  // Languages
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },

  // Version Control
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },

  // Databases
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Oracle", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg" },

  // Design / Tools
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Unity", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg" },
  { name: "Blender", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg" },
];

export default function TechStackBox() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 relative overflow-hidden">
      {/* subtle inner light */}
      <div className="absolute inset-0 rounded-3xl shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]" />

      <div className="relative">
        <p className="text-white/55 text-xs tracking-wide">Tech Stack</p>
        <h3 className="text-white/90 font-semibold mt-1 text-sm">
          Tools I build with
        </h3>

        {/* ✅ Icon Grid */}
        <div className="mt-4 grid grid-cols-5 gap-3">
          {TECH.map((t) => (
            <motion.div
              key={t.name}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.98 }}
              className="group relative"
            >
              {/* tooltip */}
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition pointer-events-none z-20">
                <div className="px-2 py-1 text-[10px] rounded-lg bg-black/70 border border-white/10 text-white/80 whitespace-nowrap">
                  {t.name}
                </div>
              </div>

              {/* icon tile */}
              <div
                className="
                  w-full aspect-square rounded-2xl
                  border border-white/10 bg-white/5
                  grid place-items-center
                  overflow-hidden
                  shadow-[0_12px_30px_rgba(0,0,0,0.35)]
                  transition
                  group-hover:border-emerald-400/30
                  group-hover:shadow-[0_0_0_1px_rgba(16,185,129,0.35),0_0_25px_rgba(16,185,129,0.18)]
                "
              >
                <img
                  src={t.icon}
                  alt={t.name}
                  className="
                    w-7 h-7 opacity-90
                    group-hover:opacity-100 transition
                    group-hover:drop-shadow-[0_0_10px_rgba(16,185,129,0.25)]
                  "
                  draggable="false"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
