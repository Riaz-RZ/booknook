
import BookCard from "@/components/books/BookCard";
import { Ibook } from "@/lib/types/books";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BookNook | All Books",
  description: "Explore all available books in the BookNook library.",
};

const AllBooksPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }

  const booksData: Ibook[] = await res.json();

  const newestFirst = [...booksData].sort((a, b) => {
    const firstDate = a.createdAt
      ? new Date(a.createdAt).getTime()
      : 0;

    const secondDate = b.createdAt
      ? new Date(b.createdAt).getTime()
      : 0;

    if (firstDate !== secondDate) {
      return secondDate - firstDate;
    }

    return b._id.localeCompare(a._id);
  });

  return (
    <section className="min-h-screen w-full bg-[#151F32] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Page Heading */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
            Discover Your Next Read
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Explore Our{" "}
            <span className="text-emerald-400">Books</span>
          </h1>

          <p className="mt-4 text-gray-400">
            Discover your next favorite book from our collection.
          </p>

          <p className="mt-3 text-sm font-semibold text-emerald-400">
            {newestFirst.length} Books Available
          </p>
        </div>

        {/* Books Grid */}
        {newestFirst.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {newestFirst.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-600 bg-navy-card px-4 py-16 text-center">
            <h2 className="text-xl font-semibold text-white">
              No Books Found
            </h2>

            <p className="mt-2 text-gray-400">
              There are no books available at the moment.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};

export default AllBooksPage;
