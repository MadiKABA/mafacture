'use client'

import { Invoice, Totals } from '@/type'
import confetti from 'canvas-confetti'
import html2canvas from 'html2canvas-pro'
import jsPDF from 'jspdf'
import { ArrowDownFromLine } from 'lucide-react'
import React, { useRef } from 'react'
import { numberToFrenchWords } from '@/lib/numberToWords'
import dayjs from 'dayjs'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

interface FacturePDFProps {
    invoice: Invoice
    totals: Totals
}

const InvoicePDF: React.FC<FacturePDFProps> = ({ invoice, totals }) => {
    const factureRef = useRef<HTMLDivElement>(null)

    const handleDownloadPdf = async () => {
        const element = factureRef.current
        if (element) {
            try {
                const canvas = await html2canvas(element, { scale: 3, useCORS: true })
                const imgData = canvas.toDataURL('image/png')

                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'mm',
                    format: 'A4',
                })

                const pdfWidth = pdf.internal.pageSize.getWidth()
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width

                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
                pdf.save(`facture-${invoice.name}.pdf`)

                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    zIndex: 9999,
                })
            } catch (error) {
                console.error('Erreur lors de la génération du PDF :', error)
            }
        }
    }

    return (
        <div className="mt-8 hidden lg:block">
            <Card className="border-dashed border-2 border-muted">
                <CardHeader className="flex items-center justify-between">
                    <CardTitle className="text-4xl font-bold uppercase text-primary">
                        Facture
                    </CardTitle>
                    <div className="text-right text-sm uppercase space-y-1 text-muted-foreground">
                        <Badge variant="outline">Facture ° {invoice.id}</Badge>
                        <p>
                            <strong>Date :</strong> {dayjs(invoice.invoiceDate).format("DD MMM YYYY")}
                        </p>
                        <p>
                            <strong>Échéance :</strong> {dayjs(invoice.dueDate).format("DD MMM YYYY")}
                        </p>
                    </div>
                </CardHeader>

                <CardContent className="space-y-6" ref={factureRef}>
                    {/* Download Button */}
                    <div className="flex justify-end">
                        <Button size="sm" onClick={handleDownloadPdf} className="gap-2">
                            <ArrowDownFromLine className="w-4 h-4" />
                            Télécharger PDF
                        </Button>
                    </div>

                    {/* Parties émetteur / client */}
                    <div className="flex justify-between gap-10 text-sm">
                        <div>
                            <Badge variant="outline" className="mb-2">Émetteur</Badge>
                            <p className="font-semibold italic">{invoice.issuerName}</p>
                            <p className="text-muted-foreground w-60 break-words">{invoice.issuerAddress}</p>
                            {invoice.shop && (
                                <>
                                    <p className="text-muted-foreground mt-1">Téléphone : {invoice.shop.phone}</p>
                                    <p className="text-muted-foreground">NINEA : {invoice.shop.ninea}</p>
                                </>
                            )}
                        </div>
                        <div className="text-right">
                            <Badge variant="outline" className="mb-2">Client</Badge>
                            <p className="font-semibold italic">{invoice.clientName}</p>
                            <p className="text-muted-foreground w-60 break-words">{invoice.clientAddress}</p>
                        </div>
                    </div>

                    {/* Lignes de facture */}
                    <div className="overflow-x-auto border rounded-md">
                        <table className="w-full text-sm">
                            <thead className="bg-muted">
                                <tr className="text-left">
                                    <th className="p-2">#</th>
                                    <th className="p-2">Produit</th>
                                    <th className="p-2">Quantité</th>
                                    <th className="p-2">Prix Unitaire</th>
                                    <th className="p-2">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoice.lines.map((ligne, index) => (
                                    <tr key={index} className="border-t">
                                        <td className="p-2">{index + 1}</td>
                                        <td className="p-2">{ligne.description}</td>
                                        <td className="p-2">{ligne.quantity}</td>
                                        <td className="p-2">{ligne.unitPrice.toFixed(2)}</td>
                                        <td className="p-2">{(ligne.quantity * ligne.unitPrice).toFixed(2)} CFA</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Totaux */}
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="font-semibold">Total HT</span>
                            <span>{totals.totalHT.toFixed(2)} CFA</span>
                        </div>
                        {invoice.vatActive && (
                            <div className="flex justify-between">
                                <span className="font-semibold">TVA {invoice.vatRate}%</span>
                                <span>{totals.totalVAT.toFixed(2)} CFA</span>
                            </div>
                        )}
                        <div className="flex justify-between items-center font-semibold text-base">
                            <span>Total TTC</span>
                            <Badge variant="default" className="text-base">
                                {totals.totalTTC.toFixed(2)} CFA
                            </Badge>
                        </div>
                    </div>

                    {/* Infos paiement */}
                    <div className="text-right space-y-1 text-sm pt-4 border-t mt-4">
                        <p className="italic text-muted-foreground">
                            Montant total arrêté à la somme de : {numberToFrenchWords(totals.totalTTC)}.
                        </p>
                        <p><strong>Montant reçu :</strong> {invoice.receivedAmount?.toFixed(2) ?? "0"} CFA</p>
                        <p><strong>Montant rendu :</strong> {invoice.changeGiven?.toFixed(2) ?? "0"} CFA</p>
                        <p><strong>Moyen de paiement :</strong> {invoice.paymentMethod ?? "Non spécifié"}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default InvoicePDF
