import { ArrowRight } from 'lucide-react'

interface Product {
    id: string
    title: string
    price: number
    image: string
    mechanism?: string
}

interface PrescriptionCardProps {
    product: Product
}

export function PrescriptionCard({ product }: PrescriptionCardProps) {
    return (
        <div className="group bg-white rounded-xl overflow-hidden border border-stone-200 hover:border-[#D1AB66] transition-all duration-300">
            <div className="flex flex-col md:flex-row h-full">
                {/* Image Side */}
                <div className="md:w-1/3 relative overflow-hidden bg-stone-100 min-h-[200px]">
                    {product.image ? (
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-4xl grayscale opacity-20">
                            🩺
                        </div>
                    )}

                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur text-[#A35944] text-[10px] font-bold px-2 py-1 rounded border border-[#A35944]/20">
                        CLINICALLY PROVEN
                    </div>
                </div>

                {/* Content Side */}
                <div className="md:w-2/3 p-6 flex flex-col justify-center">
                    <h3 className="font-serif font-bold text-[#2C2420] text-xl mb-1 group-hover:text-[#A35944] transition-colors">
                        {product.title}
                    </h3>

                    <div className="mb-4">
                        <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Mechanism of Action</span>
                        <p className="text-[#A35944] font-medium leading-relaxed">
                            {product.mechanism}
                        </p>
                    </div>

                    <div className="mt-auto flex items-center justify-between border-t border-stone-100 pt-4">
                        <span className="font-bold text-lg text-[#2C2420]">${product.price}</span>
                        <button className="flex items-center gap-2 text-sm font-bold text-[#D1AB66] group-hover:translate-x-1 transition-transform">
                            View Prescription <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
