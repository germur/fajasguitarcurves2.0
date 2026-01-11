import GuitarFitFinder from './components/calculator/GuitarFitFinder';
import { SeoHead } from './components/SeoHead';
import { Star, ChevronDown, PlayCircle } from 'lucide-react';
import { useState } from 'react';

export function FitFinderPage() {
    return (
        <div className="min-h-screen bg-[#FAF9F6] pb-20">
            <SeoHead
                title="Calculadora de Talla Perfecta | Fajas Guitar Curves"
                description="Encuentra tu talla exacta en 30 segundos. Algoritmo especializado para cuerpos tipo guitarra y BBL que analiza tu proporción cintura/cadera."
                schema={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "GuitarFitFinder",
                    "applicationCategory": "LifestyleApplication",
                    "operatingSystem": "Web",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "USD"
                    }
                }}
            />

            {/* 1. HERO SECTION: The Promise */}
            <header className="bg-[#2C2420] text-[#F5EDDF] pt-12 pb-24 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000" className="w-full h-full object-cover" alt="Background" />
                </div>

                <div className="max-w-xl mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-[#D1AB66]/20 border border-[#D1AB66]/30 px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-[#D1AB66] animate-pulse"></span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#D1AB66]">Tecnología Anti-Waisting</span>
                    </div>

                    <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4 leading-tight">
                        Encuentra tu Talla de <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D1AB66] to-[#F5EDDF]">"Cuerpo Guitarra"</span> <br />
                        en 30 Segundos.
                    </h1>

                    <p className="text-stone-400 text-sm md:text-base leading-relaxed max-w-sm mx-auto mb-8">
                        Olvida las tablas genéricas. Nuestra tecnológía analiza la diferencia entre tu cintura y tus caderas para recomendarte la faja exacta.
                    </p>

                    {/* Video Placeholder (Looping) */}
                    <div className="relative w-24 h-24 mx-auto rounded-full border-4 border-[#D1AB66]/30 overflow-hidden shadow-2xl animate-fade-in group cursor-pointer">
                        <img
                            src="https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=200&fit=crop"
                            alt="Video Tutorial"
                            className="w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                            <PlayCircle size={32} className="text-white drop-shadow-lg" />
                        </div>
                    </div>
                    <p className="text-[10px] text-stone-500 mt-2 uppercase tracking-widest">Ver Tutorial (15s)</p>
                </div>
            </header>

            {/* 2. CALCULATOR MODULE (Overlapping Hero) */}
            <main className="-mt-16 px-4 relative z-20">
                <GuitarFitFinder />
            </main>

            {/* 3. SOCIAL PROOF */}
            <section className="max-w-md mx-auto px-6 mt-8 mb-16">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 relative">
                    <div className="flex gap-1 mb-3 text-[#D1AB66]">
                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                    </div>
                    <p className="text-sm text-[#2C2420] leading-relaxed italic mb-4">
                        "Tenía miedo porque soy M de cintura y XL de cadera, pero la calculadora me sugirió la L de Guitar Curves y me quedó perfecta. No me aprieta las piernas."
                    </p>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-stone-200 rounded-full flex items-center justify-center font-bold text-xs text-stone-500">MG</div>
                        <div>
                            <p className="text-xs font-bold text-[#2C2420]">María G.</p>
                            <p className="text-[10px] text-stone-400 uppercase tracking-wider">Compra Verificada • Talla Recomendada: L</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. EDUCATIONAL ACCORDION */}
            <section className="max-w-md mx-auto px-6 mb-20">
                <FAQAccordion />
            </section>

            {/* Footer Note */}
            <div className="text-center text-stone-300 text-[10px] mt-8 px-6 max-w-lg mx-auto pb-10">
                <p>No es consejo médico. Para pacientes post-operatorios recientes (0-2 semanas), considera una talla más grande por inflamación o consulta a tu cirujano.</p>
            </div>
        </div>
    );
}

function FAQAccordion() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-stone-200 rounded-2xl bg-white overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-stone-50 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <PlayCircle size={20} className="text-[#D1AB66]" />
                    <span className="font-bold text-sm text-[#2C2420]">¿Dudas de cómo medirte?</span>
                </div>
                <ChevronDown size={20} className={`text-stone-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="p-5 border-t border-stone-100 bg-[#FAF9F6]">
                    <div className="aspect-video bg-stone-200 rounded-lg mb-4 flex items-center justify-center relative group cursor-pointer overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1544435216-7788c03531b7?q=80&w=400" className="w-full h-full object-cover opacity-60" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-bold border border-white/30">Reproducir Video</span>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <p className="text-sm text-stone-600 font-bold">
                            Cómo medirte correctamente: Olvida tu talla de pantalón. Las fajas colombianas son prendas de ingeniería y requieren medidas exactas en pulgadas (in).
                        </p>
                        <div className="text-sm text-stone-500 bg-white p-3 rounded-lg border border-stone-100">
                            <strong>CINTURA:</strong> Ubica la cinta métrica justo encima de tu ombligo (la parte más estrecha de tu torso). <em>Tip Pro: Aprieta la cinta ligeramente, tal como te gustaría que te abrace la faja.</em>
                        </div>
                        <div className="text-sm text-stone-500 bg-white p-3 rounded-lg border border-stone-100">
                            <strong>CADERA:</strong> Junta los pies y pasa la cinta por la parte más prominente de tus glúteos.
                        </div>
                        <p className="text-xs text-stone-400 italic">
                            Si tus medidas te ubican entre dos tallas, elige siempre la más grande (especialmente si estás en Stage 1 o inflamada).
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
