"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import ResponseViewer from '@/components/ResponseViewer';
import { API_BASE_URL } from '@/config';
import { MessageSquare, LifeBuoy } from 'lucide-react';

export default function SupportPage() {
    const [formData, setFormData] = useState({
        subject: '',
        message: ''
    });
    const [response, setResponse] = useState<{ status: number | null; data: any | null; loading: boolean }>({
        status: null,
        data: null,
        loading: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setResponse({ ...response, loading: true });

        try {
            const res = await fetch(`${API_BASE_URL}/support`, {
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
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <LifeBuoy className="w-5 h-5 mr-2 text-blue-600" /> Contact Support
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="bg-slate-50 p-4 rounded-lg mb-6 border border-slate-100 flex gap-3">
                        <MessageSquare className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-slate-600">
                            Our team is available 24/7. Please describe your issue in detail.
                            For security reasons, do not include passwords in your message.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            id="subject"
                            label="Subject"
                            placeholder="Brief description of the issue"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                        />

                        <div className="w-full mb-4">
                            <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                            <textarea
                                id="message"
                                rows={6}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                                placeholder="Describe your issue here..."
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                            <p className="mt-1 text-xs text-slate-400">HTML or special formatting characters are allowed for technical descriptions.</p>
                        </div>

                        <Button type="submit" className="w-full" isLoading={response.loading}>
                            Send Message
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <ResponseViewer status={response.status} data={response.data} loading={response.loading} />
        </div>
    );
}
