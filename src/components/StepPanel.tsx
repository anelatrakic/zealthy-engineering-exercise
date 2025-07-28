"use client";
import { useUser } from "@/context/UserContext";

interface Step {
    number: number;
    label: string;
    sublabel: string;
}

export default function StepPanel() {
    const { currentStep } = useUser();

    const steps: Step[] = [
        { number: 1, label: "SIGN IN", sublabel: "PERSONAL INFO" },
        { number: 2, label: "ADDITIONAL INFO", sublabel: "DETAILS" },
        { number: 3, label: "COMPLETE PROFILE", sublabel: "FINALIZE" },
    ];

    return (
        <div className="bg-darkgreen text-white w-72 p-8 hidden md:block">
            {steps.map((step) => (
                <div key={step.number} className="mb-8">
                    <div className="flex items-center mb-2">
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center border-2
                ${
                    currentStep === step.number
                        ? "bg-white text-black"
                        : "border-white text-white"
                }`}
                        >
                            {step.number}
                        </div>
                        <div className="ml-4">
                            <div className="text-sm font-semibold">
                                STEP {step.number}
                            </div>
                            <div className="text-xs opacity-80">
                                {step.sublabel}
                            </div>
                        </div>
                    </div>
                    <div className="text-lg font-bold">{step.label}</div>
                </div>
            ))}
        </div>
    );
}
