import PrimaryButton from "@/Components/PrimaryButton";
import ConfirmPasswordModal from "@/Pages/Auth/ConfirmPasswordModal";
import TextInput from "@/Components/TextInput";
import Modal from "@/Components/Modal";
import { FormEventHandler, useState } from "react";
import axios from "axios";
import { usePage, router } from "@inertiajs/react";
import { PageProps } from "@/types";

export default function TwoAuthSetting({
    className = "",
    status = null,
}: {
    status?: any;
    className?: string;
    }) {
    const user = usePage<PageProps>().props.auth.user;
    const [svgContent, setSvgContent] = useState<any>("");
    const [authCode, setAuthCode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [recoveryCodes, setRecoveryCodes] = useState([]);
    const [startEnablingTwoFactorAuth, setEnablingTwoFactorAuth] =
        useState(false);
    const [currentStep, setCurrentStep] = useState<string>("confirm-password");
    const [copiedCodes, setCopiedCodes] = useState<boolean>(false);

    const fetchQrCode = async () => {
        setCurrentStep;
        try {
            const response = await axios.get("/user/two-factor-qr-code");
            setSvgContent(response.data);
        } catch (error) {
            console.error("Error fetching QR code:", error);
        }
    };

    const fetchRecoveryCodes = async () => {
        try {
            const response = await axios.get("/user/two-factor-recovery-codes");
            setRecoveryCodes(response.data);
        } catch (error) {
            console.error("Error fetching recovery codes:", error);
            setErrorMessage(
                "Failed to fetch recovery codes. Please try again."
            );
        }
    };

    const enableTwoFactorAuth = async () => {
        try {
            const response = await axios.post(
                "/user/two-factor-authentication"
            );

            if (response.status === 200) {
                await fetchQrCode();
                await setCurrentStep("authentication-code");
            }
        } catch (error) {
            console.error("Error enabling two-factor authentication:", error);
        }
    };

    const confirmTwoFactorAuth: FormEventHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "/user/confirmed-two-factor-authentication",
                {
                    code: authCode,
                }
            );

            if (response.status === 200) {
                await fetchRecoveryCodes();
                await setCurrentStep("recovery-codes");
                console.log(
                    "Two-factor authentication confirmed successfully!"
                );
            }
        } catch (error) {
            setErrorMessage(
                "Failed to confirm two-factor authentication. Please try again."
            );
        }
    };

    const startEnableTwoFactorAuth: FormEventHandler = async (e) => {
        e.preventDefault();
        setEnablingTwoFactorAuth(true);
    };

    const closeModal = () => {
        setEnablingTwoFactorAuth(false);;
    };

    const reloadPage = async () => {
        router.visit(route("profile.edit", { tab: "login-and-security" }), {
            except: ["users"],
        });
    };

    const copyCodes = () => {
        const codesText = recoveryCodes.join(" \n");
        navigator.clipboard.writeText(codesText).then(() => {
            setCopiedCodes(true);
        });
    };

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
                    <PrimaryButton disabled={status ? true : false}>
                        Enable 2Auth
                    </PrimaryButton>
                </div>
            </form>
            <Modal
                show={startEnablingTwoFactorAuth}
                onClose={closeModal}
                closeable={false}
                isManualClose={reloadPage}
            >
                {currentStep == "confirm-password" && (
                    <ConfirmPasswordModal onSuccess={enableTwoFactorAuth} />
                )}
                ;
                {currentStep == "authentication-code" && (
                    <form className="p-5" onSubmit={confirmTwoFactorAuth}>
                        <div className="flex items-center justify-center ">
                            <div
                                className="text-gray-500"
                                dangerouslySetInnerHTML={{
                                    __html: svgContent.svg,
                                }}
                            />
                        </div>

                        <div className="mt-4">
                            <label
                                htmlFor="authCode"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Authentication Code
                            </label>
                            <TextInput
                                id="authCode"
                                type="text"
                                value={authCode}
                                onChange={(e) => setAuthCode(e.target.value)}
                                className="mt-1 block w-full"
                                required
                            />
                            {errorMessage && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errorMessage}
                                </p>
                            )}
                        </div>
                        <div className="flex items-center justify-end mt-4">
                            <PrimaryButton type="submit">Confirm</PrimaryButton>
                        </div>
                    </form>
                )}
                {recoveryCodes.length > 0 &&
                    currentStep == "recovery-codes" && (
                        <div className="text-center font-black p-5">
                            <h2 className="p-2">Recovery Codes</h2>
                            <div className="grid grid-cols-2 gap-4 p-5">
                                {recoveryCodes.map((code, index) => (
                                    <div
                                        key={index}
                                        className="bg-white shadow-md rounded-lg p-4"
                                    >
                                        <p className="text-sm text-gray-500 mt-1">
                                            {code}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            {copiedCodes && (
                                <p className="text-green-500 text-sm m-2">
                                    Codes copied to clipboard!
                                </p>
                            )}
                            <PrimaryButton onClick={copyCodes}>
                                Copy Codes
                            </PrimaryButton>
                        </div>
                    )}
            </Modal>
        </section>
    );
}
