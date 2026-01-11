import { Link } from 'react-router-dom';
import { ShoppingBag, Loader2 } from 'lucide-react';
import type { StoreProduct } from '../data/store-data';
import { useSculptProducts } from '../hooks/useSculptProducts';
import { useRecoveryProducts } from '../hooks/useRecoveryProducts';
import { useEffect, useState } from 'react';

interface LocalCollectionGridProps {
    handle?: string; // e.g. 'cinturillas', 'recovery', 'sculpt'
    productCount?: number;
    fallbackProducts?: 'recovery' | 'sculpt' | 'all';
}

export function LocalCollectionGrid({ handle, productCount = 4, fallbackProducts = 'all' }: LocalCollectionGridProps) {

    // Dynamic Hook Selection
    const { products: sculptProducts, loading: loadingSculpt } = useSculptProducts();
    const { products: recoveryProducts, loading: loadingRecovery } = useRecoveryProducts();

    const [displayProducts, setDisplayProducts] = useState<StoreProduct[]>([]);

    useEffect(() => {
        let selected: StoreProduct[] = [];

        // Logic to pick source
        if (handle === 'cinturillas' || fallbackProducts === 'sculpt') {
            selected = sculptProducts;
        } else if (fallbackProducts === 'recovery') {
            selected = recoveryProducts;
        } else {
            // Mix if 'all' (Simple concatenate for now)
            selected = [...sculptProducts, ...recoveryProducts];
        }

        // Shuffle & Slice (only if we have data)
        if (selected.length > 0) {
            const shuffled = [...selected].sort(() => 0.5 - Math.random()).slice(0, productCount);
            setDisplayProducts(shuffled);
        }
    }, [sculptProducts, recoveryProducts, handle, fallbackProducts, productCount]);


    if (loadingSculpt || loadingRecovery) {
        return (
            <div className="w-full h-40 flex items-center justify-center">
                <Loader2 className="animate-spin text-[#D4AF37]" />
            </div>
        );
    }

    // Fallback if no real products found yet (Optional: Show Empty or Keep Local Logic as last resort?)
    // For now, let's just render what we have. 

    if (displayProducts.length === 0) {
        return <div className="text-center text-xs text-stone-400 py-8">Cargando colección...</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayProducts.map((product: StoreProduct) => (
                <div key={product.id} className="group relative bg-white p-4 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100">

                    {/* Image Area */}
                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-stone-50 mb-4">
                        <Link to={`/products/${product.handle || product.id}`} className="block w-full h-full">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                            />
                        </Link>

                        {/* Quick Add Button */}
                        <div className="absolute bottom-3 left-3 right-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <button className="w-full bg-white/90 backdrop-blur text-[#2C2420] py-2 px-4 rounded-lg font-bold text-[10px] tracking-widest uppercase hover:bg-[#2C2420] hover:text-white transition-colors shadow-sm flex items-center justify-center gap-2">
                                <ShoppingBag size={12} />
                                Agregar
                            </button>
                        </div>
                    </div>

                    {/* Info */}
                    <div>
                        <p className="text-[10px] font-bold tracking-[0.2em] text-[#A35944]/80 uppercase mb-1">
                            {product.category || 'Collection'}
                        </p>
                        <Link to={`/products/${product.handle || product.id}`}>
                            <h4 className="font-serif text-base text-[#2C2420] leading-tight mb-2 group-hover:text-[#A35944] transition-colors line-clamp-2 min-h-[2.5em]">
                                {product.title}
                            </h4>
                        </Link>
                        <p className="font-medium text-[#2C2420]">
                            ${product.price}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
