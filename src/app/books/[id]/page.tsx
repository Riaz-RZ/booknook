
import type { Ibook } from "@/lib/types/books";
import {
  BookOpen,
  UserRound,
  Library,
  Mail,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";

import Link from "next/link";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import BorrowBooksButton from "@/components/books/BorrowBooksButton";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

interface BookDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const BookDetailsPage = async ({ params }: BookDetailsPageProps) => {
  const { id } = await params;

  const token = await getTokenFromServer();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/book/${id}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch book details");
  }

  const book: Ibook = await res.json();

  const isAvailable = book.copies > 0;

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#080d19] px-4 py-10 text-white sm:py-14">

      {/* Background Glow Effects */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px]" />

      <div className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">

        {/* Back Button */}
        <Link href="/books">
          <Button
            variant="outline"
            className="cursor-pointer mb-8 gap-2 border-emerald-400/20 bg-[#111c2e] text-gray-300 transition-all duration-300 hover:border-emerald-400/50 hover:bg-emerald-400/10 hover:text-emerald-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Books
          </Button>
        </Link>

        {/* Main Book Card */}
        <Card className="group overflow-hidden rounded-3xl border border-emerald-400/15 bg-linear-to-br from-[#111c2e] via-[#101a2b] to-[#0b1423] shadow-2xl shadow-black/40 transition-all duration-500 hover:border-emerald-400/30 hover:shadow-emerald-950/30">

          <CardContent className="p-0">
            <div className="grid md:grid-cols-[380px_1fr]">

              {/* Book Cover Section */}
              <div className="relative flex flex-col items-center justify-center overflow-hidden border-b border-emerald-400/10 bg-linear-to-br from-[#14263a] to-[#0c1728] p-8 sm:p-12 md:border-b-0 md:border-r">

                {/* Decorative Glow */}
                <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/10 blur-[80px]" />

                <div className="relative z-10 w-full max-w-67.5 perspective-[1000px]">

                  {/* 3D Book Cover */}
                  <div className="relative aspect-2/3 w-full overflow-hidden rounded-r-xl rounded-l-md border border-white/10 shadow-2xl shadow-black/60 transition-all duration-700 transform-[rotateY(-8deg)] group-hover:transform-[rotateY(0deg)_scale(1.04)] group-hover:shadow-emerald-500/20">

                    <Image
                      src={book.image}
                      alt={book.title}
                      fill
                      priority
                      sizes="(max-width: 768px) 80vw, 270px"
                      className="object-cover"
                    />

                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-white/5" />
                  </div>

                  {/* Book Shadow */}
                  <div className="mx-auto mt-5 h-4 w-[85%] rounded-full bg-black/60 blur-xl transition-all duration-500 group-hover:w-[95%]" />
                </div>

                {/* Cover Caption */}
                <div className="relative z-10 mt-6 flex items-center gap-2 text-sm text-gray-400">
                  <Sparkles className="h-4 w-4 text-emerald-400" />
                  <span>Discover your next favorite book</span>
                </div>
              </div>

              {/* Book Information Section */}
              <div className="space-y-7 p-6 sm:p-9 lg:p-11">

                {/* Category and Availability */}
                <div className="flex flex-wrap items-center justify-between gap-3">

                  <Badge className="border border-emerald-400/20 bg-emerald-400/10 px-4 py-1.5 text-emerald-300 hover:bg-emerald-400/15">
                    {book.category}
                  </Badge>

                  <div
                    className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium ${
                      isAvailable
                        ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                        : "border-red-400/20 bg-red-400/10 text-red-300"
                    }`}
                  >
                    {isAvailable ? (
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    ) : (
                      <AlertCircle className="h-3.5 w-3.5" />
                    )}

                    {isAvailable ? "Available" : "Out of Stock"}
                  </div>
                </div>

                {/* Title and Author */}
                <div className="space-y-4">
                  <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                    {book.title}
                  </h1>

                  <div className="flex items-center gap-3 text-gray-400">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/15 bg-emerald-400/10">
                      <UserRound className="h-5 w-5 text-emerald-400" />
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Written by</p>
                      <p className="font-medium text-gray-200">
                        {book.author}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator className="bg-white/10" />

                {/* Description */}
                <div className="space-y-3">
                  <h2 className="flex items-center gap-2 text-lg font-bold text-white">
                    <BookOpen className="h-5 w-5 text-emerald-400" />
                    About This Book
                  </h2>

                  <p className="text-sm leading-8 text-gray-400 sm:text-base">
                    {book.description}
                  </p>
                </div>

                <Separator className="bg-white/10" />

                {/* Book Statistics */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                  {/* Available Copies */}
                  <div className="group/stat rounded-2xl border border-emerald-400/15 bg-linear-to-br from-emerald-400/10 to-transparent p-5 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/30 hover:shadow-lg hover:shadow-emerald-950/30">

                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/15">
                        <Library className="h-5 w-5 text-emerald-400" />
                      </div>

                      <span className="text-xs text-gray-500">
                        Inventory
                      </span>
                    </div>

                    <p className="text-3xl font-extrabold text-emerald-300">
                      {book.copies}
                    </p>

                    <p className="mt-1 text-sm text-gray-400">
                      {book.copies === 1
                        ? "Copy available"
                        : "Copies available"}
                    </p>
                  </div>

                  {/* Book Category */}
                  <div className="group/stat rounded-2xl border border-cyan-400/15 bg-linear-to-br from-cyan-400/10 to-transparent p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:shadow-lg hover:shadow-cyan-950/30">

                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/15">
                        <BookOpen className="h-5 w-5 text-cyan-400" />
                      </div>

                      <span className="text-xs text-gray-500">
                        Collection
                      </span>
                    </div>

                    <p className="text-xl font-bold text-cyan-300">
                      {book.category}
                    </p>

                    <p className="mt-1 text-sm text-gray-400">
                      Book category
                    </p>
                  </div>
                </div>

                <Separator className="bg-white/10" />

                {/* Added By */}
                <div className="space-y-4">
                  <h2 className="text-lg font-bold text-white">
                    Added By
                  </h2>

                  <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#0b1525] p-4 sm:flex-row sm:items-center">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10">
                      <UserRound className="h-6 w-6 text-emerald-400" />
                    </div>

                    <div className="min-w-0">
                      <p className="font-semibold text-white">
                        {book.userName}
                      </p>

                      <div className="mt-2 flex items-center gap-2 text-sm text-gray-400">
                        <Mail className="h-4 w-4 shrink-0 text-emerald-400" />

                        <span className="break-all">
                          {book.userEmail}
                        </span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Borrow Book */}
                <div className="rounded-2xl border border-emerald-400/15 bg-linear-to-r from-emerald-400/10 to-cyan-400/5 p-5 sm:p-6">
                  <div className="mb-4">
                    <h2 className="text-lg font-bold text-white">
                      Ready to Start Reading?
                    </h2>

                    <p className="mt-1 text-sm text-gray-400">
                      Borrow this book and enjoy your next reading adventure.
                    </p>
                  </div>

                  <BorrowBooksButton book={book} />
                </div>

              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Decoration */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-600">
          <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
          <span>Your next chapter starts here with BookNook</span>
        </div>

      </div>
    </section>
  );
};

export default BookDetailsPage;