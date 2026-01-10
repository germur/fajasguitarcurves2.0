import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

export function SiloBentoGrid() {
    return (
        <section className="py-20 bg-[#FAF9F6]">
            <div className="max-w-7xl mx-auto px-6">

                <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#2C2420] mb-2 text-center">
                    Elige tu Objetivo de Moldeo
                </h2>
                <p className="text-center text-stone-500 mb-10 max-w-2xl mx-auto">Selecciona tu etapa o necesidad para ver las fajas diseñadas específicamente para ti.</p>

                {/* Bento Grid Layout - Mobile First (Stacked -> Grid) */}
                <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-[1200px] md:h-[600px]">

                    {/* 1. Recuperación Lipo/BBL (Large - 2x2) */}
                    <Link to="/medical" className="group relative md:col-span-2 md:row-span-2 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
                        <img
                            src="https://images.unsplash.com/photo-1605289982774-9a6fef564df8?q=80&w=800&auto=format&fit=crop" // Placeholder: Clinical/Clean look
                            alt="Recuperación Lipo y BBL"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 text-white p-4">
                            <span className="bg-[#D32F2F] text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block tracking-widest text-white">RECOMENDADO POR CIRUJANOS</span>
                            <h3 className="font-serif text-3xl md:text-4xl font-bold mb-2">Recuperación Lipo/BBL</h3>
                            <p className="text-sm text-stone-200 mb-4 max-w-xs">Compresión médica certificada para Lipo, BBL y Abdominoplastia.</p>
                            <span className="inline-flex items-center gap-2 text-sm font-bold border-b-2 border-[#D32F2F] pb-1 hover:text-[#D32F2F] transition-colors">Ver Colección Stage 2 <ArrowUpRight size={16} /></span>
                        </div>
                    </Link>

                    {/* 2. Uso Diario & Vestidos (Medium - 1x2 Tall) */}
                    <Link to="/daily-use" className="group relative md:col-span-1 md:row-span-2 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
                        <img
                            src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=600&auto=format&fit=crop" // Placeholder: Elegant dress
                            alt="Uso Diario e Invisible"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors"></div>
                        <div className="absolute bottom-6 left-6 text-white">
                            <h3 className="font-serif text-2xl font-bold mb-2">Uso Diario & <br />Vestidos</h3>
                            <p className="text-xs text-stone-200 mb-4">Moldea tu cintura al instante. Invisible bajo la ropa.</p>
                            <span className="inline-flex items-center gap-2 text-xs font-bold bg-white/20 backdrop-blur-md px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all">Ver Colección Invisible <ArrowRight size={14} /></span>
                        </div>
                    </Link>

                    {/* 3. Recuperación Postparto (Small - 1x1) */}
                    <Link to="/maternity" className="group relative md:col-span-1 md:row-span-1 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
                        <img
                            src="https://images.unsplash.com/photo-1584634731339-252c581abfc5?q=80&w=600&auto=format&fit=crop" // Placeholder: Pregnancy/Postpartum
                            alt="Maternidad"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40"></div>
                        <div className="absolute bottom-4 left-4 text-white">
                            <h3 className="font-bold text-xl mb-1">Recuperación Postparto</h3>
                            <p className="text-[10px] text-stone-200">Postparto & Embarazo</p>
                        </div>
                    </Link>

                    {/* 4. Entrenamiento de Cintura (Small - 1x1) */}
                    <Link to="/cinturillas" className="group relative md:col-span-1 md:row-span-1 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
                        <img
                            src="https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=600&auto=format&fit=crop" // Placeholder: Fitness/Shorts
                            alt="Waist Trainer"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40"></div>
                        <div className="absolute bottom-4 left-4 text-white">
                            <h3 className="font-bold text-xl mb-1">Entrenamiento de Cintura</h3>
                            <Link to="/cinturillas" className="text-sm font-bold underline">
                                Ver Cinturillas
                            </Link>
                        </div>
                    </Link>

                </div>
            </div>
        </section>
    );
}
