
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

export default function LogInPage() {
    const router = useRouter()
    const [formError, setFormError] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")

    async function handleEmailLogin(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setFormError("")
        setIsSubmitting(true)

        const formData = new FormData(e.currentTarget)
        const password = String(formData.get("password"))

        if (password !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match.")
            setIsSubmitting(false)
            return
        }

        setConfirmPasswordError("")

        const { error } = await authClient.signIn.email({
            email: String(formData.get("email")),
            password,
        })

        if (error) {
            setFormError(error.message ?? "Unable to log in.")
            setIsSubmitting(false)
            return
        }

        router.push("/")
        router.refresh()
    }

    const handleGoogleSignIn = async () => {
         await authClient.signIn.social({
            provider: "google",
        });
    }

    return (
        <main className="flex min-h-screen w-full items-center justify-center bg-[#151F32] px-4 py-12">

            <Card className="mx-auto w-full max-w-lg border-gray-700 bg-navy-card shadow-xl">

                <CardHeader className="space-y-2 text-center">
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

                            <Field>
                                <FieldLabel htmlFor="password" className="text-gray-200">
                                    Password
                                </FieldLabel>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    required
                                    className="border-gray-600 bg-navy text-white placeholder:text-gray-500 focus-visible:border-emerald-500"
                                />
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="confirmPassword" className="text-gray-200">
                                    Re-enter Password
                                </FieldLabel>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    aria-invalid={Boolean(confirmPasswordError)}
                                    onChange={(event) => {
                                        const nextConfirmPassword = event.target.value
                                        setConfirmPassword(nextConfirmPassword)

                                        const passwordInput =
                                            event.currentTarget.form?.elements.namedItem("password") as HTMLInputElement | null

                                        if (
                                            confirmPasswordError &&
                                            nextConfirmPassword === passwordInput?.value
                                        ) {
                                            setConfirmPasswordError("")
                                        }
                                    }}
                                    required
                                    className="border-gray-600 bg-navy text-white placeholder:text-gray-500 focus-visible:border-emerald-500"
                                />

                                {confirmPasswordError && (
                                    <p role="alert" className="text-sm text-red-400">
                                        {confirmPasswordError}
                                    </p>
                                )}
                            </Field>

                            {formError && (
                                <p
                                    role="alert"
                                    className="rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400"
                                >
                                    {formError}
                                </p>
                            )}

                            <FieldGroup className="gap-3">
                                <Field>
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="cursor-pointer w-full bg-emerald-primary font-semibold text-navy hover:bg-emerald-hover disabled:opacity-60"
                                    >
                                        {isSubmitting ? "Logging in..." : "Log In"}
                                    </Button>

                                    <Button
                                        onClick={handleGoogleSignIn}
                                        variant="outline"
                                        type="button"
                                        className="cursor-pointer w-full gap-3 border-gray-600 bg-white text-gray-800 hover:bg-gray-100 hover:text-gray-900"
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
                                        Sign in with Google
                                    </Button>

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
    )
}
