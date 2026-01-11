import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, UserCheck } from 'lucide-react'
import { RecoveryTimeline, type Stage } from '../../storefront/components/medical/RecoveryTimeline'
import { EducationModule } from '../../storefront/components/medical/EducationModule'
import { ShopifyCollectionGrid } from '../../storefront/components/shopify/ShopifyCollectionGrid'

export default function MedicalHubView() {
    const [selectedStage, setSelectedStage] = useState<Stage>('Stage 2')

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

                    {/* Shopify Data Integration */}
                    {selectedStage === 'Stage 2' || selectedStage === 'Stage 1' || selectedStage === 'Supplies' ? (
                        <ShopifyCollectionGrid
                            handle={
                                selectedStage === 'Supplies'
                                    ? 'accesorios'
                                    : 'post-quirurgica'
                            }
                        />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                            {/* Fallback / Loading State could go here */}
                        </div>
                    )}
                </div>

                {/* Stage Transition CTA (SEO & UX Journey) */}
                {selectedStage === 'Stage 1' && (
                    <div className="bg-[#F5EDDF] p-8 md:p-12 rounded-3xl mb-24 flex flex-col md:flex-row items-center justify-between gap-8 border border-[#D1AB66]/20 shadow-sm">
                        <div className="md:w-2/3">
                            <span className="text-[#A35944] font-bold tracking-widest text-xs uppercase mb-2 block">Next Step in Recovery</span>
                            <h3 className="font-serif text-3xl text-[#2C2420] font-bold mb-3">Ready to Sculpt?</h3>
                            <p className="text-stone-600 text-lg">
                                Once your drains are out (typically 4 weeks post-op), it's time to switch to high compression to contour your waist and protect your results.
                            </p>
                        </div>
                        <button
                            onClick={() => setSelectedStage('Stage 2')}
                            className="w-full md:w-auto bg-[#2C2420] text-[#D1AB66] px-8 py-4 rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-[#D1AB66] hover:text-[#2C2420] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            Shop Stage 2 Fajas
                        </button>
                    </div>
                )}

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
                            <Link to="/tools/calculator" className="bg-[#D1AB66] text-[#2C2420] px-8 py-3 rounded-full font-bold hover:bg-[#F5EDDF] transition-colors">
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
