import { motion } from "framer-motion";
import { ExternalLink, Github, GitFork, Star, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import GlassSelect from "./GlassSelect";

function Tag({ children }) {
    return (
        <span className="px-3 py-1 rounded-lg text-[12px] bg-white/5 border border-white/10 text-white/70">
            {children}
        </span>
    );
}

function RepoCard({ repo }) {
    const liveUrl =
        repo.homepage && repo.homepage.startsWith("http") ? repo.homepage : null;

    return (
        <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
        >
            {/* top banner */}
            <div className="relative h-[210px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/25 via-purple-500/15 to-cyan-500/10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

                {/* title */}
                <div className="absolute top-5 left-5 right-5">
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                            <p className="text-white/60 text-xs">GitHub Repository</p>
                            <h3 className="text-white/90 font-semibold text-lg truncate">
                                {repo.name}
                            </h3>
                            <p className="text-white/50 text-xs mt-1">
                                Updated {new Date(repo.updated_at).toLocaleDateString()}
                            </p>
                        </div>

                        {/* actions */}
                        <div className="flex gap-2 shrink-0">
                            <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noreferrer"
                                className="w-10 h-10 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md grid place-items-center text-white/80 hover:text-white hover:bg-black/55 transition"
                                title="GitHub"
                            >
                                <Github size={18} />
                            </a>

                            {liveUrl && (
                                <a
                                    href={liveUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-10 h-10 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md grid place-items-center text-white/80 hover:text-white hover:bg-black/55 transition"
                                    title="Live Demo"
                                >
                                    <ExternalLink size={18} />
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* footer stats */}
                <div className="absolute bottom-5 left-5 flex items-center gap-4 text-white/70 text-xs">
                    <span className="flex items-center gap-1.5">
                        <Star size={14} className="text-yellow-300" />
                        {repo.stargazers_count}
                    </span>

                    <span className="flex items-center gap-1.5">
                        <GitFork size={14} className="text-white/60" />
                        {repo.forks_count}
                    </span>

                    {repo.language && (
                        <span className="ml-1 px-2 py-1 rounded-lg border border-white/10 bg-white/5">
                            {repo.language}
                        </span>
                    )}
                </div>
            </div>

            {/* content */}
            <div className="p-5">
                <p className="text-white/55 text-sm leading-relaxed min-h-[44px]">
                    {repo.description || "No description available."}
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                    {repo.topics?.length ? (
                        repo.topics.slice(0, 6).map((t) => <Tag key={t}>{t}</Tag>)
                    ) : (
                        <Tag>no-topics</Tag>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export default function GithubProjects() {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);

    // UI state
    const [query, setQuery] = useState("");
    const [sort, setSort] = useState("updated"); // updated | stars | name
    const [visibleCount, setVisibleCount] = useState(9);

    const fetchRepos = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/github-repos-all", { cache: "no-store" });
            const json = await res.json();

            console.log("All repos:", json);

            if (!json.ok) throw new Error(json.message || "API failed");
            setRepos(json.repos || []);
            setLoading(false);
        } catch (err) {
            console.error("Repo fetch failed:", err);
            setRepos([]);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRepos();
    }, []);

    // filtered + sorted
    const filteredRepos = useMemo(() => {
        let list = [...repos];

        if (query.trim()) {
            const q = query.toLowerCase();
            list = list.filter(
                (r) =>
                    r.name.toLowerCase().includes(q) ||
                    (r.description || "").toLowerCase().includes(q) ||
                    (r.language || "").toLowerCase().includes(q) ||
                    (r.topics || []).some((t) => t.toLowerCase().includes(q))
            );
        }

        if (sort === "updated") {
            list.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        } else if (sort === "stars") {
            list.sort((a, b) => b.stargazers_count - a.stargazers_count);
        } else if (sort === "name") {
            list.sort((a, b) => a.name.localeCompare(b.name));
        }

        return list;
    }, [repos, query, sort]);

    const shown = filteredRepos.slice(0, visibleCount);

    return (
        <div className="space-y-6">
            {/* header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                    <p className="text-orange-300/80 text-xs tracking-[0.25em] font-semibold uppercase">
                        Deployed Modules
                    </p>
                    <h2 className="text-white/90 text-3xl font-semibold mt-2">
                        Featured Work
                    </h2>
                    <p className="text-white/50 text-sm mt-2">
                        Showing {filteredRepos.length} repositories
                    </p>
                </div>

                {/* search + sort */}
                <div className="flex flex-col sm:flex-row gap-3">
                    {/* search */}
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl">
                        <Search size={16} className="text-white/50" />
                        <input
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                setVisibleCount(9);
                            }}
                            placeholder="Search repos..."
                            className="bg-transparent outline-none text-sm text-white/80 w-[220px]"
                        />
                    </div>

                    {/* sort */}
                    <GlassSelect
                        value={sort}
                        onChange={(val) => setSort(val)}
                        options={[
                            { value: "updated", label: "Sort: Recently Updated" },
                            { value: "stars", label: "Sort: Stars" },
                            { value: "name", label: "Sort: Name" },
                        ]}
                    />

                </div>
            </div>

            {/* body */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden"
                        >
                            <div className="h-[210px] bg-white/5 animate-pulse" />
                            <div className="p-5 space-y-3">
                                <div className="h-4 w-2/3 bg-white/5 rounded animate-pulse" />
                                <div className="h-3 w-full bg-white/5 rounded animate-pulse" />
                                <div className="h-3 w-4/5 bg-white/5 rounded animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : filteredRepos.length === 0 ? (
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                    <p className="text-white/60 text-sm">No repositories found.</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {shown.map((repo) => (
                            <RepoCard key={repo.id} repo={repo} />
                        ))}
                    </div>

                    {/* load more */}
                    {visibleCount < filteredRepos.length && (
                        <div className="flex justify-center pt-2">
                            <button
                                onClick={() => setVisibleCount((v) => v + 9)}
                                className="px-5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white/80 text-sm hover:bg-white/15 transition"
                            >
                                Load More
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
