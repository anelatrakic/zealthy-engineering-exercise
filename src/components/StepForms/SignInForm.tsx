"use client";

import { useState } from "react";
import { useUser } from "@/context/UserContext";
import Image from "next/image";
import TextInput from "../FormInputs/TextInput";
import Button from "../FormInputs/Button";
import PageHeader from "../PageHeader";

export default function SignInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const { setUserEmail, setCurrentStep, setUserData } = useUser();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await fetch("/api/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setUserEmail(email);
                setUserData(data.user);

                setCurrentStep(2);
            } else {
                setError(data.error || "Authentication failed");
            }
        } catch (error) {
            setError("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Image
                src="/zealthy-logo.jpg"
                alt="Logo"
                width={60}
                height={60}
                className="mx-auto"
            />
            <PageHeader
                title="Welcome back!"
                subtitle="Sign in to your account or create a new one to continue"
            />
            {error && (
                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}
            <TextInput
                label="Email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
            />
            <TextInput
                label="Password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
            />
            <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
                loading={isLoading}
            >
                {isLoading ? "Processing..." : "Continue"}
            </Button>
        </form>
    );
}
