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
            {products.map(product => {
                // Defensive Mapping: Handle different data structures (SDK vs Normalized)
                const firstImage = product.images?.[0]?.src || product.images?.[0]?.url || product.featuredImage?.url || product.image;
                const secondImage = product.images?.[1]?.src || product.images?.[1]?.url || firstImage;

                // Robust Price Resolver
                let resolvedPrice = "0";
                if (product.price && (typeof product.price === 'string' || typeof product.price === 'number')) {
                    resolvedPrice = String(product.price);
                } else if (product.price?.amount) {
                    resolvedPrice = product.price.amount;
                } else if (product.variants?.[0]?.price?.amount) {
                    resolvedPrice = product.variants[0].price.amount;
                } else if (product.variants?.[0]?.price && (typeof product.variants[0].price === 'string')) {
                    resolvedPrice = product.variants[0].price;
                }

                const mappedProduct = {
                    ...product,
                    // If properties exist, use them. If not, map from images array.
                    imageProduct: product.imageProduct || firstImage,
                    imageResult: product.imageResult || secondImage,
                    // Force resolved price
                    price: resolvedPrice
                };

                return (
                    <SculptProductCard
                        key={product.id}
                        product={mappedProduct}
                        onAddToCart={() => {
                            addToCart({
                                id: product.id,
                                title: product.title,
                                price: parseFloat(resolvedPrice),
                                image: mappedProduct.imageProduct,
                                category: 'Granular'
                            }, 'M');
                        }}
                    />
                );
            })}
        </div>
    );
}
