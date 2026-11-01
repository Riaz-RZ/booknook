
import BookCard from "@/components/books/BookCard";
import { Ibook } from "@/lib/types/books";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

const MyBooksPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userEmail = session?.user.email?.toLowerCase();

  const token = await getTokenFromServer();

  const res = await fetch("http://localhost:8000/books", {
    cache: "no-store",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }

  const books: Ibook[] = await res.json();

  const myBooks = books
    .filter((book) => book.userEmail?.toLowerCase() === userEmail)
    .sort((a, b) => {
      const aDate = a.createdAt
        ? new Date(a.createdAt).getTime()
        : 0;

      const bDate = b.createdAt
        ? new Date(b.createdAt).getTime()
        : 0;

      return bDate - aDate;
    });

  return (
    <section className="min-h-screen w-full bg-[#151F32] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Page Heading */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
            Your Collection
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            My <span className="text-emerald-400">Books</span>
          </h1>

          <p className="mt-4 text-gray-400">
            Manage and explore the books you&apos;ve added to BookNook.
          </p>

          <p className="mt-3 text-sm font-semibold text-emerald-400">
            {myBooks.length} {myBooks.length === 1 ? "Book" : "Books"} Added
          </p>
        </div>

        {/* Books Grid */}
        {myBooks.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {myBooks.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-600 bg-navy-card px-4 py-16 text-center">
            <h2 className="text-xl font-semibold text-white">
              No Books Found
            </h2>

            <p className="mt-3 text-gray-400">
              You haven&apos;t added any books to the collection yet.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};

export default MyBooksPage;
