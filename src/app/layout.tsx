import type { Metadata } from 'next';
import './globals.css';
import Banner from '@/components/Banner';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'SecureBank AI - Online Banking',
  description: 'Secure Online Banking Application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen flex flex-col font-sans antialiased text-slate-900">
        <Banner />
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8 relative z-0">
          {children}
        </main>
        <footer className="bg-slate-100 border-t border-slate-200 py-6 mt-12">
          <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
            <p className="font-semibold mb-1">SecureBank AI System</p>
            <p>Traffic analyzed and routed by AI Detector</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
