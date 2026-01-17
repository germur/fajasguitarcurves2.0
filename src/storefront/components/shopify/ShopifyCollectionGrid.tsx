import { useEffect, useState } from 'react';
import { GranularProductGrid } from '../GranularProductGrid';
import { fetchCollectionByHandle } from '../../../lib/shopify-client';
import { ShopifyMapper } from '../../../lib/shopify-mapper';

interface ShopifyCollectionGridProps {
    handle: string;
    productCount?: number;
}

export function ShopifyCollectionGrid({ handle, productCount = 4 }: ShopifyCollectionGridProps) {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        setLoading(true);

        fetchCollectionByHandle(handle)
            .then(rawProducts => {
                if (!mounted) return;
                // Limit to productCount
                const limited = rawProducts.slice(0, productCount);
                const mapped = limited.map((p: any) => ShopifyMapper.mapProduct(p, 'standard'));
                setProducts(mapped);
            })
            .catch(err => {
                console.error(`Error loading collection grid for ${handle}:`, err);
            })
            .finally(() => {
                if (mounted) setLoading(false);
            });

        return () => { mounted = false; };
    }, [handle, productCount]);

    return (
        <GranularProductGrid products={products} loading={loading} />
    );
}
