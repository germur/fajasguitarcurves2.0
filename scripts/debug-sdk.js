
// Script to debug the EXACT output of the shopify-buy SDK
import Client from 'shopify-buy';

const domain = '92542c-b5.myshopify.com';
const storefrontAccessToken = '04c58a7586c413051625b8a9aedd0416';

const shopifyClient = Client.buildClient({
    domain,
    storefrontAccessToken,
    apiVersion: '2024-01'
});

async function debugSDK() {
    console.log("🔍 Fetching products via SDK...");
    try {
        const query = "tag:Post Surgery"; // Use a known working tag
        const products = await shopifyClient.product.fetchQuery({ query, first: 1 });

        if (products.length > 0) {
            const p = products[0];
            console.log("⚠️ SDK PRODUCT STRUCTURE (First Item):");
            console.log(JSON.stringify(p, null, 2));

            console.log("\n⚠️ IMAGES ARRAY:");
            console.log(JSON.stringify(p.images, null, 2));

            console.log("\n⚠️ VARIANTS ARRAY:");
            console.log(JSON.stringify(p.variants, null, 2));
        } else {
            console.log("No products found.");
        }

    } catch (error) {
        console.error("❌ Error fetching:", error);
    }
}

debugSDK();
