'use client'
import { Ibook } from "@/lib/types/books";
import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";



const BorrowBooksButton = ({ book }: { book: Ibook }) => {
    const { data: session } = authClient.useSession()
    const user = session?.user

    const handleBorrowing = async (e) => {
        e.preventDefault()

        const data = {
            username: user?.name,
            email: user?.email,
            ...book
        }
        const res = await fetch('http://localhost:8000/borrows', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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