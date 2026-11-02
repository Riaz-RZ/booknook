
import MyBookCardSkeleton from "@/components/skeletons/MyBookCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

const MyBooksLoading = () => {
  return (
    <section className="min-h-screen bg-[#080d19] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Heading Skeleton */}
        <div className="mb-14 flex flex-col items-center gap-4">
          <Skeleton className="h-8 w-48 rounded-full bg-slate-700/70" />

          <Skeleton className="h-12 w-64 bg-slate-700/70" />

          <Skeleton className="h-5 w-80 max-w-full bg-slate-700/70" />
        </div>

        {/* Summary Skeleton */}
        <div className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Skeleton className="h-36 rounded-2xl bg-slate-700/70" />
          <Skeleton className="h-36 rounded-2xl bg-slate-700/70" />
        </div>

        {/* Section Heading */}
        <div className="mb-6 flex justify-between">
          <Skeleton className="h-8 w-40 bg-slate-700/70" />
          <Skeleton className="h-8 w-20 rounded-full bg-slate-700/70" />
        </div>

        {/* Book List */}
        <div className="flex flex-col items-center gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <MyBookCardSkeleton key={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default MyBooksLoading;
