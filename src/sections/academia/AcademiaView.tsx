import { useState } from 'react';
import { BookOpen, Search, ArrowRight, UserCheck } from 'lucide-react';
import data from '../../storefront/data/sources/wiki.json';
import { WikiLayout } from '../../storefront/components/academy/WikiLayout';
import { GlossaryTooltip } from '../../storefront/components/academy/GlossaryTooltip';

// Types
interface Article {
    id: string;
    slug: string;
    title: string;
    category: string;
    summary: string;
    readTime: string;
    content: string;
    toc?: string[];
}

interface GlossaryTerm {
    term: string;
    definition: string;
}

const articles: Article[] = (data as unknown as { articles: Article[] }).articles;
const glossary: GlossaryTerm[] = (data as unknown as { glossary: GlossaryTerm[] }).glossary;

export default function AcademiaView() {
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

    // Helper to highlight glossary terms in text
    // In a real app, this would be more robust. Here we do simple replacement for demo.
    const renderContentWithTooltips = (content: string) => {
        return <div className="mb-4 prose prose-stone max-w-none" dangerouslySetInnerHTML={{ __html: content }} />;
    };

    if (selectedArticle) {
        return (
            <div className="bg-[#FAF9F6] min-h-screen">
                <div className="bg-[#2C2420] text-[#F5EDDF] py-4 px-6 sticky top-0 z-50 flex items-center justify-between">
                    <button
                        onClick={() => setSelectedArticle(null)}
                        className="text-sm font-bold flex items-center gap-2 hover:text-[#D1AB66] transition-colors"
                    >
                        ← Back to Library
                    </button>
                    <span className="font-serif italic text-stone-400 text-sm hidden md:inline">Guitar Tech Institute</span>
                </div>

                <WikiLayout
                    title={selectedArticle.title}
                    category={selectedArticle.category}
                    toc={selectedArticle.toc}
                >
                    <div className="text-xl leading-relaxed text-stone-600 mb-8 font-light border-l-4 border-[#D1AB66] pl-6 italic">
                        {selectedArticle.summary}
                    </div>

                    {/* Content Renderer Mock */}
                    <div className="min-h-[500px]">
                        {renderContentWithTooltips(selectedArticle.content)}

                        <h3 id="interactive-demo" className="text-2xl font-bold mt-12 mb-4">Interactive Terminology</h3>
                        <p className="mb-4">
                            Recovery often involves complex terms like <GlossaryTooltip term="Fibrosis" definition={glossary.find(g => g.term === 'Fibrosis')?.definition || ''} /> or managing a <GlossaryTooltip term="Seroma" definition={glossary.find(g => g.term === 'Seroma')?.definition || ''} />.
                            It's crucial to understand the role of <GlossaryTooltip term="Powernet" definition={glossary.find(g => g.term === 'Powernet')?.definition || ''} /> in your garment.
                        </p>
                    </div>
                </WikiLayout>
            </div>
        )
    }

    return (
        <div className="bg-[#FAF9F6] min-h-screen pb-20 font-sans animate-fade-in">
            {/* Header */}
            <div className="bg-[#2C2420] pt-24 pb-20 px-6 text-center relative overflow-hidden">
                <div className="relative z-10 max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-bold mb-6 tracking-wide text-[#F5EDDF]">
                        <BookOpen size={14} />
                        <span>GUITAR TECH INSTITUTE</span>
                    </div>
                    <h1 className="font-serif text-5xl md:text-6xl text-[#F5EDDF] font-bold mb-8">
                        The Knowledge Base.
                    </h1>

                    {/* Search Bar */}
                    <div className="max-w-xl mx-auto relative group">
                        <div className="absolute inset-0 bg-[#D1AB66] rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
                        <input
                            type="text"
                            placeholder="What are you recovering from? (e.g. Lipo, BBL...)"
                            className="w-full pl-6 pr-12 py-4 rounded-full bg-white text-[#2C2420] placeholder:text-stone-400 focus:outline-none focus:ring-4 focus:ring-[#D1AB66]/50 shadow-2xl relative z-10 font-medium"
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#2C2420] text-[#D1AB66] p-2 rounded-full z-10 hover:bg-[#A35944] hover:text-white transition-colors">
                            <Search className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Decor */}
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay pointer-events-none" />
            </div>

            {/* Library Grid */}
            <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-10">
                <div className="grid md:grid-cols-3 gap-8">
                    {articles.map((article) => (
                        <button
                            key={article.id}
                            onClick={() => setSelectedArticle(article)}
                            className="bg-white rounded-2xl p-8 shadow-xl text-left hover:-translate-y-2 transition-transform duration-300 group border border-stone-100 flex flex-col h-full"
                        >
                            <span className="text-[#D1AB66] font-bold text-xs uppercase tracking-widest mb-4 block">
                                {article.category}
                            </span>
                            <h3 className="font-serif text-2xl font-bold text-[#2C2420] mb-3 group-hover:text-[#A35944] transition-colors leading-tight">
                                {article.title}
                            </h3>
                            <p className="text-stone-500 mb-6 line-clamp-3 text-sm leading-relaxed flex-1">
                                {article.summary}
                            </p>

                            <div className="flex items-center justify-between pt-6 border-t border-stone-100 w-full mt-auto">
                                <span className="text-xs font-bold text-stone-400 uppercase">{article.readTime} Read</span>
                                <span className="w-8 h-8 rounded-full bg-[#FAF9F6] flex items-center justify-center group-hover:bg-[#2C2420] group-hover:text-white transition-colors">
                                    <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Trusted Stamp */}
            <div className="mt-24 text-center pb-12">
                <div className="inline-flex items-center gap-3 opacity-50 grayscale hover:grayscale-0 transition-all cursor-default">
                    <UserCheck className="w-8 h-8 text-[#D1AB66]" />
                    <div className="text-left">
                        <p className="font-bold text-[#2C2420] text-sm">Medically Reviewed</p>
                        <p className="text-xs text-stone-400">Board Certified Protocols</p>
                    </div>
                </div>
            </div>

        </div>
    );
}
