import BookCard from "@/components/books/BookCard";
import { Ibook } from "@/lib/types/books";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

const myBooksPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const userEmail = session?.user.email?.toLowerCase();


    const token = await getTokenFromServer()

    const res = await fetch("http://localhost:8000/books", {
        cache: "no-store",
        headers: {
            authorization: `Bearer ${token}`,
        }
    });

    if (!res.ok) {
        throw new Error("Failed to fetch books");
    }

    const books: Ibook[] = await res.json();
    const myBooks = books
        .filter((book) => book.userEmail?.toLowerCase() === userEmail)
        .sort((a, b) => {
            const aDate = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const bDate = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return bDate - aDate;
        });

    return (
        <section className="min-h-screen bg-muted/30 px-4 py-12">
            <div className="mx-auto max-w-7xl">
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-bold tracking-tight">My Books</h1>
                    <p className="mt-2 text-muted-foreground">
                        Books added by you to the collection.
                    </p>
                </div>

                {myBooks.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {myBooks.map((book) => (
                            <BookCard key={book._id} book={book} />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-xl border border-dashed bg-background py-16 text-center">
                        <h2 className="text-xl font-semibold">No Books Found</h2>
                        <p className="mt-2 text-muted-foreground">
                            You have not added any books yet.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default myBooksPage;