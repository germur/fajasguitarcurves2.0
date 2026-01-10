import { VisualizerSlider } from './components/VisualizerSlider'
import { CollectionHero } from '../../storefront/components/guitar-curves/CollectionHero'
import { ShopifyCollectionGrid } from '../../storefront/components/shopify/ShopifyCollectionGrid'
import { Link } from 'react-router-dom'

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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {/* Featured Large Card (Bento span) */}
                    <div className="lg:col-span-3 relative aspect-[16/9] md:aspect-[2.5/1] bg-[#F5EDDF] rounded-3xl overflow-hidden flex items-center group cursor-pointer border border-[#D1AB66]/20">
                        <div className="w-1/2 p-8 md:p-12 z-10">
                            <span className="text-[#A35944] font-bold tracking-widest text-xs uppercase mb-3 block">BEST SELLER</span>
                            <h3 className="font-serif text-3xl md:text-5xl text-[#2C2420] font-bold mb-4">The Extreme Hourglass</h3>
                            <p className="text-stone-600 mb-8 max-w-sm text-sm md:text-lg">Our flagship design. Maximum waist compression, zero hip compression.</p>
                            <Link to="/store/products/extreme-hourglass" className="inline-block bg-[#2C2420] text-[#F5EDDF] px-8 py-3 rounded-full font-bold text-sm tracking-widest hover:bg-black transition-all shadow-xl">
                                SHOP NOW
                            </Link>
                        </div>
                        <div className="absolute right-0 top-0 bottom-0 w-3/5 bg-[url('https://images.unsplash.com/photo-1605763240004-7e93b172d754?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center md:mask-linear-slide" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#F5EDDF] via-[#F5EDDF]/80 to-transparent pointer-events-none" />
                    </div>
                </div>

                {/* Shopify Collection Grid */}
                <div className="mb-20">
                    <ShopifyCollectionGrid handle="guitar-curves" productCount={8} />
                </div>
            </div>
        </div>
    )
}
