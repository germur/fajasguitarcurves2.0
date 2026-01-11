import { useState, useEffect } from 'react';
import { ShopifyMapper } from '../../lib/shopify-mapper';

export function useProduct(handle: string) {
    const [product, setProduct] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!handle) {
            setLoading(false);
            return;
        }

        async function fetchProduct() {
            try {
                const storeDomain = '92542c-b5.myshopify.com';
                const storeToken = '04c58a7586c413051625b8a9aedd0416';
                const endpoint = `https://${storeDomain}/api/2024-01/graphql.json`;

                // Query by Handle (preferred) or ID (if numeric) is trickier in standard storefront API without specific query logic
                // But typically handle query works for handles. If we have an ID, we might need a different query.
                // For now, let's assume we are passing a handle. IF we passed an ID (digits), we might fail if we query 'productByHandle'.

                // Heuristic: Is it a numeric ID?
                const isNumericId = /^\d+$/.test(handle);

                // If it's pure numbers, it's likely an ID from our fallback.
                // Storefront API `product` query requires a global ID (gid://...), not just numeric.
                // But `productByHandle` requires a handle.
                // This is the Catch-22.

                // STRATEGY: 
                // 1. Try fetching by handle first.
                // 2. If it looks like an ID, we might need to search or reconstruct the GID?
                // Actually, the Storefront API `node` query isn't always available publicly/easily without context.
                // Let's rely on the fact that we fixed the handles in the previous step?
                // But if we fell back to ID, we need to fetch by ID.

                let query = '';
                let variables = {};

                if (isNumericId) {
                    // It's a numeric ID. Convert to GID for lookup?
                    // Actually, getting a product by legacy ID is hard in Storefront API.
                    // Better to standard browse? Or we can query `products(query: "id:...")`?

                    // Let's try `product(id: ...)` but we need the GID.
                    const gid = `gid://shopify/Product/${handle}`;

                    query = `
                    query getProductById($id: ID!) {
                        product(id: $id) {
                            id
                            title
                            handle
                            descriptionHtml
                            tags
                            priceRange {
                                minVariantPrice {
                                    amount
                                    currencyCode
                                }
                            }
                            images(first: 5) {
                                edges {
                                    node {
                                        url
                                        altText
                                    }
                                }
                            }
                            variants(first: 100) {
                                edges {
                                    node {
                                        id
                                        title
                                        availableForSale
                                        selectedOptions {
                                            name
                                            value
                                        }
                                        image {
                                            url
                                        }
                                        price {
                                            amount
                                            currencyCode
                                        }
                                    }
                                }
                            }
                        }
                    }`;
                    variables = { id: gid };

                } else {
                    // It's a handle string
                    query = `
                    query getProductByHandle($handle: String!) {
                        productByHandle(handle: $handle) {
                            id
                            title
                            handle
                            descriptionHtml
                            tags
                            priceRange {
                                minVariantPrice {
                                    amount
                                    currencyCode
                                }
                            }
                            images(first: 5) {
                                edges {
                                    node {
                                        url
                                        altText
                                    }
                                }
                            }
                            variants(first: 100) {
                                edges {
                                    node {
                                        id
                                        title
                                        availableForSale
                                        selectedOptions {
                                            name
                                            value
                                        }
                                        image {
                                            url
                                        }
                                        price {
                                            amount
                                            currencyCode
                                        }
                                    }
                                }
                            }
                        }
                    }`;
                    variables = { handle: handle };
                }

                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Shopify-Storefront-Access-Token': storeToken,
                    },
                    body: JSON.stringify({ query, variables })
                });

                const { data, errors } = await response.json();

                if (errors) {
                    throw new Error(errors[0].message);
                }

                const rawProduct = data?.product || data?.productByHandle;

                if (!rawProduct) {
                    // If not found, stay null
                    setProduct(null);
                } else {
                    // Map it using our existing mapper (we pass 'simple' or deduce logic?)
                    const mapped = ShopifyMapper.mapProduct(rawProduct, 'standard');
                    // Note: mapProduct expects 'description', but we fetched 'descriptionHtml'.
                    // Let's patch the object before mapping if needed or update Mapper.
                    // Mapper uses 'title' and 'priceRange'. It doesn't use description currently in mapProduct base?
                    // Let's check Mapper... it returns a mapped object.
                    // We might need to manually add description since typical catalog endpoint might not have full text?
                    // rawProduct has descriptionHtml. 

                    setProduct({
                        ...mapped,
                        description: rawProduct.descriptionHtml || rawProduct.description,
                        // Ensure we carry over explicit fields if Mapper didn't
                    });
                }

            } catch (err: any) {
                console.error('[useProduct] Error:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [handle]);

    return { product, loading, error };
}
