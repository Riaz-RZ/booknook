
"use client";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { Star, Quote } from "lucide-react";
import { useState } from "react";

const reviews = [
  {
    id: 1,
    name: "Sarah Ahmed",
    role: "Book Lover",
    image: "/images/readers/reader-1.avif",
    rating: 5,
    review:
      "BookNook makes discovering and borrowing books so easy. I love the simple interface and the collection of books available!",
    color: "bg-emerald-50 border-emerald-200",
    accent: "text-emerald-600",
  },
  {
    id: 2,
    name: "Rahim Hasan",
    role: "Regular Reader",
    image: "/images/readers/reader-2.avif",
    rating: 5,
    review:
      "A wonderful platform for people who love reading. The borrowing process is simple, and I can easily keep track of my books.",
    color: "bg-blue-50 border-blue-200",
    accent: "text-blue-600",
  },
  {
    id: 3,
    name: "Nusrat Jahan",
    role: "Student",
    image: "/images/readers/reader-3.avif",
    rating: 4,
    review:
      "I enjoy using BookNook to explore different categories and find interesting books. It makes my reading journey more enjoyable.",
    color: "bg-violet-50 border-violet-200",
    accent: "text-violet-600",
  },
  {
    id: 4,
    name: "Tanvir Hossain",
    role: "University Student",
    image: "/images/readers/reader-4.avif",
    rating: 5,
    review:
      "The platform is easy to navigate. I can explore books and manage my borrowing activities without any hassle.",
    color: "bg-amber-50 border-amber-200",
    accent: "text-amber-600",
  },
  {
    id: 5,
    name: "Ayesha Rahman",
    role: "Avid Reader",
    image: "/images/readers/reader-5.avif",
    rating: 5,
    review:
      "I love how organized everything is. BookNook has made finding my next favorite book much more convenient.",
    color: "bg-rose-50 border-rose-200",
    accent: "text-rose-600",
  },
  {
    id: 6,
    name: "Sabbir Ahmed",
    role: "Book Enthusiast",
    image: "/images/readers/reader-6.avif",
    rating: 4,
    review:
      "A great concept for book lovers! The clean design and straightforward borrowing experience make it enjoyable to use.",
    color: "bg-cyan-50 border-cyan-200",
    accent: "text-cyan-600",
  },
];

const ReaderReviews = () => {
  const [autoplay] = useState(() =>
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  return (
    <section className="bg-linear-to-b from-white via-emerald-50/50 to-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="font-semibold text-emerald-600 text-2xl">
            Reader Testimonials
          </p>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Stories From Our <span className="text-emerald-600">Readers</span>
          </h2>

          <p className="mt-4 leading-7 text-slate-500">
            Every book creates a new experience. See what our readers
            think about their journey with BookNook.
          </p>
        </div>

        {/* Auto Carousel */}
        <Carousel
          plugins={[autoplay]}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-5 py-3">
            {reviews.map((review) => (
              <CarouselItem
                key={review.id}
                className="pl-5 md:basis-1/2 lg:basis-1/3"
              >
                <Card
                  className={`group relative h-full overflow-hidden rounded-3xl border-2 ${review.color} shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}
                >
                  <CardContent className="flex h-full flex-col p-7">

                    {/* Quote and Rating */}
                    <div className="mb-6 flex items-center justify-between">
                      <div className={`rounded-2xl bg-white p-3 ${review.accent}`}>
                        <Quote size={26} />
                      </div>

                      <div className="flex gap-1 rounded-full bg-white px-3 py-2 shadow-sm">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={index}
                            size={15}
                            className={
                              index < review.rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-slate-300"
                            }
                          />
                        ))}
                      </div>
                    </div>

                    {/* Review */}
                    <p className="min-h-32 flex-1 text-[15px] leading-7 text-slate-700">
                      &ldquo;{review.review}&rdquo;
                    </p>

                    {/* Reader Info */}
                    <div className="mt-7 flex items-center gap-4 border-t border-slate-200/80 pt-5">
                      <Avatar className="h-14 w-14 border-2 border-white shadow-md">
                        <AvatarImage
                          src={review.image}
                          alt={review.name}
                        />
                        <AvatarFallback className="bg-white font-bold text-slate-700">
                          {review.name
                            .split(" ")
                            .map((word) => word[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <h3 className="font-bold text-slate-900">
                          {review.name}
                        </h3>
                        <p className={`text-sm font-medium ${review.accent}`}>
                          {review.role}
                        </p>
                      </div>
                    </div>

                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <p className="mt-8 text-center text-sm text-slate-400">
          A community of readers, connected through books.
        </p>
      </div>
    </section>
  );
};

export default ReaderReviews;
