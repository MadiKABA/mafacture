import Link from "next/link"
import {
  LayoutDashboard,
  FileText,
  CreditCard,
  Users,
  Settings,
} from "lucide-react"

const menuItems = [
  { label: "Tableau de bord", href: "/dashboard", icon: LayoutDashboard },
  { label: "Factures", href: "/dashboard/factures", icon: FileText },
  { label: "Devis", href: "/dashboard/devis", icon: FileText },
  { label: "Paiements", href: "/dashboard/paiements", icon: CreditCard },
  { label: "Clients", href: "/dashboard/clients", icon: Users },
  { label: "Paramètres", href: "/dashboard/parametres", icon: Settings },
]

export default function MyShopSidebar() {
  return (
    <aside className="w-64 h-full bg-white dark:bg-gray-900 border-r px-4 py-6 space-y-6">
      <div className="text-xl font-bold text-blue-900 dark:text-white">
        MaFacture
      </div>
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
