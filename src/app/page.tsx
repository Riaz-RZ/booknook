import { Suspense } from "react";

import Banner from "@/components/home/Banner";
import HowBorrowingWorks from "@/components/home/HowBorrowingWorks";


export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto min-h-105 max-w-7xl px-4 pt-6 md:min-h-130 lg:px-8" />
      }
    >
      <Banner />
      <HowBorrowingWorks/>
    </Suspense>
  );
}
