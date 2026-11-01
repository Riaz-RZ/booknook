
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import ReturnBorrowButton from "@/components/books/ReturnBorrowButton";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

interface Borrow {
  _id: string;
  image: string;
  name?: string;
  title?: string;
  borrowedAt?: string;
  createdAt?: string;
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

const MyBorrowsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user?.email) {
    return (
      <section className="flex min-h-screen w-full items-center justify-center bg-[#151F32] px-4 py-12">
        <div className="w-full max-w-lg rounded-2xl border border-gray-700 bg-navy-card p-8 text-center">
          <h2 className="text-xl font-semibold text-white">
            Please Sign In
          </h2>
          <p className="mt-2 text-gray-400">
            Sign in to view your borrowed books.
          </p>
        </div>
      </section>
    );
  }

  const token = await getTokenFromServer();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/borrows/${encodeURIComponent(user.email)}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch borrowed books");
  }

  const borrows: Borrow[] = await res.json();

  return (
    <section className="min-h-screen w-full bg-[#151F32] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Page Heading */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
            Your Reading Journey
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            My Borrowed <span className="text-emerald-400">Books</span>
          </h1>

          <p className="mt-4 text-gray-400">
            Keep track of your borrowed books and return dates.
          </p>

          <p className="mt-3 text-sm font-semibold text-emerald-400">
            {borrows.length} {borrows.length === 1 ? "Book" : "Books"} Borrowed
          </p>
        </div>

        {/* Borrowed Books */}
        {borrows.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-600 bg-navy-card px-4 py-16 text-center">
            <h2 className="text-xl font-semibold text-white">
              No Borrowed Books
            </h2>

            <p className="mt-3 text-gray-400">
              You haven&apos;t borrowed any books yet. Explore our collection
              and find your next favorite read.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {borrows.map((borrow) => {
              const borrowedDate = new Date(
                borrow.borrowedAt ?? borrow.createdAt ?? ""
              );

              const validBorrowedDate = Number.isNaN(
                borrowedDate.getTime()
              )
                ? new Date()
                : borrowedDate;

              const returnDate = new Date(validBorrowedDate);
              returnDate.setDate(returnDate.getDate() + 7);

              return (
                <Card
                  key={borrow._id}
                  className="flex-row overflow-hidden border-gray-700 bg-navy-card pt-0 shadow-md transition hover:border-emerald-500/50"
                >
                  {/* Book Cover */}
                  <div className="relative h-48 w-36 shrink-0 bg-navy sm:h-52 sm:w-40">
                    <Image
                      src={borrow.image}
                      alt={borrow.name ?? borrow.title ?? "Borrowed book"}
                      fill
                      sizes="(max-width: 640px) 144px, 160px"
                      className="object-cover"
                    />
                  </div>

                  {/* Book Information */}
                  <CardContent className="flex flex-1 flex-col justify-between gap-4 p-5">
                    <div>
                      <h2 className="line-clamp-2 text-lg font-semibold text-white sm:text-xl">
                        {borrow.name ?? borrow.title ?? "Untitled book"}
                      </h2>

                      {/* Borrowing Dates */}
                      <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                        <p className="text-gray-400">
                          <span className="font-medium text-gray-200">
                            Borrowed:
                          </span>{" "}
                          {formatDate(validBorrowedDate)}
                        </p>

                        <p className="text-gray-400">
                          <span className="font-medium text-gray-200">
                            Return by:
                          </span>{" "}
                          <span className="font-semibold text-emerald-400">
                            {formatDate(returnDate)}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Return Button */}
                    <ReturnBorrowButton borrowId={borrow._id} />
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};

export default MyBorrowsPage;
