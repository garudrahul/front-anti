import Link from 'next/link';
import Image from 'next/image';
import { ShieldAlert } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="bg-blue-900 text-white shadow-lg mt-10"> {/* Margin top to account for fixed banner */}
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-3">
                        <div className="bg-white p-1 rounded-full">
                            <Image
                                src="/logo.png"
                                alt="SecureBank Logo"
                                width={32}
                                height={32}
                                className="w-8 h-8 rounded-full"
                            />
                        </div>
                        <span className="text-xl font-bold tracking-tight">SecureBank AI</span>
                    </div>
                    <div className="hidden md:flex space-x-6">
                        <Link href="/dashboard" className="hover:text-blue-300 transition-colors">Dashboard</Link>
                        <Link href="/transfer" className="hover:text-blue-300 transition-colors">Transfer</Link>
                        <Link href="/search" className="hover:text-blue-300 transition-colors">Search</Link>
                        <Link href="/support" className="hover:text-blue-300 transition-colors">Support</Link>
                        <Link href="/security" className="hover:text-blue-300 transition-colors text-red-300 font-semibold">Security Monitor</Link>
                    </div>
                    <div>
                        <Link href="/login" className="bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded text-sm transition-colors">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
