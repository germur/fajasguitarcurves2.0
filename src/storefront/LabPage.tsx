
// @ts-nocheck
import { SeoHead } from './components/SeoHead';


export function LabPage() {
    return (
        <div className="pt-24 pb-20 max-w-7xl mx-auto px-6 font-sans">
            <SeoHead
                title="The Laboratory | Guitar Curves"
                description="Experimental Web Components Testing Ground."
            />

            <div className="mb-12">
                <h1 className="text-4xl font-serif font-bold text-[#2C2420] mb-4">The Laboratory</h1>
                <p className="text-stone-600">Testing Native Shopify Web Components (Context Pattern)</p>
            </div>

            {/* 
                Connecting to Real Store data 
                Domain: fajasguitarcurves.com
                Collection: etapa-2
            */}
            <shopify-store
                store-domain="fajasguitarcurves.com"
                country="US"
                language="es"
            >
                <div className="mb-8 p-4 bg-stone-100 rounded">
                    <h2 className="font-bold text-lg mb-2">Real Data: Etapa 2 Collection</h2>

                    {/* Collection Context 
                        NOTE: We use dangerouslySetInnerHTML because React does not render children of <template> 
                        into the DOM in a way that the Shopify Web Components library expects (reading .content or innerHTML).
                    */}
                    <shopify-context
                        type="collection"
                        handle="etapa-2"
                        dangerouslySetInnerHTML={{
                            __html: `
                            <template>
                            <div class="mb-8 text-center">
                                <h3 class="text-3xl font-serif text-[#2C2420] italic">
                                    <shopify-data query="collection.title"></shopify-data>
                                </h3>
                                <div class="w-16 h-0.5 bg-[#D1AB66] mx-auto mt-2"></div>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <shopify-list-context type="product" query="collection.products" first="3">
                                    <template>
                                        <div class="group relative bg-[#F5EDDF] p-4 rounded-t-[2rem] rounded-b-lg shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer overflow-hidden border border-[#D1AB66]/20">
                                            
                                            <div class="relative aspect-[3/4] rounded-t-[1.5rem] rounded-b-md overflow-hidden bg-white mb-4">
                                                <shopify-media 
                                                    query="product.featuredImage"
                                                    class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                                ></shopify-media>
                                                
                                                {/* Overlay Gradient */}
                                                <div class="absolute inset-0 bg-gradient-to-t from-[#2C2420]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                
                                                {/* Quick Add Button */}
                                                <div class="absolute bottom-4 left-4 right-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                                    <button class="w-full bg-[#2C2420] text-[#D1AB66] py-3 px-4 rounded-full font-bold text-xs tracking-widest uppercase hover:bg-[#D1AB66] hover:text-[#2C2420] transition-colors shadow-lg">
                                                        Quick Add +
                                                    </button>
                                                </div>
                                            </div>
                                            
                                            <div class="text-center px-2 pb-2">
                                                <p class="text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#A35944] uppercase mb-1">
                                                    Signature Collection
                                                </p>
                                                <h4 class="font-serif text-lg text-[#2C2420] leading-tight mb-2 group-hover:text-[#D1AB66] transition-colors">
                                                    <shopify-data query="product.title"></shopify-data>
                                                </h4>
                                                <p class="font-sans font-medium text-[#2C2420]">
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
                </div>
            </shopify-store>

            <div className="mt-12 p-6 bg-stone-100 rounded-xl">
                <h3 className="font-bold text-[#2C2420] mb-2">Status Log</h3>
                <p className="text-sm text-stone-600">
                    Attempting to render: <code>shopify-context</code> &gt; <code>shopify-list-context</code> &gt; <code>fajasguitarcurves.com</code> elements.
                    <br />
                    If you see "Etapa 2" (or similar) and product data above, the Web Components are working with the real store.
                </p>
            </div>
        </div>
    );
}
