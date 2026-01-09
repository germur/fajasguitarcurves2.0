import type { ReactNode } from 'react';
import { Search } from 'lucide-react';

interface WikiLayoutProps {
    children: ReactNode;
    toc?: string[];
    title: string;
    category?: string;
}

export function WikiLayout({ children, toc, title, category }: WikiLayoutProps) {
    return (
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Left Sidebar: Sticky Nav / TOC */}
            <aside className="lg:col-span-3 hidden lg:block">
                <div className="sticky top-24 space-y-8">
                    {/* Search Widget */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search Knowledge Base..."
                            className="w-full pl-10 pr-4 py-3 bg-[#FAF9F6] border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D1AB66]"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4" />
                    </div>

                    {/* Table of Contents */}
                    {toc && toc.length > 0 && (
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-4">On This Page</h4>
                            <ul className="space-y-3 border-l-2 border-stone-100">
                                {toc.map((item, idx) => (
                                    <li key={idx} className="pl-4 -ml-[2px] border-l-2 border-transparent hover:border-[#D1AB66]">
                                        <a href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-stone-500 hover:text-[#2C2420] text-sm block py-1 transition-colors">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="lg:col-span-9 bg-white">
                <header className="mb-8 pb-8 border-b border-stone-100">
                    {category && (
                        <span className="text-[#D1AB66] font-bold text-xs uppercase tracking-widest mb-4 block">
                            {category}
                        </span>
                    )}
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#2C2420] mb-6">
                        {title}
                    </h1>
                </header>

                <article className="prose prose-stone prose-lg max-w-none prose-headings:font-serif prose-headings:text-[#2C2420] prose-a:text-[#A35944]">
                    {children}
                </article>
            </main>

        </div>
    );
}
