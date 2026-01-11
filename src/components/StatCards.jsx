import { useEffect, useState } from "react";
import PremiumCard from "./PremiumCard";

export default function StatCards() {
  const [projects, setProjects] = useState(null);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/github-repos", { cache: "no-store" });
      const json = await res.json();

      if (!json.ok) throw new Error("API failed");
      setProjects(json.projects);
    } catch (err) {
      console.error("Repo count fetch failed:", err);
      setProjects(null);
    }
  };

  useEffect(() => {
    fetchProjects();
    const interval = setInterval(fetchProjects, 5 * 60 * 1000); // refresh every 5 min
    return () => clearInterval(interval);
  }, []);

  return (
    <PremiumCard
      glowPreset="cyan"
      className="p-5 h-[160px] flex flex-col justify-between"
    >
      <div>
        <p className="text-white/60 text-xs">Projects</p>

        <p className="text-white text-3xl font-semibold mt-2">
          {projects === null ? "—" : projects}
        </p>
      </div>

      <p className="text-white/50 text-xs">
        {projects === null ? "Syncing GitHub..." : "GitHub repositories"}
      </p>
    </PremiumCard>
  );
}
