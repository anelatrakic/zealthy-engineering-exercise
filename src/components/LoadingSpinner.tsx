import React from "react";

interface LoadingSpinnerProps {
    text?: string;
    variant?: "default" | "light" | "minimal";
}

export default function LoadingSpinner({
    text = "Loading...",
    variant = "default",
}: LoadingSpinnerProps) {
    const getVariantClasses = () => {
        switch (variant) {
            case "light":
                return {
                    container: "text-lightgreen",
                    spinner: "border-lightgreen border-t-darkgreen",
                    text: "text-lightgreen",
                };
            case "minimal":
                return {
                    container: "text-gray",
                    spinner: "border-gray-300 border-t-gray-600",
                    text: "text-gray",
                };
            default:
                return {
                    container: "text-darkgreen",
                    spinner: "border-mintgreen border-t-darkgreen",
                    text: "text-darkgreen",
                };
        }
    };

    const variantClasses = getVariantClasses();

    return (
        <div
            className={`flex flex-col items-center justify-center space-y-3 ${variantClasses.container}`}
        >
            <div className="flex items-center space-x-2">
                <div
                    className={`w-6 h-6 border-2 border-solid rounded-full animate-spin ${variantClasses.spinner}`}
                    role="status"
                    aria-label="Loading"
                />
                <span
                    className={`font-medium text-base ${variantClasses.text}`}
                >
                    {text}
                </span>
            </div>
        </div>
    );
}
