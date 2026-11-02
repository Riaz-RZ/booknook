
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
    DialogTrigger,
} from "@/components/ui/dialog";
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
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
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button
                    size="lg"
                    className="w-full"
                    disabled={book.copies < 1}
                >
                    {book.copies < 1
                        ? "Not Available"
                        : "Borrow This Book"}
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Borrow This Book</DialogTitle>

                    <DialogDescription>
                        Confirm your information before borrowing this book.
                        You will have 14 days to return it.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-3">
                    <div className="rounded-lg bg-muted p-3">
                        <p className="font-semibold">{book.title}</p>
                        <p className="text-sm text-muted-foreground">
                            By {book.author}
                        </p>
                        <p className="mt-2 text-sm">
                            Available copies: {book.copies}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="borrower-name">
                            User Name
                        </Label>

                        <Input
                            id="borrower-name"
                            value={user?.name || ""}
                            readOnly
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="borrower-email">
                            User Email
                        </Label>

                        <Input
                            id="borrower-email"
                            type="email"
                            value={user?.email || ""}
                            readOnly
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                        disabled={loading}
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={handleBorrowing}
                        disabled={loading || !user || book.copies < 1}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            "Confirm Borrow"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default BorrowBooksButton;
