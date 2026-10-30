
"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
    BookOpen,
    ImagePlus,
    Loader2,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const AddBookPage = () => {
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        category: "",
        copies: "",
        description: "",
        userName: "",
        userEmail: "",
    });

    // Handle text and number inputs
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await fetch('http://localhost:8000/books', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(formData)
        })
        const data = await res.json()
        console.log(data);

        if (!imageFile) {
            toast.error("Please upload a book image.");
            return;
        }

        setLoading(true);

        try {
            // TODO: Upload image to imgbb and save book to MongoDB.

            toast.success("Book added successfully!");

            // Reset form
            setFormData({
                title: "",
                author: "",
                category: "",
                copies: "",
                description: "",
                userName: "",
                userEmail: "",
            });

            setImageFile(null);

            const fileInput = document.getElementById(
                "bookImage"
            ) as HTMLInputElement;

            if (fileInput) {
                fileInput.value = "";
            }
        } catch (error) {
            console.error("Error adding book:", error);
            toast.error("Failed to add book. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-screen bg-muted/30 px-4 py-10">
            <div className="mx-auto max-w-3xl">

                {/* Page Heading */}
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                        <BookOpen className="h-7 w-7 text-primary" />
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight">
                        Add a New Book
                    </h1>

                    <p className="mt-2 text-muted-foreground">
                        Share your favorite books with the BookNook community.
                    </p>
                </div>

                {/* Form Card */}
                <Card className="border-border/60 shadow-sm">
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Book Title & Author */}
                            <div className="grid gap-5 sm:grid-cols-2">

                                <div className="space-y-2">
                                    <Label htmlFor="title">Book Title</Label>

                                    <Input
                                        id="title"
                                        name="title"
                                        placeholder="Enter book title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="author">Author Name</Label>

                                    <Input
                                        id="author"
                                        name="author"
                                        placeholder="Enter author name"
                                        value={formData.author}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                            </div>

                            {/* Category & Number of Copies */}
                            <div className="grid gap-5 sm:grid-cols-2">

                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>

                                    <Select
                                        value={formData.category}
                                        onValueChange={(value) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                category: value,
                                            }))
                                        }
                                        required
                                    >
                                        <SelectTrigger id="category" className="w-full">
                                            <SelectValue placeholder="Select book category" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectItem value="Fiction">Fiction</SelectItem>
                                            <SelectItem value="Science">Science</SelectItem>
                                            <SelectItem value="History">History</SelectItem>
                                            <SelectItem value="Kids">Kids</SelectItem>
                                            <SelectItem value="Others">Others</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="copies">Number of Copies</Label>

                                    <Input
                                        id="copies"
                                        name="copies"
                                        type="number"
                                        min="1"
                                        step="1"
                                        placeholder="Enter number of copies"
                                        value={formData.copies}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                            </div>

                            {/* Book Image */}
                            <div className="space-y-2">
                                <Label htmlFor="bookImage">Book Image</Label>

                                <label
                                    htmlFor="bookImage"
                                    className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-8 text-center transition hover:border-primary hover:bg-primary/5"
                                >
                                    <ImagePlus className="mb-3 h-9 w-9 text-muted-foreground" />

                                    <span className="font-medium">
                                        {imageFile
                                            ? imageFile.name
                                            : "Click to upload book cover"}
                                    </span>

                                    <span className="mt-1 text-sm text-muted-foreground">
                                        PNG, JPG or WEBP
                                    </span>
                                </label>

                                <Input
                                    id="bookImage"
                                    type="file"
                                    accept="image/png,image/jpeg,image/webp"
                                    className="hidden"
                                    onChange={(e) =>
                                        setImageFile(e.target.files?.[0] ?? null)
                                    }
                                />
                            </div>

                            {/* Short Description */}
                            <div className="space-y-2">
                                <Label htmlFor="description">
                                    Short Description
                                </Label>

                                <Textarea
                                    id="description"
                                    name="description"
                                    placeholder="Write a short description about this book..."
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={4}
                                    required
                                />
                            </div>

                            {/* User Information */}
                            <div className="grid gap-5 rounded-lg border bg-muted/40 p-4 sm:grid-cols-2">

                                <div className="space-y-2">
                                    <Label htmlFor="userName">User Name</Label>

                                    <Input
                                        id="userName"
                                        name="userName"
                                        value={formData.userName}
                                        readOnly
                                        placeholder="Not available yet"
                                        className="bg-background"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="userEmail">Email Address</Label>

                                    <Input
                                        id="userEmail"
                                        name="userEmail"
                                        type="email"
                                        value={formData.userEmail}
                                        readOnly
                                        placeholder="Not available yet"
                                        className="bg-background"
                                    />
                                </div>

                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="w-full"
                                size="lg"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Adding Book...
                                    </>
                                ) : (
                                    <>
                                        <BookOpen className="mr-2 h-4 w-4" />
                                        Add Book
                                    </>
                                )}
                            </Button>

                        </form>
                    </CardContent>
                </Card>

            </div>
        </section>
    );
};

export default AddBookPage;
