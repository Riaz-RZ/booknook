
"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  UserRound,
  Mail,
  Image as ImageIcon,
  LockKeyhole,
  Loader2,
  BookOpen,
} from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";


// Password validation
const validatePassword = (password: string) => {
  if (password.length < 6) {
    return "Password must be at least 6 characters long.";
  }

  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }

  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter.";
  }

  return "";
};

const SignUpPage = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Email registration
  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationError = validatePassword(password);

    if (validationError) {
      setPasswordError(validationError);
      toast.error(validationError);
      return;
    }

    setPasswordError("");
    setIsSubmitting(true);

    try {
      const { error } = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
        image: image.trim(),
      });

      if (error) {
        toast.error(error.message || "Registration failed.");
        return;
      }

      toast.success("Account created successfully!");

      await authClient.signOut();

      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Google registration
  const handleGoogleSignUp = async () => {
    setIsGoogleLoading(true);

    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Google registration failed.");
        setIsGoogleLoading(false);
      }
    } catch (error) {
      console.error("Google registration error:", error);
      toast.error("Unable to register with Google.");
      setIsGoogleLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy px-4 py-4">

      {/* Background ambient glow */}
      <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]" />

      {/* Register Card */}
      <Card
        className="
          group relative w-full max-w-md
          overflow-hidden rounded-2xl
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
        <div className="relative z-10 rounded-xl border border-white/5 bg-[#172235]/90 p-6 shadow-inner sm:p-8">

          {/* Logo and heading */}
          <div className="mb-7 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-500/10 shadow-[0_8px_20px_rgba(16,185,129,0.15)]">
              <BookOpen className="h-7 w-7 text-emerald-400" />
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-white">
              Create Account
            </h1>

            <p className="mt-2 text-sm text-gray-400">
              Join BookNook and discover your next favorite book.
            </p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSignUp} className="space-y-5">

            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-300">
                Full Name
              </Label>

              <div className="relative">
                <UserRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-400" />

                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-11 border-gray-700 bg-navy pl-10 text-white placeholder:text-gray-500 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">
                Email Address
              </Label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-400" />

                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11 border-gray-700 bg-navy pl-10 text-white placeholder:text-gray-500 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                />
              </div>
            </div>

            {/* Profile Image */}
            <div className="space-y-2">
              <Label htmlFor="image" className="text-gray-300">
                Profile Image URL
              </Label>

              <div className="relative">
                <ImageIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-400" />

                <Input
                  id="image"
                  type="url"
                  placeholder="Enter your profile image URL"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  required
                  className="h-11 border-gray-700 bg-navy pl-10 text-white placeholder:text-gray-500 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">
                Password
              </Label>

              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-400" />

                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError("");
                  }}
                  required
                  className="h-11 border-gray-700 bg-navy pl-10 pr-11 text-white placeholder:text-gray-500 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-emerald-400"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {passwordError && (
                <p className="text-xs text-red-400">{passwordError}</p>
              )}

              <p className="text-xs text-gray-500">
                At least 6 characters, including uppercase and lowercase letters.
              </p>
            </div>

            {/* Register Button */}
            <Button
              type="submit"
              disabled={isSubmitting || isGoogleLoading}
              className="
              cursor-pointer
                h-11 w-full
                bg-emerald-primary
                font-semibold text-navy
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
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-700" />
            <span className="text-xs text-gray-500">OR CONTINUE WITH</span>
            <div className="h-px flex-1 bg-gray-700" />
          </div>

          {/* Google Registration */}
          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleSignUp}
            disabled={isGoogleLoading || isSubmitting}
            className="
            cursor-pointer
              h-11 w-full
              border-gray-700 bg-navy
              text-gray-200
              transition-all duration-300
              hover:-translate-y-0.5
              hover:border-emerald-500/50
              hover:bg-[#263449]
              hover:shadow-lg hover:shadow-emerald-500/5
            "
          >
            {isGoogleLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <svg
                className="mr-2 h-5 w-5"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  transform="translate(0 4)"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.74 7.18l7.73 6c4.51-4.17 7.05-10.33 7.05-17.65z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a24 24 0 0 0 0 21.56l7.98-6.19z"
                  transform="translate(0 4)"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.89 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  transform="translate(0 -4)"
                />
              </svg>
            )}

            {isGoogleLoading ? "Connecting..." : "Continue with Google"}
          </Button>

          {/* Login Link */}
          <p className="mt-7 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-emerald-400 transition-colors hover:text-emerald-300 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </Card>
    </main>
  );
};

export default SignUpPage;
