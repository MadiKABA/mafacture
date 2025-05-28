"use client"
import MyShopHeader from "@/components/my-shop/myshop-header"
import MyShopSidebar from "@/components/my-shop/myshop-sidebar"
import { ReactNode, useState } from "react"

import "../globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function AdminLayout({ children }: { children: ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                    {/* Sidebar en grand écran */}
                    <div className="hidden lg:block">
                        <MyShopSidebar />
                    </div>

                    {/* Sidebar mobile (sheet) */}
                    {sidebarOpen && (
                        <div className="fixed inset-0 z-40 flex lg:hidden">
                            <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
                            <div className="relative z-50 w-64 bg-white dark:bg-gray-800">
                                <MyShopSidebar />
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col flex-1">
                        <MyShopHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
                        <main className="flex-1 p-4">{children}</main>
                    </div>
                </div>
            </body>
        </html >
    )
}
