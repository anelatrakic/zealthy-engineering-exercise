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

interface StepThreeFormProps {
    onComplete: () => void;
}

export default function StepThreeForm({ onComplete }: StepThreeFormProps) {
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

    // Load admin config to determine which components to render
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

    useEffect(() => {
        // If user/email already in DB, pre-fill form if data exists
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
        let updateData: any = {
            email: userEmail,
            onboardingStep: 3,
        };

        const step3Components = adminConfig.filter(
            (config) => config.stepNumber === 3
        );

        step3Components.forEach((config) => {
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
                    />
                );

            case "Address":
                return (
                    <AddressInput
                        key="Address"
                        address={address}
                        onAddressChange={handleAddressChange}
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
                    />
                );

            default:
                return null;
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const step3Components = adminConfig.filter(
        (config) => config.stepNumber === 3
    );

    return (
        <div className="space-y-6">
            {step3Components.map((config) => renderComponent(config.component))}
            <div className="flex justify-between">
                <Button
                    onClick={() => {
                        const step2Components = adminConfig.filter(
                            (config) => config.stepNumber === 2
                        );
                        setCurrentStep(step2Components.length > 0 ? 2 : 1);
                    }}
                    variant="back"
                >
                    Back
                </Button>
                <Button onClick={handleSubmit} type="submit">
                    Submit
                </Button>
            </div>
        </div>
    );
}
