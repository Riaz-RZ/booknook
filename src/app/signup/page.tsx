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

function validatePassword(password: string) {
    if (password.length < 6) {
        return "Password must be at least 6 characters long."
    }

    if (!/[A-Z]/.test(password)) {
        return "Password must contain at least one uppercase letter."
    }

    if (!/[a-z]/.test(password)) {
        return "Password must contain at least one lowercase letter."
    }

    return ""
}

export default function SignUpPage() {
    const router = useRouter()
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [formError, setFormError] = useState("")

    async function handleEmailSignUp(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const validationError = validatePassword(password)
        if (validationError) {
            setPasswordError(validationError)
            setFormError("")
            return
        }

        setPasswordError("")
        const formData = new FormData(e.currentTarget)

        const { error } = await authClient.signUp.email({
            name: String(formData.get("name")),
            email: String(formData.get("email")),
            password,
            image: String(formData.get("image")),
        })

        if (error) {
            setFormError(error.message ?? "Unable to create account.")
            return
        }

        await authClient.signOut()
        router.replace("/login")
        router.refresh()
    }

    return (
        <div >
            <Card className="max-w-120 mx-auto my-4">
                <CardHeader>
                    <CardTitle>Create an account</CardTitle>
                    <CardDescription>
                        Enter your information below to create your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form noValidate onSubmit={handleEmailSignUp}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="Please Enter Your Name Here"
                                    required />
                            </Field>
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
                                <FieldLabel htmlFor="image">Image URL</FieldLabel>
                                <Input
                                    id="image"
                                    type="url"
                                    name="image"
                                    placeholder="Please Enter Your Image Here"
                                    required />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={password}
                                    aria-invalid={Boolean(passwordError)}
                                    aria-describedby="password-message"
                                    onChange={(event) => {
                                        const nextPassword = event.target.value
                                        setPassword(nextPassword)
                                        if (passwordError) {
                                            setPasswordError(validatePassword(nextPassword))
                                        }
                                    }}
                                    required />
                                <FieldDescription id="password-message">
                                    Must be at least 6 characters, with uppercase and lowercase letters.
                                </FieldDescription>
                                {passwordError && (
                                    <p role="alert" className="text-sm text-destructive">
                                        {passwordError}
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
                                    <Button type="submit">Create Account</Button>
                                    <Button variant="outline" type="button">
                                        Sign up with Google
                                    </Button>
                                    <FieldDescription className="px-6 text-center">
                                        Already have an account? <a href="#">Sign in</a>
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
