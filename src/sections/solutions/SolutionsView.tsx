import { useState, useRef } from 'react';
import { Play, ShieldAlert } from 'lucide-react';
import { SymptomGrid } from '../../storefront/components/solutions/SymptomGrid';
import { SolutionDeepDive } from '../../storefront/components/solutions/SolutionDeepDive';
import { ExpertFAQ } from '../../storefront/components/solutions/ExpertFAQ';
import data from '../../storefront/data/sources/pain-points.json';
import { useStore } from '../../storefront/hooks/useStoreContext';

// Types
interface TechSolution {
    title: string;
    description: string;
    productId: string;
}

interface Symptom {
    id: string;
    label: string;
    description: string;
    icon: string;
    painPoint: string;
    techSolution: TechSolution;
}

const symptoms: Symptom[] = data.symptoms;
const faqs = data.faq;

export default function SolutionsView() {
    const [selectedSymptom, setSelectedSymptom] = useState<Symptom | null>(null);
    const deepDiveRef = useRef<HTMLDivElement>(null);
    const { addToCart } = useStore();

    const handleSymptomSelect = (symptom: Symptom) => {
        setSelectedSymptom(symptom);
        setTimeout(() => {
            deepDiveRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    const handleAddToCart = () => {
        if (!selectedSymptom) return;
        addToCart({
            id: selectedSymptom.techSolution.productId,
            title: `Solution for ${selectedSymptom.label}`,
            price: 85, // Mock price
            image: "https://images.unsplash.com/photo-1596451990171-85577f480351?q=80&w=800&auto=format&fit=crop",
            category: 'Solutions',
        }, 'Medium');
    };

    return (
        <div className="bg-white min-h-screen pb-20 font-sans animate-fade-in">

            {/* Split Hero */}
            <div className="grid md:grid-cols-2 min-h-[80vh]">
                {/* Left: The Pain (Grayscale) */}
                <div className="bg-stone-100 flex items-center justify-center p-12 relative overflow-hidden grayscale">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605763240004-7e93b172d754?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
                    <div className="relative z-10 max-w-md">
                        <span className="inline-block px-3 py-1 bg-stone-800 text-white text-[10px] uppercase font-bold tracking-widest rounded-full mb-6">
                            The Problem
                        </span>
                        <h1 className="font-serif text-5xl font-bold text-[#2C2420] mb-6 leading-tight">
                            Stop Suffering for Beauty.
                        </h1>
                        <p className="text-xl text-stone-500 font-light mb-8">
                            Generic sizing forces your body into a mold that fights back. Rolls. Burns. Pain.
                        </p>
                        <div className="flex items-center gap-2 text-stone-400 text-sm font-bold uppercase tracking-wider">
                            <ShieldAlert className="w-4 h-4" />
                            <span>Warning: Cheap Fajas</span>
                        </div>
                    </div>
                </div>

                {/* Right: The Solution (Gold) */}
                <div className="bg-[#2C2420] flex items-center justify-center p-12 relative overflow-hidden text-[#F5EDDF]">
                    {/* Video Placeholder */}
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay" />

                    <div className="relative z-10 max-w-md pl-8 border-l-2 border-[#D1AB66]">
                        <span className="inline-block px-3 py-1 bg-[#D1AB66] text-[#2C2420] text-[10px] uppercase font-bold tracking-widest rounded-full mb-6">
                            The Guitar Fix
                        </span>
                        <h2 className="font-serif text-4xl font-bold mb-6 leading-tight">
                            Engineered for <br />
                            <span className="text-[#D1AB66] italic">Peace of Mind.</span>
                        </h2>
                        <p className="text-xl text-stone-300 font-light mb-8">
                            Most shapewear problems come from generic sizing. We engineered solutions for your specific curves.
                        </p>
                        <button className="flex items-center gap-3 bg-[#F5EDDF] text-[#2C2420] px-8 py-4 rounded-full font-bold hover:bg-[#D1AB66] transition-colors shadow-lg">
                            <Play className="w-4 h-4 fill-current" />
                            Watch The Difference
                        </button>
                    </div>
                </div>
            </div>

            {/* Symptom Checker */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#2C2420] mb-4">
                        What's hurting you?
                    </h2>
                    <p className="text-stone-500 text-lg">Click a symptom to reveal the Guitar Tech solution.</p>
                </div>

                <div className="mb-20">
                    <SymptomGrid
                        symptoms={symptoms}
                        onSelect={handleSymptomSelect}
                    />
                </div>

                {/* Deep Dive Section */}
                <div ref={deepDiveRef} className="scroll-mt-24 mb-24">
                    {selectedSymptom && (
                        <div className="animate-fade-in-up">
                            <SolutionDeepDive
                                symptomName={selectedSymptom.label}
                                description={selectedSymptom.description}
                                solutionTitle={selectedSymptom.techSolution.title}
                                solutionDescription={selectedSymptom.techSolution.description}
                                productId={selectedSymptom.techSolution.productId}
                                onAddToCart={handleAddToCart}
                            />
                        </div>
                    )}
                </div>

                {/* FAQ */}
                <ExpertFAQ faqs={faqs} />

            </div>
        </div>
    );
}
