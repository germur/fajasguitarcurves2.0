

import { Link } from 'react-router-dom';

interface SculptProductCardProps {
    product: {
        id: string;
        title: string;
        price: string;
        imageProduct: string; // The "Technical" view (faja visible)
        imageResult: string; // The "Lifestyle" view (clothes on)
        tags: string[];
        handle?: string;
        benefit: string; // e.g. "Reduces 5cm instantly"
    };
    onAddToCart?: (id: string) => void;
}

export function SculptProductCard({ product, onAddToCart }: SculptProductCardProps) {
    // Fallback optimization: If handle is missing, use the numeric ID from the GID to avoid URL crashes
    const productHandle = product.handle || product.id.split('/').pop();
    return (
        <div className="group relative w-full">
            {/* Aspect Ratio Container - Wrapped in Link */}
            <div className="relative aspect-[3/4] w-full bg-stone-100 rounded-lg overflow-hidden group-hover:shadow-xl transition-all duration-300">
                <Link to={`/products/${productHandle}`} className="block w-full h-full">
                    {/* Image 1: Product (Default Visible) */}
                    <img
                        src={product.imageProduct || '/assets/placeholder-image_square.jpg'}
                        onError={(e) => { e.currentTarget.src = '/assets/placeholder-image_square.jpg'; }}
                        alt={product.title}
                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out z-10 group-hover:opacity-0"
                    />

                    {/* Image 2: Result (Hover Visible) */}
                    <img
                        src={product.imageResult}
                        alt={`${product.title} Result`}
                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out z-0 opacity-100"
                    />

                    {/* Badge: High Compression */}
                    <div className="absolute top-2 left-2 z-20 bg-white/90 backdrop-blur-sm text-black text-[9px] font-bold tracking-widest px-2 py-1 uppercase shadow-sm group-hover:opacity-0 transition-opacity duration-300">
                        High Compression
                    </div>
                </Link>

                {/* Simple Overlay on Hover (Bottom) - BUTTON MUST STOP PROPAGATION */}
                <div className="absolute inset-x-0 bottom-0 z-30 p-4 bg-white/95 backdrop-blur-sm translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out flex flex-col items-center text-center border-t border-stone-100">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            onAddToCart?.(product.id);
                        }}
                        className="w-full bg-stone-900 text-white font-bold text-xs uppercase tracking-widest py-3 hover:bg-[#D4AF37] transition-colors flex items-center justify-center gap-2"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* Title Below Card (Catalog Style) */}
            <div className="mt-4 text-left">
                <Link to={`/products/${productHandle}`} className="block">
                    <h3 className="font-serif text-lg text-stone-900 leading-tight group-hover:text-[#D4AF37] transition-colors">
                        {product.title}
                    </h3>
                </Link>
                <p className="text-stone-500 text-xs uppercase tracking-widest font-bold mt-1">
                    {product.price} USD
                </p>
            </div>
        </div>
    );
}
