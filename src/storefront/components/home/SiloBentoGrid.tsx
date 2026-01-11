import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, Table, Shirt } from 'lucide-react';

export function SiloBentoGrid() {
    return (
        <section className="py-20 bg-[#FAF9F6]">
            <div className="max-w-7xl mx-auto px-6">

                {/* Bento Grid Layout - Asymmetric */}
                {/* Mobile: Stacked | Desktop: 4 Columns x 4 Rows */}
                <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-4 gap-4 h-auto md:h-[600px]">

                    {/* 1. Guía de Tallas Inteligente (Large - Left Col - Full Height) */}
                    <div className="group relative md:col-span-2 md:row-span-4 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-[#E8EAEB] cursor-pointer">
                        <img
                            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop"
                            alt="Mujer midiéndose la cintura"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
                    <Link to="/medical" className="group relative md:col-span-2 md:row-span-2 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-[#B49286]">
                        <img
                            src="https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=600&auto=format&fit=crop"
                            alt="Detalle de Broches Fajas"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-l from-black/60 to-transparent"></div>

                        <div className="absolute top-6 right-6">
                            <span className="bg-[#D32F2F] text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase animate-pulse">
                                Best Seller
                            </span>
                        </div>

                        <div className="absolute bottom-6 left-6 text-white">
                            <h3 className="font-serif text-2xl font-bold mb-1">Fajas Stage 2</h3>
                            <p className="text-xs text-stone-200">Alta compresión post-quirúrgica.</p>
                        </div>
                        <div className="absolute bottom-6 right-6">
                            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center group-hover:bg-white group-hover:text-[#2C2420] transition-colors text-white">
                                <ArrowUpRight size={20} />
                            </div>
                        </div>
                    </Link>

                    {/* 3. Tablas & Espumas (Small - Right Bottom Left - 2 Rows) */}
                    <Link to="/accesorios" className="group relative md:col-span-1 md:row-span-2 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-[#F5EDDF] p-6 flex flex-col justify-between">
                        <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                            <Table size={48} strokeWidth={1} className="text-[#2C2420]" />
                        </div>
                        <div>
                            <h3 className="font-serif text-xl font-bold text-[#2C2420] leading-tight mb-2">Tablas & <br />Espumas</h3>
                            <p className="text-[10px] text-stone-500 uppercase tracking-widest font-bold">Accesorios</p>
                        </div>
                        <div className="self-end">
                            <ArrowRight size={16} className="text-[#2C2420] group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>

                    {/* 4. Brasieres (Small - Right Bottom Right - 2 Rows) */}
                    <Link to="/bras" className="group relative md:col-span-1 md:row-span-2 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-[#EAE6E3] p-6 flex flex-col justify-between">
                        <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                            <Shirt size={48} strokeWidth={1} className="text-[#2C2420]" />
                        </div>
                        <div>
                            <h3 className="font-serif text-xl font-bold text-[#2C2420] leading-tight mb-2">Brasieres <br />Post-Op</h3>
                            <p className="text-[10px] text-stone-500 uppercase tracking-widest font-bold">Soporte</p>
                        </div>
                        <div className="self-end">
                            <ArrowRight size={16} className="text-[#2C2420] group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>

                </div>
            </div>
        </section>
    );
}
