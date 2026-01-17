// @ts-nocheck
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from './data/store-data';
import { useProduct } from './hooks/useProduct';
import { useStore } from './hooks/useStoreContext';
// Keys imports
import { ShoppingBag, Star, Check, ShieldCheck, Truck, Loader2, Ruler, ChevronDown, ArrowUpRight, X } from 'lucide-react';
import { ProductFeatureGrid } from './components/ProductFeatureGrid';
// Tools imports for Smart Modal
import GuitarRatioQuiz from './pages/tools/GuitarRatioQuiz';
import { SeoHead } from '../lib/seo/SeoHead';
import { generateMetaTags, generateProductSchema } from '../lib/seo/generators';
import { fetchCollectionByHandle } from '../lib/shopify-client';
import { GranularProductGrid } from './components/GranularProductGrid';

// Sub-component for clean separation
function RelatedProducts({ category }: { category?: string }) {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadRelated() {
            const handle = category === 'Recovery Room' ? 'post-quirurgica' : 'sculpt-studio';
            try {
                const items = await fetchCollectionByHandle(handle);
                setProducts(items.slice(0, 4));
            } catch (e) {
                console.error("Related products err", e);
            } finally {
                setLoading(false);
            }
        }
        loadRelated();
    }, [category]);

    return <GranularProductGrid products={products} loading={loading} />;
}

export function ProductDetailView() {
    const { id } = useParams<{ id: string }>();
    const { addToCart } = useStore();
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [selectedColor, setSelectedColor] = useState<string>(''); // Default empty, let effect handle it
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(true); // Control manual del acordeón

    // Smart Modal State
    const [isCalculatorOpen, setCalculatorOpen] = useState(false);

    // 1. Data Fetching Logic
    const { product: fetchedProduct, loading, error } = useProduct(id || '');
    const localProduct = getProductById(id || '');

    // PRIORITY: Live Data -> Local Fallback
    const product = fetchedProduct || localProduct;

    // ---------------------------------------------------------
    // LOGIC: EXTRACTION & CHECKING
    // ---------------------------------------------------------
    const variants = product?.variants || [];

    // 1. Extract Unique Colors & Sizes
    // Define helper to extract unique values safely
    const getUniqueOptions = (names: string[]) => {
        if (!variants) return [];
        const raw = variants.flatMap((v: any) =>
            v.selectedOptions
                .filter((o: any) => names.includes(o.name))
                .map((o: any) => o.value)
        );
        return Array.from(new Set(raw));
    };

    const uniqueColors = getUniqueOptions(['Color', 'Cor', 'Colour']);
    const uniqueSizes = getUniqueOptions(['Size', 'Talla', 'Tamaño']);

    // 4. Dynamic Image Logic - MOVED UP TO FIX HOOKS ERROR
    const [activeImage, setActiveImage] = useState<string>('');

    // Find the current variant based on selected options
    // Find the current variant based on selected options
    const currentVariant = variants.find((v: any) =>
        v.selectedOptions.some((o: any) => {
            const name = o.name.toLowerCase().trim();
            // Use .some + .includes to catch "Color Principal", "Color ", etc.
            const isColorOption = ['color', 'cor', 'colour'].some(key => name.includes(key));

            const val = o.value?.toLowerCase().trim();
            const selected = selectedColor?.toLowerCase().trim();

            // Log matching attempts if needed, but for now we trust the logic improvement
            return isColorOption && val === selected;
        })
    );

    // EFFECT: Update image when variant changes
    // EFFECT: Update image when variant changes
    useEffect(() => {
        if (currentVariant) {
            let variantImg = currentVariant.image?.src || currentVariant.image?.url || currentVariant.image;

            // --- FALLBACK FOR DUPLICATE IMAGES (3+ Colors Updated) ---
            if (product?.images && variantImg === product.image) {
                const normalizedSelected = selectedColor?.trim().toLowerCase();
                const firstColor = uniqueColors[0]?.trim().toLowerCase();
                const isNotFirstColor = normalizedSelected && firstColor && normalizedSelected !== firstColor;

                if (isNotFirstColor) {
                    // Map color index to image index (Index 0->Img0, Index 1->Img1, Index 2->Img2...)
                    const colorIndex = uniqueColors.findIndex(c => c?.toLowerCase().trim() === normalizedSelected);

                    let targetImage = null;
                    const imgs = product.images;
                    const targetIndex = colorIndex > 0 ? colorIndex : 1; // Default to 1 if index not found/zero logic fails

                    if (Array.isArray(imgs) && imgs.length > targetIndex) {
                        targetImage = imgs[targetIndex]?.node?.url || imgs[targetIndex]?.url || (typeof imgs[targetIndex] === 'string' ? imgs[targetIndex] : null);
                    } else if (imgs?.edges && imgs.edges.length > targetIndex) {
                        targetImage = imgs.edges[targetIndex]?.node?.url;
                    }

                    if (targetImage) variantImg = targetImage;
                }
            }
            // ----------------------------------------------------------------

            if (variantImg) setActiveImage(variantImg);
        } else if (product?.image && !activeImage) {
            setActiveImage(product.image);
        }
    }, [currentVariant, product, selectedColor, uniqueColors]);

    const displayImage = activeImage || product?.image || '';

    // AUTO-SELECT FIRST COLOR (UX Fix)
    useEffect(() => {
        if (uniqueColors.length > 0) {
            // Check if current selection is valid
            const isSelectedValid = uniqueColors.includes(selectedColor);

            // If nothing selected OR invalid selection, defaults to first
            if (!selectedColor || !isSelectedValid) {
                // Try to find "Cocoa" or "Beige" as preference, else first one
                const preferred = uniqueColors.find((c: any) =>
                    ['cocoa', 'beige', 'negro', 'black'].some(p => c.toLowerCase().includes(p))
                );
                setSelectedColor((preferred || uniqueColors[0]) as string);
            }
        }
    }, [uniqueColors, selectedColor]);


    useEffect(() => {
        window.scrollTo(0, 0);
        setSelectedSize('');
        // NOTE: We do NOT reset color here to empty, we let the auto-select logic handle it or keep it if navigating
    }, [id]);

    // Scroll to top helper for sticky bar
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Callback for when the calculator finishes in Modal Mode
    const handleCalculatorResult = (recommendedSize: string) => {
        setSelectedSize(recommendedSize);
        setCalculatorOpen(false);
        // Optional: Add a toast notification here
        alert(`¡Talla ${recommendedSize} seleccionada automáticamente!`);
    };

    if (loading && !product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6]">
                <Loader2 className="animate-spin text-[#D4AF37]" size={40} />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6] px-4">
                <div className="text-center max-w-md">
                    <h2 className="text-3xl font-serif text-[#2C2420] mb-4">Producto no encontrado</h2>
                    <p className="text-sm text-stone-500 mb-6">{error || 'El producto que buscas no existe.'}</p>
                    <Link to="/" className="inline-block bg-[#2C2420] text-white px-8 py-3 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-black transition-colors">Volver al Inicio</Link>
                </div>
            </div>
        );
    }

    const { title, price, image, description, category, badge, benefit } = product;

    // --- SEO GENERATION (MAES Formula) ---
    const { title: seoTitle, description: seoDescription } = generateMetaTags(product);


    // 2. Helper Availability
    const checkAvailability = (color: string, size: string) => {
        const match = (val1: string, val2: string) => val1?.toLowerCase() === val2?.toLowerCase();
        const exactVariant = variants.find((v: any) => {
            const vColor = v.selectedOptions.find((o: any) => ['Color', 'Cor', 'Colour'].includes(o.name))?.value;
            const vSize = v.selectedOptions.find((o: any) => ['Size', 'Talla', 'Tamaño'].includes(o.name))?.value;
            const colorMatch = color ? match(vColor, color) : true;
            const sizeMatch = size ? match(vSize, size) : true;
            return colorMatch && sizeMatch;
        });
        return {
            exists: !!exactVariant,
            available: exactVariant?.available ?? false,
            variant: exactVariant
        };
    };

    // 3. Add to Cart Handler
    const handleAddToCart = () => {
        if (!selectedSize) {
            // Shake animation or highlight could go here
            return;
        }
        // ... (rest of handler)
        const { variant } = checkAvailability(selectedColor, selectedSize);

        if (uniqueColors.length > 0 && !selectedColor) {
            alert('Por favor selecciona un color');
            return;
        }

        if (variant) {
            addToCart(product, variant.title);
        } else {
            addToCart(product, selectedSize);
        }
    };




    return (
        <div className="bg-[#FAF9F6] min-h-screen pb-24 animate-fade-in relative selection:bg-[#D4AF37] selection:text-white">
            {/* NEW SEO SYSTEM IMPLEMENTATION */}
            <SeoHead
                title={seoTitle}
                description={seoDescription}
                type="product"
                image={displayImage}
                path={`/products/${product.handle || id}`}
                schema={generateProductSchema(product, `https://guitarcurves.com/products/${product.handle || id}`)}
            />
            {/* --- MOBILE STICKY BAR (New Feature) --- */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-50 md:hidden flex items-center justify-between shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
                <div className="flex flex-col">
                    <span className="font-serif text-[#2C2420] font-bold truncate max-w-[120px]">{title}</span>
                    <span className="text-xs text-stone-500">${price} USD</span>
                </div>
                <button
                    onClick={selectedSize ? handleAddToCart : scrollToTop}
                    className={`px-6 py-3 rounded-full font-bold text-xs tracking-widest uppercase shadow-lg transition-all ${selectedSize
                        ? 'bg-[#D4AF37] text-white'
                        : 'bg-[#2C2420] text-white'
                        }`}
                >
                    {selectedSize ? 'Agregar' : 'Seleccionar'}
                </button>
            </div>


            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-12 font-sans text-[#2C2420]">

                {/* 1. Breadcrumbs (Clean Design) */}
                <nav className="flex items-center text-[10px] sm:text-xs text-stone-400 mb-8 uppercase tracking-wider">
                    <Link to="/" className="hover:text-[#D4AF37] transition-colors">Home</Link>
                    <span className="mx-2">/</span>
                    <Link to="/collections/sculpt" className="hover:text-[#D4AF37] transition-colors">{category || 'Colección'}</Link>
                    <span className="mx-2">/</span>
                    <span className="text-[#2C2420] font-bold truncate border-b border-[#D4AF37]">{title}</span>
                </nav>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16">

                    {/* 2. Visual Gallery (Left Column) */}
                    <div className="md:col-span-6 lg:col-span-6">
                        <div className="sticky top-24">
                            {/* Main Hero Image - Editorial Look */}
                            <div className="aspect-[3/4] md:aspect-[4/5] bg-stone-100 rounded-[2rem] overflow-hidden relative shadow-sm group cursor-zoom-in">
                                <img
                                    src={displayImage}
                                    alt={title}
                                    className="w-full h-full object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-110"
                                />
                                {badge && (
                                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm text-[#2C2420] text-[10px] font-bold px-4 py-2 rounded-full tracking-widest uppercase shadow-sm border border-white">
                                        {badge}
                                    </div>
                                )}
                            </div>

                            {/* Trust Signals (Horizontal Strip) */}
                            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-stone-200 pt-6">
                                {[
                                    { icon: ShieldCheck, title: "Garantía", sub: "Material Certificado" },
                                    { icon: Truck, title: "Envío Rápido", sub: "Despacho en 24h" },
                                    { icon: Check, title: "Cambios", sub: "Primer cambio gratis" }
                                ].map((item, idx) => (
                                    <div key={idx} className="text-center group">
                                        <div className="w-10 h-10 mx-auto rounded-full bg-white border border-stone-100 flex items-center justify-center text-[#D4AF37] mb-2 shadow-sm group-hover:scale-110 transition-transform">
                                            <item.icon size={18} />
                                        </div>
                                        <p className="text-xs font-bold text-[#2C2420]">{item.title}</p>
                                        <p className="text-[10px] text-stone-400">{item.sub}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 3. The Buy Box (Right Column) */}
                    <div className="md:col-span-6 lg:col-span-6">
                        <div className="md:sticky md:top-24 space-y-8">

                            {/* Header Info */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="flex text-[#D4AF37] gap-0.5">
                                        {[1, 2, 3, 4, 5].map(s => <Star key={s} size={18} fill="currentColor" className="stroke-none" />)}
                                    </div>
                                    <span className="text-xs text-stone-500 font-medium border-b border-stone-200 pb-0.5">540 Reviews</span>
                                </div>

                                <h1 className="font-serif text-3xl md:text-4xl text-[#2C2420] font-medium leading-tight mb-4">
                                    {title}
                                </h1>

                                <div className="flex items-baseline gap-3 mb-6">
                                    <span className="text-4xl text-[#2C2420] font-light tracking-tight">
                                        ${price}
                                    </span>
                                    <div className="flex flex-col text-[10px] text-stone-400 leading-tight">
                                        <span>USD</span>
                                        <span className="text-[#D4AF37] font-bold">En Stock</span>
                                    </div>
                                </div>

                                {/* BNPL Widget */}
                                <div className="bg-[#F9F8F6] border border-[#D4AF37]/20 rounded-lg p-3 flex items-center gap-3">
                                    <div className="bg-[#D4AF37] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">4x</div>
                                    <p className="text-xs text-stone-600">
                                        Paga en cuotas de <span className="font-bold text-[#2C2420]">${(price / 4).toFixed(2)}</span> sin interés.
                                    </p>
                                </div>

                                {/* Tags Display */}
                                {product.tags && product.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {product.tags.map((tag: string) => {
                                            if (tag.toLowerCase() === 'best seller' || tag.includes('HIDDEN')) return null; // Skip non-customer tags
                                            const isRecovery = tag.toLowerCase().includes('stage');
                                            const targetLink = isRecovery
                                                ? `/collections/recovery?tag=${tag.toLowerCase()}`
                                                : `/collections/sculpt?tag=${tag.toLowerCase()}`;

                                            return (
                                                <Link
                                                    key={tag}
                                                    to={targetLink}
                                                    className="text-[10px] uppercase font-bold tracking-wider bg-stone-100 text-stone-500 px-3 py-1.5 rounded-md hover:bg-[#D4AF37] hover:text-white transition-colors"
                                                >
                                                    #{tag}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {/* --- THE VIBECODED SELECTOR --- */}
                            <div className="space-y-8">

                                {/* 1. Color Swatches (Visual) */}
                                {uniqueColors.length > 0 && (
                                    <div>
                                        <label className="text-xs font-bold uppercase tracking-widest text-stone-900 mb-4 block flex justify-between">
                                            <span>Color: <span className="text-stone-500 font-normal capitalize">{selectedColor}</span></span>
                                        </label>
                                        <div className="flex gap-4">
                                            {uniqueColors.map((color: string) => {
                                                const lowerColor = color.toLowerCase();
                                                // Mapeo real de colores (Robust Multi-language Support)
                                                const bgStyle = lowerColor.includes('cocoa') ? '#C8A688'
                                                    : lowerColor.includes('mocha') ? '#6F4E37'
                                                        : lowerColor.includes('moka') ? '#6F4E37' // Spanish Moka
                                                            : lowerColor.includes('black') ? '#1A1A1A'
                                                                : lowerColor.includes('negro') ? '#1A1A1A' // Spanish Black
                                                                    : lowerColor.includes('beige') ? '#F5F5DC'
                                                                        : lowerColor.includes('nude') ? '#E8BEAC'
                                                                            : lowerColor.includes('cafe') ? '#6F4E37'
                                                                                : lowerColor.includes('chocolate') ? '#3D2B1F'
                                                                                    : '#E5E5E5';

                                                return (
                                                    <button
                                                        key={color}
                                                        onClick={() => { setSelectedColor(color); setSelectedSize(''); }}
                                                        className={`w-12 h-12 rounded-full transition-all relative group ${selectedColor === color
                                                            ? 'ring-2 ring-offset-2 ring-[#D4AF37] scale-110'
                                                            : 'hover:scale-105 hover:ring-2 hover:ring-stone-200'
                                                            }`}
                                                        style={{ backgroundColor: bgStyle }}
                                                        title={color}
                                                        aria-label={`Select color ${color}`}
                                                    >
                                                        {selectedColor === color && (
                                                            <span className="absolute inset-0 flex items-center justify-center text-white drop-shadow-md">
                                                                <Check size={16} strokeWidth={3} />
                                                            </span>
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* 2. Size Grid (The Replacement for Select) */}
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <label className="text-xs font-bold uppercase tracking-widest text-stone-900">
                                            Talla: <span className="text-stone-500 font-normal">{selectedSize || 'Seleccionar'}</span>
                                        </label>
                                        {/* TRIGGER FOR SMART MODAL */}
                                        <button
                                            onClick={() => setCalculatorOpen(true)}
                                            className="flex items-center gap-1 text-[10px] font-bold text-[#D4AF37] hover:text-black transition-colors underline decoration-[#D4AF37]/40"
                                        >
                                            <Ruler size={12} /> ¿No sabes tu talla? Calcular aquí
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                                        {uniqueSizes.map((size: string) => {
                                            const { exists, available } = checkAvailability(selectedColor, size);
                                            // Lógica de fallback para productos simples
                                            const isGenericValid = !selectedColor ? variants.some((v: any) => v.selectedOptions.some((o: any) => ['Size', 'Talla', 'Tamaño'].includes(o.name) && o.value === size)) : exists;
                                            const isDisabled = !isGenericValid;

                                            return (
                                                <button
                                                    key={size}
                                                    onClick={() => setSelectedSize(size)}
                                                    disabled={isDisabled}
                                                    className={`
                                                        py-3 rounded-lg text-xs font-bold transition-all border
                                                        ${isDisabled
                                                            ? 'bg-stone-50 text-stone-300 border-transparent cursor-not-allowed decoration-slice line-through decoration-stone-300'
                                                            : selectedSize === size
                                                                ? 'bg-[#2C2420] text-white border-[#2C2420] shadow-md transform -translate-y-0.5'
                                                                : 'bg-white text-stone-600 border-stone-200 hover:border-[#D4AF37] hover:text-[#D4AF37]'
                                                        }
                                                    `}
                                                >
                                                    {size}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    {!selectedSize && (
                                        <p className="text-[10px] text-[#A35944] mt-2 flex items-center gap-1 animate-pulse">
                                            * Selecciona una talla para continuar
                                        </p>
                                    )}
                                </div>

                                {/* 3. Main CTA */}
                                <button
                                    onClick={handleAddToCart}
                                    disabled={!selectedSize}
                                    className={`w-full py-5 rounded-2xl font-bold tracking-[0.2em] text-xs uppercase transition-all shadow-xl flex items-center justify-center gap-3 group
                                        ${selectedSize
                                            ? 'bg-[#D4AF37] text-white hover:bg-[#2C2420] hover:shadow-2xl hover:-translate-y-1'
                                            : 'bg-stone-200 text-stone-400 cursor-not-allowed'}
                                    `}
                                >
                                    <ShoppingBag size={18} className={selectedSize ? "group-hover:animate-bounce" : ""} />
                                    <span>{selectedSize ? 'Agregar al Carrito' : 'Elige una opción'}</span>
                                </button>

                                {/* 🆚 COMPARATOR MICRO-COMPONENT (Tooltip/Link) - Kept as is, but could be modalized too */}
                                <Link to="/tools/stage1-vs-stage2" className="mt-4 p-3 bg-[#F9F4E8] border border-[#D4AF37]/30 rounded-lg flex items-center gap-3 cursor-pointer hover:bg-[#F0EBE0] transition-colors group">
                                    <span className="text-xl group-hover:scale-110 transition-transform">ℹ️</span>
                                    <div>
                                        <p className="text-xs font-bold text-[#2C2420] uppercase">¿Miedo a equivocarte de etapa?</p>
                                        <p className="text-xs text-[#D4AF37] underline decoration-[#D4AF37]/40">Ver Comparativa Visual: Stage 1 vs Stage 2</p>
                                    </div>
                                </Link>
                            </div>


                            {/* Accordions (Clean Design) */}
                            {/* Accordions (Clean Design) & Feature Grid */}
                            <div className="border-t border-stone-200 pt-6">
                                {/* FEATURE GRID */}
                                <div className="pb-8">
                                    <h3 className="font-serif text-lg text-[#2C2420] mb-4">Ingeniería Detallada</h3>
                                    <ProductFeatureGrid />
                                </div>
                                <div className="border-b border-stone-100">
                                    <button
                                        onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
                                        className="w-full py-4 flex justify-between items-center text-left"
                                    >
                                        <span className="font-serif text-lg text-[#2C2420]">
                                            {isDescriptionOpen ? 'Leer menos' : 'Leer descripción detallada y beneficios (+)'}
                                        </span>
                                        <ChevronDown size={16} className={`transition-transform duration-300 ${isDescriptionOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                    <div className={`overflow-hidden transition-all duration-300 ${isDescriptionOpen ? 'max-h-[500px] opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
                                        <p className="text-sm text-stone-600 leading-relaxed font-light mb-4">
                                            {benefit || "Esta prenda combina ingeniería textil colombiana con comodidad diaria. Diseñada para moldear sin asfixiar."}
                                        </p>
                                        <div className="text-xs text-stone-500 prose prose-stone">
                                            {description ? <div dangerouslySetInnerHTML={{ __html: description }} /> : null}
                                        </div>
                                    </div>
                                </div>

                                <div className="border-b border-stone-100">
                                    <details className="group">
                                        <summary className="w-full py-4 flex justify-between items-center text-left cursor-pointer list-none">
                                            <span className="font-serif text-lg text-[#2C2420]">Especificaciones Técnicas</span>
                                            <ChevronDown size={16} className="transition-transform duration-300 group-open:rotate-180" />
                                        </summary>
                                        <div className="pb-4 text-sm text-stone-600 leading-relaxed font-light pl-4">
                                            <ul className="list-disc space-y-2 marker:text-[#D4AF37]">
                                                <li>Powernet de Alta Compresión (Grado Médico).</li>
                                                <li>Forro interno de Lycra con microcápsulas de Vitamina E.</li>
                                                <li>Costuras planas imperceptibles (Tecnología Seamless).</li>
                                                <li>Sistema de cierre perineal.</li>
                                            </ul>
                                        </div>
                                    </details>
                                </div>

                                <div className="border-b border-stone-100">
                                    <details className="group">
                                        <summary className="w-full py-4 flex justify-between items-center text-left cursor-pointer list-none">
                                            <span className="font-serif text-lg text-[#2C2420]">Preguntas Frecuentes</span>
                                            <ChevronDown size={16} className="transition-transform duration-300 group-open:rotate-180" />
                                        </summary>
                                        <div className="pb-4 text-sm text-stone-600 leading-relaxed font-light pl-4 space-y-4">
                                            <div>
                                                <p className="font-bold text-[#2C2420] mb-1">¿Cómo sé mi talla?</p>
                                                <p>Usa nuestra Guía de Tallas y mídete cintura y cadera. Si estás en post-op, considera tu inflamación.</p>
                                            </div>
                                            <div>
                                                <p className="font-bold text-[#2C2420] mb-1">¿Cómo lavo la prenda?</p>
                                                <p>Lavar a mano con jabón suave y agua fría. No usar secadora ni exprimir para no dañar el Powernet.</p>
                                            </div>
                                            <div>
                                                <p className="font-bold text-[#2C2420] mb-1">¿Aceptan cambios?</p>
                                                <p>Sí, aceptamos el primer cambio gratis dentro de los 30 días si la prenda está en perfecto estado.</p>
                                            </div>
                                            <div className="pt-2">
                                                <Link to="/pages/faq" className="text-[#D4AF37] font-bold underline text-xs">Ver todas las preguntas frecuentes</Link>
                                            </div>
                                        </div>
                                    </details>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Related Products */}
                <div className="mt-32">
                    <div className="flex justify-between items-end mb-12">
                        <h3 className="font-serif text-3xl md:text-4xl text-[#2C2420]">
                            También te podría gustar
                        </h3>
                        <Link to="/collections/sculpt" className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D4AF37] hover:text-[#2C2420] transition-colors">
                            Ver Todo <ArrowUpRight size={14} />
                        </Link>
                    </div>
                    {/* Unified Granular Grid Substitution */}
                    <RelatedProducts category={category} />
                </div>

            </div>

            {/* --- SMART MODAL OVERLAY --- */}
            {isCalculatorOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
                    <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg relative animate-slide-up max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setCalculatorOpen(false)}
                            className="absolute top-4 right-4 z-50 p-2 bg-white rounded-full shadow-sm hover:bg-stone-100 transition-colors"
                        >
                            <X size={20} className="text-stone-500" />
                        </button>

                        <div className="p-2 md:p-6">
                            {/* Pass mode="modal" to activate the embedded behavior */}
                            <GuitarRatioQuiz
                                mode="modal"
                                onComplete={handleCalculatorResult}
                                onClose={() => setCalculatorOpen(false)}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
