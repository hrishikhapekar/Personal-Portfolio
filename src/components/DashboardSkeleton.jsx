import Skeleton from "./Skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* hero */}
      <Skeleton className="h-[260px] rounded-3xl" />

      {/* stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-[90px]" />
        ))}
      </div>

      {/* table */}
      <Skeleton className="h-[280px] rounded-3xl" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Skeleton className="h-[160px] rounded-3xl" />
        <Skeleton className="h-[160px] rounded-3xl" />
      </div>
    </div>
  );
}
