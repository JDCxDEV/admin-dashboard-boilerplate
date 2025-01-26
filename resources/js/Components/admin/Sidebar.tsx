import { Link } from "@inertiajs/react";
import { useEffect, useRef } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";

interface SidebarProps {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}

export default function Sidebar({
    isSidebarOpen,
    toggleSidebar,
}: SidebarProps) {
    const sidebarRef = useRef<HTMLDivElement | null>(null);

    // Close sidebar when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target as Node)
            ) {
                toggleSidebar();
            }
        };

        if (isSidebarOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isSidebarOpen]);

    return (
        <aside
            ref={sidebarRef}
            className={`fixed top-0 left-0 h-full bg-gray-800 text-gray-100 transform transition-transform duration-300 ease-in-out
            ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } lg:translate-x-0 lg:relative lg:w-64`}
            style={{ width: "16rem" }} // Fixed width of 64 (tailwind rem size) for consistency
        >
            <div className="h-16 flex items-center bg-gray-900 text-2xl font-semibold pl-4">
                <Link href="/">
                    <ApplicationLogo className="block h-9 w-auto fill-current text-white" />
                </Link>
                {/* Close Button */}
                <button
                    className="ml-auto p-2 text-white lg:hidden"
                    onClick={toggleSidebar}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
            <nav className="mt-5 space-y-2 px-4">
                <a
                    href="#"
                    className="block py-2.5 px-4 rounded hover:bg-gray-700 transition duration-200"
                >
                    Home
                </a>
                <a
                    href="#"
                    className="block py-2.5 px-4 rounded hover:bg-gray-700 transition duration-200"
                >
                    Profile
                </a>
                <a
                    href="#"
                    className="block py-2.5 px-4 rounded hover:bg-gray-700 transition duration-200"
                >
                    Settings
                </a>
                <a
                    href="#"
                    className="block py-2.5 px-4 rounded hover:bg-gray-700 transition duration-200"
                >
                    Messages
                </a>
                <a
                    href="#"
                    className="block py-2.5 px-4 rounded hover:bg-gray-700 transition duration-200"
                >
                    Analytics
                </a>
                <a
                    href="#"
                    className="block py-2.5 px-4 rounded hover:bg-gray-700 transition duration-200"
                >
                    Logout
                </a>
            </nav>
        </aside>
    );
}
