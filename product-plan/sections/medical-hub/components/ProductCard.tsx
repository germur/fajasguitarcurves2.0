import { Star } from 'lucide-react'
import type { MedicalProduct } from '../../../../product/sections/medical-hub/types'

interface ProductCardProps {
    product: MedicalProduct
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="group bg-white rounded-lg border border-stone-200 overflow-hidden hover:shadow-lg transition-all duration-300">
            {/* Image Area */}
            <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden">
                {/* Placeholder for image */}
                <div className="absolute inset-0 flex items-center justify-center text-stone-400 bg-stone-50">
                    Product Image
                </div>

                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                    <span className="bg-[#F5EDDF] text-[#A35944] text-[10px] font-bold px-2 py-1 rounded border border-[#D1AB66]">
                        {product.stage}
                    </span>
                    {product.bestFor.includes('BBL') && (
                        <span className="bg-white/90 text-stone-800 text-[10px] font-bold px-2 py-1 rounded">
                            🍑 BBL Friendly
                        </span>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="flex items-center gap-1 mb-2">
                    <div className="flex text-[#D1AB66]">
                        <Star size={12} fill="currentColor" />
                        <Star size={12} fill="currentColor" />
                        <Star size={12} fill="currentColor" />
                        <Star size={12} fill="currentColor" />
                        <Star size={12} fill="currentColor" />
                    </div>
                    <span className="text-xs text-stone-400">(128)</span>
                </div>

                <h3 className="font-serif text-[#2C2420] font-bold text-lg leading-tight mb-1 group-hover:text-[#A35944] transition-colors">
                    {product.title}
                </h3>

                <p className="text-sm text-stone-500 mb-3 line-clamp-2">
                    {product.features.join(' • ')}
                </p>

                <div className="flex items-center justify-between mt-4">
                    <span className="text-[#A35944] font-bold text-lg">
                        ${product.price}
                    </span>
                    <button className="bg-[#A35944] hover:bg-[#D1AB66] text-white text-sm font-medium px-4 py-2 rounded transition-colors">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}
