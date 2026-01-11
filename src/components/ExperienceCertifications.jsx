import { motion } from "framer-motion";
import PremiumCard from "./PremiumCard";
import {
    Briefcase,
    BadgeCheck,
    CalendarDays,
    ExternalLink,
    ArrowUpRight,
} from "lucide-react";

const experience = [
    {
        role: "AI-ML Virtual Internship",
        company: "AWS Academy",
        period: "April 2025 — June 2025",
        points: [
            "Understood Basics of AI and Machine Learning",
            "Studied different types of AI models",
        ],
    },
    {
        role: "Zero Trust Cloud Security Virtual Internship",
        company: "ZScalar",
        period: "October 2025 — December 2025",
        points: [
            "Understood Basics and Functioning of Cloud Security",
            "Learned different types of Cloud Security measures",
        ],
    },
    {
        role: "Web Developer Intern",
        company: "HHT Technologies",
        period: "January 2026 — Present",
        points: [
            "-----------------Coming Soon---------------------",
            "-----------------Coming Soon---------------------",
        ],
    },
];

const certifications = [
    {
        title: "AWS Academy Graduate - Machine Learning Foundations",
        org: "Amazon Web Services",
        year: "2025",
        link: "https://www.credly.com/go/k31bP3zF", // ✅ replace with your link
    },
    {
        title: "AWS Academy Graduate - Data Engineering",
        org: "Amazon Web Services",
        year: "2025",
        link: "https://www.credly.com/go/0Qdvj81m", // ✅ replace with your link
    },
    {
        title: "AWS Academy Graduate - Cloud Foundations",
        org: "Amazon Web Services",
        year: "2025",
        link: "https://www.credly.com/go/dezfeFpx", // ✅ replace with your link
    },
    {
        title: "Introduction to C# Programming and Unity",
        org: "Coursera / Unity",
        year: "2025",
        link: "https://coursera.org/verify/QW655JYSST9H", // ✅ replace with your link
    },
    {
        title: "More C# Programming and Unity",
        org: "Coursera / Unity",
        year: "2025",
        link: "https://coursera.org/verify/9OE06K1TL2OP", // ✅ replace with your link
    },
    {
        title: "Network Support and Security",
        org: "CISCO Networking",
        year: "2025",
        link: "https://www.credly.com/badges/045f243c-6e39-4d94-b880-41d8bb5dbefb/public_url", // ✅ replace with your link
    },
    {
        title: "Industrial Cybersecurity Essentials",
        org: "CISCO Networking",
        year: "2025",
        link: "https://www.credly.com/badges/bae37b9f-72bc-490c-8526-554e09661b0b/public_url", // ✅ replace with your link
    },
    {
        title: "Fundamentals of Cybersecurity",
        org: "ZScalar",
        year: "2025",
        link: "https://verify.skilljar.com/c/3cnjy9na47z4", // ✅ replace with your link
    },
];

const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function ExperienceCertifications() {
    return (
        <div className="mt-10 space-y-6">
            {/* header */}
            <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
            >
                <p className="text-orange-300/80 text-xs tracking-[0.25em] font-semibold uppercase">
                    Career Track
                </p>
                <h2 className="text-white/90 text-3xl font-semibold mt-2">
                    Work Experience & Certifications
                </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* EXPERIENCE */}
                <motion.div
                    className="lg:col-span-3"
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
                    <PremiumCard glowPreset="orange" className="p-6">
                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 grid place-items-center">
                                <Briefcase size={18} className="text-orange-300" />
                            </div>
                            <div>
                                <h3 className="text-white/90 font-semibold text-lg">
                                    Work Experience
                                </h3>
                                <p className="text-white/45 text-sm">
                                    Roles I’ve worked in & impact delivered
                                </p>
                            </div>
                        </div>

                        {/* ✅ timeline */}
                        <div className="mt-6 relative pl-10">
                            {/* vertical line */}
                            <div className="absolute left-5 top-0 bottom-0 w-[2px] bg-white/10" />

                            <div className="space-y-6">
                                {experience.map((e, idx) => (
                                    <motion.div key={idx} variants={fadeUp} className="relative group">
                                        {/* ✅ dot glow behind (orange -> green on hover) */}
                                        <div
                                            className="absolute left-3 top-6 -translate-x-1/2 z-10
             w-10 h-10 rounded-full blur-xl transition
             bg-orange-400/15 group-hover:bg-emerald-400/18"
                                        />

                                        {/* ✅ dot (orange -> green on hover) */}
                                        <div
                                            className="absolute left-3 top-6 -translate-x-1/2 z-20
             w-4 h-4 rounded-full transition
             bg-orange-400 group-hover:bg-emerald-400
             shadow-[0_0_18px_rgba(249,115,22,0.65)]
             group-hover:shadow-[0_0_18px_rgba(52,211,153,0.75)]"
                                        />


                                        {/* ✅ card shifted right so dot never overlaps */}
                                        <div className="ml-6 rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/7 transition">
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                                <div>
                                                    <h4 className="text-white/90 font-semibold">
                                                        {e.role}
                                                    </h4>
                                                    <p className="text-white/50 text-sm">{e.company}</p>
                                                </div>

                                                <div className="flex items-center gap-2 text-white/45 text-sm">
                                                    <CalendarDays
                                                        size={14}
                                                        className="text-orange-300/80"
                                                    />
                                                    {e.period}
                                                </div>
                                            </div>

                                            <ul className="mt-3 space-y-2 text-white/60 text-sm">
                                                {e.points.map((p, i) => (
                                                    <li key={i} className="flex gap-2">
                                                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white/25" />
                                                        <span>{p}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </PremiumCard>
                </motion.div>

                {/* CERTIFICATIONS */}
                <motion.div
                    className="lg:col-span-2"
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
                    <PremiumCard glowPreset="orange" className="p-6">
                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 grid place-items-center">
                                <BadgeCheck size={18} className="text-orange-300" />
                            </div>
                            <div>
                                <h3 className="text-white/90 font-semibold text-lg">
                                    Certifications
                                </h3>
                                <p className="text-white/45 text-sm">
                                    Verified learning & credentials
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-4">
                            {certifications.map((c, idx) => (
                                <motion.a
                                    key={idx}
                                    href={c.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    variants={fadeUp}
                                    whileHover={{ y: -2, scale: 1.01 }}
                                    whileTap={{ scale: 0.98 }}
                                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                                    className="block rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 hover:border-white/15 transition cursor-pointer relative overflow-hidden group"
                                >
                                    {/* glow */}
                                    <div className="absolute -inset-12 bg-gradient-to-r from-orange-500/10 via-purple-500/8 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition" />

                                    {/* corner icon */}
                                    <div className="absolute top-4 right-4 text-white/35 group-hover:text-white/70 transition">
                                        <ExternalLink size={16} />
                                    </div>

                                    <div className="relative">
                                        <p className="text-white/90 font-semibold pr-8">
                                            {c.title}
                                        </p>
                                        <p className="text-white/55 text-sm mt-1">{c.org}</p>

                                        <div className="mt-3 flex items-center justify-between gap-3">
                                            <p className="text-orange-300/80 text-xs tracking-wide">
                                                {c.year}
                                            </p>

                                            {/* ✅ mini pill button */}
                                            <span
                                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                                   bg-black/30 border border-white/10
                                   text-white/75 text-xs
                                   group-hover:bg-white/10 group-hover:text-white transition"
                                            >
                                                View Certificate
                                                <ArrowUpRight size={14} className="text-orange-300/80" />
                                            </span>
                                        </div>
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </PremiumCard>
                </motion.div>
            </div>
        </div>
    );
}
