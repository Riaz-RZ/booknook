
import { Ibook } from "@/lib/types/books";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import { BookOpen, LibraryBig, Sparkles } from "lucide-react";
import MyBookCard from "@/components/books/MyBookCard";

const MyBooksPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userEmail = session?.user.email?.toLowerCase();

  const token = await getTokenFromServer();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
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
    <section className="relative min-h-screen w-full overflow-hidden bg-[#080d19] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">

      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 top-96 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Page Heading */}
        <div className="mb-14 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 shadow-lg shadow-emerald-950/20">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
              Your Personal Collection
            </span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            My{" "}
            <span className="bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Books
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
            Manage and explore the books you&apos;ve contributed to the
            BookNook library.
          </p>
        </div>

        {/* Collection Summary */}
        <div className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-2">

          {/* Total Books */}
          <div className="group relative overflow-hidden rounded-2xl border border-emerald-400/20 bg-linear-to-br from-[#142c32] via-[#10252e] to-[#101b2b] p-6 shadow-[0_15px_35px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:shadow-[0_20px_40px_rgba(16,185,129,0.12)]">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald-400/10 blur-2xl transition-all group-hover:bg-emerald-400/20" />

            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-200/70">
                  Total Books Added
                </p>

                <h2 className="mt-3 text-4xl font-extrabold tabular-nums text-white">
                  {myBooks.length}
                </h2>

                <p className="mt-2 text-xs text-slate-400">
                  Books in your collection
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 shadow-inner shadow-emerald-300/10">
                <LibraryBig className="h-8 w-8 text-emerald-400" />
              </div>
            </div>
          </div>

          {/* Collection Status */}
          <div className="group relative overflow-hidden rounded-2xl border border-cyan-400/20 bg-linear-to-br from-[#14283b] via-[#102235] to-[#101b2b] p-6 shadow-[0_15px_35px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_20px_40px_rgba(6,182,212,0.12)]">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-cyan-400/10 blur-2xl transition-all group-hover:bg-cyan-400/20" />

            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-cyan-200/70">
                  Collection Status
                </p>

                <h2 className="mt-3 text-2xl font-bold text-white">
                  {myBooks.length > 0 ? "Looking Great!" : "Getting Started"}
                </h2>

                <p className="mt-2 text-xs text-slate-400">
                  {myBooks.length > 0
                    ? "Your books are part of BookNook."
                    : "Add your first book to get started."}
                </p>
              </div>

              <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 shadow-inner shadow-cyan-300/10">
                <BookOpen className="h-8 w-8 text-cyan-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Books Section */}
        <div className="mb-6 flex flex-col gap-2 border-b border-slate-700/60 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              Your Collection
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              All the books you&apos;ve added, newest first.
            </p>
          </div>

          <span className="w-fit rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-semibold text-emerald-300 shadow-lg shadow-emerald-950/20">
            {myBooks.length} {myBooks.length === 1 ? "Book" : "Books"}
          </span>
        </div>

        {/* Books List */}
{myBooks.length > 0 ? (
  <div className="flex flex-col items-center gap-6">
    {myBooks.map((book) => (
      <MyBookCard key={book._id} book={book} />
    ))}
  </div>
) : (
          <div className="relative overflow-hidden rounded-3xl border border-dashed border-slate-600/70 bg-linear-to-br from-[#142235] to-[#0e1929] px-5 py-20 text-center shadow-[inset_0_2px_10px_rgba(0,0,0,0.3),0_15px_35px_rgba(0,0,0,0.25)]">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-emerald-400/20 bg-emerald-400/10 shadow-lg shadow-emerald-950/30">
              <BookOpen className="h-10 w-10 text-emerald-400" />
            </div>

            <h2 className="text-2xl font-bold text-white">
              No Books Found
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-400">
              You haven&apos;t added any books to the collection yet.
              Start building your personal library by adding your first book!
            </p>
          </div>
        )}

        {/* Bottom Note */}
        {myBooks.length > 0 && (
          <div className="mt-12 rounded-2xl border border-slate-700/60 bg-[#101a2a]/80 px-5 py-5 text-center shadow-lg shadow-black/20">
            <p className="text-sm text-slate-400">
              <span className="font-semibold text-emerald-400">
                Thank you
              </span>{" "}
              for contributing to BookNook and helping others discover great
              books.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};

export default MyBooksPage;
