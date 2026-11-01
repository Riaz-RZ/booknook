
import type { Ibook } from "@/lib/types/books";
import {
  BookOpen,
  UserRound,
  Library,
  Mail,
  ArrowLeft,
} from "lucide-react";

import Link from "next/link";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import BorrowBooksButton from "@/components/books/BorrowBooksButton";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

interface BookDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const BookDetailsPage = async ({ params }: BookDetailsPageProps) => {
  const { id } = await params;


  const token = await getTokenFromServer()


  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book/${id}`, {
    cache: "no-store",
    headers: {
      authorization: `Bearer ${token}`,
    }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch book details");
  }

  const book: Ibook = await res.json();

  return (
    <section className="min-h-screen bg-muted/30 px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-6xl">

        {/* Back Button */}
        <Button variant="ghost" className="mb-6 gap-2">
          <Link href="/books">
            <ArrowLeft className="h-4 w-4" />
            Back to Books
          </Link>
        </Button>

        <Card className="overflow-hidden border-none shadow-lg">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-[350px_1fr]">

              {/* Book Cover */}
              <div className="flex items-center justify-center bg-muted/60 p-8 md:p-10">
                <div className="relative aspect-2/3 w-full max-w-65 overflow-hidden rounded-lg shadow-xl">
                  <Image
                    src={book.image}
                    alt={book.title}
                    fill
                    sizes="260px"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* Book Information */}
              <div className="space-y-6 p-6 sm:p-8 lg:p-10">

                {/* Category */}
                <Badge variant="secondary" className="px-3 py-1">
                  {book.category}
                </Badge>

                {/* Title and Author */}
                <div className="space-y-3">
                  <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    {book.title}
                  </h1>

                  <div className="flex items-center gap-2 text-muted-foreground">
                    <UserRound className="h-5 w-5" />
                    <span className="text-base">
                      By {book.author}
                    </span>
                  </div>
                </div>

                <Separator />
                {/* Description */}
                <div className="space-y-3">
                  <h2 className="text-xl font-semibold">
                    About This Book
                  </h2>

                  <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                    {book.description}
                  </p>
                </div>
                <Separator />

                {/* Availability */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border bg-background p-4">
                    <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                      <Library className="h-5 w-5" />
                      <span className="text-sm">Available Copies</span>
                    </div>

                    <p className="text-2xl font-bold">
                      {book.copies}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {book.copies === 1 ? "Copy available" : "Copies available"}
                    </p>
                  </div>

                  <div className="rounded-xl border bg-background p-4">
                    <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                      <BookOpen className="h-5 w-5" />
                      <span className="text-sm">Book Category</span>
                    </div>

                    <p className="text-lg font-semibold">
                      {book.category}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Book collection
                    </p>
                  </div>
                </div>



                <Separator />

                {/* Added By */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">
                    Added By
                  </h2>

                  <div className="flex flex-col gap-3 rounded-xl bg-muted/50 p-4 sm:flex-row sm:items-center">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <UserRound className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <p className="font-semibold">
                        {book.userName}
                      </p>

                      <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4 shrink-0" />
                        <span className="break-all">
                          {book.userEmail}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Borrow Book */}
                <div className="pt-2">
                  <BorrowBooksButton book={book}/>
                </div>
              </div>

            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BookDetailsPage;