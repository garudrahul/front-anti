"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import ResponseViewer from '@/components/ResponseViewer';
import { API_BASE_URL } from '@/config';
import { Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        accountNumber: '',
        username: '',
        password: ''
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
            const res = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            setResponse({ status: res.status, data, loading: false });

            // If success, maybe redirect, but for this demo we show the response primarily.
            // If it's a real app, we would store token. Here we rely on "No authentication persistence".
            // But we can redirect to dashboard for UX if successful.
            if (res.ok) {
                // Optional: Redirect after delay or let user click
                // router.push('/dashboard');
            }

        } catch (error) {
            setResponse({
                status: 500,
                data: { error: "Network Error", details: error instanceof Error ? error.message : String(error) },
                loading: false
            });
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <Card>
                <CardHeader className="text-center bg-slate-50">
                    <div className="mx-auto bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                        <Lock className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle>Secure Login</CardTitle>
                    <p className="text-sm text-slate-500 mt-1">Enter your credentials to access your account</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            id="accountNumber"
                            label="Account Number"
                            placeholder="e.g. 1234567890"
                            value={formData.accountNumber}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            id="username"
                            label="Username"
                            placeholder="Enter your username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            id="password"
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <Button type="submit" className="w-full" isLoading={response.loading}>
                            Secure Login
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <ResponseViewer status={response.status} data={response.data} loading={response.loading} />
        </div>
    );
}
