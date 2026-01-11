import { useEssentialsProducts } from '../hooks/useEssentialsProducts';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Box, Shield, Zap } from 'lucide-react';
import { useMemo } from 'react';
import { BraCard } from '../components/silo-essentials/BraCard';
import { EssentialsFAQ } from '../components/silo-essentials/EssentialsFAQ';
import { AnatomyOfRecovery } from '../components/silo-essentials/AnatomyOfRecovery';

export default function EssentialsPage() {
    const { products, loading, error } = useEssentialsProducts();
    const [searchParams] = useSearchParams();
    const activeTag = searchParams.get('tag');

    const filteredProducts = useMemo(() => {
        if (!activeTag) return products;
        return products.filter(p => p.tags && p.tags.some((t: string) => t.toLowerCase() === activeTag.toLowerCase() || t.toLowerCase().includes(activeTag.toLowerCase())));
    }, [products, activeTag]);

    return (
        <div className="bg-white min-h-screen font-sans selection:bg-[#D4AF37] selection:text-white">

            {/* BLOCK 1: HERO "SUPPORT SYSTEMS" */}
            <div className="pt-12 pb-20 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Copy */}
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 bg-[#F5EDDF] text-[#A35944] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                            <Shield size={14} />
                            Post-Surgical Support
                        </div>
                        {/* H1 Semántico SEO */}
                        <h1 className="text-4xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight">
                            Soporte Post-Quirúrgico y <br /> <span className="text-[#D4AF37]">Corrección de Postura.</span>
                        </h1>
                        <p className="text-xl text-gray-500 font-light border-l-4 border-[#D4AF37] pl-4">
                            Diseñados para sostener tu busto y corregir tu postura mientras duermes. Sin aros, sin costuras molestas.
                        </p>
                        <div className="flex gap-4 pt-4">
                            <a href="#showcase" className="bg-[#2C2420] text-white px-8 py-4 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-gray-800 transition-all flex items-center gap-2">
                                Ver Brasieres <ArrowRight size={16} />
                            </a>
                        </div>
                    </div>

                    {/* Right: Technical Visual */}
                    <div className="relative h-[500px] bg-gray-100 rounded-[2rem] overflow-hidden flex items-center justify-center shadow-lg">
                        <img
                            src="/assets/essentials-flatlay.jpg"
                            alt="Brasier Post Quirurgico y Accesorios"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="absolute bottom-8 right-8 text-white text-right">
                            <h3 className="font-bold text-2xl">Medical Grade</h3>
                            <p className="text-sm opacity-90">Post-Op & Daily Use</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* BLOCK 2: ANATOMY OF RECOVERY */}
            <div id="anatomy">
                <AnatomyOfRecovery />
            </div>

            {/* BLOCK 3: PRODUCT SHOWCASE (EDITORIAL LAYOUT) */}
            <div id="showcase" className="bg-[#FAF9F6] py-24 px-6 border-t border-gray-100">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6 text-center md:text-left">
                        <div>
                            <h2 className="text-3xl font-serif font-bold text-gray-900">
                                {activeTag ? `Filtrado: ${activeTag}` : 'Colección Esencial'}
                            </h2>
                            <p className="text-sm text-gray-500 mt-2 max-w-lg">
                                {activeTag ? `Mostrando productos con etiqueta "${activeTag}"` : 'Selección curada para una recuperación sin dolor.'}
                            </p>
                        </div>

                        {!loading && !error && (
                            <span className="text-xs font-bold text-[#D4AF37] border border-[#D4AF37]/30 px-4 py-2 rounded-full uppercase tracking-widest">
                                {filteredProducts.length} Modelos Disponibles
                            </span>
                        )}
                    </div>

                    {loading ? (
                        <div className="py-20 text-center animate-pulse">Loading essentials...</div>
                    ) : error ? (
                        <div className="py-20 text-center text-red-500">
                            <p>{error}</p>
                        </div>
                    ) : products.length === 0 ? (
                        <div className="py-20 text-center border-2 border-dashed border-gray-200 rounded-xl">
                            <Box size={48} className="mx-auto text-gray-300 mb-4" />
                            <h3 className="text-gray-900 font-bold">Collection Empty</h3>
                        </div>
                    ) : (
                        // EDITORIAL LAYOUT CHANGE: grid-cols-1 md:grid-cols-3
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {filteredProducts.map(p => (
                                <BraCard key={p.id} product={p} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* BLOCK 3.5: FAQ (SEO DENSITY) */}
            <EssentialsFAQ />

            {/* BLOCK 4: BUNDLE CREATOR (Static Promo for now) */}
            <div className="py-24 px-6 max-w-7xl mx-auto">
                <div className="bg-[#2C2420] rounded-[3rem] p-8 md:p-20 text-white text-center relative overflow-hidden shadow-2xl">
                    <div className="relative z-10">
                        <p className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase mb-4">Complete your Kit</p>
                        <h2 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">
                            Recuperación <span className="italic font-light">Inteligente</span>
                        </h2>
                        <p className="text-white/70 mb-10 max-w-2xl mx-auto text-lg">
                            Combina tu brasier con una faja Stage 2 y obtén un 15% de descuento automático.
                        </p>
                        <div className="flex flex-col md:flex-row gap-6 justify-center">
                            <Link to="/collections/recovery" className="bg-white text-[#2C2420] px-10 py-4 rounded-full font-bold hover:bg-[#D4AF37] hover:text-white transition-all shadow-lg transform hover:-translate-y-1">
                                Ver Fajas Stage 2
                            </Link>
                        </div>
                    </div>
                    {/* Background decoration */}
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                </div>
            </div>

        </div>
    );
}
