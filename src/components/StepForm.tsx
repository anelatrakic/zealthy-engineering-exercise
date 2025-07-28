"use client";

import { useUser } from "@/context/UserContext";
import SignInForm from "./StepForms/SignInForm";
import StepTwoForm from "./StepForms/StepTwoForm";
import StepThreeForm from "./StepForms/StepThreeForm";
import SuccessPage from "./StepForms/SuccessPage";

export default function StepForm() {
    const { currentStep, setCurrentStep } = useUser();

    const handleStepComplete = () => {
        setCurrentStep(currentStep + 1);
    };

    function renderFormByStep(step: number) {
        switch (step) {
            case 1:
                return <SignInForm />;
            case 2:
                return <StepTwoForm onComplete={handleStepComplete} />;
            case 3:
                return <StepThreeForm onComplete={handleStepComplete} />;
            case 4:
                return <SuccessPage />;
            default:
                return <SignInForm />;
        }
    }

    return <>{renderFormByStep(currentStep)}</>;
}
