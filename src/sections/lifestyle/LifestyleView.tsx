import { useState } from 'react'
import { Sparkles, ShoppingBag } from 'lucide-react'
import { OutfitSilo } from '../../storefront/components/lifestyle/OutfitSilo'
import { ComfortMeter } from '../../storefront/components/lifestyle/ComfortMeter'
import { ShopifyCollectionGrid } from '../../storefront/components/shopify/ShopifyCollectionGrid'
import data from '../../storefront/data/sources/lifestyle.json'
import { useStore } from '../../storefront/hooks/useStoreContext'

// Interfaces
interface Occasion {
    id: string
    title?: string // title might be missing in json, use label
    label?: string
    description?: string // maps to subtitle
    image?: string // maps to palette or image
}

interface Product {
    id: string
    title: string
    price: number
    image: string
    occasion: string
    comfortLevel?: string // mapped from json logic
    invisibilityScore?: number
    tags: string[]
    isBestSeller?: boolean
}

const occasions: Occasion[] = (data as unknown as { occasions: Occasion[] }).occasions
const products: Product[] = (data as unknown as { products: Product[] }).products

export default function LifestyleView() {
    const [activeOccasion, setActiveOccasion] = useState<string>('all')
    const { addToCart } = useStore()

    const filteredProducts = activeOccasion === 'all'
        ? products
        : products.filter(p => p.occasion === (occasions.find(o => o.id === activeOccasion)?.label || activeOccasion))

    const handleAddToCart = (product: Product) => {
        // Adapt to StoreProduct type
        const storeProduct = {
            ...product,
            images: [product.image],
            category: 'Lifestyle',
            description: product.tags.join(', ')
        }
        addToCart(storeProduct, 'Medium')
    }

    return (
        <div className="bg-white min-h-screen pb-20 font-sans animate-fade-in">

            {/* Boutique Header */}
            <div className="bg-[#FAF9F6] pt-24 pb-20 px-6 text-center border-b border-stone-100">
                <span className="text-[#D1AB66] text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
                    The Invisible Collection
                </span>
                <h1 className="font-serif text-5xl md:text-7xl text-[#2C2420] font-bold mb-6">
                    Secret Weapons.
                </h1>
                <p className="text-stone-500 text-xl max-w-xl mx-auto font-light leading-relaxed">
                    Engineering that vanishes under silk. Sculpting that breathes.
                    Designed for the moments that matter.
                </p>
            </div>

            {/* Occasion Nav Cards */}
            <div className="max-w-7xl mx-auto px-6 -mt-12 mb-20 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {occasions.map(occ => (
                        <button
                            key={occ.id}
                            onClick={() => setActiveOccasion(prev => prev === occ.id ? 'all' : occ.id)}
                            className={`
                                relative overflow-hidden rounded-2xl p-8 text-left transition-all duration-300 group
                                border border-stone-100 bg-white
                                ${activeOccasion === occ.id ? 'ring-2 ring-[#D1AB66] shadow-xl scale-[1.02]' : 'hover:shadow-lg hover:-translate-y-1'}
                            `}
                        >
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#D1AB66]/5 to-transparent pointer-events-none" />

                            <div className="relative z-10">
                                <span className="text-3xl mb-4 block grayscale group-hover:grayscale-0 transition-all">✨</span>
                                <h3 className="font-serif text-2xl text-[#2C2420] font-bold mb-2 group-hover:text-[#A35944] transition-colors">
                                    {occ.label}
                                </h3>
                                <p className="text-stone-400 text-sm font-medium">{occ.description}</p>
                            </div>

                            {/* Active Indicator */}
                            {activeOccasion === occ.id && (
                                <div className="absolute top-4 right-4 bg-[#D1AB66] text-white rounded-full p-1.5 shadow-sm">
                                    <Sparkles size={14} />
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-16">

                {/* Left Col: The Dress Test (Visual Anchor) */}
                <div className="lg:col-span-2 space-y-20">
                    <section>
                        <OutfitSilo />
                    </section>

                    {/* Product Grid */}
                    <section>
                        <div className="flex items-center justify-between mb-10">
                            <h2 className="font-serif text-3xl text-[#2C2420] font-bold">
                                {activeOccasion === 'all' ? 'All Essentials' : `${occasions.find(o => o.id === activeOccasion)?.label} Edit`}
                            </h2>
                            <span className="text-stone-400 text-sm font-mono uppercase tracking-wide">{filteredProducts.length} STYLES</span>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-12">
                            {activeOccasion === 'all' ? (
                                <div className="col-span-2">
                                    <ShopifyCollectionGrid handle="uso-diario" productCount={8} />
                                </div>
                            ) : (
                                filteredProducts.map(product => (
                                    <div key={product.id} className="group flex flex-col h-full">
                                        <div className="relative aspect-[3/4] bg-stone-100 rounded-xl overflow-hidden mb-6">
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />

                                            {product.isBestSeller && (
                                                <span className="absolute top-3 left-3 bg-[#2C2420] text-white text-[10px] uppercase font-bold px-3 py-1.5 rounded tracking-wider shadow-lg">
                                                    Best Seller
                                                </span>
                                            )}

                                            <span className="absolute top-3 right-3 bg-white/90 backdrop-blur text-[#2C2420] text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                                                {product.invisibilityScore}/10 Invisible
                                            </span>

                                            {/* Quick Add Overlay */}
                                            <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                                <button
                                                    onClick={() => handleAddToCart(product)}
                                                    className="w-full bg-white/95 backdrop-blur text-[#2C2420] py-3 rounded-lg font-bold text-sm shadow-xl hover:bg-[#2C2420] hover:text-white transition-colors flex items-center justify-center gap-2"
                                                >
                                                    <ShoppingBag className="w-4 h-4" /> Quick Add
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="font-serif text-xl text-[#2C2420] font-bold mb-1 group-hover:text-[#A35944] transition-colors">
                                                {product.title}
                                            </h3>
                                            <p className="text-stone-500 font-medium mb-4">${product.price}</p>

                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {product.tags.slice(0, 3).map(tag => (
                                                    <span key={tag} className="text-[10px] bg-stone-50 text-stone-500 px-2 py-1 rounded uppercase tracking-wide font-bold">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* The Comfort Meter */}
                                        <div className="mt-auto pt-4 border-t border-stone-100">
                                            <ComfortMeter />
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </section>
                </div>

                {/* Right Col: Editorial / Context / Cross-Sell */}
                <div className="lg:col-span-1 space-y-12 sticky top-24 self-start">

                    {/* Context Card */}
                    <div className="bg-[#2C2420] text-[#F5EDDF] p-10 rounded-3xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#D1AB66]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                        <h3 className="font-serif text-3xl font-bold mb-6">Rule of Thumb:</h3>
                        <p className="text-stone-300 mb-8 leading-relaxed text-lg font-light">
                            You wouldn't wear stilettos to the gym. Don't wear a Stage 2 Faja to a black-tie gala.
                        </p>

                        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                            <h4 className="font-bold mb-2 text-[#D1AB66] text-xs uppercase tracking-widest">Expert Tip</h4>
                            <p className="text-sm italic text-stone-300">
                                "For silk dresses, prioritize 'Seamless Tech' over high compression. The gap is your enemy, not the tightness."
                            </p>
                        </div>
                    </div>

                    {/* Cross Sell - Context Aware */}
                    <div className="border border-stone-200 p-8 rounded-3xl bg-white">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-6">Complete The Look</h4>

                        <div className="space-y-6">
                            <div className="flex gap-4 items-center group cursor-pointer">
                                <div className="w-16 h-16 bg-stone-100 rounded-xl flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">🧶</div>
                                <div>
                                    <p className="font-bold text-[#2C2420] group-hover:text-[#A35944] transition-colors">Boob Tape Roll</p>
                                    <p className="text-sm text-stone-500">$18.00</p>
                                </div>
                                <button className="ml-auto w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center hover:bg-[#2C2420] hover:text-white transition-colors text-stone-400">
                                    +
                                </button>
                            </div>

                            <div className="w-full h-px bg-stone-100" />

                            <div className="flex gap-4 items-center group cursor-pointer">
                                <div className="w-16 h-16 bg-stone-100 rounded-xl flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">🌸</div>
                                <div>
                                    <p className="font-bold text-[#2C2420] group-hover:text-[#A35944] transition-colors">Silicone Covers</p>
                                    <p className="text-sm text-stone-500">$12.00</p>
                                </div>
                                <button className="ml-auto w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center hover:bg-[#2C2420] hover:text-white transition-colors text-stone-400">
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
