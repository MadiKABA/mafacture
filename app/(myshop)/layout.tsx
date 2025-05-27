"use client"

import AdminHeader from "@/components/admin/admin-header"
import AdminSidebar from "@/components/admin/admin-sidebar"
import { ReactNode, useState } from "react"


export default function AdminLayout({ children }: { children: ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            {/* Sidebar en grand écran */}
            <div className="hidden lg:block">
                <AdminSidebar />
            </div>

            {/* Sidebar mobile (sheet) */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 flex lg:hidden">
                    <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
                    <div className="relative z-50 w-64 bg-white dark:bg-gray-800">
                        <AdminSidebar />
                    </div>
                </div>
            )}

            <div className="flex flex-col flex-1">
                <AdminHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
                <main className="flex-1 p-4">{children}</main>
            </div>
        </div>
    )
}
