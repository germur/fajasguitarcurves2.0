
import { useState, useEffect } from 'react';
import { ShopifyMapper } from '../../lib/shopify-mapper';

const SILO_HANDLE = 'essentials';

export function useEssentialsProducts() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProducts() {
            try {
                // Direct Fetch
                const storeDomain = '92542c-b5.myshopify.com';
                const storeToken = '04c58a7586c413051625b8a9aedd0416';
                const endpoint = `https://${storeDomain}/api/2024-01/graphql.json`;

                // Query for collection. If not found, products will be empty.
                const collectionQuery = `
                query getCollection($handle: String!) {
                    collectionByHandle(handle: $handle) {
                        products(first: 250) {
                            edges {
                                node {
                                    id
                                    title
                                    handle
                                    description
                                    tags
                                    images(first: 2) {
                                        edges {
                                            node {
                                                url
                                                altText
                                            }
                                        }
                                    }
                                    priceRange {
                                        minVariantPrice {
                                            amount
                                            currencyCode
                                        }
                                    }
                                }
                            }
                        }
                    }
                }`;

                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Shopify-Storefront-Access-Token': storeToken,
                    },
                    body: JSON.stringify({
                        query: collectionQuery,
                        variables: { handle: SILO_HANDLE }
                    })
                });

                const { data, errors } = await response.json();

                if (errors) {
                    console.error('[useEssentialsProducts] GraphQL Errors:', errors);
                    throw new Error(errors[0].message);
                }

                if (!data?.collectionByHandle) {
                    // Collection missing
                    console.warn(`[useEssentialsProducts] Collection '${SILO_HANDLE}' not found.`);
                    // Fallback search? No, strictly real data. If empty, UI shows empty.
                    return;
                }

                const edges = data.collectionByHandle.products.edges || [];
                const mapped = edges.map((edge: any) => ShopifyMapper.mapProduct(edge.node, 'lifestyle')); // Using lifestyle mapping for now as it's similar (general items)
                setProducts(mapped);
            } catch (err: any) {
                console.error('[useEssentialsProducts] Error fetching products:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    return { products, loading, error };
}
