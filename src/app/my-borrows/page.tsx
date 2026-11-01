import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import ReturnBorrowButton from '@/components/books/ReturnBorrowButton';
import { getTokenFromServer } from '@/lib/getTokenFromServer';

interface Borrow {
    _id: string;
    image: string;
    name?: string;
    title?: string;
    borrowedAt?: string;
    createdAt?: string;
}

function formatDate(date: Date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).format(date)
}

const myBorrowsPage = async() => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    const user = session?.user


    const token = await getTokenFromServer()

    const res = await fetch(`http://localhost:8000/borrows/${user?.email}`, {
        cache: 'no-store',
        headers: {
      authorization: `Bearer ${token}`,
    }
    })
    const borrows: Borrow[] = res.ok ? await res.json() : []

    console.log(borrows);

    return (
        <div className="mx-auto min-h-screen max-w-6xl px-4 py-10">
            <h1 className="mb-6 text-3xl font-bold">My Borrowed Books</h1>

            {borrows.length === 0 ? (
                <p className="rounded-xl border p-8 text-center text-muted-foreground">
                    You have no borrowed books.
                </p>
            ) : (
                <div className="flex flex-col gap-6">
                    {borrows.map((borrow) => (
                        <Card key={borrow._id} className="flex-row overflow-hidden pt-0">
                            <div className="relative h-48 w-36 shrink-0 bg-muted sm:h-52 sm:w-40">
                                <Image
                                    src={borrow.image}
                                    alt={borrow.name ?? borrow.title ?? 'Borrowed book'}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover"
                                />
                            </div>
                            <CardContent className="flex flex-1 flex-col justify-between space-y-4 p-5">
                                <h2 className="line-clamp-2 text-lg font-semibold">
                                    {borrow.name ?? borrow.title ?? 'Untitled book'}
                                </h2>
                                {(() => {
                                    const borrowedDate = new Date(
                                        borrow.borrowedAt ?? borrow.createdAt ?? ''
                                    )
                                    const validBorrowedDate = Number.isNaN(borrowedDate.getTime())
                                        ? new Date()
                                        : borrowedDate
                                    const returnDate = new Date(validBorrowedDate)
                                    returnDate.setDate(returnDate.getDate() + 7)

                                    return (
                                        <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                                            <p>
                                                <span className="font-medium text-foreground">Borrowed:</span>{' '}
                                                {formatDate(validBorrowedDate)}
                                            </p>
                                            <p>
                                                <span className="font-medium text-foreground">Return by:</span>{' '}
                                                {formatDate(returnDate)}
                                            </p>
                                        </div>
                                    )
                                })()}
                                <ReturnBorrowButton borrowId={borrow._id} />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default myBorrowsPage;