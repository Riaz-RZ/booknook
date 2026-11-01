'use client'
import { Ibook } from "@/lib/types/books";
import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";
import { MouseEvent } from "react";
import { getTokenFromClient } from "@/lib/getTokenFromClient";



const BorrowBooksButton = ({ book }: { book: Ibook }) => {
    const { data: session } = authClient.useSession()
    const user = session?.user

    const handleBorrowing = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        const data = {
            username: user?.name,
            email: user?.email,
            borrowedAt: new Date().toISOString(),
            ...book
        }

        const token = await getTokenFromClient()
        const res = await fetch('http://localhost:8000/borrows', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })

        const borrowedData = await res.json()
        console.log(borrowedData);
    }
    return (
        <div>
            <Button onClick={handleBorrowing}
                size="lg"
                className="w-full"
                disabled={book.copies < 1}
            >
                {book.copies < 1 ? "Book Unavailable" : "Borrow This Book"}
            </Button>
        </div>
    );
};

export default BorrowBooksButton;