import Link from "next/link";

import BookCard from "@/components/books/BookCard";
import { Button } from "@/components/ui/button";
import { Ibook } from "@/lib/types/books";

const NewArrivals = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/books?sort=createdAt&order=desc&limit=6`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch new arrivals");
  }

  const books: Ibook[] = await res.json();

  const latestBooks = [...books]
    .sort((first, second) => {
      const firstDate = first.createdAt
        ? new Date(first.createdAt).getTime()
        : 0;

      const secondDate = second.createdAt
        ? new Date(second.createdAt).getTime()
        : 0;

      if (firstDate !== secondDate) {
        return secondDate - firstDate;
      }

      return second._id.localeCompare(first._id);
    })
    .slice(0, 6);

  return (
    <section className="w-full bg-[#151F32] px-4 py-14 sm:py-16">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-10 text-center">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
            Explore Our Collection
          </span>

          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            New <span className="text-emerald-400">Arrivals</span>
          </h2>

          <p className="mt-3 text-sm text-gray-400 md:text-base">
            Discover our newest additions and find your next favorite book.
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latestBooks.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>

        {/* See All Books */}
        <div className="mt-10 text-center">
          <Button
            nativeButton={false}
            render={<Link href="/books" />}
            className="bg-emerald-primary px-7 font-semibold text-navy transition-all hover:-translate-y-1 hover:bg-emerald-hover"
          >
            See All Books
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;