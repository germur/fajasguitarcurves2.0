
import { fetchCollectionByHandle } from '../src/lib/shopify-client';

async function testShopify() {
    console.log("Testing Shopify Data...");

    // Test Collection Content
    const handle = 'post-quirurgica';

    console.log(`\nChecking Collection: ${handle}`);
    try {
        const products = await fetchCollectionByHandle(handle);
        console.log(`Total Products: ${products.length}`);

        if (products.length === 0) {
            console.log("⚠️ Collection empty!");
            return;
        }

        // Check for Post Parto tags
        console.log("\n--- Checking 'Post Parto' Variations ---");
        const postParto = products.filter(p => {
            const tags = (p.tags || []).join(' ').toLowerCase();
            const title = p.title.toLowerCase();
            // Check Tags
            const hasTag = tags.includes('post parto') || tags.includes('postparto') || tags.includes('cesarea') || tags.includes('mam');
            // Check Title
            const hasTitle = title.includes('postparto') || title.includes('cesárea') || title.includes('maternidad');

            if (hasTitle && !hasTag) console.log(`⚠️  Found in Title but NOT Tags: ${p.title} [Tags: ${p.tags.join(', ')}]`);

            return hasTag;
        });

        console.log(`\nProducts with 'Post Parto' TAGS: ${postParto.length}`);
        if (postParto.length > 0) {
            console.log(`Sample: ${postParto[0].title}`);
            console.log(`Tags: ${postParto[0].tags.join(', ')}`);
        } else {
            console.log("❌ No products have 'Post Parto' related TAGS.");
        }

    } catch (e) {
        console.error(`Error fetching collection ${handle}:`, e);
    }
}

testShopify();
