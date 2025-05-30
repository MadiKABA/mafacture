"use client"

import { useEffect } from "react"
import { getShopsByEmail } from "@/app/actions"

interface AppShellProps {
    children: React.ReactNode
    selectedShop: string | null
    onShopSelect: (shopId: string) => void
    refreshKey: number
}

export default function AppShell({
    children,
    selectedShop,
    onShopSelect,
    refreshKey
}: AppShellProps) {


    return (
        <>
            {/* <Navbar
                selectedShop={selectedShop}
                onShopSelect={onShopSelect}
                refreshKey={refreshKey}
            /> */}
            <main className="px-5 md:px-[10%] mt-8 mb-10">{children}</main>
        </>
    )
}
