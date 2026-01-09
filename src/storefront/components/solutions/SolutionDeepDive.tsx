import { ShoppingCart } from 'lucide-react';

interface SolutionDeepDiveProps {
    symptomName: string;
    description: string;
    solutionTitle: string;
    solutionDescription: string;
    productId: string; // In real app, use this to fetch product data
    onAddToCart: () => void;
}

export function SolutionDeepDive({
    symptomName,
    description,
    solutionTitle,
    solutionDescription,
    onAddToCart
}: SolutionDeepDiveProps) {
    return (
        <div id="deep-dive" className="bg-[#FAF9F6] rounded-3xl overflow-hidden border border-stone-100 shadow-xl">
            <div className="grid md:grid-cols-2">

                {/* The Problem (Left) */}
                <div className="p-12 relative bg-white">
                    <span className="inline-block px-3 py-1 bg-red-100 text-red-600 text-[10px] uppercase font-bold tracking-widest rounded-full mb-6">
                        The Symptom
                    </span>
                    <h3 className="font-serif text-3xl font-bold text-[#2C2420] mb-4">
                        {symptomName}
                    </h3>
                    <p className="text-stone-500 leading-relaxed text-lg">
                        {description}
                    </p>
                    <div className="mt-8 pt-8 border-t border-stone-100">
                        <p className="font-bold text-[#2C2420] mb-2">Why generic fajas fail:</p>
                        <p className="text-sm text-stone-400 italic">
                            "Cheap elastics rely on pressure alone. When you move, the tension breaks, causing the garment to roll or dig."
                        </p>
                    </div>
                </div>

                {/* The Solution (Right) */}
                <div className="p-12 bg-[#2C2420] text-[#F5EDDF] relative flex flex-col justify-center">
                    {/* Decor */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#D1AB66]/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />

                    <div className="relative z-10">
                        <span className="inline-block px-3 py-1 bg-[#D1AB66] text-[#2C2420] text-[10px] uppercase font-bold tracking-widest rounded-full mb-6">
                            The Guitar Fix
                        </span>
                        <h3 className="font-serif text-3xl font-bold text-white mb-4">
                            {solutionTitle}
                        </h3>
                        <p className="text-stone-300 leading-relaxed text-lg mb-8">
                            {solutionDescription}
                        </p>

                        <button
                            onClick={onAddToCart}
                            className="bg-[#F5EDDF] text-[#2C2420] px-8 py-4 rounded-xl font-bold hover:bg-[#D1AB66] transition-colors flex items-center justify-center gap-3 w-full md:w-auto"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            Buy The Solution
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
