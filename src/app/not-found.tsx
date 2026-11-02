
import Link from "next/link";
import { BookOpen, Home, SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080d19] px-4 py-16">

      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-xl text-center">

        <div className="mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-3xl border border-emerald-400/20 bg-emerald-400/10 shadow-xl shadow-emerald-950/30">
          <SearchX className="h-12 w-12 text-emerald-400" />
        </div>

        <p className="text-8xl font-extrabold tracking-tight text-emerald-400 sm:text-9xl">
          404
        </p>

        <h1 className="mt-5 text-3xl font-bold text-white sm:text-4xl">
          Page Not Found
        </h1>

        <p className="mx-auto mt-4 max-w-md leading-7 text-slate-400">
          Oops! The page you are looking for doesn&apos;t exist or may have
          been moved. Let&apos;s get you back to the BookNook library.
        </p>

        <Button
          className="mt-8 h-12 rounded-xl bg-emerald-500 px-7 font-semibold text-[#08131a] shadow-lg shadow-emerald-950/30 transition-all hover:-translate-y-1 hover:bg-emerald-400"
        >
          <Link href="/">
            <Home className="mr-2 h-5 w-5" />
            Back to Home
          </Link>
        </Button>

        <div className="mt-12 flex items-center justify-center gap-2 text-sm text-slate-500">
          <BookOpen className="h-4 w-4 text-emerald-400" />
          BookNook — Your Online Library
        </div>

      </div>
    </section>
  );
};

export default NotFound;
