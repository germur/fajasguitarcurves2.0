import { Link } from 'react-router-dom';

interface GranularProductGridProps {
    products: any[]; // Mapped Products
    loading?: boolean;
}

export function GranularProductGrid({ products, loading }: GranularProductGridProps) {
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
                if (!product.handle) return null;

                // Extract image URL safely
                const imageUrl = product.images?.[0]?.url || product.images?.[0]?.src || product.image || '/assets/placeholder-faja.jpg';
                const price = product.price?.amount || product.price || 0;
                const formattedPrice = typeof price === 'number' ? `$${price.toFixed(2)}` : `$${parseFloat(price).toFixed(2)}`;

                return (
                    <div key={product.id} className="group relative">
                        <div className="flex flex-col gap-4">
                            {/* Image */}
                            <div className="aspect-[3/4] w-full overflow-hidden rounded-xl bg-stone-100 relative">
                                <Link to={`/products/${product.handle}`} className="block w-full h-full">
                                    <img
                                        src={imageUrl}
                                        alt={product.title}
                                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                </Link>

                                {/* Quick View Button */}
                                <div className="absolute bottom-4 left-4 right-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    <Link
                                        to={`/products/${product.handle}`}
                                        className="w-full py-3 px-4 bg-[#2C2420] text-white text-center text-sm font-bold uppercase tracking-widest rounded-lg block hover:bg-[#D4AF37] transition-colors"
                                    >
                                        Ver Producto
                                    </Link>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="space-y-1">
                                <Link to={`/products/${product.handle}`} className="block">
                                    <h3 className="text-sm font-bold text-[#2C2420] uppercase tracking-wider line-clamp-2">
                                        {product.title}
                                    </h3>
                                </Link>
                                <div className="flex items-center gap-2 text-stone-600 text-sm">
                                    <span className="font-semibold text-[#D4AF37]">{formattedPrice} USD</span>
                                </div>
                                {/* Tags as Pills */}
                                {product.stage && (
                                    <span className="inline-block mt-2 text-xs font-bold uppercase tracking-wider bg-stone-100 text-stone-500 px-2 py-1 rounded-full">
                                        {product.stage}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
