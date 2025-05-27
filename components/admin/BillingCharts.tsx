"use client"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
    { name: "Jan", factures: 40 },
    { name: "Fév", factures: 38 },
    { name: "Mar", factures: 65 },
    { name: "Avr", factures: 52 },
    { name: "Mai", factures: 78 },
]

export default function BillingCharts() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Évolution mensuelle des factures</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="factures" fill="#4f46e5" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
