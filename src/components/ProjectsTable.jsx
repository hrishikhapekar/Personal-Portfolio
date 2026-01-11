const projects = [
  { name: "Youtube Music Player", stack: "Python, VLC, yt-dlp", status: "Completed" },
  { name: "Portfolio Dashboard", stack: "React, Tailwind", status: "In Progress" },
  { name: "Supermarket App", stack: "UML, DFD, ERD", status: "Completed" },
  { name: "Meme Maker", stack: "NextJs", status: "Completed" },
  { name: "Link State Routing", stack: "HTML, CSS, JS", status: "Completed" },
  { name: "DESK AI", stack: "Python, VOSK", status: "Completed" },
  { name: "Aim Trainer", stack: "NodeJs ", status: "Completed" },
  { name: "Rock Paper Scissor", stack: "HTML, CSS, JS, PostgreSQL, OAuth 2.0", status: "Completed" },
  { name: "Web Walkie Talkie", stack: "Unknown", status: "In Progress" },
];

export default function ProjectsTable() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white/90 font-semibold">Recent Projects</h3>
        <button className="text-white/60 hover:text-white text-sm transition">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-white/50">
              <th className="text-left font-medium py-2">Project</th>
              <th className="text-left font-medium py-2">Tech</th>
              <th className="text-left font-medium py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.name} className="border-t border-white/10">
                <td className="py-3 text-white/90">{p.name}</td>
                <td className="py-3 text-white/60">{p.stack}</td>
                <td className="py-3">
                  <span className="px-2 py-1 rounded-lg bg-white/10 border border-white/10 text-white/70">
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
