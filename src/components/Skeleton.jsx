export default function Skeleton({ className = "" }) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-2xl bg-white/5 border border-white/10",
        className,
      ].join(" ")}
    >
      {/* shimmer */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}
