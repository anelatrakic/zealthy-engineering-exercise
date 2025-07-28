import type { Metadata } from "next";
import "./globals.css";
import Image from "next/image";
import NavigationHeader from "@/src/components/NavigationHeader";

export const metadata: Metadata = {
    title: "Zealthy Onboarding",
    description: "Custom onboarding flow for Zealthy",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased bg-lightcream">
                <NavigationHeader />
                {children}
            </body>
        </html>
    );
}
