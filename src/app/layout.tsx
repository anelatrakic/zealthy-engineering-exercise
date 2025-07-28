import type { Metadata } from "next";
import "./globals.css";
import NavigationHeader from "@/src/components/NavigationHeader";

export const metadata: Metadata = {
    title: "Zealthy Onboarding",
    description: "Custom onboarding flow for Zealthy",
    icons: {
        icon: "/favicon.svg",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
            </head>
            <body className="antialiased bg-lightcream">
                <NavigationHeader />
                {children}
            </body>
        </html>
    );
}
