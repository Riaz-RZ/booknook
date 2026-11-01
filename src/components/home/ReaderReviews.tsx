
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
  },
  {
    id: 2,
    name: "Rahim Hasan",
    role: "Regular Reader",
    image: "/images/readers/reader-2.avif",
    rating: 5,
    review:
      "A wonderful platform for people who love reading. The borrowing process is simple, and I can easily keep track of my books.",
  },
  {
    id: 3,
    name: "Nusrat Jahan",
    role: "Student",
    image: "/images/readers/reader-3.avif",
    rating: 4,
    review:
      "I enjoy using BookNook to explore different categories and find interesting books. It makes my reading journey more enjoyable.",
  },
  {
    id: 4,
    name: "Tanvir Hossain",
    role: "University Student",
    image: "/images/readers/reader-4.avif",
    rating: 5,
    review:
      "The platform is easy to navigate. I can explore books and manage my borrowing activities without any hassle.",
  },
  {
    id: 5,
    name: "Ayesha Rahman",
    role: "Avid Reader",
    image: "/images/readers/reader-5.avif",
    rating: 5,
    review:
      "I love how organized everything is. BookNook has made finding my next favorite book much more convenient.",
  },
  {
    id: 6,
    name: "Sabbir Ahmed",
    role: "Book Enthusiast",
    image: "/images/readers/reader-6.avif",
    rating: 4,
    review:
      "A great concept for book lovers! The clean design and straightforward borrowing experience make it enjoyable to use.",
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
    <section className="w-full bg-[#151F32] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="text-2xl font-semibold text-emerald-400">
            Reader Testimonials
          </p>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Stories From Our{" "}
            <span className="text-emerald-400">Readers</span>
          </h2>

          <p className="mt-4 leading-7 text-gray-400">
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
                <Card className="group relative h-full overflow-hidden rounded-3xl border border-gray-700 bg-navy-card shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-emerald-500/60 hover:shadow-xl hover:shadow-emerald-500/5">
                  <CardContent className="flex h-full flex-col p-7">

                    {/* Quote and Rating */}
                    <div className="mb-6 flex items-center justify-between">
                      <div className="rounded-2xl bg-emerald-500/10 p-3 text-emerald-400 transition-colors group-hover:bg-emerald-500 group-hover:text-navy">
                        <Quote size={26} />
                      </div>

                      <div className="flex gap-1 rounded-full border border-gray-700 bg-navy px-3 py-2">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={index}
                            size={15}
                            className={
                              index < review.rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-gray-600"
                            }
                          />
                        ))}
                      </div>
                    </div>

                    {/* Review */}
                    <p className="min-h-32 flex-1 text-[15px] leading-7 text-gray-300">
                      &ldquo;{review.review}&rdquo;
                    </p>

                    {/* Reader Info */}
                    <div className="mt-7 flex items-center gap-4 border-t border-gray-700 pt-5">
                      <Avatar className="h-14 w-14 border-2 border-gray-600 shadow-md">
                        <AvatarImage
                          src={review.image}
                          alt={review.name}
                        />
                        <AvatarFallback className="bg-navy font-bold text-emerald-400">
                          {review.name
                            .split(" ")
                            .map((word) => word[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <h3 className="font-bold text-white">
                          {review.name}
                        </h3>
                        <p className="text-sm font-medium text-emerald-400">
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

        <p className="mt-8 text-center text-sm text-gray-500">
          A community of readers, connected through books.
        </p>
      </div>
    </section>
  );
};

export default ReaderReviews;
