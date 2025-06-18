"use client"

import { useState, useMemo } from "react"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { FileText, Users, DollarSign } from "lucide-react"
import BillingCharts from "@/components/admin/BillingCharts"

const allInvoices = [
    { id: "FAC-0001", client: "Société ABC", status: "Payée", total: 450000, date: "2025-05-10" },
    { id: "FAC-0002", client: "Client Freelance", status: "En attente", total: 120000, date: "2025-05-11" },
    { id: "FAC-0003", client: "Entreprise XYZ", status: "Payée", total: 320000, date: "2025-05-12" },
    { id: "FAC-0004", client: "Société ABC", status: "En retard", total: 210000, date: "2025-05-13" },
    { id: "FAC-0005", client: "Client Freelance", status: "En attente", total: 135000, date: "2025-05-14" },
]

const stats = [
    { label: "Factures totales", value: 320, icon: FileText, color: "bg-blue-100 text-blue-700" },
    { label: "Clients actifs", value: 54, icon: Users, color: "bg-green-100 text-green-700" },
    { label: "Revenus (GNF)", value: "98 540 000", icon: DollarSign, color: "bg-purple-100 text-purple-700" },
]

type InvoiceStatus = "Payée" | "En attente" | "En retard";

const statusColor: Record<InvoiceStatus, string> = {
    "Payée": "bg-green-200 text-green-800",
    "En attente": "bg-yellow-200 text-yellow-800",
    "En retard": "bg-red-200 text-red-800",
};
interface MyComponentProps {
    status: InvoiceStatus; // Ici, on spécifie que 'status' doit être de type InvoiceStatus
}

export default function FacturationDashboard() {
    const status: InvoiceStatus = "Payée";
    const [filter, setFilter] = useState("")

    const filteredInvoices = useMemo(() => {
        if (!filter) return allInvoices
        const lower = filter.toLowerCase()
        return allInvoices.filter(
            (f) =>
                f.client.toLowerCase().includes(lower) ||
                f.status.toLowerCase().includes(lower) ||
                f.id.toLowerCase().includes(lower)
        )
    }, [filter])

    return (
        <div className="space-y-6">
            {/* Statistiques */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {stats.map(({ label, value, icon: Icon, color }) => (
                    <Card key={label} className="flex items-center space-x-4 p-4">
                        <div className={`p-3 rounded-md ${color}`}>
                            <Icon className="w-8 h-8" />
                        </div>
                        <div>
                            <CardTitle className="text-lg">{value}</CardTitle>
                            <CardDescription>{label}</CardDescription>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Graphique de facturation */}
            <BillingCharts />

            {/* Filtrage + Tableau */}
            <Card>
                <CardHeader>
                    <CardTitle>Dernières factures</CardTitle>
                    <CardDescription>Filtrer par client, statut ou numéro</CardDescription>
                </CardHeader>
                <CardContent>
                    <Input
                        placeholder="Rechercher une facture..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="mb-4 max-w-sm"
                    />
                    <ScrollArea className="max-h-72">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Facture</TableHead>
                                    <TableHead>Client</TableHead>
                                    <TableHead>Statut</TableHead>
                                    <TableHead>Montant TTC</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredInvoices.map(({ id, client, status, total }) => (
                                    <TableRow key={id}>
                                        <TableCell>{id}</TableCell>
                                        <TableCell>{client}</TableCell>
                                        <TableCell>
                                            <Badge className={statusColor[status]}>{status}</Badge>
                                        </TableCell>
                                        <TableCell>{total.toLocaleString()}</TableCell>
                                    </TableRow>
                                ))}
                                {filteredInvoices.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center text-gray-500">
                                            Aucun résultat trouvé
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    )
}
