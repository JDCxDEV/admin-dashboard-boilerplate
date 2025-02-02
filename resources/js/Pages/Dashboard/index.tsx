import AuthenticatedSidebarLayout from "@/Layouts/AuthenticatedSidebarLayout";
import { PageProps } from '@/types';

export default function Dashboard({ auth }: PageProps) {
    return (
        <AuthenticatedSidebarLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    xl
                </h2>
            }
        >
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflowa-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">You're logged in!</div>
                </div>
            </div>
        </AuthenticatedSidebarLayout>
    );
}
