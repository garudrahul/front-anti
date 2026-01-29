import React from 'react';
import { CheckCircle, AlertTriangle, Activity } from 'lucide-react';

interface ResponseViewerProps {
    status: number | null;
    data: any | null;
    loading?: boolean;
}

export default function ResponseViewer({ status, data, loading }: ResponseViewerProps) {
    if (loading) {
        return (
            <div className="mt-8 p-6 border border-blue-100 rounded-lg bg-blue-50 animate-pulse flex items-center justify-center text-blue-800">
                <Activity className="w-5 h-5 mr-2 animate-spin" /> Processing Request...
            </div>
        );
    }

    if (status === null && !data) return null;

    // Simple heuristic for demo: If status is 403 or data contains "honeypot", it's TRAPPED.
    // Ideally, the backend should return a flag. I'll assume the backend returns `is_honeypot` or we detect it.
    // For this "Realistic" app, let's assume if it's not success (200-299), it might be flagged.
    // Or check specific fields. The user requirement says "Routing Decision Badge".
    // Let's look for a fake header or field in data.
    const isHoneypot = data?.link === "honeypot" || data?.trapped === true || (status !== 200 && status !== 201);
    // Actually, I'll allow the parent to pass "isTrapped" potentially? 
    // But given requirements "Simulated Traffic", let's make it look authentic.
    // I will check if data has a specific field `security_log_id` or similar which implies tracking.

    // Requirement: "Routing Decision Badge: GREEN: REAL BACKEND, RED: HONEYPOT TRAPPED"
    // Let's check a property `routed_to` if it exists, or just use status code logic for now.
    // User didn't specify the backend response format. I'll default to Safe unless status indicates error.

    const isTrapped = data?.routed_to === 'honeypot' || status === 403 || status === 401;

    return (
        <div className="mt-8 border rounded-lg overflow-hidden shadow-sm bg-white">
            <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex justify-between items-center">
                <h3 className="text-sm font-semibold text-slate-700">Backend Response Monitor</h3>
                <div className="flex items-center space-x-2">
                    <span className="text-xs text-slate-500 uppercase tracking-wider font-mono">Status: {status}</span>
                    {isTrapped ? (
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded border border-red-200 font-bold flex items-center">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            HONEYPOT TRAPPED
                        </span>
                    ) : (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded border border-green-200 font-bold flex items-center">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            REAL BACKEND
                        </span>
                    )}
                </div>
            </div>
            <div className="p-4 bg-slate-50 font-mono text-xs overflow-x-auto text-slate-700">
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
            <div className="bg-yellow-50 px-4 py-2 border-t border-yellow-100 text-yellow-800 text-xs flex items-center justify-center">
                <Activity className="w-4 h-4 mr-2" />
                This request was analyzed and routed by the AI Detector
            </div>
        </div>
    );
}
