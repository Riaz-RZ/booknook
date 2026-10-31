import { Suspense } from "react";

import Banner from "@/components/home/Banner";
import HowBorrowingWorks from "@/components/home/HowBorrowingWorks";
import ReaderReviews from "@/components/home/ReaderReviews";
import NewArrivals from "@/components/home/NewArrivals";


export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto min-h-105 max-w-7xl px-4 pt-6 md:min-h-130 lg:px-8" />
      }
    >
      <Banner />
      <NewArrivals />
      <HowBorrowingWorks/>
      <ReaderReviews/>
    </Suspense>
  );
}
