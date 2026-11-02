
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

export default function LogInPage() {
    const router = useRouter();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    async function handleEmailLogin(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setConfirmPasswordError("");
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);

        const email = String(formData.get("email")).trim();
        const password = String(formData.get("password"));

        // Confirm password validation
        if (password !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match.");
            toast.error("Password Mismatch", {
                description: "Please enter the same password in both fields.",
            });
            setIsSubmitting(false);
            return;
        }

        try {
            const { error } = await authClient.signIn.email({
                email,
                password,
            });

            if (error) {
                toast.error("Login Failed", {
                    description: error.message || "Invalid email or password.",
                });
                return;
            }

            toast.success("Login Successful!", {
                description: "Welcome back to BookNook.",
            });

            router.push("/");
            router.refresh();

        } catch {
            toast.error("Something went wrong", {
                description: "Please try again later.",
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleGoogleSignIn = async () => {
        setIsGoogleLoading(true);

        try {
            const { error } = await authClient.signIn.social({
                provider: "google",
            });

            if (error) {
                toast.error("Google Sign-in Failed", {
                    description: error.message || "Unable to sign in with Google.",
                });
                setIsGoogleLoading(false);
            }
        } catch {
            toast.error("Something went wrong", {
                description: "Please try Google sign-in again.",
            });
            setIsGoogleLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen w-full items-center justify-center bg-[#151F32] px-4 py-12">

            <Card className="mx-auto w-full max-w-md border-gray-700 bg-navy-card shadow-2xl shadow-black/20">

                <CardHeader className="space-y-2 text-center">

                    {/* Logo */}
                    <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                        <span className="text-2xl">📚</span>
                    </div>

                    <CardTitle className="text-2xl font-bold text-white sm:text-3xl">
                        Welcome Back!
                    </CardTitle>

                    <CardDescription className="text-gray-400">
                        Sign in to your BookNook account and continue your reading journey.
                    </CardDescription>

                </CardHeader>

                <CardContent>

                    <form noValidate onSubmit={handleEmailLogin}>

                        <FieldGroup className="gap-5">

                            {/* Email */}
                            <Field>
                                <FieldLabel htmlFor="email" className="text-gray-200">
                                    Email Address
                                </FieldLabel>

                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="m@example.com"
                                    required
                                    className="border-gray-600 bg-navy text-white placeholder:text-gray-500 focus-visible:border-emerald-500"
                                />
                            </Field>

                            {/* Password */}
                            <Field>
                                <FieldLabel htmlFor="password" className="text-gray-200">
                                    Password
                                </FieldLabel>

                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Enter your password"
                                        required
                                        className="border-gray-600 bg-navy pr-10 text-white placeholder:text-gray-500 focus-visible:border-emerald-500"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-emerald-400"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                            </Field>

                            {/* Confirm Password */}
                            <Field>
                                <FieldLabel htmlFor="confirmPassword" className="text-gray-200">
                                    Re-enter Password
                                </FieldLabel>

                                <div className="relative">
                                    <Input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        placeholder="Confirm your password"
                                        value={confirmPassword}
                                        aria-invalid={Boolean(confirmPasswordError)}
                                        onChange={(event) => {
                                            const nextConfirmPassword = event.target.value;
                                            setConfirmPassword(nextConfirmPassword);

                                            const passwordInput =
                                                event.currentTarget.form?.elements.namedItem("password") as HTMLInputElement | null;

                                            if (nextConfirmPassword === passwordInput?.value) {
                                                setConfirmPasswordError("");
                                            }
                                        }}
                                        required
                                        className="border-gray-600 bg-navy pr-10 text-white placeholder:text-gray-500 focus-visible:border-emerald-500"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-emerald-400"
                                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>

                                {confirmPasswordError && (
                                    <p role="alert" className="text-sm text-red-400">
                                        {confirmPasswordError}
                                    </p>
                                )}
                            </Field>

                            {/* Login and Google Buttons */}
                            <FieldGroup className="gap-3">

                                <Field>
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting || isGoogleLoading}
                                        className="h-10 w-full cursor-pointer bg-emerald-primary font-semibold text-navy hover:bg-emerald-hover disabled:opacity-60"
                                    >
                                        {isSubmitting ? "Logging in..." : "Log In"}
                                    </Button>

                                    {/* Divider */}
                                    <div className="relative my-2">
                                        <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t border-gray-700" />
                                        </div>

                                        <div className="relative flex justify-center text-xs uppercase">
                                            <span className="bg-navy-card px-3 text-gray-500">
                                                Or continue with
                                            </span>
                                        </div>
                                    </div>

                                    {/* Google Sign In */}
                                    <Button
                                        onClick={handleGoogleSignIn}
                                        variant="outline"
                                        type="button"
                                        disabled={isGoogleLoading || isSubmitting}
                                        className="h-10 w-full cursor-pointer gap-3 border-gray-600 bg-white text-gray-800 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-60"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            className="h-5 w-5"
                                        >
                                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.15v2.84A11 11 0 0 0 12 23z" />
                                            <path fill="#FBBC05" d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.43.34-2.1V7.06H2.15A11 11 0 0 0 1 12c0 1.78.43 3.46 1.15 4.94l3.69-2.84z" />
                                            <path fill="#EA4335" d="M12 5.36c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1a11 11 0 0 0-9.85 6.06L5.84 9.9C6.71 7.29 9.14 5.36 12 5.36z" />
                                        </svg>

                                        {isGoogleLoading ? "Connecting..." : "Sign in with Google"}
                                    </Button>

                                    {/* Register Link */}
                                    <FieldDescription className="pt-3 text-center text-gray-400">
                                        Don&apos;t have an account?{" "}
                                        <Link
                                            href="/signup"
                                            className="font-semibold text-emerald-400 transition hover:text-emerald-300"
                                        >
                                            Register
                                        </Link>
                                    </FieldDescription>

                                </Field>
                            </FieldGroup>

                        </FieldGroup>
                    </form>

                </CardContent>
            </Card>
        </main>
    );
}
