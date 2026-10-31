
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  BookOpen,
  Menu,
  UserRound,
  LogOut,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

import { authClient } from "@/lib/auth-client";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "All Books", href: "/books" },
  { name: "Add Book", href: "/add-book" },
  { name: "My Books", href: "/my-books" },
  { name: "My Borrows", href: "/my-borrows" },
];

export default function Navbar() {
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const visibleNavLinks = user
  ? navLinks
  : navLinks.filter(
      (link) => link.href === "/" || link.href === "/books"
    );

  // Sign Out
  const handleSignout = async () => {
    await authClient.signOut();
    setMobileMenuOpen(false);
  };

  // Active Navigation Link
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  // Navigation Link Styling
  const getLinkClass = (href: string) => {
    return `text-sm font-medium transition-colors ${
      isActive(href)
        ? "text-emerald-700"
        : "text-gray-600 hover:text-emerald-700"
    }`;
  };

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
          {visibleNavLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={getLinkClass(link.href)}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Authentication */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <Popover>
              <PopoverTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                  />
                }
              >
                <Avatar>
                  <AvatarImage
                    src={user.image ?? ""}
                    referrerPolicy="no-referrer"
                  />

                  <AvatarFallback>
                    {user.name?.charAt(0)?.toUpperCase() ?? "U"}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>

              <PopoverContent align="end" className="w-56">
                <PopoverHeader>
                  <PopoverTitle>{user.name}</PopoverTitle>
                </PopoverHeader>

                <div className="mt-3 space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Link href="/profile">
                      <UserRound className="mr-2 h-4 w-4" />
                      My Profile
                    </Link>
                  </Button>

                  <Button
                    onClick={handleSignout}
                    variant="destructive"
                    className="w-full"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <>
              <Button variant="outline">
                <Link href="/login">Login</Link>
              </Button>

              <Button
                className="bg-emerald-700 hover:bg-emerald-800"
              >
                <Link href="/signup">Register</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet
            open={mobileMenuOpen}
            onOpenChange={setMobileMenuOpen}
          >
            <SheetTrigger
              render={
                <Button variant="outline" size="icon" />
              }
            >
              <Menu size={22} />
            </SheetTrigger>

            <SheetContent side="right" className="w-72">
              <div className="mt-8 flex flex-col gap-5">

                {/* Mobile Logo */}
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mb-3 flex items-center gap-2 text-xl font-bold text-emerald-800"
                >
                  <BookOpen size={24} />
                  BookNook
                </Link>

                {/* Mobile Navigation Links */}
                {visibleNavLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={getLinkClass(link.href)}
                  >
                    {link.name}
                  </Link>
                ))}

                {/* Mobile Authentication */}
                <div className="mt-3 flex flex-col gap-3">
                  {user ? (
                    <>
                      {/* User Information */}
                      <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
                        <Avatar>
                          <AvatarImage
                            src={user.image ?? ""}
                            referrerPolicy="no-referrer"
                          />

                          <AvatarFallback>
                            {user.name?.charAt(0)?.toUpperCase() ?? "U"}
                          </AvatarFallback>
                        </Avatar>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">
                            {user.name}
                          </p>

                          <p className="truncate text-xs text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>

                      {/* Profile */}
                      <Button variant="outline">
                        <Link
                          href="/profile"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <UserRound className="mr-2 h-4 w-4" />
                          My Profile
                        </Link>
                      </Button>

                      {/* Sign Out */}
                      <Button
                        variant="destructive"
                        onClick={handleSignout}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline">
                        <Link
                          href="/login"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Login
                        </Link>
                      </Button>

                      <Button
                        className="bg-emerald-700 hover:bg-emerald-800"
                      >
                        <Link
                          href="/signup"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Register
                        </Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </nav>
    </header>
  );
}
