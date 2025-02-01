import PrimaryButton from "@/Components/PrimaryButton";
import ConfirmPasswordModal from "@/Pages/Auth/ConfirmPasswordModal";
import Modal from "@/Components/Modal";
import { FormEventHandler, useEffect, useState } from "react";
import axios from "axios";

export default function TwoAuthSetting({
    className = "",
}: {
    status?: string;
    className?: string;
}) {

    const [svgContent, setSvgContent] = useState<string>("");
    const [startEnablingTwoFactorAuth, setEnablingTwoFactorAuth] =
        useState(false);    

     const fetchQrCode = async () => {
         try {

             const response = await axios.get("/user/two-factor-qr-code");
             setSvgContent(response.data);
         } catch (error) {
             console.error("Error fetching QR code:", error);
         }
     };

    const enableTwoFactorAuth =async () => {
         try {
             const response = await axios.post(
                 "/user/two-factor-authentication"
             );
             console.log(
                 "Two-factor authentication enabled successfully:",
                 response.data
             );
             fetchQrCode();
         } catch (error) {
             console.error("Error enabling two-factor authentication:", error);
         }
    };

    const startEnableTwoFactorAuth: FormEventHandler = async (e) => {
        e.preventDefault();
        setEnablingTwoFactorAuth(true);
    };

    const closeModal = () => {
        setEnablingTwoFactorAuth(false);
    };
    
    
     useEffect(() => {
        fetchQrCode();
     }, []);

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

            <form
                onSubmit={startEnableTwoFactorAuth}
                className="mt-6 space-y-6"
            >
                <div className="flex items-center gap-4">
                    <PrimaryButton>Enable 2Auth</PrimaryButton>
                    <div dangerouslySetInnerHTML={{ __html: svgContent.svg }} />
                </div>
            </form>
            <Modal show={startEnablingTwoFactorAuth} onClose={closeModal}>
                <ConfirmPasswordModal onSuccess={enableTwoFactorAuth} />
            </Modal>
        </section>
    );
}
