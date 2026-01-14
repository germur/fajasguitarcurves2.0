import { ShoppingBag } from 'lucide-react';
import type { StoreProduct } from '../../data/store-data';
import { Link } from 'react-router-dom';

interface BraCardProps {
    product: StoreProduct;
}

import { useStore } from '../../hooks/useStoreContext';

export function BraCard({ product }: BraCardProps) {
    const { title, price, image, badge, benefit, handle } = product;
    const { addToCart, toggleCart } = useStore();
    // Fallback optimization: If handle is missing, use the numeric ID from the GID to avoid URL crashes
    const productHandle = handle || product.id.split('/').pop();

    // Fallback if no badge/benefit provided (though we just added them to store-data)
    const displayBadge = badge || "Best Seller";
    const displayBenefit = benefit || "Soporte médico certificado y corrección de postura inmediata.";

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        // Default to first variant if available, or just the product
        // Assuming simple product for now or let context handle it
        addToCart(product, "Default Title");
        toggleCart();
    };

    return (
        <article className="group relative bg-white rounded-[30px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 ease-out border border-gray-100 min-h-[550px] flex flex-col h-full cursor-pointer">

            {/* BADGE FLOTANTE (UI) */}
            <div className="absolute top-6 left-6 z-20">
                <span className="bg-[#EBE5CE] text-[#3E322C] text-xs font-bold px-4 py-2 rounded-full tracking-widest uppercase shadow-sm">
                    {displayBadge}
                </span>
            </div>

            {/* IMAGEN (Con Zoom suave) */}
            <Link to={`/products/${productHandle}`} className="relative h-[60%] overflow-hidden bg-[#F9F8F6]">
                <img
                    src={image || '/assets/essentials-flatlay.jpg'}
                    onError={(e) => { e.currentTarget.src = '/assets/essentials-flatlay.jpg'; }}
                    alt={title} // SEO: Alt text automático
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />

                {/* Overlay on hover for interaction hint */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>

            {/* INFO BLOCK (UX Writing) */}
            <div className="p-8 flex-1 flex flex-col justify-between relative bg-white">
                <div>
                    {/* H3 para SEO */}
                    <Link to={`/products/${productHandle}`}>
                        <h3 className="font-serif text-2xl text-gray-900 mb-3 leading-tight group-hover:text-[#D4AF37] transition-colors">
                            {title}
                        </h3>
                    </Link>
                    {/* Micro-copy de Beneficio */}
                    <p className="text-sm text-gray-500 font-medium leading-relaxed border-l-2 border-[#D4AF37]/30 pl-3">
                        {displayBenefit}
                    </p>
                </div>

                {/* CTA (Interacción) */}
                <div className="flex justify-between items-center border-t border-gray-100 pt-6 mt-6">
                    <span className="font-mono text-lg font-bold text-gray-900">${price}</span>
                    <button
                        onClick={handleAddToCart}
                        className="bg-[#2C2420] text-white px-6 py-3 rounded-xl text-xs font-bold tracking-widest uppercase hover:bg-[#D4AF37] transition-colors flex items-center gap-2 group-hover:shadow-lg active:scale-95"
                    >
                        <ShoppingBag size={14} />
                        Añadir
                    </button>
                </div>
            </div>
        </article>
    );
}
