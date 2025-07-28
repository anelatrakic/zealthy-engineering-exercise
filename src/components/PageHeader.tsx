import { ReactNode } from "react";

interface PageHeaderProps {
    title: string;
    subtitle?: string | ReactNode;
    level?: 1 | 2;
    className?: string;
}

export default function PageHeader({
    title,
    subtitle,
    level = 1,
    className = "",
}: PageHeaderProps) {
    const HeadingTag = level === 1 ? "h1" : "h2";
    const headingSize = level === 1 ? "text-3xl" : "text-2xl";

    return (
        <div className={`text-center mb-6 ${className}`}>
            <HeadingTag
                className={`${headingSize} font-bold text-darkgreen mb-6`}
            >
                {title}
            </HeadingTag>
            {subtitle && <p className="text-gray mb-8">{subtitle}</p>}
        </div>
    );
}
