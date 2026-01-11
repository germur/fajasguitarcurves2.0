import { useState, useEffect } from 'react';
import { ShopifyMapper } from '../../lib/shopify-mapper';

const SILO_HANDLE = 'post-quirurgica'; // Updated to match likely real handle

export function useRecoveryProducts() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

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
                        products(first: 50) {
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
                    console.error('[useRecoveryProducts] GraphQL Errors:', errors);
                    // throw new Error(errors[0].message); // Don't crash, just log
                }

                if (data?.collectionByHandle?.products) {
                    console.log('✅ Shopify Data Fetched (Recovery):', data.collectionByHandle.products.edges.length, 'items');
                    // Map raw Shopify nodes to our "Medical Product" schema
                    const mappedProducts = data.collectionByHandle.products.edges.map((edge: any) =>
                        ShopifyMapper.mapProduct(edge.node, 'medical')
                    );
                    setProducts(mappedProducts);
                } else {
                    console.warn(`⚠️ Collection "${SILO_HANDLE}" not found or empty.`);
                    setProducts([]);
                }

            } catch (error) {
                console.error('Error fetching recovery products:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    return { products, loading };
}
