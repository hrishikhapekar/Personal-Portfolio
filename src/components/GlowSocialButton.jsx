import { motion } from "framer-motion";

export default function GlowSocialButton({
  href,
  icon: Icon,
  label,
  iconClassName = "",
  gradient = "from-white/10 via-white/5 to-transparent",
  glow = "from-white/10 via-white/5 to-transparent",
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      className="relative group px-4 py-2 rounded-xl overflow-hidden
                 border border-white/10 text-white/80 text-sm
                 backdrop-blur-xl transition flex items-center gap-2"
    >
      {/* gradient base */}
      <span
        className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-80 group-hover:opacity-100 transition`}
      />

      {/* glow blur */}
      <span
        className={`absolute -inset-10 bg-gradient-to-r ${glow} blur-2xl opacity-0 group-hover:opacity-100 transition`}
      />

      {/* inner glass */}
      <span className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition" />

      {/* content */}
      <span className="relative flex items-center gap-2">
        <Icon size={16} className={iconClassName} />
        {label}
      </span>
    </motion.a>
  );
}
