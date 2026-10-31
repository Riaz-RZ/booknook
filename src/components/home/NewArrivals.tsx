import Link from "next/link";

import BookCard from "@/components/books/BookCard";
import { Button } from "@/components/ui/button";
import { Ibook } from "@/lib/types/books";

const NewArrivals = async () => {
  const res = await fetch(
    "http://localhost:8000/books?sort=createdAt&order=desc&limit=6",
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
    <section className="bg-muted/30 px-4 py-14 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight">New Arrivals</h2>
          <p className="mt-2 text-muted-foreground">
            Discover our newest additions.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latestBooks.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button nativeButton={false} render={<Link href="/books" />}>
            See All Books
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
