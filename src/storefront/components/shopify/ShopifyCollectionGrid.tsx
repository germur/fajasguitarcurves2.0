// @ts-nocheck
import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../hooks/useStoreContext';

interface ShopifyCollectionGridProps {
    handle: string;
    productCount?: number;
}

export function ShopifyCollectionGrid({ handle, productCount = 4 }: ShopifyCollectionGridProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const { addToCart } = useStore();

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const card = target.closest('[data-product-card]');
            const quickAddBtn = target.closest('[data-quick-add]');

            if (card) {
                // Handle Quick Add
                if (quickAddBtn) {
                    e.preventDefault();
                    e.stopPropagation();

                    // Scrape product data
                    const id = card.querySelector('.data-id')?.textContent?.trim() || '';
                    const title = card.querySelector('.data-title')?.textContent?.trim() || 'Unknown Product';
                    const priceStr = card.querySelector('.data-price')?.textContent?.trim() || '0';
                    const image = card.querySelector('.data-image')?.textContent?.trim() || '';

                    if (id) {
                        addToCart({
                            id,
                            title,
                            price: parseFloat(priceStr),
                            image,
                            description: '',
                            category: 'Shopify'
                        }, 'M'); // Defaulting to M for Quick Add
                    }
                    return;
                }

                // Handle Card Navigation
                e.preventDefault();
                const handleFn = card.querySelector('.data-handle')?.textContent?.trim();
                if (handleFn) {
                    navigate(`/store/products/${handleFn}`);
                }
            }
        };

        container.addEventListener('click', handleClick);
        return () => container.removeEventListener('click', handleClick);
    }, [navigate, addToCart]);

    return (
        <div ref={containerRef}>
            <shopify-store
                store-domain="fajasguitarcurves.com"
                country="US"
                language="es"
            >
                <shopify-context
                    type="collection"
                    handle={handle}
                    dangerouslySetInnerHTML={{
                        __html: `
                        <template>
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                            <shopify-list-context type="product" query="collection.products" first="${productCount}">
                                <template>
                                    <div data-product-card="true" class="group relative bg-white p-4 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer overflow-hidden border border-stone-100 block">
                                        
                                        <!-- Hidden Data for JS Logic -->
                                        <span class="data-handle hidden" style="display:none;"><shopify-data query="product.handle"></shopify-data></span>
                                        <span class="data-id hidden" style="display:none;"><shopify-data query="product.id"></shopify-data></span>
                                        <span class="data-title hidden" style="display:none;"><shopify-data query="product.title"></shopify-data></span>
                                        <span class="data-price hidden" style="display:none;"><shopify-data query="product.priceRange.minVariantPrice.amount"></shopify-data></span>
                                        <span class="data-image hidden" style="display:none;"><shopify-data query="product.featuredImage.url"></shopify-data></span>

                                        <div class="relative aspect-[3/4] rounded-xl overflow-hidden bg-stone-50 mb-4">
                                            <shopify-media 
                                                query="product.featuredImage"
                                                class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                            ></shopify-media>
                                            
                                            <!-- Overlay Gradient -->
                                            <div class="absolute inset-0 bg-gradient-to-t from-[#2C2420]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            
                                            <!-- Quick Add Button -->
                                            <div class="absolute bottom-4 left-4 right-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                                <button data-quick-add="true" class="w-full bg-[#2C2420] text-[#D1AB66] py-3 px-4 rounded-xl font-bold text-xs tracking-widest uppercase hover:bg-[#D1AB66] hover:text-[#2C2420] transition-colors shadow-lg">
                                                    AGREGAR RÁPIDO +
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <div class="px-2 pb-2">
                                            <div class="mb-2">
                                                 <p class="text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#A35944] uppercase mb-1">
                                                    Guitar Curves
                                                </p>
                                            </div>
                                            <h4 class="font-serif text-lg text-[#2C2420] leading-tight mb-2 group-hover:text-[#B49286] transition-colors">
                                                <shopify-data query="product.title"></shopify-data>
                                            </h4>
                                            <p class="font-sans font-medium text-[#2C2420] flex items-center gap-2">
                                                <shopify-money query="product.priceRange.minVariantPrice"></shopify-money>
                                            </p>
                                        </div>
                                    </div>
                                </template>
                            </shopify-list-context>
                        </div>
                        </template>
                    `}}
                />
            </shopify-store>
        </div>
    );
}
