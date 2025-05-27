import Link from "next/link"
import { LayoutDashboard, Package, Users } from "lucide-react"

const menuItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Livraisons", href: "/admin/livraisons", icon: Package },
    { label: "Utilisateurs", href: "/admin/utilisateurs", icon: Users },
]

export default function AdminSidebar() {
    return (
        <aside className="w-64 h-full bg-white dark:bg-gray-800 border-r px-4 py-6 space-y-6">
            <div className="text-xl font-bold text-blue-900 dark:text-white">ColiZon Admin</div>
            <nav className="space-y-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium text-gray-800 dark:text-gray-100"
                    >
                        <item.icon size={18} />
                        {item.label}
                    </Link>
                ))}
            </nav>
        </aside>
    )
}
