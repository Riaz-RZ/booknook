
"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Trash2, BookOpen, Loader2 } from "lucide-react";

import { Ibook } from "@/lib/types/books";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface MyBookCardProps {
  book: Ibook;
}

const MyBookCard = ({ book }: MyBookCardProps) => {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true);

      const token = await getTokenFromClient();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/books/${book._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete book");
      }

      toast.success("Book deleted successfully!");
      router.refresh();
    } catch (error) {
      console.error("Delete book error:", error);

      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="group mx-auto w-full max-w-175 overflow-hidden rounded-2xl border border-slate-700/70 bg-linear-to-br from-[#17263b] to-[#101a2b] shadow-[0_12px_25px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:shadow-[0_18px_35px_rgba(16,185,129,0.12)]">

      <div className="flex min-h-45 flex-col sm:flex-row">

        {/* Book Image */}
        <div className="relative h-45 w-full shrink-0 overflow-hidden bg-[#0b1422] sm:w-37.5">
          {book.image ? (
            <Image
              src={book.image}
              alt={book.title}
              fill
              sizes="(max-width: 640px) 100vw, 150px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <BookOpen className="h-12 w-12 text-slate-600" />
            </div>
          )}

          <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
        </div>

        {/* Book Information */}
        <div className="flex flex-1 flex-col justify-between gap-5 p-5 sm:flex-row sm:items-center sm:p-6">

          <div className="min-w-0 flex-1">
            <h3 className="line-clamp-2 text-xl font-bold text-white transition-colors group-hover:text-emerald-300 sm:text-2xl">
              {book.title}
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              By{" "}
              <span className="font-medium text-slate-200">
                {book.author}
              </span>
            </p>

            <div className="mt-4">
              <span className="inline-flex rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-semibold capitalize text-emerald-300">
                {book.category}
              </span>
            </div>
          </div>

          {/* Delete Button */}
          <div className="shrink-0 sm:self-center">
            <AlertDialog>
              <AlertDialogTrigger>
                <Button
                  variant="outline"
                  disabled={deleting}
                  className="w-full cursor-pointer border-red-400/30 bg-red-500/10 text-red-300 hover:border-red-400/60 hover:bg-red-500 hover:text-white sm:w-auto"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Book
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent className="border border-emerald-400/20 bg-[#17263b] text-white shadow-2xl shadow-emerald-950/30">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Delete this book?
                  </AlertDialogTitle>

                  <AlertDialogDescription className="text-slate-400">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold text-emerald-300">
                      {book.title}
                    </span>
                    ? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel className="border-slate-600 bg-transparent text-slate-300 hover:bg-slate-700 hover:text-white cursor-pointer">
                    Cancel
                  </AlertDialogCancel>

                  <AlertDialogAction
                    onClick={(event) => {
                      event.preventDefault();
                      handleDelete();
                    }}
                    disabled={deleting}
                    className="bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                  >
                    {deleting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      "Yes, Delete"
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MyBookCard;
