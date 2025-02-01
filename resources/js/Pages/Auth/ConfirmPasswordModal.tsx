import { useEffect, FormEventHandler, useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import axios from "axios";


export default function ConfirmPasswordModal({ onSuccess }: { onSuccess?: () => void }) {
    const { data, setData, processing, reset } = useForm({
        password: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

        const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/user/confirm-password", {
                password: data.password,
            });

            console.log("Password confirmation successful:", response.data);

            if (response.status === 201) {
                // Handle success when status is 201 (Created)
                console.log("Password confirmed successfully!");

                if (onSuccess) {
                    onSuccess(); // Invoke onSuccess callback if provided
                }
            } else {
                // Handle other status codes if needed
                console.log("Unexpected status code:", response.status);
            }
        } catch (error: any) {
       if (
           error.response &&
           error.response.data &&
           error.response.data.message
       ) {
           setPasswordErrorMessage(error.response.data.message); // Update error message state
       } else {
           setPasswordErrorMessage(
               "An error occurred. Please try again later."
           );
       }
            
        }
    };

    return (
        <div className="p-5">
            <Head title="Confirm Password" />
            <div className="flex items-center justify-center p-5">
                <ApplicationLogo className="text-gray-500 w-20 h-20" />
            </div>

            <div className="mb-4 text-sm text-gray-600">
                This is a secure area of the application. Please confirm your
                password before continuing.
            </div>

            <form onSubmit={submit}>
                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setData("password", e.target.value)}
                    />

                    <InputError
                        message={passwordErrorMessage}
                        className="mt-2"
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Confirm
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
}
