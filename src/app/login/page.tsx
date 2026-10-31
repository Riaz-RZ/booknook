 "use client"

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

    return (
        <div >
            <Card className="max-w-120 mx-auto my-4">
                <CardHeader>
                    <CardTitle>Log In</CardTitle>
                    <CardDescription>
                        Enter your information below to login your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form noValidate onSubmit={handleEmailLogin}>
                        <FieldGroup>

                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="confirmPassword">Re-enter Password</FieldLabel>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    aria-invalid={Boolean(confirmPasswordError)}
                                    onChange={(event) => {
                                        const nextConfirmPassword = event.target.value
                                        setConfirmPassword(nextConfirmPassword)
                                        const passwordInput = event.currentTarget.form?.elements.namedItem("password") as HTMLInputElement | null
                                        if (confirmPasswordError && nextConfirmPassword === passwordInput?.value) {
                                            setConfirmPasswordError("")
                                        }
                                    }}
                                    required />
                                {confirmPasswordError && (
                                    <p role="alert" className="text-sm text-destructive">
                                        {confirmPasswordError}
                                    </p>
                                )}
                            </Field>
                            {formError && (
                                <p role="alert" className="text-sm text-destructive">
                                    {formError}
                                </p>
                            )}
                            <FieldGroup>
                                <Field>
                                    <Button type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? "Logging in..." : "Log In"}
                                    </Button>
                                    <Button variant="outline" type="button">
                                        login with Google
                                    </Button>
                                    <FieldDescription className="px-6 text-center">
                                        Don&apos;t have an account? <a href="/signup">Register</a>
                                    </FieldDescription>
                                </Field>
                            </FieldGroup>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
