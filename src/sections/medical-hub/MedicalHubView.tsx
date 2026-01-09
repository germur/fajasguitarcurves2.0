import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, ArrowRight, UserCheck } from 'lucide-react'
import { RecoveryTimeline, type Stage } from '../../storefront/components/medical/RecoveryTimeline'
import { EducationModule } from '../../storefront/components/medical/EducationModule'
import data from '../../storefront/data/sources/medical.json'
import { useStore } from '../../storefront/hooks/useStoreContext'

// Types for local data usage
interface MedicalProduct {
    id: string;
    title: string;
    price: number;
    image: string;
    stage: string;
    tags: string[];
    features: string[];
    isBestSeller?: boolean;
}

export default function MedicalHubView() {
    const [selectedStage, setSelectedStage] = useState<Stage>('Stage 2')
    const { addToCart } = useStore()

    // Filter products based on selected stage
    const products = data.products as MedicalProduct[]
    const filteredProducts = products.filter(p => p.stage === selectedStage)

    const handleAddToCart = (product: MedicalProduct) => {
        // Adapt to StoreProduct type
        const storeProduct = {
            ...product,
            images: [product.image],
            category: 'Medical Hub',
            description: product.features.join(', ')
        }
        addToCart(storeProduct, 'Medium') // Default size for quick add
    }

    return (
        <div className="bg-white min-h-screen pb-20 animate-fade-in">
            {/* Hero Header */}
            <div className="bg-[#FAF9F6] border-b border-stone-100 py-20 px-6 relative overflow-hidden">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="flex justify-center mb-6">
                        <span className="bg-white border border-[#D1AB66] text-[#D1AB66] text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
                            <ShieldCheck className="w-3 h-3" />
                            DOCTOR RECOMMENDED PROTOCOLS
                        </span>
                    </div>

                    <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 text-[#2C2420] text-balance">
                        Safe Recovery, <br />
                        <span className="italic text-[#B49286]">Snatched Results.</span>
                    </h1>
                    <p className="text-xl text-stone-500 max-w-2xl mx-auto font-light leading-relaxed">
                        The only authorized compression system engineered for BBL & Lipo survival.
                        Stage 1 for safety, Stage 2 for sculpting.
                    </p>
                </div>

                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-[#D1AB66]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#A35944]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
            </div>

            {/* Timeline Selector (Sticky-ish) */}
            <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-stone-100 mb-12 shadow-sm">
                <div className="max-w-5xl mx-auto px-4 py-4">
                    <RecoveryTimeline
                        activeStage={selectedStage}
                        onStageChange={setSelectedStage}
                    />
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6">

                {/* Product Grid */}
                <div className="mb-24">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-4">
                        <div>
                            <h2 className="font-serif text-3xl text-[#2C2420] font-bold">
                                {selectedStage === 'Supplies' ? 'Essential Recovery Kit' : `${selectedStage} Collection`}
                            </h2>
                            <p className="text-stone-500 mt-2">
                                {selectedStage === 'Stage 1' && "Low compression garments focused on drainage and fluid management."}
                                {selectedStage === 'Stage 2' && "High compression powernet to sculpt the waist while protecting the hips."}
                                {selectedStage === 'Supplies' && "Must-have add-ons to prevent fibrosis and accelerate healing."}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="group">
                                <div className="relative aspect-[3/4] bg-stone-50 rounded-2xl overflow-hidden mb-4 border border-stone-100">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />

                                    {product.features.includes('BBL Safe') && (
                                        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-[#A35944] text-[10px] font-bold px-2 py-1 rounded shadow-sm flex items-center gap-1">
                                            <ShieldCheck className="w-3 h-3" /> BBL SAFE
                                        </span>
                                    )}

                                    {/* Quick Add Overlay */}
                                    <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            className="w-full bg-[#2C2420] text-white py-3 rounded-xl font-bold text-sm shadow-xl hover:bg-black transition-colors"
                                        >
                                            ADD TO RECOVERY KIT
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {product.tags.slice(0, 2).map(tag => (
                                            <span key={tag} className="text-[10px] uppercase font-bold text-stone-400 bg-stone-100 px-2 py-1 rounded">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h3 className="font-bold text-[#2C2420] leading-snug mb-1 group-hover:text-[#B49286] transition-colors">
                                        {product.title}
                                    </h3>
                                    <p className="text-[#2C2420] font-medium">${product.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Education Module */}
                <div className="mb-24">
                    <EducationModule />
                </div>

                {/* Cross-Sell / Trust Footer */}
                <div className="bg-[#2C2420] rounded-3xl p-12 text-center text-[#F5EDDF] mb-12 relative overflow-hidden">
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <UserCheck className="w-12 h-12 mx-auto mb-6 text-[#D1AB66]" />
                        <h2 className="font-serif text-3xl font-bold mb-4">Not sure what size you need?</h2>
                        <p className="text-stone-300 mb-8">
                            Post-op swelling changes your size daily. Our Fit Specialists can help you predict your Stage 2 size based on your surgery date.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Link to="/store/guitar-curves" className="bg-[#D1AB66] text-[#2C2420] px-8 py-3 rounded-full font-bold hover:bg-[#F5EDDF] transition-colors">
                                Use Ratio Calculator
                            </Link>
                            <button className="px-8 py-3 rounded-full border border-stone-600 font-bold hover:border-[#D1AB66] hover:text-[#D1AB66] transition-colors">
                                Chat with Nurse
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
