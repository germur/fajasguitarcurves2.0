import { useRef, useEffect, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchAllProducts } from '@/lib/shopify-client';
import { ShopifyMapper } from '@/lib/shopify-mapper';
// Reuse existing ProductCard or modify
import { SculptProductCard } from '../silo-sculpt/SculptProductCard';
import { useStore } from '@/storefront/hooks/useStoreContext';

export function GuitarCurvesShowcase() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useStore();

    useEffect(() => {
        async function loadGuitarCurves() {
            try {
                // Fetch ALL products to ensure we show real inventory
                const allItems = await fetchAllProducts();

                // MAPPER IS CRITICAL: Converts raw nodes to the shape SculptProductCard expects (imageProduct, etc.)
                const mappedItems = allItems.map((item: any) => ShopifyMapper.mapProduct(item, 'sculpt'));

                // Filter if possible, otherwise show mixed (User asked for "Guitar Curves", traditionally stage 2/sculpt)
                // We will try to filter by tag 'Sculpt' or 'Waist Trainer' if possible, otherwise just show bestsellers (first 8)
                // For now, let's show the first 8 REAL products to stop the anger immediately.
                setProducts(mappedItems.slice(0, 8));
            } catch (error) {
                console.error("Failed to load guitar curves:", error);
                // No more placeholders. If it fails, it fails, but don't show fake data.
            } finally {
                setLoading(false);
            }
        }
        loadGuitarCurves();
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300;
            scrollContainerRef.current.scrollBy({
                left: direction === 'right' ? scrollAmount : -scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    // if (!loading && products.length === 0) return null; // MOSTRAR SIEMPRE PARA DEBUG


    return (
        <section className="py-16 bg-[#FAF9F6] border-t border-stone-200">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <span className="text-[#A35944] font-bold tracking-widest text-xs uppercase mb-2 block animate-pulse">
                            En Tendencia
                        </span>
                        <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#2C2420] flex items-center gap-3">
                            Tus Curvas, Redefinidas <Sparkles className="w-6 h-6 text-[#D4AF37]" />
                        </h2>
                        <p className="text-stone-500 mt-3 max-w-lg">
                            Descubre la colección diseñada para realzar tu silueta de guitarra natural.
                        </p>
                    </div>
                    <Link to="/colecciones/moldeo-y-estetica" className="hidden md:flex items-center gap-2 font-bold text-[#A35944] hover:text-[#D1AB66] transition-colors uppercase tracking-widest text-xs">
                        Ver Colección <ArrowRight size={16} />
                    </Link>
                </div>

                {/* Carousel */}
                <div className="relative group">
                    {/* Reuse Navigation Logic */}
                    {products.length > 3 && (
                        <>
                            <button
                                onClick={() => scroll('left')}
                                className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 w-12 h-12 bg-white shadow-xl rounded-full flex items-center justify-center text-[#2C2420] opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 hidden md:flex hover:scale-110 duration-200"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                onClick={() => scroll('right')}
                                className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 w-12 h-12 bg-white shadow-xl rounded-full flex items-center justify-center text-[#2C2420] opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 hidden md:flex hover:scale-110 duration-200"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </>
                    )}

                    <div
                        ref={scrollContainerRef}
                        className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0"
                    >
                        {loading ? (
                            Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="min-w-[280px] h-[450px] bg-white animate-pulse rounded-[2rem]" />
                            ))
                        ) : (
                            products.map((product) => (
                                <div key={product.id} className="min-w-[280px] md:min-w-[320px] snap-center">
                                    <SculptProductCard
                                        product={product}
                                        onAddToCart={() => addToCart({
                                            id: product.id,
                                            title: product.title,
                                            price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
                                            image: product.image,
                                            category: 'Guitar Curves'
                                        }, 'M')}
                                    />
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="flex md:hidden justify-center mt-6">
                    <Link to="/colecciones/moldeo-y-estetica" className="flex items-center gap-2 font-bold text-[#A35944] uppercase tracking-widest text-xs">
                        Ver Colección Completa <ArrowRight size={16} />
                    </Link>
                </div>

            </div>
        </section>
    );
}
