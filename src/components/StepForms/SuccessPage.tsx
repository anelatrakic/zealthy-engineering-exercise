"use client";

import { useUser } from "@/context/UserContext";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "../PageHeader";
import Button from "../FormInputs/Button";

export default function SuccessPage() {
    const { setCurrentStep } = useUser();

    return (
        <div className="flex flex-col h-full space-y-4">
            <div className="flex-grow space-y-4">
                <Image
                    src="/zealthy-logo.jpg"
                    alt="Logo"
                    width={60}
                    height={60}
                    className="mx-auto"
                />
                <PageHeader
                    title="Success!"
                    subtitle={
                        <>
                            Click{" "}
                            <Link
                                href="/data"
                                className="text-blue underline hover:text-darkgreen"
                            >
                                here
                            </Link>{" "}
                            to see what data we have.
                        </>
                    }
                />
            </div>
            <Button onClick={() => setCurrentStep(1)} className="mx-auto block">
                Back to Sign In
            </Button>
        </div>
    );
}
