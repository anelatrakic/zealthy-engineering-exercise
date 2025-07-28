import { InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    className?: string;
}

export default function TextInput({
    label,
    name,
    value,
    onChange,
    required = false,
    className = "",
    ...props
}: TextInputProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-darkgreen mb-2">
                {label}
            </label>
            <input
                type="text"
                name={name}
                value={value}
                onChange={onChange}
                className={`w-full p-3 border border-mint-green rounded-lg focus:ring-darkgreen focus:border-darkgreen bg-white ${className}`}
                required={required}
                {...props}
            />
        </div>
    );
}
