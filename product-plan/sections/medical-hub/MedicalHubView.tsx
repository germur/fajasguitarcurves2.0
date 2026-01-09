import { useState } from 'react'
import { StageSelector } from './components/StageSelector'
import { ProductCard } from './components/ProductCard'
import data from '../../../product/sections/medical-hub/data.json'
import type { MedicalHubData } from '../../../product/sections/medical-hub/types'

// Force type casting for sample data
const sampleData = data as unknown as MedicalHubData

export default function MedicalHubView() {
    const [selectedStage, setSelectedStage] = useState('Stage 2')

    const filteredProducts = sampleData.products.filter(
        (p) => p.stage === selectedStage
    )

    return (
        <div className="bg-stone-50 min-h-screen pb-20">
            {/* Hero Header */}
            <div className="bg-[#2C2420] text-white py-12 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="inline-block bg-[#D1AB66] text-[#2C2420] text-xs font-bold px-3 py-1 rounded-full mb-4">
                        DOCTOR RECOMMENDED
                    </span>
                    <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-[#F5EDDF]">
                        Medical Recovery Hub
                    </h1>
                    <p className="text-lg text-stone-300 max-w-2xl mx-auto">
                        Authorized compression garments for every stage of your journey.
                        From standard recovery to Brazilian Butt Lift (BBL) specialized care.
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 -mt-8 relative z-10">
                <StageSelector
                    selectedStage={selectedStage}
                    onSelect={setSelectedStage}
                />
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-6 mt-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-serif text-2xl text-[#2C2420] font-bold">
                        {selectedStage} Collection
                    </h2>
                    <span className="text-sm text-stone-500">
                        {filteredProducts.length} expert-curated items
                    </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* Educational Banner */}
                <div className="mt-16 bg-[#F5EDDF] rounded-xl p-8 flex flex-col md:flex-row items-center gap-8 border border-[#D1AB66]/30">
                    <div className="flex-1">
                        <h3 className="font-serif text-2xl text-[#A35944] font-bold mb-2">
                            Unsure about your stage?
                        </h3>
                        <p className="text-[#2C2420]">
                            Our "Recovery Timeline" guide explains exactly when to switch from
                            Stage 1 to Stage 2 based on your specific surgery date.
                        </p>
                    </div>
                    <button className="bg-[#2C2420] text-white px-6 py-3 rounded font-bold hover:bg-[#A35944] transition-colors">
                        View Recovery Timeline
                    </button>
                </div>
            </div>
        </div>
    )
}
