import SystemStatusPill from "./SystemStatusPill";

export default function TopBar() {
  return (
    <div className="flex items-start justify-between gap-4">
      {/* ✅ Left title block */}
      <div className="flex flex-col leading-tight">
        <h1 className="group relative text-xl md:text-2xl font-semibold tracking-wide w-fit">
          {/* ✅ neon glow aura (hover only) */}
          <span
            className="
              pointer-events-none absolute -inset-2 rounded-xl
              opacity-0 group-hover:opacity-100
              transition duration-300
              blur-xl
              bg-emerald-400/25
            "
            aria-hidden="true"
          />

          {/* ✅ neon border outline */}
          <span
            className="
              pointer-events-none absolute -inset-[6px] rounded-xl
              opacity-0 group-hover:opacity-100
              transition duration-300
              border border-emerald-400/40
              shadow-[0_0_18px_rgba(16,185,129,0.35)]
            "
            aria-hidden="true"
          />

          {/* ✅ actual text */}
          <span
            className="
              relative px-3 py-1 rounded-xl
              text-white/90
              transition duration-300
              group-hover:text-white
              group-hover:shadow-[0_0_22px_rgba(16,185,129,0.25)]
            "
          >
            HRISHI KHAPEKAR
          </span>
        </h1>

        {/* ✅ subheading (glows green on hover of name) */}
        <p
          className="
            mt-1 text-xs md:text-sm px-3 tracking-wide
            text-white/45 transition duration-300
            group-hover:text-emerald-200/80
            group-hover:drop-shadow-[0_0_14px_rgba(16,185,129,0.25)]
          "
        >
          Full Stack Developer • React • AI • Cloud
        </p>
      </div>

      {/* ✅ Right Side Status */}
      <SystemStatusPill />
    </div>
  );
}
