"use client"

import { Invoice } from '@/type'
import { InvoiceLine } from '@prisma/client'
import { Plus, Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { AutoComplete } from 'primereact/autocomplete'
import { Product } from '@prisma/client' // ou ton type custom si besoin
import InvoicePayment from './InvoicePayment'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'

interface Props {
    invoice: Invoice
    setInvoice: (invoice: Invoice) => void
}


const InvoiceLines: React.FC<Props> = ({ invoice, setInvoice }) => {
    const [allProducts, setAllProducts] = useState<Product[]>([])
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
    const [barcodeInput, setBarcodeInput] = useState<string>('')


    useEffect(() => {
        fetch('/api/products')
            .then((res) => res.json())
            .then((data) => setAllProducts(data))
    }, [])
    const [showPaymentDialog, setShowPaymentDialog] = useState(false);

    const handleAddLine = () => {
        const newLine: InvoiceLine & { productId?: string } = {
            id: crypto.randomUUID(),
            description: '',
            quantity: 1,
            unitPrice: 0,
            invoiceId: invoice.id,
            productId: '',
            createdAt: new Date(),
            updatedAt: new Date()
        }
        setInvoice({ ...invoice, lines: [...invoice.lines, newLine] })
    }

    const handleRemoveLine = (index: number) => {
        const updatedLines = invoice.lines.filter((_, i) => i !== index)
        setInvoice({ ...invoice, lines: updatedLines })
    }



    const handleQuantityChange = (index: number, value: string) => {
        const updatedLines = [...invoice.lines]
        updatedLines[index].quantity = value === '' ? 0 : parseInt(value)
        setInvoice({ ...invoice, lines: updatedLines })
    }

    const handleUnitPriceChange = (index: number, value: string) => {
        const updatedLines = [...invoice.lines]
        updatedLines[index].unitPrice = value === '' ? 0 : parseFloat(value)
        setInvoice({ ...invoice, lines: updatedLines })
    }

    const searchProducts = (event: { query: string }) => {
        setFilteredProducts(
            allProducts.filter(
                (product) =>
                    product.name.toLowerCase().includes(event.query.toLowerCase()) ||
                    (product.barcode || '').includes(event.query)
            )
        )
    }

    const handleBarcodeSearch = () => {
        const found = allProducts.find((p) => p.barcode === barcodeInput.trim());

        if (!found) {
            alert("Produit non trouvé");
            return;
        }

        const existingIndex = invoice.lines.findIndex((line) => line.productId === found.id);

        const updatedLines = [...invoice.lines];

        if (existingIndex !== -1) {
            // Produit déjà présent → on augmente la quantité
            updatedLines[existingIndex].quantity += 1;
        } else {
            // Produit pas encore présent → on l'ajoute
            const now = new Date();
            const newLine: InvoiceLine & { productId: string } = {
                id: crypto.randomUUID(),
                description: found.name,
                quantity: 1,
                unitPrice: found.price,
                invoiceId: invoice.id,
                productId: found.id,
                createdAt: now,
                updatedAt: now,
            };
            updatedLines.push(newLine);
        }

        setInvoice({ ...invoice, lines: updatedLines });
        setBarcodeInput('');
    }



    return (
        <div>
            <Card className="w-full">
                <CardContent className="p-6 space-y-6">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-muted-foreground">Produits / Services</span>
                        <div className="flex gap-2">
                            <Input
                                value={barcodeInput}
                                onChange={(e) => setBarcodeInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleBarcodeSearch()}
                                placeholder="Scan ou code-barre"
                                className="w-48"
                            />
                            <Button variant="secondary" size="sm" onClick={handleBarcodeSearch}>
                                OK
                            </Button>
                            <Button variant="secondary" size="sm" onClick={handleAddLine}>
                                <Plus className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="text-xs text-muted-foreground border-b">
                                <tr>
                                    <th className="text-left py-2">Produit</th>
                                    <th className="text-left py-2">Quantité</th>
                                    <th className="text-left py-2">Prix Unitaire (HT)</th>
                                    <th className="text-left py-2">Montant (HT)</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoice.lines.map((line, index) => (
                                    <tr key={line.id} className="border-b">
                                        <td className="py-2 pr-2">
                                            {/* Ton composant AutoComplete ici, enveloppé si besoin */}
                                            <div className="bg-background border rounded-md">
                                                <AutoComplete/>
                                            </div>
                                        </td>
                                        <td className="py-2 pr-2">
                                            <Input
                                                type="number"
                                                value={line.quantity}
                                                min={0}
                                                onChange={(e) => handleQuantityChange(index, e.target.value)}
                                            />
                                        </td>
                                        <td className="py-2 pr-2">
                                            <Input
                                                type="number"
                                                step="0.01"
                                                value={line.unitPrice}
                                                min={0}
                                                onChange={(e) => handleUnitPriceChange(index, e.target.value)}
                                            />
                                        </td>
                                        <td className="font-medium py-2 pr-2">
                                            {(line.quantity * line.unitPrice).toFixed(2)} CFA
                                        </td>
                                        <td className="py-2">
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() => handleRemoveLine(index)}
                                            >
                                                <Trash className="w-4 h-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="text-right">
                        <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
                            <DialogTrigger asChild>
                                <Button className="text-base">💳 Payer</Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                                <InvoicePayment
                                    invoice={invoice}
                                    onPaid={(updatedInvoice) => {
                                        setInvoice(updatedInvoice)
                                        setShowPaymentDialog(false)
                                    }}
                                />
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default InvoiceLines
