
import { Ibook } from "@/lib/types/books";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BookCardProps {
  book: Ibook;
}

const BookCard = ({ book }: BookCardProps) => {
  return (
    <Card className="group overflow-hidden pt-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Book Image */}
      <div className="relative h-64 overflow-hidden bg-muted">
        <Image
          src={book.image}
          alt={book.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <CardContent className="space-y-3 p-5">
        {/* Category */}
        <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {book.category}
        </span>

        {/* Book Title */}
        <h2 className="line-clamp-1 text-xl font-bold">
          {book.title}
        </h2>

        {/* Author */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <UserRound className="h-4 w-4" />
          <span>{book.author}</span>
        </div>

        {/* Description */}
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {book.description}
        </p>

        {/* Copies */}
        <div className="flex items-center gap-2 border-t pt-3 text-sm">
          <BookOpen className="h-4 w-4 text-primary" />
          <span className="font-medium">
            {book.copies} {book.copies === 1 ? "Copy" : "Copies"} Available
          </span>
        </div>
      </CardContent>

      <CardFooter className="px-5 pb-5">
        <Button
          className="w-full"
          variant="outline"
          nativeButton={false}
          render={<Link href={`/books/${book._id}`} />}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
