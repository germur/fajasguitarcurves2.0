import { useState } from 'react'
import { Activity, AlertCircle } from 'lucide-react'
import data from '../../../product/sections/pain-points/data.json'
import { PrescriptionCard } from './components/PrescriptionCard'

interface PainPoint {
    id: string
    title: string
    icon: string
    description: string
    solutionHeadline: string
    solutionSub: string
    products: unknown[]
}

const painPoints: PainPoint[] = (data as unknown as { painPoints: PainPoint[] }).painPoints

export default function PainPointsView() {
    const [selectedPain, setSelectedPain] = useState<PainPoint>(painPoints[0])

    return (
        <div className="bg-[#FFFFF] min-h-screen pb-20 font-sans">
            {/* Header */}
            <div className="bg-[#2C2420] text-[#F5EDDF] pt-20 pb-16 px-6 text-center">
                <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-bold mb-6">
                    <Activity size={14} />
                    <span>THE CLINIC</span>
                </div>
                <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">
                    What's your concern?
                </h1>
                <p className="text-stone-300 text-lg max-w-xl mx-auto">
                    We don't just hide problems. We engineer solutions.
                    Select an area to see the prescription.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-6 -mt-10 mb-16 relative z-10">
                {/* Visual Triage Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {painPoints.map(point => (
                        <button
                            key={point.id}
                            onClick={() => setSelectedPain(point)}
                            className={`
                                p-6 rounded-xl text-left transition-all duration-300 border
                                ${selectedPain.id === point.id
                                    ? 'bg-white border-[#D1AB66] shadow-xl ring-1 ring-[#D1AB66] scale-105 z-10'
                                    : 'bg-stone-50 border-stone-200 hover:bg-white hover:shadow-lg text-stone-500'
                                }
                            `}
                        >
                            <span className="text-4xl mb-3 block">{point.icon}</span>
                            <span className={`font-bold block ${selectedPain.id === point.id ? 'text-[#2C2420]' : 'text-stone-400'}`}>
                                {point.title}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Diagnosis Area */}
            <div className="max-w-5xl mx-auto px-6">
                <div className="flex flex-col md:flex-row gap-12 items-start">

                    {/* The Condition (Left) */}
                    <div className="md:w-1/3 sticky top-10">
                        <div className="bg-[#F5EDDF] p-8 rounded-2xl">
                            <h3 className="text-[#A35944] font-bold tracking-widest text-xs uppercase mb-2">DIAGNOSIS</h3>
                            <h2 className="font-serif text-3xl text-[#2C2420] font-bold mb-4">{selectedPain.title}</h2>
                            <p className="text-[#2C2420] mb-6 leading-relaxed opacity-80">
                                {selectedPain.description}
                            </p>
                            <div className="bg-white/50 p-4 rounded-lg flex gap-3 text-sm text-[#A35944] font-bold">
                                <AlertCircle size={20} className="shrink-0" />
                                <p>This is structural, not just fat. Standard shapewear won't fix it.</p>
                            </div>
                        </div>
                    </div>

                    {/* The Cure (Right) */}
                    <div className="md:w-2/3 w-full">
                        <div className="mb-8">
                            <h3 className="text-[#D1AB66] font-bold tracking-widest text-xs uppercase mb-2">PRESCRIPTION</h3>
                            <h2 className="font-serif text-3xl text-[#2C2420] font-bold mb-2">{selectedPain.solutionHeadline}</h2>
                            <p className="text-stone-500 text-lg">{selectedPain.solutionSub}</p>
                        </div>

                        <div className="space-y-4">
                            {selectedPain.products.map(product => (
                                <PrescriptionCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
