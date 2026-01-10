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
                    <a href="/store/medical" className={`px-6 py-2 rounded-full border text-sm font-bold transition-colors ${handle === 'post-quirurgica' ? 'bg-[#2C2420] text-white border-[#2C2420]' : 'border-stone-200 text-stone-600 hover:border-[#D1AB66] hover:text-[#D1AB66]'}`}>
                        Stage 1
                    </a>
                    <a href="/store/cinturillas" className={`px-6 py-2 rounded-full border text-sm font-bold transition-colors ${handle === 'cinturillas' ? 'bg-[#2C2420] text-white border-[#2C2420]' : 'border-stone-200 text-stone-600 hover:border-[#D1AB66] hover:text-[#D1AB66]'}`}>
                        Stage 2
                    </a>
                    <a href="/store/shorts" className={`px-6 py-2 rounded-full border text-sm font-bold transition-colors ${handle === 'shorts' ? 'bg-[#2C2420] text-white border-[#2C2420]' : 'border-stone-200 text-stone-600 hover:border-[#D1AB66] hover:text-[#D1AB66]'}`}>
                        Shorts
                    </a>
                </div>

                <div className="mb-20">
                    <ShopifyCollectionGrid handle={handle} productCount={12} />
                </div>
            </div>
        </div>
    );
}
