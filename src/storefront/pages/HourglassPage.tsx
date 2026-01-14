import { useState, useMemo, useEffect } from 'react';
// import { GlassNavbar } from '../components/GlassNavbar';
// import { DarkFooter } from '../components/DarkFooter';
import { OutfitMatcher } from '../components/silo-sculpt/OutfitMatcher';
import { SculptProductCard } from '../components/silo-sculpt/SculptProductCard';
import { CurveCalculator } from '../components/silo-sculpt/CurveCalculator';
import { WaistTrainingLab } from '../components/silo-sculpt/WaistTrainingLab';
import { Loader2 } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { useSculptProducts } from '../hooks/useSculptProducts';

import { SeoHead } from '../../lib/seo/SeoHead';

// Version: 1.0.1 - Fixed Missing Products & Routing
export default function HourglassPage() {
    const { products, loading, error } = useSculptProducts();
    const [searchParams] = useSearchParams();
    const urlTag = searchParams.get('tag');

    // Initial state from URL or 'all'
    const [activeFilter, setActiveFilter] = useState(urlTag || 'all');

    // Update if URL changes
    useEffect(() => {
        if (searchParams.get('tag')) {
            setActiveFilter(searchParams.get('tag')!);
        }
    }, [searchParams]);

    // Robust Filtering Logic
    const filteredProducts = useMemo(() => {
        if (activeFilter === 'all') return products;

        return products.filter(p => {
            const tags = p.tags ? p.tags.map((t: string) => t.toLowerCase()) : [];
            const filterLower = activeFilter.toLowerCase(); // Normalized

            // 1. Check strict mapped occasion (Legacy logic)
            if (p.occasion === activeFilter) return true;

            // 2. Check for Specific Presets (Legacy + New Body Zones)
            if (activeFilter === 'booty') {
                return tags.some((t: string) =>
                    t.includes('butt') || t.includes('lifter') || t.includes('short') || t.includes('legging') || t.includes('gluteal')
                );
            }
            if (activeFilter === 'waist') {
                return tags.some((t: string) =>
                    t.includes('waist') || t.includes('gym') || t.includes('cinturilla') || t.includes('chaleco') || t.includes('vest') || t.includes('latex')
                );
            }
            if (activeFilter === 'invisible') {
                return tags.some((t: string) =>
                    t.includes('strapless') || t.includes('invisible') || t.includes('daily') || t.includes('body') || t.includes('seamless')
                );
            }

            // Legacy support if old URLs are hit, though UI doesn't show them
            if (activeFilter === 'dress') return tags.some((t: string) => t.includes('vestido') || t.includes('dress') || t.includes('fiesta') || t.includes('strapless'));
            if (activeFilter === 'jeans') return tags.some((t: string) => t.includes('jeans') || t.includes('diario') || t.includes('daily') || t.includes('invisible') || t.includes('butt') || t.includes('gluteal'));

            // 3. Check for Direct Tag Match (New Linkbuilding Logic)
            // e.g. activeFilter = "Waist Trainer" -> looks for tag "waist trainer"
            return tags.some((t: string) => t === filterLower || t.includes(filterLower));
        });
    }, [products, activeFilter]);

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

            {/* 1. HERO SECTION: DAYLIGHT STUDIO */}
            <div className="relative pt-0 h-[60vh] w-full overflow-hidden bg-[#f4f4f4]">
                {/* Background Image - Clean & Bright */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/assets/hourglass-hero-bg.jpg"
                        alt="Modelo usando Fajas Colombianas Guitar Curves efecto reloj de arena"
                        className="w-full h-full object-cover"
                    />
                    {/* Soft White Gradient for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent"></div>
                </div>

                <div className="relative z-10 h-full flex flex-col justify-center px-6 lg:px-20 max-w-7xl mx-auto">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-stone-900 mb-6 tracking-tighter">
                        The Sculpt
                    </h1>
                    <h2 className="text-xl md:text-2xl font-light text-stone-600 mb-8 tracking-[0.3em] uppercase">
                        Ingeniería Invisible
                    </h2>

                    <div className="flex flex-col md:flex-row gap-4 mt-4">
                        <a href="#products" className="px-8 py-3 bg-stone-900 text-white uppercase tracking-widest text-xs font-bold hover:bg-[#D4AF37] transition-all duration-300 shadow-lg cursor-pointer">
                            Shop Waist Trainers
                        </a>
                        <Link to="/fit-finder" className="px-8 py-3 border border-stone-900 text-stone-900 uppercase tracking-widest text-xs font-bold hover:bg-stone-900 hover:text-white transition-all duration-300">
                            Guía de Tallas
                        </Link>
                    </div>
                </div>
            </div>

            {/* 2. OUTFIT MATCHER (Sticky Header Effect? Maybe just normal section) */}
            <div id="matcher" className="relative z-50 bg-white border-b border-stone-100">
                <OutfitMatcher activeFilter={activeFilter} onFilterChange={setActiveFilter} />
            </div>

            {/* 3. PRODUCT GRID */}
            <div className="bg-white py-12 px-4 md:px-8">
                <div className="max-w-[1600px] mx-auto">
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
                            {/* Denser Grid: 1 col mobile, 2 cols tablet, 4 cols desktop, 5 cols large screens */}
                            <div id="products" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-12">
                                {filteredProducts.map(product => (
                                    <SculptProductCard
                                        key={product.id}
                                        product={{
                                            ...product,
                                            imageProduct: product.image, // Mapper returns 'image'
                                            // Use second image if available, else fallback to first
                                            imageResult: product.images && product.images.length > 1 ? product.images[1] : product.image,
                                            // Benefit can be 'features' joined
                                            benefit: product.features ? product.features.join(' • ') : 'Sculpting'
                                        }}
                                    />
                                ))}
                            </div>
                            {filteredProducts.length === 0 && (
                                <div className="py-20 text-center text-gray-400">
                                    <p>No se encontraron productos para esta ocasión.</p>
                                    <button onClick={() => setActiveFilter('all')} className="mt-4 text-[#D4AF37] underline">
                                        Ver todos
                                    </button>
                                </div>
                            )}
                        </>
                    )}
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
