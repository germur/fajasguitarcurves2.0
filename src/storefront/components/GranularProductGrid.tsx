import { SculptProductCard } from './silo-sculpt/SculptProductCard';
import { useStore } from '../hooks/useStoreContext';

interface GranularProductGridProps {
    products: any[]; // Mapped Products
    loading?: boolean;
}

export function GranularProductGrid({ products, loading }: GranularProductGridProps) {
    const { addToCart } = useStore();

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 animate-pulse">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="aspect-[3/4] bg-stone-100 rounded-xl" />
                ))}
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-20 text-stone-400">
                <p>No se encontraron productos específicos para esta combinación.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {products.map(product => (
                <SculptProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={() => {
                        addToCart({
                            id: product.id,
                            title: product.title,
                            price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
                            image: product.image,
                            category: 'Granular'
                        }, 'M');
                    }}
                />
            ))}
        </div>
    );
}
