"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import ResponseViewer from '@/components/ResponseViewer';
import { API_BASE_URL } from '@/config';
import { Search as SearchIcon } from 'lucide-react';

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState<{ status: number | null; data: any | null; loading: boolean }>({
        status: null,
        data: null,
        loading: false
    });

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setResponse({ ...response, loading: true });

        try {
            const res = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`);
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
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <SearchIcon className="w-5 h-5 mr-2 text-blue-600" /> Transaction Search
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSearch} className="flex gap-4">
                        <div className="flex-1">
                            <Input
                                id="search"
                                placeholder="Search by Transaction ID, Description or Date..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="mb-0" // override default mb-4
                            />
                        </div>
                        <Button type="submit" isLoading={response.loading}>
                            Search
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {response.data && (
                <Card>
                    <CardHeader>
                        <CardTitle>Search Results for "{query}"</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {Array.isArray(response.data.results) && response.data.results.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                                        <tr>
                                            <th className="px-4 py-3">ID</th>
                                            <th className="px-4 py-3">Description</th>
                                            <th className="px-4 py-3 text-right">Amount</th>
                                            <th className="px-4 py-3 text-center">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {response.data.results.map((tx: any, i: number) => (
                                            <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                                                <td className="px-4 py-3 font-mono text-xs text-slate-500">{tx.id || 'TXN...'}</td>
                                                <td className="px-4 py-3 font-medium text-slate-900">{tx.description}</td>
                                                <td className={`px-4 py-3 text-right font-mono ${tx.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                                                    {tx.amount < 0 ? '-' : '+'}${Math.abs(tx.amount).toFixed(2)}
                                                </td>
                                                <td className="px-4 py-3 text-center text-slate-600">{tx.date}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-8 text-slate-500">
                                {response.loading ? 'Searching...' : 'No transactions found matching criteria.'}
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}

            <ResponseViewer status={response.status} data={response.data} loading={response.loading} />
        </div>
    );
}
