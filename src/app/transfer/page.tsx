"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import ResponseViewer from '@/components/ResponseViewer';
import { API_BASE_URL } from '@/config';
import { Send, AlertCircle } from 'lucide-react';

export default function TransferPage() {
    const [formData, setFormData] = useState({
        beneficiaryAccount: '',
        ifscCode: '',
        amount: '',
        remarks: ''
    });
    const [response, setResponse] = useState<{ status: number | null; data: any | null; loading: boolean }>({
        status: null,
        data: null,
        loading: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setResponse({ ...response, loading: true });

        try {
            const res = await fetch(`${API_BASE_URL}/transfer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            setResponse({ status: res.status, data, loading: false });
        } catch (error) {
            setResponse({
                status: 500,
                data: { error: "Network Error", details: String(error) },
                loading: false
            });
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start">
                <AlertCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                    <p className="font-semibold">Security Notice</p>
                    <p>Please verify the beneficiary details carefully. Transactions once initiated cannot be reversed.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Send className="w-5 h-5 mr-2 text-blue-600" /> Initiate Fund Transfer
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                id="beneficiaryAccount"
                                label="Beneficiary Account Number"
                                placeholder="10-15 digit number"
                                value={formData.beneficiaryAccount}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                id="ifscCode"
                                label="IFSC / Swift Code"
                                placeholder="e.g. BANK0001234"
                                value={formData.ifscCode}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <Input
                            id="amount"
                            label="Amount to Transfer"
                            type="number"
                            placeholder="0.00"
                            value={formData.amount}
                            onChange={handleChange}
                            required
                        />

                        <Input
                            id="remarks"
                            label="Remarks / Reference"
                            placeholder="Enter remarks (Max 100 chars)"
                            value={formData.remarks}
                            onChange={handleChange}
                        />
                        <p className="text-xs text-slate-500 -mt-3 mb-4">* Remarks field can accept special characters for internal processing.</p>

                        <Button type="submit" className="w-full" isLoading={response.loading}>
                            Transfer Funds
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <ResponseViewer status={response.status} data={response.data} loading={response.loading} />
        </div>
    );
}
