
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const AddBookPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { data: session } = authClient.useSession();

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

    if (!imageFile) {
      toast.error("Please upload a book image.");
      return;
    }

    if (!session?.user) {
      toast.error("Please log in before adding a book.");
      return;
    }

    setLoading(true);

    try {
      // Convert image into Base64
      const image = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
          if (typeof reader.result === "string") {
            resolve(reader.result);
          } else {
            reject(new Error("Unable to read image."));
          }
        };

        reader.onerror = () => reject(reader.error);

        reader.readAsDataURL(imageFile);
      });

      const token = await getTokenFromClient();

      if (!token) {
        throw new Error("Authentication token not found.");
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/books`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...formData,
            copies: Number(formData.copies),
            image,
            userName: session.user.name,
            userEmail: session.user.email,
          }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(
          errorData?.message || "Failed to save the book."
        );
      }

      // Show success message
      toast.success("Book added successfully!", {
        description: "Your book is now available in the library.",
      });

      // Redirect to All Books page
      router.push("/books");
      router.refresh();

    } catch (error) {
      console.error("Error adding book:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to add book. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#151F32] px-4 py-12 sm:px-6 lg:px-8">

      {/* Background ambient glow */}
      <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px]" />

      <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-3xl">

        {/* Page Heading */}
        <div className="mb-10 text-center">

          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-500/10 shadow-[0_8px_20px_rgba(16,185,129,0.15)]">
            <BookOpen className="h-8 w-8 text-emerald-400" />
          </div>

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
            Expand Our Collection
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Add a New <span className="text-emerald-400">Book</span>
          </h1>

          <p className="mt-3 text-gray-400">
            Share your favorite books with the BookNook community.
          </p>
        </div>

        {/* 3D Form Card */}
        <Card
          className="
            group relative overflow-hidden
            rounded-2xl
            border border-emerald-400/20
            bg-linear-to-br from-[#263449] via-[#1F2937] to-navy
            p-1
            shadow-[0_25px_60px_rgba(0,0,0,0.55)]
            transition-all duration-500
            hover:-translate-y-2
            hover:border-emerald-400/40
            hover:shadow-[0_35px_80px_rgba(16,185,129,0.15)]
          "
        >
          {/* Card decorative glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl transition-all duration-500 group-hover:bg-emerald-500/20" />

          <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />

          {/* Inner card layer */}
          <CardContent className="relative z-10 rounded-xl border border-white/5 bg-[#172235]/90 p-6 pt-6 shadow-inner sm:p-8">

            <form onSubmit={handleSubmit} className="space-y-7">

              {/* Book Title & Author */}
              <div className="grid gap-5 sm:grid-cols-2">

                <div className="space-y-2">
                  <Label htmlFor="title" className="text-gray-200">
                    Book Title
                  </Label>

                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter book title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="h-11 border-gray-700 bg-navy text-white placeholder:text-gray-500 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="author" className="text-gray-200">
                    Author Name
                  </Label>

                  <Input
                    id="author"
                    name="author"
                    placeholder="Enter author name"
                    value={formData.author}
                    onChange={handleChange}
                    required
                    className="h-11 border-gray-700 bg-navy text-white placeholder:text-gray-500 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                  />
                </div>

              </div>

              {/* Category & Number of Copies */}
              <div className="grid gap-5 sm:grid-cols-2">

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-gray-200">
                    Category
                  </Label>

                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        category: value ?? "",
                      }))
                    }
                    required
                  >
                    <SelectTrigger
                      id="category"
                      className="h-11 w-full border-gray-700 bg-navy text-white"
                    >
                      <SelectValue placeholder="Select book category" />
                    </SelectTrigger>

                    <SelectContent className="border-gray-700 bg-navy-card text-white">
                      <SelectItem value="Fiction">Fiction</SelectItem>
                      <SelectItem value="Science">Science</SelectItem>
                      <SelectItem value="History">History</SelectItem>
                      <SelectItem value="Kids">Kids</SelectItem>
                      <SelectItem value="Others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="copies" className="text-gray-200">
                    Number of Copies
                  </Label>

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
                    className="h-11 border-gray-700 bg-navy text-white placeholder:text-gray-500 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                  />
                </div>

              </div>

              {/* Book Image */}
              <div className="space-y-2">
                <Label htmlFor="bookImage" className="text-gray-200">
                  Book Image
                </Label>

                <label
                  htmlFor="bookImage"
                  className="
                    flex cursor-pointer flex-col items-center justify-center
                    rounded-xl border-2 border-dashed border-gray-600
                    bg-navy/70 p-8 text-center
                    transition-all duration-300
                    hover:border-emerald-500
                    hover:bg-emerald-500/5
                  "
                >
                  <ImagePlus className="mb-3 h-10 w-10 text-emerald-400" />

                  <span className="font-medium text-gray-200">
                    {imageFile
                      ? imageFile.name
                      : "Click to upload book cover"}
                  </span>

                  <span className="mt-2 text-sm text-gray-500">
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
                <Label htmlFor="description" className="text-gray-200">
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
                  className="resize-none border-gray-700 bg-navy text-white placeholder:text-gray-500 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                />
              </div>

              {/* User Information */}
              <div className="grid gap-5 rounded-xl border border-gray-700 bg-navy/70 p-5 sm:grid-cols-2">

                <div className="space-y-2">
                  <Label htmlFor="userName" className="text-gray-300">
                    User Name
                  </Label>

                  <Input
                    id="userName"
                    name="userName"
                    value={session?.user.name ?? ""}
                    readOnly
                    placeholder="Not available yet"
                    className="border-gray-700 bg-navy-card text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="userEmail" className="text-gray-300">
                    Email Address
                  </Label>

                  <Input
                    id="userEmail"
                    name="userEmail"
                    type="email"
                    value={session?.user.email ?? ""}
                    readOnly
                    placeholder="Not available yet"
                    className="border-gray-700 bg-navy-card text-gray-400"
                  />
                </div>

              </div>

              {/* 3D Submit Button */}
              <Button
                type="submit"
                disabled={loading || !session?.user}
                size="lg"
                className="
                cursor-pointer
                  h-12 w-full
                  bg-emerald-primary
                  text-base font-semibold text-navy
                  shadow-[0_5px_0_#047857,0_8px_20px_rgba(16,185,129,0.2)]
                  transition-all duration-200
                  hover:-translate-y-0.5
                  hover:bg-[#34D399]
                  hover:shadow-[0_7px_0_#047857,0_12px_25px_rgba(16,185,129,0.25)]
                  active:translate-y-1
                  active:shadow-none
                  disabled:cursor-not-allowed disabled:opacity-60
                "
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Adding Book...
                  </>
                ) : (
                  <>
                    <BookOpen className="mr-2 h-5 w-5" />
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
