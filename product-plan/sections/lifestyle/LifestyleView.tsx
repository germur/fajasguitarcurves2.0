import { useState } from 'react'
import { Sparkles, Briefcase, Heart } from 'lucide-react'
import { DressTestVisualizer } from './components/DressTestVisualizer'
import { ComfortMeter } from './components/ComfortMeter'
import data from '../../../product/sections/lifestyle/data.json'

// Interfaces
interface Occasion {
    id: string
    title: string
    subtitle: string
    palette: string
    textColor: string
    icon: string
}

interface Product {
    id: string
    title: string
    price: number
    occasion: string
    usageDuration: string
    comfortLevel: number
    invisibility: string
    tags: string[]
    isBestSeller?: boolean
}

const occasions: Occasion[] = (data as any).occasions
const products: Product[] = (data as any).products

export default function LifestyleView() {
    const [activeOccasion, setActiveOccasion] = useState<string>('all')

    const filteredProducts = activeOccasion === 'all'
        ? products
        : products.filter(p => p.occasion === activeOccasion)

    return (
        <div className="bg-[#FFFFF] min-h-screen pb-20 font-sans">

            {/* Boutique Header */}
            <div className="bg-[#F5EDDF] pt-20 pb-16 px-6 text-center">
                <span className="text-[#D1AB66] text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
                    The Lifestyle Collection
                </span>
                <h1 className="font-serif text-5xl md:text-6xl text-[#2C2420] font-bold mb-6">
                    Secret Weapons.
                </h1>
                <p className="text-[#A35944] text-lg max-w-xl mx-auto font-medium">
                    Engineering that vanishes. Sculpting that breathes.
                    Designed for the moments that matter.
                </p>
            </div>

            {/* Occasion Nav Cards */}
            <div className="max-w-7xl mx-auto px-6 -mt-10 mb-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {occasions.map(occ => (
                        <button
                            key={occ.id}
                            onClick={() => setActiveOccasion(prev => prev === occ.id ? 'all' : occ.id)}
                            className={`
                    relative overflow-hidden rounded-xl p-8 text-left transition-all duration-300
                    ${occ.palette} ${occ.textColor}
                    ${activeOccasion === occ.id ? 'ring-4 ring-[#D1AB66] scale-[1.02] shadow-2xl' : 'hover:shadow-xl hover:-translate-y-1'}
                `}
                        >
                            <span className="text-4xl mb-4 block">{occ.icon}</span>
                            <h3 className="font-serif text-2xl font-bold mb-2">{occ.title}</h3>
                            <p className="opacity-80 text-sm font-medium">{occ.subtitle}</p>

                            {/* Active Indicator */}
                            {activeOccasion === occ.id && (
                                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur rounded-full p-1">
                                    <Sparkles size={16} />
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-12">

                {/* Left Col: The Dress Test (Visual Anchor) */}
                <div className="lg:col-span-2 space-y-12">
                    <section>
                        <DressTestVisualizer />
                    </section>

                    {/* Product Grid */}
                    <section>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="font-serif text-3xl text-[#2C2420] font-bold">
                                {activeOccasion === 'all' ? 'All Essentials' : `For ${occasions.find(o => o.id === activeOccasion)?.title}`}
                            </h2>
                            <span className="text-stone-500 text-sm">{filteredProducts.length} Styles</span>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-8">
                            {filteredProducts.map(product => (
                                <div key={product.id} className="group">
                                    <div className="relative aspect-[4/5] bg-stone-100 rounded-lg overflow-hidden mb-4">
                                        {/* Placeholder Image */}
                                        <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-10 grayscale group-hover:grayscale-0 transition-all">
                                            💃
                                        </div>

                                        {product.isBestSeller && (
                                            <span className="absolute top-3 left-3 bg-[#2C2420] text-white text-[10px] uppercase font-bold px-3 py-1">
                                                Best Seller
                                            </span>
                                        )}

                                        <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur text-[#2C2420] text-xs font-bold px-2 py-1 rounded">
                                            {product.invisibility} Invisibility
                                        </span>
                                    </div>

                                    <h3 className="font-serif text-xl text-[#2C2420] font-bold">{product.title}</h3>
                                    <p className="text-[#A35944] font-medium mb-3">${product.price}</p>

                                    <div className="flex gap-2 mb-3">
                                        {product.tags.map(tag => (
                                            <span key={tag} className="text-[10px] border border-stone-200 px-2 py-1 rounded text-stone-500 uppercase tracking-wide">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* The Comfort Meter */}
                                    <ComfortMeter usage={product.usageDuration} level={product.comfortLevel} />
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Col: Editorial / Context / Cross-Sell */}
                <div className="lg:col-span-1 space-y-8">
                    {/* Context Card */}
                    <div className="bg-[#2C2420] text-[#F5EDDF] p-8 rounded-2xl">
                        <h3 className="font-serif text-2xl font-bold mb-4">Why Context Matters</h3>
                        <p className="text-stone-300 mb-6 leading-relaxed">
                            You wouldn't wear stilettos to the gym. Don't wear a Stage 3 Post-Op faja to a gala.
                            Our Lifestyle line balances <strong>compression</strong> with <strong>breathability</strong>.
                        </p>
                        <div className="border-t border-white/10 pt-6">
                            <h4 className="font-bold mb-2 text-[#D1AB66]">Designer's Tip:</h4>
                            <p className="text-sm italic text-stone-300">
                                "For silk dresses, always size down on the garment but choose 'Seamless' tech.
                                The gap is your enemy, not the tightness."
                            </p>
                        </div>
                    </div>

                    {/* Cross Sell - Context Aware */}
                    <div className="border border-stone-200 p-6 rounded-2xl">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-stone-500 mb-4">Complete The Look</h4>
                        <div className="flex gap-4 items-center mb-4">
                            <div className="w-16 h-16 bg-stone-100 rounded-lg flex items-center justify-center">🧶</div>
                            <div>
                                <p className="font-bold text-[#2C2420]">Boob Tape Roll</p>
                                <p className="text-sm text-stone-500">$18.00</p>
                            </div>
                            <button className="ml-auto w-8 h-8 rounded-full border border-stone-300 flex items-center justify-center hover:bg-[#2C2420] hover:text-white transition-colors">
                                +
                            </button>
                        </div>
                        <div className="flex gap-4 items-center">
                            <div className="w-16 h-16 bg-stone-100 rounded-lg flex items-center justify-center">🌸</div>
                            <div>
                                <p className="font-bold text-[#2C2420]">Silicone Covers</p>
                                <p className="text-sm text-stone-500">$12.00</p>
                            </div>
                            <button className="ml-auto w-8 h-8 rounded-full border border-stone-300 flex items-center justify-center hover:bg-[#2C2420] hover:text-white transition-colors">
                                +
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
