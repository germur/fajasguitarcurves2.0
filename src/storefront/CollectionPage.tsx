import { Link } from 'react-router-dom';
import { ShopifyCollectionGrid } from './components/shopify/ShopifyCollectionGrid';

interface CollectionPageProps {
    title: string;
    handle: string;
    description?: string;
}

export function CollectionPage({ title, handle, description }: CollectionPageProps) {
    return (
        <div className="bg-white min-h-screen pb-20 pt-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-12 text-center">
                    <h1 className="font-serif text-4xl md:text-5xl text-[#2C2420] font-bold mb-4">{title}</h1>
                    {description && (
                        <p className="text-stone-500 max-w-2xl mx-auto text-lg">{description}</p>
                    )}
                </div>

                {/* Sub-Collection Navigation (SEO & UX) */}
                <div className="flex justify-center gap-4 mb-12 flex-wrap">
                    <Link to="/post-quirurgica" className={`px-6 py-2 rounded-full border text-sm font-bold transition-colors ${handle === 'post-quirurgica' ? 'bg-[#2C2420] text-white border-[#2C2420]' : 'border-stone-200 text-stone-600 hover:border-[#D1AB66] hover:text-[#D1AB66]'}`}>
                        Stage 1
                    </Link>
                    <Link to="/cinturillas" className={`px-6 py-2 rounded-full border text-sm font-bold transition-colors ${handle === 'cinturillas' ? 'bg-[#2C2420] text-white border-[#2C2420]' : 'border-stone-200 text-stone-600 hover:border-[#D1AB66] hover:text-[#D1AB66]'}`}>
                        Stage 2
                    </Link>
                    <Link to="/shorts" className={`px-6 py-2 rounded-full border text-sm font-bold transition-colors ${handle === 'shorts' ? 'bg-[#2C2420] text-white border-[#2C2420]' : 'border-stone-200 text-stone-600 hover:border-[#D1AB66] hover:text-[#D1AB66]'}`}>
                        Shorts
                    </Link>
                </div>

                {/* 🚨 BREAK BANNER (Pattern Interrupt) */}
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

                <div className="mb-20">
                    <ShopifyCollectionGrid handle={handle} productCount={12} />
                </div>
            </div>
        </div>
    );
}
