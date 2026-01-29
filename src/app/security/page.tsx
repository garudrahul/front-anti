"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { API_BASE_URL } from '@/config';
import ResponseViewer from '@/components/ResponseViewer';
import { ShieldAlert, RefreshCw, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function SecurityPage() {
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchLogs = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API_BASE_URL}/honeypot/logs`);
            const data = await res.json();
            if (res.ok) {
                setLogs(Array.isArray(data) ? data : data.logs || []);
            } else {
                setError("Failed to fetch logs: " + (data.message || res.statusText));
            }
        } catch (error) {
            // In demo mode, if backend is offline, we might want to mock some logs or just show error.
            // For now, show network error.
            setError("Network Error: Could not connect to Honeypot Backend.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-800 flex items-center">
                    <ShieldAlert className="w-8 h-8 mr-3 text-red-600" /> Security Monitoring Panel
                </h1>
                <Button onClick={fetchLogs} variant="outline" size="sm" isLoading={loading}>
                    <RefreshCw className="w-4 h-4 mr-2" /> Refresh Logs
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card className="border-red-200 bg-red-50">
                    <CardContent className="pt-6">
                        <div className="text-red-600 font-bold text-3xl">{logs.length}</div>
                        <div className="text-red-800 text-sm font-medium">Detected Threats</div>
                    </CardContent>
                </Card>
                <Card className="border-orange-200 bg-orange-50">
                    <CardContent className="pt-6">
                        <div className="text-orange-600 font-bold text-3xl">Active</div>
                        <div className="text-orange-800 text-sm font-medium">Honeypot Status</div>
                    </CardContent>
                </Card>
                <Card className="border-blue-200 bg-blue-50">
                    <CardContent className="pt-6">
                        <div className="text-blue-600 font-bold text-3xl">Live</div>
                        <div className="text-blue-800 text-sm font-medium">Classification Mode</div>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-slate-300 shadow-md">
                <CardHeader className="bg-slate-900 text-slate-100 rounded-t-xl border-b border-slate-700">
                    <CardTitle className="flex items-center text-slate-100 font-mono text-sm">
                        <Terminal className="w-5 h-5 mr-2" /> /var/log/honeypot/attacks.log
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0 bg-slate-950 rounded-b-xl overflow-hidden min-h-[400px]">
                    {loading ? (
                        <div className="p-8 text-slate-400 font-mono text-sm text-center">Loading logs from secure server...</div>
                    ) : error ? (
                        <div className="p-8 text-red-400 font-mono text-sm text-center border-l-4 border-red-600 bg-red-900/10">
                            {error}
                            <br />
                            <span className="text-slate-500 text-xs mt-2 block">Check console or src/config.ts to verify backend connection.</span>
                        </div>
                    ) : logs.length === 0 ? (
                        <div className="p-8 text-green-400 font-mono text-sm text-center">No active threats detected in current session.</div>
                    ) : (
                        <div className="overflow-x-auto text-xs font-mono">
                            <table className="w-full text-left text-slate-300">
                                <thead className="bg-slate-800 text-slate-400 uppercase">
                                    <tr>
                                        <th className="px-4 py-3">Timestamp</th>
                                        <th className="px-4 py-3">Source IP</th>
                                        <th className="px-4 py-3">Attack Type</th>
                                        <th className="px-4 py-3">Payload</th>
                                        <th className="px-4 py-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800">
                                    {logs.map((log, i) => (
                                        <tr key={i} className="hover:bg-slate-900 transition-colors">
                                            <td className="px-4 py-3 text-slate-500">{new Date(log.timestamp).toLocaleString()}</td>
                                            <td className="px-4 py-3 text-cyan-400">{log.ip}</td>
                                            <td className="px-4 py-3 text-yellow-400 font-bold">{log.type}</td>
                                            <td className="px-4 py-3 text-slate-400 max-w-xs truncate" title={JSON.stringify(log.payload)}>{JSON.stringify(log.payload)}</td>
                                            <td className="px-4 py-3">
                                                <span className="bg-red-900/50 text-red-400 border border-red-900 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
                                                    Blocked
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>

            <div className="text-center text-slate-400 text-sm mt-4">
                Real-time attack data visualization powered by AI Adaptive Honeypot.
            </div>
        </div>
    );
}
