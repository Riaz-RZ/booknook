
import BookCard from "@/components/books/BookCard";
import { Ibook } from "@/lib/types/books";


const AllBooksPage = async () => {
  const res = await fetch("http://localhost:8000/books", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }

  const booksData: Ibook[] = await res.json();
  const newestFirst = [...booksData].sort((a, b) => {
    const firstDate = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const secondDate = b.createdAt ? new Date(b.createdAt).getTime() : 0;

    if (firstDate !== secondDate) {
      return secondDate - firstDate;
    }

    return b._id.localeCompare(a._id);
  });

  return (
    <section className="min-h-screen bg-muted/30 px-4 py-12">
      <div className="mx-auto max-w-7xl">

        {/* Page Heading */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Explore Our Books
          </h1>

          <p className="mt-3 text-muted-foreground">
            Discover your next favorite book from our collection.
          </p>

          <p className="mt-2 text-sm font-medium text-primary">
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
          <div className="rounded-xl border border-dashed bg-background py-16 text-center">
            <h2 className="text-xl font-semibold">
              No Books Found
            </h2>

            <p className="mt-2 text-muted-foreground">
              There are no books available at the moment.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};

export default AllBooksPage;
