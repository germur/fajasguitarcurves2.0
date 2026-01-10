import { Search, X, ArrowRight, TrendingUp } from 'lucide-react';
import { useStore } from '../hooks/useStoreContext';
import { useEffect, useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export function SearchModal() {
    const { isSearchOpen, toggleSearch, products } = useStore();
    const [query, setQuery] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    // Reset query when closed
    useEffect(() => {
        if (!isSearchOpen) {
            const timer = setTimeout(() => setQuery(''), 300); // Wait for animation
            return () => clearTimeout(timer);
        }
    }, [isSearchOpen]);

    // Animation & Focus Logic
    useEffect(() => {
        if (isSearchOpen) {
            requestAnimationFrame(() => setIsAnimating(true));
            document.body.style.overflow = 'hidden';
            // Auto-focus input
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            const timer = setTimeout(() => setIsAnimating(false), 300);
            document.body.style.overflow = 'unset';
            return () => clearTimeout(timer);
        }
    }, [isSearchOpen]);

    // Close on Escape
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') toggleSearch();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [toggleSearch]);

    // Semantic Search Logic
    const searchResults = useMemo(() => {
        if (!query.trim()) return [];

        const normalizedQuery = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        // Simple Synonym Dictionary
        const synonyms: Record<string, string[]> = {
            'girdle': ['faja', 'shapewear'],
            'faja': ['girdle', 'shapewear'],
            'levanta cola': ['butt lifter', 'bbl'],
            'postparto': ['postpartum', 'mommy makeover'],
            'lipo': ['liposuction', '360'],
            'stage 2': ['segunda etapa'],
        };

        // Expand query with synonyms
        let searchTerms = [normalizedQuery];
        Object.entries(synonyms).forEach(([key, values]) => {
            if (normalizedQuery.includes(key)) {
                searchTerms = [...searchTerms, ...values];
            }
        });

        return products.filter(product => {
            const title = product.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const category = product.category?.toLowerCase() || '';
            // Assuming tags might be available in raw data, but if not, title/category match is robust

            return searchTerms.some(term =>
                title.includes(term) || category.includes(term)
            );
        }).slice(0, 5); // Limit to top 5 results
    }, [query, products]);

    const handleNavigate = (id: string) => {
        navigate(`/store/products/${id}`);
        toggleSearch();
    };

    if (!isAnimating && !isSearchOpen) return null;

    return (
        <div className="fixed inset-0 z-[70] flex flex-col">
            {/* Backdrop */}
            <div
                className={`
                    absolute inset-0 bg-[#2C2420]/90 backdrop-blur-md transition-opacity duration-300
                    ${isSearchOpen ? 'opacity-100' : 'opacity-0'}
                `}
                onClick={toggleSearch}
            />

            {/* Content Container */}
            <div
                className={`
                    relative w-full max-w-3xl mx-auto pt-24 px-6 transition-all duration-300
                    ${isSearchOpen ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}
                `}
            >
                {/* Search Bar */}
                <div className="relative mb-8">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D1AB66] w-6 h-6" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Busca 'Etapa 2', 'BBL', o 'Shorts'..."
                        className="w-full bg-transparent border-b-2 border-stone-600 text-3xl font-serif text-[#F5EDDF] placeholder:text-stone-600 py-4 pl-14 pr-12 focus:outline-none focus:border-[#D1AB66] transition-colors"
                    />
                    <button
                        onClick={toggleSearch}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-stone-500 hover:text-[#F5EDDF] transition-colors"
                    >
                        <X className="w-8 h-8" />
                    </button>
                </div>

                {/* Results Area */}
                <div className="min-h-[300px]">
                    {query.trim() === '' ? (
                        // Zero State / Suggestions
                        <div className="text-stone-400">
                            <div className="flex items-center gap-2 mb-4 text-[#D1AB66] text-sm font-bold uppercase tracking-wider">
                                <TrendingUp className="w-4 h-4" />
                                <span>Tendencias</span>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {['Faja Etapa 2', 'Almohada BBL', 'Mentonera', 'Tabla Abdominal'].map(term => (
                                    <button
                                        key={term}
                                        onClick={() => setQuery(term)}
                                        className="px-4 py-2 rounded-full border border-stone-700 text-sm hover:border-[#D1AB66] hover:text-[#D1AB66] transition-colors"
                                    >
                                        {term}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : searchResults.length > 0 ? (
                        // Results List
                        <div className="space-y-4">
                            {searchResults.map((product) => (
                                <div
                                    key={product.id}
                                    onClick={() => handleNavigate(product.id)}
                                    className="group flex items-center gap-4 bg-white/5 hover:bg-white/10 p-4 rounded-xl cursor-pointer transition-all border border-transparent hover:border-[#D1AB66]/30"
                                >
                                    {/* Thumbnail */}
                                    <div className="w-16 h-16 bg-white rounded-lg overflow-hidden shrink-0">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <h4 className="text-[#F5EDDF] font-bold text-lg group-hover:text-[#D1AB66] transition-colors">
                                            {product.title}
                                        </h4>
                                        <div className="flex items-center gap-3 mt-1">
                                            <span className="text-stone-400 text-sm">${product.price}</span>
                                            {/* Mock Stage Badge if applicable */}
                                            {product.title.toLowerCase().includes('stage 2') && (
                                                <span className="text-[10px] bg-[#D1AB66] text-[#2C2420] px-2 py-0.5 rounded-full font-bold">
                                                    STAGE 2
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <ArrowRight className="w-5 h-5 text-stone-600 group-hover:text-[#D1AB66] -translate-x-4 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        // No Results
                        <div className="text-center pt-12 text-stone-500">
                            <p className="text-lg">No se encontraron resultados para "{query}"</p>
                            <p className="text-sm mt-2">Intenta verificar tu ortografía o usa un término más general.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
