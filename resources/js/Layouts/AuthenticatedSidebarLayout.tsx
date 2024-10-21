import { useState, PropsWithChildren, ReactNode } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { User } from '@/types';

export default function Authenticated({ user, header, children }: PropsWithChildren<{ user: User, header?: ReactNode }>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
    <div className="flex h-screen relative">
      {/* Sidebar */}
      <aside
        className={`lg:relative lg:w-64 lg:bg-gray-800 lg:text-gray-100 lg:block ${
          isSidebarOpen ? 'absolute z-40 inset-0 w-64 bg-gray-800 text-gray-100' : 'hidden'
        } transition-all duration-300 ease-in-out`}
      >
        <div className="h-16 flex items-center bg-gray-900 text-2xl font-semibold pl-4 justify-between">
          <a href="/">
            <ApplicationLogo className="block h-9 w-auto fill-current text-white" />
          </a>
          {/* Close button for small screens */}
          <button
            className="lg:hidden text-white mr-4"
            onClick={() => setIsSidebarOpen(false)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <nav className="mt-5 space-y-2 px-4">
          <a href="#" className="block py-2.5 px-4 rounded hover:bg-gray-700 transition duration-200">Home</a>
          <a href="#" className="block py-2.5 px-4 rounded hover:bg-gray-700 transition duration-200">Profile</a>
          <a href="#" className="block py-2.5 px-4 rounded hover:bg-gray-700 transition duration-200">Settings</a>
          <a href="#" className="block py-2.5 px-4 rounded hover:bg-gray-700 transition duration-200">Messages</a>
          <a href="#" className="block py-2.5 px-4 rounded hover:bg-gray-700 transition duration-200">Analytics</a>
          <a href="#" className="block py-2.5 px-4 rounded hover:bg-gray-700 transition duration-200">Logout</a>
        </nav>
      </aside>

      {/* Background overlay for small screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6">
          {/* Hamburger icon for mobile */}
          <button
            className="lg:hidden text-gray-500"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
          <div className="text-xl font-semibold">Dashboard</div>
          <div className="flex space-x-4">
            <div className="hidden md:block">
              {/* <input type="text" className="px-4 py-2 rounded-lg border border-gray-300" placeholder="Search..." /> */}
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-gray-500">John Doe</span>
              <img src="https://via.placeholder.com/40" alt="Profile" className="rounded-full w-10 h-10" />
            </div>
          </div>
        </header>

        {/* Main section */}
        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="text-3xl font-bold mb-6">Welcome Back, Admin!</h1>

          {/* Dashboard stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-2">Total Users</h2>
              <p className="text-4xl font-bold">1,234</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-2">Total Sales</h2>
              <p className="text-4xl font-bold">$12,345</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-2">Active Sessions</h2>
              <p className="text-4xl font-bold">567</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">User</th>
                  <th className="px-4 py-2">Activity</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">John Doe</td>
                  <td className="border px-4 py-2">Logged In</td>
                  <td className="border px-4 py-2">22 Oct 2024</td>
                  <td className="border px-4 py-2 text-green-500">Success</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="border px-4 py-2">Jane Smith</td>
                  <td className="border px-4 py-2">Updated Profile</td>
                  <td className="border px-4 py-2">22 Oct 2024</td>
                  <td className="border px-4 py-2 text-green-500">Success</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Mark Johnson</td>
                  <td className="border px-4 py-2">Placed an Order</td>
                  <td className="border px-4 py-2">21 Oct 2024</td>
                  <td className="border px-4 py-2 text-yellow-500">Pending</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="border px-4 py-2">Lucy Brown</td>
                  <td className="border px-4 py-2">Signed Up</td>
                  <td className="border px-4 py-2">20 Oct 2024</td>
                  <td className="border px-4 py-2 text-red-500">Failed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}