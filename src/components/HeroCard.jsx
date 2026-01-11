import myImg from "../images/myimage.png";
export default function HeroCard() {
  return (
    <section className="relative overflow-visible rounded-3xl border border-white/10 bg-white/5">
      {/* Background gradient */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500/30 via-purple-500/20 to-slate-900/20" />

      {/* Content */}
      <div className="relative p-6 md:p-8 flex items-center justify-between gap-6">
        {/* ✅ Left Content (add padding-right so it won’t overlap image) */}
        <div className="pr-0 md:pr-[320px]">
          <p className="text-white/60 text-xs">Personal Portfolio</p>

          <h1 className="text-white text-3xl md:text-4xl font-bold leading-tight mt-2">
            3<sup>rd</sup> Year IT Student
          </h1>
          <h2 className="text-white text-1xl md:text-1xl font-bold leading-tight mt-2">Shri Ramdeobaba College of Engineering and Management</h2>

          <p className="text-white/60 mt-3 max-w-md text-sm">
            Full Stack Developer focused on scalable web apps, clean architecture, and smooth UI experiences — built with React, Node, and Cloud.
          </p>

          <button
            onClick={handleResumeDownload}
            className="mt-5 px-4 py-2 rounded-xl bg-white/10 border border-white/15 text-white text-sm hover:bg-white/15 transition"
          >
            View Resume
          </button>
        </div>

        {/* ✅ POP OUT Portrait (absolute floating) */}
        <div className="hidden md:block absolute right-10 top-1/2 -translate-y-1/2 z-20">
          {/* glow behind portrait */}
          <div className="absolute -inset-7 rounded-[42px] bg-gradient-to-br from-orange-500/25 via-purple-500/15 to-transparent blur-2xl" />

          {/* portrait frame */}
          <div
            className="
              relative w-[240px] h-[240px]
              rounded-[40px]
              border border-white/10
              bg-white/5
              backdrop-blur-xl
              shadow-[0_30px_80px_rgba(0,0,0,0.70)]
              overflow-hidden
              transform-gpu
              transition duration-300
              hover:scale-[1.02]
            "
          >
            <img
              className="
                w-full h-full object-cover
                scale-[1.18]
                translate-y-3
                drop-shadow-[0_30px_60px_rgba(0,0,0,0.75)]
              "
              src={myImg}
              alt="portrait"
            />

            {/* subtle reflection overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-40" />
          </div>
        </div>
      </div>
    </section>
  );
}

const handleResumeDownload = async () => {
  try {
    const res = await fetch("/api/resume");
    if (!res.ok) throw new Error("API failed");

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "Resume.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error(err);
    alert("Resume download failed!");
  }
};
