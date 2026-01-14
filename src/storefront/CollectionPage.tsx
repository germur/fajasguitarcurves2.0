import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ShopifyCollectionGrid } from './components/shopify/ShopifyCollectionGrid';
import { GranularProductGrid } from './components/GranularProductGrid';
import { fetchProductsByTags } from '../lib/shopify-client';
import { ShopifyMapper } from '../lib/shopify-mapper';
import { SeoHead } from '../lib/seo/SeoHead';

interface CollectionPageProps {
    title?: string;
    handle?: string;
    description?: string;
}

export function CollectionPage({ title: propTitle, handle: propHandle, description: propDesc }: CollectionPageProps) {
    const params = useParams();

    // Determine Mode: Route Params (Granular) vs Props (Standard)
    const isGranular = !!params.silo && !!params.filter;

    // State for Granular Mode
    const [granularProducts, setGranularProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    // Derived Data
    const handle = propHandle || params.handle || '';
    const silo = params.silo || '';
    const filter = params.filter || '';

    // SEO Data Construction
    const pageTitle = isGranular
        ? `${capitalize(filter)} ${capitalize(silo)} Fajas`
        : (propTitle || capitalize(handle));

    const seoDescription = isGranular
        ? `Shop the best ${filter.replace(/-/g, ' ')} options from our ${silo} collection. High compression and specialized support.`
        : (propDesc || `Explore our ${pageTitle} collection at Guitar Curves.`);

    // Granular Fetching Logic
    useEffect(() => {
        if (isGranular) {
            setLoading(true);
            const tagsToFetch = [mapSiloToTag(silo), mapFilterToTag(filter)];

            fetchProductsByTags(tagsToFetch.filter(Boolean))
                .then(rawProducts => {
                    const mapped = rawProducts.map((p: any) => ShopifyMapper.mapProduct(p, 'standard'));
                    setGranularProducts(mapped);
                })
                .finally(() => setLoading(false));
        }
    }, [silo, filter, isGranular]);

    return (
        <div className="bg-white min-h-screen pb-20 pt-10">
            <SeoHead
                title={`${pageTitle} | Guitar Curves`}
                description={seoDescription}
                path={window.location.pathname}
            />

            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-12 text-center">
                    <h1 className="font-serif text-4xl md:text-5xl text-[#2C2420] font-bold mb-4 capitalize">
                        {pageTitle}
                    </h1>
                    <p className="text-stone-500 max-w-2xl mx-auto text-lg">
                        {seoDescription}
                    </p>
                </div>

                {/* Sub-Collection Navigation (SEO & UX) - Only show on standard pages or if relevant */}
                {!isGranular && (
                    <div className="flex justify-center gap-4 mb-12 flex-wrap">
                        <Link to="/collections/recovery/stage-1" className="px-6 py-2 rounded-full border border-stone-200 text-stone-600 text-sm font-bold hover:border-[#D1AB66] hover:text-[#D1AB66] transition-colors">
                            Stage 1
                        </Link>
                        <Link to="/collections/recovery/stage-2" className="px-6 py-2 rounded-full border border-stone-200 text-stone-600 text-sm font-bold hover:border-[#D1AB66] hover:text-[#D1AB66] transition-colors">
                            Stage 2
                        </Link>
                        <Link to="/collections/sculpt/shorts" className="px-6 py-2 rounded-full border border-stone-200 text-stone-600 text-sm font-bold hover:border-[#D1AB66] hover:text-[#D1AB66] transition-colors">
                            Shorts
                        </Link>
                    </div>
                )}

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
                    {isGranular ? (
                        <GranularProductGrid products={granularProducts} loading={loading} />
                    ) : (
                        <ShopifyCollectionGrid handle={handle} productCount={12} />
                    )}
                </div>
            </div>
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
    if (silo === 'recovery') return 'Recovery';
    if (silo === 'sculpt') return 'Sculpt';
    if (silo === 'bras') return 'Brasier';
    return '';
}

function mapFilterToTag(filter: string) {
    // Basic heuristics, can be expanded
    if (filter === 'stage-2') return 'Stage 2';
    if (filter === 'stage-1') return 'Stage 1';
    if (filter === 'shorts') return 'Short';
    if (filter === 'post-lipo') return 'Post Lipo';
    if (filter === 'strapless') return 'Strapless';
    // Default: try to capitalize
    return capitalize(filter);
}
