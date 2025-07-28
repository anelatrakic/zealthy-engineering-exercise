"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import AddressInput from "./Forms/AddressInput";
import AboutMeInput from "./Forms/AboutMeInput";
import DOBInput from "./Forms/DOBInput";
import Button from "../FormInputs/Button";

type ComponentType = "AboutMe" | "Address" | "DOB";

interface Address {
    street: string;
    city: string;
    state: string;
    zip: string;
}

interface AdminConfigEntry {
    id: string;
    component: ComponentType;
    stepNumber: 2 | 3;
}

interface StepTwoFormProps {
    onComplete: () => void;
}

export default function StepTwoForm({ onComplete }: StepTwoFormProps) {
    const [aboutMe, setAboutMe] = useState("");
    const [address, setAddress] = useState<Address>({
        street: "",
        city: "",
        state: "",
        zip: "",
    });
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [adminConfig, setAdminConfig] = useState<AdminConfigEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const { userEmail, setCurrentStep, userData, setUserData } = useUser();

    // Load admin configuration
    useEffect(() => {
        fetch("/api/admin-config")
            .then((res) => res.json())
            .then((data: AdminConfigEntry[]) => {
                if (data.length === 0) {
                    setAdminConfig([
                        { id: "", component: "AboutMe", stepNumber: 2 },
                        { id: "", component: "Address", stepNumber: 3 },
                        { id: "", component: "DOB", stepNumber: 3 },
                    ]);
                } else {
                    setAdminConfig(data);
                }
            })
            .catch((error) => {
                console.error("Failed to load admin config:", error);
                setAdminConfig([
                    { id: "", component: "AboutMe", stepNumber: 2 },
                    { id: "", component: "Address", stepNumber: 3 },
                    { id: "", component: "DOB", stepNumber: 3 },
                ]);
            })
            .finally(() => setLoading(false));
    }, []);

    // Pre-populate form data if user has existing data
    useEffect(() => {
        if (userData) {
            if (userData.aboutMe) {
                setAboutMe(userData.aboutMe);
            }
            setAddress({
                street: userData.street || "",
                city: userData.city || "",
                state: userData.state || "",
                zip: userData.zip || "",
            });
            if (userData.dateOfBirth) {
                const date = new Date(userData.dateOfBirth);
                const formattedDate = date.toISOString().split("T")[0];
                setDateOfBirth(formattedDate);
            }
        }
    }, [userData]);

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAddress((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        // Collect all data for step 2 components
        let updateData: any = {
            email: userEmail,
            onboardingStep: 2,
        };

        const step2Components = adminConfig.filter(
            (config) => config.stepNumber === 2
        );

        // Add data for each configured component
        step2Components.forEach((config) => {
            switch (config.component) {
                case "AboutMe":
                    updateData.aboutMe = aboutMe;
                    break;
                case "Address":
                    updateData = { ...updateData, ...address };
                    break;
                case "DOB":
                    updateData.dateOfBirth = new Date(dateOfBirth);
                    break;
            }
        });

        try {
            const response = await fetch("/api/user", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateData),
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUserData(updatedUser);
                onComplete();
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const renderComponent = (componentType: ComponentType) => {
        switch (componentType) {
            case "AboutMe":
                return (
                    <AboutMeInput
                        key="AboutMe"
                        aboutMe={aboutMe}
                        onAboutMeChange={(
                            e: React.ChangeEvent<HTMLTextAreaElement>
                        ) => setAboutMe(e.target.value)}
                        showSubmit={false}
                    />
                );

            case "Address":
                return (
                    <AddressInput
                        key="Address"
                        address={address}
                        onAddressChange={handleAddressChange}
                        showSubmit={false}
                    />
                );

            case "DOB":
                return (
                    <DOBInput
                        key="DOB"
                        dateOfBirth={dateOfBirth}
                        onDateOfBirthChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                        ) => setDateOfBirth(e.target.value)}
                        showSubmit={false}
                    />
                );

            default:
                return null;
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    // Get components configured for step 2
    const step2Components = adminConfig.filter(
        (config) => config.stepNumber === 2
    );

    return (
        <div className="space-y-6">
            {step2Components.map((config) => renderComponent(config.component))}
            <div className="flex justify-between">
                <Button onClick={() => setCurrentStep(1)} variant="back">
                    Back
                </Button>
                <Button onClick={handleSubmit} type="submit">
                    Continue
                </Button>
            </div>
        </div>
    );
}
