import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import ToggleBox from "@/Components/ToggleBox";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { FormEventHandler, useEffect, useState } from "react";
import { PageProps } from "@/types";
import axios from "axios";

export default function TwoAuthSetting({
    mustVerifyEmail,
    status,
    className = "",
}: {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}) {

     const [svgContent, setSvgContent] = useState<string>(""); // State to hold SVG content

     const fetchQrCode = async () => {
         try {

             const response = await axios.get("/user/two-factor-qr-code");
             setSvgContent(response.data); // Update state with SVG content
         } catch (error) {
             console.error("Error fetching QR code:", error);
         }
     };

     const enableTwoFactorAuth: FormEventHandler = async (e) => {
         e.preventDefault();

         try {
             const response = await axios.post(
                 "/user/two-factor-authentication"
             );
             console.log(
                 "Two-factor authentication enabled successfully:",
                 response.data
             );
             fetchQrCode(); // After enabling, fetch QR code immediately
         } catch (error) {
             console.error("Error enabling two-factor authentication:", error);
         }
     };

     useEffect(() => {
         // On component mount, fetch QR code if already enabled
         fetchQrCode();
     }, []); // Empty dependency array ensures this runs only once on mount

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Enable Two-Factor Authentication
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Add an extra layer of security to your account by turning on
                    two-factor authentication, requiring both your password and
                    a code sent to your phone to log in.
                </p>
            </header>

            <form onSubmit={enableTwoFactorAuth} className="mt-6 space-y-6">
                <div className="flex items-center gap-4">
                    <PrimaryButton>
                        Enable 2Auth
                    </PrimaryButton>
                    <div dangerouslySetInnerHTML={{ __html: svgContent.svg }} />

                </div>
            </form>
        </section>
    );
}
