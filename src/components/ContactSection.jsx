import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Send, Instagram } from "lucide-react";
import { useState } from "react";
import GlowSocialButton from "./GlowSocialButton";

export default function ContactSection() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [status, setStatus] = useState("idle");
    // idle | sending | success | error

    const onChange = (e) =>
        setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

    const submitForm = async () => {
        try {
            setStatus("sending");

            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const json = await res.json();
            if (!json.ok) throw new Error(json.message || "Failed");

            setStatus("success");

            // clear form
            setForm({ name: "", email: "", message: "" });

            setTimeout(() => setStatus("idle"), 2500);
        } catch (err) {
            console.error(err);
            setStatus("error");
            setTimeout(() => setStatus("idle"), 2500);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* LEFT */}
            <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.55)] relative overflow-hidden"
            >
                <div className="absolute -inset-10 bg-gradient-to-br from-emerald-500/10 via-cyan-500/8 to-purple-500/10 blur-3xl" />

                <div className="relative">
                    <p className="text-emerald-300/80 text-xs tracking-[0.25em] font-semibold uppercase">
                        Contact
                    </p>

                    <h2 className="text-white/90 text-2xl md:text-3xl font-semibold mt-2">
                        Let’s build something great.
                    </h2>

                    <p className="text-white/55 text-sm mt-3 leading-relaxed">
                        Want to collaborate, hire me, or just say hi? Send a message and I’ll
                        respond quickly.
                    </p>

                    <div className="mt-7 flex flex-wrap gap-3">
                        <GlowSocialButton
                            href="https://github.com/YOUR_USERNAME"
                            icon={Github}
                            label="GitHub"
                            iconClassName="text-white/85"
                            gradient="from-slate-400/20 via-violet-500/10 to-slate-900/30"
                            glow="from-violet-500/15 via-white/10 to-slate-500/10"
                        />

                        <GlowSocialButton
                            href="https://linkedin.com/in/YOUR_USERNAME"
                            icon={Linkedin}
                            label="LinkedIn"
                            iconClassName="text-sky-200"
                            gradient="from-sky-500/25 via-blue-500/15 to-cyan-500/20"
                            glow="from-sky-500/25 via-blue-500/15 to-cyan-500/25"
                        />

                        <GlowSocialButton
                            href="https://instagram.com/YOUR_USERNAME"
                            icon={Instagram}
                            label="Instagram"
                            iconClassName="text-pink-200"
                            gradient="from-pink-500/25 via-purple-500/20 to-orange-500/25"
                            glow="from-pink-500/25 via-purple-500/15 to-orange-500/25"
                        />

                        {/* Available */}
                        <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-400/25 text-emerald-200 text-sm flex items-center gap-2">
                            <Mail size={16} />
                            Available
                        </div>
                    </div>


                </div>
            </motion.div>

            {/* RIGHT FORM */}
            <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, ease: "easeOut", delay: 0.05 }}
                className="lg:col-span-3 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.55)] relative overflow-hidden"
            >
                <div className="absolute -inset-10 bg-gradient-to-br from-orange-500/10 via-purple-500/10 to-transparent blur-3xl" />

                <div className="relative">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h3 className="text-white/90 font-semibold text-lg">
                                Send a message
                            </h3>
                            <p className="text-white/50 text-sm mt-1">
                                This will send directly to my email.
                            </p>
                        </div>

                        {/* status pill */}
                        {status !== "idle" && (
                            <div
                                className={[
                                    "px-3 py-1.5 rounded-xl text-xs border",
                                    status === "sending" &&
                                    "bg-yellow-500/10 border-yellow-400/20 text-yellow-200",
                                    status === "success" &&
                                    "bg-emerald-500/10 border-emerald-400/25 text-emerald-200",
                                    status === "error" &&
                                    "bg-red-500/10 border-red-400/20 text-red-200",
                                ].join(" ")}
                            >
                                {status === "sending" && "Sending..."}
                                {status === "success" && "Sent ✅"}
                                {status === "error" && "Failed ❌"}
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <Input
                            label="Your name"
                            name="name"
                            value={form.name}
                            onChange={onChange}
                            placeholder="Your name"
                        />
                        <Input
                            label="Email"
                            name="email"
                            value={form.email}
                            onChange={onChange}
                            placeholder="you@example.com"
                        />
                    </div>

                    <div className="mt-4">
                        <label className="text-white/50 text-xs">Message</label>
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={onChange}
                            placeholder="Tell me about your project..."
                            rows={6}
                            className="mt-2 w-full rounded-2xl bg-black/20 border border-white/10 px-4 py-3 text-white/80 text-sm outline-none focus:border-emerald-400/30 focus:ring-2 focus:ring-emerald-400/10 transition resize-none"
                        />
                    </div>

                    <div className="mt-5 flex justify-end">
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            disabled={status === "sending"}
                            onClick={submitForm}
                            className={[
                                "px-5 py-2.5 rounded-xl text-sm transition flex items-center gap-2 border",
                                status === "sending"
                                    ? "bg-white/5 border-white/10 text-white/40 cursor-not-allowed"
                                    : "bg-emerald-500/20 border-emerald-400/30 text-emerald-200 hover:bg-emerald-500/25",
                            ].join(" ")}
                        >
                            <Send size={16} />
                            {status === "sending" ? "Sending..." : "Send Message"}
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

function Input({ label, ...props }) {
    return (
        <div>
            <label className="text-white/50 text-xs">{label}</label>
            <input
                {...props}
                className="mt-2 w-full rounded-2xl bg-black/20 border border-white/10 px-4 py-3 text-white/80 text-sm outline-none focus:border-emerald-400/30 focus:ring-2 focus:ring-emerald-400/10 transition"
            />
        </div>
    );
}
