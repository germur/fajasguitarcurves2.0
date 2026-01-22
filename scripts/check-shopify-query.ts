
import { fetchProductsByQuery } from '../src/lib/shopify-client';

async function testShopifyQuery() {
    console.log("Testing Shopify Query...");

    // Test Query matching CollectionPage logic
    // IGNORE Silo Tag for this test to match strict relaxation
    // Query: tag:'Post Parto' OR title:Postparto OR title:Cesarea OR title:Maternidad

    // Note: Double quotes for outer string, single inside or escaped
    const q = "tag:'Post Parto' OR title:Postparto OR title:Cesarea OR title:Maternidad";

    console.log(`\nQuery: ${q}`);
    try {
        const products = await fetchProductsByQuery(q);
        console.log(`Count: ${products.length}`);

        products.forEach((p, i) => {
            console.log(`[${i + 1}] ${p.title} (Tags: ${p.tags ? p.tags.join(', ') : ''})`);
        });

        if (products.length === 0) {
            console.log("❌ Query returned 0 results.");
        } else {
            console.log("✅ Query successful.");
        }

    } catch (e) {
        console.error(e);
    }
}

testShopifyQuery();
