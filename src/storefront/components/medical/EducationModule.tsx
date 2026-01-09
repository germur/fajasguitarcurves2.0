import { ArrowRight } from 'lucide-react';

export function EducationModule() {
    return (
        <div className="bg-[#FAF9F6] rounded-3xl p-8 md:p-12 border border-stone-100 overflow-hidden relative">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative z-10">
                    <span className="inline-block px-3 py-1 bg-[#D1AB66] text-white text-[10px] uppercase font-bold tracking-widest rounded-full mb-4">
                        Guitar Tech™ Logic
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2C2420] mb-6">
                        Why Standard Fajas Destroy Your Results.
                    </h2>
                    <p className="text-stone-600 mb-6 leading-relaxed">
                        Standard compression garments apply equal pressure everywhere. This flattens the newly transferred fat cells in the hips and glutes, resulting in a "square" look.
                    </p>
                    <p className="text-stone-600 mb-8 leading-relaxed">
                        <strong>Guitar Curves</strong> utilizes zone-specific compression:
                    </p>

                    <ul className="space-y-4 mb-8">
                        <li className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs shrink-0">1</span>
                            <div>
                                <span className="font-bold text-[#2C2420] block">Red Zone (High Pressure)</span>
                                <span className="text-sm text-stone-500">Waist & Tummy. Forces skin adhesion prevents fibrosis.</span>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-xs shrink-0">2</span>
                            <div>
                                <span className="font-bold text-[#2C2420] block">Green Zone (Zero Pressure)</span>
                                <span className="text-sm text-stone-500">Hips & Glutes. Allows fat cells to survive and thrive.</span>
                            </div>
                        </li>
                    </ul>

                    <button className="text-[#A35944] font-bold hover:underline flex items-center gap-2 group">
                        Read Clinical Study <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Visual Heatmap Placeholder */}
                <div className="relative aspect-[4/5] md:aspect-square bg-white rounded-2xl p-6 shadow-sm border border-stone-100 flex items-center justify-center">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-stone-50 to-transparent opacity-50" />

                    {/* Abstract Heatmap Diagram */}
                    <div className="relative w-48 h-[300px] border-4 border-stone-200 rounded-[3rem] mx-auto opacity-20"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-stone-400 text-center font-mono text-xs">
                            [HEATMAP DIAGRAM]<br />
                            Red = Waist<br />
                            Green = Hips
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
