import { TextareaHTMLAttributes } from "react";

interface TextAreaInputProps
    extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    required?: boolean;
    className?: string;
    rows?: number;
}

export default function TextAreaInput({
    label,
    value,
    onChange,
    required = false,
    className = "",
    rows = 4,
    ...props
}: TextAreaInputProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-darkgreen mb-2">
                {label}
            </label>
            <textarea
                value={value}
                onChange={onChange}
                rows={rows}
                className={`w-full p-3 border border-mint-green rounded-lg focus:ring-darkgreen focus:border-darkgreen bg-white ${className}`}
                required={required}
                {...props}
            />
        </div>
    );
}
