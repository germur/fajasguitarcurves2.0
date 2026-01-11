
import { BBLSurvivalKit } from '../components/BBLSurvivalKit';
import { Check } from 'lucide-react';

export default function BBLKitPage() {
    return (
        <div className="bg-[#FAF9F6] min-h-screen font-sans selection:bg-[#3E322C] selection:text-white">

            {/* SEO HIDDEN */}
            <h1 className="sr-only">BBL Recovery Kit & Supplies | Lista de Suministros Post Lipo y BBL</h1>

            {/* BLOCK 1: HERO "THE PERFECT PAIR" */}
            <div className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Visual: Faja + Bra */}
                    <div className="relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
                        <img
                            src="https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=1200&auto=format&fit=crop"
                            alt="The Perfect Pair: Faja + Bra"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="absolute bottom-8 left-8 bg-white/80 backdrop-blur px-6 py-3 rounded-full text-xs font-bold tracking-widest uppercase border border-white">
                            The Post-Op Duo
                        </div>
                    </div>

                    {/* Copy */}
                    <div className="space-y-8">
                        <span className="text-[#D4AF37] font-bold tracking-widest text-sm uppercase">Limited Bundle</span>
                        <h2 className="text-4xl lg:text-6xl font-serif text-[#3E322C] leading-[1.1]">
                            Protege tu inversión. <br />
                            <span className="italic text-gray-400">Arriba y Abajo.</span>
                        </h2>
                        <p className="text-xl text-gray-600 font-light border-l-4 border-[#3E322C] pl-6">
                            Tu faja moldea tu cintura, pero tu brasier protege tu postura y tus implantes. El dúo esencial para una recuperación sin dolor.
                        </p>

                        <div className="flex flex-col gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-3">
                                <Check className="text-[#3E322C]" size={18} />
                                <span>Faja Etapa 2: Compresión médica para tu cintura.</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="text-[#3E322C]" size={18} />
                                <span>Brasier Post-Op: Soporte de espalda y sin aros.</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="text-[#3E322C]" size={18} />
                                <span>Ahorra 15% comprando juntos.</span>
                            </div>
                        </div>

                        <a href="#bundle-builder" className="inline-block bg-[#3E322C] text-white px-10 py-5 rounded-full font-bold tracking-widest text-sm hover:bg-black transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                            COMPRAR EL DÚO (-15% OFF)
                        </a>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="max-w-7xl mx-auto px-6 mb-16">
                <hr className="border-[#3E322C]/10" />
            </div>

            {/* BLOCK 3: THE INTERACTIVE CHECKLIST (High Value Conversion) */}
            <BBLSurvivalKit />

        </div>
    );
}
