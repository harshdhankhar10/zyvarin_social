import React from 'react'
import { currentLoggedInUserInfo } from '@/utils/currentLogegdInUserInfo'
import NotFound from '../not-found'
import AdminSidebar from '@/components/Admin/AdminSidebar'
import AdminTopNav from '@/components/Admin/AdminTopNav'

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
    const session = await currentLoggedInUserInfo();
    if (!session || session.role !== 'ADMIN') {
        return <NotFound />;
    }
    if (session.status !== 'ACTIVE') {
        return <NotFound />;
    }

    return (
        <div className="flex h-screen bg-gray-50">
            <AdminSidebar />
            <div className="flex-1 flex flex-col ml-64">
                <AdminTopNav user={session} />
                <main className="flex-1 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default AdminLayout