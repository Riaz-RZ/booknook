
"use client";

import Link from "next/link";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  EffectFade,
} from "swiper/modules";

import { ArrowRight } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    subtitle: "WELCOME TO BOOKNOOK",
    title: "Your Next Favorite Book Is Waiting",
    description:
      "Explore a world of knowledge, imagination, and inspiration. Discover books that make every reading moment special.",
    image: "/images/banner/reading-books.webp",
  },
  {
    subtitle: "EXPLORE & DISCOVER",
    title: "Every Book Opens a New World",
    description:
      "From timeless classics to modern masterpieces, find your next great read in our growing digital library.",
    image: "/images/banner/library.webp",
  },
  {
    subtitle: "READ MORE, GROW MORE",
    title: "Make Reading Part of Your Journey",
    description:
      "Borrow your favorite books, manage your reading collection, and turn every page into a new adventure.",
    image: "/images/banner/kozy-reading.webp",
  },
];

export default function Banner() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-8">
      <Swiper
        modules={[
          Autoplay,
          Pagination,
          EffectFade,
        ]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        speed={900}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true }}
        className="booknook-slider overflow-hidden rounded-2xl"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.title}>
            <div className="relative flex min-h-105 items-center overflow-hidden md:min-h-130">

              {/* Background Image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-cover"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/55" />

              {/* Content */}
              <div className="relative z-10 max-w-3xl px-8 py-16 text-white md:px-16">

                <span className="mb-5 inline-block rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold tracking-widest backdrop-blur-sm">
                  {slide.subtitle}
                </span>

                <h1 className="mb-5 text-3xl font-bold leading-tight md:text-5xl lg:text-6xl">
                  {slide.title}
                </h1>

                <p className="mb-8 max-w-xl text-sm leading-7 text-white/90 md:text-base">
                  {slide.description}
                </p>

                {/* Browse Books Button */}
                <Link
                  href="/books"
                  className="inline-flex items-center gap-3 rounded-lg bg-white px-6 py-3 font-semibold text-emerald-800 shadow-lg transition-all hover:-translate-y-1 hover:bg-emerald-50"
                >
                  Browse Books
                  <ArrowRight size={18} />
                </Link>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
