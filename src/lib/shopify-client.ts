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
