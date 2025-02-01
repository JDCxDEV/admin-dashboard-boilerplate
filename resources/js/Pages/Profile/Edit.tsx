import { useState } from 'react';
import AuthenticatedSidebarLayout from '@/Layouts/AuthenticatedSidebarLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import TwoAuthSetting from './Partials/TwoAuthSetting';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';

export default function Edit({ auth, mustVerifyEmail, status }: PageProps<{ mustVerifyEmail: boolean, status?: string }>) {
    const [activeTab, setActiveTab] = useState('profile'); // State to manage active tab

    return (
        <AuthenticatedSidebarLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        {/* Tab buttons */}
                        <div className="flex mb-4">
                            <button
                                className={`py-2 px-4 mr-4 text-sm font-medium focus:outline-none rounded-md ${
                                    activeTab === "profile"
                                        ? "bg-gray-200"
                                        : "bg-white"
                                }`}
                                onClick={() => setActiveTab("profile")}
                            >
                                Update Profile
                            </button>
                            <button
                                className={`py-2 px-4 mr-4 text-sm font-medium focus:outline-none rounded-md ${
                                    activeTab === "login-and-security"
                                        ? "bg-gray-200"
                                        : "bg-white"
                                }`}
                                onClick={() =>
                                    setActiveTab("login-and-security")
                                }
                            >
                                Login & Security
                            </button>
                            <button
                                className={`py-2 px-4 text-sm font-medium focus:outline-none rounded-md ${
                                    activeTab === "delete"
                                        ? "bg-gray-200"
                                        : "bg-white"
                                }`}
                                onClick={() => setActiveTab("delete")}
                            >
                                Delete Account
                            </button>
                        </div>
                        {/* Tab content */}
                        {activeTab === "profile" && (
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        )}
                        {activeTab === "login-and-security" && (
                            <div>
                                <TwoAuthSetting className="max-w-xl mb-4" />
                                <UpdatePasswordForm className="max-w-xl" />
                            </div>
                        )}
                        {activeTab === "delete" && (
                            <DeleteUserForm className="max-w-xl" />
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedSidebarLayout>
    );
}
