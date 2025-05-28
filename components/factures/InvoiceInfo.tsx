"use client";

import { Invoice } from '@/type';
import React, { useEffect } from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

interface Props {
    invoice: Invoice;
    setInvoice: (invoice: Invoice) => void;
}

const InvoiceInfo: React.FC<Props> = ({ invoice, setInvoice }) => {
    useEffect(() => {
        if (invoice?.shop) {
            const updates: Partial<Invoice> = {};

            if (!invoice.issuerName) updates.issuerName = invoice.shop.name;
            if (!invoice.issuerAddress) updates.issuerAddress = invoice.shop.address;

            if (Object.keys(updates).length > 0) {
                setInvoice({ ...invoice, ...updates });
            }
        }
    }, [invoice, setInvoice]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        field: keyof Invoice
    ) => {
        setInvoice({ ...invoice, [field]: e.target.value });
    };

    return (
        <Card className="flex flex-col h-fit p-5 rounded-xl mb-4 bg-white dark:bg-muted/40">
            <CardContent className="space-y-6 p-0">
                {/* Émetteur */}
                <div className="space-y-2">
                    <Badge variant="default" className="bg-accent text-accent-foreground">Émetteur</Badge>

                    <Input
                        type="text"
                        value={invoice?.issuerName || ''}
                        placeholder="Nom de l’entreprise émettrice"
                        required
                        onChange={(e) => handleInputChange(e, 'issuerName')}
                    />

                    <Textarea
                        value={invoice?.issuerAddress || ''}
                        placeholder="Adresse de l’entreprise émettrice"
                        required
                        className="h-32"
                        onChange={(e) => handleInputChange(e, 'issuerAddress')}
                    />

                    {invoice?.shop && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <Input
                                type="text"
                                value={invoice.shop.phone}
                                readOnly
                            />
                            <Input
                                type="text"
                                value={invoice.shop.ninea}
                                readOnly
                            />
                        </div>
                    )}
                </div>

                {/* Client */}
                <div className="space-y-2">
                    <Badge variant="default" className="bg-accent text-accent-foreground">Client</Badge>

                    <Input
                        type="text"
                        value={invoice?.clientName || ''}
                        placeholder="Nom du client"
                        required
                        onChange={(e) => handleInputChange(e, 'clientName')}
                    />

                    <Textarea
                        value={invoice?.clientAddress || ''}
                        placeholder="Adresse du client"
                        required
                        className="h-32"
                        onChange={(e) => handleInputChange(e, 'clientAddress')}
                    />
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Badge variant="default" className="bg-accent text-accent-foreground">Date de la Facture</Badge>
                        <Input
                            type="date"
                            value={invoice?.invoiceDate || ''}
                            required
                            onChange={(e) => handleInputChange(e, 'invoiceDate')}
                        />
                    </div>

                    <div className="space-y-2">
                        <Badge variant="default" className="bg-accent text-accent-foreground">Date d’échéance</Badge>
                        <Input
                            type="date"
                            value={invoice?.dueDate || ''}
                            required
                            onChange={(e) => handleInputChange(e, 'dueDate')}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>

    );
};

export default InvoiceInfo;
