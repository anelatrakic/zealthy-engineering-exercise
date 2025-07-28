"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/src/components/LoadingSpinner";
import Button from "@/src/components/FormInputs/Button";
import PageHeader from "@/src/components/PageHeader";

type ComponentType = "AboutMe" | "Address" | "DOB";

interface AdminConfigEntry {
    id: string;
    component: ComponentType;
    stepNumber: 2 | 3;
}

const componentLabels: Record<ComponentType, string> = {
    AboutMe: "About Me",
    Address: "Address",
    DOB: "Date of Birth",
};

export default function AdminPage() {
    const [entries, setEntries] = useState<AdminConfigEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        fetch("/api/admin-config")
            .then((res) => res.json())
            .then((data: AdminConfigEntry[]) => {
                const all: ComponentType[] = ["AboutMe", "Address", "DOB"];
                const complete = all.map((c) => {
                    const exist = data.find((e) => e.component === c);
                    const defaultStep = c === "AboutMe" ? 2 : 3;
                    return (
                        exist || {
                            id: "",
                            component: c,
                            stepNumber: defaultStep as 2 | 3,
                        }
                    );
                });
                setEntries(complete);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const handleChange =
        (id: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
            const newStep = parseInt(e.target.value) as 2 | 3;
            setEntries((es) =>
                es.map((e) => (e.id === id ? { ...e, stepNumber: newStep } : e))
            );
            setError("");
            setSuccess("");
        };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const step2Components = entries.filter(
            (entry) => entry.stepNumber === 2
        );
        const step3Components = entries.filter(
            (entry) => entry.stepNumber === 3
        );

        if (step2Components.length === 0) {
            setError("Step 2 must have at least one component assigned to it.");
            return;
        }

        if (step3Components.length === 0) {
            setError("Step 3 must have at least one component assigned to it.");
            return;
        }

        setSaving(true);
        try {
            await fetch("/api/admin-config", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(entries),
            });
        } catch {
            setError("Failed to save configuration. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-lightcream flex flex-col items-center pt-20 px-4">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-lightcream flex flex-col items-center pt-12 px-4">
            <div className="w-full max-w-2xl bg-mintgreen rounded-xl shadow-lg p-8">
                <div className="bg-white rounded-lg p-6">
                    <PageHeader
                        title="Admin Configuration"
                        subtitle="Configure which components appear on which onboarding steps"
                    />

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {entries.map(({ id, component, stepNumber }) => (
                            <div
                                key={component}
                                className="bg-cream rounded-lg p-4"
                            >
                                <div className="flex items-center justify-between">
                                    <label className="text-lg font-medium text-darkgreen">
                                        {componentLabels[component]}
                                    </label>
                                    <select
                                        value={stepNumber}
                                        onChange={handleChange(id)}
                                        className="w-full max-w-xs p-3 border border-mint-green rounded-lg focus:ring-darkgreen focus:border-darkgreen bg-white text-darkgreen"
                                    >
                                        <option value={2}>Step 2</option>
                                        <option value={3}>Step 3</option>
                                    </select>
                                </div>
                            </div>
                        ))}

                        <div className="flex justify-center flex-col sm:flex-row gap-4 mt-8">
                            <Button type="submit" disabled={saving}>
                                {saving ? "Saving…" : "Save Configuration"}
                            </Button>
                            <Button
                                onClick={() => router.push("/")}
                                variant="back"
                            >
                                Back to Sign In
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
