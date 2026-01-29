"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { API_BASE_URL } from '@/config';
import ResponseViewer from '@/components/ResponseViewer';
import { CreditCard, DollarSign, Activity } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function DashboardPage() {
    const [data, setData] = useState<any>(null);
    const [status, setStatus] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchDashboard = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/dashboard`);
            const jsonData = await res.json();
            setStatus(res.status);
            setData(jsonData);
        } catch (error) {
            setStatus(500);
            setData({ error: "Network Error", details: String(error) });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-800">Account Dashboard</h1>
                <Button onClick={fetchDashboard} variant="outline" size="sm">
                    Refresh Data
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-gradient-to-br from-blue-600 to-blue-800 text-white border-0">
                    <CardHeader className="border-blue-500/30">
                        <CardTitle className="text-blue-100 flex items-center">
                            <CreditCard className="w-5 h-5 mr-2" /> Account Summary
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <p className="text-blue-200 text-sm">Account Holder</p>
                                <p className="text-2xl font-semibold">{data?.account_holder || "Loading..."}</p>
                            </div>
                            <div>
                                <p className="text-blue-200 text-sm">Account Number</p>
                                <p className="font-mono">{data?.account_number || "•••• •••• ••••"}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center text-slate-700">
                            <DollarSign className="w-5 h-5 mr-2 text-green-600" /> Current Balance
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col justify-center h-40">
                        <p className="text-4xl font-bold text-slate-900">
                            {data?.currency || "$"} {data?.balance ? data.balance.toLocaleString() : "---"}
                        </p>
                        <p className="text-slate-500 text-sm mt-2">Available for immediate transfer</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Activity className="w-5 h-5 mr-2 text-blue-600" /> Recent Transactions
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {data?.transactions && Array.isArray(data.transactions) ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                                    <tr>
                                        <th className="px-4 py-3">Date</th>
                                        <th className="px-4 py-3">Description</th>
                                        <th className="px-4 py-3 text-right">Amount</th>
                                        <th className="px-4 py-3 text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.transactions.map((tx: any, i: number) => (
                                        <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                                            <td className="px-4 py-3 text-slate-600">{tx.date}</td>
                                            <td className="px-4 py-3 font-medium text-slate-900">{tx.description}</td>
                                            <td className={`px-4 py-3 text-right font-mono ${tx.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                                                {tx.amount < 0 ? '-' : '+'}${Math.abs(tx.amount).toFixed(2)}
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">{tx.status || 'Completed'}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-slate-500 italic">No transaction data available.</p>
                    )}
                </CardContent>
            </Card>

            <ResponseViewer status={status} data={data} loading={loading} />
        </div>
    );
}
