import { VisualizerSlider } from './components/VisualizerSlider'
import { CollectionHero } from '../../storefront/components/guitar-curves/CollectionHero'
import { TechSpecsModal } from '../../storefront/components/guitar-curves/TechSpecsModal'
import { Link } from 'react-router-dom'
import data from '../../../product/sections/guitar-curves/data.json'

// Quick interfaces for sample data mapping
interface Product {
    id: string
    title: string
    price: number
    image: string
    buttLift: string
    tags: string[]
    isBestSeller?: boolean
}

const products: Product[] = (data as unknown as { products: Product[] }).products

export default function GuitarCurvesView() {
    return (
        <div className="bg-white min-h-screen pb-20 animate-fade-in">

            {/* 1. Hero Section with Video & Ratio Calculator */}
            <CollectionHero />

            {/* 2. Interactive Visualizer */}
            <section className="bg-white">
                <VisualizerSlider />
            </section>

            {/* 3. Product Grid (Bento Style) */}
            <div className="max-w-7xl mx-auto px-6 mt-16">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                    <div>
                        <h2 className="font-serif text-4xl text-[#2C2420] font-bold mb-2">Signature Silos</h2>
                        <p className="text-stone-500 max-w-md">Engineered for the specific needs of the post-op and aesthetic community.</p>
                    </div>
                    {/* Filter Bar */}
                    <div className="flex flex-wrap gap-2">
                        {['All', 'Hourglass', 'BBL Shorts', 'Plus Size'].map(filter => (
                            <button key={filter} className="px-5 py-2 rounded-full border border-stone-200 text-sm font-bold hover:border-[#D1AB66] hover:text-[#D1AB66] transition-colors first:bg-[#2C2420] first:text-white first:border-transparent">
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Featured Large Card (Bento span) */}
                    <div className="lg:col-span-2 relative aspect-[16/9] md:aspect-[2/1] bg-[#F5EDDF] rounded-3xl overflow-hidden flex items-center group cursor-pointer">
                        <div className="w-1/2 p-8 md:p-12 z-10">
                            <span className="text-[#A35944] font-bold tracking-widest text-xs uppercase mb-3 block">BEST SELLER</span>
                            <h3 className="font-serif text-3xl md:text-4xl text-[#2C2420] font-bold mb-4">The Extreme Hourglass</h3>
                            <p className="text-stone-600 mb-8 max-w-sm text-sm md:text-base">Our flagship design. Maximum waist compression, zero hip compression.</p>
                            <Link to="/store/products/extreme-hourglass" className="inline-block bg-[#2C2420] text-[#F5EDDF] px-8 py-3 rounded-full font-bold text-sm tracking-widest hover:bg-black transition-all">
                                SHOP NOW
                            </Link>
                        </div>
                        <div className="absolute right-0 top-0 bottom-0 w-3/5 bg-[url('https://images.unsplash.com/photo-1605763240004-7e93b172d754?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center md:mask-linear-slide" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#F5EDDF] via-[#F5EDDF]/80 to-transparent pointer-events-none" />
                    </div>

                    {/* Standard Cards */}
                    {products.slice(0, 4).map(product => (
                        <div key={product.id} className="group flex flex-col">
                            <div className="relative aspect-[3/4] bg-[#FAF9F6] rounded-3xl mb-4 overflow-hidden">
                                {product.image ? (
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-4xl opacity-20">👙</div>
                                )}

                                {product.isBestSeller && (
                                    <span className="absolute top-4 left-4 bg-[#D1AB66] text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase">
                                        HOT
                                    </span>
                                )}

                                {/* Quick Actions */}
                                <div className="absolute inset-x-0 bottom-4 px-4 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                                    <TechSpecsModal
                                        trigger={
                                            <button className="bg-white/90 backdrop-blur text-[#2C2420] text-xs font-bold px-4 py-2 rounded-full shadow-lg hover:bg-white transition-colors">
                                                VIEW TECH
                                            </button>
                                        }
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {product.tags.map(tag => (
                                        <span key={tag} className="text-[10px] uppercase font-bold text-[#A35944] bg-[#F5EDDF]/50 px-2 py-1 rounded">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="font-serif font-bold text-[#2C2420] text-xl leading-tight group-hover:underline decoration-[#D1AB66] decoration-2 underline-offset-4">
                                    {product.title}
                                </h3>
                                <div className="flex items-center justify-between mt-1">
                                    <p className="text-xs text-stone-500 font-medium uppercase tracking-wide">Lift: {product.buttLift}</p>
                                    <span className="font-bold text-[#2C2420]">${product.price}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
