import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useRecoveryProducts } from '../hooks/useRecoveryProducts';
import { SurgeryTimelineFilter } from '../components/silo-recovery/SurgeryTimelineFilter';
import { RecoveryProductCard } from '../components/silo-recovery/RecoveryProductCard';
import { BundleBuilder } from '../components/silo-recovery/BundleBuilder';
import { MedicalAccordions } from '../components/silo-recovery/MedicalAccordions';
import { ShieldCheck, Activity, ArrowDown } from 'lucide-react';

import { SeoHead } from '../../lib/seo/SeoHead';

export default function PostSurgeryPage() {
    const { products: shopifyProducts } = useRecoveryProducts();
    const [searchParams] = useSearchParams(); // Added
    const urlTag = searchParams.get('tag'); // Get tag from URL

    // Map URL tags to Stage Tabs if possible
    const initialStage = useMemo(() => {
        if (!urlTag) return 'stage2'; // Default to Stage 2
        if (urlTag.toLowerCase().includes('bbl') || urlTag.toLowerCase().includes('guitar')) return 'bbl';
        if (urlTag.includes('Stage 3') || urlTag.includes('Stage+3')) return 'stage3';
        return 'stage2'; // Default catch-all and Stage 2
    }, [urlTag]);

    const [activeStage, setActiveStage] = useState<'stage1' | 'stage2' | 'stage3' | 'bbl'>(initialStage as any);
    const [activeTagFilter, setActiveTagFilter] = useState<string | null>(urlTag);

    // Sync state if URL changes
    useEffect(() => {
        const newTag = searchParams.get('tag');
        setActiveTagFilter(newTag);

        if (newTag?.toLowerCase().includes('bbl')) setActiveStage('bbl');
        else if (newTag?.includes('Stage 3')) setActiveStage('stage3');
        else if (newTag?.includes('Stage 2')) setActiveStage('stage2');
        else if (newTag?.includes('Stage 1') || newTag?.includes('Post-Partum')) setActiveStage('stage1');
    }, [searchParams]);

    // Handle Tab Click (RESET tag filter so tabs work)
    const handleStageChange = (stage: 'stage1' | 'stage2' | 'stage3' | 'bbl') => {
        setActiveStage(stage);
        setActiveTagFilter(null); // Clear URL tag so Tab logic takes over
    };

    // ...

    // The user explicitly wants to see REAL data.
    const displayProducts = shopifyProducts;

    // Filter Logic
    const filteredProducts = useMemo(() => {
        let filtered = displayProducts;

        // 1. If explicit Tag Filter exists (from URL), PRIORITY over Tabs
        if (activeTagFilter) {
            filtered = filtered.filter(p => p.tags && p.tags.some((t: string) => t.toLowerCase().includes(activeTagFilter.toLowerCase())));
            // If the tag corresponds to a stage, we might want to also ensure stage logic, but usually tag is specific enough.
            // But wait, if tag is 'BBL', we just show BBL items.
        } else {
            // 2. Fallback to Stage Tabs
            if (activeStage === 'bbl') {
                // Special BBL Filter: Look for "BBL" or "Guitar" tags
                filtered = filtered.filter(p => p.tags && p.tags.some((t: string) => t.toLowerCase().includes('bbl') || t.toLowerCase().includes('guitar')));
            } else if (activeStage === 'stage1') {
                // Stage 1: Soft Recovery (Post-Partum or Stage 1)
                filtered = filtered.filter(p => {
                    const tags = p.tags ? p.tags.map((t: string) => t.toLowerCase()) : [];
                    return tags.some((t: string) => t.includes('stage 1') || t.includes('stage1') || t.includes('post-partum') || t.includes('postpartum'));
                });
            } else if (activeStage === 'stage2') {
                // Stage 2: High Compression (MERGED with Stage 1/Post-Op per UX request)
                filtered = filtered.filter(p => {
                    // Is it explicit Stage 2?
                    const isStage2 = p.stage?.toLowerCase().replace(' ', '') === 'stage2' || (p.tags && p.tags.some((t: string) => t.toLowerCase().includes('stage 2')));

                    // Is it Stage 1 / Post-Partum? (Show them here so they aren't hidden)
                    const isStage1 = p.tags && p.tags.some((t: string) => t.toLowerCase().includes('stage 1') || t.toLowerCase().includes('post-partum') || t.toLowerCase().includes('postpartum'));

                    return isStage2 || isStage1;
                });
            } else {
                // Stage 3
                filtered = filtered.filter(p => {
                    const pStage = p.stage?.toLowerCase().replace(' ', ''); // 'stage3'
                    return pStage === activeStage;
                });
            }
        }
        return filtered;
    }, [displayProducts, activeStage, activeTagFilter]);

    return (
        <div className="bg-[#F9F8F6] min-h-screen font-sans selection:bg-[#3E322C] selection:text-white">
            <SeoHead
                title="Recovery Room: Fajas Post-Quirúrgicas Stage 1 & 2 | Guitar Curves"
                description="Colección especializada para BBL y Lipo. Compresión médica certificada para una recuperación segura y sin fibrosis."
                path="/collections/recovery"
                image="/assets/recovery-hands.png"
                schema={{
                    type: 'collection',
                    data: {
                        name: 'Recovery Room Collection',
                        description: 'Fajas médicas para post-operatorio Stage 1 y Stage 2.'
                    },
                    breadcrumbs: [
                        { name: 'Home', item: '/' },
                        { name: 'Recovery Room', item: '/collections/recovery' }
                    ]
                }}
            />

            {/* 1. HERO SECTION: SANCTUARY ASYMMETRIC */}
            <div className="relative pt-24 pb-12 lg:min-h-[85vh] flex items-center overflow-hidden">
                <div className="max-w-[1400px] mx-auto px-6 w-full h-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center h-full">

                        {/* LEFT: TEXT */}
                        <div className="space-y-8 relative z-10 order-2 lg:order-1">
                            {/* Breedcrumbs */}
                            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#3E322C]/60 font-bold">
                                <Link to="/" className="hover:text-[#3E322C]">Inicio</Link> <span>/</span> <span className="border-b border-[#3E322C]">Recovery Room</span>
                            </div>

                            <div className="inline-flex items-center gap-2 bg-[#E0E5DF] text-[#3E322C] px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase">
                                <Activity size={14} />
                                Certified Stage 2
                            </div>

                            <h1 className="text-5xl lg:text-7xl font-serif text-[#3E322C] leading-[0.9]">
                                Medical Grade<br />
                                <span className="italic font-light">Precision</span>
                            </h1>

                            <p className="text-base text-gray-500 max-w-md leading-relaxed border-l-2 border-[#3E322C] pl-6">
                                Diseñadas en Colombia para maximizar la retracción de piel en BBL, Lipo 360 y Abdominoplastia. <strong className="text-[#3E322C]">Sin quemaduras, sin marcas, solo seguridad.</strong>
                            </p>

                            {/* Trust Bullets Minimal */}
                            <div className="flex flex-col gap-3 text-xs text-gray-500 font-medium">
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 bg-[#3E322C] rounded-full"></div>
                                    Compresión Uniforme (25-30 mmHg)
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 bg-[#3E322C] rounded-full"></div>
                                    Microcápsulas de Vitamina E
                                </div>
                            </div>

                            <div className="pt-8 animate-bounce">
                                <ArrowDown className="text-[#3E322C] opacity-50" />
                            </div>
                        </div>

                        {/* RIGHT: HERO IMAGE/VIDEO */}
                        <div className="relative h-[500px] lg:h-[700px] rounded-[2rem] overflow-hidden order-1 lg:order-2 shadow-2xl">
                            <img
                                src="/assets/recovery-hands.png"
                                alt="Medical Compression Detail"
                                className="w-full h-full object-cover"
                            />
                            {/* Glassmorphism Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#3E322C]/40 to-transparent"></div>
                            <div className="absolute bottom-10 left-10 right-10 p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-white">
                                <p className="font-serif text-2xl mb-1">"The Sanctuary"</p>
                                <p className="text-xs uppercase tracking-widest opacity-80">Recover in peace</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* 2. TIMELINE VISUAL FILTER (Now Interactive) */}
            <div className="py-12 px-4 max-w-5xl mx-auto">

                <SurgeryTimelineFilter
                    activeStage={activeStage}
                    onStageChange={handleStageChange} // Pass the new handler
                />
            </div>

            {/* 3. PRODUCT GRID */}
            <div className="max-w-[1400px] mx-auto px-6 py-24">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-serif text-[#3E322C] mb-2">
                            {activeTagFilter ? `Filtrado: ${activeTagFilter} ` : (
                                <>
                                    {activeStage === 'stage1' && 'Recién Operada (Stage 1 / Post-Parto)'}
                                    {activeStage === 'stage2' && 'Alta Compresión (Stage 2)'}
                                    {activeStage === 'stage3' && 'Max Moldeo (Stage 3)'}
                                    {activeStage === 'bbl' && 'Especial BBL (Guitar Shape)'}
                                </>
                            )}
                        </h2>
                        <p className="text-sm text-gray-500">
                            {activeTagFilter ? `Mostrando resultados para etiqueta "${activeTagFilter}"` : 'Resultados clínicos comprobados.'}
                        </p>
                    </div>
                    <span className="text-xs font-bold text-[#3E322C] border border-[#3E322C]/20 px-3 py-1 rounded-full">{filteredProducts.length} Artículos</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredProducts.map(product => (
                        <RecoveryProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>

            {/* 4. PAIN POINTS: BENTO GRID */}
            <section className="bg-white py-24 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[500px]">

                        {/* Box 1 (Large Left) - Visual */}
                        <div className="lg:col-span-1 bg-[#F5F5F5] rounded-3xl overflow-hidden relative group">
                            <img src="/assets/cero-fibrosis-texture.jpg" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="No Fibrosis" />
                            <div className="absolute inset-0 bg-black/20"></div>
                            <div className="absolute bottom-8 left-8 text-white">
                                <h3 className="text-3xl font-serif mb-2">Cero Fibrosis</h3>
                                <p className="text-sm opacity-90">Compresión uniforme que previene seromas.</p>
                            </div>
                        </div>

                        <div className="lg:col-span-2 flex flex-col gap-6">
                            {/* Box 2 (Top Right) - Iconographic */}
                            <div className="flex-1 bg-[#E0E5DF] rounded-3xl p-8 flex items-center justify-between hover:shadow-lg transition-shadow">
                                <div>
                                    <ShieldCheck size={48} className="text-[#3E322C] mb-4" />
                                    <h3 className="text-2xl font-serif text-[#3E322C] mb-2">Fit 'Guitarra' Real</h3>
                                    <p className="text-sm text-[#3E322C]/80 max-w-xs">El único patrón que comprime la cintura pero libera la cadera para no aplastar tu BBL.</p>
                                </div>
                                <div className="hidden md:block w-32 h-32 bg-[#3E322C]/10 rounded-full blur-2xl"></div>
                            </div>

                            {/* Box 3 (Bottom Right) - Technical */}
                            <div className="flex-1 bg-[#3E322C] rounded-3xl p-8 flex items-center text-white relative overflow-hidden group">
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-serif mb-2 flex items-center gap-3">
                                        <Activity size={24} className="text-[#E0E5DF]" />
                                        Vitamina E Infundida
                                    </h3>
                                    <p className="text-sm opacity-80">Nuestros textiles nutren tu piel mientras sana, mejorando la elasticidad.</p>
                                </div>
                                <div className="absolute right-0 bottom-0 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 5. VIRTUAL NURSE (BUNDLE BUILDER) */}
            <BundleBuilder />

            {/* 6. EDUCATIONAL ACCORDIONS */}
            <MedicalAccordions />

            {/* Footer handled by Layout */}
        </div>
    );
}
