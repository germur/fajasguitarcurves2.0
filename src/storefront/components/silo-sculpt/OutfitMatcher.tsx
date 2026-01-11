import { Sparkles } from 'lucide-react';

// Dress -> PartyPopper (Fiesta)
// Jeans -> Sparkles (Daily/Shine) - or maybe 'GalleryVerticalEnd' looks like pants? No.
// Let's stick to Lucide generic concepts or text labels if needed.
// 'Shirt' for Daily?

interface OutfitMatcherProps {
    onFilterChange: (tag: string) => void;
    activeFilter: string;
}

export function OutfitMatcher({ onFilterChange, activeFilter }: OutfitMatcherProps) {
    const categories = [
        { id: 'booty', label: 'Glúteos & Cadera', icon: <span className="text-3xl">🍑</span>, filterTag: 'booty' },
        { id: 'waist', label: 'Cintura & Gym', icon: <span className="text-3xl">⏳</span>, filterTag: 'waist' },
        { id: 'invisible', label: 'Invisible / Strapless', icon: <span className="text-3xl">👗</span>, filterTag: 'invisible' },
        { id: 'all', label: 'Ver Todo', icon: <Sparkles size={32} />, filterTag: 'all' },
    ];

    return (
        <section className="py-12 bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header de Sección */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#050505] mb-3">
                        The Zone Sculptor
                    </h2>
                    <p className="text-gray-500 text-sm tracking-[0.2em] uppercase">
                        Elige tu objetivo, nosotros nos encargamos del resto
                    </p>
                </div>

                {/* Los Filtros Visuales (Círculos) */}
                <div className="flex justify-center gap-4 md:gap-8 mb-8 flex-wrap">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => onFilterChange(cat.filterTag)}
                            className={`flex flex-col items-center group transition-all duration-500 ${activeFilter === cat.filterTag ? 'scale-105 opacity-100' : 'opacity-60 hover:opacity-100'
                                }`}
                        >
                            <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-3 shadow-md border transition-all duration-300 relative overflow-hidden ${activeFilter === cat.filterTag
                                ? 'bg-[#050505] border-[#D4AF37] text-white shadow-[#D4AF37]/20'
                                : 'bg-gray-50 border-gray-100 text-[#050505] group-hover:border-[#D4AF37]/50'
                                }`}>
                                {/* Hover Glow Effect */}
                                <div className={`absolute inset-0 bg-[#D4AF37] opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${activeFilter === cat.filterTag ? 'hidden' : 'block'}`}></div>
                                <div className="scale-75 transform">{cat.icon}</div>
                            </div>
                            <span className={`text-[9px] md:text-[10px] font-bold tracking-widest uppercase transition-colors duration-300 ${activeFilter === cat.filterTag ? 'text-[#050505]' : 'text-gray-400 group-hover:text-[#D4AF37]'
                                }`}>
                                {cat.label}
                            </span>
                        </button>
                    ))}
                </div>

            </div>
        </section>
    );
}
