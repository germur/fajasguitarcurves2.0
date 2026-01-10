import { Star, ShieldCheck } from 'lucide-react';

export function TrustBar() {
    return (
        <div className="bg-[#FAF9F6] border-b border-stone-200 py-6 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 text-center md:text-left">

                    {/* Trust Value 1: Doctor Recommended */}
                    <div className="flex items-center gap-3">
                        <div className="bg-[#D1AB66]/10 p-2 rounded-full text-[#D1AB66]">
                            <ShieldCheck size={24} />
                        </div>
                        <div>
                            <p className="font-bold text-[#2C2420] text-sm uppercase tracking-wider leading-tight">Doctor Recommended</p>
                            <p className="text-xs text-stone-500">In Miami, Houston & NYC</p>
                        </div>
                    </div>

                    {/* Trust Value 2: Social Proof Summary */}
                    <div className="flex items-center gap-3 border-l-0 md:border-l border-stone-200 md:pl-8">
                        <div className="flex -space-x-1">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="bg-[#D1AB66] text-white w-6 h-6 rounded-full flex items-center justify-center border border-white text-[10px]">
                                    <Star size={12} fill="currentColor" />
                                </div>
                            ))}
                        </div>
                        <div>
                            <p className="font-bold text-[#2C2420] text-sm tracking-wider leading-tight">10,000+ Snatched Dolls</p>
                            <p className="text-xs text-stone-500">Real results, no filters</p>
                        </div>
                    </div>

                    {/* Trust Value 3: Payment Logistics (Visual) */}
                    <div className="flex items-center gap-4 opacity-60 grayscale hover:grayscale-0 transition-all">
                        {/* Simplified Text Representation if SVG logos unavailable, using emojis/text for now or generic placeholders */}
                        <span className="font-bold text-xl italic text-slate-800">shop<span className="text-blue-500">Pay</span></span>
                        <span className="font-bold text-xl italic text-slate-800">afterpay<span className="text-cyan-400">━</span></span>
                        <span className="font-bold text-lg text-slate-600 border border-slate-300 rounded px-1">VISA</span>
                        <span className="font-bold text-lg text-slate-600 border border-slate-300 rounded px-1">AMEX</span>
                    </div>

                </div>
            </div>
        </div>
    );
}
