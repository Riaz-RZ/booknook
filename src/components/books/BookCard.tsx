
"use client";

import { Ibook } from "@/lib/types/books";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserRound, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

interface BookCardProps {
  book: Ibook;
}

const BookCard = ({ book }: BookCardProps) => {
  const { data: session, isPending } = authClient.useSession();

  const detailsHref = session
    ? `/books/${book._id}`
    : `/login?callbackUrl=${encodeURIComponent(`/books/${book._id}`)}`;

  return (
    <Card className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-700 bg-navy-card pt-0 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/5">

      {/* Book Image */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-navy">
        <Image
          src={book.image}
          alt={book.title}
          fill
          sizes="(max-width: 440px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Book Information */}
      <CardContent className="flex flex-1 flex-col gap-2 p-4">

        {/* Book Title */}
        <h2 className="line-clamp-1 text-base font-bold text-white transition-colors duration-300 group-hover:text-emerald-400">
          {book.title}
        </h2>

        {/* Author */}
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <UserRound className="h-4 w-4 shrink-0 text-emerald-400" />
          <span className="line-clamp-1">{book.author}</span>
        </div>

        {/* Category */}
        <div className="mt-auto pt-1">
          <span className="inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
            {book.category}
          </span>
        </div>

        {/* View Details Button */}
        <Button
          className="h-9 w-full gap-2 bg-emerald-primary text-sm font-semibold text-navy transition-all duration-300 hover:bg-emerald-hover"
          nativeButton={false}
          render={<Link href={detailsHref} />}
          disabled={isPending}
        >
          View Details
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default BookCard;
