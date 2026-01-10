import type { ReactNode } from 'react';
import { ShieldCheck } from 'lucide-react';

interface PolicyLayoutProps {
    title: string;
    lastUpdated?: string;
    children: ReactNode;
}

export function PolicyLayout({ title, lastUpdated, children }: PolicyLayoutProps) {
    return (
        <div className="bg-white min-h-screen pb-20 font-sans text-stone-900">
            {/* Header */}
            <div className="bg-[#FAF9F6] border-b border-stone-100 py-16 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 text-[#D1AB66] font-bold uppercase tracking-widest text-xs mb-4">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Official Policy</span>
                    </div>
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#2C2420] mb-4">
                        {title}
                    </h1>
                    {lastUpdated && (
                        <p className="text-stone-500 text-sm">
                            Last Updated: {lastUpdated}
                        </p>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-6 py-12">
                <div className="prose prose-stone prose-lg max-w-none prose-headings:font-serif prose-headings:text-[#2C2420] prose-a:text-[#A35944] prose-a:font-bold hover:prose-a:text-[#D1AB66]">
                    {children}
                </div>
            </div>
        </div>
    );
}
