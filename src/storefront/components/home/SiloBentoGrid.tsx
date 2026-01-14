import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, Shirt } from 'lucide-react';

export function SiloBentoGrid() {
    return (
        <section className="py-20 bg-[#FAF9F6]">
            <div className="max-w-7xl mx-auto px-6">

                {/* Bento Grid Layout - Asymmetric */}
                {/* Mobile: Stacked | Desktop: 4 Columns x 4 Rows */}
                <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-4 gap-4 h-auto md:h-[600px]">

                    {/* 1. Guía de Tallas Inteligente (Large - Left Col - Full Height) */}
                    <div className="group relative h-[500px] md:h-auto md:col-span-2 md:row-span-4 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-[#E8EAEB] cursor-pointer">
                        <img
                            src="/assets/smart-size-guide.jpg"
                            alt="Scan Biométrico de Cintura"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>

                        <div className="absolute top-8 left-8">
                            <span className="bg-white/90 backdrop-blur text-[#2C2420] text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase">
                                New Feature
                            </span>
                        </div>

                        <div className="absolute bottom-8 left-8 text-white max-w-sm">
                            <h3 className="font-serif text-4xl font-bold mb-2">Guía de Tallas Inteligente</h3>
                            <p className="text-sm text-stone-100 mb-6 font-medium">No adivines. Usa nuestra calculadora basada en medidas corporales reales.</p>
                            <Link
                                to="/fit-finder"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#2C2420] rounded-full font-bold text-xs tracking-widest uppercase hover:bg-[#D1AB66] hover:text-white transition-colors"
                            >
                                Calcular mi Talla <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>

                    {/* 2. Fajas Stage 2 (Medium - Right Top - 2 Rows) */}
                    <Link to="/collections/recovery" className="group relative h-[300px] md:h-auto md:col-span-2 md:row-span-2 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-[#B49286]">
                        <img
                            src="/assets/stage2-faja-bra.jpg"
                            alt="Fajas Stage 2 Post-Op"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-l from-black/60 to-transparent z-10"></div>

                        <div className="absolute top-6 right-6 z-20">
                            <span className="bg-[#D32F2F] text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase animate-pulse">
                                Best Seller
                            </span>
                        </div>

                        <div className="absolute bottom-6 left-6 text-white z-20">
                            <h3 className="font-serif text-2xl font-bold mb-1">Fajas Stage 2</h3>
                            <p className="text-xs text-stone-200">Alta compresión post-quirúrgica.</p>
                        </div>
                        <div className="absolute bottom-6 right-6 z-20">
                            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center group-hover:bg-white group-hover:text-[#2C2420] transition-colors text-white">
                                <ArrowUpRight size={20} />
                            </div>
                        </div>
                    </Link>

                    {/* 3. Brasieres & Accesorios (Medium - Right Bottom - 2 Rows - Expanded) */}
                    <Link to="/collections/bras" className="group relative h-[250px] md:h-auto md:col-span-2 md:row-span-2 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-[#EAE6E3] p-6 flex flex-col justify-between">
                        <img
                            src="/assets/fajas-group-modeling.jpg"
                            alt="Fajas y Brasieres Modeling Group"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                        />

                        <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity relative z-10">
                            <Shirt size={48} strokeWidth={1} className="text-[#2C2420]" />
                        </div>
                        <div className="relative z-10">
                            <h3 className="font-serif text-xl font-bold text-[#2C2420] leading-tight mb-2">Brasieres <br />Post-Op</h3>
                            <p className="text-[10px] text-stone-600 uppercase tracking-widest font-bold">Soporte & Comfort</p>
                        </div>
                        <div className="self-end relative z-10">
                            <ArrowRight size={16} className="text-[#2C2420] group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>

                </div>
            </div>
        </section>
    );
}
