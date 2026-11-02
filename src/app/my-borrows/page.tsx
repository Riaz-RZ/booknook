
import { redirect } from "next/navigation";
import Image from "next/image";

import { getTokenFromServer } from "@/lib/getTokenFromServer";
import ReturnBookButton from "@/components/books/ReturnBorrowButton";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { BookOpen, CalendarDays } from "lucide-react";

interface Borrow {
    _id: string;
    bookId: string;
    bookTitle: string;
    bookImage: string;
    userName: string;
    userEmail: string;
    borrowedAt: string;
    returnDate: string;
}

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

const MyBorrowsPage = async () => {
    let token: string;

    try {
        token = await getTokenFromServer();

        if (!token) {
            redirect("/login");
        }
    } catch {
        redirect("/login");
    }

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/borrows/my-borrows`,
        {
            cache: "no-store",
            headers: {
                authorization: `Bearer ${token}`,
            },
        }
    );

    if (res.status === 401) {
        redirect("/login");
    }

    if (!res.ok) {
        throw new Error("Failed to fetch borrowed books.");
    }

    const borrows: Borrow[] = await res.json();

    return (
        <section className="min-h-screen bg-muted/30 px-4 py-10 sm:py-14">
            <div className="mx-auto max-w-7xl space-y-8">

                {/* Page Heading */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        My Borrows
                    </h1>

                    <p className="text-muted-foreground">
                        Manage your borrowed books and return them on time.
                    </p>
                </div>

                {/* Summary */}
                <div className="grid gap-4 sm:grid-cols-2">
                    <Card>
                        <CardContent className="flex items-center gap-4 p-6">
                            <div className="rounded-xl bg-primary/10 p-3 text-primary">
                                <BookOpen className="h-6 w-6" />
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Currently Borrowed
                                </p>

                                <p className="text-2xl font-bold">
                                    {borrows.length}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="flex items-center gap-4 p-6">
                            <div className="rounded-xl bg-primary/10 p-3 text-primary">
                                <CalendarDays className="h-6 w-6" />
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Borrowing Period
                                </p>

                                <p className="text-2xl font-bold">
                                    14 Days
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Borrowed Books Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Borrowed Books History</CardTitle>
                    </CardHeader>

                    <CardContent>
                        {borrows.length === 0 ? (
                            <div className="py-12 text-center">
                                <BookOpen className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />

                                <h2 className="text-lg font-semibold">
                                    No borrowed books yet
                                </h2>

                                <p className="mt-2 text-sm text-muted-foreground">
                                    Books you borrow will appear here.
                                </p>
                            </div>
                        ) : (
                            <div className="w-full overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Book Image</TableHead>
                                            <TableHead>Book Title</TableHead>
                                            <TableHead>Borrow Date</TableHead>
                                            <TableHead>Return Date</TableHead>
                                            <TableHead className="text-right">
                                                Action
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        {borrows.map((borrow) => (
                                            <TableRow key={borrow._id}>
                                                <TableCell>
                                                    <div className="relative h-16 w-12 overflow-hidden rounded-md border">
                                                        <Image
                                                            src={borrow.bookImage}
                                                            alt={borrow.bookTitle}
                                                            fill
                                                            sizes="48px"
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                </TableCell>

                                                <TableCell className="min-w-40 font-medium">
                                                    {borrow.bookTitle}
                                                </TableCell>

                                                <TableCell className="whitespace-nowrap">
                                                    {formatDate(borrow.borrowedAt)}
                                                </TableCell>

                                                <TableCell className="whitespace-nowrap">
                                                    {formatDate(borrow.returnDate)}
                                                </TableCell>

                                                <TableCell className="text-right">
                                                    <ReturnBookButton
                                                        borrowId={borrow._id}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};

export default MyBorrowsPage;

