export default function AnimatedBlobs() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="blob absolute -top-24 -left-24 w-[520px] h-[520px] rounded-full bg-purple-600/25 blur-3xl" />
      <div className="blob blob-delay absolute top-10 right-0 w-[450px] h-[450px] rounded-full bg-orange-500/20 blur-3xl" />
      <div className="blob blob-delay-2 absolute -bottom-32 left-40 w-[520px] h-[520px] rounded-full bg-pink-500/15 blur-3xl" />
    </div>
  );
}
