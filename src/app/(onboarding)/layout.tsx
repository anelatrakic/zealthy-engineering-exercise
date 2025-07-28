import { UserProvider } from "@/context/UserContext";

export default function OnboardingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <UserProvider>{children}</UserProvider>;
}
