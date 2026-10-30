import { Ibook } from "@/lib/types/books";


const allBooksPage = async () => {
    const res = await fetch('http://localhost:8000/books')
    const booksData: Ibook[] = await res.json()
    console.log(booksData);

    return (
        <div>
            {booksData.map((books) => (
                <h1 key={books._id}>
                    {books.image}
                </h1>
            ))}
        </div>
    );
};

export default allBooksPage;