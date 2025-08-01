import TextAreaInput from "../../FormInputs/TextAreaInput";
import PageHeader from "../../PageHeader";

interface AboutMeInputProps {
    aboutMe: string;
    onAboutMeChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function AboutMeInput({
    aboutMe,
    onAboutMeChange,
}: AboutMeInputProps) {
    return (
        <div key="AboutMe" className="space-y-4">
            <PageHeader
                title="Tell Us About Yourself"
                level={2}
                className="mb-4"
            />
            <TextAreaInput
                label="About Me"
                value={aboutMe}
                onChange={onAboutMeChange}
                rows={6}
                placeholder="Tell us about yourself..."
                required
            />
        </div>
    );
}
