
import { Skeleton } from "@/components/ui/skeleton";

const MyBookCardSkeleton = () => {
  return (
    <div className="mx-auto flex w-full max-w-175 flex-col overflow-hidden rounded-2xl border border-slate-700/70 bg-linear-to-br from-[#17263b] to-[#101a2b] shadow-xl sm:flex-row">
      {/* Image */}
      <Skeleton className="h-45 w-full rounded-none bg-slate-700/70 sm:w-37.5" />

      {/* Information */}
      <div className="flex flex-1 flex-col justify-between gap-5 p-5 sm:flex-row sm:items-center sm:p-6">
        <div className="flex-1 space-y-4">
          <Skeleton className="h-7 w-3/4 bg-slate-700/70" />

          <Skeleton className="h-4 w-1/2 bg-slate-700/70" />

          <Skeleton className="h-6 w-24 rounded-full bg-slate-700/70" />
        </div>

        <Skeleton className="h-10 w-full rounded-md bg-slate-700/70 sm:w-32" />
      </div>
    </div>
  );
};

export default MyBookCardSkeleton;
