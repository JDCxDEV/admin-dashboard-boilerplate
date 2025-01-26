
import Dropdown from "@/Components/Dropdown";
import { User } from "@/types";

interface HeaderProps {
    user: User;
    toggleSidebar: () => void;
}

export default function Header({ user, toggleSidebar }: HeaderProps) {
    return (
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6">
            <button className="lg:hidden text-gray-500" onClick={toggleSidebar}>
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
                        d="M4 6h16M4 12h16m-7 6h7"
                    ></path>
                </svg>
            </button>
            <div className="text-xl font-semibold">Dashboard</div>
            <div className="flex space-x-4">
                <Dropdown>
                    <Dropdown.Trigger>
                        <span className="inline-flex rounded-md">
                            <button
                                type="button"
                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                            >
                                <img
                                    src="https://via.placeholder.com/40"
                                    alt="Profile"
                                    className="rounded-full w-10 h-10 mr-3"
                                />
                            </button>
                        </span>
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                        <Dropdown.Link href={route("profile.edit")}>
                            Profile
                        </Dropdown.Link>
                        <Dropdown.Link
                            href={route("logout")}
                            method="post"
                            as="button"
                        >
                            Log Out
                        </Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
            </div>
        </header>
    );
}
