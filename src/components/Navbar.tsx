
"use client";

import Link from "next/link";
import { BookOpen, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "All Books", href: "/books" },
  { name: "Add Book", href: "/books/add" },
  { name: "My Books", href: "/my-books" },
  { name: "My Borrows", href: "/my-borrows" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="rounded-lg bg-emerald-700 p-2 text-white">
            <BookOpen size={23} />
          </div>
          <span className="text-xl font-bold text-emerald-800">
            BookNook
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-emerald-700"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Authentication Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="outline">
            <Link href="/login">Login</Link>
          </Button>

          <Button
            className="bg-emerald-700 hover:bg-emerald-800"
          >
            <Link href="/register">Register</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <Button variant="outline" size="icon">
                <Menu size={22} />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-72">
              <div className="mt-8 flex flex-col gap-5">

                <Link
                  href="/"
                  className="mb-3 flex items-center gap-2 text-xl font-bold text-emerald-800"
                >
                  <BookOpen size={24} />
                  BookNook
                </Link>

                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-sm font-medium text-gray-700 hover:text-emerald-700"
                  >
                    {link.name}
                  </Link>
                ))}

                <div className="mt-3 flex flex-col gap-3">
                  <Button variant="outline">
                    <Link href="/login">Login</Link>
                  </Button>

                  <Button

                    className="bg-emerald-700 hover:bg-emerald-800"
                  >
                    <Link href="/register">Register</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </nav>
    </header>
  );
}
