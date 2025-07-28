import Button from "../../FormInputs/Button";
import DateInput from "../../FormInputs/DateInput";
import PageHeader from "../../PageHeader";

interface DOBInputProps {
    dateOfBirth: string;
    onDateOfBirthChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit?: () => void;
    onBack?: () => void;
    showSubmit?: boolean;
}

export default function DOBInput({
    dateOfBirth,
    onDateOfBirthChange,
    onSubmit,
    onBack,
    showSubmit = true,
}: DOBInputProps) {
    return (
        <div key="DOB" className="space-y-4">
            <PageHeader title="Date of Birth" level={2} className="mb-4" />
            <DateInput
                label="Date of Birth"
                value={dateOfBirth}
                onChange={onDateOfBirthChange}
                required
            />
            {showSubmit && (
                <div className="flex justify-between">
                    <Button onClick={onBack} variant="back">
                        Back
                    </Button>
                    <Button onClick={onSubmit}>Continue</Button>
                </div>
            )}
        </div>
    );
}
