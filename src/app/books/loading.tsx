
import { Skeleton } from "@/components/ui/skeleton";
import BookCardSkeleton from "@/components/skeletons/BookCardSkeleton";

const AllBooksLoading = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#080d19] px-4 py-12 sm:px-6 lg:px-8">

      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 top-96 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Page Heading */}
        <div className="mb-12 text-center">
          <Skeleton className="mx-auto mb-5 h-7 w-36 rounded-full bg-slate-700/70" />

          <Skeleton className="mx-auto h-12 w-64 max-w-full bg-slate-700/70" />

          <Skeleton className="mx-auto mt-5 h-5 w-80 max-w-full bg-slate-700/70" />
        </div>

        {/* Search and Filter Section */}
        <div className="mb-10 flex flex-col gap-4 rounded-2xl border border-slate-700/70 bg-[#111c2c]/80 p-5 shadow-xl sm:flex-row sm:items-center">

          {/* Search Skeleton */}
          <Skeleton className="h-11 w-full bg-slate-700/70 sm:flex-1" />

          {/* Category Filter Skeleton */}
          <Skeleton className="h-11 w-full bg-slate-700/70 sm:w-48" />

          {/* Button Skeleton */}
          <Skeleton className="h-11 w-full bg-slate-700/70 sm:w-28" />

        </div>

        {/* Results Heading */}
        <div className="mb-7 flex items-center justify-between">
          <Skeleton className="h-7 w-36 bg-slate-700/70" />
          <Skeleton className="h-6 w-20 rounded-full bg-slate-700/70" />
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, index) => (
            <BookCardSkeleton key={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default AllBooksLoading;
