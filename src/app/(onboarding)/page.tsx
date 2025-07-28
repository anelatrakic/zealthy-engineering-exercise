"use client";

import StepPanel from "@/src/components/StepPanel";
import StepForm from "@/src/components/StepForm";

export default function Home() {
    return (
        <div className="min-h-screen bg-lightcream flex flex-col items-center pt-12 px-4">
            <div className="flex w-full max-w-5xl rounded-xl shadow-lg overflow-hidden">
                <div className="w-1/3 bg-darkgreen text-white p-6 flex flex-col justify-start">
                    <StepPanel />
                </div>
                <div className="w-2/3 bg-lightgreen p-8 flex flex-col justify-start">
                    <StepForm />
                </div>
            </div>
        </div>
    );
}
