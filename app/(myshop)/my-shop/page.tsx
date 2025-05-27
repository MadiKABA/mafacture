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
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Truck, Users, DollarSign } from "lucide-react"
import DeliveryCharts from "@/components/admin/BillingCharts"

const allDeliveries = [
    { id: "DEL-00123", client: "Fatou Ndiaye", livreur: "Mamadou Diallo", status: "En cours", price: 25000, date: "2025-05-10" },
    { id: "DEL-00124", client: "Aminata Sow", livreur: "Ibrahima Barry", status: "Livrée", price: 30000, date: "2025-05-11" },
    { id: "DEL-00125", client: "Ousmane Bah", livreur: "Seydou Camara", status: "En attente", price: 20000, date: "2025-05-12" },
    { id: "DEL-00126", client: "Moussa Faye", livreur: "Mamadou Diallo", status: "Livrée", price: 35000, date: "2025-05-13" },
    { id: "DEL-00127", client: "Awa Camara", livreur: "Ibrahima Barry", status: "En cours", price: 28000, date: "2025-05-14" },
]

const stats = [
    { label: "Livraisons totales", value: 1280, icon: Truck, color: "bg-blue-100 text-blue-700" },
    { label: "Livreurs actifs", value: 85, icon: Users, color: "bg-green-100 text-green-700" },
    { label: "Revenus (GNF)", value: "12 540 000", icon: DollarSign, color: "bg-purple-100 text-purple-700" },
]

const statusColor = {
    "En cours": "bg-yellow-200 text-yellow-800",
    Livrée: "bg-green-200 text-green-800",
    "En attente": "bg-gray-200 text-gray-800",
}

const chartData = [
    { name: "Jan", livraisons: 120 },
    { name: "Fév", livraisons: 98 },
    { name: "Mar", livraisons: 150 },
    { name: "Avr", livraisons: 130 },
    { name: "Mai", livraisons: 170 },
]

export default function Dashboard() {
    const [filter, setFilter] = useState("")

    // Filtrer les livraisons selon le client, livreur ou status (insensible à la casse)
    const filteredDeliveries = useMemo(() => {
        if (!filter) return allDeliveries
        const lower = filter.toLowerCase()
        return allDeliveries.filter(
            (d) =>
                d.client.toLowerCase().includes(lower) ||
                d.livreur.toLowerCase().includes(lower) ||
                d.status.toLowerCase().includes(lower)
        )
    }, [filter])

    return (
        <div className="space-y-6">
            {/* Stats */}
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

            <DeliveryCharts />

            {/* Filtre + Tableau */}
            <Card>
                <CardHeader>
                    <CardTitle>Dernières livraisons</CardTitle>
                    <CardDescription>Filtrer par client, livreur ou statut</CardDescription>
                </CardHeader>
                <CardContent>
                    <Input
                        placeholder="Rechercher..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="mb-4 max-w-sm"
                    />
                    <ScrollArea className="max-h-72">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Commande</TableHead>
                                    <TableHead>Client</TableHead>
                                    <TableHead>Livreur</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Prix (GNF)</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredDeliveries.map(({ id, client, livreur, status, price }) => (
                                    <TableRow key={id}>
                                        <TableCell>{id}</TableCell>
                                        <TableCell>{client}</TableCell>
                                        <TableCell>{livreur}</TableCell>
                                        <TableCell>
                                            <Badge className={statusColor[status]}>{status}</Badge>
                                        </TableCell>
                                        <TableCell>{price.toLocaleString()}</TableCell>
                                    </TableRow>
                                ))}
                                {filteredDeliveries.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center text-gray-500">
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
