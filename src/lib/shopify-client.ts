import Client from 'shopify-buy';

// Using the shopify-specific domain is often more reliable for API calls
const domain = '92542c-b5.myshopify.com';

// Public Storefront Access Token found on live site
const storefrontAccessToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || '04c58a7586c413051625b8a9aedd0416';

if (!storefrontAccessToken) {
    console.warn('⚠️ Shopify Storefront Access Token is missing.');
}

export const shopifyClient = Client.buildClient({
    domain,
    storefrontAccessToken,
    apiVersion: '2024-01'
});

/**
 * Fetches products that match ALL provided tags (Intersection).
 * This enables Granular SEO Collections (e.g. "Recovery" + "Stage 2").
 */
export async function fetchProductsByTags(tags: string[]) {
    // Construct Query: tag:A AND tag:B
    const query = tags.map(t => `tag:${t}`).join(' AND ');

    // Safety check
    if (!query) return [];

    try {
        const products = await shopifyClient.product.fetchQuery({ query, sortKey: 'BEST_SELLING' });
        return products;
    } catch (error) {
        console.error("Error fetching granular products:", error);
        return [];
    }
}
