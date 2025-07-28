"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/src/components/LoadingSpinner";
import PageHeader from "@/src/components/PageHeader";

interface UserData {
    id: string;
    email: string;
    aboutMe?: string | null;
    street?: string | null;
    city?: string | null;
    state?: string | null;
    zip?: string | null;
    dateOfBirth?: string | null;
}

export default function DataPage() {
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/user");
                if (!response.ok) {
                    throw new Error("Error fetching users.");
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("An unknown error occurred");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-lightcream flex flex-col items-center pt-20 px-4">
                <LoadingSpinner />
            </div>
        );
    }

    const formatAddress = (user: UserData) => {
        const sections = [user.street, user.city, user.state, user.zip].filter(
            Boolean
        );
        return sections.length > 0 ? sections.join(", ") : "—";
    };

    const formatDate = (date?: string | null) => {
        return date ? new Date(date).toLocaleDateString() : "—";
    };

    const tableHeaderClass =
        "px-4 py-3 border-b border-lightgray text-left text-sm font-semibold";
    const tableCellClass = "px-4 py-2 border-b border-lightgray text-sm";
    const getRowClass = (idx: number) =>
        idx % 2 === 0 ? "bg-white" : "bg-cream";

    return (
        <div className="bg-white flex justify-center px-4 pt-8">
            <div className="w-full max-w-5xl bg-mintgreen rounded-xl shadow-lg p-6 overflow-x-auto">
                <PageHeader title="User Data" />
                <table className="w-full table-auto border-collapse border border-lightgray bg-white rounded-lg overflow-hidden">
                    <thead className="bg-lightgreen text-blackgreen">
                        <tr>
                            <th className={tableHeaderClass}>ID</th>
                            <th className={tableHeaderClass}>Email</th>
                            <th className={tableHeaderClass}>About Me</th>
                            <th className={tableHeaderClass}>Address</th>
                            <th className={tableHeaderClass}>Date of Birth</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, idx) => (
                            <tr key={user.id} className={getRowClass(idx)}>
                                <td className={tableCellClass}>{user.id}</td>
                                <td className={tableCellClass}>{user.email}</td>
                                <td className={tableCellClass}>
                                    {user.aboutMe ?? "—"}
                                </td>
                                <td className={tableCellClass}>
                                    {formatAddress(user)}
                                </td>
                                <td className={tableCellClass}>
                                    {formatDate(user.dateOfBirth)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
