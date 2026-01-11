import { ChevronRight, Stethoscope, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductData {
    id: string;
    title: string;
    price: string;
    image: string;
    stage: 'Stage 1' | 'Stage 2' | 'Stage 3';
    badge: string;
    features: string[];
    handle?: string;
}

interface RecoveryProductCardProps {
    product: ProductData;
    onAddToCart?: (id: string) => void;
}

export function RecoveryProductCard({ product, onAddToCart }: RecoveryProductCardProps) {
    const productHandle = product.handle || product.id.split('/').pop();

    return (
        <div className="group relative w-full bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 ease-out border border-gray-100">

            {/* 1. Imagen con Zoom Effect */}
            <div className="relative aspect-[4/5] overflow-hidden bg-[#F9F8F6]">
                <Link to={`/products/${productHandle}`} className="block w-full h-full">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700 ease-in-out mix-blend-multiply"
                    />
                </Link>

                {/* Badge: Stage (Negro sólido / Deep Cocoa) */}
                <div className="absolute top-4 left-4 bg-[#3E322C] text-white text-[10px] font-bold tracking-widest px-3 py-1 rounded-full uppercase shadow-sm">
                    {product.stage}
                </div>

                {/* Badge: Feature Médico (Verde Salud suave / Sage Green) */}
                <div className="absolute top-4 right-4 bg-[#E0E5DF] text-[#3E322C] text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <Stethoscope size={12} />
                    Surgeon Approved
                </div>

                {/* Quick Add Button (Aparece y sube en Hover) */}
                <button
                    onClick={() => onAddToCart?.(product.id)}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-12 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 w-11/12 bg-white/95 backdrop-blur text-[#3E322C] font-bold text-xs uppercase tracking-widest py-3 rounded-xl shadow-lg hover:bg-[#3E322C] hover:text-white flex items-center justify-center gap-2"
                >
                    <Plus size={14} />
                    Añadir Rápido — {product.price}
                </button>
            </div>

            {/* 2. Info Block (Tipografía Mixta) */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif text-lg text-[#3E322C] leading-snug group-hover:text-[#A35944] transition-colors flex-1">
                        <Link to={`/products/${productHandle}`}>
                            {product.title}
                        </Link>
                    </h3>
                </div>

                {/* SEO Micro-copy: Features list */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {product.features.map((feature, idx) => (
                        <span key={idx} className="text-[9px] uppercase tracking-wider text-gray-500 border border-gray-200 px-2 py-0.5 rounded-sm bg-gray-50">
                            {feature}
                        </span>
                    ))}
                </div>

                {/* Footer: Reviews & Price (Mobile/Static view) */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-1 text-amber-400 text-xs">
                        ★★★★★ <span className="text-gray-300 ml-1 text-[10px]">(128)</span>
                    </div>
                    <span className="font-mono text-sm font-bold text-[#3E322C] md:hidden">{product.price}</span>
                    <Link to={`/products/${productHandle}`} className="text-xs font-bold text-[#3E322C] flex items-center gap-1 hover:gap-2 transition-all md:hidden">
                        Ver Detalles <ChevronRight size={12} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
