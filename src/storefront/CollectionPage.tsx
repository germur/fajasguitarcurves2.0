import { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { GranularProductGrid } from './components/GranularProductGrid';
import { fetchProductsByTags, fetchAllProducts, fetchCollectionByHandle, fetchProductsByQuery } from '../lib/shopify-client';
import { ShopifyMapper, getSiloData } from '../lib/shopify-mapper';
import { SeoHead } from './components/SeoHead';
import { ArrowRight, Shield } from 'lucide-react';
import { getSiloAsset } from '../lib/silo-assets';
import { GranularFAQ } from './components/GranularFAQ';
import { TrustBanner } from './components/TrustBanner';
import { FilterSidebar } from './components/FilterSidebar';
import { useTranslation } from 'react-i18next';

// --- PROGRAMMATIC SEO CONFIG ---
// Dictionary to map URL keywords to Shopify Tags
const INTENT_DICTIONARY: Record<string, string> = {
    // Colors
    'negras': 'Negro',
    'negra': 'Negro',
    'black': 'Black',
    'beige': 'Beige',
    'piel': 'Beige',
    'cocoa': 'Cocoa',
    'mocha': 'Mocha',
    'chocolate': 'Mocha',

    // Types
    'reductoras': 'Reductora',
    'reductora': 'Reductora',
    'cinturilla': 'Cinturilla',
    'cinturillas': 'Cinturilla',
    'short': 'Short',
    'shorts': 'Short',
    'body': 'Body',
    'enterizo': 'Body',
    'strapless': 'Strapless',
    'tirantes': 'Tirantes',
    'mangas': 'Con Mangas',

    // Uses
    'postquirurgica': 'Post Quirúrgica',
    'post-quirurgica': 'Post Quirúrgica',
    'post-op': 'Post Surgery',
    'diario': 'Uso Diario',
    'daily': 'Daily Use',
    'postparto': 'Post Parto',
    'post-parto': 'Post Parto',
    'maternidad': 'Maternidad',
    'novia': 'Novia',
    'boda': 'Novia',
    'fiesta': 'Fiesta',
    'gym': 'Deportiva',

    // Stages
    'etapa-1': 'Etapa 1',
    'stage-1': 'Stage 1',
    'etapa-2': 'Etapa 2',
    'stage-2': 'Stage 2',
    'etapa-3': 'Etapa 3',
    'stage-3': 'Stage 3',

    // Body Parts / Problems
    'espalda': 'Espalda Alta',
    'brazos': 'Mangas',
    'pierna': 'Media Pierna',
    'gluteos': 'Levanta Cola',
    'cola': 'Levanta Cola',
    'abdomen': 'Control Abdomen',
};

// Helper: Parse URL "fajas-negras-reductoras" -> ["Negro", "Reductora"]
function parseProgrammaticIntent(slug: string): { tags: string[], titleParts: string[] } {
    if (!slug) return { tags: [], titleParts: [] };

    // 1. Clean slug (remove "fajas-", "para-", "de-")
    const cleanSlug = slug.toLowerCase()
        .replace(/^fajas-/, '')
        .replace(/-para-/, '-')
        .replace(/-de-/, '-');

    const words = cleanSlug.split('-');
    const foundTags: string[] = [];
    const titleParts: string[] = [];

    // 2. Map words to dictionary
    words.forEach(word => {
        const mappedTag = INTENT_DICTIONARY[word];
        if (mappedTag) {
            foundTags.push(mappedTag);
            titleParts.push(word.charAt(0).toUpperCase() + word.slice(1));
        } else {
            // Keep word for title even if not a tag (e.g. "baratas")
            titleParts.push(word.charAt(0).toUpperCase() + word.slice(1));
        }
    });

    return { tags: [...new Set(foundTags)], titleParts };
}

interface CollectionPageProps {
    title?: string;
    handle?: string;
    description?: string;
}

export function CollectionPage({ title: propTitle, handle: propHandle, description: propDesc }: CollectionPageProps) {
    const { i18n } = useTranslation();
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

    // PROGRAMMATIC MODE DETECTION
    // If we have a handle (like 'fajas-negras-reductoras') and it's NOT a standard collection
    // We assume it might be a programmatic intent
    const isProgrammatic = !isViewAll && !isGranular && rawHandle && !seoParams;

    // Derived Granular Params
    const silo = params.silo || seoParams?.silo || '';
    const filter = params.filter || seoParams?.filter || '';

    // State
    const [products, setProducts] = useState<any[]>([]); // Unified Product List
    const [loading, setLoading] = useState(false);

    // Programmatic State
    const [programmaticTitle, setProgrammaticTitle] = useState('');
    const [programmaticFallback, setProgrammaticFallback] = useState<false | 'partial' | 'bestsellers'>(false);

    // Filter State
    const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
        stage: [],
        compression: [],
        category: [], // NEW
        occasion: [],
        features: []
    });

    // SEO Data Construction
    let pageTitle = propTitle || capitalize(handle || filter || (i18n.language === 'en' ? 'Collection' : 'Colección'));

    // Authority Descriptions Injection
    let seoDescription = propDesc || (i18n.language === 'en' ? `Explore our ${pageTitle} collection at Guitar Curves.` : `Explora nuestra colección ${pageTitle} en Guitar Curves.`);

    // Handle "All" collection with proper translations
    if (isViewAll) {
        pageTitle = i18n.language === 'en' ? 'All Collections' : 'Todo el Catálogo';
        seoDescription = i18n.language === 'en'
            ? 'Explore our entire collection of premium Colombian fajas.'
            : 'Explora toda nuestra colección de fajas colombianas premium.';
    }

    // 1. Check for Silo Match first (Most specific top-level)
    const siloData = getSiloData(i18n.language);

    if (handle === 'recovery' || silo === 'recovery' || handle === 'recuperacion' || silo === 'recuperacion' || handle === 'recuperacion-postquirurgica') {
        seoDescription = siloData.descriptions.RECOVERY;
        if (!propTitle) pageTitle = siloData.names.RECOVERY;
    }
    else if (handle === 'sculpt' || silo === 'sculpt' || handle === 'moldeo' || silo === 'moldeo' || handle === 'moldeo-y-estetica' || handle === 'fajas-reloj-de-arena') {
        seoDescription = siloData.descriptions.SCULPT;
        if (!propTitle) pageTitle = siloData.names.SCULPT;
    }
    else if (handle === 'bras' || silo === 'bras' || handle === 'essentials' || handle === 'brasieres' || silo === 'brasieres' || handle === 'brasieres-y-postura') {
        seoDescription = siloData.descriptions.ESSENTIALS;
        if (!propTitle) pageTitle = siloData.names.ESSENTIALS;
    }

    if (isGranular) {
        // Spanish-friendly granular titles - TODO: Localize granular logic better if needed
        // For now, capitalize filters which are URLs (mostly Spanish). 
        // Ideally we map them.
        const niceFilter = capitalize(filter.replace(/-/g, ' '));
        const niceSilo = capitalize(silo);

        if (silo === 'recuperacion') {
            pageTitle = i18n.language === 'en' ? `Fajas ${niceFilter} - Post Surgery` : `Fajas ${niceFilter} - Post Quirúrgicas`;
        } else if (silo === 'moldeo') {
            pageTitle = i18n.language === 'en' ? `Fajas ${niceFilter} - Sculpt & Daily Use` : `Fajas ${niceFilter} - Moldeo y Uso Diario`;
        } else {
            pageTitle = `${niceFilter} - ${niceSilo}`;
        }

        seoDescription = i18n.language === 'en'
            ? `Shop the best ${filter.replace(/-/g, ' ')} options from our ${silo} collection. High compression and specialized support.`
            : `Compra las mejores opciones de ${filter.replace(/-/g, ' ')} de nuestra colección ${silo}. Alta compresión y soporte especializado para tu cuerpo.`;
    }

    // PROGRAMMATIC TITLE & DESCRIPTION OVERRIDE
    if (isProgrammatic && programmaticTitle) {
        pageTitle = `Fajas ${programmaticTitle}`; // e.g. "Fajas Negras Reductoras"
        seoDescription = `Descubre nuestra selección exclusiva de ${programmaticTitle}. Diseñadas para moldear tu figura con la máxima comodidad y tecnología colombiana.`;
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
            if (filter === 'post-parto') {
                const q = `tag:'Post Parto' OR title:Postparto OR title:Cesarea OR title:Maternidad`;
                fetchPromise = fetchProductsByQuery(q);
            } else {
                fetchPromise = fetchProductsByTags([siloTag, filterTag].filter(t => t && t.length > 0));
            }
        } else if (isProgrammatic) {
            // --- NEW: PROGRAMMATIC FETCH LOGIC ---
            const { tags, titleParts } = parseProgrammaticIntent(rawHandle);

            if (tags.length > 0) {
                // If we found valid mapped tags (e.g. Negro, Reductora)
                setProgrammaticTitle(titleParts.join(' ')); // "Negras Reductoras"

                // 1. Try Exact Intersection
                // Note: We bypass the main fetchPromise here to handle chained logic locally
                fetchProductsByTags(tags).then(exactMatches => {
                    // Check if simple fetch returned empty
                    if (exactMatches && exactMatches.length > 0) {
                        const mapperMode = 'universal';
                        setProducts(exactMatches.map((p: any) => ShopifyMapper.mapProduct(p, mapperMode, i18n.language)));
                        setProgrammaticFallback(false);
                        setLoading(false);
                    } else {
                        // 2. Fallback: Partial Match (OR Logic)
                        // "tag:'A' OR tag:'B'"
                        const partialQuery = tags.map(t => `tag:'${t}'`).join(' OR ');
                        fetchProductsByQuery(partialQuery).then(partialMatches => {
                            if (partialMatches && partialMatches.length > 0) {
                                const mapperMode = 'universal';
                                setProducts(partialMatches.map((p: any) => ShopifyMapper.mapProduct(p, mapperMode, i18n.language)));
                                setProgrammaticFallback('partial');
                                setLoading(false);
                            } else {
                                // 3. Ultimate Fallback: Best Sellers
                                fetchProductsByTags(['Best Seller']).then(bestSellers => {
                                    const mapperMode = 'universal';
                                    setProducts(bestSellers.map((p: any) => ShopifyMapper.mapProduct(p, mapperMode, i18n.language)));
                                    setProgrammaticFallback('bestsellers');
                                    setLoading(false);
                                });
                            }
                        });
                    }
                });

                // Set fetchPromise to null/dummy so the main .then() chain doesn't overwrite our work
                fetchPromise = Promise.resolve([]);
            } else {
                // Fallback: If no tags found, try collection handle normally
                // This covers standard collections that aren't mapped yet
                fetchPromise = fetchCollectionByHandle(realHandle);
            }
        } else {
            // Standard Collection (e.g. /collections/recovery)
            fetchPromise = fetchCollectionByHandle(realHandle);
        }

        fetchPromise
            .then(rawProducts => {
                const mapperMode = isViewAll ? 'universal' : (silo === 'recovery' ? 'medical' : 'universal');
                // Pass current language to mapper
                const mapped = rawProducts.map((p: any) => ShopifyMapper.mapProduct(p, mapperMode, i18n.language));
                setProducts(mapped);
            })
            .catch(err => console.error("Error loading products:", err))
            .finally(() => setLoading(false));

    }, [silo, filter, isGranular, isViewAll, isProgrammatic, rawHandle, i18n.language]); // Added deps


    // Filter Logic
    const filteredProducts = isViewAll ? products.filter(product => {
        const checkCategory = (cat: string, value: string | string[]) => {
            const active = activeFilters[cat];
            if (!active || active.length === 0) return true; // No filter = pass

            if (Array.isArray(value)) {
                return value.some(v => active.includes(v));
            }
            return active.includes(value);
        };

        return (
            checkCategory('stage', product.stage) &&
            checkCategory('compression', product.compression) &&
            checkCategory('category', product.category) &&
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

    // Asset Data (Could be localized if needed, keeping visual assets same)
    const { image: heroImage, subtitle: heroSubtitle } = getSiloAsset(silo || 'default');

    return (
        <div className="bg-white min-h-screen pb-20 pt-10 font-sans selection:bg-[#D4AF37] selection:text-white">
            <SeoHead
                title={`${pageTitle} | Guitar Curves`}
                description={seoDescription}
            // path is handled internally by SeoHead now via useLocation, but if we pass explicit props we should be careful.
            // The original code passed 'path'. Let's check SeoHead definition.
            // We removed 'path' prop from SeoHead in favor of internal detection! 
            // So we can remove it here.
            />

            {/* SPLIT HERO LAYOUT (Premium) */}
            <div className="pt-6 pb-8 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Copy */}
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 bg-[#F5EDDF] text-[#A35944] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                            <Shield size={14} />
                            {isProgrammatic ? "Colección Especializada" : heroSubtitle}
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
                            <h3 className="font-bold text-2xl font-serif">{capitalize(silo || (i18n.language === 'en' ? 'Collection' : 'Colección'))}</h3>
                            <p className="text-sm opacity-90 tracking-widest uppercase">{i18n.language === 'en' ? 'Official Collection' : 'Colección Oficial'}</p>
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
                                <h3 className="font-serif text-xl font-bold text-[#2C2420]">{i18n.language === 'en' ? 'Stop guessing. Calculate your exact stage.' : 'Deja de adivinar. Calcula tu etapa exacta.'}</h3>
                                <p className="text-sm text-stone-500">{i18n.language === 'en' ? 'We answer your post-op questions in 1 minute.' : 'Respondemos tus dudas post-quirúrgicas en 1 minuto.'}</p>
                            </div>
                        </div>
                        <Link to="/tools/calculator" className="whitespace-nowrap px-6 py-3 bg-[#2C2420] text-white font-bold text-sm tracking-widest uppercase rounded-lg hover:bg-[#D4AF37] transition-colors shadow-lg">
                            {i18n.language === 'en' ? 'Use Calculator' : 'Usar Calculadora'}
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
                            {/* FALLBACK BANNER */}
                            {programmaticFallback && (
                                <div className="mb-8 p-6 bg-stone-50 border border-[#D4AF37]/20 rounded-xl">
                                    <h3 className="font-serif text-lg font-bold text-[#2C2420] mb-2">
                                        {i18n.language === 'en'
                                            ? `We couldn't find an exact match for "${programmaticTitle}", but...`
                                            : `No encontramos una coincidencia exacta para "${programmaticTitle}", pero...`}
                                    </h3>
                                    <p className="text-stone-600 text-sm">
                                        {programmaticFallback === 'partial'
                                            ? (i18n.language === 'en' ? "Here are items matching some of your criteria:" : "Aquí tienes prendas que cumplen con algunas de tus características:")
                                            : (i18n.language === 'en' ? "Here are our most popular best sellers:" : "Aquí tienes nuestros productos más populares:")}
                                    </p>
                                </div>
                            )}

                            {products.length === 0 && !loading && isProgrammatic ? (
                                <div className="text-center py-20 bg-stone-50 rounded-lg">
                                    <h3 className="font-serif text-2xl text-stone-400 mb-2">
                                        {i18n.language === 'en' ? "Nothing found here." : "No encontramos resultados."}
                                    </h3>
                                    <p className="text-stone-500">{i18n.language === 'en' ? "Try broader search terms." : "Prueba términos más generales."}</p>
                                    <div className="mt-8 flex justify-center gap-4">
                                        <Link to="/colecciones/todo" className="px-6 py-3 bg-[#2C2420] text-white rounded-lg">
                                            {i18n.language === 'en' ? "View All" : "Ver Todo"}
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <GranularProductGrid products={filteredProducts} loading={loading} />
                            )}
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
                        <h3 className="text-3xl font-serif text-white mb-4">{i18n.language === 'en' ? 'Still have questions?' : '¿Aún tienes dudas de tu etapa?'}</h3>
                        <p className="text-stone-300 mb-8">{i18n.language === 'en' ? 'Use our post-op diagnostic tool to find your match.' : 'Usa nuestra herramienta de diagnóstico post-quirúrgico para encontrar tu faja exacta.'}</p>
                        <Link to="/tools/calculator" className="inline-flex items-center px-8 py-3 bg-[#D4AF37] text-white font-bold uppercase tracking-widest rounded-full hover:bg-white hover:text-[#2C2420] transition-all shadow-lg text-sm">
                            {i18n.language === 'en' ? 'Start Quiz' : 'Iniciar Quiz'} <ArrowRight className="ml-2 w-4 h-4" />
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
    // English (Legacy/Alias)
    if (silo === 'recovery') return 'Post Surgery';
    if (silo === 'bras') return 'Post-Op Bra';
    if (silo === 'sculpt') return '';

    // Spanish (New)
    if (silo === 'recuperacion') return 'Post Surgery';
    if (silo === 'brasieres') return 'Post-Op Bra';
    if (silo === 'moldeo') return '';
    return '';
}

function mapFilterToTag(filter: string) {
    if (!filter) return '';

    // Spanish Mappings
    if (filter === 'etapa-1') return 'Stage 1';
    if (filter === 'etapa-2') return 'Stage 2';
    if (filter === 'etapa-3') return 'Stage 3';

    if (filter === 'cinturillas' || filter === 'cinturillas-reductoras') return 'Waist Trainer';
    if (filter === 'cinturilla') return 'Waist Trainer';

    if (filter === 'shorts') return 'Short';
    if (filter === 'short') return 'Short';

    if (filter === 'fajas-espalda-alta' || filter === 'espalda-alta') return 'High Back';
    if (filter === 'fajas-media-pierna' || filter === 'media-pierna') return 'Knee Length';

    if (filter === 'uso-diario') return 'Daily Use';
    if (filter === 'corrector') return 'Corrector de Postura';

    if (filter === 'post-lipo' || filter === 'lipo-360') return 'Post Lipo';
    if (filter === 'brazos') return 'Arm Compression';

    if (filter === 'invisible') return 'Invisible';
    if (filter === 'levantacola') return 'Butt Lifter';

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

    if (filter === 'waist') return 'Waist Trainer';
    if (filter === 'daily') return 'Daily Use';

    return capitalize(filter);
}

function resolveShopifyHandle(handle: string) {
    if (handle === 'moldeo' || handle === 'sculpt' || handle === 'moldeo-y-estetica' || handle === 'fajas-reloj-de-arena') return 'sculpt-studio';
    if (handle === 'recuperacion' || handle === 'recovery' || handle === 'recuperacion-postquirurgica') return 'post-quirurgica';
    if (handle === 'bras' || handle === 'brasieres' || handle === 'brasieres-y-postura') return 'essentials';
    return handle;
}

function resolveSeoSlug(handle: string): { silo: string; filter: string } | null {
    if (!handle) return null;

    // Etapas
    if (handle === 'fajas-etapa-1') return { silo: 'recuperacion', filter: 'etapa-1' };
    if (handle === 'fajas-etapa-2') return { silo: 'recuperacion', filter: 'etapa-2' };
    if (handle === 'fajas-etapa-3') return { silo: 'recuperacion', filter: 'etapa-3' };

    // Necesidades
    if (handle === 'fajas-postparto') return { silo: 'recuperacion', filter: 'post-parto' };
    if (handle === 'fajas-para-lipo-360') return { silo: 'recuperacion', filter: 'lipo-360' };

    // Cinturillas
    if (handle === 'cinturillas-reductoras') return { silo: 'moldeo', filter: 'cinturillas' };

    // Atributos
    if (handle === 'fajas-espalda-alta') return { silo: 'recuperacion', filter: 'espalda-alta' };
    if (handle === 'fajas-media-pierna') return { silo: 'recuperacion', filter: 'media-pierna' };

    return null;
}
