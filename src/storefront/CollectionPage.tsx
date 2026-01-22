import { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { GranularProductGrid } from './components/GranularProductGrid';
import { fetchProductsByTags, fetchAllProducts, fetchCollectionByHandle, fetchProductsByQuery } from '../lib/shopify-client';
import { ShopifyMapper, SILO_DESCRIPTIONS } from '../lib/shopify-mapper';
import { SeoHead } from '../lib/seo/SeoHead';
import { ArrowRight, Shield } from 'lucide-react';
import { getSiloAsset } from '../lib/silo-assets';
import { GranularFAQ } from './components/GranularFAQ';
import { TrustBanner } from './components/TrustBanner';
import { FilterSidebar } from './components/FilterSidebar';

interface CollectionPageProps {
    title?: string;
    handle?: string;
    description?: string;
}

export function CollectionPage({ title: propTitle, handle: propHandle, description: propDesc }: CollectionPageProps) {
    const params = useParams();
    const location = useLocation();

    // Determine Mode: Route Params (Granular) vs Props (Standard) vs View All
    const rawHandle = propHandle || params.handle || '';

    // SEO Slug Resolution (Reverse Map Logic)
    const seoParams = resolveSeoSlug(rawHandle);

    // If SEO match, clear handle so generic fetch doesn't run, and use the resolved params
    const handle = seoParams ? '' : rawHandle;
    const isGranular = (!!params.silo && !!params.filter) || !!seoParams;
    const isViewAll = rawHandle === 'all';

    // Derived Granular Params
    const silo = params.silo || seoParams?.silo || '';
    const filter = params.filter || seoParams?.filter || '';

    // State
    const [products, setProducts] = useState<any[]>([]); // Unified Product List
    const [loading, setLoading] = useState(false);

    // Filter State
    // Filter State
    const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
        stage: [],
        compression: [],
        category: [], // NEW
        occasion: [],
        features: []
    });

    // SEO Data Construction
    let pageTitle = propTitle || capitalize(handle || filter || 'Colección');

    // Authority Descriptions Injection
    let seoDescription = propDesc || `Explora nuestra colección ${pageTitle} en Guitar Curves.`;

    // 1. Check for Silo Match first (Most specific top-level)
    if (handle === 'recovery' || silo === 'recovery' || handle === 'recuperacion' || silo === 'recuperacion' || handle === 'recuperacion-postquirurgica') {
        seoDescription = SILO_DESCRIPTIONS.RECOVERY;
    }
    else if (handle === 'sculpt' || silo === 'sculpt' || handle === 'moldeo' || silo === 'moldeo' || handle === 'moldeo-y-estetica' || handle === 'fajas-reloj-de-arena') {
        seoDescription = SILO_DESCRIPTIONS.SCULPT;
    }
    else if (handle === 'bras' || silo === 'bras' || handle === 'essentials' || handle === 'brasieres' || silo === 'brasieres' || handle === 'brasieres-y-postura') {
        seoDescription = SILO_DESCRIPTIONS.ESSENTIALS;
    }

    if (isGranular) {
        // Spanish-friendly granular titles
        if (silo === 'recuperacion') {
            pageTitle = `Fajas ${capitalize(filter.replace(/-/g, ' '))} - Post Quirúrgicas`;
        } else if (silo === 'moldeo') {
            pageTitle = `Fajas ${capitalize(filter.replace(/-/g, ' '))} - Moldeo y Uso Diario`;
        } else {
            pageTitle = `${capitalize(filter.replace(/-/g, ' '))} - ${capitalize(silo)}`;
        }

        seoDescription = `Compra las mejores opciones de ${filter.replace(/-/g, ' ')} de nuestra colección ${silo}. Alta compresión y soporte especializado para tu cuerpo.`;
    }
    useEffect(() => {
        setLoading(true);
        let fetchPromise;

        // Resolve Alias Handles to Real Shopify Handles
        const realHandle = resolveShopifyHandle(rawHandle);

        if (isViewAll) {
            fetchPromise = fetchAllProducts();
        } else if (isGranular) {
            const siloTag = mapSiloToTag(silo);
            const filterTag = mapFilterToTag(filter);

            // SPECIAL CASE: Post Parto (Missing Tag Fix)
            // Use smart search query: (Tag OR Title match). 
            // Broadened to IGNORE Silo Tag because some Post Parto items lack "Post Surgery" tag too.
            if (filter === 'post-parto') {
                const q = `tag:'Post Parto' OR title:Postparto OR title:Cesarea OR title:Maternidad`;
                fetchPromise = fetchProductsByQuery(q);
            } else {
                fetchPromise = fetchProductsByTags([siloTag, filterTag].filter(t => t && t.length > 0));
            }
        } else {
            // Standard Collection (e.g. /collections/recovery)
            fetchPromise = fetchCollectionByHandle(realHandle);
        }

        fetchPromise
            .then(rawProducts => {
                // MAPPER: Use 'universal' for View All or Standard to get full metadata, or specific matching silo logic
                // For simplicity and richness, 'universal' is often best unless we need very specific silo fields
                const mapperMode = isViewAll ? 'universal' : (silo === 'recovery' ? 'medical' : 'universal');
                const mapped = rawProducts.map((p: any) => ShopifyMapper.mapProduct(p, mapperMode));
                setProducts(mapped);
            })
            .catch(err => console.error("Error loading products:", err))
            .finally(() => setLoading(false));

    }, [silo, filter, isGranular, isViewAll, rawHandle]);


    // Filter Logic
    const filteredProducts = isViewAll ? products.filter(product => {
        // Validation: If a category has filters active, product matching ONE of them is enough (OR logic within category)
        // AND logic between categories

        const checkCategory = (cat: string, value: string | string[]) => {
            const active = activeFilters[cat];
            if (!active || active.length === 0) return true; // No filter = pass

            if (Array.isArray(value)) {
                // Product has array of features -> check if it has ANY of the active filters
                return value.some(v => active.includes(v));
            }

            // Product has single value -> check if it is in active list
            return active.includes(value);
        };

        return (
            checkCategory('stage', product.stage) &&
            checkCategory('compression', product.compression) &&
            checkCategory('category', product.category) && // NEW
            checkCategory('occasion', product.occasion) &&
            checkCategory('features', product.features)
        );
    }) : products;


    // Handle Filter Change
    const handleFilterChange = (category: string, value: string) => {
        setActiveFilters(prev => {
            const current = prev[category] || [];
            const isSelected = current.includes(value);

            if (isSelected) {
                return { ...prev, [category]: current.filter(v => v !== value) };
            } else {
                return { ...prev, [category]: [...current, value] };
            }
        });
    };

    // Asset Data
    const { image: heroImage, subtitle: heroSubtitle } = getSiloAsset(silo || 'default');

    // Pure Canonical URL (No query params, no tracking)
    const canonicalUrl = isGranular
        ? `https://guitarcurves.com/collections/${silo}/${filter}`
        : `https://guitarcurves.com/collections/${handle}`;

    return (
        <div className="bg-white min-h-screen pb-20 pt-10 font-sans selection:bg-[#D4AF37] selection:text-white">
            <SeoHead
                title={`${pageTitle} | Guitar Curves`}
                description={seoDescription}
                path={canonicalUrl.replace('https://guitarcurves.com', '')}
            />

            {/* SPLIT HERO LAYOUT (Premium) */}
            <div className="pt-6 pb-8 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Copy */}
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 bg-[#F5EDDF] text-[#A35944] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                            <Shield size={14} />
                            {heroSubtitle}
                        </div>

                        <h1 className="text-4xl lg:text-6xl font-serif font-bold text-[#2C2420] leading-tight capitalize">
                            {pageTitle}
                        </h1>

                        <p className="text-xl text-stone-500 font-light border-l-4 border-[#D4AF37] pl-4">
                            {seoDescription}
                        </p>
                    </div>

                    {/* Right: Technical Visual */}
                    <div className="relative h-[400px] lg:h-[500px] bg-stone-100 rounded-[2rem] overflow-hidden flex items-center justify-center shadow-lg">
                        <img
                            src={heroImage}
                            alt={pageTitle}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="absolute bottom-8 right-8 text-white text-right">
                            <h3 className="font-bold text-2xl font-serif">{capitalize(silo || 'Colección')}</h3>
                            <p className="text-sm opacity-90 tracking-widest uppercase">Colección Oficial</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* SUB-COLLECTION NAVIGATION (Pills) */}
            {isGranular && (
                <div className="max-w-7xl mx-auto px-6 mb-12">
                    <div className="flex flex-wrap gap-3 pb-4 border-b border-stone-100">
                        {getSiloAsset(silo).subCollections?.map((sub: { label: string; path: string }) => (
                            <Link
                                key={sub.path}
                                to={sub.path}
                                className={`px-5 py-2 rounded-full text-sm font-bold tracking-wide transition-all ${location.pathname === sub.path
                                    ? 'bg-[#2C2420] text-white shadow-md'
                                    : 'bg-stone-100 text-stone-600 hover:bg-[#D4AF37] hover:text-white'
                                    }`}
                            >
                                {sub.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-6">
                {/* 🚨 BREAK BANNER (Pattern Interrupt) - Only active on Recovery context */}
                {(isGranular ? silo === 'recovery' : handle.includes('surg')) && (
                    <div className="mb-12 bg-stone-50 border border-[#D4AF37]/20 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#D4AF37] text-white rounded-full flex items-center justify-center text-2xl shadow-md">
                                🩺
                            </div>
                            <div>
                                <h3 className="font-serif text-xl font-bold text-[#2C2420]">Deja de adivinar. Calcula tu etapa exacta.</h3>
                                <p className="text-sm text-stone-500">Respondemos tus dudas post-quirúrgicas en 1 minuto.</p>
                            </div>
                        </div>
                        <Link to="/tools/calculator" className="whitespace-nowrap px-6 py-3 bg-[#2C2420] text-white font-bold text-sm tracking-widest uppercase rounded-lg hover:bg-[#D4AF37] transition-colors shadow-lg">
                            Usar Calculadora
                        </Link>
                    </div>
                )}

                <div className="mb-20">
                    {/* MAIN LAYOUT: Sidebar (if View All) + Grid */}
                    <div className={isViewAll ? "flex flex-col lg:flex-row gap-8 items-start" : ""}>

                        {/* SIDEBAR FILTER */}
                        {isViewAll && (
                            <aside className="w-full lg:w-64 flex-shrink-0">
                                <FilterSidebar
                                    products={products} // Pass raw list to calc counts
                                    activeFilters={activeFilters}
                                    onFilterChange={handleFilterChange}
                                />
                            </aside>
                        )}

                        {/* PRODUCT GRID */}
                        <div className="flex-1 w-full">
                            <GranularProductGrid products={filteredProducts} loading={loading} />
                        </div>
                    </div>
                </div>
            </div>

            {/* TRUST BANNER - Global Promise */}
            <TrustBanner />

            {/* FAQ SECTION - SEO & Support */}
            <GranularFAQ />

            {/* FINAL CTA - Calculator Teaser (If strict recovery context) */}
            {silo === 'recovery' && (
                <div className="bg-[#2C2420] py-16 px-6 text-center">
                    <div className="max-w-2xl mx-auto">
                        <h3 className="text-3xl font-serif text-white mb-4">¿Aún tienes dudas de tu etapa?</h3>
                        <p className="text-stone-300 mb-8">Usa nuestra herramienta de diagnóstico post-quirúrgico para encontrar tu faja exacta.</p>
                        <Link to="/tools/calculator" className="inline-flex items-center px-8 py-3 bg-[#D4AF37] text-white font-bold uppercase tracking-widest rounded-full hover:bg-white hover:text-[#2C2420] transition-all shadow-lg text-sm">
                            Iniciar Quiz <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

// --- Helpers ---

function capitalize(s: string) {
    if (!s) return '';
    return s.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// Map URL slugs to real Shopify Tags
// Map URL slugs to real Shopify Tags
function mapSiloToTag(silo: string) {
    // English (Legacy/Alias)
    if (silo === 'recovery') return 'Post Surgery';
    if (silo === 'bras') return 'Post-Op Bra';
    if (silo === 'sculpt') return '';

    // Spanish (New)
    if (silo === 'recuperacion') return 'Post Surgery';
    if (silo === 'brasieres') return 'Post-Op Bra';
    if (silo === 'moldeo') return ''; // Uses specific filters usually, or 'Waist Trainer' if we wanted a broad tag, but 'Sculpt' logic was empty.

    return '';
}

function mapFilterToTag(filter: string) {
    if (!filter) return '';

    // Precise mapping based on live store data
    // Spanish Mappings
    if (filter === 'etapa-1') return 'Stage 1';
    if (filter === 'etapa-2') return 'Stage 2';
    if (filter === 'etapa-3') return 'Stage 3';

    if (filter === 'cinturillas' || filter === 'cinturillas-reductoras') return 'Waist Trainer';
    if (filter === 'cinturilla') return 'Waist Trainer';

    if (filter === 'shorts') return 'Short'; // Same in Spanish often, or...
    if (filter === 'short') return 'Short';

    if (filter === 'fajas-espalda-alta' || filter === 'espalda-alta') return 'High Back';
    if (filter === 'fajas-media-pierna' || filter === 'media-pierna') return 'Knee Length';

    if (filter === 'uso-diario') return 'Daily Use';
    if (filter === 'corrector') return 'Corrector de Postura';

    if (filter === 'post-lipo' || filter === 'lipo-360') return 'Post Lipo'; // Assuming 'Post Lipo' covers 360, or 'Lipo 360' exists
    if (filter === 'brazos') return 'Arm Compression';

    if (filter === 'invisible') return 'Invisible';
    if (filter === 'levantacola') return 'Butt Lifter';

    // Post Parto is handled by the Query fallback in CollectionPage, but we map here to check tags first?
    if (filter === 'post-parto' || filter === 'fajas-postparto') return 'Post Parto';

    // English Mappings (Keep for aliases)
    if (filter === 'stage-2') return 'Stage 2';
    if (filter === 'stage-1') return 'Stage 1';
    if (filter === 'stage-3') return 'Stage 3';

    if (filter === 'strapless') return 'Strapless';
    if (filter === 'high-back') return 'High Back';
    if (filter === 'butt-lifter') return 'Butt Lifter';
    if (filter === 'high-compression') return 'High Compression';
    if (filter === 'arm-compression') return 'Arm Compression';
    if (filter === 'bbl') return 'BBL';
    if (filter === 'post-op-bra') return 'Post-Op Bra';

    // Sub-Collection Mappings (Explicit)
    if (filter === 'waist') return 'Waist Trainer';
    if (filter === 'daily') return 'Daily Use';

    // Default: try to capitalize logic for simple cases
    return capitalize(filter);
}

// Helper to bridge language gaps in URL handles
function resolveShopifyHandle(handle: string) {
    if (handle === 'moldeo' || handle === 'sculpt' || handle === 'moldeo-y-estetica' || handle === 'fajas-reloj-de-arena') return 'sculpt-studio';
    if (handle === 'recuperacion' || handle === 'recovery' || handle === 'recuperacion-postquirurgica') return 'post-quirurgica';
    if (handle === 'bras' || handle === 'brasieres' || handle === 'brasieres-y-postura') return 'essentials';
    return handle;
}

// Helper for Virtual SEO Slugs / "Long Tail" URLs
// Maps: "fajas-etapa-1" -> { silo: 'recuperacion', filter: 'etapa-1' }
function resolveSeoSlug(handle: string): { silo: string; filter: string } | null {
    if (!handle) return null;

    // Etapas
    if (handle === 'fajas-etapa-1') return { silo: 'recuperacion', filter: 'etapa-1' };
    if (handle === 'fajas-etapa-2') return { silo: 'recuperacion', filter: 'etapa-2' };
    if (handle === 'fajas-etapa-3') return { silo: 'recuperacion', filter: 'etapa-3' };

    // Necesidades
    if (handle === 'fajas-postparto') return { silo: 'recuperacion', filter: 'post-parto' };
    if (handle === 'fajas-para-lipo-360') return { silo: 'recuperacion', filter: 'lipo-360' };

    // Cinturillas (Waist Trainers usually in Sculpt/Moldeo)
    if (handle === 'cinturillas-reductoras') return { silo: 'moldeo', filter: 'cinturillas' };

    // Atributos
    if (handle === 'fajas-espalda-alta') return { silo: 'recuperacion', filter: 'espalda-alta' }; // Typically medical usage
    if (handle === 'fajas-media-pierna') return { silo: 'recuperacion', filter: 'media-pierna' };

    return null;
}
