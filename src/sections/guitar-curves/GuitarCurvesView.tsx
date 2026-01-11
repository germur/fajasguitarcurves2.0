import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, AlertTriangle, ArrowRight } from 'lucide-react';

export default function GuitarCurvesView() {
    return (
        <div className="bg-black text-white font-sans selection:bg-[#D4AF37] selection:text-black animate-fade-in">

            {/* 1. HERO TECH: THE IMPOSSIBLE FIT */}
            <section className="h-screen flex items-center justify-center relative overflow-hidden">
                {/* Background Video/Image with Technical Overlay */}
                <div className="absolute inset-0 z-0 opacity-40">
                    <img
                        src="/assets/guitar-curves-featured.jpg"
                        alt="Guitar Curves Tech"
                        className="w-full h-full object-cover grayscale brightness-50"
                    />
                    {/* Architectural Grid Overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
                </div>

                <div className="z-10 text-center max-w-5xl px-4 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="flex justify-center mb-6">
                            <span className="border border-[#D4AF37] text-[#D4AF37] px-4 py-1 text-[10px] md:text-xs font-mono tracking-[0.4em] uppercase backdrop-blur-md">
                                Proprietary Technology
                            </span>
                        </div>

                        <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl mb-8 leading-[0.9] tracking-tighter">
                            The Guitar Cut™
                        </h1>

                        <p className="text-xl md:text-3xl font-light text-gray-300 max-w-3xl mx-auto leading-tight mb-12">
                            Desafiando la Geometría Standard. <br />
                            <span className="text-[#D4AF37] font-mono text-lg md:text-xl mt-4 block">
                                ◄ WAIST: XS • HIPS: XL ►
                            </span>
                        </p>

                        <p className="text-sm md:text-base text-gray-500 max-w-xl mx-auto border-t border-gray-800 pt-8 font-mono">
                            La industria asume que si eres L de cadera, eres L de cintura. <br />
                            Nosotros sabemos que la matemática de tus curvas es diferente.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 2. THE INTERACTIVE COMPARISON (GAP vs SNATCH) */}
            <section className="py-24 px-6 bg-[#0a0a0a] border-t border-gray-900">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">

                        {/* THE COMPETITION (Fail) */}
                        <div className="relative group opacity-50 hover:opacity-100 transition-opacity duration-500">
                            <div className="absolute top-4 left-4 bg-red-500/20 text-red-500 border border-red-500/50 px-3 py-1 text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-2">
                                <AlertTriangle size={14} /> Standard Fit
                            </div>
                            <div className="aspect-[3/4] bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 relative">
                                <img src="/assets/shapewear-fail-gap.jpg" alt="Waist Gap" className="w-full h-full object-cover grayscale opacity-40 mix-blend-overlay" />
                                {/* Overlay UI */}
                                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 text-center text-red-400">
                                    <div className="w-12 h-12 rounded-full border-2 border-red-500/50 flex items-center justify-center mx-auto mb-2 bg-black/50 backdrop-blur">⚠️</div>
                                    <p className="font-mono text-xs uppercase tracking-widest">Back Gap</p>
                                </div>
                                <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 text-center text-red-400">
                                    <div className="w-12 h-12 rounded-full border-2 border-red-500/50 flex items-center justify-center mx-auto mb-2 bg-black/50 backdrop-blur">⚠️</div>
                                    <p className="font-mono text-xs uppercase tracking-widest">Flattening</p>
                                </div>
                            </div>
                            <h3 className="text-xl font-serif text-gray-500 mt-6 text-center">"The Gap"</h3>
                        </div>

                        {/* GUITAR CURVES (Success) */}
                        <div className="relative transform md:scale-105 z-10">
                            <div className="absolute top-4 left-4 bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/50 px-3 py-1 text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-2">
                                <Check size={14} /> Guitar Cut
                            </div>
                            <div className="aspect-[3/4] bg-[#111] rounded-2xl overflow-hidden border-2 border-[#D4AF37] shadow-[0_0_50px_rgba(212,175,55,0.1)] relative">
                                <img src="/assets/recovery-hands.png" alt="Perfect Fit" className="w-full h-full object-cover opacity-80" />
                                {/* Overlay UI */}
                                <div className="absolute top-1/3 right-10 flex items-center gap-3">
                                    <div className="text-right">
                                        <p className="text-[#D4AF37] font-bold text-xs uppercase tracking-widest">High Compression</p>
                                        <p className="text-white font-mono text-[10px]">Powernet Level 3</p>
                                    </div>
                                    <div className="w-3 h-3 bg-[#D4AF37] rounded-full animate-ping"></div>
                                </div>
                                <div className="absolute bottom-1/3 left-10 flex items-center gap-3">
                                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-ping"></div>
                                    <div className="text-left">
                                        <p className="text-blue-400 font-bold text-xs uppercase tracking-widest">Zero Compression</p>
                                        <p className="text-white font-mono text-[10px]">Bidirectional Lycra</p>
                                    </div>
                                </div>
                            </div>
                            <h3 className="text-3xl font-serif text-[#D4AF37] mt-6 text-center">"The Snatch"</h3>
                        </div>

                    </div>
                </div>
            </section>

            {/* 3. THE "2-SIZE" PROBLEM (SEO Block) */}
            <section className="py-24 px-6 bg-white text-stone-900 overflow-hidden">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
                    <div className="md:w-1/2">
                        <span className="font-mono text-stone-400 text-xs tracking-widest uppercase mb-4 block">Problem Statement</span>
                        <h2 className="font-serif text-4xl md:text-6xl text-[#2C2420] mb-8 leading-tight">
                            El Problema de las <br /> <span className="italic text-[#A35944]">Dos Tallas.</span>
                        </h2>
                        <div className="prose prose-lg text-stone-600 font-light">
                            <p className="mb-6">
                                Si tienes una cintura de <strong>28 pulgadas (S)</strong> pero una cadera de <strong>42 pulgadas (XL)</strong>, estás en el limbo de la moda.
                            </p>
                            <p className="mb-8">
                                Las marcas tradicionales escalan linealmente: si suben la cadera, sueltan la cintura. El resultado es esa molesta "bolsa de aire" en la espalda baja.
                                Nuestro <span className="font-bold text-[#2C2420]">Guitar Cut™</span> fusiona dos moldes en uno: arquitectura XS arriba, capacidad XL abajo.
                            </p>

                            <div className="flex gap-4">
                                <div className="border-l-2 border-[#2C2420] pl-4">
                                    <p className="font-bold text-2xl">0.7</p>
                                    <p className="text-xs uppercase tracking-widest text-stone-500">Golden Ratio</p>
                                </div>
                                <div className="border-l-2 border-[#D4AF37] pl-4">
                                    <p className="font-bold text-2xl">360°</p>
                                    <p className="text-xs uppercase tracking-widest text-stone-500">Sculpting</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Visual Graph / Size Chart */}
                    <div className="md:w-1/2 bg-stone-100 p-12 rounded-3xl relative">
                        <div className="space-y-6 font-mono text-xs uppercase tracking-widest">
                            {/* Bar 1 */}
                            <div>
                                <div className="flex justify-between mb-2 text-stone-500">
                                    <span>Standard Brand</span>
                                    <span>Linear Scaling</span>
                                </div>
                                <div className="h-2 bg-stone-300 rounded-full w-full relative overflow-hidden">
                                    <div className="absolute inset-0 bg-stone-300"></div>
                                </div>
                            </div>

                            {/* Bar 2 */}
                            <div>
                                <div className="flex justify-between mb-2 text-[#2C2420] font-bold">
                                    <span>Guitar Curves</span>
                                    <span>Exponential Scaling</span>
                                </div>
                                <div className="h-4 bg-[#2C2420] rounded-full w-full relative overflow-hidden flex">
                                    <div className="w-[30%] bg-[#D4AF37] h-full"></div> {/* Waist */}
                                    <div className="w-[70%] bg-[#2C2420] h-full"></div> {/* Hip */}
                                </div>
                                <div className="flex justify-between mt-2 text-[10px] text-[#D4AF37]">
                                    <span>Waist (Tight)</span>
                                    <span className="text-[#2C2420]">Hips (Free)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. CURATED COLLECTION (Elite 3) */}
            <section className="py-24 px-6 bg-[#0E0E0E]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="font-mono text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-4 block">
                            The Collection
                        </span>
                        <h2 className="font-serif text-4xl md:text-5xl mb-4">Ingeniería Guitar Disponible en:</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* CARD 1: RECOVERY */}
                        <Link to="/collections/recovery" className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-[#1a1a1a] block border border-white/5 hover:border-[#D4AF37]/50 transition-colors">
                            <img src="/assets/recovery-hands.png" alt="Recovery" className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                            <div className="absolute bottom-8 left-8 right-8">
                                <span className="font-mono text-xs text-[#D4AF37] uppercase tracking-widest mb-2 block">Stage 2</span>
                                <h3 className="font-serif text-3xl mb-2">The Recovery Guitar</h3>
                                <div className="h-px w-0 bg-[#D4AF37] group-hover:w-full transition-all duration-500 mb-4"></div>
                                <span className="text-sm text-gray-400 flex items-center gap-2 group-hover:text-white transition-colors">
                                    Ver Especificaciones <ArrowRight size={14} />
                                </span>
                            </div>
                        </Link>

                        {/* CARD 2: SCULPT */}
                        <Link to="/collections/sculpt" className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-[#1a1a1a] block border border-white/5 hover:border-[#D4AF37]/50 transition-colors">
                            <img src="https://images.unsplash.com/photo-1605763240004-741b7f72e529?q=80&w=800&auto=format&fit=crop" alt="Sculpt" className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                            <div className="absolute bottom-8 left-8 right-8">
                                <span className="font-mono text-xs text-[#D4AF37] uppercase tracking-widest mb-2 block">Extreme Waist</span>
                                <h3 className="font-serif text-3xl mb-2">The Sculpt Guitar</h3>
                                <div className="h-px w-0 bg-[#D4AF37] group-hover:w-full transition-all duration-500 mb-4"></div>
                                <span className="text-sm text-gray-400 flex items-center gap-2 group-hover:text-white transition-colors">
                                    Ver Especificaciones <ArrowRight size={14} />
                                </span>
                            </div>
                        </Link>

                        {/* CARD 3: DAILY */}
                        <Link to="/collections/sculpt?tag=Daily+Use" className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-[#1a1a1a] block border border-white/5 hover:border-[#D4AF37]/50 transition-colors">
                            <img src="/assets/essentials-flatlay.jpg" alt="Daily" className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                            <div className="absolute bottom-8 left-8 right-8">
                                <span className="font-mono text-xs text-[#D4AF37] uppercase tracking-widest mb-2 block">Invisibility</span>
                                <h3 className="font-serif text-3xl mb-2">The Daily Guitar</h3>
                                <div className="h-px w-0 bg-[#D4AF37] group-hover:w-full transition-all duration-500 mb-4"></div>
                                <span className="text-sm text-gray-400 flex items-center gap-2 group-hover:text-white transition-colors">
                                    Ver Especificaciones <ArrowRight size={14} />
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
}
