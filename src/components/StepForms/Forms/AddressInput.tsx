import TextInput from "../../FormInputs/TextInput";
import PageHeader from "../../PageHeader";

interface Address {
    street: string;
    city: string;
    state: string;
    zip: string;
}

interface AddressInputProps {
    address: Address;
    onAddressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AddressInput({
    address,
    onAddressChange,
}: AddressInputProps) {
    return (
        <div key="Address" className="space-y-4">
            <PageHeader title="Your Address" level={2} className="mb-4" />
            <div className="grid grid-cols-1 gap-4">
                <TextInput
                    label="Street Address"
                    name="street"
                    value={address.street}
                    onChange={onAddressChange}
                    required
                />
                <div className="grid grid-cols-2 gap-4">
                    <TextInput
                        label="City"
                        name="city"
                        value={address.city}
                        onChange={onAddressChange}
                        required
                    />
                    <TextInput
                        label="State"
                        name="state"
                        value={address.state}
                        onChange={onAddressChange}
                        required
                    />
                </div>
                <TextInput
                    label="ZIP Code"
                    name="zip"
                    value={address.zip}
                    onChange={onAddressChange}
                    required
                />
            </div>
        </div>
    );
}
