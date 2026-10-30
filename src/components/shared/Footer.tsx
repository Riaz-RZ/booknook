import Link from "next/link";
import {
  BookOpen,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">

        {/* Logo and Description */}
        <div>
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-2 text-2xl font-bold text-white"
          >
            <BookOpen className="h-7 w-7 text-emerald-400" />
            BookNook
          </Link>

          <p className="max-w-xs text-sm leading-7 text-slate-400">
            Your little corner of knowledge. Discover, borrow, and enjoy
            your favorite books with BookNook.
          </p>
        </div>

        {/* Contact Information */}
        <div className="md:justify-self-center">
          <h3 className="mb-5 text-lg font-semibold text-white">
            Contact Us
          </h3>

          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <Mail className="h-5 w-5 shrink-0 text-emerald-400" />
              <a
                href="mailto:hello@booknook.com"
                className="transition hover:text-emerald-400"
              >
                hello@booknook.com
              </a>
            </li>

            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 shrink-0 text-emerald-400" />
              <a
                href="tel:+8801234567890"
                className="transition hover:text-emerald-400"
              >
                +880 1234-567890
              </a>
            </li>

            <li className="flex items-center gap-3">
              <MapPin className="h-5 w-5 shrink-0 text-emerald-400" />
              <span>Dhaka, Bangladesh</span>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="md:justify-self-end">
          <h3 className="mb-5 text-lg font-semibold text-white">
            Follow Us
          </h3>

          <p className="mb-4 text-sm text-slate-400">
            Stay connected with BookNook.
          </p>

          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex size-10 items-center justify-center rounded-full border border-slate-700 bg-slate-800 transition hover:border-emerald-500 hover:bg-emerald-600 hover:text-white"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 fill-current">
                <path d="M14 8.5h3V5h-3c-3.3 0-5.5 2.2-5.5 5.5V13H5v3h3.5v6h4v-6h3.2l.6-3h-3.8v-2.5c0-1.5.6-2.5 1.5-2.5Z" />
              </svg>
            </a>

            <a
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="flex size-10 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-sm font-bold transition hover:border-emerald-500 hover:bg-emerald-600 hover:text-white"
            >
              𝕏
            </a>

            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="flex size-10 items-center justify-center rounded-full border border-slate-700 bg-slate-800 transition hover:border-emerald-500 hover:bg-emerald-600 hover:text-white"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 fill-current">
                <path d="M23 12s0-3.4-.4-4.9a2.8 2.8 0 0 0-2-2C18.6 4.5 12 4.5 12 4.5s-6.6 0-8.6.6a2.8 2.8 0 0 0-2 2C1 8.6 1 12 1 12s0 3.4.4 4.9a2.8 2.8 0 0 0 2 2c2 .6 8.6.6 8.6.6s6.6 0 8.6-.6a2.8 2.8 0 0 0 2-2C23 15.4 23 12 23 12Zm-13 4.1V7.9l6.3 4.1-6.3 4.1Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-5 text-center text-sm text-slate-500 sm:px-6 lg:px-8">
          © 2026 BookNook. All rights reserved.
          <span className="mx-2">|</span>
          Made with ❤️ for book lovers.
        </div>
      </div>
    </footer>
  );
};

export default Footer;