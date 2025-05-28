"use client";
// import { createInvoice } from '@/app/actions'; // Assure-toi que cette action existe
import InvoiceInfo from '@/components/factures/InvoiceInfo';
import InvoiceLines from '@/components/factures/InvoiceLines';
import InvoicePDF from '@/components/factures/InvoicePDF';
import VATControl from '@/components/factures/VATControl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Invoice, Totals } from '@/type';
import { Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function NewInvoicePage() {
    const [invoice, setInvoice] = useState<Invoice>({
        id: '', // Laisser vide, généré côté serveur
        name: '',
        date: new Date().toISOString().split('T')[0],
        dueDate: '',
        status: 1,
        lines: [],
        vatActive: false,
        vatRate: 18
    });

    const [totals, setTotals] = useState<Totals>({
        totalHT: 0,
        totalVAT: 0,
        totalTTC: 0
    });

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const calculateTotals = (inv: Invoice) => {
        const ht = inv.lines.reduce(
            (acc, { quantity, unitPrice }) => acc + quantity * unitPrice,
            0
        );
        const vat = inv.vatActive ? ht * (inv.vatRate / 100) : 0;
        setTotals({
            totalHT: ht,
            totalVAT: vat,
            totalTTC: ht + vat
        });
    };

    useEffect(() => {
        calculateTotals(invoice);
    }, [invoice]);

    const handleSave = async () => {
        setIsLoading(true);
        try {
            // const newInvoice = await createInvoice(invoice);
            // if (newInvoice?.id) {
            //     router.push(`/factures/${newInvoice.id}`);
            // }
        } catch (error) {
            console.error("Erreur lors de la création :", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">

                <div className="space-y-2">
                    <Label htmlFor="invoice-name">Nom de la facture</Label>
                    <Input
                        id="invoice-name"
                        type="text"
                        placeholder="Nom de la facture"
                        className="w-full max-w-md"
                        value={invoice.name}
                        onChange={(e) => setInvoice({ ...invoice, name: e.target.value })}
                    />
                </div>

                <div className="flex md:mt-0 mt-4">
                    <button
                        className="btn btn-sm btn-accent"
                        disabled={isLoading}
                        onClick={handleSave}
                    >
                        {isLoading ? (
                            <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                            <>
                                Créer la facture
                                <Save className="w-4 ml-2" />
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row w-full">
                <div className="flex w-full md:w-1/3 flex-col">
                    <Card className="mb-4">
                        <CardHeader className="flex flex-row justify-between items-center">
                            <CardTitle className="text-base font-semibold">Résumé des Totaux</CardTitle>
                            <VATControl invoice={invoice} setInvoice={setInvoice} />
                        </CardHeader>

                        <CardContent className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span>Total Hors Taxes</span>
                                <span className="font-medium">{totals.totalHT.toFixed(2)} CFA</span>
                            </div>

                            <div className="flex justify-between">
                                <span>TVA ({invoice.vatActive ? invoice.vatRate : 0} %)</span>
                                <span className="font-medium">{totals.totalVAT.toFixed(2)} CFA</span>
                            </div>

                            <div className="flex justify-between font-semibold">
                                <span>Total TTC</span>
                                <span>{totals.totalTTC.toFixed(2)} CFA</span>
                            </div>
                        </CardContent>
                    </Card>


                    <InvoiceInfo invoice={invoice} setInvoice={setInvoice} />
                </div>

                <div className="flex w-full md:w-2/3 flex-col md:ml-4">
                    <InvoiceLines invoice={invoice} setInvoice={setInvoice} />
                    <InvoicePDF invoice={invoice} totals={totals} />
                </div>
            </div>
        </div>
    );
}
