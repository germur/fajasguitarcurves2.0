import { ShoppingBag } from 'lucide-react';
// import { useStore } from '../hooks/useStoreContext';

interface StickyAddToCartProps {
    product: any;
    selectedSize: string;
    onAddToCart: () => void;
    isVisible: boolean;
}

export function StickyAddToCart({ product, selectedSize, onAddToCart, isVisible }: StickyAddToCartProps) {
    if (!product || !isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 p-4 z-40 md:hidden animate-slide-up shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
            <div className="flex items-center gap-4">
                {/* Thumbnail */}
                <div className="w-12 h-12 bg-stone-100 rounded-lg overflow-hidden shrink-0">
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-[#2C2420] truncate">{product.title}</h4>
                    <p className="text-xs text-stone-500 font-medium">
                        {selectedSize ? `Size: ${selectedSize}` : 'Select Size'} • ${product.price}
                    </p>
                </div>

                {/* Button */}
                <button
                    onClick={onAddToCart}
                    disabled={!selectedSize}
                    className={`
                        h-10 px-6 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-colors whitespace-nowrap
                        ${selectedSize
                            ? 'bg-[#B49286] text-white hover:bg-[#A35944]'
                            : 'bg-stone-200 text-stone-400'
                        }
                    `}
                >
                    <ShoppingBag size={16} />
                    ADD
                </button>
            </div>
        </div>
    );
}
