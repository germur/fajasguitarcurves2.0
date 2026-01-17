import { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { GranularProductGrid } from './components/GranularProductGrid';
import { fetchProductsByTags, fetchAllProducts, fetchCollectionByHandle } from '../lib/shopify-client';
import { ShopifyMapper } from '../lib/shopify-mapper';
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
    const handle = propHandle || params.handle || '';
    const isGranular = !!params.silo && !!params.filter;
    const isViewAll = handle === 'all';

    // State
    const [products, setProducts] = useState<any[]>([]); // Unified Product List
    const [loading, setLoading] = useState(false);

    // Filter State
    const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
        stage: [],
        compression: [],
        occasion: [],
        features: []
    });

    const silo = params.silo || '';
    const filter = params.filter || '';

    // SEO Data Construction
    let pageTitle = propTitle || capitalize(handle);
    let seoDescription = propDesc || `Explore our ${pageTitle} collection at Guitar Curves.`;

    if (isGranular) {
        pageTitle = `${capitalize(filter)} ${capitalize(silo)} Fajas`;
        seoDescription = `Shop the best ${filter.replace(/-/g, ' ')} options from our ${silo} collection. High compression and specialized support.`;
    }

    // Unified Data Fetching Logic
    useEffect(() => {
        setLoading(true);
        let fetchPromise;

        if (isViewAll) {
            fetchPromise = fetchAllProducts();
        } else if (isGranular) {
            fetchPromise = fetchProductsByTags([mapSiloToTag(silo), mapFilterToTag(filter)].filter(t => t && t.length > 0));
        } else {
            // Standard Collection (e.g. /collections/recovery)
            fetchPromise = fetchCollectionByHandle(handle);
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

    }, [silo, filter, isGranular, isViewAll, handle]);


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
                            <p className="text-sm opacity-90 tracking-widest uppercase">Official Collection</p>
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
function mapSiloToTag(silo: string) {
    if (silo === 'recovery') return 'Post Surgery'; // CHANGED: 'Recovery' tag doesn't exist, 'Post Surgery' does.
    if (silo === 'sculpt') return ''; // 'Sculpt' tag doesn't exist. Often these are 'Daily Use' or 'Waist Trainer', but for granular SEO we might rely solely on the specific filter.
    if (silo === 'bras') return 'Post-Op Bra'; // CHANGED: 'Brasier' matches nothing. 'Post-Op Bra' is the real tag.
    return '';
}

function mapFilterToTag(filter: string) {
    // Precise mapping based on live store data (2024-01-13)
    if (filter === 'stage-2') return 'Stage 2'; // Not seen in top 10, but likely exists
    if (filter === 'stage-1') return 'Stage 1';
    if (filter === 'stage-3') return 'Stage 3'; // Verified

    if (filter === 'shorts') return 'Short'; // Verified (Tag is singular "Short")
    if (filter === 'short') return 'Short';

    if (filter === 'post-lipo') return 'Post Lipo'; // Verified (Space, no hyphen)
    if (filter === 'strapless') return 'Strapless';

    if (filter === 'high-back') return 'High Back'; // Verified
    if (filter === 'butt-lifter') return 'Butt Lifter'; // Verified

    // New mappings for test suite
    if (filter === 'high-compression') return 'High Compression';
    if (filter === 'invisible') return 'Invisible';
    if (filter === 'arm-compression') return 'Arm Compression';
    if (filter === 'bbl') return 'BBL';
    if (filter === 'post-op-bra') return 'Post-Op Bra';

    // Sub-Collection Mappings (Explicit)
    if (filter === 'waist') return 'Waist Trainer';
    if (filter === 'corrector') return 'Corrector de Postura';
    if (filter === 'daily') return 'Daily Use';

    // Default: try to capitalize
    return capitalize(filter);
}
