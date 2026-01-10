// @ts-nocheck
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';


export function ProductDetailView() {
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        // Scroll to top on mount
        window.scrollTo(0, 0);
    }, [id]);

    if (!id) return <div>Product not found</div>;

    return (
        <div className="bg-[#FAF9F6] min-h-screen pb-24">
            {/* Mobile-First Header / Nav would be here or in Layout */}

            <shopify-store
                store-domain="fajasguitarcurves.com"
                language="es"
                country="US"
                style={{ display: 'block' }}
            >
                <shopify-product-context
                    handle={id}
                    style={{ display: 'block' }}
                    dangerouslySetInnerHTML={{
                        __html: `
    < template >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 font-sans text-[#2C2420]">

        <!-- 1. Breadcrumbs (SEO & Navigation) -->
        <nav class="flex items-center text-xs sm:text-sm text-stone-500 mb-6 overflow-x-auto whitespace-nowrap">
            <a href="/" class="hover:text-[#A35944] transition-colors">Home</a>
            <span class="mx-2">/</span>
            <a href="/store/medical" class="hover:text-[#A35944] transition-colors">Post-Surgery</a>
            <span class="mx-2">/</span>
            <span class="text-[#2C2420] font-medium truncate"><shopify-data query="product.title"></shopify-data></span>
        </nav>

        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">

            <!-- 2. Visual Gallery (Left Column) -->
            <div class="md:col-span-7 lg:col-span-8">
                <div class="grid grid-cols-1 gap-4">
                    <!-- Main Hero Image -->
                    <div class="aspect-[3/4] md:aspect-[4/5] bg-stone-100 rounded-2xl overflow-hidden relative border border-stone-200 shadow-sm">
                        <shopify-media
                            query="product.featuredImage"
                            class="w-full h-full object-cover"
                        ></shopify-media>
                        <div class="absolute top-4 left-4 bg-[#D1AB66] text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase">
                            Best Seller
                        </div>
                    </div>

                    <!-- Thumbnails / Grid (Mobile: Hidden or Carousel) -->
                    <div class="hidden md:grid grid-cols-2 gap-4">
                        <div class="aspect-square bg-stone-50 rounded-xl flex items-center justify-center border border-stone-200 p-4 text-center">
                            <div>
                                <span class="text-3xl mb-2 block">🩺</span>
                                <p class="text-xs font-bold text-stone-600">Doctor<br>Certified</p>
                            </div>
                        </div>
                        <div class="aspect-square bg-stone-50 rounded-xl flex items-center justify-center border border-stone-200 p-4 text-center">
                            <div>
                                <span class="text-3xl mb-2 block">⏳</span>
                                <p class="text-xs font-bold text-stone-600">Instant<br>Hourglass</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 3. The Buy Box (Right Column / Sticky) -->
            <div class="md:col-span-5 lg:col-span-4">
                <div class="md:sticky md:top-24 space-y-6">

                    <!-- Header Info -->
                    <div>
                        <div class="flex items-center gap-1 mb-2">
                            <div class="flex text-[#A35944] text-sm">★★★★★</div>
                            <span class="text-xs text-stone-500 font-medium ml-1">4.9 (540 Recoveries)</span>
                        </div>
                        <h1 class="font-serif text-2xl md:text-3xl lg:text-4xl text-[#2C2420] font-bold leading-tight mb-2">
                            <shopify-data query="product.title"></shopify-data>
                        </h1>
                        <div class="flex items-baseline gap-2 mb-4">
                            <span class="text-2xl text-[#2C2420] font-medium">
                                <shopify-money query="product.priceRange.minVariantPrice"></shopify-money>
                            </span>
                            <span class="text-xs text-stone-400">USD</span>
                        </div>

                        <!-- Klarna / Afterpay Msg -->
                        <div class="flex items-center gap-2 bg-[#F5EDDF]/30 p-2 rounded-lg border border-[#F5EDDF]">
                            <span class="text-[10px] text-[#2C2420]">
                                Pay in 4 interest-free payments of <span class="font-bold">$27.50</span>
                            </span>
                        </div>
                    </div>

                    <!-- Variants -->
                    <div class="space-y-3">
                        <div class="flex justify-between items-center text-xs">
                            <span class="font-bold uppercase tracking-wide text-stone-500">Select Size</span>
                            <button class="text-[#A35944] underline decoration-[#A35944]/30 hover:decoration-[#A35944] transition-all flex items-center gap-1">
                                <span>📏</span> Guitar Tech Calculator
                            </button>
                        </div>
                        <div class="guitar-variants">
                            <shopify-variant-selector></shopify-variant-selector>
                        </div>
                        <p class="text-[10px] text-[#A35944] bg-[#A35944]/5 p-2 rounded-md border border-[#A35944]/10">
                            <strong>Note:</strong> Runs small. Between sizes? Size UP.
                        </p>
                    </div>

                    <!-- CTA Actions -->
                    <div class="space-y-4">
                        <shopify-buy-button>
                            <button slot="button" class="w-full h-14 bg-[#2C2420] text-white rounded-full font-bold text-base tracking-widest uppercase hover:bg-black hover:scale-[1.01] active:scale-[0.99] transition-all shadow-xl flex items-center justify-center gap-3">
                                <span>Add to Cart</span>
                                <span class="w-1 h-1 bg-white rounded-full opacity-50"></span>
                                <shopify-money query="product.priceRange.minVariantPrice"></shopify-money>
                            </button>
                        </shopify-buy-button>

                        <div class="grid grid-cols-3 gap-2 grayscale opacity-60">
                            <div class="h-8 bg-stone-200 rounded animate-pulse"></div>
                            <div class="h-8 bg-stone-200 rounded animate-pulse"></div>
                            <div class="h-8 bg-stone-200 rounded animate-pulse"></div>
                        </div>
                    </div>

                    <!-- Smart Upsell Module -->
                    <div class="bg-white p-4 rounded-xl border-2 border-[#D1AB66]/20 shadow-sm relative overflow-hidden">
                        <div class="absolute top-0 left-0 bg-[#D1AB66] text-white text-[9px] font-bold px-2 py-0.5 rounded-br-lg uppercase tracking-wider">
                            Surgeon Recommended
                        </div>
                        <div class="flex items-start gap-4 mt-2">
                            <div class="w-16 h-16 bg-stone-100 rounded-lg shrink-0 flex items-center justify-center text-2xl">
                                🧴
                            </div>
                            <div class="flex-1">
                                <h4 class="font-bold text-sm text-[#2C2420] mb-0.5">Complete Your Recovery</h4>
                                <p class="text-xs text-stone-500 mb-2">Add <strong>Lipo Foam 360</strong> to prevent skin marks.</p>
                                <label class="flex items-center gap-2 cursor-pointer group">
                                    <input type="checkbox" class="rounded border-stone-300 text-[#2C2420] focus:ring-[#2C2420]">
                                        <span class="text-xs font-bold text-[#2C2420] group-hover:underline">Add to order (+ $15.00)</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <!-- Accordions (Progressive Disclosure) -->
                    <div class="divide-y divide-stone-100 border-t border-b border-stone-100 text-sm">
                        
                        <details class="group py-4 cursor-pointer" open>
                            <summary class="font-bold text-[#2C2420] flex justify-between items-center list-none">
                                <span>Description</span>
                                <span class="transition-transform group-open:rotate-180">↓</span>
                            </summary>
                            <div class="pt-3 text-stone-600 leading-relaxed text-xs prose prose-stone max-w-none">
                                <shopify-data query="product.descriptionHtml"></shopify-data>
                                
                                <!-- Cross-Sell Text Links (SEO) -->
                                <div class="mt-4 pt-4 border-t border-stone-100">
                                    <p class="font-bold text-[#2C2420] mb-1">Complete Your Kit:</p>
                                    <ul class="space-y-1">
                                        <li><a href="/store/products/lipo-foam-360" class="text-[#A35944] hover:underline">360° Lipo Foam for skin protection</a></li>
                                        <li><a href="/store/products/abdominal-board" class="text-[#A35944] hover:underline">Abdominal Board for extra compression</a></li>
                                        <li><a href="/store/products/urinal" class="text-[#A35944] hover:underline">Female Urinal for easy bathroom use</a></li>
                                    </ul>
                                </div>
                            </div>
                        </details>

                        <details class="group py-4 cursor-pointer" open>
                            <summary class="font-bold text-[#2C2420] flex justify-between items-center list-none">
                                <span>Description</span>
                                <span class="transition-transform group-open:rotate-180">↓</span>
                            </summary>
                            <div class="pt-3 text-stone-600 leading-relaxed text-xs prose prose-stone max-w-none">
                                <shopify-data query="product.descriptionHtml"></shopify-data>
                                
                                <!-- Cross-Sell Text Links (SEO) -->
                                <div class="mt-4 pt-4 border-t border-stone-100">
                                    <p class="font-bold text-[#2C2420] mb-1">Complete Your Kit:</p>
                                    <ul class="space-y-1">
                                        <li><a href="/store/products/lipo-foam-360" class="text-[#A35944] hover:underline">360° Lipo Foam for skin protection</a></li>
                                        <li><a href="/store/products/abdominal-board" class="text-[#A35944] hover:underline">Abdominal Board for extra compression</a></li>
                                        <li><a href="/store/products/urinal" class="text-[#A35944] hover:underline">Female Urinal for easy bathroom use</a></li>
                                    </ul>
                                </div>
                            </div>
                        </details>

                        <details class="group py-4 cursor-pointer">
                            <summary class="font-bold text-[#2C2420] flex justify-between items-center list-none">
                                <span>Why Guitar Tech?</span>
                                <span class="transition-transform group-open:rotate-180">↓</span>
                            </summary>
                            <div class="pt-3 text-stone-600 leading-relaxed text-xs">
                                <p class="mb-2"><strong>Smart Compression:</strong> Maximum control for the waist, zero compression for the hips (BBL Safe).</p>
                                <p><strong>Viveltex Technology:</strong> Infused with Vitamin E, Cosmacol EMI, sea alae, and Ginkgo Biloba to soothe skin.</p>
                            </div>
                        </details>
                        <details class="group py-4 cursor-pointer">
                            <summary class="font-bold text-[#2C2420] flex justify-between items-center list-none">
                                <span>Medical Specs</span>
                                <span class="transition-transform group-open:rotate-180">↓</span>
                            </summary>
                            <div class="pt-3 text-stone-600 leading-relaxed text-xs">
                                <ul class="list-disc pl-4 space-y-1">
                                    <li>Powernet + Lycra construction</li>
                                    <li>Flat seams (invisible under clothes)</li>
                                    <li>Perineal zipper for bathroom ease</li>
                                </ul>
                            </div>
                        </details>
                        <details class="group py-4 cursor-pointer">
                            <summary class="font-bold text-[#2C2420] flex justify-between items-center list-none">
                                <span>Shipping & Returns</span>
                                <span class="transition-transform group-open:rotate-180">↓</span>
                            </summary>
                            <div class="pt-3 text-stone-600 leading-relaxed text-xs">
                                <p>Free exchanges on sizing issues within 30 days. Fast shipping across USA.</p>
                            </div>
                        </details>
                    </div>

                </div>
            </div>
        </div>

        {/* Related Products (SEO Fallback Strategy) */}
        <div className="mt-24 border-t border-stone-200 pt-16">
            <h3 className="font-serif text-2xl md:text-3xl text-[#2C2420] font-bold mb-8 pl-4 border-l-4 border-[#D1AB66]">
                You Might Also Like
            </h3>
            <ShopifyCollectionGrid handle="cinturillas" productCount={4} />
        </div>

        <!-- 4. UGC / Social Proof (Full Width Below) -->
        <div class="mt-16 md:mt-24">
            <h3 class="font-serif text-2xl md:text-3xl text-center text-[#2C2420] font-bold mb-8">
                Real Results on Real Bodies
            </h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <!-- Placeholder UGC -->
                <div class="aspect-[4/5] bg-stone-100 rounded-xl"></div>
                <div class="aspect-[4/5] bg-stone-100 rounded-xl"></div>
                <div class="aspect-[4/5] bg-stone-100 rounded-xl"></div>
                <div class="aspect-[4/5] bg-stone-100 rounded-xl"></div>
            </div>
        </div>

        <!-- 5. Sticky Added-to-Cart (Mobile Only - TODO Logic) -->

    </div>
                        </template >
    `}}
                />
            </shopify-store>
        </div >
    );
}
