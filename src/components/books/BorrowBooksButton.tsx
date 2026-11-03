
"use client";

import { useState } from "react";
import type { Ibook } from "@/lib/types/books";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

import { toast } from "sonner";
import {
  BookOpen,
  Loader2,
  CalendarDays,
  UserRound,
  Mail,
  Sparkles,
} from "lucide-react";

import { useRouter } from "next/navigation";

interface BorrowBooksButtonProps {
  book: Ibook;
}

const BorrowBooksButton = ({ book }: BorrowBooksButtonProps) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleBorrowing = async () => {
    if (!user) {
      toast.error("Please log in to borrow a book.");
      return;
    }

    if (book.copies < 1) {
      toast.error("This book is currently unavailable.");
      return;
    }

    try {
      setLoading(true);

      const token = await getTokenFromClient();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/borrows`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            bookId: book._id,
          }),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(
          result.message || "Failed to borrow book."
        );
      }

      toast.success("Book borrowed successfully!");

      setOpen(false);
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Borrow Button */}
      <button
        type="button"
        onClick={() => {
          if (!user) {
            toast.error("Please log in to borrow a book.");
            return;
          }

          setOpen(true);
        }}
        disabled={book.copies < 1}
        className="group flex h-12 w-full cursor-pointer items-center justify-center rounded-xl border border-emerald-300/20 bg-linear-to-r from-emerald-500 to-teal-500 text-base font-bold text-white shadow-lg shadow-emerald-950/40 transition-all duration-300 hover:-translate-y-1 hover:from-emerald-400 hover:to-cyan-500 hover:shadow-xl hover:shadow-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
      >
        <BookOpen className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-[-8deg]" />

        {book.copies < 1 ? "Not Available" : "Borrow This Book"}
      </button>

      {/* Borrow Confirmation Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md overflow-hidden border border-emerald-400/20 bg-[#080d19] p-0 text-white shadow-2xl shadow-emerald-950/30">
          {/* Header */}
          <div className="relative overflow-hidden border-b border-white/10 bg-linear-to-br from-emerald-500/15 via-teal-500/10 to-transparent p-6">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-500/10 blur-3xl" />

            <DialogHeader className="relative">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-400 shadow-lg shadow-emerald-950/30">
                <BookOpen size={25} />
              </div>

              <DialogTitle className="text-xl font-bold text-white">
                Confirm Your Borrowing
              </DialogTitle>

              <DialogDescription className="text-sm text-slate-400">
                Please review your borrowing information before
                confirming.
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="space-y-5 p-6">
            {/* Selected Book */}
            <div className="rounded-xl border border-emerald-400/15 bg-linear-to-br from-emerald-500/10 to-cyan-500/5 p-4">
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                <Sparkles size={14} />
                Selected Book
              </div>

              <h3 className="text-base font-bold text-white">
                {book.title}
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                By {book.author}
              </p>

              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  Available Copies
                </span>

                <span className="font-semibold text-emerald-400">
                  {book.copies}
                </span>
              </div>
            </div>

            {/* Borrower Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <UserRound size={17} className="text-emerald-400" />

                <h3 className="text-sm font-semibold text-white">
                  Borrower Information
                </h3>
              </div>

              {/* User Name */}
              <div className="space-y-2">
                <Label className="text-xs text-slate-400">
                  Your Name
                </Label>

                <div className="relative">
                  <UserRound
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <Input
                    value={user?.name || ""}
                    readOnly
                    className="h-11 cursor-not-allowed border-white/10 bg-[#101827] pl-10 text-slate-300 focus-visible:ring-emerald-500"
                  />
                </div>
              </div>

              {/* User Email */}
              <div className="space-y-2">
                <Label className="text-xs text-slate-400">
                  Your Email
                </Label>

                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <Input
                    value={user?.email || ""}
                    readOnly
                    className="h-11 cursor-not-allowed border-white/10 bg-[#101827] pl-10 text-slate-300 focus-visible:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Return Reminder */}
            <div className="flex gap-3 rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-3">
              <CalendarDays
                size={19}
                className="mt-0.5 shrink-0 text-cyan-400"
              />

              <div>
                <p className="text-sm font-semibold text-cyan-300">
                  14-Day Borrowing Period
                </p>

                <p className="mt-1 text-xs leading-relaxed text-slate-400">
                  Please return this book within 14 days of
                  borrowing.
                </p>
              </div>
            </div>
          </div>

          {/* Dialog Footer */}
          <DialogFooter className="border-t border-white/10 bg-navy-dark p-6 pt-4 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
              className="w-full cursor-pointer border-white/15 bg-transparent text-slate-300 hover:bg-white/10 hover:text-white sm:w-auto"
            >
              Cancel
            </Button>

            <Button
              type="button"
              onClick={handleBorrowing}
              disabled={loading || book.copies < 1}
              className="w-full cursor-pointer bg-linear-to-r from-emerald-500 to-teal-500 font-semibold text-white shadow-lg shadow-emerald-950/30 transition-all duration-300 hover:from-emerald-400 hover:to-cyan-500 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <BookOpen className="mr-2 h-4 w-4" />
                  Confirm Borrowing
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BorrowBooksButton;
