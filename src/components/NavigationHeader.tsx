"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function NavigationHeader() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const closeDropdown = () => setIsDropdownOpen(false);

    const menuItems = [
        { href: "/", label: "Sign In" },
        { href: "/data", label: "Data" },
        { href: "/admin", label: "Admin" },
    ];

    return (
        <header className="w-full py-6 bg-darkcream shadow">
            <div className="flex justify-between items-center px-8">
                <Image
                    loading="lazy"
                    src="https://cdn.prod.website-files.com/64ac3a433180d94638a63ead/64acc00e5f8b28a1f8b430a9_Logo-Zealthy-Black.svg"
                    alt="Zealthy logo"
                    width={200}
                    height={100}
                />
                <div className="relative">
                    <button
                        onClick={toggleDropdown}
                        className="flex flex-col items-center justify-center w-8 h-8 space-y-1 focus:outline-none hover:bg-lightcream/20 rounded p-1 transition-colors"
                        aria-label="Navigation menu"
                    >
                        {[...Array(3)].map((_, i) => (
                            <span
                                key={i}
                                className="block w-6 h-0.5 bg-darkgreen"
                            />
                        ))}
                    </button>

                    {isDropdownOpen && (
                        <>
                            <div
                                className="fixed inset-0 z-10"
                                onClick={closeDropdown}
                            />
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                                <div className="py-2">
                                    {menuItems.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={closeDropdown}
                                            className="block px-4 py-2 text-darkgreen hover:bg-lightcream transition-colors"
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
