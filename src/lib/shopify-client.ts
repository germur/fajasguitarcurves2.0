import Client from 'shopify-buy';

const domain = 'fajasguitarcurves.com';
// Try to get token from env, fallback to empty string which will need to be filled
const storefrontAccessToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || '';

if (!storefrontAccessToken) {
    console.warn('⚠️ Shopify Storefront Access Token is missing. Please add VITE_SHOPIFY_STOREFRONT_TOKEN to your .env file.');
}

export const shopifyClient = Client.buildClient({
    domain,
    storefrontAccessToken,
    apiVersion: '2024-01'
});
