
import { Skeleton } from "@/components/ui/skeleton";

const BookCardSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-700 bg-[#17263b] shadow-xl">
      {/* Book Image */}
      <Skeleton className="h-64 w-full rounded-none bg-slate-700/70" />

      {/* Book Information */}
      <div className="space-y-4 p-5">
        <Skeleton className="h-6 w-3/4 bg-slate-700/70" />

        <Skeleton className="h-4 w-1/2 bg-slate-700/70" />

        <Skeleton className="h-5 w-24 rounded-full bg-slate-700/70" />

        <Skeleton className="h-10 w-full bg-slate-700/70" />
      </div>
    </div>
  );
};

export default BookCardSkeleton;
