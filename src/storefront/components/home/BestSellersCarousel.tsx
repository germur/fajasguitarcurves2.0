import { useRef, useEffect, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { LocalizedLink as Link } from '../LocalizedLink';
import { fetchCollectionByHandle } from '@/lib/shopify-client';
import { SculptProductCard } from '../silo-sculpt/SculptProductCard';
import { useStore } from '@/storefront/hooks/useStoreContext';
import { useTranslation } from 'react-i18next';

export function BestSellersCarousel() {
    const { t } = useTranslation();
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useStore();

    useEffect(() => {
        async function loadBestSellers() {
            try {
                // Etapa 2 is usually the best seller collection
                const items = await fetchCollectionByHandle('etapa-2');
                const mappedItems = items && Array.isArray(items) ? items.slice(0, 8) : [];
                setProducts(mappedItems);
            } catch (error) {
                console.error("Failed to load best sellers:", error);
            } finally {
                setLoading(false);
            }
        }
        loadBestSellers();
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

    if (!loading && products.length === 0) return null; // Hide section if no products

    return (
        <section className="py-20 bg-white border-t border-stone-100">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2C2420]">
                            {t('pages.home.best_sellers.title')}
                        </h2>
                        <p className="text-stone-500 mt-2">
                            {t('pages.home.best_sellers.subtitle')}
                        </p>
                    </div>
                    <Link to="/colecciones/todo" className="hidden md:flex items-center gap-2 font-bold text-[#A35944] hover:text-[#D1AB66] transition-colors">
                        {t('pages.home.best_sellers.cta')} <ArrowRight size={16} />
                    </Link>
                </div>

                {/* Carousel */}
                <div className="relative group">

                    {/* Navigation Buttons (Hidden on mobile) */}
                    {products.length > 3 && (
                        <>
                            <button
                                onClick={() => scroll('left')}
                                className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-[#2C2420] opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 hidden md:flex"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={() => scroll('right')}
                                className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-[#2C2420] opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 hidden md:flex"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </>
                    )}

                    {/* Scrollable Area */}
                    <div
                        ref={scrollContainerRef}
                        className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0"
                    >
                        {loading ? (
                            // Skeleton Loading
                            Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="min-w-[280px] h-[400px] bg-stone-100 animate-pulse rounded-xl" />
                            ))
                        ) : (
                            products.map((product) => (
                                <div key={product.id} className="min-w-[280px] md:min-w-[300px] snap-center">
                                    <SculptProductCard
                                        product={product}
                                        onAddToCart={() => addToCart({
                                            id: product.id,
                                            title: product.title,
                                            price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
                                            image: product.image,
                                            category: 'Más Vendidos'
                                        }, 'M')}
                                    />
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="flex md:hidden justify-center mt-4">
                    <Link to="/colecciones/todo" className="flex items-center gap-2 font-bold text-[#A35944]">
                        {t('pages.home.best_sellers.cta')} <ArrowRight size={16} />
                    </Link>
                </div>

            </div>
        </section>
    );
}
