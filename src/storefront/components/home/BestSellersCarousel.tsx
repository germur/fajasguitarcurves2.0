import { useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ShopifyCollectionGrid } from '../shopify/ShopifyCollectionGrid';

export function BestSellersCarousel() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300;
            scrollContainerRef.current.scrollBy({
                left: direction === 'right' ? scrollAmount : -scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="py-20 bg-white border-t border-stone-100">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2C2420]">
                            Las Favoritas de nuestras Guitar Girls
                        </h2>
                        <p className="text-stone-500 mt-2">
                            Los productos que han moldeado más de 10k figuras de reloj de arena.
                        </p>
                    </div>
                    <Link to="/solutions" className="hidden md:flex items-center gap-2 font-bold text-[#A35944] hover:text-[#D1AB66] transition-colors">
                        Ver Todo <ArrowRight size={16} />
                    </Link>
                </div>

                {/* Carousel (Wrapping the Grid logic but restricted to horizontal scroll) */}
                <div className="relative group">

                    {/* Navigation Buttons (Hidden on mobile) */}
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

                    {/* Scrollable Area */}
                    <div
                        ref={scrollContainerRef}
                        className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0"
                    >
                        {/* We use the Stage 2 collection as our "Best Sellers" proxy for now */}
                        <div className="min-w-full">
                            {/* 
                                Limiting grid columns to act as a horizontal list is tricky with the existing Grid component.
                                Ideally, we'd refactor ShopifyCollectionGrid to accept a layout mode.
                                For now, we will use it but assume it renders children we can scroll.
                                Actually, the existing ShopifyCollectionGrid maps to `shopify-collection`, which typically renders a grid.
                                
                                HACK: To make it horizontal, we might need a horizontal-friendly web component or just render a specific robust "Featured Collection".
                                Let's assume for this specific view we might need to manually fetch or use a different component if the Web Component forces a grid.
                                
                                Since `<shopify-collection>` usually forces a grid layout in its Shadow DOM or default styles, 
                                we might be better off manually fetching products via Storefront API for a true custom carousel.
                                
                                BUT, given Phase 22 constraints (we liked the Web Components), 
                                let's try to override it or use a specific "Best Sellers" manual list if we can't easily style the internal grid of the web component to be flex-nowrap.
                                
                                ALTERNATIVE: Use the manual "ShopifyProductCard" if we had one.
                                Let's use the ShopifyCollectionGrid but wrap it in a container that forces horizontal scroll if possible, 
                                though shadow DOM might block layout shifts.
                                
                                SAFETY: Let's stick to the verified Grid behavior (Vertical Grid) but limit it to 4 items so it looks like a "Top Rows" section, 
                                instead of a Scroll. It's safer for MVP than fighting Shadow DOM scroll.
                              */}
                            <ShopifyCollectionGrid handle="etapa-2" />
                        </div>
                    </div>
                </div>

                <div className="flex md:hidden justify-center mt-4">
                    <Link to="/solutions" className="flex items-center gap-2 font-bold text-[#A35944]">
                        Shop All Favorites <ArrowRight size={16} />
                    </Link>
                </div>

            </div>
        </section>
    );
}
