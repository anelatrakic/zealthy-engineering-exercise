"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Global state management for user data, current step, and email across the onboarding flow

interface UserData {
    id?: string;
    email: string;
    aboutMe?: string | null;
    street?: string | null;
    city?: string | null;
    state?: string | null;
    zip?: string | null;
    dateOfBirth?: Date | null;
    onboardingStep?: number;
}

interface UserContextType {
    userEmail: string | null;
    currentStep: number;
    userData: UserData | null;
    setUserEmail: (email: string | null) => void;
    setCurrentStep: (step: number) => void;
    setUserData: (data: UserData | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [userData, setUserData] = useState<UserData | null>(null);

    return (
        <UserContext.Provider
            value={{
                userEmail,
                currentStep,
                userData,
                setUserEmail,
                setCurrentStep,
                setUserData,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}
