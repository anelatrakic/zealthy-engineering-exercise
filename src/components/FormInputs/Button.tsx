import { ButtonHTMLAttributes } from "react";
import LoadingSpinner from "../LoadingSpinner";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "back";
    className?: string;
    loading?: boolean;
}

export default function Button({
    children,
    variant = "primary",
    className = "",
    loading = false,
    type = "button",
    ...props
}: ButtonProps) {
    const baseClasses =
        "px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

    const variantClasses = {
        primary: "bg-darkgreen text-white hover:bg-darkgreen/90",
        secondary: "bg-mintgreen text-darkgreen hover:bg-mintgreen/80",
        back: "bg-mintgreen text-darkgreen hover:bg-mintgreen/80",
    };

    return (
        <button
            type={type}
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            disabled={loading}
            {...props}
        >
            {loading ? <LoadingSpinner text="" variant="light" /> : children}
        </button>
    );
}
