
const Client = require('shopify-buy');

const domain = '92542c-b5.myshopify.com';
const storefrontAccessToken = '04c58a7586c413051625b8a9aedd0416';

const client = Client.buildClient({
    domain,
    storefrontAccessToken,
    apiVersion: '2024-01'
});

async function debugCollection() {
    const handle = 'post-quirurgica'; // One of the handles used in RelatedProducts
    console.log(`Fetching collection: ${handle}...`);

    try {
        const collection = await client.collection.fetchByHandle(handle);
        if (!collection || !collection.products) {
            console.log("Collection not found or empty.");
            return;
        }

        const p = collection.products[0];
        console.log("\n=== FIRST PRODUCT STRUCTURE ===");
        console.log("ID:", p.id);
        console.log("Title:", p.title);

        console.log("\n--- IMAGES ---");
        console.log(JSON.stringify(p.images, null, 2));

        console.log("\n--- VARIANTS (Price Check) ---");
        console.log(JSON.stringify(p.variants[0], null, 2));

        console.log("\n--- TOP LEVEL PRICE? ---");
        console.log("price:", p.price);
        console.log("priceRange:", JSON.stringify(p.priceRange, null, 2));

    } catch (error) {
        console.error("Error:", error);
    }
}

debugCollection();
