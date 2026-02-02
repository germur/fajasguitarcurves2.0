
import { useState, useEffect } from 'react';
import { ShopifyMapper } from '../../lib/shopify-mapper';
import { useTranslation } from 'react-i18next';

export function useProduct(handle: string) {
    const { i18n } = useTranslation();
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

                const isNumericId = /^\d+$/.test(handle);
                let query = '';
                let variables = {};
                const languageCode = (i18n.language || 'es').toUpperCase();

                if (isNumericId) {
                    const gid = `gid://shopify/Product/${handle}`;
                    query = `
                    query getProductById($id: ID!, $language: LanguageCode!) @inContext(language: $language) {
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
                    variables = { id: gid, language: languageCode };

                } else {
                    query = `
                    query getProductByHandle($handle: String!, $language: LanguageCode!) @inContext(language: $language) {
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
                    variables = { handle: handle, language: languageCode };
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
                    setProduct(null);
                } else {
                    // Pass i18n.language here
                    const mapped = ShopifyMapper.mapProduct(rawProduct, 'standard', i18n.language);
                    setProduct({
                        ...mapped,
                        description: rawProduct.descriptionHtml || rawProduct.description,
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
    }, [handle, i18n.language]);

    return { product, loading, error };
}
