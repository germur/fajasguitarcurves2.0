import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { useRecoveryProducts } from '../hooks/useRecoveryProducts';
import { SurgeryTimelineFilter } from '../components/silo-recovery/SurgeryTimelineFilter';
import { RecoveryProductCard } from '../components/silo-recovery/RecoveryProductCard';
import { BundleBuilder } from '../components/silo-recovery/BundleBuilder';
import { MedicalAccordions } from '../components/silo-recovery/MedicalAccordions';
import { ShieldCheck, Activity, ArrowDown } from 'lucide-react';

import { SeoHead } from '../../lib/seo/SeoHead';

export default function PostSurgeryPage() {
    const { t } = useTranslation();
    const { products: shopifyProducts } = useRecoveryProducts();
    const [searchParams] = useSearchParams();
    const urlTag = searchParams.get('tag');

    // Map URL tags to Visual Filter ID if possible
    const initialStage = useMemo(() => {
        if (!urlTag) return 'etapa2'; // Default
        const tc = urlTag.toLowerCase();
        if (tc.includes('etapa 2') || tc.includes('stage 2')) return 'etapa2';
        if (tc.includes('etapa 3') || tc.includes('stage 3')) return 'etapa3';
        if (tc.includes('lipo') || tc.includes('abdo')) return 'post-lipo';
        if (tc.includes('bbl')) return 'bbl';
        if (tc.includes('parto') || tc.includes('mom') || tc.includes('mam')) return 'post-parto';
        if (tc.includes('reloj') || tc.includes('guitar')) return 'reloj-arena';
        return 'etapa2';
    }, [urlTag]);

    const [activeStage, setActiveStage] = useState<string>(initialStage);
    const [activeTagFilter, setActiveTagFilter] = useState<string | null>(urlTag);

    // Sync state if URL changes
    useEffect(() => {
        const newTag = searchParams.get('tag');
        setActiveTagFilter(newTag);
        if (newTag) {
            const tc = newTag.toLowerCase();
            if (tc.includes('etapa 2') || tc.includes('stage 2')) setActiveStage('etapa2');
            else if (tc.includes('etapa 3') || tc.includes('stage 3')) setActiveStage('etapa3');
            else if (tc.includes('lipo') || tc.includes('abdo')) setActiveStage('post-lipo');
            else if (tc.includes('bbl')) setActiveStage('bbl');
            else if (tc.includes('parto') || tc.includes('mom') || tc.includes('mam')) setActiveStage('post-parto');
            else if (tc.includes('reloj') || tc.includes('guitar')) setActiveStage('reloj-arena');
        }
    }, [searchParams]);

    // Handle Tab Click (RESET tag filter so tabs work)
    const handleStageChange = (stage: string) => {
        setActiveStage(stage);
        setActiveTagFilter(null); // Clear URL tag so Tab logic takes over
    };

    // The user explicitly wants to see REAL data.
    const displayProducts = shopifyProducts;

    // Filter Logic
    const filteredProducts = useMemo(() => {
        let filtered = displayProducts;

        // 1. If explicit Tag Filter exists (from URL), PRIORITY over Tabs
        if (activeTagFilter) {
            filtered = filtered.filter(p => p.tags && p.tags.some((tag: string) => tag.toLowerCase().includes(activeTagFilter.toLowerCase())));
        } else {
            // 2. Fallback to Visual Filter Keys
            const checkTag = (p: any, ...keys: string[]) => {
                const searchSpace = `${(p.tags || []).join(' ')} ${p.title}`.toLowerCase();
                return keys.some(k => searchSpace.includes(k.toLowerCase()));
            };

            switch (activeStage) {
                case 'etapa2': // Stage 2
                    filtered = filtered.filter(p => checkTag(p, 'stage 2', 'etapa 2', 'fase 2') || (p.stage === 'Etapa 2'));
                    break;
                case 'etapa3': // Stage 3
                    filtered = filtered.filter(p => checkTag(p, 'stage 3', 'etapa 3', 'fase 3') || (p.stage === 'Etapa 3'));
                    break;
                case 'post-lipo':
                    filtered = filtered.filter(p => checkTag(p, 'post lipo', 'lipo 360', 'lipo', 'abdominoplastia', 'tummy tuck'));
                    break;
                case 'bbl':
                    filtered = filtered.filter(p => checkTag(p, 'bbl', 'brazilian', 'gluteoplastia'));
                    break;
                case 'post-parto':
                    filtered = filtered.filter(p => checkTag(p, 'post parto', 'cesarea', 'postpartum', 'mam'));
                    break;
                case 'reloj-arena':
                    filtered = filtered.filter(p => checkTag(p, 'reloj de arena', 'guitar', 'hourglass'));
                    break;
                default:
                    // Default to Stage 2 if unknown
                    filtered = filtered.filter(p => checkTag(p, 'stage 2', 'etapa 2'));
                    break;
            }
        }
        return filtered;
    }, [displayProducts, activeStage, activeTagFilter]);

    return (
        <div className="bg-[#F9F8F6] min-h-screen font-sans selection:bg-[#3E322C] selection:text-white">
            <SeoHead
                title={t('pages.recovery.seo.title')}
                description={t('pages.recovery.seo.description')}
                path="/colecciones/recuperacion"
                image="/assets/recovery-hands.png"
                schema={{
                    type: 'collection',
                    data: {
                        name: 'Recovery Room Collection',
                        description: t('pages.recovery.seo.description')
                    },
                    breadcrumbs: [
                        { name: t('nav.home'), item: '/' },
                        { name: t('nav.recovery'), item: '/colecciones/recuperacion' }
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
                                <Link to="/" className="hover:text-[#3E322C]">{t('nav.home')}</Link> <span>/</span> <span className="border-b border-[#3E322C]">{t('nav.recovery')}</span>
                            </div>

                            <div className="inline-flex items-center gap-2 bg-[#E0E5DF] text-[#3E322C] px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase">
                                <Activity size={14} />
                                {t('pages.recovery.hero.badge')}
                            </div>

                            <h1 className="text-5xl lg:text-7xl font-serif text-[#3E322C] leading-[0.9]">
                                {t('pages.recovery.hero.title_line1')}<br />
                                <span className="italic font-light">{t('pages.recovery.hero.title_line2')}</span>
                            </h1>

                            <p className="text-base text-gray-500 max-w-md leading-relaxed border-l-2 border-[#3E322C] pl-6">
                                <Trans i18nKey="pages.recovery.hero.desc" components={{ 1: <strong className="text-[#3E322C]" /> }} />
                            </p>

                            {/* Trust Bullets Minimal */}
                            <div className="flex flex-col gap-3 text-xs text-gray-500 font-medium">
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 bg-[#3E322C] rounded-full"></div>
                                    {t('pages.recovery.hero.trust_compression')}
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 bg-[#3E322C] rounded-full"></div>
                                    {t('pages.recovery.hero.trust_vitamin')}
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
                                <p className="font-serif text-2xl mb-1">"{t('pages.recovery.hero.caption_title')}"</p>
                                <p className="text-xs uppercase tracking-widest opacity-80">{t('pages.recovery.hero.caption_sub')}</p>
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
                            {activeTagFilter ? `${t('pages.recovery.titles.filtered')} ${activeTagFilter} ` : (
                                <>
                                    {activeStage === 'etapa2' && t('pages.recovery.titles.stage2')}
                                    {activeStage === 'etapa3' && t('pages.recovery.titles.stage3')}
                                    {/* Note: Keys for post-lipo, bbl, post-parto, reloj-arena might need explicit titles or fallback */}
                                    {activeStage === 'post-lipo' && 'Post Lipo 360'}
                                    {activeStage === 'bbl' && t('pages.recovery.titles.bbl')}
                                    {activeStage === 'post-parto' && t('pages.recovery.titles.stage1')}
                                    {activeStage === 'reloj-arena' && t('pages.recovery.titles.stage3')}
                                </>
                            )}
                        </h2>
                        <p className="text-sm text-gray-500">
                            {activeTagFilter ? `${t('pages.recovery.titles.showing_tag')} "${activeTagFilter}"` : t('pages.recovery.titles.default')}
                        </p>
                    </div>
                    <span className="text-xs font-bold text-[#3E322C] border border-[#3E322C]/20 px-3 py-1 rounded-full">{filteredProducts.length} {t('pages.recovery.titles.count')}</span>
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
                                <h3 className="text-3xl font-serif mb-2">{t('pages.recovery.pain_points.box1.title')}</h3>
                                <p className="text-sm opacity-90">{t('pages.recovery.pain_points.box1.desc')}</p>
                            </div>
                        </div>

                        <div className="lg:col-span-2 flex flex-col gap-6">
                            {/* Box 2 (Top Right) - Iconographic */}
                            <div className="flex-1 bg-[#E0E5DF] rounded-3xl p-8 flex items-center justify-between hover:shadow-lg transition-shadow">
                                <div>
                                    <ShieldCheck size={48} className="text-[#3E322C] mb-4" />
                                    <h3 className="text-2xl font-serif text-[#3E322C] mb-2">{t('pages.recovery.pain_points.box2.title')}</h3>
                                    <p className="text-sm text-[#3E322C]/80 max-w-xs">{t('pages.recovery.pain_points.box2.desc')}</p>
                                </div>
                                <div className="hidden md:block w-32 h-32 bg-[#3E322C]/10 rounded-full blur-2xl"></div>
                            </div>

                            {/* Box 3 (Bottom Right) - Technical */}
                            <div className="flex-1 bg-[#3E322C] rounded-3xl p-8 flex items-center text-white relative overflow-hidden group">
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-serif mb-2 flex items-center gap-3">
                                        <Activity size={24} className="text-[#E0E5DF]" />
                                        {t('pages.recovery.pain_points.box3.title')}
                                    </h3>
                                    <p className="text-sm opacity-80">{t('pages.recovery.pain_points.box3.desc')}</p>
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
