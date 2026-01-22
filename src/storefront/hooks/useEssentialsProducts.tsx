
import { useState, useEffect } from 'react';
import { ShopifyMapper } from '../../lib/shopify-mapper';
import { fetchCollectionByHandle } from '../../lib/shopify-client';

const SILO_HANDLE = 'essentials';

export function useEssentialsProducts() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            try {
                // Use the shared client to fetch collection data properly
                // Pass strict=false because these products might rely on BraCard fallbacks for images
                const rawProducts = await fetchCollectionByHandle(SILO_HANDLE, false);

                if (rawProducts.length === 0) {
                    console.warn(`[useEssentialsProducts] Collection '${SILO_HANDLE}' returned 0 products.`);
                }

                const mapped = rawProducts
                    .map((p: any) => ShopifyMapper.mapProduct(p, 'essentials'))
                    .filter((p: any) => {
                        // Logic similar to before, but safer
                        const t = p.title.toLowerCase();
                        const tags = p.tags ? p.tags.map((tag: string) => tag.toLowerCase()) : [];

                        return t.includes('brasier') ||
                            t.includes('bra ') ||
                            tags.some((tag: string) => tag.includes('brasier') || tag.includes('sujetador') || tag.includes('bra '));
                    });

                setProducts(mapped);
            } catch (err: any) {
                console.error('[useEssentialsProducts] Error fetching products:', err);
                setError(err.message || 'Error loading essentials.');
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    return { products, loading, error };
}
