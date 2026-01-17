// import { GlassNavbar } from '../components/GlassNavbar';
// import { DarkFooter } from '../components/DarkFooter';
// import { OutfitMatcher } from '../components/silo-sculpt/OutfitMatcher';
import { SculptProductCard } from '../components/silo-sculpt/SculptProductCard';
import { CurveCalculator } from '../components/silo-sculpt/CurveCalculator';
import { WaistTrainingLab } from '../components/silo-sculpt/WaistTrainingLab';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSculptProducts } from '../hooks/useSculptProducts';
import { FilterSidebar } from '../components/FilterSidebar';
import { SeoHead } from '../../lib/seo/SeoHead';
import { useState, useMemo } from 'react';

// Version: 1.0.3 - Fixed Component Structure & Imports
export default function HourglassPage() {
    const { products, loading, error } = useSculptProducts();

    // Filter State (Advanced)
    const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
        stage: [],
        compression: [],
        occasion: [],
        features: []
    });

    // Handle Filter Change
    const handleFilterChange = (category: string, value: string) => {
        setActiveFilters(prev => {
            const current = prev[category] || [];
            const isSelected = current.includes(value);

            if (isSelected) {
                return { ...prev, [category]: current.filter(v => v !== value) };
            } else {
                return { ...prev, [category]: [...current, value] };
            }
        });
    };

    // Robust Filtering Logic (Sidebar Compatible)
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const checkCategory = (cat: string, value: string | string[]) => {
                const active = activeFilters[cat];
                if (!active || active.length === 0) return true;

                if (Array.isArray(value)) {
                    return value.some(v => active.includes(v));
                }
                return active.includes(value);
            };

            return (
                checkCategory('stage', product.stage) &&
                checkCategory('compression', product.compression) &&
                checkCategory('occasion', product.occasion) &&
                checkCategory('features', product.features)
            );
        });
    }, [products, activeFilters]);

    return (
        <div className="bg-white min-h-screen font-sans selection:bg-[#D4AF37] selection:text-white">
            <SeoHead
                title="The Sculpt Collection | Fajas Reloj de Arena & Cinturillas"
                description="Ingeniería invisible para realzar tus curvas. Explora nuestra línea de fajas de uso diario, waist trainers y shorts levanta cola."
                path="/collections/sculpt"
                image="/assets/hourglass-hero-bg.jpg"
                schema={{
                    type: 'collection',
                    data: {
                        name: 'The Sculpt Collection',
                        description: 'Colección de fajas moldeadoras y waist trainers.'
                    },
                    breadcrumbs: [
                        { name: 'Home', item: '/' },
                        { name: 'Sculpt Studio', item: '/collections/sculpt' }
                    ]
                }}
            />

            {/* Navbar handled by Layout */}

            {/* 1. HERO SECTION: SPLIT LAYOUT (Standardized) */}
            <div className="pt-6 pb-8 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Copy */}
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 bg-[#F5EDDF] text-[#A35944] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                            <span className="text-xs">🛡️</span>
                            Ingeniería Invisible
                        </div>

                        <h1 className="text-4xl lg:text-6xl font-serif font-bold text-[#2C2420] leading-tight capitalize">
                            The Sculpt Collection
                        </h1>

                        <p className="text-xl text-stone-500 font-light border-l-4 border-[#D4AF37] pl-4">
                            Ingeniería invisible para realzar tus curvas. La silueta de reloj de arena definitiva.
                        </p>

                        <div className="flex gap-4 pt-2">
                            <Link to="/fit-finder" className="px-8 py-3 bg-[#2C2420] text-white uppercase tracking-widest text-xs font-bold hover:bg-[#D4AF37] transition-all duration-300 shadow-lg cursor-pointer rounded-lg">
                                Guía de Tallas
                            </Link>
                        </div>
                    </div>

                    {/* Right: Technical Visual */}
                    <div className="relative h-[400px] lg:h-[500px] bg-stone-100 rounded-[2rem] overflow-hidden flex items-center justify-center shadow-lg">
                        <img
                            src="/assets/group-sculpt-hero.jpg"
                            alt="The Sculpt Collection"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="absolute bottom-8 right-8 text-white text-right">
                            <h3 className="font-bold text-2xl font-serif">Sculpt</h3>
                            <p className="text-sm opacity-90 tracking-widest uppercase">Signature Collection</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* SUB-COLLECTION PILLS */}
            <div className="max-w-7xl mx-auto px-6 mb-12">
                <div className="flex flex-wrap gap-3 pb-4 border-b border-stone-100">
                    <button
                        onClick={() => handleFilterChange('features', 'Short')}
                        className={`px-5 py-2 rounded-full text-sm font-bold tracking-wide transition-all ${activeFilters['features']?.includes('Short')
                            ? 'bg-[#2C2420] text-white shadow-md'
                            : 'bg-stone-100 text-stone-600 hover:bg-[#D4AF37] hover:text-white'
                            }`}
                    >
                        Shorts
                    </button>

                    <button
                        onClick={() => handleFilterChange('features', 'Waist Trainer')}
                        className={`px-5 py-2 rounded-full text-sm font-bold tracking-wide transition-all ${activeFilters['features']?.includes('Waist Trainer')
                            ? 'bg-[#2C2420] text-white shadow-md'
                            : 'bg-stone-100 text-stone-600 hover:bg-[#D4AF37] hover:text-white'
                            }`}
                    >
                        Waist Trainers
                    </button>

                    <button
                        onClick={() => handleFilterChange('features', 'Strapless')}
                        className={`px-5 py-2 rounded-full text-sm font-bold tracking-wide transition-all ${activeFilters['features']?.includes('Strapless')
                            ? 'bg-[#2C2420] text-white shadow-md'
                            : 'bg-stone-100 text-stone-600 hover:bg-[#D4AF37] hover:text-white'
                            }`}
                    >
                        Strapless
                    </button>

                    <button
                        onClick={() => handleFilterChange('compression', 'Alta')}
                        className={`px-5 py-2 rounded-full text-sm font-bold tracking-wide transition-all ${activeFilters['compression']?.includes('Alta')
                            ? 'bg-[#2C2420] text-white shadow-md'
                            : 'bg-stone-100 text-stone-600 hover:bg-[#D4AF37] hover:text-white'
                            }`}
                    >
                        High Compression
                    </button>
                </div>
            </div>

            {/* 3. PRODUCT GRID WITH SIDEBAR */}
            <div className="bg-white py-12 px-4 md:px-8">
                <div className="max-w-[1600px] mx-auto">

                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                        {/* SIDEBAR FILTER */}
                        <aside className="w-full lg:w-64 flex-shrink-0 hidden lg:block">
                            <FilterSidebar
                                products={products}
                                activeFilters={activeFilters}
                                onFilterChange={handleFilterChange}
                            />
                        </aside>

                        {/* PRODUCT GRID */}
                        <div className="flex-1 w-full">
                            {loading ? (
                                <div className="flex justify-center py-20">
                                    <Loader2 className="animate-spin text-[#D4AF37]" size={40} />
                                </div>
                            ) : error ? (
                                <div className="py-20 text-center text-red-500">
                                    <p className="text-xl font-bold">Error Loading Products</p>
                                    <p className="text-sm mt-2">{error}</p>
                                    <p className="text-xs text-gray-500 mt-4">Please check Shopify Storefront API permissions.</p>
                                </div>
                            ) : (
                                <>
                                    <div id="products" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12">
                                        {filteredProducts.map(product => (
                                            <SculptProductCard
                                                key={product.id}
                                                product={{
                                                    ...product,
                                                    imageProduct: product.image,
                                                    imageResult: product.images && product.images.length > 1 ? product.images[1] : product.image,
                                                    benefit: product.features ? product.features.join(' • ') : 'Sculpting'
                                                }}
                                            />
                                        ))}
                                    </div>
                                    {filteredProducts.length === 0 && (
                                        <div className="py-20 text-center text-gray-400">
                                            <p>No se encontraron productos para esta selección.</p>
                                            <button onClick={() => setActiveFilters({ stage: [], compression: [], occasion: [], features: [] })} className="mt-4 text-[#D4AF37] underline">
                                                Limpiar Filtros
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. WAIST TRAINING LAB */}
            <WaistTrainingLab />

            {/* 5. CURVE CALCULATOR */}
            <CurveCalculator />

            {/* Footer handled by Layout */}
        </div>
    );
}
