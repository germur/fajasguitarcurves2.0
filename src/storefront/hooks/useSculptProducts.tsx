
import { useState, useEffect } from 'react';
import { ShopifyMapper } from '../../lib/shopify-mapper';
import { useTranslation } from 'react-i18next';


const SILO_HANDLE = 'sculpt-studio'; // Primary collection for this silo

export function useSculptProducts() {
    const { i18n } = useTranslation();
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProducts() {
            try {
                // Direct Fetch to bypass SDK Schema validation issues
                const storeDomain = '92542c-b5.myshopify.com';
                const storeToken = '04c58a7586c413051625b8a9aedd0416';
                const endpoint = `https://${storeDomain}/api/2024-01/graphql.json`;

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
                    console.error('[useSculptProducts] GraphQL Errors:', errors);
                    throw new Error(errors[0].message);
                }

                if (!data?.collectionByHandle) {
                    console.warn(`[useSculptProducts] Collection '${SILO_HANDLE}' not found. Using Fallback.`);
                    return;
                }

                const edges = data.collectionByHandle.products.edges || [];

                if (edges.length === 0) {
                    console.warn(`[useSculptProducts] Collection '${SILO_HANDLE}' is empty. Using Fallback.`);
                    return;
                }

                const mapped = edges
                    .map((edge: any) => ShopifyMapper.mapProduct(edge.node, 'sculpt', i18n.language))
                    .filter((p: any) =>
                        p.stage === 'Stage 3' ||
                        p.stage === 'Etapa 3' ||
                        p.tags.some((t: string) => t.toLowerCase().includes('cinturilla') || t.toLowerCase().includes('waist trainer'))
                    );
                setProducts(mapped);
            } catch (err: any) {
                console.error('[useSculptProducts] Error fetching products:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, [i18n.language]);

    return { products, loading, error };
}
