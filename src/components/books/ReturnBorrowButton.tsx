
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface ReturnBookButtonProps {
    borrowId: string;
}

const ReturnBookButton = ({ borrowId }: ReturnBookButtonProps) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleReturn = async () => {
        try {
            setLoading(true);

            const token = await getTokenFromClient();

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/borrows/${borrowId}`,
                {
                    method: "DELETE",
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );

            const result = await res.json();

            if (!res.ok) {
                throw new Error(
                    result.message || "Failed to return book."
                );
            }

            toast.success("Book returned successfully!");

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
        <Button
        className="cursor-pointer"
            size="sm"
            variant="outline"
            onClick={handleReturn}
            disabled={loading}
        >
            {loading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Returning...
                </>
            ) : (
                "Return Book"
            )}
        </Button>
    );
};

export default ReturnBookButton;
