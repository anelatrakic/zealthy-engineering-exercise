import { InputHTMLAttributes } from "react";

interface DateInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    className?: string;
}

export default function DateInput({
    label,
    value,
    onChange,
    required = false,
    className = "",
    ...props
}: DateInputProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-darkgreen mb-2">
                {label}
            </label>
            <input
                type="date"
                value={value}
                onChange={onChange}
                className={`w-full p-3 border border-mint-green rounded-lg focus:ring-darkgreen focus:border-darkgreen bg-white ${className}`}
                required={required}
                {...props}
            />
        </div>
    );
}
