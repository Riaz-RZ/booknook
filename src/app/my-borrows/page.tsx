
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

import {
    BookOpen,
    CalendarDays,
    Library,
    Sparkles,
} from "lucide-react";

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
        <section className="relative min-h-screen overflow-hidden bg-[#080d19] px-4 py-12 sm:px-6 sm:py-16">

            {/* Background Effects */}
            <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px]" />
            <div className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />

            <div className="relative mx-auto max-w-7xl space-y-10">

                {/* Page Heading */}
                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

                    <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-400">
                            <Sparkles className="h-4 w-4" />
                            Your Personal Library
                        </div>

                        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                            My{" "}
                            <span className="bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                                Borrows
                            </span>
                        </h1>

                        <p className="max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                            Keep track of your borrowed books, manage your
                            reading journey, and return your books on time.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/4 px-5 py-3 shadow-xl shadow-black/20 backdrop-blur-xl">
                        <Library className="h-5 w-5 text-emerald-400" />
                        <div>
                            <p className="text-xs text-slate-400">
                                Your Library
                            </p>
                            <p className="font-semibold text-white">
                                BookNook Collection
                            </p>
                        </div>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid gap-5 sm:grid-cols-2">

                    <Card className="group relative overflow-hidden border border-emerald-400/20 bg-linear-to-br from-[#122b2c] via-[#10252c] to-[#101827] shadow-[0_15px_35px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_45px_rgba(16,185,129,0.12)]">

                        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald-400/10 blur-2xl transition-all group-hover:bg-emerald-400/20" />

                        <CardContent className="relative flex items-center gap-5 p-6">
                            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 shadow-inner shadow-emerald-300/10">
                                <BookOpen className="h-7 w-7 text-emerald-400" />
                            </div>

                            <div>
                                <p className="text-sm font-medium text-slate-400">
                                    Currently Borrowed
                                </p>

                                <p className="mt-1 text-4xl font-extrabold text-white">
                                    {borrows.length}
                                </p>

                                <p className="mt-1 text-xs text-emerald-400">
                                    Active borrowing records
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="group relative overflow-hidden border border-cyan-400/20 bg-linear-to-br from-[#102638] via-[#10212f] to-[#101827] shadow-[0_15px_35px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_45px_rgba(6,182,212,0.12)]">

                        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-cyan-400/10 blur-2xl transition-all group-hover:bg-cyan-400/20" />

                        <CardContent className="relative flex items-center gap-5 p-6">
                            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 shadow-inner shadow-cyan-300/10">
                                <CalendarDays className="h-7 w-7 text-cyan-400" />
                            </div>

                            <div>
                                <p className="text-sm font-medium text-slate-400">
                                    Borrowing Period
                                </p>

                                <p className="mt-1 text-4xl font-extrabold text-white">
                                    14 Days
                                </p>

                                <p className="mt-1 text-xs text-cyan-400">
                                    Standard return period
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Borrowed Books Table */}
                <Card className="overflow-hidden rounded-2xl border border-white/10 bg-[#101827]/90 shadow-[0_25px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl">

                    <CardHeader className="border-b border-white/10 bg-linear-to-r from-[#142235] to-[#111c2d] px-6 py-6 sm:px-8">
                        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                            <div>
                                <CardTitle className="text-xl font-bold text-white sm:text-2xl">
                                    Borrowed Books
                                </CardTitle>

                                <p className="mt-2 text-sm text-slate-400">
                                    Your currently borrowed books and return schedule.
                                </p>
                            </div>

                            <div className="w-fit rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-400">
                                {borrows.length} {borrows.length === 1 ? "Book" : "Books"}
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="p-4 sm:p-6">

                        {borrows.length === 0 ? (
                            <div className="rounded-xl border border-dashed border-slate-700 bg-slate-800/30 py-16 text-center">
                                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 shadow-lg shadow-emerald-500/10">
                                    <BookOpen className="h-8 w-8 text-emerald-400" />
                                </div>

                                <h2 className="text-xl font-bold text-white">
                                    No borrowed books yet
                                </h2>

                                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-400">
                                    Your borrowed books will appear here.
                                    Explore the library and find your next
                                    favorite read.
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-hidden rounded-xl border border-slate-700/80 bg-[#0b1422] shadow-[inset_0_2px_8px_rgba(0,0,0,0.4),0_12px_25px_rgba(0,0,0,0.3)]">

                                <div className="w-full overflow-x-auto">
                                    <Table>

                                        <TableHeader>
                                            <TableRow className="border-b border-emerald-400/20 bg-linear-to-r from-[#15343a] to-[#172a3d] hover:bg-[#15343a]">
                                                <TableHead className="h-14 pl-6 font-bold text-emerald-300">
                                                    Book
                                                </TableHead>

                                                <TableHead className="font-bold text-emerald-300">
                                                    Book Title
                                                </TableHead>

                                                <TableHead className="font-bold text-emerald-300">
                                                    Borrow Date
                                                </TableHead>

                                                <TableHead className="font-bold text-emerald-300">
                                                    Expected Return
                                                </TableHead>

                                                <TableHead className="pr-6 text-right font-bold text-emerald-300">
                                                    Action
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>

                                        <TableBody>
                                            {borrows.map((borrow) => {
                                                const isOverdue =
                                                    new Date(borrow.returnDate) <
                                                    new Date();

                                                return (
                                                    <TableRow
                                                        key={borrow._id}
                                                        className="group border-b border-slate-800/80 bg-[#111c2c] transition-all duration-300 hover:bg-linear-to-r hover:from-emerald-500/10 hover:via-cyan-500/5 hover:to-transparent hover:shadow-[inset_4px_0_0_0_rgba(52,211,153,0.8)]"
                                                    >
                                                        <TableCell className="py-4 pl-6">
                                                            <div className="relative h-20 w-14 overflow-hidden rounded-lg border border-white/10 shadow-[4px_5px_12px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:-translate-y-1 group-hover:-rotate-2 group-hover:shadow-[6px_10px_18px_rgba(16,185,129,0.2)]">
                                                                <Image
                                                                    src={borrow.bookImage}
                                                                    alt={borrow.bookTitle}
                                                                    fill
                                                                    sizes="56px"
                                                                    className="object-cover"
                                                                />
                                                            </div>
                                                        </TableCell>

                                                        <TableCell className="min-w-48 font-semibold text-white transition-colors group-hover:text-emerald-300">
                                                            {borrow.bookTitle}
                                                        </TableCell>

                                                        <TableCell className="whitespace-nowrap text-sm text-slate-300">
                                                            {formatDate(borrow.borrowedAt)}
                                                        </TableCell>

                                                        <TableCell className="whitespace-nowrap">
                                                            <span
                                                                className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold ${
                                                                    isOverdue
                                                                        ? "border-red-400/20 bg-red-400/10 text-red-400"
                                                                        : "border-emerald-400/20 bg-emerald-400/10 text-emerald-400"
                                                                }`}
                                                            >
                                                                {formatDate(borrow.returnDate)}
                                                                {isOverdue && " · Overdue"}
                                                            </span>
                                                        </TableCell>

                                                        <TableCell className="pr-6 text-right">
                                                            <ReturnBookButton
                                                                borrowId={borrow._id}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>

                                    </Table>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Bottom Note */}
                <div className="flex flex-col items-center justify-center gap-2 text-center text-sm text-slate-500 sm:flex-row">
                    <Sparkles className="h-4 w-4 text-emerald-400" />
                    <p>
                        Enjoy reading with BookNook. Remember to return your
                        books within 14 days.
                    </p>
                </div>

            </div>
        </section>
    );
};

export default MyBorrowsPage;
