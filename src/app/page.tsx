import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { ShieldCheck, Lock, Globe } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="text-center max-w-2xl mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Welcome to SecureBank AI</h1>
        <p className="text-lg text-slate-600">
          Experience the future of secure online banking. Our advanced systems ensure your transactions are safe and monitored in real-time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mb-12">
        <Card className="text-center hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="text-blue-600 w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Advanced Security</h3>
            <p className="text-slate-500 text-sm">Real-time threat detection and prevention systems.</p>
          </CardContent>
        </Card>
        <Card className="text-center hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="text-blue-600 w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Encrypted Data</h3>
            <p className="text-slate-500 text-sm">End-to-end encryption for all your financial data.</p>
          </CardContent>
        </Card>
        <Card className="text-center hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="text-blue-600 w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Global Access</h3>
            <p className="text-slate-500 text-sm">Access your funds securely from anywhere in the world.</p>
          </CardContent>
        </Card>
      </div>

      <Link
        href="/login"
        className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
      >
        Login to Internet Banking
      </Link>
    </div>
  );
}
