
import Client from 'shopify-buy';

const domain = '92542c-b5.myshopify.com';
const storefrontAccessToken = '04c58a7586c413051625b8a9aedd0416';

const shopifyClient = Client.buildClient({
    domain,
    storefrontAccessToken,
    apiVersion: '2024-01'
});

async function debugImages() {
    console.log("🔍 Fetching products...");
    try {
        const query = "tag:Post Surgery";
        const products = await shopifyClient.product.fetchQuery({ query, first: 1 });

        if (products.length > 0) {
            const p = products[0];
            console.log("⚠️ IMAGE STRUCTURE:");
            // Check if it's an array and what the first item looks like
            if (Array.isArray(p.images)) {
                console.log(`Array Length: ${p.images.length}`);
                if (p.images.length > 0) {
                    console.log("First Image Item Keys:", Object.keys(p.images[0]));
                    console.log("First Image Full:", JSON.stringify(p.images[0], null, 2));
                    console.log("Accessing .src:", p.images[0].src);
                    console.log("Accessing .url:", p.images[0].url);
                }
            } else {
                console.log("p.images is NOT an array:", p.images);
            }
        }
    } catch (error) {
        console.error("❌ Error:", error);
    }
}

debugImages();
