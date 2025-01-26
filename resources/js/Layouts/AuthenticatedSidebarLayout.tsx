import { useState, PropsWithChildren, ReactNode } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import { Link } from "@inertiajs/react";
import { User } from "@/types";
import Sidebar from "@/Components/admin/Sidebar"; 
import Header from "@/Components/admin/Header"; 


export default function Authenticated({
    user,
    header,
    children,
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen relative">
            {/* Sidebar */}
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
            />

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <Header user={user} toggleSidebar={toggleSidebar} />

                {/* Main section */}
                <main className="flex-1 overflow-y-auto p-6">
                    {/* Header for Dashboard with Profile */}
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-bold">
                            Dashboard | Profile
                        </h3>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-gray-200 transition duration-200">
                            Settings
                        </button>
                    </div>

                    {/* Children content */}
                    {children}
                </main>
            </div>
        </div>
    );
}
