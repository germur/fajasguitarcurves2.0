import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Star, Ruler, Info, ShoppingBag } from 'lucide-react';
import { useState, useMemo, useEffect, useRef } from 'react';
import { useStore } from './hooks/useStoreContext';
import { SeoHead } from './components/SeoHead';
import { StickyAddToCart } from './components/product/StickyAddToCart';

export function ProductDetailView() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { products, addToCart } = useStore();
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [isStickyVisible, setIsStickyVisible] = useState(false);
    const addToCartRef = useRef<HTMLButtonElement>(null);

    // Derived state
    const product = useMemo(() => {
        if (!id) return null;
        return products.find(p => p.id === id || p.id.split('/').pop() === id) || null;
    }, [id, products]);

    // Sticky Logic
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Show sticky bar when main button is NOT visible (scrolled past)
                setIsStickyVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0);
            },
            { threshold: 0 }
        );

        if (addToCartRef.current) {
            observer.observe(addToCartRef.current);
        }

        return () => observer.disconnect();
    }, [product]);

    // Generate Schema JSON-LD
    const schema = useMemo(() => {
        if (!product) return undefined;
        return {
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": product.title,
            "image": product.image,
            "description": product.description,
            "brand": {
                "@type": "Brand",
                "name": "Fajas Guitar Curves"
            },
            "sku": product.id,
            "offers": {
                "@type": "Offer",
                "url": window.location.href,
                "priceCurrency": "USD",
                "price": product.price,
                "availability": "https://schema.org/InStock",
                "itemCondition": "https://schema.org/NewCondition",
                "merchantReturnPolicy": {
                    "@type": "MerchantReturnPolicy",
                    "returnFees": "https://schema.org/FreeReturn",
                    "merchantReturnDays": 30
                },
                "shippingDetails": {
                    "@type": "OfferShippingDetails",
                    "shippingRate": {
                        "@type": "MonetaryAmount",
                        "value": 0,
                        "currency": "USD"
                    },
                    "shippingDestination": {
                        "@type": "DefinedRegion",
                        "addressCountry": "US"
                    }
                }
            },
            "category": product.stage || "Post-Surgical Shapewear"
        };
    }, [product]);

    const handleAddToCart = () => {
        if (!product || !selectedSize) return;
        addToCart(product, selectedSize);
        // Simple visual feedback
        const btn = document.getElementById('add-to-cart-btn');
        if (btn) {
            const originalText = btn.innerText;
            btn.innerText = "ADDED!";
            btn.classList.add('bg-green-600');
            setTimeout(() => {
                btn.innerText = originalText;
                btn.classList.remove('bg-green-600');
            }, 1000);
        }
    };

    if (!id) return <div>Invalid Product ID</div>;

    // Loading state or Not Found
    if (products.length === 0) return <div className="p-10 text-center">Loading Store Catalog...</div>;
    if (!product) return (
        <div className="p-10 text-center">
            <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
            <button onClick={() => navigate('/store')} className="text-[#B49286] hover:underline">Return to Store</button>
        </div>
    );

    // Mock sizes if not present
    const sizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

    return (
        <div className="pt-8 pb-20 max-w-7xl mx-auto px-6 font-sans">
            <SeoHead
                title={`${product.title} | Fajas Guitar Curves`}
                description={product.description?.substring(0, 160) || "Medical grade post-surgical shapewear."}
                type="product"
                image={product.image}
                schema={schema}
            />

            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-stone-500 hover:text-[#2C2420] mb-8 transition-colors"
                id="back-button"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Results
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="aspect-[3/4] bg-stone-100 rounded-2xl overflow-hidden relative group">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            width="600"
                            height="800"
                            fetchPriority="high" // Critical for LCP
                        />
                        {product.stage && (
                            <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-[#2C2420] px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                                {product.stage}
                            </span>
                        )}
                    </div>
                </div>

                {/* Product Info */}
                <div>
                    <div className="flex items-center space-x-2 mb-4">
                        <div className="flex text-[#B49286]">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                        </div>
                        <span className="text-xs text-stone-500 font-bold tracking-wide">VERIFIED REVIEWS</span>
                    </div>

                    <h1 className="font-serif text-3xl md:text-4xl text-[#2C2420] font-bold mb-3 leading-tight">{product.title}</h1>
                    <p className="text-2xl text-stone-900 font-medium mb-6">${product.price}</p>

                    <div className="prose prose-stone text-stone-600 mb-8 leading-relaxed">
                        <p>{product.description}</p>
                    </div>

                    {/* Features List */}
                    {product.features && (
                        <ul className="mb-8 space-y-2">
                            {product.features.map(f => (
                                <li key={f} className="flex items-center text-sm text-stone-600">
                                    <span className="w-1.5 h-1.5 bg-[#B49286] rounded-full mr-2"></span>
                                    {f}
                                </li>
                            ))}
                        </ul>
                    )}

                    {/* Sizes */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-sm font-bold text-[#2C2420]">Select Size <span className="text-stone-400 font-normal">(US Standard)</span></span>
                            <button className="flex items-center text-xs text-[#B49286] font-bold hover:underline">
                                <Ruler className="w-3 h-3 mr-1" /> Size Guide
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {sizes.map(size => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`
                                        w-12 h-12 rounded-lg border flex items-center justify-center text-sm font-bold transition-all
                                        ${selectedSize === size
                                            ? 'border-[#2C2420] bg-[#2C2420] text-white shadow-md transform scale-105'
                                            : 'border-stone-200 text-stone-600 hover:border-[#B49286] hover:text-[#B49286]'
                                        }
                                    `}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                        {!selectedSize && <p className="text-xs text-red-500 mt-2 h-4">Please select a size</p>}
                    </div>

                    {/* Actions */}
                    <button
                        ref={addToCartRef}
                        id="add-to-cart-btn"
                        onClick={handleAddToCart}
                        disabled={!selectedSize}
                        className={`
                            w-full h-14 rounded-full font-bold text-lg tracking-wide transition-all shadow-lg flex items-center justify-center gap-2
                            ${selectedSize
                                ? 'bg-[#B49286] text-white hover:bg-[#A35944] shadow-[#B49286]/20'
                                : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                            }
                        `}
                    >
                        <ShoppingBag size={20} />
                        ADD TO CART
                    </button>

                    <div className="bg-stone-50 p-4 rounded-xl flex items-start gap-3 mt-8 border border-stone-100">
                        <Info className="w-5 h-5 text-stone-400 shrink-0 mt-0.5" />
                        <p className="text-xs text-stone-500 leading-relaxed">
                            <strong>Note:</strong> Free exchanges on all sizing issues within 30 days. Our fit specialists review every order.
                        </p>
                    </div>
                </div>
            </div>

            {/* Sticky Mobile Bar */}
            <StickyAddToCart
                product={product}
                selectedSize={selectedSize}
                onAddToCart={handleAddToCart}
                isVisible={isStickyVisible}
            />
        </div>
    );
}
