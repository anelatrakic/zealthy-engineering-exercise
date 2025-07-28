import DateInput from "../../FormInputs/DateInput";
import PageHeader from "../../PageHeader";

interface DOBInputProps {
    dateOfBirth: string;
    onDateOfBirthChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DOBInput({
    dateOfBirth,
    onDateOfBirthChange,
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
        </div>
    );
}
